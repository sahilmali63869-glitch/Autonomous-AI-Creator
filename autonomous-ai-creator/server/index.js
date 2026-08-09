import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { db } from './database/db.js';
import { Planner } from './orchestrator/Planner.js';
import { Manager } from './orchestrator/Manager.js';
import { toolRegistry } from './tools/ToolRegistry.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Active orchestrator instances map: taskId -> { manager, clients: [] }
const activeManagers = new Map();

function getOrCreateManager(taskId) {
  let instance = activeManagers.get(taskId);
  if (!instance) {
    const clients = [];
    const manager = new Manager(taskId, clients);
    instance = { manager, clients };
    activeManagers.set(taskId, instance);
  }
  return instance;
}

// ---------------- REST API ROUTES ----------------

// GET /api/tasks
app.get('/api/tasks', (req, res) => {
  res.json(db.getTasks());
});

// GET /api/tasks/:id
app.get('/api/tasks/:id', (req, res) => {
  const task = db.getTaskById(req.params.id);
  if (!task) return res.status(404).json({ error: 'Task not found' });
  res.json(task);
});

// POST /api/tasks - Create new Goal and Generate Autonomous Plan
app.post('/api/tasks', async (req, res) => {
  try {
    const { goal, prompt, options = {} } = req.body;
    const goalText = goal || prompt;
    if (!goalText) return res.status(400).json({ error: 'Goal prompt is required' });

    // Generate Plan using Planner Agent
    const plan = await Planner.createPlan(goalText, options);

    const newTask = {
      id: 'task-' + Date.now(),
      goal: goalText,
      name: goalText.slice(0, 45) + (goalText.length > 45 ? '...' : ''),
      status: 'planned',
      progress: 0,
      createdAt: new Date().toISOString(),
      summary: plan.summary,
      estimatedTotalDuration: plan.estimatedTotalDuration || '8 min',
      subtasks: plan.subtasks || [],
      tokensUsed: 0,
      iterations: 0,
      projectId: options.projectId || 'proj-1'
    };

    db.saveTask(newTask);
    res.status(201).json(newTask);
  } catch (error) {
    console.error('Error creating task plan:', error);
    res.status(500).json({ error: error.message });
  }
});

// POST /api/tasks/:id/execute - Start/Resume Execution Loop
app.post('/api/tasks/:id/execute', async (req, res) => {
  const task = db.getTaskById(req.params.id);
  if (!task) return res.status(404).json({ error: 'Task not found' });

  const { manager } = getOrCreateManager(task.id);
  manager.runExecutionLoop();

  res.json({ message: 'Execution started', taskId: task.id, status: 'running' });
});

// POST /api/tasks/:id/pause
app.post('/api/tasks/:id/pause', (req, res) => {
  const instance = activeManagers.get(req.params.id);
  if (instance) instance.manager.pause();
  res.json({ message: 'Execution paused' });
});

// POST /api/tasks/:id/cancel
app.post('/api/tasks/:id/cancel', (req, res) => {
  const instance = activeManagers.get(req.params.id);
  if (instance) instance.manager.cancel();
  res.json({ message: 'Execution cancelled' });
});

// POST /api/tasks/:id/force-complete - Instant Unstuck / Complete Goal
app.post('/api/tasks/:id/force-complete', (req, res) => {
  const instance = getOrCreateManager(req.params.id);
  instance.manager.forceComplete();
  res.json({ message: 'Task forced to completion' });
});

// POST /api/tasks/:id/approve - Submit Human Approval Decision
app.post('/api/tasks/:id/approve', (req, res) => {
  const { subtaskId, decision } = req.body; // decision: 'approve' | 'reject'
  const instance = activeManagers.get(req.params.id);
  if (instance) {
    instance.manager.handleApproval(subtaskId, decision);
    res.json({ message: `Decision '${decision}' applied for subtask ${subtaskId}` });
  } else {
    // If instance not loaded yet in memory, update DB directly
    const task = db.getTaskById(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });

    const subtask = (task.subtasks || []).find(s => s.id === subtaskId);
    if (subtask) {
      subtask.approvalStatus = decision === 'approve' ? 'approved' : 'rejected';
      subtask.status = decision === 'approve' ? 'pending' : 'failed';
      db.saveTask(task);
    }
    res.json({ message: `Approval status updated` });
  }
});

// GET /api/tasks/:id/stream - Server-Sent Events (SSE) Real-Time Updates
app.get('/api/tasks/:id/stream', (req, res) => {
  const taskId = req.params.id;
  
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  const instance = getOrCreateManager(taskId);
  instance.clients.push(res);

  // Send initial task state
  const currentTask = db.getTaskById(taskId);
  res.write(`event: init\ndata: ${JSON.stringify(currentTask || {})}\n\n`);

  req.on('close', () => {
    instance.clients = instance.clients.filter(client => client !== res);
  });
});

// GET /api/agents
app.get('/api/agents', (req, res) => res.json(db.getAgents()));

// GET /api/tools
app.get('/api/tools', (req, res) => res.json(toolRegistry.listTools()));

// GET /api/workflows
app.get('/api/workflows', (req, res) => res.json(db.getWorkflows()));

// POST /api/workflows
app.post('/api/workflows', (req, res) => {
  const newWf = { id: 'wf-' + Date.now(), ...req.body, createdAt: new Date().toISOString() };
  const wfs = db.getWorkflows();
  wfs.unshift(newWf);
  db.data.workflows = wfs;
  db.save();
  res.status(201).json(newWf);
});

// GET /api/projects
app.get('/api/projects', (req, res) => res.json(db.getProjects()));

// GET /api/files
app.get('/api/files', (req, res) => res.json(db.getFiles()));

// GET /api/logs
app.get('/api/logs', (req, res) => res.json(db.getLogs()));

// GET /api/settings
app.get('/api/settings', (req, res) => res.json(db.getSettings()));

// POST /api/settings
app.post('/api/settings', (req, res) => {
  const updated = db.updateSettings(req.body);
  res.json(updated);
});

app.listen(PORT, () => {
  console.log(`⚡ Autonomous AI Creator Server running on http://localhost:${PORT}`);
});
