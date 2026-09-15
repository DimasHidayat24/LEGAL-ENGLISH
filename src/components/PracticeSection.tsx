import React, { useState, useMemo } from 'react';
import { useStudy } from '../context/StudyContext';
import { allPracticeExercises, practiceBankMetadata } from '../data/practice';
import { ExerciseCategory, ExerciseDifficulty, ExerciseItem } from '../types';
import { 
  Check, 
  X, 
  RotateCcw, 
  Award, 
  HelpCircle, 
  CheckCircle2, 
  ArrowRight,
  Shuffle,
  Search,
  BookOpen,
  Sparkles,
  Layers,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export const PracticeSection: React.FC = () => {
  const { recordExerciseScore, exerciseScores, setActiveLookupTermId } = useStudy();
  
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeQuestionIdx, setActiveQuestionIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isShuffleActive, setIsShuffleActive] = useState<boolean>(false);
  const [shuffledSeed, setShuffledSeed] = useState<number>(0);

  // Compute filtered exercises
  const filteredExercises = useMemo(() => {
    let pool = allPracticeExercises.filter(ex => {
      // Category filter
      if (selectedCategory !== 'ALL') {
        const cat = selectedCategory.toLowerCase();
        if (ex.category !== cat && ex.type !== cat) {
          return false;
        }
      }

      // Difficulty filter
      if (selectedDifficulty !== 'ALL') {
        if (ex.difficulty !== selectedDifficulty) {
          return false;
        }
      }

      // Search filter
      if (searchQuery.trim().length > 0) {
        const q = searchQuery.toLowerCase().trim();
        const inTitle = ex.title?.toLowerCase().includes(q);
        const inPromptEn = ex.promptEn?.toLowerCase().includes(q);
        const inPromptId = ex.promptId?.toLowerCase().includes(q);
        const inConcept = ex.legalConcept?.toLowerCase().includes(q);
        const inIndo = ex.indonesianEquivalent?.toLowerCase().includes(q);
        const inScenario = ex.scenario?.toLowerCase().includes(q);
        const inPassage = ex.passage?.toLowerCase().includes(q);
        if (!inTitle && !inPromptEn && !inPromptId && !inConcept && !inIndo && !inScenario && !inPassage) {
          return false;
        }
      }

      return true;
    });

    if (isShuffleActive) {
      // Deterministic shuffle with seed
      pool = [...pool].sort((a, b) => {
        const hashA = (a.id + shuffledSeed).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const hashB = (b.id + shuffledSeed).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        return (hashA % 17) - (hashB % 17);
      });
    }

    return pool;
  }, [selectedCategory, selectedDifficulty, searchQuery, isShuffleActive, shuffledSeed]);

  // Current active exercise
  const currentExercise: ExerciseItem | undefined = filteredExercises[activeQuestionIdx] || filteredExercises[0];
  const isCorrect = currentExercise && selectedOption === currentExercise.correctIndex;

  const handleSubmit = () => {
    if (selectedOption === null || !currentExercise) return;
    setIsSubmitted(true);
    const score = selectedOption === currentExercise.correctIndex ? 100 : 0;
    recordExerciseScore(currentExercise.id, score);
  };

  const handleNext = () => {
    if (activeQuestionIdx < filteredExercises.length - 1) {
      setActiveQuestionIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    }
  };

  const handlePrevious = () => {
    if (activeQuestionIdx > 0) {
      setActiveQuestionIdx(prev => prev - 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    }
  };

  const handleReset = () => {
    setSelectedOption(null);
    setIsSubmitted(false);
  };

  const handleShuffleToggle = () => {
    setIsShuffleActive(true);
    setShuffledSeed(Date.now());
    setActiveQuestionIdx(0);
    setSelectedOption(null);
    setIsSubmitted(false);
  };

  const handleResetOrder = () => {
    setIsShuffleActive(false);
    setActiveQuestionIdx(0);
    setSelectedOption(null);
    setIsSubmitted(false);
  };

  const completedCount = Object.keys(exerciseScores).length;

  const getDifficultyBadge = (difficulty?: ExerciseDifficulty) => {
    switch (difficulty) {
      case 'Foundation':
        return 'bg-emerald-950/60 text-emerald-300 border-emerald-700/60';
      case 'Intermediate':
        return 'bg-sky-950/60 text-sky-300 border-sky-700/60';
      case 'Advanced':
        return 'bg-purple-950/60 text-purple-300 border-purple-700/60';
      default:
        return 'bg-[#132B46] text-[#9BAABC] border-[#294766]';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-8">
      
      {/* Header */}
      <div className="border-b border-[#1D3552] dark:border-[#1D3552] border-[#D4DFEC] pb-6">
        <div className="flex items-center justify-between flex-wrap gap-2 mb-1.5">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-[#4F83B8]" />
            <span className="text-[11px] font-sans tracking-widest uppercase text-[#4F83B8] font-semibold">
              INTERACTIVE BENCHMARK & DRILLS • {allPracticeExercises.length} PRACTICABLE QUESTIONS
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShuffleToggle}
              className={`text-xs font-sans px-3 py-1.5 rounded-full border flex items-center gap-1.5 cursor-pointer transition-colors ${
                isShuffleActive 
                  ? 'bg-[#132B46] text-[#6A9BCB] border-[#4F83B8] font-semibold' 
                  : 'bg-[#112239]/60 text-[#9BAABC] border-[#1D3552] hover:text-[#F3F5F7]'
              }`}
              title="Shuffle questions for a dynamic randomized session"
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span>{isShuffleActive ? 'Shuffled Session' : 'Shuffle Bank'}</span>
            </button>
            {isShuffleActive && (
              <button
                onClick={handleResetOrder}
                className="text-xs font-sans text-[#9BAABC] hover:text-[#F3F5F7] px-2 py-1 underline cursor-pointer"
              >
                Reset Order
              </button>
            )}
          </div>
        </div>

        <h1 className="text-2xl sm:text-4xl font-sans font-extrabold text-[#F3F5F7] tracking-tight">
          Legal English Practice & Translation Lab
        </h1>
        <p className="text-sm sm:text-base text-[#9BAABC] font-sans mt-2 leading-relaxed">
          Master drafting precision, bilingual legal translation (<em>wanprestasi</em>, <em>tanggung jawab mutlak</em>), commercial terminology, contextual clauses, and authentic contract reading across 100 benchmark exercises.
        </p>

        {/* Category Filters with Counts */}
        <div className="flex items-center gap-2 overflow-x-auto pt-6 text-xs font-sans no-scrollbar">
          {[
            { id: 'ALL', label: 'ALL', count: practiceBankMetadata.totalQuestions },
            { id: 'drafting', label: 'DRAFTING', count: practiceBankMetadata.byCategory.drafting },
            { id: 'translation', label: 'TRANSLATION', count: practiceBankMetadata.byCategory.translation },
            { id: 'vocabulary', label: 'VOCABULARY', count: practiceBankMetadata.byCategory.vocabulary },
            { id: 'context', label: 'CONTEXT', count: practiceBankMetadata.byCategory.context },
            { id: 'reading', label: 'READING', count: practiceBankMetadata.byCategory.reading }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setSelectedCategory(item.id);
                setActiveQuestionIdx(0);
                setSelectedOption(null);
                setIsSubmitted(false);
              }}
              className={`px-3.5 py-1.5 uppercase transition-all border cursor-pointer rounded-full text-xs font-medium whitespace-nowrap flex items-center gap-1.5 ${
                selectedCategory === item.id
                  ? 'bg-[#132B46] text-[#F3F5F7] border-[#294766] font-semibold shadow-xs'
                  : 'bg-[#112239]/60 text-[#9BAABC] border-[#1D3552] hover:bg-[#132B46] hover:text-[#F3F5F7]'
              }`}
            >
              <span>{item.label}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#112239] text-[#6A9BCB] border border-[#1D3552]">
                {item.count}
              </span>
            </button>
          ))}
        </div>

        {/* Difficulty & Search Filter Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4">
          <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-sans">
            <span className="text-[11px] font-sans text-[#9BAABC] mr-1 uppercase font-semibold">Tier:</span>
            {[
              { id: 'ALL', label: 'All Levels', count: allPracticeExercises.length },
              { id: 'Foundation', label: 'Foundation', count: practiceBankMetadata.byDifficulty.Foundation },
              { id: 'Intermediate', label: 'Intermediate', count: practiceBankMetadata.byDifficulty.Intermediate },
              { id: 'Advanced', label: 'Advanced', count: practiceBankMetadata.byDifficulty.Advanced }
            ].map((tier) => (
              <button
                key={tier.id}
                onClick={() => {
                  setSelectedDifficulty(tier.id);
                  setActiveQuestionIdx(0);
                  setSelectedOption(null);
                  setIsSubmitted(false);
                }}
                className={`px-2.5 py-1 rounded-md text-[11px] font-sans border transition-colors cursor-pointer ${
                  selectedDifficulty === tier.id
                    ? 'bg-[#1D3552] text-[#F3F5F7] border-[#4F83B8] font-bold'
                    : 'bg-[#112239]/40 text-[#9BAABC] border-[#1D3552]/70 hover:text-[#F3F5F7]'
                }`}
              >
                {tier.label} ({tier.count})
              </button>
            ))}
          </div>

          {/* Quick Search */}
          <div className="relative min-w-[200px]">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#9BAABC]" />
            <input
              type="text"
              placeholder="Search concepts or terms..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setActiveQuestionIdx(0);
                setSelectedOption(null);
                setIsSubmitted(false);
              }}
              className="w-full pl-8 pr-3 py-1.5 rounded-xl text-xs font-sans bg-[#112239]/80 border border-[#1D3552] text-[#F3F5F7] placeholder-[#9BAABC]/60 focus:outline-none focus:border-[#4F83B8]"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-[#9BAABC] hover:text-[#F3F5F7]"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Exercise Card */}
      {currentExercise ? (
        <div className="p-6 sm:p-10 rounded-3xl glass-panel-deep liquid-lens space-y-8">
          
          {/* Progress & Meta Header */}
          <div className="flex items-center justify-between border-b border-[#1D3552] dark:border-[#1D3552] border-[#D4DFEC] pb-4 flex-wrap gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="badge-navy text-xs font-sans uppercase px-3 py-0.5 rounded-full font-bold">
                {currentExercise.category || currentExercise.type}
              </span>

              {currentExercise.difficulty && (
                <span className={`text-[10px] font-sans uppercase px-2.5 py-0.5 rounded-full border font-bold ${getDifficultyBadge(currentExercise.difficulty)}`}>
                  {currentExercise.difficulty}
                </span>
              )}

              {currentExercise.direction && (
                <span className="text-[10px] font-sans px-2 py-0.5 rounded-md bg-[#112239] text-[#6A9BCB] border border-[#1D3552] font-semibold">
                  {currentExercise.direction}
                </span>
              )}

              <span className="text-xs font-sans text-[#9BAABC] font-medium ml-1">
                Question {activeQuestionIdx + 1} of {filteredExercises.length}
              </span>
            </div>

            {/* Jump Selector & Total Solved */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <label className="text-[10px] font-sans text-[#9BAABC] uppercase font-semibold">Jump:</label>
                <select
                  value={activeQuestionIdx}
                  onChange={(e) => {
                    setActiveQuestionIdx(Number(e.target.value));
                    setSelectedOption(null);
                    setIsSubmitted(false);
                  }}
                  className="bg-[#112239] text-xs font-sans text-[#F3F5F7] border border-[#1D3552] rounded-lg px-2 py-1 focus:outline-none focus:border-[#4F83B8] cursor-pointer"
                >
                  {filteredExercises.map((ex, idx) => (
                    <option key={ex.id} value={idx}>
                      Q{idx + 1}: {ex.title.length > 28 ? ex.title.substring(0, 28) + '...' : ex.title} {exerciseScores[ex.id] !== undefined ? '✓' : ''}
                    </option>
                  ))}
                </select>
              </div>

              <span className="text-xs font-sans text-[#F3F5F7] font-semibold bg-[#132B46]/70 px-2.5 py-1 rounded-lg border border-[#294766]">
                Solved: {completedCount}/{allPracticeExercises.length}
              </span>
            </div>
          </div>

          {/* Title & Scenario */}
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-xl sm:text-2xl font-sans font-extrabold text-[#F3F5F7] tracking-tight">
                {currentExercise.title}
              </h2>
              {currentExercise.legalConcept && (
                <span className="hidden sm:inline-block text-[11px] font-sans px-2.5 py-1 rounded-lg bg-[#112239] text-[#6A9BCB] border border-[#1D3552] font-semibold shrink-0">
                  {currentExercise.legalConcept}
                </span>
              )}
            </div>

            {currentExercise.scenario && (
              <div className="p-4 rounded-2xl lexa-surface-subtle text-xs sm:text-sm font-sans text-[#9BAABC] leading-relaxed">
                <strong className="text-[#F3F5F7] font-semibold">Context / Scenario:</strong> {currentExercise.scenario}
              </div>
            )}
          </div>

          {/* Reading Passage if applicable */}
          {currentExercise.passage && (
            <div className="p-5 rounded-2xl bg-[#0B1728]/80 border border-[#1D3552] space-y-2.5">
              <div className="flex items-center gap-2 text-[#4F83B8] text-xs font-sans font-bold uppercase tracking-wider">
                <BookOpen className="w-4 h-4" />
                <span>Legal Instrument / Commentary Excerpt</span>
              </div>
              <div className="text-xs sm:text-sm font-sans text-[#CAD6E2] leading-relaxed whitespace-pre-line border-l-2 border-[#4F83B8] pl-4 py-1 italic">
                {currentExercise.passage}
              </div>
            </div>
          )}

          {/* Prompt */}
          <div className="p-5 rounded-2xl bg-[#112239]/60 dark:bg-[#112239]/60 bg-[#E4EEF8] border border-[#1D3552] dark:border-[#1D3552] border-[#B4CDEB] space-y-2">
            <p className="font-sans font-bold text-base sm:text-lg text-[#F3F5F7] leading-relaxed">
              {currentExercise.promptEn}
            </p>
            {currentExercise.promptId && (
              <p className="text-xs sm:text-sm font-sans italic text-[#9BAABC] font-normal">
                {currentExercise.promptId}
              </p>
            )}
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentExercise.options.map((opt, idx) => {
              return (
                <button
                  key={idx}
                  disabled={isSubmitted}
                  onClick={() => setSelectedOption(idx)}
                  className={`w-full text-left p-4 text-xs sm:text-sm font-sans border transition-all flex items-center justify-between cursor-pointer rounded-2xl ${
                    isSubmitted 
                      ? idx === currentExercise.correctIndex 
                        ? 'bg-[#4F83B8]/20 border-[#4F83B8] text-[#6A9BCB] font-bold' 
                        : idx === selectedOption 
                          ? 'bg-rose-950/40 border-rose-700/60 text-rose-300 font-medium' 
                          : 'lexa-surface-subtle text-[#9BAABC]'
                      : selectedOption === idx 
                        ? 'bg-[#132B46] border-[#294766] font-semibold text-[#F3F5F7] shadow-xs' 
                        : 'lexa-surface-subtle text-[#9BAABC] hover:border-[#294766] hover:text-[#F3F5F7]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center font-sans text-xs font-bold shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="leading-relaxed">{opt}</span>
                  </div>

                  {isSubmitted && idx === currentExercise.correctIndex && (
                    <Check className="w-5 h-5 text-[#6A9BCB] shrink-0" />
                  )}
                  {isSubmitted && idx === selectedOption && idx !== currentExercise.correctIndex && (
                    <X className="w-5 h-5 text-rose-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Banner (Appears after submit) */}
          {isSubmitted && (
            <div className={`p-5 border space-y-3 rounded-2xl ${
              isCorrect 
                ? 'bg-[#132B46]/70 dark:bg-[#132B46]/70 bg-[#E0EDFA] border-[#294766] dark:border-[#294766] border-[#B4CDEB]' 
                : 'lexa-surface-subtle'
            }`}>
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-wider">
                  {isCorrect ? (
                    <span className="text-[#6A9BCB] flex items-center gap-1.5 font-bold">
                      <CheckCircle2 className="w-4 h-4" /> Correct Answer
                    </span>
                  ) : (
                    <span className="text-[#9BAABC] flex items-center gap-1.5 font-bold">
                      <HelpCircle className="w-4 h-4" /> Incorrect Choice
                    </span>
                  )}
                </div>

                {currentExercise.indonesianEquivalent && (
                  <span className="text-xs font-sans text-[#4F83B8] font-medium">
                    Padanan Baku: <strong className="text-[#F3F5F7]">{currentExercise.indonesianEquivalent}</strong>
                  </span>
                )}
              </div>

              <p className="text-sm font-sans text-[#F3F5F7] leading-relaxed">
                {currentExercise.explanationEn}
              </p>

              {currentExercise.explanationId && (
                <div className="pt-2 border-t border-[#1D3552] dark:border-[#1D3552] border-[#D4DFEC]">
                  <p className="text-xs font-sans italic text-[#9BAABC]">
                    <strong className="text-[#F3F5F7] font-semibold">Penjelasan Bahasa Indonesia:</strong> {currentExercise.explanationId}
                  </p>
                </div>
              )}

              {currentExercise.relatedTermId && (
                <div className="pt-2">
                  <button
                    onClick={() => setActiveLookupTermId(currentExercise.relatedTermId!)}
                    className="text-xs font-sans text-[#4F83B8] font-semibold hover:text-[#6A9BCB] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    Inspect Term &ldquo;{currentExercise.relatedTermId}&rdquo; in Detail Dictionary <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Action Controls */}
          <div className="pt-6 border-t border-[#1D3552] dark:border-[#1D3552] border-[#D4DFEC] flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevious}
                disabled={activeQuestionIdx === 0}
                className="btn-secondary px-4 py-2 text-xs rounded-full disabled:opacity-30 flex items-center gap-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" /> Previous
              </button>
              <button
                onClick={handleNext}
                disabled={activeQuestionIdx === filteredExercises.length - 1}
                className="btn-secondary px-4 py-2 text-xs rounded-full disabled:opacity-30 flex items-center gap-1"
              >
                Next <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              {!isSubmitted ? (
                <button
                  onClick={handleSubmit}
                  disabled={selectedOption === null}
                  className="btn-primary px-6 py-2.5 text-xs uppercase tracking-wider disabled:opacity-40 font-semibold cursor-pointer"
                >
                  Submit Answer
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleReset}
                    className="btn-secondary px-4 py-2 text-xs flex items-center gap-1.5 rounded-full font-medium"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Retry Question</span>
                  </button>

                  {activeQuestionIdx < filteredExercises.length - 1 && (
                    <button
                      onClick={handleNext}
                      className="btn-primary px-5 py-2 text-xs rounded-full font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      Next Question <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

        </div>
      ) : (
        <div className="p-12 rounded-3xl glass-panel-deep text-center space-y-4">
          <Layers className="w-12 h-12 text-[#4F83B8] mx-auto opacity-60" />
          <h3 className="text-lg font-sans font-bold text-[#F3F5F7]">No Questions Found</h3>
          <p className="text-xs text-[#9BAABC] max-w-sm mx-auto">
            No questions match your current filter selection. Try changing the category, difficulty level, or search query.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('ALL');
              setSelectedDifficulty('ALL');
              setSearchQuery('');
            }}
            className="btn-secondary px-4 py-2 text-xs rounded-full"
          >
            Clear All Filters
          </button>
        </div>
      )}

    </div>
  );
};
