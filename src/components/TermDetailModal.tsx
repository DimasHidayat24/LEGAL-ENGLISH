import React, { useState, useEffect } from 'react';
import { useStudy } from '../context/StudyContext';
import { getTermById, legalVocabularyList } from '../data/vocabulary/index';
import { AudioPronounceButton } from './AudioPronounceButton';
import { SpeechAccent } from '../utils/speech';
import { 
  Bookmark, 
  BookmarkCheck, 
  X, 
  ArrowRight, 
  ArrowLeft,
  ExternalLink, 
  Scale, 
  FileText, 
  AlertTriangle, 
  Globe2, 
  Briefcase, 
  Gavel, 
  FileCode,
  Copy,
  Check,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export const TermDetailModal: React.FC = () => {
  const { 
    activeLookupTermId, 
    setActiveLookupTermId, 
    saveTerm, 
    removeSavedTerm, 
    updateTermNote, 
    savedTerms, 
    setSelectedTab, 
    setActiveDocId,
    theme
  } = useStudy();

  const [personalNoteInput, setPersonalNoteInput] = useState<string>('');
  const [isEditingNote, setIsEditingNote] = useState<boolean>(false);
  const [activeContextTab, setActiveContextTab] = useState<'contracts' | 'courtDecisions' | 'legalOpinions'>('contracts');
  const [modalAccent, setModalAccent] = useState<SpeechAccent>('en-US');
  const [isCopied, setIsCopied] = useState<boolean>(false);

  // Compute current index for Prev/Next navigation
  const currentIndex = activeLookupTermId 
    ? legalVocabularyList.findIndex(t => t.id === activeLookupTermId) 
    : -1;

  const prevTerm = currentIndex > 0 ? legalVocabularyList[currentIndex - 1] : null;
  const nextTerm = currentIndex >= 0 && currentIndex < legalVocabularyList.length - 1 
    ? legalVocabularyList[currentIndex + 1] 
    : null;

  // Keyboard navigation
  useEffect(() => {
    if (!activeLookupTermId) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in textarea or input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.key === 'ArrowLeft' && prevTerm) {
        e.preventDefault();
        setActiveLookupTermId(prevTerm.id);
      } else if (e.key === 'ArrowRight' && nextTerm) {
        e.preventDefault();
        setActiveLookupTermId(nextTerm.id);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLookupTermId, prevTerm, nextTerm, setActiveLookupTermId]);

  // Prevent background body scroll when modal is open
  useEffect(() => {
    if (!activeLookupTermId) return;

    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    
    // Calculate scrollbar width to prevent layout shift
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollBarWidth > 0) {
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    }
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow || '';
      document.body.style.paddingRight = originalPaddingRight || '';
    };
  }, [activeLookupTermId]);

  if (!activeLookupTermId) return null;

  const term = getTermById(activeLookupTermId);

  if (!term) return null;

  const savedRecord = savedTerms.find(st => st.termId === term.id);
  const isSaved = !!savedRecord;

  const handleSaveToggle = () => {
    if (isSaved) {
      removeSavedTerm(term.id);
    } else {
      saveTerm(term.id, personalNoteInput || undefined);
    }
  };

  const handleSaveNote = () => {
    updateTermNote(term.id, personalNoteInput);
    setIsEditingNote(false);
  };

  const handleCopyDefinition = () => {
    const textToCopy = `${term.term} (${term.partOfSpeech || 'n.'})\n` +
      `Meaning: ${term.indonesianMeaning}\n` +
      `Concept: ${term.indonesianLegalConcept}\n` +
      `Black's Law: ${term.legalDefinition}\n` +
      (term.civilLawEquivalent ? `Civil Law Counterpart: ${term.civilLawEquivalent}\n` : '') +
      (term.authenticClauseExcerpt ? `Example Clause: "${term.authenticClauseExcerpt}"` : '');

    navigator.clipboard.writeText(textToCopy);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleNavigateToDoc = (docId: string) => {
    setActiveLookupTermId(null);
    setActiveDocId(docId);
    setSelectedTab('documents');
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/40 dark:bg-black/40 bg-black/20 backdrop-blur-md transition-opacity duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setActiveLookupTermId(null);
        }
      }}
    >
      <div 
        className="liquid-glass-modal text-[#F2F2F2] dark:text-[#F2F2F2] text-[#111111] w-full max-w-3xl max-h-[92vh] sm:max-h-[88vh] flex flex-col rounded-2xl sm:rounded-3xl overflow-hidden relative animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="term-detail-title"
      >
        {/* Optical Liquid Specular Sheen (matching navigation bar) */}
        <div className="absolute inset-0 rounded-2xl sm:rounded-3xl pointer-events-none overflow-hidden z-30" aria-hidden="true">
          <div className={`absolute top-0 inset-x-8 h-[1px] ${
            theme === 'dark'
              ? 'bg-gradient-to-r from-transparent via-white/25 to-transparent'
              : 'bg-gradient-to-r from-transparent via-white/60 to-transparent'
          }`} />
          <div className={`absolute top-0 inset-x-0 h-1/4 rounded-t-2xl sm:rounded-t-3xl ${
            theme === 'dark'
              ? 'bg-gradient-to-b from-white/[0.04] via-white/[0.005] to-transparent'
              : 'bg-gradient-to-b from-white/[0.15] via-white/[0.02] to-transparent'
          }`} />
        </div>

        {/* Pinned / Sticky Header Bar */}
        <header className="flex-shrink-0 border-b border-white/[0.08] dark:border-white/[0.08] border-black/[0.06] bg-white/[0.03] dark:bg-white/[0.03] bg-white/40 backdrop-blur-xl z-20 px-5 sm:px-7 py-4 sm:py-5">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-2 min-w-0">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] font-sans font-semibold tracking-wider uppercase px-2.5 py-0.5 bg-white/[0.08] dark:bg-white/[0.08] bg-black/[0.05] text-white dark:text-white text-black/90 border border-white/10 dark:border-white/10 border-black/[0.08] rounded-full">
                  {term.category}
                </span>
                {term.termType && (
                  <span className="text-[10px] font-sans font-semibold px-2.5 py-0.5 bg-white/[0.05] dark:bg-white/[0.05] bg-black/[0.04] text-[#A8A8A8] dark:text-[#A8A8A8] text-black/70 border border-white/10 dark:border-white/10 border-black/[0.08] rounded-full">
                    {term.termType}
                  </span>
                )}
                {term.jurisdiction && (
                  <span className="text-[10px] font-sans font-normal px-2.5 py-0.5 bg-white/[0.04] dark:bg-white/[0.04] bg-black/[0.03] text-[#A8A8A8] dark:text-[#A8A8A8] text-black/70 border border-white/10 dark:border-white/10 border-black/[0.08] rounded-full flex items-center gap-1">
                    <Globe2 className="w-3 h-3 text-white/80 dark:text-white/80 text-black/70" />
                    {term.jurisdiction}
                  </span>
                )}
                <span className="text-[10px] font-sans text-[#707070] font-normal px-1">
                  {term.partOfSpeech}
                </span>
                <span className="text-[10px] px-2.5 py-0.5 bg-white/[0.07] dark:bg-white/[0.07] bg-black/[0.04] text-white dark:text-white text-black/90 border border-white/10 dark:border-white/10 border-black/[0.08] font-sans font-semibold rounded-full">
                  {term.difficulty}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-0.5">
                <h2 id="term-detail-title" className="text-xl sm:text-2xl md:text-3xl font-sans font-extrabold tracking-tight text-white dark:text-white text-black">
                  {term.term}
                </h2>
                {term.pronunciation && (
                  <span className="text-xs sm:text-sm font-mono font-medium text-white dark:text-white text-black bg-white/[0.06] dark:bg-white/[0.06] bg-black/[0.04] px-2.5 py-0.5 sm:py-1 rounded-full border border-white/10 dark:border-white/10 border-black/[0.08]">
                    {term.pronunciation}
                  </span>
                )}

                {/* Pronunciation Audio Button with Accent Selector */}
                <div className="flex items-center gap-1 bg-white/[0.06] dark:bg-white/[0.06] bg-black/[0.04] p-0.5 sm:p-1 rounded-full border border-white/10 dark:border-white/10 border-black/[0.08]">
                  <AudioPronounceButton 
                    term={term.term}
                    accent={modalAccent}
                    size="sm"
                    tooltipText={`Listen to pronunciation (${modalAccent === 'en-US' ? 'US' : 'UK'})`}
                  />
                  <button
                    type="button"
                    onClick={() => setModalAccent(prev => prev === 'en-US' ? 'en-GB' : 'en-US')}
                    className="px-1.5 sm:px-2 py-0.5 text-[10px] font-sans font-bold text-white/90 dark:text-white/90 text-black/80 hover:text-white dark:hover:text-white hover:text-black cursor-pointer rounded-full"
                    title="Toggle US / UK Accent"
                  >
                    {modalAccent === 'en-US' ? 'US' : 'UK'}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0 pt-1">
              {/* Copy Term & Definition Button */}
              <button
                onClick={handleCopyDefinition}
                title="Copy Term & Definition to Clipboard"
                className="px-2.5 sm:px-3 py-1.5 border transition-all flex items-center gap-1 text-xs font-sans cursor-pointer rounded-full shadow-xs bg-white/[0.06] dark:bg-white/[0.06] bg-black/[0.04] text-white/80 dark:text-white/80 text-black/80 border-white/10 dark:border-white/10 border-black/[0.08] hover:bg-white/[0.12] dark:hover:bg-white/[0.12] hover:bg-black/[0.08] hover:text-white dark:hover:text-white hover:text-black"
              >
                {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{isCopied ? 'Copied!' : 'Copy'}</span>
              </button>

              {/* Save Term Bookmark Button */}
              <button
                onClick={handleSaveToggle}
                title={isSaved ? "Saved to My Lexicon" : "Save to My Lexicon"}
                className={`px-2.5 sm:px-3.5 py-1.5 border transition-all flex items-center gap-1.5 text-xs font-sans cursor-pointer rounded-full shadow-xs ${
                  isSaved 
                    ? 'bg-white/[0.18] dark:bg-white/[0.18] bg-black/[0.10] text-white dark:text-white text-black border-white/25 dark:border-white/25 border-black/15 font-bold' 
                    : 'bg-white/[0.06] dark:bg-white/[0.06] bg-black/[0.04] text-white/80 dark:text-white/80 text-black/80 border-white/10 dark:border-white/10 border-black/[0.08] hover:bg-white/[0.12] dark:hover:bg-white/[0.12] hover:bg-black/[0.08] hover:text-white dark:hover:text-white hover:text-black'
                }`}
              >
                {isSaved ? <BookmarkCheck className="w-3.5 h-3.5 text-white dark:text-white text-black" /> : <Bookmark className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{isSaved ? 'Saved' : 'Save'}</span>
              </button>

              {/* Close Button */}
              <button
                onClick={() => setActiveLookupTermId(null)}
                className="p-1.5 text-white/70 dark:text-white/70 text-black/60 hover:text-white dark:hover:text-white hover:text-black hover:bg-white/[0.10] dark:hover:bg-white/[0.10] hover:bg-black/[0.06] transition-colors cursor-pointer rounded-full"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Scrollable Content Container */}
        <div 
          className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-5 sm:px-7 py-5 space-y-5 lexa-custom-scrollbar"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          
          {/* Indonesian Meaning & Conceptual Foundation */}
          <div className="p-4 rounded-2xl liquid-modal-tile space-y-2">
            <div className="text-[10px] font-sans uppercase tracking-wider text-[#A8A8A8] dark:text-[#A8A8A8] text-black/60 flex items-center gap-1.5 font-bold">
              <Scale className="w-3.5 h-3.5 text-white dark:text-white text-black" />
              Padanan Bahasa Indonesia & Konstruksi Hukum
            </div>
            <p className="text-base sm:text-lg font-sans font-extrabold text-white dark:text-white text-black">
              {term.indonesianMeaning}
            </p>
            <p className="text-xs sm:text-sm text-[#A8A8A8] dark:text-[#A8A8A8] text-black/75 leading-relaxed font-sans font-normal">
              {term.indonesianLegalConcept}
            </p>
            {term.civilLawEquivalent && (
              <div className="text-xs font-sans text-[#A8A8A8] dark:text-[#A8A8A8] text-black/70 pt-2 border-t border-white/[0.08] dark:border-white/[0.08] border-black/[0.06]">
                <span className="text-[#707070] dark:text-[#707070] text-black/50">Civil Law / KUHPerdata Counterpart:</span>{' '}
                <span className="text-white dark:text-white text-black font-bold">{term.civilLawEquivalent}</span>
              </div>
            )}
          </div>

          {/* Conceptual Distinction Note if applicable */}
          {(term.isDistinctConcept || term.conceptualNote) && (
            <div className="p-4 rounded-2xl liquid-modal-tile space-y-2">
              <div className="flex items-center gap-2 text-white dark:text-white text-black text-xs font-sans font-bold uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4 text-white dark:text-white text-black shrink-0" />
                Catatan Konseptual Komparatif (Common Law vs Civil Law)
              </div>
              <p className="text-xs sm:text-sm text-[#A8A8A8] dark:text-[#A8A8A8] text-black/75 leading-relaxed font-sans font-normal">
                {term.conceptualNote || 
                  'Istilah ini merupakan konsep khas Common Law yang tidak memiliki padanan langsung 1:1 dalam sistem hukum Indonesia (Civil Law). Terjemahan di atas merupakan padanan fungsional terdekat yang harus dipahami dalam konteks yuridisnya.'}
              </p>
            </div>
          )}

          {/* Plain English vs Legal Definition */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="p-4 rounded-2xl liquid-modal-tile space-y-1.5">
              <span className="text-[10px] font-sans uppercase tracking-wider text-[#A8A8A8] dark:text-[#A8A8A8] text-black/60 block font-bold">
                Plain English Explanation
              </span>
              <p className="text-xs sm:text-sm text-[#A8A8A8] dark:text-[#A8A8A8] text-black/75 font-sans font-normal leading-relaxed">
                {term.plainEnglish || term.legalDefinition}
              </p>
            </div>

            <div className="p-4 rounded-2xl liquid-modal-tile space-y-1.5">
              <span className="text-[10px] font-sans uppercase tracking-wider text-[#A8A8A8] dark:text-[#A8A8A8] text-black/60 block font-bold">
                Black&apos;s Law / Formal Legal Definition
              </span>
              <p className="text-xs sm:text-sm text-[#A8A8A8] dark:text-[#A8A8A8] text-black/75 font-sans font-normal leading-relaxed">
                {term.legalDefinition}
              </p>
            </div>
          </div>

          {/* Why Lawyers Use This (Legal Function) */}
          <div className="p-4 rounded-2xl liquid-modal-tile space-y-1.5">
            <span className="text-[10px] font-sans uppercase tracking-wider text-white dark:text-white text-black block font-bold">
              Why Lawyers Use This in Practice (Legal Function)
            </span>
            <p className="text-xs sm:text-sm text-[#A8A8A8] dark:text-[#A8A8A8] text-black/75 font-sans font-normal leading-relaxed">
              {term.legalFunction}
            </p>
          </div>

          {/* Authentic Contract Clause Excerpt */}
          {term.authenticClauseExcerpt && (
            <div className="liquid-modal-tile p-4 space-y-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-sans uppercase tracking-wider text-white dark:text-white text-black flex items-center gap-1.5 font-semibold">
                  <FileText className="w-3.5 h-3.5 text-white dark:text-white text-black" />
                  Authentic Contract Clause Excerpt
                </span>
                {term.authenticClauseSource && (
                  <span className="text-[10px] font-sans text-[#707070] dark:text-[#707070] text-black/50 italic">
                    Source: {term.authenticClauseSource}
                  </span>
                )}
              </div>
              <blockquote className="font-serif italic text-xs sm:text-sm text-[#F2F2F2] dark:text-[#F2F2F2] text-[#151515] pl-3 border-l-2 border-white/60 dark:border-white/60 border-black/40 my-2 leading-[1.7] bg-black/25 dark:bg-black/35 bg-black/[0.03] p-3 rounded-xl border border-white/[0.06] dark:border-white/[0.06] border-black/[0.05]">
                &ldquo;{term.authenticClauseExcerpt}&rdquo;
              </blockquote>
            </div>
          )}

          {/* Context Examples Tabs (Contracts / Court Decisions / Legal Opinions) */}
          {term.contextExamples && (
            <div className="liquid-modal-tile p-4 space-y-3">
              <span className="text-[10px] font-sans uppercase tracking-wider text-[#A8A8A8] dark:text-[#A8A8A8] text-black/60 block font-semibold">
                Contextual Usage in Real Legal Materials
              </span>
              
              <div className="flex items-center gap-1.5 border-b border-white/[0.08] dark:border-white/[0.08] border-black/[0.06] pb-2">
                <button
                  onClick={() => setActiveContextTab('contracts')}
                  className={`px-3 py-1 text-xs font-sans rounded-full cursor-pointer flex items-center gap-1.5 transition-all ${
                    activeContextTab === 'contracts'
                      ? 'bg-white/[0.14] dark:bg-white/[0.14] bg-black/[0.08] text-white dark:text-white text-black font-semibold border border-white/20 dark:border-white/20 border-black/15'
                      : 'text-white/60 dark:text-white/60 text-black/60 hover:text-white dark:hover:text-white hover:text-black'
                  }`}
                >
                  <Briefcase className="w-3 h-3" />
                  Contracts
                </button>
                <button
                  onClick={() => setActiveContextTab('courtDecisions')}
                  className={`px-3 py-1 text-xs font-sans rounded-full cursor-pointer flex items-center gap-1.5 transition-all ${
                    activeContextTab === 'courtDecisions'
                      ? 'bg-white/[0.14] dark:bg-white/[0.14] bg-black/[0.08] text-white dark:text-white text-black font-semibold border border-white/20 dark:border-white/20 border-black/15'
                      : 'text-white/60 dark:text-white/60 text-black/60 hover:text-white dark:hover:text-white hover:text-black'
                  }`}
                >
                  <Gavel className="w-3 h-3" />
                  Court Decisions
                </button>
                <button
                  onClick={() => setActiveContextTab('legalOpinions')}
                  className={`px-3 py-1 text-xs font-sans rounded-full cursor-pointer flex items-center gap-1.5 transition-all ${
                    activeContextTab === 'legalOpinions'
                      ? 'bg-white/[0.14] dark:bg-white/[0.14] bg-black/[0.08] text-white dark:text-white text-black font-semibold border border-white/20 dark:border-white/20 border-black/15'
                      : 'text-white/60 dark:text-white/60 text-black/60 hover:text-white dark:hover:text-white hover:text-black'
                  }`}
                >
                  <FileCode className="w-3 h-3" />
                  Legal Opinions
                </button>
              </div>

              <div className="text-xs sm:text-sm font-serif text-[#F2F2F2] dark:text-[#F2F2F2] text-[#151515] bg-black/25 dark:bg-black/35 bg-black/[0.03] p-3 rounded-xl leading-[1.7] border border-white/[0.06] dark:border-white/[0.06] border-black/[0.05]">
                {activeContextTab === 'contracts' && (
                  <p>{term.contextExamples.contracts || 'Standard operational covenants and warranty provisions.'}</p>
                )}
                {activeContextTab === 'courtDecisions' && (
                  <p>{term.contextExamples.courtDecisions || 'Judicial interpretation and standard of review applied by appellate tribunals.'}</p>
                )}
                {activeContextTab === 'legalOpinions' && (
                  <p>{term.contextExamples.legalOpinions || 'Comparative regulatory structuring and foreign investment risk qualification.'}</p>
                )}
              </div>
            </div>
          )}

          {/* Sample Sentence & Indonesian Translation */}
          <div className="space-y-2">
            <span className="text-[10px] font-sans uppercase tracking-wider text-[#A8A8A8] dark:text-[#A8A8A8] text-black/60 block font-semibold">
              Standard Bilingual Sentence Example
            </span>
            <div className="p-3.5 liquid-modal-tile space-y-1.5 rounded-2xl">
              <p className="text-sm font-semibold text-white dark:text-white text-black font-sans">
                {term.exampleSentenceEn}
              </p>
              <p className="text-xs text-[#A8A8A8] dark:text-[#A8A8A8] text-black/70 font-sans italic border-t border-white/[0.08] dark:border-white/[0.08] border-black/[0.06] pt-1.5">
                {term.exampleSentenceId}
              </p>
            </div>
          </div>

          {/* Common Collocations */}
          {term.commonCollocations && term.commonCollocations.length > 0 && (
            <div>
              <span className="text-[10px] font-sans uppercase tracking-wider text-[#A8A8A8] dark:text-[#A8A8A8] text-black/60 block mb-2 font-semibold">
                Common Legal Collocations
              </span>
              <div className="flex flex-wrap gap-1.5">
                {term.commonCollocations.map((col, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-sans px-3 py-1 bg-white/[0.06] dark:bg-white/[0.06] bg-black/[0.04] text-white/80 dark:text-white/80 text-black/80 border border-white/[0.08] dark:border-white/[0.08] border-black/[0.06] rounded-full font-medium"
                  >
                    {col}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Related Documents with clickable cross-reference links */}
          {term.connectedDocIds && term.connectedDocIds.length > 0 && (
            <div className="p-4 rounded-2xl liquid-modal-tile space-y-2">
              <div className="text-[10px] font-sans uppercase tracking-wider text-white dark:text-white text-black flex items-center gap-1.5 font-semibold">
                <FileText className="w-3.5 h-3.5 text-white dark:text-white text-black" />
                Where to Find This Term in LEXA Document Library
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                {term.connectedDocIds.map((docRef) => (
                  <button
                    key={docRef.docId}
                    onClick={() => handleNavigateToDoc(docRef.docId)}
                    className="text-xs font-sans px-3 py-1.5 bg-white/[0.08] dark:bg-white/[0.08] bg-black/[0.05] hover:bg-white/[0.15] dark:hover:bg-white/[0.15] hover:bg-black/[0.09] border border-white/[0.08] dark:border-white/[0.08] border-black/[0.06] hover:border-white/25 text-white dark:text-white text-black font-medium rounded-full cursor-pointer flex items-center gap-1.5 transition-all shadow-xs"
                  >
                    <span>Read in: <span className="text-[#DCDCDC] dark:text-[#DCDCDC] text-black/70 font-semibold">{docRef.title || docRef.docId.replace(/-/g, ' ')}</span></span>
                    <ExternalLink className="w-3 h-3 text-white dark:text-white text-black" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Personal Note Section for Spaced Repetition */}
          <div className="p-4 rounded-2xl liquid-modal-tile space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-sans uppercase tracking-wider text-[#A8A8A8] dark:text-[#A8A8A8] text-black/60 font-semibold">
                Your Personal Study Notes ({savedRecord?.notes ? 'Saved' : 'Empty'})
              </span>
              {!isEditingNote && (
                <button
                  onClick={() => {
                    setPersonalNoteInput(savedRecord?.notes || '');
                    setIsEditingNote(true);
                  }}
                  className="text-xs font-sans text-white dark:text-white text-black hover:text-[#DCDCDC] dark:hover:text-[#DCDCDC] hover:text-black/70 cursor-pointer font-medium underline"
                >
                  {savedRecord?.notes ? 'Edit Note' : '+ Add Note'}
                </button>
              )}
            </div>

            {isEditingNote ? (
              <div className="space-y-2">
                <textarea
                  value={personalNoteInput}
                  onChange={(e) => setPersonalNoteInput(e.target.value)}
                  placeholder="E.g., Catatan pribadi: sering muncul dalam klausul dispute resolution, padankan dengan Pasal 1243 KUHPerdata..."
                  className="w-full text-xs font-sans p-3 bg-black/25 dark:bg-black/35 bg-white/60 border border-white/15 dark:border-white/15 border-black/15 text-[#F2F2F2] dark:text-[#F2F2F2] text-black placeholder:text-white/40 dark:placeholder:text-white/40 placeholder:text-black/40 rounded-xl focus:outline-none focus:border-white dark:focus:border-white focus:border-black resize-none h-20"
                />
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => setIsEditingNote(false)}
                    className="px-3 py-1 text-xs text-[#A8A8A8] dark:text-[#A8A8A8] text-black/60 hover:text-white dark:hover:text-white hover:text-black cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveNote}
                    className="btn-primary px-3 py-1 text-xs font-bold !text-[#050505] !bg-white hover:!bg-[#E8E8E8]"
                  >
                    Save Note
                  </button>
                </div>
              </div>
            ) : (
              savedRecord?.notes && (
                <p className="text-xs font-sans text-white/80 dark:text-white/80 text-black/80 italic bg-black/25 dark:bg-black/35 bg-black/[0.03] p-3 rounded-xl border border-white/[0.06] dark:border-white/[0.06] border-black/[0.05]">
                  &ldquo;{savedRecord.notes}&rdquo;
                </p>
              )
            )}
          </div>

          {/* Footer info and Previous / Next Navigation - at bottom of scrollable content */}
          <div className="pt-6 pb-4 border-t border-white/[0.08] dark:border-white/[0.08] border-black/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-sans text-[#707070] dark:text-[#707070] text-black/50">
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={!prevTerm}
                onClick={() => prevTerm && setActiveLookupTermId(prevTerm.id)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full border transition-all ${
                  prevTerm
                    ? 'bg-white/[0.06] dark:bg-white/[0.06] bg-black/[0.04] text-white/80 dark:text-white/80 text-black/80 border-white/[0.08] dark:border-white/[0.08] border-black/[0.06] hover:text-white dark:hover:text-white hover:text-black hover:bg-white/[0.12] dark:hover:bg-white/[0.12] hover:bg-black/[0.08] cursor-pointer'
                    : 'opacity-40 cursor-not-allowed border-transparent'
                }`}
                title={prevTerm ? `Previous: ${prevTerm.term} (← Left Arrow)` : undefined}
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Previous Term</span>
              </button>

              <button
                type="button"
                disabled={!nextTerm}
                onClick={() => nextTerm && setActiveLookupTermId(nextTerm.id)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full border transition-all ${
                  nextTerm
                    ? 'bg-white/[0.06] dark:bg-white/[0.06] bg-black/[0.04] text-white/80 dark:text-white/80 text-black/80 border-white/[0.08] dark:border-white/[0.08] border-black/[0.06] hover:text-white dark:hover:text-white hover:text-black hover:bg-white/[0.12] dark:hover:bg-white/[0.12] hover:bg-black/[0.08] cursor-pointer'
                    : 'opacity-40 cursor-not-allowed border-transparent'
                }`}
                title={nextTerm ? `Next: ${nextTerm.term} (→ Right Arrow)` : undefined}
              >
                <span>Next Term</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center gap-3">
              <span className="hidden md:inline">Entry {currentIndex + 1} of {legalVocabularyList.length}</span>
              <button
                type="button"
                onClick={() => setActiveLookupTermId(null)}
                className="text-white dark:text-white text-black hover:text-[#DCDCDC] font-semibold cursor-pointer px-2 py-1 underline"
              >
                Close Window (Esc)
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
