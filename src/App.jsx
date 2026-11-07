import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import ResumeUpload from './components/ResumeUpload';
import JobDescriptionInput from './components/JobDescriptionInput';
import ScoreDashboard from './components/ScoreDashboard';
import SkillsBreakdown from './components/SkillsBreakdown';
import ATSAudit from './components/ATSAudit';
import AIRecommendations from './components/AIRecommendations';
import BulletRewriter from './components/BulletRewriter';
import ApiKeyModal from './components/ApiKeyModal';
import CoverLetterModal from './components/CoverLetterModal';
import InterviewPrepModal from './components/InterviewPrepModal';
import ExportModal from './components/ExportModal';

import { analyzeMatch } from './services/analyzer';
import { parseResumeDetails } from './services/resumeParser';
import { SAMPLE_RESUMES, SAMPLE_JOB_DESCRIPTIONS } from './data/sampleData';

export default function App() {
  // Initialize with initial sample data so the app displays results immediately
  const [resumeText, setResumeText] = useState(SAMPLE_RESUMES[0].text);
  const [resumeFileName, setResumeFileName] = useState(SAMPLE_RESUMES[0].title);
  const [resumeDetails, setResumeDetails] = useState(() => parseResumeDetails(SAMPLE_RESUMES[0].text));
  const [jdText, setJdText] = useState(SAMPLE_JOB_DESCRIPTIONS[0].text);
  
  const [isLoadingFile, setIsLoadingFile] = useState(false);
  const [simulatedSkills, setSimulatedSkills] = useState([]);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('GEMINI_API_KEY') || '');

  // Modals state
  const [isApiKeyOpen, setIsApiKeyOpen] = useState(false);
  const [isCoverLetterOpen, setIsCoverLetterOpen] = useState(false);
  const [isInterviewOpen, setIsInterviewOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);

  // Compute analysis dynamically whenever resumeText, jdText, or simulatedSkills change
  const analysis = useMemo(() => {
    if (!resumeText || !jdText) return null;
    return analyzeMatch(resumeText, jdText, resumeDetails, simulatedSkills);
  }, [resumeText, jdText, resumeDetails, simulatedSkills]);

  const handleResumeLoaded = (text, details, fileName) => {
    setResumeText(text);
    setResumeDetails(details);
    setResumeFileName(fileName);
    setSimulatedSkills([]); // reset simulated skills on new resume
  };

  const handleToggleSimulatedSkill = (skill) => {
    setSimulatedSkills(prev => 
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const handleSaveApiKey = (key) => {
    setApiKey(key);
    if (key) {
      localStorage.setItem('GEMINI_API_KEY', key);
    } else {
      localStorage.removeItem('GEMINI_API_KEY');
    }
  };

  const handleReset = () => {
    setResumeText('');
    setResumeFileName(null);
    setResumeDetails(null);
    setJdText('');
    setSimulatedSkills([]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Navbar */}
      <Header
        onReset={handleReset}
        onOpenApiKey={() => setIsApiKeyOpen(true)}
        hasApiKey={Boolean(apiKey)}
      />

      {/* Main Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Hero Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            AI-Powered <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-300 bg-clip-text text-transparent">Resume Analyzer</span> & Job Matcher
          </h1>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Upload your resume and paste any job description to instantly calculate your ATS match percentage, detect missing technical keywords, and get AI-powered bullet point optimizations.
          </p>
        </div>

        {/* Inputs Section: Resume Upload + Job Description */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          <ResumeUpload
            resumeText={resumeText}
            resumeDetails={resumeDetails}
            onResumeLoaded={handleResumeLoaded}
            isLoading={isLoadingFile}
            setIsLoading={setIsLoadingFile}
          />

          <JobDescriptionInput
            jdText={jdText}
            onJdChange={setJdText}
          />
        </div>

        {/* Results & Analysis Section */}
        {analysis ? (
          <div className="space-y-8 animate-fadeIn">
            {/* Primary Scorecard */}
            <ScoreDashboard
              analysis={analysis}
              onOpenCoverLetter={() => setIsCoverLetterOpen(true)}
              onOpenInterview={() => setIsInterviewOpen(true)}
              onOpenExport={() => setIsExportOpen(true)}
            />

            {/* Keyword & Skills Match Matrix */}
            <SkillsBreakdown
              analysis={analysis}
              simulatedSkills={simulatedSkills}
              onToggleSimulatedSkill={handleToggleSimulatedSkill}
            />

            {/* Side-by-side ATS Audit & Actionable Recommendations */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              <ATSAudit atsAudit={analysis.atsAudit} />
              <AIRecommendations recommendations={analysis.recommendations} />
            </div>

            {/* Google XYZ Bullet Rewriter */}
            <BulletRewriter bulletSuggestions={analysis.bulletSuggestions} />
          </div>
        ) : (
          <div className="p-12 text-center rounded-2xl border border-slate-800 bg-slate-900/40">
            <p className="text-sm text-slate-400">
              Please upload a resume and provide a target job description above to view your match score.
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-6 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>AI Resume Analyzer & Job Matcher • ATS Compatibility Engine</p>
          <p className="text-slate-600">Built with React, Vite & Tailwind CSS</p>
        </div>
      </footer>

      {/* Modals */}
      <ApiKeyModal
        isOpen={isApiKeyOpen}
        onClose={() => setIsApiKeyOpen(false)}
        apiKey={apiKey}
        onSaveApiKey={handleSaveApiKey}
      />

      <CoverLetterModal
        isOpen={isCoverLetterOpen}
        onClose={() => setIsCoverLetterOpen(false)}
        resumeText={resumeText}
        jdText={jdText}
        apiKey={apiKey}
      />

      <InterviewPrepModal
        isOpen={isInterviewOpen}
        onClose={() => setIsInterviewOpen(false)}
        missingSkills={analysis?.missingHard || []}
        resumeSeniority={analysis?.resumeSeniority}
        jdText={jdText}
        apiKey={apiKey}
      />

      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        analysis={analysis}
        resumeFileName={resumeFileName}
      />
    </div>
  );
}
