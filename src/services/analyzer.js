/**
 * Comprehensive Knowledge Base of Tech, Data, Cloud, AI, and Soft Skills
 */
export const SKILL_TAXONOMY = {
  // Programming & Scripting
  languages: [
    'javascript', 'typescript', 'python', 'java', 'c++', 'c#', 'golang', 'go', 'ruby', 'rust',
    'php', 'swift', 'kotlin', 'sql', 'html', 'html5', 'css', 'css3', 'sass', 'bash', 'shell'
  ],
  // Frontend
  frontend: [
    'react', 'react.js', 'next.js', 'vue', 'vue.js', 'angular', 'svelte', 'tailwind', 'tailwind css',
    'bootstrap', 'redux', 'redux toolkit', 'zustand', 'webpack', 'vite', 'graphql', 'responsive design',
    'web accessibility', 'a11y', 'jest', 'cypress', 'storybook'
  ],
  // Backend & APIs
  backend: [
    'node.js', 'nodejs', 'express', 'express.js', 'fastapi', 'django', 'flask', 'spring boot',
    'nest.js', 'nestjs', 'rest', 'restful', 'restful apis', 'graphql', 'grpc', 'microservices',
    'websockets', 'kafka', 'rabbitmq', 'jwt', 'oauth'
  ],
  // Databases & Caching
  databases: [
    'postgresql', 'postgres', 'mysql', 'mongodb', 'redis', 'dynamodb', 'cassandra', 'sqlite',
    'prisma', 'mongoose', 'elasticsearch', 'supabase', 'firebase'
  ],
  // Cloud & DevOps
  cloud_devops: [
    'aws', 'azure', 'gcp', 'google cloud', 'docker', 'kubernetes', 'terraform', 'ci/cd',
    'github actions', 'jenkins', 'ansible', 'helm', 'prometheus', 'grafana', 'linux', 'nginx'
  ],
  // AI, ML & Data Science
  ai_data: [
    'machine learning', 'deep learning', 'pytorch', 'tensorflow', 'scikit-learn', 'nlp',
    'natural language processing', 'llms', 'large language models', 'langchain', 'hugging face',
    'rag', 'vector database', 'pinecone', 'pandas', 'numpy', 'scipy', 'spark', 'snowflake',
    'tableau', 'power bi', 'mlflow', 'computer vision', 'opencv', 'generative ai'
  ],
  // Soft Skills & Methodologies
  soft_skills: [
    'agile', 'scrum', 'kanban', 'leadership', 'mentorship', 'communication', 'collaboration',
    'problem solving', 'cross-functional', 'critical thinking', 'project management', 'code reviews',
    'ci/cd', 'tdd', 'test driven development'
  ]
};

// Flattened list of all recognizable skills
export const ALL_KNOWN_SKILLS = Object.values(SKILL_TAXONOMY).flat();

// Action verbs that boost ATS scores
export const STRONG_ACTION_VERBS = [
  'accelerated', 'achieved', 'architected', 'automated', 'boosted', 'championed', 'created',
  'decreased', 'delivered', 'deployed', 'designed', 'developed', 'directed', 'engineered',
  'established', 'executed', 'expanded', 'formulated', 'generated', 'guided', 'headed',
  'implemented', 'improved', 'increased', 'initiated', 'integrated', 'launched', 'led',
  'maximized', 'mentored', 'migrated', 'modernized', 'optimized', 'orchestrated', 'overhauled',
  'pioneered', 'reduced', 'redesigned', 'refactored', 'resolved', 'restructured', 'revamped',
  'scaled', 'slashed', 'spearheaded', 'standardized', 'streamlined', 'transformed', 'upgraded'
];

/**
 * Normalizes text for keyword matching
 */
