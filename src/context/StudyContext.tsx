import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { LanguageMode, ThemeMode, SavedTermRecord, UserStudyState } from '../types';
import { legalVocabularyList } from '../data/vocabularyData';

interface StudyContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  languageMode: LanguageMode;
  setLanguageMode: (mode: LanguageMode) => void;
  toggleLanguageMode: () => void;
  savedTerms: SavedTermRecord[];
  isTermSaved: (termId: string) => boolean;
  saveTerm: (termId: string, personalNote?: string, sourceDocId?: string) => void;
  removeSavedTerm: (termId: string) => void;
  updateTermNote: (termId: string, note: string) => void;
  bookmarkedParagraphs: { docId: string; paragraphId: string; timestamp: string }[];
  isParagraphBookmarked: (docId: string, paragraphId: string) => boolean;
  toggleBookmarkParagraph: (docId: string, paragraphId: string) => void;
  completedLessons: string[];
  markLessonComplete: (lessonId: string) => void;
  completedDocuments: string[];
  markDocumentComplete: (docId: string) => void;
  exerciseScores: { [exerciseId: string]: { score: number; date: string } };
  recordExerciseScore: (exerciseId: string, score: number) => void;
  personalNotes: { [key: string]: string };
  saveNote: (key: string, content: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  activeLookupTermId: string | null;
  setActiveLookupTermId: (termId: string | null) => void;
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
  activeDocId: string | null;
  setActiveDocId: (docId: string | null) => void;
  activeLessonId: string | null;
  setActiveLessonId: (lessonId: string | null) => void;
  activeArticleId: string | null;
  setActiveArticleId: (articleId: string | null) => void;
}

const STORAGE_KEY = 'lexa_study_state_v1';
const THEME_STORAGE_KEY = 'lexa_theme_mode';

const initialStudyState: UserStudyState = {
  savedTerms: [
    { termId: 'hereby', dateSaved: '2024-10-18', personalNote: 'Penting untuk klausul pembuka operatif akta dan kontrak jual beli.' },
    { termId: 'notwithstanding', dateSaved: '2024-10-19', personalNote: 'Klausul subordinasi: mengesampingkan pasal lain yang berlawanan.' },
    { termId: 'indemnity', dateSaved: '2024-10-20', personalNote: 'Beda dengan damages biasa: ditagih sebagai utang independen.' },
    { termId: 'pacta-sunt-servanda', dateSaved: '2024-10-21', personalNote: 'Asas kepastian kontrak (Pasal 1338 ayat 1 KUHPerdata).' }
  ],
  bookmarkedParagraphs: [
    { docId: 'doc-cross-border-sales', paragraphId: 'p-6', timestamp: '2024-10-22' }
  ],
  completedLessons: ['lesson-pronominal-connectors'],
  completedDocuments: ['doc-cross-border-sales'],
  exerciseScores: {
    'ex-1': { score: 100, date: '2024-10-22' },
    'ex-2': { score: 100, date: '2024-10-22' }
  },
  personalNotes: {
    'doc-cross-border-sales-p-6': 'Perhatikan pembagian risiko klaim paten pihak ketiga (IP indemnity) pada Pasal 11.1.'
  }
};

const StudyContext = createContext<StudyContextType | undefined>(undefined);

