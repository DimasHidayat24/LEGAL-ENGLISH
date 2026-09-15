import React, { useState } from 'react';
import { useStudy } from '../context/StudyContext';
import { curriculumLessons } from '../data/curriculumData';
import { legalVocabularyList } from '../data/vocabularyData';
import { 
  CheckCircle2, 
  Clock, 
  Scale, 
  Check, 
  HelpCircle,
  ArrowRight
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-8">
      
      {/* Header */}
      <div className="border-b border-[#1D3552] dark:border-[#1D3552] border-[#D4DFEC] pb-6">
        <div className="flex items-center gap-2 mb-1.5">
          <Scale className="w-4 h-4 text-[#4F83B8]" />
          <span className="text-[11px] font-sans tracking-widest uppercase text-[#4F83B8] font-semibold">
            ACADEMIC CURRICULUM & MODULES
          </span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-sans font-extrabold text-[#F3F5F7] tracking-tight">
          Structured Legal English Mastery
        </h1>
        <p className="text-sm sm:text-base text-[#9BAABC] font-sans mt-2 max-w-3xl leading-relaxed">
          Progress from foundational pronominal connectors and modal verbs to drafting complex commercial covenants and international SIAC arbitration awards.
        </p>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-6 text-xs font-sans no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 whitespace-nowrap transition-all border cursor-pointer rounded-full text-xs font-medium ${
                selectedCategory === cat.id
                  ? 'bg-[#132B46] text-[#F3F5F7] border-[#294766] font-semibold shadow-xs'
                  : 'bg-[#112239]/60 text-[#9BAABC] border-[#1D3552] hover:bg-[#132B46] hover:text-[#F3F5F7]'
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
          <div className="text-xs font-sans uppercase tracking-wider text-[#9BAABC] mb-2 px-1 flex items-center justify-between font-semibold">
            <span>Lessons ({filteredLessons.length})</span>
            <span className="text-[#F3F5F7] font-semibold">
              {completedLessons.length} of {curriculumLessons.length} Completed
            </span>
          </div>

          <div className="space-y-2.5 max-h-[80vh] overflow-y-auto pr-1 no-scrollbar">
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
                  className={`p-4 transition-all cursor-pointer rounded-2xl border ${
                    isSelected
                      ? 'lexa-card-selected font-medium'
                      : 'lexa-card hover:border-[#294766]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="badge-navy text-[10px] font-sans uppercase px-2.5 py-0.5 rounded-full font-semibold">
                      {lesson.categoryId}
                    </span>
                    <div className="flex items-center gap-2 text-[10px] font-sans text-[#9BAABC]">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#4F83B8]" /> {lesson.durationMinutes}m
                      </span>
                      {isCompleted && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#6A9BCB]" />
                      )}
                    </div>
                  </div>

                  <h3 className="font-sans font-bold text-sm text-[#F3F5F7] leading-snug">
                    {lesson.title}
                  </h3>
                  <p className="text-xs text-[#9BAABC] font-sans italic mt-0.5">
                    {lesson.titleId}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Pane: Comprehensive Interactive Lesson Content */}
        <div className="lg:col-span-8 p-6 sm:p-10 rounded-3xl glass-panel-deep liquid-lens space-y-8">
          
          {/* Lesson Header */}
          <div className="border-b border-[#1D3552] dark:border-[#1D3552] border-[#D4DFEC] pb-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-sans uppercase tracking-wider text-[#4F83B8] font-semibold">
                TRACK: {activeLesson.categoryId.toUpperCase()} • {activeLesson.difficulty.toUpperCase()}
              </span>
              <button
                onClick={() => markLessonComplete(activeLesson.id)}
                className={`px-4 py-2 text-xs font-sans border flex items-center gap-1.5 transition-all cursor-pointer rounded-full ${
                  isLessonCompleted
                    ? 'bg-[#132B46] text-[#6A9BCB] border-[#294766] font-semibold'
                    : 'btn-secondary'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[#4F83B8]" />
                <span>{isLessonCompleted ? 'Module Completed' : 'Mark as Complete'}</span>
              </button>
            </div>

            <h2 className="text-2xl sm:text-3xl font-sans font-extrabold text-[#F3F5F7] tracking-tight">
              {activeLesson.title}
            </h2>
            <p className="text-sm font-sans italic text-[#9BAABC] font-normal">
              {activeLesson.titleId}
            </p>

            <div className="p-4 rounded-2xl lexa-surface-subtle space-y-1">
              <span className="text-[10px] font-sans uppercase tracking-wider text-[#4F83B8] block font-semibold">
                Overview & Pedagogical Goal
              </span>
              <p className="text-sm font-sans text-[#9BAABC] leading-relaxed">
                {languageMode === 'ID' ? activeLesson.overviewId : activeLesson.overviewEn}
              </p>
            </div>
          </div>

          {/* Core Concepts Breakdown */}
          <div className="space-y-6">
            <h3 className="text-xs font-sans tracking-wider uppercase text-[#4F83B8] font-semibold border-b border-[#1D3552] dark:border-[#1D3552] border-[#D4DFEC] pb-2">
              Core Legal Concepts & Terminology ({activeLesson.coreConcepts.length})
            </h3>

            <div className="space-y-4">
              {activeLesson.coreConcepts.map((concept, cIdx) => {
                const termInDict = legalVocabularyList.find(t => t.term.toLowerCase() === concept.term.toLowerCase());

                return (
                  <div key={cIdx} className="p-5 rounded-2xl lexa-surface-subtle space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 bg-[#132B46] text-[#F3F5F7] border border-[#294766] text-xs font-sans font-bold flex items-center justify-center rounded-full">
                          {cIdx + 1}
                        </span>
                        <h4 className="font-sans font-extrabold text-lg text-[#F3F5F7]">
                          {concept.term}
                        </h4>
                      </div>

                      {termInDict && (
                        <button
                          onClick={() => setActiveLookupTermId(termInDict.id)}
                          className="text-xs font-sans font-medium text-[#4F83B8] hover:text-[#6A9BCB] hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          View in Dictionary <ArrowRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#081222]/80 dark:bg-[#081222]/80 bg-[#E8EFF7] border border-[#1D3552] dark:border-[#1D3552] border-[#D4DFEC] space-y-1">
                      <span className="text-[10px] font-sans uppercase text-[#4F83B8] block font-semibold">
                        Makna Bahasa Indonesia:
                      </span>
                      <p className="font-sans font-bold text-sm text-[#F3F5F7]">
                        {concept.meaningId}
                      </p>
                      <p className="text-xs text-[#9BAABC] mt-1 font-sans font-normal">
                        {concept.explanationId}
                      </p>
                    </div>

                    <div className="text-xs text-[#9BAABC] space-y-1 font-sans">
                      <strong className="text-[#F3F5F7] font-semibold">Legal Function:</strong> {concept.legalFunction}
                    </div>

                    {/* Authentic Example Box */}
                    <div className="p-4 rounded-xl bg-[#050B16] dark:bg-[#050B16] bg-[#DFE9F5] border border-[#1D3552] dark:border-[#1D3552] border-[#D4DFEC] space-y-1.5">
                      <span className="text-[10px] font-sans uppercase text-[#4F83B8] block font-semibold">
                        Authentic Example Clause:
                      </span>
                      <blockquote className="text-xs sm:text-[13px] font-serif italic text-[#F3F5F7] leading-[1.7]">
                        &ldquo;{concept.authenticExample}&rdquo;
                      </blockquote>
                      <p className="text-xs font-sans text-[#9BAABC] pt-2 border-t border-[#1D3552] dark:border-[#1D3552] border-[#D4DFEC]">
                        <strong className="text-[#F3F5F7] font-semibold">Terjemahan:</strong> {concept.indonesianTranslation}
                      </p>
                    </div>

                    {concept.draftingTip && (
                      <div className="text-xs font-sans text-[#9BAABC] bg-[#081222]/60 dark:bg-[#081222]/60 bg-[#E8EFF7] p-3 rounded-xl border border-[#1D3552] dark:border-[#1D3552] border-[#D4DFEC]">
                        <span className="text-[#4F83B8] font-semibold">Drafting Tip:</span>{' '}
                        <span className="text-[#6A9BCB]">{concept.draftingTip}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Interactive Check for Understanding (Quiz) */}
          {activeLesson.checkExercise && (
            <div className="p-6 rounded-2xl lexa-surface-subtle space-y-4">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#4F83B8]" />
                <h3 className="text-xs font-sans tracking-wider uppercase text-[#F3F5F7] font-semibold">
                  Practical Check: Test Your Comprehension
                </h3>
              </div>

              <div className="space-y-1">
                <p className="font-sans font-bold text-sm text-[#F3F5F7]">
                  {activeLesson.checkExercise.questionEn}
                </p>
                <p className="text-xs font-sans italic text-[#9BAABC]">
                  {activeLesson.checkExercise.questionId}
                </p>
              </div>

              <div className="space-y-2">
                {activeLesson.checkExercise.options.map((option, optIdx) => {
                  const isChosen = selectedQuizAnswer === optIdx;
                  const isCorrect = optIdx === activeLesson.checkExercise?.correctIndex;

                  let btnStyle = "lexa-surface-subtle text-[#9BAABC] hover:border-[#294766] hover:text-[#F3F5F7]";
                  if (showQuizExplanation) {
                    if (isCorrect) {
                      btnStyle = "bg-[#132B46] border-[#4F83B8] text-[#6A9BCB] font-bold";
                    } else if (isChosen && !isCorrect) {
                      btnStyle = "bg-red-950/40 border-red-800 text-red-300";
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectQuiz(optIdx)}
                      className={`w-full p-3.5 text-left text-xs font-sans border rounded-xl transition-all cursor-pointer flex items-center justify-between ${btnStyle}`}
                    >
                      <span>{option}</span>
                      {showQuizExplanation && isCorrect && (
                        <Check className="w-4 h-4 text-[#4F83B8]" />
                      )}
                    </button>
                  );
                })}
              </div>

              {showQuizExplanation && (
                <div className="p-4 rounded-xl bg-[#050B16] dark:bg-[#050B16] bg-[#DFE9F5] border border-[#1D3552] dark:border-[#1D3552] border-[#D4DFEC] space-y-1 text-xs font-sans">
                  <span className="font-bold text-[#6A9BCB] block">
                    {selectedQuizAnswer === activeLesson.checkExercise.correctIndex ? '✓ Correct Answer!' : '✗ Explanation:'}
                  </span>
                  <p className="text-[#9BAABC] leading-relaxed">
                    {activeLesson.checkExercise.explanationId}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Bottom Module Completion Bar */}
          <div className="pt-6 border-t border-[#1D3552] dark:border-[#1D3552] border-[#D4DFEC] flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs font-sans text-[#9BAABC]">
              Module ID: {activeLesson.id} • Estimated Study Time: {activeLesson.durationMinutes} mins
            </span>
            <button
              onClick={() => markLessonComplete(activeLesson.id)}
              className="btn-primary px-6 py-3 text-xs uppercase tracking-wider font-semibold"
            >
              <Check className="w-4 h-4" />
              <span>Complete & Advance to Next Module</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
