import React, { useState } from 'react';
import { X, Key, ShieldCheck, ExternalLink, Trash2 } from 'lucide-react';

export default function ApiKeyModal({ isOpen, onClose, apiKey, onSaveApiKey }) {
  const [keyInput, setKeyInput] = useState(apiKey || '');

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    onSaveApiKey(keyInput.trim());
    onClose();
  };

  const handleClear = () => {
    setKeyInput('');
    onSaveApiKey('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-md rounded-2xl p-6 shadow-2xl relative text-left">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
            <Key className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Google Gemini API Key</h3>
            <p className="text-xs text-slate-400">Optional: Unlocks real-time Gemini LLM analysis</p>
          </div>
        </div>

        <p className="text-xs text-slate-300 mb-4 leading-relaxed">
          The app includes a built-in intelligent matching engine that calculates percentages, ATS scores, and skill gaps without an API key. Adding your free Gemini API key enables custom AI critiques, instant cover letters, and targeted interview prep.
        </p>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-400 tracking-wider mb-1.5">
              API Key (Stored locally in your browser)
            </label>
            <input
              type="password"
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
            />
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 bg-slate-800/40 p-3 rounded-xl border border-slate-800">
            <span className="flex items-center gap-1.5 text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Key never leaves your browser
            </span>
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noreferrer"
              className="text-blue-400 hover:underline flex items-center gap-1"
            >
              Get free key <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="flex items-center gap-2 pt-2">
            {apiKey && (
              <button
                type="button"
                onClick={handleClear}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-rose-400 hover:bg-rose-500/10 border border-rose-500/20 rounded-xl transition"
              >
                <Trash2 className="w-3.5 h-3.5" /> Remove Key
              </button>
            )}
            <div className="flex-1 flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-slate-300 hover:bg-slate-800 rounded-xl transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-medium bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-lg shadow-blue-600/30 transition"
              >
                Save Key
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
