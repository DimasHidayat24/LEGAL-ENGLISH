import { LegalTerm } from '../../types';

// Original foundational modules
import { generalLegalTerms } from './generalTerms';
import { contractLawTerms } from './contractTerms';
import { legalDraftingExpressions } from './draftingExpressions';
import { litigationTerms } from './litigationTerms';
import { corporateLawTerms } from './corporateTerms';
import { criminalLawTerms } from './criminalLawTerms';
import { propertyLawTerms } from './propertyLawTerms';
import { tortLawTerms } from './tortLawTerms';
import { arbitrationTerms } from './arbitrationTerms';
import { internationalLawTerms } from './internationalLawTerms';
import { legalPersonsTerms } from './legalPersonsTerms';
import { legalWritingTerms } from './legalWritingTerms';
import { latinMaximsTerms } from './latinMaxims';

// Specialized field expansions
import { maInvestmentTerms } from './maInvestmentTerms';
import { bankingFinanceTerms } from './bankingFinanceTerms';
import { capitalMarketsTerms } from './capitalMarketsTerms';
import { intellectualPropertyTerms } from './intellectualPropertyTerms';
import { employmentLawTerms } from './employmentLawTerms';
import { taxLawTerms } from './taxLawTerms';
import { insolvencyTerms } from './insolvencyTerms';
import { humanRightsTerms } from './humanRightsTerms';
import { adminConstitutionalTerms } from './adminConstitutionalTerms';
import { competitionLawTerms } from './competitionLawTerms';
import { consumerProtectionTerms } from './consumerProtectionTerms';
import { dataPrivacyAiTerms } from './dataPrivacyAiTerms';
import { environmentalMiningTerms } from './environmentalMiningTerms';
import { tradeMaritimeTerms } from './tradeMaritimeTerms';
import { constructionLawTerms } from './constructionLawTerms';
import { courtroomAdvocacyTerms } from './courtroomAdvocacyTerms';
import { legalNegotiationTerms } from './legalNegotiationTerms';
import { legalCollocationsTerms } from './legalCollocationsTerms';
import { commercialContractsTerms } from './commercialContractsTerms';
import { islamicShariaFinanceTerms } from './islamicShariaFinanceTerms';
import { insuranceComplianceTerms } from './insuranceComplianceTerms';
import { specializedDraftingTerms } from './specializedDraftingTerms';
import { specializedLitigationTerms } from './specializedLitigationTerms';
import { specializedCorporateTerms } from './specializedCorporateTerms';
import { specializedCivilTortTerms } from './specializedCivilTortTerms';
import { specializedLatinMaximsTerms } from './specializedLatinMaximsTerms';
import { dualMeaningLegalTerms } from './dualMeaningLegalTerms';
import { masterExpandedTerms } from './masterExpandedTerms';
import { masterExpandedTermsPart2 } from './masterExpandedTermsPart2';
import { masterExpandedTermsPart3 } from './masterExpandedTermsPart3';
import { masterLegalTermsDatabase } from './masterLegalTermsDatabase';
import { masterExpansionPack } from './masterExpansionPack';
import { megaVocabularyExpansion } from './megaVocabularyExpansion';
import { extendedComprehensiveTerms } from './extendedComprehensiveTerms';
import { ultimateLegalLexiconPack } from './ultimateLegalLexiconPack';
import { indonesianCivilLawExpanded } from './indonesianCivilLawExpanded';
import { completeLegalCorpusPack } from './completeLegalCorpusPack';
import { megaComprehensiveTermsDatabase } from './megaComprehensiveTermsDatabase';
import { goldenLegalMasterPack } from './goldenLegalMasterPack';
import { supremeLegalMasterpiecePack } from './supremeLegalMasterpiecePack';
import { definitiveIndonesianLegalPack } from './definitiveIndonesianLegalPack';
import { finalMilestoneLegalPack } from './finalMilestoneLegalPack';
import { grandMasterLexicon500Plus } from './grandMasterLexicon500Plus';
import { pinnacleLexicon500Pinnacle } from './pinnacleLexicon500Pinnacle';

