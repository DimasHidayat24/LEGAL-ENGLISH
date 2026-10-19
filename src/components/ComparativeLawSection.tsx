import React, { useState } from 'react';
import { useStudy } from '../context/StudyContext';
import { comparativeLawList } from '../data/comparativeLawData';
import { Scale, ArrowRight, ShieldAlert, BookOpen, FileCheck } from 'lucide-react';

export const ComparativeLawSection: React.FC = () => {
  const { setSelectedTab } = useStudy();
  const [selectedConceptId, setSelectedConceptId] = useState<string>(comparativeLawList[0].id);

  const activeConcept = comparativeLawList.find(c => c.id === selectedConceptId) || comparativeLawList[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-8">
      
      {/* Header */}
      <div className="border-b border-line pb-6">
        <div className="flex items-center gap-2 mb-1.5">
          <Scale className="w-4 h-4 text-ink-2" />
          <span className="text-[11px] font-sans text-muted font-semibold">
            Civil law ⟷ common law
          </span>
        </div>
        <h1 className="text-3xl sm:text-[44px] font-medium text-ink tracking-[-0.035em] leading-[1.1]">
          Same concept. Different language.
        </h1>
        <p className="text-sm sm:text-base text-muted font-sans mt-2 max-w-3xl leading-relaxed">
          See how Indonesian civil law concepts (<em>KUHPerdata</em>, <em>UU PT</em>, <em>HIR</em>) map onto common law doctrine — and where literal translation goes wrong.
        </p>
      </div>

      {/* Main Grid: Concept Selector List (4 cols) + In-depth Analysis Pane (8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Concept Selector */}
        <div className="lg:col-span-4 space-y-2">
          <span className="text-xs font-sans text-muted block mb-2 px-1 font-semibold">
            Comparative Concepts ({comparativeLawList.length})
          </span>

          <div className="space-y-2.5 max-h-[80vh] overflow-y-auto pr-1 no-scrollbar">
            {comparativeLawList.map((item) => {
              const isSelected = item.id === activeConcept.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedConceptId(item.id)}
                  className={`p-4 transition-all cursor-pointer rounded-2xl border ${
                    isSelected
                      ? 'bg-surface-3 border-line-strong font-medium'
                      : 'bg-surface border-line hover:border-line-strong hover:bg-surface'
                  }`}
                >
                  <span className="text-[11px] font-sans uppercase px-2.5 py-0.5 inline-block mb-1.5 rounded-full font-semibold bg-surface-3 text-ink-2 border border-line">
                    {item.category}
                  </span>

                  <h3 className="font-serif font-semibold text-sm text-ink">
                    {item.indonesianTerm}
                  </h3>

                  <div className={`text-xs font-sans mt-1 flex items-center gap-1 ${
                    isSelected ? 'text-ink-2 font-medium' : 'text-muted'
                  }`}>
                    <span>⟷</span>
                    <span className="line-clamp-1">{item.englishTerm}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Comparative Deconstruction Pane */}
        <div className="lg:col-span-8 p-6 sm:p-10 rounded-2xl bg-surface border border-line space-y-8">
          
          {/* Header Title Banner */}
          <div className="border-b border-line pb-6 space-y-2">
            <span className="text-xs font-sans text-muted font-semibold">
              Comparison: {activeConcept.category}
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-surface border border-line">
                <span className="text-[11px] font-sans text-muted block font-semibold">
                  Indonesian Civil Law Concept (KUHPerdata)
                </span>
                <h2 className="text-lg font-serif font-semibold text-ink mt-0.5">
                  {activeConcept.indonesianTerm}
                </h2>
              </div>

              <div className="p-4 rounded-2xl bg-surface-3 border border-line-strong">
                <span className="text-[11px] font-sans uppercase tracking-wider text-ink-2 block font-semibold">
                  Anglo-American Common Law Concept
                </span>
                <h2 className="text-lg font-serif font-semibold text-ink mt-0.5">
                  {activeConcept.englishTerm}
                </h2>
              </div>
            </div>
          </div>

          {/* Deep Dives Comparison Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Indonesian Civil Law Nuance */}
            <div className="p-5 rounded-2xl bg-surface border border-line space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-accent text-on-accent border border-accent flex items-center justify-center text-xs font-sans font-bold rounded-full">
                  ID
                </div>
                <h3 className="font-serif font-semibold text-base text-ink">
                  Indonesian Civil Law Framework
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-muted font-sans leading-relaxed">
                {activeConcept.civilLawNuance}
              </p>
            </div>

            {/* Anglo-American Common Law Nuance */}
            <div className="p-5 rounded-2xl bg-surface border border-line space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-accent text-on-accent border border-accent flex items-center justify-center text-xs font-sans font-bold rounded-full">
                  EN
                </div>
                <h3 className="font-serif font-semibold text-base text-ink">
                  Common Law / International Doctrine
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-muted font-sans leading-relaxed">
                {activeConcept.commonLawNuance}
              </p>
            </div>
          </div>

          {/* The Critical Takeaway: Why Context Matters & Trap to Avoid */}
          <div className="p-5 rounded-2xl bg-surface-3 border border-line space-y-2.5">
            <div className="flex items-center gap-2 text-ink">
              <ShieldAlert className="w-5 h-5 text-ink-2" />
              <h3 className="text-xs font-serif font-semibold">
                Why Context Matters (The Translation Trap)
              </h3>
            </div>
            <p className="text-sm font-sans text-muted leading-relaxed">
              {activeConcept.whyContextMatters}
            </p>
          </div>

          {/* Real-World Cross-Border Case Scenario */}
          <div className="p-5 rounded-2xl bg-surface border border-line space-y-2.5">
            <div className="flex items-center gap-2 text-ink">
              <FileCheck className="w-5 h-5 text-ink-2" />
              <h3 className="text-xs font-serif font-semibold text-ink">
                Authentic Cross-Border Scenario
              </h3>
            </div>
            <blockquote className="text-sm font-serif text-ink leading-[1.7] italic bg-surface p-4 border-l-2 border-accent rounded-xl">
              &ldquo;{activeConcept.exampleScenario}&rdquo;
            </blockquote>
          </div>

          {/* Bottom Navigation */}
          <div className="pt-4 border-t border-line flex items-center justify-between">
            <button
              onClick={() => setSelectedTab('documents')}
              className="text-xs font-sans text-muted hover:text-ink underline flex items-center gap-1.5 cursor-pointer font-medium"
            >
              <BookOpen className="w-4 h-4 text-ink-2" />
              <span>Read in model contracts</span>
            </button>

            <button
              onClick={() => setSelectedTab('practice')}
              className="btn-primary px-5 py-2.5 text-xs flex items-center gap-1.5 font-medium"
            >
              <span>Practice Translation Quiz</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
