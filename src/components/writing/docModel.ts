import type { WritingModule, WritingSection } from '../../types';

/* ------------------------------------------------------------------ */
/* Page geometry (CSS px at 96 dpi): A4 = 210 × 297 mm                 */
/* ------------------------------------------------------------------ */
export const PAGE_W = 794;
export const PAGE_H = 1123;
export const MARGIN = 96; // 1 inch
export const CONTENT_W = PAGE_W - MARGIN * 2;
export const CONTENT_H = PAGE_H - MARGIN * 2;

export type Mode = 'example' | 'template';

export interface DocConfig {
  fileName: string;
  /** Body line spacing (multiple). */
  lineHeight: number;
  /** Paragraph convention: first-line indent (memo/court) or block with space after (letters/contracts). */
  para: 'indent' | 'block';
  letterhead?: boolean;
  /** Running header on page 1 (centred) */
  firstHeader?: string;
  /** Running header on pages 2+ : [left, right] */
  header?: [string, string];
  footer: (page: number, total: number) => string;
}

export const DOC_CONFIG: Record<string, DocConfig> = {
  'module-legal-memo': {
    fileName: 'Memo_PT-Nusantara_Termination.docx',
    lineHeight: 1.15,
    para: 'indent',
    firstHeader: 'PRIVILEGED & CONFIDENTIAL — ATTORNEY WORK PRODUCT',
    header: ['Memorandum — Matter No. 2026-117', 'Privileged & Confidential'],
    footer: (p, n) => `Page ${p} of ${n}`,
  },
  'module-legal-opinion': {
    fileName: 'Legal-Opinion_PT-Surya-Energi-Lestari.docx',
    lineHeight: 1.15,
    para: 'block',
    letterhead: true,
    header: ['Meridian Infrastructure Partners Fund II LP — 15 September 2026', 'Strictly Private & Confidential'],
    footer: (p, n) => `Page ${p} of ${n}`,
  },
  'module-demand-letter': {
    fileName: 'Somasi-I_PT-Brantas-Konstruksi-Mandiri.docx',
    lineHeight: 1.15,
    para: 'block',
    letterhead: true,
    header: ['PT Brantas Konstruksi Mandiri — 14 August 2026', 'No. 031/NK-SOM/VIII/2026'],
    footer: (p, n) => `Page ${p} of ${n}`,
  },
  'module-contract-clauses': {
    fileName: 'Supply-Agreement_Clauses-14-21.docx',
    lineHeight: 1.15,
    para: 'block',
    firstHeader: 'Supply Agreement — Execution Version (extract: Clauses 14–21)',
    header: ['Supply Agreement', 'Execution Version'],
    footer: (p, n) => `Page ${p} of ${n}`,
  },
  'module-gugatan': {
    fileName: 'Gugatan_Wanprestasi_PN-Malang.docx',
    lineHeight: 1.5,
    para: 'indent',
    footer: (p, n) => `Page ${p} of ${n}`,
  },
};

export const docConfigFor = (m: WritingModule): DocConfig =>
  DOC_CONFIG[m.id] ?? {
    fileName: `${m.title.replace(/\s+/g, '_')}.docx`,
    lineHeight: 1.15,
    para: 'block',
    footer: (p: number, n: number) => `Page ${p} of ${n}`,
  };

/* ------------------------------------------------------------------ */
/* Blocks                                                              */
/* ------------------------------------------------------------------ */
export type BlockKind =
  | 'title' // "# " centred bold caps
  | 'heading' // "## " bold
  | 'memo' // TO/FROM/... rows
  | 'kv' // Re: row in a court letter
  | 'lh1' | 'lh2' | 'lh3' // letterhead lines
  | 'right'
  | 'p'
  | 'num' // "1. That ..." numbered paragraph (hanging)
  | 'clause' // "14.1 Either Party ..." sub-clause (hanging)
  | 'item' // ">(i) ..." indented list item (hanging)
  | 'indent' // ">" without a label
  | 'label' // "Primary:" / "Alternative:"
  | 'sig' // "/s/ Name"
  | 'party' // execution block party line
  | 'cc'
  | 'addr' // address / reference lines in a letter or court caption (single-spaced)
  | 'close' // "Yours faithfully," etc.
  | 'gap';

export interface Hit { start: number; end: number; n: number }

