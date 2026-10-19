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

export const LexaMark: React.FC<{ size?: number }> = ({ size = 22 }) => (
  <span
    aria-hidden="true"
    className="inline-flex items-center justify-center rounded-full bg-accent text-on-accent font-legal italic font-normal leading-none"
    style={{ width: size, height: size, fontSize: size * 0.72, paddingTop: size * 0.06 }}
  >
    §
  </span>
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
      <header className={`lexa-nav sticky top-0 z-50 ${isScrolled ? 'is-scrolled' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 grid grid-cols-[1fr_auto] lg:grid-cols-[1fr_auto_1fr] items-center gap-4">
          {/* Logo */}
          <a
            href="#/"
            onClick={(e) => {
              e.preventDefault();
              handleNavSelect('home');
            }}
            className="flex items-center gap-2 justify-self-start cursor-pointer"
            title="Lexa home"
          >
            <LexaMark />
            <span className="font-brand font-semibold text-[18px] tracking-[-0.045em] text-ink leading-none">lexa</span>
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
              <span className="flex items-center gap-2"><LexaMark /><span className="font-brand font-semibold text-[18px] tracking-[-0.045em] leading-none text-ink">lexa</span></span>
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
