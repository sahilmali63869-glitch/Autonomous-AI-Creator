import React, { useState } from 'react';
import { RealTimeExecution } from '../components/execution/RealTimeExecution';
import { TaskGraph } from '../components/execution/TaskGraph';
import { LiveLogConsole } from '../components/execution/LiveLogConsole';
import { ApprovalModal } from '../components/execution/ApprovalModal';
import { DeliverablePreview } from '../components/workspace/DeliverablePreview';
import { Play, Network, Terminal, CheckCircle2, ArrowLeft } from 'lucide-react';

export function TaskDetail({ task, logs, onPause, onResume, onCancel, onDecision, onForceComplete, onBack }) {
  const [activeTab, setActiveTab] = useState('live'); // 'live' | 'graph' | 'logs' | 'result'

  if (!task) {
    return (
      <div className="text-center py-12 text-slate-400">
        Task not found. <button onClick={onBack} className="text-indigo-400 underline">Return to Dashboard</button>
      </div>
    );
  }

  // Check if any subtask is awaiting approval
  const pendingApprovalSubtask = (task.subtasks || []).find(s => s.status === 'awaiting_approval');

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Bar Navigation */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Workspace</span>
        </button>

        {/* View Mode Tabs */}
        <div className="flex items-center gap-2 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs">
          {[
            { id: 'live', label: 'Live Runtime', icon: Play },
            { id: 'graph', label: 'Task Graph Tree', icon: Network },
            { id: 'logs', label: 'Execution Logs', icon: Terminal },
            { id: 'result', label: 'Final Deliverable', icon: CheckCircle2 },
          ].map(t => {
            const Icon = t.icon;
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white font-semibold shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Human Approval Modal (Pops up automatically when task is awaiting approval) */}
      <ApprovalModal
        isOpen={!!pendingApprovalSubtask}
        subtask={pendingApprovalSubtask}
        onDecision={onDecision}
      />

      {/* Tab 1: Live Execution */}
      {activeTab === 'live' && (
        <div className="space-y-6 animate-fadeIn">
          <RealTimeExecution
            task={task}
            onPause={onPause}
            onResume={onResume}
            onCancel={onCancel}
            onForceComplete={onForceComplete}
          />
          <LiveLogConsole logs={logs} taskId={task.id} />
        </div>
      )}

      {/* Tab 2: Visual Task Dependency Graph */}
      {activeTab === 'graph' && (
        <div className="animate-fadeIn">
          <TaskGraph subtasks={task.subtasks || []} />
        </div>
      )}

      {/* Tab 3: Execution Logs Console */}
      {activeTab === 'logs' && (
        <div className="animate-fadeIn">
          <LiveLogConsole logs={logs} taskId={task.id} />
        </div>
      )}

      {/* Tab 4: Final Deliverable Page */}
      {activeTab === 'result' && (
        <div className="animate-fadeIn">
          <DeliverablePreview task={task} />
        </div>
      )}
    </div>
  );
}
