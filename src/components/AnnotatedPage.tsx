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

// Every highlighted term carries a margin note, in reading order (footnote numbers follow this order).
export const NOTE_IDS = ['whereas', 'pursuant-to', 'hereby', 'shall', 'notwithstanding', 'breach', 'indemnity', 'liability'] as const;
const RED_PENCIL_ID = 'indemnity';
const WIDE_QUERY = '(min-width: 1024px)';
const SPOT_MS = 2500;

/** Curated Indonesian labels where the vocabulary's first alternative reads poorly in a margin. */
const ID_OVERRIDE: Record<string, string> = {
  notwithstanding: 'Meskipun / Tanpa mengurangi',
  liability: 'Tanggung jawab (hukum)',
};

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

/** True while the element is (partly) on screen. */
export const useInView = <T extends Element>(threshold = 0.25) => {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView] as const;
};

/** True while the tab is visible. */
export const usePageVisible = () => {
  const [vis, setVis] = useState(() => typeof document === 'undefined' || !document.hidden);
  useEffect(() => {
    const on = () => setVis(!document.hidden);
    document.addEventListener('visibilitychange', on);
    return () => document.removeEventListener('visibilitychange', on);
  }, []);
  return vis;
};

/** Elapsed ms on a clock that only runs while `running`; drives time-based loops (robust to timer throttling). */
export const useLoopClock = (running: boolean, tickMs = 40) => {
  const [t, setT] = useState(0);
  const base = useRef(0);
  useEffect(() => {
    if (!running) return;
    const start = performance.now() - base.current;
    const id = window.setInterval(() => {
      base.current = performance.now() - start;
      setT(base.current);
    }, tickMs);
    return () => window.clearInterval(id);
  }, [running, tickMs]);
  return t;
};

/** Short Indonesian equivalent: curated label, else first alternative without parenthetical gloss. */
const shortId = (t: LegalTerm) => ID_OVERRIDE[t.id] ?? t.indonesianMeaning.split('/')[0].replace(/\(.*?\)/g, '').trim();
const shortEn = (t: LegalTerm) => t.plainEnglish ?? t.legalDefinition;
const firstSentence = (s: string) => {
  const m = s.match(/^.*?[.;](\s|$)/);
  return (m ? m[0] : s).trim();
};

// The typed line under the page: one rendering per highlighted term family.
const RENDERINGS: [string, string][] = [
  ['the Seller shall deliver the Goods', 'Penjual wajib menyerahkan Barang'],
  ['the Parties hereby agree', 'para Pihak dengan ini sepakat'],
  ['pursuant to Schedule 1', 'berdasarkan Lampiran 1'],
  ['notwithstanding any contrary term', 'tanpa mengurangi ketentuan yang bertentangan'],
  ['a full indemnity for any direct liability', 'ganti rugi penuh atas setiap tanggung jawab langsung'],
];

// Timeline of one rendering (ms).
const T_EN = 46; // per char typed
const T_ID = 30;
const T_DEL = 14;
const HOLD_EN = 1100;
const MORPH = 420;
const HOLD_ID = 1900;
const GAP = 350;
const segLen = ([a, b]: [string, string]) => a.length * T_EN + HOLD_EN + MORPH + b.length * T_ID + HOLD_ID + b.length * T_DEL + GAP;
const CYCLE = RENDERINGS.reduce((n, r) => n + segLen(r), 0);

type TwFrame = { i: number; en: number; id: number; phase: 'en' | 'morph' | 'id' | 'del' | 'gap' };
const twFrame = (ms: number): TwFrame => {
  let t = ms % CYCLE;
  for (let i = 0; i < RENDERINGS.length; i++) {
    const L = segLen(RENDERINGS[i]);
    if (t >= L) {
      t -= L;
      continue;
    }
    const [a, b] = RENDERINGS[i];
    const typeEn = a.length * T_EN;
    if (t < typeEn + HOLD_EN) return { i, en: Math.min(a.length, Math.floor(t / T_EN) + 1), id: 0, phase: 'en' };
    t -= typeEn + HOLD_EN;
    if (t < MORPH) return { i, en: a.length, id: Math.floor((t / MORPH) * 3), phase: 'morph' };
    t -= MORPH;
    const typeId = b.length * T_ID;
    if (t < typeId + HOLD_ID) return { i, en: a.length, id: Math.min(b.length, 3 + Math.floor(t / T_ID)), phase: 'id' };
    t -= typeId + HOLD_ID;
    const del = b.length * T_DEL;
    if (t < del) return { i, en: a.length, id: Math.max(0, b.length - Math.floor(t / T_DEL)), phase: 'del' };
    return { i, en: 0, id: 0, phase: 'gap' };
  }
  return { i: 0, en: 0, id: 0, phase: 'gap' };
};

