import React from 'react';

export default function ScoreGauge({ score = 0, size = 180, strokeWidth = 14, label = "Match Score" }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getColorInfo = (val) => {
    if (val >= 80) {
      return {
        color: '#10b981',
        textClass: 'text-emerald-400',
        bgClass: 'bg-emerald-500/10',
        borderClass: 'border-emerald-500/30',
        badge: 'Exceptional Match',
        summary: 'Your resume strongly mirrors this job description. You have a high probability of passing ATS filters and securing an interview.'
      };
    }
    if (val >= 65) {
      return {
        color: '#3b82f6',
        textClass: 'text-blue-400',
        bgClass: 'bg-blue-500/10',
        borderClass: 'border-blue-500/30',
        badge: 'Strong Alignment',
        summary: 'Great baseline match. Integrating a few missing high-priority keywords will further increase recruiter callbacks.'
      };
    }
    if (val >= 50) {
      return {
        color: '#f59e0b',
        textClass: 'text-amber-400',
        bgClass: 'bg-amber-500/10',
        borderClass: 'border-amber-500/30',
        badge: 'Moderate Alignment',
        summary: 'Partial overlap detected. Several required qualifications are missing from your resume or phrasing differs from the job post.'
      };
    }
    return {
      color: '#f43f5e',
      textClass: 'text-rose-400',
      bgClass: 'bg-rose-500/10',
      borderClass: 'border-rose-500/30',
      badge: 'Needs Optimization',
      summary: 'Significant gaps detected between your resume and this job posting. Substantial tailoring recommended.'
    };
  };

  const info = getColorInfo(score);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="rotate-[-90deg] drop-shadow-lg">
          {/* Background circle track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="#1e293b"
            strokeWidth={strokeWidth}
          />
          {/* Animated progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke={info.color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className={`text-4xl font-extrabold tracking-tight ${info.textClass}`}>
            {score}<span className="text-xl font-bold text-slate-400">%</span>
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mt-0.5">
            {label}
          </span>
        </div>
      </div>

      <div className={`mt-3 inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${info.bgClass} ${info.textClass} border ${info.borderClass}`}>
        {info.badge}
      </div>
      <p className="text-xs text-slate-400 text-center max-w-xs mt-2 leading-relaxed">
        {info.summary}
      </p>
    </div>
  );
}
