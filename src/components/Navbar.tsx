import React, { useState, useEffect, useRef } from 'react';
import { useStudy } from '../context/StudyContext';
import { 
  Bookmark, 
  Menu, 
  X, 
  BookOpen, 
  FileText, 
  BookMarked, 
  Sparkles, 
  PenTool, 
  Compass, 
  GraduationCap, 
  Home as HomeIcon,
  ChevronRight,
  MoreHorizontal,
  Sun,
  Moon
} from 'lucide-react';
import { LexaLogo } from './LexaLogo';

export const Navbar: React.FC = () => {
  const { 
    theme,
    toggleTheme,
    selectedTab, 
    setSelectedTab, 
    languageMode, 
    savedTerms, 
    setActiveDocId,
    setActiveLessonId
  } = useStudy();

  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSectionName, setActiveSectionName] = useState<string>('Home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [tabletMoreOpen, setTabletMoreOpen] = useState(false);
  const tabletMoreRef = useRef<HTMLDivElement>(null);

  // Close tablet More dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tabletMoreRef.current && !tabletMoreRef.current.contains(event.target as Node)) {
        setTabletMoreOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 1. Passive scroll listener for threshold detection with hysteresis
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          
          // Apply hysteresis: compact at > 60px, expand at < 30px
          setIsScrolled((prev) => {
            if (!prev && scrollY > 60) return true;
            if (prev && scrollY < 30) return false;
            return prev;
          });

          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. Section detection for Contextual Navigation
  useEffect(() => {
    if (selectedTab !== 'home') {
      const tabNameMap: Record<string, { EN: string; ID: string }> = {
        learn: { EN: 'Learn', ID: 'Kurikulum' },
        documents: { EN: 'Documents', ID: 'Dokumen' },
        vocabulary: { EN: 'Vocabulary', ID: 'Kamus' },
        comparative: { EN: 'Same Concept', ID: 'Komparasi' },
        practice: { EN: 'Practice', ID: 'Latihan' },
        write: { EN: 'Write', ID: 'Drafting' },
        insights: { EN: 'Insights', ID: 'Artikel' },
        mystudy: { EN: 'My Study', ID: 'Studi Saya' },
      };
      const label = tabNameMap[selectedTab];
      setActiveSectionName(label ? (languageMode === 'ID' ? label.ID : label.EN) : 'Study');
      return;
    }

    // When on Home tab, observe home sub-sections with IntersectionObserver
    const sectionConfig = [
      { id: 'hero-banner', label: languageMode === 'ID' ? 'Beranda' : 'Home' },
      { id: 'section-learn-preview', label: languageMode === 'ID' ? 'Kurikulum' : 'Learn' },
      { id: 'section-comparative-preview', label: languageMode === 'ID' ? 'Same Concept' : 'Same Concept' },
      { id: 'section-documents-preview', label: languageMode === 'ID' ? 'Dokumen' : 'Documents' },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((e) => e.isIntersecting);
        if (visibleEntries.length > 0) {
          visibleEntries.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
          const topVisibleId = visibleEntries[0].target.id;
          const match = sectionConfig.find((s) => s.id === topVisibleId);
          if (match) {
            setActiveSectionName(match.label);
          }
        }
      },
      {
        root: null,
        rootMargin: '-10% 0px -50% 0px',
        threshold: [0.1, 0.3, 0.6],
      }
    );

    sectionConfig.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [selectedTab, languageMode]);

  // Primary navigation items for tablet (first 5) and desktop (all 8)
  const navItems = [
    { id: 'home', label: 'Home', labelId: 'Beranda', icon: HomeIcon },
    { id: 'learn', label: 'Learn', labelId: 'Kurikulum', icon: GraduationCap },
    { id: 'documents', label: 'Documents', labelId: 'Dokumen', icon: FileText },
    { id: 'vocabulary', label: 'Vocabulary', labelId: 'Kamus', icon: BookMarked },
    { id: 'comparative', label: 'Same Concept', labelId: 'Komparasi', icon: Sparkles },
    { id: 'practice', label: 'Practice', labelId: 'Latihan', icon: BookOpen },
    { id: 'write', label: 'Write', labelId: 'Drafting', icon: PenTool },
    { id: 'insights', label: 'Insights', labelId: 'Artikel', icon: Compass },
  ];

  // Primary items prioritized on tablet single-row capsule (no wrapping)
  const tabletPrimaryItems = navItems.filter(item => 
    ['home', 'learn', 'documents', 'vocabulary', 'practice'].includes(item.id)
  );

  // Secondary items placed under the tablet "More" dropdown
  const tabletMoreItems = navItems.filter(item => 
    ['comparative', 'write', 'insights'].includes(item.id)
  );

  const isMoreItemActive = tabletMoreItems.some(item => item.id === selectedTab);

  const handleNavSelect = (tabId: string) => {
    setSelectedTab(tabId);
    if (tabId === 'home') {
      setActiveDocId(null);
      setActiveLessonId(null);
    }
    setMobileMenuOpen(false);
    setTabletMoreOpen(false);
  };

  return (
    <>
      {/* =========================================================================
          DESKTOP & TABLET / IPAD NAVIGATION (Centered Floating Capsule / Pill)
          - Active for md (768px) and above
          - NEVER a full-width header or modal overlay
          - Detached floating glass capsule sitting above the hero
          - Single row capsule: no wrapping
          - Scroll morphs smoothly into [ LA LEXA · Current Section | My Study ]
      ========================================================================= */}
      <header className="hidden md:flex fixed top-4 lg:top-5 left-1/2 -translate-x-1/2 z-50 pointer-events-none justify-center w-max max-w-[calc(100vw-32px)]">
        <div
          onClick={() => {
            if (isScrolled) {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          className={`pointer-events-auto rounded-full flex items-center transition-all select-none border ${
            isScrolled ? 'cursor-pointer' : ''
          }`}
          style={{
            backgroundColor: theme === 'dark' 
              ? (isScrolled ? 'rgba(8, 18, 32, 0.82)' : 'rgba(8, 18, 32, 0.65)')
              : (isScrolled ? 'rgba(255, 255, 255, 0.90)' : 'rgba(255, 255, 255, 0.78)'),
            backdropFilter: 'blur(20px) saturate(145%)',
            WebkitBackdropFilter: 'blur(20px) saturate(145%)',
            boxShadow: theme === 'dark'
              ? '0 10px 35px rgba(0, 0, 0, 0.22), inset 0 1px 0 rgba(255, 255, 255, 0.06)'
              : '0 10px 30px rgba(15, 29, 48, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
            borderColor: theme === 'dark' ? 'rgba(120, 170, 220, 0.18)' : 'rgba(180, 205, 235, 0.55)',
            height: isScrolled ? '44px' : '50px',
            paddingLeft: '8px',
            paddingRight: '8px',
            gap: '6px',
            transition: 'all 400ms cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          {/* Brand Identity / Context Indicator */}
          <div 
            onClick={(e) => {
              if (!isScrolled) {
                e.stopPropagation();
                handleNavSelect('home');
              }
            }}
            className={`flex items-center gap-2 px-2 py-1 rounded-full cursor-pointer transition-colors shrink-0 ${
              theme === 'dark' ? 'hover:bg-[rgba(255,255,255,0.04)]' : 'hover:bg-[rgba(15,29,48,0.04)]'
            }`}
          >
            <div className={`w-[28px] h-[28px] lg:w-[30px] lg:h-[30px] rounded-full flex items-center justify-center p-0.5 shrink-0 shadow-2xs border ${
              theme === 'dark' 
                ? 'bg-[rgba(17,34,57,0.7)] border-[rgba(80,130,190,0.25)]' 
                : 'bg-[rgba(235,243,252,0.9)] border-[rgba(150,185,225,0.5)]'
            }`}>
              <LexaLogo className="w-[20px] h-[20px] lg:w-[22px] lg:h-[22px]" size={22} variant="colored" />
            </div>
            
            <div className="flex items-center">
              <span 
                className={`font-brand font-semibold italic text-[16.5px] lg:text-[17.5px] tracking-[0.01em] leading-none select-none ${
                  theme === 'dark' ? 'text-[#F3F5F7]' : 'text-[#0F1D30]'
                }`}
                style={{ fontFamily: "'Cormorant Garamond', 'Source Serif 4', Georgia, serif" }}
              >
                Lexa
              </span>

              {/* Contextual Section Label: Slides in smoothly when scrolled */}
              <div
                className="flex items-center overflow-hidden transition-all"
                style={{
                  maxWidth: isScrolled ? '240px' : '0px',
                  opacity: isScrolled ? 1 : 0,
                  transform: isScrolled ? 'translateX(0)' : 'translateX(-8px)',
                  transition: 'all 350ms cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              >
                <span className={`font-bold text-xs select-none mx-2 shrink-0 ${
                  theme === 'dark' ? 'text-[#64758A]' : 'text-[#8A9CAE]'
                }`}>·</span>
                <span 
                  key={activeSectionName}
                  className={`font-sans font-semibold text-[13px] truncate leading-none animate-in fade-in slide-in-from-bottom-1 duration-200 ${
                    theme === 'dark' ? 'text-[#A2C2E2]' : 'text-[#2B62A3]'
                  }`}
                >
                  {activeSectionName}
                </span>
              </div>
            </div>
          </div>

          {/* Center Navigation Links for Desktop (xl and up) - Shows all 8 items */}
          <nav
            className="hidden xl:flex items-center overflow-hidden transition-all"
            style={{
              maxWidth: isScrolled ? '0px' : '650px',
              opacity: isScrolled ? 0 : 1,
              transform: isScrolled ? 'scale(0.92) translateX(-10px)' : 'scale(1) translateX(0)',
              pointerEvents: isScrolled ? 'none' : 'auto',
              transition: 'all 380ms cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          >
            <div className={`flex items-center space-x-0.5 px-1 py-0.5 rounded-full border ${
              theme === 'dark'
                ? 'bg-[rgba(6,13,26,0.5)] border-[rgba(80,130,190,0.18)]'
                : 'bg-[rgba(238,244,251,0.75)] border-[rgba(180,205,235,0.45)]'
            }`}>
              {navItems.map((item) => {
                const isActive = selectedTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNavSelect(item.id);
                    }}
                    className={`px-2.5 lg:px-3 py-1 h-[32px] text-[12.5px] lg:text-[13px] font-sans transition-all cursor-pointer rounded-full flex items-center justify-center whitespace-nowrap ${
                      isActive
                        ? theme === 'dark'
                          ? 'text-[#F3F5F7] font-semibold bg-[rgba(19,43,70,0.7)] border border-[rgba(80,130,190,0.35)] shadow-[0_2px_6px_rgba(2,6,12,0.35)]'
                          : 'text-[#0F1D30] font-semibold bg-[#FFFFFF] border border-[rgba(180,205,235,0.6)] shadow-[0_2px_6px_rgba(15,29,48,0.08)]'
                        : theme === 'dark'
                          ? 'text-[#9BAABC] font-medium hover:text-[#F3F5F7] hover:bg-[rgba(17,34,57,0.4)]'
                          : 'text-[#4B6382] font-medium hover:text-[#0F1D30] hover:bg-[rgba(225,236,248,0.6)]'
                    }`}
                  >
                    {languageMode === 'ID' ? item.labelId : item.label}
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Center Navigation Links for Tablet / iPad (md to lg) - Shows primary 5 items + More dropdown (never wraps) */}
          <nav
            className="flex xl:hidden items-center overflow-visible transition-all"
            style={{
              maxWidth: isScrolled ? '0px' : '520px',
              opacity: isScrolled ? 0 : 1,
              transform: isScrolled ? 'scale(0.92) translateX(-10px)' : 'scale(1) translateX(0)',
              pointerEvents: isScrolled ? 'none' : 'auto',
              transition: 'all 380ms cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          >
            <div className={`flex items-center space-x-0.5 px-1 py-0.5 rounded-full border relative ${
              theme === 'dark'
                ? 'bg-[rgba(6,13,26,0.5)] border-[rgba(80,130,190,0.18)]'
                : 'bg-[rgba(238,244,251,0.75)] border-[rgba(180,205,235,0.45)]'
            }`} ref={tabletMoreRef}>
              {tabletPrimaryItems.map((item) => {
                const isActive = selectedTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNavSelect(item.id);
                    }}
                    className={`px-2.5 py-1 h-[30px] text-[12px] font-sans transition-all cursor-pointer rounded-full flex items-center justify-center whitespace-nowrap ${
                      isActive
                        ? theme === 'dark'
                          ? 'text-[#F3F5F7] font-semibold bg-[rgba(19,43,70,0.7)] border border-[rgba(80,130,190,0.35)] shadow-[0_2px_6px_rgba(2,6,12,0.35)]'
                          : 'text-[#0F1D30] font-semibold bg-[#FFFFFF] border border-[rgba(180,205,235,0.6)] shadow-[0_2px_6px_rgba(15,29,48,0.08)]'
                        : theme === 'dark'
                          ? 'text-[#9BAABC] font-medium hover:text-[#F3F5F7] hover:bg-[rgba(17,34,57,0.4)]'
                          : 'text-[#4B6382] font-medium hover:text-[#0F1D30] hover:bg-[rgba(225,236,248,0.6)]'
                    }`}
                  >
                    {languageMode === 'ID' ? item.labelId : item.label}
                  </button>
                );
              })}

              {/* Tablet More Dropdown Trigger */}
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setTabletMoreOpen(prev => !prev);
                  }}
                  className={`px-2 py-1 h-[30px] text-[12px] font-sans rounded-full flex items-center gap-1 cursor-pointer transition-all ${
                    isMoreItemActive || tabletMoreOpen
                      ? theme === 'dark'
                        ? 'text-[#F3F5F7] font-semibold bg-[rgba(19,43,70,0.7)] border border-[rgba(80,130,190,0.35)]'
                        : 'text-[#0F1D30] font-semibold bg-[#FFFFFF] border border-[rgba(180,205,235,0.6)]'
                      : theme === 'dark'
                        ? 'text-[#9BAABC] hover:text-[#F3F5F7] hover:bg-[rgba(17,34,57,0.4)]'
                        : 'text-[#4B6382] hover:text-[#0F1D30] hover:bg-[rgba(225,236,248,0.6)]'
                  }`}
                  title="More Navigation Options"
                >
                  <span>More</span>
                  <MoreHorizontal className="w-3.5 h-3.5" />
                </button>

                {/* Anchored Compact Dropdown Panel */}
                {tabletMoreOpen && (
                  <div className={`absolute top-[38px] right-0 z-50 w-44 backdrop-blur-2xl rounded-2xl p-1.5 space-y-0.5 animate-in fade-in zoom-in-95 duration-150 border ${
                    theme === 'dark'
                      ? 'bg-[rgba(11,20,36,0.96)] border-[rgba(80,130,190,0.3)] shadow-[0_12px_32px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.08)]'
                      : 'bg-[rgba(255,255,255,0.98)] border-[rgba(180,205,235,0.6)] shadow-[0_12px_32px_rgba(15,29,48,0.12),inset_0_1px_1px_rgba(255,255,255,0.9)]'
                  }`}>
                    {tabletMoreItems.map((item) => {
                      const isActive = selectedTab === item.id;
                      const IconComponent = item.icon;
                      return (
                        <button
                          key={item.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleNavSelect(item.id);
                          }}
                          className={`w-full px-3 py-2 text-left text-xs font-sans rounded-xl flex items-center justify-between cursor-pointer transition-all ${
                            isActive
                              ? theme === 'dark'
                                ? 'bg-[#132B46] text-white font-semibold'
                                : 'bg-[#E4EEF8] text-[#0F1D30] font-semibold'
                              : theme === 'dark'
                                ? 'text-[#9BAABC] hover:text-white hover:bg-[rgba(29,53,82,0.6)]'
                                : 'text-[#4B6382] hover:text-[#0F1D30] hover:bg-[rgba(235,243,252,0.8)]'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <IconComponent className={`w-3.5 h-3.5 ${
                              isActive 
                                ? (theme === 'dark' ? 'text-[#4F83B8]' : 'text-[#2B62A3]') 
                                : (theme === 'dark' ? 'text-[#64758A]' : 'text-[#8A9CAE]')
                            }`} />
                            <span>{languageMode === 'ID' ? item.labelId : item.label}</span>
                          </div>
                          {isActive && <ChevronRight className={`w-3 h-3 ${theme === 'dark' ? 'text-[#4F83B8]' : 'text-[#2B62A3]'}`} />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </nav>

          {/* Right Action: White / Dark Mode Symbol Option & My Study */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* White / Dark Mode Switch Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleTheme();
              }}
              aria-label={theme === 'dark' ? 'Switch to White mode (Light)' : 'Switch to Dark mode'}
              title={theme === 'dark' ? 'Switch to White mode (Light)' : 'Switch to Dark mode'}
              className={`w-[32px] lg:w-[34px] h-[32px] lg:h-[34px] rounded-full border transition-all cursor-pointer flex items-center justify-center shadow-2xs ${
                theme === 'dark'
                  ? 'bg-[rgba(17,34,57,0.55)] hover:bg-[rgba(29,53,82,0.65)] border-[rgba(80,130,190,0.25)] hover:border-[#4F83B8]/60 text-[#9BAABC] hover:text-[#FFD166]'
                  : 'bg-[rgba(235,243,252,0.85)] hover:bg-[rgba(220,234,248,0.95)] border-[rgba(150,185,225,0.45)] hover:border-[#2B62A3]/60 text-[#4B6382] hover:text-[#1D4E89]'
              }`}
            >
              {theme === 'dark' ? (
                <Sun className="w-3.5 h-3.5 text-[#E5A93C] transition-transform duration-300 hover:rotate-45" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-[#2B62A3] transition-transform duration-300 hover:-rotate-12" />
              )}
            </button>

            {/* My Study / Bookmark */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNavSelect('mystudy');
              }}
              className={`h-[32px] lg:h-[34px] px-2.5 lg:px-3 text-[12px] lg:text-[13px] font-sans rounded-full border transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs ${
                selectedTab === 'mystudy'
                  ? theme === 'dark'
                    ? 'bg-[#132B46] border-[#4F83B8] text-[#F3F5F7] font-semibold shadow-[0_2px_8px_rgba(79,131,184,0.2)]'
                    : 'bg-[#E4EEF8] border-[#2B62A3] text-[#0F1D30] font-semibold shadow-[0_2px_8px_rgba(43,98,163,0.15)]'
                  : theme === 'dark'
                    ? 'bg-[rgba(17,34,57,0.55)] hover:bg-[rgba(29,53,82,0.55)] border-[rgba(80,130,190,0.25)] hover:border-[#4F83B8]/60 text-[#9BAABC] hover:text-[#F3F5F7]'
                    : 'bg-[rgba(235,243,252,0.85)] hover:bg-[rgba(220,234,248,0.9)] border-[rgba(150,185,225,0.45)] hover:border-[#2B62A3]/60 text-[#4B6382] hover:text-[#0F1D30]'
              }`}
              title="View My Saved Vocabulary"
            >
              <Bookmark className={`w-3.5 h-3.5 ${theme === 'dark' ? 'text-[#4F83B8]' : 'text-[#2B62A3]'}`} />
              <span className="font-medium whitespace-nowrap">
                {isScrolled ? '' : 'My Study'}
              </span>
              {savedTerms.length > 0 && (
                <span className={`w-4 h-4 text-white text-[9px] font-sans font-bold flex items-center justify-center rounded-full ${
                  theme === 'dark'
                    ? 'bg-[#4F83B8] shadow-[0_0_6px_rgba(79,131,184,0.4)]'
                    : 'bg-[#2B62A3] shadow-[0_0_6px_rgba(43,98,163,0.3)]'
                }`}>
                  {savedTerms.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================================
          MOBILE NAVIGATION (< md / < 768px ONLY)
          - Single compact floating capsule
          - Morphs smoothly between full-width expanded state and medium floating navbar
          - Never shown on tablet or desktop
      ========================================================================= */}
      <header className="md:hidden fixed top-3 left-1/2 -translate-x-1/2 z-50 pointer-events-none flex justify-center w-full px-3">
        <div 
          onClick={() => {
            if (isScrolled) {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          className={`pointer-events-auto select-none rounded-full flex items-center transition-all border ${
            isScrolled ? 'cursor-pointer' : ''
          }`}
          style={{
            height: isScrolled ? '42px' : '46px',
            width: isScrolled ? 'clamp(240px, 68vw, 300px)' : 'min(93vw, 420px)',
            backgroundColor: theme === 'dark'
              ? (isScrolled ? 'rgba(15, 25, 42, 0.78)' : 'rgba(15, 25, 42, 0.60)')
              : (isScrolled ? 'rgba(255, 255, 255, 0.92)' : 'rgba(255, 255, 255, 0.82)'),
            backdropFilter: 'blur(18px) saturate(140%)',
            WebkitBackdropFilter: 'blur(18px) saturate(140%)',
            boxShadow: theme === 'dark'
              ? '0 8px 30px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.06)'
              : '0 8px 24px rgba(15,29,48,0.08), inset 0 1px 0 rgba(255,255,255,0.85)',
            borderColor: theme === 'dark' ? 'rgba(120, 170, 220, 0.18)' : 'rgba(180, 205, 235, 0.55)',
            paddingLeft: isScrolled ? '12px' : '14px',
            paddingRight: isScrolled ? '12px' : '10px',
            justifyContent: isScrolled ? 'center' : 'space-between',
            transition: 'all 400ms cubic-bezier(0.22, 1, 0.36, 1)'
          }}
        >
          {/* Brand & Contextual Title (Left / Center) */}
          <div className="flex items-center gap-2 overflow-hidden shrink-0">
            {/* Logo Mark */}
            <div 
              className={`rounded-full flex items-center justify-center p-0.5 shrink-0 shadow-2xs transition-all duration-300 border ${
                theme === 'dark'
                  ? 'bg-[rgba(17,34,57,0.75)] border-[rgba(80,130,190,0.25)]'
                  : 'bg-[rgba(235,243,252,0.9)] border-[rgba(150,185,225,0.5)]'
              }`}
              style={{
                width: isScrolled ? '24px' : '26px',
                height: isScrolled ? '24px' : '26px',
              }}
            >
              <LexaLogo 
                className="transition-all duration-300" 
                size={isScrolled ? 18 : 20} 
                variant="colored" 
              />
            </div>

            {/* Lexa Wordmark */}
            <span 
              className={`font-brand font-semibold italic text-[15.5px] tracking-[0.01em] leading-none shrink-0 select-none ${
                theme === 'dark' ? 'text-[#F3F5F7]' : 'text-[#0F1D30]'
              }`}
              style={{ fontFamily: "'Cormorant Garamond', 'Source Serif 4', Georgia, serif" }}
            >
              Lexa
            </span>

            {/* Contextual Section Indicator (Appears when scrolled) */}
            <div 
              className="flex items-center overflow-hidden transition-all"
              style={{
                maxWidth: isScrolled ? '180px' : '0px',
                opacity: isScrolled ? 1 : 0,
                transform: isScrolled ? 'translateX(0)' : 'translateX(-6px)',
                transition: 'all 350ms cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            >
              <span className={`font-bold text-xs select-none mx-1.5 shrink-0 ${
                theme === 'dark' ? 'text-[#64758A]' : 'text-[#8A9CAE]'
              }`}>·</span>
              <span 
                key={activeSectionName}
                className={`font-sans font-semibold text-[13px] truncate leading-none animate-in fade-in slide-in-from-bottom-1 duration-200 ${
                  theme === 'dark' ? 'text-[#A2C2E2]' : 'text-[#2B62A3]'
                }`}
              >
                {activeSectionName}
              </span>
            </div>
          </div>

          {/* Right Action Buttons (Expanded state: Theme, Bookmark & Menu; Collapsed: Folds away) */}
          <div 
            className="flex items-center overflow-hidden transition-all"
            style={{
              maxWidth: isScrolled ? '0px' : '150px',
              opacity: isScrolled ? 0 : 1,
              transform: isScrolled ? 'scale(0.85) translateX(8px)' : 'scale(1) translateX(0)',
              pointerEvents: isScrolled ? 'none' : 'auto',
              gap: '6px',
              transition: 'all 350ms cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          >
            {/* White / Dark Mode Toggle Button for Mobile Header */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleTheme();
              }}
              aria-label={theme === 'dark' ? 'Switch to White mode (Light)' : 'Switch to Dark mode'}
              className={`w-[32px] h-[32px] rounded-full flex items-center justify-center border transition-all cursor-pointer ${
                theme === 'dark'
                  ? 'bg-[rgba(17,34,57,0.6)] border-[rgba(80,130,190,0.2)] text-[#9BAABC]'
                  : 'bg-[rgba(235,243,252,0.85)] border-[rgba(150,185,225,0.45)] text-[#4B6382]'
              }`}
            >
              {theme === 'dark' ? (
                <Sun className="w-3.5 h-3.5 text-[#E5A93C]" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-[#2B62A3]" />
              )}
            </button>

            {/* Quick My Study Bookmark button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNavSelect('mystudy');
              }}
              className={`h-[32px] px-2.5 rounded-full flex items-center gap-1.5 text-xs font-sans border transition-all cursor-pointer ${
                selectedTab === 'mystudy'
                  ? theme === 'dark'
                    ? 'bg-[#132B46] border-[#4F83B8] text-[#F3F5F7]'
                    : 'bg-[#E4EEF8] border-[#2B62A3] text-[#0F1D30]'
                  : theme === 'dark'
                    ? 'bg-[rgba(17,34,57,0.6)] border-[rgba(80,130,190,0.2)] text-[#9BAABC] hover:text-[#F3F5F7]'
                    : 'bg-[rgba(235,243,252,0.85)] border-[rgba(150,185,225,0.45)] text-[#4B6382] hover:text-[#0F1D30]'
              }`}
              title="My Study"
            >
              <Bookmark className={`w-3.5 h-3.5 ${theme === 'dark' ? 'text-[#4F83B8]' : 'text-[#2B62A3]'}`} />
              {savedTerms.length > 0 && (
                <span className={`w-3.5 h-3.5 text-white text-[8.5px] font-sans font-bold flex items-center justify-center rounded-full leading-none ${
                  theme === 'dark' ? 'bg-[#4F83B8]' : 'bg-[#2B62A3]'
                }`}>
                  {savedTerms.length}
                </span>
              )}
            </button>

            {/* Mobile Menu Drawer Toggle Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setMobileMenuOpen(prev => !prev);
              }}
              aria-label="Toggle navigation menu"
              className={`w-[32px] h-[32px] rounded-full border flex items-center justify-center cursor-pointer transition-colors ${
                theme === 'dark'
                  ? 'bg-[rgba(17,34,57,0.6)] hover:bg-[rgba(29,53,82,0.6)] border-[rgba(80,130,190,0.25)] text-[#F3F5F7]'
                  : 'bg-[rgba(235,243,252,0.85)] hover:bg-[rgba(220,234,248,0.95)] border-[rgba(150,185,225,0.45)] text-[#0F1D30]'
              }`}
            >
              {mobileMenuOpen ? (
                <X className="w-4 h-4" />
              ) : (
                <Menu className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================================
          MOBILE NAVIGATION MODAL / BOTTOM SHEET (< md / < 768px ONLY)
          ONLY rendered when mobileMenuOpen is explicitly triggered by the user on mobile
      ========================================================================= */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex flex-col justify-end p-3 sm:p-4 animate-in fade-in duration-200">
          {/* Backdrop */}
          <div 
            className={`fixed inset-0 backdrop-blur-md transition-opacity ${
              theme === 'dark' ? 'bg-[#020610]/85' : 'bg-[#0F1D30]/40'
            }`}
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Sheet Modal Container */}
          <div className={`relative z-10 w-full max-w-sm mx-auto backdrop-blur-2xl rounded-3xl p-5 space-y-4 border ${
            theme === 'dark'
              ? 'bg-[rgba(11,20,36,0.96)] border-[rgba(80,130,190,0.35)] shadow-[0_20px_50px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.08)]'
              : 'bg-[rgba(255,255,255,0.98)] border-[rgba(180,205,235,0.6)] shadow-[0_20px_50px_rgba(15,29,48,0.18),inset_0_1px_1px_rgba(255,255,255,0.9)]'
          }`}>
            
            {/* Header with Title and Close Button */}
            <div className={`flex items-center justify-between pb-3 border-b ${
              theme === 'dark' ? 'border-[#1D3552]' : 'border-[#D4DFEC]'
            }`}>
              <div className="flex items-center gap-2">
                <div className={`w-[24px] h-[24px] rounded-full flex items-center justify-center p-0.5 border ${
                  theme === 'dark'
                    ? 'bg-[rgba(17,34,57,0.8)] border-[rgba(80,130,190,0.3)]'
                    : 'bg-[rgba(235,243,252,0.9)] border-[rgba(150,185,225,0.5)]'
                }`}>
                  <LexaLogo className="w-[18px] h-[18px]" size={18} variant="colored" />
                </div>
                <span className={`font-sans font-bold text-sm tracking-tight ${
                  theme === 'dark' ? 'text-[#F3F5F7]' : 'text-[#0F1D30]'
                }`}>
                  LEXA Navigation
                </span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className={`w-7 h-7 rounded-full flex items-center justify-center cursor-pointer border ${
                  theme === 'dark'
                    ? 'bg-[rgba(17,34,57,0.8)] border-[#1D3552] text-[#9BAABC] hover:text-white'
                    : 'bg-[rgba(235,243,252,0.9)] border-[#D4DFEC] text-[#4B6382] hover:text-[#0F1D30]'
                }`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Navigation Grid / List */}
            <div className="grid grid-cols-2 gap-2 max-h-[50vh] overflow-y-auto py-1">
              {navItems.map((item) => {
                const isActive = selectedTab === item.id;
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavSelect(item.id)}
                    className={`p-3 rounded-2xl border text-left flex flex-col gap-2 transition-all cursor-pointer ${
                      isActive
                        ? theme === 'dark'
                          ? 'bg-[#132B46] border-[#4F83B8] text-white shadow-[0_4px_12px_rgba(79,131,184,0.25)]'
                          : 'bg-[#E4EEF8] border-[#2B62A3] text-[#0F1D30] shadow-[0_4px_12px_rgba(43,98,163,0.15)]'
                        : theme === 'dark'
                          ? 'bg-[rgba(17,34,57,0.5)] hover:bg-[rgba(29,53,82,0.6)] border-[#1D3552] text-[#9BAABC] hover:text-[#F3F5F7]'
                          : 'bg-[rgba(240,246,253,0.7)] hover:bg-[rgba(228,238,248,0.9)] border-[#D4DFEC] text-[#4B6382] hover:text-[#0F1D30]'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <IconComponent className={`w-4 h-4 ${
                        isActive 
                          ? (theme === 'dark' ? 'text-[#4F83B8]' : 'text-[#2B62A3]') 
                          : (theme === 'dark' ? 'text-[#64758A]' : 'text-[#8A9CAE]')
                      }`} />
                      {isActive && <ChevronRight className={`w-3.5 h-3.5 ${theme === 'dark' ? 'text-[#4F83B8]' : 'text-[#2B62A3]'}`} />}
                    </div>
                    <div>
                      <div className={`font-sans font-bold text-xs leading-tight ${
                        theme === 'dark' ? 'text-[#F3F5F7]' : 'text-[#0F1D30]'
                      }`}>
                        {item.label}
                      </div>
                      <div className={`font-sans text-[10px] mt-0.5 ${
                        theme === 'dark' ? 'text-[#8B9EB2]' : 'text-[#647890]'
                      }`}>
                        {item.labelId}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* White / Dark Mode Toggle Row in Mobile Drawer */}
            <div className={`p-3 rounded-2xl border flex items-center justify-between transition-all ${
              theme === 'dark' 
                ? 'bg-[rgba(17,34,57,0.5)] border-[#1D3552]' 
                : 'bg-[rgba(240,246,253,0.7)] border-[#D4DFEC]'
            }`}>
              <div className="flex items-center gap-2.5">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center ${
                  theme === 'dark' ? 'bg-[#132B46] text-[#FFD166]' : 'bg-[#E4EEF8] text-[#2B62A3]'
                }`}>
                  {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </div>
                <div>
                  <div className={`font-sans font-bold text-xs ${
                    theme === 'dark' ? 'text-[#F3F5F7]' : 'text-[#0F1D30]'
                  }`}>
                    {theme === 'dark' ? 'Dark Mode' : 'White Mode (Light)'}
                  </div>
                  <div className={`font-sans text-[10px] ${
                    theme === 'dark' ? 'text-[#8B9EB2]' : 'text-[#647890]'
                  }`}>
                    {theme === 'dark' ? 'Deep Midnight Navy' : 'Luminous Editorial Canvas'}
                  </div>
                </div>
              </div>

              <button
                onClick={toggleTheme}
                className={`px-3 py-1.5 rounded-full text-xs font-sans font-semibold border transition-all cursor-pointer ${
                  theme === 'dark'
                    ? 'bg-[rgba(29,53,82,0.8)] border-[#4F83B8]/60 text-[#F3F5F7] hover:bg-[#132B46]'
                    : 'bg-[#FFFFFF] border-[#2B62A3]/60 text-[#0F1D30] hover:bg-[#E4EEF8]'
                }`}
              >
                {theme === 'dark' ? 'Switch to White' : 'Switch to Dark'}
              </button>
            </div>

            {/* Bottom Quick Action: My Study */}
            <button
              onClick={() => handleNavSelect('mystudy')}
              className={`w-full py-2.5 px-4 rounded-xl border flex items-center justify-between font-sans text-xs font-semibold cursor-pointer transition-all ${
                selectedTab === 'mystudy'
                  ? theme === 'dark'
                    ? 'bg-[#132B46] border-[#4F83B8] text-white'
                    : 'bg-[#E4EEF8] border-[#2B62A3] text-[#0F1D30]'
                  : theme === 'dark'
                    ? 'bg-[rgba(17,34,57,0.6)] border-[#1D3552] text-[#9BAABC] hover:text-white'
                    : 'bg-[rgba(235,243,252,0.9)] border-[#D4DFEC] text-[#4B6382] hover:text-[#0F1D30]'
              }`}
            >
              <div className="flex items-center gap-2">
                <Bookmark className={`w-4 h-4 ${theme === 'dark' ? 'text-[#4F83B8]' : 'text-[#2B62A3]'}`} />
                <span>My Saved Terms & Study List</span>
              </div>
              {savedTerms.length > 0 && (
                <span className={`px-2 py-0.5 rounded-full text-white text-[10px] font-bold ${
                  theme === 'dark' ? 'bg-[#4F83B8]' : 'bg-[#2B62A3]'
                }`}>
                  {savedTerms.length}
                </span>
              )}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
