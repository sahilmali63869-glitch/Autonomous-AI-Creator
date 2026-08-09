export class SafetyGuard {
  constructor(config = {}) {
    this.maxIterations = config.maxIterations || 25;
    this.maxRetries = config.maxRetries || 3;
    this.maxExecutionTimeSec = config.maxExecutionTimeSec || 600;
    this.tokenBudget = config.tokenBudget || 100000;
    this.requireApprovalDefault = config.requireApprovalDefault !== false;
  }

  shouldRequireApproval(subtask, context = {}) {
    if (subtask.requiresApproval) return true;
    
    const desc = (subtask.description || '').toLowerCase();
    const name = (subtask.name || '').toLowerCase();
    
    // Destructive / High Risk Actions trigger human approval automatically!
    const sensitiveKeywords = [
      'delete', 'remove', 'drop table', 'deploy to production',
      'publish campaign', 'send email', 'purchase', 'environment secrets',
      'payment gateway', 'ssl config'
    ];

    for (const keyword of sensitiveKeywords) {
      if (name.includes(keyword) || desc.includes(keyword)) {
        return true;
      }
    }

    return false;
  }

  canRetry(subtask, currentAttempts) {
    return currentAttempts < this.maxRetries;
  }

  isWithinBudget(tokensUsed, iterationsCount, startTime) {
    const elapsedSec = (Date.now() - startTime) / 1000;
    if (elapsedSec > this.maxExecutionTimeSec) {
      return { allowed: false, reason: `Execution time limit exceeded (${Math.round(elapsedSec)}s > ${this.maxExecutionTimeSec}s)` };
    }

    if (iterationsCount > this.maxIterations) {
      return { allowed: false, reason: `Max iteration limit exceeded (${iterationsCount} > ${this.maxIterations})` };
    }

    if (tokensUsed > this.tokenBudget) {
      return { allowed: false, reason: `Token budget limit exceeded (${tokensUsed} > ${this.tokenBudget})` };
    }

    return { allowed: true };
  }
}
