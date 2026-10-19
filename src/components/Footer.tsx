import React from 'react';
import { useStudy } from '../context/StudyContext';
import { LexaMark } from './Navbar';
import { sampleLegalDocuments } from '../data/documentsData';

const shortDocTitle: Record<string, string> = {
  'doc-cross-border-sales': 'Sale of Goods (CISG)',
  'doc-nda-bilateral': 'Bilateral NDA',
  'doc-arbitration-award': 'SIAC Award Excerpt',
  'doc-legal-opinion': 'Legal Opinion',
  'doc-share-purchase-m-a': 'Share Purchase (M&A)',
};

export const Footer: React.FC = () => {
  const { setSelectedTab, setActiveDocId } = useStudy();
  const go = (tab: string) => () => setSelectedTab(tab);
  const link = 'ft-link text-left cursor-pointer';

  return (
    <footer className="lx-footer relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
        {/* CTA band */}
        <div className="ft-band rounded-xl px-6 sm:px-9 py-8 sm:py-9 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h3 className="font-legal text-[26px] sm:text-[30px] leading-tight tracking-[-0.01em]">Read your first clause today.</h3>
            <p className="ft-muted text-sm mt-2">Annotated contracts, 509 terms, and drafting templates — free for students.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button onClick={go('learn')} className="ft-btn-solid h-11 px-5 rounded-lg text-[15px] font-medium cursor-pointer">Start learning</button>
            <button onClick={go('documents')} className="ft-btn-ghost h-11 px-5 rounded-lg text-[15px] font-medium cursor-pointer">Browse documents</button>
          </div>
        </div>

        {/* Columns + brand */}
        <div className="grid grid-cols-2 md:grid-cols-[repeat(3,minmax(0,auto))_1fr] gap-x-12 gap-y-10 mt-16">
          <div>
            <h4 className="text-sm font-semibold mb-4">Learn</h4>
            <ul className="space-y-2.5 text-sm ft-muted">
              <li><button onClick={go('learn')} className={link}>Lessons</button></li>
              <li><button onClick={go('vocabulary')} className={link}>Vocabulary</button></li>
              <li><button onClick={go('comparative')} className={link}>Same Concept</button></li>
              <li><button onClick={go('practice')} className={link}>Practice</button></li>
              <li><button onClick={go('write')} className={link}>Writing Lab</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4">Documents</h4>
            <ul className="space-y-2.5 text-sm ft-muted">
              {sampleLegalDocuments.map((doc) => (
                <li key={doc.id}>
                  <button onClick={() => { setActiveDocId(doc.id); setSelectedTab('documents'); }} className={link}>
                    {shortDocTitle[doc.id] ?? doc.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4">Lexa</h4>
            <ul className="space-y-2.5 text-sm ft-muted">
              <li><button onClick={go('insights')} className={link}>Insights</button></li>
              <li><button onClick={go('mystudy')} className={link}>My Study</button></li>
            </ul>
          </div>
          <div className="col-span-2 md:col-span-1 md:justify-self-end md:max-w-[300px]">
            <span className="flex items-center gap-2 select-none"><LexaMark /><span className="font-brand font-semibold text-[18px] tracking-[-0.045em] leading-none">lexa</span></span>
            <p className="ft-muted text-sm leading-relaxed mt-3">Legal English for Indonesian law students, learned through Indonesian law. For study, not legal advice.</p>
          </div>
        </div>

        <div className="ft-rule mt-14 pt-6 flex items-center justify-between text-sm">
          <p>© Lexa · Made in Malang</p>
          <p>{new Date().getFullYear()}</p>
        </div>
      </div>

      {/* Oversized wordmark, cropped by the page edge */}
      <div aria-hidden="true" className="ft-word select-none pointer-events-none max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        lexa
      </div>
    </footer>
  );
};