const Typewriter: React.FC<{ running: boolean }> = ({ running }) => {
  const reduce = usePrefersReducedMotion();
  const t = useLoopClock(running && !reduce, 30);
  const [staticI, setStaticI] = useState(0);
  useEffect(() => {
    if (!reduce) return;
    const id = window.setInterval(() => setStaticI((x) => (x + 1) % RENDERINGS.length), 5000);
    return () => window.clearInterval(id);
  }, [reduce]);

  const f: TwFrame = reduce ? { i: staticI, en: 999, id: 999, phase: 'id' } : twFrame(t);
  const [a, b] = RENDERINGS[f.i];
  const showId = f.phase === 'morph' || f.phase === 'id' || f.phase === 'del';
  const lang = showId ? 'ID' : 'EN';
  return (
    <div className="tw-line min-w-0 flex items-start gap-3 text-[14px] sm:text-[15px] leading-6">
      <span className="sr-only">{RENDERINGS.map(([x, y]) => `${x}: ${y}`).join('; ')}</span>
      <span aria-hidden="true" key={lang} className={`tw-badge ${showId ? 'is-id' : ''}`}>
        {lang}
      </span>
      {/* Every rendering sits invisibly in the same cell, so the line keeps its size while typing. */}
      <span aria-hidden="true" className="tw-stack min-w-0">
        {RENDERINGS.flatMap(([x, y]) => [x, y]).map((s, k) => (
          <span key={k} className="tw-ghost font-legal">
            {s}
          </span>
        ))}
        <span className="tw-live">
          {reduce ? (
            <span className="tw-text">
              <span className="font-legal text-ink">{a}</span>
              <span className="text-muted px-1.5">→</span>
              <span className="font-legal italic text-link">{b}</span>
            </span>
          ) : showId ? (
            <span className="tw-text">
              {f.phase === 'morph' && <span className="tw-out font-legal text-ink">{a}</span>}
              <span className="font-legal italic text-link">{b.slice(0, f.id)}</span>
              <span className="tw-caret" />
            </span>
          ) : (
            <span className="tw-text">
              <span className="font-legal text-ink">{a.slice(0, f.en)}</span>
              <span className="tw-caret" />
            </span>
          )}
        </span>
      </span>
    </div>
  );
};

/** Note body that crossfades (with a slight slide) when its text changes. */
const SwapText: React.FC<{ text: string; className?: string }> = ({ text, className = '' }) => {
  const [prev, setPrev] = useState<string | null>(null);
  const cur = useRef(text);
  useEffect(() => {
    if (cur.current === text) return;
    setPrev(cur.current);
    cur.current = text;
    const t = window.setTimeout(() => setPrev(null), 380);
    return () => window.clearTimeout(t);
  }, [text]);
  return (
    <span className={`swap ${className}`}>
      {prev !== null && (
        <span className="swap-out" aria-hidden="true">
          {prev}
        </span>
      )}
      <span key={text} className={prev !== null ? 'swap-in' : undefined}>
        {text}
      </span>
    </span>
  );
};

interface Props {
  terms: Record<string, LegalTerm>;
  onOpenTerm: (id: string) => void;
  onOpenReader: () => void;
}

type Layout = {
  tops: Record<string, number>;
  paths: Record<string, string>;
  leaders: Record<string, string>;
  full: Record<string, string>;
  dots: Record<string, [number, number]>;
  h: number;
  w: number;
};

