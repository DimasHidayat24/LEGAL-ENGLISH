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

  const [docQuery, setDocQuery] = useState<string>('');
  const [docTypeFilter, setDocTypeFilter] = useState<string>('ALL');
  const [readProgress, setReadProgress] = useState<number>(0);
  const docCanvasRef = useRef<HTMLDivElement | null>(null);

  const docTypes = ['ALL', ...Array.from(new Set(sampleLegalDocuments.map((d) => d.documentType)))];
  const filteredDocs = sampleLegalDocuments.filter((d) => {
    if (docTypeFilter !== 'ALL' && d.documentType !== docTypeFilter) return false;
    const q = docQuery.trim().toLowerCase();
    if (!q) return true;
    return [d.title, d.documentType, d.jurisdiction, d.governingLaw, d.abstractEn].some((f) => f.toLowerCase().includes(q));
  });

  // Scroll-linked reading progress for the document canvas
  useEffect(() => {
    const onScroll = () => {
      const el = docCanvasRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight * 0.6;
      const read = Math.min(Math.max((window.innerHeight * 0.4 - rect.top) / Math.max(total, 1), 0), 1);
      setReadProgress(read);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [currentDoc.id]);

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
      <div
        className="reading-progress w-full"
        style={{ transform: `scaleX(${readProgress})` }}
        role="progressbar"
        aria-label="Reading progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(readProgress * 100)}
      />
      
      {/* Top Document Header & Selector (Floating Glass Container) */}
      <div className="bg-surface border border-line rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-line pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[11px] font-sans font-medium uppercase px-2.5 py-0.5 rounded-full tracking-wider bg-surface-3 text-ink-2 border border-line">
                {currentDoc.documentType}
              </span>
              <span className="text-[11px] font-sans text-muted">
                {currentDoc.jurisdiction}
              </span>
              <span className="text-[11px] font-sans text-faint">
                • {currentDoc.readingTimeMinutes} min read
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-serif font-semibold text-ink tracking-tight">
              {currentDoc.title}
            </h1>
          </div>

          {/* Action Bar */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => markDocumentComplete(currentDoc.id)}
              className={`h-9 px-3.5 text-xs ${isDocCompleted ? 'btn-secondary' : 'btn-primary'}`}
            >
              <CheckCircle2 className={`w-3.5 h-3.5 ${isDocCompleted ? 'text-success' : ''}`} />
              <span>{isDocCompleted ? 'Completed' : 'Mark as complete'}</span>
            </button>

            <button
              onClick={() => setShowIndonesianTranslation(prev => !prev)}
              className={`h-9 px-3.5 text-xs font-sans font-medium flex items-center gap-1.5 cursor-pointer rounded-lg transition-colors border ${
                showIndonesianTranslation
                  ? 'bg-surface-3 border-line-strong text-ink'
                  : 'bg-surface border-line text-muted hover:text-ink hover:bg-surface-2'
              }`}
              title="Toggle paragraph-by-paragraph Indonesian translation"
              aria-pressed={showIndonesianTranslation}
            >
              <Scale className="w-3.5 h-3.5 text-ink-2" />
              <span>Indonesian analysis: {showIndonesianTranslation ? 'On' : 'Off'}</span>
            </button>

            {/* Font Size Adjust */}
            <div className="flex items-center bg-surface border border-line text-xs font-sans rounded-full overflow-hidden p-0.5">
              <button
                onClick={() => setFontSize('sm')}
                className={`px-3 py-1 cursor-pointer font-bold transition-all rounded-full ${fontSize === 'sm' ? 'bg-accent text-on-accent' : 'text-muted hover:text-ink'}`}
              >
                A-
              </button>
              <button
                onClick={() => setFontSize('base')}
                className={`px-3 py-1 cursor-pointer font-bold transition-all rounded-full ${fontSize === 'base' ? 'bg-accent text-on-accent' : 'text-muted hover:text-ink'}`}
              >
                A
              </button>
              <button
                onClick={() => setFontSize('lg')}
                className={`px-3 py-1 cursor-pointer font-bold transition-all rounded-full ${fontSize === 'lg' ? 'bg-accent text-on-accent' : 'text-muted hover:text-ink'}`}
              >
                A+
              </button>
            </div>
          </div>
        </div>

        {/* Document library: all documents visible (wrapping), searchable, filterable by type */}
        <div className="space-y-3 pt-1">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <label htmlFor="doc-search" className="text-sm font-medium text-ink shrink-0">Documents</label>
            <input
              id="doc-search"
              type="search"
              value={docQuery}
              onChange={(e) => setDocQuery(e.target.value)}
              placeholder="Search documents"
              className="lexa-input px-4 py-2 text-sm w-full sm:max-w-xs"
            />
            <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Filter by type">
              {docTypes.map((t) => (
                <button
                  key={t}
                  onClick={() => setDocTypeFilter(t)}
                  aria-pressed={docTypeFilter === t}
                  className={`px-3 py-1.5 text-xs rounded-full border cursor-pointer transition-colors ${
                    docTypeFilter === t ? 'bg-accent text-on-accent border-accent font-semibold' : 'bg-surface text-muted border-line hover:text-ink hover:bg-surface-2'
                  }`}
                >
                  {t === 'ALL' ? 'All types' : t}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-2 text-sm">
            {filteredDocs.length === 0 && <span className="text-muted">No documents match.</span>}
            {filteredDocs.map((doc) => (
              <button
                key={doc.id}
                onClick={() => {
                  setActiveDocId(doc.id);
                  const docTerm = legalVocabularyList.find(t => doc.keyTermIds?.includes(t.id)) || legalVocabularyList[0];
                  setSelectedLegalTerm(docTerm);
                }}
                aria-current={doc.id === currentDoc.id ? 'true' : undefined}
                className={`px-3.5 py-1.5 text-left transition-colors cursor-pointer rounded-xl border flex items-center gap-2 ${
                  doc.id === currentDoc.id
                    ? 'bg-accent text-on-accent font-semibold border-accent'
                    : 'bg-surface border-line text-ink-2 hover:text-ink hover:bg-surface-2'
                }`}
              >
                {completedDocuments.includes(doc.id) && <CheckCircle2 className="w-3.5 h-3.5 shrink-0" aria-label="Completed" />}
                <span>{doc.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Split Layout: Document Left (7 or 12 cols) + Legal Assistant Right (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT PANE: Dedicated Physical Parchment Canvas inside Glass Frame */}
        <div className={`${assistantPanelOpen ? 'lg:col-span-7' : 'lg:col-span-12'} transition-all duration-300`}>
          <div ref={docCanvasRef} className="legal-paper-canvas p-6 sm:p-9 space-y-8 rounded-2xl">
            
            {/* Document Head Caption */}
            <div className="text-center doc-header pb-6 space-y-2 border-b border-line">
              <span className="text-[11px] font-sans text-faint block font-bold">
                Model document for study
              </span>
              <h2 className="text-xl sm:text-2xl font-legal font-bold text-ink">
                {currentDoc.title}
              </h2>
              <div className="flex items-center justify-center gap-4 text-xs font-sans text-faint pt-1">
                <span>Governing Law: <strong className="text-ink">{currentDoc.governingLaw}</strong></span>
                <span>•</span>
                <span>Jurisdiction: <strong className="text-ink">{currentDoc.jurisdiction}</strong></span>
              </div>
              {currentDoc.parties && currentDoc.parties.length > 0 && (
                <div className="text-xs font-legal italic text-faint pt-1">
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
                        ? 'bg-surface-2 border-line-strong' 
                        : 'border-transparent hover:border-line-strong hover:bg-surface-2'
                    }`}
                  >
                    {/* Paragraph Number & Utilities Bar */}
                    <div className="flex items-center justify-between text-[11px] font-sans text-faint mb-2">
                      <span className="font-bold text-ink bg-surface-2 px-2.5 py-0.5 rounded-full tracking-wider text-[11px]">
                        {p.paragraphNumber}
                      </span>
                      <div className="flex items-center gap-2 opacity-70 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => toggleBookmarkParagraph(currentDoc.id, p.id)}
                          className="hover:text-ink cursor-pointer transition-colors"
                          title={isBookmarked ? "Remove Bookmark" : "Bookmark Paragraph"}
                        >
                          {isBookmarked ? <BookmarkCheck className="w-4 h-4 text-ink" /> : <Bookmark className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => handleOpenNoteModal(p.id)}
                          className="hover:text-ink cursor-pointer transition-colors"
                          title="Add Note to Paragraph"
                        >
                          <MessageSquare className={`w-4 h-4 ${hasNote ? 'text-ink font-bold' : ''}`} />
                        </button>
                      </div>
                    </div>

                    {/* English Clause Body with Highlighted Interactive Terms */}
                    <p className={`font-legal text-ink ${textClasses}`}>
                      {renderParagraphWithHighlights(p.text, p.highlightedTermIds)}
                    </p>

                    {/* Optional Indonesian Summary & Legal Nuance */}
                    {showIndonesianTranslation && p.indonesianSummary && (
                      <div className="mt-3.5 pt-2.5 p-3.5 rounded-xl bg-surface-2 border border-line space-y-1">
                        <span className="text-[11px] font-sans uppercase text-ink flex items-center gap-1 font-bold tracking-wider">
                          <Scale className="w-3 h-3 text-ink" />
                          Analisis Yuridis & Makna Klausul:
                        </span>
                        <p className="text-xs sm:text-[13px] font-sans text-ink leading-relaxed font-normal">
                          {p.indonesianSummary}
                        </p>
                      </div>
                    )}

                    {/* Existing Paragraph Note Banner */}
                    {hasNote && (
                      <div className="mt-2.5 p-3 bg-surface border border-line text-xs font-sans text-ink rounded-xl">
                        <strong className="text-ink">My Note:</strong> {personalNotes[noteKey]}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom Complete CTA */}
            <div className="pt-6 border-t border-line flex items-center justify-between">
              <span className="text-xs font-sans text-faint">
                End of Document • {currentDoc.title}
              </span>
              <button
                onClick={() => markDocumentComplete(currentDoc.id)}
                disabled={isDocCompleted}
                className={`px-5 py-2.5 text-sm ${isDocCompleted ? 'btn-secondary' : 'btn-primary'}`}
              >
                <Check className="w-4 h-4" />
                <span>{isDocCompleted ? 'Completed' : 'Mark as complete'}</span>
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
            <div className="rounded-2xl bg-surface overflow-hidden border border-line">
              
              {/* Assistant Header & Tab Switcher */}
              <div className="p-5 border-b border-line">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <Scale className="w-4 h-4 text-ink-2" />
                    <h3 className="font-serif font-semibold text-sm text-ink">
                      Term assistant
                    </h3>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {selectedLegalTerm && (
                      <span className="hidden sm:inline-block text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-surface-3 border border-line-strong text-ink-2 truncate max-w-[120px]">
                        {selectedLegalTerm.term}
                      </span>
                    )}
                    <button
                      onClick={() => setAssistantPanelOpen(false)}
                      className="p-1 text-muted hover:text-ink hover:bg-surface-3 rounded-lg transition-all cursor-pointer"
                      title="Minimize Assistant Panel"
                      aria-label="Minimize Assistant Panel"
                    >
                      <Minimize2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-1.5 text-[11px] font-sans p-1 bg-surface border border-line rounded-full">
                  <button
                    onClick={() => setActiveRightTab('INSPECTOR')}
                    className={`py-1.5 text-center transition-all cursor-pointer rounded-full ${
                      activeRightTab === 'INSPECTOR' ? 'bg-accent text-on-accent font-semibold border border-accent' : 'text-muted font-normal hover:text-ink'
                    }`}
                  >
                    Inspector
                  </button>
                  <button
                    onClick={() => setActiveRightTab('GLOSSARY')}
                    className={`py-1.5 text-center transition-all cursor-pointer rounded-full ${
                      activeRightTab === 'GLOSSARY' ? 'bg-accent text-on-accent font-semibold border border-accent' : 'text-muted font-normal hover:text-ink'
                    }`}
                  >
                    Glossary
                  </button>
                  <button
                    onClick={() => setActiveRightTab('SUMMARY')}
                    className={`py-1.5 text-center transition-all cursor-pointer rounded-full ${
                      activeRightTab === 'SUMMARY' ? 'bg-accent text-on-accent font-semibold border border-accent' : 'text-muted font-normal hover:text-ink'
                    }`}
                  >
                    Summary
                  </button>
                  <button
                    onClick={() => setActiveRightTab('NOTES')}
                    className={`py-1.5 text-center transition-all cursor-pointer rounded-full ${
                      activeRightTab === 'NOTES' ? 'bg-accent text-on-accent font-semibold border border-accent' : 'text-muted font-normal hover:text-ink'
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
                    <div className="flex items-start justify-between border-b border-line pb-3">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <span className="text-[11px] font-sans font-medium uppercase px-2.5 py-0.5 rounded-full tracking-wider bg-surface-3 text-ink-2 border border-line">
                            {selectedLegalTerm.category}
                          </span>
                          <span className="text-[11px] font-sans text-faint">
                            {selectedLegalTerm.partOfSpeech}
                          </span>
                          {selectedLegalTerm.difficulty && (
                            <span className="text-[11px] font-sans text-ink-2 px-2 py-0.5 rounded-full bg-surface-3 border border-line">
                              {selectedLegalTerm.difficulty}
                            </span>
                          )}
                        </div>
                        <h4 className="text-2xl sm:text-3xl font-sans font-extrabold text-ink tracking-tight">
                          {selectedLegalTerm.term}
                        </h4>

                        {selectedLegalTerm.pronunciation && (
                          <div className="flex items-center gap-2 mt-2">
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-3 border border-line text-ink-2 text-xs font-mono">
                              <span>{selectedLegalTerm.pronunciation}</span>
                              <button
                                onClick={() => playPronunciation(selectedLegalTerm.term)}
                                className="p-1 text-muted hover:text-ink hover:bg-surface-3 rounded-full transition-colors cursor-pointer"
                                title="Listen to American legal pronunciation"
                                aria-label="Listen to pronunciation"
                              >
                                <Volume2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <span className="text-[11px] text-faint font-semibold">
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
                            ? 'bg-accent text-on-accent border-accent font-semibold'
                            : 'bg-surface border-line text-muted hover:text-ink hover:bg-surface-3'
                        }`}
                        title="Save term to study list"
                      >
                        {isTermSaved(selectedLegalTerm.id) ? <BookmarkCheck className="w-3.5 h-3.5 text-ink" /> : <Bookmark className="w-3.5 h-3.5" />}
                        <span>{isTermSaved(selectedLegalTerm.id) ? 'Saved' : 'Save'}</span>
                      </button>
                    </div>

                    {/* Meaning & Indonesian Legal Concept */}
                    <div className="p-4 rounded-2xl bg-surface border border-line space-y-1.5">
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                        <span className="text-[11px] font-sans text-muted font-semibold">
                          Indonesian Legal Meaning & Concept
                        </span>
                      </div>
                      <p className="font-sans font-bold text-base text-ink">
                        {selectedLegalTerm.indonesianMeaning}
                      </p>
                      {selectedLegalTerm.indonesianLegalConcept && (
                        <p className="text-xs sm:text-[13px] text-muted leading-relaxed font-normal">
                          {selectedLegalTerm.indonesianLegalConcept}
                        </p>
                      )}
                    </div>

                    {/* Plain-Language Explanation */}
                    {(selectedLegalTerm.plainEnglish || selectedLegalTerm.legalDefinition) && (
                      <div className="p-4 rounded-2xl bg-surface border border-line space-y-1.5">
                        <div className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                          <span className="text-[11px] font-sans text-muted font-semibold">
                            Plain-Language Explanation
                          </span>
                        </div>
                        <p className="text-xs sm:text-[13px] text-ink leading-relaxed font-normal">
                          {selectedLegalTerm.plainEnglish || selectedLegalTerm.legalDefinition}
                        </p>
                      </div>
                    )}

                    {/* Legal Context / How Lawyers Use This in Contracts */}
                    {selectedLegalTerm.legalFunction && (
                      <div className="p-4 rounded-2xl bg-surface border border-line space-y-1.5">
                        <div className="flex items-center gap-1.5">
                          <Scale className="w-3.5 h-3.5 text-ink-2" />
                          <span className="text-[11px] font-sans text-muted font-semibold">
                            Legal Context / How Lawyers Use This Term
                          </span>
                        </div>
                        <p className="text-xs sm:text-[13px] text-muted leading-relaxed font-normal">
                          {selectedLegalTerm.legalFunction}
                        </p>
                      </div>
                    )}

                    {/* Indonesian Legal Equivalent (KUHPerdata / Civil Law) */}
                    <div className="p-4 rounded-2xl bg-surface border border-line space-y-1.5">
                      <div className="flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-ink-2" />
                        <span className="text-[11px] font-sans text-muted font-semibold">
                          Indonesian Legal Equivalent (KUHPerdata / Hukum Positif)
                        </span>
                      </div>
                      <p className="text-xs sm:text-[13px] text-ink-2 font-sans font-medium">
                        {selectedLegalTerm.civilLawEquivalent || 'Padanan doktriner umum dalam sistem hukum perdata Indonesia.'}
                      </p>
                    </div>

                    {/* Drafting Nuance & Common Traps */}
                    {selectedLegalTerm.commonMistakesOrNuances && (
                      <div className="p-4 rounded-2xl bg-surface border border-line space-y-1.5">
                        <div className="flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-ink-2" />
                          <span className="text-[11px] font-sans uppercase text-ink-2 font-semibold tracking-wider">
                            Drafting Nuance & Common Traps
                          </span>
                        </div>
                        <p className="text-xs text-muted leading-relaxed font-normal">
                          {selectedLegalTerm.commonMistakesOrNuances}
                        </p>
                      </div>
                    )}

                    {/* Example Sentence or Clause */}
                    {(selectedLegalTerm.authenticClauseExcerpt || selectedLegalTerm.exampleSentenceEn) && (
                      <div className="p-4 rounded-2xl bg-surface border border-line space-y-2">
                        <span className="text-[11px] font-sans text-muted font-semibold block">
                          Example Sentence & Authentic Clause
                        </span>
                        {selectedLegalTerm.authenticClauseExcerpt && (
                          <div className="p-3 rounded-xl bg-surface border border-line font-legal text-xs text-ink italic leading-relaxed">
                            "{selectedLegalTerm.authenticClauseExcerpt}"
                            {selectedLegalTerm.authenticClauseSource && (
                              <span className="block not-italic font-sans text-[11px] text-faint mt-1.5">
                                — {selectedLegalTerm.authenticClauseSource}
                              </span>
                            )}
                          </div>
                        )}
                        {selectedLegalTerm.exampleSentenceEn && (
                          <div className="space-y-1 text-xs font-sans">
                            <p className="text-ink">
                              <strong className="text-ink">EN:</strong> {selectedLegalTerm.exampleSentenceEn}
                            </p>
                            {selectedLegalTerm.exampleSentenceId && (
                              <p className="text-muted italic">
                                <strong className="text-faint">ID:</strong> {selectedLegalTerm.exampleSentenceId}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Collocations & Related Terms */}
                    {selectedLegalTerm.commonCollocations && selectedLegalTerm.commonCollocations.length > 0 && (
                      <div className="space-y-1.5 pt-1">
                        <span className="text-[11px] font-sans text-faint font-semibold block">
                          Common Collocations:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedLegalTerm.commonCollocations.map((col, idx) => (
                            <span key={idx} className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-surface-3 border border-line text-muted">
                              {col}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* View in Full Modal */}
                    <button
                      onClick={() => setActiveLookupTermId(selectedLegalTerm.id)}
                      className="w-full btn-primary py-3 text-xs flex items-center justify-center gap-1.5 font-medium cursor-pointer transition-all"
                    >
                      <span>Open Complete Term Analysis</span>
                      <ArrowRight className="w-3.5 h-3.5 text-ink" />
                    </button>

                  </div>
                </div>
              )}

              {/* TAB 2: DOCUMENT GLOSSARY */}
              {activeRightTab === 'GLOSSARY' && (
                <div className="p-5 space-y-3 max-h-[75vh] overflow-y-auto no-scrollbar">
                  <div className="text-xs font-sans text-muted mb-2 font-medium">
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
                              ? 'bg-surface-3 border-line-strong shadow-sm'
                              : 'bg-surface border-line hover:border-line-strong hover:bg-surface-3'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-sans font-bold text-sm text-ink">
                              {matchedTerm.term}
                            </span>
                            <span className={`text-[11px] font-sans font-medium px-2 py-0.5 rounded-full border ${
                              isSelected
                                ? 'bg-accent text-on-accent border-accent font-semibold'
                                : 'text-muted bg-surface-3 border-line'
                            }`}>
                              {isSelected ? 'Active' : 'Inspect'}
                            </span>
                          </div>
                          <p className="text-xs text-muted font-sans font-medium line-clamp-1">
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
                  <h4 className="font-bold text-base text-ink">
                    Document Summary (English)
                  </h4>
                  <p className="text-xs sm:text-sm text-muted leading-relaxed font-normal">
                    {currentDoc.abstractEn}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-line space-y-2">
                  <h4 className="font-bold text-base text-ink">
                    Ikhtisar Dokumen (Bahasa Indonesia)
                  </h4>
                  <p className="text-xs sm:text-sm text-muted leading-relaxed font-normal">
                    {currentDoc.abstractId}
                  </p>
                </div>

                <div className="pt-2 font-sans text-xs text-muted space-y-1">
                  <div><strong className="text-ink">Document Type:</strong> {currentDoc.documentType}</div>
                  <div><strong className="text-ink">Governing Law:</strong> {currentDoc.governingLaw}</div>
                  <div><strong className="text-ink">Estimated Study Time:</strong> {currentDoc.readingTimeMinutes} Minutes</div>
                </div>
              </div>
            )}

            {/* TAB 4: MY ANNOTATIONS & NOTES */}
            {activeRightTab === 'NOTES' && (
              <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto no-scrollbar">
                <div className="text-xs font-sans text-muted">
                  Personal notes and annotations for <em className="text-ink">{currentDoc.title}</em>:
                </div>

                {Object.keys(personalNotes).filter(k => k.startsWith(currentDoc.id)).length === 0 ? (
                  <div className="p-6 text-center rounded-2xl border border-dashed border-line text-faint">
                    <MessageSquare className="w-6 h-6 mx-auto mb-2 opacity-40 text-ink-2" />
                    <p className="text-xs font-sans">Belum ada catatan pada dokumen ini.</p>
                    <p className="text-[11px] font-sans mt-1 text-faint">
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
                          <div key={key} className="p-3.5 rounded-2xl bg-surface border border-line space-y-1">
                            <div className="flex items-center justify-between text-[11px] font-sans font-semibold text-muted">
                              <span className="text-ink-2 font-bold">Paragraph {pId}</span>
                              <button
                                onClick={() => handleOpenNoteModal(pId)}
                                className="text-muted underline hover:text-ink cursor-pointer"
                              >
                                Edit
                              </button>
                            </div>
                            <p className="text-xs text-ink font-sans">
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
            className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-surface border border-line-strong text-ink hover:scale-105 transition-all cursor-pointer group"
          >
            <Scale className="w-4 h-4 text-ink group-hover:rotate-12 transition-transform" />
            <span className="text-xs font-sans font-bold tracking-wide">
              Open Legal Assistant
            </span>
            {selectedLegalTerm && (
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-surface-3 text-ink-2 border border-line-strong">
                {selectedLegalTerm.term}
              </span>
            )}
          </button>
        </div>
      )}

      {/* Note Edit Modal (Floating Glass Modal) */}
      {activeParagraphNoteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface/80 backdrop-blur-md">
          <div className="rounded-2xl bg-surface backdrop-blur-2xl border border-line p-6 max-w-md w-full space-y-4">
            <h3 className="font-serif font-semibold text-base text-ink">
              Add Study Note to Paragraph {activeParagraphNoteId}
            </h3>
            <textarea
              value={tempNoteText}
              onChange={(e) => setTempNoteText(e.target.value)}
              placeholder="Tuliskan analisis pasal, perbandingan KUHPerdata, atau catatan drafting..."
              className="w-full text-xs p-3.5 rounded-2xl bg-surface border border-line text-ink placeholder:text-faint focus:outline-none focus:border-line-strong font-sans h-28 resize-none"
              autoFocus
            />
            <div className="flex justify-end gap-2 text-xs font-sans">
              <button
                onClick={() => setActiveParagraphNoteId(null)}
                className="btn-secondary px-4 py-2 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveParagraphNote}
                className="btn-primary px-4 py-2 font-medium"
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
