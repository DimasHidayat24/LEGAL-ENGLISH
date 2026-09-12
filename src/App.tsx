/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { StudyProvider, useStudy } from './context/StudyContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { CurriculumView } from './components/CurriculumView';
import { DocumentReader } from './components/DocumentReader';
import { VocabularyDictionary } from './components/VocabularyDictionary';
import { ComparativeLawSection } from './components/ComparativeLawSection';
import { PracticeSection } from './components/PracticeSection';
import { WritingLab } from './components/WritingLab';
import { InsightsView } from './components/InsightsView';
import { MyStudyDashboard } from './components/MyStudyDashboard';
import { TermDetailModal } from './components/TermDetailModal';
import { GlobalSearchModal } from './components/GlobalSearchModal';

const AppContent: React.FC = () => {
  const { selectedTab, theme, setIsSearchOpen, setActiveLookupTermId } = useStudy();

  // Instant scroll-to-top on tab switch for smooth navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [selectedTab]);

  // Global keyboard shortcuts (CMD+K / Ctrl+K for search, Escape to close modals)
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
    <div className={`min-h-screen flex flex-col font-sans antialiased relative overflow-x-hidden transition-colors duration-300 ${
      theme === 'light'
        ? 'bg-[#F4F7FB] text-[#0F1D30] selection:bg-[#2B62A3]/25 selection:text-[#0F1D30]'
        : 'bg-[#050B16] text-[#F3F5F7] selection:bg-[#4F83B8]/40 selection:text-[#FFFFFF]'
    }`}>
      {/* Hardware-accelerated Apple Liquid Glass ambient refractive lighting (zero scroll GPU overhead) */}
      <div className="ambient-canvas-bg" aria-hidden="true" />

      <Navbar />

      <main className="flex-1 relative z-10 pt-24 sm:pt-28">
        {selectedTab === 'home' && <HeroSection />}
        {selectedTab === 'learn' && <CurriculumView />}
        {selectedTab === 'documents' && <DocumentReader />}
        {selectedTab === 'vocabulary' && <VocabularyDictionary />}
        {selectedTab === 'comparative' && <ComparativeLawSection />}
        {selectedTab === 'practice' && <PracticeSection />}
        {selectedTab === 'write' && <WritingLab />}
        {selectedTab === 'insights' && <InsightsView />}
        {selectedTab === 'mystudy' && <MyStudyDashboard />}
      </main>

      <Footer />

      {/* Global Modals */}
      <TermDetailModal />
      <GlobalSearchModal />
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