export const AnnotatedPage: React.FC<Props> = ({ terms, onOpenTerm, onOpenReader }) => {
  const wide = useIsWide();
  const reduce = usePrefersReducedMotion();
  const pageVisible = usePageVisible();
  const [lang, setLang] = useState<'ID' | 'EN'>('ID');
  const [hot, setHot] = useState<string | null>(null);
  const [tip, setTip] = useState<{ id: string; x: number; y: number; below: boolean } | null>(null);
  const [pointerIn, setPointerIn] = useState(false);
  const [ready, setReady] = useState(false);
  const [spot, setSpot] = useState<{ id: string; n: number } | null>(null);
  const [layout, setLayout] = useState<Layout>({ tops: {}, paths: {}, leaders: {}, full: {}, dots: {}, h: 0, w: 0 });

  const [pageRef, inView] = useInView<HTMLDivElement>(0.2);
  const rootRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const marginRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const termRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const noteRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const lastTouch = useRef(0);
  const tipShown = useRef<{ id: string; at: number }>({ id: '', at: 0 });
  const loaded = Object.keys(terms).length > 0;

  const measure = useCallback(() => {
    const root = rootRef.current;
    const margin = marginRef.current;
    const text = textRef.current;
    if (!wide || !root || !margin || !text) return;
    const r = root.getBoundingClientRect();
    const m = margin.getBoundingClientRect();
    const colRight = text.getBoundingClientRect().right - r.left;
    const GAP_Y = 8;

    // 1) Desired top of each note = top of its term's last line box.
    const items = NOTE_IDS.map((id) => {
      const el = termRefs.current[id];
      const note = noteRefs.current[id];
      const rects = el?.getClientRects();
      const last = rects && rects[rects.length - 1];
      if (!el || !note || !last) return null;
      return { id, last, want: last.top - m.top - 4, h: note.offsetHeight, top: 0 };
    }).filter(Boolean) as { id: string; last: DOMRect; want: number; h: number; top: number }[];

    // 2) Stack downwards without overlaps…
    let floor = -Infinity;
    items.forEach((it) => {
      it.top = Math.max(it.want, floor);
      floor = it.top + it.h + GAP_Y;
    });
    // 3) …then pull the stack back up where there is room above (keeps notes close to their lines).
    for (let k = items.length - 2; k >= 0; k--) {
      const next = items[k + 1];
      const it = items[k];
      const ceil = next.top - GAP_Y - it.h;
      if (it.top > ceil) it.top = Math.max(-8, ceil);
    }
    for (let k = 1; k < items.length; k++) {
      const prev = items[k - 1];
      items[k].top = Math.max(items[k].top, prev.top + prev.h + GAP_Y);
    }

    const out: Layout = { tops: {}, paths: {}, leaders: {}, full: {}, dots: {}, h: 0, w: r.width };
    let bottom = 0;
    items.forEach((it) => {
      const tx = it.last.right - r.left + 1;
      const ty = it.last.bottom - r.top - 0.5;
      const nx = m.left - r.left - 8;
      const ny = m.top - r.top + it.top + 10;
      const gx = colRight + 14;
      const mid = gx + (nx - gx) * 0.55;
      const c = `C ${mid.toFixed(1)} ${ty.toFixed(1)}, ${mid.toFixed(1)} ${ny.toFixed(1)}, ${nx.toFixed(1)} ${ny.toFixed(1)}`;
      out.tops[it.id] = it.top;
      out.leaders[it.id] = `M ${tx.toFixed(1)} ${ty.toFixed(1)} H ${gx.toFixed(1)}`;
      out.paths[it.id] = `M ${gx.toFixed(1)} ${ty.toFixed(1)} ${c}`;
      out.full[it.id] = `M ${tx.toFixed(1)} ${ty.toFixed(1)} H ${gx.toFixed(1)} ${c}`;
      out.dots[it.id] = [nx, ny];
      bottom = Math.max(bottom, m.top - r.top + it.top + it.h);
    });
    out.h = Math.max((gridRef.current?.getBoundingClientRect().bottom ?? r.bottom) - r.top, bottom) + 48;
    setLayout(out);
  }, [wide]);

  useLayoutEffect(() => {
    measure();
  }, [measure, loaded, lang]);

  // Re-measure once the outgoing note text of a language swap has left.
  useEffect(() => {
    const t = window.setTimeout(measure, 420);
    return () => window.clearTimeout(t);
  }, [lang, measure]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ro = new ResizeObserver(() => measure());
    ro.observe(root);
    document.fonts?.ready.then(() => measure());
    return () => ro.disconnect();
  }, [measure]);

  useEffect(() => {
    const t = window.setTimeout(() => setReady(true), loaded ? 60 : 1800);
    return () => window.clearTimeout(t);
  }, [loaded]);

  // Ambient "reading" loop: a spotlight walks the terms one by one.
  const looping = ready && loaded && inView && pageVisible && !reduce && !pointerIn && !hot && !tip;
  useEffect(() => {
    if (!looping) {
      setSpot(null);
      return;
    }
    let n = 0;
    const step = () => {
      const id = NOTE_IDS[n % NOTE_IDS.length];
      setSpot({ id, n });
      n += 1;
    };
    // Let the intro finish before the first pass.
    const first = window.setTimeout(step, 900);
    const iv = window.setInterval(step, SPOT_MS);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(iv);
    };
  }, [looping]);

  // Tooltip: above the word (below if there is no room), clamped inside the page.
  const showTip = (id: string) => {
    const el = termRefs.current[id];
    const root = rootRef.current;
    if (!el || !root) return;
    const r = root.getBoundingClientRect();
    const rects = el.getClientRects();
    const box = rects[0] ?? el.getBoundingClientRect();
    const half = Math.min(140, (r.width - 24) / 2);
    const x = Math.min(Math.max(box.left + box.width / 2 - r.left, half + 12), r.width - half - 12);
    const below = box.top - r.top < 120;
    const y = below ? box.bottom - r.top + 8 : box.top - r.top - 8;
    if (tipShown.current.id !== id) tipShown.current = { id, at: Date.now() };
    setTip({ id, x, y, below });
  };
  const hideTip = () => {
    tipShown.current = { id: '', at: 0 };
    setTip(null);
  };

  useEffect(() => {
    if (!tip) return;
    const close = (e: PointerEvent) => {
      if (!(e.target as HTMLElement).closest?.('.ann-term')) hideTip();
    };
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && hideTip();
    document.addEventListener('pointerdown', close);
    document.addEventListener('keydown', esc);
    window.addEventListener('scroll', hideTip, { passive: true });
    return () => {
      document.removeEventListener('pointerdown', close);
      document.removeEventListener('keydown', esc);
      window.removeEventListener('scroll', hideTip);
    };
  }, [tip]);

  let sweepIndex = 0;
  // Plain render helper (not a component) so hover re-renders never remount a button mid-click.
  const term = (id: string, label: string) => {
    const n = NOTE_IDS.indexOf(id as (typeof NOTE_IDS)[number]) + 1;
    const delay = sweepIndex++ * 150;
    const isSpot = spot?.id === id;
    return (
      <React.Fragment key={`${id}-${label}`}>
        <button
          type="button"
          ref={(el) => {
            termRefs.current[id] = el;
          }}
          onPointerEnter={(e) => {
            if (e.pointerType === 'mouse') {
              setHot(id);
              showTip(id);
            }
          }}
          onPointerLeave={(e) => {
            if (e.pointerType === 'mouse') {
              setHot(null);
              hideTip();
            }
          }}
          onPointerDown={(e) => {
            if (e.pointerType !== 'mouse') lastTouch.current = Date.now();
          }}
          onFocus={() => {
            setHot(id);
            showTip(id);
          }}
          onBlur={() => {
            setHot(null);
            hideTip();
          }}
          onClick={() => {
            // Touch: first tap shows the tooltip, a second tap on the same term opens the entry.
            const now = Date.now();
            const touch = now - lastTouch.current < 800;
            const tipAlreadyOpen = tipShown.current.id === id && now - tipShown.current.at > 450;
            if (touch && !tipAlreadyOpen) {
              setHot(id);
              showTip(id);
              return;
            }
            hideTip();
            onOpenTerm(id);
          }}
          aria-describedby={tip?.id === id ? 'ann-tip' : undefined}
          aria-label={terms[id] ? `${label}: ${shortId(terms[id])}. Open entry` : `${label}. Open entry`}
          className={`ann-term ${id === RED_PENCIL_ID ? 'is-red' : ''} ${hot === id ? 'is-hot' : ''} ${isSpot ? 'is-spot' : ''}`}
          style={{ '--d': `${delay}ms` } as React.CSSProperties}
        >
          {isSpot && <span key={spot!.n} className="ann-spot" aria-hidden="true" />}
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
          {term('whereas', 'WHEREAS')}, the Seller agrees to fabricate and deliver industrial machinery {term('pursuant-to', 'pursuant to')}{' '}
          the technical specifications set out in Schedule 1;
        </>
      ),
    },
    {
      no: 'Cl. 14.1',
      body: (
        <>
          NOW THEREFORE, the Parties {term('hereby', 'hereby')} agree that the Seller {term('shall', 'shall')} deliver the Goods without
          delay.
        </>
      ),
    },
    {
      no: 'Cl. 14.2',
      body: (
        <>
          {term('notwithstanding', 'Notwithstanding')} any contrary term, any failure to deliver shall constitute a material{' '}
          {term('breach', 'breach')}, and the Seller shall provide a full {term('indemnity', 'indemnity')} for any direct{' '}
          {term('liability', 'liability')} arising therefrom.
        </>
      ),
    },
  ];

  const noteText = (id: string) => {
    const t = terms[id];
    if (!t) return '…';
    return lang === 'ID' ? shortId(t) : shortEn(t);
  };

  const lineStart = 1100;
  const noteStart = 1400;
  const tipTerm = tip ? terms[tip.id] : undefined;

  return (
    <div
      ref={pageRef}
      className={`paper ann-page ${ready ? 'is-ready' : ''}`}
      onPointerEnter={(e) => e.pointerType === 'mouse' && setPointerIn(true)}
      onPointerLeave={(e) => e.pointerType === 'mouse' && setPointerIn(false)}
    >
      {/* Running head */}
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 px-5 sm:px-8 lg:px-10 pt-5 pb-4 border-b border-line">
        <p className="font-legal smallcaps text-[15px] text-muted min-w-0 truncate">Master Purchase &amp; Indemnity Agreement</p>
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
      <div
        ref={rootRef}
        className="relative px-5 sm:px-8 lg:px-10 pt-8 lg:pt-12 pb-8 lg:pb-12"
        style={wide && layout.h ? { minHeight: layout.h } : undefined}
      >
        {wide && (
          <svg className="ann-lines" width={layout.w} height={layout.h} aria-hidden="true">
            {NOTE_IDS.map((id, i) =>
              layout.paths[id] ? (
                <g key={id} className={hot === id ? 'is-hot' : spot?.id === id ? 'is-spot' : ''}>
                  <path className="leader" d={layout.leaders[id]} style={{ '--d': `${lineStart + i * 120}ms` } as React.CSSProperties} />
                  <path className="curve" d={layout.paths[id]} pathLength={1} style={{ '--d': `${lineStart + i * 120}ms` } as React.CSSProperties} />
                  <circle cx={layout.dots[id][0]} cy={layout.dots[id][1]} r={2} style={{ '--d': `${noteStart + i * 120}ms` } as React.CSSProperties} />
                  {spot?.id === id && <path key={spot.n} className="pulse" d={layout.full[id]} pathLength={1} />}
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
                style={{ top: layout.tops[id] ?? 0, '--d': `${noteStart + i * 120}ms` } as React.CSSProperties}
              >
                {spot?.id === id && <span key={spot.n} className="ann-note-glow" aria-hidden="true" />}
                <span className="ann-note-term">{terms[id]?.term ?? id}</span>
                <SwapText className="ann-note-body" text={noteText(id)} />
              </button>
            ))}
          </div>
        </div>

        {/* Narrow screens: marginalia become numbered footnotes */}
        <ol className="lg:hidden mt-6 pt-4 border-t border-line space-y-2">
          {NOTE_IDS.map((id, i) => (
            <li key={id}>
              <button
                type="button"
                onClick={() => onOpenTerm(id)}
                className={`ann-foot w-full text-left flex gap-3 items-baseline ${spot?.id === id ? 'is-spot' : ''}`}
              >
                <span className="text-[11px] font-semibold text-link w-3 shrink-0">{i + 1}</span>
                <span className="text-[14px] leading-snug min-w-0">
                  <span className="font-legal font-semibold text-ink">{terms[id]?.term ?? id}</span>
                  <span className="text-muted"> — </span>
                  <SwapText className={`font-legal italic text-link ${lang === 'EN' ? 'line-clamp-2' : ''}`} text={noteText(id)} />
                </span>
              </button>
            </li>
          ))}
        </ol>

        {/* Hover / focus / tap tooltip */}
        {tip && (
          <div
            id="ann-tip"
            role="tooltip"
            className={`ann-tip ${tip.below ? 'is-below' : ''}`}
            style={{ left: tip.x, top: tip.y }}
          >
            <div className="flex flex-wrap items-baseline gap-x-2 min-w-0">
              <span className="font-legal font-semibold text-[15px] text-ink">{tipTerm?.term ?? tip.id}</span>
              {tipTerm?.pronunciation && <span className="text-[12px] text-muted shrink-0">{tipTerm.pronunciation}</span>}
            </div>
            {tipTerm && (
              <>
                <p className="mt-1 text-[13px] leading-snug">
                  <span className="ann-tip-badge">ID</span>
                  <span className="font-legal italic text-link">{shortId(tipTerm)}</span>
                </p>
                <p className="mt-1 text-[12.5px] leading-snug text-ink-2">{firstSentence(shortEn(tipTerm))}</p>
              </>
            )}
            <p className="mt-1.5 text-[11px] text-muted">
              <span className="hidden lg:inline">Click</span>
              <span className="lg:hidden">Tap again</span> for the full entry
            </p>
          </div>
        )}
      </div>

      {/* Foot of the page: EN → ID rendering, typed */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-6 px-5 sm:px-8 lg:px-10 py-4 border-t border-line">
        <Typewriter running={ready && inView && pageVisible} />
        <p className="text-xs text-muted shrink-0">Tap a term for the full entry</p>
      </div>
    </div>
  );
};
