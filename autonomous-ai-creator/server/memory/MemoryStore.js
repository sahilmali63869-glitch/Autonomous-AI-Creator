export class MemoryStore {
  constructor() {
    this.shortTermMemory = new Map(); // taskId -> context object
    this.longTermMemory = [];        // global user preferences & reusable learnings
    this.projectMemory = new Map();  // projectId -> project memory object
  }

  // Short term memory
  setTaskContext(taskId, contextData) {
    const existing = this.shortTermMemory.get(taskId) || { logs: [], outputs: {}, variables: {} };
    this.shortTermMemory.set(taskId, {
      ...existing,
      ...contextData,
      updatedAt: new Date().toISOString()
    });
  }

  getTaskContext(taskId) {
    return this.shortTermMemory.get(taskId) || { logs: [], outputs: {}, variables: {} };
  }

  appendTaskLog(taskId, logEntry) {
    const context = this.getTaskContext(taskId);
    context.logs.push({
      timestamp: new Date().toISOString(),
      ...logEntry
    });
    this.shortTermMemory.set(taskId, context);
  }

  clearTaskContext(taskId) {
    this.shortTermMemory.delete(taskId);
  }

  // Long term memory
  addLongTermInsight(insight) {
    this.longTermMemory.push({
      id: 'insight-' + Date.now(),
      insight,
      timestamp: new Date().toISOString()
    });
  }

  searchLongTerm(query) {
    if (!query) return this.longTermMemory;
    const q = query.toLowerCase();
    return this.longTermMemory.filter(item => item.insight.toLowerCase().includes(q));
  }

  // Project memory
  setProjectMemory(projectId, data) {
    const existing = this.projectMemory.get(projectId) || {};
    this.projectMemory.set(projectId, {
      ...existing,
      ...data,
      updatedAt: new Date().toISOString()
    });
  }

  getProjectMemory(projectId) {
    return this.projectMemory.get(projectId) || {};
  }
}

export const memoryStore = new MemoryStore();
