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
      <div className="border-b border-white/[0.08] pb-6">
        <div className="flex items-center gap-2 mb-1.5">
          <Scale className="w-4 h-4 text-[#DCDCDC]" />
          <span className="text-[11px] font-sans tracking-widest uppercase text-[#A8A8A8] font-semibold">
            JURISDICTIONAL COMPARATIVE ANALYSIS
          </span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-sans font-extrabold text-white tracking-tight">
          Same Concept. Different Language.
        </h1>
        <p className="text-sm sm:text-base text-[#A8A8A8] font-sans mt-2 max-w-3xl leading-relaxed">
          A dedicated comparative jurisprudence module for Indonesian jurists. Understand how Indonesian Civil Law concepts (<em>KUHPerdata</em>, <em>UU PT</em>, <em>HIR</em>) map onto English and Common Law doctrines without falling into dangerous literal translation traps.
        </p>
      </div>

      {/* Main Grid: Concept Selector List (4 cols) + In-depth Analysis Pane (8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Concept Selector */}
        <div className="lg:col-span-4 space-y-2">
          <span className="text-xs font-sans uppercase tracking-wider text-[#A8A8A8] block mb-2 px-1 font-semibold">
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
                      ? 'bg-[#1C1C1C] border-white/25 shadow-[0_10px_25px_rgba(0,0,0,0.5)] font-medium'
                      : 'bg-[#101010] border-white/[0.08] hover:border-white/20 hover:bg-[#151515]'
                  }`}
                >
                  <span className="text-[10px] font-sans uppercase px-2.5 py-0.5 inline-block mb-1.5 rounded-full font-semibold bg-[#242424] text-[#DCDCDC] border border-white/10">
                    {item.category}
                  </span>

                  <h3 className="font-sans font-bold text-sm text-white">
                    {item.indonesianTerm}
                  </h3>

                  <div className={`text-xs font-sans mt-1 flex items-center gap-1 ${
                    isSelected ? 'text-[#DCDCDC] font-medium' : 'text-[#A8A8A8]'
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
        <div className="lg:col-span-8 p-6 sm:p-10 rounded-3xl bg-[#101010] border border-white/[0.08] space-y-8">
          
          {/* Header Title Banner */}
          <div className="border-b border-white/[0.08] pb-6 space-y-2">
            <span className="text-xs font-sans uppercase tracking-wider text-[#A8A8A8] font-semibold">
              COMPARATIVE PAIRING: {activeConcept.category}
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-[#151515] border border-white/[0.08]">
                <span className="text-[10px] font-sans uppercase tracking-wider text-[#A8A8A8] block font-semibold">
                  Indonesian Civil Law Concept (KUHPerdata)
                </span>
                <h2 className="text-lg font-sans font-extrabold text-white mt-0.5">
                  {activeConcept.indonesianTerm}
                </h2>
              </div>

              <div className="p-4 rounded-2xl bg-[#1C1C1C] border border-white/[0.15]">
                <span className="text-[10px] font-sans uppercase tracking-wider text-[#DCDCDC] block font-semibold">
                  Anglo-American Common Law Concept
                </span>
                <h2 className="text-lg font-sans font-extrabold text-white mt-0.5">
                  {activeConcept.englishTerm}
                </h2>
              </div>
            </div>
          </div>

          {/* Deep Dives Comparison Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Indonesian Civil Law Nuance */}
            <div className="p-5 rounded-2xl bg-[#151515] border border-white/[0.08] space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-[#242424] text-white border border-white/20 flex items-center justify-center text-xs font-sans font-bold rounded-full">
                  ID
                </div>
                <h3 className="font-sans font-bold text-base text-white">
                  Indonesian Civil Law Framework
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#A8A8A8] font-sans leading-relaxed">
                {activeConcept.civilLawNuance}
              </p>
            </div>

            {/* Anglo-American Common Law Nuance */}
            <div className="p-5 rounded-2xl bg-[#151515] border border-white/[0.08] space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-[#242424] text-white border border-white/20 flex items-center justify-center text-xs font-sans font-bold rounded-full">
                  EN
                </div>
                <h3 className="font-sans font-bold text-base text-white">
                  Common Law / International Doctrine
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#A8A8A8] font-sans leading-relaxed">
                {activeConcept.commonLawNuance}
              </p>
            </div>
          </div>

          {/* The Critical Takeaway: Why Context Matters & Trap to Avoid */}
          <div className="p-5 rounded-2xl bg-[#181818] border border-white/[0.12] space-y-2.5">
            <div className="flex items-center gap-2 text-white">
              <ShieldAlert className="w-5 h-5 text-[#DCDCDC]" />
              <h3 className="text-xs font-sans tracking-wider uppercase font-semibold">
                Why Context Matters (The Translation Trap)
              </h3>
            </div>
            <p className="text-sm font-sans text-[#A8A8A8] leading-relaxed">
              {activeConcept.whyContextMatters}
            </p>
          </div>

          {/* Real-World Cross-Border Case Scenario */}
          <div className="p-5 rounded-2xl bg-[#151515] border border-white/[0.08] space-y-2.5">
            <div className="flex items-center gap-2 text-white">
              <FileCheck className="w-5 h-5 text-[#DCDCDC]" />
              <h3 className="text-xs font-sans tracking-wider uppercase font-semibold text-white">
                Authentic Cross-Border Scenario
              </h3>
            </div>
            <blockquote className="text-sm font-serif text-[#F2F2F2] leading-[1.7] italic bg-[#0C0C0C] p-4 border-l-2 border-white/40 rounded-xl">
              &ldquo;{activeConcept.exampleScenario}&rdquo;
            </blockquote>
          </div>

          {/* Bottom Navigation */}
          <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
            <button
              onClick={() => setSelectedTab('documents')}
              className="text-xs font-sans text-[#A8A8A8] hover:text-white underline flex items-center gap-1.5 cursor-pointer font-medium"
            >
              <BookOpen className="w-4 h-4 text-[#DCDCDC]" />
              <span>Read in Authentic Contracts</span>
            </button>

            <button
              onClick={() => setSelectedTab('practice')}
              className="btn-primary px-5 py-2.5 text-xs uppercase tracking-wider flex items-center gap-1.5 font-semibold"
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
