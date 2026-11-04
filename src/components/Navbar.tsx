import React, { useState, useEffect } from 'react';
import { useStudy } from '../context/StudyContext';
import {
  Bookmark,
  Menu,
  X,
  Search,
  Sun,
  Moon,
  Home as HomeIcon,
  GraduationCap,
  FileText,
  BookMarked,
  Sparkles,
  BookOpen,
  PenTool,
  Compass,
} from 'lucide-react';

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

export const LexaMark: React.FC<{ size?: number }> = ({ size = 28 }) => (
  <svg
    aria-hidden="true"
    width={size}
    height={size}
    viewBox="0 0 64 64"
    className="inline-flex shrink-0"
  >
    <rect x="2" y="2" width="60" height="60" rx="18" fill="#00A5E5" />
    <path d="M12 26 Q32 38 52 26" fill="none" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" />
    <line x1="23" y1="30" x2="23" y2="44" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
    <line x1="41" y1="30" x2="41" y2="44" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
    <circle cx="23" cy="48" r="3.5" fill="#EEE8A9" />
    <circle cx="41" cy="48" r="3.5" fill="#EEE8A9" />
  </svg>
);

const ThemeToggle: React.FC<{ compact?: boolean }> = ({ compact }) => {
  const { theme, toggleTheme } = useStudy();
  const isDark = theme === 'dark';
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Light theme' : 'Dark theme'}
      className={`${compact ? 'w-8 h-8' : 'w-9 h-9'} rounded-lg flex items-center justify-center cursor-pointer text-muted hover:text-ink hover:bg-surface-3 transition-colors`}
    >
      {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );
};

export const Navbar: React.FC = () => {
  const {
    selectedTab,
    setSelectedTab,
    languageMode,
    savedTerms,
    setActiveDocId,
    setActiveLessonId,
    setIsSearchOpen,
  } = useStudy();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavSelect = (tabId: string) => {
    setSelectedTab(tabId);
    if (tabId === 'home') {
      setActiveDocId(null);
      setActiveLessonId(null);
    }
    setMobileMenuOpen(false);
  };

  const label = (item: typeof navItems[number]) => (languageMode === 'ID' ? item.labelId : item.label);
  const savedCount = savedTerms.length;

  return (
    <>
      <header className="sticky top-0 z-50 px-3 pt-3 sm:px-4">
        <div className={`lexa-nav ${isScrolled ? 'is-scrolled' : ''} mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 h-14 grid grid-cols-[1fr_auto] lg:grid-cols-[1fr_auto_1fr] items-center gap-4`}>
          {/* Logo */}
          <a
            href="#/"
            onClick={(e) => {
              e.preventDefault();
              handleNavSelect('home');
            }}
            className="flex items-center justify-self-start cursor-pointer"
            title="Lexa home"
            aria-label="Lexa — home"
          >
            <LexaMark />
          </a>

          {/* Centered links (desktop) */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7" aria-label="Primary">
            {navItems
              .filter((item) => item.id !== 'home')
              .map((item) => {
                const isActive = selectedTab === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#/${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavSelect(item.id);
                    }}
                    aria-current={isActive ? 'page' : undefined}
                    className="lexa-nav-link whitespace-nowrap"
                  >
                    {label(item)}
                  </a>
                );
              })}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-1 sm:gap-1.5 justify-self-end">
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search legal terms (⌘K)"
              title="Search legal terms (⌘K)"
              className="h-9 px-2 sm:px-2.5 rounded-lg flex items-center gap-2 cursor-pointer text-muted hover:text-ink hover:bg-surface-3 transition-colors"
            >
              <Search className="w-4 h-4" />
              <span className="lexa-kbd hidden xl:inline">⌘K</span>
            </button>

            <ThemeToggle />

            <button
              onClick={() => handleNavSelect('mystudy')}
              className={`btn-primary h-9 px-3 sm:px-3.5 text-[13px] ${selectedTab === 'mystudy' ? 'ring-2 ring-offset-2 ring-offset-bg ring-line-strong' : ''}`}
              title="Saved terms and progress"
              aria-label={`My Study, ${savedCount} saved terms`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span className="hidden sm:inline whitespace-nowrap">My Study</span>
              {savedCount > 0 && (
                <span className="min-w-[18px] h-[18px] px-1 text-[11px] font-semibold flex items-center justify-center rounded-full leading-none bg-on-accent text-accent btn-badge">
                  {savedCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen((p) => !p)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center cursor-pointer text-ink hover:bg-surface-3"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end p-3">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} aria-hidden="true" />
          <div className="liquid-glass-modal relative z-10 w-full max-w-sm mx-auto rounded-2xl p-5 space-y-4" role="dialog" aria-label="Navigation">
            <div className="flex items-center justify-between pb-3 border-b border-line">
              <LexaMark />
              <button
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
                className="w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer border border-line text-ink hover:bg-surface-2"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2 max-h-[55vh] overflow-y-auto py-1">
              {navItems.map((item) => {
                const isActive = selectedTab === item.id;
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavSelect(item.id)}
                    className={`p-3 rounded-xl border text-left flex items-center gap-2 cursor-pointer transition-colors ${
                      isActive ? 'bg-accent border-accent text-on-accent' : 'bg-surface border-line text-ink hover:bg-surface-2'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="text-sm font-semibold">{label(item)}</span>
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => handleNavSelect('mystudy')}
              className={`w-full py-2.5 px-4 rounded-lg border flex items-center justify-between text-sm font-semibold cursor-pointer ${
                selectedTab === 'mystudy' ? 'bg-accent border-accent text-on-accent' : 'bg-surface border-line text-ink hover:bg-surface-2'
              }`}
            >
              <span className="flex items-center gap-2">
                <Bookmark className="w-4 h-4" /> My Study
              </span>
              {savedCount > 0 && <span className="text-xs">{savedCount} saved</span>}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
