import React from 'react';
import { Badge } from '../components/common/Badge';
import { Wrench, Shield, CheckCircle2, FileCode, Search, Terminal, Database, Globe, Image as ImageIcon } from 'lucide-react';

export function Tools({ tools = [] }) {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center pb-2 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-indigo-400 uppercase tracking-wider font-bold">TOOL ECOSYSTEM</span>
            <Badge status="9 Built-in Tools" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight mt-1">Modular Tool Architecture</h1>
          <p className="text-xs text-slate-400">Tools accessible by agents for web search, file I/O, code execution, DB queries, and image generation.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tools.map(tool => (
          <div key={tool.name} className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400">
                  <Wrench className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">{tool.name}</h3>
                  <span className="text-[10px] font-mono text-slate-400 uppercase">{tool.permissions || 'Sandboxed'}</span>
                </div>
              </div>
              <Badge status="Active" size="sm" />
            </div>

            <p className="text-xs text-slate-300 bg-slate-950/60 p-3 rounded-xl border border-slate-800 leading-relaxed">
              {tool.description}
            </p>

            <div className="pt-2 text-[11px] font-mono text-slate-400">
              <span className="block mb-1 text-indigo-300">Input Schema:</span>
              <pre className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-[10px] text-slate-300 overflow-x-auto">
                {JSON.stringify(tool.inputSchema || { type: 'object' }, null, 2)}
              </pre>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
