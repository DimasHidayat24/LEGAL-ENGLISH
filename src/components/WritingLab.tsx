import React, { useState } from 'react';
import { writingModulesList } from '../data/writingData';
import { PenTool, Copy, Check, FileText, ChevronLeft, ChevronRight } from 'lucide-react';

export const WritingLab: React.FC = () => {
  const [selectedModuleId, setSelectedModuleId] = useState<string>(writingModulesList[0].id);
  const [copied, setCopied] = useState<boolean>(false);
  const [copiedSection, setCopiedSection] = useState<boolean>(false);
  const [copiedPhraseIdx, setCopiedPhraseIdx] = useState<number | null>(null);
  const [activeSectionIdx, setActiveSectionIdx] = useState<number>(0);

  const activeModule = writingModulesList.find(m => m.id === selectedModuleId) || writingModulesList[0];
  const activeSection = activeModule.sections[activeSectionIdx] || activeModule.sections[0];

  const handleCopyFullExample = () => {
    navigator.clipboard.writeText(activeModule.fullExample);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopySectionSample = () => {
    navigator.clipboard.writeText(activeSection.sampleText);
    setCopiedSection(true);
    setTimeout(() => setCopiedSection(false), 2000);
  };

  const handleCopyPhrase = (phraseText: string, idx: number) => {
    navigator.clipboard.writeText(phraseText);
    setCopiedPhraseIdx(idx);
    setTimeout(() => setCopiedPhraseIdx(null), 2000);
  };

  const canGoPrev = activeSectionIdx > 0;
  const canGoNext = activeSectionIdx < activeModule.sections.length - 1;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-8">
      
      {/* Header */}
      <div className="border-b border-[#1D3552] dark:border-[#1D3552] border-[#D4DFEC] pb-6">
        <div className="flex items-center gap-2 mb-1.5">
          <PenTool className="w-4 h-4 text-[#4F83B8]" />
          <span className="text-[11px] font-sans tracking-widest uppercase text-[#4F83B8] font-semibold">
            LEGAL DRAFTING & IRAC WORKBENCH
          </span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-sans font-extrabold text-[#F3F5F7] tracking-tight">
          Write Like a Lawyer
        </h1>
        <p className="text-sm sm:text-base text-[#9BAABC] font-sans mt-2 max-w-3xl leading-relaxed">
          Master international corporate and litigation drafting. Explore standardized IRAC memoranda, cross-border legal opinions, and enforceable English demand letters (somasi).
        </p>

        {/* Module Picker */}
        <div className="flex items-center gap-2 overflow-x-auto pt-6 text-xs font-sans no-scrollbar">
          {writingModulesList.map((mod) => (
            <button
              key={mod.id}
              onClick={() => {
                setSelectedModuleId(mod.id);
                setActiveSectionIdx(0);
              }}
              className={`px-4 py-2 whitespace-nowrap transition-all border cursor-pointer rounded-full text-xs font-medium ${
                selectedModuleId === mod.id
                  ? 'bg-[#132B46] text-[#F3F5F7] border-[#294766] font-semibold shadow-xs'
                  : 'bg-[#112239]/60 text-[#9BAABC] border-[#1D3552] hover:bg-[#132B46] hover:text-[#F3F5F7]'
              }`}
            >
              {mod.documentType}: {mod.title.split('How to ')[1] || mod.title}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Section Breakdown (7 cols) + Full Document Model (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Interactive Section Deconstruction */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Module Banner */}
          <div className="p-6 rounded-3xl lexa-card liquid-lens space-y-2">
            <span className="badge-navy text-[10px] font-sans uppercase px-2.5 py-0.5 rounded-full font-semibold">
              {activeModule.documentType}
            </span>
            <h2 className="text-xl sm:text-2xl font-sans font-extrabold text-[#F3F5F7] tracking-tight">
              {activeModule.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#9BAABC] font-sans">
              {activeModule.subtitle}
            </p>
            <div className="pt-2 border-t border-[#1D3552] dark:border-[#1D3552] border-[#D4DFEC] text-xs font-sans text-[#9BAABC] italic">
              <strong className="text-[#F3F5F7] font-semibold">Tujuan Praktis:</strong> {activeModule.purposeId}
            </div>
          </div>

          {/* Section Step Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-sans pb-1 no-scrollbar">
            {activeModule.sections.map((sec, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSectionIdx(idx)}
                className={`px-3.5 py-1.5 whitespace-nowrap border transition-all cursor-pointer rounded-full font-medium ${
                  activeSectionIdx === idx
                    ? 'bg-[#132B46] text-[#F3F5F7] border-[#294766] font-semibold shadow-xs'
                    : 'bg-[#112239]/60 text-[#9BAABC] border-[#1D3552] hover:bg-[#132B46] hover:text-[#F3F5F7]'
                }`}
              >
                {idx + 1}. {sec.sectionName.split('(')[0].trim()}
              </button>
            ))}
          </div>

          {/* Active Section Card */}
          <div className="p-6 sm:p-8 rounded-3xl glass-panel-deep liquid-lens space-y-6">
            <div className="border-b border-[#1D3552] dark:border-[#1D3552] border-[#D4DFEC] pb-4 space-y-1">
              <span className="text-[10px] font-sans uppercase tracking-wider text-[#4F83B8] font-semibold">
                SECTION {activeSectionIdx + 1} OF {activeModule.sections.length}
              </span>
              <h3 className="text-xl font-sans font-extrabold text-[#F3F5F7]">
                {activeSection.sectionName}
              </h3>
              <p className="text-xs font-sans italic text-[#9BAABC]">
                Padanan Indonesia: {activeSection.indonesianName}
              </p>
              <p className="text-xs sm:text-sm text-[#9BAABC] font-sans pt-1 leading-relaxed">
                {activeSection.purpose}
              </p>
            </div>

            {/* Standard Legal Phrases Table */}
            <div className="space-y-2.5">
              <span className="text-xs font-sans uppercase tracking-wider text-[#4F83B8] font-semibold block">
                Standard Legal Formulae & Stock Phrases
              </span>
              <div className="space-y-2">
                {activeSection.standardPhrases.map((phrase, pIdx) => (
                  <div key={pIdx} className="p-4 rounded-2xl lexa-surface-subtle space-y-1 group relative">
                    <div className="flex items-center justify-between text-xs font-sans text-[#F3F5F7] font-semibold gap-2">
                      <span className="text-[#F3F5F7]">&ldquo;{phrase.en}&rdquo;</span>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[10px] text-[#64758A] font-normal">{phrase.notes}</span>
                        <button
                          type="button"
                          onClick={() => handleCopyPhrase(phrase.en, pIdx)}
                          className="p-1 text-[#9BAABC] hover:text-[#F3F5F7] cursor-pointer rounded-full transition-colors"
                          title="Copy phrase to clipboard"
                        >
                          {copiedPhraseIdx === pIdx ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="text-xs text-[#9BAABC] font-sans italic">
                      Terjemahan: {phrase.id}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sample Section Text */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-sans uppercase tracking-wider text-[#4F83B8] font-semibold block">
                  Exemplary Professional Drafting
                </span>
                <button
                  type="button"
                  onClick={handleCopySectionSample}
                  className="px-2.5 py-1 text-[11px] rounded-full border border-[#1D3552] dark:border-[#1D3552] border-[#D4DFEC] text-[#9BAABC] hover:text-[#F3F5F7] hover:bg-[#132B46] cursor-pointer transition-all flex items-center gap-1 font-medium"
                >
                  {copiedSection ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedSection ? 'Copied Clause' : 'Copy Clause'}</span>
                </button>
              </div>
              <pre className="font-serif text-xs sm:text-sm text-[#F3F5F7] bg-[#050B16]/80 dark:bg-[#050B16]/80 bg-[#E8EFF7] p-4 border-l-2 border-[#4F83B8] whitespace-pre-wrap leading-[1.7] rounded-2xl border border-[#1D3552] dark:border-[#1D3552] border-[#D4DFEC]">
                {activeSection.sampleText}
              </pre>
            </div>

            {/* Drafting Tips */}
            {activeSection.tips && (
              <div className="p-4 rounded-2xl lexa-surface-subtle space-y-1 text-xs font-sans">
                <span className="font-sans font-bold uppercase tracking-wider text-[#6A9BCB] block">
                  Partner&apos;s Practice Tips:
                </span>
                <ul className="list-disc list-inside font-sans space-y-0.5 text-[#9BAABC]">
                  {activeSection.tips.map((tip, tIdx) => (
                    <li key={tIdx}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Step Navigation Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-[#1D3552] dark:border-[#1D3552] border-[#D4DFEC]">
              <button
                disabled={!canGoPrev}
                onClick={() => canGoPrev && setActiveSectionIdx(prev => prev - 1)}
                className={`flex items-center gap-1 px-3.5 py-1.5 rounded-full border text-xs font-sans transition-all ${
                  canGoPrev
                    ? 'bg-[#112239] dark:bg-[#112239] bg-[#E8EFF8] text-[#9BAABC] border-[#1D3552] hover:text-[#F3F5F7] hover:bg-[#132B46] cursor-pointer font-medium'
                    : 'opacity-40 cursor-not-allowed border-transparent text-[#64758A]'
                }`}
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Previous Section</span>
              </button>

              <span className="text-[11px] font-sans text-[#64758A]">
                Step {activeSectionIdx + 1} of {activeModule.sections.length}
              </span>

              <button
                disabled={!canGoNext}
                onClick={() => canGoNext && setActiveSectionIdx(prev => prev + 1)}
                className={`flex items-center gap-1 px-3.5 py-1.5 rounded-full border text-xs font-sans transition-all ${
                  canGoNext
                    ? 'bg-[#112239] dark:bg-[#112239] bg-[#E8EFF8] text-[#9BAABC] border-[#1D3552] hover:text-[#F3F5F7] hover:bg-[#132B46] cursor-pointer font-medium'
                    : 'opacity-40 cursor-not-allowed border-transparent text-[#64758A]'
                }`}
              >
                <span>Next Section</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Full Document Template & Copy Workbench */}
        <div className="lg:col-span-5 sticky top-24 space-y-4">
          <div className="p-4 rounded-3xl glass-panel-deep liquid-lens flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#4F83B8]" />
              <span className="font-sans font-extrabold text-sm tracking-wide uppercase text-[#F3F5F7]">
                FULL AUTHENTIC TEMPLATE
              </span>
            </div>
            <button
              onClick={handleCopyFullExample}
              className="btn-primary px-3.5 py-1.5 text-xs rounded-full uppercase tracking-wider flex items-center gap-1.5 font-semibold"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Template'}</span>
            </button>
          </div>

          <div className="p-5 rounded-3xl glass-panel-deep max-h-[75vh] overflow-y-auto no-scrollbar">
            <pre className="font-serif text-xs sm:text-sm text-[#F3F5F7] whitespace-pre-wrap leading-[1.7]">
              {activeModule.fullExample}
            </pre>
          </div>

          <div className="p-4 rounded-2xl lexa-surface-subtle text-xs font-sans text-[#9BAABC] space-y-1">
            <span className="font-sans font-semibold text-[#F3F5F7] block">
              Academic & Professional Standard:
            </span>
            <p className="leading-relaxed">
              Use this structure as your foundation in law school moot court briefs, internal firm memos, and international client correspondence.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
