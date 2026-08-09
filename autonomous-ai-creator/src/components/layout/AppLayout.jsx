import React from 'react';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';

export function AppLayout({ currentTab, setCurrentTab, children, searchQuery, setSearchQuery, activeAiStatus }) {
  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      <Sidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar 
          activeAiStatus={activeAiStatus} 
          onOpenSettings={() => setCurrentTab('settings')}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
