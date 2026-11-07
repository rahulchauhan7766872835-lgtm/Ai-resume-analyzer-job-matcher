import React, { useState, useEffect } from 'react';
import { X, Sparkles, HelpCircle, MessageSquare, CheckCircle, RefreshCw } from 'lucide-react';
import { generateInterviewPrep } from '../services/geminiService';

export default function InterviewPrepModal({ isOpen, onClose, missingSkills = [], resumeSeniority, jdText, apiKey }) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && questions.length === 0) {
      handleLoad();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLoad = async () => {
    setLoading(true);
    try {
      const data = await generateInterviewPrep(missingSkills, resumeSeniority, jdText, apiKey);
      setQuestions(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-2xl rounded-2xl p-6 shadow-2xl relative flex flex-col max-h-[88vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                Gap-Targeted Interview Preparation
                {apiKey && <span className="text-[10px] font-semibold bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full border border-indigo-500/30">Gemini AI</span>}
              </h3>
              <p className="text-xs text-slate-400">High-probability questions designed to probe potential resume gaps</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto my-4 space-y-4 pr-1">
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center gap-3">
              <div className="w-10 h-10 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-xs text-indigo-400 font-medium">Generating targeted questions & sample answers...</p>
            </div>
          ) : (
            questions.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2.5">
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <h4 className="text-sm font-semibold text-white leading-snug">
                    {item.question}
                  </h4>
                </div>

                <div className="pl-7 space-y-2">
                  <div className="text-xs p-2.5 rounded-lg bg-amber-500/5 border border-amber-500/10 text-amber-300/90">
                    <span className="font-semibold block text-amber-400 mb-0.5">Recruiter Strategy / Tip:</span>
                    {item.tip}
                  </div>

                  <div className="text-xs p-2.5 rounded-lg bg-emerald-500/5 border border-emerald-500/10 text-slate-300">
                    <span className="font-semibold block text-emerald-400 mb-0.5">Recommended Response Framework:</span>
                    "{item.sampleAnswer}"
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-800">
          <button
            onClick={handleLoad}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Generate New Questions</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium shadow-lg shadow-indigo-600/30 transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
