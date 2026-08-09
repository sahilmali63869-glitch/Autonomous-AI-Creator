import React, { useState } from 'react';
import { Badge } from '../components/common/Badge';
import { Settings as SettingsIcon, Save, Key, ShieldCheck, Zap, Bot } from 'lucide-react';

export function Settings({ settings = {}, onSaveSettings }) {
  const [formData, setFormData] = useState({
    aiProvider: settings.aiProvider || 'mock',
    geminiApiKey: settings.geminiApiKey || '',
    openaiApiKey: settings.openaiApiKey || '',
    anthropicApiKey: settings.anthropicApiKey || '',
    maxIterations: settings.maxIterations || 25,
    maxRetries: settings.maxRetries || 3,
    maxExecutionTimeSec: settings.maxExecutionTimeSec || 600,
    tokenBudget: settings.tokenBudget || 100000,
    requireApprovalDefault: settings.requireApprovalDefault !== false,
  });

  const [savedMessage, setSavedMessage] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveSettings(formData);
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center pb-2 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-indigo-400 uppercase tracking-wider font-bold">PLATFORM CONFIGURATION</span>
            <Badge status="Active Configuration" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight mt-1">AI Provider & Safety Settings</h1>
          <p className="text-xs text-slate-400">Configure LLM providers, API keys, and autonomous safety guardrails.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: AI Provider Selection */}
        <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-white">
            <Bot className="w-5 h-5 text-indigo-400" />
            <span>AI LLM Provider Abstraction</span>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Active AI Provider</label>
            <select
              value={formData.aiProvider}
              onChange={(e) => setFormData({ ...formData, aiProvider: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 font-mono"
            >
              <option value="mock">Built-in Intelligent Mock AI Provider (Zero Config / Local Out-of-the-box)</option>
              <option value="gemini">Google Gemini API (Gemini 1.5 Flash / Pro)</option>
              <option value="openai">OpenAI API (GPT-4o / GPT-4o-mini)</option>
              <option value="anthropic">Anthropic API (Claude 3.5 Sonnet)</option>
            </select>
          </div>

          {formData.aiProvider === 'gemini' && (
            <div className="pt-2 animate-fadeIn">
              <label className="block text-xs font-medium text-slate-300 mb-1">Gemini API Key</label>
              <input
                type="password"
                value={formData.geminiApiKey}
                onChange={(e) => setFormData({ ...formData, geminiApiKey: e.target.value })}
                placeholder="AIzaSy..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 font-mono"
              />
            </div>
          )}

          {formData.aiProvider === 'openai' && (
            <div className="pt-2 animate-fadeIn">
              <label className="block text-xs font-medium text-slate-300 mb-1">OpenAI API Key</label>
              <input
                type="password"
                value={formData.openaiApiKey}
                onChange={(e) => setFormData({ ...formData, openaiApiKey: e.target.value })}
                placeholder="sk-proj-..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 font-mono"
              />
            </div>
          )}
        </div>

        {/* Section 2: Autonomous Guardrails */}
        <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-white">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>Autonomous Guardrails & Limits</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Max Iterations Cap</label>
              <input
                type="number"
                value={formData.maxIterations}
                onChange={(e) => setFormData({ ...formData, maxIterations: parseInt(e.target.value) || 25 })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Max Auto-Retries</label>
              <input
                type="number"
                value={formData.maxRetries}
                onChange={(e) => setFormData({ ...formData, maxRetries: parseInt(e.target.value) || 3 })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Max Execution Time (seconds)</label>
              <input
                type="number"
                value={formData.maxExecutionTimeSec}
                onChange={(e) => setFormData({ ...formData, maxExecutionTimeSec: parseInt(e.target.value) || 600 })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Token Budget Limit</label>
              <input
                type="number"
                value={formData.tokenBudget}
                onChange={(e) => setFormData({ ...formData, tokenBudget: parseInt(e.target.value) || 100000 })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 font-mono"
              />
            </div>
          </div>

          <div className="pt-2 flex items-center gap-3">
            <input
              type="checkbox"
              id="requireApproval"
              checked={formData.requireApprovalDefault}
              onChange={(e) => setFormData({ ...formData, requireApprovalDefault: e.target.checked })}
              className="w-4 h-4 rounded bg-slate-950 border-slate-800 text-indigo-600 focus:ring-indigo-500"
            />
            <label htmlFor="requireApproval" className="text-xs text-slate-300 cursor-pointer">
              Enforce Human Approval Modals on High-Impact / Sensitive Operations
            </label>
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center gap-4">
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all hover:scale-[1.02]"
          >
            <Save className="w-4 h-4" />
            <span>Save Configuration</span>
          </button>

          {savedMessage && (
            <span className="text-xs text-emerald-400 font-mono animate-fadeIn">
              ✓ Settings saved successfully!
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
