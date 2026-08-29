import { LegalTerm } from '../../types';
import { generalLegalTerms } from './generalTerms';
import { contractLawTerms } from './contractTerms';
import { legalDraftingExpressions } from './draftingExpressions';
import { litigationTerms } from './litigationTerms';
import { corporateLawTerms } from './corporateTerms';
import { latinMaximsTerms } from './latinMaxims';

// Master combined legal terms lexicon
export const legalVocabularyList: LegalTerm[] = [
  ...generalLegalTerms,
  ...contractLawTerms,
  ...legalDraftingExpressions,
  ...litigationTerms,
  ...corporateLawTerms,
  ...latinMaximsTerms
];

// Helper functions for Lexicon queries and search
export function getTermsByCategory(category: string): LegalTerm[] {
  if (!category || category === 'All Categories' || category === 'ALL') return legalVocabularyList;
  return legalVocabularyList.filter(t => t.category === category);
}

export function getTermById(id: string): LegalTerm | undefined {
  if (!id) return undefined;
  return legalVocabularyList.find(t => t.id.toLowerCase() === id.toLowerCase() || t.term.toLowerCase() === id.toLowerCase());
}

export function searchLegalTerms(
  query: string, 
  categoryFilter?: string, 
  difficultyFilter?: string, 
  typeFilter?: string, 
  jurisdictionFilter?: string,
  letterFilter?: string
): LegalTerm[] {
  let results = [...legalVocabularyList];

  if (categoryFilter && categoryFilter !== 'ALL' && categoryFilter !== 'All Categories') {
    results = results.filter(t => t.category === categoryFilter);
  }

  if (difficultyFilter && difficultyFilter !== 'ALL' && difficultyFilter !== 'All Levels') {
    results = results.filter(t => t.difficulty.toLowerCase() === difficultyFilter.toLowerCase());
  }

  if (typeFilter && typeFilter !== 'ALL' && typeFilter !== 'All Types') {
    results = results.filter(t => t.termType === typeFilter);
  }

  if (jurisdictionFilter && jurisdictionFilter !== 'ALL' && jurisdictionFilter !== 'All Jurisdictions') {
    results = results.filter(t => t.jurisdiction === jurisdictionFilter);
  }

  if (letterFilter && letterFilter !== 'ALL') {
    results = results.filter(t => t.term.toUpperCase().startsWith(letterFilter.toUpperCase()));
  }

  if (query && query.trim() !== '') {
    const q = query.toLowerCase().trim();
    results = results.filter(t => 
      t.term.toLowerCase().includes(q) ||
      t.indonesianMeaning.toLowerCase().includes(q) ||
      t.plainEnglish.toLowerCase().includes(q) ||
      t.legalDefinition.toLowerCase().includes(q) ||
      t.civilLawEquivalent?.toLowerCase().includes(q) ||
      t.commonCollocations.some(c => c.toLowerCase().includes(q)) ||
      t.relatedTerms.some(r => r.toLowerCase().includes(q)) ||
      t.relatedPhrases?.some(p => p.toLowerCase().includes(q)) ||
      t.authenticClauseExcerpt?.toLowerCase().includes(q)
    );
  }

  return results;
}

export {
  generalLegalTerms,
  contractLawTerms,
  legalDraftingExpressions,
  litigationTerms,
  corporateLawTerms,
  latinMaximsTerms
};
