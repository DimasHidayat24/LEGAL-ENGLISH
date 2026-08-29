import React, { useState } from 'react';
import { useStudy } from '../context/StudyContext';
import { curriculumLessons } from '../data/curriculumData';
import { legalVocabularyList } from '../data/vocabularyData';
import { 
  CheckCircle2, 
  Clock, 
  Scale, 
  FileText, 
  Check, 
  HelpCircle
} from 'lucide-react';

export const CurriculumView: React.FC = () => {
  const { 
    activeLessonId, 
    setActiveLessonId, 
    completedLessons, 
    markLessonComplete, 
    languageMode, 
    setActiveLookupTermId
  } = useStudy();

  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);
  const [showQuizExplanation, setShowQuizExplanation] = useState<boolean>(false);

  const categories = [
    { id: 'ALL', label: 'All Modules' },
    { id: 'foundation', label: '1. Foundations & Grammar' },
    { id: 'documents', label: '2. Commercial Contracts' },
    { id: 'practical', label: '3. Legal Writing & IRAC' },
    { id: 'advanced', label: '4. Transnational & Arbitration' }
  ];

  const filteredLessons = curriculumLessons.filter(l => 
    selectedCategory === 'ALL' || l.categoryId === selectedCategory
  );

  const activeLesson = curriculumLessons.find(l => l.id === activeLessonId) || filteredLessons[0];
  const isLessonCompleted = completedLessons.includes(activeLesson.id);

  const handleSelectQuiz = (optIdx: number) => {
    setSelectedQuizAnswer(optIdx);
    setShowQuizExplanation(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="border-b border-[#26344A] pb-6">
        <div className="flex items-center gap-2 mb-1">
          <Scale className="w-4 h-4 text-[#C9A45C]" />
          <span className="text-[11px] font-sans tracking-widest uppercase text-[#C9A45C] font-bold">
            ACADEMIC CURRICULUM & MODULES
          </span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-sans font-extrabold text-[#F5F3EE] tracking-tight">
          Structured Legal English Mastery
        </h1>
        <p className="text-sm sm:text-base text-[#AAB4C3] font-sans mt-2 max-w-3xl leading-relaxed">
          Progress from foundational pronominal connectors and modal verbs to drafting complex commercial covenants and international SIAC arbitration awards.
        </p>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-6 text-xs font-sans no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 whitespace-nowrap transition-colors border cursor-pointer rounded-xs text-xs font-semibold ${
                selectedCategory === cat.id
                  ? 'bg-[#C9A45C] text-[#0B1220] border-[#C9A45C] font-bold shadow-xs'
                  : 'bg-[#111A2B] text-[#AAB4C3] border-[#26344A] hover:bg-[#172235] hover:text-[#F5F3EE]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Layout: Lesson List (4 cols) + Active Lesson Reader (8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Sidebar: Lesson Navigation List */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-sans uppercase tracking-wider text-[#AAB4C3] mb-2 px-1 flex items-center justify-between font-bold">
            <span>Lessons ({filteredLessons.length})</span>
            <span className="text-[#F5F3EE] font-bold">
              {completedLessons.length} of {curriculumLessons.length} Completed
            </span>
          </div>

          <div className="space-y-2 max-h-[80vh] overflow-y-auto pr-1">
            {filteredLessons.map((lesson) => {
              const isSelected = activeLesson.id === lesson.id;
              const isCompleted = completedLessons.includes(lesson.id);

              return (
                <div
                  key={lesson.id}
                  onClick={() => {
                    setActiveLessonId(lesson.id);
                    setSelectedQuizAnswer(null);
                    setShowQuizExplanation(false);
                  }}
                  className={`p-4 border transition-all cursor-pointer rounded-xs ${
                    isSelected
                      ? 'bg-[#172235] border-2 border-[#C9A45C] shadow-xs'
                      : 'bg-[#111A2B] border-[#26344A] hover:border-[#C9A45C]/40 hover:bg-[#172235]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="badge-navy text-[10px] font-sans uppercase px-1.5 py-0.5 rounded-xs font-semibold">
                      {lesson.categoryId}
                    </span>
                    <div className="flex items-center gap-2 text-[10px] font-sans text-[#AAB4C3] font-medium">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {lesson.durationMinutes}m
                      </span>
                      {isCompleted && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#8FAF9B]" />
                      )}
                    </div>
                  </div>

                  <h3 className="font-sans font-bold text-sm text-[#F5F3EE] leading-snug">
                    {lesson.title}
                  </h3>
                  <p className="text-xs text-[#AAB4C3] font-sans italic mt-0.5">
                    {lesson.titleId}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Pane: Comprehensive Interactive Lesson Content */}
        <div className="lg:col-span-8 lexa-card p-6 sm:p-10 space-y-8 shadow-xl rounded-xs">
          
          {/* Lesson Header */}
          <div className="border-b border-[#26344A] pb-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-sans uppercase tracking-wider text-[#C9A45C] font-bold">
                TRACK: {activeLesson.categoryId.toUpperCase()} • {activeLesson.difficulty.toUpperCase()}
              </span>
              <button
                onClick={() => markLessonComplete(activeLesson.id)}
                className={`px-3 py-1.5 text-xs font-sans border flex items-center gap-1.5 transition-colors cursor-pointer rounded-xs ${
                  isLessonCompleted
                    ? 'bg-[#8FAF9B] text-[#0B1220] border-[#8FAF9B] font-bold uppercase tracking-wider'
                    : 'btn-secondary'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{isLessonCompleted ? 'Module Completed' : 'Mark as Complete'}</span>
              </button>
            </div>

            <h2 className="text-2xl sm:text-3xl font-sans font-extrabold text-[#F5F3EE] tracking-tight">
              {activeLesson.title}
            </h2>
            <p className="text-sm font-sans italic text-[#AAB4C3] font-normal">
              {activeLesson.titleId}
            </p>

            <div className="p-4 bg-[#111A2B] border-l-3 border-[#C9A45C] space-y-1 rounded-xs">
              <span className="text-[10px] font-sans uppercase tracking-wider text-[#C9A45C] block font-bold">
                Overview & Pedagogical Goal
              </span>
              <p className="text-sm font-sans text-[#C5CBD5] leading-relaxed">
                {languageMode === 'ID' ? activeLesson.overviewId : activeLesson.overviewEn}
              </p>
            </div>
          </div>

          {/* Core Concepts Breakdown */}
          <div className="space-y-6">
            <h3 className="text-xs font-sans tracking-wider uppercase text-[#C9A45C] font-bold border-b border-[#26344A] pb-2">
              Core Legal Concepts & Terminology ({activeLesson.coreConcepts.length})
            </h3>

            <div className="space-y-4">
              {activeLesson.coreConcepts.map((concept, cIdx) => {
                const termInDict = legalVocabularyList.find(t => t.term.toLowerCase() === concept.term.toLowerCase());

                return (
                  <div key={cIdx} className="p-5 bg-[#111A2B] border border-[#26344A] space-y-3 rounded-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 bg-[#172235] text-[#F5F3EE] border border-[#26344A] text-xs font-sans font-bold flex items-center justify-center rounded-xs">
                          {cIdx + 1}
                        </span>
                        <h4 className="font-sans font-extrabold text-lg text-[#F5F3EE]">
                          {concept.term}
                        </h4>
                      </div>

                      {termInDict && (
                        <button
                          onClick={() => setActiveLookupTermId(termInDict.id)}
                          className="text-xs font-sans font-semibold text-[#C9A45C] underline hover:text-[#E8D9B5] flex items-center gap-1 cursor-pointer"
                        >
                          View in Dictionary →
                        </button>
                      )}
                    </div>

                    <div className="p-3 bg-[#172235] border-l-2 border-[#C9A45C] rounded-xs">
                      <span className="text-[10px] font-sans uppercase text-[#C9A45C] block font-bold">
                        Makna Bahasa Indonesia:
                      </span>
                      <p className="font-sans font-bold text-sm text-[#F5F3EE]">
                        {concept.meaningId}
                      </p>
                      <p className="text-xs text-[#C5CBD5] mt-1 font-sans font-normal">
                        {concept.explanationId}
                      </p>
                    </div>

                    <div className="text-xs text-[#AAB4C3] space-y-1 font-sans">
                      <strong className="text-[#F5F3EE] font-semibold">Legal Function:</strong> {concept.legalFunction}
                    </div>

                    {/* Authentic Example Box (Source Serif 4 for quoted legal clause) */}
                    <div className="p-3 bg-[#172235] border border-[#26344A] space-y-1 rounded-xs">
                      <span className="text-[10px] font-sans uppercase text-[#C9A45C] block font-bold">
                        Authentic Example Clause:
                      </span>
                      <blockquote className="text-xs sm:text-[13px] font-serif italic text-[#F5F3EE] leading-[1.7]">
                        &ldquo;{concept.authenticExample}&rdquo;
                      </blockquote>
                      <p className="text-xs font-sans text-[#AAB4C3] pt-1 border-t border-[#26344A]">
                        <strong className="text-[#F5F3EE] font-semibold">Terjemahan:</strong> {concept.indonesianTranslation}
                      </p>
                    </div>

                    {/* Drafting Tip */}
                    <div className="p-2.5 badge-sage text-xs font-sans rounded-xs">
                      <strong className="font-bold">Drafting Nuance:</strong> {concept.draftingTip}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Comparative Law Note (If available) */}
          {activeLesson.comparativeLawNote && (
            <div className="p-5 bg-[#111A2B] border border-[#26344A] space-y-3 rounded-xs">
              <span className="text-xs font-sans uppercase tracking-wider text-[#C9A45C] font-bold flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-[#C9A45C]" />
                Comparative Law Nuance (KUHPerdata vs Common Law)
              </span>
              <div className="flex items-center gap-2 text-xs font-sans font-bold text-[#F5F3EE]">
                <span>{activeLesson.comparativeLawNote.indonesianTerm}</span>
                <span className="text-[#C9A45C]">⟷</span>
                <span>{activeLesson.comparativeLawNote.englishTerm}</span>
              </div>
              <p className="text-xs sm:text-sm font-sans text-[#C5CBD5] leading-relaxed">
                {activeLesson.comparativeLawNote.distinction}
              </p>
            </div>
          )}

          {/* Sample Excerpt Deconstruction (Source Serif 4 for authentic excerpt) */}
          {activeLesson.sampleExcerpt && (
            <div className="p-5 bg-[#111A2B] border border-[#26344A] space-y-3 rounded-xs">
              <span className="text-xs font-sans uppercase tracking-wider text-[#C9A45C] font-bold flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-[#C9A45C]" />
                Contract Excerpt Deconstruction: {activeLesson.sampleExcerpt.title}
              </span>
              <blockquote className="font-serif italic text-sm text-[#F5F3EE] p-4 bg-[#172235] border-l-4 border-[#C9A45C] leading-[1.7] rounded-xs">
                &ldquo;{activeLesson.sampleExcerpt.text}&rdquo;
              </blockquote>
              <p className="text-xs font-sans text-[#C5CBD5] leading-relaxed">
                <strong className="text-[#F5F3EE] font-semibold">Terjemahan Resmi:</strong> {activeLesson.sampleExcerpt.translationId}
              </p>
            </div>
          )}

          {/* Quick Understanding Check Quiz */}
          {activeLesson.checkExercise && (
            <div className="p-6 border border-[#26344A] bg-[#111A2B] space-y-4 rounded-xs">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#C9A45C]" />
                <h3 className="text-xs font-sans uppercase tracking-wider text-[#C9A45C] font-bold">
                  Module Understanding Check
                </h3>
              </div>

              <div className="space-y-3 p-4 bg-[#172235] border border-[#26344A] rounded-xs">
                <p className="font-sans font-bold text-sm text-[#F5F3EE]">
                  {activeLesson.checkExercise.questionEn}
                </p>
                <p className="text-xs font-sans italic text-[#AAB4C3]">
                  {activeLesson.checkExercise.questionId}
                </p>

                {/* Options */}
                <div className="space-y-2 pt-2">
                  {activeLesson.checkExercise.options.map((opt, optIdx) => {
                    let optStyle = 'bg-[#111A2B] border-[#26344A] text-[#F5F3EE] hover:border-[#C9A45C]/50';
                    if (selectedQuizAnswer !== null) {
                      if (optIdx === activeLesson.checkExercise.correctIndex) {
                        optStyle = 'bg-[#8FAF9B] text-[#0B1220] border-[#8FAF9B] font-bold';
                      } else if (optIdx === selectedQuizAnswer) {
                        optStyle = 'bg-red-950/80 text-red-200 border-red-800 font-semibold';
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectQuiz(optIdx)}
                        className={`w-full text-left p-3 text-xs font-sans border transition-all flex items-center justify-between cursor-pointer rounded-xs font-medium ${optStyle}`}
                      >
                        <span>{opt}</span>
                        {selectedQuizAnswer !== null && optIdx === activeLesson.checkExercise.correctIndex && (
                          <Check className="w-4 h-4 text-[#0B1220] shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation */}
                {showQuizExplanation && (
                  <div className="p-3 text-xs font-sans mt-3 border badge-sage rounded-xs leading-relaxed">
                    <strong className="font-bold">Penjelasan Kunci:</strong> {activeLesson.checkExercise.explanationId}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Module Completion CTA */}
          <div className="pt-6 border-t border-[#26344A] flex items-center justify-between">
            <span className="text-xs font-sans text-[#AAB4C3] font-medium">
              Lesson: {activeLesson.title}
            </span>
            <button
              onClick={() => markLessonComplete(activeLesson.id)}
              className="btn-primary px-5 py-2.5 text-xs rounded-xs uppercase tracking-wider"
            >
              <Check className="w-4 h-4" />
              <span>{isLessonCompleted ? 'Completed ✓' : 'Complete Lesson'}</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
