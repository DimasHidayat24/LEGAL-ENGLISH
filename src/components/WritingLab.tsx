import React, { useState } from 'react';
import { writingModulesList } from '../data/writingData';
import { PenTool, Copy, Check, FileText } from 'lucide-react';

export const WritingLab: React.FC = () => {
  const [selectedModuleId, setSelectedModuleId] = useState<string>(writingModulesList[0].id);
  const [copied, setCopied] = useState<boolean>(false);
  const [activeSectionIdx, setActiveSectionIdx] = useState<number>(0);

  const activeModule = writingModulesList.find(m => m.id === selectedModuleId) || writingModulesList[0];
  const activeSection = activeModule.sections[activeSectionIdx] || activeModule.sections[0];

  const handleCopyFullExample = () => {
    navigator.clipboard.writeText(activeModule.fullExample);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="border-b border-[#26344A] pb-6">
        <div className="flex items-center gap-2 mb-1">
          <PenTool className="w-4 h-4 text-[#C9A45C]" />
          <span className="text-[11px] font-sans tracking-widest uppercase text-[#C9A45C] font-bold">
            LEGAL DRAFTING & IRAC WORKBENCH
          </span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-sans font-extrabold text-[#F5F3EE] tracking-tight">
          Write Like a Lawyer
        </h1>
        <p className="text-sm sm:text-base text-[#AAB4C3] font-sans mt-2 max-w-3xl leading-relaxed">
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
              className={`px-3.5 py-2 whitespace-nowrap transition-colors border cursor-pointer rounded-xs text-xs font-semibold ${
                selectedModuleId === mod.id
                  ? 'bg-[#C9A45C] text-[#0B1220] border-[#C9A45C] font-bold shadow-xs'
                  : 'bg-[#111A2B] text-[#AAB4C3] border-[#26344A] hover:bg-[#172235] hover:text-[#F5F3EE]'
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
          <div className="lexa-card p-5 space-y-2 rounded-xs">
            <span className="badge-navy text-[10px] font-sans uppercase px-2 py-0.5 rounded-xs font-semibold">
              {activeModule.documentType}
            </span>
            <h2 className="text-xl sm:text-2xl font-sans font-extrabold text-[#F5F3EE] tracking-tight">
              {activeModule.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#AAB4C3] font-sans">
              {activeModule.subtitle}
            </p>
            <div className="pt-2 border-t border-[#26344A] text-xs font-sans text-[#C5CBD5] italic">
              <strong className="text-[#F5F3EE] font-semibold">Tujuan Praktis:</strong> {activeModule.purposeId}
            </div>
          </div>

          {/* Section Step Pills */}
          <div className="flex items-center gap-1 overflow-x-auto text-xs font-sans border-b border-[#26344A] pb-2 no-scrollbar">
            {activeModule.sections.map((sec, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSectionIdx(idx)}
                className={`px-3 py-1.5 whitespace-nowrap border transition-colors cursor-pointer rounded-xs font-medium ${
                  activeSectionIdx === idx
                    ? 'bg-[#C9A45C] text-[#0B1220] border-[#C9A45C] font-bold shadow-xs'
                    : 'bg-[#111A2B] text-[#AAB4C3] border-[#26344A] hover:bg-[#172235] hover:text-[#F5F3EE]'
                }`}
              >
                {idx + 1}. {sec.sectionName.split('(')[0].trim()}
              </button>
            ))}
          </div>

          {/* Active Section Card */}
          <div className="lexa-card p-6 space-y-6 shadow-xl rounded-xs">
            <div className="border-b border-[#26344A] pb-4 space-y-1">
              <span className="text-[10px] font-sans uppercase tracking-wider text-[#C9A45C] font-bold">
                SECTION {activeSectionIdx + 1} OF {activeModule.sections.length}
              </span>
              <h3 className="text-xl font-sans font-extrabold text-[#F5F3EE]">
                {activeSection.sectionName}
              </h3>
              <p className="text-xs font-sans italic text-[#AAB4C3]">
                Padanan Indonesia: {activeSection.indonesianName}
              </p>
              <p className="text-xs sm:text-sm text-[#C5CBD5] font-sans pt-1 leading-relaxed">
                {activeSection.purpose}
              </p>
            </div>

            {/* Standard Legal Phrases Table */}
            <div className="space-y-2">
              <span className="text-xs font-sans uppercase tracking-wider text-[#C9A45C] font-bold block">
                Standard Legal Formulae & Stock Phrases
              </span>
              <div className="space-y-2">
                {activeSection.standardPhrases.map((phrase, pIdx) => (
                  <div key={pIdx} className="p-3 bg-[#111A2B] border border-[#26344A] space-y-1 rounded-xs">
                    <div className="flex items-center justify-between text-xs font-sans text-[#F5F3EE] font-bold">
                      <span className="text-[#F5F3EE]">&ldquo;{phrase.en}&rdquo;</span>
                      <span className="text-[10px] text-[#AAB4C3] font-normal font-sans">{phrase.notes}</span>
                    </div>
                    <div className="text-xs text-[#AAB4C3] font-sans italic">
                      Terjemahan: {phrase.id}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sample Section Text (Source Serif 4 for authentic legal text) */}
            <div className="space-y-2">
              <span className="text-xs font-sans uppercase tracking-wider text-[#C9A45C] font-bold block">
                Exemplary Professional Drafting
              </span>
              <pre className="font-serif text-xs sm:text-sm text-[#F5F3EE] bg-[#111A2B] p-4 border-l-3 border-[#C9A45C] whitespace-pre-wrap leading-[1.7] rounded-xs">
                {activeSection.sampleText}
              </pre>
            </div>

            {/* Drafting Tips */}
            {activeSection.tips && (
              <div className="p-4 badge-sage space-y-1 text-xs rounded-xs font-sans">
                <span className="font-sans font-bold uppercase tracking-wider block">
                  Partner&apos;s Practice Tips:
                </span>
                <ul className="list-disc list-inside font-sans space-y-0.5">
                  {activeSection.tips.map((tip, tIdx) => (
                    <li key={tIdx}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Full Document Template & Copy Workbench */}
        <div className="lg:col-span-5 sticky top-20 space-y-4">
          <div className="bg-[#111A2B] text-[#F5F3EE] p-4 flex items-center justify-between border border-[#26344A] rounded-xs">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#C9A45C]" />
              <span className="font-sans font-extrabold text-sm tracking-wide uppercase">
                FULL AUTHENTIC TEMPLATE
              </span>
            </div>
            <button
              onClick={handleCopyFullExample}
              className="btn-primary px-3 py-1 text-xs rounded-xs uppercase tracking-wider flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Template'}</span>
            </button>
          </div>

          <div className="lexa-card p-5 max-h-[75vh] overflow-y-auto shadow-xl rounded-xs">
            <pre className="font-serif text-xs sm:text-sm text-[#F5F3EE] whitespace-pre-wrap leading-[1.7]">
              {activeModule.fullExample}
            </pre>
          </div>

          <div className="p-4 bg-[#111A2B] border border-[#26344A] text-xs font-sans text-[#AAB4C3] space-y-1 rounded-xs">
            <span className="font-sans font-bold text-[#F5F3EE] block">
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
