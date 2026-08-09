import React from 'react';
import { Badge } from '../components/common/Badge';
import { History as HistoryIcon, Terminal, Search, Clock } from 'lucide-react';

export function History({ logs = [] }) {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center pb-2 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-indigo-400 uppercase tracking-wider font-bold">AUDIT TRAIL</span>
            <Badge status={`${logs.length} System Logs`} />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight mt-1">Autonomous Execution History</h1>
          <p className="text-xs text-slate-400">Complete historical record of every agent action, tool invocation, and decision.</p>
        </div>
      </div>

      <div className="glass-panel rounded-2xl p-6 border border-slate-800">
        <div className="space-y-2 font-mono text-xs max-h-[600px] overflow-y-auto pr-2">
          {logs.map((log, i) => (
            <div key={i} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start gap-4">
              <span className="text-slate-500 text-[11px] shrink-0">
                {new Date(log.timestamp || Date.now()).toLocaleString()}
              </span>
              <Badge status={log.level || 'info'} size="sm" />
              <span className="text-indigo-400 font-bold shrink-0">[{log.agentId || 'manager'}]</span>
              <span className="text-slate-200 flex-1">{log.message}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
