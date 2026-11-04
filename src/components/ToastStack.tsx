/**
 * Toast stack — stacked notifications that fan out into a list on
 * hover, focus, or (on touch screens) tap.
 *
 * Adapted from the Bencho "Toast stack" block
 * (https://bencho.dev/blocks/toast-stack), MIT licensed, by Lorenzo Cabra.
 * Adapted for Lexa: Lexa design tokens (see ToastStack.css), CSS-only
 * motion instead of framer-motion (Lexa's global reduced-motion guard
 * then applies automatically), no demo seed data — the stack starts
 * empty and toasts only come from real user actions — auto-dismiss that
 * pauses while the stack is open, and an optional action button.
 */

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
} from 'react';
import {
  CircleCheck,
  CircleX,
  Info,
  TriangleAlert,
  X,
  type LucideIcon,
} from 'lucide-react';
import './ToastStack.css';

export type ToastKind = 'success' | 'error' | 'warning' | 'info';

export interface ToastInput {
  kind: ToastKind;
  title: string;
  body?: string;
  actionLabel?: string;
  onAction?: () => void;
}

interface ToastItem extends ToastInput {
  id: number;
}

/* Geometry and timing match the Bencho block's defaults. */
const HEIGHT = 56;
const SHOWN = 3;
const PEEK = 14;
const GAP = 10;
const CORNER = 20;
const AUTO_DISMISS_MS = 6000;
/* Fixed open height from the Bencho block: the fanned-out positions are
   laid out on a 3-slot grid, so the open container must stay 3 slots
   tall or the oldest toast lands below the viewport. */
const OPEN_HEIGHT = SHOWN * HEIGHT + 20;
const EXIT_MS = 220;

/* Minimal external store: any component can push a toast without
   prop-drilling through the tab views. */
let nextId = 1;
let toastItems: ToastItem[] = [];
const listeners = new Set<() => void>();

function emit(): void {
  listeners.forEach((listener) => listener());
}

export function pushToast(input: ToastInput): number {
  const id = nextId++;
  toastItems = [...toastItems, { ...input, id }];
  emit();
  return id;
}

