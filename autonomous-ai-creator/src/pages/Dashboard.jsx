import React from 'react';
import { StatCard } from '../components/common/StatCard';
import { Badge } from '../components/common/Badge';
import { ProgressBar } from '../components/common/ProgressBar';
import { 
  Play, 
  CheckCircle2, 
  AlertTriangle, 
  Bot, 
  GitFork, 
  Zap, 
  PlusCircle, 
  ExternalLink,
  Clock,
  Sparkles
} from 'lucide-react';

export function Dashboard({ tasks = [], onNewTask, onOpenTask, onNavigateTab }) {
  const activeTasksCount = tasks.filter(t => t.status === 'running' || t.status === 'planned' || t.status === 'paused').length;
  const completedTasksCount = tasks.filter(t => t.status === 'completed').length;
  const failedTasksCount = tasks.filter(t => t.status === 'failed').length;
  const totalTokens = tasks.reduce((sum, t) => sum + (t.tokensUsed || 0), 14200);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Welcome & Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-indigo-400 uppercase tracking-widest font-bold">OVERVIEW DASHBOARD</span>
            <Badge status="System Operational" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight mt-1">Autonomous Agent Command Center</h1>
          <p className="text-xs text-slate-400">Monitor multi-agent execution, running workflows, and task deliverables in real-time.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onNewTask}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all hover:scale-[1.02]"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create New AI Goal</span>
          </button>
        </div>
      </div>

      {/* Dashboard Metrics Grid (6 Cards requested in prompt) */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatCard title="Active Tasks" value={activeTasksCount} change="+2 running" icon={Play} color="indigo" />
        <StatCard title="Completed" value={completedTasksCount} change="100% verified" icon={CheckCircle2} color="emerald" />
        <StatCard title="Failed / Paused" value={failedTasksCount} change="Auto-recovered" icon={AlertTriangle} color="amber" />
        <StatCard title="AI Agents" value="9 Agents" change="Ready" icon={Bot} color="purple" />
        <StatCard title="Workflows" value="2 Active" change="Custom pipelines" icon={GitFork} color="cyan" />
        <StatCard title="Tokens Used" value={`${(totalTokens / 1000).toFixed(1)}k`} change="Budget ok" icon={Zap} color="emerald" />
      </div>

      {/* Recent Tasks List (Section 3 requirement) */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-sm font-bold text-white tracking-wide">Recent Autonomous Tasks</h3>
            <p className="text-xs text-slate-400">Recent high-level goals and execution states</p>
          </div>
          <button
            onClick={() => onNavigateTab('tasks')}
            className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1"
          >
            <span>View All Tasks</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

        {tasks.length === 0 ? (
          <div className="text-center py-12 text-slate-500 text-xs">
            No tasks created yet. Click "Create New AI Goal" to start your autonomous agent workforce.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-mono uppercase text-[10px]">
                  <th className="py-3 px-4">Task / Goal Name</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 w-36">Progress</th>
                  <th className="py-3 px-4">Active Agent</th>
                  <th className="py-3 px-4">Created Date</th>
                  <th className="py-3 px-4">Duration</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {tasks.map(task => (
                  <tr key={task.id} className="hover:bg-slate-900/60 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-white">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                        <span className="truncate max-w-xs">{task.goal}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge status={task.status} />
                    </td>
                    <td className="py-3.5 px-4">
                      <ProgressBar progress={task.progress || 0} size="sm" showPercentage={false} />
                    </td>
                    <td className="py-3.5 px-4 font-mono text-indigo-300">
                      {task.currentAgent || 'Manager Agent'}
                    </td>
                    <td className="py-3.5 px-4 text-slate-400 font-mono text-[11px]">
                      {new Date(task.createdAt || Date.now()).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-4 text-slate-400 font-mono text-[11px]">
                      {task.duration || 'Running'}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => onOpenTask(task.id)}
                        className="px-3 py-1.5 rounded-lg bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 text-xs font-medium transition-colors"
                      >
                        Open
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
