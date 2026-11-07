# AI-Powered Resume Analyzer & Job Matcher 🎯

An intelligent, full-featured web application that analyzes candidate resumes against job descriptions, calculates ATS compatibility scores, and provides real-time skill gap analysis and AI-powered recommendations.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18-blue)
![Vite](https://img.shields.io/badge/Vite-6-purple)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-cyan)

---

## ✨ Features

- **Multi-Format Resume Upload**: Seamless drag-and-drop parsing for **PDF**, Word documents (**DOCX**), and plain text (**TXT**).
- **Comprehensive Match Scoring**:
  - **Overall Match %**: Weighted calculation combining skills, experience, and format.
  - **Hard Skills Match %**: Technical competencies and programming languages.
  - **Soft Skills & Methodologies %**: Agile, leadership, and communication fit.
  - **Experience & Seniority Fit %**: Years detected vs. job post requirements.
  - **ATS Compatibility Score %**: Checks contact information, headings, formatting, and word counts.
- **Interactive "What-If" Skills Simulator**: Check off missing skills you know to watch your match score climb in real-time.
- **Google XYZ Bullet Enhancer**: Transforms weak responsibilities into high-impact, metric-driven statements.
- **AI Cover Letter Generator**: Creates tailored cover letters tailored to the specific role.
- **Targeted Interview Preparation**: Generates custom interview questions addressing resume gaps with STAR-format sample answers.
- **Printable/Exportable Scorecard**: Full printable summary ready to save as PDF.
- **Optional Gemini API Integration**: Built-in engine works 100% locally out-of-the-box, with optional Google Gemini API support for deep LLM analysis.

---

## 🚀 Quick Start

### 1. Clone & Install
```bash
git clone https://github.com/rahulchauhan7766872835-lgtm/ai-resume-analyzer-job-matcher.git
cd "ai-resume-analyzer-job-matcher"
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for Production
```bash
npm run build
```

---

## 🛠️ Built With

- **Frontend**: React 18, Vite 6, Tailwind CSS
- **Document Processing**: `pdfjs-dist`, `jszip`
- **Icons**: Lucide React
- **AI Capabilities**: Google Gemini API (Optional integration)
