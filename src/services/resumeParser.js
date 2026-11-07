import * as pdfjsLib from 'pdfjs-dist';
import JSZip from 'jszip';

// Set up pdfjs worker using CDN fallback so it runs seamlessly in browser without bundler worker issues
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version || '4.10.38'}/pdf.worker.min.mjs`;
}

/**
 * Extracts plain text from an uploaded File (PDF, DOCX, TXT)
 * @param {File} file
 * @returns {Promise<string>}
 */
export async function extractTextFromFile(file) {
  const fileName = file.name.toLowerCase();

  if (fileName.endsWith('.pdf')) {
    return await extractTextFromPDF(file);
  } else if (fileName.endsWith('.docx')) {
    return await extractTextFromDOCX(file);
  } else if (fileName.endsWith('.txt') || fileName.endsWith('.md')) {
    return await file.text();
  } else {
    throw new Error('Unsupported file format. Please upload a PDF (.pdf), Word document (.docx), or Text file (.txt).');
  }
}

/**
 * Extract text from PDF using PDF.js
 */
async function extractTextFromPDF(file) {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({
      data: arrayBuffer,
      useWorkerFetch: false,
      isEvalSupported: false,
      useSystemFonts: true
    });

    const pdf = await loadingTask.promise;
    let fullText = '';

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      const pageStrings = textContent.items.map(item => item.str);
      fullText += pageStrings.join(' ') + '\n';
    }

    if (!fullText.trim()) {
      throw new Error('The PDF appears to be empty or contains scanned images without selectable text.');
    }

    return fullText;
  } catch (error) {
    console.warn('PDF.js extraction error, attempting fallback array buffer text recovery:', error);
    // Fallback: try raw text decode if standard text stream exists
    const arrayBuffer = await file.arrayBuffer();
    const decoded = new TextDecoder('utf-8', { fatal: false }).decode(arrayBuffer);
    const cleaned = decoded.replace(/[^\x20-\x7E\n\r\t]/g, ' ');
    if (cleaned.length > 200) {
      return cleaned;
    }
    throw new Error('Unable to extract text from this PDF. Please ensure it is not password-protected or an image-only scan.');
  }
}

/**
 * Extract text from DOCX using JSZip (reading word/document.xml)
 */
async function extractTextFromDOCX(file) {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const zip = await JSZip.loadAsync(arrayBuffer);
    const docXmlFile = zip.file("word/document.xml");
    
    if (!docXmlFile) {
      throw new Error("Invalid Word document: missing word/document.xml");
    }

    const xmlText = await docXmlFile.async("text");
    
    // Parse XML tags and extract text paragraphs cleanly
    // Replace end of paragraph tags with newlines
    let parsedText = xmlText
      .replace(/<\/w:p>/gi, '\n')
      .replace(/<\/w:tr>/gi, '\n')
      .replace(/<w:tab\/>/gi, '\t')
      .replace(/<[^>]+>/g, '') // remove remaining XML tags
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&apos;/g, "'");

    return parsedText.trim();
  } catch (error) {
    console.error('DOCX parse error:', error);
    throw new Error('Failed to read DOCX file. Please verify it is a valid Word document.');
  }
}

/**
 * Extracts structured metadata and sections from raw resume text
 */
export function parseResumeDetails(text) {
  if (!text) return null;

  // Contact info regexes
  const emailMatch = text.match(/[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}/i);
  const phoneMatch = text.match(/(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
  const linkedinMatch = text.match(/linkedin\.com\/in\/[\w-]+/i);
  const githubMatch = text.match(/github\.com\/[\w-]+/i);
  const portfolioMatch = text.match(/(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.(me|io|dev|app|org|tech|co)(\/[^\s]*)?/i);

  // Section detections
  const sectionsFound = {
    summary: /(professional\s+summary|summary|profile|about\s+me|objective)/i.test(text),
    experience: /(work\s+experience|professional\s+experience|experience|employment\s+history)/i.test(text),
    education: /(education|academic\s+background|degrees|certifications)/i.test(text),
    skills: /(skills|core\s+competencies|technical\s+skills|technologies)/i.test(text),
    projects: /(projects|key\s+projects|portfolio)/i.test(text),
    certifications: /(certifications|licenses|credentials)/i.test(text),
  };

  // Metrics & Action Verb detection
  const numbersOrMetrics = text.match(/\b\d+(\.\d+)?%|\$\d+[\d,]*|\b\d+\+\s*(years|k|m|clients|users|requests)\b/gi) || [];
  const words = text.split(/\s+/).filter(Boolean);
  const bulletLines = text.split('\n').filter(line => /^[\s]*[-•*]/.test(line));

  return {
    email: emailMatch ? emailMatch[0] : null,
    phone: phoneMatch ? phoneMatch[0] : null,
    linkedin: linkedinMatch ? linkedinMatch[0] : null,
    github: githubMatch ? githubMatch[0] : null,
    portfolio: portfolioMatch ? portfolioMatch[0] : null,
    sections: sectionsFound,
    wordCount: words.length,
    metricsCount: numbersOrMetrics.length,
    bulletCount: bulletLines.length,
    rawText: text
  };
}
