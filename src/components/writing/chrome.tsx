import React, { useEffect, useRef, useState } from 'react';

/* Shared word-processor chrome for the Writing Lab and the Document Reader. */

export type ZoomSel = 'fit' | 0.75 | 1 | 1.25;
export const ZOOMS: { v: ZoomSel; label: string }[] = [
  { v: 'fit', label: 'Fit' }, { v: 0.75, label: '75%' }, { v: 1, label: '100%' }, { v: 1.25, label: '125%' },
];
export const COMMENTS_W = 300;
export const COMMENTS_GAP = 28;

export const reducedMotion = () =>
  typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/** Small dropdown menu (File / View). */
export const Menu: React.FC<{ label: string; children: (close: () => void) => React.ReactNode }> = ({ label, children }) => {
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

export const DocIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 32" className={className} aria-hidden="true">
    <path d="M3 0h12l9 9v20a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V3a3 3 0 0 1 3-3z" fill="var(--wd-doc-icon)" />
    <path d="M15 0l9 9h-6a3 3 0 0 1-3-3z" fill="#fff" fillOpacity=".45" />
    <path d="M6 15h12M6 19h12M6 23h8" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

/** Resolves once the document face (Tinos) is loaded, so pagination measures the real glyphs. */
export function useDocFontsReady(): boolean {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let alive = true;
    const fonts = (document as Document & { fonts?: FontFaceSet }).fonts;
    if (!fonts) { setReady(true); return; }
    Promise.all([
      fonts.load('16px Tinos'), fonts.load('bold 16px Tinos'), fonts.load('italic 16px Tinos'),
    ]).catch(() => undefined).then(() => fonts.ready).then(() => { if (alive) setReady(true); });
    return () => { alive = false; };
  }, []);
  return ready;
}

/**
 * Google-Docs style comment stacking: the active card sits level with its anchor,
 * cards below are pushed down and cards above pushed up so nothing overlaps.
 */
export function stackComments(anchors: number[], heights: number[], active: number, gap = 10): number[] {
  const n = anchors.length;
  const top = anchors.slice();
  const a = active >= 0 && active < n ? active : -1;
  if (a >= 0) {
    for (let i = a + 1; i < n; i++) top[i] = Math.max(anchors[i], top[i - 1] + heights[i - 1] + gap);
    for (let i = a - 1; i >= 0; i--) top[i] = Math.min(anchors[i], top[i + 1] - heights[i] - gap);
    if (top[0] < 0) {
      top[0] = 0;
      for (let i = 1; i < n; i++) top[i] = Math.max(top[i], top[i - 1] + heights[i - 1] + gap);
    }
  } else {
    for (let i = 1; i < n; i++) top[i] = Math.max(anchors[i], top[i - 1] + heights[i - 1] + gap);
  }
  return top;
}

/** Print only the `.wd-print-root` pages (see the print rules in index.css). */
export function printDoc() {
  const root = document.documentElement;
  root.classList.add('wd-printing');
  const done = () => { root.classList.remove('wd-printing'); window.removeEventListener('afterprint', done); };
  window.addEventListener('afterprint', done);
  window.print();
  window.setTimeout(done, 1500);
}
