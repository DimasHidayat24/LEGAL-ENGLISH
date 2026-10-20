import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useStudy } from '../context/StudyContext';
import { sampleLegalDocuments } from '../data/documentsData';
import { legalVocabularyList } from '../data/vocabularyData';
import type { DocumentParagraph, LegalDocument, LegalTerm } from '../types';
import { LegalWord } from './LegalWord';
import {
  ArrowRight, Bookmark, BookmarkCheck, Check, CheckCircle2, ChevronDown, ChevronLeft, ChevronRight, CloudCheck, Copy,
  Eye, ListTree, MessageSquare, MessageSquareText, Printer, Scale, Search, Volume2, X,
} from 'lucide-react';
import { CONTENT_W, CONTENT_H, MARGIN, PAGE_H, PAGE_W, type Block, type BlockKind, wordCount } from './writing/docModel';
import { paginate, type Part } from './writing/paginate';
import {
  COMMENTS_GAP, COMMENTS_W, DocIcon, Menu, ZOOMS, type ZoomSel, printDoc, reducedMotion, stackComments, useDocFontsReady,
} from './writing/chrome';

/* ------------------------------------------------------------------ */
/* Term matching (unchanged rules from the original reader)            */
/* ------------------------------------------------------------------ */

const termById = (id: string) => legalVocabularyList.find((t) => t.id === id);

const getTermVariants = (term: LegalTerm): string[] => {
  const base = term.term.trim();
  const variants = [base];
  if (term.id === 'covenant') variants.push('covenants', 'covenant');
  if (term.id === 'shareholder') variants.push('shareholders', 'shareholder');
  if (term.id === 'liability') variants.push('liabilities', 'liability', 'liable');
  if (term.id === 'indemnity') variants.push('indemnify', 'indemnities', 'indemnified', 'indemnity');
  if (term.id === 'representation') variants.push('representations', 'represents', 'representation');
  if (term.id === 'warranty') variants.push('warranties', 'warrants', 'warranty');
  if (term.id === 'breach') variants.push('breaches', 'breached', 'breach');
  if (term.id === 'arbitration') variants.push('arbitral', 'arbitration');
  if (term.id === 'severability') variants.push('severed', 'severability');
  if (term.id === 'thereto') variants.push('hereto', 'thereto');
  if (term.id === 'due-diligence') variants.push('legal due diligence', 'due diligence');
  if (term.id === 'hold-harmless') variants.push('hold harmless', 'holds harmless', 'holding harmless');
  if (term.id === 'preponderance-of-evidence') variants.push('preponderance of the evidence', 'preponderance of evidence');
  if (term.id === 'bona-fide') variants.push('bona fide', 'mala fide');
  if (!base.endsWith('s')) variants.push(`${base}s`);
  return variants;
};

interface Matcher { re: RegExp; map: Map<string, LegalTerm> }

function buildMatcher(ids: string[] | undefined): Matcher | null {
  const terms = (ids ?? []).map(termById).filter((t): t is LegalTerm => !!t);
  if (!terms.length) return null;
  const map = new Map<string, LegalTerm>();
  const all: string[] = [];
  for (const t of terms) {
    for (const v of getTermVariants(t)) {
      const lower = v.toLowerCase();
      if (!map.has(lower)) { map.set(lower, t); all.push(v); }
    }
  }
  if (!all.length) return null;
  all.sort((a, b) => b.length - a.length);
  const re = new RegExp(`\\b(${all.map((v) => v.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')).join('|')})\\b`, 'gi');
  return { re, map };
}

/* ------------------------------------------------------------------ */
/* Document → blocks (presentation only; the text is the data as is)   */
/* ------------------------------------------------------------------ */

interface DBlock extends Block {
  /** paragraph this block belongs to (-1 = front matter / execution) */
  pi: number;
  matcher?: Matcher | null;
  extra?: string;
}

const isExecuted = (d: LegalDocument) => d.documentType === 'Contract' || d.documentType === 'Corporate';

/** "DELIVERY & DELAY CLAUSE 4.2" → heading + clause "4.2"; "SECTION 1: SCOPE" → "1. SCOPE"; "… ¶14" → "14." */
function parseNumber(raw: string): { heading?: string; headLabel?: string; centred?: boolean; kind: BlockKind; label?: string } {
  const n = raw.trim();
  if (n === 'PREAMBLE') return { kind: 'p' };
  if (/^RECITALS?$/.test(n)) return { heading: 'RECITALS', centred: true, kind: 'p' };
  let m = n.match(/^RECITALS?\s+([A-Z])$/);
  if (m) return { heading: 'RECITALS', centred: true, kind: 'num', label: `(${m[1]})` };
  m = n.match(/^SECTION\s+(\d+):\s*(.+)$/);
  if (m) return { heading: m[2], headLabel: `${m[1]}.`, kind: 'p' };
  m = n.match(/^(.*?)\s*¶\s*(\d+)$/);
  if (m) return { heading: m[1] || undefined, kind: 'num', label: `${m[2]}.` };
  m = n.match(/^(.*?)\s+(\d+)\.(\d+)$/);
  if (m) return { heading: m[1], headLabel: `${m[2]}.`, kind: 'clause', label: `${m[2]}.${m[3]}` };
  return { heading: n, kind: 'p' };
}

function buildDocBlocks(doc: LegalDocument): DBlock[] {
  const out: DBlock[] = [];
  let bi = 0;
  const push = (b: Partial<DBlock> & { kind: BlockKind; text: string; pi: number }) => {
    out.push({ id: `${doc.id}-${bi}`, sec: b.pi, bi: bi++, hits: [], first: false, hasFields: false, ...b } as DBlock);
  };
  push({ kind: 'title', text: doc.title, pi: -1, extra: 'is-doctitle' });
  push({ kind: 'lh2', text: `Governing Law: ${doc.governingLaw} · Jurisdiction: ${doc.jurisdiction}`, pi: -1, extra: 'dr-b--meta' });
  if (doc.parties?.length && !isExecuted(doc)) {
    push({ kind: 'lh2', text: `Parties: ${doc.parties.join(' and ')}`, pi: -1, extra: 'dr-b--meta dr-b--parties' });
  }
  let lastHeading = '';
  doc.paragraphs.forEach((p, pi) => {
    const parsed = parseNumber(p.paragraphNumber);
    let first = true;
    if (parsed.heading && parsed.heading !== lastHeading) {
      push({
        kind: parsed.centred ? 'title' : 'heading', text: parsed.heading, label: parsed.headLabel, pi, first: true,
        extra: parsed.centred ? 'dr-b--subtitle' : undefined,
      });
      first = false;
    }
    lastHeading = parsed.heading ?? '';
    push({ kind: parsed.kind, label: parsed.label, text: p.text, pi, first, matcher: buildMatcher(p.highlightedTermIds) });
  });
  if (isExecuted(doc) && doc.parties?.length) {
    push({ kind: 'gap', text: '', pi: -1 });
    push({ kind: 'party', text: doc.parties.join('\n'), pi: -1, extra: 'dr-exec' });
  }
  return out;
}