export interface Block {
  id: string;
  sec: number;
  /** index of this block inside its section (stable field keys) */
  bi: number;
  kind: BlockKind;
  /** Numbering / row label rendered in a hanging column (not part of `text`). */
  label?: string;
  text: string;
  hits: Hit[];
  /** First block of its section (comment anchor fallback). */
  first: boolean;
  /** Field tokens can be split across pages only if none present */
  hasFields: boolean;
  /** Extra space after (end of a run of address lines) */
  spaceAfter?: boolean;
}

const MEMO_ROW = /^(TO|FROM|CC|DATE|RE|SUBJECT):\s+(.*)$/;
const KV_ROW = /^(Re|Attachment):\s+(.*)$/;
const HEAD_NUM = /^([IVX]+\.|[A-Z]\.|\d{1,2}\.)\s+(.*)$/;
const NUM = /^(\d{1,2}\.)\s+(.*)$/;
const CLAUSE = /^(\d{1,2}\.\d{1,2})\s+(.*)$/;
const ITEM = /^(\((?:[ivx]+|[a-z]|\d+)\)|\d{1,2}\.)\s*(.*)$/;
const LABEL_LINE = /^(Primary|Alternative|In the alternative|Subsidiary)(\s*\([^)]*\))?\s*:\s*$/;
const CLOSE = /^(Yours faithfully,|Yours sincerely,|Very truly yours,|Respectfully submitted,|Hormat kami,)$/;
const PARTY = /^(.+?) — Name: (.+?) — Title: (.+)$/;

export const sectionText = (s: WritingSection, mode: Mode) =>
  mode === 'template' && s.templateText ? s.templateText : s.sampleText;

const FIELD_RE = /\[[^\]]*\]/g;

function hitsFor(text: string, notes: { quote: string }[], offset: number): Hit[] {
  const out: Hit[] = [];
  notes.forEach((n, ni) => {
    const at = text.indexOf(n.quote);
    if (at >= 0) out.push({ start: at - offset, end: at - offset + n.quote.length, n: ni + 1 });
  });
  out.sort((a, b) => a.start - b.start);
  for (let i = out.length - 1; i > 0; i--) if (out[i].start < out[i - 1].end) out.splice(i, 1);
  return out
    .map((h) => ({ ...h, start: Math.max(0, h.start), end: h.end }))
    .filter((h) => h.end > 0);
}

export function buildBlocks(module: WritingModule, mode: Mode): Block[] {
  const cfg = docConfigFor(module);
  const blocks: Block[] = [];
  module.sections.forEach((s, si) => {
    const notes = mode === 'example' ? s.notes ?? [] : [];
    const lines = sectionText(s, mode).split('\n');
    let lhCount = 0;
    let bi = 0;
    lines.forEach((raw) => {
      let kind: BlockKind = 'p';
      let body = raw;
      let label: string | undefined;
      let labelLen = 0; // chars of body that the label consumes

      if (!raw.trim()) kind = 'gap';
      else if (raw.startsWith('# ')) { kind = 'title'; body = raw.slice(2); }
      else if (raw.startsWith('## ')) {
        kind = 'heading'; body = raw.slice(3);
        const m = body.match(HEAD_NUM);
        if (m) { label = m[1]; labelLen = body.length - m[2].length; }
      }
      else if (raw.startsWith('^')) {
        body = raw.slice(1);
        if (cfg.letterhead && si === 0 && lhCount < 3) { kind = (['lh1', 'lh2', 'lh3'] as const)[lhCount++]; }
        else kind = 'right';
      } else if (raw.startsWith('>')) {
        body = raw.slice(1);
        const m = body.match(ITEM);
        if (m) { kind = 'item'; label = m[1]; labelLen = body.length - m[2].length; }
        else kind = 'indent';
      } else if (raw.startsWith('/s/ ')) kind = 'sig';
      else if (/^cc:/.test(raw) || /^Tembusan:/.test(raw)) kind = 'cc';
      else if (CLOSE.test(raw.trim())) kind = 'close';
      else if (PARTY.test(raw)) kind = 'party';
      else if (LABEL_LINE.test(raw)) kind = 'label';
      else if (MEMO_ROW.test(raw)) {
        const m = raw.match(MEMO_ROW)!;
        kind = 'memo'; label = `${m[1]}:`; labelLen = raw.length - m[2].length;
      } else if (KV_ROW.test(raw) && module.id === 'module-gugatan') {
        const m = raw.match(KV_ROW)!;
        kind = 'kv'; label = `${m[1]}:`; labelLen = raw.length - m[2].length;
      } else if (CLAUSE.test(raw)) {
        const m = raw.match(CLAUSE)!;
        kind = 'clause'; label = m[1]; labelLen = raw.length - m[2].length;
      } else if (NUM.test(raw)) {
        const m = raw.match(NUM)!;
        kind = 'num'; label = m[1]; labelLen = raw.length - m[2].length;
      }

      if (kind === 'p' && si === 0 && (cfg.letterhead || module.id === 'module-gugatan')) kind = 'addr';
      const text = body.slice(labelLen);
      const hits = kind === 'gap' ? [] : hitsFor(body, notes, labelLen);
      blocks.push({
        id: `${module.id}-${si}-${bi}`,
        sec: si,
        bi,
        kind,
        label,
        text,
        hits,
        first: bi === 0,
        hasFields: mode === 'template' && FIELD_RE.test(text),
        spaceAfter: kind === 'addr' && !/^(No\.|Attachments?):/.test(text) && /^(Our ref|Ref\. No\.|BY |Your ref)|\b(19|20)\d{2}$|\[Date\]$|^Re: /.test(text),
      });
      FIELD_RE.lastIndex = 0;
      bi++;
    });
  });
  // drop leading gaps of sections and mark first non-gap
  return blocks;
}

