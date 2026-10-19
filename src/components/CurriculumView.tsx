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
    { id: 'ALL', label: 'All lessons' },
    { id: 'foundation', label: '1. Foundations & Grammar' },
    { id: 'documents', label: '2. Commercial Contracts' },
    { id: 'practical', label: '3. Legal Writing & IRAC' },
    { id: 'advanced', label: '4. Cross-border & Arbitration' }
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
      <div className="border-b border-line pb-6">
        <div className="flex items-center gap-2 mb-1.5">
          <Scale className="w-4 h-4 text-ink-2" />
          <span className="text-[11px] font-sans text-muted font-semibold">
            Lessons
          </span>
        </div>
        <h1 className="text-3xl sm:text-[44px] font-medium text-ink tracking-[-0.035em] leading-[1.1]">
          Learn legal English, lesson by lesson
        </h1>
        <p className="text-sm sm:text-base text-muted font-sans mt-2 max-w-3xl leading-relaxed">
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
                  ? 'bg-accent text-on-accent border-accent font-semibold shadow-xs'
                  : 'bg-surface text-muted border-line hover:bg-surface-3 hover:text-ink'
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
          <div className="text-xs font-sans text-muted mb-2 px-1 flex items-center justify-between font-semibold">
            <span>Lessons ({filteredLessons.length})</span>
            <span className="text-ink font-semibold">
              {completedLessons.length} of {curriculumLessons.length} Completed
            </span>
          </div>

          <div className="space-y-2.5 max-h-[calc(100vh-8rem)] overflow-y-auto pr-1 lexa-custom-scrollbar lg:sticky lg:top-24">
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
                      ? 'bg-surface-3 border-line-strong font-medium'
                      : 'bg-surface border-line hover:border-line-strong hover:bg-surface'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-sans uppercase px-2.5 py-0.5 rounded-full font-semibold bg-surface-3 text-ink-2 border border-line">
                      {lesson.categoryId}
                    </span>
                    <div className="flex items-center gap-2 text-[11px] font-sans text-muted">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-ink-2" /> {lesson.durationMinutes}m
                      </span>
                      {isCompleted && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-ink" />
                      )}
                    </div>
                  </div>

                  <h3 className="font-serif font-semibold text-sm text-ink leading-snug">
                    {lesson.title}
                  </h3>
                  <p className="text-xs text-muted font-sans italic mt-0.5">
                    {lesson.titleId}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Pane: Comprehensive Interactive Lesson Content */}
        <div className="lg:col-span-8 p-6 sm:p-10 rounded-2xl bg-surface border border-line space-y-8">
          
          {/* Lesson Header */}
          <div className="border-b border-line pb-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-sans text-muted font-semibold">
                {(() => {
                  const track = categories.find(c => c.id === activeLesson.categoryId)?.label.replace(/^\d+\.\s*/, '') ?? activeLesson.categoryId;
                  return track.toLowerCase() === activeLesson.difficulty.toLowerCase()
                    ? `Track: ${track}`
                    : `Track: ${track} • Level: ${activeLesson.difficulty}`;
                })()}
              </span>
              <button
                onClick={() => markLessonComplete(activeLesson.id)}
                className={`px-4 py-2 text-xs font-sans border flex items-center gap-1.5 transition-all cursor-pointer rounded-full ${
                  isLessonCompleted
                    ? 'bg-accent text-on-accent border-accent font-semibold'
                    : 'bg-surface text-ink border-line hover:bg-surface-3'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-ink-2" />
                <span>{isLessonCompleted ? 'Completed' : 'Mark as complete'}</span>
              </button>
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-ink tracking-tight">
              {activeLesson.title}
            </h2>
            <p className="text-sm font-sans italic text-muted font-normal">
              {activeLesson.titleId}
            </p>

            <div className="p-4 rounded-2xl bg-surface border border-line space-y-1">
              <span className="text-[11px] font-sans text-muted block font-semibold">
                Overview & Pedagogical Goal
              </span>
              <p className="text-sm font-sans text-muted leading-relaxed">
                {languageMode === 'ID' ? activeLesson.overviewId : activeLesson.overviewEn}
              </p>
            </div>
          </div>

          {/* Core Concepts Breakdown */}
          <div className="space-y-6">
            <h3 className="text-xs font-serif text-muted font-semibold border-b border-line pb-2">
              Core Legal Concepts & Terminology ({activeLesson.coreConcepts.length})
            </h3>

            <div className="space-y-4">
              {activeLesson.coreConcepts.map((concept, cIdx) => {
                const termInDict = legalVocabularyList.find(t => t.term.toLowerCase() === concept.term.toLowerCase());

                return (
                  <div key={cIdx} className="p-5 rounded-2xl bg-surface border border-line space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 bg-accent text-on-accent border border-accent text-xs font-sans font-bold flex items-center justify-center rounded-full">
                          {cIdx + 1}
                        </span>
                        <h4 className="font-sans font-extrabold text-lg text-ink">
                          {concept.term}
                        </h4>
                      </div>

                      {termInDict && (
                        <button
                          onClick={() => setActiveLookupTermId(termInDict.id)}
                          className="text-xs font-sans font-medium text-ink-2 hover:text-ink hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          View in Dictionary <ArrowRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>

                    <div className="p-3.5 rounded-xl bg-surface-3 border border-line space-y-1">
                      <span className="text-[11px] font-sans text-muted block font-semibold">
                        Makna Bahasa Indonesia:
                      </span>
                      <p className="font-sans font-bold text-sm text-ink">
                        {concept.meaningId}
                      </p>
                      <p className="text-xs text-muted mt-1 font-sans font-normal">
                        {concept.explanationId}
                      </p>
                    </div>

                    <div className="text-xs text-muted space-y-1 font-sans">
                      <strong className="text-ink font-semibold">Legal Function:</strong> {concept.legalFunction}
                    </div>

                    {/* Authentic Example Box */}
                    <div className="p-4 rounded-xl bg-surface border border-line space-y-1.5">
                      <span className="text-[11px] font-sans text-muted block font-semibold">
                        Authentic Example Clause:
                      </span>
                      <blockquote className="text-xs sm:text-[13px] font-serif italic text-ink leading-[1.7]">
                        &ldquo;{concept.authenticExample}&rdquo;
                      </blockquote>
                      <p className="text-xs font-sans text-muted pt-2 border-t border-line">
                        <strong className="text-ink font-semibold">Terjemahan:</strong> {concept.indonesianTranslation}
                      </p>
                    </div>

                    {concept.draftingTip && (
                      <div className="text-xs font-sans text-muted bg-surface-3 p-3 rounded-xl border border-line">
                        <span className="text-ink font-semibold">Drafting Tip:</span>{' '}
                        <span className="text-ink-2">{concept.draftingTip}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Interactive Check for Understanding (Quiz) */}
          {activeLesson.checkExercise && (
            <div className="p-6 rounded-2xl bg-surface border border-line space-y-4">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-ink-2" />
                <h3 className="text-xs font-serif text-ink font-semibold">
                  Practical Check: Test Your Comprehension
                </h3>
              </div>

              <div className="space-y-1">
                <p className="font-sans font-bold text-sm text-ink">
                  {activeLesson.checkExercise.questionEn}
                </p>
                <p className="text-xs font-sans italic text-muted">
                  {activeLesson.checkExercise.questionId}
                </p>
              </div>

              <div className="space-y-2">
                {activeLesson.checkExercise.options.map((option, optIdx) => {
                  const isChosen = selectedQuizAnswer === optIdx;
                  const isCorrect = optIdx === activeLesson.checkExercise?.correctIndex;

                  let btnStyle = "bg-surface-3 text-muted border-line hover:border-line-strong hover:text-ink hover:bg-surface-3";
                  if (showQuizExplanation) {
                    if (isCorrect) {
                      btnStyle = "bg-success-soft border-success text-success font-semibold";
                    } else if (isChosen && !isCorrect) {
                      btnStyle = "bg-danger-soft border-danger text-danger";
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
                        <Check className="w-4 h-4 text-success" />
                      )}
                    </button>
                  );
                })}
              </div>

              {showQuizExplanation && (
                <div className="p-4 rounded-xl bg-surface border border-line space-y-1 text-xs font-sans">
                  <span className={`font-bold block ${selectedQuizAnswer === activeLesson.checkExercise.correctIndex ? 'text-success' : 'text-danger'}`}>
                    {selectedQuizAnswer === activeLesson.checkExercise.correctIndex ? '✓ Correct' : '✗ Not quite — explanation'}
                  </span>
                  <p className="text-muted leading-relaxed">
                    {activeLesson.checkExercise.explanationId}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Bottom Module Completion Bar */}
          <div className="pt-6 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs font-sans text-muted">
              Lesson {activeLesson.id} • Study time: {activeLesson.durationMinutes} mins
            </span>
            <button
              onClick={() => {
                markLessonComplete(activeLesson.id);
                const idx = curriculumLessons.findIndex(l => l.id === activeLesson.id);
                const next = curriculumLessons[idx + 1];
                if (next) {
                  setActiveLessonId(next.id);
                  setSelectedQuizAnswer(null);
                  setShowQuizExplanation(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="btn-primary px-6 py-3 text-xs font-medium"
            >
              <Check className="w-4 h-4" />
              <span>{curriculumLessons.findIndex(l => l.id === activeLesson.id) < curriculumLessons.length - 1 ? 'Complete and go to next lesson' : 'Complete final lesson'}</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
