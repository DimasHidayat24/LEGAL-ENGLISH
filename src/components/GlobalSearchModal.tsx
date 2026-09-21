import React, { useState, useMemo } from 'react';
import { useStudy } from '../context/StudyContext';
import { legalVocabularyList } from '../data/vocabularyData';
import { sampleLegalDocuments } from '../data/documentsData';
import { curriculumLessons } from '../data/curriculumData';
import { comparativeLawList } from '../data/comparativeLawData';
import { editorialArticlesList } from '../data/articlesData';
import { writingModulesList } from '../data/writingData';
import { Search, X, BookOpen, FileText, Scale, Sparkles, ArrowRight } from 'lucide-react';
import { AudioPronounceButton } from './AudioPronounceButton';

export const GlobalSearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, setActiveLookupTermId, setSelectedTab, setActiveDocId, setActiveLessonId } = useStudy();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'ALL' | 'TERMS' | 'DOCS' | 'LESSONS' | 'COMPARATIVE' | 'ARTICLES' | 'WRITE'>('ALL');

  const filteredResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) {
      // Return featured items when empty
      return {
        terms: legalVocabularyList.slice(0, 6),
        docs: sampleLegalDocuments.slice(0, 3),
        lessons: curriculumLessons.slice(0, 3),
        comparative: comparativeLawList.slice(0, 2),
        articles: editorialArticlesList.slice(0, 2),
        writing: writingModulesList.slice(0, 2)
      };
    }

    const matchedTerms = legalVocabularyList.filter(t => 
      t.term.toLowerCase().includes(q) ||
      t.indonesianMeaning.toLowerCase().includes(q) ||
      t.legalDefinition.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q)
    );

    const matchedDocs = sampleLegalDocuments.filter(d =>
      d.title.toLowerCase().includes(q) ||
      d.abstractEn.toLowerCase().includes(q) ||
      d.abstractId.toLowerCase().includes(q) ||
      d.jurisdiction.toLowerCase().includes(q)
    );

    const matchedLessons = curriculumLessons.filter(l =>
      l.title.toLowerCase().includes(q) ||
      l.titleId.toLowerCase().includes(q) ||
      l.overviewEn.toLowerCase().includes(q) ||
      l.overviewId.toLowerCase().includes(q)
    );

    const matchedComparative = comparativeLawList.filter(c =>
      c.englishTerm.toLowerCase().includes(q) ||
      c.indonesianTerm.toLowerCase().includes(q) ||
      c.whyContextMatters.toLowerCase().includes(q)
    );

    const matchedArticles = editorialArticlesList.filter(a =>
      a.title.toLowerCase().includes(q) ||
      a.titleId.toLowerCase().includes(q) ||
      a.summary.toLowerCase().includes(q)
    );

    const matchedWriting = writingModulesList.filter(w =>
      w.title.toLowerCase().includes(q) ||
      w.documentType.toLowerCase().includes(q) ||
      w.purposeId.toLowerCase().includes(q)
    );

    return {
      terms: matchedTerms,
      docs: matchedDocs,
      lessons: matchedLessons,
      comparative: matchedComparative,
      articles: matchedArticles,
      writing: matchedWriting
    };
  }, [searchQuery]);

  if (!isSearchOpen) return null;

  const totalHits = filteredResults.terms.length + 
                    filteredResults.docs.length + 
                    filteredResults.lessons.length + 
                    filteredResults.comparative.length + 
                    filteredResults.articles.length + 
                    filteredResults.writing.length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-20 px-4 bg-[#050505]/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div 
        className="bg-[#121212]/95 backdrop-blur-2xl border border-white/[0.14] text-[#F2F2F2] w-full max-w-3xl max-h-[82vh] flex flex-col rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.8)] animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Search Bar Input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.08] bg-[#181818]/90">
          <Search className="w-5 h-5 text-[#A8A8A8] shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search legal terms (e.g. indemnity, whereas, wanprestasi, shall)..."
            className="w-full text-base font-sans bg-transparent text-[#F2F2F2] placeholder:text-[#707070] focus:outline-none"
            autoFocus
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="text-xs font-sans text-[#A8A8A8] hover:text-white cursor-pointer font-medium"
            >
              Clear
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1.5 text-[#A8A8A8] hover:text-white hover:bg-white/[0.08] cursor-pointer rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 px-5 py-2.5 bg-[#0C0C0C] border-b border-white/[0.08] overflow-x-auto text-xs font-sans no-scrollbar">
          <button
            onClick={() => setSelectedFilter('ALL')}
            className={`px-3 py-1 whitespace-nowrap cursor-pointer rounded-full transition-all text-xs ${
              selectedFilter === 'ALL' 
                ? 'bg-[#242424] text-white font-semibold border border-white/20 shadow-xs' 
                : 'bg-[#151515] text-[#A8A8A8] border border-white/[0.08] hover:text-white hover:bg-[#1C1C1C] font-normal'
            }`}
          >
            All Results ({totalHits})
          </button>
          <button
            onClick={() => setSelectedFilter('TERMS')}
            className={`px-3 py-1 whitespace-nowrap cursor-pointer rounded-full transition-all text-xs ${
              selectedFilter === 'TERMS' 
                ? 'bg-[#242424] text-white font-semibold border border-white/20 shadow-xs' 
                : 'bg-[#151515] text-[#A8A8A8] border border-white/[0.08] hover:text-white hover:bg-[#1C1C1C] font-normal'
            }`}
          >
            Vocabulary ({filteredResults.terms.length})
          </button>
          <button
            onClick={() => setSelectedFilter('DOCS')}
            className={`px-3 py-1 whitespace-nowrap cursor-pointer rounded-full transition-all text-xs ${
              selectedFilter === 'DOCS' 
                ? 'bg-[#242424] text-white font-semibold border border-white/20 shadow-xs' 
                : 'bg-[#151515] text-[#A8A8A8] border border-white/[0.08] hover:text-white hover:bg-[#1C1C1C] font-normal'
            }`}
          >
            Documents ({filteredResults.docs.length})
          </button>
          <button
            onClick={() => setSelectedFilter('LESSONS')}
            className={`px-3 py-1 whitespace-nowrap cursor-pointer rounded-full transition-all text-xs ${
              selectedFilter === 'LESSONS' 
                ? 'bg-[#242424] text-white font-semibold border border-white/20 shadow-xs' 
                : 'bg-[#151515] text-[#A8A8A8] border border-white/[0.08] hover:text-white hover:bg-[#1C1C1C] font-normal'
            }`}
          >
            Lessons ({filteredResults.lessons.length})
          </button>
          <button
            onClick={() => setSelectedFilter('COMPARATIVE')}
            className={`px-3 py-1 whitespace-nowrap cursor-pointer rounded-full transition-all text-xs ${
              selectedFilter === 'COMPARATIVE' 
                ? 'bg-[#242424] text-white font-semibold border border-white/20 shadow-xs' 
                : 'bg-[#151515] text-[#A8A8A8] border border-white/[0.08] hover:text-white hover:bg-[#1C1C1C] font-normal'
            }`}
          >
            Same Concept ({filteredResults.comparative.length})
          </button>
        </div>

        {/* Scrollable Results List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* 1. Legal Terms */}
          {(selectedFilter === 'ALL' || selectedFilter === 'TERMS') && filteredResults.terms.length > 0 && (
            <div className="space-y-2.5">
              <div className="text-[11px] font-sans uppercase tracking-wider text-[#A8A8A8] font-semibold flex items-center gap-1.5 pb-1 border-b border-white/[0.08]">
                <BookOpen className="w-3.5 h-3.5 text-[#DCDCDC]" />
                Legal Terms & Definitions ({filteredResults.terms.length})
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {filteredResults.terms.map(t => (
                  <div
                    key={t.id}
                    onClick={() => {
                      setIsSearchOpen(false);
                      setActiveLookupTermId(t.id);
                    }}
                    className="p-3.5 rounded-2xl bg-[#151515] border border-white/[0.08] hover:border-white/20 cursor-pointer transition-all hover:shadow-md group flex items-start justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-sans font-bold text-base text-[#F2F2F2] group-hover:text-white transition-colors">
                          {t.term}
                        </span>
                        <span className="text-[10px] font-sans px-2.5 py-0.5 bg-[#242424] text-[#DCDCDC] rounded-full border border-white/10">
                          {t.category}
                        </span>
                      </div>
                      <p className="text-xs text-[#A8A8A8] mt-1 line-clamp-1 font-sans">
                        {t.indonesianMeaning}
                      </p>
                    </div>

                    <div className="shrink-0 ml-2" onClick={(e) => e.stopPropagation()}>
                      <AudioPronounceButton
                        term={t.term}
                        size="sm"
                        tooltipText={`Pronounce ${t.term}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 2. Legal Documents */}
          {(selectedFilter === 'ALL' || selectedFilter === 'DOCS') && filteredResults.docs.length > 0 && (
            <div className="space-y-2.5">
              <div className="text-[11px] font-sans uppercase tracking-wider text-[#A8A8A8] font-semibold flex items-center gap-1.5 pb-1 border-b border-white/[0.08]">
                <FileText className="w-3.5 h-3.5 text-[#DCDCDC]" />
                Authentic Legal Documents ({filteredResults.docs.length})
              </div>
              <div className="space-y-2">
                {filteredResults.docs.map(d => (
                  <div
                    key={d.id}
                    onClick={() => {
                      setIsSearchOpen(false);
                      setActiveDocId(d.id);
                      setSelectedTab('documents');
                    }}
                    className="p-3.5 rounded-2xl bg-[#151515] border border-white/[0.08] hover:border-white/20 cursor-pointer transition-all hover:shadow-md group flex items-start justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-sans uppercase px-2 py-0.5 bg-[#242424] text-[#DCDCDC] border border-white/10 rounded-full font-semibold">
                          {d.documentType}
                        </span>
                        <h4 className="font-sans font-bold text-sm text-[#F2F2F2] group-hover:text-white transition-colors">
                          {d.title}
                        </h4>
                      </div>
                      <p className="text-xs text-[#A8A8A8] mt-1 line-clamp-2 font-sans">
                        {d.abstractId}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#707070] group-hover:text-white shrink-0 mt-1 transition-colors" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. Curriculum Lessons */}
          {(selectedFilter === 'ALL' || selectedFilter === 'LESSONS') && filteredResults.lessons.length > 0 && (
            <div className="space-y-2.5">
              <div className="text-[11px] font-sans uppercase tracking-wider text-[#A8A8A8] font-semibold flex items-center gap-1.5 pb-1 border-b border-white/[0.08]">
                <Sparkles className="w-3.5 h-3.5 text-[#DCDCDC]" />
                Curriculum Lessons ({filteredResults.lessons.length})
              </div>
              <div className="space-y-2">
                {filteredResults.lessons.map(l => (
                  <div
                    key={l.id}
                    onClick={() => {
                      setIsSearchOpen(false);
                      setActiveLessonId(l.id);
                      setSelectedTab('learn');
                    }}
                    className="p-3.5 rounded-2xl bg-[#151515] border border-white/[0.08] hover:border-white/20 cursor-pointer transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-sans font-bold text-sm text-[#F2F2F2] group-hover:text-white transition-colors">
                        {l.title}
                      </span>
                      <span className="text-[10px] font-sans text-[#707070]">
                        {l.durationMinutes} mins
                      </span>
                    </div>
                    <p className="text-xs text-[#A8A8A8] mt-1 font-sans">
                      {l.titleId}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. Comparative Concepts */}
          {(selectedFilter === 'ALL' || selectedFilter === 'COMPARATIVE') && filteredResults.comparative.length > 0 && (
            <div className="space-y-2.5">
              <div className="text-[11px] font-sans uppercase tracking-wider text-[#A8A8A8] font-semibold flex items-center gap-1.5 pb-1 border-b border-white/[0.08]">
                <Scale className="w-3.5 h-3.5 text-[#DCDCDC]" />
                Indonesian Law vs Common Law Comparison ({filteredResults.comparative.length})
              </div>
              <div className="space-y-2">
                {filteredResults.comparative.map(c => (
                  <div
                    key={c.id}
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSelectedTab('comparative');
                    }}
                    className="p-3.5 rounded-2xl bg-[#151515] border border-white/[0.08] hover:border-white/20 cursor-pointer transition-all"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-sans font-bold text-sm text-[#F2F2F2]">
                        {c.englishTerm} ⟷ {c.indonesianTerm}
                      </span>
                      <span className="text-[10px] font-sans px-2.5 py-0.5 bg-[#242424] text-[#DCDCDC] border border-white/10 rounded-full">{c.category}</span>
                    </div>
                    <p className="text-xs text-[#A8A8A8] line-clamp-2 font-sans">
                      {c.whyContextMatters}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* No results */}
          {totalHits === 0 && (
            <div className="text-center py-12 text-[#A8A8A8]">
              <Search className="w-8 h-8 mx-auto mb-3 opacity-30 text-[#707070]" />
              <p className="text-sm font-sans font-bold text-white">No legal resources matching &ldquo;{searchQuery}&rdquo;</p>
              <p className="text-xs font-sans mt-1 text-[#707070]">Try searching for terms like: indemnity, whereas, shall, breach, wanprestasi</p>
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-5 py-3 bg-[#0C0C0C] border-t border-white/[0.08] flex items-center justify-between text-[11px] font-sans text-[#707070]">
          <div className="flex items-center gap-3">
            <span>Press <kbd className="px-2 py-0.5 bg-[#1C1C1C] border border-white/10 text-[#F2F2F2] rounded-full text-[10px]">ESC</kbd> to close</span>
            <span>Press <kbd className="px-2 py-0.5 bg-[#1C1C1C] border border-white/10 text-[#F2F2F2] rounded-full text-[10px]">⌘K</kbd> to toggle</span>
          </div>
          <span className="text-[#A8A8A8] font-medium">LEXA Legal Knowledge Engine</span>
        </div>
      </div>
    </div>
  );
};
