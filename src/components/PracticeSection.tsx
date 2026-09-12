import React, { useState } from 'react';
import { useStudy } from '../context/StudyContext';
import { practiceExercisesList } from '../data/exercisesData';
import { Check, X, RotateCcw, Award, HelpCircle, CheckCircle2, ArrowRight } from 'lucide-react';

export const PracticeSection: React.FC = () => {
  const { recordExerciseScore, exerciseScores, setActiveLookupTermId } = useStudy();
  
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [activeQuestionIdx, setActiveQuestionIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const filteredExercises = practiceExercisesList.filter(e => 
    selectedType === 'ALL' || e.type === selectedType
  );

  const currentExercise = filteredExercises[activeQuestionIdx] || filteredExercises[0];
  const isCorrect = selectedOption === currentExercise.correctIndex;

  const handleSubmit = () => {
    if (selectedOption === null) return;
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

  const completedCount = Object.keys(exerciseScores).length;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-8">
      
      {/* Header */}
      <div className="border-b border-[#1D3552] dark:border-[#1D3552] border-[#D4DFEC] pb-6">
        <div className="flex items-center gap-2 mb-1.5">
          <Award className="w-4 h-4 text-[#4F83B8]" />
          <span className="text-[11px] font-sans tracking-widest uppercase text-[#4F83B8] font-semibold">
            INTERACTIVE BENCHMARK & DRILLS
          </span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-sans font-extrabold text-[#F3F5F7] tracking-tight">
          Legal English Practice & Translation Lab
        </h1>
        <p className="text-sm sm:text-base text-[#9BAABC] font-sans mt-2 leading-relaxed">
          Test your mastery of drafting precision, pronominal adverbs, legal translations (<em>wanprestasi</em>, <em>kausa halal</em>), and authentic contract clauses.
        </p>

        {/* Type Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pt-6 text-xs font-sans no-scrollbar">
          {['ALL', 'drafting', 'translation', 'vocabulary', 'context', 'reading'].map((type) => (
            <button
              key={type}
              onClick={() => {
                setSelectedType(type);
                setActiveQuestionIdx(0);
                setSelectedOption(null);
                setIsSubmitted(false);
              }}
              className={`px-4 py-2 uppercase transition-all border cursor-pointer rounded-full text-xs font-medium ${
                selectedType === type
                  ? 'bg-[#132B46] text-[#F3F5F7] border-[#294766] font-semibold shadow-xs'
                  : 'bg-[#112239]/60 text-[#9BAABC] border-[#1D3552] hover:bg-[#132B46] hover:text-[#F3F5F7]'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Main Exercise Card */}
      <div className="p-6 sm:p-10 rounded-3xl glass-panel-deep liquid-lens space-y-8">
        
        {/* Progress & Meta */}
        <div className="flex items-center justify-between border-b border-[#1D3552] dark:border-[#1D3552] border-[#D4DFEC] pb-4">
          <div className="flex items-center gap-2">
            <span className="badge-navy text-xs font-sans uppercase px-3 py-0.5 rounded-full font-bold">
              {currentExercise.type}
            </span>
            <span className="text-xs font-sans text-[#9BAABC] font-medium">
              Question {activeQuestionIdx + 1} of {filteredExercises.length}
            </span>
          </div>

          <span className="text-xs font-sans text-[#F3F5F7] font-semibold">
            Total Solved: {completedCount}
          </span>
        </div>

        {/* Title & Scenario */}
        <div className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-sans font-extrabold text-[#F3F5F7] tracking-tight">
            {currentExercise.title}
          </h2>

          <div className="p-4 rounded-2xl lexa-surface-subtle text-xs sm:text-sm font-sans text-[#9BAABC] leading-relaxed">
            <strong className="text-[#F3F5F7] font-semibold">Context / Scenario:</strong> {currentExercise.scenario}
          </div>
        </div>

        {/* Prompt */}
        <div className="p-5 rounded-2xl bg-[#112239]/60 dark:bg-[#112239]/60 bg-[#E4EEF8] border border-[#1D3552] dark:border-[#1D3552] border-[#B4CDEB] space-y-2">
          <p className="font-sans font-bold text-base sm:text-lg text-[#F3F5F7] leading-relaxed">
            {currentExercise.promptEn}
          </p>
          <p className="text-xs sm:text-sm font-sans italic text-[#9BAABC] font-normal">
            {currentExercise.promptId}
          </p>
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
          <div className={`p-5 border space-y-2 rounded-2xl ${
            isCorrect 
              ? 'bg-[#132B46]/70 dark:bg-[#132B46]/70 bg-[#E0EDFA] border-[#294766] dark:border-[#294766] border-[#B4CDEB]' 
              : 'lexa-surface-subtle'
          }`}>
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

            <p className="text-sm font-sans text-[#F3F5F7] leading-relaxed">
              {currentExercise.explanationEn}
            </p>

            <div className="pt-2 border-t border-[#1D3552] dark:border-[#1D3552] border-[#D4DFEC]">
              <p className="text-xs font-sans italic text-[#9BAABC]">
                <strong className="text-[#F3F5F7] font-semibold">Penjelasan Bahasa Indonesia:</strong> {currentExercise.explanationId}
              </p>
            </div>

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
        <div className="pt-6 border-t border-[#1D3552] dark:border-[#1D3552] border-[#D4DFEC] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevious}
              disabled={activeQuestionIdx === 0}
              className="btn-secondary px-4 py-2 text-xs rounded-full disabled:opacity-30"
            >
              ← Previous
            </button>
            <button
              onClick={handleNext}
              disabled={activeQuestionIdx === filteredExercises.length - 1}
              className="btn-secondary px-4 py-2 text-xs rounded-full disabled:opacity-30"
            >
              Next →
            </button>
          </div>

          {!isSubmitted ? (
            <button
              onClick={handleSubmit}
              disabled={selectedOption === null}
              className="btn-primary px-6 py-2.5 text-xs uppercase tracking-wider disabled:opacity-40 font-semibold"
            >
              Submit Answer
            </button>
          ) : (
            <button
              onClick={handleReset}
              className="btn-secondary px-4 py-2 text-xs flex items-center gap-1.5 rounded-full font-medium"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retry Question</span>
            </button>
          )}
        </div>

      </div>

    </div>
  );
};
