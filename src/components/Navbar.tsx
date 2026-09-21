import React, { useState, useEffect, useRef } from 'react';
import { useStudy } from '../context/StudyContext';
import { 
  Bookmark, 
  Menu, 
  X, 
  Sun, 
  Moon,
  Search,
  Home as HomeIcon,
  GraduationCap,
  FileText,
  BookMarked,
  Sparkles,
  BookOpen,
  PenTool,
  Compass,
  ChevronRight
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    theme,
    toggleTheme,
    selectedTab, 
    setSelectedTab, 
    languageMode, 
    savedTerms, 
    setActiveDocId,
    setActiveLessonId,
    setIsSearchOpen
  } = useStudy();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Passive scroll listener for subtle glass intensification on scroll
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          setIsScrolled(scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    };
    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mobileMenuOpen]);

  // Primary 8 navigation items per specification
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

  const handleNavSelect = (tabId: string) => {
    setSelectedTab(tabId);
    if (tabId === 'home') {
      setActiveDocId(null);
      setActiveLessonId(null);
    }
    setMobileMenuOpen(false);
  };

  // Get current active tab label for compact mobile view
  const currentActiveItem = navItems.find(item => item.id === selectedTab);
  const activeLabel = currentActiveItem 
    ? (languageMode === 'ID' ? currentActiveItem.labelId : currentActiveItem.label)
    : (selectedTab === 'mystudy' ? 'My Study' : 'Home');

  return (
    <>
      {/* =========================================================================
          DESKTOP & TABLET FLOATING PILL NAVIGATION (>= md / 768px)
          - Single unified horizontal pill-shaped navigation container
          - Floating near top of page (top-4 / top-5)
          - Authentic Liquid Glass optics: dual-layer refraction, specular rim highlight
          - Compact height (54px)
          - Structure: [ Lexa ] | [ Nav Items ] | [ Theme ] [ My Study ]
      ========================================================================= */}
      <header className="hidden md:flex fixed top-4 lg:top-5 left-0 right-0 z-50 pointer-events-none justify-center px-4">
        <div
          className={`liquid-nav-pill pointer-events-auto rounded-full flex items-center justify-between transition-all duration-300 select-none w-max max-w-[calc(100vw-32px)] ${
            isScrolled ? 'is-scrolled' : ''
          }`}
          style={{
            height: '54px',
            paddingLeft: '14px',
            paddingRight: '12px',
            gap: '8px',
          }}
        >
          {/* Optical Liquid Specular Sheen (Apple Meniscus Light Catch) */}
          <div className="absolute inset-0 rounded-full pointer-events-none overflow-hidden" aria-hidden="true">
            {/* Top specular reflection hairline */}
            <div className={`absolute top-0 inset-x-6 h-[1px] ${
              theme === 'dark'
                ? 'bg-gradient-to-r from-transparent via-white/35 to-transparent'
                : 'bg-gradient-to-r from-transparent via-white/95 to-transparent'
            }`} />
            {/* Volumetric upper refraction sheen */}
            <div className={`absolute top-0 inset-x-0 h-1/2 rounded-t-full ${
              theme === 'dark'
                ? 'bg-gradient-to-b from-white/[0.08] via-white/[0.015] to-transparent'
                : 'bg-gradient-to-b from-white/[0.45] via-white/[0.08] to-transparent'
            }`} />
          </div>

          {/* 1. LEXA BRAND (Far Left) */}
          <button
            onClick={() => handleNavSelect('home')}
            className={`relative z-10 flex items-center px-2 py-1 rounded-full cursor-pointer transition-colors duration-150 shrink-0 ${
              theme === 'dark' ? 'hover:bg-[rgba(255,255,255,0.06)]' : 'hover:bg-[rgba(15,29,48,0.05)]'
            }`}
            title="LEXA Home"
          >
            <span 
              className={`font-serif italic font-semibold text-[19px] lg:text-[20px] tracking-tight leading-none select-none ${
                theme === 'dark' ? 'text-[#F2F2F2]' : 'text-[#121212]'
              }`}
              style={{ fontFamily: "'Cormorant Garamond', 'Source Serif 4', Georgia, serif" }}
            >
              Lexa
            </span>
          </button>

          {/* Vertical Divider: Brand → Navigation */}
          <div 
            className={`relative z-10 h-4 w-px shrink-0 transition-colors mx-0.5 ${
              theme === 'dark' 
                ? 'bg-white/10' 
                : 'bg-black/10'
            }`} 
            aria-hidden="true" 
          />

          {/* 2. NAVIGATION ITEMS (Center) */}
          <nav className="relative z-10 flex items-center space-x-0.5 lg:space-x-1">
            {navItems.map((item) => {
              const isActive = selectedTab === item.id;
              const displayLabel = languageMode === 'ID' ? item.labelId : item.label;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavSelect(item.id)}
                  className={`px-2.5 lg:px-3 py-1.5 h-[34px] text-[12.5px] lg:text-[13px] font-sans transition-all duration-200 cursor-pointer rounded-full flex items-center justify-center whitespace-nowrap ${
                    isActive
                      ? 'liquid-tab-active font-semibold'
                      : theme === 'dark'
                        ? 'text-white/70 hover:text-white/95 hover:bg-white/[0.06] font-medium'
                        : 'text-black/70 hover:text-black/95 hover:bg-black/[0.05] font-medium'
                  }`}
                >
                  {displayLabel}
                </button>
              );
            })}
          </nav>

          {/* Vertical Divider: Navigation → Utility Controls */}
          <div 
            className={`relative z-10 h-4 w-px shrink-0 transition-colors mx-0.5 ${
              theme === 'dark' 
                ? 'bg-white/10' 
                : 'bg-black/10'
            }`} 
            aria-hidden="true" 
          />

          {/* 3. RIGHT-SIDE CONTROLS (Search Shortcut, Theme Toggle & My Study) */}
          <div className="relative z-10 flex items-center gap-1.5 shrink-0">
            {/* Search Shortcut Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search legal terms (⌘K)"
              title="Search legal terms (⌘K)"
              className={`liquid-ctrl-pill h-[34px] px-2.5 rounded-full flex items-center gap-1.5 cursor-pointer transition-all duration-200 ${
                theme === 'dark' ? 'text-white/70 hover:text-white/95' : 'text-black/70 hover:text-black/95'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span className="text-[10px] font-mono opacity-60 hidden xl:inline">⌘K</span>
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to White mode (Light)' : 'Switch to Dark mode'}
              title={theme === 'dark' ? 'Switch to White mode (Light)' : 'Switch to Dark mode'}
              className={`liquid-ctrl-pill w-[34px] h-[34px] rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 ${
                theme === 'dark' ? 'text-white/70 hover:text-white/95' : 'text-black/70 hover:text-black/95'
              }`}
            >
              {theme === 'dark' ? (
                <Sun className="w-3.5 h-3.5 text-[#DCDCDC] transition-transform duration-300 hover:rotate-45" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-[#111111] transition-transform duration-300 hover:-rotate-12" />
              )}
            </button>

            {/* My Study Utility Button */}
            <button
              onClick={() => handleNavSelect('mystudy')}
              className={`liquid-ctrl-pill h-[34px] px-3 text-[12.5px] lg:text-[13px] font-sans rounded-full flex items-center gap-1.5 cursor-pointer transition-all duration-200 ${
                selectedTab === 'mystudy'
                  ? 'liquid-tab-active font-semibold'
                  : theme === 'dark'
                    ? 'text-white/80 hover:text-white'
                    : 'text-[#121212]'
              }`}
              title="View My Saved Vocabulary & Progress"
            >
              <Bookmark className={`w-3.5 h-3.5 ${theme === 'dark' ? 'text-white' : 'text-[#111111]'}`} />
              <span className="font-medium whitespace-nowrap">My Study</span>
              {savedTerms.length > 0 && (
                <span className={`px-1.5 py-0.2 text-[9.5px] font-sans font-bold flex items-center justify-center rounded-full leading-none text-white ${
                  theme === 'dark'
                    ? 'bg-[#242424] border border-white/20'
                    : 'bg-[#111111]'
                }`}>
                  {savedTerms.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================================
          MOBILE FLOATING PILL NAVIGATION (< md / 768px)
          - Compact floating pill navigation container matching LCS design philosophy
          - Displays: [ Lexa ] | [ Current Active Pill ] | [ Theme ] [ My Study ] [ Menu ]
          - Authentic Liquid Glass surface with specular highlights
      ========================================================================= */}
      <header className="md:hidden fixed top-3 left-0 right-0 z-50 pointer-events-none flex justify-center px-3">
        <div
          className={`liquid-nav-pill pointer-events-auto rounded-full flex items-center justify-between transition-all duration-300 select-none w-full max-w-md ${
            isScrolled ? 'is-scrolled' : ''
          }`}
          style={{
            height: '48px',
            paddingLeft: '14px',
            paddingRight: '8px',
          }}
        >
          {/* Specular sheen layer */}
          <div className="absolute inset-0 rounded-full pointer-events-none overflow-hidden" aria-hidden="true">
            <div className={`absolute top-0 inset-x-4 h-[1px] ${
              theme === 'dark'
                ? 'bg-gradient-to-r from-transparent via-white/35 to-transparent'
                : 'bg-gradient-to-r from-transparent via-white/95 to-transparent'
            }`} />
            <div className={`absolute top-0 inset-x-0 h-1/2 rounded-t-full ${
              theme === 'dark'
                ? 'bg-gradient-to-b from-white/[0.08] via-white/[0.015] to-transparent'
                : 'bg-gradient-to-b from-white/[0.45] via-white/[0.08] to-transparent'
            }`} />
          </div>

          {/* Left: Brand and Active Page Indicator */}
          <div className="relative z-10 flex items-center gap-2 overflow-hidden">
            <button
              onClick={() => handleNavSelect('home')}
              className="cursor-pointer shrink-0"
              title="LEXA Home"
            >
              <span 
                className={`font-serif italic font-semibold text-[17.5px] tracking-tight leading-none select-none ${
                  theme === 'dark' ? 'text-[#F2F2F2]' : 'text-[#121212]'
                }`}
                style={{ fontFamily: "'Cormorant Garamond', 'Source Serif 4', Georgia, serif" }}
              >
                Lexa
              </span>
            </button>

            {/* Vertical Divider */}
            <div 
              className={`h-3.5 w-px shrink-0 ${
                theme === 'dark' ? 'bg-white/10' : 'bg-black/10'
              }`} 
              aria-hidden="true" 
            />

            {/* Active Page Pill Badge */}
            <span 
              className={`text-xs font-sans font-medium truncate px-2.5 py-0.5 rounded-full border ${
                theme === 'dark'
                  ? 'bg-[#1C1C1C] text-white border-white/20 shadow-[inset_0_1px_0.5px_rgba(255,255,255,0.15)]'
                  : 'bg-[#FFFFFF] text-[#111111] border-[rgba(0,0,0,0.15)] shadow-[inset_0_1px_0.5px_#FFFFFF]'
              }`}
            >
              {activeLabel}
            </span>
          </div>

          {/* Right: Controls (Theme + My Study + Menu) */}
          <div className="relative z-10 flex items-center gap-1 shrink-0">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className={`liquid-ctrl-pill w-[30px] h-[30px] rounded-full flex items-center justify-center cursor-pointer transition-colors ${
                theme === 'dark' ? 'text-[#A8A8A8]' : 'text-[#555555]'
              }`}
            >
              {theme === 'dark' ? (
                <Sun className="w-3.5 h-3.5 text-[#DCDCDC]" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-[#111111]" />
              )}
            </button>

            {/* My Study Button */}
            <button
              onClick={() => handleNavSelect('mystudy')}
              aria-label="My Study"
              className={`liquid-ctrl-pill h-[30px] px-2 rounded-full flex items-center gap-1 cursor-pointer transition-colors ${
                selectedTab === 'mystudy' ? 'liquid-tab-active' : ''
              }`}
              title="My Study"
            >
              <Bookmark className={`w-3.5 h-3.5 ${theme === 'dark' ? 'text-white' : 'text-[#111111]'}`} />
              {savedTerms.length > 0 && (
                <span className={`w-3.5 h-3.5 text-white text-[8.5px] font-sans font-bold flex items-center justify-center rounded-full leading-none ${
                  theme === 'dark' ? 'bg-[#242424] border border-white/20' : 'bg-[#111111]'
                }`}>
                  {savedTerms.length}
                </span>
              )}
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(prev => !prev)}
              aria-label="Toggle navigation menu"
              className={`liquid-ctrl-pill w-[30px] h-[30px] rounded-full flex items-center justify-center cursor-pointer transition-colors ${
                theme === 'dark' ? 'text-[#F2F2F2]' : 'text-[#121212]'
              }`}
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================================
          MOBILE FLOATING MENU SHEET MODAL (< md / 768px)
          - Floating glass container presenting all 8 navigation items
          - Smooth animation and clean dark/light glass aesthetic
      ========================================================================= */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex flex-col justify-end p-3 sm:p-4 animate-in fade-in duration-200">
          {/* Backdrop */}
          <div 
            className={`fixed inset-0 backdrop-blur-md transition-opacity ${
              theme === 'dark' ? 'bg-[#050505]/80' : 'bg-black/35'
            }`}
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Floating Sheet Container */}
          <div 
            ref={mobileMenuRef}
            className={`relative z-10 w-full max-w-sm mx-auto rounded-3xl p-5 space-y-4 border ${
              theme === 'dark'
                ? 'backdrop-blur-2xl bg-[#0C0C0C]/96 border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.7),inset_0_1.5px_1px_rgba(255,255,255,0.1)]'
                : 'bg-[#FFFFFF] border-black/10 shadow-[0_20px_50px_rgba(0,0,0,0.18)]'
            }`}
          >
            {/* Sheet Header */}
            <div className={`flex items-center justify-between pb-3 border-b ${
              theme === 'dark' ? 'border-white/10' : 'border-black/10'
            }`}>
              <div className="flex items-center gap-2">
                <span 
                  className={`font-serif italic font-semibold text-[18px] tracking-tight leading-none select-none ${
                    theme === 'dark' ? 'text-[#FFFFFF]' : 'text-[#121212]'
                  }`}
                  style={{ fontFamily: "'Cormorant Garamond', 'Source Serif 4', Georgia, serif" }}
                >
                  Lexa
                </span>
                <span className={`font-sans text-xs ${
                  theme === 'dark' ? 'text-[#A8A8A8]' : 'text-[#666666]'
                }`}>
                  Navigation
                </span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className={`w-7 h-7 rounded-full flex items-center justify-center cursor-pointer border ${
                  theme === 'dark'
                    ? 'bg-[#151515] border-white/10 text-[#A8A8A8] hover:text-white'
                    : 'bg-black/[0.05] border-black/10 text-[#555555] hover:text-[#111111]'
                }`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Navigation Items Grid */}
            <div className="grid grid-cols-2 gap-2 max-h-[50vh] overflow-y-auto py-1">
              {navItems.map((item) => {
                const isActive = selectedTab === item.id;
                const IconComponent = item.icon;
                const displayLabel = languageMode === 'ID' ? item.labelId : item.label;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavSelect(item.id)}
                    className={`p-3 rounded-2xl border text-left flex flex-col gap-2 transition-all cursor-pointer ${
                      isActive
                        ? theme === 'dark'
                          ? 'bg-[#1C1C1C] border-white/25 text-white shadow-[0_4px_12px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.15)]'
                          : 'bg-[#111111] border-[#111111] text-white shadow-[0_4px_12px_rgba(0,0,0,0.15)]'
                        : theme === 'dark'
                          ? 'bg-[#101010] hover:bg-[#181818] border-white/[0.08] text-[#A8A8A8] hover:text-[#F2F2F2]'
                          : 'bg-black/[0.03] hover:bg-black/[0.07] border-black/10 text-[#555555] hover:text-[#111111]'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <IconComponent className={`w-4 h-4 ${
                        isActive 
                          ? (theme === 'dark' ? 'text-white' : 'text-white') 
                          : (theme === 'dark' ? 'text-[#707070]' : 'text-[#888888]')
                      }`} />
                      {isActive && <ChevronRight className={`w-3.5 h-3.5 ${theme === 'dark' ? 'text-white' : 'text-white'}`} />}
                    </div>
                    <div>
                      <div className={`font-sans font-bold text-xs leading-tight ${
                        isActive && theme !== 'dark' ? 'text-white' : theme === 'dark' ? 'text-[#F2F2F2]' : 'text-[#121212]'
                      }`}>
                        {displayLabel}
                      </div>
                      {languageMode === 'ID' && (
                        <div className={`font-sans text-[10px] mt-0.5 ${
                          isActive && theme !== 'dark' ? 'text-white/80' : theme === 'dark' ? 'text-[#707070]' : 'text-[#777777]'
                        }`}>
                          {item.label}
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Bottom Action: My Study Quick Link */}
            <button
              onClick={() => handleNavSelect('mystudy')}
              className={`w-full py-2.5 px-4 rounded-xl border flex items-center justify-between font-sans text-xs font-semibold cursor-pointer transition-all ${
                selectedTab === 'mystudy'
                  ? theme === 'dark'
                    ? 'bg-[#1C1C1C] border-white/20 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]'
                    : 'bg-[#111111] border-[#111111] text-white'
                  : theme === 'dark'
                    ? 'bg-[#101010] border-white/[0.08] text-[#A8A8A8] hover:text-white'
                    : 'bg-black/[0.03] border-black/10 text-[#555555] hover:text-[#111111]'
              }`}
            >
              <div className="flex items-center gap-2">
                <Bookmark className={`w-4 h-4 ${selectedTab === 'mystudy' && theme !== 'dark' ? 'text-white' : theme === 'dark' ? 'text-white' : 'text-[#111111]'}`} />
                <span>My Saved Terms & Study Hub</span>
              </div>
              {savedTerms.length > 0 && (
                <span className={`px-2 py-0.5 rounded-full text-white text-[10px] font-bold ${
                  theme === 'dark' ? 'bg-[#242424] border border-white/20' : 'bg-[#111111]'
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
