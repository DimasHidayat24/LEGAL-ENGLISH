import React, { useState } from 'react';
import { useStudy } from '../context/StudyContext';
import { legalVocabularyList } from '../data/vocabularyData';
import { sampleLegalDocuments } from '../data/documentsData';
import { BookOpen, FileText, Scale, ArrowRight, ChevronRight } from 'lucide-react';
import { AnimatedNavyWaveHeroBackground } from './AnimatedNavyWaveHeroBackground';

export const HeroSection: React.FC = () => {
  const { setSelectedTab, setActiveLookupTermId, setActiveDocId, languageMode, theme } = useStudy();
  const [hoveredTermId, setHoveredTermId] = useState<string | null>('whereas');

  const activeHoverTerm = legalVocabularyList.find(t => t.id === hoveredTermId) || legalVocabularyList[0];

  return (
    <div className="space-y-24 pb-20">
      {/* 1. Main Hero Spatial Editorial Section with Animated Navy Wave Background (Hero Section Only) */}
      <section id="hero-banner" className={`relative -mt-20 sm:-mt-28 pt-20 sm:pt-36 pb-16 sm:pb-20 overflow-hidden border-b transition-colors duration-300 ${
        theme === 'dark' ? 'border-white/[0.08] bg-[#050505]' : 'border-black/[0.08] bg-[#F5F5F5]'
      }`}>
        {/* Full-bleed Animated Navy Wave Background System - Hero Section Only */}
        <AnimatedNavyWaveHeroBackground theme={theme} />

        {/* Content Container (z-10 above background) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column: Typography & Floating Pill CTAs */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-7">
              {/* Visual Anchor Headline */}
              <h1 className="text-[40px] sm:text-5xl lg:text-6xl font-sans font-extrabold text-[#F2F2F2] tracking-[-0.04em] leading-[1.02] sm:leading-[1.05] lg:leading-[1.04]">
                Understand the Legal English Meanings
              </h1>

              <p className="text-base sm:text-lg text-[#A8A8A8] font-sans font-normal leading-relaxed max-w-2xl">
                Learn the language of law through documents, doctrine, and practice.
              </p>

              {/* Floating Pill CTAs */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                {/* Primary CTA: Premium floating button with enhanced rotating conic-gradient rainbow border beam and layered glow */}
                <div className="relative inline-flex group items-center justify-center rounded-full p-[2px] transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]">
                  {/* Layer 1: Wide atmospheric soft bloom glow */}
                  <div 
                    className="absolute -inset-2.5 sm:-inset-3 rounded-full overflow-hidden blur-xl opacity-60 dark:opacity-75 pointer-events-none group-hover:opacity-95 group-hover:blur-2xl transition-all duration-300"
                    aria-hidden="true"
                  >
                    <div className="absolute inset-[-200%] m-auto aspect-square animate-border-beam bg-rainbow-beam-glow" />
                  </div>

                  {/* Layer 2: Tight vibrant perimeter halo */}
                  <div 
                    className="absolute -inset-1 rounded-full overflow-hidden blur-[6px] opacity-80 dark:opacity-90 pointer-events-none group-hover:opacity-100 transition-opacity duration-300"
                    aria-hidden="true"
                  >
                    <div className="absolute inset-[-200%] m-auto aspect-square animate-border-beam bg-rainbow-beam" />
                  </div>

                  {/* Base border track */}
                  <div 
                    className="absolute inset-0 rounded-full overflow-hidden bg-white/20 dark:bg-white/20 bg-black/10 pointer-events-none"
                    aria-hidden="true"
                  >
                    {/* Rotating continuous border beam */}
                    <div className="absolute inset-[-200%] m-auto aspect-square animate-border-beam bg-rainbow-beam" />
                  </div>

                  {/* Button surface */}
                  <button
                    onClick={() => setSelectedTab('learn')}
                    className="relative z-10 btn-primary px-5 py-2.5 sm:px-6 sm:py-3 text-xs flex items-center gap-2 tracking-wider uppercase font-bold !border-0 cursor-pointer shadow-[0_0_15px_rgba(255,255,255,0.15)] dark:shadow-[0_0_20px_rgba(255,255,255,0.25)]"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Start Learning</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </button>
                </div>

                {/* Secondary CTA: Transparent dark glass (Section 5) */}
                <button
                  onClick={() => setSelectedTab('documents')}
                  className="btn-secondary px-5 py-2.5 sm:px-6 sm:py-3 text-xs flex items-center gap-2 font-medium"
                >
                  <FileText className="w-4 h-4 opacity-80" />
                  <span>Explore Legal Documents</span>
                </button>

                {/* Tertiary Link */}
                <button
                  onClick={() => setSelectedTab('comparative')}
                  className="px-3 py-2 text-xs font-sans font-medium text-[#A0A0A0] hover:text-[#F5F5F5] flex items-center gap-1.5 cursor-pointer rounded-full hover:bg-white/[0.04] transition-colors"
                >
                  <span>KUHPerdata vs Common Law</span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                </button>
              </div>

              {/* Method Cards: 4 Floating Glass Tiles */}
              <div className="pt-6 border-t border-white/[0.08] dark:border-white/[0.08] border-black/[0.08] grid grid-cols-2 sm:grid-cols-4 gap-3.5 text-xs font-sans">
                <div className="p-4 lexa-card liquid-lens flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] text-[#555555] dark:text-[#A8A8A8] font-bold tracking-wider block mb-1">01. METHOD</span>
                    <span className="font-extrabold text-sm text-[#0C0C0C] dark:text-[#F2F2F2] block">READ</span>
                    <p className="text-[11px] text-[#666666] dark:text-[#707070] mt-1 font-normal leading-snug">Authentic contracts & SIAC awards</p>
                  </div>
                </div>

                <div className="p-4 lexa-card liquid-lens flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] text-[#555555] dark:text-[#A8A8A8] font-bold tracking-wider block mb-1">02. METHOD</span>
                    <span className="font-extrabold text-sm text-[#0C0C0C] dark:text-[#F2F2F2] block">UNDERSTAND</span>
                    <p className="text-[11px] text-[#666666] dark:text-[#707070] mt-1 font-normal leading-snug">Bilingual civil & common context</p>
                  </div>
                </div>

                <div className="p-4 lexa-card liquid-lens flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] text-[#555555] dark:text-[#A8A8A8] font-bold tracking-wider block mb-1">03. METHOD</span>
                    <span className="font-extrabold text-sm text-[#0C0C0C] dark:text-[#F2F2F2] block">DECONSTRUCT</span>
                    <p className="text-[11px] text-[#666666] dark:text-[#707070] mt-1 font-normal leading-snug">Why legal draftspersons choose terms</p>
                  </div>
                </div>

                <div className="p-4 lexa-card liquid-lens flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] text-[#555555] dark:text-[#A8A8A8] font-bold tracking-wider block mb-1">04. METHOD</span>
                    <span className="font-extrabold text-sm text-[#0C0C0C] dark:text-[#F2F2F2] block">APPLY</span>
                    <p className="text-[11px] text-[#666666] dark:text-[#707070] mt-1 font-normal leading-snug">Draft clauses & formal legal opinions</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Floating Glass-Framed Physical Legal Document (Section 6) */}
            <div className="lg:col-span-5 space-y-4">
              {/* Glass Frame Container: 24px rounded subtle glass frame */}
              <div className="p-4 sm:p-5 doc-glass-frame transition-all duration-300">
                
                {/* Physical Opaque Parchment Document */}
                <div className="legal-paper-canvas p-6 relative rounded-2xl shadow-[0_12px_35px_rgba(0,0,0,0.35)]">
                  
                  {/* Document Header */}
                  <div className="doc-header pb-3.5 mb-3.5 flex items-center justify-between border-b border-[#DCD4C6]">
                    <div>
                      <span className="text-[10px] font-sans font-bold tracking-[0.06em] uppercase text-[#505B6D] block">
                        DEED OF COMMERCIAL AGREEMENT
                      </span>
                      <span className="text-xs font-serif font-bold text-[#111722]">
                        Schedule A: Master Purchase & Indemnity
                      </span>
                    </div>
                    <span className="text-[10px] font-sans font-medium px-2.5 py-0.5 bg-black/[0.06] text-[#18202C] border border-black/10 rounded-full uppercase tracking-wider">
                      Physical Preview
                    </span>
                  </div>

                  {/* Contract Clauses with Restrained Steel Blue Annotation Highlights */}
                  <div className="font-serif text-[15px] sm:text-[15.5px] leading-[1.8] text-[#18202C] space-y-3">
                    <p>
                      <span
                        onMouseEnter={() => setHoveredTermId('whereas')}
                        onClick={() => setActiveLookupTermId('whereas')}
                        className={`doc-term-highlight ${hoveredTermId === 'whereas' ? 'active' : ''}`}
                      >
                        WHEREAS
                      </span>
                      , the Seller agrees to fabricate and deliver industrial machinery{' '}
                      <span
                        onMouseEnter={() => setHoveredTermId('pursuant-to')}
                        onClick={() => setActiveLookupTermId('pursuant-to')}
                        className={`doc-term-highlight ${hoveredTermId === 'pursuant-to' ? 'active' : ''}`}
                      >
                        PURSUANT TO
                      </span>{' '}
                      the technical specifications herein;
                    </p>

                    <p>
                      NOW THEREFORE, the Parties{' '}
                      <span
                        onMouseEnter={() => setHoveredTermId('hereby')}
                        onClick={() => setActiveLookupTermId('hereby')}
                        className={`doc-term-highlight ${hoveredTermId === 'hereby' ? 'active' : ''}`}
                      >
                        HEREBY
                      </span>{' '}
                      agree that the Seller{' '}
                      <span
                        onMouseEnter={() => setHoveredTermId('shall')}
                        onClick={() => setActiveLookupTermId('shall')}
                        className={`doc-term-highlight ${hoveredTermId === 'shall' ? 'active' : ''}`}
                      >
                        SHALL
                      </span>{' '}
                      deliver the goods without delay.
                    </p>

                    <p>
                      <span
                        onMouseEnter={() => setHoveredTermId('notwithstanding')}
                        onClick={() => setActiveLookupTermId('notwithstanding')}
                        className={`doc-term-highlight ${hoveredTermId === 'notwithstanding' ? 'active' : ''}`}
                      >
                        NOTWITHSTANDING
                      </span>{' '}
                      any contrary term, any failure shall constitute a material{' '}
                      <span
                        onMouseEnter={() => setHoveredTermId('breach')}
                        onClick={() => setActiveLookupTermId('breach')}
                        className={`doc-term-highlight ${hoveredTermId === 'breach' ? 'active' : ''}`}
                      >
                        BREACH
                      </span>
                      , and the Seller shall provide a full{' '}
                      <span
                        onMouseEnter={() => setHoveredTermId('indemnity')}
                        onClick={() => setActiveLookupTermId('indemnity')}
                        className={`doc-term-highlight ${hoveredTermId === 'indemnity' ? 'active' : ''}`}
                      >
                        INDEMNITY
                      </span>{' '}
                      for any direct{' '}
                      <span
                        onMouseEnter={() => setHoveredTermId('liability')}
                        onClick={() => setActiveLookupTermId('liability')}
                        className={`doc-term-highlight ${hoveredTermId === 'liability' ? 'active' : ''}`}
                      >
                        LIABILITY
                      </span>
                      .
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#DCD4C6] flex items-center justify-between text-[11px] font-sans text-[#505B6D]">
                    <span>Hover or click annotated terms</span>
                    <span className="text-[#111111] font-semibold">Live Term Inspector ↓</span>
                  </div>
                </div>

                {/* Floating Glass Term Inspector Panel */}
                {activeHoverTerm && (
                  <div className="mt-3 p-4 rounded-2xl lexa-card liquid-lens text-xs font-sans transition-all">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-sans font-extrabold text-base text-[#F2F2F2] tracking-tight">
                        {activeHoverTerm.term}
                      </span>
                      <span className="badge-accent text-[10px] font-sans font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                        {activeHoverTerm.category}
                      </span>
                    </div>

                    <p className="font-sans font-bold text-[#F2F2F2] mb-1 text-sm">
                      {activeHoverTerm.indonesianMeaning}
                    </p>

                    <p className="text-[12px] text-[#A8A8A8] line-clamp-2 leading-relaxed font-normal">
                      {activeHoverTerm.indonesianLegalConcept}
                    </p>

                    <div className="mt-3 pt-2.5 border-t border-white/[0.08] flex items-center justify-between">
                      <span className="text-[11px] font-sans text-[#707070]">
                        Equivalent: <span className="font-medium text-[#A8A8A8]">{activeHoverTerm.civilLawEquivalent || 'KUHPerdata context'}</span>
                      </span>
                      <button
                        onClick={() => setActiveLookupTermId(activeHoverTerm.id)}
                        className="text-[11px] font-sans text-white font-bold hover:text-[#DCDCDC] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        View Full Analysis & Clause <ArrowRight className="w-3 h-3 text-white" />
                      </button>
                    </div>
                  </div>
                )}

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Structured Curriculum Tracks Overview (Floating Glass Tiles) */}
      <section id="section-learn-preview" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-3 border-b border-white/[0.08]">
          <div>
            <span className="text-xs font-sans uppercase tracking-wider text-[#A8A8A8] block font-bold">
              ACADEMIC ROADMAP
            </span>
            <h2 className="text-2xl sm:text-4xl font-sans font-extrabold text-[#FFFFFF] tracking-[-0.03em] mt-1">
              Structured Legal English Curriculum
            </h2>
          </div>
          <button
            onClick={() => setSelectedTab('learn')}
            className="text-xs font-sans text-[#A8A8A8] font-medium hover:text-[#FFFFFF] flex items-center gap-1 mt-2 sm:mt-0 cursor-pointer transition-colors"
          >
            <span>View All 10 Lessons</span>
            <ArrowRight className="w-3.5 h-3.5 text-white" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {/* Track 1 */}
          <div 
            onClick={() => setSelectedTab('learn')}
            className="p-6 lexa-card cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <span className="badge-navy text-[10px] font-sans uppercase px-2.5 py-0.5 inline-block mb-3 font-semibold tracking-wider">
                Track 01
              </span>
              <h3 className="font-sans font-bold text-lg text-[#F2F2F2] group-hover:text-white mb-2 transition-colors">
                Foundation & Architecture
              </h3>
              <p className="text-xs text-[#A8A8A8] font-sans font-normal leading-relaxed">
                Legal English vs General English, compound spatial connectors (hereby, thereof, therein), shall vs may vs must, and essential Latin maxims.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs font-sans text-[#A8A8A8] font-medium group-hover:text-white">
              <span>Explore Foundation</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Track 2 */}
          <div 
            onClick={() => setSelectedTab('documents')}
            className="p-6 lexa-card cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <span className="badge-navy text-[10px] font-sans uppercase px-2.5 py-0.5 inline-block mb-3 font-semibold tracking-wider">
                Track 02
              </span>
              <h3 className="font-sans font-bold text-lg text-[#F2F2F2] group-hover:text-white mb-2 transition-colors">
                Legal Documents & Contracts
              </h3>
              <p className="text-xs text-[#A8A8A8] font-sans font-normal leading-relaxed">
                Deconstructing commercial contracts, bilateral NDAs, delay liquidated damages, IP indemnities, and governing law boilerplate.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs font-sans text-[#A8A8A8] font-medium group-hover:text-white">
              <span>Read Documents</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Track 3 */}
          <div 
            onClick={() => setSelectedTab('write')}
            className="p-6 lexa-card cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <span className="badge-navy text-[10px] font-sans uppercase px-2.5 py-0.5 inline-block mb-3 font-semibold tracking-wider">
                Track 03
              </span>
              <h3 className="font-sans font-bold text-lg text-[#F2F2F2] group-hover:text-white mb-2 transition-colors">
                Practical Legal Drafting
              </h3>
              <p className="text-xs text-[#A8A8A8] font-sans font-normal leading-relaxed">
                Write like an international lawyer: IRAC legal memoranda, formal legal opinions, pre-litigation demand notices (somasi), and client emails.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs font-sans text-[#A8A8A8] font-medium group-hover:text-white">
              <span>Open Writing Lab</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Track 4 */}
          <div 
            onClick={() => setSelectedTab('learn')}
            className="p-6 lexa-card cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <span className="badge-navy text-[10px] font-sans uppercase px-2.5 py-0.5 inline-block mb-3 font-semibold tracking-wider">
                Track 04
              </span>
              <h3 className="font-sans font-bold text-lg text-[#F2F2F2] group-hover:text-white mb-2 transition-colors">
                Transnational Practice
              </h3>
              <p className="text-xs text-[#A8A8A8] font-sans font-normal leading-relaxed">
                International commercial arbitration (SIAC / ICC), New York Convention 1958, cross-border M&A equity pacts, and FDI regulations in Indonesia.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs font-sans text-[#A8A8A8] font-medium group-hover:text-white">
              <span>View Advanced</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Spotlight: "Same Concept. Different Language." */}
      <section id="section-comparative-preview" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl glass-panel-deep liquid-lens p-8 sm:p-10 relative overflow-hidden">
          <div className="max-w-3xl space-y-5 relative z-10">
            <span className="text-[11px] font-sans uppercase tracking-wider text-[#A8A8A8] flex items-center gap-2 font-bold">
              <Scale className="w-4 h-4 text-white" />
              SPECIAL FEATURE FOR INDONESIAN JURISTS
            </span>
            <h2 className="text-2xl sm:text-4xl font-sans font-extrabold text-[#FFFFFF] tracking-[-0.03em]">
              Same Concept. Different Language.
            </h2>
            <p className="text-sm sm:text-base text-[#A8A8A8] font-sans font-normal leading-relaxed">
              Compare civil law doctrines (<em>KUHPerdata</em>, <em>HIR/RBg</em>, <em>UU Perseroan Terbatas</em>) with Common Law legal terminology. Understand why legal concepts do not always have 1-to-1 exact equivalents across jurisdictions.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-3 font-sans text-xs">
              <div className="p-4 lexa-card liquid-lens">
                <span className="text-[#A8A8A8] block text-[10px] font-bold uppercase tracking-wider">KUHPerdata</span>
                <span className="font-extrabold text-[#F2F2F2] text-sm block mt-0.5">Wanprestasi</span>
                <span className="text-[#707070] block text-[11px] mt-1 font-normal">⟷ Breach of Contract / Default</span>
              </div>
              <div className="p-4 lexa-card liquid-lens">
                <span className="text-[#A8A8A8] block text-[10px] font-bold uppercase tracking-wider">Pasal 1365 KUHPerdata</span>
                <span className="font-extrabold text-[#F2F2F2] text-sm block mt-0.5">PMH (Onrechtmatige Daad)</span>
                <span className="text-[#707070] block text-[11px] mt-1 font-normal">⟷ Tort / Negligence</span>
              </div>
              <div className="p-4 lexa-card liquid-lens">
                <span className="text-[#A8A8A8] block text-[10px] font-bold uppercase tracking-wider">Pasal 1320 KUHPerdata</span>
                <span className="font-extrabold text-[#F2F2F2] text-sm block mt-0.5">Kausa yang Halal</span>
                <span className="text-[#707070] block text-[11px] mt-1 font-normal">⟷ Consideration & Legality</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setSelectedTab('comparative')}
                className={`btn-primary px-5 py-2.5 text-xs flex items-center gap-2 uppercase tracking-wider font-bold transition-colors ${
                  theme === 'dark'
                    ? '!text-[#050505] !bg-white hover:!bg-[#E8E8E8]'
                    : '!text-white !bg-[#0A0A0A] hover:!bg-[#262626]'
                }`}
              >
                <span>Explore Comparative Law Matrix</span>
                <ArrowRight className={`w-3.5 h-3.5 ${theme === 'dark' ? 'text-[#050505]' : 'text-white'}`} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Document Library Preview */}
      <section id="section-documents-preview" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8 pb-3 border-b border-white/[0.08]">
          <div>
            <span className="text-xs font-sans uppercase tracking-wider text-[#A8A8A8] block font-semibold">
              DIGITAL LAW LIBRARY
            </span>
            <h2 className="text-2xl sm:text-4xl font-sans font-extrabold text-[#FFFFFF] tracking-[-0.03em] mt-1">
              Authentic Legal Documents for Study
            </h2>
          </div>
          <button
            onClick={() => setSelectedTab('documents')}
            className="text-xs font-sans text-[#A8A8A8] font-medium hover:text-[#FFFFFF] flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span>View All Documents</span>
            <ArrowRight className="w-3.5 h-3.5 text-white" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {sampleLegalDocuments.slice(0, 3).map((doc) => (
            <div
              key={doc.id}
              onClick={() => {
                setActiveDocId(doc.id);
                setSelectedTab('documents');
              }}
              className="lexa-card p-6 cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="badge-accent text-[10px] font-sans font-medium uppercase px-2.5 py-0.5 tracking-wider">
                    {doc.documentType}
                  </span>
                  <span className="text-[11px] font-sans text-[#707070] font-medium">
                    {doc.readingTimeMinutes} min read
                  </span>
                </div>

                <h3 className="font-sans font-bold text-base text-[#F2F2F2] group-hover:text-white mb-2 leading-snug transition-colors">
                  {doc.title}
                </h3>

                <p className="text-xs text-[#A8A8A8] font-sans leading-relaxed line-clamp-3 mb-4 font-normal">
                  {languageMode === 'ID' ? doc.abstractId : doc.abstractEn}
                </p>

                <div className="text-[11px] font-sans text-[#707070] space-y-1 mb-4">
                  <div><strong className="text-[#A8A8A8]">Jurisdiction:</strong> {doc.jurisdiction}</div>
                  <div><strong className="text-[#A8A8A8]">Governing Law:</strong> {doc.governingLaw}</div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-sans text-[#A8A8A8] font-medium group-hover:text-white">
                <span>Read & Annotate</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
