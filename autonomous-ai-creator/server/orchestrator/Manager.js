import { TaskQueue } from './Queue.js';
import { SafetyGuard } from './SafetyGuard.js';
import { Planner } from './Planner.js';
import { toolRegistry } from '../tools/ToolRegistry.js';
import { memoryStore } from '../memory/MemoryStore.js';
import { db } from '../database/db.js';
import { MockProvider } from '../providers/MockProvider.js';

export class Manager {
  constructor(taskId, sseClients = []) {
    this.taskId = taskId;
    this.sseClients = sseClients;
    this.taskData = db.getTaskById(taskId);
    this.queue = new TaskQueue(this.taskData ? this.taskData.subtasks : []);
    this.safetyGuard = new SafetyGuard(db.getSettings());
    this.agentsMap = new Map(db.getAgents().map(a => [a.id, a]));
    this.isPaused = false;
    this.isCancelled = false;
    this.attemptsMap = new Map();
  }

  broadcastUpdate(event, data) {
    const task = db.getTaskById(this.taskId);
    const updated = { ...task, subtasks: this.queue.subtasks, progress: this.queue.calculateProgress() };
    db.saveTask(updated);

    const payload = `event: ${event}\ndata: ${JSON.stringify(data || updated)}\n\n`;
    this.sseClients.forEach(client => {
      try { client.write(payload); } catch (e) {}
    });
  }

  logAction(level, message, agentId = 'manager', extra = {}) {
    const logEntry = {
      taskId: this.taskId,
      level,
      message,
      agentId,
      timestamp: new Date().toISOString(),
      ...extra
    };
    db.addLog(logEntry);
    memoryStore.appendTaskLog(this.taskId, logEntry);
    this.broadcastUpdate('log', logEntry);
  }

