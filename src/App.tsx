/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
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
  const { selectedTab } = useStudy();

  return (
    <div className="min-h-screen flex flex-col bg-[#0B1220] text-[#F5F3EE] selection:bg-[#E8D9B5] selection:text-[#0B1220] font-sans antialiased relative overflow-x-hidden">
      {/* Subtle deep academic background ambient lighting */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        {/* Soft gold ambient lighting in upper corner */}
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-[#C9A45C]/[0.03] blur-[100px]" />
        {/* Deep navy subtle glow */}
        <div className="absolute top-1/3 -left-32 w-[500px] h-[500px] rounded-full bg-[#172235]/50 blur-[120px]" />
      </div>

      <Navbar />

      <main className="flex-1 relative z-10">
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
