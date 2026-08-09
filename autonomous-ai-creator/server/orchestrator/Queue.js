export class TaskQueue {
  constructor(subtasks = []) {
    this.subtasks = subtasks;
  }

  getReadySubtasks() {
    const completedIds = new Set(
      this.subtasks
        .filter(t => t.status === 'completed' || t.status === 'completed_with_warnings')
        .map(t => t.id)
    );

    // 1. Standard dependency check
    const ready = this.subtasks.filter(t => {
      if (t.status !== 'pending') return false;
      const depsSatisfied = (t.dependencies || []).every(depId => completedIds.has(depId));
      return depsSatisfied;
    });

    if (ready.length > 0) return ready;

    // 2. Deadlock Recovery: If no tasks are ready, but pending tasks exist and none are currently running/awaiting approval
    const isAnyActive = this.subtasks.some(t => t.status === 'in_progress' || t.status === 'awaiting_approval');
    const pendingTasks = this.subtasks.filter(t => t.status === 'pending');

    if (!isAnyActive && pendingTasks.length > 0) {
      console.log('⚠️ Deadlock Recovery Triggered: Unlocking first pending task to ensure completion.');
      return [pendingTasks[0]];
    }

    return [];
  }

  isFullyCompleted() {
    return this.subtasks.every(t => t.status === 'completed' || t.status === 'completed_with_warnings');
  }

  hasFailures() {
    return this.subtasks.some(t => t.status === 'failed');
  }

  hasPendingApprovals() {
    return this.subtasks.some(t => t.status === 'awaiting_approval');
  }

  updateSubtaskStatus(id, status, extra = {}) {
    const task = this.subtasks.find(t => t.id === id);
    if (task) {
      task.status = status;
      Object.assign(task, extra);
    }
  }

  calculateProgress() {
    if (!this.subtasks.length) return 0;
    const completed = this.subtasks.filter(t => t.status === 'completed' || t.status === 'completed_with_warnings').length;
    return Math.round((completed / this.subtasks.length) * 100);
  }
}