/** Short label for a paragraph in the outline and the comment cards. */
const paraLabel = (p: DocumentParagraph) => {
  const parsed = parseNumber(p.paragraphNumber);
  if (p.paragraphNumber === 'PREAMBLE') return 'Preamble';
  const name = (parsed.heading ?? p.paragraphNumber).toLowerCase().replace(/(^|\s|&)\S/g, (c) => c.toUpperCase());
  const num = parsed.label ?? parsed.headLabel;
  return num && !/^\(/.test(num) ? `${num.replace(/\.$/, '')} · ${name}` : num ? `${name} ${num}` : name;
};

const FONT_PX = { sm: 14, base: 16, lg: 18.667 } as const;
const FONT_PT = { sm: '10.5', base: '12', lg: '14' } as const;

/* ------------------------------------------------------------------ */
/* Main                                                                */
/* ------------------------------------------------------------------ */

interface Pos { top: number }

export const DocumentReader: React.FC = () => {
  const {
    activeDocId, setActiveDocId, setActiveLookupTermId, isTermSaved, saveTerm, removeSavedTerm,
    toggleBookmarkParagraph, isParagraphBookmarked, completedDocuments, markDocumentComplete, personalNotes, saveNote,
  } = useStudy();

  const currentDoc = sampleLegalDocuments.find((d) => d.id === activeDocId) || sampleLegalDocuments[0];
  const isDocCompleted = completedDocuments.includes(currentDoc.id);
  const paras = currentDoc.paragraphs;

  /* ---- reader state */
  const [selectedLegalTerm, setSelectedLegalTerm] = useState<LegalTerm | null>(null);
  /** paragraph whose card shows the term inspector */
  const [termPara, setTermPara] = useState<number | null>(null);
  const [activeSec, setActiveSec] = useState<number | null>(0);
  const [commentsOn, setCommentsOn] = useState<boolean>(true); // "Indonesian analysis" in the margin
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg'>('base');
  const [zoomSel, setZoomSel] = useState<ZoomSel>('fit');
  const [outlineOpen, setOutlineOpen] = useState<boolean>(() => typeof window === 'undefined' || window.innerWidth >= 1024);
  const [activeParagraphNoteId, setActiveParagraphNoteId] = useState<string | null>(null);
  const [tempNoteText, setTempNoteText] = useState<string>('');
  const [docQuery, setDocQuery] = useState<string>('');
  const [docTypeFilter, setDocTypeFilter] = useState<string>('ALL');
  const [readProgress, setReadProgress] = useState<number>(0);
  const [pages, setPages] = useState<Part[][]>([]);
  const [canvasW, setCanvasW] = useState(1000);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [curPage, setCurPage] = useState(1);
  const [positions, setPositions] = useState<Record<number, Pos>>({});
  const [connector, setConnector] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const fontsReady = useDocFontsReady();

  const canvasRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const pagesRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const blocks = useMemo(() => buildDocBlocks(currentDoc), [currentDoc]);
  const lastOfKind = useMemo(() => {
    const set = new Set<string>();
    blocks.forEach((b, i) => { if (blocks[i + 1]?.kind !== b.kind) set.add(b.id); });
    return set;
  }, [blocks]);
  const words = useMemo(() => wordCount(paras.map((p) => p.text).join(' ')), [paras]);

  const docTypes = ['ALL', ...Array.from(new Set(sampleLegalDocuments.map((d) => d.documentType)))];
  const filteredDocs = sampleLegalDocuments.filter((d) => {
    if (docTypeFilter !== 'ALL' && d.documentType !== docTypeFilter) return false;
    const q = docQuery.trim().toLowerCase();
    if (!q) return true;
    return [d.title, d.documentType, d.jurisdiction, d.governingLaw, d.abstractEn].some((f) => f.toLowerCase().includes(q));
  });

  /* ---- layout metrics (same rules as the Writing Lab) */
  const narrow = canvasW < 1020;
  const showComments = commentsOn && !narrow;
  /* On phones the sheet keeps A4 proportions but is set smaller so 12 pt stays legible when fitted. */
  const geo = narrow
    ? { w: 520, h: Math.round(520 * (PAGE_H / PAGE_W)), m: 40 }
    : { w: PAGE_W, h: PAGE_H, m: MARGIN };
  const contentW = narrow ? geo.w - geo.m * 2 : CONTENT_W;
  const contentH = narrow ? geo.h - geo.m * 2 : CONTENT_H;
  const fit = narrow
    ? Math.min(1, (canvasW - 20) / geo.w)
    : Math.min(1, (canvasW - 56 - (showComments ? COMMENTS_W + COMMENTS_GAP : 0)) / geo.w);
  const zoom = zoomSel === 'fit' ? Math.max(0.3, fit) : zoomSel;
  const pagesW = geo.w * zoom;

  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setCanvasW(el.clientWidth));
    ro.observe(el);
    setCanvasW(el.clientWidth);
    return () => ro.disconnect();
  }, []);

  /* ---- document switch */
  useEffect(() => {
    setSelectedLegalTerm(null);
    setTermPara(null);
    setActiveSec(0);
    setSheetOpen(false);
    setReadProgress(0);
    canvasRef.current?.scrollTo({ top: 0 });
  }, [currentDoc.id]);

  /* ---- paginate from the hidden measuring copy */
  useLayoutEffect(() => {
    const root = measureRef.current;
    if (!root) return;
    setPages(paginate(root, blocks, 0, contentH));
  }, [blocks, fontsReady, zoom, fontSize, contentH]);

  /* ---- comment cards: anchored to each paragraph, Docs-style stacking */
  const layoutComments = useCallback(() => {
    const stage = stageRef.current;
    const pagesEl = pagesRef.current;
    if (!stage || !pagesEl || !showComments) { setConnector(null); return; }
    const sr = stage.getBoundingClientRect();
    const anchorEls: (HTMLElement | null)[] = [];
    const anchors = paras.map((_, i) => {
      const el = pagesEl.querySelector<HTMLElement>(`[data-sec-first="${i}"]`);
      anchorEls[i] = el;
      return el ? el.getBoundingClientRect().top - sr.top : i * 120;
    });
    const h = anchors.map((_, i) => cardRefs.current[i]?.offsetHeight ?? 90);
    const a = activeSec != null && activeSec < paras.length ? activeSec : -1;
    const top = stackComments(anchors, h, a);
    const next: Record<number, Pos> = {};
    top.forEach((t, i) => { next[i] = { top: Math.round(t) }; });
    setPositions((prev) => (JSON.stringify(prev) === JSON.stringify(next) ? prev : next));

    const termEl = a >= 0 && termPara === a ? pagesEl.querySelector<HTMLElement>(`[data-sec="${a}"] .legal-word-btn.is-selected`) : null;
    const anchorEl = termEl ?? (a >= 0 ? anchorEls[a] : null);
    if (anchorEl) {
      const r = anchorEl.getBoundingClientRect();
      const pr = pagesEl.getBoundingClientRect();
      const ax = Math.min(termEl ? r.right : pr.right - geo.m * zoom, pr.right) - sr.left;
      const ay = r.top - sr.top + Math.min(r.height, 22 * zoom) * 0.85;
      const px = pr.right - sr.left;
      const cx = px + COMMENTS_GAP - 12;
      const cy = top[a] + 24;
      setConnector(`M${ax.toFixed(1)},${ay.toFixed(1)} H${(px - 4).toFixed(1)} C${(px + 10).toFixed(1)},${ay.toFixed(1)} ${(cx - 10).toFixed(1)},${cy} ${cx.toFixed(1)},${cy}`);
    } else setConnector(null);
  }, [paras, activeSec, termPara, showComments, zoom, geo.m]);

  useLayoutEffect(() => { layoutComments(); }, [layoutComments, pages, selectedLegalTerm, personalNotes]);
  useEffect(() => {
    if (!showComments) return;
    const ro = new ResizeObserver(() => layoutComments());
    cardRefs.current.forEach((el) => el && ro.observe(el));
    if (pagesRef.current) ro.observe(pagesRef.current);
    return () => ro.disconnect();
  }, [layoutComments, showComments, currentDoc.id]);

  /* ---- scroll: current page + reading progress */
  const onScroll = useCallback(() => {
    const c = canvasRef.current;
    const p = pagesRef.current;
    if (!c || !p) return;
    const mid = c.getBoundingClientRect().top + c.clientHeight * 0.4;
    let idx = 1;
    p.querySelectorAll<HTMLElement>('.wd-page').forEach((el, i) => { if (el.getBoundingClientRect().top <= mid) idx = i + 1; });
    setCurPage(idx);
    const max = c.scrollHeight - c.clientHeight;
    setReadProgress(max > 0 ? Math.min(1, Math.max(0, c.scrollTop / max)) : 1);
  }, []);
  useEffect(() => { onScroll(); }, [onScroll, pages]);

  /* ---- interactions */
  const scrollToSec = (i: number) => {
    const c = canvasRef.current;
    const el = pagesRef.current?.querySelector<HTMLElement>(`[data-sec-first="${i}"]`);
    if (!c || !el) return;
    const top = el.getBoundingClientRect().top - c.getBoundingClientRect().top + c.scrollTop - 48;
    c.scrollTo({ top, behavior: reducedMotion() ? 'auto' : 'smooth' });
  };

  const activate = (i: number, opts: { scroll?: boolean; sheet?: boolean; keepTerm?: boolean } = {}) => {
    setActiveSec(i);
    if (!opts.keepTerm && termPara !== i) setTermPara(null);
    if (opts.scroll) scrollToSec(i);
    if (narrow && opts.sheet) setSheetOpen(true);
  };

  /** Clicking a highlighted term (in the page, a card or the glossary). */
  const handleSelectLegalWord = (term: LegalTerm, pi: number | null, opts: { scroll?: boolean } = {}) => {
    setSelectedLegalTerm(term);
    if (pi == null) { setActiveLookupTermId(term.id); return; }
    setTermPara(pi);
    setActiveSec(pi);
    if (!commentsOn && !narrow) setCommentsOn(true);
    if (opts.scroll) scrollToSec(pi);
    if (narrow) setSheetOpen(true);
  };

  const selectDoc = (id: string) => {
    setActiveDocId(id);
    if (window.innerWidth < 1024) setOutlineOpen(false);
  };

  const playPronunciation = (termText: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(termText.toLowerCase());
        u.lang = 'en-US';
        u.rate = 0.85;
        window.speechSynthesis.speak(u);
      } catch (err) {
        console.warn('Speech synthesis unavailable', err);
      }
    }
  };

  const handleOpenNoteModal = (pId: string) => {
    setActiveParagraphNoteId(pId);
    setTempNoteText(personalNotes[`${currentDoc.id}-${pId}`] || '');
  };
  const handleSaveParagraphNote = () => {
    if (activeParagraphNoteId) {
      saveNote(`${currentDoc.id}-${activeParagraphNoteId}`, tempNoteText);
      setActiveParagraphNoteId(null);
    }
  };

  const copyAll = async () => {
    const text = [currentDoc.title, '', ...paras.flatMap((p) => [p.paragraphNumber, p.text, ''])].join('\n');
    try { await navigator.clipboard.writeText(text); setCopied(true); window.setTimeout(() => setCopied(false), 1600); } catch { /* ignore */ }
  };

  /* ---- rendering helpers */
  const renderText = (b: DBlock, from: number, to: number, interactive: boolean): React.ReactNode => {
    const slice = b.text.slice(from, to);
    if (!b.matcher) return slice;
    b.matcher.re.lastIndex = 0;
    const parts = slice.split(b.matcher.re);
    return parts.map((part, i) => {
      const t = i % 2 === 1 ? b.matcher!.map.get(part.toLowerCase()) : undefined;
      if (!t) return <React.Fragment key={i}>{part}</React.Fragment>;
      if (!interactive) return <span key={i} className="legal-word-btn doc-term-highlight">{part}</span>;
      return (
        <LegalWord
          key={`${t.id}-${i}`}
          term={t}
          displayText={part}
          isSelected={selectedLegalTerm?.id === t.id && termPara === b.pi}
          onSelect={(term) => handleSelectLegalWord(term, b.pi)}
        />
      );
    });
  };

  const renderBlock = (part: Part, opts: { measure?: boolean; pageTop?: boolean }) => {
    const b = part.b as DBlock;
    const { from, to, head, tail } = part;
    const isSec = !opts.measure && b.pi >= 0 && activeSec === b.pi;
    const cls = [
      'wd-b', `wd-b--${b.kind}`, b.extra,
      head && 'is-head', tail && 'is-tail', opts.pageTop && 'is-pagetop',
      lastOfKind.has(b.id) && !head && 'is-last', isSec && 'is-sec',
    ].filter(Boolean).join(' ');
    const p = b.pi >= 0 ? paras[b.pi] : null;
    const attrs: Record<string, unknown> = opts.measure
      ? { 'data-mblock': b.id }
      : {
          'data-block': b.id,
          ...(b.pi >= 0 ? { 'data-sec': b.pi } : {}),
          ...(b.first && !tail ? { 'data-sec-first': b.pi } : {}),
          onClick: b.pi >= 0 ? () => { if (activeSec !== b.pi || narrow) activate(b.pi, { sheet: narrow }); } : undefined,
        };
    const marks = !opts.measure && p && b.first && !tail ? (
      <>
        {isParagraphBookmarked(currentDoc.id, p.id) && (
          <BookmarkCheck className="dr-bm" style={{ left: -(geo.m / 2) - 9 }} aria-label="Bookmarked" />
        )}
        {narrow && (
          <button
            type="button"
            className="wd-margin-cmt"
            style={{ width: Math.min(30 / zoom, geo.m - 8), height: Math.min(30 / zoom, geo.m - 8), right: -geo.m + 4 }}
            aria-label={`Open analysis: ${paraLabel(p)}`}
            onClick={(e) => { e.stopPropagation(); activate(b.pi, { sheet: true }); }}
          >
            <MessageSquareText style={{ width: '58%', height: '58%' }} aria-hidden="true" />
          </button>
        )}
      </>
    ) : null;

    if (b.kind === 'gap') return <div className={cls} {...attrs} aria-hidden="true" />;
    if (b.kind === 'party') {
      return (
        <div className={cls} {...attrs}>
          {b.text.split('\n').map((party, k) => {
            const m = party.match(/^(.*?)\s*\(([^)]+)\)\s*$/);
            return (
              <div key={k} className="dr-exec-col">
                <p className="wd-party-name">{party}</p>
                <div className="wd-party-line" aria-hidden="true" />
                <p>By: {m ? `for and on behalf of the ${m[2]}` : ''}</p>
                <p>Name:</p>
                <p>Title:</p>
              </div>
            );
          })}
        </div>
      );
    }
    const end = head ? b.text.slice(0, to).replace(/\s+$/, '').length : to;
    const body = renderText(b, from, end, !opts.measure);
    const hasLabel = ['num', 'clause', 'heading'].includes(b.kind) && b.label;
    return (
      <div className={cls} {...attrs}>
        {marks}
        {hasLabel && <span className="wd-lbl">{tail ? '' : b.label}</span>}
        <span className="wd-txt" data-text>{body}</span>
      </div>
    );
  };

  /* ---- comment card body (desktop card + mobile sheet) */
  const renderCard = (i: number, expanded: boolean) => {
    const p = paras[i];
    const terms = (p.highlightedTermIds ?? []).map(termById).filter((t): t is LegalTerm => !!t);
    const note = personalNotes[`${currentDoc.id}-${p.id}`];
    const bookmarked = isParagraphBookmarked(currentDoc.id, p.id);
    const t = termPara === i ? selectedLegalTerm : null;
    return (
      <>
        <div className="wd-cmt-head">
          <span className="wd-avatar" aria-hidden="true">L</span>
          <div className="min-w-0">
            <p className="wd-cmt-author">Lexa <span className="wd-cmt-meta">· {i + 1} of {paras.length}</span></p>
            <p className="wd-cmt-sec">
              <span>{paraLabel(p)}</span>
              <span className="wd-cmt-id">Analisis yuridis &amp; makna klausul</span>
            </p>
          </div>
        </div>
        <p className={`wd-cmt-purpose${expanded ? '' : ' is-clamped'}`}>
          {p.indonesianSummary ?? 'Belum ada analisis untuk paragraf ini.'}
        </p>
        {!expanded && (
          <p className="wd-cmt-more">
            {terms.length} key term{terms.length === 1 ? '' : 's'}
            {note ? ' · My note' : ''}
            {bookmarked ? ' · Bookmarked' : ''}
          </p>
        )}
        {expanded && (
          <div className="wd-cmt-body">
            {terms.length > 0 && (
              <>
                <p className="wd-cmt-h">Key terms in this clause</p>
                <div className="dr-chips">
                  {terms.map((term) => (
                    <button
                      key={term.id}
                      type="button"
                      className={`dr-chip${t?.id === term.id ? ' is-on' : ''}`}
                      aria-pressed={t?.id === term.id}
                      onClick={(e) => { e.stopPropagation(); handleSelectLegalWord(term, i); }}
                    >
                      {term.term}
                    </button>
                  ))}
                </div>
              </>
            )}

            {t && (
              <div key={t.id} className="dr-term animate-inspector-fade" aria-label={`Term: ${t.term}`}>
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="dr-term-meta">
                      {t.category} · {t.partOfSpeech}{t.difficulty ? ` · ${t.difficulty}` : ''}
                    </p>
                    <p className="dr-term-word">{t.term}</p>
                    {t.pronunciation && (
                      <p className="dr-term-pron">
                        <span>{t.pronunciation}</span>
                        <button type="button" className="wd-icobtn is-sm" onClick={(e) => { e.stopPropagation(); playPronunciation(t.term); }} aria-label="Listen to pronunciation" title="Listen to pronunciation">
                          <Volume2 className="w-3.5 h-3.5" aria-hidden="true" />
                        </button>
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    className={`dr-save${isTermSaved(t.id) ? ' is-on' : ''}`}
                    onClick={(e) => { e.stopPropagation(); if (isTermSaved(t.id)) removeSavedTerm(t.id); else saveTerm(t.id, undefined, currentDoc.id); }}
                    aria-pressed={isTermSaved(t.id)}
                    title="Save term to study list"
                  >
                    {isTermSaved(t.id) ? <BookmarkCheck className="w-3.5 h-3.5" aria-hidden="true" /> : <Bookmark className="w-3.5 h-3.5" aria-hidden="true" />}
                    {isTermSaved(t.id) ? 'Saved' : 'Save'}
                  </button>
                </div>
                <p className="wd-cmt-h">Indonesian legal meaning</p>
                <p className="dr-term-strong">{t.indonesianMeaning}</p>
                {t.indonesianLegalConcept && <p className="dr-term-p">{t.indonesianLegalConcept}</p>}
                {(t.plainEnglish || t.legalDefinition) && (
                  <>
                    <p className="wd-cmt-h">Plain-language explanation</p>
                    <p className="dr-term-p">{t.plainEnglish || t.legalDefinition}</p>
                  </>
                )}
                {t.legalFunction && (
                  <>
                    <p className="wd-cmt-h">How lawyers use this term</p>
                    <p className="dr-term-p">{t.legalFunction}</p>
                  </>
                )}
                <p className="wd-cmt-h">KUHPerdata / hukum positif</p>
                <p className="dr-term-p">{t.civilLawEquivalent || 'Padanan doktriner umum dalam sistem hukum perdata Indonesia.'}</p>
                {t.commonMistakesOrNuances && (
                  <>
                    <p className="wd-cmt-h">Drafting nuance &amp; traps</p>
                    <p className="dr-term-p">{t.commonMistakesOrNuances}</p>
                  </>
                )}
                {(t.authenticClauseExcerpt || t.exampleSentenceEn) && (
                  <>
                    <p className="wd-cmt-h">Example</p>
                    {t.authenticClauseExcerpt && (
                      <p className="dr-term-quote">
                        “{t.authenticClauseExcerpt}”
                        {t.authenticClauseSource && <span>— {t.authenticClauseSource}</span>}
                      </p>
                    )}
                    {t.exampleSentenceEn && <p className="dr-term-p"><b>EN</b> {t.exampleSentenceEn}</p>}
                    {t.exampleSentenceId && <p className="dr-term-p italic"><b>ID</b> {t.exampleSentenceId}</p>}
                  </>
                )}
                {t.commonCollocations && t.commonCollocations.length > 0 && (
                  <>
                    <p className="wd-cmt-h">Common collocations</p>
                    <div className="dr-chips">
                      {t.commonCollocations.map((c, k) => <span key={k} className="dr-chip is-static">{c}</span>)}
                    </div>
                  </>
                )}
                <button type="button" className="dr-open" onClick={(e) => { e.stopPropagation(); setActiveLookupTermId(t.id); }}>
                  Open complete term analysis <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>
            )}

            <p className="wd-cmt-h">My note</p>
            {note ? <p className="dr-note">{note}</p> : <p className="dr-term-p">No note on this paragraph yet.</p>}
            <div className="dr-actions">
              <button type="button" className="dr-act" onClick={(e) => { e.stopPropagation(); toggleBookmarkParagraph(currentDoc.id, p.id); }} aria-pressed={bookmarked}>
                {bookmarked ? <BookmarkCheck className="w-4 h-4" aria-hidden="true" /> : <Bookmark className="w-4 h-4" aria-hidden="true" />}
                {bookmarked ? 'Bookmarked' : 'Bookmark'}
              </button>
              <button type="button" className="dr-act" onClick={(e) => { e.stopPropagation(); handleOpenNoteModal(p.id); }}>
                <MessageSquare className="w-4 h-4" aria-hidden="true" /> {note ? 'Edit note' : 'Add note'}
              </button>
            </div>
          </div>
        )}
      </>
    );
  };

  const total = pages.length || 1;
  const docCls = 'wd-doc wd-doc--block dr-doc';
  const docStyle = { ['--wd-lh' as string]: '1.2', fontSize: FONT_PX[fontSize] } as React.CSSProperties;
  const myNotes = paras.map((p, i) => ({ p, i, note: personalNotes[`${currentDoc.id}-${p.id}`] })).filter((x) => x.note);
  const sheetSec = activeSec ?? 0;

  /* ------------------------------------------------------------------ */
  return (
    <div className="wd-wrap dr">
      <div
        className="reading-progress w-full"
        style={{ transform: `scaleX(${readProgress})` }}
        role="progressbar"
        aria-label="Reading progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(readProgress * 100)}
      />
      <header className="wd-intro">
        <div>
          <p className="wl-eyebrow">§ Documents</p>
          <h1 className="text-[26px] sm:text-[32px] font-medium text-ink tracking-[-0.03em] leading-[1.1]">Read the real thing</h1>
        </div>
        <p className="text-[13.5px] text-muted leading-relaxed max-w-[62ch]">
          Model contracts, awards and opinions laid out as they would be printed. Tap a highlighted term to open it in the
          margin; each clause carries Lexa’s Indonesian analysis as a comment.
        </p>
      </header>

      <div className="wd-editor" aria-label="Document reader">
        {/* ============================== Doc bar */}
        <div className="wd-docbar">
          <DocIcon className="wd-docicon" />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 min-w-0">
              <h2 className="wd-filename" title={currentDoc.downloadableFilename}>{currentDoc.downloadableFilename}</h2>
              <span className="wd-saved" aria-live="polite">
                {isDocCompleted
                  ? <><CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" /> Completed</>
                  : <><CloudCheck className="w-3.5 h-3.5" aria-hidden="true" /> {Math.round(readProgress * 100)}% read</>}
              </span>
            </div>
            <div className="wd-menubar">
              <Menu label="File">
                {(close) => (
                  <>
                    <button role="menuitem" type="button" onClick={() => { close(); printDoc(); }}><Printer className="w-4 h-4" aria-hidden="true" /> Print or save as PDF</button>
                    <button role="menuitem" type="button" onClick={() => { close(); copyAll(); }}><Copy className="w-4 h-4" aria-hidden="true" /> Copy all text</button>
                    <button role="menuitem" type="button" onClick={() => { close(); markDocumentComplete(currentDoc.id); }} disabled={isDocCompleted}><CheckCircle2 className="w-4 h-4" aria-hidden="true" /> {isDocCompleted ? 'Completed' : 'Mark as complete'}</button>
                  </>
                )}
              </Menu>
              <Menu label="View">
                {(close) => (
                  <>
                    <button role="menuitem" type="button" onClick={() => { close(); setOutlineOpen((o) => !o); }}><ListTree className="w-4 h-4" aria-hidden="true" /> {outlineOpen ? 'Hide' : 'Show'} outline</button>
                    <button role="menuitem" type="button" onClick={() => { close(); setCommentsOn((o) => !o); }}><MessageSquareText className="w-4 h-4" aria-hidden="true" /> Indonesian analysis: {commentsOn ? 'On' : 'Off'}</button>
                    <div className="wd-menu-sep" />
                    {ZOOMS.map((z) => (
                      <button role="menuitemradio" aria-checked={zoomSel === z.v} key={z.label} type="button" onClick={() => { close(); setZoomSel(z.v); }}>
                        <span className="w-4 inline-flex justify-center">{zoomSel === z.v ? <Check className="w-4 h-4" aria-hidden="true" /> : null}</span> Zoom {z.label}
                      </button>
                    ))}
                  </>
                )}
              </Menu>
              <span className="wd-menu-meta">{currentDoc.documentType} · {currentDoc.jurisdiction} · {currentDoc.readingTimeMinutes} min read</span>
            </div>
          </div>
          <div className="wd-docbar-actions">
            <button
              type="button"
              className={`wd-icobtn wd-cmt-toggle${showComments ? ' is-on' : ''}`}
              onClick={() => setCommentsOn((o) => !o)}
              aria-pressed={showComments}
              aria-label={showComments ? 'Hide analysis comments' : 'Show analysis comments'}
              title="Indonesian analysis"
              disabled={narrow}
            >
              <MessageSquareText className="w-[18px] h-[18px]" aria-hidden="true" />
            </button>
            <button
              type="button"
              className={`wd-pill inline-flex dr-complete${isDocCompleted ? ' is-done' : ''}`}
              onClick={() => markDocumentComplete(currentDoc.id)}
              aria-pressed={isDocCompleted}
            >
              <CheckCircle2 className="w-4 h-4" aria-hidden="true" /> {isDocCompleted ? 'Completed' : 'Mark as complete'}
            </button>
          </div>
        </div>

        {/* ============================== Toolbar */}
        <div className="wd-toolbar" role="toolbar" aria-label="Document tools">
          <button type="button" className={`wd-tb${outlineOpen ? ' is-on' : ''}`} onClick={() => setOutlineOpen((o) => !o)} aria-pressed={outlineOpen} title="Documents and outline">
            <ListTree className="w-4 h-4" aria-hidden="true" /><span className="wd-tb-l">Documents</span>
          </button>
          <span className="wd-tb-sep" aria-hidden="true" />
          <button type="button" className="wd-tb" onClick={printDoc} title="Print or save as PDF" aria-label="Print or save as PDF">
            <Printer className="w-4 h-4" aria-hidden="true" />
          </button>
          <label className="wd-zoom">
            <span className="sr-only">Zoom</span>
            <select value={String(zoomSel)} onChange={(e) => setZoomSel(e.target.value === 'fit' ? 'fit' : (Number(e.target.value) as ZoomSel))}>
              {ZOOMS.map((z) => (
                <option key={z.label} value={String(z.v)}>{z.v === 'fit' ? `Fit (${Math.round(fit * 100)}%)` : z.label}</option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5" aria-hidden="true" />
          </label>
          <span className="wd-tb-sep hidden md:block" aria-hidden="true" />
          <span className="wd-tb-read hidden md:inline-flex" title="Paragraph style">Normal text</span>
          <span className="wd-tb-read wd-tb-font hidden md:inline-flex" title="Font">Times New Roman</span>
          <label className="wd-zoom dr-size" title="Font size">
            <span className="sr-only">Font size</span>
            <select value={fontSize} onChange={(e) => setFontSize(e.target.value as 'sm' | 'base' | 'lg')}>
              {(['sm', 'base', 'lg'] as const).map((k) => <option key={k} value={k}>{FONT_PT[k]}</option>)}
            </select>
            <ChevronDown className="w-3.5 h-3.5" aria-hidden="true" />
          </label>
          <span className="wd-tb-sep" aria-hidden="true" />
          <button
            type="button"
            className={`wd-tb${commentsOn ? ' is-on' : ''}`}
            onClick={() => setCommentsOn((o) => !o)}
            aria-pressed={commentsOn}
            title="Toggle the Indonesian analysis comments"
          >
            <Scale className="w-4 h-4" aria-hidden="true" /><span className="wd-tb-l">Analisis ID</span>
          </button>
          <span className="flex-1" />
          <button type="button" className="wd-tb" onClick={copyAll} title="Copy all text">
            {copied ? <Check className="w-4 h-4" aria-hidden="true" /> : <Copy className="w-4 h-4" aria-hidden="true" />}
            <span className="wd-tb-l">{copied ? 'Copied' : 'Copy'}</span>
          </button>
          <span className="wd-tb-sep hidden sm:block" aria-hidden="true" />
          <span className="wd-tb-mode">
            <Eye className="w-4 h-4" aria-hidden="true" />
            <span className="hidden sm:inline">Viewing</span>
          </span>
        </div>

        {/* ============================== Body */}
        <div className="wd-body">
          {outlineOpen && <div className="wd-scrim lg:hidden" onClick={() => setOutlineOpen(false)} aria-hidden="true" />}
          <nav className={`wd-side${outlineOpen ? ' is-open' : ''}`} aria-label="Documents and outline">
            <div className="flex items-center justify-between">
              <p className="wd-side-h">Documents</p>
              <button type="button" className="wd-icobtn is-sm lg:hidden" onClick={() => setOutlineOpen(false)} aria-label="Close documents"><X className="w-4 h-4" aria-hidden="true" /></button>
            </div>
            <label className="dr-search">
              <Search className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="sr-only">Search documents</span>
              <input type="search" value={docQuery} onChange={(e) => setDocQuery(e.target.value)} placeholder="Search documents" />
            </label>
            <div className="dr-filter" role="group" aria-label="Filter by type">
              {docTypes.map((t) => (
                <button key={t} type="button" aria-pressed={docTypeFilter === t} className={docTypeFilter === t ? 'is-on' : ''} onClick={() => setDocTypeFilter(t)}>
                  {t === 'ALL' ? 'All' : t}
                </button>
              ))}
            </div>
            <ul className="wd-tabs" role="list">
              {filteredDocs.length === 0 && <li className="dr-empty">No documents match.</li>}
              {filteredDocs.map((d) => {
                const on = d.id === currentDoc.id;
                const done = completedDocuments.includes(d.id);
                return (
                  <li key={d.id}>
                    <button type="button" className={`wd-tab${on ? ' is-on' : ''}`} aria-current={on ? 'page' : undefined} onClick={() => selectDoc(d.id)} title={d.title}>
                      <DocIcon className="wd-tab-ico" />
                      <span className="min-w-0 flex-1">
                        <span className="wd-tab-t">{d.title}</span>
                        <span className="wd-tab-s">{d.documentType} · {d.readingTimeMinutes} min</span>
                      </span>
                      {done && <CheckCircle2 className="w-3.5 h-3.5 shrink-0" aria-label="Completed" />}
                    </button>
                  </li>
                );
              })}
            </ul>

            <p className="wd-side-h mt-5">Outline</p>
            <ol className="wd-outline">
              {paras.map((p, i) => (
                <li key={p.id}>
                  <button type="button" className={`wd-ol${i === activeSec ? ' is-on' : ''}`} onClick={() => { activate(i, { scroll: true }); if (window.innerWidth < 1024) setOutlineOpen(false); }}>
                    <span className="truncate flex items-center gap-1.5">
                      {isParagraphBookmarked(currentDoc.id, p.id) && <BookmarkCheck className="w-3 h-3 shrink-0" aria-label="Bookmarked" />}
                      {paraLabel(p)}
                    </span>
                  </button>
                </li>
              ))}
            </ol>

            <p className="wd-side-h mt-5">Key terms ({currentDoc.keyTermIds.length})</p>
            <ul className="wd-outline">
              {currentDoc.keyTermIds.map((id) => {
                const term = termById(id);
                if (!term) return null;
                const pi = paras.findIndex((p) => p.highlightedTermIds?.includes(id));
                const on = selectedLegalTerm?.id === id && termPara != null;
                return (
                  <li key={id}>
                    <button
                      type="button"
                      className={`wd-ol${on ? ' is-on' : ''}`}
                      onClick={() => { handleSelectLegalWord(term, pi >= 0 ? pi : null, { scroll: true }); if (window.innerWidth < 1024) setOutlineOpen(false); }}
                      title={pi >= 0 ? 'Show in the document' : 'Open the full term analysis'}
                    >
                      <span className="truncate">{term.term}</span>
                      <span className="wd-ol-id">{term.indonesianMeaning}</span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <p className="wd-side-h mt-5">My notes</p>
            {myNotes.length === 0 ? (
              <p className="dr-empty">Belum ada catatan. Buka komentar sebuah klausul lalu pilih “Add note”.</p>
            ) : (
              <ul className="wd-outline">
                {myNotes.map(({ p, i, note }) => (
                  <li key={p.id}>
                    <button type="button" className="wd-ol" onClick={() => { activate(i, { scroll: true, sheet: true }); if (window.innerWidth < 1024) setOutlineOpen(false); }}>
                      <span className="truncate">{paraLabel(p)}</span>
                      <span className="wd-ol-id">{note}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </nav>

          <div className="wd-canvas" ref={canvasRef} onScroll={onScroll}>
            <div className="wd-stage" ref={stageRef} style={{ width: pagesW + (showComments ? COMMENTS_GAP + COMMENTS_W : 0) }}>
              <div
                className="wd-pages wd-print-root"
                ref={pagesRef}
                style={{ zoom, width: geo.w, ['--pw' as string]: `${geo.w}px`, ['--ph' as string]: `${geo.h}px`, ['--pm' as string]: `${geo.m}px` } as React.CSSProperties}
              >
                <div className="wd-ruler" aria-hidden="true">
                  <span className="wd-ruler-m" style={{ left: 0, width: MARGIN }} />
                  <span className="wd-ruler-m" style={{ right: 0, width: MARGIN }} />
                  {Array.from({ length: 33 }, (_, i) => (
                    <span key={i} className={`wd-tick${i % 4 === 0 ? ' is-major' : i % 2 === 0 ? ' is-half' : ''}`} style={{ left: MARGIN + (i - 4) * 24 }}>
                      {i % 4 === 0 && i !== 4 ? <i>{Math.abs((i - 4) / 4)}</i> : null}
                    </span>
                  ))}
                </div>
                {pages.map((parts, pi) => (
                  <section key={`${currentDoc.id}-${pi}`} className={`wd-page ${docCls}`} style={docStyle} aria-label={`Page ${pi + 1} of ${total}`}>
                    {pi === 0 && <div className="wd-hdr is-first">MODEL DOCUMENT FOR STUDY</div>}
                    {pi > 0 && <div className="wd-hdr"><span>{currentDoc.title}</span><span>{currentDoc.documentType}</span></div>}
                    <div className="wd-content">
                      {parts.map((part, j) => (
                        <React.Fragment key={`${part.b.id}-${part.from}`}>{renderBlock(part, { pageTop: j === 0 })}</React.Fragment>
                      ))}
                    </div>
                    <div className="wd-ftr">Page {pi + 1} of {total}</div>
                  </section>
                ))}

              </div>

              <aside className="wd-sources dr-about" style={{ width: narrow ? undefined : pagesW }} aria-labelledby="dr-about-h">
                <h3 id="dr-about-h">About this document</h3>
                <p className="wd-sources-sub">{currentDoc.documentType} · {currentDoc.governingLaw} · {currentDoc.readingTimeMinutes} minutes of study</p>
                <p className="wd-sources-k">Document summary (English)</p>
                <p className="dr-about-p">{currentDoc.abstractEn}</p>
                <p className="wd-sources-k">Ikhtisar dokumen (Bahasa Indonesia)</p>
                <p className="dr-about-p italic">{currentDoc.abstractId}</p>
                <div className="dr-about-end">
                  <span>End of document · {currentDoc.title}</span>
                  <button
                    type="button"
                    onClick={() => markDocumentComplete(currentDoc.id)}
                    disabled={isDocCompleted}
                    className={`px-5 py-2.5 text-sm ${isDocCompleted ? 'btn-secondary' : 'btn-primary'}`}
                  >
                    <Check className="w-4 h-4" aria-hidden="true" />
                    <span>{isDocCompleted ? 'Completed' : 'Mark as complete'}</span>
                  </button>
                </div>
              </aside>
              {showComments && (
                <div className="wd-comments" style={{ left: pagesW + COMMENTS_GAP, width: COMMENTS_W }} aria-label="Analysis comments">
                  {paras.map((p, i) => {
                    const on = i === activeSec;
                    return (
                      <div
                        key={`${currentDoc.id}-${p.id}`}
                        ref={(el) => { cardRefs.current[i] = el; }}
                        className={`wd-cmt${on ? ' is-on' : ''}`}
                        style={{ top: positions[i]?.top ?? i * 110 }}
                        onClick={() => { if (!on) activate(i); }}
                      >
                        {!on && <button type="button" className="sr-only" onClick={() => activate(i)}>Open analysis of {paraLabel(p)}</button>}
                        {renderCard(i, on)}
                        {on && (
                          <div className="wd-cmt-nav">
                            <button type="button" className="wd-icobtn is-sm" disabled={i === 0} onClick={(e) => { e.stopPropagation(); activate(i - 1, { scroll: true }); }} aria-label="Previous clause"><ChevronLeft className="w-4 h-4" aria-hidden="true" /></button>
                            <button type="button" className="wd-icobtn is-sm" disabled={i === paras.length - 1} onClick={(e) => { e.stopPropagation(); activate(i + 1, { scroll: true }); }} aria-label="Next clause"><ChevronRight className="w-4 h-4" aria-hidden="true" /></button>
                            <span className="flex-1" />
                            <button type="button" className="wd-cmt-close" onClick={(e) => { e.stopPropagation(); setActiveSec(null); setTermPara(null); }}>Close</button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
              {showComments && connector && <svg className="wd-connector" aria-hidden="true"><path d={connector} /></svg>}
            </div>
          </div>
        </div>

        {/* ============================== Status bar */}
        <div className="wd-status">
          <span>Page {Math.min(curPage, total)} of {total}</span>
          <span>{words.toLocaleString('en-US')} words</span>
          <span>{Math.round(readProgress * 100)}% read</span>
          <span className="hidden sm:inline">{isDocCompleted ? 'Completed' : 'In progress'}</span>
          <span className="flex-1" />
          <span className="hidden sm:inline">{narrow ? 'A4 · fitted to screen' : 'A4 · 210 × 297 mm'}</span>
          <span>{Math.round(zoom * 100)}%</span>
        </div>
      </div>

      {/* Hidden measuring copy for pagination */}
      <div className="wd-measure" aria-hidden="true">
        <div ref={measureRef} className={docCls} style={{ ...docStyle, width: contentW, zoom }}>
          {blocks.map((b) => (
            <React.Fragment key={b.id}>{renderBlock({ b, from: 0, to: b.text.length, head: false, tail: false }, { measure: true })}</React.Fragment>
          ))}
        </div>
      </div>

      {/* Mobile comment sheet */}
      {narrow && sheetOpen && activeSec != null && paras[sheetSec] && (
        <>
          <div className="wd-sheet-scrim" onClick={() => setSheetOpen(false)} aria-hidden="true" />
          <div className="wd-sheet" role="dialog" aria-modal="false" aria-label={`Analysis: ${paraLabel(paras[sheetSec])}`}>
            <div className="wd-sheet-grip" aria-hidden="true" />
            <div className="wd-sheet-bar">
              <button type="button" className="wd-icobtn is-sm" disabled={sheetSec === 0} onClick={() => activate(sheetSec - 1, { scroll: true, sheet: true })} aria-label="Previous clause"><ChevronLeft className="w-4 h-4" aria-hidden="true" /></button>
              <button type="button" className="wd-icobtn is-sm" disabled={sheetSec === paras.length - 1} onClick={() => activate(sheetSec + 1, { scroll: true, sheet: true })} aria-label="Next clause"><ChevronRight className="w-4 h-4" aria-hidden="true" /></button>
              <span className="flex-1" />
              <button type="button" className="wd-icobtn is-sm" onClick={() => setSheetOpen(false)} aria-label="Close analysis"><X className="w-4 h-4" aria-hidden="true" /></button>
            </div>
            <div className="wd-sheet-body">{renderCard(sheetSec, true)}</div>
          </div>
        </>
      )}

      {/* Note edit modal */}
      {activeParagraphNoteId && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-surface/80 backdrop-blur-md">
          <div className="rounded-2xl bg-surface border border-line p-6 max-w-md w-full space-y-4" role="dialog" aria-modal="true" aria-labelledby="dr-note-h">
            <h3 id="dr-note-h" className="font-serif font-semibold text-base text-ink">
              Study note · {paraLabel(paras.find((p) => p.id === activeParagraphNoteId) ?? paras[0])}
            </h3>
            <textarea
              value={tempNoteText}
              onChange={(e) => setTempNoteText(e.target.value)}
              placeholder="Tuliskan analisis pasal, perbandingan KUHPerdata, atau catatan drafting..."
              className="w-full text-xs p-3.5 rounded-2xl bg-surface border border-line text-ink placeholder:text-faint focus:outline-none focus:border-line-strong font-sans h-28 resize-none"
              autoFocus
            />
            <div className="flex justify-end gap-2 text-xs font-sans">
              <button onClick={() => setActiveParagraphNoteId(null)} className="btn-secondary px-4 py-2 font-medium">Cancel</button>
              <button onClick={handleSaveParagraphNote} className="btn-primary px-4 py-2 font-medium">Save Note</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
