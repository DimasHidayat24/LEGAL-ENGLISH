import React, { useState } from 'react';
import { useStudy } from '../context/StudyContext';
import { sampleLegalDocuments } from '../data/documentsData';
import { legalVocabularyList } from '../data/vocabularyData';
import { 
  Bookmark, 
  BookmarkCheck, 
  Scale, 
  Check, 
  MessageSquare, 
  CheckCircle2, 
  ArrowRight
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

  const [selectedTermId, setSelectedTermId] = useState<string | null>(null);
  const [activeRightTab, setActiveRightTab] = useState<'INSPECTOR' | 'GLOSSARY' | 'SUMMARY' | 'NOTES'>('INSPECTOR');
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg'>('base');
  const [showIndonesianTranslation, setShowIndonesianTranslation] = useState<boolean>(true);
  const [activeParagraphNoteId, setActiveParagraphNoteId] = useState<string | null>(null);
  const [tempNoteText, setTempNoteText] = useState<string>('');

  // Selected document or default to first
  const currentDoc = sampleLegalDocuments.find(d => d.id === activeDocId) || sampleLegalDocuments[0];
  const isDocCompleted = completedDocuments.includes(currentDoc.id);

  // Inspector term
  const activeInspectorTerm = selectedTermId 
    ? legalVocabularyList.find(t => t.id === selectedTermId || t.term.toLowerCase() === selectedTermId.toLowerCase())
    : legalVocabularyList.find(t => currentDoc.keyTermIds?.includes(t.id)) || legalVocabularyList[0];

  // Helper to render paragraph with clickable highlighted terms in warm parchment style
  const renderParagraphWithHighlights = (paragraphText: string, highlightedIds: string[] | undefined) => {
    if (!highlightedIds || highlightedIds.length === 0) {
      return <span>{paragraphText}</span>;
    }

    // Find all terms to highlight
    const termObjects = highlightedIds
      .map(id => legalVocabularyList.find(t => t.id === id))
      .filter((t): t is NonNullable<typeof t> => !!t);

    if (termObjects.length === 0) {
      return <span>{paragraphText}</span>;
    }

    // Build regex
    const regexPattern = new RegExp(`\\b(${termObjects.map(t => t.term).join('|')})\\b`, 'gi');
    const parts = paragraphText.split(regexPattern);

    return (
      <span>
        {parts.map((part, index) => {
          const matchedTerm = termObjects.find(t => t.term.toLowerCase() === part.toLowerCase());
          if (matchedTerm) {
            const isSelected = selectedTermId === matchedTerm.id;
            return (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedTermId(matchedTerm.id);
                  setActiveRightTab('INSPECTOR');
                }}
                className={`doc-term-highlight inline cursor-pointer text-inherit ${
                  isSelected ? 'active' : ''
                }`}
                title={`Inspect term: ${matchedTerm.indonesianMeaning}`}
              >
                {part}
              </button>
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
      <div className="glass-panel-deep liquid-lens p-5 sm:p-6 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1D3552]/80 dark:border-[#1D3552]/80 border-[#D4DFEC] pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="badge-accent text-[10px] font-sans font-medium uppercase px-2.5 py-0.5 rounded-full tracking-wider">
                {currentDoc.documentType}
              </span>
              <span className="text-[11px] font-sans text-[#9BAABC]">
                {currentDoc.jurisdiction}
              </span>
              <span className="text-[11px] font-sans text-[#64758A]">
                • {currentDoc.readingTimeMinutes} min read
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-sans font-extrabold text-[#F3F5F7] tracking-tight">
              {currentDoc.title}
            </h1>
          </div>

          {/* Action Bar */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => markDocumentComplete(currentDoc.id)}
              className={`px-4 py-2 text-xs font-sans flex items-center gap-1.5 transition-all cursor-pointer rounded-full ${
                isDocCompleted
                  ? 'bg-[#132B46] text-[#6A9BCB] border border-[#294766] font-semibold'
                  : 'btn-primary'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{isDocCompleted ? 'Completed' : 'Mark as Read'}</span>
            </button>

            <button
              onClick={() => setShowIndonesianTranslation(prev => !prev)}
              className={`px-4 py-2 text-xs font-sans flex items-center gap-1.5 cursor-pointer rounded-full transition-all ${
                showIndonesianTranslation 
                  ? 'bg-[#132B46] border border-[#294766] text-[#F3F5F7] font-semibold' 
                  : 'btn-secondary'
              }`}
              title="Toggle paragraph-by-paragraph Indonesian translation"
            >
              <Scale className="w-3.5 h-3.5 text-[#4F83B8]" />
              <span>Indonesian Analysis: {showIndonesianTranslation ? 'ON' : 'OFF'}</span>
            </button>

            {/* Font Size Adjust */}
            <div className="flex items-center bg-[#081222] border border-[#1D3552] text-xs font-sans rounded-full overflow-hidden p-0.5">
              <button
                onClick={() => setFontSize('sm')}
                className={`px-3 py-1 cursor-pointer font-bold transition-all rounded-full ${fontSize === 'sm' ? 'bg-[#132B46] text-[#F3F5F7]' : 'text-[#9BAABC] hover:text-[#F3F5F7]'}`}
              >
                A-
              </button>
              <button
                onClick={() => setFontSize('base')}
                className={`px-3 py-1 cursor-pointer font-bold transition-all rounded-full ${fontSize === 'base' ? 'bg-[#132B46] text-[#F3F5F7]' : 'text-[#9BAABC] hover:text-[#F3F5F7]'}`}
              >
                A
              </button>
              <button
                onClick={() => setFontSize('lg')}
                className={`px-3 py-1 cursor-pointer font-bold transition-all rounded-full ${fontSize === 'lg' ? 'bg-[#132B46] text-[#F3F5F7]' : 'text-[#9BAABC] hover:text-[#F3F5F7]'}`}
              >
                A+
              </button>
            </div>
          </div>
        </div>

        {/* Quick Document Picker Switcher */}
        <div className="flex items-center gap-2 overflow-x-auto text-xs font-sans pt-1 no-scrollbar">
          <span className="text-[#4F83B8] font-semibold uppercase tracking-wider shrink-0 text-[10px]">Switch Document:</span>
          {sampleLegalDocuments.map((doc) => (
            <button
              key={doc.id}
              onClick={() => {
                setActiveDocId(doc.id);
                setSelectedTermId(null);
              }}
              className={`px-3.5 py-1.5 whitespace-nowrap transition-all cursor-pointer rounded-full ${
                doc.id === currentDoc.id
                  ? 'bg-[#132B46] text-[#F3F5F7] font-semibold border border-[#294766]'
                  : 'bg-[#112239]/60 border border-[#1D3552] text-[#9BAABC] hover:text-[#F3F5F7] hover:bg-[#132B46] font-normal'
              }`}
            >
              {doc.title.split('—')[0].trim()}
            </button>
          ))}
        </div>
      </div>

      {/* Main Split Layout: Document Left (7 cols) + Legal Assistant Right (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT PANE: Dedicated Physical Parchment Canvas inside Glass Frame */}
        <div className="lg:col-span-7 p-4 sm:p-5 glass-panel-deep liquid-lens">
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
                        ? 'bg-[#E3DFD5] border-[#294766]' 
                        : 'border-transparent hover:border-[#294766]/50 hover:bg-[#EFEAE0]'
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
                          {isBookmarked ? <BookmarkCheck className="w-4 h-4 text-[#294766]" /> : <Bookmark className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => handleOpenNoteModal(p.id)}
                          className="hover:text-[#18202C] cursor-pointer transition-colors"
                          title="Add Note to Paragraph"
                        >
                          <MessageSquare className={`w-4 h-4 ${hasNote ? 'text-[#294766] font-bold' : ''}`} />
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
                        <span className="text-[10px] font-sans uppercase text-[#294766] flex items-center gap-1 font-bold tracking-wider">
                          <Scale className="w-3 h-3 text-[#294766]" />
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
                        <strong className="text-[#294766]">My Note:</strong> {personalNotes[noteKey]}
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
        <div className="lg:col-span-5 sticky top-24 space-y-4">
          <div className="rounded-3xl glass-panel-deep liquid-lens overflow-hidden">
            
            {/* Assistant Header & Tab Switcher */}
            <div className="p-5 border-b border-[#1D3552]/80">
              <div className="flex items-center gap-2 mb-3">
                <Scale className="w-4 h-4 text-[#4F83B8]" />
                <h3 className="font-sans font-extrabold text-sm tracking-wide uppercase text-[#F3F5F7]">
                  LEGAL ENGLISH ASSISTANT PANEL
                </h3>
              </div>
              <div className="grid grid-cols-4 gap-1.5 text-[11px] font-sans p-1 bg-[#081222] border border-[#1D3552] rounded-full">
                <button
                  onClick={() => setActiveRightTab('INSPECTOR')}
                  className={`py-1.5 text-center transition-all cursor-pointer rounded-full ${
                    activeRightTab === 'INSPECTOR' ? 'bg-[#132B46] text-[#F3F5F7] font-semibold border border-[#294766]' : 'text-[#9BAABC] font-normal hover:text-[#F3F5F7]'
                  }`}
                >
                  Inspector
                </button>
                <button
                  onClick={() => setActiveRightTab('GLOSSARY')}
                  className={`py-1.5 text-center transition-all cursor-pointer rounded-full ${
                    activeRightTab === 'GLOSSARY' ? 'bg-[#132B46] text-[#F3F5F7] font-semibold border border-[#294766]' : 'text-[#9BAABC] font-normal hover:text-[#F3F5F7]'
                  }`}
                >
                  Glossary
                </button>
                <button
                  onClick={() => setActiveRightTab('SUMMARY')}
                  className={`py-1.5 text-center transition-all cursor-pointer rounded-full ${
                    activeRightTab === 'SUMMARY' ? 'bg-[#132B46] text-[#F3F5F7] font-semibold border border-[#294766]' : 'text-[#9BAABC] font-normal hover:text-[#F3F5F7]'
                  }`}
                >
                  Summary
                </button>
                <button
                  onClick={() => setActiveRightTab('NOTES')}
                  className={`py-1.5 text-center transition-all cursor-pointer rounded-full ${
                    activeRightTab === 'NOTES' ? 'bg-[#132B46] text-[#F3F5F7] font-semibold border border-[#294766]' : 'text-[#9BAABC] font-normal hover:text-[#F3F5F7]'
                  }`}
                >
                  Notes
                </button>
              </div>
            </div>

            {/* TAB 1: TERM INSPECTOR */}
            {activeRightTab === 'INSPECTOR' && activeInspectorTerm && (
              <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto no-scrollbar">
                <div className="flex items-start justify-between border-b border-[#1D3552]/80 pb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="badge-accent text-[10px] font-sans font-medium uppercase px-2.5 py-0.5 rounded-full tracking-wider">
                        {activeInspectorTerm.category}
                      </span>
                      <span className="text-[10px] font-sans text-[#64758A]">
                        {activeInspectorTerm.partOfSpeech}
                      </span>
                    </div>
                    <h4 className="text-2xl sm:text-3xl font-sans font-extrabold text-[#F3F5F7] tracking-tight">
                      {activeInspectorTerm.term}
                    </h4>
                  </div>

                  <button
                    onClick={() => {
                      if (isTermSaved(activeInspectorTerm.id)) {
                        removeSavedTerm(activeInspectorTerm.id);
                      } else {
                        saveTerm(activeInspectorTerm.id, undefined, currentDoc.id);
                      }
                    }}
                    className={`px-3.5 py-1.5 text-xs font-sans flex items-center gap-1.5 cursor-pointer rounded-full transition-all ${
                      isTermSaved(activeInspectorTerm.id)
                        ? 'bg-[#132B46] text-[#6A9BCB] border border-[#294766] font-semibold'
                        : 'btn-secondary'
                    }`}
                    title="Save term to study list"
                  >
                    {isTermSaved(activeInspectorTerm.id) ? <BookmarkCheck className="w-3.5 h-3.5 text-[#4F83B8]" /> : <Bookmark className="w-3.5 h-3.5" />}
                    <span>{isTermSaved(activeInspectorTerm.id) ? 'Saved' : 'Save'}</span>
                  </button>
                </div>

                {/* Meaning & Indonesian Legal Concept */}
                <div className="p-4 rounded-2xl bg-[rgba(17,34,57,0.7)] border border-[#1D3552] space-y-1">
                  <span className="text-[10px] font-sans uppercase text-[#4F83B8] block font-semibold tracking-wider">
                    Bahasa Indonesia & Konsep Hukum
                  </span>
                  <p className="font-sans font-bold text-base text-[#F3F5F7]">
                    {activeInspectorTerm.indonesianMeaning}
                  </p>
                  <p className="text-xs sm:text-[13px] text-[#9BAABC] leading-relaxed font-normal">
                    {activeInspectorTerm.indonesianLegalConcept}
                  </p>
                </div>

                {/* Legal Function */}
                <div className="p-4 rounded-2xl bg-[rgba(17,34,57,0.5)] border border-[#1D3552] space-y-1">
                  <span className="text-[10px] font-sans uppercase text-[#F3F5F7] block font-semibold tracking-wider">
                    Why Lawyers Use This in Contracts
                  </span>
                  <p className="text-xs sm:text-[13px] text-[#9BAABC] leading-relaxed font-normal">
                    {activeInspectorTerm.legalFunction}
                  </p>
                </div>

                {/* Civil Law / Indonesian Law Nuance */}
                <div className="p-4 rounded-2xl bg-[rgba(17,34,57,0.5)] border border-[#1D3552] space-y-1">
                  <span className="text-[10px] font-sans uppercase text-[#4F83B8] block flex items-center gap-1 font-semibold tracking-wider">
                    <Scale className="w-3 h-3 text-[#4F83B8]" />
                    Civil Law / KUHPerdata Equivalent
                  </span>
                  <p className="text-xs sm:text-[13px] text-[#6A9BCB] font-sans font-medium">
                    {activeInspectorTerm.civilLawEquivalent || 'Padanan umum dalam doktrin perdata Indonesia.'}
                  </p>
                </div>

                {/* Drafting Nuance */}
                <div className="p-4 rounded-2xl bg-[rgba(17,34,57,0.5)] border border-[#1D3552] space-y-1">
                  <span className="text-[10px] font-sans uppercase text-[#4F83B8] block font-semibold tracking-wider">
                    Drafting Nuance & Traps
                  </span>
                  <p className="text-xs text-[#9BAABC] leading-relaxed font-normal">
                    {activeInspectorTerm.commonMistakesOrNuances}
                  </p>
                </div>

                {/* View in Full Modal */}
                <button
                  onClick={() => setActiveLookupTermId(activeInspectorTerm.id)}
                  className="w-full btn-primary py-3 text-xs flex items-center justify-center gap-1.5 uppercase tracking-wider font-semibold"
                >
                  <span>Open Complete Term Analysis</span>
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </button>
              </div>
            )}

            {/* TAB 2: DOCUMENT GLOSSARY */}
            {activeRightTab === 'GLOSSARY' && (
              <div className="p-5 space-y-3 max-h-[75vh] overflow-y-auto no-scrollbar">
                <div className="text-xs font-sans text-[#9BAABC] mb-2 font-medium">
                  Key terms in this document ({currentDoc.keyTermIds.length} terms):
                </div>
                <div className="space-y-2">
                  {currentDoc.keyTermIds.map((termId) => {
                    const matchedTerm = legalVocabularyList.find(t => t.id === termId);
                    if (!matchedTerm) return null;
                    return (
                      <div
                        key={termId}
                        onClick={() => {
                          setSelectedTermId(termId);
                          setActiveRightTab('INSPECTOR');
                        }}
                        className="p-3.5 rounded-2xl bg-[rgba(17,34,57,0.6)] border border-[#1D3552] hover:border-[#294766] hover:bg-[rgba(19,43,70,0.8)] cursor-pointer transition-all"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-sans font-bold text-sm text-[#F3F5F7]">
                            {matchedTerm.term}
                          </span>
                          <span className="text-[10px] font-sans font-medium text-[#4F83B8] px-2 py-0.5 bg-[#132B46] rounded-full border border-[#1D3552]">
                            Inspect
                          </span>
                        </div>
                        <p className="text-xs text-[#9BAABC] font-sans font-medium">
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
                  <h4 className="font-bold text-base text-[#F3F5F7]">
                    Document Summary (English)
                  </h4>
                  <p className="text-xs sm:text-sm text-[#9BAABC] leading-relaxed font-normal">
                    {currentDoc.abstractEn}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[rgba(17,34,57,0.7)] border border-[#1D3552] space-y-2">
                  <h4 className="font-bold text-base text-[#F3F5F7]">
                    Ikhtisar Dokumen (Bahasa Indonesia)
                  </h4>
                  <p className="text-xs sm:text-sm text-[#9BAABC] leading-relaxed font-normal">
                    {currentDoc.abstractId}
                  </p>
                </div>

                <div className="pt-2 font-sans text-xs text-[#9BAABC] space-y-1">
                  <div><strong className="text-[#F3F5F7]">Document Type:</strong> {currentDoc.documentType}</div>
                  <div><strong className="text-[#F3F5F7]">Governing Law:</strong> {currentDoc.governingLaw}</div>
                  <div><strong className="text-[#F3F5F7]">Estimated Study Time:</strong> {currentDoc.readingTimeMinutes} Minutes</div>
                </div>
              </div>
            )}

            {/* TAB 4: MY ANNOTATIONS & NOTES */}
            {activeRightTab === 'NOTES' && (
              <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto no-scrollbar">
                <div className="text-xs font-sans text-[#9BAABC]">
                  Personal notes and annotations for <em className="text-[#F3F5F7]">{currentDoc.title}</em>:
                </div>

                {Object.keys(personalNotes).filter(k => k.startsWith(currentDoc.id)).length === 0 ? (
                  <div className="p-6 text-center rounded-2xl border border-dashed border-[#1D3552] text-[#64758A]">
                    <MessageSquare className="w-6 h-6 mx-auto mb-2 opacity-40 text-[#4F83B8]" />
                    <p className="text-xs font-sans">Belum ada catatan pada dokumen ini.</p>
                    <p className="text-[11px] font-sans mt-1 text-[#64758A]">
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
                          <div key={key} className="p-3.5 rounded-2xl bg-[rgba(17,34,57,0.7)] border border-[#1D3552] space-y-1">
                            <div className="flex items-center justify-between text-[10px] font-sans font-semibold text-[#9BAABC]">
                              <span className="text-[#4F83B8] font-bold">Paragraph {pId}</span>
                              <button
                                onClick={() => handleOpenNoteModal(pId)}
                                className="text-[#4F83B8] underline hover:text-[#6A9BCB] cursor-pointer"
                              >
                                Edit
                              </button>
                            </div>
                            <p className="text-xs text-[#F3F5F7] font-sans">
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

      </div>

      {/* Note Edit Modal (Floating Glass Modal) */}
      {activeParagraphNoteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050B16]/80 backdrop-blur-md">
          <div className="rounded-3xl bg-[rgba(13,26,43,0.95)] backdrop-blur-2xl border border-[#1D3552] p-6 max-w-md w-full space-y-4 shadow-[0_30px_70px_rgba(2,6,12,0.7)]">
            <h3 className="font-sans font-bold text-base text-[#F3F5F7]">
              Add Study Note to Paragraph {activeParagraphNoteId}
            </h3>
            <textarea
              value={tempNoteText}
              onChange={(e) => setTempNoteText(e.target.value)}
              placeholder="Tuliskan analisis pasal, perbandingan KUHPerdata, atau catatan drafting..."
              className="w-full text-xs p-3.5 rounded-2xl bg-[#050B16] border border-[#1D3552] text-[#F3F5F7] placeholder:text-[#64758A] focus:outline-none focus:border-[#4F83B8] font-sans h-28 resize-none"
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
