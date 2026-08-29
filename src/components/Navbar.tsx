import React from 'react';
import { useStudy } from '../context/StudyContext';
import { Search, Bookmark } from 'lucide-react';
import { LexaLogo } from './LexaLogo';

export const Navbar: React.FC = () => {
  const { 
    selectedTab, 
    setSelectedTab, 
    languageMode, 
    savedTerms, 
    setIsSearchOpen,
    setActiveDocId,
    setActiveLessonId
  } = useStudy();

  const navItems = [
    { id: 'home', label: 'Home', labelId: 'Beranda' },
    { id: 'learn', label: 'Learn', labelId: 'Kurikulum' },
    { id: 'documents', label: 'Documents', labelId: 'Dokumen' },
    { id: 'vocabulary', label: 'Vocabulary', labelId: 'Kamus' },
    { id: 'comparative', label: 'Same Concept', labelId: 'Komparasi Hukum' },
    { id: 'practice', label: 'Practice', labelId: 'Latihan' },
    { id: 'write', label: 'Write', labelId: 'Drafting' },
    { id: 'insights', label: 'Insights', labelId: 'Artikel' },
    { id: 'mystudy', label: 'My Study', labelId: 'Studi Saya' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0B1220] border-b border-[#26344A] transition-colors">
      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Identity */}
          <button
            onClick={() => {
              setSelectedTab('home');
              setActiveDocId(null);
              setActiveLessonId(null);
            }}
            className="flex items-center gap-3 text-left group cursor-pointer"
          >
            <div className="relative flex items-center justify-center p-1 bg-[#111A2B] border border-[#26344A] rounded-xs group-hover:border-[#C9A45C]/50 transition-all">
              <LexaLogo className="w-8 h-8 sm:w-8.5 sm:h-8.5" size={34} variant="colored" />
            </div>
            <div>
              <span className="font-sans font-extrabold text-xl tracking-tight text-[#F5F3EE] group-hover:text-[#E8D9B5] transition-colors block leading-none">
                LEXA
              </span>
              <span className="text-[10px] font-sans font-semibold tracking-[0.05em] text-[#AAB4C3] uppercase block mt-0.5">
                Legal English Platform
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1 p-1 bg-[#111A2B] border border-[#26344A] rounded-xs">
            {navItems.map((item) => {
              const isActive = selectedTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setSelectedTab(item.id);
                  }}
                  className={`px-3 py-1.5 text-xs font-sans transition-all relative cursor-pointer rounded-xs ${
                    isActive
                      ? 'text-[#F5F3EE] font-bold bg-[#172235] border border-[#C9A45C]/40 shadow-xs'
                      : 'text-[#AAB4C3] font-medium hover:text-[#E8D9B5] hover:bg-[#172235]/60'
                  }`}
                >
                  {/* Subtle gold indicator dot for active item */}
                  {isActive && (
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#C9A45C] mr-1.5 align-middle" />
                  )}
                  {languageMode === 'ID' ? item.labelId : item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Tools */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Global Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-sans font-medium text-[#AAB4C3] bg-[#111A2B] border border-[#26344A] hover:border-[#C9A45C]/60 hover:text-[#F5F3EE] transition-all cursor-pointer rounded-xs"
              title="Search legal terms (⌘K)"
            >
              <Search className="w-3.5 h-3.5 text-[#AAB4C3]" />
              <span className="hidden sm:inline">Search...</span>
              <kbd className="hidden sm:inline text-[10px] bg-[#172235] px-1.5 py-0.5 border border-[#26344A] text-[#AAB4C3] font-sans font-semibold rounded-xs">
                ⌘K
              </kbd>
            </button>

            {/* Saved Vocab Quick Jump */}
            <button
              onClick={() => setSelectedTab('mystudy')}
              className="p-2 text-[#AAB4C3] hover:text-[#F5F3EE] bg-[#111A2B] border border-[#26344A] hover:border-[#C9A45C]/50 relative cursor-pointer rounded-xs transition-all"
              title="View My Saved Vocabulary"
            >
              <Bookmark className="w-4 h-4" />
              {savedTerms.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#C9A45C] text-[#0B1220] text-[9px] font-sans font-extrabold flex items-center justify-center rounded-full shadow-xs">
                  {savedTerms.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Nav Overflow */}
        <div className="lg:hidden flex items-center gap-1 py-2 border-t border-[#26344A] overflow-x-auto no-scrollbar text-xs font-sans">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedTab(item.id)}
              className={`px-2.5 py-1 whitespace-nowrap cursor-pointer rounded-xs transition-all ${
                selectedTab === item.id
                  ? 'bg-[#C9A45C] text-[#0B1220] font-bold shadow-xs'
                  : 'text-[#AAB4C3] font-medium bg-[#111A2B] border border-[#26344A] hover:text-[#E8D9B5]'
              }`}
            >
              {languageMode === 'ID' ? item.labelId : item.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};
