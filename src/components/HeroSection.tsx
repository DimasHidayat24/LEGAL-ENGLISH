import React, { useState } from 'react';
import { useStudy } from '../context/StudyContext';
import { legalVocabularyList } from '../data/vocabularyData';
import { sampleLegalDocuments } from '../data/documentsData';
import { BookOpen, FileText, Scale, ArrowRight, ChevronRight } from 'lucide-react';
import heroLiquidBg from '../assets/images/hero_liquid_bg_1788085195969.jpg';
import heroLiquidLightBg from '../assets/images/hero_liquid_light_bg_1788182625189.jpg';

export const HeroSection: React.FC = () => {
  const { setSelectedTab, setActiveLookupTermId, setActiveDocId, languageMode, theme } = useStudy();
  const [hoveredTermId, setHoveredTermId] = useState<string | null>('whereas');

  const activeHoverTerm = legalVocabularyList.find(t => t.id === hoveredTermId) || legalVocabularyList[0];

  return (
    <div className="space-y-24 pb-20">
      {/* 1. Main Hero Spatial Editorial Section with Living Animated Water Background (Hero Section Only) */}
      <section id="hero-banner" className={`relative -mt-20 sm:-mt-28 pt-20 sm:pt-36 pb-16 sm:pb-20 overflow-hidden border-b transition-colors duration-300 ${
        theme === 'dark' ? 'border-[#1D3552]/80 bg-[#020813]' : 'border-[#D4DFEC] bg-[#EDF3FA]'
      }`}>
        {/* Full-bleed Living Water Background System - Hero Section Only */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
          {/* Water Layer 1: Undulating Deep Fluid Current & Swell */}
          <div className="absolute -inset-[14%] w-[128%] h-[128%] animate-hero-water-drift">
            <img
              src={theme === 'dark' ? heroLiquidBg : heroLiquidLightBg}
              alt=""
              aria-hidden="true"
              referrerPolicy="no-referrer"
              className={`w-full h-full object-cover object-[70%_40%] filter blur-[0.6px] transition-all duration-700 ${
                theme === 'dark' ? 'opacity-90 brightness-105' : 'opacity-95 brightness-[1.02] contrast-[1.04]'
              }`}
            />
          </div>

          {/* Water Layer 2: Moving Transverse Waves (SVG Wave Currents) */}
          <div className="absolute inset-0 opacity-40 dark:opacity-35 mix-blend-screen dark:mix-blend-overlay overflow-hidden">
            {/* Primary Flowing Wave Ribbon */}
            <div className="absolute -top-[20%] left-0 w-[240%] h-[140%] animate-hero-water-wave-1">
              <svg className="w-full h-full" viewBox="0 0 2400 600" preserveAspectRatio="none" fill="none">
                <defs>
                  <linearGradient id="heroWaterGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={theme === 'dark' ? '#3B82F6' : '#60A5FA'} stopOpacity="0.35" />
                    <stop offset="35%" stopColor={theme === 'dark' ? '#0284C7' : '#38BDF8'} stopOpacity="0.25" />
                    <stop offset="70%" stopColor={theme === 'dark' ? '#1D4ED8' : '#2563EB'} stopOpacity="0.3" />
                    <stop offset="100%" stopColor={theme === 'dark' ? '#38BDF8' : '#93C5FD'} stopOpacity="0.2" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,220 C300,160 600,280 900,210 C1200,150 1500,270 1800,220 C2100,160 2400,280 2700,210 L2700,600 L0,600 Z"
                  fill="url(#heroWaterGrad1)"
                />
              </svg>
            </div>

            {/* Counter-Flow Wave Ribbon (Secondary Swell Interference) */}
            <div className="absolute -top-[10%] left-0 w-[240%] h-[130%] animate-hero-water-wave-2">
              <svg className="w-full h-full" viewBox="0 0 2400 600" preserveAspectRatio="none" fill="none">
                <defs>
                  <linearGradient id="heroWaterGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor={theme === 'dark' ? '#0EA5E9' : '#38BDF8'} stopOpacity="0.2" />
                    <stop offset="50%" stopColor={theme === 'dark' ? '#2563EB' : '#1D4ED8'} stopOpacity="0.28" />
                    <stop offset="100%" stopColor={theme === 'dark' ? '#60A5FA' : '#93C5FD'} stopOpacity="0.15" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,280 C350,330 650,220 950,290 C1250,350 1550,230 1850,280 C2150,340 2450,240 2750,290 L2750,600 L0,600 Z"
                  fill="url(#heroWaterGrad2)"
                />
              </svg>
            </div>
          </div>

          {/* Water Layer 3: Caustic Light Refraction Shimmer */}
          <div
            className="absolute inset-0 animate-hero-water-caustic mix-blend-overlay dark:mix-blend-soft-light"
            style={{
              backgroundImage: theme === 'dark'
                ? `radial-gradient(ellipse at 40% 30%, rgba(125, 185, 245, 0.28) 0%, transparent 55%),
                   radial-gradient(ellipse at 75% 65%, rgba(56, 189, 248, 0.24) 0%, transparent 60%),
                   radial-gradient(ellipse at 20% 80%, rgba(99, 102, 241, 0.18) 0%, transparent 50%)`
                : `radial-gradient(ellipse at 40% 30%, rgba(96, 165, 250, 0.3) 0%, transparent 55%),
                   radial-gradient(ellipse at 75% 65%, rgba(14, 165, 233, 0.25) 0%, transparent 60%),
                   radial-gradient(ellipse at 20% 80%, rgba(147, 197, 253, 0.25) 0%, transparent 50%)`,
              backgroundSize: '120% 120%'
            }}
            aria-hidden="true"
          />

          {/* Water Layer 4: Gentle Concentric Water Drop Ripples */}
          <div className="absolute top-[32%] left-[32%] w-48 h-48 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <div className="absolute inset-0 rounded-full border border-sky-400/30 dark:border-sky-300/25 animate-hero-water-ripple-1 shadow-[0_0_15px_rgba(56,189,248,0.2)]" />
          </div>
          <div className="absolute top-[58%] left-[70%] w-60 h-60 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <div className="absolute inset-0 rounded-full border border-blue-400/25 dark:border-blue-300/20 animate-hero-water-ripple-2 shadow-[0_0_15px_rgba(37,99,235,0.15)]" />
          </div>

          {/* Primary Theme Overlay for text contrast & seamless visual harmony */}
          <div 
            className={`absolute inset-0 transition-colors duration-300 ${
              theme === 'dark' ? 'bg-[#030913]/[0.55]' : 'bg-[#F4F7FB]/[0.2]'
            }`}
            aria-hidden="true"
          />

          {/* Subtle Radial Vignette behind the left headline & description area */}
          <div 
            className="absolute inset-0"
            style={{
              background: theme === 'dark'
                ? 'radial-gradient(circle at 30% 50%, rgba(3, 9, 19, 0.4) 0%, rgba(3, 9, 19, 0.1) 55%, transparent 80%)'
                : 'radial-gradient(circle at 30% 50%, rgba(244, 247, 251, 0.65) 0%, rgba(244, 247, 251, 0.25) 55%, transparent 85%)'
            }}
            aria-hidden="true"
          />

          {/* Elegant subtle bottom fade to seamless canvas */}
          <div 
            className={`absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t transition-colors duration-300 ${
              theme === 'dark'
                ? 'from-[#050B16] via-[#050B16]/60 to-transparent'
                : 'from-[#F4F7FB] via-[#F4F7FB]/80 to-transparent'
            }`}
            aria-hidden="true"
          />
        </div>

        {/* Content Container (z-10 above background) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column: Typography & Floating Pill CTAs */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-7">
              {/* Visual Anchor Headline */}
              <h1 className="text-[40px] sm:text-5xl lg:text-6xl font-sans font-extrabold text-[#F3F5F7] tracking-[-0.04em] leading-[1.02] sm:leading-[1.05] lg:leading-[1.04]">
                Understand the Language Behind the Law.
              </h1>

              <p className="text-base sm:text-lg text-[#9BAABC] font-sans font-normal leading-relaxed max-w-2xl">
                Master Legal English through authentic contracts, Indonesian civil law comparative doctrines, and practical drafting applications. Bridge the gap between Indonesian KUHPerdata and transnational commercial practice.
              </p>

              {/* Floating Pill CTAs */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                {/* Primary CTA */}
                <button
                  onClick={() => setSelectedTab('learn')}
                  className="btn-primary px-6 py-3.5 text-xs flex items-center gap-2 tracking-wider uppercase font-semibold"
                >
                  <BookOpen className="w-4 h-4 text-white" />
                  <span>Start Learning</span>
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </button>

                {/* Secondary CTA */}
                <button
                  onClick={() => setSelectedTab('documents')}
                  className="btn-secondary px-6 py-3.5 text-xs flex items-center gap-2"
                >
                  <FileText className="w-4 h-4 text-[#4F83B8]" />
                  <span>Explore Legal Documents</span>
                </button>

                {/* Tertiary Link */}
                <button
                  onClick={() => setSelectedTab('comparative')}
                  className="px-3 py-2 text-xs font-sans font-medium text-[#9BAABC] hover:text-[#F3F5F7] hover:underline flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>KUHPerdata vs Common Law</span>
                </button>
              </div>

              {/* Method Cards: 4 Floating Glass Tiles */}
              <div className="pt-6 border-t border-[#1D3552]/70 dark:border-[#1D3552]/70 border-[#D4DFEC] grid grid-cols-2 sm:grid-cols-4 gap-3.5 text-xs font-sans">
                <div className="p-4 lexa-card liquid-lens flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] text-[#4F83B8] dark:text-[#4F83B8] font-bold tracking-wider block mb-1">01. METHOD</span>
                    <span className="font-extrabold text-sm text-[#F3F5F7] dark:text-[#F3F5F7] block">READ</span>
                    <p className="text-[11px] text-[#9BAABC] dark:text-[#9BAABC] mt-1 font-normal leading-snug">Authentic contracts & SIAC awards</p>
                  </div>
                </div>

                <div className="p-4 lexa-card liquid-lens flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] text-[#4F83B8] dark:text-[#4F83B8] font-bold tracking-wider block mb-1">02. METHOD</span>
                    <span className="font-extrabold text-sm text-[#F3F5F7] dark:text-[#F3F5F7] block">UNDERSTAND</span>
                    <p className="text-[11px] text-[#9BAABC] dark:text-[#9BAABC] mt-1 font-normal leading-snug">Bilingual civil & common context</p>
                  </div>
                </div>

                <div className="p-4 lexa-card liquid-lens flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] text-[#4F83B8] dark:text-[#4F83B8] font-bold tracking-wider block mb-1">03. METHOD</span>
                    <span className="font-extrabold text-sm text-[#F3F5F7] dark:text-[#F3F5F7] block">DECONSTRUCT</span>
                    <p className="text-[11px] text-[#9BAABC] dark:text-[#9BAABC] mt-1 font-normal leading-snug">Why legal draftspersons choose terms</p>
                  </div>
                </div>

                <div className="p-4 lexa-card liquid-lens flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] text-[#4F83B8] dark:text-[#4F83B8] font-bold tracking-wider block mb-1">04. METHOD</span>
                    <span className="font-extrabold text-sm text-[#F3F5F7] dark:text-[#F3F5F7] block">APPLY</span>
                    <p className="text-[11px] text-[#9BAABC] dark:text-[#9BAABC] mt-1 font-normal leading-snug">Draft clauses & formal legal opinions</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Floating Glass-Framed Physical Legal Document */}
            <div className="lg:col-span-5 space-y-4">
              {/* Glass Frame Container */}
              <div className="p-4 sm:p-5 glass-panel-deep liquid-lens transition-all duration-300">
                
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
                    <span className="text-[#294766] dark:text-[#6A9BCB] font-semibold">Live Term Inspector ↓</span>
                  </div>
                </div>

                {/* Floating Glass Term Inspector Panel */}
                {activeHoverTerm && (
                  <div className="mt-3 p-4 rounded-2xl lexa-card liquid-lens text-xs font-sans transition-all">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-sans font-extrabold text-base text-[#F3F5F7] tracking-tight">
                        {activeHoverTerm.term}
                      </span>
                      <span className="badge-accent text-[10px] font-sans font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                        {activeHoverTerm.category}
                      </span>
                    </div>

                    <p className="font-sans font-bold text-[#F3F5F7] mb-1 text-sm">
                      {activeHoverTerm.indonesianMeaning}
                    </p>

                    <p className="text-[12px] text-[#9BAABC] line-clamp-2 leading-relaxed font-normal">
                      {activeHoverTerm.indonesianLegalConcept}
                    </p>

                    <div className="mt-3 pt-2.5 border-t border-[#1D3552]/80 flex items-center justify-between">
                      <span className="text-[11px] font-sans text-[#64758A]">
                        Equivalent: <span className="font-medium text-[#9BAABC]">{activeHoverTerm.civilLawEquivalent || 'KUHPerdata context'}</span>
                      </span>
                      <button
                        onClick={() => setActiveLookupTermId(activeHoverTerm.id)}
                        className="text-[11px] font-sans text-[#4F83B8] font-bold hover:text-[#6A9BCB] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        View Full Analysis & Clause <ArrowRight className="w-3 h-3" />
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
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-3 border-b border-[#1D3552]/70">
          <div>
            <span className="text-xs font-sans uppercase tracking-wider text-[#4F83B8] block font-bold">
              ACADEMIC ROADMAP
            </span>
            <h2 className="text-2xl sm:text-4xl font-sans font-extrabold text-[#F3F5F7] tracking-[-0.03em] mt-1">
              Structured Legal English Curriculum
            </h2>
          </div>
          <button
            onClick={() => setSelectedTab('learn')}
            className="text-xs font-sans text-[#9BAABC] font-medium hover:text-[#F3F5F7] flex items-center gap-1 mt-2 sm:mt-0 cursor-pointer transition-colors"
          >
            <span>View All 10 Lessons</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#4F83B8]" />
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
              <h3 className="font-sans font-bold text-lg text-[#F3F5F7] group-hover:text-[#6A9BCB] mb-2 transition-colors">
                Foundation & Architecture
              </h3>
              <p className="text-xs text-[#9BAABC] font-sans font-normal leading-relaxed">
                Legal English vs General English, compound spatial connectors (hereby, thereof, therein), shall vs may vs must, and essential Latin maxims.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-[#1D3552]/60 flex items-center justify-between text-xs font-sans text-[#9BAABC] font-medium group-hover:text-[#4F83B8]">
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
              <h3 className="font-sans font-bold text-lg text-[#F3F5F7] group-hover:text-[#6A9BCB] mb-2 transition-colors">
                Legal Documents & Contracts
              </h3>
              <p className="text-xs text-[#9BAABC] font-sans font-normal leading-relaxed">
                Deconstructing commercial contracts, bilateral NDAs, delay liquidated damages, IP indemnities, and governing law boilerplate.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-[#1D3552]/60 flex items-center justify-between text-xs font-sans text-[#9BAABC] font-medium group-hover:text-[#4F83B8]">
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
              <h3 className="font-sans font-bold text-lg text-[#F3F5F7] group-hover:text-[#6A9BCB] mb-2 transition-colors">
                Practical Legal Drafting
              </h3>
              <p className="text-xs text-[#9BAABC] font-sans font-normal leading-relaxed">
                Write like an international lawyer: IRAC legal memoranda, formal legal opinions, pre-litigation demand notices (somasi), and client emails.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-[#1D3552]/60 flex items-center justify-between text-xs font-sans text-[#9BAABC] font-medium group-hover:text-[#4F83B8]">
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
              <h3 className="font-sans font-bold text-lg text-[#F3F5F7] group-hover:text-[#6A9BCB] mb-2 transition-colors">
                Transnational Practice
              </h3>
              <p className="text-xs text-[#9BAABC] font-sans font-normal leading-relaxed">
                International commercial arbitration (SIAC / ICC), New York Convention 1958, cross-border M&A equity pacts, and FDI regulations in Indonesia.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-[#1D3552]/60 flex items-center justify-between text-xs font-sans text-[#9BAABC] font-medium group-hover:text-[#4F83B8]">
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
            <span className="text-[11px] font-sans uppercase tracking-wider text-[#4F83B8] flex items-center gap-2 font-bold">
              <Scale className="w-4 h-4 text-[#4F83B8]" />
              SPECIAL FEATURE FOR INDONESIAN JURISTS
            </span>
            <h2 className="text-2xl sm:text-4xl font-sans font-extrabold text-[#F3F5F7] tracking-[-0.03em]">
              Same Concept. Different Language.
            </h2>
            <p className="text-sm sm:text-base text-[#9BAABC] font-sans font-normal leading-relaxed">
              Compare civil law doctrines (<em>KUHPerdata</em>, <em>HIR/RBg</em>, <em>UU Perseroan Terbatas</em>) with Common Law legal terminology. Understand why legal concepts do not always have 1-to-1 exact equivalents across jurisdictions.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-3 font-sans text-xs">
              <div className="p-4 lexa-card liquid-lens">
                <span className="text-[#4F83B8] block text-[10px] font-bold uppercase tracking-wider">KUHPerdata</span>
                <span className="font-extrabold text-[#F3F5F7] text-sm block mt-0.5">Wanprestasi</span>
                <span className="text-[#9BAABC] block text-[11px] mt-1 font-normal">⟷ Breach of Contract / Default</span>
              </div>
              <div className="p-4 lexa-card liquid-lens">
                <span className="text-[#4F83B8] block text-[10px] font-bold uppercase tracking-wider">Pasal 1365 KUHPerdata</span>
                <span className="font-extrabold text-[#F3F5F7] text-sm block mt-0.5">PMH (Onrechtmatige Daad)</span>
                <span className="text-[#9BAABC] block text-[11px] mt-1 font-normal">⟷ Tort / Negligence</span>
              </div>
              <div className="p-4 lexa-card liquid-lens">
                <span className="text-[#4F83B8] block text-[10px] font-bold uppercase tracking-wider">Pasal 1320 KUHPerdata</span>
                <span className="font-extrabold text-[#F3F5F7] text-sm block mt-0.5">Kausa yang Halal</span>
                <span className="text-[#9BAABC] block text-[11px] mt-1 font-normal">⟷ Consideration & Legality</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setSelectedTab('comparative')}
                className="btn-primary px-5 py-2.5 text-xs flex items-center gap-2 uppercase tracking-wider font-semibold"
              >
                <span>Explore Comparative Law Matrix</span>
                <ArrowRight className="w-3.5 h-3.5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Document Library Preview */}
      <section id="section-documents-preview" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8 pb-3 border-b border-[#1D3552]/70">
          <div>
            <span className="text-xs font-sans uppercase tracking-wider text-[#4F83B8] block font-semibold">
              DIGITAL LAW LIBRARY
            </span>
            <h2 className="text-2xl sm:text-4xl font-sans font-extrabold text-[#F3F5F7] tracking-[-0.03em] mt-1">
              Authentic Legal Documents for Study
            </h2>
          </div>
          <button
            onClick={() => setSelectedTab('documents')}
            className="text-xs font-sans text-[#9BAABC] font-medium hover:text-[#F3F5F7] flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span>View All Documents</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#4F83B8]" />
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
                  <span className="text-[11px] font-sans text-[#64758A] font-medium">
                    {doc.readingTimeMinutes} min read
                  </span>
                </div>

                <h3 className="font-sans font-bold text-base text-[#F3F5F7] group-hover:text-[#6A9BCB] mb-2 leading-snug transition-colors">
                  {doc.title}
                </h3>

                <p className="text-xs text-[#9BAABC] font-sans leading-relaxed line-clamp-3 mb-4 font-normal">
                  {languageMode === 'ID' ? doc.abstractId : doc.abstractEn}
                </p>

                <div className="text-[11px] font-sans text-[#64758A] space-y-1 mb-4">
                  <div><strong className="text-[#9BAABC]">Jurisdiction:</strong> {doc.jurisdiction}</div>
                  <div><strong className="text-[#9BAABC]">Governing Law:</strong> {doc.governingLaw}</div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#1D3552]/60 flex items-center justify-between text-xs font-sans text-[#9BAABC] font-medium group-hover:text-[#4F83B8]">
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
