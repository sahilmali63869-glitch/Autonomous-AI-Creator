import React, { useState } from 'react';
import { 
  Sparkles, 
  Upload, 
  Image as ImageIcon, 
  Link as LinkIcon, 
  Sliders, 
  Play, 
  FileText, 
  Save, 
  ShoppingBag, 
  Megaphone, 
  BarChart3, 
  Code2 
} from 'lucide-react';

export function GoalInput({ onSubmitGoal, isLoading }) {
  const [goal, setGoal] = useState('');
  const [url, setUrl] = useState('');
  const [outputFormat, setOutputFormat] = useState('full_app');
  const [instructions, setInstructions] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const presets = [
    {
      title: 'E-Commerce Platform',
      prompt: 'Build a complete e-commerce website for a fashion clothing brand with product catalog, cart drawer, and checkout.',
      icon: ShoppingBag,
      color: 'from-indigo-500/20 to-purple-500/20 text-indigo-400'
    },
    {
      title: 'Marketing Campaign',
      prompt: 'Create a complete marketing campaign for my new AI SaaS product, including landing page copy, ad graphics, and 5 email sequence.',
      icon: Megaphone,
      color: 'from-emerald-500/20 to-teal-500/20 text-emerald-400'
    },
    {
      title: 'Analytics Dashboard',
      prompt: 'Analyze sales dataset and build an interactive React data visualization dashboard with KPIs and trend charts.',
      icon: BarChart3,
      color: 'from-amber-500/20 to-orange-500/20 text-amber-400'
    },
    {
      title: 'API & Tech Spec',
      prompt: 'Architect and write complete technical documentation, OpenAPI 3.0 specification, and Node.js database models for a payment app.',
      icon: Code2,
      color: 'from-purple-500/20 to-pink-500/20 text-purple-400'
    }
  ];

  const handleStart = (mode = 'execute') => {
    if (!goal.trim()) return;
    onSubmitGoal({
      goal,
      url,
      outputFormat,
      instructions,
      files: uploadedFiles,
      mode
    });
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files || []);
    setUploadedFiles(prev => [...prev, ...files.map(f => f.name)]);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Workspace Goal Card */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-700/80 shadow-2xl relative overflow-hidden">
        {/* Glow effect background */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-wide">Tell your AI what you want to accomplish</h2>
            <p className="text-xs text-slate-400">Your autonomous AI workforce will plan, execute, test, and deliver the final result.</p>
          </div>
        </div>

        {/* Text Prompt Area */}
        <div className="relative">
          <textarea
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="E.g., Build a complete e-commerce website for a clothing brand, or create a full marketing campaign..."
            rows={5}
            className="w-full bg-slate-950/90 border border-slate-800 rounded-xl p-4 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors shadow-inner resize-none font-sans"
          />

          {/* Preset Buttons */}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Presets:</span>
            {presets.map((p, idx) => {
              const Icon = p.icon;
              return (
                <button
                  key={idx}
                  onClick={() => setGoal(p.prompt)}
                  className={`text-xs px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white flex items-center gap-1.5 transition-all ${p.color}`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{p.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Attachments Toolbar */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* File Upload */}
            <label className="cursor-pointer text-xs px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 flex items-center gap-2 transition-colors">
              <Upload className="w-3.5 h-3.5 text-indigo-400" />
              <span>Attach File</span>
              <input type="file" multiple onChange={handleFileUpload} className="hidden" />
            </label>

            {/* Image Upload */}
            <label className="cursor-pointer text-xs px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 flex items-center gap-2 transition-colors">
              <ImageIcon className="w-3.5 h-3.5 text-emerald-400" />
              <span>Image Specs</span>
              <input type="file" accept="image/*" className="hidden" />
            </label>

            {/* URL Input */}
            <div className="relative">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Target URL / Docs link..."
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 w-48 focus:w-64 focus:outline-none focus:border-indigo-500 transition-all"
              />
            </div>

            {/* Additional Options Toggle */}
            <button
              onClick={() => setShowOptions(!showOptions)}
              className={`text-xs px-3 py-2 rounded-xl border flex items-center gap-1.5 transition-colors ${
                showOptions ? 'bg-indigo-600/20 text-indigo-300 border-indigo-500/40' : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Instructions</span>
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleStart('plan_only')}
              disabled={isLoading || !goal.trim()}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 disabled:opacity-50 transition-all flex items-center gap-2"
            >
              <FileText className="w-4 h-4 text-indigo-400" />
              <span>Create Plan</span>
            </button>

            <button
              onClick={() => handleStart('execute')}
              disabled={isLoading || !goal.trim()}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 disabled:opacity-50 transition-all flex items-center gap-2 hover:scale-[1.02]"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{isLoading ? 'Autonomous Engine Starting...' : 'Start Autonomous AI'}</span>
            </button>
          </div>
        </div>

        {/* Uploaded File Tags */}
        {uploadedFiles.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2 pt-3 border-t border-slate-800/60">
            {uploadedFiles.map((fn, i) => (
              <span key={i} className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-indigo-950/60 text-indigo-300 border border-indigo-800/50 flex items-center gap-1.5">
                <Upload className="w-3 h-3" />
                {fn}
              </span>
            ))}
          </div>
        )}

        {/* Custom Instructions Drawer */}
        {showOptions && (
          <div className="mt-4 pt-4 border-t border-slate-800 space-y-4 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Expected Output Format</label>
                <select
                  value={outputFormat}
                  onChange={(e) => setOutputFormat(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                >
                  <option value="full_app">Full Stack Web Application</option>
                  <option value="marketing">Marketing Campaign & Copy</option>
                  <option value="code">Source Code Module</option>
                  <option value="doc">Technical Documentation & PDF</option>
                  <option value="data">Data Analysis & Schema</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Custom Constraints / Guidelines</label>
                <input
                  type="text"
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  placeholder="E.g., Must use Tailwind CSS, WCAG AA accessibility..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