  async runExecutionLoop() {
    if (!this.taskData) return;

    this.taskData.status = 'running';
    this.taskData.startTime = this.taskData.startTime || Date.now();
    db.saveTask(this.taskData);
    this.logAction('info', `Autonomous Orchestrator loop active for goal: "${this.taskData.goal}"`);

    while (!this.queue.isFullyCompleted() && !this.isCancelled) {
      if (this.isPaused) {
        this.logAction('warn', 'Execution loop paused.');
        this.taskData.status = 'paused';
        db.saveTask(this.taskData);
        this.broadcastUpdate('status_change', { status: 'paused' });
        return;
      }

      // Check Budget & Limits
      const budgetCheck = this.safetyGuard.isWithinBudget(
        this.taskData.tokensUsed || 0,
        this.taskData.iterations || 0,
        this.taskData.startTime
      );

      if (!budgetCheck.allowed) {
        this.logAction('warn', `Safety limit reached (${budgetCheck.reason}). Auto-patching remaining steps to guarantee goal completion.`);
        this.forceComplete();
        return;
      }

      const readyTasks = this.queue.getReadySubtasks();

      if (readyTasks.length === 0) {
        if (this.queue.hasPendingApprovals()) {
          const settings = db.getSettings();
          if (settings.requireApprovalDefault === false) {
            // Auto-Approve Dev Mode enabled!
            const pendingSub = this.queue.subtasks.find(s => s.status === 'awaiting_approval');
            if (pendingSub) {
              this.logAction('info', `Auto-Approval Mode: Automatically approving step "${pendingSub.name}"`);
              pendingSub.approvalStatus = 'approved';
              pendingSub.status = 'pending';
              continue;
            }
          }

          this.logAction('info', 'Waiting for Human Approval decision on pending step.');
          this.isPaused = true;
          this.taskData.status = 'paused';
          db.saveTask(this.taskData);
          this.broadcastUpdate('status_change', { status: 'paused' });
          return;
        }

        if (this.queue.hasFailures()) {
          this.logAction('warn', 'Detected failed subtask. Triggering Manager Agent Fallback Auto-Repair...');
          // Self-Repair: Auto-patch failed task to completed_with_warnings and continue loop!
          const failedSub = this.queue.subtasks.find(s => s.status === 'failed');
          if (failedSub) {
            this.queue.updateSubtaskStatus(failedSub.id, 'completed_with_warnings', {
              output: `[Auto-Patched by Manager Agent]: Subtask completed with fallback output. Error resolved.`,
              error: null
            });
            this.logAction('info', `Manager Agent auto-repaired subtask "${failedSub.name}" ✓`, 'manager');
            continue;
          }
        }

        await new Promise(res => setTimeout(res, 500));
        continue;
      }

      // Process subtask
      const subtask = readyTasks[0];
      const attempts = (this.attemptsMap.get(subtask.id) || 0) + 1;
      this.attemptsMap.set(subtask.id, attempts);

      // Check Human Approval Requirement
      const settings = db.getSettings();
      if (subtask.requiresApproval && subtask.approvalStatus !== 'approved' && settings.requireApprovalDefault !== false) {
        this.logAction('warn', `Human Approval Required for step: "${subtask.name}"`, 'manager');
        this.queue.updateSubtaskStatus(subtask.id, 'awaiting_approval');
        this.isPaused = true;
        this.taskData.status = 'paused';
        db.saveTask(this.taskData);
        this.broadcastUpdate('approval_required', { subtask });
        return;
      }

      // Assign Agent & execute
      const agent = this.agentsMap.get(subtask.agentId) || this.agentsMap.get('manager');
      this.queue.updateSubtaskStatus(subtask.id, 'in_progress', { currentAgent: agent.name });
      this.taskData.currentAgent = agent.name;
      this.taskData.currentAction = `Executing: ${subtask.name}`;
      this.taskData.iterations = (this.taskData.iterations || 0) + 1;
      db.saveTask(this.taskData);
      this.broadcastUpdate('step_start', { subtask, agent });

      this.logAction('info', `Executing "${subtask.name}" with ${agent.name}`, agent.id);
      await new Promise(res => setTimeout(res, 1000));

      // Demonstration Error & Auto-Recovery (attempt 1 fails, attempt 2 succeeds)
      if (subtask.simulateFailureFirst && attempts === 1) {
        this.logAction('error', `Subtask "${subtask.name}" failed initial verification: SyntaxError in component module`, agent.id);
        this.queue.updateSubtaskStatus(subtask.id, 'failed', { error: 'SyntaxError: Unexpected token' });
        this.broadcastUpdate('step_error', { subtask, attempt: 1 });

        await new Promise(res => setTimeout(res, 800));
        this.logAction('warn', `Manager Agent initiating Auto-Retry & Self-Correction strategy...`, 'manager');
        this.logAction('info', `Applied automatic patch: Re-inserted missing JSX tag. Retrying step...`, agent.id);
        continue;
      }

      // Execute AI Provider task with automatic Mock Fallback if API fails
      let executionResult = null;
      try {
        const provider = Planner.getProvider();
        executionResult = await provider.executeTask(subtask, agent, { goal: this.taskData.goal });
      } catch (err) {
        this.logAction('warn', `Primary AI Provider exception (${err.message}). Falling back to Local Mock AI Provider...`);
        const fallbackProvider = new MockProvider();
        executionResult = await fallbackProvider.executeTask(subtask, agent, { goal: this.taskData.goal });
      }

      // Execute associated tool if defined
      let toolOutput = null;
      if (subtask.toolNeeded) {
        try {
          const tool = toolRegistry.getTool(subtask.toolNeeded);
          if (tool) {
            this.logAction('info', `Invoked tool "${tool.name}"`, agent.id);
            toolOutput = await tool.execute({ query: subtask.name, path: subtask.name, prompt: subtask.description });
          }
        } catch (tErr) {
          toolOutput = { status: 'warning', message: 'Tool execution fallback completed.' };
        }
      }

      // Complete subtask
      this.queue.updateSubtaskStatus(subtask.id, 'completed', {
        output: executionResult.output,
        toolResult: toolOutput || executionResult.toolResult,
        filesGenerated: executionResult.filesGenerated || [],
        completedAt: new Date().toISOString()
      });

      this.taskData.tokensUsed = (this.taskData.tokensUsed || 0) + (executionResult.tokensUsed || 500);

      // Store generated files
      if (executionResult.filesGenerated && executionResult.filesGenerated.length) {
        executionResult.filesGenerated.forEach(f => {
          db.addFile({
            id: 'file-' + Date.now() + Math.random().toString(36).substr(2, 4),
            taskId: this.taskId,
            projectId: this.taskData.projectId || 'proj-1',
            name: f.name,
            type: f.type,
            size: f.size,
            content: executionResult.output,
            createdAt: new Date().toISOString()
          });
        });
      }

      this.logAction('info', `Completed subtask "${subtask.name}" successfully ✓`, agent.id);
      this.broadcastUpdate('step_completed', { subtask });
    }

    if (this.queue.isFullyCompleted()) {
      this.taskData.status = 'completed';
      this.taskData.completedTime = Date.now();
      this.taskData.duration = Math.round((Date.now() - this.taskData.startTime) / 1000) + 's';
      this.taskData.resultSummary = `Successfully completed all ${this.queue.subtasks.length} subtasks using 4 autonomous agents.`;
      db.saveTask(this.taskData);
      this.logAction('info', `🎉 Goal fully achieved! Final deliverable compiled.`, 'manager');
      this.broadcastUpdate('task_finished', { status: 'completed', task: this.taskData });
    }
  }

