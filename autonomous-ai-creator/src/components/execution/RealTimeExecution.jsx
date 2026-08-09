import React, { useEffect, useState } from 'react';
import { ProgressBar } from '../common/ProgressBar';
import { Badge } from '../common/Badge';
import { Play, Pause, Square, Bot, Clock, Sparkles, CheckCircle2, AlertTriangle, ShieldAlert } from 'lucide-react';

export function RealTimeExecution({ task, onPause, onResume, onCancel }) {
  const [elapsedSec, setElapsedSec] = useState(0);

  useEffect(() => {
    let interval = null;
    if (task && task.status === 'running') {
      interval = setInterval(() => {
        setElapsedSec(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [task?.status]);

  const formatTimer = (sec) => {
    const mins = Math.floor(sec / 60);
    const remainder = sec % 60;
    return `${String(mins).padStart(2, '0')}:${String(remainder).padStart(2, '0')}`;
  };

  if (!task) return null;

  const subtasks = task.subtasks || [];
  const currentAgent = task.currentAgent || 'Autonomous AI Manager';
  const currentAction = task.currentAction || 'Orchestrating subtasks...';
  const progress = task.progress || 0;

  return (
    <div className="glass-panel rounded-2xl p-6 border border-slate-700/80 shadow-2xl space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-indigo-400 uppercase tracking-widest font-bold">AUTONOMOUS AI RUNTIME</span>
            <Badge status={task.status} />
          </div>
          <h2 className="text-xl font-bold text-white mt-1 tracking-tight">{task.goal}</h2>
        </div>

        {/* Timer & Controls */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono">
            <Clock className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-slate-400">Elapsed:</span>
            <span className="text-white font-bold">{formatTimer(elapsedSec)}</span>
          </div>

          <div className="flex items-center gap-2">
            {task.status === 'running' ? (
              <button
                onClick={onPause}
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 transition-colors"
                title="Pause Execution"
              >
                <Pause className="w-4 h-4 fill-current" />
              </button>
            ) : (
              <button
                onClick={onResume}
                className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg transition-colors"
                title="Resume Execution"
              >
                <Play className="w-4 h-4 fill-current" />
              </button>
            )}

            {onForceComplete && task.status !== 'completed' && (
              <button
                onClick={onForceComplete}
                className="px-3 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/40 text-xs font-semibold transition-all flex items-center gap-1.5"
                title="Force Complete Goal"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Force Complete</span>
              </button>
            )}

            <button
              onClick={onCancel}
              className="p-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 transition-colors"
              title="Stop Execution"
            >
              <Square className="w-4 h-4 fill-current" />
            </button>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <ProgressBar progress={progress} size="lg" />

      {/* Current Active Agent & Action Box */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="glass-card p-4 rounded-xl border border-indigo-500/30 flex items-center gap-4 bg-indigo-950/20">
          <div className="w-12 h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 shadow-lg animate-pulse-glow">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-indigo-300 uppercase tracking-wider">Active Agent</span>
            <h4 className="text-sm font-bold text-white">{currentAgent}</h4>
            <p className="text-xs text-slate-400 mt-0.5">Specialized autonomous worker</p>
          </div>
        </div>

        <div className="glass-card p-4 rounded-xl border border-slate-800 flex items-center gap-4 bg-slate-950/60">
          <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-emerald-400">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <div className="overflow-hidden">
            <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider">Current Action</span>
            <p className="text-xs font-mono text-slate-200 truncate mt-0.5">{currentAction}</p>
            <p className="text-[11px] text-slate-500">Processing live state...</p>
          </div>
        </div>
      </div>

      {/* Execution Subtask Checklist */}
      <div className="space-y-2 pt-2">
        <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wider">Subtask Execution Progress</h4>
        <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
          {subtasks.map((st) => (
            <div
              key={st.id}
              className={`p-3 rounded-xl border text-xs flex items-center justify-between transition-colors ${
                st.status === 'completed'
                  ? 'bg-slate-950/40 border-slate-800 text-slate-300'
                  : st.status === 'in_progress'
                  ? 'bg-indigo-950/40 border-indigo-500/50 text-indigo-200'
                  : st.status === 'awaiting_approval'
                  ? 'bg-amber-950/40 border-amber-500/50 text-amber-200'
                  : st.status === 'failed'
                  ? 'bg-rose-950/40 border-rose-500/50 text-rose-200'
                  : 'bg-slate-950/20 border-slate-800/60 text-slate-500'
              }`}
            >
              <div className="flex items-center gap-3">
                {st.status === 'completed' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                {st.status === 'in_progress' && <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping shrink-0" />}
                {st.status === 'awaiting_approval' && <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />}
                {st.status === 'failed' && <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />}
                {st.status === 'pending' && <span className="w-2 h-2 rounded-full bg-slate-700 shrink-0" />}

                <div>
                  <span className="font-semibold text-slate-200">{st.name}</span>
                  {st.description && <p className="text-[11px] text-slate-400 line-clamp-1">{st.description}</p>}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                  {st.agentId}
                </span>
                <Badge status={st.status} size="sm" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
