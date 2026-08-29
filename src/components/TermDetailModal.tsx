import React, { useState } from 'react';
import { useStudy } from '../context/StudyContext';
import { legalVocabularyList, getTermById } from '../data/vocabulary/index';
import { 
  Bookmark, 
  BookmarkCheck, 
  X, 
  ArrowRight, 
  ExternalLink, 
  BookOpen, 
  ShieldCheck, 
  Scale, 
  FileText, 
  AlertTriangle, 
  Globe2, 
  Briefcase, 
  Gavel, 
  FileCode,
  Tag
} from 'lucide-react';

export const TermDetailModal: React.FC = () => {
  const { 
    activeLookupTermId, 
    setActiveLookupTermId, 
    isTermSaved, 
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

  const handleNavigateToDoc = (docId: string) => {
    setActiveLookupTermId(null);
    setActiveDocId(docId);
    setSelectedTab('documents');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm transition-opacity duration-200">
      <div 
        className="bg-[#13151D] border border-zinc-700 text-zinc-100 w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-xs shadow-2xl relative p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-150 scrollbar-thin"
        role="dialog"
        aria-modal="true"
      >
        {/* Top Header Bar */}
        <div className="flex items-start justify-between border-b border-zinc-800 pb-4 mb-6">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-sans font-semibold tracking-wider uppercase px-2 py-0.5 bg-zinc-800 text-zinc-300 border border-zinc-700 rounded-xs">
                {term.category}
              </span>
              {term.termType && (
                <span className="text-[10px] font-sans font-semibold px-2 py-0.5 bg-[#1B1F2A] text-amber-300 border border-amber-500/30 rounded-xs">
                  {term.termType}
                </span>
              )}
              {term.jurisdiction && (
                <span className="text-[10px] font-sans font-medium px-2 py-0.5 bg-zinc-900 text-zinc-400 border border-zinc-800 rounded-xs flex items-center gap-1">
                  <Globe2 className="w-3 h-3 text-zinc-500" />
                  {term.jurisdiction}
                </span>
              )}
              <span className="text-[10px] font-sans text-zinc-400 font-medium">
                {term.partOfSpeech}
              </span>
              <span className="text-[10px] px-2 py-0.5 bg-zinc-700 text-white font-sans font-bold rounded-xs">
                {term.difficulty}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-sans font-extrabold tracking-tight text-white flex items-center gap-3">
              {term.term}
              {term.pronunciation && (
                <span className="text-xs sm:text-sm font-sans font-normal text-zinc-400 tracking-normal">
                  {term.pronunciation}
                </span>
              )}
            </h2>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleSaveToggle}
              title={isSaved ? "Saved to My Lexicon" : "Save to My Lexicon"}
              className={`p-2 border transition-colors flex items-center gap-1.5 text-xs font-sans cursor-pointer rounded-xs ${
                isSaved 
                  ? 'bg-zinc-100 text-zinc-950 border-zinc-100 font-bold uppercase tracking-wider' 
                  : 'bg-[#181C26] text-zinc-300 border-zinc-700 hover:bg-zinc-800 font-semibold'
              }`}
            >
              {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
              <span className="hidden sm:inline">{isSaved ? 'Saved' : 'Save Term'}</span>
            </button>

            <button
              onClick={() => setActiveLookupTermId(null)}
              className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer rounded-xs"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="space-y-6">
          
          {/* Indonesian Meaning & Conceptual Foundation */}
          <div className="p-4 bg-[#181C26] border-l-2 border-amber-400/80 space-y-2 rounded-xs">
            <div className="text-[10px] font-sans uppercase tracking-[0.05em] text-amber-300 flex items-center gap-1.5 font-bold">
              <Scale className="w-3.5 h-3.5 text-amber-400" />
              Padanan Bahasa Indonesia & Konstruksi Hukum
            </div>
            <p className="text-base sm:text-lg font-sans font-bold text-white">
              {term.indonesianMeaning}
            </p>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans font-normal">
              {term.indonesianLegalConcept}
            </p>
            {term.civilLawEquivalent && (
              <div className="text-xs font-sans text-zinc-400 pt-1 border-t border-zinc-800">
                <span className="text-zinc-500">Civil Law / KUHPerdata Counterpart:</span>{' '}
                <span className="text-zinc-200 font-semibold">{term.civilLawEquivalent}</span>
              </div>
            )}
          </div>

          {/* Conceptual Distinction Note if applicable */}
          {(term.isDistinctConcept || term.conceptualNote) && (
            <div className="p-4 bg-amber-950/25 border border-amber-600/40 rounded-xs space-y-2">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-sans font-bold uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                Catatan Konseptual Komparatif (Common Law vs Civil Law)
              </div>
              <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed font-sans font-normal">
                {term.conceptualNote || 
                  'Istilah ini merupakan konsep khas Common Law yang tidak memiliki padanan langsung 1:1 dalam sistem hukum Indonesia (Civil Law). Terjemahan di atas merupakan padanan fungsional terdekat yang harus dipahami dalam konteks yuridisnya.'}
              </p>
            </div>
          )}

          {/* Plain English vs Legal Definition */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 border border-zinc-800 bg-[#161922] rounded-xs space-y-1.5">
              <span className="text-[10px] font-sans uppercase tracking-[0.05em] text-zinc-400 block font-bold">
                Plain English Explanation
              </span>
              <p className="text-xs sm:text-sm text-zinc-200 font-sans font-normal leading-relaxed">
                {term.plainEnglish || term.legalDefinition}
              </p>
            </div>

            <div className="p-4 border border-zinc-800 bg-[#161922] rounded-xs space-y-1.5">
              <span className="text-[10px] font-sans uppercase tracking-[0.05em] text-zinc-400 block font-bold">
                Black&apos;s Law / Formal Legal Definition
              </span>
              <p className="text-xs sm:text-sm text-zinc-300 font-sans font-normal leading-relaxed">
                {term.legalDefinition}
              </p>
            </div>
          </div>

          {/* Why Lawyers Use This (Legal Function) */}
          <div className="p-4 border border-zinc-800 bg-[#161922] rounded-xs space-y-1.5">
            <span className="text-[10px] font-sans uppercase tracking-[0.05em] text-zinc-300 block font-bold">
              Why Lawyers Use This in Practice (Legal Function)
            </span>
            <p className="text-xs sm:text-sm text-zinc-300 font-sans font-normal leading-relaxed">
              {term.legalFunction}
            </p>
          </div>

          {/* Authentic Contract Clause Excerpt (Source Serif 4) */}
          {term.authenticClauseExcerpt && (
            <div className="border border-zinc-800 bg-[#161922] p-4 rounded-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-sans uppercase tracking-wider text-zinc-300 flex items-center gap-1.5 font-bold">
                  <FileText className="w-3.5 h-3.5 text-zinc-400" />
                  Authentic Contract Clause Excerpt
                </span>
                {term.authenticClauseSource && (
                  <span className="text-[10px] font-sans text-zinc-400 italic">
                    Source: {term.authenticClauseSource}
                  </span>
                )}
              </div>
              <blockquote className="font-serif italic text-sm sm:text-[15px] text-zinc-200 pl-3 border-l-2 border-zinc-500 my-2 leading-[1.7] bg-[#11131A] p-3 rounded-xs">
                &ldquo;{term.authenticClauseExcerpt}&rdquo;
              </blockquote>
            </div>
          )}

          {/* Context Examples Tabs (Contracts / Court Decisions / Legal Opinions) */}
          {term.contextExamples && (
            <div className="border border-zinc-800 bg-[#161922] p-4 rounded-xs space-y-3">
              <span className="text-[10px] font-sans uppercase tracking-[0.05em] text-zinc-400 block font-bold">
                Contextual Usage in Real Legal Materials
              </span>
              
              <div className="flex items-center gap-2 border-b border-zinc-800 pb-2">
                <button
                  onClick={() => setActiveContextTab('contracts')}
                  className={`px-2.5 py-1 text-xs font-sans rounded-xs cursor-pointer flex items-center gap-1.5 ${
                    activeContextTab === 'contracts'
                      ? 'bg-zinc-800 text-white font-bold'
                      : 'text-zinc-400 hover:text-zinc-200 font-semibold'
                  }`}
                >
                  <Briefcase className="w-3 h-3" />
                  Contracts
                </button>
                <button
                  onClick={() => setActiveContextTab('courtDecisions')}
                  className={`px-2.5 py-1 text-xs font-sans rounded-xs cursor-pointer flex items-center gap-1.5 ${
                    activeContextTab === 'courtDecisions'
                      ? 'bg-zinc-800 text-white font-bold'
                      : 'text-zinc-400 hover:text-zinc-200 font-semibold'
                  }`}
                >
                  <Gavel className="w-3 h-3" />
                  Court Decisions
                </button>
                <button
                  onClick={() => setActiveContextTab('legalOpinions')}
                  className={`px-2.5 py-1 text-xs font-sans rounded-xs cursor-pointer flex items-center gap-1.5 ${
                    activeContextTab === 'legalOpinions'
                      ? 'bg-zinc-800 text-white font-bold'
                      : 'text-zinc-400 hover:text-zinc-200 font-semibold'
                  }`}
                >
                  <FileCode className="w-3 h-3" />
                  Legal Opinions
                </button>
              </div>

              <div className="text-xs sm:text-sm font-serif text-zinc-200 bg-[#12141C] p-3 rounded-xs leading-[1.7] border border-zinc-850">
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
            <span className="text-[10px] font-sans uppercase tracking-[0.05em] text-zinc-400 block font-bold">
              Standard Bilingual Sentence Example
            </span>
            <div className="p-3.5 border border-zinc-800 bg-[#161922] space-y-1.5 rounded-xs">
              <p className="text-sm font-medium text-white font-sans">
                {term.exampleSentenceEn}
              </p>
              <p className="text-xs text-zinc-300 font-sans italic border-t border-zinc-800/80 pt-1">
                {term.exampleSentenceId}
              </p>
            </div>
          </div>

          {/* Common Collocations */}
          {term.commonCollocations && term.commonCollocations.length > 0 && (
            <div>
              <span className="text-[10px] font-sans uppercase tracking-[0.05em] text-zinc-400 block mb-2 font-bold">
                Common Legal Collocations
              </span>
              <div className="flex flex-wrap gap-1.5">
                {term.commonCollocations.map((col, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 text-xs font-sans bg-[#181C26] border border-zinc-800 text-zinc-200 rounded-xs font-medium"
                  >
                    {col}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Drafting Tip / Common Traps */}
          {term.commonMistakesOrNuances && (
            <div className="p-3.5 border border-zinc-800 bg-[#181C26] flex items-start gap-3 rounded-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] font-sans uppercase tracking-[0.05em] text-zinc-300 font-bold block mb-0.5">
                  Drafting Tip & Student Traps
                </span>
                <p className="text-xs text-zinc-300 leading-relaxed font-sans font-normal">
                  {term.commonMistakesOrNuances}
                </p>
              </div>
            </div>
          )}

          {/* Connected Authentic Documents in LEXA */}
          {term.connectedDocIds && term.connectedDocIds.length > 0 && (
            <div className="p-4 border border-zinc-800 bg-[#151821] rounded-xs space-y-2">
              <span className="text-[10px] font-sans uppercase tracking-[0.05em] text-zinc-400 block font-bold">
                Encountered in Authentic Documents:
              </span>
              <div className="flex flex-wrap gap-2">
                {term.connectedDocIds.map((cd, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleNavigateToDoc(cd.docId)}
                    className="px-3 py-1.5 text-xs font-sans bg-[#1A1E29] border border-zinc-700 hover:border-amber-400 hover:bg-[#202534] text-zinc-200 transition-colors flex items-center gap-1.5 cursor-pointer rounded-xs font-semibold"
                  >
                    <FileText className="w-3.5 h-3.5 text-amber-400" />
                    <span>{cd.title}</span>
                    <ExternalLink className="w-3 h-3 text-zinc-400" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Related Terms & Phrases (Knowledge Graph) */}
          {term.relatedTerms && term.relatedTerms.length > 0 && (
            <div>
              <span className="text-[10px] font-sans uppercase tracking-[0.05em] text-zinc-400 block mb-2 font-bold">
                Related Terms (Knowledge Graph)
              </span>
              <div className="flex flex-wrap gap-2">
                {term.relatedTerms.map((rt, idx) => {
                  const matchedTerm = getTermById(rt);
                  return (
                    <button
                      key={idx}
                      onClick={() => matchedTerm && setActiveLookupTermId(matchedTerm.id)}
                      className={`px-2.5 py-1 text-xs font-sans border rounded-xs transition-all flex items-center gap-1 ${
                        matchedTerm
                          ? 'bg-[#181C26] border-zinc-700 text-zinc-200 hover:border-amber-400 hover:bg-zinc-800 cursor-pointer font-medium'
                          : 'bg-[#14161F] border-zinc-850 text-zinc-500 cursor-default font-normal'
                      }`}
                    >
                      {rt}
                      {matchedTerm && <ArrowRight className="w-3 h-3 text-amber-400/80" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Personal Study Note */}
          <div className="pt-4 border-t border-zinc-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-sans uppercase tracking-[0.05em] text-zinc-400 font-bold">
                My Personal Study Note
              </span>
              {isSaved && !isEditingNote && (
                <button
                  onClick={() => {
                    setPersonalNoteInput(savedRecord?.personalNote || '');
                    setIsEditingNote(true);
                  }}
                  className="text-xs text-amber-400 underline hover:no-underline font-sans font-semibold cursor-pointer"
                >
                  {savedRecord?.personalNote ? 'Edit Note' : '+ Add Note'}
                </button>
              )}
            </div>

            {isEditingNote ? (
              <div className="space-y-2">
                <textarea
                  value={personalNoteInput}
                  onChange={(e) => setPersonalNoteInput(e.target.value)}
                  placeholder="Tulis catatan analisis, contoh kasus, atau pasal KUHPerdata terkait..."
                  className="w-full text-xs p-2.5 border border-zinc-700 bg-[#161922] text-white focus:outline-none focus:border-amber-400 font-sans h-20 resize-none rounded-xs placeholder:text-zinc-500"
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setIsEditingNote(false)}
                    className="px-3 py-1 text-xs font-sans border border-zinc-700 text-zinc-300 hover:bg-zinc-800 cursor-pointer rounded-xs font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveNote}
                    className="px-3 py-1 text-xs font-sans bg-zinc-100 text-zinc-950 font-bold cursor-pointer rounded-xs uppercase tracking-wider"
                  >
                    Save Note
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-xs text-zinc-400 italic bg-[#161922] p-2.5 border border-zinc-800 rounded-xs font-sans">
                {savedRecord?.personalNote || 'Belum ada catatan pribadi untuk istilah ini. Klik "Save Term" dan tambahkan catatan.'}
              </p>
            )}
          </div>
        </div>

        {/* Footer actions */}
        <div className="mt-8 pt-4 border-t border-zinc-800 flex items-center justify-between">
          <button
            onClick={() => {
              setActiveLookupTermId(null);
              setSelectedTab('vocabulary');
            }}
            className="text-xs font-sans text-zinc-400 hover:text-white flex items-center gap-1.5 underline cursor-pointer font-medium"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            Explore in Full Lexicon Directory
          </button>
          
          <button
            onClick={() => setActiveLookupTermId(null)}
            className="px-5 py-2 bg-zinc-100 text-zinc-950 font-bold text-xs font-sans hover:bg-white transition-colors cursor-pointer rounded-xs uppercase tracking-wider"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
