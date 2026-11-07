import React, { useRef, useState } from 'react';
import { UploadCloud, FileText, CheckCircle, AlertCircle, FileCheck, Eye, EyeOff, Sparkles, UserCheck } from 'lucide-react';
import { extractTextFromFile, parseResumeDetails } from '../services/resumeParser';
import { SAMPLE_RESUMES } from '../data/sampleData';

export default function ResumeUpload({ resumeText, resumeDetails, onResumeLoaded, isLoading, setIsLoading }) {
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [fileName, setFileName] = useState(null);

  const handleFileProcess = async (file) => {
    if (!file) return;
    setErrorMsg(null);
    setIsLoading(true);
    setFileName(file.name);

    try {
      const text = await extractTextFromFile(file);
      const details = parseResumeDetails(text);
      onResumeLoaded(text, details, file.name);
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || 'Failed to extract text from file.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  const loadSample = (sample) => {
    setErrorMsg(null);
    setFileName(sample.title);
    const details = parseResumeDetails(sample.text);
    onResumeLoaded(sample.text, details, sample.title);
  };

  return (
    <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 shadow-xl flex flex-col h-full">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">1. Candidate Resume</h2>
            <p className="text-xs text-slate-400">Upload PDF, DOCX, or pick a sample</p>
          </div>
        </div>

        {resumeText && (
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center gap-1 text-xs text-slate-400 hover:text-blue-400 px-2 py-1 rounded-md bg-slate-800/60 border border-slate-700/60 transition"
          >
            {showPreview ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span>{showPreview ? 'Hide Text' : 'View Text'}</span>
          </button>
        )}
      </div>

      {/* Drop Zone */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center min-h-[170px] ${
          dragActive
            ? 'border-blue-500 bg-blue-500/10 scale-[0.99]'
            : resumeText
            ? 'border-emerald-500/40 bg-emerald-500/5 hover:border-emerald-500/60'
            : 'border-slate-700 hover:border-blue-500/60 hover:bg-slate-800/40'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.docx,.txt,.md"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && handleFileProcess(e.target.files[0])}
        />

        {isLoading ? (
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xs text-blue-400 font-medium">Extracting text & parsing sections...</p>
          </div>
        ) : resumeText ? (
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-emerald-400 flex items-center justify-center gap-1">
                Resume Loaded Successfully
              </p>
              <p className="text-[11px] text-slate-300 font-mono mt-0.5 line-clamp-1 max-w-[280px]">
                {fileName || 'resume_uploaded'}
              </p>
            </div>
            <p className="text-[10px] text-slate-400">Click or drag another file to replace</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-slate-800 text-blue-400 flex items-center justify-center">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-white">
                Drag & drop your resume here, or <span className="text-blue-400 underline">browse</span>
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">Supports PDF, DOCX, or TXT (Max 15MB)</p>
            </div>
          </div>
        )}
      </div>

      {errorMsg && (
        <div className="mt-2.5 p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-start gap-2 text-rose-300 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Detected Metadata preview pill */}
      {resumeDetails && !showPreview && (
        <div className="mt-3 p-3 bg-slate-950/60 rounded-xl border border-slate-800/80 text-xs space-y-1.5">
          <div className="flex items-center justify-between text-slate-400">
            <span>Word Count:</span>
            <span className="font-mono text-slate-200 font-medium">{resumeDetails.wordCount} words</span>
          </div>
          {resumeDetails.email && (
            <div className="flex items-center justify-between text-slate-400">
              <span>Email:</span>
              <span className="font-mono text-blue-400 text-[11px] truncate max-w-[190px]">{resumeDetails.email}</span>
            </div>
          )}
          {resumeDetails.phone && (
            <div className="flex items-center justify-between text-slate-400">
              <span>Phone:</span>
              <span className="font-mono text-slate-200 text-[11px]">{resumeDetails.phone}</span>
            </div>
          )}
          <div className="flex items-center justify-between text-slate-400">
            <span>Detected Sections:</span>
            <span className="font-mono text-emerald-400 text-[11px]">
              {Object.entries(resumeDetails.sections).filter(([_, v]) => v).length} / 6 detected
            </span>
          </div>
        </div>
      )}

      {/* Expanded parsed text preview */}
      {showPreview && resumeText && (
        <div className="mt-3 flex-1 flex flex-col min-h-[160px]">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
            Parsed Text Content
          </div>
          <div className="flex-1 max-h-48 overflow-y-auto p-2.5 bg-slate-950 rounded-xl border border-slate-800 font-mono text-[11px] text-slate-300 leading-relaxed whitespace-pre-wrap">
            {resumeText}
          </div>
        </div>
      )}

      {/* Quick Sample Selector */}
      <div className="mt-4 pt-3 border-t border-slate-800/80">
        <div className="text-[11px] font-semibold text-slate-400 mb-2 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-400" /> Quick Test With Sample Resumes:
        </div>
        <div className="flex flex-col gap-1.5">
          {SAMPLE_RESUMES.map(sample => (
            <button
              key={sample.id}
              onClick={() => loadSample(sample)}
              className="text-left px-2.5 py-1.5 rounded-lg bg-slate-800/40 hover:bg-slate-800 border border-slate-700/40 hover:border-blue-500/40 text-xs text-slate-300 hover:text-white transition flex items-center justify-between group"
            >
              <span className="truncate pr-2">{sample.title.split('-')[0]}</span>
              <span className="text-[10px] text-slate-500 group-hover:text-blue-400 shrink-0 font-medium">Load</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
