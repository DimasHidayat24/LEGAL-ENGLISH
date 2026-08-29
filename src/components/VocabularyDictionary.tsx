import React, { useState, useMemo } from 'react';
import { useStudy } from '../context/StudyContext';
import { legalVocabularyList, searchLegalTerms } from '../data/vocabulary/index';
import { 
  Search, 
  Bookmark, 
  BookmarkCheck, 
  ArrowRight, 
  BookOpen, 
  X, 
  AlertTriangle, 
  FileText, 
  Globe2, 
  Layers, 
  Tag
} from 'lucide-react';

export const VocabularyDictionary: React.FC = () => {
  const { setActiveLookupTermId, isTermSaved, saveTerm, removeSavedTerm } = useStudy();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('ALL');
  const [selectedLetter, setSelectedLetter] = useState<string>('ALL');
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<string>('ALL');
  const [onlyDistinctConcepts, setOnlyDistinctConcepts] = useState<boolean>(false);

  const categories = [
    'ALL',
    'General Legal Terms',
    'Contract Law',
    'Legal Drafting Expressions',
    'Litigation & Dispute Resolution',
    'Corporate & Commercial Law',
    'Latin Legal Terms'
  ];

  const termTypes: { label: string; value: string }[] = [
    { label: 'All Types', value: 'ALL' },
    { label: 'Single Terms', value: 'Word' },
    { label: 'Legal Phrases', value: 'Legal phrase' },
    { label: 'Expressions', value: 'Legal expression' },
    { label: 'Legal Concepts', value: 'Legal concept' },
    { label: 'Drafting Connectors', value: 'Drafting expression' },
    { label: 'Latin Maxims', value: 'Latin term' }
  ];

  const jurisdictions: { label: string; value: string }[] = [
    { label: 'All Jurisdictions', value: 'ALL' },
    { label: 'Common Law', value: 'General/Common Law' },
    { label: 'Indonesian Civil Law', value: 'Indonesian Civil Law' },
    { label: 'UK / Commonwealth', value: 'UK / Commonwealth' },
    { label: 'US Law', value: 'US' },
    { label: 'International / CISG', value: 'International / CISG' }
  ];

  const alphabet = ['ALL', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')];

  const filteredTerms = useMemo(() => {
    let results = searchLegalTerms(
      searchQuery,
      selectedCategory,
      selectedDifficulty,
      selectedType,
      selectedJurisdiction,
      selectedLetter
    );

    if (onlyDistinctConcepts) {
      results = results.filter(t => t.isDistinctConcept);
    }

    return results;
  }, [searchQuery, selectedCategory, selectedDifficulty, selectedType, selectedJurisdiction, selectedLetter, onlyDistinctConcepts]);

  const activeFiltersCount = [
    selectedCategory !== 'ALL',
    selectedDifficulty !== 'ALL',
    selectedLetter !== 'ALL',
    selectedType !== 'ALL',
    selectedJurisdiction !== 'ALL',
    onlyDistinctConcepts
  ].filter(Boolean).length;

  const resetAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('ALL');
    setSelectedDifficulty('ALL');
    setSelectedLetter('ALL');
    setSelectedType('ALL');
    setSelectedJurisdiction('ALL');
    setOnlyDistinctConcepts(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="border-b border-[#26344A] pb-6">
        <div className="flex items-center gap-2 mb-1">
          <BookOpen className="w-4 h-4 text-[#C9A45C]" />
          <span className="text-[11px] font-sans tracking-widest uppercase text-[#C9A45C] font-bold">
            LEXA COMPREHENSIVE LEGAL LEXICON
          </span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-sans font-extrabold text-[#F5F3EE] tracking-tight">
          Legal English Lexicon & Knowledge Graph
        </h1>
        <p className="text-sm sm:text-base text-[#AAB4C3] font-sans mt-2 max-w-4xl leading-relaxed">
          The definitive Legal English dictionary crafted for Indonesian law students and practitioners. Explore common law terminology, drafting connectors, procedural concepts, and precise civil law / KUHPerdata conceptual mappings.
        </p>

        {/* Global Search Bar */}
        <div className="mt-6 space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-[#7F8A9B] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search legal terms, Indonesian equivalents, Black's Law definitions, or KUHPerdata articles (e.g., consideration, indemnification, wanprestasi, shall)..."
              className="w-full pl-10 pr-10 py-3 lexa-input text-sm font-sans rounded-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#7F8A9B] hover:text-[#F5F3EE] cursor-pointer"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 overflow-x-auto text-xs font-sans pb-1 no-scrollbar">
              <span className="text-[#AAB4C3] shrink-0 font-bold flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-[#C9A45C]" />
                Category:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 whitespace-nowrap border transition-colors cursor-pointer rounded-xs text-xs font-semibold ${
                    selectedCategory === cat
                      ? 'bg-[#C9A45C] text-[#0B1220] border-[#C9A45C] font-bold shadow-xs'
                      : 'bg-[#111A2B] text-[#AAB4C3] border-[#26344A] hover:bg-[#172235] hover:text-[#F5F3EE]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Secondary Filters Bar: Type, Jurisdiction, Conceptual Note Toggle */}
          <div className="flex flex-wrap items-center gap-3 pt-1 text-xs font-sans">
            {/* Term Type Select */}
            <div className="flex items-center gap-1.5 bg-[#111A2B] border border-[#26344A] px-2.5 py-1 rounded-xs">
              <Tag className="w-3 h-3 text-[#AAB4C3]" />
              <span className="text-[#AAB4C3] font-medium">Type:</span>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                aria-label="Filter by Term Type"
                className="bg-transparent text-[#F5F3EE] focus:outline-none cursor-pointer text-xs font-medium"
              >
                {termTypes.map(t => (
                  <option key={t.value} value={t.value} className="bg-[#111A2B] text-[#F5F3EE]">
                    {t.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Jurisdiction Select */}
            <div className="flex items-center gap-1.5 bg-[#111A2B] border border-[#26344A] px-2.5 py-1 rounded-xs">
              <Globe2 className="w-3 h-3 text-[#AAB4C3]" />
              <span className="text-[#AAB4C3] font-medium">System:</span>
              <select
                value={selectedJurisdiction}
                onChange={(e) => setSelectedJurisdiction(e.target.value)}
                aria-label="Filter by Legal System Jurisdiction"
                className="bg-transparent text-[#F5F3EE] focus:outline-none cursor-pointer text-xs font-medium"
              >
                {jurisdictions.map(j => (
                  <option key={j.value} value={j.value} className="bg-[#111A2B] text-[#F5F3EE]">
                    {j.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Distinct Concept Filter Toggle */}
            <button
              onClick={() => setOnlyDistinctConcepts(!onlyDistinctConcepts)}
              className={`flex items-center gap-1.5 px-2.5 py-1 border transition-colors cursor-pointer rounded-xs text-xs font-medium ${
                onlyDistinctConcepts
                  ? 'bg-[#172235] text-[#E8D9B5] border-[#C9A45C] font-bold'
                  : 'bg-[#111A2B] text-[#AAB4C3] border-[#26344A] hover:text-[#F5F3EE]'
              }`}
            >
              <AlertTriangle className={`w-3 h-3 ${onlyDistinctConcepts ? 'text-[#C9A45C]' : 'text-[#7F8A9B]'}`} />
              <span>Distinct Civil Law Concepts Only</span>
            </button>

            {/* Active Filters Clear Button */}
            {activeFiltersCount > 0 && (
              <button
                onClick={resetAllFilters}
                className="text-[11px] text-[#AAB4C3] hover:text-[#E8D9B5] underline cursor-pointer ml-auto font-medium"
              >
                Reset Filters ({activeFiltersCount})
              </button>
            )}
          </div>

          {/* Alphabetical A-Z Scrubber */}
          <div className="flex items-center gap-1 overflow-x-auto text-[11px] font-sans py-2 border-t border-b border-[#26344A] no-scrollbar">
            <span className="text-[#AAB4C3] shrink-0 mr-1.5 font-bold">A-Z:</span>
            {alphabet.map((letter) => {
              const countForLetter = legalVocabularyList.filter(t => 
                letter === 'ALL' ? true : t.term.toUpperCase().startsWith(letter)
              ).length;

              return (
                <button
                  key={letter}
                  onClick={() => setSelectedLetter(letter)}
                  disabled={letter !== 'ALL' && countForLetter === 0}
                  className={`px-2 py-0.5 min-w-[24px] text-center transition-colors cursor-pointer rounded-xs font-semibold ${
                    selectedLetter === letter
                      ? 'bg-[#C9A45C] text-[#0B1220] font-bold shadow-xs'
                      : countForLetter === 0
                      ? 'text-[#26344A] cursor-not-allowed opacity-40'
                      : 'text-[#AAB4C3] hover:text-[#F5F3EE] hover:bg-[#172235]'
                  }`}
                  title={`${countForLetter} terms starting with ${letter}`}
                >
                  {letter}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Results Count & Difficulty Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-sans text-[#AAB4C3]">
        <div className="flex items-center gap-2">
          <span className="text-[#F5F3EE] font-bold">
            Showing {filteredTerms.length} of {legalVocabularyList.length} Legal Terms
          </span>
          {searchQuery && (
            <span className="text-[#7F8A9B] font-normal">for &quot;{searchQuery}&quot;</span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[#AAB4C3] font-medium">Difficulty:</span>
          {['ALL', 'Fundamental', 'Intermediate', 'Advanced'].map((diff) => (
            <button
              key={diff}
              onClick={() => setSelectedDifficulty(diff)}
              className={`px-2.5 py-1 rounded-xs transition-colors cursor-pointer font-medium ${
                selectedDifficulty.toLowerCase() === diff.toLowerCase()
                  ? 'bg-[#C9A45C] text-[#0B1220] font-bold'
                  : 'text-[#AAB4C3] hover:text-[#F5F3EE]'
              }`}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>

      {/* Vocabulary Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTerms.map((term) => {
          const isSaved = isTermSaved(term.id);

          return (
            <div
              key={term.id}
              onClick={() => setActiveLookupTermId(term.id)}
              className="lexa-card p-5 cursor-pointer group flex flex-col justify-between rounded-xs relative"
            >
              <div>
                {/* Header Tag Badges */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="badge-gold text-[10px] font-sans uppercase px-1.5 py-0.5 rounded-xs font-semibold">
                        {term.category}
                      </span>
                      {term.termType && (
                        <span className="badge-navy text-[10px] font-sans px-1.5 py-0.5 rounded-xs font-medium">
                          {term.termType}
                        </span>
                      )}
                      <span className="text-[10px] font-sans text-[#AAB4C3] font-medium">
                        {term.partOfSpeech}
                      </span>
                    </div>

                    {/* Term Title: Inter 800 in #F5F3EE */}
                    <h3 className="font-sans font-extrabold text-xl text-[#F5F3EE] group-hover:text-[#E8D9B5] transition-colors">
                      {term.term}
                    </h3>
                  </div>

                  {/* Bookmark Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isSaved) {
                        removeSavedTerm(term.id);
                      } else {
                        saveTerm(term.id);
                      }
                    }}
                    className={`p-1.5 border transition-colors cursor-pointer rounded-xs shrink-0 ${
                      isSaved
                        ? 'bg-[#C9A45C] text-[#0B1220] border-[#C9A45C]'
                        : 'bg-[#111A2B] text-[#AAB4C3] border-[#26344A] hover:text-[#F5F3EE] hover:border-[#C9A45C]/50'
                    }`}
                    title={isSaved ? "Saved to My Study" : "Save to My Study"}
                  >
                    {isSaved ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Pronunciation */}
                {term.pronunciation && (
                  <div className="text-xs font-sans text-[#AAB4C3] mb-2">
                    {term.pronunciation}
                  </div>
                )}

                {/* Indonesian Meaning & Concept */}
                <div className="p-3 bg-[#111A2B] border-l-2 border-[#C9A45C] border-y border-r border-[#26344A] mb-3 rounded-xs space-y-1">
                  <p className="font-sans font-bold text-sm text-[#F5F3EE]">
                    {term.indonesianMeaning}
                  </p>
                  <p className="text-xs text-[#C5CBD5] leading-snug line-clamp-2 font-sans">
                    {term.indonesianLegalConcept}
                  </p>
                </div>

                {/* Conceptual Distinction Banner if applicable */}
                {term.isDistinctConcept && (
                  <div className="mb-3 p-2 bg-[#111A2B] border border-[#C9A45C]/40 rounded-xs flex items-start gap-2 text-xs">
                    <AlertTriangle className="w-3.5 h-3.5 text-[#C9A45C] shrink-0 mt-0.5" />
                    <div className="text-[11px] text-[#E8D9B5] leading-tight font-sans">
                      <span className="font-bold text-[#C9A45C]">Distinct Concept:</span> No exact civil law equivalent.
                    </div>
                  </div>
                )}

                {/* Plain English & Black's Law Summary */}
                <div className="text-xs text-[#AAB4C3] font-sans leading-relaxed line-clamp-2 mb-3">
                  <strong className="text-[#F5F3EE] font-semibold">Plain English:</strong> {term.plainEnglish || term.legalDefinition}
                </div>

                {/* Common Collocations preview */}
                {term.commonCollocations && term.commonCollocations.length > 0 && (
                  <div className="mb-3">
                    <span className="text-[10px] font-sans text-[#AAB4C3] font-semibold block mb-1">Common Collocations:</span>
                    <div className="flex flex-wrap gap-1">
                      {term.commonCollocations.slice(0, 3).map((col, idx) => (
                        <span key={idx} className="text-[10px] font-sans px-1.5 py-0.5 bg-[#111A2B] border border-[#26344A] text-[#C5CBD5] rounded-xs font-medium">
                          {col}
                        </span>
                      ))}
                      {term.commonCollocations.length > 3 && (
                        <span className="text-[10px] font-sans text-[#AAB4C3] px-1 py-0.5 font-medium">
                          +{term.commonCollocations.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="pt-3 border-t border-[#26344A] space-y-2">
                {/* Connected Document link if present */}
                {term.connectedDocIds && term.connectedDocIds.length > 0 && (
                  <div className="flex items-center gap-1.5 text-[11px] font-sans text-[#AAB4C3] font-medium">
                    <FileText className="w-3 h-3 text-[#C9A45C] shrink-0" />
                    <span className="truncate text-[#C5CBD5]">
                      In: {term.connectedDocIds[0].title}
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between text-xs font-sans text-[#AAB4C3]">
                  <span className="text-[10px] text-[#AAB4C3] italic line-clamp-1 max-w-[170px]">
                    {term.civilLawEquivalent || 'KUHPerdata mapping'}
                  </span>
                  <span className="font-bold flex items-center gap-1 group-hover:text-[#C9A45C] text-[#F5F3EE]">
                    Inspect Entry <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredTerms.length === 0 && (
        <div className="text-center py-16 lexa-card p-8 space-y-4 rounded-xs">
          <BookOpen className="w-12 h-12 mx-auto text-[#7F8A9B]" />
          <h3 className="font-sans font-bold text-xl text-[#F5F3EE]">
            No legal terms found matching your filters
          </h3>
          <p className="text-sm font-sans text-[#AAB4C3] max-w-md mx-auto">
            Try searching for common terms such as &quot;consideration&quot;, &quot;indemnity&quot;, &quot;material breach&quot;, &quot;shall&quot;, or &quot;wanprestasi&quot;.
          </p>
          <button
            onClick={resetAllFilters}
            className="btn-primary px-5 py-2.5 text-xs rounded-xs uppercase tracking-wider"
          >
            Reset All Search Filters
          </button>
        </div>
      )}

    </div>
  );
};