// Raw combined list aggregating all modular vocabularies
const rawLegalVocabularyList: LegalTerm[] = [
  ...generalLegalTerms,
  ...contractLawTerms,
  ...legalDraftingExpressions,
  ...litigationTerms,
  ...corporateLawTerms,
  ...criminalLawTerms,
  ...propertyLawTerms,
  ...tortLawTerms,
  ...arbitrationTerms,
  ...internationalLawTerms,
  ...legalPersonsTerms,
  ...legalWritingTerms,
  ...latinMaximsTerms,
  ...maInvestmentTerms,
  ...bankingFinanceTerms,
  ...capitalMarketsTerms,
  ...intellectualPropertyTerms,
  ...employmentLawTerms,
  ...taxLawTerms,
  ...insolvencyTerms,
  ...humanRightsTerms,
  ...adminConstitutionalTerms,
  ...competitionLawTerms,
  ...consumerProtectionTerms,
  ...dataPrivacyAiTerms,
  ...environmentalMiningTerms,
  ...tradeMaritimeTerms,
  ...constructionLawTerms,
  ...courtroomAdvocacyTerms,
  ...legalNegotiationTerms,
  ...legalCollocationsTerms,
  ...commercialContractsTerms,
  ...islamicShariaFinanceTerms,
  ...insuranceComplianceTerms,
  ...specializedDraftingTerms,
  ...specializedLitigationTerms,
  ...specializedCorporateTerms,
  ...specializedCivilTortTerms,
  ...specializedLatinMaximsTerms,
  ...dualMeaningLegalTerms,
  ...masterExpandedTerms,
  ...masterExpandedTermsPart2,
  ...masterExpandedTermsPart3,
  ...masterLegalTermsDatabase,
  ...masterExpansionPack,
  ...megaVocabularyExpansion,
  ...extendedComprehensiveTerms,
  ...ultimateLegalLexiconPack,
  ...indonesianCivilLawExpanded,
  ...completeLegalCorpusPack,
  ...megaComprehensiveTermsDatabase,
  ...goldenLegalMasterPack,
  ...supremeLegalMasterpiecePack,
  ...definitiveIndonesianLegalPack,
  ...finalMilestoneLegalPack,
  ...grandMasterLexicon500Plus,
  ...pinnacleLexicon500Pinnacle
];

// Deduplicate by term and id to guarantee absolute database integrity
const seenIds = new Set<string>();
const seenTerms = new Set<string>();

export const legalVocabularyList: LegalTerm[] = rawLegalVocabularyList.filter(term => {
  const normalizedId = term.id.toLowerCase().trim();
  const normalizedTerm = term.term.toUpperCase().trim();
  
  if (seenIds.has(normalizedId) || seenTerms.has(normalizedTerm)) {
    return false;
  }
  
  seenIds.add(normalizedId);
  seenTerms.add(normalizedTerm);
  return true;
});

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
      t.plainEnglish?.toLowerCase().includes(q) ||
      t.legalDefinition.toLowerCase().includes(q) ||
      t.civilLawEquivalent?.toLowerCase().includes(q) ||
      t.commonCollocations?.some(c => c.toLowerCase().includes(q)) ||
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
  criminalLawTerms,
  propertyLawTerms,
  tortLawTerms,
  arbitrationTerms,
  internationalLawTerms,
  legalPersonsTerms,
  legalWritingTerms,
  latinMaximsTerms,
  maInvestmentTerms,
  bankingFinanceTerms,
  capitalMarketsTerms,
  intellectualPropertyTerms,
  employmentLawTerms,
  taxLawTerms,
  insolvencyTerms,
  humanRightsTerms,
  adminConstitutionalTerms,
  competitionLawTerms,
  consumerProtectionTerms,
  dataPrivacyAiTerms,
  environmentalMiningTerms,
  tradeMaritimeTerms,
  constructionLawTerms,
  courtroomAdvocacyTerms,
  legalNegotiationTerms,
  legalCollocationsTerms,
  commercialContractsTerms,
  islamicShariaFinanceTerms,
  insuranceComplianceTerms,
  specializedDraftingTerms,
  specializedLitigationTerms,
  specializedCorporateTerms,
  specializedCivilTortTerms,
  specializedLatinMaximsTerms,
  dualMeaningLegalTerms,
  masterExpandedTerms,
  masterExpandedTermsPart2,
  masterExpandedTermsPart3,
  masterLegalTermsDatabase,
  masterExpansionPack,
  megaVocabularyExpansion,
  extendedComprehensiveTerms,
  ultimateLegalLexiconPack,
  indonesianCivilLawExpanded,
  completeLegalCorpusPack,
  megaComprehensiveTermsDatabase,
  goldenLegalMasterPack,
  supremeLegalMasterpiecePack,
  definitiveIndonesianLegalPack,
  finalMilestoneLegalPack,
  grandMasterLexicon500Plus,
  pinnacleLexicon500Pinnacle
};
