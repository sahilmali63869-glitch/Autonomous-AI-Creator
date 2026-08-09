import React from 'react';
import { GoalInput } from '../components/workspace/GoalInput';
import { Badge } from '../components/common/Badge';

export function Workspace({ onSubmitGoal, isLoading }) {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="text-center space-y-2 mb-8">
        <Badge status="AI Agent Workspace Ready" />
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Autonomous AI Workspace</h1>
        <p className="text-xs text-slate-400 max-w-lg mx-auto">
          Input your vision or objective. The orchestrator will parse requirements, coordinate agents, execute subtasks, and present verified results.
        </p>
      </div>

      <GoalInput onSubmitGoal={onSubmitGoal} isLoading={isLoading} />
    </div>
  );
}
