import React, { useState, useEffect, useRef } from 'react';
import { useStudy } from '../context/StudyContext';
import { sampleLegalDocuments } from '../data/documentsData';
import { legalVocabularyList } from '../data/vocabularyData';
import { LegalTerm } from '../types';
import { LegalWord } from './LegalWord';
import { 
  Bookmark, 
  BookmarkCheck, 
  Scale, 
  Check, 
  MessageSquare, 
  CheckCircle2, 
  ArrowRight,
  Volume2,
  Minimize2,
  BookOpen,
  Sparkles,
  ChevronRight
} from 'lucide-react';

export const DocumentReader: React.FC = () => {
  const { 
    activeDocId, 
    setActiveDocId, 
    setActiveLookupTermId, 
    isTermSaved, 
    saveTerm, 
    removeSavedTerm,
    toggleBookmarkParagraph,
    isParagraphBookmarked,
    completedDocuments,
    markDocumentComplete,
    personalNotes,
    saveNote
  } = useStudy();

  // Selected document or default to first
  const currentDoc = sampleLegalDocuments.find(d => d.id === activeDocId) || sampleLegalDocuments[0];
  const isDocCompleted = completedDocuments.includes(currentDoc.id);

  // Single shared state for selected legal term as specified in requirements
  const [selectedLegalTerm, setSelectedLegalTerm] = useState<LegalTerm | null>(() => {
    return legalVocabularyList.find(t => currentDoc.keyTermIds?.includes(t.id)) || legalVocabularyList[0];
  });
  const [assistantPanelOpen, setAssistantPanelOpen] = useState<boolean>(true);
  const [activeRightTab, setActiveRightTab] = useState<'INSPECTOR' | 'GLOSSARY' | 'SUMMARY' | 'NOTES'>('INSPECTOR');
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg'>('base');
  const [showIndonesianTranslation, setShowIndonesianTranslation] = useState<boolean>(true);
  const [activeParagraphNoteId, setActiveParagraphNoteId] = useState<string | null>(null);
  const [tempNoteText, setTempNoteText] = useState<string>('');

  const inspectorScrollRef = useRef<HTMLDivElement | null>(null);
  const assistantPanelRef = useRef<HTMLDivElement | null>(null);

  // Helper to dynamically identify the actual parent container controlling vertical scrolling
  const getScrollParent = (node: HTMLElement | null): HTMLElement | Window => {
    if (!node || typeof window === 'undefined') return window;
    let parent = node.parentElement;
    while (parent && parent !== document.body && parent !== document.documentElement) {
      const style = window.getComputedStyle(parent);
      const overflowY = style.overflowY;
      if ((overflowY === 'auto' || overflowY === 'scroll') && parent.scrollHeight > parent.clientHeight) {
        return parent;
      }
      parent = parent.parentElement;
    }
    return window;
  };

  // Helper to calculate sticky / fixed navigation height dynamically so Assistant Panel is never hidden underneath
  const getHeaderOffset = (): number => {
    if (typeof document === 'undefined') return 96;
    const headerEl = document.querySelector('header');
    if (headerEl) {
      const headerRect = headerEl.getBoundingClientRect();
      // Leave clear breathing room below the sticky floating capsule
      return Math.max(headerRect.bottom + 18, 88);
    }
    return 96;
  };

  // Smoothly scroll the main container so the Legal English Assistant Panel is brought clearly into view
  const scrollToAssistantPanel = (force = false) => {
    const panel = assistantPanelRef.current;
    if (!panel || typeof window === 'undefined') return;

    const headerOffset = getHeaderOffset();
    const rect = panel.getBoundingClientRect();

    // Check if the top of the Assistant Panel is already clearly visible in the viewport below navigation
    // (If user is already near the Assistant Panel, avoid unnecessary large jumps)
    const isAlreadyNear = (
      rect.top >= (headerOffset - 25) &&
      rect.top <= (headerOffset + 130) &&
      rect.bottom > headerOffset
    );

    if (!force && isAlreadyNear) {
      return;
    }

    const scrollParent = getScrollParent(panel);

    if (scrollParent === window) {
      const currentScrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
      const targetScrollY = Math.max(0, currentScrollY + rect.top - headerOffset);

      if ('scrollTo' in window) {
        window.scrollTo({
          top: targetScrollY,
          behavior: 'smooth',
        });
      } else {
        panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      const container = scrollParent as HTMLElement;
      const containerRect = container.getBoundingClientRect();
      const currentScrollTop = container.scrollTop;
      const targetScrollTop = Math.max(0, currentScrollTop + (rect.top - containerRect.top) - headerOffset);

      if (typeof container.scrollTo === 'function') {
        container.scrollTo({
          top: targetScrollTop,
          behavior: 'smooth',
        });
      } else {
        panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // When switching documents, default to first key term of that document
  useEffect(() => {
    const docTerm = legalVocabularyList.find(t => currentDoc.keyTermIds?.includes(t.id)) || legalVocabularyList[0];
    setSelectedLegalTerm(docTerm);
  }, [currentDoc.id]);

  // Handle clicking ANY legal word in document or glossary
  const handleSelectLegalWord = (term: LegalTerm) => {
    // 1. Set the selected legal term
    setSelectedLegalTerm(term);

    // 2. Make sure Assistant Panel is open
    setAssistantPanelOpen(true);

    // 3. Make sure the Inspector tab is active
    setActiveRightTab('INSPECTOR');

    // 4. Scroll assistant panel internal content to top of selected word's explanation
    if (inspectorScrollRef.current) {
      inspectorScrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // 5. Automatically scroll the main page / scroll container to the Assistant Panel after DOM updates
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (assistantPanelRef.current) {
          scrollToAssistantPanel();
        } else {
          // If panel was previously closed and just mounting, allow short post-render delay
          setTimeout(() => {
            scrollToAssistantPanel();
          }, 60);
        }
      });
    });
  };

  // Pronunciation audio playback helper
  const playPronunciation = (termText: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(termText.toLowerCase());
        utterance.lang = 'en-US';
        utterance.rate = 0.85;
        window.speechSynthesis.speak(utterance);
      } catch (err) {
        console.warn('Speech synthesis unavailable', err);
      }
    }
  };

  // Helper to render paragraph with clickable highlighted terms in warm parchment style
  const renderParagraphWithHighlights = (paragraphText: string, highlightedIds: string[] | undefined) => {
    if (!highlightedIds || highlightedIds.length === 0) {
      return <span>{paragraphText}</span>;
    }

    // Find all terms to highlight
    const termObjects = highlightedIds
      .map(id => legalVocabularyList.find(t => t.id === id))
      .filter((t): t is LegalTerm => !!t);

    if (termObjects.length === 0) {
      return <span>{paragraphText}</span>;
    }

    // Build map of text variant -> LegalTerm
    const variantMap = new Map<string, LegalTerm>();
    const allVariants: string[] = [];

    const getTermVariants = (term: LegalTerm): string[] => {
      const base = term.term.trim();
      const variants = [base];
      if (term.id === 'covenant') variants.push('covenants', 'covenant');
      if (term.id === 'shareholder') variants.push('shareholders', 'shareholder');
      if (term.id === 'liability') variants.push('liabilities', 'liability', 'liable');
      if (term.id === 'indemnity') variants.push('indemnify', 'indemnities', 'indemnified', 'indemnity');
      if (term.id === 'representation') variants.push('representations', 'represents', 'representation');
      if (term.id === 'warranty') variants.push('warranties', 'warrants', 'warranty');
      if (term.id === 'breach') variants.push('breaches', 'breached', 'breach');
      if (term.id === 'arbitration') variants.push('arbitral', 'arbitration');
      if (term.id === 'severability') variants.push('severed', 'severability');
      if (term.id === 'thereto') variants.push('hereto', 'thereto');
      if (term.id === 'due-diligence') variants.push('legal due diligence', 'due diligence');
      if (term.id === 'hold-harmless') variants.push('hold harmless', 'holds harmless', 'holding harmless');
      if (term.id === 'preponderance-of-evidence') variants.push('preponderance of the evidence', 'preponderance of evidence');
      if (term.id === 'bona-fide') variants.push('bona fide', 'mala fide');
      if (!base.endsWith('s')) variants.push(`${base}s`);
      return variants;
    };

    for (const t of termObjects) {
      for (const v of getTermVariants(t)) {
        const lower = v.toLowerCase();
        if (!variantMap.has(lower)) {
          variantMap.set(lower, t);
          allVariants.push(v);
        }
      }
    }

    // Sort descending by length so longer phrases match before substrings
    allVariants.sort((a, b) => b.length - a.length);

    if (allVariants.length === 0) {
      return <span>{paragraphText}</span>;
    }

    const regexPattern = new RegExp(`\\b(${allVariants.map(v => v.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')).join('|')})\\b`, 'gi');
    const parts = paragraphText.split(regexPattern);

    return (
      <span>
        {parts.map((part, index) => {
          const matchedTerm = variantMap.get(part.toLowerCase());
          if (matchedTerm) {
            const isSelected = selectedLegalTerm?.id === matchedTerm.id;
            return (
              <LegalWord
                key={`${matchedTerm.id}-${index}`}
                term={matchedTerm}
                displayText={part}
                isSelected={isSelected}
                onSelect={handleSelectLegalWord}
              />
            );
          }
          return <span key={index}>{part}</span>;
        })}
      </span>
    );
  };

  const handleOpenNoteModal = (pId: string) => {
    setActiveParagraphNoteId(pId);
    const key = `${currentDoc.id}-${pId}`;
    setTempNoteText(personalNotes[key] || '');
  };

  const handleSaveParagraphNote = () => {
    if (activeParagraphNoteId) {
      const key = `${currentDoc.id}-${activeParagraphNoteId}`;
      saveNote(key, tempNoteText);
      setActiveParagraphNoteId(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-6">
      
      {/* Top Document Header & Selector (Floating Glass Container) */}
      <div className="bg-[#101010] border border-white/[0.08] rounded-3xl p-5 sm:p-6 space-y-4 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] font-sans font-medium uppercase px-2.5 py-0.5 rounded-full tracking-wider bg-[#242424] text-[#DCDCDC] border border-white/10">
                {currentDoc.documentType}
              </span>
              <span className="text-[11px] font-sans text-[#A8A8A8]">
                {currentDoc.jurisdiction}
              </span>
              <span className="text-[11px] font-sans text-[#707070]">
                • {currentDoc.readingTimeMinutes} min read
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-sans font-extrabold text-white tracking-tight">
              {currentDoc.title}
            </h1>
          </div>

          {/* Action Bar */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => markDocumentComplete(currentDoc.id)}
              className={`px-4 py-2 text-xs font-sans flex items-center gap-1.5 transition-all cursor-pointer rounded-full ${
                isDocCompleted
                  ? 'bg-[#242424] text-white border border-white/20 font-semibold'
                  : 'btn-primary'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{isDocCompleted ? 'Completed' : 'Mark as Read'}</span>
            </button>

            <button
              onClick={() => setShowIndonesianTranslation(prev => !prev)}
              className={`px-4 py-2 text-xs font-sans flex items-center gap-1.5 cursor-pointer rounded-full transition-all border ${
                showIndonesianTranslation 
                  ? 'bg-[#242424] border-white/20 text-white font-semibold' 
                  : 'bg-[#151515] border-white/[0.08] text-[#A8A8A8] hover:text-white hover:bg-[#1C1C1C]'
              }`}
              title="Toggle paragraph-by-paragraph Indonesian translation"
            >
              <Scale className="w-3.5 h-3.5 text-[#DCDCDC]" />
              <span>Indonesian Analysis: {showIndonesianTranslation ? 'ON' : 'OFF'}</span>
            </button>

            {/* Font Size Adjust */}
            <div className="flex items-center bg-[#0C0C0C] border border-white/[0.08] text-xs font-sans rounded-full overflow-hidden p-0.5">
              <button
                onClick={() => setFontSize('sm')}
                className={`px-3 py-1 cursor-pointer font-bold transition-all rounded-full ${fontSize === 'sm' ? 'bg-[#242424] text-white' : 'text-[#A8A8A8] hover:text-white'}`}
              >
                A-
              </button>
              <button
                onClick={() => setFontSize('base')}
                className={`px-3 py-1 cursor-pointer font-bold transition-all rounded-full ${fontSize === 'base' ? 'bg-[#242424] text-white' : 'text-[#A8A8A8] hover:text-white'}`}
              >
                A
              </button>
              <button
                onClick={() => setFontSize('lg')}
                className={`px-3 py-1 cursor-pointer font-bold transition-all rounded-full ${fontSize === 'lg' ? 'bg-[#242424] text-white' : 'text-[#A8A8A8] hover:text-white'}`}
              >
                A+
              </button>
            </div>
          </div>
        </div>

        {/* Quick Document Picker Switcher */}
        <div className="flex items-center gap-2 overflow-x-auto text-xs font-sans pt-1 no-scrollbar">
          <span className="text-[#A8A8A8] font-semibold uppercase tracking-wider shrink-0 text-[10px]">Switch Document:</span>
          {sampleLegalDocuments.map((doc) => (
            <button
              key={doc.id}
              onClick={() => {
                setActiveDocId(doc.id);
                const docTerm = legalVocabularyList.find(t => doc.keyTermIds?.includes(t.id)) || legalVocabularyList[0];
                setSelectedLegalTerm(docTerm);
              }}
              className={`px-3.5 py-1.5 whitespace-nowrap transition-all cursor-pointer rounded-full ${
                doc.id === currentDoc.id
                  ? 'bg-[#242424] text-white font-semibold border border-white/20'
                  : 'bg-[#151515] border border-white/[0.08] text-[#A8A8A8] hover:text-white hover:bg-[#1C1C1C] font-normal'
              }`}
            >
              {doc.title.split('—')[0].trim()}
            </button>
          ))}
        </div>
      </div>

      {/* Main Split Layout: Document Left (7 or 12 cols) + Legal Assistant Right (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT PANE: Dedicated Physical Parchment Canvas inside Glass Frame */}
        <div className={`${assistantPanelOpen ? 'lg:col-span-7' : 'lg:col-span-12'} p-4 sm:p-5 bg-[#101010] border border-white/[0.08] rounded-3xl transition-all duration-300`}>
          <div className="legal-paper-canvas p-6 sm:p-9 space-y-8 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
            
            {/* Document Head Caption */}
            <div className="text-center doc-header pb-6 space-y-2 border-b border-[#DCD4C6]">
              <span className="text-[10px] font-sans tracking-[0.06em] uppercase text-[#505B6D] block font-bold">
                OFFICIAL AUTHENTIC LEGAL INSTRUMENT
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#111722] uppercase tracking-wide">
                {currentDoc.title}
              </h2>
              <div className="flex items-center justify-center gap-4 text-xs font-sans text-[#505B6D] pt-1">
                <span>Governing Law: <strong className="text-[#18202C]">{currentDoc.governingLaw}</strong></span>
                <span>•</span>
                <span>Jurisdiction: <strong className="text-[#18202C]">{currentDoc.jurisdiction}</strong></span>
              </div>
              {currentDoc.parties && currentDoc.parties.length > 0 && (
                <div className="text-xs font-serif italic text-[#505B6D] pt-1">
                  Parties: {currentDoc.parties.join(' and ')}
                </div>
              )}
            </div>

            {/* Document Paragraphs */}
            <div className="space-y-6">
              {currentDoc.paragraphs.map((p) => {
                const isBookmarked = isParagraphBookmarked(currentDoc.id, p.id);
                const noteKey = `${currentDoc.id}-${p.id}`;
                const hasNote = !!personalNotes[noteKey];

                const textClasses = fontSize === 'sm' 
                  ? 'text-xs sm:text-sm leading-[1.7]' 
                  : fontSize === 'lg' 
                    ? 'text-base sm:text-lg leading-[1.8]' 
                    : 'text-[16px] sm:text-[17px] leading-[1.78]';

                return (
                  <div 
                    key={p.id}
                    id={p.id}
                    className={`group relative p-4.5 transition-all rounded-xl border-l-3 ${
                      isBookmarked 
                        ? 'bg-[#E3DFD5] border-[#18202C]' 
                        : 'border-transparent hover:border-[#18202C]/40 hover:bg-[#EFEAE0]'
                    }`}
                  >
                    {/* Paragraph Number & Utilities Bar */}
                    <div className="flex items-center justify-between text-[11px] font-sans text-[#505B6D] mb-2">
                      <span className="font-bold text-[#18202C] bg-black/[0.06] px-2.5 py-0.5 rounded-full tracking-wider text-[10px]">
                        {p.paragraphNumber}
                      </span>
                      <div className="flex items-center gap-2 opacity-70 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => toggleBookmarkParagraph(currentDoc.id, p.id)}
                          className="hover:text-[#18202C] cursor-pointer transition-colors"
                          title={isBookmarked ? "Remove Bookmark" : "Bookmark Paragraph"}
                        >
                          {isBookmarked ? <BookmarkCheck className="w-4 h-4 text-[#18202C]" /> : <Bookmark className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => handleOpenNoteModal(p.id)}
                          className="hover:text-[#18202C] cursor-pointer transition-colors"
                          title="Add Note to Paragraph"
                        >
                          <MessageSquare className={`w-4 h-4 ${hasNote ? 'text-[#18202C] font-bold' : ''}`} />
                        </button>
                      </div>
                    </div>

                    {/* English Clause Body with Highlighted Interactive Terms */}
                    <p className={`font-serif text-[#18202C] ${textClasses}`}>
                      {renderParagraphWithHighlights(p.text, p.highlightedTermIds)}
                    </p>

                    {/* Optional Indonesian Summary & Legal Nuance */}
                    {showIndonesianTranslation && p.indonesianSummary && (
                      <div className="mt-3.5 pt-2.5 p-3.5 rounded-xl bg-black/[0.04] border border-black/10 space-y-1">
                        <span className="text-[10px] font-sans uppercase text-[#18202C] flex items-center gap-1 font-bold tracking-wider">
                          <Scale className="w-3 h-3 text-[#18202C]" />
                          Analisis Yuridis & Makna Klausul:
                        </span>
                        <p className="text-xs sm:text-[13px] font-sans text-[#2E384D] leading-relaxed font-normal">
                          {p.indonesianSummary}
                        </p>
                      </div>
                    )}

                    {/* Existing Paragraph Note Banner */}
                    {hasNote && (
                      <div className="mt-2.5 p-3 bg-white/70 border border-black/10 text-xs font-sans text-[#18202C] rounded-xl">
                        <strong className="text-[#18202C]">My Note:</strong> {personalNotes[noteKey]}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom Complete CTA */}
            <div className="pt-6 border-t border-[#DCD4C6] flex items-center justify-between">
              <span className="text-xs font-sans text-[#505B6D]">
                End of Document • {currentDoc.title}
              </span>
              <button
                onClick={() => markDocumentComplete(currentDoc.id)}
                className="btn-primary px-5 py-2.5 text-xs rounded-full flex items-center gap-1.5 uppercase tracking-wider font-semibold"
              >
                <Check className="w-4 h-4" />
                <span>Mark Completed</span>
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT PANE: Legal English Assistant Panel (Floating Glass Card) */}
        {assistantPanelOpen && (
          <div 
            ref={assistantPanelRef} 
            id="legal-english-assistant-panel"
            className="lg:col-span-5 sticky top-24 space-y-4 scroll-mt-24 sm:scroll-mt-28"
            style={{ scrollMarginTop: '96px' }}
          >
            <div className="rounded-3xl bg-[#101010] overflow-hidden border border-white/[0.12] shadow-2xl">
              
              {/* Assistant Header & Tab Switcher */}
              <div className="p-5 border-b border-white/[0.08]">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <Scale className="w-4 h-4 text-[#DCDCDC]" />
                    <h3 className="font-sans font-extrabold text-sm tracking-wide uppercase text-white">
                      LEGAL ENGLISH ASSISTANT PANEL
                    </h3>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {selectedLegalTerm && (
                      <span className="hidden sm:inline-block text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#242424] border border-white/20 text-[#DCDCDC] truncate max-w-[120px]">
                        {selectedLegalTerm.term}
                      </span>
                    )}
                    <button
                      onClick={() => setAssistantPanelOpen(false)}
                      className="p-1 text-[#A8A8A8] hover:text-white hover:bg-[#1C1C1C] rounded-lg transition-all cursor-pointer"
                      title="Minimize Assistant Panel"
                      aria-label="Minimize Assistant Panel"
                    >
                      <Minimize2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-1.5 text-[11px] font-sans p-1 bg-[#0C0C0C] border border-white/[0.08] rounded-full">
                  <button
                    onClick={() => setActiveRightTab('INSPECTOR')}
                    className={`py-1.5 text-center transition-all cursor-pointer rounded-full ${
                      activeRightTab === 'INSPECTOR' ? 'bg-[#242424] text-white font-semibold border border-white/20' : 'text-[#A8A8A8] font-normal hover:text-white'
                    }`}
                  >
                    Inspector
                  </button>
                  <button
                    onClick={() => setActiveRightTab('GLOSSARY')}
                    className={`py-1.5 text-center transition-all cursor-pointer rounded-full ${
                      activeRightTab === 'GLOSSARY' ? 'bg-[#242424] text-white font-semibold border border-white/20' : 'text-[#A8A8A8] font-normal hover:text-white'
                    }`}
                  >
                    Glossary
                  </button>
                  <button
                    onClick={() => setActiveRightTab('SUMMARY')}
                    className={`py-1.5 text-center transition-all cursor-pointer rounded-full ${
                      activeRightTab === 'SUMMARY' ? 'bg-[#242424] text-white font-semibold border border-white/20' : 'text-[#A8A8A8] font-normal hover:text-white'
                    }`}
                  >
                    Summary
                  </button>
                  <button
                    onClick={() => setActiveRightTab('NOTES')}
                    className={`py-1.5 text-center transition-all cursor-pointer rounded-full ${
                      activeRightTab === 'NOTES' ? 'bg-[#242424] text-white font-semibold border border-white/20' : 'text-[#A8A8A8] font-normal hover:text-white'
                    }`}
                  >
                    Notes
                  </button>
                </div>
              </div>

              {/* TAB 1: TERM INSPECTOR */}
              {activeRightTab === 'INSPECTOR' && selectedLegalTerm && (
                <div ref={inspectorScrollRef} className="p-5 space-y-4 max-h-[75vh] overflow-y-auto no-scrollbar">
                  <div key={selectedLegalTerm.id} className="animate-inspector-fade space-y-4">
                    
                    {/* Header with Category, Part of Speech, Pronunciation & Save */}
                    <div className="flex items-start justify-between border-b border-white/[0.08] pb-3">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <span className="text-[10px] font-sans font-medium uppercase px-2.5 py-0.5 rounded-full tracking-wider bg-[#242424] text-[#DCDCDC] border border-white/10">
                            {selectedLegalTerm.category}
                          </span>
                          <span className="text-[10px] font-sans text-[#707070]">
                            {selectedLegalTerm.partOfSpeech}
                          </span>
                          {selectedLegalTerm.difficulty && (
                            <span className="text-[10px] font-sans text-[#DCDCDC] px-2 py-0.5 rounded-full bg-[#1C1C1C] border border-white/[0.08]">
                              {selectedLegalTerm.difficulty}
                            </span>
                          )}
                        </div>
                        <h4 className="text-2xl sm:text-3xl font-sans font-extrabold text-white tracking-tight">
                          {selectedLegalTerm.term}
                        </h4>

                        {selectedLegalTerm.pronunciation && (
                          <div className="flex items-center gap-2 mt-2">
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1C1C1C] border border-white/[0.08] text-[#DCDCDC] text-xs font-mono">
                              <span>{selectedLegalTerm.pronunciation}</span>
                              <button
                                onClick={() => playPronunciation(selectedLegalTerm.term)}
                                className="p-1 text-[#A8A8A8] hover:text-white hover:bg-[#242424] rounded-full transition-colors cursor-pointer"
                                title="Listen to American legal pronunciation"
                                aria-label="Listen to pronunciation"
                              >
                                <Volume2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <span className="text-[10px] text-[#707070] uppercase font-semibold tracking-wider">
                              Pronunciation
                            </span>
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() => {
                          if (isTermSaved(selectedLegalTerm.id)) {
                            removeSavedTerm(selectedLegalTerm.id);
                          } else {
                            saveTerm(selectedLegalTerm.id, undefined, currentDoc.id);
                          }
                        }}
                        className={`px-3.5 py-1.5 text-xs font-sans flex items-center gap-1.5 cursor-pointer rounded-full transition-all shrink-0 border ${
                          isTermSaved(selectedLegalTerm.id)
                            ? 'bg-[#242424] text-white border-white/20 font-semibold'
                            : 'bg-[#151515] border-white/[0.08] text-[#A8A8A8] hover:text-white hover:bg-[#1C1C1C]'
                        }`}
                        title="Save term to study list"
                      >
                        {isTermSaved(selectedLegalTerm.id) ? <BookmarkCheck className="w-3.5 h-3.5 text-white" /> : <Bookmark className="w-3.5 h-3.5" />}
                        <span>{isTermSaved(selectedLegalTerm.id) ? 'Saved' : 'Save'}</span>
                      </button>
                    </div>

                    {/* Meaning & Indonesian Legal Concept */}
                    <div className="p-4 rounded-2xl bg-[#151515] border border-white/[0.08] space-y-1.5">
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#DCDCDC]" />
                        <span className="text-[10px] font-sans uppercase text-[#A8A8A8] font-semibold tracking-wider">
                          Indonesian Legal Meaning & Concept
                        </span>
                      </div>
                      <p className="font-sans font-bold text-base text-[#F2F2F2]">
                        {selectedLegalTerm.indonesianMeaning}
                      </p>
                      {selectedLegalTerm.indonesianLegalConcept && (
                        <p className="text-xs sm:text-[13px] text-[#A8A8A8] leading-relaxed font-normal">
                          {selectedLegalTerm.indonesianLegalConcept}
                        </p>
                      )}
                    </div>

                    {/* Plain-Language Explanation */}
                    {(selectedLegalTerm.plainEnglish || selectedLegalTerm.legalDefinition) && (
                      <div className="p-4 rounded-2xl bg-[#151515] border border-white/[0.08] space-y-1.5">
                        <div className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#DCDCDC]" />
                          <span className="text-[10px] font-sans uppercase text-[#A8A8A8] font-semibold tracking-wider">
                            Plain-Language Explanation
                          </span>
                        </div>
                        <p className="text-xs sm:text-[13px] text-[#F2F2F2] leading-relaxed font-normal">
                          {selectedLegalTerm.plainEnglish || selectedLegalTerm.legalDefinition}
                        </p>
                      </div>
                    )}

                    {/* Legal Context / How Lawyers Use This in Contracts */}
                    {selectedLegalTerm.legalFunction && (
                      <div className="p-4 rounded-2xl bg-[#151515] border border-white/[0.08] space-y-1.5">
                        <div className="flex items-center gap-1.5">
                          <Scale className="w-3.5 h-3.5 text-[#DCDCDC]" />
                          <span className="text-[10px] font-sans uppercase text-[#A8A8A8] font-semibold tracking-wider">
                            Legal Context / How Lawyers Use This Term
                          </span>
                        </div>
                        <p className="text-xs sm:text-[13px] text-[#A8A8A8] leading-relaxed font-normal">
                          {selectedLegalTerm.legalFunction}
                        </p>
                      </div>
                    )}

                    {/* Indonesian Legal Equivalent (KUHPerdata / Civil Law) */}
                    <div className="p-4 rounded-2xl bg-[#151515] border border-white/[0.08] space-y-1.5">
                      <div className="flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-[#DCDCDC]" />
                        <span className="text-[10px] font-sans uppercase text-[#A8A8A8] font-semibold tracking-wider">
                          Indonesian Legal Equivalent (KUHPerdata / Hukum Positif)
                        </span>
                      </div>
                      <p className="text-xs sm:text-[13px] text-[#DCDCDC] font-sans font-medium">
                        {selectedLegalTerm.civilLawEquivalent || 'Padanan doktriner umum dalam sistem hukum perdata Indonesia.'}
                      </p>
                    </div>

                    {/* Drafting Nuance & Common Traps */}
                    {selectedLegalTerm.commonMistakesOrNuances && (
                      <div className="p-4 rounded-2xl bg-[#151515] border border-white/[0.08] space-y-1.5">
                        <div className="flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-[#DCDCDC]" />
                          <span className="text-[10px] font-sans uppercase text-[#DCDCDC] font-semibold tracking-wider">
                            Drafting Nuance & Common Traps
                          </span>
                        </div>
                        <p className="text-xs text-[#A8A8A8] leading-relaxed font-normal">
                          {selectedLegalTerm.commonMistakesOrNuances}
                        </p>
                      </div>
                    )}

                    {/* Example Sentence or Clause */}
                    {(selectedLegalTerm.authenticClauseExcerpt || selectedLegalTerm.exampleSentenceEn) && (
                      <div className="p-4 rounded-2xl bg-[#151515] border border-white/[0.08] space-y-2">
                        <span className="text-[10px] font-sans uppercase text-[#A8A8A8] font-semibold tracking-wider block">
                          Example Sentence & Authentic Clause
                        </span>
                        {selectedLegalTerm.authenticClauseExcerpt && (
                          <div className="p-3 rounded-xl bg-[#0C0C0C] border border-white/[0.08] font-serif text-xs text-[#F2F2F2] italic leading-relaxed">
                            "{selectedLegalTerm.authenticClauseExcerpt}"
                            {selectedLegalTerm.authenticClauseSource && (
                              <span className="block not-italic font-sans text-[10px] text-[#707070] mt-1.5">
                                — {selectedLegalTerm.authenticClauseSource}
                              </span>
                            )}
                          </div>
                        )}
                        {selectedLegalTerm.exampleSentenceEn && (
                          <div className="space-y-1 text-xs font-sans">
                            <p className="text-[#F2F2F2]">
                              <strong className="text-white">EN:</strong> {selectedLegalTerm.exampleSentenceEn}
                            </p>
                            {selectedLegalTerm.exampleSentenceId && (
                              <p className="text-[#A8A8A8] italic">
                                <strong className="text-[#707070]">ID:</strong> {selectedLegalTerm.exampleSentenceId}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Collocations & Related Terms */}
                    {selectedLegalTerm.commonCollocations && selectedLegalTerm.commonCollocations.length > 0 && (
                      <div className="space-y-1.5 pt-1">
                        <span className="text-[10px] font-sans uppercase text-[#707070] font-semibold tracking-wider block">
                          Common Collocations:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedLegalTerm.commonCollocations.map((col, idx) => (
                            <span key={idx} className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-[#1C1C1C] border border-white/[0.08] text-[#A8A8A8]">
                              {col}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* View in Full Modal */}
                    <button
                      onClick={() => setActiveLookupTermId(selectedLegalTerm.id)}
                      className="w-full btn-primary py-3 text-xs flex items-center justify-center gap-1.5 uppercase tracking-wider font-semibold rounded-full cursor-pointer transition-all"
                    >
                      <span>Open Complete Term Analysis</span>
                      <ArrowRight className="w-3.5 h-3.5 text-white" />
                    </button>

                  </div>
                </div>
              )}

              {/* TAB 2: DOCUMENT GLOSSARY */}
              {activeRightTab === 'GLOSSARY' && (
                <div className="p-5 space-y-3 max-h-[75vh] overflow-y-auto no-scrollbar">
                  <div className="text-xs font-sans text-[#A8A8A8] mb-2 font-medium">
                    Key terms in this document ({currentDoc.keyTermIds.length} terms):
                  </div>
                  <div className="space-y-2">
                    {currentDoc.keyTermIds.map((termId) => {
                      const matchedTerm = legalVocabularyList.find(t => t.id === termId);
                      if (!matchedTerm) return null;
                      const isSelected = selectedLegalTerm?.id === matchedTerm.id;
                      return (
                        <div
                          key={termId}
                          onClick={() => handleSelectLegalWord(matchedTerm)}
                          className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#242424] border-white/20 shadow-sm'
                              : 'bg-[#151515] border-white/[0.08] hover:border-white/20 hover:bg-[#1C1C1C]'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-sans font-bold text-sm text-[#F2F2F2]">
                              {matchedTerm.term}
                            </span>
                            <span className={`text-[10px] font-sans font-medium px-2 py-0.5 rounded-full border ${
                              isSelected
                                ? 'bg-white text-black border-white font-semibold'
                                : 'text-[#A8A8A8] bg-[#242424] border-white/10'
                            }`}>
                              {isSelected ? 'Active' : 'Inspect'}
                            </span>
                          </div>
                          <p className="text-xs text-[#A8A8A8] font-sans font-medium line-clamp-1">
                            {matchedTerm.indonesianMeaning}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

            {/* TAB 3: DOCUMENT SUMMARY */}
            {activeRightTab === 'SUMMARY' && (
              <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto no-scrollbar font-sans">
                <div className="space-y-2">
                  <h4 className="font-bold text-base text-white">
                    Document Summary (English)
                  </h4>
                  <p className="text-xs sm:text-sm text-[#A8A8A8] leading-relaxed font-normal">
                    {currentDoc.abstractEn}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#151515] border border-white/[0.08] space-y-2">
                  <h4 className="font-bold text-base text-white">
                    Ikhtisar Dokumen (Bahasa Indonesia)
                  </h4>
                  <p className="text-xs sm:text-sm text-[#A8A8A8] leading-relaxed font-normal">
                    {currentDoc.abstractId}
                  </p>
                </div>

                <div className="pt-2 font-sans text-xs text-[#A8A8A8] space-y-1">
                  <div><strong className="text-white">Document Type:</strong> {currentDoc.documentType}</div>
                  <div><strong className="text-white">Governing Law:</strong> {currentDoc.governingLaw}</div>
                  <div><strong className="text-white">Estimated Study Time:</strong> {currentDoc.readingTimeMinutes} Minutes</div>
                </div>
              </div>
            )}

            {/* TAB 4: MY ANNOTATIONS & NOTES */}
            {activeRightTab === 'NOTES' && (
              <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto no-scrollbar">
                <div className="text-xs font-sans text-[#A8A8A8]">
                  Personal notes and annotations for <em className="text-white">{currentDoc.title}</em>:
                </div>

                {Object.keys(personalNotes).filter(k => k.startsWith(currentDoc.id)).length === 0 ? (
                  <div className="p-6 text-center rounded-2xl border border-dashed border-white/10 text-[#707070]">
                    <MessageSquare className="w-6 h-6 mx-auto mb-2 opacity-40 text-[#DCDCDC]" />
                    <p className="text-xs font-sans">Belum ada catatan pada dokumen ini.</p>
                    <p className="text-[11px] font-sans mt-1 text-[#707070]">
                      Klik ikon pesan di sebelah paragraf dokumen untuk menambahkan catatan.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {Object.entries(personalNotes)
                      .filter(([k]) => k.startsWith(currentDoc.id))
                      .map(([key, note]) => {
                        const pId = key.replace(`${currentDoc.id}-`, '');
                        return (
                          <div key={key} className="p-3.5 rounded-2xl bg-[#151515] border border-white/[0.08] space-y-1">
                            <div className="flex items-center justify-between text-[10px] font-sans font-semibold text-[#A8A8A8]">
                              <span className="text-[#DCDCDC] font-bold">Paragraph {pId}</span>
                              <button
                                onClick={() => handleOpenNoteModal(pId)}
                                className="text-[#A8A8A8] underline hover:text-white cursor-pointer"
                              >
                                Edit
                              </button>
                            </div>
                            <p className="text-xs text-[#F2F2F2] font-sans">
                              {note}
                            </p>
                          </div>
                        );
                      })}
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
        )}

      </div>

      {/* Floating Re-open Button when Assistant Panel is Minimized */}
      {!assistantPanelOpen && (
        <div className="fixed bottom-6 right-6 z-40">
          <button
            onClick={() => {
              setAssistantPanelOpen(true);
              requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                  scrollToAssistantPanel(true);
                });
              });
            }}
            className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#151515] border border-white/20 text-[#F2F2F2] shadow-[0_15px_35px_rgba(0,0,0,0.6)] hover:scale-105 transition-all cursor-pointer group"
          >
            <Scale className="w-4 h-4 text-white group-hover:rotate-12 transition-transform" />
            <span className="text-xs font-sans font-bold tracking-wide">
              Open Legal Assistant
            </span>
            {selectedLegalTerm && (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#242424] text-[#DCDCDC] border border-white/20">
                {selectedLegalTerm.term}
              </span>
            )}
          </button>
        </div>
      )}

      {/* Note Edit Modal (Floating Glass Modal) */}
      {activeParagraphNoteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050505]/80 backdrop-blur-md">
          <div className="rounded-3xl bg-[#101010] backdrop-blur-2xl border border-white/[0.12] p-6 max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="font-sans font-bold text-base text-white">
              Add Study Note to Paragraph {activeParagraphNoteId}
            </h3>
            <textarea
              value={tempNoteText}
              onChange={(e) => setTempNoteText(e.target.value)}
              placeholder="Tuliskan analisis pasal, perbandingan KUHPerdata, atau catatan drafting..."
              className="w-full text-xs p-3.5 rounded-2xl bg-[#0C0C0C] border border-white/[0.08] text-[#F2F2F2] placeholder:text-[#707070] focus:outline-none focus:border-white/30 font-sans h-28 resize-none"
              autoFocus
            />
            <div className="flex justify-end gap-2 text-xs font-sans">
              <button
                onClick={() => setActiveParagraphNoteId(null)}
                className="btn-secondary px-4 py-2 rounded-full font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveParagraphNote}
                className="btn-primary px-4 py-2 rounded-full uppercase tracking-wider font-semibold"
              >
                Save Note
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
