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
      <div className="border-b border-white/[0.08] pb-6">
        <div className="flex items-center gap-2 mb-1.5">
          <Scale className="w-4 h-4 text-[#DCDCDC]" />
          <span className="text-[11px] font-sans tracking-widest uppercase text-[#A8A8A8] font-semibold">
            ACADEMIC CURRICULUM & MODULES
          </span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-sans font-extrabold text-white tracking-tight">
          Structured Legal English Mastery
        </h1>
        <p className="text-sm sm:text-base text-[#A8A8A8] font-sans mt-2 max-w-3xl leading-relaxed">
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
                  ? 'bg-[#242424] text-white border-white/20 font-semibold shadow-xs'
                  : 'bg-[#151515] text-[#A8A8A8] border-white/[0.08] hover:bg-[#1C1C1C] hover:text-white'
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
          <div className="text-xs font-sans uppercase tracking-wider text-[#A8A8A8] mb-2 px-1 flex items-center justify-between font-semibold">
            <span>Lessons ({filteredLessons.length})</span>
            <span className="text-white font-semibold">
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
                      ? 'bg-[#1C1C1C] border-white/25 shadow-[0_10px_25px_rgba(0,0,0,0.5)] font-medium'
                      : 'bg-[#101010] border-white/[0.08] hover:border-white/20 hover:bg-[#151515]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-sans uppercase px-2.5 py-0.5 rounded-full font-semibold bg-[#242424] text-[#DCDCDC] border border-white/10">
                      {lesson.categoryId}
                    </span>
                    <div className="flex items-center gap-2 text-[10px] font-sans text-[#A8A8A8]">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#DCDCDC]" /> {lesson.durationMinutes}m
                      </span>
                      {isCompleted && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                      )}
                    </div>
                  </div>

                  <h3 className="font-sans font-bold text-sm text-white leading-snug">
                    {lesson.title}
                  </h3>
                  <p className="text-xs text-[#A8A8A8] font-sans italic mt-0.5">
                    {lesson.titleId}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Pane: Comprehensive Interactive Lesson Content */}
        <div className="lg:col-span-8 p-6 sm:p-10 rounded-3xl bg-[#101010] border border-white/[0.08] space-y-8">
          
          {/* Lesson Header */}
          <div className="border-b border-white/[0.08] pb-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-sans uppercase tracking-wider text-[#A8A8A8] font-semibold">
                TRACK: {activeLesson.categoryId.toUpperCase()} • {activeLesson.difficulty.toUpperCase()}
              </span>
              <button
                onClick={() => markLessonComplete(activeLesson.id)}
                className={`px-4 py-2 text-xs font-sans border flex items-center gap-1.5 transition-all cursor-pointer rounded-full ${
                  isLessonCompleted
                    ? 'bg-[#242424] text-white border-white/20 font-semibold'
                    : 'bg-[#151515] text-[#F2F2F2] border-white/[0.12] hover:bg-[#1C1C1C]'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[#DCDCDC]" />
                <span>{isLessonCompleted ? 'Module Completed' : 'Mark as Complete'}</span>
              </button>
            </div>

            <h2 className="text-2xl sm:text-3xl font-sans font-extrabold text-white tracking-tight">
              {activeLesson.title}
            </h2>
            <p className="text-sm font-sans italic text-[#A8A8A8] font-normal">
              {activeLesson.titleId}
            </p>

            <div className="p-4 rounded-2xl bg-[#151515] border border-white/[0.08] space-y-1">
              <span className="text-[10px] font-sans uppercase tracking-wider text-[#A8A8A8] block font-semibold">
                Overview & Pedagogical Goal
              </span>
              <p className="text-sm font-sans text-[#A8A8A8] leading-relaxed">
                {languageMode === 'ID' ? activeLesson.overviewId : activeLesson.overviewEn}
              </p>
            </div>
          </div>

          {/* Core Concepts Breakdown */}
          <div className="space-y-6">
            <h3 className="text-xs font-sans tracking-wider uppercase text-[#A8A8A8] font-semibold border-b border-white/[0.08] pb-2">
              Core Legal Concepts & Terminology ({activeLesson.coreConcepts.length})
            </h3>

            <div className="space-y-4">
              {activeLesson.coreConcepts.map((concept, cIdx) => {
                const termInDict = legalVocabularyList.find(t => t.term.toLowerCase() === concept.term.toLowerCase());

                return (
                  <div key={cIdx} className="p-5 rounded-2xl bg-[#151515] border border-white/[0.08] space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 bg-[#242424] text-white border border-white/20 text-xs font-sans font-bold flex items-center justify-center rounded-full">
                          {cIdx + 1}
                        </span>
                        <h4 className="font-sans font-extrabold text-lg text-white">
                          {concept.term}
                        </h4>
                      </div>

                      {termInDict && (
                        <button
                          onClick={() => setActiveLookupTermId(termInDict.id)}
                          className="text-xs font-sans font-medium text-[#DCDCDC] hover:text-white hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          View in Dictionary <ArrowRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#1C1C1C] border border-white/[0.08] space-y-1">
                      <span className="text-[10px] font-sans uppercase text-[#A8A8A8] block font-semibold">
                        Makna Bahasa Indonesia:
                      </span>
                      <p className="font-sans font-bold text-sm text-white">
                        {concept.meaningId}
                      </p>
                      <p className="text-xs text-[#A8A8A8] mt-1 font-sans font-normal">
                        {concept.explanationId}
                      </p>
                    </div>

                    <div className="text-xs text-[#A8A8A8] space-y-1 font-sans">
                      <strong className="text-white font-semibold">Legal Function:</strong> {concept.legalFunction}
                    </div>

                    {/* Authentic Example Box */}
                    <div className="p-4 rounded-xl bg-[#0C0C0C] border border-white/[0.08] space-y-1.5">
                      <span className="text-[10px] font-sans uppercase text-[#A8A8A8] block font-semibold">
                        Authentic Example Clause:
                      </span>
                      <blockquote className="text-xs sm:text-[13px] font-serif italic text-[#F2F2F2] leading-[1.7]">
                        &ldquo;{concept.authenticExample}&rdquo;
                      </blockquote>
                      <p className="text-xs font-sans text-[#A8A8A8] pt-2 border-t border-white/[0.08]">
                        <strong className="text-white font-semibold">Terjemahan:</strong> {concept.indonesianTranslation}
                      </p>
                    </div>

                    {concept.draftingTip && (
                      <div className="text-xs font-sans text-[#A8A8A8] bg-[#181818] p-3 rounded-xl border border-white/[0.08]">
                        <span className="text-white font-semibold">Drafting Tip:</span>{' '}
                        <span className="text-[#DCDCDC]">{concept.draftingTip}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Interactive Check for Understanding (Quiz) */}
          {activeLesson.checkExercise && (
            <div className="p-6 rounded-2xl bg-[#151515] border border-white/[0.08] space-y-4">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#DCDCDC]" />
                <h3 className="text-xs font-sans tracking-wider uppercase text-white font-semibold">
                  Practical Check: Test Your Comprehension
                </h3>
              </div>

              <div className="space-y-1">
                <p className="font-sans font-bold text-sm text-white">
                  {activeLesson.checkExercise.questionEn}
                </p>
                <p className="text-xs font-sans italic text-[#A8A8A8]">
                  {activeLesson.checkExercise.questionId}
                </p>
              </div>

              <div className="space-y-2">
                {activeLesson.checkExercise.options.map((option, optIdx) => {
                  const isChosen = selectedQuizAnswer === optIdx;
                  const isCorrect = optIdx === activeLesson.checkExercise?.correctIndex;

                  let btnStyle = "bg-[#181818] text-[#A8A8A8] border-white/[0.08] hover:border-white/20 hover:text-white hover:bg-[#1C1C1C]";
                  if (showQuizExplanation) {
                    if (isCorrect) {
                      btnStyle = "bg-[#242424] border-white/30 text-white font-bold";
                    } else if (isChosen && !isCorrect) {
                      btnStyle = "bg-neutral-900 border-red-500/50 text-red-300";
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
                        <Check className="w-4 h-4 text-white" />
                      )}
                    </button>
                  );
                })}
              </div>

              {showQuizExplanation && (
                <div className="p-4 rounded-xl bg-[#0C0C0C] border border-white/[0.08] space-y-1 text-xs font-sans">
                  <span className="font-bold text-white block">
                    {selectedQuizAnswer === activeLesson.checkExercise.correctIndex ? '✓ Correct Answer!' : '✗ Explanation:'}
                  </span>
                  <p className="text-[#A8A8A8] leading-relaxed">
                    {activeLesson.checkExercise.explanationId}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Bottom Module Completion Bar */}
          <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs font-sans text-[#A8A8A8]">
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
