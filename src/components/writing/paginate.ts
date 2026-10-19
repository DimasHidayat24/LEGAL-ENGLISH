import { CONTENT_H, KEEP_WITH_NEXT, SPLITTABLE, type Block } from './docModel';

export interface Part {
  b: Block;
  from: number;
  to: number;
  /** Continues on the next page */
  head: boolean;
  /** Continued from the previous page */
  tail: boolean;
}

interface Placed { part: Part; h: number; padT: number }

/** Line starts (char offsets into block.text) of a rendered block, or null if it can't be measured reliably. */
function measureLines(el: HTMLElement, b: Block, scale: number): { starts: number[]; lh: number } | null {
  const textEl = el.querySelector<HTMLElement>('[data-text]');
  if (!textEl) return null;
  const lh = parseFloat(getComputedStyle(textEl).lineHeight);
  if (!lh || Number.isNaN(lh)) return null;
  const nodes: Text[] = [];
  const walker = document.createTreeWalker(textEl, NodeFilter.SHOW_TEXT);
  let total = 0;
  while (walker.nextNode()) {
    const t = walker.currentNode as Text;
    nodes.push(t);
    total += t.data.length;
  }
  if (total !== b.text.length) return null;
  const top0 = textEl.getBoundingClientRect().top;
  const range = document.createRange();
  const starts: number[] = [];
  let lastLine = -1;
  let ni = 0;
  let base = 0;
  const re = /\S+/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(b.text))) {
    const at = m.index;
    while (ni < nodes.length && at >= base + nodes[ni].data.length) { base += nodes[ni].data.length; ni++; }
    if (ni >= nodes.length) break;
    const off = at - base;
    range.setStart(nodes[ni], off);
    range.setEnd(nodes[ni], Math.min(off + 1, nodes[ni].data.length));
    const r = range.getClientRects()[0] ?? range.getBoundingClientRect();
    const line = Math.floor(((r.top - top0) / scale + lh * 0.35) / lh);
    if (line > lastLine) { starts.push(at); lastLine = line; }
  }
  const expected = Math.round(textEl.getBoundingClientRect().height / scale / lh);
  if (starts.length !== expected || starts.length === 0) return null;
  starts[0] = 0;
  return { starts, lh };
}

/**
 * Lay the blocks onto A4 pages. Paragraphs split between lines (never mid-line), keeping at
 * least two lines on each side; headings stay with the block that follows them.
 */
export function paginate(root: HTMLElement, blocks: Block[], firstPageReserve: number): Part[][] {
  const pages: Placed[][] = [[]];
  let used = 0;
  const SLACK = 3;
  let avail = CONTENT_H - SLACK - firstPageReserve;
  const cur = () => pages[pages.length - 1];
  const scale = root.getBoundingClientRect().width / root.offsetWidth || 1;

  const newPage = () => {
    // carry trailing keep-with-next blocks
    const page = cur();
    const carried: Placed[] = [];
    while (page.length > 1) {
      const last = page[page.length - 1];
      if (KEEP_WITH_NEXT.includes(last.part.b.kind) && !last.part.head && !last.part.tail) carried.unshift(page.pop()!);
      else break;
    }
    pages.push([]);
    used = 0;
    avail = CONTENT_H - SLACK;
    carried.forEach((c, i) => {
      const h = i === 0 ? c.h - c.padT : c.h;
      cur().push({ ...c });
      used += h;
    });
  };

  for (const b of blocks) {
    const el = root.querySelector<HTMLElement>(`[data-mblock="${b.id}"]`);
    if (!el) continue;
    if (b.kind === 'gap' && cur().length === 0) continue;
    const cs = getComputedStyle(el);
    const padT = parseFloat(cs.paddingTop) || 0;
    const padB = parseFloat(cs.paddingBottom) || 0;
    const H = el.getBoundingClientRect().height / scale;
    const whole: Part = { b, from: 0, to: b.text.length, head: false, tail: false };
    const need = () => H - (cur().length === 0 ? padT : 0);

    if (used + need() <= avail + 0.5) {
      used += need();
      cur().push({ part: whole, h: H, padT });
      continue;
    }

    const lines = SPLITTABLE.includes(b.kind) && !b.hasFields ? measureLines(el, b, scale) : null;
    if (lines && lines.starts.length >= 4) {
      const { starts, lh } = lines;
      const n = starts.length;
      let a = 0;
      let guard = 0;
      while (a < n && guard++ < 50) {
        const pt = a === 0 && cur().length > 0 ? padT : 0;
        const room = avail - used - pt;
        const left = n - a;
        const tailH = left * lh + padB;
        if (tailH <= room + 0.5) {
          cur().push({ part: { b, from: starts[a], to: b.text.length, head: false, tail: a > 0 }, h: pt + tailH, padT: pt });
          used += pt + tailH;
          a = n;
          break;
        }
        let k = Math.floor((room + 0.5) / lh);
        if (k >= left) k = left - 1;
        if (left - k < 2) k = left - 2;
        if (k < 2) {
          if (cur().length === 0) {
            k = Math.max(1, Math.min(left - 1, Math.floor(avail / lh)));
          } else {
            newPage();
            continue;
          }
        }
        const to = starts[a + k];
        cur().push({ part: { b, from: starts[a], to, head: true, tail: a > 0 }, h: pt + k * lh, padT: pt });
        pages.push([]);
        used = 0;
        avail = CONTENT_H - SLACK;
        a += k;
      }
      continue;
    }

    if (cur().length > 0) newPage();
    const h = H - padT;
    used += h;
    cur().push({ part: whole, h: H, padT });
  }
  return pages.filter((p) => p.length > 0).map((p) => p.map((x) => x.part));
}