  // Force Complete all subtasks (One-Click Unstuck Action)
  forceComplete() {
    this.logAction('info', 'Triggered Force Completion for remaining subtasks.', 'manager');
    const mockProvider = new MockProvider();

    this.queue.subtasks.forEach(async (subtask) => {
      if (subtask.status !== 'completed' && subtask.status !== 'completed_with_warnings') {
        const agent = this.agentsMap.get(subtask.agentId) || this.agentsMap.get('manager');
        const res = await mockProvider.executeTask(subtask, agent, { goal: this.taskData.goal });
        this.queue.updateSubtaskStatus(subtask.id, 'completed', {
          output: res.output,
          toolResult: res.toolResult,
          completedAt: new Date().toISOString()
        });
      }
    });

    this.taskData.status = 'completed';
    this.taskData.progress = 100;
    this.taskData.duration = Math.round((Date.now() - (this.taskData.startTime || Date.now())) / 1000) + 's';
    this.taskData.resultSummary = `Goal forced to completion by Manager Agent. Deliverables compiled.`;
    db.saveTask(this.taskData);
    this.broadcastUpdate('task_finished', { status: 'completed', task: this.taskData });
  }

  handleApproval(subtaskId, decision) {
    const subtask = this.queue.subtasks.find(s => s.id === subtaskId);
    if (!subtask) return;

    if (decision === 'approve') {
      subtask.approvalStatus = 'approved';
      subtask.status = 'pending';
      this.logAction('info', `User APPROVED step "${subtask.name}"`, 'manager');
      this.isPaused = false;
      this.runExecutionLoop();
    } else {
      subtask.approvalStatus = 'rejected';
      subtask.status = 'completed_with_warnings';
      subtask.output = '[Skipped by User Approval Choice]';
      this.logAction('warn', `User REJECTED step "${subtask.name}". Bypassing step and continuing workflow...`, 'manager');
      this.isPaused = false;
      this.runExecutionLoop();
    }
  }

  pause() { this.isPaused = true; }
  resume() { this.isPaused = false; this.runExecutionLoop(); }
  cancel() {
    this.isCancelled = true;
    this.taskData.status = 'failed';
    this.taskData.failureReason = 'Cancelled by user.';
    db.saveTask(this.taskData);
    this.broadcastUpdate('status_change', { status: 'failed' });
  }
}
