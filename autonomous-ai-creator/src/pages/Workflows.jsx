import React from 'react';
import { WorkflowBuilder } from '../components/workflow/WorkflowBuilder';

export function Workflows({ workflows = [], onSaveWorkflow, onRunWorkflow }) {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <WorkflowBuilder
        workflows={workflows}
        onSaveWorkflow={onSaveWorkflow}
        onRunWorkflow={onRunWorkflow}
      />
    </div>
  );
}
