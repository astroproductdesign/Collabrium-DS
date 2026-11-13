'use client';

// The layer behaviour Media Ad Modal and its Metrics modal modifier share: mounting while open or closing, the swing
// out of the card and back, focus on open and on every swap, the keys, the Tab trap and the page hold. Internal: not
// exported from the package.
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type AnimationEvent as ReactAnimationEvent,
  type KeyboardEvent as ReactKeyboardEvent,
  type RefObject,
} from 'react';
import { tokens } from '../../tokens/tokens';
import { holdPage } from '../Modal/holdPage';

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

function onScreen(el: Element) {
  const r = el.getBoundingClientRect();
  return r.width > 0 && r.height > 0 && r.bottom > 0 && r.right > 0 && r.top < window.innerHeight && r.left < window.innerWidth;
}

export const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Writes the FLIP from the panel's resting box to the card's: where the swing starts (open) or ends (close). */
function aimAt(panel: HTMLElement, card: Element) {
  const p = panel.getBoundingClientRect();
  const c = card.getBoundingClientRect();
  panel.style.setProperty('--mad-dx', `${c.left - p.left}px`);
  panel.style.setProperty('--mad-dy', `${c.top - p.top}px`);
  panel.style.setProperty('--mad-sx', String(c.width / p.width));
  panel.style.setProperty('--mad-sy', String(c.height / p.height));
  // The swing turns away from the card's side of the page; the DS doesn't say (decided 2026-11-12, Q-MAD-4).
  panel.style.setProperty('--mad-dir', c.left + c.width / 2 < window.innerWidth / 2 ? '1' : '-1');
}

export interface MediaAdLayerOptions {
  open: boolean;
  onClose: () => void;
  /** The item showing. A new id is a swap. */
  itemId: string;
  onPrevious?: () => void;
  onNext?: () => void;
  /** The card to swing out of. Default: the card around what had focus when it opened. */
  origin?: RefObject<HTMLElement | null>;
  /** Where focus lands on open: Close (Media Ad Modal) or the title (Metrics modal). */
  initialFocus: 'close' | 'title';
  /**
   * The list card for an item, if it has one on the page. When given, closing returns focus to the card for the item
   * now showing (then the last list card shown, then the opener), and folds back into the first of those on screen.
   */
  cardFor?: (id: string) => HTMLElement | null | undefined;
  /** Children of <body> to keep out of the inert sweep (a Toast host). */
  keepLive?: RefObject<HTMLElement | null>[];
  /** What the swing comes out of when `origin` is left out: the card around the opener (default) or the opener itself (Compare modal's Action bar button). */
  swingFrom?: 'card' | 'opener';
  /** Escape mid-opening: the swing plays backwards and also fades to 0 (Compare modal), rather than ending at its 40% start. */
  reverseFadesOut?: boolean;
  /** Where focus goes on close when the opener can no longer take it (disabled or gone). */
  returnFallback?: () => HTMLElement | null | undefined;
}

type Phase = 'closed' | 'open' | 'closing';

/** The fold lasts 0.55s (MediaAdModal.css); the fallback allows it a little longer. */
const CLOSE_FALLBACK_MS = 700;