export function removeToast(id: number): void {
  toastItems = toastItems.filter((toast) => toast.id !== id);
  emit();
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot(): ToastItem[] {
  return toastItems;
}

const ICONS: Record<ToastKind, LucideIcon> = {
  success: CircleCheck,
  error: CircleX,
  warning: TriangleAlert,
  info: Info,
};

export function ToastStack() {
  const items = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  const [open, setOpen] = useState(false);
  const [leaving, setLeaving] = useState<number[]>([]);
  const [entering, setEntering] = useState<number[]>([]);
  const timers = useRef(new Map<number, ReturnType<typeof setTimeout>>());
  const seen = useRef(new Set<number>());

  /* New toasts start offset and transparent, then settle into place.
     Marking them during render (before commit) avoids a first-paint
     flash at the final position. */
  const freshIds = items
    .map((toast) => toast.id)
    .filter((id) => !seen.current.has(id));
  if (freshIds.length > 0) {
    freshIds.forEach((id) => seen.current.add(id));
    setEntering((xs) => [...xs, ...freshIds]);
  }

  useEffect(() => {
    if (entering.length === 0) return;
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => setEntering([])),
    );
    return () => cancelAnimationFrame(raf);
  }, [entering]);

  function dismiss(id: number): void {
    setLeaving((xs) => (xs.includes(id) ? xs : [...xs, id]));
    setTimeout(() => {
      removeToast(id);
      setLeaving((xs) => xs.filter((x) => x !== id));
    }, EXIT_MS);
  }

  /* Auto-dismiss, paused while the stack is open so a toast never
     vanishes while the user is reading it. */
  useEffect(() => {
    if (open) {
      timers.current.forEach((timer) => clearTimeout(timer));
      timers.current.clear();
      return;
    }
    items.forEach((toast) => {
      if (leaving.includes(toast.id) || timers.current.has(toast.id)) return;
      timers.current.set(
        toast.id,
        setTimeout(() => dismiss(toast.id), AUTO_DISMISS_MS),
      );
    });
    return () => {
      timers.current.forEach((timer) => clearTimeout(timer));
      timers.current.clear();
    };
    // dismiss is intentionally local-only; the effect re-runs on items/open/leaving.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, open, leaving]);

  if (items.length === 0) return null;

  const shown = items.slice(0, SHOWN);
  const rest = items.length - shown.length;
  /* Closed, the stack reads front-first; open, it reads as a list. */
  const stack = open ? shown : [...shown].reverse();

  const stackHeight = open
    ? (shown.length - 1) * (HEIGHT + GAP) + HEIGHT
    : HEIGHT + (shown.length - 1) * PEEK;

  const total = items.length - leaving.length;

  return (
    <div className="tst-wrap">
      <div
        className="tst"
        data-open={open || undefined}
        style={
          {
            height: open ? OPEN_HEIGHT : stackHeight,
            '--tst-r': `${CORNER}px`,
          } as CSSProperties
        }
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={(e) => {
          if ((e.target as HTMLElement).closest('button')) return;
          /* Hover already opens the stack on desktop; only touch
             screens need tap-to-toggle. */
          if (
            typeof window !== 'undefined' &&
            window.matchMedia('(hover: none)').matches
          ) {
            setOpen((value) => !value);
          }
        }}
      >
        {stack.map((toast, i) => {
          const k = open ? i : SHOWN - 1 - i;
          const depth = SHOWN - 1 - k;
          const y = open ? depth * (HEIGHT + GAP) : depth * PEEK;
          const scale = open ? 1 : 1 - depth * 0.05;
          const front = i === 0;
          const Icon = ICONS[toast.kind];
          const gone = leaving.includes(toast.id);
          const justAdded = entering.includes(toast.id);
          return (
            <div
              key={toast.id}
              className="tst-toast"
              data-kind={toast.kind}
              data-front={front || undefined}
              style={{
                /* Closed, the front toast paints on top: Lexa's surfaces are
                   opaque, so the original order (tucked toasts on top)
                   would hide the front toast's text behind their wash. */
                zIndex: open ? SHOWN - k : SHOWN - i,
                height: HEIGHT,
                transform: `translateY(${y + (justAdded ? 16 : 0)}px) scale(${scale})`,
                opacity: gone || justAdded ? 0 : 1,
              }}
            >
              <span className="tst-icon">
                <Icon size={18} strokeWidth={1.8} />
              </span>
              <span className="tst-text">
                <b>{toast.title}</b>
                {toast.body && <span>{toast.body}</span>}
              </span>
              {toast.actionLabel && (
                <button
                  type="button"
                  className="tst-act"
                  tabIndex={front ? 0 : -1}
                  onClick={() => {
                    toast.onAction?.();
                    dismiss(toast.id);
                  }}
                >
                  {toast.actionLabel}
                </button>
              )}
              <button
                type="button"
                className="tst-x"
                aria-label="Tutup notifikasi"
                tabIndex={front ? 0 : -1}
                onClick={() => dismiss(toast.id)}
              >
                <X size={16} strokeWidth={1.8} />
              </button>
            </div>
          );
        })}

        {/* Overflow count, readable even while stacked. */}
        {rest > 0 && (
          <div
            aria-hidden
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              transform: `translateY(${(SHOWN - 1) * PEEK}px)`,
              width: '100%',
              textAlign: 'center',
              fontSize: 12,
              pointerEvents: 'none',
              opacity: open ? 0 : 1,
              transition: 'opacity 160ms ease',
            }}
          >
            +{rest} more
          </div>
        )}

        {/* Hidden live text: keeps the stack's full count announced. */}
        <span className="sr-only" aria-live="polite">
          {total} notifications
        </span>
      </div>
    </div>
  );
}
