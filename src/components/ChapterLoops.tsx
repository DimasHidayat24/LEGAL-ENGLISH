import React, { useEffect, useMemo, useState } from 'react';
import type { LegalTerm } from '../types';
import { Copy, Check } from 'lucide-react';
import { useInView, useLoopClock, usePageVisible, usePrefersReducedMotion } from './AnnotatedPage';

/**
 * Looping micro-animations for the four method chapters (§1–§4).
 * Each loop runs only while its card is on screen and the tab is visible;
 * reduced motion renders the final, static state.
 */

const useLoop = (threshold = 0.35) => {
  const reduce = usePrefersReducedMotion();
  const visible = usePageVisible();
  const [ref, inView] = useInView<HTMLDivElement>(threshold);
  const running = inView && visible && !reduce;
  const t = useLoopClock(running, 50);
  return { ref, t, reduce, running };
};

/* ------------------------------ §1 Read ------------------------------ */
export const ReadLoop: React.FC<{ meta: string; no: string; text: string; phrases: string[] }> = ({ meta, no, text, phrases }) => {
  const { ref, t, reduce } = useLoop();
  const parts = useMemo(() => {
    const re = new RegExp(`(${phrases.map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'g');
    return text.split(re);
  }, [text, phrases]);
  const count = parts.filter((p) => phrases.includes(p)).length;
  const STEP = 1300;
  const cycle = (count + 1) * STEP; // one beat of rest with everything marked
  const pos = Math.floor((t % cycle) / STEP); // 0..count
  let k = -1;
  return (
    <div ref={ref} className="paper-card p-5 text-left">
      <div className="flex items-center justify-between gap-3 pb-3 mb-3 border-b border-line">
        <span className="text-xs text-muted truncate">{meta}</span>
        <span className="text-xs text-muted shrink-0">{no}</span>
      </div>
      <p className="font-legal text-[15px] leading-[1.75] text-ink">
        {parts.map((part, i) => {
          if (!phrases.includes(part)) return <React.Fragment key={i}>{part}</React.Fragment>;
          k += 1;
          const state = reduce || k < pos ? 'done' : k === pos ? 'now' : 'todo';
          return (
            <span key={`${i}-${state === 'now' ? Math.floor(t / cycle) : ''}`} className={`ch-mark is-${state}`}>
              {part}
            </span>
          );
        })}
      </p>
    </div>
  );
};

/* --------------------------- §2 Understand --------------------------- */
const shortId = (t: LegalTerm) => t.indonesianMeaning.split('/')[0].replace(/\(.*?\)/g, '').trim();

export const UnderstandLoop: React.FC<{ terms: LegalTerm[] }> = ({ terms }) => {
  const { ref, t, reduce, running } = useLoop();
  const STEP = 4200;
  const i = terms.length ? Math.floor(t / STEP) % terms.length : 0;
  const lap = Math.floor(t / STEP);
  const term = terms[i];
  if (!term) return <div ref={ref} className="paper-card p-5 h-[180px]"><div className="h-full rounded-lg bg-surface-3 animate-pulse" /></div>;
  return (
    <div ref={ref} className="paper-card p-5 text-left">
      <div className={`ch-flow ${running ? '' : 'is-paused'}`} key={reduce ? 'static' : `${running}-${lap}`}>
        <span className="ch-chip font-legal">{term.term}</span>
        <span className="ch-wire" aria-hidden="true">
          {!reduce && <span className="ch-wire-pulse" />}
        </span>
        <span className="ch-target">
          <span className="ch-target-badge">ID</span>
          <span className="font-legal italic text-link">{shortId(term)}</span>
        </span>
      </div>
      <p key={`d${running}-${lap}`} className={`${running ? '' : 'is-paused'} ch-desc mt-4 text-sm text-muted leading-relaxed line-clamp-2`}>
        {term.indonesianLegalConcept}
      </p>
      <div className="mt-3 flex gap-1.5" aria-hidden="true">
        {terms.map((x, j) => (
          <span key={x.id} className={`ch-dot ${j === i ? 'on' : ''}`} />
        ))}
      </div>
    </div>
  );
};

/* -------------------------- §3 Deconstruct -------------------------- */
const VERBS = [
  { word: 'shall', fn: 'Imposes a duty', id: 'wajib', strength: 0.85 },
  { word: 'may', fn: 'Grants a discretion', id: 'dapat / berhak', strength: 0.3 },
  { word: 'shall not', fn: 'Prohibits', id: 'dilarang', strength: 1 },
];
const RANKED = [...VERBS].sort((a, b) => b.strength - a.strength).map((v) => v.word);
const ROW = 56;

export const DeconstructLoop: React.FC = () => {
  const { ref, t, reduce } = useLoop();
  const ranked = reduce || t % 6000 >= 2600;
  return (
    <div ref={ref} className="paper-card text-left overflow-hidden">
      <div className="flex items-center justify-between px-5 pt-3.5 pb-2.5 border-b border-line text-xs text-muted">
        <span key={String(ranked)} className="ch-fade">{ranked ? 'Ranked by binding strength' : 'As drafted'}</span>
        <span>Binding</span>
      </div>
      <div className="relative" style={{ height: ROW * VERBS.length }}>
        {[1, 2].map((k) => (
          <span key={k} className="absolute left-0 right-0 border-t border-line" style={{ top: k * ROW }} aria-hidden="true" />
        ))}
        {VERBS.map((v, i) => {
          const pos = ranked ? RANKED.indexOf(v.word) : i;
          return (
            <div
              key={v.word}
              className="ch-row grid grid-cols-[88px_1fr_72px] items-center gap-3 px-5 text-sm"
              style={{ height: ROW, transform: `translateY(${pos * ROW}px)` }}
            >
              <span className="font-legal font-semibold text-ink text-base">{v.word}</span>
              <span className="min-w-0">
                <span className="block text-ink-2 truncate">{v.fn}</span>
                <span className="block text-muted text-xs">{v.id}</span>
              </span>
              <span className="ch-bar" aria-label={`Binding strength ${Math.round(v.strength * 100)}%`}>
                <span style={{ transform: `scaleX(${ranked ? v.strength : 0.04})` }} />
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ------------------------------ §4 Apply ------------------------------ */
const BLANKS = [
  { ph: '[Party A]', val: 'the Buyer' },
  { ph: '[action]', val: 'terminate the Agreement' },
  { ph: '[Law/Contract]', val: 'Clause 14.2' },
  { ph: '[Facts]', val: 'the Seller failed to deliver the Goods' },
];
const CH = 42; // ms per char
const PAUSE = 380;
const fillSpans = BLANKS.map((b) => b.val.length * CH + PAUSE);
const FILL_END = 600 + fillSpans.reduce((a, b) => a + b, 0);
const APPLY_CYCLE = FILL_END + 3000;

export const ApplyLoop: React.FC = () => {
  const { ref, t, reduce } = useLoop();
  const lt = reduce ? FILL_END + 1000 : t % APPLY_CYCLE;
  // Which blank is being typed, and how much.
  let acc = 600;
  const typed = BLANKS.map((b, i) => {
    const start = acc;
    acc += fillSpans[i];
    if (lt < start) return -1;
    return Math.min(b.val.length, Math.floor((lt - start) / CH));
  });
  const activeIdx = typed.findIndex((n, i) => n >= 0 && n < BLANKS[i].val.length);
  const done = lt >= FILL_END;
  const copied = !reduce && lt >= FILL_END + 900 && lt < FILL_END + 2400;
  const fading = !reduce && lt >= APPLY_CYCLE - 400;

  const blank = (i: number) => {
    const n = typed[i];
    const b = BLANKS[i];
    if (n <= 0 && activeIdx !== i) return <span className="ch-blank">{b.ph}</span>;
    return (
      <span className={`ch-filled ${activeIdx === i ? 'is-typing' : ''}`}>
        {b.val.slice(0, Math.max(0, n))}
        {activeIdx === i && <span className="tw-caret" />}
      </span>
    );
  };

  return (
    <div ref={ref} className="paper-card p-5 text-left">
      <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-line">
        <span className="text-xs text-muted">Legal memorandum · Question presented</span>
        <span className={`ch-copy ${done ? 'is-ready' : ''} ${copied ? 'is-copied' : ''}`} aria-hidden="true">
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? 'Copied' : 'Copy'}
        </span>
      </div>
      <p className={`font-legal text-[15px] leading-[1.75] text-ink min-h-[78px] transition-opacity duration-300 ${fading ? 'opacity-40' : ''}`}>
        Whether {blank(0)} has a lawful right to {blank(1)} under {blank(2)} where {blank(3)}?
      </p>
      <p className="mt-3 text-xs text-muted">Apakah [Pihak A] memiliki hak sah untuk [tindakan]…</p>
    </div>
  );
};
