import React from 'react';
import { CheckCircle2, AlertTriangle, ShieldCheck, Zap } from 'lucide-react';

export default function ATSAudit({ atsAudit }) {
  if (!atsAudit) return null;

  const { score, passes = [], issues = [], actionVerbs = [] } = atsAudit;

  return (
    <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-5">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">ATS Compliance & Formatting Audit</h3>
            <p className="text-xs text-slate-400">Automated check for Applicant Tracking System readability</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Compliance:</span>
          <span className="text-sm font-bold text-emerald-400 font-mono bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
            {score}/100
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Passed Checks */}
        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4" /> Passed Criteria ({passes.length})
          </div>
          <div className="space-y-2">
            {passes.map((p, i) => (
              <div key={i} className="text-xs p-2.5 rounded-lg bg-emerald-500/5 border border-emerald-500/10 flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-200 block">{p.label}</span>
                  <span className="text-[11px] text-slate-400">{p.detail}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Issues to Fix */}
        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4" /> Areas for Improvement ({issues.length})
          </div>
          <div className="space-y-2">
            {issues.length > 0 ? (
              issues.map((iss, i) => (
                <div key={i} className="text-xs p-2.5 rounded-lg bg-amber-500/5 border border-amber-500/10 flex items-start gap-2">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-amber-300 block">{iss.label}</span>
                    <span className="text-[11px] text-slate-400">{iss.detail}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-xs text-slate-400 p-3 text-center">
                Awesome! No critical ATS formatting issues detected.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Verbs detected */}
      {actionVerbs.length > 0 && (
        <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-400 uppercase tracking-wider mb-2">
            <Zap className="w-3.5 h-3.5 text-blue-400" /> Detected Power Action Verbs ({actionVerbs.length})
          </div>
          <div className="flex flex-wrap gap-1.5">
            {actionVerbs.map(verb => (
              <span key={verb} className="px-2 py-0.5 rounded-md bg-blue-500/10 border border-blue-500/20 text-[11px] text-blue-300 font-mono capitalize">
                {verb}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
