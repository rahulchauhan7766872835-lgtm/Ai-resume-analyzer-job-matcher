import React from 'react';
import ScoreGauge from './ScoreGauge';
import { CheckCircle2, AlertTriangle, FileCode, Users, Clock, ShieldCheck, Sparkles, FileText, ArrowRight } from 'lucide-react';

export default function ScoreDashboard({ analysis, onOpenCoverLetter, onOpenInterview, onOpenExport }) {
  if (!analysis) return null;

  const { overallScore, hardScore, softScore, experienceScore, atsScore, matchedCount, missingCount, jdSkillsCount } = analysis;

  const getMetricColor = (val) => {
    if (val >= 80) return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
    if (val >= 65) return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
    if (val >= 50) return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
    return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
  };

  const getBarColor = (val) => {
    if (val >= 80) return 'bg-emerald-500';
    if (val >= 65) return 'bg-blue-500';
    if (val >= 50) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  return (
    <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 shadow-2xl space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> AI Match Analysis
          </span>
          <h2 className="text-xl font-bold text-white mt-1">Resume & Job Fit Scorecard</h2>
        </div>

        {/* Quick action buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onOpenCoverLetter}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 text-xs font-medium transition"
          >
            <FileText className="w-3.5 h-3.5 text-blue-400" />
            <span>AI Cover Letter</span>
          </button>

          <button
            onClick={onOpenInterview}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-medium transition"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Interview Prep</span>
          </button>

          <button
            onClick={onOpenExport}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium transition"
          >
            <FileCode className="w-3.5 h-3.5 text-slate-400" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Primary Score Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Big Overall Gauge */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-slate-950/60 rounded-2xl border border-slate-800/80">
          <ScoreGauge score={overallScore} label="Overall Match" />
          
          <div className="w-full mt-5 pt-4 border-t border-slate-800/80 grid grid-cols-3 gap-2 text-center">
            <div className="p-2 rounded-lg bg-slate-900/60">
              <span className="text-[10px] text-slate-400 block uppercase">Total Skills</span>
              <span className="text-sm font-bold text-slate-200 font-mono">{jdSkillsCount}</span>
            </div>
            <div className="p-2 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
              <span className="text-[10px] text-emerald-400 block uppercase">Matched</span>
              <span className="text-sm font-bold text-emerald-400 font-mono">{matchedCount}</span>
            </div>
            <div className="p-2 rounded-lg bg-rose-500/5 border border-rose-500/10">
              <span className="text-[10px] text-rose-400 block uppercase">Missing</span>
              <span className="text-sm font-bold text-rose-400 font-mono">{missingCount}</span>
            </div>
          </div>
        </div>

        {/* 4 Category Breakdown Cards */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* 1. Hard Skills */}
          <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
                  <FileCode className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold text-slate-200">Hard Technical Skills</span>
              </div>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-md border ${getMetricColor(hardScore)} font-mono`}>
                {hardScore}%
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mb-3">Programming, frameworks, databases & infrastructure match</p>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div className={`h-full rounded-full transition-all duration-700 ${getBarColor(hardScore)}`} style={{ width: `${hardScore}%` }}></div>
            </div>
          </div>

          {/* 2. Soft Skills & Methodologies */}
          <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold text-slate-200">Soft Skills & Methods</span>
              </div>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-md border ${getMetricColor(softScore)} font-mono`}>
                {softScore}%
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mb-3">Agile, leadership, collaboration & problem solving</p>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div className={`h-full rounded-full transition-all duration-700 ${getBarColor(softScore)}`} style={{ width: `${softScore}%` }}></div>
            </div>
          </div>

          {/* 3. Experience & Seniority */}
          <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <Clock className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold text-slate-200">Experience & Seniority</span>
              </div>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-md border ${getMetricColor(experienceScore)} font-mono`}>
                {experienceScore}%
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mb-3">
              {analysis.resumeYears > 0 ? `${analysis.resumeYears}+ yrs detected` : 'Career history'} vs {analysis.jdYears > 0 ? `${analysis.jdYears}+ yrs requested` : 'target role'}
            </p>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div className={`h-full rounded-full transition-all duration-700 ${getBarColor(experienceScore)}`} style={{ width: `${experienceScore}%` }}></div>
            </div>
          </div>

          {/* 4. ATS Readability */}
          <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold text-slate-200">ATS Readability</span>
              </div>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-md border ${getMetricColor(atsScore)} font-mono`}>
                {atsScore}%
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mb-3">Headings, metrics, action verbs & contact info formatting</p>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div className={`h-full rounded-full transition-all duration-700 ${getBarColor(atsScore)}`} style={{ width: `${atsScore}%` }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
