import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { writingModulesList } from '../data/writingData';
import type { SourceRef, WritingModule, WritingSection } from '../types';
import {
  Check, ChevronDown, ChevronLeft, ChevronRight, CloudCheck, Copy, Download, ExternalLink, Eye, ListTree,
  LoaderCircle, MessageSquareText, Pencil, Printer, RotateCcw, X,
} from 'lucide-react';
import {
  CONTENT_W, MARGIN, PAGE_W, type Block, type Hit, type Mode, blockPlain, buildBlocks, docConfigFor, docPlain,
  fieldKey, partyParts, tokenize, wordCount,
  foreignRuns,
} from './writing/docModel';
import { paginate, type Part } from './writing/paginate';

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

const reducedMotion = () =>
  typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) { await navigator.clipboard.writeText(text); return true; }
  } catch { /* fall through */ }
  try {
    const ta = document.createElement('textarea');
    ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(ta);
    return ok;
  } catch { return false; }
}

function useCopied() {
  const [key, setKey] = useState<string | null>(null);
  const timer = useRef<number | undefined>(undefined);
  const copy = useCallback(async (id: string, text: string) => {
    if (!(await copyText(text))) return;
    setKey(id);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setKey(null), 1600);
  }, []);
  useEffect(() => () => window.clearTimeout(timer.current), []);
  return { copiedKey: key, copy };
}

const storeKey = (moduleId: string) => `lexa.writing.template.${moduleId}`;
const loadValues = (moduleId: string): Record<string, string> => {
  try { return JSON.parse(localStorage.getItem(storeKey(moduleId)) || '{}'); } catch { return {}; }
};

type ZoomSel = 'fit' | 0.75 | 1 | 1.25;
const ZOOMS: { v: ZoomSel; label: string }[] = [
  { v: 'fit', label: 'Fit' }, { v: 0.75, label: '75%' }, { v: 1, label: '100%' }, { v: 1.25, label: '125%' },
];
const COMMENTS_W = 300;
const COMMENTS_GAP = 28;

/* ------------------------------------------------------------------ */
/* Inline text: comment highlights (example) / fields (template)       */
/* ------------------------------------------------------------------ */

interface InlineCtx {
  mode: Mode;
  interactive: boolean;
  activeSec: number | null;
  activeNote: number | null;
  values: Record<string, string>;
  onHit: (sec: number, n: number) => void;
  onFieldInput: (key: string, text: string) => void;
  onFieldCommit: (key: string, text: string) => void;
}

const FieldSpan: React.FC<{ k: string; ph: string; value: string; ctx: InlineCtx }> = ({ k, ph, value, ctx }) => {
  const ref = useRef<HTMLSpanElement>(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (el && document.activeElement !== el && el.textContent !== value) el.textContent = value;
  }, [value]);
  const editable = ctx.interactive;
  return (
    <span
      ref={ref}
      className="wd-field"
      data-ph={ph}
      data-field={editable ? k : undefined}
      contentEditable={editable ? 'plaintext-only' : undefined}
      suppressContentEditableWarning
      role={editable ? 'textbox' : undefined}
      aria-label={editable ? `Fill in ${ph}` : undefined}
      tabIndex={editable ? 0 : undefined}
      spellCheck={false}
      onClick={(e) => e.stopPropagation()}
      onInput={(e) => ctx.onFieldInput(k, e.currentTarget.textContent ?? '')}
      onBlur={(e) => ctx.onFieldCommit(k, (e.currentTarget.textContent ?? '').replace(/\s+/g, ' ').trim())}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          const all: HTMLElement[] = [];
          document.querySelectorAll<HTMLElement>('.wd-pages [data-field]').forEach((el) => all.push(el));
          const i = all.indexOf(e.currentTarget);
          (all[i + 1] ?? e.currentTarget).focus();
        } else if (e.key === 'Escape') {
          e.currentTarget.blur();
        }
      }}
      onPaste={(e) => {
        e.preventDefault();
        const t = e.clipboardData.getData('text/plain').replace(/\s+/g, ' ');
        document.execCommand('insertText', false, t);
      }}
    />
  );
};

/** Plain text with foreign legal terms (wanprestasi, ex aequo et bono…) in italics. */
function withEm(text: string, key: string | number): React.ReactNode {
  const runs = foreignRuns(text);
  if (runs.length === 1 && !runs[0].em) return <React.Fragment key={key}>{text}</React.Fragment>;
  return (
    <React.Fragment key={key}>
      {runs.map((r, i) => (r.em ? <em key={i} className="wd-em">{r.t}</em> : <React.Fragment key={i}>{r.t}</React.Fragment>))}
    </React.Fragment>
  );
}

/** Render text[from,to) of a block. `fieldBase` = number of fields before `from`. */
function renderInline(b: Block, text: string, from: number, to: number, ctx: InlineCtx, fieldBase = 0): React.ReactNode {
  const slice = text.slice(from, to);
  if (ctx.mode === 'template') {
    let k = fieldBase;
    return tokenize(slice).map((tok, i) => {
      if (!tok.field) return withEm(tok.t, i);
      const key = fieldKey(b, k++);
      const ph = tok.t.slice(1, -1).trim() || '…';
      return <FieldSpan key={i} k={key} ph={ph} value={ctx.values[key] ?? ''} ctx={ctx} />;
    });
  }
  const hits: Hit[] = b.hits
    .map((h) => ({ ...h, start: Math.max(h.start, from) - from, end: Math.min(h.end, to) - from }))
    .filter((h) => h.end > h.start);
  if (!hits.length) return withEm(slice, 'all');
  const out: React.ReactNode[] = [];
  let cursor = 0;
  hits.forEach((h, i) => {
    if (h.start > cursor) out.push(withEm(slice.slice(cursor, h.start), `t${i}`));
    const secOn = ctx.activeSec === b.sec;
    const hot = secOn && ctx.activeNote === h.n;
    out.push(
      <mark
        key={`m${i}`}
        className={`wd-hl${secOn ? ' is-sec' : ''}${hot ? ' is-hot' : ''}`}
        data-hl-sec={b.sec}
        data-n={h.n}
        {...(ctx.interactive
          ? {
              role: 'button',
              tabIndex: 0,
              'aria-label': `Comment ${h.n} on this passage`,
              onClick: (e: React.MouseEvent) => { e.stopPropagation(); ctx.onHit(b.sec, h.n); },
              onKeyDown: (e: React.KeyboardEvent) => {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); ctx.onHit(b.sec, h.n); }
              },
            }
          : {})}
      >
        {withEm(slice.slice(h.start, h.end), 'm')}
      </mark>,
    );
    cursor = h.end;
  });
  if (cursor < slice.length) out.push(withEm(slice.slice(cursor), 'tail'));
  return out;
}

