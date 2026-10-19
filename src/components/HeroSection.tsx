import React, { useEffect, useState } from 'react';
import { useStudy } from '../context/StudyContext';
import { sampleLegalDocuments } from '../data/documentsData';
import type { LegalTerm } from '../types';
import { ArrowRight, ChevronRight, Bookmark, BookOpen } from 'lucide-react';
import { AnnotatedPage } from './AnnotatedPage';

const PREVIEW_TERM_IDS = ['whereas', 'pursuant-to', 'hereby', 'shall', 'notwithstanding', 'breach', 'indemnity', 'liability'];

const SOURCES = ['KUHPerdata', 'HIR/RBg', 'UU PT', 'CISG', 'SIAC Rules', 'New York Convention 1958', 'UNIDROIT'];

const tracks = [
  {
    tab: 'learn',
    label: 'Track 1',
    title: 'Foundations',
    body: 'Legal English vs everyday English, pronominal connectors (hereby, thereof, therein), shall vs may vs must, and core Latin maxims.',
    cta: 'Start the foundations',
  },
  {
    tab: 'documents',
    label: 'Track 2',
    title: 'Contracts & documents',
    body: 'Read commercial contracts, NDAs, liquidated damages, IP indemnities, and governing-law boilerplate clause by clause.',
    cta: 'Read documents',
  },
  {
    tab: 'write',
    label: 'Track 3',
    title: 'Legal drafting',
    body: 'Write IRAC memos, legal opinions, demand letters (somasi), and client emails in clear legal English.',
    cta: 'Open the writing lab',
  },
  {
    tab: 'learn',
    label: 'Track 4',
    title: 'Cross-border practice',
    body: 'International arbitration (SIAC / ICC), the New York Convention 1958, cross-border M&A, and foreign investment in Indonesia.',
    cta: 'See advanced lessons',
  },
];

const comparisons = [
  { source: 'KUHPerdata', id: 'Wanprestasi', en: 'Breach of contract / default' },
  { source: 'Pasal 1365 KUHPerdata', id: 'Perbuatan Melawan Hukum', en: 'Tort / negligence' },
  { source: 'Pasal 1320 KUHPerdata', id: 'Kausa yang halal', en: 'Consideration & legality' },
];

// Drafting verbs — the "Deconstruct" snippet.
const modalVerbs = [
  { word: 'shall', fn: 'Imposes a duty', id: 'wajib' },
  { word: 'may', fn: 'Grants a discretion', id: 'dapat / berhak' },
  { word: 'shall not', fn: 'Prohibits', id: 'dilarang' },
];

