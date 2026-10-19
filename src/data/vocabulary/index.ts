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
import { documentInteractiveTerms } from './documentInteractiveTerms';

// Raw combined list aggregating all modular vocabularies
const rawLegalVocabularyList: LegalTerm[] = [
  ...documentInteractiveTerms,
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

/**
 * Canonical category map — the data packs use ~55 near-duplicate labels
 * ("Banking & Finance" vs "Banking, Finance & Fintech" …). Normalise them at
 * load time so filters show one clean chip per field of law.
 */
export const CANONICAL_CATEGORY_MAP: Record<string, string> = {
  'Administrative & Constitutional Law': 'Administrative & Constitutional Law',
  'Arbitration & ADR': 'Arbitration & ADR',
  'International Arbitration': 'Arbitration & ADR',
  'Banking & Finance': 'Banking, Finance & Insurance',
  'Banking, Finance & Fintech': 'Banking, Finance & Insurance',
  'Islamic & Sharia Law': 'Banking, Finance & Insurance',
  'Insurance Law': 'Banking, Finance & Insurance',
  'Insurance, Risk & Compliance': 'Banking, Finance & Insurance',
  'Capital Markets & Securities': 'Capital Markets, M&A & Investment',
  'M&A and Investment': 'Capital Markets, M&A & Investment',
  'Mergers, Acquisitions & Joint Ventures': 'Capital Markets, M&A & Investment',
  'Contract Law': 'Contract Law',
  'Commercial Contracts & Transactions': 'Contract Law',
  'Company & Corporate Law': 'Corporate Law',
  'Corporate & Commercial Law': 'Corporate Law',
  'Corporate Governance & Compliance': 'Corporate Law',
  'Competition & Antitrust': 'Competition & Consumer Law',
  'Competition & Antitrust Law': 'Competition & Consumer Law',
  'Consumer Protection': 'Competition & Consumer Law',
  'Construction Law': 'Construction Law',
  'Construction & Infrastructure Law': 'Construction Law',
  'Civil Litigation': 'Litigation & Dispute Resolution',
  'Litigation & Civil Procedure': 'Litigation & Dispute Resolution',
  'Litigation & Dispute Resolution': 'Litigation & Dispute Resolution',
  'Litigation & Procedure': 'Litigation & Dispute Resolution',
  'Courtroom & Advocacy English': 'Litigation & Dispute Resolution',
  'Criminal Law': 'Criminal Law',
  'Criminal Law & Procedure': 'Criminal Law',
  'Data Protection, Privacy & AI': 'Data Protection & Privacy',
  'Employment & Labor Law': 'Employment Law',
  'Environmental, Energy & Mining Law': 'Environmental, Energy & Mining',
  'General Legal Terms': 'General Legal Terms',
  'Legal Persons & Relationships': 'General Legal Terms',
  'Legal Collocations': 'General Legal Terms',
  'Insolvency & Restructuring': 'Insolvency & Restructuring',
  'Insolvency, Restructuring & Bankruptcy': 'Insolvency & Restructuring',
  'Intellectual Property': 'Intellectual Property',
  'International Law': 'International Law & Human Rights',
  'Public International Law': 'International Law & Human Rights',
  'Human Rights': 'International Law & Human Rights',
  'International Trade & Customs': 'Trade & Maritime Law',
  'Maritime & Shipping Law': 'Trade & Maritime Law',
  'Maritime, Shipping & Aviation Law': 'Trade & Maritime Law',
  'Latin Legal Terms': 'Latin Terms & Maxims',
  'Latin Maxims & Expressions': 'Latin Terms & Maxims',
  'Legal Drafting & Contract English': 'Legal Drafting',
  'Legal Drafting Expressions': 'Legal Drafting',
  'Legal Writing & Research': 'Legal Writing & Communication',
  'Legal Writing & Terminology': 'Legal Writing & Communication',
  'Legal Negotiation & Communication': 'Legal Writing & Communication',
  'Legal Negotiation & Drafting': 'Legal Writing & Communication',
  'Property Law': 'Property Law',
  'Property & Real Estate Law': 'Property Law',
  'Tax Law': 'Tax Law',
  'Tort Law': 'Tort Law',
  'Tort & Civil Wrongs': 'Tort Law',
};

export function canonicalCategory(category: string): string {
  return CANONICAL_CATEGORY_MAP[category?.trim()] ?? category;
}

export const legalVocabularyList: LegalTerm[] = rawLegalVocabularyList
  .filter(term => {
    const normalizedId = term.id.toLowerCase().trim();
    const normalizedTerm = term.term.toUpperCase().trim();

    if (seenIds.has(normalizedId) || seenTerms.has(normalizedTerm)) {
      return false;
    }

    seenIds.add(normalizedId);
    seenTerms.add(normalizedTerm);
    return true;
  })
  .map(term => {
    const category = canonicalCategory(term.category);
    return category === term.category ? term : { ...term, category: category as LegalTerm["category"] };
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
