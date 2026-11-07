import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, PlusCircle, Check, Sparkles, Filter, Info } from 'lucide-react';

export default function SkillsBreakdown({ analysis, simulatedSkills = [], onToggleSimulatedSkill }) {
  const [filter, setFilter] = useState('all'); // all, matched, missing, bonus

  if (!analysis) return null;

  const { matchedHard, missingHard, matchedSoft, missingSoft, bonusSkills } = analysis;

  const allMatched = [
    ...matchedHard.map(s => ({ name: s, type: 'hard', matched: true })),
    ...matchedSoft.map(s => ({ name: s, type: 'soft', matched: true }))
  ];

  const allMissing = [
    ...missingHard.map(s => ({ name: s, type: 'hard', matched: false })),
    ...missingSoft.map(s => ({ name: s, type: 'soft', matched: false }))
  ];

  const filteredSkills = () => {
    if (filter === 'matched') return allMatched;
    if (filter === 'missing') return allMissing;
    if (filter === 'bonus') return bonusSkills.map(s => ({ name: s, type: 'bonus', matched: false }));
    return [...allMatched, ...allMissing];
  };

  const isSimulated = (skill) => simulatedSkills.includes(skill);

  return (
    <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5" /> Keyword Intelligence
          </span>
          <h3 className="text-lg font-bold text-white mt-1">Skills & Keyword Match Matrix</h3>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
              filter === 'all' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All ({allMatched.length + allMissing.length})
          </button>
          <button
            onClick={() => setFilter('matched')}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
              filter === 'matched' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-emerald-400'
            }`}
          >
            Matched ({allMatched.length})
          </button>
          <button
            onClick={() => setFilter('missing')}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
              filter === 'missing' ? 'bg-rose-600 text-white shadow-md' : 'text-slate-400 hover:text-rose-400'
            }`}
          >
            Missing ({allMissing.length})
          </button>
          <button
            onClick={() => setFilter('bonus')}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
              filter === 'bonus' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-indigo-400'
            }`}
          >
            Bonus ({bonusSkills.length})
          </button>
        </div>
      </div>

      {/* Simulator Info Banner */}
      {allMissing.length > 0 && (
        <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-start gap-2.5 text-xs text-blue-300">
          <Sparkles className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-white">Interactive Score Simulator: </span>
            Click on any <span className="text-rose-300 font-semibold">Missing Skill</span> you actually possess to simulate adding it to your resume. Watch your match score climb in real-time!
          </div>
        </div>
      )}

      {/* Skills Grid */}
      <div className="flex flex-wrap gap-2 pt-2 min-h-[100px]">
        {filter !== 'bonus' && filteredSkills().map(item => {
          const sim = isSimulated(item.name);
          const isMatched = item.matched || sim;

          return (
            <button
              key={item.name}
              onClick={() => !item.matched && onToggleSimulatedSkill(item.name)}
              disabled={item.matched}
              className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                sim
                  ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300 ring-2 ring-emerald-500/30'
                  : isMatched
                  ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300 cursor-default'
                  : 'bg-rose-500/10 border-rose-500/20 text-rose-300 hover:bg-rose-500/20 hover:border-rose-500/40 cursor-pointer'
              }`}
            >
              {sim ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : isMatched ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <PlusCircle className="w-3.5 h-3.5 text-rose-400 group-hover:scale-110 transition" />
              )}
              <span className="capitalize">{item.name}</span>
              {sim && (
                <span className="text-[10px] bg-emerald-500/30 text-emerald-200 px-1 rounded font-mono">
                  Simulated
                </span>
              )}
              {!item.matched && !sim && (
                <span className="text-[10px] text-rose-400/80 group-hover:text-rose-200 opacity-0 group-hover:opacity-100 transition">
                  +Add
                </span>
              )}
            </button>
          );
        })}

        {filter === 'bonus' && (
          bonusSkills.map(skill => (
            <div
              key={skill}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-indigo-500/10 border border-indigo-500/20 text-indigo-300"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span className="capitalize">{skill}</span>
              <span className="text-[10px] bg-indigo-500/20 px-1 rounded text-indigo-200">Candidate Strength</span>
            </div>
          ))
        )}

        {filteredSkills().length === 0 && (
          <div className="w-full text-center py-8 text-xs text-slate-500">
            No skills found under this filter.
          </div>
        )}
      </div>

      {simulatedSkills.length > 0 && (
        <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-800">
          <span>{simulatedSkills.length} skill(s) currently simulated</span>
          <button
            onClick={() => simulatedSkills.forEach(s => onToggleSimulatedSkill(s))}
            className="text-blue-400 hover:underline"
          >
            Clear Simulations
          </button>
        </div>
      )}
    </div>
  );
}
