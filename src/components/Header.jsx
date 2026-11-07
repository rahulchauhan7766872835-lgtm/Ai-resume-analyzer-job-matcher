import React from 'react';
import { Sparkles, FileText, Key, RotateCcw, CheckCircle2 } from 'lucide-react';

export default function Header({ onReset, onOpenApiKey, hasApiKey }) {
  return (
    <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-[1px] flex items-center justify-center shadow-lg shadow-blue-500/20">
            <div className="w-full h-full bg-slate-900 rounded-[11px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-blue-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                ResumeMatch <span className="text-blue-400">AI</span>
              </span>
              <span className="hidden sm:inline-flex text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                ATS Engine v2.4
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">AI-Powered Resume Analyzer & Job Matcher</p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOpenApiKey}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
              hasApiKey
                ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/20'
                : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-800'
            }`}
          >
            <Key className="w-3.5 h-3.5" />
            <span>{hasApiKey ? 'Gemini AI Active' : 'API Key (Optional)'}</span>
            {hasApiKey && <CheckCircle2 className="w-3 h-3 text-emerald-400 ml-0.5" />}
          </button>

          <button
            onClick={onReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800/80 text-slate-300 border border-slate-700 hover:bg-slate-800 hover:text-white transition-all"
            title="Reset All Data"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>
    </header>
  );
}
