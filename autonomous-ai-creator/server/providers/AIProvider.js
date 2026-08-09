export class AIProvider {
  constructor(name) {
    this.name = name;
  }

  async generatePlan(goal, context = {}) {
    throw new Error('generatePlan must be implemented by AIProvider');
  }

  async executeTask(task, agent, context = {}, tools = []) {
    throw new Error('executeTask must be implemented by AIProvider');
  }

  async evaluateResult(task, result, goal) {
    throw new Error('evaluateResult must be implemented by AIProvider');
  }
}
