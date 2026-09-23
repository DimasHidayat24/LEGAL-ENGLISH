import React, { useState } from 'react';
import { useStudy } from '../context/StudyContext';
import { legalVocabularyList } from '../data/vocabularyData';
import { sampleLegalDocuments } from '../data/documentsData';
import { curriculumLessons } from '../data/curriculumData';
import { allPracticeExercises } from '../data/practice';
import { AudioPronounceButton } from './AudioPronounceButton';
import { ExamCategoryScore } from '../types';
import { 
  Bookmark, 
  Trash2, 
  RotateCw, 
  Search, 
  Award, 
  MessageSquare,
  ArrowRight,
  Copy,
  Check,
  Volume2,
  Clock,
  Zap,
  ShieldCheck,
  Sparkles
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
    examHistory,
    setActiveLookupTermId, 
    setActiveDocId, 
    setSelectedTab 
  } = useStudy();

  const [activeTab, setActiveTab] = useState<'VOCAB' | 'FLASHCARDS' | 'BOOKMARKS' | 'NOTES' | 'DIAGNOSTICS'>('VOCAB');
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-8">
      
      {/* Header */}
      <div className="border-b border-white/[0.08] pb-6">
        <div className="flex items-center gap-2 mb-1.5">
          <Award className="w-4 h-4 text-[#DCDCDC]" />
          <span className="text-[11px] font-sans tracking-widest uppercase text-[#A8A8A8] font-semibold">
            INDIVIDUAL STUDY RECORD
          </span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-sans font-extrabold text-white tracking-tight">
          My Legal English Study Hub
        </h1>
        <p className="text-sm sm:text-base text-[#A8A8A8] font-sans mt-2 max-w-3xl leading-relaxed">
          Review saved legal terminology, flashcards, annotated document clauses, and monitor your academic progress.
        </p>

        {/* Top Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
          <div className="p-5 rounded-3xl lexa-card space-y-1">
            <span className="text-[10px] font-sans uppercase text-[#707070] block font-semibold tracking-wider">Saved Terms</span>
            <div className="text-2xl sm:text-3xl font-sans font-extrabold text-white tracking-tight">
              {savedTerms.length}
            </div>
            <span className="text-[11px] font-sans text-[#A8A8A8] font-medium">In My Vocabulary</span>
          </div>

          <div className="p-5 rounded-3xl lexa-card space-y-1">
            <span className="text-[10px] font-sans uppercase text-[#707070] block font-semibold tracking-wider">Lessons Mastered</span>
            <div className="text-2xl sm:text-3xl font-sans font-extrabold text-white tracking-tight">
              {completedLessons.length} / {curriculumLessons.length}
            </div>
            <span className="text-[11px] font-sans text-[#A8A8A8] font-medium">Curriculum Modules</span>
          </div>

          <div className="p-5 rounded-3xl lexa-card space-y-1">
            <span className="text-[10px] font-sans uppercase text-[#707070] block font-semibold tracking-wider">Documents Read</span>
            <div className="text-2xl sm:text-3xl font-sans font-extrabold text-white tracking-tight">
              {completedDocuments.length} / {sampleLegalDocuments.length}
            </div>
            <span className="text-[11px] font-sans text-[#A8A8A8] font-medium">Authentic Instruments</span>
          </div>

          <div className="p-5 rounded-3xl lexa-card space-y-1">
            <span className="text-[10px] font-sans uppercase text-[#707070] block font-semibold tracking-wider">Exercises Solved</span>
            <div className="text-2xl sm:text-3xl font-sans font-extrabold text-white tracking-tight">
              {Object.keys(exerciseScores).length} / {allPracticeExercises.length}
            </div>
            <span className="text-[11px] font-sans text-[#A8A8A8] font-medium">Practice Benchmark</span>
          </div>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
        <div className="flex items-center gap-2 overflow-x-auto text-xs font-sans no-scrollbar">
          <button
            onClick={() => setActiveTab('VOCAB')}
            className={`px-4 py-2 whitespace-nowrap border transition-all cursor-pointer rounded-full text-xs font-medium ${
              activeTab === 'VOCAB'
                ? 'bg-[#242424] text-white border-white/20 font-semibold shadow-xs'
                : 'bg-[#151515] text-[#A8A8A8] border-white/[0.08] hover:bg-[#1C1C1C] hover:text-white'
            }`}
          >
            Saved Vocabulary ({savedTerms.length})
          </button>

          <button
            onClick={() => setActiveTab('FLASHCARDS')}
            className={`px-4 py-2 whitespace-nowrap border transition-all cursor-pointer rounded-full text-xs font-medium ${
              activeTab === 'FLASHCARDS'
                ? 'bg-[#242424] text-white border-white/20 font-semibold shadow-xs'
                : 'bg-[#151515] text-[#A8A8A8] border-white/[0.08] hover:bg-[#1C1C1C] hover:text-white'
            }`}
          >
            Flashcard Drill Mode
          </button>

          <button
            onClick={() => setActiveTab('BOOKMARKS')}
            className={`px-4 py-2 whitespace-nowrap border transition-all cursor-pointer rounded-full text-xs font-medium ${
              activeTab === 'BOOKMARKS'
                ? 'bg-[#242424] text-white border-white/20 font-semibold shadow-xs'
                : 'bg-[#151515] text-[#A8A8A8] border-white/[0.08] hover:bg-[#1C1C1C] hover:text-white'
            }`}
          >
            Bookmarked Clauses ({bookmarkedParagraphs.length})
          </button>

          <button
            onClick={() => setActiveTab('NOTES')}
            className={`px-4 py-2 whitespace-nowrap border transition-all cursor-pointer rounded-full text-xs font-medium ${
              activeTab === 'NOTES'
                ? 'bg-[#242424] text-white border-white/20 font-semibold shadow-xs'
                : 'bg-[#151515] text-[#A8A8A8] border-white/[0.08] hover:bg-[#1C1C1C] hover:text-white'
            }`}
          >
            Study Notes ({Object.keys(personalNotes).length})
          </button>

          <button
            onClick={() => setActiveTab('DIAGNOSTICS')}
            className={`px-4 py-2 whitespace-nowrap border transition-all cursor-pointer rounded-full text-xs font-medium flex items-center gap-1.5 ${
              activeTab === 'DIAGNOSTICS'
                ? 'bg-[#242424] text-white border-white/20 font-semibold shadow-xs'
                : 'bg-[#151515] text-[#A8A8A8] border-white/[0.08] hover:bg-[#1C1C1C] hover:text-white'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-[#DCDCDC]" />
            <span>Exam Diagnostics</span>
            {examHistory && examHistory.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[9px] bg-white text-black font-bold">
                {examHistory.length}
              </span>
            )}
          </button>
        </div>

        {activeTab === 'VOCAB' && savedTerms.length > 0 && (
          <button
            onClick={handleCopyVocabList}
            className="hidden sm:flex items-center gap-1.5 px-4 py-2 btn-secondary text-xs rounded-full uppercase tracking-wider font-semibold"
          >
            {copiedVocab ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5 text-[#DCDCDC]" />}
            <span>{copiedVocab ? 'Copied' : 'Export Vocabulary'}</span>
          </button>
        )}
      </div>

      {/* TAB 1: SAVED VOCABULARY LIST */}
      {activeTab === 'VOCAB' && (
        <div className="space-y-6">
          {savedTerms.length > 0 && (
            <div className="relative">
              <Search className="w-4 h-4 text-[#A8A8A8] absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={vocabSearch}
                onChange={(e) => setVocabSearch(e.target.value)}
                placeholder="Filter saved terms or your personal notes..."
                className="w-full pl-11 pr-4 py-3 rounded-full bg-[#101010] border border-white/[0.08] text-xs font-sans text-[#F2F2F2] placeholder:text-[#707070] focus:outline-none focus:border-white/30"
              />
            </div>
          )}

          {filteredSaved.length === 0 ? (
            <div className="text-center py-16 rounded-3xl lexa-card p-8 space-y-3">
              <Bookmark className="w-8 h-8 mx-auto text-[#707070] opacity-40" />
              <h3 className="font-sans font-bold text-lg text-white">
                No terms saved in your vocabulary list yet
              </h3>
              <p className="text-xs font-sans text-[#A8A8A8]">
                While reading documents or exploring the dictionary, click &ldquo;Save Term&rdquo; to add entries here.
              </p>
              <button
                onClick={() => setSelectedTab('vocabulary')}
                className="btn-primary px-5 py-2.5 text-xs rounded-full uppercase tracking-wider font-semibold"
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
                    className="p-6 rounded-3xl lexa-card space-y-3 group relative flex flex-col justify-between hover:border-white/20 transition-all"
                  >
                    <div>
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="badge-accent text-[10px] font-sans uppercase px-2.5 py-0.5 rounded-full font-medium">
                              {term.category}
                            </span>
                            <span className="text-[10px] font-sans text-[#707070] font-normal">
                              Saved: {record.dateSaved}
                            </span>
                          </div>
                          <h3 
                            onClick={() => setActiveLookupTermId(term.id)}
                            className="font-sans font-extrabold text-xl text-white group-hover:text-[#DCDCDC] cursor-pointer transition-colors"
                          >
                            {term.term}
                          </h3>
                          {term.pronunciation && (
                            <div className="text-xs font-mono font-medium text-[#A8A8A8] mt-0.5">
                              {term.pronunciation}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-1.5">
                          <AudioPronounceButton
                            term={term.term}
                            size="sm"
                            tooltipText={`Pronounce ${term.term}`}
                          />
                          <button
                            onClick={() => removeSavedTerm(term.id)}
                            className="text-[#A8A8A8] hover:text-white p-1.5 transition-colors cursor-pointer rounded-full min-w-[36px] min-h-[36px] flex items-center justify-center hover:bg-[#1C1C1C]"
                            title="Remove from saved"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-[#0C0C0C] border border-white/[0.08] my-2.5 space-y-1">
                        <p className="font-sans font-bold text-sm text-[#F2F2F2]">
                          {term.indonesianMeaning}
                        </p>
                        <p className="text-xs text-[#A8A8A8] mt-0.5 leading-relaxed font-sans">
                          {term.indonesianLegalConcept}
                        </p>
                      </div>

                      {/* Personal Note */}
                      <div className="text-xs font-sans text-[#A8A8A8] bg-[#0C0C0C] p-3 border border-white/[0.08] rounded-2xl">
                        <span className="font-sans text-[10px] uppercase text-[#707070] block font-semibold">
                          My Note:
                        </span>
                        <p className="italic text-[#F2F2F2]">
                          {record.personalNote || 'No personal note attached.'}
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs font-sans text-[#A8A8A8]">
                      <button
                        onClick={() => setActiveLookupTermId(term.id)}
                        className="font-semibold flex items-center gap-1 text-[#F2F2F2] hover:text-white cursor-pointer"
                      >
                        Inspect Analysis <ArrowRight className="w-3 h-3" />
                      </button>
                      <span className="text-[10px] text-[#707070] font-medium">
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
            <div className="text-center py-16 rounded-3xl lexa-card p-8 space-y-3">
              <RotateCw className="w-8 h-8 mx-auto text-[#707070] opacity-40" />
              <h3 className="font-sans font-bold text-lg text-white">
                No terms saved for flashcard practice
              </h3>
              <p className="text-xs font-sans text-[#A8A8A8]">
                Save at least one term to unlock flashcard memory drills.
              </p>
            </div>
          ) : flashcardTermObj && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-sans text-[#A8A8A8] font-medium">
                <span>Flashcard {flashcardIdx + 1} of {filteredSaved.length}</span>
                <span>Click card to reveal Indonesian analysis</span>
              </div>

              {/* Flashcard Box */}
              <div
                onClick={() => setIsFlipped(prev => !prev)}
                className="min-h-[320px] p-8 sm:p-12 rounded-3xl bg-[#101010] border border-white/[0.08] flex flex-col justify-between items-center text-center cursor-pointer transition-all select-none hover:border-white/20"
              >
                {!isFlipped ? (
                  // FRONT OF CARD: English Term
                  <div className="my-auto space-y-3 flex flex-col items-center">
                    <span className="badge-accent text-xs font-sans uppercase px-3 py-0.5 rounded-full font-medium">
                      {flashcardTermObj.category}
                    </span>
                    <div className="flex flex-col items-center gap-2">
                      <h2 className="text-3xl sm:text-5xl font-sans font-extrabold text-white tracking-tight">
                        {flashcardTermObj.term}
                      </h2>
                      {flashcardTermObj.pronunciation && (
                        <p className="text-sm font-mono font-medium text-[#A8A8A8]">
                          {flashcardTermObj.pronunciation}
                        </p>
                      )}
                      <div 
                        onClick={(e) => e.stopPropagation()} 
                        className="pt-2"
                      >
                        <AudioPronounceButton 
                          term={flashcardTermObj.term}
                          size="lg"
                          showLabel={true}
                          tooltipText={`Pronounce ${flashcardTermObj.term}`}
                        />
                      </div>
                    </div>
                    <span className="text-xs font-sans text-[#707070] block pt-4">
                      (Click card to flip and inspect Indonesian legal concept)
                    </span>
                  </div>
                ) : (
                  // BACK OF CARD: Indonesian Meaning & Nuance
                  <div className="my-auto space-y-4 text-left w-full">
                    <div className="border-b border-white/[0.08] pb-3 flex items-center justify-between">
                      <div>
                        <span className="text-xs font-sans text-[#A8A8A8] block font-semibold">Makna & Padanan Yuridis:</span>
                        <h3 className="text-2xl font-sans font-bold text-white">
                          {flashcardTermObj.indonesianMeaning}
                        </h3>
                      </div>
                      <div onClick={(e) => e.stopPropagation()}>
                        <AudioPronounceButton 
                          term={flashcardTermObj.term}
                          size="sm"
                          tooltipText={`Pronounce ${flashcardTermObj.term}`}
                        />
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-[#A8A8A8] font-sans leading-relaxed">
                      {flashcardTermObj.indonesianLegalConcept}
                    </p>

                    <div className="p-3.5 rounded-2xl bg-[#0C0C0C] border border-white/[0.08] text-xs text-[#A8A8A8] font-sans">
                      <strong className="text-white font-semibold">Legal Function:</strong> {flashcardTermObj.legalFunction}
                    </div>

                    {flashcardTermObj.civilLawEquivalent && (
                      <div className="text-xs font-sans text-[#A8A8A8]">
                        <strong className="text-white font-semibold">KUHPerdata Equivalent:</strong> {flashcardTermObj.civilLawEquivalent}
                      </div>
                    )}
                  </div>
                )}

                <div className="text-[11px] font-sans text-[#707070] pt-4 font-medium">
                  Flip status: {isFlipped ? 'Answer Revealed' : 'Question Mode'}
                </div>
              </div>

              {/* Flashcard Nav Controls */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={handlePrevFlashcard}
                  className="btn-secondary px-4 py-2 text-xs rounded-full font-medium"
                >
                  ← Previous Card
                </button>

                <button
                  onClick={() => setIsFlipped(prev => !prev)}
                  className="px-4 py-2 bg-[#151515] border border-white/[0.08] text-xs font-sans text-[#F2F2F2] hover:bg-[#1C1C1C] hover:border-white/20 flex items-center gap-1.5 cursor-pointer rounded-full font-semibold transition-colors"
                >
                  <RotateCw className="w-3.5 h-3.5 text-[#DCDCDC]" />
                  <span>Flip Card</span>
                </button>

                <button
                  onClick={handleNextFlashcard}
                  className="btn-primary px-5 py-2 text-xs rounded-full uppercase tracking-wider font-semibold"
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
            <div className="text-center py-16 rounded-3xl lexa-card p-8 space-y-3">
              <Bookmark className="w-8 h-8 mx-auto text-[#707070] opacity-40" />
              <h3 className="font-sans font-bold text-lg text-white">
                No bookmarked contractual paragraphs
              </h3>
              <p className="text-xs font-sans text-[#A8A8A8]">
                When reading contracts, click the bookmark icon beside any paragraph to save it for review.
              </p>
              <button
                onClick={() => setSelectedTab('documents')}
                className="btn-primary px-5 py-2.5 text-xs rounded-full uppercase tracking-wider font-semibold"
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
                    className="p-5 rounded-3xl lexa-card space-y-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2 text-xs font-sans text-[#A8A8A8] mb-1 font-medium">
                        <span className="font-bold text-white">
                          {doc?.title || bm.docId}
                        </span>
                        <span>•</span>
                        <span className="text-[#DCDCDC]">Paragraph {bm.paragraphId}</span>
                        <span>•</span>
                        <span className="text-[#707070]">Bookmarked on {bm.timestamp}</span>
                      </div>
                      <p className="text-xs font-sans text-[#A8A8A8]">
                        Document Type: {doc?.documentType || 'Legal Document'}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setActiveDocId(bm.docId);
                        setSelectedTab('documents');
                      }}
                      className="btn-primary px-4 py-2 text-xs rounded-full uppercase tracking-wider whitespace-nowrap flex items-center gap-1.5 font-semibold"
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
            <div className="text-center py-16 rounded-3xl lexa-card p-8 space-y-3">
              <MessageSquare className="w-8 h-8 mx-auto text-[#707070] opacity-40" />
              <h3 className="font-sans font-bold text-lg text-white">
                No study notes recorded yet
              </h3>
              <p className="text-xs font-sans text-[#A8A8A8]">
                Add annotations directly onto clauses in the Document Reader or onto vocabulary terms.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(personalNotes).map(([key, note]) => (
                <div key={key} className="p-5 rounded-3xl lexa-card space-y-2">
                  <div className="flex items-center justify-between text-xs font-sans text-[#A8A8A8] font-medium">
                    <span className="font-semibold text-[#DCDCDC]">Reference: {key}</span>
                  </div>
                  <p className="text-xs sm:text-sm font-sans text-[#F2F2F2] bg-[#0C0C0C] p-3.5 border border-white/[0.08] leading-relaxed rounded-2xl">
                    {note}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 5: EXAM DIAGNOSTICS */}
      {activeTab === 'DIAGNOSTICS' && (
        <div className="space-y-6">
          {(!examHistory || examHistory.length === 0) ? (
            <div className="text-center py-16 rounded-3xl lexa-card p-8 space-y-4 max-w-xl mx-auto">
              <Clock className="w-12 h-12 mx-auto text-[#DCDCDC] opacity-70" />
              <h3 className="font-sans font-extrabold text-xl text-white">
                No Timed Diagnostic Exams Taken Yet
              </h3>
              <p className="text-xs sm:text-sm font-sans text-[#A8A8A8] leading-relaxed">
                Take a 12-minute sprint or 25-minute comprehensive diagnostic exam to evaluate your contract drafting, bilingual translation, and commercial legal English proficiency under authentic exam pressure.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setSelectedTab('practice')}
                  className="btn-primary px-6 py-2.5 text-xs font-bold uppercase tracking-wider rounded-full shadow-md inline-flex items-center gap-2 cursor-pointer"
                >
                  <Zap className="w-4 h-4" /> Start Diagnostic Assessment
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              
              {/* Summary Stats Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-3xl lexa-card space-y-1">
                  <span className="text-[10px] font-sans uppercase text-[#707070] block font-semibold tracking-wider">
                    Total Exams Taken
                  </span>
                  <div className="text-2xl sm:text-3xl font-sans font-extrabold text-white">
                    {examHistory.length}
                  </div>
                  <span className="text-[11px] font-sans text-[#A8A8A8]">Diagnostic Sessions</span>
                </div>

                <div className="p-5 rounded-3xl lexa-card space-y-1">
                  <span className="text-[10px] font-sans uppercase text-[#707070] block font-semibold tracking-wider">
                    Average Score
                  </span>
                  <div className="text-2xl sm:text-3xl font-sans font-extrabold text-[#DCDCDC]">
                    {Math.round(examHistory.reduce((acc, h) => acc + h.scorePercentage, 0) / examHistory.length)}%
                  </div>
                  <span className="text-[11px] font-sans text-[#A8A8A8]">Cumulative Benchmark</span>
                </div>

                <div className="p-5 rounded-3xl lexa-card space-y-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-sans uppercase text-[#707070] block font-semibold tracking-wider">
                      Latest Proficiency Tier
                    </span>
                    <div className="text-sm font-sans font-bold text-white mt-1 truncate">
                      {examHistory[0]?.proficiencyTier || 'Foundational'}
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedTab('practice')}
                    className="text-xs font-sans text-[#DCDCDC] hover:text-white font-semibold flex items-center gap-1 cursor-pointer pt-2"
                  >
                    Take New Exam <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* History List */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-sans font-bold text-white flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#DCDCDC]" /> Historical Diagnostic Records
                  </h3>
                  <button
                    onClick={() => setSelectedTab('practice')}
                    className="btn-primary px-4 py-1.5 text-xs rounded-full font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <Zap className="w-3.5 h-3.5" /> Launch New Exam
                  </button>
                </div>

                <div className="space-y-3">
                  {examHistory.map((item) => (
                    <div
                      key={item.id}
                      className="p-5 rounded-3xl lexa-card space-y-4"
                    >
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div>
                          <div className="text-base font-sans font-bold text-white">{item.title}</div>
                          <div className="text-xs font-sans text-[#A8A8A8]">
                            Completed on {item.date} • {item.totalQuestions} Questions • {Math.round(item.timeSpentSeconds / 60)}m {item.timeSpentSeconds % 60}s duration
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-xs font-semibold text-[#DCDCDC]">
                            {item.proficiencyTier}
                          </span>
                          <div className="px-3.5 py-1 rounded-full font-bold text-sm bg-[#1C1C1C] text-white border border-white/20">
                            {item.scorePercentage}% ({item.correctAnswers}/{item.totalQuestions})
                          </div>
                        </div>
                      </div>

                      {/* Category Breakdown Mini Bars */}
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2 border-t border-white/[0.08]">
                        {Object.entries(item.categoryBreakdown).map(([cat, scoreVal]) => {
                          const score = scoreVal as ExamCategoryScore;
                          return (
                            <div key={cat} className="p-2 rounded-xl bg-[#0C0C0C] border border-white/[0.08] text-[11px] font-sans space-y-1">
                              <div className="text-[#A8A8A8] uppercase font-bold text-[9.5px] truncate">{cat}</div>
                              <div className="flex justify-between font-semibold">
                                <span className="text-[#F2F2F2]">{score.correct}/{score.total}</span>
                                <span className={score.percentage >= 70 ? 'text-white' : 'text-[#A8A8A8]'}>
                                  {score.percentage}%
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}
        </div>
      )}

    </div>
  );
};
