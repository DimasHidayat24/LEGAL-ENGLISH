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
    setActiveDocId 
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
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-[#050B16]/85 dark:bg-[#050B16]/85 bg-[#0F1D30]/50 backdrop-blur-md transition-opacity duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setActiveLookupTermId(null);
        }
      }}
    >
      <div 
        className="glass-panel-deep liquid-lens text-[#F3F5F7] w-full max-w-3xl max-h-[92vh] sm:max-h-[88vh] flex flex-col rounded-2xl sm:rounded-3xl overflow-hidden relative shadow-[0_25px_60px_rgba(2,6,12,0.7)] border border-[#1D3552] dark:border-[#1D3552] border-[#D4DFEC] animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="term-detail-title"
      >
        {/* Pinned / Sticky Header Bar */}
        <header className="flex-shrink-0 border-b border-[#1D3552] dark:border-[#1D3552] border-[#D4DFEC] bg-[#09121E]/95 dark:bg-[#09121E]/95 bg-[#FFFFFF]/95 backdrop-blur-md z-20 px-5 sm:px-7 py-4 sm:py-5">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-2 min-w-0">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] font-sans font-semibold tracking-wider uppercase px-2.5 py-0.5 bg-[#132B46] text-[#4F83B8] border border-[#1D3552] dark:border-[#1D3552] border-[#D4DFEC] rounded-full">
                  {term.category}
                </span>
                {term.termType && (
                  <span className="text-[10px] font-sans font-semibold px-2.5 py-0.5 bg-[#112239] dark:bg-[#112239] bg-[#E8EFF8] text-[#9BAABC] border border-[#1D3552] dark:border-[#1D3552] border-[#D4DFEC] rounded-full">
                    {term.termType}
                  </span>
                )}
                {term.jurisdiction && (
                  <span className="text-[10px] font-sans font-normal px-2.5 py-0.5 bg-[#081222] dark:bg-[#081222] bg-[#E0EBF7] text-[#9BAABC] border border-[#1D3552] dark:border-[#1D3552] border-[#D4DFEC] rounded-full flex items-center gap-1">
                    <Globe2 className="w-3 h-3 text-[#4F83B8]" />
                    {term.jurisdiction}
                  </span>
                )}
                <span className="text-[10px] font-sans text-[#64758A] font-normal px-1">
                  {term.partOfSpeech}
                </span>
                <span className="text-[10px] px-2.5 py-0.5 bg-[#112239] dark:bg-[#112239] bg-[#E8EFF8] text-[#6A9BCB] border border-[#1D3552] dark:border-[#1D3552] border-[#D4DFEC] font-sans font-semibold rounded-full">
                  {term.difficulty}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-0.5">
                <h2 id="term-detail-title" className="text-xl sm:text-2xl md:text-3xl font-sans font-extrabold tracking-tight text-[#F3F5F7]">
                  {term.term}
                </h2>
                {term.pronunciation && (
                  <span className="text-xs sm:text-sm font-mono font-medium text-[#6A9BCB] bg-[#112239] dark:bg-[#112239] bg-[#E8EFF8] px-2.5 py-0.5 sm:py-1 rounded-full border border-[#1D3552] dark:border-[#1D3552] border-[#C2D6EC]">
                    {term.pronunciation}
                  </span>
                )}

                {/* Pronunciation Audio Button with Accent Selector */}
                <div className="flex items-center gap-1 bg-[#081222]/90 dark:bg-[#081222]/90 bg-[#E8EFF8] p-0.5 sm:p-1 rounded-full border border-[#1D3552] dark:border-[#1D3552] border-[#C2D6EC]">
                  <AudioPronounceButton 
                    term={term.term}
                    accent={modalAccent}
                    size="sm"
                    tooltipText={`Listen to pronunciation (${modalAccent === 'en-US' ? 'US' : 'UK'})`}
                  />
                  <button
                    type="button"
                    onClick={() => setModalAccent(prev => prev === 'en-US' ? 'en-GB' : 'en-US')}
                    className="px-1.5 sm:px-2 py-0.5 text-[10px] font-sans font-bold text-[#4F83B8] hover:text-[#F3F5F7] cursor-pointer rounded-full"
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
                className="px-2.5 sm:px-3 py-1.5 border transition-all flex items-center gap-1 text-xs font-sans cursor-pointer rounded-full shadow-xs bg-[#112239] dark:bg-[#112239] bg-[#E8EFF8] text-[#9BAABC] border-[#1D3552] dark:border-[#1D3552] border-[#D4DFEC] hover:bg-[#132B46] hover:text-[#F3F5F7]"
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
                    ? 'bg-[#132B46] text-[#6A9BCB] border-[#294766] font-bold' 
                    : 'bg-[#112239] dark:bg-[#112239] bg-[#E8EFF8] text-[#9BAABC] border-[#1D3552] dark:border-[#1D3552] border-[#D4DFEC] hover:bg-[#132B46] hover:text-[#F3F5F7]'
                }`}
              >
                {isSaved ? <BookmarkCheck className="w-3.5 h-3.5 text-[#4F83B8]" /> : <Bookmark className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{isSaved ? 'Saved' : 'Save'}</span>
              </button>

              {/* Close Button */}
              <button
                onClick={() => setActiveLookupTermId(null)}
                className="p-1.5 text-[#9BAABC] hover:text-[#F3F5F7] hover:bg-[#112239] dark:hover:bg-[#112239] hover:bg-[#E2EDF9] transition-colors cursor-pointer rounded-full"
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
          <div className="p-4 rounded-2xl lexa-surface-subtle space-y-2">
            <div className="text-[10px] font-sans uppercase tracking-wider text-[#4F83B8] flex items-center gap-1.5 font-bold">
              <Scale className="w-3.5 h-3.5 text-[#4F83B8]" />
              Padanan Bahasa Indonesia & Konstruksi Hukum
            </div>
            <p className="text-base sm:text-lg font-sans font-extrabold text-[#F3F5F7]">
              {term.indonesianMeaning}
            </p>
            <p className="text-xs sm:text-sm text-[#9BAABC] leading-relaxed font-sans font-normal">
              {term.indonesianLegalConcept}
            </p>
            {term.civilLawEquivalent && (
              <div className="text-xs font-sans text-[#9BAABC] pt-2 border-t border-[#1D3552]/80 dark:border-[#1D3552]/80 border-[#D4DFEC]">
                <span className="text-[#64758A]">Civil Law / KUHPerdata Counterpart:</span>{' '}
                <span className="text-[#F3F5F7] font-bold">{term.civilLawEquivalent}</span>
              </div>
            )}
          </div>

          {/* Conceptual Distinction Note if applicable */}
          {(term.isDistinctConcept || term.conceptualNote) && (
            <div className="p-4 rounded-2xl bg-[rgba(19,43,70,0.6)] dark:bg-[rgba(19,43,70,0.6)] bg-[#E4EEF8] border border-[#294766] dark:border-[#294766] border-[#B8D1EB] space-y-2">
              <div className="flex items-center gap-2 text-[#6A9BCB] text-xs font-sans font-bold uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4 text-[#4F83B8] shrink-0" />
                Catatan Konseptual Komparatif (Common Law vs Civil Law)
              </div>
              <p className="text-xs sm:text-sm text-[#9BAABC] leading-relaxed font-sans font-normal">
                {term.conceptualNote || 
                  'Istilah ini merupakan konsep khas Common Law yang tidak memiliki padanan langsung 1:1 dalam sistem hukum Indonesia (Civil Law). Terjemahan di atas merupakan padanan fungsional terdekat yang harus dipahami dalam konteks yuridisnya.'}
              </p>
            </div>
          )}

          {/* Plain English vs Legal Definition */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="p-4 rounded-2xl lexa-surface-subtle space-y-1.5">
              <span className="text-[10px] font-sans uppercase tracking-wider text-[#4F83B8] block font-bold">
                Plain English Explanation
              </span>
              <p className="text-xs sm:text-sm text-[#9BAABC] font-sans font-normal leading-relaxed">
                {term.plainEnglish || term.legalDefinition}
              </p>
            </div>

            <div className="p-4 rounded-2xl lexa-surface-subtle space-y-1.5">
              <span className="text-[10px] font-sans uppercase tracking-wider text-[#4F83B8] block font-bold">
                Black&apos;s Law / Formal Legal Definition
              </span>
              <p className="text-xs sm:text-sm text-[#9BAABC] font-sans font-normal leading-relaxed">
                {term.legalDefinition}
              </p>
            </div>
          </div>

          {/* Why Lawyers Use This (Legal Function) */}
          <div className="p-4 rounded-2xl lexa-surface-subtle space-y-1.5">
            <span className="text-[10px] font-sans uppercase tracking-wider text-[#F3F5F7] block font-bold">
              Why Lawyers Use This in Practice (Legal Function)
            </span>
            <p className="text-xs sm:text-sm text-[#9BAABC] font-sans font-normal leading-relaxed">
              {term.legalFunction}
            </p>
          </div>

          {/* Authentic Contract Clause Excerpt */}
          {term.authenticClauseExcerpt && (
            <div className="border border-[#1D3552] dark:border-[#1D3552] border-[#D4DFEC] bg-[#081222]/80 dark:bg-[#081222]/80 bg-[#E8EFF8] p-4 rounded-2xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-sans uppercase tracking-wider text-[#F3F5F7] flex items-center gap-1.5 font-semibold">
                  <FileText className="w-3.5 h-3.5 text-[#4F83B8]" />
                  Authentic Contract Clause Excerpt
                </span>
                {term.authenticClauseSource && (
                  <span className="text-[10px] font-sans text-[#64758A] italic">
                    Source: {term.authenticClauseSource}
                  </span>
                )}
              </div>
              <blockquote className="font-serif italic text-xs sm:text-sm text-[#F3F5F7] pl-3 border-l-2 border-[#4F83B8] my-2 leading-[1.7] bg-[#050B16]/60 dark:bg-[#050B16]/60 bg-[#DCE7F4] p-3 rounded-xl">
                &ldquo;{term.authenticClauseExcerpt}&rdquo;
              </blockquote>
            </div>
          )}

          {/* Context Examples Tabs (Contracts / Court Decisions / Legal Opinions) */}
          {term.contextExamples && (
            <div className="border border-[#1D3552] dark:border-[#1D3552] border-[#D4DFEC] bg-[#081222]/80 dark:bg-[#081222]/80 bg-[#E8EFF8] p-4 rounded-2xl space-y-3">
              <span className="text-[10px] font-sans uppercase tracking-wider text-[#9BAABC] block font-semibold">
                Contextual Usage in Real Legal Materials
              </span>
              
              <div className="flex items-center gap-1.5 border-b border-[#1D3552]/80 dark:border-[#1D3552]/80 border-[#D4DFEC] pb-2">
                <button
                  onClick={() => setActiveContextTab('contracts')}
                  className={`px-3 py-1 text-xs font-sans rounded-full cursor-pointer flex items-center gap-1.5 transition-all ${
                    activeContextTab === 'contracts'
                      ? 'bg-[#132B46] text-[#F3F5F7] font-semibold border border-[#294766]'
                      : 'text-[#9BAABC] hover:text-[#F3F5F7]'
                  }`}
                >
                  <Briefcase className="w-3 h-3" />
                  Contracts
                </button>
                <button
                  onClick={() => setActiveContextTab('courtDecisions')}
                  className={`px-3 py-1 text-xs font-sans rounded-full cursor-pointer flex items-center gap-1.5 transition-all ${
                    activeContextTab === 'courtDecisions'
                      ? 'bg-[#132B46] text-[#F3F5F7] font-semibold border border-[#294766]'
                      : 'text-[#9BAABC] hover:text-[#F3F5F7]'
                  }`}
                >
                  <Gavel className="w-3 h-3" />
                  Court Decisions
                </button>
                <button
                  onClick={() => setActiveContextTab('legalOpinions')}
                  className={`px-3 py-1 text-xs font-sans rounded-full cursor-pointer flex items-center gap-1.5 transition-all ${
                    activeContextTab === 'legalOpinions'
                      ? 'bg-[#132B46] text-[#F3F5F7] font-semibold border border-[#294766]'
                      : 'text-[#9BAABC] hover:text-[#F3F5F7]'
                  }`}
                >
                  <FileCode className="w-3 h-3" />
                  Legal Opinions
                </button>
              </div>

              <div className="text-xs sm:text-sm font-serif text-[#F3F5F7] bg-[#050B16]/60 dark:bg-[#050B16]/60 bg-[#DCE7F4] p-3 rounded-xl leading-[1.7] border border-[#1D3552]/60 dark:border-[#1D3552]/60 border-[#D4DFEC]">
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
            <span className="text-[10px] font-sans uppercase tracking-wider text-[#9BAABC] block font-semibold">
              Standard Bilingual Sentence Example
            </span>
            <div className="p-3.5 border border-[#1D3552] dark:border-[#1D3552] border-[#D4DFEC] lexa-surface-subtle space-y-1.5 rounded-2xl">
              <p className="text-sm font-semibold text-[#F3F5F7] font-sans">
                {term.exampleSentenceEn}
              </p>
              <p className="text-xs text-[#9BAABC] font-sans italic border-t border-[#1D3552]/80 dark:border-[#1D3552]/80 border-[#D4DFEC] pt-1.5">
                {term.exampleSentenceId}
              </p>
            </div>
          </div>

          {/* Common Collocations */}
          {term.commonCollocations && term.commonCollocations.length > 0 && (
            <div>
              <span className="text-[10px] font-sans uppercase tracking-wider text-[#9BAABC] block mb-2 font-semibold">
                Common Legal Collocations
              </span>
              <div className="flex flex-wrap gap-1.5">
                {term.commonCollocations.map((col, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-sans px-3 py-1 bg-[#112239] dark:bg-[#112239] bg-[#E8EFF8] text-[#9BAABC] border border-[#1D3552] dark:border-[#1D3552] border-[#D4DFEC] rounded-full font-medium"
                  >
                    {col}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Related Documents with clickable cross-reference links */}
          {term.connectedDocIds && term.connectedDocIds.length > 0 && (
            <div className="p-4 rounded-2xl lexa-surface-subtle space-y-2">
              <div className="text-[10px] font-sans uppercase tracking-wider text-[#4F83B8] flex items-center gap-1.5 font-semibold">
                <FileText className="w-3.5 h-3.5 text-[#4F83B8]" />
                Where to Find This Term in LEXA Document Library
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                {term.connectedDocIds.map((docRef) => (
                  <button
                    key={docRef.docId}
                    onClick={() => handleNavigateToDoc(docRef.docId)}
                    className="text-xs font-sans px-3 py-1.5 bg-[#132B46] hover:bg-[#112239] dark:hover:bg-[#112239] border border-[#1D3552] dark:border-[#1D3552] border-[#D4DFEC] hover:border-[#294766] text-[#F3F5F7] font-medium rounded-full cursor-pointer flex items-center gap-1.5 transition-all shadow-xs"
                  >
                    <span>Read in: <span className="text-[#4F83B8]">{docRef.title || docRef.docId.replace(/-/g, ' ')}</span></span>
                    <ExternalLink className="w-3 h-3 text-[#4F83B8]" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Personal Note Section for Spaced Repetition */}
          <div className="p-4 rounded-2xl lexa-surface-subtle space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-sans uppercase tracking-wider text-[#9BAABC] font-semibold">
                Your Personal Study Notes ({savedRecord?.notes ? 'Saved' : 'Empty'})
              </span>
              {!isEditingNote && (
                <button
                  onClick={() => {
                    setPersonalNoteInput(savedRecord?.notes || '');
                    setIsEditingNote(true);
                  }}
                  className="text-xs font-sans text-[#4F83B8] hover:text-[#6A9BCB] cursor-pointer font-medium"
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
                  className="w-full text-xs font-sans p-3 bg-[#050B16] dark:bg-[#050B16] bg-[#FFFFFF] border border-[#1D3552] dark:border-[#1D3552] border-[#D4DFEC] text-[#F3F5F7] placeholder:text-[#64758A] rounded-xl focus:outline-none focus:border-[#4F83B8] resize-none h-20"
                />
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => setIsEditingNote(false)}
                    className="px-3 py-1 text-xs text-[#9BAABC] hover:text-[#F3F5F7] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveNote}
                    className="btn-primary px-3 py-1 text-xs font-semibold"
                  >
                    Save Note
                  </button>
                </div>
              </div>
            ) : (
              savedRecord?.notes && (
                <p className="text-xs font-sans text-[#9BAABC] italic bg-[#050B16]/60 dark:bg-[#050B16]/60 bg-[#DCE7F4] p-3 rounded-xl border border-[#1D3552]/60 dark:border-[#1D3552]/60 border-[#D4DFEC]">
                  &ldquo;{savedRecord.notes}&rdquo;
                </p>
              )
            )}
          </div>

          {/* Footer info and Previous / Next Navigation - at bottom of scrollable content */}
          <div className="pt-6 pb-4 border-t border-[#1D3552]/80 dark:border-[#1D3552]/80 border-[#D4DFEC] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-sans text-[#64758A]">
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={!prevTerm}
                onClick={() => prevTerm && setActiveLookupTermId(prevTerm.id)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full border transition-all ${
                  prevTerm
                    ? 'bg-[#112239] dark:bg-[#112239] bg-[#E8EFF8] text-[#9BAABC] border-[#1D3552] dark:border-[#1D3552] border-[#D4DFEC] hover:text-[#F3F5F7] hover:bg-[#132B46] cursor-pointer'
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
                    ? 'bg-[#112239] dark:bg-[#112239] bg-[#E8EFF8] text-[#9BAABC] border-[#1D3552] dark:border-[#1D3552] border-[#D4DFEC] hover:text-[#F3F5F7] hover:bg-[#132B46] cursor-pointer'
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
                className="text-[#4F83B8] hover:text-[#6A9BCB] font-semibold cursor-pointer px-2 py-1"
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
