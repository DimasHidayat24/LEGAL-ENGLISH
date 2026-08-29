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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Top Document Header & Selector (Surrounding Dark UI: #111A2B / #0B1220) */}
      <div className="bg-[#111A2B] border border-[#26344A] p-5 sm:p-6 space-y-4 rounded-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#26344A] pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="badge-gold text-[10px] font-sans font-semibold uppercase px-2 py-0.5 rounded-xs tracking-wider">
                {currentDoc.documentType}
              </span>
              <span className="text-[11px] font-sans text-[#AAB4C3]">
                {currentDoc.jurisdiction}
              </span>
              <span className="text-[11px] font-sans text-[#AAB4C3]">
                • {currentDoc.readingTimeMinutes} min read
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-sans font-extrabold text-[#F5F3EE] tracking-tight">
              {currentDoc.title}
            </h1>
          </div>

          {/* Action Bar */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => markDocumentComplete(currentDoc.id)}
              className={`px-3.5 py-1.5 text-xs font-sans flex items-center gap-1.5 transition-all cursor-pointer rounded-xs ${
                isDocCompleted
                  ? 'bg-[#8FAF9B] text-[#0B1220] font-bold shadow-xs'
                  : 'btn-primary'
              }`}
            >
              <CheckCircle2 className={`w-3.5 h-3.5 ${isDocCompleted ? 'text-[#0B1220]' : 'text-[#0B1220]'}`} />
              <span>{isDocCompleted ? 'Completed' : 'Mark as Read'}</span>
            </button>

            <button
              onClick={() => setShowIndonesianTranslation(prev => !prev)}
              className={`px-3 py-1.5 text-xs font-sans flex items-center gap-1.5 cursor-pointer rounded-xs transition-all ${
                showIndonesianTranslation 
                  ? 'bg-[#172235] border border-[#C9A45C] text-[#E8D9B5] font-semibold' 
                  : 'btn-secondary'
              }`}
              title="Toggle paragraph-by-paragraph Indonesian translation"
            >
              <Scale className="w-3.5 h-3.5 text-[#C9A45C]" />
              <span>Indonesian Analysis: {showIndonesianTranslation ? 'ON' : 'OFF'}</span>
            </button>

            {/* Font Size Adjust */}
            <div className="flex items-center bg-[#111A2B] border border-[#26344A] text-xs font-sans rounded-xs overflow-hidden">
              <button
                onClick={() => setFontSize('sm')}
                className={`px-2.5 py-1 cursor-pointer font-bold transition-colors ${fontSize === 'sm' ? 'bg-[#C9A45C] text-[#0B1220]' : 'text-[#AAB4C3] hover:text-[#F5F3EE]'}`}
              >
                A-
              </button>
              <button
                onClick={() => setFontSize('base')}
                className={`px-2.5 py-1 cursor-pointer font-bold transition-colors ${fontSize === 'base' ? 'bg-[#C9A45C] text-[#0B1220]' : 'text-[#AAB4C3] hover:text-[#F5F3EE]'}`}
              >
                A
              </button>
              <button
                onClick={() => setFontSize('lg')}
                className={`px-2.5 py-1 cursor-pointer font-bold transition-colors ${fontSize === 'lg' ? 'bg-[#C9A45C] text-[#0B1220]' : 'text-[#AAB4C3] hover:text-[#F5F3EE]'}`}
              >
                A+
              </button>
            </div>
          </div>
        </div>

        {/* Quick Document Picker Switcher */}
        <div className="flex items-center gap-2 overflow-x-auto text-xs font-sans pt-1">
          <span className="text-[#C9A45C] font-bold uppercase tracking-wider shrink-0 text-[10px]">Switch Document:</span>
          {sampleLegalDocuments.map((doc) => (
            <button
              key={doc.id}
              onClick={() => {
                setActiveDocId(doc.id);
                setSelectedTermId(null);
              }}
              className={`px-3 py-1 whitespace-nowrap transition-all cursor-pointer rounded-xs ${
                doc.id === currentDoc.id
                  ? 'bg-[#C9A45C] text-[#0B1220] font-bold shadow-xs'
                  : 'bg-[#111A2B] border border-[#26344A] text-[#AAB4C3] hover:text-[#F5F3EE] hover:border-[#C9A45C]/40 font-medium'
              }`}
            >
              {doc.title.split('—')[0].trim()}
            </button>
          ))}
        </div>
      </div>

      {/* Main Split Layout: Document Left (7 cols) + Legal Assistant Right (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT PANE: Dedicated Warm Reading Surface (#F4F0E8 Parchment Canvas in Source Serif 4) */}
        <div className="lg:col-span-7 legal-paper-canvas p-6 sm:p-9 space-y-8 rounded-xs">
          
          {/* Document Head Caption */}
          <div className="text-center doc-header pb-6 space-y-2">
            <span className="text-[10px] font-sans tracking-[0.05em] uppercase text-[#8F7647] block font-bold">
              OFFICIAL AUTHENTIC LEGAL INSTRUMENT
            </span>
            <h2 className="text-xl sm:text-2xl doc-title uppercase tracking-wide">
              {currentDoc.title}
            </h2>
            <div className="flex items-center justify-center gap-4 text-xs font-sans doc-secondary pt-1">
              <span>Governing Law: <strong className="text-[#202633]">{currentDoc.governingLaw}</strong></span>
              <span>•</span>
              <span>Jurisdiction: <strong className="text-[#202633]">{currentDoc.jurisdiction}</strong></span>
            </div>
            {currentDoc.parties && currentDoc.parties.length > 0 && (
              <div className="text-xs font-serif italic doc-secondary pt-1">
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
                  className={`group relative p-4.5 transition-all rounded-xs border-l-3 ${
                    isBookmarked 
                      ? 'bg-[#EAE2D3] border-[#C9A45C]' 
                      : 'border-transparent hover:border-[#C9A45C]/50 hover:bg-[#EFEAE0]'
                  }`}
                >
                  {/* Paragraph Number & Utilities Bar */}
                  <div className="flex items-center justify-between text-[11px] font-sans doc-secondary mb-2">
                    <span className="font-bold text-[#8F7647] bg-[#E8D9B5] px-2 py-0.5 rounded-xs tracking-wider text-[10px]">
                      {p.paragraphNumber}
                    </span>
                    <div className="flex items-center gap-2 opacity-70 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => toggleBookmarkParagraph(currentDoc.id, p.id)}
                        className="hover:text-[#8F7647] cursor-pointer transition-colors"
                        title={isBookmarked ? "Remove Bookmark" : "Bookmark Paragraph"}
                      >
                        {isBookmarked ? <BookmarkCheck className="w-4 h-4 text-[#8F7647]" /> : <Bookmark className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => handleOpenNoteModal(p.id)}
                        className="hover:text-[#8F7647] cursor-pointer transition-colors"
                        title="Add Note to Paragraph"
                      >
                        <MessageSquare className={`w-4 h-4 ${hasNote ? 'text-[#8F7647] font-bold' : ''}`} />
                      </button>
                    </div>
                  </div>

                  {/* English Clause Body with Highlighted Interactive Terms (Source Serif 4) */}
                  <p className={`font-serif text-[#202633] ${textClasses}`}>
                    {renderParagraphWithHighlights(p.text, p.highlightedTermIds)}
                  </p>

                  {/* Optional Indonesian Summary & Legal Nuance (Inter) */}
                  {showIndonesianTranslation && p.indonesianSummary && (
                    <div className="mt-3.5 pt-2.5 doc-analysis-box p-3.5 space-y-1 rounded-xs">
                      <span className="text-[10px] font-sans uppercase analysis-label flex items-center gap-1 font-bold tracking-wider">
                        <Scale className="w-3 h-3 text-[#8F7647]" />
                        Analisis Yuridis & Makna Klausul:
                      </span>
                      <p className="text-xs sm:text-[13px] font-sans text-[#2E384D] leading-relaxed font-normal">
                        {p.indonesianSummary}
                      </p>
                    </div>
                  )}

                  {/* Existing Paragraph Note Banner */}
                  {hasNote && (
                    <div className="mt-2.5 p-3 bg-[#E8D9B5]/80 border border-[#C9A45C]/30 text-xs font-sans text-[#202633] rounded-xs">
                      <strong className="text-[#8F7647]">My Note:</strong> {personalNotes[noteKey]}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom Complete CTA */}
          <div className="pt-6 border-t border-[#DDD4C4] flex items-center justify-between">
            <span className="text-xs font-sans doc-secondary">
              End of Document • {currentDoc.title}
            </span>
            <button
              onClick={() => markDocumentComplete(currentDoc.id)}
              className="btn-primary px-4 py-2 text-xs rounded-xs flex items-center gap-1.5 uppercase tracking-wider"
            >
              <Check className="w-4 h-4" />
              <span>Mark Completed & Log in Dashboard</span>
            </button>
          </div>
        </div>

        {/* RIGHT PANE: Legal English Assistant Panel (#172235 Dark Navy UI) */}
        <div className="lg:col-span-5 sticky top-20 space-y-4">
          <div className="lexa-card rounded-xs overflow-hidden">
            
            {/* Assistant Header & Tab Switcher */}
            <div className="p-5 border-b border-[#26344A]">
              <div className="flex items-center gap-2 mb-3">
                <Scale className="w-4 h-4 text-[#C9A45C]" />
                <h3 className="font-sans font-extrabold text-sm tracking-wide uppercase text-[#F5F3EE]">
                  LEGAL ENGLISH ASSISTANT PANEL
                </h3>
              </div>
              <div className="grid grid-cols-4 gap-1.5 text-[11px] font-sans">
                <button
                  onClick={() => setActiveRightTab('INSPECTOR')}
                  className={`py-1.5 text-center transition-all cursor-pointer rounded-xs ${
                    activeRightTab === 'INSPECTOR' ? 'bg-[#C9A45C] text-[#0B1220] font-bold shadow-xs' : 'bg-[#111A2B] text-[#AAB4C3] font-semibold hover:text-[#F5F3EE] hover:bg-[#172235]'
                  }`}
                >
                  Inspector
                </button>
                <button
                  onClick={() => setActiveRightTab('GLOSSARY')}
                  className={`py-1.5 text-center transition-all cursor-pointer rounded-xs ${
                    activeRightTab === 'GLOSSARY' ? 'bg-[#C9A45C] text-[#0B1220] font-bold shadow-xs' : 'bg-[#111A2B] text-[#AAB4C3] font-semibold hover:text-[#F5F3EE] hover:bg-[#172235]'
                  }`}
                >
                  Glossary
                </button>
                <button
                  onClick={() => setActiveRightTab('SUMMARY')}
                  className={`py-1.5 text-center transition-all cursor-pointer rounded-xs ${
                    activeRightTab === 'SUMMARY' ? 'bg-[#C9A45C] text-[#0B1220] font-bold shadow-xs' : 'bg-[#111A2B] text-[#AAB4C3] font-semibold hover:text-[#F5F3EE] hover:bg-[#172235]'
                  }`}
                >
                  Summary
                </button>
                <button
                  onClick={() => setActiveRightTab('NOTES')}
                  className={`py-1.5 text-center transition-all cursor-pointer rounded-xs ${
                    activeRightTab === 'NOTES' ? 'bg-[#C9A45C] text-[#0B1220] font-bold shadow-xs' : 'bg-[#111A2B] text-[#AAB4C3] font-semibold hover:text-[#F5F3EE] hover:bg-[#172235]'
                  }`}
                >
                  Notes
                </button>
              </div>
            </div>

            {/* TAB 1: TERM INSPECTOR */}
            {activeRightTab === 'INSPECTOR' && activeInspectorTerm && (
              <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
                <div className="flex items-start justify-between border-b border-[#26344A] pb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="badge-gold text-[10px] font-sans font-semibold uppercase px-2 py-0.5 rounded-xs tracking-wider">
                        {activeInspectorTerm.category}
                      </span>
                      <span className="text-[10px] font-sans text-[#AAB4C3]">
                        {activeInspectorTerm.partOfSpeech}
                      </span>
                    </div>
                    <h4 className="text-2xl sm:text-3xl font-sans font-extrabold text-[#F5F3EE] tracking-tight">
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
                    className={`px-3 py-1.5 text-xs font-sans flex items-center gap-1.5 cursor-pointer rounded-xs transition-all ${
                      isTermSaved(activeInspectorTerm.id)
                        ? 'bg-[#C9A45C] text-[#0B1220] font-bold shadow-xs'
                        : 'btn-secondary'
                    }`}
                    title="Save term to study list"
                  >
                    {isTermSaved(activeInspectorTerm.id) ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5 text-[#C9A45C]" />}
                    <span>{isTermSaved(activeInspectorTerm.id) ? 'Saved' : 'Save'}</span>
                  </button>
                </div>

                {/* Meaning & Indonesian Legal Concept */}
                <div className="p-3.5 bg-[#111A2B] border-l-2 border-[#C9A45C] border-y border-r border-[#26344A] space-y-1 rounded-xs">
                  <span className="text-[10px] font-sans uppercase text-[#C9A45C] block font-bold tracking-wider">
                    Bahasa Indonesia & Konsep Hukum
                  </span>
                  <p className="font-sans font-bold text-base text-[#F5F3EE]">
                    {activeInspectorTerm.indonesianMeaning}
                  </p>
                  <p className="text-xs sm:text-[13px] text-[#C5CBD5] leading-relaxed font-normal">
                    {activeInspectorTerm.indonesianLegalConcept}
                  </p>
                </div>

                {/* Legal Function */}
                <div className="p-3.5 bg-[#111A2B] border border-[#26344A] space-y-1 rounded-xs">
                  <span className="text-[10px] font-sans uppercase text-[#C9A45C] block font-bold tracking-wider">
                    Why Lawyers Use This in Contracts
                  </span>
                  <p className="text-xs sm:text-[13px] text-[#AAB4C3] leading-relaxed font-normal">
                    {activeInspectorTerm.legalFunction}
                  </p>
                </div>

                {/* Civil Law / Indonesian Law Nuance */}
                <div className="p-3.5 bg-[#111A2B] border border-[#26344A] space-y-1 rounded-xs">
                  <span className="text-[10px] font-sans uppercase text-[#C9A45C] block flex items-center gap-1 font-bold tracking-wider">
                    <Scale className="w-3 h-3 text-[#C9A45C]" />
                    Civil Law / KUHPerdata Equivalent
                  </span>
                  <p className="text-xs sm:text-[13px] text-[#C5CBD5] font-sans font-medium">
                    {activeInspectorTerm.civilLawEquivalent || 'Padanan umum dalam doktrin perdata Indonesia.'}
                  </p>
                </div>

                {/* Drafting Nuance */}
                <div className="p-3.5 bg-[#111A2B] border border-[#26344A] space-y-1 rounded-xs">
                  <span className="text-[10px] font-sans uppercase text-[#C9A45C] block font-bold tracking-wider">
                    Drafting Nuance & Traps
                  </span>
                  <p className="text-xs text-[#AAB4C3] leading-relaxed font-normal">
                    {activeInspectorTerm.commonMistakesOrNuances}
                  </p>
                </div>

                {/* View in Full Modal */}
                <button
                  onClick={() => setActiveLookupTermId(activeInspectorTerm.id)}
                  className="w-full btn-primary py-2.5 text-xs rounded-xs flex items-center justify-center gap-1.5 uppercase tracking-wider"
                >
                  <span>Open Complete Term Analysis</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* TAB 2: DOCUMENT GLOSSARY */}
            {activeRightTab === 'GLOSSARY' && (
              <div className="p-5 space-y-3 max-h-[75vh] overflow-y-auto">
                <div className="text-xs font-sans text-[#AAB4C3] mb-2 font-medium">
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
                        className="p-3 lexa-card hover:border-[#C9A45C]/50 cursor-pointer transition-all rounded-xs"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-sans font-bold text-sm text-[#F5F3EE]">
                            {matchedTerm.term}
                          </span>
                          <span className="text-[10px] font-sans font-semibold text-[#C9A45C]">
                            Inspect
                          </span>
                        </div>
                        <p className="text-xs text-[#AAB4C3] font-sans font-medium">
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
              <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto font-sans">
                <div className="space-y-2">
                  <h4 className="font-bold text-base text-[#F5F3EE]">
                    Document Summary (English)
                  </h4>
                  <p className="text-xs sm:text-sm text-[#AAB4C3] leading-relaxed font-normal">
                    {currentDoc.abstractEn}
                  </p>
                </div>

                <div className="p-3.5 bg-[#111A2B] border-l-2 border-[#C9A45C] border-y border-r border-[#26344A] space-y-2 rounded-xs">
                  <h4 className="font-bold text-base text-[#F5F3EE]">
                    Ikhtisar Dokumen (Bahasa Indonesia)
                  </h4>
                  <p className="text-xs sm:text-sm text-[#C5CBD5] leading-relaxed font-normal">
                    {currentDoc.abstractId}
                  </p>
                </div>

                <div className="pt-2 font-sans text-xs text-[#AAB4C3] space-y-1">
                  <div><strong className="text-[#F5F3EE]">Document Type:</strong> {currentDoc.documentType}</div>
                  <div><strong className="text-[#F5F3EE]">Governing Law:</strong> {currentDoc.governingLaw}</div>
                  <div><strong className="text-[#F5F3EE]">Estimated Study Time:</strong> {currentDoc.readingTimeMinutes} Minutes</div>
                </div>
              </div>
            )}

            {/* TAB 4: MY ANNOTATIONS & NOTES */}
            {activeRightTab === 'NOTES' && (
              <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
                <div className="text-xs font-sans text-[#AAB4C3]">
                  Personal notes and annotations for <em className="text-[#F5F3EE]">{currentDoc.title}</em>:
                </div>

                {Object.keys(personalNotes).filter(k => k.startsWith(currentDoc.id)).length === 0 ? (
                  <div className="p-6 text-center border border-dashed border-[#26344A] text-[#7F8A9B] rounded-xs">
                    <MessageSquare className="w-6 h-6 mx-auto mb-2 opacity-40 text-[#C9A45C]" />
                    <p className="text-xs font-sans">Belum ada catatan pada dokumen ini.</p>
                    <p className="text-[11px] font-sans mt-1 text-[#7F8A9B]">
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
                          <div key={key} className="p-3 lexa-card space-y-1 rounded-xs">
                            <div className="flex items-center justify-between text-[10px] font-sans font-semibold text-[#AAB4C3]">
                              <span className="text-[#C9A45C] font-bold">Paragraph {pId}</span>
                              <button
                                onClick={() => handleOpenNoteModal(pId)}
                                className="text-[#C9A45C] underline hover:text-[#E8D9B5] cursor-pointer"
                              >
                                Edit
                              </button>
                            </div>
                            <p className="text-xs text-[#C5CBD5] font-sans">
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

      {/* Note Edit Modal */}
      {activeParagraphNoteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75">
          <div className="lexa-card p-6 max-w-md w-full space-y-4 shadow-2xl rounded-xs">
            <h3 className="font-sans font-bold text-base text-[#F5F3EE]">
              Add Study Note to Paragraph {activeParagraphNoteId}
            </h3>
            <textarea
              value={tempNoteText}
              onChange={(e) => setTempNoteText(e.target.value)}
              placeholder="Tuliskan analisis pasal, perbandingan KUHPerdata, atau catatan drafting..."
              className="w-full text-xs p-3 lexa-input font-sans h-28 resize-none rounded-xs"
              autoFocus
            />
            <div className="flex justify-end gap-2 text-xs font-sans">
              <button
                onClick={() => setActiveParagraphNoteId(null)}
                className="btn-secondary px-4 py-2 rounded-xs font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveParagraphNote}
                className="btn-primary px-4 py-2 rounded-xs uppercase tracking-wider"
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
