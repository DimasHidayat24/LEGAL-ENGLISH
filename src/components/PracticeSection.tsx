import React, { useState } from 'react';
import { useStudy } from '../context/StudyContext';
import { practiceExercisesList } from '../data/exercisesData';
import { Check, X, RotateCcw, Award, HelpCircle, CheckCircle2 } from 'lucide-react';

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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="border-b border-[#26344A] pb-6">
        <div className="flex items-center gap-2 mb-1">
          <Award className="w-4 h-4 text-[#C9A45C]" />
          <span className="text-[11px] font-sans tracking-widest uppercase text-[#C9A45C] font-bold">
            INTERACTIVE BENCHMARK & DRILLS
          </span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-sans font-extrabold text-[#F5F3EE] tracking-tight">
          Legal English Practice & Translation Lab
        </h1>
        <p className="text-sm sm:text-base text-[#AAB4C3] font-sans mt-2 leading-relaxed">
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
              className={`px-3 py-1.5 uppercase transition-colors border cursor-pointer rounded-xs text-xs font-semibold ${
                selectedType === type
                  ? 'bg-[#C9A45C] text-[#0B1220] border-[#C9A45C] font-bold shadow-xs'
                  : 'bg-[#111A2B] text-[#AAB4C3] border-[#26344A] hover:bg-[#172235] hover:text-[#F5F3EE]'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Main Exercise Card */}
      <div className="lexa-card p-6 sm:p-10 space-y-8 shadow-xl rounded-xs">
        
        {/* Progress & Meta */}
        <div className="flex items-center justify-between border-b border-[#26344A] pb-4">
          <div className="flex items-center gap-2">
            <span className="badge-navy text-xs font-sans uppercase px-2 py-0.5 rounded-xs font-bold">
              {currentExercise.type}
            </span>
            <span className="text-xs font-sans text-[#AAB4C3] font-medium">
              Question {activeQuestionIdx + 1} of {filteredExercises.length}
            </span>
          </div>

          <span className="text-xs font-sans text-[#F5F3EE] font-bold">
            Total Solved: {completedCount}
          </span>
        </div>

        {/* Title & Scenario */}
        <div className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-sans font-extrabold text-[#F5F3EE] tracking-tight">
            {currentExercise.title}
          </h2>

          <div className="p-3.5 bg-[#111A2B] border-l-3 border-[#C9A45C] text-xs sm:text-sm font-sans text-[#C5CBD5] leading-relaxed rounded-xs">
            <strong className="text-[#F5F3EE] font-semibold">Context / Scenario:</strong> {currentExercise.scenario}
          </div>
        </div>

        {/* Prompt */}
        <div className="p-5 bg-[#111A2B] border border-[#26344A] space-y-2 rounded-xs">
          <p className="font-sans font-bold text-base sm:text-lg text-[#F5F3EE] leading-relaxed">
            {currentExercise.promptEn}
          </p>
          <p className="text-xs sm:text-sm font-sans italic text-[#AAB4C3] font-normal">
            {currentExercise.promptId}
          </p>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {currentExercise.options.map((opt, idx) => {
            let optionStyles = 'bg-[#111A2B] border-[#26344A] text-[#F5F3EE] hover:border-[#C9A45C]/50';
            if (selectedOption === idx) {
              optionStyles = 'bg-[#172235] border-2 border-[#C9A45C] font-semibold text-[#F5F3EE] shadow-xs';
            }
            if (isSubmitted) {
              if (idx === currentExercise.correctIndex) {
                optionStyles = 'bg-[#8FAF9B]/20 border-2 border-[#8FAF9B] text-[#8FAF9B] font-bold';
              } else if (idx === selectedOption) {
                optionStyles = 'bg-red-950/80 border-2 border-red-700 text-red-200 font-medium';
              }
            }

            return (
              <button
                key={idx}
                disabled={isSubmitted}
                onClick={() => setSelectedOption(idx)}
                className={`w-full text-left p-4 text-xs sm:text-sm font-sans border transition-all flex items-center justify-between cursor-pointer rounded-xs ${optionStyles}`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center font-sans text-xs font-bold shrink-0">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="leading-relaxed">{opt}</span>
                </div>

                {isSubmitted && idx === currentExercise.correctIndex && (
                  <Check className="w-5 h-5 text-[#8FAF9B] shrink-0" />
                )}
                {isSubmitted && idx === selectedOption && idx !== currentExercise.correctIndex && (
                  <X className="w-5 h-5 text-red-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation Banner (Appears after submit) */}
        {isSubmitted && (
          <div className={`p-5 border space-y-2 rounded-xs ${
            isCorrect ? 'bg-[#111A2B] border-[#8FAF9B]' : 'bg-[#111A2B] border-[#C9A45C]'
          }`}>
            <div className="flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-wider">
              {isCorrect ? (
                <span className="text-[#8FAF9B] flex items-center gap-1.5 font-bold">
                  <CheckCircle2 className="w-4 h-4" /> Correct Answer
                </span>
              ) : (
                <span className="text-[#C9A45C] flex items-center gap-1.5 font-bold">
                  <HelpCircle className="w-4 h-4" /> Incorrect Choice
                </span>
              )}
            </div>

            <p className="text-sm font-sans text-[#F5F3EE] leading-relaxed">
              {currentExercise.explanationEn}
            </p>

            <div className="pt-2 border-t border-[#26344A]">
              <p className="text-xs font-sans italic text-[#C5CBD5]">
                <strong className="text-[#F5F3EE] font-semibold">Penjelasan Bahasa Indonesia:</strong> {currentExercise.explanationId}
              </p>
            </div>

            {currentExercise.relatedTermId && (
              <div className="pt-2">
                <button
                  onClick={() => setActiveLookupTermId(currentExercise.relatedTermId!)}
                  className="text-xs font-sans text-[#C9A45C] font-bold underline hover:text-[#E8D9B5] flex items-center gap-1 cursor-pointer"
                >
                  Inspect Term &ldquo;{currentExercise.relatedTermId}&rdquo; in Detail Dictionary →
                </button>
              </div>
            )}
          </div>
        )}

        {/* Action Controls */}
        <div className="pt-6 border-t border-[#26344A] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevious}
              disabled={activeQuestionIdx === 0}
              className="btn-secondary px-3 py-2 text-xs rounded-xs disabled:opacity-30"
            >
              ← Previous
            </button>
            <button
              onClick={handleNext}
              disabled={activeQuestionIdx === filteredExercises.length - 1}
              className="btn-secondary px-3 py-2 text-xs rounded-xs disabled:opacity-30"
            >
              Next →
            </button>
          </div>

          {!isSubmitted ? (
            <button
              onClick={handleSubmit}
              disabled={selectedOption === null}
              className="btn-primary px-6 py-2.5 text-xs rounded-xs uppercase tracking-wider disabled:opacity-40"
            >
              Submit Answer
            </button>
          ) : (
            <button
              onClick={handleReset}
              className="btn-secondary px-4 py-2 text-xs flex items-center gap-1.5 rounded-xs"
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
