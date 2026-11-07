import React from 'react';
import { Briefcase, Sparkles, XCircle, CheckCircle } from 'lucide-react';
import { SAMPLE_JOB_DESCRIPTIONS } from '../data/sampleData';

export default function JobDescriptionInput({ jdText, onJdChange }) {
  const wordCount = jdText.trim() ? jdText.trim().split(/\s+/).length : 0;

  const handleSelectSample = (sampleId) => {
    const found = SAMPLE_JOB_DESCRIPTIONS.find(j => j.id === sampleId);
    if (found) {
      onJdChange(found.text);
    }
  };

  return (
    <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 shadow-xl flex flex-col h-full">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Briefcase className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">2. Target Job Description</h2>
            <p className="text-xs text-slate-400">Paste job requirements or choose a sample role</p>
          </div>
        </div>

        {jdText && (
          <button
            onClick={() => onJdChange('')}
            className="flex items-center gap-1 text-xs text-slate-400 hover:text-rose-400 px-2 py-1 rounded-md bg-slate-800/60 border border-slate-700/60 transition"
          >
            <XCircle className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>
        )}
      </div>

      {/* Text Area */}
      <div className="relative flex-1 flex flex-col min-h-[170px]">
        <textarea
          value={jdText}
          onChange={(e) => onJdChange(e.target.value)}
          placeholder="Paste the target job description here (Responsibilities, Required Skills, Qualifications, Technologies)..."
          className="w-full flex-1 p-3.5 rounded-xl bg-slate-950 border border-slate-700/80 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none leading-relaxed font-mono min-h-[180px]"
        />
        <div className="absolute bottom-2.5 right-3 text-[10px] text-slate-500 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800">
          {wordCount} words
        </div>
      </div>

      {/* Preset Job Roles */}
      <div className="mt-4 pt-3 border-t border-slate-800/80">
        <div className="text-[11px] font-semibold text-slate-400 mb-2 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-indigo-400" /> Or Choose a Preset Role:
        </div>
        <div className="flex flex-col gap-1.5">
          {SAMPLE_JOB_DESCRIPTIONS.map(job => (
            <button
              key={job.id}
              onClick={() => handleSelectSample(job.id)}
              className="text-left px-2.5 py-1.5 rounded-lg bg-slate-800/40 hover:bg-slate-800 border border-slate-700/40 hover:border-indigo-500/40 text-xs text-slate-300 hover:text-white transition flex items-center justify-between group"
            >
              <div className="truncate pr-2">
                <span className="font-medium text-slate-200">{job.title}</span>
                <span className="text-[10px] text-slate-500 block truncate">{job.company}</span>
              </div>
              <span className="text-[10px] text-slate-500 group-hover:text-indigo-400 shrink-0 font-medium">Use Role</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
