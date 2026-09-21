import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useStudy } from '../context/StudyContext';
import { allPracticeExercises } from '../data/practice';
import { ExerciseItem, ExamResultRecord, ExamQuestionResult, ExamCategoryScore } from '../types';
import { 
  Clock, 
  Award, 
  Flag, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  ArrowRight, 
  ArrowLeft, 
  RotateCcw, 
  BookOpen, 
  BarChart3, 
  Check, 
  X, 
  Sparkles, 
  History, 
  Sliders, 
  ChevronRight,
  ShieldCheck,
  Zap,
  Bookmark
} from 'lucide-react';

interface ExamPreset {
  id: string;
  name: string;
  badge: string;
  description: string;
  durationMinutes: number;
  questionCount: number;
  composition: {
    drafting: number;
    translation: number;
    vocabulary: number;
    context: number;
    reading: number;
  };
}

const PRESETS: ExamPreset[] = [
  {
    id: 'standard-diagnostic',
    name: 'Standard Diagnostic Benchmark',
    badge: 'Recommended',
    description: 'Comprehensive 20-question benchmark assessing drafting, bilingual translation, vocabulary, cross-border context, and contract reading.',
    durationMinutes: 25,
    questionCount: 20,
    composition: { drafting: 5, translation: 4, vocabulary: 4, context: 4, reading: 3 }
  },
  {
    id: 'rapid-sprint',
    name: 'Rapid Diagnostic Sprint',
    badge: '12 Mins',
    description: 'High-speed diagnostic drill with 10 questions (2 per core category) for rapid competency checks.',
    durationMinutes: 12,
    questionCount: 10,
    composition: { drafting: 2, translation: 2, vocabulary: 2, context: 2, reading: 2 }
  },
  {
    id: 'comprehensive-bar',
    name: 'Advanced Transactional Simulation',
    badge: 'High Stakes',
    description: '30-question intensive simulation featuring complex clauses, authentic passages, and tricky Indonesian-Common law divergences.',
    durationMinutes: 40,
    questionCount: 30,
    composition: { drafting: 8, translation: 6, vocabulary: 6, context: 6, reading: 4 }
  }
];