function cleanText(text) {
  return (text || '').toLowerCase().replace(/[^a-z0-9+#.-]/g, ' ');
}

/**
 * Extracts skills from text based on taxonomy and job requirements
 */
export function extractSkills(text) {
  if (!text) return { hardSkills: [], softSkills: [], allSkills: [] };
  const lower = ' ' + cleanText(text) + ' ';

  const foundSkills = new Set();
  const hardSkills = new Set();
  const softSkills = new Set();

  ALL_KNOWN_SKILLS.forEach(skill => {
    // Escape regex characters
    const escaped = skill.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(`(?:^|[\\s,;:.()/-])${escaped}(?:$|[\\s,;:.()/-])`, 'i');
    if (regex.test(lower)) {
      foundSkills.add(skill);
      if (SKILL_TAXONOMY.soft_skills.includes(skill)) {
        softSkills.add(skill);
      } else {
        hardSkills.add(skill);
      }
    }
  });

  return {
    hardSkills: Array.from(hardSkills),
    softSkills: Array.from(softSkills),
    allSkills: Array.from(foundSkills)
  };
}

/**
 * Extracts required years of experience from text
 */
function extractYearsOfExperience(text) {
  const matches = text.match(/(\d+)\+?\s*(?:-\s*\d+)?\s*(?:years?|yrs?)(?:\s+of)?(?:\s+experience)?/gi) || [];
  let maxYears = 0;
  for (const m of matches) {
    const num = parseInt(m.match(/\d+/)?.[0] || '0', 10);
    if (num > maxYears && num <= 25) {
      maxYears = num;
    }
  }
  return maxYears;
}

/**
 * Checks seniority level indicators
 */
function detectSeniority(text) {
  const lower = text.toLowerCase();
  if (lower.includes('principal') || lower.includes('director') || lower.includes('staff')) return 'Staff/Principal';
  if (lower.includes('lead') || lower.includes('architect')) return 'Lead/Architect';
  if (lower.includes('senior') || lower.includes('sr.') || lower.includes('sr ')) return 'Senior';
  if (lower.includes('mid') || lower.includes('intermediate')) return 'Mid-Level';
  if (lower.includes('junior') || lower.includes('jr.') || lower.includes('associate') || lower.includes('entry level') || lower.includes('intern')) return 'Entry/Junior';
  return 'Flexible';
}

/**
 * Evaluates ATS format compliance
 */
export function auditATSFormat(resumeDetails, rawText) {
  const issues = [];
  const passes = [];

  // 1. Contact info
  if (resumeDetails?.email) {
    passes.push({ label: 'Email Address Detected', detail: resumeDetails.email });
  } else {
    issues.push({ label: 'Missing Email Address', detail: 'Recruiters and ATS cannot reach you without an email.' });
  }

  if (resumeDetails?.phone) {
    passes.push({ label: 'Phone Number Detected', detail: resumeDetails.phone });
  } else {
    issues.push({ label: 'Missing Phone Number', detail: 'Add a standard formatted phone number.' });
  }

  if (resumeDetails?.linkedin) {
    passes.push({ label: 'LinkedIn Profile Linked', detail: resumeDetails.linkedin });
  } else {
    issues.push({ label: 'No LinkedIn Profile', detail: 'Adding your LinkedIn profile increases recruiter response rates by 71%.' });
  }

  // 2. Standard sections
  const sec = resumeDetails?.sections || {};
  if (sec.experience) {
    passes.push({ label: 'Experience Section Found', detail: 'Standard heading recognized by ATS.' });
  } else {
    issues.push({ label: 'Missing Experience Heading', detail: 'Use clear titles like "Professional Experience" or "Work History".' });
  }

  if (sec.education) {
    passes.push({ label: 'Education Section Found', detail: 'Degrees and academic history detected.' });
  } else {
    issues.push({ label: 'Missing Education Heading', detail: 'Include standard "Education" section.' });
  }

  if (sec.skills) {
    passes.push({ label: 'Skills Section Found', detail: 'Categorized skills section detected.' });
  } else {
    issues.push({ label: 'Missing Dedicated Skills Section', detail: 'A dedicated Skills list helps ATS parse technical competencies instantly.' });
  }

  // 3. Measurable metrics & numbers
  const metricsCount = resumeDetails?.metricsCount || 0;
  if (metricsCount >= 4) {
    passes.push({ label: 'High Quantifiable Impact', detail: `Found ${metricsCount} measurable figures (%, $, metrics).` });
  } else if (metricsCount >= 1) {
    passes.push({ label: 'Moderate Quantifiable Impact', detail: `Found ${metricsCount} metrics. Consider adding more numbers/results.` });
  } else {
    issues.push({ label: 'Lack of Measurable Results', detail: 'Resumes with metrics (e.g., "boosted speed by 35%") receive 40% more interview invites.' });
  }

  // 4. Action Verbs
  const lowerResume = (rawText || '').toLowerCase();
  const matchedActionVerbs = STRONG_ACTION_VERBS.filter(v => new RegExp(`\\b${v}\\b`, 'i').test(lowerResume));
  if (matchedActionVerbs.length >= 6) {
    passes.push({ label: 'Strong Action Verbs Used', detail: `Detected ${matchedActionVerbs.length} power verbs (e.g., ${matchedActionVerbs.slice(0, 3).join(', ')}).` });
  } else {
    issues.push({ label: 'Low Action Verb Density', detail: `Only found ${matchedActionVerbs.length} strong action verbs. Use verbs like "Spearheaded", "Optimized", "Engineered".` });
  }

  // 5. Length
  const wordCount = resumeDetails?.wordCount || 0;
  if (wordCount >= 300 && wordCount <= 1100) {
    passes.push({ label: 'Optimal Resume Length', detail: `${wordCount} words (ideal 1-2 page length).` });
  } else if (wordCount < 300) {
    issues.push({ label: 'Resume Too Short', detail: `Only ${wordCount} words. Provide more detail on responsibilities and achievements.` });
  } else {
    issues.push({ label: 'Resume May Be Too Lengthy', detail: `${wordCount} words. Keep within 1-2 pages for maximum readability.` });
  }

  // Calculate ATS Score out of 100
  const maxCriteria = 6;
  const score = Math.min(100, Math.round((passes.length / (passes.length + issues.length)) * 100));

  return {
    score,
    passes,
    issues,
    actionVerbs: matchedActionVerbs
  };
}

/**
 * Main Analyzer Engine: Compares Resume against Job Description
 */
export function analyzeMatch(resumeText, jdText, resumeDetails, simulatedKnownSkills = []) {
  if (!resumeText || !jdText) return null;

  const resumeSkills = extractSkills(resumeText);
  const jdSkills = extractSkills(jdText);

  // Combine actual resume skills with any "simulated known skills" user checked in UI
  const allCandidateSkills = new Set([...resumeSkills.allSkills, ...simulatedKnownSkills]);
  const candidateHardSkills = new Set([...resumeSkills.hardSkills, ...simulatedKnownSkills]);
  const candidateSoftSkills = new Set([...resumeSkills.softSkills, ...simulatedKnownSkills]);

  // Determine Matched vs Missing
  const matchedHard = jdSkills.hardSkills.filter(s => candidateHardSkills.has(s));
  const missingHard = jdSkills.hardSkills.filter(s => !candidateHardSkills.has(s));

  const matchedSoft = jdSkills.softSkills.filter(s => candidateSoftSkills.has(s));
  const missingSoft = jdSkills.softSkills.filter(s => !candidateSoftSkills.has(s));

  const allMatched = [...matchedHard, ...matchedSoft];
  const allMissing = [...missingHard, ...missingSoft];

  // Bonus candidate skills (skills candidate has that aren't mentioned in JD)
  const bonusSkills = resumeSkills.allSkills.filter(s => !jdSkills.allSkills.includes(s));

  // Hard skills match percentage
  const hardScore = jdSkills.hardSkills.length > 0
    ? Math.round((matchedHard.length / jdSkills.hardSkills.length) * 100)
    : 80;

  // Soft skills match percentage
  const softScore = jdSkills.softSkills.length > 0
    ? Math.round((matchedSoft.length / jdSkills.softSkills.length) * 100)
    : 85;

  // Experience and Seniority fit
  const resumeYears = extractYearsOfExperience(resumeText);
  const jdYears = extractYearsOfExperience(jdText);
  const resumeSeniority = detectSeniority(resumeText);
  const jdSeniority = detectSeniority(jdText);

  let experienceScore = 75;
  if (jdYears > 0) {
    if (resumeYears >= jdYears) {
      experienceScore = 95;
    } else if (resumeYears >= jdYears - 1) {
      experienceScore = 80;
    } else if (resumeYears > 0) {
      experienceScore = 60;
    } else {
      experienceScore = 50;
    }
  }

  // ATS formatting audit
  const atsAudit = auditATSFormat(resumeDetails, resumeText);

  // Overall Match Weighted Calculation:
  // 45% Hard Skills + 15% Soft Skills + 20% Experience + 20% ATS/Keyword Alignment
  const overallScore = Math.min(100, Math.max(15, Math.round(
    (hardScore * 0.45) +
    (softScore * 0.15) +
    (experienceScore * 0.20) +
    (atsAudit.score * 0.20)
  )));

  // Generate Specific Actionable Recommendations
  const recommendations = [];

  if (missingHard.length > 0) {
    recommendations.push({
      type: 'high',
      category: 'Critical Skill Gaps',
      title: `Integrate ${missingHard.slice(0, 3).join(', ')} into your Resume`,
      description: `The job description strongly targets ${missingHard.slice(0, 4).join(', ')}. If you have experience with these tools, explicitly add them to your Skills section and job bullet points to pass automated screening filters.`
    });
  }

  if (missingSoft.length > 0) {
    recommendations.push({
      type: 'medium',
      category: 'Methodologies & Collaboration',
      title: `Demonstrate experience with ${missingSoft.slice(0, 2).join(' & ')}`,
      description: `Highlight collaborative workflows such as ${missingSoft.join(', ')} in your project descriptions.`
    });
  }

  if (atsAudit.issues.length > 0) {
    atsAudit.issues.forEach(issue => {
      recommendations.push({
        type: 'warning',
        category: 'ATS Optimization',
        title: issue.label,
        description: issue.detail
      });
    });
  }

  // Bullet point rewrites suggestions
  const bulletSuggestions = generateBulletSuggestions(resumeText, missingHard);

  return {
    overallScore,
    hardScore,
    softScore,
    experienceScore,
    atsScore: atsAudit.score,
    jdSkillsCount: jdSkills.allSkills.length,
    matchedCount: allMatched.length,
    missingCount: allMissing.length,
    matchedHard,
    missingHard,
    matchedSoft,
    missingSoft,
    bonusSkills: bonusSkills.slice(0, 10),
    resumeYears,
    jdYears,
    resumeSeniority,
    jdSeniority,
    atsAudit,
    recommendations,
    bulletSuggestions
  };
}

/**
 * Generates sample improved bullet points using Google XYZ format
 */
function generateBulletSuggestions(resumeText, missingSkills) {
  const suggestions = [
    {
      original: "Responsible for developing web applications and fixing bugs.",
      improved: "Architected and delivered responsive React/Node.js web modules, slashing page load times by 38% and reducing customer bug reports by 45%.",
      reason: "Replaces passive 'Responsible for' with active power verbs ('Architected', 'Delivered') and attaches quantifiable business metrics."
    },
    {
      original: "Worked with databases and wrote SQL queries for team reports.",
      improved: "Engineered performant PostgreSQL indexing schemas and automated data pipelines, cutting query response time by 60% across 5M+ daily records.",
      reason: "Specifies exact database technology and demonstrates optimization impact with scale."
    }
  ];

  if (missingSkills.length > 0) {
    suggestions.push({
      original: `Assisted with deployment pipelines and team development sprints.`,
      improved: `Streamlined deployment workflows by implementing automated CI/CD pipelines (${missingSkills[0] || 'Docker/GitHub Actions'}), reducing deployment cycle duration from 4 hours to 15 minutes.`,
      reason: `Integrates missing job keyword '${missingSkills[0]}' with measurable efficiency gain.`
    });
  }

  return suggestions;
}
