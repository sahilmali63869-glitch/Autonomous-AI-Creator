import React from 'react';

export function ProgressBar({ progress = 0, showPercentage = true, size = 'md', color = 'indigo' }) {
  const clamped = Math.max(0, Math.min(100, progress));
  
  let height = 'h-2.5';
  if (size === 'sm') height = 'h-1.5';
  if (size === 'lg') height = 'h-4';

  let barColor = 'bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400';
  if (color === 'emerald') barColor = 'bg-emerald-500';
  if (color === 'amber') barColor = 'bg-amber-500';
  if (color === 'rose') barColor = 'bg-rose-500';

  return (
    <div className="w-full">
      {showPercentage && (
        <div className="flex justify-between items-center text-xs text-slate-400 mb-1.5 font-mono">
          <span>Execution Progress</span>
          <span className="text-indigo-300 font-semibold">{clamped}%</span>
        </div>
      )}
      <div className={`w-full bg-slate-800/80 rounded-full overflow-hidden ${height} p-0.5 border border-slate-700/50 shadow-inner`}>
        <div
          className={`${height} rounded-full ${barColor} transition-all duration-500 ease-out relative overflow-hidden`}
          style={{ width: `${clamped}%` }}
        >
          {/* Animated shine line */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
        </div>
      </div>
    </div>
  );
}
