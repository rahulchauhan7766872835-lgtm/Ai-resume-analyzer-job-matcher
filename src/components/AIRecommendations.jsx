import React from 'react';
import { Lightbulb, AlertTriangle, ArrowUpRight, Flame, CheckCircle } from 'lucide-react';

export default function AIRecommendations({ recommendations = [] }) {
  if (!recommendations || recommendations.length === 0) return null;

  const getPriorityStyle = (type) => {
    switch (type) {
      case 'high':
        return {
          icon: <Flame className="w-4 h-4 text-rose-400" />,
          badgeClass: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
          cardClass: 'border-rose-500/20 bg-rose-500/5',
          label: 'High Impact'
        };
      case 'medium':
        return {
          icon: <Lightbulb className="w-4 h-4 text-amber-400" />,
          badgeClass: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
          cardClass: 'border-amber-500/20 bg-amber-500/5',
          label: 'Recommended'
        };
      default:
        return {
          icon: <AlertTriangle className="w-4 h-4 text-blue-400" />,
          badgeClass: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
          cardClass: 'border-blue-500/20 bg-blue-500/5',
          label: 'ATS Optimization'
        };
    }
  };

  return (
    <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-4">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Lightbulb className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Actionable Tailoring Suggestions</h3>
            <p className="text-xs text-slate-400">Prioritized checklist to optimize your resume for this exact job</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {recommendations.map((rec, i) => {
          const style = getPriorityStyle(rec.type);
          return (
            <div key={i} className={`p-4 rounded-xl border ${style.cardClass} space-y-1.5 transition`}>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {rec.category}
                </span>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${style.badgeClass} flex items-center gap-1`}>
                  {style.icon} {style.label}
                </span>
              </div>
              <h4 className="text-xs font-bold text-slate-100">{rec.title}</h4>
              <p className="text-xs text-slate-300 leading-relaxed">{rec.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