/** Highlight selected phrases inside a plain string (mini snippets only). */
const highlight = (text: string, phrases: string[]) => {
  const re = new RegExp(`(${phrases.map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'g');
  return text.split(re).map((part, i) =>
    phrases.includes(part) ? (
      <span key={i} className="doc-term-highlight">
        {part}
      </span>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    ),
  );
};

const SectionHeader: React.FC<{
  eyebrow?: string;
  title: React.ReactNode;
  body?: string;
  action?: React.ReactNode;
}> = ({ eyebrow, title, body, action }) => (
  <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 sm:mb-14">
    <div className="max-w-2xl">
      {eyebrow && <p className="text-sm text-muted mb-3">{eyebrow}</p>}
      <h2 className="display-h2 text-[32px] sm:text-[44px] text-ink">{title}</h2>
      {body && <p className="text-base sm:text-lg text-muted mt-4 leading-relaxed">{body}</p>}
    </div>
    {action}
  </div>
);

export const HeroSection: React.FC = () => {
  const { setSelectedTab, setActiveLookupTermId, setActiveDocId, languageMode } = useStudy();
  const [previewTerms, setPreviewTerms] = useState<Record<string, LegalTerm>>({});

  // Vocabulary is large — load it on demand so it stays out of the initial bundle.
  useEffect(() => {
    let alive = true;
    import('../data/vocabularyData').then(({ legalVocabularyList }) => {
      if (!alive) return;
      const map: Record<string, LegalTerm> = {};
      PREVIEW_TERM_IDS.forEach((id) => {
        const t = legalVocabularyList.find((x) => x.id === id);
        if (t) map[id] = t;
      });
      setPreviewTerms(map);
    });
    return () => {
      alive = false;
    };
  }, []);

  const indemnity = previewTerms['indemnity'];
  const firstDoc = sampleLegalDocuments[0];
  const recital = firstDoc.paragraphs.find((p) => p.paragraphNumber === 'RECITALS') ?? firstDoc.paragraphs[0];
  const recitalText = recital.text.length > 210 ? `${recital.text.slice(0, 210).trimEnd()}…` : recital.text;

  const openDoc = (id: string) => {
    setActiveDocId(id);
    setSelectedTab('documents');
  };

  const chapters = [
    {
      n: '1.0',
      name: 'Read',
      line: 'Model contracts and award excerpts, annotated clause by clause.',
      tab: 'documents',
      snippet: (
        <div className="paper-card p-5 text-left">
          <div className="flex items-center justify-between gap-3 pb-3 mb-3 border-b border-line">
            <span className="text-xs text-muted truncate">{firstDoc.documentType} · {firstDoc.governingLaw}</span>
            <span className="text-xs text-muted shrink-0">{recital.paragraphNumber}</span>
          </div>
          <p className="font-legal text-[15px] leading-[1.75] text-ink">{highlight(recitalText, ['WHEREAS', 'pursuant to'])}</p>
        </div>
      ),
    },
    {
      n: '2.0',
      name: 'Understand',
      line: 'Every term explained against the Indonesian concept it maps to.',
      tab: 'vocabulary',
      snippet: (
        <div className="paper-card p-5 text-left">
          {indemnity ? (
            <>
              <div className="flex items-center justify-between gap-3">
                <span className="font-legal text-xl font-semibold text-ink">{indemnity.term}</span>
                <span className="text-xs text-muted">{indemnity.partOfSpeech}</span>
              </div>
              <div className="mt-3 flex items-start gap-2 text-sm">
                <span className="shrink-0 px-1.5 py-0.5 rounded-md bg-surface-3 text-[11px] font-medium text-ink-2">ID</span>
                <span className="text-ink font-medium">{indemnity.indonesianMeaning}</span>
              </div>
              <p className="mt-2 text-sm text-muted leading-relaxed line-clamp-3">{indemnity.indonesianLegalConcept}</p>
            </>
          ) : (
            <div className="h-24 rounded-lg bg-surface-3 animate-pulse" />
          )}
        </div>
      ),
    },
    {
      n: '3.0',
      name: 'Deconstruct',
      line: 'Why a drafter picks one word over another — and what it binds.',
      tab: 'learn',
      snippet: (
        <div className="paper-card text-left overflow-hidden">
          {modalVerbs.map((v, i) => (
            <div key={v.word} className={`grid grid-cols-[88px_1fr_auto] items-center gap-3 px-5 py-3.5 text-sm ${i ? 'border-t border-line' : ''}`}>
              <span className="font-legal font-semibold text-ink text-base">{v.word}</span>
              <span className="text-ink-2">{v.fn}</span>
              <span className="text-muted text-xs">{v.id}</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      n: '4.0',
      name: 'Apply',
      line: 'Draft memos, opinions and somasi with standard phrases.',
      tab: 'write',
      snippet: (
        <div className="paper-card p-5 text-left">
          <div className="flex items-center gap-2 pb-3 mb-3 border-b border-line">
            <span className="text-xs text-muted">Legal memorandum · Question presented</span>
          </div>
          <p className="font-legal text-[15px] leading-[1.75] text-ink">
            Whether <span className="px-1 rounded bg-surface-3 text-muted">[Party A]</span> has a lawful right to{' '}
            <span className="px-1 rounded bg-surface-3 text-muted">[action]</span> under{' '}
            <span className="px-1 rounded bg-surface-3 text-muted">[Law/Contract]</span> where{' '}
            <span className="px-1 rounded bg-surface-3 text-muted">[Facts]</span>?
          </p>
          <p className="mt-3 text-xs text-muted">Apakah [Pihak A] memiliki hak sah untuk [tindakan]…</p>
        </div>
      ),
    },
  ];

  return (
    <div>
      {/* ============================== Hero ============================== */}
      <section id="hero-banner" className="pt-14 sm:pt-20 lg:pt-24 pb-14 lg:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-5xl mx-auto">
            <h1 className="display-h1 text-[40px] sm:text-[64px] lg:text-[80px] text-ink">
              Read the law like a <em className="h1-serif">lawyer</em>.
              <br />
              <span className="text-muted">In English.</span>
            </h1>

            <p className="text-base sm:text-lg text-muted leading-relaxed max-w-[34rem] mx-auto mt-6">
              Legal English explained through Indonesian law — contracts, doctrine, and drafting, side by side.
            </p>

            <div className="flex flex-wrap justify-center items-center gap-3 mt-8">
              <button onClick={() => setSelectedTab('learn')} className="btn-primary h-11 px-5 text-[15px]">
                Start learning
              </button>
              <button onClick={() => setSelectedTab('documents')} className="btn-secondary h-11 px-5 text-[15px]">
                Browse documents
              </button>
            </div>

            <p className="mt-6 text-sm text-muted">
              Free for students ·{' '}
              <a
                href="#/vocabulary"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedTab('vocabulary');
                }}
                className="text-ink underline decoration-line-strong underline-offset-4 hover:decoration-current"
              >
                509 terms with Indonesian equivalents
              </a>
            </p>
          </div>

          <div className="mt-12 sm:mt-16 lg:mt-20">
            <AnnotatedPage terms={previewTerms} onOpenTerm={setActiveLookupTermId} onOpenReader={() => openDoc(firstDoc.id)} />
          </div>
        </div>
      </section>

      {/* ============== Sources — set like a book's running head ============== */}
      <section aria-label="Legal sources taught" className="pb-4 lg:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="running-head font-legal text-center">
            <span className="text-muted">Drawn from </span>
            {SOURCES.map((s, i) => (
              <React.Fragment key={s}>
                {i > 0 && (
                  <>
                    {' '}
                    <span className="text-muted px-1" aria-hidden="true">·</span>{' '}
                  </>
                )}
                <span className="whitespace-nowrap text-ink-2">{s}</span>
              </React.Fragment>
            ))}
          </p>
        </div>
      </section>

      {/* ======================= Numbered chapters ======================= */}
      <section id="section-method" className="section-pad">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="How Lexa teaches"
            title={
              <>
                A method, not a word list.
              </>
            }
            body="Four steps that take you from reading a clause to drafting one."
          />

          <ol className="border-t border-line">
            {chapters.map((c, i) => (
              <li
                key={c.n}
                className="grid grid-cols-1 lg:grid-cols-[220px_minmax(0,1fr)_minmax(0,1.2fr)] gap-x-12 border-b border-line lg:border-b-0"
              >
                {/* Section mark on a vertical rule */}
                <div className="relative lg:border-r border-line pt-10 lg:py-12 lg:pr-10 flex lg:block items-baseline gap-4">
                  <span className="chapter-mark" aria-hidden="true">
                    §&thinsp;{i + 1}
                  </span>
                  <span className="lg:hidden text-sm font-mono text-muted">{c.n}</span>
                  <span className="hidden lg:block absolute -right-[4.5px] top-[60px] w-2 h-2 rounded-full bg-ink" aria-hidden="true" />
                </div>
                <div className="pt-4 lg:py-12">
                  <p className="hidden lg:block text-sm font-mono text-muted mb-3">{c.n}</p>
                  <h3 className="text-2xl sm:text-[28px] font-medium tracking-[-0.03em] text-ink">{c.name}</h3>
                  <p className="text-muted mt-3 leading-relaxed max-w-sm">{c.line}</p>
                  <button onClick={() => setSelectedTab(c.tab)} className="btn-ghost text-sm px-0 mt-5">
                    {c.name} in Lexa <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="pt-6 pb-10 lg:py-12">{c.snippet}</div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ============ Same Concept. Different Language. ============ */}
      <section id="section-comparative-preview" className="section-pad border-t border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-5">
              <p className="text-sm text-muted mb-3">Civil law ⟷ common law</p>
              <h2 className="display-h2 text-[36px] sm:text-[52px] text-ink">
                Same concept.
                <br />
                <span className="text-muted">Different language.</span>
              </h2>
              <p className="text-base sm:text-lg text-muted leading-relaxed mt-5">
                Compare civil law doctrine (<em>KUHPerdata</em>, <em>HIR/RBg</em>, <em>UU Perseroan Terbatas</em>) with common law
                terminology — and see why legal concepts rarely have exact one-to-one equivalents.
              </p>
              <button onClick={() => setSelectedTab('comparative')} className="btn-primary h-10 px-4 text-sm mt-8">
                Compare the concepts
              </button>
            </div>
            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-line overflow-hidden bg-surface">
                <div className="hidden sm:grid grid-cols-[1fr_32px_1fr] px-6 py-3 border-b border-line bg-surface-2 text-xs text-muted">
                  <span>Indonesian civil law</span>
                  <span />
                  <span>Common law</span>
                </div>
                {comparisons.map((c, i) => (
                  <div
                    key={c.id}
                    className={`grid grid-cols-1 sm:grid-cols-[1fr_32px_1fr] items-center gap-1 sm:gap-0 px-6 py-5 ${i ? 'border-t border-line' : ''}`}
                  >
                    <div>
                      <span className="block text-xs font-mono text-muted">{c.source}</span>
                      <span className="block font-legal text-lg font-semibold text-ink mt-0.5">{c.id}</span>
                    </div>
                    <span className="text-muted hidden sm:inline" aria-hidden="true">
                      →
                    </span>
                    <div className="pt-2 sm:pt-0">
                      <span className="block text-xs font-mono text-muted sm:hidden">Common law</span>
                      <span className="block text-lg font-medium tracking-[-0.01em] text-ink">{c.en}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ Lesson tracks ============================ */}
      <section id="section-learn-preview" className="section-pad border-t border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Lessons"
            title="Step by step, four tracks."
            body="From first principles to cross-border practice."
            action={
              <button onClick={() => setSelectedTab('learn')} className="btn-secondary h-10 px-4 text-sm self-start md:self-auto">
                <BookOpen className="w-4 h-4" /> View all lessons
              </button>
            }
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {tracks.map((t) => (
              <button
                key={t.title}
                onClick={() => setSelectedTab(t.tab)}
                className="lexa-card p-6 text-left cursor-pointer group flex flex-col justify-between hover:bg-surface-2"
              >
                <div>
                  <span className="text-xs font-mono text-muted">{t.label}</span>
                  <h3 className="font-medium text-lg tracking-[-0.02em] text-ink mt-3 mb-2">{t.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{t.body}</p>
                </div>
                <span className="mt-8 flex items-center gap-1 text-sm font-medium text-ink">
                  {t.cta}
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ============================== Documents ============================== */}
      <section id="section-documents-preview" className="section-pad border-t border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Documents"
            title="Real documents to study."
            body="Model contracts, an opinion, and award excerpts — annotated with Indonesian analysis."
            action={
              <button onClick={() => setSelectedTab('documents')} className="btn-secondary h-10 px-4 text-sm self-start md:self-auto">
                All {sampleLegalDocuments.length} documents <ArrowRight className="w-4 h-4" />
              </button>
            }
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {sampleLegalDocuments.slice(0, 3).map((doc) => (
              <button
                key={doc.id}
                onClick={() => openDoc(doc.id)}
                className="lexa-card p-6 text-left cursor-pointer group flex flex-col justify-between hover:bg-surface-2"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="badge-accent text-xs font-medium px-2 py-0.5 rounded-md">{doc.documentType}</span>
                    <span className="text-xs text-muted">{doc.readingTimeMinutes} min read</span>
                  </div>
                  <h3 className="font-legal font-semibold text-lg text-ink mb-2 leading-snug">{doc.title}</h3>
                  <p className="text-sm text-muted leading-relaxed line-clamp-3 mb-4">
                    {languageMode === 'ID' ? doc.abstractId : doc.abstractEn}
                  </p>
                  <p className="text-xs text-muted">
                    <span className="text-ink-2 font-medium">Governing law:</span> {doc.governingLaw}
                  </p>
                </div>
                <span className="mt-6 pt-4 border-t border-line flex items-center justify-between text-sm font-medium text-ink">
                  Read with annotations
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </button>
            ))}
          </div>

          {/* Closing CTA */}
          <div className="mt-24 lg:mt-32 text-center">
            <h2 className="display-h2 text-[32px] sm:text-[48px] text-ink">Start with one clause today.</h2>
            <p className="text-muted mt-4 text-base sm:text-lg">Free for students. No account needed — progress saves in your browser.</p>
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              <button onClick={() => setSelectedTab('learn')} className="btn-primary h-11 px-5 text-[15px]">
                Start learning
              </button>
              <button onClick={() => setSelectedTab('mystudy')} className="btn-secondary h-11 px-5 text-[15px]">
                <Bookmark className="w-4 h-4" /> My Study
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
