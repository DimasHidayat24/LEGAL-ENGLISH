import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { LegalTerm } from '../types';
import { ArrowUpRight } from 'lucide-react';

/**
 * "The annotated page" — Lexa's hero visual.
 * A law-book page: clause numbers in the left margin, the clause in serif in the
 * centre column, and marginalia in the right margin joined to their terms by thin
 * ink lines. On narrow screens the marginalia collapse into numbered footnotes.
 * Pure CSS animation (marker sweep → lines draw → notes fade up); reduced motion
 * shows the final state at once.
 */

// Terms that carry a margin note, in reading order (footnote numbers follow this order).
export const NOTE_IDS = ['whereas', 'pursuant-to', 'shall', 'breach', 'indemnity'] as const;
const RED_PENCIL_ID = 'indemnity';
const WIDE_QUERY = '(min-width: 1024px)';

export const usePrefersReducedMotion = () => {
  const get = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const [reduce, setReduce] = useState(get);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const on = () => setReduce(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return reduce;
};

const useIsWide = () => {
  const get = () => typeof window !== 'undefined' && window.matchMedia(WIDE_QUERY).matches;
  const [wide, setWide] = useState(get);
  useEffect(() => {
    const mq = window.matchMedia(WIDE_QUERY);
    const on = () => setWide(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return wide;
};

/** Short Indonesian equivalent: first alternative, without parenthetical gloss. */
const shortId = (t: LegalTerm) => t.indonesianMeaning.split('/')[0].replace(/\(.*?\)/g, '').trim();
const shortEn = (t: LegalTerm) => t.plainEnglish ?? t.legalDefinition;

// "shall deliver" → "wajib menyerahkan": the typed line under the page.
const RENDERINGS: [string, string][] = [
  ['the Seller shall deliver the Goods', 'Penjual wajib menyerahkan Barang'],
  ['the Parties hereby agree', 'para Pihak dengan ini sepakat'],
  ['a full indemnity for any direct liability', 'ganti rugi penuh atas setiap tanggung jawab langsung'],
];

const Typewriter: React.FC<{ startDelay: number }> = ({ startDelay }) => {
  const reduce = usePrefersReducedMotion();
  const [i, setI] = useState(0);
  const [en, setEn] = useState(0);
  const [id, setId] = useState(0);
  const first = useRef(true);

  useEffect(() => {
    if (reduce) {
      setEn(999);
      setId(999);
      const t = window.setInterval(() => setI((x) => (x + 1) % RENDERINGS.length), 4000);
      return () => window.clearInterval(t);
    }
    const [a, b] = RENDERINGS[i];
    let t = 0;
    let e = 0;
    let d = 0;
    setEn(0);
    setId(0);
    const tickId = () => {
      d += 1;
      setId(d);
      t = window.setTimeout(
        d < b.length ? tickId : () => setI((x) => (x + 1) % RENDERINGS.length),
        d < b.length ? 32 : 2400,
      );
    };
    const tickEn = () => {
      e += 1;
      setEn(e);
      t = window.setTimeout(e < a.length ? tickEn : tickId, e < a.length ? 38 : 550);
    };
    t = window.setTimeout(tickEn, first.current ? startDelay : 300);
    first.current = false;
    return () => window.clearTimeout(t);
  }, [i, reduce, startDelay]);

  const [a, b] = RENDERINGS[i];
  const enDone = en >= a.length;
  return (
    <p className="min-w-0 text-[14px] sm:text-[15px] leading-6 min-h-[48px] sm:min-h-6">
      <span className="sr-only">
        {RENDERINGS.map(([x, y]) => `${x}: ${y}`).join('; ')}
      </span>
      <span aria-hidden="true">
        <span className="font-legal text-ink">{a.slice(0, en)}</span>
        {enDone && <span className="text-muted px-1.5">→</span>}
        <span className="font-legal italic text-link">{b.slice(0, id)}</span>
        <span className="tw-caret" />
      </span>
    </p>
  );
};

interface Props {
  terms: Record<string, LegalTerm>;
  onOpenTerm: (id: string) => void;
  onOpenReader: () => void;
}

export const AnnotatedPage: React.FC<Props> = ({ terms, onOpenTerm, onOpenReader }) => {
  const wide = useIsWide();
  const [lang, setLang] = useState<'ID' | 'EN'>('ID');
  const [hot, setHot] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [layout, setLayout] = useState<{ tops: Record<string, number>; paths: Record<string, string>; leaders: Record<string, string>; dots: Record<string, [number, number]>; h: number; w: number }>({
    tops: {},
    paths: {},
    leaders: {},
    dots: {},
    h: 0,
    w: 0,
  });

  const rootRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const marginRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const termRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const noteRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const loaded = Object.keys(terms).length > 0;

  const measure = useCallback(() => {
    const root = rootRef.current;
    const margin = marginRef.current;
    const text = textRef.current;
    if (!wide || !root || !margin || !text) return;
    const r = root.getBoundingClientRect();
    const m = margin.getBoundingClientRect();
    const colRight = text.getBoundingClientRect().right - r.left;
    const tops: Record<string, number> = {};
    const paths: Record<string, string> = {};
    const leaders: Record<string, string> = {};
    const dots: Record<string, [number, number]> = {};
    let prevBottom = -Infinity;
    NOTE_IDS.forEach((id) => {
      const el = termRefs.current[id];
      const note = noteRefs.current[id];
      if (!el || !note) return;
      const rects = el.getClientRects();
      const last = rects[rects.length - 1];
      if (!last) return;
      const tx = last.right - r.left + 1;
      const ty = last.bottom - r.top - 0.5;
      const top = Math.max(last.top - m.top - 3, prevBottom + 14);
      prevBottom = top + note.offsetHeight;
      tops[id] = top;
      const nx = m.left - r.left - 8;
      const ny = m.top - r.top + top + 12;
      const gx = colRight + 14;
      const mid = gx + (nx - gx) * 0.55;
      leaders[id] = `M ${tx.toFixed(1)} ${ty.toFixed(1)} H ${gx.toFixed(1)}`;
      paths[id] = `M ${gx.toFixed(1)} ${ty.toFixed(1)} C ${mid.toFixed(1)} ${ty.toFixed(1)}, ${mid.toFixed(1)} ${ny.toFixed(1)}, ${nx.toFixed(1)} ${ny.toFixed(1)}`;
      dots[id] = [nx, ny];
    });
    setLayout({ tops, paths, leaders, dots, h: Math.max((gridRef.current?.getBoundingClientRect().bottom ?? r.bottom) - r.top, prevBottom + (m.top - r.top)) + 48, w: r.width });
  }, [wide]);

  // Measure whenever text, language or size changes. Runs before paint, so no jump.
  useLayoutEffect(() => {
    measure();
  }, [measure, loaded, lang]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ro = new ResizeObserver(() => measure());
    ro.observe(root);
    document.fonts?.ready.then(() => measure());
    return () => ro.disconnect();
  }, [measure]);

  // Start the "studying" sequence once the notes exist (or after a safety timeout).
  useEffect(() => {
    if (loaded) {
      const t = window.setTimeout(() => setReady(true), 60);
      return () => window.clearTimeout(t);
    }
    const t = window.setTimeout(() => setReady(true), 1800);
    return () => window.clearTimeout(t);
  }, [loaded]);

  let sweepIndex = 0;
  // Plain render helper (not a component) so hover re-renders never remount a button mid-click.
  const term = (id: string, label: string, opts: { note?: boolean } = {}) => {
    const n = opts.note ? NOTE_IDS.indexOf(id as (typeof NOTE_IDS)[number]) + 1 : 0;
    const delay = sweepIndex++ * 150;
    return (
      <React.Fragment key={`${id}-${label}`}>
        <button
          type="button"
          ref={opts.note ? (el) => { termRefs.current[id] = el; } : undefined}
          onMouseEnter={() => setHot(id)}
          onMouseLeave={() => setHot(null)}
          onFocus={() => setHot(id)}
          onBlur={() => setHot(null)}
          onClick={() => onOpenTerm(id)}
          aria-label={terms[id] ? `${label}: ${shortId(terms[id])}. Open entry` : `${label}. Open entry`}
          className={`ann-term ${id === RED_PENCIL_ID ? 'is-red' : ''} ${hot === id ? 'is-hot' : ''}`}
          style={{ '--d': `${delay}ms` } as React.CSSProperties}
        >
          {label}
        </button>
        {n > 0 && (
          <sup className="lg:hidden text-[11px] font-sans font-semibold text-link ml-0.5" aria-hidden="true">
            {n}
          </sup>
        )}
      </React.Fragment>
    );
  };

  const paragraphs: { no: string; body: React.ReactNode }[] = [
    {
      no: 'Recital A',
      body: (
        <>
          {term('whereas', 'WHEREAS', { note: true })}, the Seller agrees to fabricate and deliver industrial machinery{' '}
          {term('pursuant-to', 'pursuant to', { note: true })} the technical specifications set out in Schedule 1;
        </>
      ),
    },
    {
      no: 'Cl. 14.1',
      body: (
        <>
          NOW THEREFORE, the Parties {term('hereby', 'hereby')} agree that the Seller {term('shall', 'shall', { note: true })} deliver
          the Goods without delay.
        </>
      ),
    },
    {
      no: 'Cl. 14.2',
      body: (
        <>
          {term('notwithstanding', 'Notwithstanding')} any contrary term, any failure to deliver shall constitute a material{' '}
          {term('breach', 'breach', { note: true })}, and the Seller shall provide a full {term('indemnity', 'indemnity', { note: true })}{' '}
          for any direct {term('liability', 'liability')} arising therefrom.
        </>
      ),
    },
  ];

  const noteText = (id: string) => {
    const t = terms[id];
    if (!t) return '…';
    return lang === 'ID' ? shortId(t) : shortEn(t);
  };

  const lineStart = 1100; // ms: lines begin while the last markers finish
  const noteStart = 1400;

  return (
    <div className={`paper ann-page ${ready ? 'is-ready' : ''}`}>
      {/* Running head */}
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 px-5 sm:px-8 lg:px-10 pt-5 pb-4 border-b border-line">
        <p className="font-legal smallcaps text-[15px] text-muted min-w-0 truncate">
          Master Purchase &amp; Indemnity Agreement
        </p>
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div className="seg" role="group" aria-label="Margin notes language">
            {(['EN', 'ID'] as const).map((l) => (
              <button
                key={l}
                type="button"
                aria-pressed={lang === l}
                onClick={() => setLang(l)}
                title={l === 'ID' ? 'Indonesian equivalents' : 'Short English definitions'}
                className={lang === l ? 'on' : ''}
              >
                {l}
              </button>
            ))}
          </div>
          <button onClick={onOpenReader} className="btn-ghost h-8 px-2 text-[13px]">
            <span className="hidden sm:inline">Open in reader</span>
            <span className="sm:hidden">Reader</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* The page */}
      <div ref={rootRef} className="relative px-5 sm:px-8 lg:px-10 pt-8 lg:pt-12 pb-8 lg:pb-12" style={wide && layout.h ? { minHeight: layout.h } : undefined}>
        {wide && (
          <svg className="ann-lines" width={layout.w} height={layout.h} aria-hidden="true">
            {NOTE_IDS.map((id, i) =>
              layout.paths[id] ? (
                <g key={id} className={hot === id ? 'is-hot' : ''}>
                  <path className="leader" d={layout.leaders[id]} style={{ '--d': `${lineStart + i * 150}ms` } as React.CSSProperties} />
                  <path className="curve" d={layout.paths[id]} pathLength={1} style={{ '--d': `${lineStart + i * 150}ms` } as React.CSSProperties} />
                  <circle cx={layout.dots[id][0]} cy={layout.dots[id][1]} r={2} style={{ '--d': `${noteStart + i * 150}ms` } as React.CSSProperties} />
                </g>
              ) : null,
            )}
          </svg>
        )}

        <div ref={gridRef} className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,600px)_1fr] lg:gap-x-10">
          {paragraphs.map((p, i) => (
            <React.Fragment key={p.no}>
              <p
                className="font-legal smallcaps text-[13px] lg:text-[14px] text-muted lg:text-right lg:pt-[7px] mb-1 lg:mb-0"
                style={{ gridColumn: wide ? 1 : undefined, gridRow: wide ? i + 1 : undefined }}
              >
                {p.no}
              </p>
              <div
                ref={i === 0 ? textRef : undefined}
                className={`font-legal text-[17px] sm:text-[19px] leading-[1.85] text-ink ${i < paragraphs.length - 1 ? 'mb-5 lg:mb-6' : ''}`}
                style={{ gridColumn: wide ? 2 : undefined, gridRow: wide ? i + 1 : undefined }}
              >
                <p>{p.body}</p>
              </div>
            </React.Fragment>
          ))}

          {/* Right margin: marginalia (wide screens) */}
          <div ref={marginRef} className="hidden lg:block relative" style={{ gridColumn: 3, gridRow: `1 / span ${paragraphs.length}` }}>
            {NOTE_IDS.map((id, i) => (
              <button
                key={id}
                ref={(el) => {
                  noteRefs.current[id] = el;
                }}
                type="button"
                onMouseEnter={() => setHot(id)}
                onMouseLeave={() => setHot(null)}
                onFocus={() => setHot(id)}
                onBlur={() => setHot(null)}
                onClick={() => onOpenTerm(id)}
                className={`ann-note ${hot === id ? 'is-hot' : ''} ${lang === 'EN' ? 'is-en' : ''}`}
                style={{ top: layout.tops[id] ?? 0, '--d': `${noteStart + i * 150}ms` } as React.CSSProperties}
              >
                <span className="ann-note-term">{terms[id]?.term ?? id}</span>
                <span className="ann-note-body">{noteText(id)}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Narrow screens: marginalia become numbered footnotes */}
        <ol className="lg:hidden mt-6 pt-4 border-t border-line space-y-2">
          {NOTE_IDS.map((id, i) => (
            <li key={id}>
              <button type="button" onClick={() => onOpenTerm(id)} className="ann-foot w-full text-left flex gap-3 items-baseline">
                <span className="text-[11px] font-semibold text-link w-3 shrink-0">{i + 1}</span>
                <span className="text-[14px] leading-snug min-w-0">
                  <span className="font-legal font-semibold text-ink">{terms[id]?.term ?? id}</span>
                  <span className="text-muted"> — </span>
                  <span className={`font-legal italic text-link ${lang === 'EN' ? 'line-clamp-2' : ''}`}>{noteText(id)}</span>
                </span>
              </button>
            </li>
          ))}
        </ol>
      </div>

      {/* Foot of the page: EN → ID rendering, typed */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-6 px-5 sm:px-8 lg:px-10 py-4 border-t border-line">
        <Typewriter startDelay={2300} />
        <p className="text-xs text-muted shrink-0">Tap a term for the full entry</p>
      </div>
    </div>
  );
};
