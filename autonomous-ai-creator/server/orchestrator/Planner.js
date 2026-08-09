import { MockProvider } from '../providers/MockProvider.js';
import { GeminiProvider } from '../providers/GeminiProvider.js';
import { OpenAIProvider } from '../providers/OpenAIProvider.js';
import { db } from '../database/db.js';

export class Planner {
  static getProvider() {
    const settings = db.getSettings();
    const providerName = settings.aiProvider || 'mock';

    if (providerName === 'gemini' && settings.geminiApiKey) {
      return new GeminiProvider(settings.geminiApiKey);
    } else if (providerName === 'openai' && settings.openaiApiKey) {
      return new OpenAIProvider(settings.openaiApiKey);
    }

    return new MockProvider();
  }

  static async createPlan(goal, options = {}) {
    const provider = this.getProvider();
    const plan = await provider.generatePlan(goal, options);
    return plan;
  }
}
