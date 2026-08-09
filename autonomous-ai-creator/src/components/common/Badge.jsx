import React from 'react';

export function Badge({ status, text, size = 'md' }) {
  let colorStyle = 'bg-slate-800 text-slate-300 border-slate-700';
  let dotStyle = 'bg-slate-400';

  const s = (status || text || '').toLowerCase();

  if (s.includes('completed') || s.includes('success') || s.includes('online')) {
    colorStyle = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
    dotStyle = 'bg-emerald-400';
  } else if (s.includes('running') || s.includes('in_progress') || s.includes('processing')) {
    colorStyle = 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30 animate-pulse';
    dotStyle = 'bg-indigo-400 animate-ping';
  } else if (s.includes('paused') || s.includes('awaiting_approval') || s.includes('pending')) {
    colorStyle = 'bg-amber-500/10 text-amber-400 border-amber-500/30';
    dotStyle = 'bg-amber-400';
  } else if (s.includes('failed') || s.includes('error') || s.includes('rejected')) {
    colorStyle = 'bg-rose-500/10 text-rose-400 border-rose-500/30';
    dotStyle = 'bg-rose-400';
  } else if (s.includes('critical') || s.includes('high')) {
    colorStyle = 'bg-purple-500/10 text-purple-400 border-purple-500/30';
    dotStyle = 'bg-purple-400';
  }

  const padding = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs';

  return (
    <span className={`inline-flex items-center gap-1.5 font-medium rounded-full border ${padding} ${colorStyle}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotStyle}`} />
      <span className="capitalize">{text || status}</span>
    </span>
  );
}
