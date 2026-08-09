import React from 'react';
import { Badge } from '../components/common/Badge';
import { FolderKanban, Plus, FileCode, CheckCircle2, Bot } from 'lucide-react';

export function Projects({ projects = [] }) {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center pb-2 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-indigo-400 uppercase tracking-wider font-bold">PROJECT WORKSPACE</span>
            <Badge status={`${projects.length} Active`} />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight mt-1">Saved Projects</h1>
          <p className="text-xs text-slate-400">Organized project deliverables, tasks, files, memory, and execution history.</p>
        </div>

        <button className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg flex items-center gap-2">
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map(proj => (
          <div key={proj.id} className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-base text-white">{proj.name}</h3>
                <p className="text-xs text-slate-400 mt-1">{proj.description}</p>
              </div>
              <Badge status={proj.status} />
            </div>

            <div className="grid grid-cols-4 gap-2 pt-2 text-center text-xs font-mono">
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-500 block">TASKS</span>
                <span className="font-bold text-white">{proj.taskCount || 8}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-500 block">AGENTS</span>
                <span className="font-bold text-indigo-400">{proj.agentCount || 4}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-500 block">FILES</span>
                <span className="font-bold text-emerald-400">{proj.filesCount || 12}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-500 block">STATUS</span>
                <span className="font-bold text-emerald-400">100%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
