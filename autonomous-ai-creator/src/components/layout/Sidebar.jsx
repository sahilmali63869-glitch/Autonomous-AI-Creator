import React from 'react';
import { 
  LayoutDashboard, 
  PlusCircle, 
  ListTodo, 
  Bot, 
  GitFork, 
  FolderKanban, 
  Wrench, 
  FileCode2, 
  History, 
  Settings,
  Sparkles,
  Zap
} from 'lucide-react';

export function Sidebar({ currentTab, setCurrentTab }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'new_task', label: 'New Task', icon: PlusCircle, highlight: true },
    { id: 'tasks', label: 'My Tasks', icon: ListTodo },
    { id: 'agents', label: 'AI Agents', icon: Bot, badge: '9 Active' },
    { id: 'workflows', label: 'Workflows', icon: GitFork },
    { id: 'projects', label: 'Projects', icon: FolderKanban },
    { id: 'tools', label: 'Tools', icon: Wrench },
    { id: 'files', label: 'Files', icon: FileCode2 },
    { id: 'history', label: 'History', icon: History },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-slate-900/95 border-r border-slate-800 flex flex-col justify-between h-screen sticky top-0 z-30 select-none">
      {/* Brand Header */}
      <div>
        <div className="h-16 px-6 border-b border-slate-800/80 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-emerald-400 p-0.5 shadow-lg shadow-indigo-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-indigo-400 animate-pulse" />
            </div>
          </div>
          <div>
            <h1 className="font-bold text-white tracking-tight text-base flex items-center gap-1.5">
              Autonomous <span className="text-indigo-400">AI</span>
            </h1>
            <p className="text-[11px] font-mono text-slate-400 uppercase tracking-widest">Creator Platform</p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4 space-y-1.5 overflow-y-auto max-h-[calc(100vh-180px)]">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  item.highlight && !isActive
                    ? 'bg-indigo-600/10 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-600/20'
                    : isActive
                    ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-600/25 font-semibold'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : item.highlight ? 'text-indigo-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-indigo-300 border border-slate-700">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* System Quick Banner */}
      <div className="p-4 border-t border-slate-800/80">
        <div className="glass-card rounded-xl p-3 border border-indigo-500/20 bg-indigo-950/20">
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-300 mb-1">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Autonomous Engine</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            9 Specialized agents & intelligent mock provider active.
          </p>
        </div>
      </div>
    </aside>
  );
}
