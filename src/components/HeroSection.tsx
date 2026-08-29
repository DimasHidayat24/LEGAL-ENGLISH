import React, { useState } from 'react';
import { useStudy } from '../context/StudyContext';
import { legalVocabularyList } from '../data/vocabularyData';
import { sampleLegalDocuments } from '../data/documentsData';
import { BookOpen, FileText, Scale, ArrowRight, ChevronRight } from 'lucide-react';
import { LexaLogo } from './LexaLogo';

export const HeroSection: React.FC = () => {
  const { setSelectedTab, setActiveLookupTermId, setActiveDocId, languageMode } = useStudy();
  const [hoveredTermId, setHoveredTermId] = useState<string | null>('whereas');

  const activeHoverTerm = legalVocabularyList.find(t => t.id === hoveredTermId) || legalVocabularyList[0];

  return (
    <div className="space-y-20 pb-16">
      {/* 1. Main Hero Editorial Section */}
      <section className="relative pt-10 sm:pt-16 pb-12 border-b border-[#26344A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Typography & CTAs */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#111A2B] border border-[#26344A] text-[11px] font-sans font-semibold text-[#AAB4C3] rounded-xs uppercase tracking-[0.05em]">
                <LexaLogo className="w-3.5 h-3.5" size={14} variant="colored" />
                <span className="text-[#C9A45C]">FOR INDONESIAN LAW STUDENTS & JURISTS</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-sans font-extrabold text-[#F5F3EE] tracking-[-0.04em] leading-[1.08] lg:leading-[1.04]">
                Understand the Language Behind the Law.
              </h1>

              <p className="text-base sm:text-lg text-[#AAB4C3] font-sans font-normal leading-relaxed max-w-2xl">
                Learn Legal English through authentic legal documents, Indonesian civil law explanations, and practical drafting applications. Bridge the gap between Indonesian KUHPerdata doctrine and international commercial practice.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => setSelectedTab('learn')}
                  className="btn-primary px-6 py-3.5 text-xs rounded-xs flex items-center gap-2 tracking-wider uppercase font-bold"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Start Learning</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => setSelectedTab('documents')}
                  className="btn-secondary px-6 py-3.5 text-xs rounded-xs flex items-center gap-2"
                >
                  <FileText className="w-4 h-4 text-[#C9A45C]" />
                  <span>Explore Legal Documents</span>
                </button>

                <button
                  onClick={() => setSelectedTab('comparative')}
                  className="px-4 py-3.5 text-xs font-sans font-semibold text-[#AAB4C3] hover:text-[#E8D9B5] underline hover:no-underline flex items-center gap-1 cursor-pointer"
                >
                  <span>KUHPerdata vs Common Law</span>
                </button>
              </div>

              {/* Core Methodology Pills */}
              <div className="pt-6 border-t border-[#26344A] grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-sans">
                <div className="p-3.5 lexa-card rounded-xs">
                  <span className="text-[10px] text-[#C9A45C] font-bold uppercase tracking-[0.05em] block">01. METHOD</span>
                  <span className="font-bold text-[#F5F3EE]">READ</span>
                  <p className="text-[11px] text-[#AAB4C3] mt-0.5 font-normal">Authentic contracts & SIAC awards</p>
                </div>
                <div className="p-3.5 lexa-card rounded-xs">
                  <span className="text-[10px] text-[#C9A45C] font-bold uppercase tracking-[0.05em] block">02. METHOD</span>
                  <span className="font-bold text-[#F5F3EE]">UNDERSTAND</span>
                  <p className="text-[11px] text-[#AAB4C3] mt-0.5 font-normal">Bilingual legal context</p>
                </div>
                <div className="p-3.5 lexa-card rounded-xs">
                  <span className="text-[10px] text-[#C9A45C] font-bold uppercase tracking-[0.05em] block">03. METHOD</span>
                  <span className="font-bold text-[#F5F3EE]">DECONSTRUCT</span>
                  <p className="text-[11px] text-[#AAB4C3] mt-0.5 font-normal">Why lawyers use each term</p>
                </div>
                <div className="p-3.5 lexa-card rounded-xs">
                  <span className="text-[10px] text-[#C9A45C] font-bold uppercase tracking-[0.05em] block">04. METHOD</span>
                  <span className="font-bold text-[#F5F3EE]">APPLY</span>
                  <p className="text-[11px] text-[#AAB4C3] mt-0.5 font-normal">Draft clauses & legal memos</p>
                </div>
              </div>
            </div>

            {/* Right Column: Warm Reading Parchment Preview with Dark App Framing */}
            <div className="lg:col-span-5 space-y-4">
              <div className="legal-paper-canvas p-6 sm:p-7 relative rounded-xs">
                
                {/* Document Header */}
                <div className="doc-header pb-4 mb-4 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-sans font-bold tracking-[0.05em] uppercase text-[#8F7647] block">
                      DEED OF COMMERCIAL AGREEMENT
                    </span>
                    <span className="text-xs font-serif font-bold text-[#151A24]">
                      Schedule A: Master Purchase & Indemnity
                    </span>
                  </div>
                  <span className="text-[10px] font-sans font-semibold px-2 py-0.5 bg-[#E8D9B5] text-[#202633] border border-[#C9A45C]/40 rounded-xs uppercase tracking-wider">
                    PARCHMENT PREVIEW
                  </span>
                </div>

                {/* Simulated Contract Paragraphs in Source Serif 4 on #F4F0E8 Canvas */}
                <div className="font-serif text-[15px] sm:text-[16px] leading-[1.8] text-[#202633] space-y-3">
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

                <div className="mt-4 pt-3 border-t border-[#DDD4C4] flex items-center justify-between text-[11px] font-sans text-[#596273]">
                  <span>Hover or click highlighted terms</span>
                  <span className="text-[#8F7647] font-semibold">Live Term Inspector ↓</span>
                </div>
              </div>

              {/* Dynamic Inspector Preview Card in Navy Surface */}
              {activeHoverTerm && (
                <div className="lexa-card p-4 text-xs font-sans transition-all border-[#C9A45C]/40 rounded-xs">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-sans font-extrabold text-base text-[#F5F3EE] tracking-tight">
                      {activeHoverTerm.term}
                    </span>
                    <span className="badge-gold text-[10px] font-sans font-semibold px-2 py-0.5 rounded-xs uppercase tracking-wider">
                      {activeHoverTerm.category}
                    </span>
                  </div>

                  <p className="font-sans font-bold text-[#E8D9B5] mb-1 text-sm">
                    {activeHoverTerm.indonesianMeaning}
                  </p>

                  <p className="text-[12px] text-[#C5CBD5] line-clamp-2 leading-relaxed font-normal">
                    {activeHoverTerm.indonesianLegalConcept}
                  </p>

                  <div className="mt-3 pt-2 border-t border-[#26344A] flex items-center justify-between">
                    <span className="text-[11px] font-sans text-[#AAB4C3]">
                      Equivalent: <span className="font-medium text-[#F5F3EE]">{activeHoverTerm.civilLawEquivalent || 'KUHPerdata context'}</span>
                    </span>
                    <button
                      onClick={() => setActiveLookupTermId(activeHoverTerm.id)}
                      className="text-[11px] font-sans text-[#C9A45C] font-bold hover:text-[#E8D9B5] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      View Full Analysis & Clause <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* 2. Structured Curriculum Tracks Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-3 border-b border-[#26344A]">
          <div>
            <span className="text-xs font-sans uppercase tracking-[0.05em] text-[#C9A45C] block font-bold">
              ACADEMIC ROADMAP
            </span>
            <h2 className="text-2xl sm:text-4xl font-sans font-extrabold text-[#F5F3EE] tracking-[-0.03em]">
              Structured Legal English Curriculum
            </h2>
          </div>
          <button
            onClick={() => setSelectedTab('learn')}
            className="text-xs font-sans text-[#AAB4C3] font-semibold hover:text-[#E8D9B5] hover:underline flex items-center gap-1 mt-2 sm:mt-0 cursor-pointer"
          >
            <span>View All 10 Lessons</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Track 1 */}
          <div 
            onClick={() => setSelectedTab('learn')}
            className="p-6 lexa-card cursor-pointer group flex flex-col justify-between rounded-xs"
          >
            <div>
              <span className="badge-navy text-[10px] font-sans uppercase px-2 py-0.5 inline-block mb-3 rounded-xs font-semibold tracking-wider">
                Track 01
              </span>
              <h3 className="font-sans font-bold text-lg text-[#F5F3EE] group-hover:text-[#E8D9B5] mb-2 transition-colors">
                Foundation & Architecture
              </h3>
              <p className="text-xs text-[#AAB4C3] font-sans font-normal leading-relaxed">
                Legal English vs General English, compound spatial connectors (hereby, thereof, therein), shall vs may vs must, and essential Latin maxims.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-[#26344A] flex items-center justify-between text-xs font-sans text-[#AAB4C3] font-semibold group-hover:text-[#C9A45C]">
              <span>Explore Foundation</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Track 2 */}
          <div 
            onClick={() => setSelectedTab('documents')}
            className="p-6 lexa-card cursor-pointer group flex flex-col justify-between rounded-xs"
          >
            <div>
              <span className="badge-navy text-[10px] font-sans uppercase px-2 py-0.5 inline-block mb-3 rounded-xs font-semibold tracking-wider">
                Track 02
              </span>
              <h3 className="font-sans font-bold text-lg text-[#F5F3EE] group-hover:text-[#E8D9B5] mb-2 transition-colors">
                Legal Documents & Contracts
              </h3>
              <p className="text-xs text-[#AAB4C3] font-sans font-normal leading-relaxed">
                Deconstructing commercial contracts, bilateral NDAs, delay liquidated damages, IP indemnities, and governing law boilerplate.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-[#26344A] flex items-center justify-between text-xs font-sans text-[#AAB4C3] font-semibold group-hover:text-[#C9A45C]">
              <span>Read Documents</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Track 3 */}
          <div 
            onClick={() => setSelectedTab('write')}
            className="p-6 lexa-card cursor-pointer group flex flex-col justify-between rounded-xs"
          >
            <div>
              <span className="badge-navy text-[10px] font-sans uppercase px-2 py-0.5 inline-block mb-3 rounded-xs font-semibold tracking-wider">
                Track 03
              </span>
              <h3 className="font-sans font-bold text-lg text-[#F5F3EE] group-hover:text-[#E8D9B5] mb-2 transition-colors">
                Practical Legal Drafting
              </h3>
              <p className="text-xs text-[#AAB4C3] font-sans font-normal leading-relaxed">
                Write like an international lawyer: IRAC legal memoranda, formal legal opinions, pre-litigation demand notices (somasi), and client emails.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-[#26344A] flex items-center justify-between text-xs font-sans text-[#AAB4C3] font-semibold group-hover:text-[#C9A45C]">
              <span>Open Writing Lab</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Track 4 */}
          <div 
            onClick={() => setSelectedTab('learn')}
            className="p-6 lexa-card cursor-pointer group flex flex-col justify-between rounded-xs"
          >
            <div>
              <span className="badge-navy text-[10px] font-sans uppercase px-2 py-0.5 inline-block mb-3 rounded-xs font-semibold tracking-wider">
                Track 04
              </span>
              <h3 className="font-sans font-bold text-lg text-[#F5F3EE] group-hover:text-[#E8D9B5] mb-2 transition-colors">
                Transnational Practice
              </h3>
              <p className="text-xs text-[#AAB4C3] font-sans font-normal leading-relaxed">
                International commercial arbitration (SIAC / ICC), New York Convention 1958, cross-border M&A equity pacts, and FDI regulations in Indonesia.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-[#26344A] flex items-center justify-between text-xs font-sans text-[#AAB4C3] font-semibold group-hover:text-[#C9A45C]">
              <span>View Advanced</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Spotlight: "Same Concept. Different Language." */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#111A2B] border border-[#26344A] text-[#F5F3EE] p-8 sm:p-10 relative overflow-hidden rounded-xs">
          <div className="max-w-3xl space-y-4 relative z-10">
            <span className="text-[11px] font-sans uppercase tracking-[0.05em] text-[#C9A45C] flex items-center gap-2 font-bold">
              <Scale className="w-4 h-4 text-[#C9A45C]" />
              SPECIAL FEATURE FOR INDONESIAN JURISTS
            </span>
            <h2 className="text-2xl sm:text-4xl font-sans font-extrabold text-[#F5F3EE] tracking-[-0.03em]">
              Same Concept. Different Language.
            </h2>
            <p className="text-sm sm:text-base text-[#AAB4C3] font-sans font-normal leading-relaxed">
              Compare civil law doctrines (<em>KUHPerdata</em>, <em>HIR/RBg</em>, <em>UU Perseroan Terbatas</em>) with Common Law legal terminology. Understand why legal concepts do not always have 1-to-1 exact equivalents across jurisdictions.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 font-sans text-xs">
              <div className="p-3.5 lexa-card rounded-xs">
                <span className="text-[#C9A45C] block text-[10px] font-semibold uppercase tracking-wider">KUHPerdata</span>
                <span className="font-bold text-[#F5F3EE] text-sm block mt-0.5">Wanprestasi</span>
                <span className="text-[#AAB4C3] block text-[11px] mt-1">⟷ Breach of Contract / Default</span>
              </div>
              <div className="p-3.5 lexa-card rounded-xs">
                <span className="text-[#C9A45C] block text-[10px] font-semibold uppercase tracking-wider">Pasal 1365 KUHPerdata</span>
                <span className="font-bold text-[#F5F3EE] text-sm block mt-0.5">PMH (Onrechtmatige Daad)</span>
                <span className="text-[#AAB4C3] block text-[11px] mt-1">⟷ Tort / Negligence</span>
              </div>
              <div className="p-3.5 lexa-card rounded-xs">
                <span className="text-[#C9A45C] block text-[10px] font-semibold uppercase tracking-wider">Pasal 1320 KUHPerdata</span>
                <span className="font-bold text-[#F5F3EE] text-sm block mt-0.5">Kausa yang Halal</span>
                <span className="text-[#AAB4C3] block text-[11px] mt-1">⟷ Consideration & Legality</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => setSelectedTab('comparative')}
                className="btn-primary px-5 py-2.5 text-xs rounded-xs flex items-center gap-2 uppercase tracking-wider"
              >
                <span>Explore Comparative Law Matrix</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Document Library Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8 pb-3 border-b border-[#26344A]">
          <div>
            <span className="text-xs font-sans uppercase tracking-[0.05em] text-[#C9A45C] block font-bold">
              DIGITAL LAW LIBRARY
            </span>
            <h2 className="text-2xl sm:text-4xl font-sans font-extrabold text-[#F5F3EE] tracking-[-0.03em]">
              Authentic Legal Documents for Study
            </h2>
          </div>
          <button
            onClick={() => setSelectedTab('documents')}
            className="text-xs font-sans text-[#AAB4C3] font-semibold hover:text-[#E8D9B5] hover:underline flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span>View All Documents</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sampleLegalDocuments.slice(0, 3).map((doc) => (
            <div
              key={doc.id}
              onClick={() => {
                setActiveDocId(doc.id);
                setSelectedTab('documents');
              }}
              className="lexa-card p-6 cursor-pointer group flex flex-col justify-between rounded-xs"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="badge-gold text-[10px] font-sans font-semibold uppercase px-2 py-0.5 rounded-xs tracking-wider">
                    {doc.documentType}
                  </span>
                  <span className="text-[11px] font-sans text-[#AAB4C3] font-medium">
                    {doc.readingTimeMinutes} min read
                  </span>
                </div>

                <h3 className="font-sans font-bold text-base text-[#F5F3EE] group-hover:text-[#E8D9B5] mb-2 leading-snug transition-colors">
                  {doc.title}
                </h3>

                <p className="text-xs text-[#AAB4C3] font-sans leading-relaxed line-clamp-3 mb-4">
                  {languageMode === 'ID' ? doc.abstractId : doc.abstractEn}
                </p>

                <div className="text-[11px] font-sans text-[#AAB4C3] space-y-1 mb-4">
                  <div><strong className="text-[#F5F3EE]">Jurisdiction:</strong> {doc.jurisdiction}</div>
                  <div><strong className="text-[#F5F3EE]">Governing Law:</strong> {doc.governingLaw}</div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#26344A] flex items-center justify-between text-xs font-sans text-[#AAB4C3] font-semibold group-hover:text-[#C9A45C]">
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