const countFields = (s: string) => (s.match(/\[[^\]]*\]/g) ?? []).length;

/* ------------------------------------------------------------------ */
/* One block (or the part of a block that falls on this page)          */
/* ------------------------------------------------------------------ */

const BlockView: React.FC<{
  part: Part;
  ctx: InlineCtx;
  measure?: boolean;
  isLastOfKind: boolean;
  isDocTitle: boolean;
  pageTop: boolean;
  footRef: boolean;
  marginBtn?: { size: number; onTap: () => void; label: string } | null;
  onBlockClick?: (sec: number) => void;
}> = ({ part, ctx, measure, isLastOfKind, isDocTitle, pageTop, footRef, marginBtn, onBlockClick }) => {
  const { b, from, to, head, tail } = part;
  const cls = [
    'wd-b', `wd-b--${b.kind}`,
    head && 'is-head', tail && 'is-tail', pageTop && 'is-pagetop',
    isLastOfKind && 'is-last', isDocTitle && 'is-doctitle', b.spaceAfter && 'is-spaced',
    !measure && ctx.activeSec === b.sec && 'is-sec',
  ].filter(Boolean).join(' ');
  const attrs: Record<string, unknown> = measure
    ? { 'data-mblock': b.id }
    : {
        'data-block': b.id,
        'data-sec': b.sec,
        ...(b.first && !tail ? { 'data-sec-first': b.sec } : {}),
        onClick: onBlockClick ? () => onBlockClick(b.sec) : undefined,
      };

  const fieldBase = countFields(b.text.slice(0, from));
  const end = head ? b.text.slice(0, to).replace(/\s+$/, '').length : to;
  const body = renderInline(b, b.text, from, end, ctx, fieldBase);
  const fn = footRef ? <sup className="wd-fnref">1</sup> : null;
  const btn = marginBtn ? (
    <button
      type="button"
      className="wd-margin-cmt"
      style={{ width: marginBtn.size, height: marginBtn.size, right: -(MARGIN / 2) - marginBtn.size / 2 }}
      aria-label={marginBtn.label}
      onClick={(e) => { e.stopPropagation(); marginBtn.onTap(); }}
    >
      <MessageSquareText style={{ width: '58%', height: '58%' }} aria-hidden="true" />
    </button>
  ) : null;

  if (b.kind === 'gap') return <div className={cls} {...attrs} aria-hidden="true" />;

  if (b.kind === 'party') {
    const pp = partyParts(b.text);
    if (pp) {
      let k = 0;
      const seg = (s: string) => {
        const node = renderInline(b, s, 0, s.length, ctx, k);
        k += countFields(s);
        return node;
      };
      return (
        <div className={cls} {...attrs}>
          {btn}
          <p className="wd-party-name">{seg(pp.name)}</p>
          <div className="wd-party-line" aria-hidden="true" />
          <p>Name: {seg(pp.person)}</p>
          <p>Title: {seg(pp.title)}</p>
        </div>
      );
    }
  }

  const hasLabel = ['memo', 'kv', 'num', 'clause', 'item', 'heading'].includes(b.kind) && b.label;
  return (
    <div className={cls} {...attrs}>
      {btn}
      {hasLabel ? (
        <>
          <span className="wd-lbl">{tail ? '' : b.label}</span>
          <span className="wd-txt" data-text>{body}{fn}</span>
        </>
      ) : (
        <span className="wd-txt" data-text>{body}{fn}</span>
      )}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Comment body (desktop card + mobile sheet)                          */
/* ------------------------------------------------------------------ */

const CopyIcon: React.FC<{ id: string; text: string; label: string; copiedKey: string | null; onCopy: (id: string, t: string) => void }> = ({
  id, text, label, copiedKey, onCopy,
}) => {
  const done = copiedKey === id;
  return (
    <button
      type="button"
      className="wd-icobtn is-sm"
      onClick={(e) => { e.stopPropagation(); onCopy(id, text); }}
      aria-label={done ? `${label} copied` : `Copy ${label}`}
      title={done ? 'Copied' : `Copy ${label}`}
    >
      {done ? <Check className="w-3.5 h-3.5" aria-hidden="true" /> : <Copy className="w-3.5 h-3.5" aria-hidden="true" />}
    </button>
  );
};

const CommentBody: React.FC<{
  s: WritingSection;
  index: number;
  total: number;
  expanded: boolean;
  mode: Mode;
  activeNote: number | null;
  onNote: (n: number) => void;
  copiedKey: string | null;
  copy: (id: string, t: string) => void;
  idPrefix: string;
}> = ({ s, index, total, expanded, mode, activeNote, onNote, copiedKey, copy, idPrefix }) => {
  const notes = s.notes ?? [];
  return (
    <>
      <div className="wd-cmt-head">
        <span className="wd-avatar" aria-hidden="true">L</span>
        <div className="min-w-0">
          <p className="wd-cmt-author">Lexa <span className="wd-cmt-meta">· {index + 1} of {total}</span></p>
          <p className="wd-cmt-sec">
            <span>{s.sectionName}</span>
            <span className="wd-cmt-id">{s.indonesianName}</span>
          </p>
        </div>
      </div>
      <p className={`wd-cmt-purpose${expanded ? '' : ' is-clamped'}`}>{s.purpose}</p>
      {!expanded && (
        <p className="wd-cmt-more">
          {notes.length > 0 && `${notes.length} note${notes.length > 1 ? 's' : ''} · `}
          {s.standardPhrases.length} phrases · {s.sources?.length ?? 0} sources
        </p>
      )}
      {expanded && (
        <div className="wd-cmt-body">
          {notes.length > 0 && (
            <ol className="wd-cmt-notes">
              {notes.map((n, i) => (
                <li key={i}>
                  <button
                    type="button"
                    className={`wd-cmt-note${activeNote === i + 1 ? ' is-hot' : ''}`}
                    onClick={(e) => { e.stopPropagation(); onNote(i + 1); }}
                    aria-pressed={activeNote === i + 1}
                    disabled={mode === 'template'}
                  >
                    <span className="wd-cmt-n" aria-hidden="true">{i + 1}</span>
                    <span>
                      <span className="wd-cmt-quote">“{n.quote.length > 72 ? `${n.quote.slice(0, 70)}…` : n.quote}”</span>
                      <span className="wd-cmt-why">{n.why}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          )}
          <p className="wd-cmt-h">Phrases · EN ⇄ ID</p>
          <ul className="wd-cmt-phrases">
            {s.standardPhrases.map((p, i) => (
              <li key={i}>
                <div className="wd-cmt-pr">
                  <span className="wd-cmt-en">{p.en}</span>
                  <CopyIcon id={`${idPrefix}-en-${index}-${i}`} text={p.en} label="English phrase" copiedKey={copiedKey} onCopy={copy} />
                </div>
                <div className="wd-cmt-pr">
                  <span className="wd-cmt-idp"><b>ID</b> {p.id}</span>
                  <CopyIcon id={`${idPrefix}-id-${index}-${i}`} text={p.id} label="Indonesian phrase" copiedKey={copiedKey} onCopy={copy} />
                </div>
                {p.notes && <span className="wd-cmt-pnote">{p.notes}</span>}
              </li>
            ))}
          </ul>
          {s.tips.length > 0 && (
            <>
              <p className="wd-cmt-h">Drafting tips</p>
              <ul className="wd-cmt-tips">{s.tips.map((t, i) => <li key={i}>{t}</li>)}</ul>
            </>
          )}
          {s.sources && s.sources.length > 0 && (
            <>
              <p className="wd-cmt-h">Sources</p>
              <ul className="wd-cmt-src">
                {s.sources.map((src) => (
                  <li key={src.url}>
                    <a href={src.url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                      {src.label}<ExternalLink className="inline w-3 h-3 ml-1 -mt-0.5 opacity-60" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </>
  );
};

/* ------------------------------------------------------------------ */
/* Small menu (File / View)                                            */
/* ------------------------------------------------------------------ */

const Menu: React.FC<{ label: string; children: (close: () => void) => React.ReactNode }> = ({ label, children }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const off = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', off);
    document.addEventListener('keydown', esc);
    return () => { document.removeEventListener('mousedown', off); document.removeEventListener('keydown', esc); };
  }, [open]);
  return (
    <div className="relative" ref={ref}>
      <button type="button" className={`wd-menu-btn${open ? ' is-open' : ''}`} aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        {label}
      </button>
      {open && <div className="wd-menu" role="menu">{children(() => setOpen(false))}</div>}
    </div>
  );
};

const DocIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 32" className={className} aria-hidden="true">
    <path d="M3 0h12l9 9v20a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V3a3 3 0 0 1 3-3z" fill="var(--wd-doc-icon)" />
    <path d="M15 0l9 9h-6a3 3 0 0 1-3-3z" fill="#fff" fillOpacity=".45" />
    <path d="M6 15h12M6 19h12M6 23h8" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

/* ------------------------------------------------------------------ */
/* Export (.doc that Word opens) + print                               */
/* ------------------------------------------------------------------ */

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function exportDoc(module: WritingModule, blocks: Block[], values: Record<string, string>, fileName: string) {
  const cfg = docConfigFor(module);
  const rows = blocks.map((b) => {
    if (b.kind === 'gap') return '<p>&nbsp;</p>';
    const t = foreignRuns(esc(blockPlain(b, values))).map((r) => (r.em ? `<i>${r.t}</i>` : r.t)).join('').replace(/\n/g, '<br>');
    switch (b.kind) {
      case 'title': return `<p style="text-align:center;font-weight:bold;text-transform:uppercase">${t}</p>`;
      case 'heading': return `<p style="font-weight:bold">${t}</p>`;
      case 'lh1': return `<p style="text-align:center;font-weight:bold;font-size:18pt;letter-spacing:1pt">${t}</p>`;
      case 'lh2': case 'lh3': return `<p style="text-align:center;font-size:10pt">${t}</p>`;
      case 'right': return `<p style="text-align:right">${t}</p>`;
      case 'item': case 'indent': return `<p style="margin-left:36pt;text-indent:-${b.label ? 24 : 0}pt">${t}</p>`;
      case 'num': case 'clause': return `<p style="margin-left:36pt;text-indent:-36pt;text-align:justify">${t}</p>`;
      default: return `<p style="text-align:justify${cfg.para === 'indent' && b.kind === 'p' ? ';text-indent:36pt' : ''}">${t}</p>`;
    }
  });
  const html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word"><head><meta charset="utf-8"><title>${esc(module.title)}</title>
<style>@page{size:21cm 29.7cm;margin:2.54cm}body{font-family:'Times New Roman',serif;font-size:12pt;line-height:${cfg.lineHeight}}p{margin:0 0 8pt}</style></head><body>${rows.join('\n')}${
    module.disclaimer ? `<p style="font-size:10pt;border-top:1px solid #000;padding-top:4pt;margin-top:24pt">${esc(module.disclaimer)}</p>` : ''
  }</body></html>`;
  const blob = new Blob(['\ufeff', html], { type: 'application/msword' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = fileName.replace(/\.docx$/, '.doc');
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.setTimeout(() => URL.revokeObjectURL(a.href), 2000);
}

function printDoc() {
  const root = document.documentElement;
  root.classList.add('wd-printing');
  const done = () => { root.classList.remove('wd-printing'); window.removeEventListener('afterprint', done); };
  window.addEventListener('afterprint', done);
  window.print();
  window.setTimeout(done, 1500);
}

/* ------------------------------------------------------------------ */
/* Main                                                                */
/* ------------------------------------------------------------------ */

interface Pos { top: number; anchor: number }

export const WritingLab: React.FC = () => {
  const [moduleId, setModuleId] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('lexa.writing.module');
      if (saved && writingModulesList.some((m) => m.id === saved)) return saved;
    } catch { /* ignore */ }
    return writingModulesList[0].id;
  });
  const [mode, setMode] = useState<Mode>('example');
  const [activeSec, setActiveSec] = useState<number | null>(0);
  const [activeNote, setActiveNote] = useState<number | null>(null);
  const [zoomSel, setZoomSel] = useState<ZoomSel>('fit');
  const [outlineOpen, setOutlineOpen] = useState<boolean>(() => typeof window === 'undefined' || window.innerWidth >= 1024);
  const [commentsOn, setCommentsOn] = useState(true);
  const [values, setValues] = useState<Record<string, string>>(() => loadValues(moduleId));
  const [saveState, setSaveState] = useState<'saved' | 'saving'>('saved');
  const [pages, setPages] = useState<Part[][]>([]);
  const [fontsReady, setFontsReady] = useState(false);
  const [canvasW, setCanvasW] = useState(1000);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [curPage, setCurPage] = useState(1);
  const [positions, setPositions] = useState<Record<number, Pos>>({});
  const [connector, setConnector] = useState<string | null>(null);
  const { copiedKey, copy } = useCopied();

  const canvasRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const pagesRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const draft = useRef<Record<string, string>>({});
  const saveTimer = useRef<number | undefined>(undefined);

  const module = useMemo(() => writingModulesList.find((m) => m.id === moduleId) ?? writingModulesList[0], [moduleId]);
  const cfg = docConfigFor(module);
  const blocks = useMemo(() => buildBlocks(module, mode), [module, mode]);
  const footRefId = useMemo(
    () => (module.disclaimer ? blocks.find((b) => ['title', 'heading', 'kv'].includes(b.kind))?.id ?? null : null),
    [blocks, module.disclaimer],
  );
  const docTitleId = useMemo(() => blocks.find((b) => b.kind === 'title' && b.sec === 0)?.id ?? null, [blocks]);
  const lastOfKind = useMemo(() => {
    const set = new Set<string>();
    blocks.forEach((b, i) => { if (blocks[i + 1]?.kind !== b.kind) set.add(b.id); });
    return set;
  }, [blocks]);

  /* ---- layout metrics */
  const narrow = canvasW < 1020;
  const showComments = commentsOn && !narrow;
  const fit = narrow
    ? Math.min(1, (canvasW - 20) / PAGE_W)
    : Math.min(1, (canvasW - 56 - (showComments ? COMMENTS_W + COMMENTS_GAP : 0)) / PAGE_W);
  const zoom = zoomSel === 'fit' ? Math.max(0.3, fit) : zoomSel;
  const pagesW = PAGE_W * zoom;

  /* ---- fonts: paginate only once the document face is in */
  useEffect(() => {
    let alive = true;
    const fonts = (document as Document & { fonts?: FontFaceSet }).fonts;
    if (!fonts) { setFontsReady(true); return; }
    Promise.all([
      fonts.load('16px Tinos'), fonts.load('bold 16px Tinos'), fonts.load('italic 16px Tinos'),
    ]).catch(() => undefined).then(() => fonts.ready).then(() => { if (alive) setFontsReady(true); });
    return () => { alive = false; };
  }, []);

  /* ---- canvas width */
  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setCanvasW(el.clientWidth));
    ro.observe(el);
    setCanvasW(el.clientWidth);
    return () => ro.disconnect();
  }, []);

  /* ---- module switch: load template values */
  useEffect(() => {
    setValues(loadValues(module.id));
    draft.current = {};
    try { localStorage.setItem('lexa.writing.module', module.id); } catch { /* ignore */ }
  }, [module.id]);

  /* ---- paginate from the hidden measuring copy */
  const ctxBase = {
    mode, activeSec, activeNote, values,
  };
  useLayoutEffect(() => {
    const root = measureRef.current;
    if (!root) return;
    const foot = root.querySelector<HTMLElement>('[data-mfoot]');
    const reserve = foot ? foot.offsetHeight + 14 : 0;
    setPages(paginate(root, blocks, reserve));
  }, [blocks, values, fontsReady, zoom]);

  /* ---- comment card layout (Google Docs style: active card aligned, others pushed) */
  const layoutComments = useCallback(() => {
    const stage = stageRef.current;
    const pagesEl = pagesRef.current;
    if (!stage || !pagesEl || !showComments) { setConnector(null); return; }
    const sr = stage.getBoundingClientRect();
    const anchors: number[] = [];
    const anchorEls: (HTMLElement | null)[] = [];
    module.sections.forEach((_, i) => {
      const el =
        pagesEl.querySelector<HTMLElement>(`[data-hl-sec="${i}"]`) ??
        pagesEl.querySelector<HTMLElement>(`[data-sec-first="${i}"]`);
      anchorEls[i] = el;
      anchors[i] = el ? el.getBoundingClientRect().top - sr.top : i * 120;
    });
    const n = anchors.length;
    const h = anchors.map((_, i) => cardRefs.current[i]?.offsetHeight ?? 90);
    const gap = 10;
    const top = anchors.slice();
    const a = activeSec != null && activeSec < n ? activeSec : -1;
    if (a >= 0) {
      for (let i = a + 1; i < n; i++) top[i] = Math.max(anchors[i], top[i - 1] + h[i - 1] + gap);
      for (let i = a - 1; i >= 0; i--) top[i] = Math.min(anchors[i], top[i + 1] - h[i] - gap);
      if (top[0] < 0) {
        top[0] = 0;
        for (let i = 1; i < n; i++) top[i] = Math.max(top[i], top[i - 1] + h[i - 1] + gap);
      }
    } else {
      for (let i = 1; i < n; i++) top[i] = Math.max(anchors[i], top[i - 1] + h[i - 1] + gap);
    }
    const next: Record<number, Pos> = {};
    top.forEach((t, i) => { next[i] = { top: Math.round(t), anchor: Math.round(anchors[i]) }; });
    setPositions((prev) => (JSON.stringify(prev) === JSON.stringify(next) ? prev : next));

    if (a >= 0 && anchorEls[a]) {
      const r = anchorEls[a]!.getBoundingClientRect();
      const pr = pagesEl.getBoundingClientRect();
      const ax = Math.min(r.right, pr.right) - sr.left;
      const ay = r.top - sr.top + Math.min(r.height, 22 * zoom) * 0.85;
      const px = pr.right - sr.left;
      const cx = px + COMMENTS_GAP - 12;
      const cy = top[a] + 24;
      setConnector(`M${ax.toFixed(1)},${ay.toFixed(1)} H${(px - 4).toFixed(1)} C${(px + 10).toFixed(1)},${ay.toFixed(1)} ${(cx - 10).toFixed(1)},${cy} ${cx.toFixed(1)},${cy}`);
    } else setConnector(null);
  }, [module.sections, activeSec, showComments, zoom]);

  useLayoutEffect(() => { layoutComments(); }, [layoutComments, pages, activeNote, mode]);
  useEffect(() => {
    if (!showComments) return;
    const ro = new ResizeObserver(() => layoutComments());
    cardRefs.current.forEach((el) => el && ro.observe(el));
    if (pagesRef.current) ro.observe(pagesRef.current);
    return () => ro.disconnect();
  }, [layoutComments, showComments, module.id]);

  /* ---- current page from scroll */
  const onScroll = useCallback(() => {
    const c = canvasRef.current;
    const p = pagesRef.current;
    if (!c || !p) return;
    const mid = c.getBoundingClientRect().top + c.clientHeight * 0.4;
    let idx = 1;
    p.querySelectorAll<HTMLElement>('.wd-page').forEach((el, i) => { if (el.getBoundingClientRect().top <= mid) idx = i + 1; });
    setCurPage(idx);
  }, []);

  /* ---- interactions */
  const scrollToSec = (i: number) => {
    const c = canvasRef.current;
    const el =
      pagesRef.current?.querySelector<HTMLElement>(`[data-sec-first="${i}"]`) ??
      pagesRef.current?.querySelector<HTMLElement>(`[data-sec="${i}"]`);
    if (!c || !el) return;
    const top = el.getBoundingClientRect().top - c.getBoundingClientRect().top + c.scrollTop - 48;
    c.scrollTo({ top, behavior: reducedMotion() ? 'auto' : 'smooth' });
  };

  const activate = (i: number, opts: { note?: number | null; scroll?: boolean; sheet?: boolean } = {}) => {
    setActiveSec(i);
    setActiveNote(opts.note ?? null);
    if (opts.scroll) scrollToSec(i);
    if (narrow && opts.sheet) setSheetOpen(true);
  };

  const selectModule = (id: string) => {
    setModuleId(id);
    setActiveSec(0);
    setActiveNote(null);
    setSheetOpen(false);
    canvasRef.current?.scrollTo({ top: 0 });
    if (window.innerWidth < 1024) setOutlineOpen(false);
  };

  const onFieldInput = useCallback((key: string, text: string) => {
    draft.current[key] = text;
    setSaveState('saving');
    window.clearTimeout(saveTimer.current);
    saveTimer.current = window.setTimeout(() => {
      try {
        const merged = { ...loadValues(module.id), ...draft.current };
        Object.keys(merged).forEach((k) => { if (!merged[k]) delete merged[k]; });
        localStorage.setItem(storeKey(module.id), JSON.stringify(merged));
      } catch { /* ignore */ }
      setSaveState('saved');
    }, 650);
  }, [module.id]);

  const onFieldCommit = useCallback((key: string, text: string) => {
    draft.current[key] = text;
    setValues((prev) => (prev[key] === text ? prev : { ...prev, [key]: text }));
  }, []);

  const resetTemplate = () => {
    try { localStorage.removeItem(storeKey(module.id)); } catch { /* ignore */ }
    draft.current = {};
    setValues({});
    document.querySelectorAll<HTMLElement>('.wd-pages [data-field]').forEach((el) => { el.textContent = ''; });
    setSaveState('saved');
  };

  const filledValues = { ...values, ...draft.current };
  const fullText = () => docPlain(blocks, filledValues);
  const words = useMemo(() => wordCount(docPlain(blocks, values)), [blocks, values]);
  const filledCount = Object.values(values).filter(Boolean).length;

  const ctx: InlineCtx = {
    ...ctxBase,
    interactive: true,
    onHit: (sec, n) => activate(sec, { note: n, sheet: true }),
    onFieldInput,
    onFieldCommit,
  };
  const measureCtx: InlineCtx = { ...ctx, interactive: false, activeSec: null, activeNote: null };

  const allSources = useMemo(() => {
    const seen = new Set(module.modelledOn.map((s) => s.url));
    return module.sources.filter((s) => !seen.has(s.url));
  }, [module]);

  const total = pages.length || 1;
  const sheetSec = activeSec ?? 0;
  const lhVar = { ['--wd-lh' as string]: String(cfg.lineHeight) } as React.CSSProperties;
  const docCls = `wd-doc wd-doc--${cfg.para} wd-mod--${module.id.replace('module-', '')} wd-mode--${mode}`;

  /* ------------------------------------------------------------------ */
  return (
    <div className="wd-wrap">
      <header className="wd-intro">
        <div>
          <p className="wl-eyebrow">§ Writing lab</p>
          <h1 className="text-[26px] sm:text-[32px] font-medium text-ink tracking-[-0.03em] leading-[1.1]">Write like a lawyer</h1>
        </div>
        <p className="text-[13.5px] text-muted leading-relaxed max-w-[62ch]">
          Five real-format documents, open as they would be in a word processor. Yellow passages carry Lexa’s comments; switch to
          Template to type your own version straight onto the page.
        </p>
      </header>

      <div className="wd-editor" aria-label="Document editor">
        {/* ============================== Doc bar */}
        <div className="wd-docbar">
          <DocIcon className="wd-docicon" />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 min-w-0">
              <h2 className="wd-filename" title={cfg.fileName}>{cfg.fileName}</h2>
              <span className="wd-saved" aria-live="polite">
                {mode === 'template' && saveState === 'saving' ? (
                  <><LoaderCircle className="w-3.5 h-3.5 wd-spin" aria-hidden="true" /> Saving…</>
                ) : (
                  <><CloudCheck className="w-3.5 h-3.5" aria-hidden="true" /> {mode === 'template' ? 'Saved to this device' : 'Saved'}</>
                )}
              </span>
            </div>
            <div className="wd-menubar">
              <Menu label="File">
                {(close) => (
                  <>
                    <button role="menuitem" type="button" onClick={() => { close(); printDoc(); }}><Printer className="w-4 h-4" aria-hidden="true" /> Print or save as PDF</button>
                    <button role="menuitem" type="button" onClick={() => { close(); exportDoc(module, blocks, filledValues, cfg.fileName); }}><Download className="w-4 h-4" aria-hidden="true" /> Download for Word (.doc)</button>
                    <button role="menuitem" type="button" onClick={() => { close(); copy('menu-copy', fullText()); }}><Copy className="w-4 h-4" aria-hidden="true" /> Copy all text</button>
                    {mode === 'template' && (
                      <button role="menuitem" type="button" onClick={() => { close(); resetTemplate(); }}><RotateCcw className="w-4 h-4" aria-hidden="true" /> Clear my template</button>
                    )}
                  </>
                )}
              </Menu>
              <Menu label="View">
                {(close) => (
                  <>
                    <button role="menuitem" type="button" onClick={() => { close(); setOutlineOpen((o) => !o); }}><ListTree className="w-4 h-4" aria-hidden="true" /> {outlineOpen ? 'Hide' : 'Show'} outline</button>
                    <button role="menuitem" type="button" onClick={() => { close(); setCommentsOn((o) => !o); }} disabled={narrow}><MessageSquareText className="w-4 h-4" aria-hidden="true" /> {commentsOn ? 'Hide' : 'Show'} comments</button>
                    <div className="wd-menu-sep" />
                    {ZOOMS.map((z) => (
                      <button role="menuitemradio" aria-checked={zoomSel === z.v} key={z.label} type="button" onClick={() => { close(); setZoomSel(z.v); }}>
                        <span className="w-4 inline-flex justify-center">{zoomSel === z.v ? <Check className="w-4 h-4" aria-hidden="true" /> : null}</span> Zoom {z.label}
                      </button>
                    ))}
                  </>
                )}
              </Menu>
              <span className="wd-menu-meta">{module.documentType} · <i>{module.documentTypeId}</i></span>
            </div>
          </div>
          <div className="wd-docbar-actions">
            <div className="wd-seg" role="group" aria-label="Document view">
              <button type="button" aria-pressed={mode === 'example'} className={mode === 'example' ? 'is-on' : ''} onClick={() => setMode('example')}>
                <Eye className="w-3.5 h-3.5" aria-hidden="true" /> Example
              </button>
              <button type="button" aria-pressed={mode === 'template'} className={mode === 'template' ? 'is-on' : ''} onClick={() => { setMode('template'); setActiveNote(null); }}>
                <Pencil className="w-3.5 h-3.5" aria-hidden="true" /> Template
              </button>
            </div>
            <button
              type="button"
              className={`wd-icobtn wd-cmt-toggle${showComments ? ' is-on' : ''}`}
              onClick={() => setCommentsOn((o) => !o)}
              aria-pressed={showComments}
              aria-label={showComments ? 'Hide comments' : 'Show comments'}
              title="Comments"
              disabled={narrow}
            >
              <MessageSquareText className="w-[18px] h-[18px]" aria-hidden="true" />
            </button>
            <button type="button" className="wd-pill hidden sm:inline-flex" onClick={printDoc}>
              <Printer className="w-4 h-4" aria-hidden="true" /> Print / PDF
            </button>
          </div>
        </div>

        {/* ============================== Toolbar */}
        <div className="wd-toolbar" role="toolbar" aria-label="Document tools">
          <button type="button" className={`wd-tb${outlineOpen ? ' is-on' : ''}`} onClick={() => setOutlineOpen((o) => !o)} aria-pressed={outlineOpen} title="Outline">
            <ListTree className="w-4 h-4" aria-hidden="true" /><span className="wd-tb-l">Outline</span>
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
          <span className="wd-tb-read wd-tb-size hidden md:inline-flex" title="Font size">12</span>
          <span className="wd-tb-read hidden xl:inline-flex" title="Line spacing">{cfg.lineHeight.toFixed(2).replace(/0$/, '')} spacing</span>
          <span className="flex-1" />
          {mode === 'template' && (
            <button type="button" className="wd-tb" onClick={resetTemplate} disabled={filledCount === 0 && Object.keys(draft.current).length === 0} title="Clear everything you typed">
              <RotateCcw className="w-4 h-4" aria-hidden="true" /><span className="wd-tb-l">Reset</span>
            </button>
          )}
          <button type="button" className="wd-tb" onClick={() => copy('tb-copy', fullText())} title="Copy all text">
            {copiedKey === 'tb-copy' ? <Check className="w-4 h-4" aria-hidden="true" /> : <Copy className="w-4 h-4" aria-hidden="true" />}
            <span className="wd-tb-l">{copiedKey === 'tb-copy' ? 'Copied' : 'Copy'}</span>
          </button>
          <span className="wd-tb-sep hidden sm:block" aria-hidden="true" />
          <span className={`wd-tb-mode${mode === 'template' ? ' is-edit' : ''}`}>
            {mode === 'template' ? <Pencil className="w-4 h-4" aria-hidden="true" /> : <Eye className="w-4 h-4" aria-hidden="true" />}
            <span className="hidden sm:inline">{mode === 'template' ? 'Editing' : 'Viewing'}</span>
          </span>
        </div>

        {/* ============================== Body */}
        <div className="wd-body">
          {outlineOpen && <div className="wd-scrim lg:hidden" onClick={() => setOutlineOpen(false)} aria-hidden="true" />}
          <nav className={`wd-side${outlineOpen ? ' is-open' : ''}`} aria-label="Documents and outline">
            <div className="flex items-center justify-between">
              <p className="wd-side-h">Documents</p>
              <button type="button" className="wd-icobtn is-sm lg:hidden" onClick={() => setOutlineOpen(false)} aria-label="Close outline"><X className="w-4 h-4" aria-hidden="true" /></button>
            </div>
            <ul className="wd-tabs" role="list">
              {writingModulesList.map((m) => {
                const on = m.id === module.id;
                return (
                  <li key={m.id}>
                    <button type="button" className={`wd-tab${on ? ' is-on' : ''}`} aria-current={on ? 'page' : undefined} onClick={() => selectModule(m.id)}>
                      <DocIcon className="wd-tab-ico" />
                      <span className="min-w-0">
                        <span className="wd-tab-t">{m.title}</span>
                        <span className="wd-tab-s">{m.documentTypeId ?? m.documentType}</span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
            <p className="wd-side-h mt-5">Outline</p>
            <ol className="wd-outline">
              {module.sections.map((s, i) => (
                <li key={i}>
                  <button type="button" className={`wd-ol${i === activeSec ? ' is-on' : ''}`} onClick={() => { activate(i, { scroll: true }); if (window.innerWidth < 1024) setOutlineOpen(false); }}>
                    <span className="truncate">{s.sectionName}</span>
                    <span className="wd-ol-id">{s.indonesianName}</span>
                  </button>
                </li>
              ))}
            </ol>
          </nav>

          <div className="wd-canvas" ref={canvasRef} onScroll={onScroll}>
            <div
              className="wd-stage"
              ref={stageRef}
              style={{ width: pagesW + (showComments ? COMMENTS_GAP + COMMENTS_W : 0) }}
            >
              <div className="wd-pages wd-print-root" ref={pagesRef} style={{ zoom, width: PAGE_W }}>
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
                  <section key={`${module.id}-${mode}-${pi}`} className={`wd-page ${docCls}`} style={lhVar} aria-label={`Page ${pi + 1} of ${total}`}>
                    {pi === 0 && cfg.firstHeader && <div className="wd-hdr is-first">{cfg.firstHeader}</div>}
                    {pi > 0 && cfg.header && (
                      <div className="wd-hdr"><span>{cfg.header[0]}</span><span>{cfg.header[1]}</span></div>
                    )}
                    <div className="wd-content">
                      {parts.map((part, j) => (
                        <BlockView
                          key={`${part.b.id}-${part.from}`}
                          part={part}
                          ctx={ctx}
                          isLastOfKind={lastOfKind.has(part.b.id) && !part.head}
                          isDocTitle={part.b.id === docTitleId}
                          pageTop={j === 0}
                          footRef={part.b.id === footRefId && !part.tail}
                          marginBtn={narrow && part.b.first && !part.tail ? {
                            size: 30 / zoom,
                            label: `Open comment: ${module.sections[part.b.sec].sectionName}`,
                            onTap: () => activate(part.b.sec, { sheet: true }),
                          } : null}
                          onBlockClick={(sec) => { if (activeSec !== sec || narrow) activate(sec, { sheet: narrow && mode === 'example' }); }}
                        />
                      ))}
                    </div>
                    {pi === 0 && module.disclaimer && (
                      <div className="wd-footnotes"><p><sup>1</sup> {module.disclaimer}</p></div>
                    )}
                    <div className="wd-ftr">{cfg.footer(pi + 1, total)}</div>
                  </section>
                ))}

                <aside className="wd-sources" aria-labelledby="wd-sources-h">
                  <h3 id="wd-sources-h">Sources</h3>
                  <p className="wd-sources-sub">Every page below was opened and checked when this module was written (October 2026).</p>
                  <p className="wd-sources-k">Modelled on</p>
                  <SourceList items={module.modelledOn} />
                  {allSources.length > 0 && (
                    <>
                      <p className="wd-sources-k">Authorities &amp; writing guides</p>
                      <SourceList items={allSources} start={module.modelledOn.length + 1} />
                    </>
                  )}
                </aside>
              </div>

              {showComments && (
                <div className="wd-comments" style={{ left: pagesW + COMMENTS_GAP, width: COMMENTS_W }} aria-label="Comments">
                  {module.sections.map((s, i) => {
                    const on = i === activeSec;
                    return (
                      <div
                        key={`${module.id}-${i}`}
                        ref={(el) => { cardRefs.current[i] = el; }}
                        className={`wd-cmt${on ? ' is-on' : ''}`}
                        style={{ top: positions[i]?.top ?? i * 110 }}
                        onClick={() => { if (!on) activate(i, { scroll: false }); }}
                      >
                        {!on && (
                          <button type="button" className="sr-only" onClick={() => activate(i)}>Open comment on {s.sectionName}</button>
                        )}
                        <CommentBody
                          s={s} index={i} total={module.sections.length} expanded={on} mode={mode}
                          activeNote={on ? activeNote : null}
                          onNote={(n) => setActiveNote(activeNote === n ? null : n)}
                          copiedKey={copiedKey} copy={copy} idPrefix="card"
                        />
                        {on && (
                          <div className="wd-cmt-nav">
                            <button type="button" className="wd-icobtn is-sm" disabled={i === 0} onClick={(e) => { e.stopPropagation(); activate(i - 1, { scroll: true }); }} aria-label="Previous comment"><ChevronLeft className="w-4 h-4" aria-hidden="true" /></button>
                            <button type="button" className="wd-icobtn is-sm" disabled={i === module.sections.length - 1} onClick={(e) => { e.stopPropagation(); activate(i + 1, { scroll: true }); }} aria-label="Next comment"><ChevronRight className="w-4 h-4" aria-hidden="true" /></button>
                            <span className="flex-1" />
                            <button type="button" className="wd-cmt-close" onClick={(e) => { e.stopPropagation(); setActiveSec(null); setActiveNote(null); }}>Close</button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
              {showComments && connector && (
                <svg className="wd-connector" aria-hidden="true"><path d={connector} /></svg>
              )}
            </div>
          </div>
        </div>

        {/* ============================== Status bar */}
        <div className="wd-status">
          <span>Page {Math.min(curPage, total)} of {total}</span>
          <span>{words.toLocaleString('en-US')} words</span>
          {mode === 'template' && <span className="hidden sm:inline">{filledCount} field{filledCount === 1 ? '' : 's'} filled</span>}
          <span className="hidden sm:inline">English</span>
          <span className="flex-1" />
          <span className="hidden sm:inline">A4 · 210 × 297 mm</span>
          <span>{Math.round(zoom * 100)}%</span>
        </div>
      </div>

      {/* Hidden measuring copy for pagination */}
      <div className="wd-measure" aria-hidden="true">
        <div ref={measureRef} className={docCls} style={{ ...lhVar, width: CONTENT_W, zoom }}>
          {blocks.map((b) => (
            <BlockView
              key={b.id}
              part={{ b, from: 0, to: b.text.length, head: false, tail: false }}
              ctx={measureCtx}
              measure
              isLastOfKind={lastOfKind.has(b.id)}
              isDocTitle={b.id === docTitleId}
              pageTop={false}
              footRef={b.id === footRefId}
            />
          ))}
          {module.disclaimer && <div className="wd-footnotes is-measure" data-mfoot><p><sup>1</sup> {module.disclaimer}</p></div>}
        </div>
      </div>

      {/* Mobile comment sheet */}
      {narrow && sheetOpen && activeSec != null && (
        <>
          <div className="wd-sheet-scrim" onClick={() => setSheetOpen(false)} aria-hidden="true" />
          <div className="wd-sheet" role="dialog" aria-modal="false" aria-label={`Comment: ${module.sections[sheetSec].sectionName}`}>
            <div className="wd-sheet-grip" aria-hidden="true" />
            <div className="wd-sheet-bar">
              <button type="button" className="wd-icobtn is-sm" disabled={sheetSec === 0} onClick={() => activate(sheetSec - 1, { scroll: true, sheet: true })} aria-label="Previous comment"><ChevronLeft className="w-4 h-4" aria-hidden="true" /></button>
              <button type="button" className="wd-icobtn is-sm" disabled={sheetSec === module.sections.length - 1} onClick={() => activate(sheetSec + 1, { scroll: true, sheet: true })} aria-label="Next comment"><ChevronRight className="w-4 h-4" aria-hidden="true" /></button>
              <span className="flex-1" />
              <button type="button" className="wd-icobtn is-sm" onClick={() => setSheetOpen(false)} aria-label="Close comment"><X className="w-4 h-4" aria-hidden="true" /></button>
            </div>
            <div className="wd-sheet-body">
              <CommentBody
                s={module.sections[sheetSec]} index={sheetSec} total={module.sections.length} expanded mode={mode}
                activeNote={activeNote}
                onNote={(n) => setActiveNote(activeNote === n ? null : n)}
                copiedKey={copiedKey} copy={copy} idPrefix="sheet"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const SourceList: React.FC<{ items: SourceRef[]; start?: number }> = ({ items, start = 1 }) => (
  <ol className="wd-srclist" start={start}>
    {items.map((s) => (
      <li key={s.url}>
        <a href={s.url} target="_blank" rel="noopener noreferrer">
          {s.label}<ExternalLink className="inline w-3 h-3 ml-1 -mt-0.5 opacity-60" aria-hidden="true" />
        </a>
        {s.note && <span>{s.note}</span>}
      </li>
    ))}
  </ol>
);
