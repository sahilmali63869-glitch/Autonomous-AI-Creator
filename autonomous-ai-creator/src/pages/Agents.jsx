import React from 'react';
import { Badge } from '../components/common/Badge';
import { Bot, CheckCircle2, Sparkles, Shield, Terminal, Star } from 'lucide-react';

export function Agents({ agents = [] }) {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center pb-2 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-indigo-400 uppercase tracking-wider font-bold">WORKFORCE DIRECTORY</span>
            <Badge status="9 Specialized Agents" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight mt-1">Autonomous AI Agent System</h1>
          <p className="text-xs text-slate-400">Specialized AI agents designed to handle architecture, research, code, design, QA, and governance.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {agents.map(agent => (
          <div key={agent.id} className="glass-panel rounded-2xl p-6 border border-slate-800 glass-card-hover space-y-4 relative overflow-hidden">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={agent.avatar}
                  alt={agent.name}
                  className="w-12 h-12 rounded-xl object-cover border border-indigo-500/30 shadow-md"
                />
                <div>
                  <h3 className="font-bold text-sm text-white">{agent.name}</h3>
                  <p className="text-xs text-indigo-400 font-mono">{agent.role}</p>
                </div>
              </div>
              <Badge status={agent.status || 'Ready'} size="sm" />
            </div>

            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
              {agent.description}
            </p>

            <div>
              <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1.5">Capabilities</span>
              <div className="flex flex-wrap gap-1.5">
                {(agent.capabilities || []).map((cap, i) => (
                  <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">
                    {cap}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
              <span>Completed: <strong className="text-white">{agent.tasksCompleted || 40}</strong></span>
              <span className="flex items-center gap-1 text-emerald-400">
                <Star className="w-3 h-3 fill-current text-amber-400" />
                {agent.successRate || 98}% Success Rate
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
