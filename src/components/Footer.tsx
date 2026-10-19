import React from 'react';
import { useStudy } from '../context/StudyContext';
import { LexaMark } from './Navbar';
import { Sun, Moon } from 'lucide-react';
import { sampleLegalDocuments } from '../data/documentsData';

const shortDocTitle: Record<string, string> = {
  'doc-cross-border-sales': 'Sale of Goods Agreement (CISG)',
  'doc-nda-bilateral': 'Bilateral Non-Disclosure Agreement',
  'doc-arbitration-award': 'SIAC Arbitral Award Excerpt',
  'doc-legal-opinion': 'Foreign Investment Legal Opinion',
  'doc-share-purchase-m-a': 'Share Purchase Agreement (M&A)',
};

export const Footer: React.FC = () => {
  const { setSelectedTab, setActiveDocId, theme, setTheme } = useStudy();
  // 509 entries in the dictionary (static so the footer does not pull the dictionary into the first bundle)
  const termCount = 500;

  const linkCls = 'hover:text-ink hover:underline underline-offset-2 text-left cursor-pointer transition-colors';

  return (
    <footer className="relative border-t border-line bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-3">
            <span className="flex items-center gap-2 select-none"><LexaMark /><span className="font-brand font-semibold text-[18px] tracking-[-0.045em] text-ink leading-none">lexa</span></span>
            <p className="text-sm leading-relaxed text-muted">
              Legal English for Indonesian law students — learned through Indonesian law, side by side.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-ink">Lessons</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li><button onClick={() => setSelectedTab('learn')} className={linkCls}>Foundation & pronominals</button></li>
              <li><button onClick={() => setSelectedTab('comparative')} className={linkCls}>KUHPerdata vs Common Law</button></li>
              <li><button onClick={() => setSelectedTab('learn')} className={linkCls}>International arbitration</button></li>
              <li><button onClick={() => setSelectedTab('write')} className={linkCls}>Legal memo & IRAC</button></li>
              <li><button onClick={() => setSelectedTab('vocabulary')} className={linkCls}>{termCount}+ legal terms dictionary</button></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-ink">Document library</h4>
            <ul className="space-y-2 text-sm text-muted">
              {sampleLegalDocuments.map((doc) => (
                <li key={doc.id}>
                  <button
                    onClick={() => {
                      setActiveDocId(doc.id);
                      setSelectedTab('documents');
                    }}
                    className={linkCls}
                  >
                    {shortDocTitle[doc.id] ?? doc.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3 md:border-l md:border-line md:pl-6">
            <h4 className="text-sm font-semibold text-ink">About the material</h4>
            <p className="text-sm leading-relaxed text-muted">
              Built on plain legal English principles and Indonesian civil law. Model contracts and award excerpts are written for study, not as legal advice.
            </p>
            <p className="pt-1 text-sm text-muted">Made in Malang for Indonesian law students</p>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-line flex flex-col sm:flex-row items-center justify-between text-sm text-muted gap-4">
          <p>© {new Date().getFullYear()} Lexa. For educational purposes.</p>
          <div className="flex items-center gap-5">
            <button onClick={() => setSelectedTab('insights')} className={linkCls}>Lexa Insights</button>
            <div className="flex items-center border border-line rounded-full p-0.5 bg-surface" role="group" aria-label="Theme">
              <button
                onClick={() => setTheme('light')}
                aria-pressed={theme === 'light'}
                className={`px-2.5 py-1 rounded-full flex items-center gap-1 text-xs font-medium cursor-pointer ${
                  theme === 'light' ? 'bg-accent text-on-accent' : 'text-muted hover:text-ink'
                }`}
              >
                <Sun className="w-3 h-3" /> Light
              </button>
              <button
                onClick={() => setTheme('dark')}
                aria-pressed={theme === 'dark'}
                className={`px-2.5 py-1 rounded-full flex items-center gap-1 text-xs font-medium cursor-pointer ${
                  theme === 'dark' ? 'bg-accent text-on-accent' : 'text-muted hover:text-ink'
                }`}
              >
                <Moon className="w-3 h-3" /> Dark
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
