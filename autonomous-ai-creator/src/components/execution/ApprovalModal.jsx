import React from 'react';
import { Modal } from '../common/Modal';
import { ShieldAlert, CheckCircle, XCircle, AlertTriangle, Lock } from 'lucide-react';

export function ApprovalModal({ isOpen, subtask, onDecision }) {
  if (!subtask) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {}}
      title="Human Governance Approval Required"
      maxWidth="max-w-lg"
    >
      <div className="space-y-6">
        {/* Warning Banner */}
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex gap-3 text-amber-300">
          <ShieldAlert className="w-6 h-6 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider">High Impact Action Flagged</h4>
            <p className="text-xs text-amber-200/90 mt-1 leading-relaxed">
              The AI Manager has paused autonomous execution because the next step requires explicit human confirmation.
            </p>
          </div>
        </div>

        {/* Action Details */}
        <div className="space-y-3 glass-card p-4 rounded-xl border border-slate-800 text-xs">
          <div>
            <span className="text-slate-400 font-mono text-[11px] uppercase">Target Operation:</span>
            <p className="font-bold text-white text-sm mt-0.5">{subtask.name}</p>
          </div>

          <div>
            <span className="text-slate-400 font-mono text-[11px] uppercase">AI Reason & Justification:</span>
            <p className="text-slate-300 mt-0.5 bg-slate-950 p-2.5 rounded-lg border border-slate-800 leading-relaxed font-mono">
              {subtask.approvalReason || subtask.description || 'This operation modifies production configuration or state.'}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800">
            <div>
              <span className="text-slate-400 font-mono text-[11px]">Requesting Agent:</span>
              <p className="font-semibold text-indigo-400 capitalize">{subtask.agentId} Agent</p>
            </div>
            <div>
              <span className="text-slate-400 font-mono text-[11px]">Risk Assessment:</span>
              <p className="font-semibold text-rose-400 uppercase">High Sensitivity</p>
            </div>
          </div>
        </div>

        {/* Action Decision Buttons */}
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={() => onDecision(subtask.id, 'reject')}
            className="flex-1 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-rose-400 font-semibold border border-rose-500/30 text-xs flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
          >
            <XCircle className="w-4 h-4" />
            <span>Reject Operation</span>
          </button>

          <button
            onClick={() => onDecision(subtask.id, 'approve')}
            className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
          >
            <CheckCircle className="w-4 h-4" />
            <span>Approve & Continue</span>
          </button>
        </div>
      </div>
    </Modal>
  );
}
