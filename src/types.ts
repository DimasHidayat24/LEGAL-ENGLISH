export type LanguageMode = 'EN' | 'ID';
export type ThemeMode = 'dark' | 'light';

export type LegalCategory = 
  | 'General Legal Terms'
  | 'Contract Law'
  | 'Legal Drafting Expressions'
  | 'Legal Drafting & Contract English'
  | 'Litigation & Procedure'
  | 'Litigation & Civil Procedure'
  | 'Litigation & Dispute Resolution'
  | 'Civil Litigation'
  | 'Criminal Law'
  | 'Criminal Law & Procedure'
  | 'Corporate & Commercial Law'
  | 'Company & Corporate Law'
  | 'Commercial Contracts & Transactions'
  | 'M&A and Investment'
  | 'Mergers, Acquisitions & Joint Ventures'
  | 'Banking & Finance'
  | 'Banking, Finance & Fintech'
  | 'Islamic Banking & Sharia Finance'
  | 'Capital Markets & Securities'
  | 'International Law'
  | 'Public International Law'
  | 'International Arbitration'
  | 'Arbitration & ADR'
  | 'Property Law'
  | 'Property & Real Estate'
  | 'Property & Real Estate Law'
  | 'Tort Law'
  | 'Tort & Civil Wrongs'
  | 'Intellectual Property'
  | 'Employment & Labor Law'
  | 'Tax Law'
  | 'Insolvency & Restructuring'
  | 'Insolvency, Restructuring & Bankruptcy'
  | 'Human Rights'
  | 'Human Rights & Constitutional Freedoms'
  | 'Administrative & Constitutional Law'
  | 'Competition & Antitrust'
  | 'Competition & Antitrust Law'
  | 'Consumer Protection'
  | 'Consumer Protection & Product Liability'
  | 'Data Protection, Privacy & AI'
  | 'Data Privacy, Cyber & Artificial Intelligence Law'
  | 'Environmental, Energy & Mining Law'
  | 'International Trade & Customs'
  | 'Maritime & Shipping Law'
  | 'Maritime, Shipping & Aviation Law'
  | 'Construction Law'
  | 'Construction & Infrastructure Law'
  | 'Insurance Law'
  | 'Insurance & Regulatory Compliance'
  | 'Insurance, Risk & Compliance'
  | 'Corporate Governance & Compliance'
  | 'Islamic & Sharia Law'
  | 'Legal Writing & Research'
  | 'Legal Writing & Terminology'
  | 'Courtroom & Advocacy English'
  | 'Legal Negotiation & Communication'
  | 'Legal Negotiation & Drafting'
  | 'Legal Collocations'
  | 'Legal Collocations & Phrases'
  | 'Legal Persons & Relationships'
  | 'Latin Legal Expressions'
  | 'Latin Legal Terms'
  | 'Latin Maxims & Expressions'
  // Legacy aliases for backward compatibility
  | 'Foundation'
  | 'Contract Drafting'
  | 'Litigation & Court'
  | 'Corporate & Commercial'
  | 'International & Arbitration'
  | 'Latin Maxims'
  | 'Remedies & Tort';

export type DifficultyLevel = 'Fundamental' | 'Intermediate' | 'Advanced';

export type TermType = 
  | 'Word' 
  | 'Phrase' 
  | 'Legal phrase' 
  | 'Legal expression' 
  | 'Latin term' 
  | 'French term'
  | 'German term'
  | 'Dutch legal term'
  | 'Archaic legal phrase'
  | 'Legal remedy'
  | 'Drafting expression' 
  | 'Legal concept'
  | 'Legal document';

export type TermJurisdiction = 
  | 'General/Common Law' 
  | 'US' 
  | 'US / General'
  | 'UK' 
  | 'UK / Commonwealth'
  | 'International' 
  | 'International / CISG'
  | 'Indonesian Civil Law'
  | 'Indonesia'
  | 'Indonesia / Comparative'
  | 'Civil Law'
  | 'Civil Law / Indonesia'
  | 'International / Civil Law / Common Law'
  | 'Comparative';

export interface LegalTermContextExamples {
  contracts?: string;
  courtDecisions?: string;
  legalOpinions?: string;
}

export interface ConnectedDocReference {
  docId: string;
  title: string;
  paragraphNumber?: string;
  excerpt?: string;
}

export interface LegalTerm {
  id: string;
  term: string;
  pronunciation?: string;
  partOfSpeech: string;
  category: LegalCategory;
  difficulty: DifficultyLevel;
  termType?: TermType;
  jurisdiction?: TermJurisdiction;
  
  // Standard definitions
  indonesianMeaning: string; // e.g. "Ganti rugi / indemnitas"
  plainEnglish?: string; // An agreement to cover another person's specified losses or liabilities.
  legalDefinition: string; // Full legal meaning (Black's Law / Common Law)
  indonesianLegalConcept: string; // Detailed Indonesian legal concept
  legalFunction: string; // Why lawyers use this and how it functions
  
