import React, { useState, useMemo } from 'react';
import { useStudy } from '../context/StudyContext';
import { legalVocabularyList, searchLegalTerms } from '../data/vocabulary/index';
import { AudioPronounceButton } from './AudioPronounceButton';
import { SpeechAccent } from '../utils/speech';
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
  Volume2,
  Tag
} from 'lucide-react';

export const VocabularyDictionary: React.FC = () => {
  const { setActiveLookupTermId, isTermSaved, saveTerm, removeSavedTerm, setSelectedTab, savedTerms } = useStudy();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('ALL');
  const [selectedLetter, setSelectedLetter] = useState<string>('ALL');
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<string>('ALL');
  const [onlyDistinctConcepts, setOnlyDistinctConcepts] = useState<boolean>(false);
  const [preferredAccent, setPreferredAccent] = useState<SpeechAccent>('en-US');
  const [visibleCount, setVisibleCount] = useState<number>(30);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(legalVocabularyList.map(t => t.category).filter(Boolean)));
    unique.sort((a, b) => a.localeCompare(b));
    return unique;
  }, []);

  const openFlashcards = () => {
    try {
      window.history.pushState(null, '', '#/mystudy/flashcards');
    } catch (e) {
      /* ignore */
    }
    setSelectedTab('mystudy');
  };

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

  // Reset pagination when search or filters change
  React.useEffect(() => {
    setVisibleCount(30);
  }, [searchQuery, selectedCategory, selectedDifficulty, selectedType, selectedJurisdiction, selectedLetter, onlyDistinctConcepts]);

  const displayedTerms = useMemo(() => {
    return filteredTerms.slice(0, visibleCount);
  }, [filteredTerms, visibleCount]);

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
    setVisibleCount(30);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-8">
      
      {/* Header */}
      <div className="border-b border-line pb-6">
        <div className="flex items-center gap-2 mb-1.5">
          <BookOpen className="w-4 h-4 text-ink-2" />
          <span className="text-[11px] font-sans text-muted font-semibold">
            Dictionary
          </span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <h1 className="text-3xl sm:text-[44px] font-medium text-ink tracking-[-0.035em] leading-[1.1]">
            Legal English dictionary
          </h1>
          <button onClick={openFlashcards} className="btn-secondary px-4 py-2 text-sm self-start sm:self-auto">
            <Layers className="w-4 h-4" />
            Practise with flashcards{savedTerms.length > 0 ? ` (${savedTerms.length} saved)` : ''}
          </button>
        </div>
        <p className="text-sm sm:text-base text-muted font-sans mt-2 max-w-4xl leading-relaxed">
          Common law terms, drafting connectors, and procedural concepts — each mapped to its civil law / KUHPerdata counterpart, explained in Indonesian.
        </p>

        {/* Global Search Bar */}
        <div className="mt-6 space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-muted absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search terms, Indonesian equivalents, or KUHPerdata articles (e.g. consideration, wanprestasi, shall)"
              className="w-full pl-11 pr-11 py-3.5 rounded-full bg-surface border border-line text-sm font-sans text-ink placeholder:text-faint focus:outline-none focus:border-line-strong transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-ink cursor-pointer"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2 text-xs font-sans pb-1">
              <span className="text-muted shrink-0 font-medium flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-ink-2" />
                Category:
              </span>
              <button
                key="__all"
                onClick={() => setSelectedCategory('ALL')}
                aria-pressed={selectedCategory === 'ALL'}
                className={`px-3.5 py-1.5 whitespace-nowrap border transition-all cursor-pointer rounded-full text-xs font-medium ${
                  selectedCategory === 'ALL' ? 'bg-accent text-on-accent border-accent font-semibold' : 'bg-surface text-ink-2 border-line hover:border-line-strong hover:bg-surface-2 hover:text-ink'
                }`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 whitespace-nowrap border transition-all cursor-pointer rounded-full text-xs font-medium ${
                    selectedCategory === cat
                      ? 'bg-accent text-on-accent border-accent font-semibold shadow-xs'
                      : 'bg-surface text-muted border-line hover:border-line-strong hover:bg-surface-3 hover:text-ink'
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
            <div className="flex items-center gap-1.5 bg-surface border border-line px-3 py-1.5 rounded-full">
              <Tag className="w-3 h-3 text-ink-2" />
              <span className="text-muted font-medium">Type:</span>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                aria-label="Filter by Term Type"
                className="bg-transparent text-ink focus:outline-none cursor-pointer text-xs font-medium"
              >
                {termTypes.map(t => (
                  <option key={t.value} value={t.value} className="bg-surface text-ink">
                    {t.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Jurisdiction Select */}
            <div className="flex items-center gap-1.5 bg-surface border border-line px-3 py-1.5 rounded-full">
              <Globe2 className="w-3 h-3 text-ink-2" />
              <span className="text-muted font-medium">System:</span>
              <select
                value={selectedJurisdiction}
                onChange={(e) => setSelectedJurisdiction(e.target.value)}
                aria-label="Filter by Legal System Jurisdiction"
                className="bg-transparent text-ink focus:outline-none cursor-pointer text-xs font-medium"
              >
                {jurisdictions.map(j => (
                  <option key={j.value} value={j.value} className="bg-surface text-ink">
                    {j.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Distinct Concept Filter Toggle */}
            <button
              onClick={() => setOnlyDistinctConcepts(!onlyDistinctConcepts)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 border transition-all cursor-pointer rounded-full text-xs font-medium ${
                onlyDistinctConcepts
                  ? 'bg-accent text-on-accent border-accent font-semibold'
                  : 'bg-surface text-muted border-line hover:border-line-strong hover:text-ink'
              }`}
            >
              <AlertTriangle className={`w-3.5 h-3.5 ${onlyDistinctConcepts ? 'text-ink' : 'text-muted'}`} />
              <span>Distinct Civil Law Concepts Only</span>
            </button>

            {/* Active Filters Clear Button */}
            {activeFiltersCount > 0 && (
              <button
                onClick={resetAllFilters}
                className="text-[11px] text-ink-2 hover:text-ink underline cursor-pointer ml-auto font-medium"
              >
                Reset Filters ({activeFiltersCount})
              </button>
            )}
          </div>

          {/* Alphabetical A-Z Scrubber */}
          <div className="flex items-center gap-1 overflow-x-auto text-[11px] font-sans py-2 border-t border-b border-line no-scrollbar">
            <span className="text-muted shrink-0 mr-1.5 font-bold">A-Z:</span>
            {alphabet.map((letter) => {
              const countForLetter = legalVocabularyList.filter(t => 
                letter === 'ALL' ? true : t.term.toUpperCase().startsWith(letter)
              ).length;

              return (
                <button
                  key={letter}
                  onClick={() => setSelectedLetter(letter)}
                  disabled={letter !== 'ALL' && countForLetter === 0}
                  className={`px-2.5 py-1 min-w-[26px] text-center transition-all cursor-pointer rounded-full font-medium ${
                    selectedLetter === letter
                      ? 'bg-accent text-on-accent font-bold border border-accent'
                      : countForLetter === 0
                      ? 'text-faint cursor-not-allowed opacity-30'
                      : 'text-muted hover:text-ink hover:bg-surface-3'
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

      {/* Results Count & Difficulty Filter & Pronunciation Accent Toggle */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs font-sans text-muted">
        <div className="flex items-center gap-2">
          <span className="text-ink font-semibold">
            Showing {displayedTerms.length} of {filteredTerms.length} Legal Terms
          </span>
          {filteredTerms.length !== legalVocabularyList.length && (
            <span className="text-faint font-normal">({legalVocabularyList.length} in entire database)</span>
          )}
          {searchQuery && (
            <span className="text-faint font-normal">for &quot;{searchQuery}&quot;</span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Accent Pronunciation Toggle */}
          <div className="flex items-center gap-1.5 p-1 bg-surface border border-line rounded-full">
            <span className="text-muted font-medium px-2 flex items-center gap-1">
              <Volume2 className="w-3 h-3 text-ink-2" />
              Accent:
            </span>
            <button
              onClick={() => setPreferredAccent('en-US')}
              className={`px-2.5 py-0.5 rounded-full transition-all cursor-pointer font-medium text-[11px] ${
                preferredAccent === 'en-US'
                  ? 'bg-accent text-on-accent font-semibold border border-accent shadow-xs'
                  : 'text-muted hover:text-ink'
              }`}
              title="US English Legal Pronunciation"
            >
              US
            </button>
            <button
              onClick={() => setPreferredAccent('en-GB')}
              className={`px-2.5 py-0.5 rounded-full transition-all cursor-pointer font-medium text-[11px] ${
                preferredAccent === 'en-GB'
                  ? 'bg-accent text-on-accent font-semibold border border-accent shadow-xs'
                  : 'text-muted hover:text-ink'
              }`}
              title="UK / Commonwealth Legal Pronunciation"
            >
              UK
            </button>
          </div>

          {/* Difficulty Filter */}
          <div className="flex items-center gap-1.5 p-1 bg-surface border border-line rounded-full">
            <span className="text-muted font-medium px-2">Difficulty:</span>
            {['ALL', 'Fundamental', 'Intermediate', 'Advanced'].map((diff) => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-3 py-1 rounded-full transition-all cursor-pointer font-medium ${
                  selectedDifficulty.toLowerCase() === diff.toLowerCase()
                    ? 'bg-accent text-on-accent font-semibold border border-accent shadow-xs'
                    : 'text-muted hover:text-ink'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Vocabulary Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedTerms.map((term) => {
          const isSaved = isTermSaved(term.id);

          return (
            <div
              key={term.id}
              onClick={() => setActiveLookupTermId(term.id)}
              className="p-6 cursor-pointer group flex flex-col justify-between rounded-2xl lexa-card hover:border-line-strong hover:bg-surface hover:-translate-y-1 transition-all duration-200 relative"
            >
              <div>
                {/* Header Tag Badges & Action Buttons (Pronounce 🔊 + Bookmark 🔖) */}
                <div className="flex items-start justify-between gap-2 mb-2.5">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="badge-accent text-[11px] font-sans uppercase px-2.5 py-0.5 rounded-full font-semibold">
                        {term.category}
                      </span>
                      {term.termType && (
                        <span className="badge-navy text-[11px] font-sans px-2.5 py-0.5 rounded-full font-semibold">
                          {term.termType}
                        </span>
                      )}
                      <span className="text-[11px] font-sans text-faint font-normal">
                        {term.partOfSpeech}
                      </span>
                    </div>

                    {/* Term Title */}
                    <h3 className="font-serif font-semibold text-xl sm:text-2xl text-ink group-hover:text-ink-2 transition-colors pt-1.5 break-words leading-tight">
                      {term.term}
                    </h3>
                  </div>

                  {/* Top-Right Action Controls: Audio Speaker Pronounce & Bookmark */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <AudioPronounceButton 
                      term={term.term}
                      accent={preferredAccent}
                      size="sm"
                      tooltipText={`Pronounce "${term.term}" (${preferredAccent === 'en-US' ? 'US' : 'UK'})`}
                    />

                    {/* Bookmark Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isSaved) {
                          removeSavedTerm(term.id);
                        } else {
                          saveTerm(term.id);
                        }
                      }}
                      className={`min-w-[36px] min-h-[36px] sm:min-w-[40px] sm:min-h-[40px] p-2 border transition-all cursor-pointer rounded-full flex items-center justify-center ${
                        isSaved
                          ? 'bg-accent text-on-accent border-accent shadow-xs'
                          : 'bg-surface text-muted border-line hover:text-ink hover:bg-surface-3  '
                      }`}
                      aria-label={isSaved ? `Remove ${term.term} from saved terms` : `Save ${term.term} to My Study`}
                      title={isSaved ? "Saved to My Study" : "Save to My Study"}
                    >
                      {isSaved ? <BookmarkCheck className="w-3.5 h-3.5 text-ink-2  " /> : <Bookmark className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Phonetic Pronunciation IPA */}
                {term.pronunciation && (
                  <div className="text-xs font-mono font-medium text-muted tracking-wide mb-3">
                    {term.pronunciation}
                  </div>
                )}

                {/* Indonesian Meaning & Concept */}
                <div className="p-4 rounded-2xl bg-surface border border-line mb-3.5 space-y-1.5">
                  <p className="font-sans font-bold text-sm sm:text-base text-ink leading-snug">
                    {term.indonesianMeaning}
                  </p>
                  <p className="text-xs sm:text-[13px] text-muted leading-relaxed font-sans">
                    {term.indonesianLegalConcept}
                  </p>
                </div>

                {/* Conceptual Distinction Banner if applicable */}
                {term.isDistinctConcept && (
                  <div className="mb-3.5 p-3 rounded-xl bg-surface border border-line flex items-start gap-2.5 text-xs">
                    <AlertTriangle className="w-3.5 h-3.5 text-ink-2 shrink-0 mt-0.5" />
                    <div className="text-xs text-muted leading-relaxed font-sans">
                      <span className="font-bold text-ink  ">Distinct Concept:</span> No exact civil law equivalent.
                    </div>
                  </div>
                )}

                {/* Plain English & Black's Law Summary */}
                <div className="text-xs sm:text-[13px] text-muted font-sans leading-relaxed mb-3.5">
                  <strong className="text-ink font-semibold">Plain English:</strong> {term.plainEnglish || term.legalDefinition}
                </div>

                {/* Context Clause / Example Preview */}
                {(term.authenticClauseExcerpt || term.exampleSentenceEn) && (
                  <div className="text-xs sm:text-[13px] font-serif italic text-ink-2 mb-3.5 pl-3.5 border-l-2 border-line-strong bg-surface py-2.5 pr-3 rounded-r-xl leading-relaxed break-words">
                    &ldquo;{term.authenticClauseExcerpt || term.exampleSentenceEn}&rdquo;
                  </div>
                )}

                {/* Common Collocations preview */}
                {term.commonCollocations && term.commonCollocations.length > 0 && (
                  <div className="mb-3.5">
                    <span className="text-[11px] font-sans text-faint font-semibold block mb-1.5">Common Collocations:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {term.commonCollocations.map((col, idx) => (
                        <span key={idx} className="text-[11px] font-sans px-2.5 py-1 bg-surface border border-line text-muted rounded-full font-normal">
                          {col}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="pt-3.5 border-t border-line space-y-2 mt-auto">
                {/* Connected Document link if present */}
                {term.connectedDocIds && term.connectedDocIds.length > 0 && (
                  <div className="flex items-center gap-1.5 text-xs font-sans text-faint  ">
                    <FileText className="w-3.5 h-3.5 text-ink-2 shrink-0" />
                    <span className="text-muted break-words">
                      In: {term.connectedDocIds[0].title}
                    </span>
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-sans text-muted  ">
                  <span className="text-xs text-muted italic leading-snug">
                    {term.civilLawEquivalent || 'KUHPerdata mapping'}
                  </span>
                  <span className="font-bold flex items-center gap-1 group-hover:text-ink text-ink shrink-0 ml-auto">
                    Inspect Entry <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination & Load More Controls */}
      {filteredTerms.length > displayedTerms.length && (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 pb-2">
          <button
            type="button"
            onClick={() => setVisibleCount(prev => prev + 30)}
            className="btn-primary px-6 py-3 text-xs font-medium cursor-pointer hover:scale-[1.02] transition-transform"
          >
            Load Next 30 Terms ({filteredTerms.length - displayedTerms.length} remaining)
          </button>

          <button
            type="button"
            onClick={() => setVisibleCount(filteredTerms.length)}
            className="btn-secondary px-5 py-3 text-xs cursor-pointer transition-all"
          >
            Show All ({filteredTerms.length} Terms)
          </button>
        </div>
      )}

      {/* Empty State */}
      {filteredTerms.length === 0 && (
        <div className="text-center py-16 rounded-2xl bg-surface border border-line p-8 space-y-4 shadow-sm">
          <BookOpen className="w-12 h-12 mx-auto text-faint" />
          <h3 className="font-serif font-semibold text-xl text-ink">
            No legal terms found matching your filters
          </h3>
          <p className="text-sm font-sans text-muted max-w-md mx-auto">
            Try searching for common terms such as &quot;consideration&quot;, &quot;indemnity&quot;, &quot;material breach&quot;, &quot;shall&quot;, or &quot;wanprestasi&quot;.
          </p>
          <button
            onClick={resetAllFilters}
            className="btn-primary px-5 py-2.5 text-xs font-medium"
          >
            Reset All Search Filters
          </button>
        </div>
      )}

    </div>
  );
};
