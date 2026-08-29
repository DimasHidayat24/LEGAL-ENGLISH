export type LanguageMode = 'EN' | 'ID';

export type LegalCategory = 
  | 'General Legal Terms'
  | 'Contract Law'
  | 'Legal Drafting Expressions'
  | 'Litigation & Procedure'
  | 'Litigation & Dispute Resolution'
  | 'Criminal Law'
  | 'Corporate & Commercial Law'
  | 'International Law'
  | 'International Arbitration'
  | 'Property Law'
  | 'Tort Law'
  | 'Intellectual Property'
  | 'Legal Writing & Research'
  | 'Latin Legal Expressions'
  | 'Latin Legal Terms'
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
  | 'Civil Law'
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

export interface ExerciseItem {
  id: string;
  type: 'vocabulary' | 'translation' | 'reading' | 'context' | 'drafting';
  title: string;
  scenario?: string;
  promptEn: string;
  promptId: string;
  options: string[];
  correctIndex: number;
  explanationId: string;
  explanationEn: string;
  relatedTermId?: string;
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
