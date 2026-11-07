import React, { useRef } from 'react';
import { X, Printer, Download, Sparkles, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function ExportModal({ isOpen, onClose, analysis, resumeFileName }) {
  const printAreaRef = useRef(null);

  if (!isOpen || !analysis) return null;

  const handlePrint = () => {
    window.print();
  };

  const { overallScore, hardScore, softScore, experienceScore, atsScore, matchedHard, missingHard, recommendations } = analysis;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-3xl rounded-2xl p-6 shadow-2xl relative flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-white">Resume Match & ATS Scorecard Report</h3>
            <p className="text-xs text-slate-400">Ready to save as PDF or print</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium shadow-lg shadow-blue-600/30 transition"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Scorecard Document */}
        <div ref={printAreaRef} className="flex-1 overflow-y-auto my-4 p-6 bg-slate-950 rounded-xl border border-slate-800 text-slate-100 space-y-6">
          {/* Title Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl font-extrabold text-white">Resume Match & Compatibility Report</h2>
              <p className="text-xs text-slate-400 mt-0.5">Analyzed File: {resumeFileName || 'Resume Document'}</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-blue-400 font-mono">{overallScore}%</span>
              <span className="text-[10px] block uppercase tracking-wider text-slate-400">Overall Match</span>
            </div>
          </div>

          {/* Scores Overview */}
          <div className="grid grid-cols-4 gap-3 text-center">
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-[10px] text-slate-400 block uppercase">Hard Skills</span>
              <span className="text-lg font-bold text-emerald-400 font-mono">{hardScore}%</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-[10px] text-slate-400 block uppercase">Soft Skills</span>
              <span className="text-lg font-bold text-indigo-400 font-mono">{softScore}%</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-[10px] text-slate-400 block uppercase">Experience Fit</span>
              <span className="text-lg font-bold text-blue-400 font-mono">{experienceScore}%</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-[10px] text-slate-400 block uppercase">ATS Format</span>
              <span className="text-lg font-bold text-amber-400 font-mono">{atsScore}%</span>
            </div>
          </div>

          {/* Skills Breakdown */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">Target Skills Analysis</h4>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-emerald-400 font-semibold block mb-2">Matched Skills ({matchedHard.length}):</span>
                <div className="flex flex-wrap gap-1">
                  {matchedHard.map(s => (
                    <span key={s} className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 text-[10px] capitalize">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-rose-400 font-semibold block mb-2">Missing Priority Skills ({missingHard.length}):</span>
                <div className="flex flex-wrap gap-1">
                  {missingHard.map(s => (
                    <span key={s} className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 text-[10px] capitalize">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Action Recommendations */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">Priority Action Items</h4>
            <div className="space-y-2">
              {recommendations.slice(0, 4).map((r, i) => (
                <div key={i} className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs">
                  <span className="font-semibold text-white block">{r.title}</span>
                  <span className="text-slate-400 text-[11px] mt-0.5 block">{r.description}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-3 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-300 hover:bg-slate-800 rounded-xl transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
