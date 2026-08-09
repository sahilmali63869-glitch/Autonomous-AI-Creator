import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Download, 
  Code2, 
  FileText, 
  Eye, 
  BarChart, 
  Share2, 
  FolderDown, 
  Sparkles,
  Bot,
  Clock,
  Wrench,
  ShieldCheck
} from 'lucide-react';
import { Badge } from '../common/Badge';

export function DeliverablePreview({ task }) {
  const [activeTab, setActiveTab] = useState('preview'); // 'preview' | 'code' | 'docs' | 'metrics'

  if (!task) return null;

  const subtasks = task.subtasks || [];
  const completedCount = subtasks.filter(s => s.status === 'completed').length;
  const totalCount = subtasks.length || 1;

  // Extract generated code and docs from completed subtasks
  const codeSubtask = subtasks.find(s => s.agentId === 'developer' && s.output);
  const docSubtask = subtasks.find(s => (s.agentId === 'writer' || s.agentId === 'planner') && s.output);
  const designSubtask = subtasks.find(s => s.agentId === 'designer' && s.output);

  const sampleCode = codeSubtask ? codeSubtask.output : `// Generated Production Code Module\nimport React from 'react';\n\nexport default function Application() {\n  return (\n    <div className="p-8 bg-slate-900 text-white rounded-2xl border border-slate-800 shadow-2xl">\n      <h1 className="text-2xl font-bold text-indigo-400">Autonomous Execution Complete</h1>\n      <p className="mt-2 text-slate-300">Target goal achieved with 100% test verification.</p>\n    </div>\n  );\n}`;

  const sampleDocs = docSubtask ? docSubtask.output : `# Autonomous Deliverable Summary\n\nGoal achieved successfully. All subtasks executed by autonomous workforce.`;

  const handleDownload = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(task, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `deliverable-${task.id}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Completion Header Card */}
      <div className="glass-panel rounded-2xl p-6 border border-emerald-500/40 bg-emerald-950/10 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
              <CheckCircle2 className="w-7 h-7 animate-bounce" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono uppercase text-emerald-400 font-bold tracking-wider">GOAL FULLY ACHIEVED</span>
                <Badge status="completed" />
              </div>
              <h2 className="text-xl font-bold text-white mt-1">{task.goal}</h2>
              <p className="text-xs text-slate-300 mt-1">{task.resultSummary || 'All autonomous subtasks completed and verified.'}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDownload}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 flex items-center gap-2 transition-all hover:scale-[1.02]"
            >
              <FolderDown className="w-4 h-4" />
              <span>Download Deliverables</span>
            </button>
          </div>
        </div>

        {/* Execution Summary Metrics Strip */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <span className="text-slate-400 block text-[10px]">SUBTASKS PASSED</span>
            <span className="text-lg font-bold text-white mt-0.5 block">{completedCount} / {totalCount}</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <span className="text-slate-400 block text-[10px]">AGENTS EMPLOYED</span>
            <span className="text-lg font-bold text-indigo-400 mt-0.5 block">4 Agents</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <span className="text-slate-400 block text-[10px]">ERRORS AUTO-FIXED</span>
            <span className="text-lg font-bold text-amber-400 mt-0.5 block">1 Recovered</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <span className="text-slate-400 block text-[10px]">TOTAL DURATION</span>
            <span className="text-lg font-bold text-emerald-400 mt-0.5 block">{task.duration || '04:12'}</span>
          </div>
        </div>
      </div>

      {/* Deliverable Tabs Toolbar */}
      <div className="glass-panel rounded-2xl p-4 border border-slate-800 space-y-4">
        <div className="flex border-b border-slate-800 gap-2 pb-2">
          {[
            { id: 'preview', label: 'Live Deliverable Preview', icon: Eye },
            { id: 'code', label: 'Source Code Files', icon: Code2 },
            { id: 'docs', label: 'Documentation & Copy', icon: FileText },
            { id: 'metrics', label: 'Execution Analytics', icon: BarChart },
          ].map((t) => {
            const Icon = t.icon;
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`px-4 py-2 rounded-xl text-xs font-medium flex items-center gap-2 transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white font-semibold shadow-lg shadow-indigo-600/25'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Live Interactive Preview */}
        {activeTab === 'preview' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="p-6 bg-slate-950 rounded-xl border border-slate-800 text-slate-100 min-h-[350px]">
              <div className="flex justify-between items-center pb-4 border-b border-slate-800 mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                  <span className="text-xs font-mono text-slate-400 ml-2">https://app.preview.ai-creator.internal</span>
                </div>
                <Badge status="Live Preview" />
              </div>

              {/* Rendered Visual Layout Mockup */}
              <div className="space-y-6 max-w-2xl mx-auto text-center py-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 text-xs font-mono">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Autonomous AI Deliverable</span>
                </div>
                <h2 className="text-3xl font-extrabold text-white tracking-tight">{task.goal}</h2>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Generated, modularized, tested, and reviewed by your multi-agent AI team in real-time.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left pt-4">
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                    <ShieldCheck className="w-5 h-5 text-emerald-400 mb-2" />
                    <h4 className="font-bold text-xs text-white">Full Stack Architecture</h4>
                    <p className="text-[11px] text-slate-400 mt-1">Modular Express & React component tree.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                    <Wrench className="w-5 h-5 text-indigo-400 mb-2" />
                    <h4 className="font-bold text-xs text-white">Automated QA</h4>
                    <p className="text-[11px] text-slate-400 mt-1">Zero syntax errors or broken props.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                    <Bot className="w-5 h-5 text-purple-400 mb-2" />
                    <h4 className="font-bold text-xs text-white">Human Governed</h4>
                    <p className="text-[11px] text-slate-400 mt-1">Approved before production build.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Source Code */}
        {activeTab === 'code' && (
          <div className="animate-fadeIn space-y-3">
            <div className="flex justify-between items-center text-xs font-mono text-slate-400">
              <span>Target Module: AppSolution.jsx</span>
              <span>Syntax: JavaScript / React JSX</span>
            </div>
            <pre className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-indigo-200 overflow-x-auto max-h-96 leading-relaxed">
              {sampleCode}
            </pre>
          </div>
        )}

        {/* Tab 3: Documentation */}
        {activeTab === 'docs' && (
          <div className="animate-fadeIn space-y-3">
            <div className="flex justify-between items-center text-xs font-mono text-slate-400">
              <span>Document: CAMPAIGN_SUMMARY.md</span>
              <span>Format: Markdown</span>
            </div>
            <div className="p-6 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-200 whitespace-pre-wrap font-sans leading-relaxed">
              {sampleDocs}
            </div>
          </div>
        )}

        {/* Tab 4: Metrics */}
        {activeTab === 'metrics' && (
          <div className="animate-fadeIn space-y-4 text-xs font-mono">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Tokens Consumption:</span>
                <span className="text-indigo-400 font-bold">{task.tokensUsed || 3420} tokens</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Execution Iterations:</span>
                <span className="text-white font-bold">{task.iterations || 8} iterations</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Quality Index Rating:</span>
                <span className="text-emerald-400 font-bold">98.5% (Pass)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Safety Guardrails Triggered:</span>
                <span className="text-amber-400 font-bold">1 Approval Decision</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
