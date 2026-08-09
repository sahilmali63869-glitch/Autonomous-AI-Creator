import React, { useState } from 'react';
import { Plus, Trash2, ArrowRight, Play, Save, Copy, Sparkles, Bot, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { Badge } from '../common/Badge';

export function WorkflowBuilder({ workflows = [], onSaveWorkflow, onRunWorkflow }) {
  const [activeWorkflow, setActiveWorkflow] = useState(workflows[0] || {
    id: 'wf-custom',
    name: 'Custom Agent Pipeline',
    description: 'User created autonomous agent pipeline sequence.',
    nodes: [
      { id: 'n1', agent: 'planner', name: 'Plan Objective' },
      { id: 'n2', agent: 'research', name: 'Gather Knowledge' },
      { id: 'n3', agent: 'developer', name: 'Generate Code Assets' },
      { id: 'n4', agent: 'testing', name: 'Run QA Checks' },
      { id: 'n5', agent: 'reviewer', name: 'Final Review & Approval' }
    ]
  });

  const [workflowName, setWorkflowName] = useState(activeWorkflow.name);
  const [workflowDesc, setWorkflowDesc] = useState(activeWorkflow.description);
  const [nodes, setNodes] = useState(activeWorkflow.nodes);

  const availableAgents = [
    { id: 'planner', name: 'Planner Agent' },
    { id: 'research', name: 'Research Agent' },
    { id: 'designer', name: 'Designer Agent' },
    { id: 'developer', name: 'Developer Agent' },
    { id: 'writer', name: 'Writer Agent' },
    { id: 'data', name: 'Data Agent' },
    { id: 'testing', name: 'Testing Agent' },
    { id: 'reviewer', name: 'Reviewer Agent' }
  ];

  const handleAddNode = (agentId) => {
    const agentObj = availableAgents.find(a => a.id === agentId);
    const newNode = {
      id: 'node-' + Date.now(),
      agent: agentId,
      name: agentObj ? agentObj.name : 'Custom Step'
    };
    setNodes([...nodes, newNode]);
  };

  const handleRemoveNode = (nodeId) => {
    setNodes(nodes.filter(n => n.id !== nodeId));
  };

  const handleSave = () => {
    const updated = {
      ...activeWorkflow,
      name: workflowName,
      description: workflowDesc,
      nodes
    };
    if (onSaveWorkflow) onSaveWorkflow(updated);
  };

  return (
    <div className="space-y-6">
      {/* Workflow Header Controls */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-indigo-400 uppercase tracking-wider font-bold">VISUAL WORKFLOW BUILDER</span>
            <Badge status="Builder Active" />
          </div>
          <input
            type="text"
            value={workflowName}
            onChange={(e) => setWorkflowName(e.target.value)}
            className="text-xl font-bold bg-transparent text-white border-b border-transparent hover:border-slate-700 focus:border-indigo-500 focus:outline-none mt-1 w-full max-w-md"
          />
          <input
            type="text"
            value={workflowDesc}
            onChange={(e) => setWorkflowDesc(e.target.value)}
            className="text-xs text-slate-400 bg-transparent border-b border-transparent hover:border-slate-700 focus:border-indigo-500 focus:outline-none mt-1 w-full max-w-lg"
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center gap-2 transition-colors"
          >
            <Save className="w-4 h-4 text-indigo-400" />
            <span>Save Workflow</span>
          </button>

          <button
            onClick={() => onRunWorkflow && onRunWorkflow(activeWorkflow)}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all hover:scale-[1.02]"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Run Workflow</span>
          </button>
        </div>
      </div>

      {/* Visual Canvas Node Chain */}
      <div className="glass-panel rounded-2xl p-8 border border-slate-800 overflow-x-auto min-h-[300px] flex items-center justify-center">
        <div className="flex items-center gap-4 py-6 px-4 min-w-max">
          {/* Trigger Node */}
          <div className="p-4 rounded-xl bg-indigo-950/60 border border-indigo-500/50 text-indigo-300 text-xs text-center w-40 shadow-lg">
            <Sparkles className="w-5 h-5 mx-auto mb-1 text-indigo-400 animate-pulse" />
            <span className="font-bold block text-white">Trigger</span>
            <span className="text-[10px] text-indigo-300/80 font-mono">User Goal Input</span>
          </div>

          <ArrowRight className="w-5 h-5 text-indigo-400 shrink-0" />

          {/* Node Sequence */}
          {nodes.map((node, idx) => (
            <React.Fragment key={node.id}>
              <div className="p-4 rounded-xl glass-card border border-slate-700/80 hover:border-indigo-500 text-xs text-center w-48 shadow-xl relative group transition-all">
                <button
                  onClick={() => handleRemoveNode(node.id)}
                  className="absolute -top-2 -right-2 p-1 rounded-full bg-slate-900 border border-rose-500/50 text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Remove Node"
                >
                  <Trash2 className="w-3 h-3" />
                </button>

                <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mx-auto mb-2">
                  <Bot className="w-4 h-4" />
                </div>
                <span className="font-bold block text-white truncate">{node.name}</span>
                <span className="text-[10px] font-mono text-indigo-300 uppercase block mt-0.5">{node.agent} Agent</span>
              </div>

              {idx < nodes.length - 1 && <ArrowRight className="w-5 h-5 text-slate-600 shrink-0" />}
            </React.Fragment>
          ))}

          <ArrowRight className="w-5 h-5 text-slate-600 shrink-0" />

          {/* Output Node */}
          <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 text-xs text-center w-40 shadow-lg">
            <CheckCircle2 className="w-5 h-5 mx-auto mb-1 text-emerald-400" />
            <span className="font-bold block text-white">Final Output</span>
            <span className="text-[10px] text-emerald-300/80 font-mono">Verified Deliverables</span>
          </div>
        </div>
      </div>

      {/* Add Nodes Palette */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-3">
        <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wider">Add Agent Node to Pipeline</h4>
        <div className="flex flex-wrap gap-2">
          {availableAgents.map(a => (
            <button
              key={a.id}
              onClick={() => handleAddNode(a.id)}
              className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-medium flex items-center gap-2 transition-colors"
            >
              <Plus className="w-3.5 h-3.5 text-indigo-400" />
              <span>{a.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
