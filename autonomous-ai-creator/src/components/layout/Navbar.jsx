import React, { useState } from 'react';
import { Search, Bell, Settings, User, Bot, CheckCircle2, ShieldAlert } from 'lucide-react';
import { Badge } from '../common/Badge';

export function Navbar({ activeAiStatus = 'Online', onOpenSettings, searchQuery, setSearchQuery }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const notifications = [
    { id: 1, title: 'Execution Complete', desc: 'E-Commerce Platform Launch goal achieved with 100% test pass.', time: '2m ago', icon: CheckCircle2, color: 'text-emerald-400' },
    { id: 2, title: 'Approval Required', desc: 'Developer Agent requested approval for Production Deployment.', time: '15m ago', icon: ShieldAlert, color: 'text-amber-400' },
    { id: 3, title: 'New Artifact Generated', desc: 'Designer Agent uploaded design-tokens.json to workspace.', time: '1h ago', icon: Bot, color: 'text-indigo-400' },
  ];

  return (
    <header className="h-16 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-20">
      {/* Search Bar */}
      <div className="relative w-72">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search goals, tasks, agents, files..."
          className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-4 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
        />
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        {/* AI Status Indicator */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950 border border-slate-800 text-xs">
          <Bot className="w-3.5 h-3.5 text-indigo-400" />
          <span className="text-slate-400 font-mono text-[11px]">AI Engine:</span>
          <Badge status={activeAiStatus} size="sm" />
        </div>

        {/* Notifications Button */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 relative transition-colors"
          >
            <Bell className="w-4 h-4" />
            <span className="w-2 h-2 rounded-full bg-indigo-500 absolute top-1.5 right-1.5 ring-2 ring-slate-900" />
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 glass-panel rounded-2xl p-4 shadow-2xl z-50 border border-slate-700/60 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
                <span className="font-semibold text-xs text-white">Notifications</span>
                <span className="text-[10px] font-mono text-indigo-400">3 New</span>
              </div>
              <div className="space-y-2.5">
                {notifications.map(n => {
                  const Icon = n.icon;
                  return (
                    <div key={n.id} className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-colors flex gap-3">
                      <Icon className={`w-4 h-4 mt-0.5 ${n.color}`} />
                      <div className="flex-1">
                        <div className="flex justify-between items-center text-xs font-medium text-white">
                          <span>{n.title}</span>
                          <span className="text-[10px] text-slate-500">{n.time}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">{n.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Settings Button */}
        <button
          onClick={onOpenSettings}
          className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          title="Settings"
        >
          <Settings className="w-4 h-4" />
        </button>

        {/* User Profile */}
        <div className="relative">
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-slate-800/80 transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-emerald-400 p-0.5">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                alt="User Avatar"
                className="w-full h-full rounded-[6px] object-cover"
              />
            </div>
            <div className="text-left hidden md:block">
              <p className="text-xs font-semibold text-white leading-tight">Alex Rivera</p>
              <p className="text-[10px] text-slate-400 font-mono">Senior Engineer</p>
            </div>
          </button>

          {showProfile && (
            <div className="absolute right-0 mt-2 w-56 glass-panel rounded-2xl p-3 shadow-2xl z-50 border border-slate-700/60 animate-fadeIn text-xs">
              <div className="p-2 border-b border-slate-800 mb-2">
                <p className="font-semibold text-white">Alex Rivera</p>
                <p className="text-[11px] text-slate-400">alex.rivera@ai-creator.io</p>
              </div>
              <button 
                onClick={() => { onOpenSettings(); setShowProfile(false); }}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-300 transition-colors"
              >
                Workspace Settings
              </button>
              <button 
                onClick={() => setShowProfile(false)}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-300 transition-colors"
              >
                API Credentials
              </button>
              <div className="border-t border-slate-800 mt-2 pt-2">
                <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-rose-500/10 text-rose-400 transition-colors">
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
