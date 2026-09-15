import { ExerciseCategory, ExerciseDifficulty, ExerciseItem } from '../../types';
import { draftingQuestions } from './draftingQuestions';
import { translationQuestions } from './translationQuestions';
import { vocabularyQuestions } from './vocabularyQuestions';
import { contextQuestions } from './contextQuestions';
import { readingQuestions } from './readingQuestions';

export {
  draftingQuestions,
  translationQuestions,
  vocabularyQuestions,
  contextQuestions,
  readingQuestions
};

export const allPracticeExercises: ExerciseItem[] = [
  ...draftingQuestions,
  ...translationQuestions,
  ...vocabularyQuestions,
  ...contextQuestions,
  ...readingQuestions
];

export const practiceBankMetadata = {
  totalQuestions: allPracticeExercises.length,
  byCategory: {
    drafting: draftingQuestions.length,
    translation: translationQuestions.length,
    vocabulary: vocabularyQuestions.length,
    context: contextQuestions.length,
    reading: readingQuestions.length
  },
  byDifficulty: {
    Foundation: allPracticeExercises.filter(q => q.difficulty === 'Foundation').length,
    Intermediate: allPracticeExercises.filter(q => q.difficulty === 'Intermediate').length,
    Advanced: allPracticeExercises.filter(q => q.difficulty === 'Advanced').length
  }
};

/**
 * Filter exercises by category and difficulty
 */
export function filterExercises(
  category?: ExerciseCategory | 'all',
  difficulty?: ExerciseDifficulty | 'all',
  searchQuery?: string
): ExerciseItem[] {
  return allPracticeExercises.filter(ex => {
    // Category match
    if (category && category !== 'all') {
      if (ex.category !== category && ex.type !== category) {
        return false;
      }
    }

    // Difficulty match
    if (difficulty && difficulty !== 'all') {
      if (ex.difficulty !== difficulty) {
        return false;
      }
    }

    // Search query match
    if (searchQuery && searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase().trim();
      const matchTitle = ex.title?.toLowerCase().includes(q);
      const matchPromptEn = ex.promptEn?.toLowerCase().includes(q);
      const matchPromptId = ex.promptId?.toLowerCase().includes(q);
      const matchLegalConcept = ex.legalConcept?.toLowerCase().includes(q);
      const matchIndonesian = ex.indonesianEquivalent?.toLowerCase().includes(q);
      const matchScenario = ex.scenario?.toLowerCase().includes(q);
      const matchPassage = ex.passage?.toLowerCase().includes(q);

      if (!matchTitle && !matchPromptEn && !matchPromptId && !matchLegalConcept && !matchIndonesian && !matchScenario && !matchPassage) {
        return false;
      }
    }

    return true;
  });
}

/**
 * Generate a dynamic randomized practice session
 */
export function getRandomSessionQuestions(
  count: number = 10,
  category?: ExerciseCategory | 'all',
  difficulty?: ExerciseDifficulty | 'all'
): ExerciseItem[] {
  const pool = filterExercises(category, difficulty);
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
