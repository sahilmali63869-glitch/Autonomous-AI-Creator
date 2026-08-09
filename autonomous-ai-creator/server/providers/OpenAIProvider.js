import { AIProvider } from './AIProvider.js';

export class OpenAIProvider extends AIProvider {
  constructor(apiKey) {
    super('OpenAI');
    this.apiKey = apiKey;
  }

  async generatePlan(goal, context = {}) {
    if (!this.apiKey) throw new Error('OpenAI API key is required');
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{
          role: 'system',
          content: 'You are an AI Planner agent. Decompose user goals into JSON subtasks.'
        }, {
          role: 'user',
          content: `Goal: "${goal}". Return raw JSON subtasks with keys: id, name, description, agentId, dependencies, priority, requiresApproval.`
        }]
      })
    });

    const data = await response.json();
    const text = data.choices[0].message.content;
    const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(cleanJson);

    return {
      goal,
      summary: 'Plan generated using OpenAI GPT-4o-mini',
      subtasks: parsed.subtasks || parsed
    };
  }

  async executeTask(subtask, agent, context = {}) {
    if (!this.apiKey) throw new Error('OpenAI API key missing');

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{
          role: 'system',
          content: `You are ${agent.name} (${agent.role}). Perform the subtask and output structured results.`
        }, {
          role: 'user',
          content: `Task: ${subtask.name}\nDescription: ${subtask.description}`
        }]
      })
    });

    const data = await response.json();
    return {
      status: 'completed',
      output: data.choices[0].message.content,
      tokensUsed: data.usage ? data.usage.total_tokens : 1000,
      timestamp: new Date().toISOString()
    };
  }
}