/** Keys of all fields (in order) for a block: `${sec}:${bi}:${k}` */
export const fieldKey = (b: Block, k: number) => `${b.sec}:${b.bi}:${k}`;

/** Split text into plain / field tokens. */
export function tokenize(text: string): { t: string; field: boolean }[] {
  const out: { t: string; field: boolean }[] = [];
  let last = 0;
  text.replace(FIELD_RE, (m, at: number) => {
    if (at > last) out.push({ t: text.slice(last, at), field: false });
    out.push({ t: m, field: true });
    last = at + m.length;
    return m;
  });
  if (last < text.length) out.push({ t: text.slice(last), field: false });
  return out;
}

/** Text of a block with template values filled in (for copy/export). */
export function blockPlain(b: Block, values: Record<string, string>): string {
  let k = 0;
  const body = tokenize(b.text)
    .map((tok) => (tok.field ? values[fieldKey(b, k++)]?.trim() || tok.t : tok.t))
    .join('');
  if (b.kind === 'party') return body.replace(PARTY, '$1\nName: $2\nTitle: $3');
  return b.label ? `${b.label} ${body}` : body;
}

export function docPlain(blocks: Block[], values: Record<string, string>): string {
  const out: string[] = [];
  let prevSec = -1;
  blocks.forEach((b) => {
    if (b.sec !== prevSec && prevSec !== -1) out.push('');
    prevSec = b.sec;
    out.push(b.kind === 'gap' ? '' : blockPlain(b, values));
  });
  return out.join('\n').replace(/\n{3,}/g, '\n\n');
}

export const partyParts = (text: string) => {
  const m = text.match(PARTY);
  return m ? { name: m[1], person: m[2], title: m[3] } : null;
};

/* ------------------------------------------------------------------ */
/* Foreign (Indonesian / Dutch / Latin) terms set in italics           */
/* ------------------------------------------------------------------ */
const FOREIGN_RE = /\b(wanprestasi|somasi|primair|subsidair|ex aequo et bono|uitvoerbaar bij voorraad|dwangsom|sita jaminan|gugatan wanprestasi|gugatan|a quo|obscuur libel)\b/g;

/** Split plain text into runs, marking foreign legal terms for italics (offsets unchanged). */
export function foreignRuns(text: string): { t: string; em: boolean }[] {
  const out: { t: string; em: boolean }[] = [];
  let last = 0;
  text.replace(FOREIGN_RE, (m, _g, at: number) => {
    if (at > last) out.push({ t: text.slice(last, at), em: false });
    out.push({ t: m, em: true });
    last = at + m.length;
    return m;
  });
  if (last < text.length) out.push({ t: text.slice(last), em: false });
  FOREIGN_RE.lastIndex = 0;
  return out;
}

/** Kinds that should stay on the same page as the next block. */
export const KEEP_WITH_NEXT: BlockKind[] = ['title', 'heading', 'label', 'memo', 'kv', 'close', 'lh1', 'lh2'];
/** Kinds that may split across pages line by line. */
export const SPLITTABLE: BlockKind[] = ['p', 'num', 'clause', 'item', 'indent'];

export const wordCount = (s: string) => (s.match(/[A-Za-zÀ-ÿ0-9’'-]+/g) ?? []).length;
