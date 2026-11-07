/**
 * Google Gemini API Service for Deep AI Resume Analysis, Cover Letter & Interview Preparation
 */

export async function generateAICritique(resumeText, jdText, matchScore, apiKey = null) {
  if (!apiKey) {
    // High-quality local AI fallback simulation
    return {
      executiveSummary: `Based on an overall match of ${matchScore}%, your background shows strong foundational alignment with the target role. To break into the top 5% of applicants, prioritize addressing the specific keyword gaps identified in the skills breakdown, ensure every bullet point highlights quantifiable business outcomes (e.g., % improvement, revenue growth, latency reductions), and ensure your technical stack directly mirrors the terminology used in the job description.`,
      strengths: [
        'Direct alignment in core programming languages and frameworks.',
        'Clear progression in engineering responsibilities and project ownership.',
        'Demonstrated practical problem solving in production environments.'
      ],
      weaknesses: [
        'Missing explicit mention of several high-priority requirements from the job description.',
        'Some bullet points focus on responsibilities rather than measurable business outcomes.',
        'Could benefit from a sharper, target-specific Professional Summary paragraph at the top.'
      ]
    };
  }

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  const prompt = `You are a Principal Tech Recruiter and ATS Expert.
Analyze the following resume against the job description. The calculated algorithmic match score is ${matchScore}%.

RESUME:
${resumeText.slice(0, 4000)}

JOB DESCRIPTION:
${jdText.slice(0, 3000)}

Respond in valid JSON format only with the following structure:
{
  "executiveSummary": "A concise 3-4 sentence direct, honest evaluation of the candidate's fit.",
  "strengths": ["Key strength 1", "Key strength 2", "Key strength 3"],
  "weaknesses": ["Key weakness or gap 1", "Key weakness or gap 2", "Key weakness or gap 3"]
}`;

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: "application/json" }
      })
    });

    if (!res.ok) {
      throw new Error(`Gemini API returned status ${res.status}`);
    }

    const data = await res.json();
    const rawContent = data.candidates?.[0]?.content?.parts?.[0]?.text;
    return JSON.parse(rawContent);
  } catch (err) {
    console.error('Gemini API Error, fallback used:', err);
    throw err;
  }
}

/**
 * Generate Tailored Cover Letter
 */
export async function generateCoverLetter(resumeText, jdText, apiKey = null) {
  if (!apiKey) {
    return `Dear Hiring Manager,

I am writing to express my strong enthusiasm for the open position at your company. Having closely reviewed the role requirements and objectives, I am confident that my technical background, proven track record of shipping scalable applications, and collaborative approach make me a compelling match for your engineering team.

In my recent experience, I have led the architecture and development of resilient web applications, modernizing core systems and driving measurable improvements in latency, uptime, and team velocity. I have developed hands-on proficiency with the modern stack your team relies upon, and I take pride in crafting clean, testable code that directly accelerates product milestones.

I am particularly excited about your team's mission and would welcome the opportunity to discuss how my technical expertise and problem-solving mindset can contribute to your continued growth.

Thank you for your time and consideration.

Sincerely,
Candidate`;
  }

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
  const prompt = `Generate a compelling, professional, and tailored 3-paragraph Cover Letter based on this Resume and Job Description.

RESUME:
${resumeText.slice(0, 3500)}

JOB DESCRIPTION:
${jdText.slice(0, 3000)}

Provide only the cover letter text ready to be sent.`;

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
  });

  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
}

/**
 * Generate Target Interview Questions & Answers based on gaps
 */
export async function generateInterviewPrep(missingSkills, resumeSeniority, jdText, apiKey = null) {
  if (!apiKey) {
    return [
      {
        question: `How would you quickly ramp up on and integrate ${missingSkills[0] || 'the required technologies'} in a production setting?`,
        tip: "Recruiters ask this to test your learning velocity. Mention an adjacent technology you've mastered and your structured 30-day learning framework.",
        sampleAnswer: "Whenever I adopt a new technology, I benchmark it against tools I already know, build a proof-of-concept prototype, and study official production guidelines. For example, my background with distributed systems makes ramping up straightforward."
      },
      {
        question: `Can you describe a challenging technical bottleneck you resolved that had a direct impact on business metrics?`,
        tip: "Follow the STAR method (Situation, Task, Action, Result). Emphasize numbers, percentage improvements, and cross-functional communication.",
        sampleAnswer: "In my previous role, our query latency was causing customer churn. I identified unindexed queries, refactored database access layers, and introduced Redis caching, slashing response times by 65% and saving \$20k in cloud overhead."
      },
      {
        question: `How do you handle architectural trade-offs between speed of delivery and technical debt in an agile environment?`,
        tip: "Show balance. Companies value pragmatic engineers who can ship quickly while documenting tech debt for future sprints.",
        sampleAnswer: "I believe in pragmatism: build modular code that meets immediate product deadlines, but write thorough automated tests and maintain a tech debt backlog to refactor iteratively."
      }
    ];
  }

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
  const prompt = `Based on these missing skills [${missingSkills.slice(0, 5).join(', ')}] and the target job description:
${jdText.slice(0, 2000)}

Generate 3 high-impact interview questions tailored specifically to test the candidate on their potential gaps, along with expert tips and strong sample answers.
Respond ONLY in valid JSON format:
[
  {
    "question": "Question text",
    "tip": "Recruiter insight",
    "sampleAnswer": "Recommended high-impact response"
  }
]`;

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: "application/json" }
      })
    });
    const data = await res.json();
    return JSON.parse(data.candidates?.[0]?.content?.parts?.[0]?.text);
  } catch (e) {
    console.error('Failed to generate interview prep from Gemini:', e);
    return [];
  }
}