export function useMediaAdLayer({
  open,
  onClose,
  itemId,
  onPrevious,
  onNext,
  origin,
  initialFocus,
  cardFor,
  keepLive,
  swingFrom = 'card',
  reverseFadesOut = false,
  returnFallback,
}: MediaAdLayerOptions) {
  const layerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnTo = useRef<HTMLElement | null>(null);
  const opener = useRef<Element | null>(null);
  const foldInto = useRef<Element | null>(null);
  const shownId = useRef<string | null>(null);
  const history = useRef<string[]>([]);
  const generation = useRef(0);
  const [phase, setPhase] = useState<Phase>(open ? 'open' : 'closed');
  const [shown, setShown] = useState(false);
  const [swing, setSwing] = useState<'open' | 'close' | undefined>();
  const mounted = phase !== 'closed';

  // Opening (or reopening mid-close): mount. Each opening is a new generation, so a close still finishing can't
  // unmount it.
  useEffect(() => {
    if (!open) return;
    generation.current += 1;
    setPhase('open');
    setShown(false);
  }, [open]);

  // Once mounted: remember what opened it and the card to swing out of, aim the swing at the card (or fade), show
  // the scrim, and place focus.
  useLayoutEffect(() => {
    if (!open || phase !== 'open' || shown) return;
    const panel = panelRef.current;
    if (!panel) return;
    const active = document.activeElement as HTMLElement | null;
    if (active && !layerRef.current?.contains(active)) returnTo.current = active;
    opener.current = origin?.current ?? (swingFrom === 'opener' ? returnTo.current : returnTo.current?.closest('.cui-card')) ?? null;
    if (opener.current && onScreen(opener.current) && !reducedMotion()) {
      aimAt(panel, opener.current);
      setSwing('open');
    } else {
      setSwing(undefined);
    }
    shownId.current = itemId;
    history.current = [itemId];
    // Media Ad Modal opens on Close, as the DS says: an approved exception to focusing only a heading (decided
    // 2026-11-12, Q-MAD-1). Metrics modal opens on its title, as its DS says.
    if (initialFocus === 'close') closeRef.current?.focus();
    else titleRef.current?.focus();
    const raf = requestAnimationFrame(() => requestAnimationFrame(() => setShown(true)));
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, phase, shown]);

  // Closing: fold back into the card if it's on screen (mid-opening, the swing plays backwards from where it is),
  // else fade. Nothing in the panel responds while it closes.
  useEffect(() => {
    if (open || phase !== 'open') return;
    const panel = panelRef.current;
    // The cards to return to, in order: the item now showing, the last list card shown, the opener.
    const cards: Element[] = [];
    if (cardFor) {
      for (const id of [...history.current].reverse()) {
        const el = cardFor(id);
        if (el && !cards.includes(el)) cards.push(el);
      }
    }
    if (opener.current && !cards.includes(opener.current)) cards.push(opener.current);
    const first = cards[0];
    foldInto.current = cards.find(onScreen) ?? null;
    if (first && first !== opener.current) {
      returnTo.current = first.querySelector<HTMLElement>('.cui-card__action') ?? (first as HTMLElement);
    }
    setPhase('closing');
    setShown(false);
    const gen = generation.current;
    const finish = () => {
      if (gen !== generation.current) return;
      setPhase('closed');
      setSwing(undefined);
    };
    let timer = 0;
    const running = panel?.getAnimations().find(a => a.playState === 'running');
    if (panel && running && swing === 'open') {
      // Backwards from where it is, ending at the swing's start (40% opacity), then gone (decided 2026-11-12, Q-MAD-6).
      // Compare modal also fades to 0 on the way, as its DS says.
      running.reverse();
      if (reverseFadesOut) {
        const left = Number(running.currentTime ?? 0);
        panel.animate([{ opacity: getComputedStyle(panel).opacity }, { opacity: 0 }], { duration: left, fill: 'forwards' });
      }
      running.finished.then(finish, finish);
    } else if (panel && foldInto.current && !reducedMotion()) {
      aimAt(panel, foldInto.current);
      setSwing('close');
      // A fallback in case the fold is cancelled (no animationend), so the page is never left held.
      timer = window.setTimeout(finish, CLOSE_FALLBACK_MS);
    } else {
      timer = window.setTimeout(finish, tokens.duration.slow);
    }
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // The page is held still from mount until the panel has gone; then focus goes back to the card (scrolled into view).
  useEffect(() => {
    if (!mounted || !layerRef.current) return;
    const keep = (keepLive ?? []).map(r => r.current).filter((el): el is HTMLElement => !!el);
    const release = holdPage(layerRef.current, panelRef.current ?? layerRef.current, keep);
    return () => {
      release();
      const usable = (el: HTMLElement | null) => !!el && el.isConnected && !(el as HTMLButtonElement).disabled && el.getAttribute('aria-disabled') !== 'true';
      const back = usable(returnTo.current) ? returnTo.current : returnFallback?.() ?? returnTo.current;
      back?.focus?.({ preventScroll: true });
      back?.scrollIntoView?.({ block: 'nearest' });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted]);

  // A swap (stepping or a related item): the body back to the top, focus on the new title.
  useEffect(() => {
    if (phase !== 'open' || !shownId.current || shownId.current === itemId) return;
    shownId.current = itemId;
    history.current = [...history.current.filter(id => id !== itemId), itemId];
    bodyRef.current?.scrollTo({ top: 0 });
    titleRef.current?.focus();
  }, [itemId, phase]);

  // Keys: Escape closes; ← / → step (never with a modifier, never from a text field).
  useEffect(() => {
    if (phase !== 'open') return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        onClose();
        return;
      }
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      const target = event.target as HTMLElement | null;
      if (target?.closest('input, textarea, select, [contenteditable]:not([contenteditable="false"])')) return;
      const step = event.key === 'ArrowLeft' ? onPrevious : onNext;
      if (!step) return;
      event.preventDefault();
      step();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [phase, onClose, onPrevious, onNext]);

  // Tab stays inside the panel and wraps only at its ends.
  const trap = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Tab' || !panelRef.current) return;
    const items = [...panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(
      el => el.getAttribute('aria-hidden') !== 'true' && el.offsetParent !== null,
    );
    if (items.length === 0) return;
    const firstItem = items[0];
    const last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === firstItem) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      firstItem.focus();
    }
  };

  const onAnimationEnd = (event: ReactAnimationEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget && swing === 'close') {
      setPhase('closed');
      setSwing(undefined);
    }
  };

  return {
    mounted,
    closing: phase === 'closing',
    shown,
    swing,
    layerRef,
    panelRef,
    bodyRef,
    titleRef,
    closeRef,
    trap,
    onAnimationEnd,
  };
}
