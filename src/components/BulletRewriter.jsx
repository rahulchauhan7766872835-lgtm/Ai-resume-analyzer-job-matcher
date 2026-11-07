import React, { useState } from 'react';
import { Sparkles, Copy, Check, ArrowRight, Wand2 } from 'lucide-react';

export default function BulletRewriter({ bulletSuggestions = [] }) {
  const [copiedIndex, setCopiedIndex] = useState(null);

  if (!bulletSuggestions || bulletSuggestions.length === 0) return null;

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-4">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
            <Wand2 className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">AI Bullet Point Enhancer</h3>
            <p className="text-xs text-slate-400">Transform weak responsibilities into high-impact Google XYZ statements</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {bulletSuggestions.map((item, idx) => (
          <div key={idx} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
            {/* Original vs Improved */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {/* Before */}
              <div className="p-3 rounded-lg bg-rose-500/5 border border-rose-500/10">
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 block mb-1">
                  Before (Passive / Weak)
                </span>
                <p className="text-slate-300 italic">"{item.original}"</p>
              </div>

              {/* After */}
              <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20 relative group">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-emerald-400" /> After (Action + Metric + Impact)
                  </span>
                  <button
                    onClick={() => handleCopy(item.improved, idx)}
                    className="flex items-center gap-1 text-[11px] text-emerald-400 hover:text-white px-2 py-0.5 rounded bg-emerald-500/10 hover:bg-emerald-500/20 transition"
                  >
                    {copiedIndex === idx ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" /> Copy
                      </>
                    )}
                  </button>
                </div>
                <p className="text-slate-100 font-medium">{item.improved}</p>
              </div>
            </div>

            {/* Explanation */}
            <div className="text-[11px] text-slate-400 pl-1 border-l-2 border-cyan-500/40">
              <span className="font-semibold text-slate-300">Why this scores higher: </span>
              {item.reason}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
