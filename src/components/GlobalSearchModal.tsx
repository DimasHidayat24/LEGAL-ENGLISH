import React, { useState, useMemo } from 'react';
import { useStudy } from '../context/StudyContext';
import { legalVocabularyList } from '../data/vocabularyData';
import { sampleLegalDocuments } from '../data/documentsData';
import { curriculumLessons } from '../data/curriculumData';
import { comparativeLawList } from '../data/comparativeLawData';
import { editorialArticlesList } from '../data/articlesData';
import { writingModulesList } from '../data/writingData';
import { practiceExercisesList } from '../data/exercisesData';
import { Search, X, BookOpen, FileText, Scale, Sparkles, HelpCircle, PenTool, ArrowRight } from 'lucide-react';

export const GlobalSearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, setActiveLookupTermId, setSelectedTab, setActiveDocId, setActiveLessonId, setActiveArticleId } = useStudy();
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
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-black/80 backdrop-blur-sm">
      <div 
        className="bg-[#13151D] border border-zinc-700 text-zinc-100 w-full max-w-3xl max-h-[80vh] flex flex-col rounded-xs shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Search Bar Input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-zinc-800 bg-[#161922]">
          <Search className="w-5 h-5 text-zinc-400 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search legal terms (e.g. indemnity, whereas, wanprestasi, shall)..."
            className="w-full text-base font-sans bg-transparent text-white placeholder:text-zinc-500 focus:outline-none"
            autoFocus
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="text-xs font-sans text-zinc-400 hover:text-white cursor-pointer font-medium"
            >
              Clear
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1 text-zinc-400 hover:text-white hover:bg-zinc-800 cursor-pointer rounded-xs"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1 px-5 py-2.5 bg-[#181C26] border-b border-zinc-800 overflow-x-auto text-xs font-sans">
          <button
            onClick={() => setSelectedFilter('ALL')}
            className={`px-2.5 py-1 whitespace-nowrap cursor-pointer rounded-xs ${selectedFilter === 'ALL' ? 'bg-zinc-100 text-zinc-950 font-bold' : 'text-zinc-400 hover:bg-zinc-800 font-medium'}`}
          >
            All Results ({totalHits})
          </button>
          <button
            onClick={() => setSelectedFilter('TERMS')}
            className={`px-2.5 py-1 whitespace-nowrap cursor-pointer rounded-xs ${selectedFilter === 'TERMS' ? 'bg-zinc-100 text-zinc-950 font-bold' : 'text-zinc-400 hover:bg-zinc-800 font-medium'}`}
          >
            Vocabulary ({filteredResults.terms.length})
          </button>
          <button
            onClick={() => setSelectedFilter('DOCS')}
            className={`px-2.5 py-1 whitespace-nowrap cursor-pointer rounded-xs ${selectedFilter === 'DOCS' ? 'bg-zinc-100 text-zinc-950 font-bold' : 'text-zinc-400 hover:bg-zinc-800 font-medium'}`}
          >
            Documents ({filteredResults.docs.length})
          </button>
          <button
            onClick={() => setSelectedFilter('LESSONS')}
            className={`px-2.5 py-1 whitespace-nowrap cursor-pointer rounded-xs ${selectedFilter === 'LESSONS' ? 'bg-zinc-100 text-zinc-950 font-bold' : 'text-zinc-400 hover:bg-zinc-800'}`}
          >
            Lessons ({filteredResults.lessons.length})
          </button>
          <button
            onClick={() => setSelectedFilter('COMPARATIVE')}
            className={`px-2.5 py-1 whitespace-nowrap cursor-pointer rounded-xs ${selectedFilter === 'COMPARATIVE' ? 'bg-zinc-100 text-zinc-950 font-bold' : 'text-zinc-400 hover:bg-zinc-800'}`}
          >
            Same Concept ({filteredResults.comparative.length})
          </button>
        </div>

        {/* Scrollable Results List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* 1. Legal Terms */}
          {(selectedFilter === 'ALL' || selectedFilter === 'TERMS') && filteredResults.terms.length > 0 && (
            <div className="space-y-2">
              <div className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 flex items-center gap-1.5 pb-1 border-b border-zinc-800">
                <BookOpen className="w-3.5 h-3.5 text-zinc-300" />
                Legal Terms & Definitions ({filteredResults.terms.length})
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {filteredResults.terms.map(t => (
                  <div
                    key={t.id}
                    onClick={() => {
                      setIsSearchOpen(false);
                      setActiveLookupTermId(t.id);
                    }}
                    className="p-3 bg-[#181C26] border border-zinc-750 hover:border-zinc-500 cursor-pointer transition-all hover:shadow-lg group rounded-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif font-bold text-base text-white group-hover:text-zinc-200">
                        {t.term}
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 bg-zinc-800 text-zinc-300 rounded-xs">
                        {t.category}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-300 mt-1 line-clamp-1">
                      {t.indonesianMeaning}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 2. Legal Documents */}
          {(selectedFilter === 'ALL' || selectedFilter === 'DOCS') && filteredResults.docs.length > 0 && (
            <div className="space-y-2">
              <div className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 flex items-center gap-1.5 pb-1 border-b border-zinc-800">
                <FileText className="w-3.5 h-3.5 text-zinc-300" />
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
                    className="p-3 bg-[#181C26] border border-zinc-750 hover:border-zinc-500 cursor-pointer transition-all hover:shadow-lg group flex items-start justify-between rounded-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono uppercase px-1.5 py-0.2 bg-zinc-800 text-zinc-200 border border-zinc-700 rounded-xs">
                          {d.documentType}
                        </span>
                        <h4 className="font-serif font-semibold text-sm text-white group-hover:text-zinc-200">
                          {d.title}
                        </h4>
                      </div>
                      <p className="text-xs text-zinc-300 mt-1 line-clamp-2">
                        {d.abstractId}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-white shrink-0 mt-1" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. Curriculum Lessons */}
          {(selectedFilter === 'ALL' || selectedFilter === 'LESSONS') && filteredResults.lessons.length > 0 && (
            <div className="space-y-2">
              <div className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 flex items-center gap-1.5 pb-1 border-b border-zinc-800">
                <Sparkles className="w-3.5 h-3.5 text-zinc-300" />
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
                    className="p-3 bg-[#181C26] border border-zinc-750 hover:border-zinc-500 cursor-pointer transition-all group rounded-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif font-semibold text-sm text-white">
                        {l.title}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-400">
                        {l.durationMinutes} mins
                      </span>
                    </div>
                    <p className="text-xs text-zinc-300 mt-1">
                      {l.titleId}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. Comparative Concepts */}
          {(selectedFilter === 'ALL' || selectedFilter === 'COMPARATIVE') && filteredResults.comparative.length > 0 && (
            <div className="space-y-2">
              <div className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 flex items-center gap-1.5 pb-1 border-b border-zinc-800">
                <Scale className="w-3.5 h-3.5 text-zinc-300" />
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
                    className="p-3 bg-[#181C26] border border-zinc-750 hover:border-zinc-500 cursor-pointer transition-all rounded-xs"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-serif font-semibold text-sm text-zinc-100">
                        {c.englishTerm} ⟷ {c.indonesianTerm}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-400">{c.category}</span>
                    </div>
                    <p className="text-xs text-zinc-300 line-clamp-2">
                      {c.whyContextMatters}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* No results */}
          {totalHits === 0 && (
            <div className="text-center py-12 text-zinc-400">
              <Search className="w-8 h-8 mx-auto mb-3 opacity-30 text-zinc-400" />
              <p className="text-sm font-serif text-white">No legal resources matching "{searchQuery}"</p>
              <p className="text-xs font-mono mt-1 text-zinc-400">Try searching for terms like: indemnity, whereas, shall, breach, wanprestasi</p>
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-5 py-3 bg-[#161922] border-t border-zinc-800 flex items-center justify-between text-[11px] font-mono text-zinc-400">
          <div className="flex items-center gap-3">
            <span>Press <kbd className="px-1.5 py-0.5 bg-zinc-800 border border-zinc-700 text-zinc-300 rounded text-[10px]">ESC</kbd> to close</span>
            <span>Press <kbd className="px-1.5 py-0.5 bg-zinc-800 border border-zinc-700 text-zinc-300 rounded text-[10px]">⌘K</kbd> to toggle</span>
          </div>
          <span>LEXA Legal Knowledge Engine</span>
        </div>
      </div>
    </div>
  );
};
