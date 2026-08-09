import React from 'react';
import { 
  Sparkles, 
  Bot, 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  ShieldCheck, 
  Code2, 
  FileCode, 
  Layout, 
  BrainCircuit, 
  Play 
} from 'lucide-react';

export function LandingPage({ onEnterApp }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-600 selection:text-white">
      {/* Hero Section */}
      <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-emerald-400 p-0.5 shadow-lg shadow-indigo-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-indigo-400 animate-pulse" />
            </div>
          </div>
          <span className="font-bold text-lg text-white tracking-tight">Autonomous <span className="text-indigo-400">AI</span> Creator</span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={onEnterApp}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all hover:scale-[1.02]"
          >
            <span>Launch Platform Workspace</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="relative px-6 py-24 text-center overflow-hidden max-w-5xl mx-auto">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 text-xs font-mono mb-6">
          <Zap className="w-4 h-4 text-amber-400" />
          <span>Next-Generation Autonomous AI Workforce</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
          Turn High-Level Goals into <br />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
            Fully Executed Deliverables
          </span>
        </h1>

        <p className="mt-6 text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Not just a chatbot. An autonomous AI team that plans tasks, coordinates 9 specialized agents, runs tools, fixes errors, and delivers verified results.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onEnterApp}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold text-sm shadow-2xl shadow-indigo-600/40 flex items-center gap-3 transition-all hover:scale-105"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>Enter AI Creator Workspace</span>
          </button>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 text-left">
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3">
            <BrainCircuit className="w-8 h-8 text-indigo-400" />
            <h3 className="text-base font-bold text-white">Autonomous Planning</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Decomposes complex goals into multi-step execution graphs with dependency mapping.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3">
            <Bot className="w-8 h-8 text-purple-400" />
            <h3 className="text-base font-bold text-white">9 Specialized Agents</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Planner, Research, Developer, Designer, Writer, Data, Testing, Reviewer, and Manager.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3">
            <ShieldCheck className="w-8 h-8 text-emerald-400" />
            <h3 className="text-base font-bold text-white">Human Governance</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Interactive approval modals pause execution before destructive or high-impact actions.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
