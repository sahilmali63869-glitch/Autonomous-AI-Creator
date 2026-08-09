import React from 'react';

export function StatCard({ title, value, change, icon: Icon, color = 'indigo' }) {
  const colorMap = {
    indigo: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
    emerald: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    amber: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    rose: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
    purple: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    cyan: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
  };

  const selectedColor = colorMap[color] || colorMap.indigo;

  return (
    <div className="glass-card glass-card-hover rounded-xl p-5 border flex flex-col justify-between">
      <div className="flex justify-between items-start">
        <span className="text-sm font-medium text-slate-400">{title}</span>
        {Icon && (
          <div className={`p-2.5 rounded-lg border ${selectedColor}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
      <div className="mt-4 flex items-baseline justify-between">
        <span className="text-2xl font-bold text-white tracking-tight">{value}</span>
        {change && (
          <span className={`text-xs font-medium ${change.startsWith('+') ? 'text-emerald-400' : 'text-slate-400'}`}>
            {change}
          </span>
        )}
      </div>
    </div>
  );
}