export const TimedExamSimulation: React.FC<{ onBackToPractice?: () => void }> = ({ onBackToPractice }) => {
  const { theme, recordExamResult, examHistory, setActiveLookupTermId, setSelectedTab } = useStudy();

  // Screen modes: 'LOBBY' | 'IN_EXAM' | 'RESULTS'
  const [mode, setMode] = useState<'LOBBY' | 'IN_EXAM' | 'RESULTS'>('LOBBY');
  
  // Setup state
  const [selectedPresetId, setSelectedPresetId] = useState<string>('standard-diagnostic');
  const [customQuestions, setCustomQuestions] = useState<number>(15);
  const [customMinutes, setCustomMinutes] = useState<number>(20);
  const [isCustomMode, setIsCustomMode] = useState<boolean>(false);

  // Active exam state
  const [activeQuestions, setActiveQuestions] = useState<ExerciseItem[]>([]);
  const [activeQuestionIdx, setActiveQuestionIdx] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<{ [exerciseId: string]: number | null }>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<{ [exerciseId: string]: boolean }>({});
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState<number>(0);
  const [totalDurationMinutes, setTotalDurationMinutes] = useState<number>(25);
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);
  const [examStartTime, setExamStartTime] = useState<number>(0);

  // Results state
  const [currentResult, setCurrentResult] = useState<ExamResultRecord | null>(null);
  const [reviewFilter, setReviewFilter] = useState<'ALL' | 'INCORRECT' | 'FLAGGED'>('ALL');
  const [reviewQuestionIdx, setReviewQuestionIdx] = useState<number>(0);

  // Timer Ref
  const timerRef = useRef<number | null>(null);

  // Generate question pool based on preset
  const generateExamPool = (preset: ExamPreset | { durationMinutes: number; questionCount: number }) => {
    // Group all exercises by category
    const byCategory: { [k: string]: ExerciseItem[] } = {
      drafting: allPracticeExercises.filter(e => e.category === 'drafting' || e.type === 'drafting'),
      translation: allPracticeExercises.filter(e => e.category === 'translation' || e.type === 'translation'),
      vocabulary: allPracticeExercises.filter(e => e.category === 'vocabulary' || e.type === 'vocabulary'),
      context: allPracticeExercises.filter(e => e.category === 'context' || e.type === 'context'),
      reading: allPracticeExercises.filter(e => e.category === 'reading' || e.type === 'reading'),
    };

    // Helper to pick n random distinct items
    const pickRandom = (arr: ExerciseItem[], count: number): ExerciseItem[] => {
      const shuffled = [...arr].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, Math.min(count, arr.length));
    };

    let selected: ExerciseItem[] = [];

    if ('composition' in preset) {
      const comp = preset.composition;
      selected = [
        ...pickRandom(byCategory.drafting, comp.drafting),
        ...pickRandom(byCategory.translation, comp.translation),
        ...pickRandom(byCategory.vocabulary, comp.vocabulary),
        ...pickRandom(byCategory.context, comp.context),
        ...pickRandom(byCategory.reading, comp.reading),
      ];
    } else {
      // Custom mode: pick proportionally across categories
      const perCat = Math.ceil(preset.questionCount / 5);
      selected = [
        ...pickRandom(byCategory.drafting, perCat),
        ...pickRandom(byCategory.translation, perCat),
        ...pickRandom(byCategory.vocabulary, perCat),
        ...pickRandom(byCategory.context, perCat),
        ...pickRandom(byCategory.reading, perCat),
      ].slice(0, preset.questionCount);
    }

    // Final shuffle to avoid predictable category order
    return selected.sort(() => 0.5 - Math.random());
  };

  // Start exam
  const handleStartExam = () => {
    let chosenDuration = 25;
    let pool: ExerciseItem[] = [];

    if (isCustomMode) {
      chosenDuration = customMinutes;
      pool = generateExamPool({ durationMinutes: customMinutes, questionCount: customQuestions });
    } else {
      const preset = PRESETS.find(p => p.id === selectedPresetId) || PRESETS[0];
      chosenDuration = preset.durationMinutes;
      pool = generateExamPool(preset);
    }

    setActiveQuestions(pool);
    setActiveQuestionIdx(0);
    setUserAnswers({});
    setFlaggedQuestions({});
    setTotalDurationMinutes(chosenDuration);
    setTimeRemainingSeconds(chosenDuration * 60);
    setExamStartTime(Date.now());
    setShowSubmitModal(false);
    setMode('IN_EXAM');
  };

  // Countdown timer effect
  useEffect(() => {
    if (mode === 'IN_EXAM') {
      timerRef.current = window.setInterval(() => {
        setTimeRemainingSeconds(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            handleFinalSubmission(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [mode]);

  // Submit Exam & calculate diagnostics
  const handleFinalSubmission = (autoSubmitted = false) => {
    if (timerRef.current) clearInterval(timerRef.current);

    const timeSpentSec = Math.max(1, Math.round((Date.now() - examStartTime) / 1000));
    
    // Evaluate questions
    let correctCount = 0;
    const questionResults: ExamQuestionResult[] = [];
    const catScores: { [cat: string]: { total: number; correct: number; percentage: number } } = {
      drafting: { total: 0, correct: 0, percentage: 0 },
      translation: { total: 0, correct: 0, percentage: 0 },
      vocabulary: { total: 0, correct: 0, percentage: 0 },
      context: { total: 0, correct: 0, percentage: 0 },
      reading: { total: 0, correct: 0, percentage: 0 },
    };

    activeQuestions.forEach((q) => {
      const selected = userAnswers[q.id] !== undefined ? userAnswers[q.id] : null;
      const isCorrect = selected === q.correctIndex;
      if (isCorrect) correctCount++;

      const cat = (q.category || q.type || 'drafting').toLowerCase();
      if (!catScores[cat]) {
        catScores[cat] = { total: 0, correct: 0, percentage: 0 };
      }
      catScores[cat].total += 1;
      if (isCorrect) catScores[cat].correct += 1;

      questionResults.push({
        exerciseId: q.id,
        selectedOption: selected,
        correctIndex: q.correctIndex,
        isCorrect,
        flagged: !!flaggedQuestions[q.id]
      });
    });

    // Compute category percentages
    Object.keys(catScores).forEach(cat => {
      const item = catScores[cat];
      item.percentage = item.total > 0 ? Math.round((item.correct / item.total) * 100) : 0;
    });

    const scorePct = activeQuestions.length > 0 ? Math.round((correctCount / activeQuestions.length) * 100) : 0;

    // Determine Proficiency Tier
    let proficiencyTier = 'Foundational Practitioner';
    if (scorePct >= 90) {
      proficiencyTier = 'Mastery — Lead Cross-Border Counsel';
    } else if (scorePct >= 75) {
      proficiencyTier = 'Advanced — Transactional Drafting Ready';
    } else if (scorePct >= 60) {
      proficiencyTier = 'Competent — Developing Precision';
    }

    const resultRecord: ExamResultRecord = {
      id: `exam-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      title: isCustomMode ? 'Custom Diagnostic Simulation' : (PRESETS.find(p => p.id === selectedPresetId)?.name || 'Standard Diagnostic'),
      durationMinutes: totalDurationMinutes,
      timeSpentSeconds: timeSpentSec,
      totalQuestions: activeQuestions.length,
      correctAnswers: correctCount,
      scorePercentage: scorePct,
      proficiencyTier,
      categoryBreakdown: catScores,
      questionResults
    };

    recordExamResult(resultRecord);
    setCurrentResult(resultRecord);
    setShowSubmitModal(false);
    setReviewQuestionIdx(0);
    setMode('RESULTS');
  };

  // Format time (MM:SS)
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const answeredCount = Object.keys(userAnswers).filter(k => userAnswers[k] !== null).length;
  const flaggedCount = Object.keys(flaggedQuestions).filter(k => flaggedQuestions[k]).length;
  const currentExamQuestion = activeQuestions[activeQuestionIdx];

  // Helper for review mode items
  const filteredReviewQuestions = useMemo(() => {
    if (!currentResult) return [];
    return activeQuestions.filter((q) => {
      const qResult = currentResult.questionResults.find(r => r.exerciseId === q.id);
      if (!qResult) return true;
      if (reviewFilter === 'INCORRECT') return !qResult.isCorrect;
      if (reviewFilter === 'FLAGGED') return qResult.flagged;
      return true;
    });
  }, [activeQuestions, currentResult, reviewFilter]);

  const activeReviewQuestion = filteredReviewQuestions[reviewQuestionIdx] || filteredReviewQuestions[0];
  const activeReviewResult = currentResult?.questionResults.find(r => r.exerciseId === activeReviewQuestion?.id);

  // =========================================================================
  // VIEW 1: EXAM SETUP / LOBBY
  // =========================================================================
  if (mode === 'LOBBY') {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-8 animate-in fade-in duration-200">
        
        {/* Header */}
        <div className="border-b border-white/[0.08] pb-6">
          <div className="flex items-center justify-between flex-wrap gap-2 mb-1.5">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-white" />
              <span className="text-[11px] font-sans tracking-widest uppercase text-white font-semibold">
                TIMED EXAM SIMULATION & DIAGNOSTIC LAB
              </span>
            </div>

            {onBackToPractice && (
              <button
                onClick={onBackToPractice}
                className="text-xs font-sans text-[#A8A8A8] hover:text-[#F2F2F2] flex items-center gap-1 cursor-pointer transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Practice Bank
              </button>
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl font-sans font-extrabold text-[#F2F2F2] tracking-tight">
            Legal English Diagnostic Assessment
          </h1>
          <p className="text-sm sm:text-base text-[#A8A8A8] font-sans mt-2 leading-relaxed">
            Test your legal translation, contract drafting precision, and transactional analysis under authentic timed exam conditions. Receive an instant competency scorecard with category diagnostics.
          </p>
        </div>

        {/* Feature Highlights Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 rounded-2xl lexa-surface-subtle border border-white/[0.08] space-y-1">
            <div className="flex items-center gap-2 text-[#DCDCDC] text-xs font-bold font-sans">
              <Zap className="w-4 h-4" /> Timed Pressure Engine
            </div>
            <p className="text-[11px] text-[#A8A8A8] font-sans">
              Strict real-time countdown. Simulates TOLES, ILEC, and international associate testing.
            </p>
          </div>

          <div className="p-4 rounded-2xl lexa-surface-subtle border border-white/[0.08] space-y-1">
            <div className="flex items-center gap-2 text-[#DCDCDC] text-xs font-bold font-sans">
              <Flag className="w-4 h-4" /> Review & Flag System
            </div>
            <p className="text-[11px] text-[#A8A8A8] font-sans">
              Mark complex clauses for review and jump instantly between questions during testing.
            </p>
          </div>

          <div className="p-4 rounded-2xl lexa-surface-subtle border border-white/[0.08] space-y-1">
            <div className="flex items-center gap-2 text-[#DCDCDC] text-xs font-bold font-sans">
              <BarChart3 className="w-4 h-4" /> Comprehensive Scorecard
            </div>
            <p className="text-[11px] text-[#A8A8A8] font-sans">
              Detailed proficiency tiers and category breakdown across drafting, translation, and vocabulary.
            </p>
          </div>
        </div>

        {/* Exam Presets Selection */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-sans font-bold text-[#F2F2F2] flex items-center gap-2">
              <Award className="w-4 h-4 text-white" /> Choose Diagnostic Preset
            </h2>
            <button
              onClick={() => setIsCustomMode(!isCustomMode)}
              className="text-xs font-sans text-[#DCDCDC] hover:text-white font-semibold flex items-center gap-1 cursor-pointer"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>{isCustomMode ? 'Use Standard Presets' : 'Custom Config'}</span>
            </button>
          </div>

          {!isCustomMode ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {PRESETS.map((preset) => {
                const isSelected = selectedPresetId === preset.id;
                return (
                  <div
                    key={preset.id}
                    onClick={() => setSelectedPresetId(preset.id)}
                    className={`p-6 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                      isSelected
                        ? 'bg-[#1C1C1C] border-white/30 shadow-lg ring-1 ring-white/20'
                        : 'lexa-surface-subtle hover:border-white/[0.14]'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] font-sans font-bold uppercase px-2.5 py-0.5 rounded-full border ${
                          isSelected
                            ? 'bg-white/10 text-white border-white/30'
                            : 'bg-[#151515] text-[#A8A8A8] border-white/[0.08]'
                        }`}>
                          {preset.badge}
                        </span>
                        <div className="flex items-center gap-1 text-xs font-sans font-bold text-[#F2F2F2]">
                          <Clock className="w-3.5 h-3.5 text-white" />
                          <span>{preset.durationMinutes} Min</span>
                        </div>
                      </div>

                      <h3 className="font-sans font-bold text-base text-[#F2F2F2]">
                        {preset.name}
                      </h3>
                      <p className="text-xs font-sans text-[#A8A8A8] leading-relaxed">
                        {preset.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs font-sans">
                      <span className="text-[#A8A8A8]">{preset.questionCount} Questions</span>
                      <span className="font-semibold text-white flex items-center gap-1">
                        Select Preset <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-6 rounded-3xl lexa-surface-subtle border border-white/[0.08] space-y-6">
              <h3 className="font-sans font-bold text-base text-[#F2F2F2]">Custom Simulation Configuration</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-sans text-[#A8A8A8] block font-semibold">
                    Question Count: <strong className="text-[#F2F2F2]">{customQuestions} Questions</strong>
                  </label>
                  <input
                    type="range"
                    min={5}
                    max={40}
                    step={5}
                    value={customQuestions}
                    onChange={(e) => setCustomQuestions(Number(e.target.value))}
                    className="w-full accent-white cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-[#A8A8A8]">
                    <span>5</span>
                    <span>15</span>
                    <span>25</span>
                    <span>40</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-sans text-[#A8A8A8] block font-semibold">
                    Time Limit: <strong className="text-[#F2F2F2]">{customMinutes} Minutes</strong>
                  </label>
                  <input
                    type="range"
                    min={5}
                    max={60}
                    step={5}
                    value={customMinutes}
                    onChange={(e) => setCustomMinutes(Number(e.target.value))}
                    className="w-full accent-white cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-[#A8A8A8]">
                    <span>5m</span>
                    <span>20m</span>
                    <span>40m</span>
                    <span>60m</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Start Button Box */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#151515] to-[#1C1C1C] border border-white/[0.12] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-base sm:text-lg font-sans font-extrabold text-[#F2F2F2]">
              Ready to begin diagnostic examination?
            </h3>
            <p className="text-xs text-[#A8A8A8] font-sans">
              Timer starts immediately. Questions are dynamically drawn from our 100-exercise benchmark bank.
            </p>
          </div>

          <button
            onClick={handleStartExam}
            className="btn-primary px-8 py-3 text-sm font-sans font-bold uppercase tracking-wider rounded-full shadow-lg flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <Zap className="w-4 h-4" /> Start Exam Now
          </button>
        </div>

        {/* Previous Attempts History (if any) */}
        {examHistory && examHistory.length > 0 && (
          <div className="space-y-3 pt-4">
            <h3 className="text-sm font-sans font-bold text-[#F2F2F2] flex items-center gap-2">
              <History className="w-4 h-4 text-white" /> Past Diagnostic Attempts ({examHistory.length})
            </h3>
            <div className="space-y-2">
              {examHistory.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl lexa-surface-subtle border border-white/[0.08] flex items-center justify-between flex-wrap gap-2 text-xs font-sans"
                >
                  <div>
                    <div className="font-bold text-[#F2F2F2]">{item.title}</div>
                    <div className="text-[#A8A8A8] text-[11px]">
                      {item.date} • {item.totalQuestions} Questions • {Math.round(item.timeSpentSeconds / 60)}m spent
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-[11px] font-semibold text-[#DCDCDC]">
                      {item.proficiencyTier}
                    </span>
                    <div className={`px-3 py-1 rounded-full font-bold text-xs ${
                      item.scorePercentage >= 75
                        ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-700/60'
                        : item.scorePercentage >= 60
                          ? 'bg-neutral-800 text-[#F2F2F2] border border-white/20'
                          : 'bg-amber-950/60 text-amber-300 border border-amber-700/60'
                    }`}>
                      {item.scorePercentage}% ({item.correctAnswers}/{item.totalQuestions})
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    );
  }

  // =========================================================================
  // VIEW 2: ACTIVE EXAMINATION
  // =========================================================================
  if (mode === 'IN_EXAM' && currentExamQuestion) {
    const isFlagged = !!flaggedQuestions[currentExamQuestion.id];
    const isTimeCritical = timeRemainingSeconds < 180; // under 3 minutes
    const isTimeWarning = timeRemainingSeconds < 300; // under 5 minutes

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-6 animate-in fade-in duration-200">
        
        {/* Fixed / Sticky Top Examination Control Bar */}
        <div className="p-4 rounded-2xl bg-[#101010]/95 backdrop-blur-md border border-white/[0.12] shadow-xl flex items-center justify-between flex-wrap gap-3 sticky top-16 z-30">
          <div className="flex items-center gap-3">
            {/* Live Timer */}
            <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border font-mono font-bold text-sm tracking-wider ${
              isTimeCritical
                ? 'bg-rose-950/80 text-rose-300 border-rose-600 animate-pulse'
                : isTimeWarning
                  ? 'bg-amber-950/60 text-amber-300 border-amber-600'
                  : 'bg-[#151515] text-[#DCDCDC] border-white/[0.08]'
            }`}>
              <Clock className="w-4 h-4" />
              <span>{formatTime(timeRemainingSeconds)}</span>
            </div>

            <span className="text-xs font-sans text-[#A8A8A8] hidden sm:inline">
              Answered: <strong className="text-[#F2F2F2]">{answeredCount}</strong> / {activeQuestions.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Flag Current Question */}
            <button
              onClick={() => {
                setFlaggedQuestions(prev => ({
                  ...prev,
                  [currentExamQuestion.id]: !prev[currentExamQuestion.id]
                }));
              }}
              className={`px-3 py-1.5 rounded-full border text-xs font-sans flex items-center gap-1.5 cursor-pointer transition-colors ${
                isFlagged
                  ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold'
                  : 'bg-[#151515]/80 border-white/[0.08] text-[#A8A8A8] hover:text-[#F2F2F2]'
              }`}
              title="Flag this question to review before submitting"
            >
              <Flag className={`w-3.5 h-3.5 ${isFlagged ? 'fill-amber-400 text-amber-400' : ''}`} />
              <span>{isFlagged ? 'Flagged' : 'Flag Question'}</span>
            </button>

            {/* End / Submit Exam */}
            <button
              onClick={() => setShowSubmitModal(true)}
              className="btn-primary px-4 py-1.5 text-xs font-sans font-bold uppercase tracking-wider rounded-full cursor-pointer"
            >
              Finish & Submit
            </button>
          </div>
        </div>

        {/* Question Palette / Navigator Grid */}
        <div className="p-3 rounded-2xl lexa-surface-subtle border border-white/[0.08] space-y-2">
          <div className="flex items-center justify-between text-[11px] font-sans text-[#A8A8A8] px-1">
            <span>Exam Navigator (Click to Jump):</span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-white"></span> Answered</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400"></span> Flagged</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-white/20"></span> Remaining</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {activeQuestions.map((q, idx) => {
              const isCurrent = idx === activeQuestionIdx;
              const isAnswered = userAnswers[q.id] !== undefined && userAnswers[q.id] !== null;
              const isQFlagged = !!flaggedQuestions[q.id];

              return (
                <button
                  key={q.id}
                  onClick={() => setActiveQuestionIdx(idx)}
                  className={`w-7 h-7 shrink-0 rounded-lg text-xs font-sans font-bold transition-all relative flex items-center justify-center cursor-pointer ${
                    isCurrent
                      ? 'ring-2 ring-white bg-white text-black shadow-md'
                      : isAnswered
                        ? 'bg-[#242424] text-white border border-white/25'
                        : 'bg-[#151515] text-[#A8A8A8] border border-white/[0.08] hover:bg-[#202020]'
                  }`}
                >
                  {idx + 1}
                  {isQFlagged && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full border border-[#050505]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Question Body Card */}
        <div className="p-6 sm:p-10 rounded-3xl glass-panel-deep space-y-6">
          {/* Metadata Header */}
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="badge-navy text-xs font-sans uppercase px-3 py-0.5 rounded-full font-bold">
                {currentExamQuestion.category || currentExamQuestion.type}
              </span>
              <span className="text-xs font-sans text-[#A8A8A8]">
                Question {activeQuestionIdx + 1} of {activeQuestions.length}
              </span>
            </div>

            {currentExamQuestion.legalConcept && (
              <span className="text-[11px] font-sans px-2.5 py-0.5 rounded-md bg-[#151515] text-[#DCDCDC] border border-white/[0.08] font-semibold">
                {currentExamQuestion.legalConcept}
              </span>
            )}
          </div>

          {/* Scenario Context (if any) */}
          {currentExamQuestion.scenario && (
            <div className="p-4 rounded-2xl lexa-surface-subtle text-xs sm:text-sm font-sans text-[#A8A8A8] leading-relaxed">
              <strong className="text-[#F2F2F2] font-semibold">Context / Factual Matrix:</strong> {currentExamQuestion.scenario}
            </div>
          )}

          {/* Reading Passage (if reading category) */}
          {currentExamQuestion.passage && (
            <div className="p-5 rounded-2xl bg-[#101010]/80 border border-white/[0.08] space-y-2">
              <div className="flex items-center gap-2 text-white text-xs font-sans font-bold uppercase tracking-wider">
                <BookOpen className="w-4 h-4" /> Legal Instrument Excerpt
              </div>
              <div className="text-xs sm:text-sm font-sans text-[#DCDCDC] leading-relaxed italic border-l-2 border-white/40 pl-3 py-1">
                {currentExamQuestion.passage}
              </div>
            </div>
          )}

          {/* Question Prompt */}
          <div className="p-5 rounded-2xl bg-[#151515]/70 border border-white/[0.08] space-y-2">
            <p className="font-sans font-bold text-base sm:text-lg text-[#F2F2F2] leading-relaxed">
              {currentExamQuestion.promptEn}
            </p>
            {currentExamQuestion.promptId && (
              <p className="text-xs sm:text-sm font-sans italic text-[#A8A8A8]">
                {currentExamQuestion.promptId}
              </p>
            )}
          </div>

          {/* Multiple Choice Options (Exam mode: answers hidden until final submission!) */}
          <div className="space-y-3">
            {currentExamQuestion.options.map((optionText, optIdx) => {
              const isSelected = userAnswers[currentExamQuestion.id] === optIdx;
              return (
                <button
                  key={optIdx}
                  onClick={() => {
                    setUserAnswers(prev => ({
                      ...prev,
                      [currentExamQuestion.id]: optIdx
                    }));
                  }}
                  className={`w-full text-left p-4 text-xs sm:text-sm font-sans border transition-all flex items-center justify-between cursor-pointer rounded-2xl ${
                    isSelected
                      ? 'bg-[#1C1C1C] border-white/35 text-[#F2F2F2] font-semibold shadow-md ring-1 ring-white/20'
                      : 'lexa-surface-subtle text-[#A8A8A8] hover:border-white/[0.16] hover:text-[#F2F2F2]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-full border flex items-center justify-center font-sans text-xs font-bold shrink-0 ${
                      isSelected
                        ? 'border-white bg-white text-black'
                        : 'border-white/20 text-[#A8A8A8]'
                    }`}>
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span className="leading-relaxed">{optionText}</span>
                  </div>

                  {isSelected && (
                    <CheckCircle2 className="w-4 h-4 text-white shrink-0 ml-2" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Bottom Question Navigation Buttons */}
          <div className="pt-6 border-t border-white/[0.08] flex items-center justify-between flex-wrap gap-3">
            <button
              onClick={() => setActiveQuestionIdx(prev => Math.max(0, prev - 1))}
              disabled={activeQuestionIdx === 0}
              className="btn-secondary px-4 py-2 text-xs rounded-full disabled:opacity-30 flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Previous Question
            </button>

            <div className="flex items-center gap-2">
              {activeQuestionIdx < activeQuestions.length - 1 ? (
                <button
                  onClick={() => setActiveQuestionIdx(prev => prev + 1)}
                  className="btn-primary px-5 py-2 text-xs rounded-full font-semibold flex items-center gap-1 cursor-pointer"
                >
                  Next Question <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={() => setShowSubmitModal(true)}
                  className="btn-primary px-6 py-2 text-xs rounded-full font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" /> Review & Submit Exam
                </button>
              )}
            </div>
          </div>

        </div>

        {/* Confirmation Modal Before Submission */}
        {showSubmitModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
            <div className="max-w-md w-full p-6 rounded-3xl bg-[#101010] border border-white/[0.12] shadow-2xl space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#181818] flex items-center justify-center text-white">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-sans font-bold text-base text-[#F2F2F2]">
                    Confirm Final Submission
                  </h3>
                  <p className="text-xs text-[#A8A8A8] font-sans">
                    Once submitted, your answers will be graded and logged.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#151515] border border-white/[0.08] space-y-2 text-xs font-sans">
                <div className="flex justify-between">
                  <span className="text-[#A8A8A8]">Total Questions:</span>
                  <span className="font-bold text-[#F2F2F2]">{activeQuestions.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#A8A8A8]">Answered:</span>
                  <span className="font-bold text-white">{answeredCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#A8A8A8]">Unanswered:</span>
                  <span className={`font-bold ${activeQuestions.length - answeredCount > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {activeQuestions.length - answeredCount}
                  </span>
                </div>
                {flaggedCount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-[#A8A8A8]">Flagged for review:</span>
                    <span className="font-bold text-amber-400">{flaggedCount}</span>
                  </div>
                )}
                <div className="flex justify-between pt-1 border-t border-white/[0.08]">
                  <span className="text-[#A8A8A8]">Time Remaining:</span>
                  <span className="font-mono font-bold text-[#F2F2F2]">{formatTime(timeRemainingSeconds)}</span>
                </div>
              </div>

              {activeQuestions.length - answeredCount > 0 && (
                <div className="flex items-center gap-2 text-xs text-amber-300 bg-amber-950/40 p-3 rounded-xl border border-amber-800/60">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>You still have {activeQuestions.length - answeredCount} unanswered questions. Unanswered questions will be scored as zero.</span>
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setShowSubmitModal(false)}
                  className="btn-secondary px-4 py-2 text-xs rounded-full cursor-pointer"
                >
                  Return to Exam
                </button>
                <button
                  onClick={() => handleFinalSubmission(false)}
                  className="btn-primary px-5 py-2 text-xs font-bold uppercase rounded-full cursor-pointer"
                >
                  Confirm & Grade
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    );
  }

  // =========================================================================
  // VIEW 3: DIAGNOSTIC SCORECARD & IN-DEPTH REVIEW
  // =========================================================================
  if (mode === 'RESULTS' && currentResult) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-8 animate-in fade-in duration-200">
        
        {/* Top Header */}
        <div className="border-b border-white/[0.08] pb-6 flex items-center justify-between flex-wrap gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Award className="w-4 h-4 text-white" />
              <span className="text-[11px] font-sans tracking-widest uppercase text-white font-semibold">
                OFFICIAL COMPETENCY SCORECARD
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-sans font-extrabold text-[#F2F2F2] tracking-tight">
              Legal English Diagnostic Report
            </h1>
            <p className="text-xs sm:text-sm text-[#A8A8A8] font-sans mt-1">
              Assessment completed on {currentResult.date} • {currentResult.title}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setMode('LOBBY')}
              className="btn-secondary px-4 py-2 text-xs rounded-full flex items-center gap-1.5 cursor-pointer font-medium"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Retake Another Exam
            </button>
            {onBackToPractice && (
              <button
                onClick={onBackToPractice}
                className="btn-primary px-4 py-2 text-xs rounded-full font-semibold cursor-pointer"
              >
                Back to Practice Lab
              </button>
            )}
          </div>
        </div>

        {/* Hero Scorecard Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#151515] via-[#101010] to-[#0C0C0C] border border-white/[0.12] shadow-xl space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
            
            {/* Score Ring / Metric */}
            <div className="flex flex-col items-center sm:items-start space-y-1">
              <span className="text-xs font-sans uppercase tracking-wider text-[#A8A8A8] font-semibold">
                Overall Assessment Score
              </span>
              <div className="flex items-baseline gap-2">
                <span className={`text-4xl sm:text-5xl font-sans font-extrabold tracking-tight ${
                  currentResult.scorePercentage >= 75
                    ? 'text-white'
                    : currentResult.scorePercentage >= 60
                      ? 'text-[#DCDCDC]'
                      : 'text-amber-300'
                }`}>
                  {currentResult.scorePercentage}%
                </span>
                <span className="text-sm font-sans text-[#A8A8A8]">
                  ({currentResult.correctAnswers}/{currentResult.totalQuestions})
                </span>
              </div>
              <span className="text-xs text-[#A8A8A8] font-sans">
                Time Spent: {Math.floor(currentResult.timeSpentSeconds / 60)}m {currentResult.timeSpentSeconds % 60}s
              </span>
            </div>

            {/* Proficiency Tier */}
            <div className="sm:col-span-2 p-4 rounded-2xl bg-[#181818]/70 border border-white/[0.12] space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-sans text-white font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" /> Evaluated Competency Tier
              </div>
              <div className="text-base sm:text-lg font-sans font-bold text-[#F2F2F2]">
                {currentResult.proficiencyTier}
              </div>
              <p className="text-xs font-sans text-[#A8A8A8] leading-relaxed">
                {currentResult.scorePercentage >= 80 
                  ? 'Demonstrates high fluency in Common Law transactional drafting, bilingual civil law doctrines, and formal legal dispute mechanisms.'
                  : currentResult.scorePercentage >= 60
                    ? 'Demonstrates solid foundational legal vocabulary, but requires focused review of spatial pronominal adverbs, negative pledges, and statutory civil code equivalents.'
                    : 'Recommend reviewing the core curriculum modules on contractual boilerplate and standard drafting collocations before attempting advanced cross-border negotiation.'}
              </p>
            </div>

          </div>

          {/* Category Breakdown Progress Bars */}
          <div className="pt-6 border-t border-white/[0.08] space-y-3">
            <h3 className="text-xs font-sans font-bold uppercase tracking-wider text-[#A8A8A8]">
              Category Competency Breakdown
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.entries(currentResult.categoryBreakdown).map(([cat, scoreVal]) => {
                const score = scoreVal as ExamCategoryScore;
                if (score.total === 0) return null;
                const catName = cat.toUpperCase();
                return (
                  <div key={cat} className="p-3 rounded-xl bg-[#151515]/80 border border-white/[0.08] space-y-1.5">
                    <div className="flex justify-between text-xs font-sans font-semibold">
                      <span className="text-[#F2F2F2]">{catName}</span>
                      <span className={score.percentage >= 70 ? 'text-white' : 'text-amber-300'}>
                        {score.correct}/{score.total} ({score.percentage}%)
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-[#080808] overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          score.percentage >= 75
                            ? 'bg-white'
                            : score.percentage >= 50
                              ? 'bg-[#A8A8A8]'
                              : 'bg-amber-500'
                        }`}
                        style={{ width: `${score.percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* In-Depth Question-by-Question Review Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h2 className="text-lg font-sans font-bold text-[#F2F2F2] flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-white" /> Detailed Item Diagnostics & Explanations
            </h2>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 text-xs font-sans">
              <button
                onClick={() => { setReviewFilter('ALL'); setReviewQuestionIdx(0); }}
                className={`px-3 py-1 rounded-full border cursor-pointer transition-colors ${
                  reviewFilter === 'ALL'
                    ? 'bg-[#242424] text-white border-white/40 font-bold'
                    : 'bg-[#151515] text-[#A8A8A8] border-white/[0.08]'
                }`}
              >
                All ({activeQuestions.length})
              </button>
              <button
                onClick={() => { setReviewFilter('INCORRECT'); setReviewQuestionIdx(0); }}
                className={`px-3 py-1 rounded-full border cursor-pointer transition-colors ${
                  reviewFilter === 'INCORRECT'
                    ? 'bg-rose-950/60 text-rose-300 border-rose-700 font-bold'
                    : 'bg-[#151515] text-[#A8A8A8] border-white/[0.08]'
                }`}
              >
                Incorrect ({activeQuestions.length - currentResult.correctAnswers})
              </button>
              <button
                onClick={() => { setReviewFilter('FLAGGED'); setReviewQuestionIdx(0); }}
                className={`px-3 py-1 rounded-full border cursor-pointer transition-colors ${
                  reviewFilter === 'FLAGGED'
                    ? 'bg-amber-950/60 text-amber-300 border-amber-700 font-bold'
                    : 'bg-[#151515] text-[#A8A8A8] border-white/[0.08]'
                }`}
              >
                Flagged ({currentResult.questionResults.filter(r => r.flagged).length})
              </button>
            </div>
          </div>

          {/* Review Question Navigator */}
          {filteredReviewQuestions.length > 0 ? (
            <div className="p-6 sm:p-8 rounded-3xl glass-panel-deep space-y-6">
              
              {/* Top Selector Bar */}
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold font-sans uppercase flex items-center gap-1 ${
                    activeReviewResult?.isCorrect
                      ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-700/60'
                      : 'bg-rose-950/60 text-rose-300 border border-rose-700/60'
                  }`}>
                    {activeReviewResult?.isCorrect ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                    {activeReviewResult?.isCorrect ? 'Correct' : 'Incorrect Choice'}
                  </span>

                  <span className="badge-navy text-xs font-sans uppercase px-3 py-0.5 rounded-full font-bold">
                    {activeReviewQuestion.category || activeReviewQuestion.type}
                  </span>

                  <span className="text-xs font-sans text-[#A8A8A8]">
                    Review Item {reviewQuestionIdx + 1} of {filteredReviewQuestions.length}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setReviewQuestionIdx(prev => Math.max(0, prev - 1))}
                    disabled={reviewQuestionIdx === 0}
                    className="btn-secondary px-3 py-1 text-xs rounded-full disabled:opacity-30 cursor-pointer"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setReviewQuestionIdx(prev => Math.min(filteredReviewQuestions.length - 1, prev + 1))}
                    disabled={reviewQuestionIdx === filteredReviewQuestions.length - 1}
                    className="btn-secondary px-3 py-1 text-xs rounded-full disabled:opacity-30 cursor-pointer"
                  >
                    Next
                  </button>
                </div>
              </div>

              {/* Title & Concept */}
              <div className="space-y-2">
                <h3 className="text-lg sm:text-xl font-sans font-bold text-[#F2F2F2]">
                  {activeReviewQuestion.title}
                </h3>
                {activeReviewQuestion.scenario && (
                  <div className="p-3.5 rounded-xl lexa-surface-subtle text-xs font-sans text-[#A8A8A8]">
                    <strong className="text-[#F2F2F2]">Context:</strong> {activeReviewQuestion.scenario}
                  </div>
                )}
              </div>

              {/* Prompt */}
              <div className="p-4 rounded-xl bg-[#151515]/70 border border-white/[0.08] text-sm font-sans font-bold text-[#F2F2F2]">
                {activeReviewQuestion.promptEn}
              </div>

              {/* Options Review */}
              <div className="space-y-2.5">
                {activeReviewQuestion.options.map((opt, idx) => {
                  const isUserChoice = activeReviewResult?.selectedOption === idx;
                  const isCorrectChoice = idx === activeReviewQuestion.correctIndex;

                  return (
                    <div
                      key={idx}
                      className={`p-3.5 rounded-xl border text-xs sm:text-sm font-sans flex items-center justify-between ${
                        isCorrectChoice
                          ? 'bg-white/10 border-white/30 text-white font-semibold'
                          : isUserChoice && !isCorrectChoice
                            ? 'bg-rose-950/40 border-rose-700 text-rose-300'
                            : 'lexa-surface-subtle text-[#A8A8A8] opacity-70'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center font-sans text-xs font-bold shrink-0">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{opt}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        {isCorrectChoice && (
                          <span className="text-[11px] font-bold text-white flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4" /> Correct Answer
                          </span>
                        )}
                        {isUserChoice && !isCorrectChoice && (
                          <span className="text-[11px] font-bold text-rose-300 flex items-center gap-1">
                            <XCircle className="w-4 h-4" /> Your Choice
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bilingual Explanation */}
              <div className="p-5 rounded-2xl bg-[#151515]/90 border border-white/[0.12] space-y-3">
                <div className="text-xs font-sans font-bold uppercase tracking-wider text-white flex items-center justify-between">
                  <span>Pedagogical Analysis & Civil Law Contrast</span>
                  {activeReviewQuestion.indonesianEquivalent && (
                    <span className="text-white">
                      Padanan Baku: <strong>{activeReviewQuestion.indonesianEquivalent}</strong>
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm font-sans text-[#F2F2F2] leading-relaxed">
                  {activeReviewQuestion.explanationEn}
                </p>

                {activeReviewQuestion.explanationId && (
                  <div className="pt-2 border-t border-white/[0.08]">
                    <p className="text-xs font-sans italic text-[#A8A8A8]">
                      <strong className="text-[#F2F2F2] font-semibold">Penjelasan Bahasa Indonesia:</strong> {activeReviewQuestion.explanationId}
                    </p>
                  </div>
                )}

                {activeReviewQuestion.relatedTermId && (
                  <div className="pt-2">
                    <button
                      onClick={() => setActiveLookupTermId(activeReviewQuestion.relatedTermId!)}
                      className="text-xs font-sans text-[#DCDCDC] font-semibold hover:text-white hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      Inspect Term &ldquo;{activeReviewQuestion.relatedTermId}&rdquo; in Detail Dictionary <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>

            </div>
          ) : (
            <div className="p-8 rounded-3xl glass-panel-deep text-center text-xs text-[#A8A8A8]">
              No questions matched the current review filter.
            </div>
          )}
        </div>

      </div>
    );
  }

  return null;
};