export const StudyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      if (stored === 'light' || stored === 'dark') {
        return stored;
      }
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        return 'light';
      }
    } catch (e) {
      console.warn('Failed to load theme preference:', e);
    }
    return 'dark';
  });

  const [languageMode, setLanguageMode] = useState<LanguageMode>('EN');
  const [studyState, setStudyState] = useState<UserStudyState>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Failed to load local storage state:', e);
    }
    return initialStudyState;
  });

  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [activeLookupTermId, setActiveLookupTermId] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState<string>('home');
  const [activeDocId, setActiveDocId] = useState<string | null>(null);
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [activeArticleId, setActiveArticleId] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(studyState));
    } catch (e) {
      console.warn('Failed to save study state:', e);
    }
  }, [studyState]);

  // Synchronize theme with document and localStorage
  useEffect(() => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch (e) {
      console.warn('Failed to save theme preference:', e);
    }

    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
    } else {
      root.classList.add('dark');
      root.classList.remove('light');
      root.setAttribute('data-theme', 'dark');
    }
  }, [theme]);

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    setThemeState(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Keyboard shortcut for search (⌘K or Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleLanguageMode = () => {
    setLanguageMode(prev => prev === 'EN' ? 'ID' : 'EN');
  };

  const isTermSaved = (termId: string) => {
    return studyState.savedTerms.some(st => st.termId === termId);
  };

  const saveTerm = (termId: string, personalNote?: string, sourceDocId?: string) => {
    if (isTermSaved(termId)) return;
    const newRecord: SavedTermRecord = {
      termId,
      dateSaved: new Date().toISOString().split('T')[0],
      personalNote,
      sourceDocId
    };
    setStudyState(prev => ({
      ...prev,
      savedTerms: [newRecord, ...prev.savedTerms]
    }));
  };

  const removeSavedTerm = (termId: string) => {
    setStudyState(prev => ({
      ...prev,
      savedTerms: prev.savedTerms.filter(st => st.termId !== termId)
    }));
  };

  const updateTermNote = (termId: string, note: string) => {
    setStudyState(prev => ({
      ...prev,
      savedTerms: prev.savedTerms.map(st => st.termId === termId ? { ...st, personalNote: note } : st)
    }));
  };

  const isParagraphBookmarked = (docId: string, paragraphId: string) => {
    return studyState.bookmarkedParagraphs.some(b => b.docId === docId && b.paragraphId === paragraphId);
  };

  const toggleBookmarkParagraph = (docId: string, paragraphId: string) => {
    setStudyState(prev => {
      const exists = prev.bookmarkedParagraphs.some(b => b.docId === docId && b.paragraphId === paragraphId);
      if (exists) {
        return {
          ...prev,
          bookmarkedParagraphs: prev.bookmarkedParagraphs.filter(b => !(b.docId === docId && b.paragraphId === paragraphId))
        };
      } else {
        return {
          ...prev,
          bookmarkedParagraphs: [...prev.bookmarkedParagraphs, { docId, paragraphId, timestamp: new Date().toISOString().split('T')[0] }]
        };
      }
    });
  };

  const markLessonComplete = (lessonId: string) => {
    setStudyState(prev => {
      if (prev.completedLessons.includes(lessonId)) return prev;
      return {
        ...prev,
        completedLessons: [...prev.completedLessons, lessonId]
      };
    });
  };

  const markDocumentComplete = (docId: string) => {
    setStudyState(prev => {
      if (prev.completedDocuments.includes(docId)) return prev;
      return {
        ...prev,
        completedDocuments: [...prev.completedDocuments, docId]
      };
    });
  };

  const recordExerciseScore = (exerciseId: string, score: number) => {
    setStudyState(prev => ({
      ...prev,
      exerciseScores: {
        ...prev.exerciseScores,
        [exerciseId]: { score, date: new Date().toISOString().split('T')[0] }
      }
    }));
  };

  const saveNote = (key: string, content: string) => {
    setStudyState(prev => ({
      ...prev,
      personalNotes: {
        ...prev.personalNotes,
        [key]: content
      }
    }));
  };

  return (
    <StudyContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
        languageMode,
        setLanguageMode,
        toggleLanguageMode,
        savedTerms: studyState.savedTerms,
        isTermSaved,
        saveTerm,
        removeSavedTerm,
        updateTermNote,
        bookmarkedParagraphs: studyState.bookmarkedParagraphs,
        isParagraphBookmarked,
        toggleBookmarkParagraph,
        completedLessons: studyState.completedLessons,
        markLessonComplete,
        completedDocuments: studyState.completedDocuments,
        markDocumentComplete,
        exerciseScores: studyState.exerciseScores,
        recordExerciseScore,
        personalNotes: studyState.personalNotes,
        saveNote,
        isSearchOpen,
        setIsSearchOpen,
        activeLookupTermId,
        setActiveLookupTermId,
        selectedTab,
        setSelectedTab,
        activeDocId,
        setActiveDocId,
        activeLessonId,
        setActiveLessonId,
        activeArticleId,
        setActiveArticleId
      }}
    >
      {children}
    </StudyContext.Provider>
  );
};

export const useStudy = () => {
  const context = useContext(StudyContext);
  if (!context) {
    throw new Error('useStudy must be used within a StudyProvider');
  }
  return context;
};
