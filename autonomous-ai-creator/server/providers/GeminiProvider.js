import { AIProvider } from './AIProvider.js';

export class GeminiProvider extends AIProvider {
  constructor(apiKey) {
    super('Google Gemini');
    this.apiKey = apiKey;
  }

  async generatePlan(goal, context = {}) {
    if (!this.apiKey) {
      throw new Error('Gemini API key is required');
    }
    // Standard Gemini REST call implementation fallback
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `You are an AI Planner agent. Decompose this goal into a JSON array of 5-8 subtasks:
Goal: "${goal}"
Return ONLY raw JSON with schema:
{
  "subtasks": [
    {
      "id": "subtask-1",
      "name": "Task name",
      "description": "Task description",
      "agentId": "planner|research|developer|designer|writer|data|testing|reviewer",
      "dependencies": [],
      "priority": "high|medium|low",
      "requiresApproval": false
    }
  ]
}`
          }]
        }]
      })
    });

    const data = await response.json();
    try {
      const text = data.candidates[0].content.parts[0].text;
      const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleanJson);
      return {
        goal,
        summary: `Plan generated using Gemini 1.5 Flash.`,
        subtasks: parsed.subtasks || []
      };
    } catch (e) {
      throw new Error('Failed to parse Gemini response: ' + e.message);
    }
  }

  async executeTask(subtask, agent, context = {}) {
    if (!this.apiKey) throw new Error('Gemini API key missing');
    const prompt = `You are ${agent.name} (${agent.role}).
Task: ${subtask.name}
Description: ${subtask.description}
Goal Context: ${context.goal || ''}

Provide your complete, professional execution output:`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });

    const data = await response.json();
    const output = data.candidates[0].content.parts[0].text;

    return {
      status: 'completed',
      output,
      tokensUsed: 1200,
      timestamp: new Date().toISOString()
    };
  }
}