  // Conceptual Distinction Warning
  isDistinctConcept?: boolean;
  conceptualNote?: string; // ⚠️ Warning note for concepts without exact Indonesian equivalents
  
  // Examples
  exampleSentenceEn: string;
  exampleSentenceId: string;
  authenticClauseExcerpt?: string;
  authenticClauseSource?: string;
  
  // Learn in context
  contextExamples?: LegalTermContextExamples;
  
  // Drafting tips & pitfalls
  commonMistakesOrNuances: string;
  
  // Knowledge Graph & Collocations
  commonCollocations?: string[];
  relatedTerms: string[];
  relatedPhrases?: string[];
  commonlyFoundIn?: string[]; // e.g. ['Commercial Contracts', 'Insurance', 'M&A Documents']
  
  // Connected platform documents
  connectedDocIds?: ConnectedDocReference[];
  
  civilLawEquivalent?: string;
}

export interface DocumentParagraph {
  id: string;
  paragraphNumber: string;
  text: string;
  highlightedTermIds: string[];
  indonesianSummary?: string;
}

export interface LegalDocument {
  id: string;
  title: string;
  documentType: 'Contract' | 'Court Decision' | 'Statute' | 'Treaty' | 'Arbitration Award' | 'Legal Opinion' | 'Corporate' | 'Memorandum';
  jurisdiction: string;
  governingLaw: string;
  difficulty: DifficultyLevel;
  readingTimeMinutes: number;
  keyTermIds: string[];
  abstractEn: string;
  abstractId: string;
  parties?: string[];
  paragraphs: DocumentParagraph[];
  downloadableFilename: string;
}

export interface CurriculumTopic {
  id: string;
  categoryId: 'foundation' | 'documents' | 'practical' | 'advanced';
  title: string;
  titleId: string;
  subtitle: string;
  durationMinutes: number;
  difficulty: DifficultyLevel;
  overviewEn: string;
  overviewId: string;
  coreConcepts: {
    term: string;
    meaningId: string;
    legalFunction: string;
    explanationEn: string;
    explanationId: string;
    authenticExample: string;
    indonesianTranslation: string;
    draftingTip: string;
  }[];
  comparativeLawNote?: {
    indonesianTerm: string;
    englishTerm: string;
    distinction: string;
  };
  sampleExcerpt: {
    title: string;
    text: string;
    translationId: string;
  };
  checkExercise: {
    questionEn: string;
    questionId: string;
    options: string[];
    correctIndex: number;
    explanationId: string;
  };
}

export interface ComparativeConcept {
  id: string;
  englishTerm: string;
  indonesianTerm: string;
  category: 'Contract' | 'Civil Procedure' | 'Torts/PMH' | 'Corporate' | 'Remedies' | 'Public & Constitutional';
  civilLawNuance: string;
  commonLawNuance: string;
  whyContextMatters: string;
  exampleScenario: string;
}

export type ExerciseCategory = 'drafting' | 'translation' | 'vocabulary' | 'context' | 'reading';
export type ExerciseDifficulty = 'Foundation' | 'Intermediate' | 'Advanced';
export type ExerciseQuestionType = 
  | 'multiple-choice'
  | 'fill-in-the-blank'
  | 'correction'
  | 'translation'
  | 'clause-interpretation'
  | 'vocabulary-context'
  | 'drafting-challenge'
  | 'reading-comprehension';

export interface ExerciseItem {
  id: string;
  type: ExerciseCategory;
  category?: ExerciseCategory;
  difficulty: ExerciseDifficulty;
  questionType: ExerciseQuestionType;
  title: string;
  scenario?: string;
  context?: string;
  passage?: string; // For reading comprehension (100-250 words)
  promptEn: string;
  promptId: string;
  options: string[];
  correctIndex: number;
  correctAnswer?: string;
  explanationId: string;
  explanationEn: string;
  legalConcept?: string;
  indonesianEquivalent?: string;
  direction?: 'EN → ID' | 'ID → EN';
  relatedTermId?: string;
  relatedTerms?: string[];
  clauseExample?: string;
}

export interface WritingModule {
  id: string;
  title: string;
  subtitle: string;
  documentType: string;
  purposeEn: string;
  purposeId: string;
  sections: {
    sectionName: string;
    indonesianName: string;
    purpose: string;
    standardPhrases: { en: string; id: string; notes: string }[];
    sampleText: string;
    tips: string[];
  }[];
  fullExample: string;
}

export interface EditorialArticle {
  id: string;
  title: string;
  titleId: string;
  author: string;
  readTime: string;
  publishDate: string;
  category: string;
  summary: string;
  contentMarkdown: string;
  keyTakeaways: string[];
}

export interface SavedTermRecord {
  termId: string;
  dateSaved: string;
  personalNote?: string;
  sourceDocId?: string;
}

export interface UserStudyState {
  savedTerms: SavedTermRecord[];
  bookmarkedParagraphs: { docId: string; paragraphId: string; timestamp: string }[];
  completedLessons: string[];
  completedDocuments: string[];
  exerciseScores: { [exerciseId: string]: { score: number; date: string } };
  personalNotes: { [key: string]: string };
}
