import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Download, Search, Filter, ShieldAlert, CheckCircle2, Bot } from 'lucide-react';

export function LiveLogConsole({ logs = [], taskId }) {
  const [filterLevel, setFilterLevel] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [autoScroll, setAutoScroll] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (autoScroll && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs, autoScroll]);

  const filteredLogs = logs.filter(log => {
    if (filterLevel !== 'all' && log.level !== filterLevel) return false;
    if (searchQuery && !log.message.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const getLevelColor = (level) => {
    switch (level) {
      case 'error': return 'text-rose-400 font-bold';
      case 'warn': return 'text-amber-400 font-medium';
      case 'info': return 'text-indigo-300';
      default: return 'text-slate-300';
    }
  };

  const handleExport = () => {
    const content = logs.map(l => `[${l.timestamp}] [${l.level?.toUpperCase()}] [${l.agentId}]: ${l.message}`).join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `execution-log-${taskId || 'task'}.txt`;
    a.click();
  };

  return (
    <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden font-mono text-xs flex flex-col h-[480px]">
      {/* Console Header Toolbar */}
      <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 select-none">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-emerald-400" />
          <span className="font-semibold text-white tracking-wider text-xs">Autonomous Execution Log Stream</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-950 text-slate-400 border border-slate-800">
            {filteredLogs.length} events
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter logs..."
              className="bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1 text-[11px] text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 w-36"
            />
          </div>

          {/* Level Filter */}
          <select
            value={filterLevel}
            onChange={(e) => setFilterLevel(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-2 py-1 text-[11px] text-slate-300 focus:outline-none"
          >
            <option value="all">All Levels</option>
            <option value="info">Info</option>
            <option value="warn">Warning</option>
            <option value="error">Error</option>
          </select>

          {/* Export Button */}
          <button
            onClick={handleExport}
            className="p-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors"
            title="Export Execution Log"
          >
            <Download className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Terminal View Body */}
      <div ref={scrollRef} className="flex-1 p-4 bg-slate-950 overflow-y-auto space-y-1.5 leading-relaxed">
        {filteredLogs.length === 0 ? (
          <div className="text-slate-600 text-center py-12 italic">
            Log stream idle. Start a goal to monitor live agent execution traces.
          </div>
        ) : (
          filteredLogs.map((log, idx) => {
            const timeStr = new Date(log.timestamp || Date.now()).toLocaleTimeString();
            return (
              <div key={idx} className="flex items-start gap-3 hover:bg-slate-900/60 p-1 rounded transition-colors">
                <span className="text-slate-600 shrink-0 text-[11px]">{timeStr}</span>
                <span className={`uppercase font-bold text-[10px] px-1.5 py-0.2 rounded border shrink-0 ${
                  log.level === 'error' ? 'bg-rose-500/10 border-rose-500/30 text-rose-400' :
                  log.level === 'warn' ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' :
                  'bg-indigo-500/10 border-indigo-500/30 text-indigo-300'
                }`}>
                  {log.level || 'info'}
                </span>
                <span className="text-slate-500 font-semibold shrink-0 text-[11px]">
                  [{log.agentId || 'manager'}]
                </span>
                <span className={`flex-1 break-words ${getLevelColor(log.level)}`}>
                  {log.message}
                </span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
