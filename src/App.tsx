/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense, lazy, useEffect } from 'react';
import { StudyProvider, useStudy } from './context/StudyContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';

// Heavy sections are code-split so the first paint only ships the shell + home page.
const CurriculumView = lazy(() => import('./components/CurriculumView').then((m) => ({ default: m.CurriculumView })));
const DocumentReader = lazy(() => import('./components/DocumentReader').then((m) => ({ default: m.DocumentReader })));
const VocabularyDictionary = lazy(() => import('./components/VocabularyDictionary').then((m) => ({ default: m.VocabularyDictionary })));
const ComparativeLawSection = lazy(() => import('./components/ComparativeLawSection').then((m) => ({ default: m.ComparativeLawSection })));
const PracticeSection = lazy(() => import('./components/PracticeSection').then((m) => ({ default: m.PracticeSection })));
const WritingLab = lazy(() => import('./components/WritingLab').then((m) => ({ default: m.WritingLab })));
const InsightsView = lazy(() => import('./components/InsightsView').then((m) => ({ default: m.InsightsView })));
const MyStudyDashboard = lazy(() => import('./components/MyStudyDashboard').then((m) => ({ default: m.MyStudyDashboard })));
const TermDetailModal = lazy(() => import('./components/TermDetailModal').then((m) => ({ default: m.TermDetailModal })));
const GlobalSearchModal = lazy(() => import('./components/GlobalSearchModal').then((m) => ({ default: m.GlobalSearchModal })));

const SectionFallback: React.FC = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" role="status" aria-live="polite">
    <div className="h-8 w-64 rounded-lg bg-surface-2 animate-pulse" />
    <div className="mt-4 h-4 w-96 max-w-full rounded bg-surface-2 animate-pulse" />
    <span className="sr-only">Loading…</span>
  </div>
);

const AppContent: React.FC = () => {
  const { selectedTab, isSearchOpen, activeLookupTermId, setIsSearchOpen, setActiveLookupTermId } = useStudy();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [selectedTab]);

  // Global keyboard shortcuts (⌘K / Ctrl+K for search, Escape to close modals)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev: boolean) => !prev);
      } else if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setActiveLookupTermId(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsSearchOpen, setActiveLookupTermId]);

  return (
    <div className="min-h-screen flex flex-col font-sans antialiased relative overflow-x-clip bg-bg text-ink">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[70] btn-primary px-4 py-2 text-sm">
        Skip to content
      </a>
      <Navbar />

      {/* Nav is sticky and in flow, so pages only need breathing room (home hero handles its own) */}
      <main id="main" className={`flex-1 relative z-10 ${selectedTab === 'home' ? '' : 'pt-8 sm:pt-12 pb-16'}`}>
        <Suspense fallback={<SectionFallback />}>
          {selectedTab === 'home' && <HeroSection />}
          {selectedTab === 'learn' && <CurriculumView />}
          {selectedTab === 'documents' && <DocumentReader />}
          {selectedTab === 'vocabulary' && <VocabularyDictionary />}
          {selectedTab === 'comparative' && <ComparativeLawSection />}
          {selectedTab === 'practice' && <PracticeSection />}
          {selectedTab === 'write' && <WritingLab />}
          {selectedTab === 'insights' && <InsightsView />}
          {selectedTab === 'mystudy' && <MyStudyDashboard />}
        </Suspense>
      </main>

      <Footer />

      <Suspense fallback={null}>
        {activeLookupTermId && <TermDetailModal />}
        {isSearchOpen && <GlobalSearchModal />}
      </Suspense>
    </div>
  );
};

export default function App() {
  return (
    <StudyProvider>
      <AppContent />
    </StudyProvider>
  );
}
