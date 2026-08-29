import React, { useState } from 'react';
import { useStudy } from '../context/StudyContext';
import { legalVocabularyList } from '../data/vocabularyData';
import { sampleLegalDocuments } from '../data/documentsData';
import { curriculumLessons } from '../data/curriculumData';
import { 
  Bookmark, 
  Trash2, 
  RotateCw, 
  Search, 
  Award, 
  MessageSquare,
  ArrowRight,
  Copy,
  Check
} from 'lucide-react';

export const MyStudyDashboard: React.FC = () => {
  const { 
    savedTerms, 
    removeSavedTerm, 
    bookmarkedParagraphs, 
    completedLessons, 
    completedDocuments, 
    exerciseScores, 
    personalNotes, 
    setActiveLookupTermId, 
    setActiveDocId, 
    setSelectedTab 
  } = useStudy();

  const [activeTab, setActiveTab] = useState<'VOCAB' | 'FLASHCARDS' | 'BOOKMARKS' | 'NOTES'>('VOCAB');
  const [vocabSearch, setVocabSearch] = useState<string>('');
  const [flashcardIdx, setFlashcardIdx] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [copiedVocab, setCopiedVocab] = useState<boolean>(false);

  // Filter saved terms
  const filteredSaved = savedTerms.filter(st => {
    const fullTerm = legalVocabularyList.find(t => t.id === st.termId);
    if (!fullTerm) return false;
    if (!vocabSearch) return true;
    return fullTerm.term.toLowerCase().includes(vocabSearch.toLowerCase()) ||
           fullTerm.indonesianMeaning.toLowerCase().includes(vocabSearch.toLowerCase()) ||
           (st.personalNote && st.personalNote.toLowerCase().includes(vocabSearch.toLowerCase()));
  });

  const handleCopyVocabList = () => {
    const listText = savedTerms.map(st => {
      const t = legalVocabularyList.find(item => item.id === st.termId);
      return `${t?.term || st.termId} — ${t?.indonesianMeaning || ''} [Note: ${st.personalNote || 'None'}]`;
    }).join('\n');
    navigator.clipboard.writeText(listText);
    setCopiedVocab(true);
    setTimeout(() => setCopiedVocab(false), 2000);
  };

  // Flashcards
  const flashcardTermObj = filteredSaved[flashcardIdx] ? legalVocabularyList.find(t => t.id === filteredSaved[flashcardIdx].termId) : null;

  const handleNextFlashcard = () => {
    setIsFlipped(false);
    if (flashcardIdx < filteredSaved.length - 1) {
      setFlashcardIdx(prev => prev + 1);
    } else {
      setFlashcardIdx(0);
    }
  };

  const handlePrevFlashcard = () => {
    setIsFlipped(false);
    if (flashcardIdx > 0) {
      setFlashcardIdx(prev => prev - 1);
    } else {
      setFlashcardIdx(filteredSaved.length - 1);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="border-b border-[#26344A] pb-6">
        <div className="flex items-center gap-2 mb-1">
          <Award className="w-4 h-4 text-[#C9A45C]" />
          <span className="text-[11px] font-sans tracking-widest uppercase text-[#C9A45C] font-bold">
            INDIVIDUAL STUDY RECORD
          </span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-sans font-extrabold text-[#F5F3EE] tracking-tight">
          My Legal English Study Hub
        </h1>
        <p className="text-sm sm:text-base text-[#AAB4C3] font-sans mt-2 max-w-3xl leading-relaxed">
          Review saved legal terminology, flashcards, annotated document clauses, and monitor your academic progress.
        </p>

        {/* Top Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
          <div className="p-4 lexa-card space-y-1 rounded-xs">
            <span className="text-[10px] font-sans uppercase text-[#C9A45C] block font-bold">Saved Terms</span>
            <div className="text-2xl sm:text-3xl font-sans font-extrabold text-[#F5F3EE] tracking-tight">
              {savedTerms.length}
            </div>
            <span className="text-[11px] font-sans text-[#AAB4C3] font-medium">In My Vocabulary</span>
          </div>

          <div className="p-4 lexa-card space-y-1 rounded-xs">
            <span className="text-[10px] font-sans uppercase text-[#C9A45C] block font-bold">Lessons Mastered</span>
            <div className="text-2xl sm:text-3xl font-sans font-extrabold text-[#F5F3EE] tracking-tight">
              {completedLessons.length} / {curriculumLessons.length}
            </div>
            <span className="text-[11px] font-sans text-[#AAB4C3] font-medium">Curriculum Modules</span>
          </div>

          <div className="p-4 lexa-card space-y-1 rounded-xs">
            <span className="text-[10px] font-sans uppercase text-[#C9A45C] block font-bold">Documents Read</span>
            <div className="text-2xl sm:text-3xl font-sans font-extrabold text-[#F5F3EE] tracking-tight">
              {completedDocuments.length} / {sampleLegalDocuments.length}
            </div>
            <span className="text-[11px] font-sans text-[#AAB4C3] font-medium">Authentic Instruments</span>
          </div>

          <div className="p-4 lexa-card space-y-1 rounded-xs">
            <span className="text-[10px] font-sans uppercase text-[#C9A45C] block font-bold">Exercises Solved</span>
            <div className="text-2xl sm:text-3xl font-sans font-extrabold text-[#F5F3EE] tracking-tight">
              {Object.keys(exerciseScores).length}
            </div>
            <span className="text-[11px] font-sans text-[#AAB4C3] font-medium">Practice Benchmark</span>
          </div>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex items-center justify-between border-b border-[#26344A] pb-2">
        <div className="flex items-center gap-2 overflow-x-auto text-xs font-sans no-scrollbar">
          <button
            onClick={() => setActiveTab('VOCAB')}
            className={`px-3.5 py-1.5 whitespace-nowrap border transition-colors cursor-pointer rounded-xs text-xs font-semibold ${
              activeTab === 'VOCAB'
                ? 'bg-[#C9A45C] text-[#0B1220] border-[#C9A45C] font-bold shadow-xs'
                : 'bg-[#111A2B] text-[#AAB4C3] border-[#26344A] hover:bg-[#172235] hover:text-[#F5F3EE]'
            }`}
          >
            Saved Vocabulary ({savedTerms.length})
          </button>

          <button
            onClick={() => setActiveTab('FLASHCARDS')}
            className={`px-3.5 py-1.5 whitespace-nowrap border transition-colors cursor-pointer rounded-xs text-xs font-semibold ${
              activeTab === 'FLASHCARDS'
                ? 'bg-[#C9A45C] text-[#0B1220] border-[#C9A45C] font-bold shadow-xs'
                : 'bg-[#111A2B] text-[#AAB4C3] border-[#26344A] hover:bg-[#172235] hover:text-[#F5F3EE]'
            }`}
          >
            Flashcard Drill Mode
          </button>

          <button
            onClick={() => setActiveTab('BOOKMARKS')}
            className={`px-3.5 py-1.5 whitespace-nowrap border transition-colors cursor-pointer rounded-xs text-xs font-semibold ${
              activeTab === 'BOOKMARKS'
                ? 'bg-[#C9A45C] text-[#0B1220] border-[#C9A45C] font-bold shadow-xs'
                : 'bg-[#111A2B] text-[#AAB4C3] border-[#26344A] hover:bg-[#172235] hover:text-[#F5F3EE]'
            }`}
          >
            Bookmarked Clauses ({bookmarkedParagraphs.length})
          </button>

          <button
            onClick={() => setActiveTab('NOTES')}
            className={`px-3.5 py-1.5 whitespace-nowrap border transition-colors cursor-pointer rounded-xs text-xs font-semibold ${
              activeTab === 'NOTES'
                ? 'bg-[#C9A45C] text-[#0B1220] border-[#C9A45C] font-bold shadow-xs'
                : 'bg-[#111A2B] text-[#AAB4C3] border-[#26344A] hover:bg-[#172235] hover:text-[#F5F3EE]'
            }`}
          >
            Study Notes ({Object.keys(personalNotes).length})
          </button>
        </div>

        {activeTab === 'VOCAB' && savedTerms.length > 0 && (
          <button
            onClick={handleCopyVocabList}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 btn-secondary text-xs rounded-xs uppercase tracking-wider"
          >
            {copiedVocab ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5 text-[#C9A45C]" />}
            <span>{copiedVocab ? 'Copied' : 'Export Vocabulary'}</span>
          </button>
        )}
      </div>

      {/* TAB 1: SAVED VOCABULARY LIST */}
      {activeTab === 'VOCAB' && (
        <div className="space-y-6">
          {savedTerms.length > 0 && (
            <div className="relative">
              <Search className="w-4 h-4 text-[#7F8A9B] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={vocabSearch}
                onChange={(e) => setVocabSearch(e.target.value)}
                placeholder="Filter saved terms or your personal notes..."
                className="w-full pl-10 pr-4 py-2.5 lexa-input text-xs font-sans rounded-xs"
              />
            </div>
          )}

          {filteredSaved.length === 0 ? (
            <div className="text-center py-16 lexa-card p-8 space-y-3 rounded-xs">
              <Bookmark className="w-8 h-8 mx-auto text-[#7F8A9B] opacity-40" />
              <h3 className="font-sans font-bold text-lg text-[#F5F3EE]">
                No terms saved in your vocabulary list yet
              </h3>
              <p className="text-xs font-sans text-[#AAB4C3]">
                While reading documents or exploring the dictionary, click &ldquo;Save Term&rdquo; to add entries here.
              </p>
              <button
                onClick={() => setSelectedTab('vocabulary')}
                className="btn-primary px-4 py-2 text-xs rounded-xs uppercase tracking-wider"
              >
                Browse Legal Dictionary →
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredSaved.map((record) => {
                const term = legalVocabularyList.find(t => t.id === record.termId);
                if (!term) return null;

                return (
                  <div
                    key={term.id}
                    className="p-5 lexa-card space-y-3 group relative flex flex-col justify-between rounded-xs"
                  >
                    <div>
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="badge-gold text-[10px] font-sans uppercase px-1.5 py-0.2 rounded-xs font-bold">
                              {term.category}
                            </span>
                            <span className="text-[10px] font-sans text-[#7F8A9B] font-medium">
                              Saved: {record.dateSaved}
                            </span>
                          </div>
                          <h3 
                            onClick={() => setActiveLookupTermId(term.id)}
                            className="font-sans font-extrabold text-xl text-[#F5F3EE] group-hover:text-[#E8D9B5] cursor-pointer"
                          >
                            {term.term}
                          </h3>
                        </div>

                        <button
                          onClick={() => removeSavedTerm(term.id)}
                          className="text-[#7F8A9B] hover:text-red-400 p-1 cursor-pointer"
                          title="Remove from saved"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="p-2.5 bg-[#111A2B] border-l-2 border-[#C9A45C] my-2 rounded-xs">
                        <p className="font-sans font-bold text-sm text-[#F5F3EE]">
                          {term.indonesianMeaning}
                        </p>
                        <p className="text-xs text-[#C5CBD5] mt-0.5 line-clamp-2 font-sans">
                          {term.indonesianLegalConcept}
                        </p>
                      </div>

                      {/* Personal Note */}
                      <div className="text-xs font-sans text-[#C5CBD5] bg-[#111A2B] p-2 border border-[#26344A] rounded-xs">
                        <span className="font-sans text-[10px] uppercase text-[#C9A45C] block font-bold">
                          My Note:
                        </span>
                        <p className="italic">
                          {record.personalNote || 'No personal note attached.'}
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#26344A] flex items-center justify-between text-xs font-sans text-[#AAB4C3]">
                      <button
                        onClick={() => setActiveLookupTermId(term.id)}
                        className="font-bold underline hover:no-underline flex items-center gap-1 text-[#F5F3EE] hover:text-[#C9A45C] cursor-pointer"
                      >
                        Inspect Analysis <ArrowRight className="w-3 h-3" />
                      </button>
                      <span className="text-[10px] text-[#7F8A9B] font-medium">
                        {term.civilLawEquivalent || 'KUHPerdata concept'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: FLASHCARD DRILL MODE */}
      {activeTab === 'FLASHCARDS' && (
        <div className="max-w-2xl mx-auto space-y-6">
          {filteredSaved.length === 0 ? (
            <div className="text-center py-16 lexa-card p-8 space-y-3 rounded-xs">
              <RotateCw className="w-8 h-8 mx-auto text-[#7F8A9B] opacity-40" />
              <h3 className="font-sans font-bold text-lg text-[#F5F3EE]">
                No terms saved for flashcard practice
              </h3>
              <p className="text-xs font-sans text-[#AAB4C3]">
                Save at least one term to unlock flashcard memory drills.
              </p>
            </div>
          ) : flashcardTermObj && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-sans text-[#AAB4C3] font-medium">
                <span>Flashcard {flashcardIdx + 1} of {filteredSaved.length}</span>
                <span>Click card to reveal Indonesian analysis</span>
              </div>

              {/* Flashcard Box */}
              <div
                onClick={() => setIsFlipped(prev => !prev)}
                className="min-h-[300px] p-8 sm:p-12 lexa-card border-2 border-[#26344A] hover:border-[#C9A45C]/60 flex flex-col justify-between items-center text-center cursor-pointer shadow-xl transition-all select-none rounded-xs"
              >
                {!isFlipped ? (
                  // FRONT OF CARD: English Term
                  <div className="my-auto space-y-3">
                    <span className="badge-gold text-xs font-sans uppercase px-2 py-0.5 rounded-xs font-bold">
                      {flashcardTermObj.category}
                    </span>
                    <h2 className="text-3xl sm:text-5xl font-sans font-extrabold text-[#F5F3EE] tracking-tight">
                      {flashcardTermObj.term}
                    </h2>
                    {flashcardTermObj.pronunciation && (
                      <p className="text-sm font-sans text-[#AAB4C3] font-medium">
                        {flashcardTermObj.pronunciation}
                      </p>
                    )}
                    <span className="text-xs font-sans text-[#7F8A9B] block pt-4">
                      (Click to flip and inspect Indonesian legal concept)
                    </span>
                  </div>
                ) : (
                  // BACK OF CARD: Indonesian Meaning & Nuance
                  <div className="my-auto space-y-4 animate-in fade-in zoom-in-95 duration-150 text-left w-full">
                    <div className="border-b border-[#26344A] pb-3 text-center">
                      <span className="text-xs font-sans text-[#C9A45C] block font-bold">Makna & Padanan Yuridis:</span>
                      <h3 className="text-2xl font-sans font-bold text-[#F5F3EE]">
                        {flashcardTermObj.indonesianMeaning}
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-[#C5CBD5] font-sans leading-relaxed">
                      {flashcardTermObj.indonesianLegalConcept}
                    </p>

                    <div className="p-3 bg-[#111A2B] border border-[#26344A] text-xs text-[#AAB4C3] rounded-xs font-sans">
                      <strong className="text-[#F5F3EE] font-bold">Legal Function:</strong> {flashcardTermObj.legalFunction}
                    </div>

                    {flashcardTermObj.civilLawEquivalent && (
                      <div className="text-xs font-sans text-[#7F8A9B]">
                        <strong className="text-[#C5CBD5] font-bold">KUHPerdata Equivalent:</strong> {flashcardTermObj.civilLawEquivalent}
                      </div>
                    )}
                  </div>
                )}

                <div className="text-[11px] font-sans text-[#7F8A9B] pt-4 font-medium">
                  Flip status: {isFlipped ? 'Answer Revealed' : 'Question Mode'}
                </div>
              </div>

              {/* Flashcard Nav Controls */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={handlePrevFlashcard}
                  className="btn-secondary px-4 py-2 text-xs rounded-xs"
                >
                  ← Previous Card
                </button>

                <button
                  onClick={() => setIsFlipped(prev => !prev)}
                  className="px-4 py-2 bg-[#111A2B] border border-[#26344A] text-xs font-sans text-[#F5F3EE] hover:bg-[#172235] flex items-center gap-1.5 cursor-pointer rounded-xs font-bold"
                >
                  <RotateCw className="w-3.5 h-3.5 text-[#C9A45C]" />
                  <span>Flip Card</span>
                </button>

                <button
                  onClick={handleNextFlashcard}
                  className="btn-primary px-4 py-2 text-xs rounded-xs uppercase tracking-wider"
                >
                  Next Card →
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: BOOKMARKED CLAUSES */}
      {activeTab === 'BOOKMARKS' && (
        <div className="space-y-4">
          {bookmarkedParagraphs.length === 0 ? (
            <div className="text-center py-16 lexa-card p-8 space-y-3 rounded-xs">
              <Bookmark className="w-8 h-8 mx-auto text-[#7F8A9B] opacity-40" />
              <h3 className="font-sans font-bold text-lg text-[#F5F3EE]">
                No bookmarked contractual paragraphs
              </h3>
              <p className="text-xs font-sans text-[#AAB4C3]">
                When reading contracts, click the bookmark icon beside any paragraph to save it for review.
              </p>
              <button
                onClick={() => setSelectedTab('documents')}
                className="btn-primary px-4 py-2 text-xs rounded-xs uppercase tracking-wider"
              >
                Open Document Library →
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {bookmarkedParagraphs.map((bm, idx) => {
                const doc = sampleLegalDocuments.find(d => d.id === bm.docId);
                return (
                  <div
                    key={idx}
                    className="p-5 lexa-card space-y-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2 text-xs font-sans text-[#AAB4C3] mb-1 font-medium">
                        <span className="font-bold text-[#F5F3EE]">
                          {doc?.title || bm.docId}
                        </span>
                        <span>•</span>
                        <span className="text-[#C9A45C]">Paragraph {bm.paragraphId}</span>
                        <span>•</span>
                        <span className="text-[#7F8A9B]">Bookmarked on {bm.timestamp}</span>
                      </div>
                      <p className="text-xs font-sans text-[#AAB4C3]">
                        Document Type: {doc?.documentType || 'Legal Document'}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setActiveDocId(bm.docId);
                        setSelectedTab('documents');
                      }}
                      className="btn-primary px-4 py-2 text-xs rounded-xs uppercase tracking-wider whitespace-nowrap flex items-center gap-1.5"
                    >
                      <span>Jump to Paragraph</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: PERSONAL STUDY NOTES */}
      {activeTab === 'NOTES' && (
        <div className="space-y-4">
          {Object.keys(personalNotes).length === 0 ? (
            <div className="text-center py-16 lexa-card p-8 space-y-3 rounded-xs">
              <MessageSquare className="w-8 h-8 mx-auto text-[#7F8A9B] opacity-40" />
              <h3 className="font-sans font-bold text-lg text-[#F5F3EE]">
                No study notes recorded yet
              </h3>
              <p className="text-xs font-sans text-[#AAB4C3]">
                Add annotations directly onto clauses in the Document Reader or onto vocabulary terms.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(personalNotes).map(([key, note]) => (
                <div key={key} className="p-5 lexa-card space-y-2 rounded-xs">
                  <div className="flex items-center justify-between text-xs font-sans text-[#AAB4C3] font-medium">
                    <span className="font-bold text-[#C9A45C]">Reference: {key}</span>
                  </div>
                  <p className="text-xs sm:text-sm font-sans text-[#C5CBD5] bg-[#111A2B] p-3 border border-[#26344A] leading-relaxed rounded-xs">
                    {note}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
};
