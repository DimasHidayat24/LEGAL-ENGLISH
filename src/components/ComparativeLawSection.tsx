import React, { useState } from 'react';
import { useStudy } from '../context/StudyContext';
import { comparativeLawList } from '../data/comparativeLawData';
import { Scale, ArrowRight, ShieldAlert, BookOpen, FileCheck } from 'lucide-react';

export const ComparativeLawSection: React.FC = () => {
  const { setSelectedTab } = useStudy();
  const [selectedConceptId, setSelectedConceptId] = useState<string>(comparativeLawList[0].id);

  const activeConcept = comparativeLawList.find(c => c.id === selectedConceptId) || comparativeLawList[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="border-b border-[#26344A] pb-6">
        <div className="flex items-center gap-2 mb-1">
          <Scale className="w-4 h-4 text-[#C9A45C]" />
          <span className="text-[11px] font-sans tracking-widest uppercase text-[#C9A45C] font-bold">
            JURISDICTIONAL COMPARATIVE ANALYSIS
          </span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-sans font-extrabold text-[#F5F3EE] tracking-tight">
          Same Concept. Different Language.
        </h1>
        <p className="text-sm sm:text-base text-[#AAB4C3] font-sans mt-2 max-w-3xl leading-relaxed">
          A dedicated comparative jurisprudence module for Indonesian jurists. Understand how Indonesian Civil Law concepts (<em>KUHPerdata</em>, <em>UU PT</em>, <em>HIR</em>) map onto English and Common Law doctrines without falling into dangerous literal translation traps.
        </p>
      </div>

      {/* Main Grid: Concept Selector List (4 cols) + In-depth Analysis Pane (8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Concept Selector */}
        <div className="lg:col-span-4 space-y-2">
          <span className="text-xs font-sans uppercase tracking-wider text-[#AAB4C3] block mb-2 px-1 font-bold">
            Comparative Concepts ({comparativeLawList.length})
          </span>

          <div className="space-y-2 max-h-[80vh] overflow-y-auto pr-1">
            {comparativeLawList.map((item) => {
              const isSelected = item.id === activeConcept.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedConceptId(item.id)}
                  className={`p-4 border transition-all cursor-pointer rounded-xs ${
                    isSelected
                      ? 'bg-[#172235] border-2 border-[#C9A45C] shadow-xs'
                      : 'bg-[#111A2B] text-[#F5F3EE] border-[#26344A] hover:border-[#C9A45C]/40 hover:bg-[#172235]'
                  }`}
                >
                  <span className={`text-[10px] font-sans uppercase px-1.5 py-0.5 inline-block mb-1.5 rounded-xs font-semibold ${
                    isSelected ? 'badge-gold' : 'badge-navy'
                  }`}>
                    {item.category}
                  </span>

                  <h3 className={`font-sans font-bold text-sm ${isSelected ? 'text-[#F5F3EE]' : 'text-[#F5F3EE]'}`}>
                    {item.indonesianTerm}
                  </h3>

                  <div className={`text-xs font-sans mt-1 flex items-center gap-1 ${
                    isSelected ? 'text-[#C9A45C] font-medium' : 'text-[#AAB4C3]'
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
        <div className="lg:col-span-8 lexa-card p-6 sm:p-10 space-y-8 shadow-xl rounded-xs">
          
          {/* Header Title Banner */}
          <div className="border-b border-[#26344A] pb-6 space-y-2">
            <span className="text-xs font-sans uppercase tracking-wider text-[#C9A45C] font-bold">
              COMPARATIVE PAIRING: {activeConcept.category}
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-[#111A2B] border border-[#26344A] rounded-xs">
                <span className="text-[10px] font-sans uppercase tracking-wider text-[#C9A45C] block font-semibold">
                  Indonesian Civil Law Concept (KUHPerdata)
                </span>
                <h2 className="text-lg font-sans font-extrabold text-[#F5F3EE] mt-0.5">
                  {activeConcept.indonesianTerm}
                </h2>
              </div>

              <div className="p-4 bg-[#172235] text-[#F5F3EE] border-2 border-[#C9A45C]/60 rounded-xs">
                <span className="text-[10px] font-sans uppercase tracking-wider text-[#E8D9B5] block font-bold">
                  Anglo-American Common Law Concept
                </span>
                <h2 className="text-lg font-sans font-extrabold text-[#F5F3EE] mt-0.5">
                  {activeConcept.englishTerm}
                </h2>
              </div>
            </div>
          </div>

          {/* Deep Dives Comparison Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Indonesian Civil Law Nuance */}
            <div className="p-5 bg-[#111A2B] border border-[#26344A] space-y-2 rounded-xs">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-[#26344A] text-[#F5F3EE] flex items-center justify-center text-xs font-sans font-bold rounded-xs">
                  ID
                </div>
                <h3 className="font-sans font-bold text-base text-[#F5F3EE]">
                  Indonesian Civil Law Framework
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#C5CBD5] font-sans leading-relaxed">
                {activeConcept.civilLawNuance}
              </p>
            </div>

            {/* Anglo-American Common Law Nuance */}
            <div className="p-5 bg-[#111A2B] border border-[#26344A] space-y-2 rounded-xs">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-[#C9A45C] text-[#0B1220] flex items-center justify-center text-xs font-sans font-bold rounded-xs">
                  EN
                </div>
                <h3 className="font-sans font-bold text-base text-[#F5F3EE]">
                  Common Law / International Doctrine
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#C5CBD5] font-sans leading-relaxed">
                {activeConcept.commonLawNuance}
              </p>
            </div>
          </div>

          {/* The Critical Takeaway: Why Context Matters & Trap to Avoid */}
          <div className="p-5 bg-[#111A2B] border-l-3 border-[#C9A45C] border-y border-r border-[#26344A] space-y-3 rounded-xs">
            <div className="flex items-center gap-2 text-[#C9A45C]">
              <ShieldAlert className="w-5 h-5" />
              <h3 className="text-xs font-sans tracking-wider uppercase font-bold">
                Why Context Matters (The Translation Trap)
              </h3>
            </div>
            <p className="text-sm font-sans text-[#E8D9B5] leading-relaxed">
              {activeConcept.whyContextMatters}
            </p>
          </div>

          {/* Real-World Cross-Border Case Scenario (Source Serif 4) */}
          <div className="p-5 bg-[#111A2B] border border-[#26344A] space-y-3 rounded-xs">
            <div className="flex items-center gap-2 text-[#F5F3EE]">
              <FileCheck className="w-5 h-5 text-[#C9A45C]" />
              <h3 className="text-xs font-sans tracking-wider uppercase font-bold text-[#F5F3EE]">
                Authentic Cross-Border Scenario
              </h3>
            </div>
            <blockquote className="text-sm font-serif text-[#F5F3EE] leading-[1.7] italic bg-[#172235] p-4 border-l-3 border-[#C9A45C] rounded-xs">
              &ldquo;{activeConcept.exampleScenario}&rdquo;
            </blockquote>
          </div>

          {/* Bottom Navigation */}
          <div className="pt-4 border-t border-[#26344A] flex items-center justify-between">
            <button
              onClick={() => setSelectedTab('documents')}
              className="text-xs font-sans text-[#AAB4C3] hover:text-[#F5F3EE] underline flex items-center gap-1.5 cursor-pointer font-medium"
            >
              <BookOpen className="w-4 h-4 text-[#C9A45C]" />
              <span>Read in Authentic Contracts</span>
            </button>

            <button
              onClick={() => setSelectedTab('practice')}
              className="btn-primary px-4 py-2 text-xs rounded-xs uppercase tracking-wider flex items-center gap-1.5"
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
