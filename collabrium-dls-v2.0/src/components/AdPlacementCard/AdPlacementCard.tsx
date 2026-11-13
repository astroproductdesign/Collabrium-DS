'use client';

import {
  cloneElement,
  forwardRef,
  isValidElement,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type FocusEvent as ReactFocusEvent,
  type HTMLAttributes,
  type PointerEvent as ReactPointerEvent,
  type ReactElement,
} from 'react';
import { createPortal } from 'react-dom';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, type Icon } from '@phosphor-icons/react';
import type { WithoutStyling } from '../../utils/types';
import { Card } from '../Card';

/** Which way the CTA hint's arrow points: toward the catalogue the slot filters. */
export type AdPlacementCtaDirection = 'down' | 'up' | 'left' | 'right';

/** How many catalogue units fit the slot. */
export interface AdPlacementFit {
  /** Units that fit this slot. 0 shows "0" in Neutral-5, "— none yet", and leaves the CTA out. */
  count: number;
  /** Units in the whole catalogue ("of 38 units fit here"). */
  total: number;
  /** Units built for this slot ("· 5 built for it"). Leave out and that part is dropped. */
  built?: number;
}

type NativeDivProps = WithoutStyling<Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'color' | 'title' | 'role'>>;

export interface AdPlacementCardProps extends NativeDivProps {
  /** The slot's glyph, a Phosphor icon. Drawn Fill (it describes, it doesn't act), Navy, 20px. */
  icon: Icon;
  /** The slot's label, e.g. "In the article". Wraps. */
  title: string;
  /** Where it sits, in brief, e.g. "Between paragraphs". */
  where: string;
  /** One sentence on what the slot is. */
  description: string;
  /**
   * The sizes it takes, e.g. `['300×250', '640×360', '16:9 pre-roll']`. Sorted largest to smallest by area; sizes that
   * aren't W×H keep their order and go last. The first four show, then "+N". Empty reads "No fixed size".
   */
  sizes: string[];
  /** The devices it runs on, e.g. `['Desktop', 'Tablet', 'Mobile']`. Shown in sentence case. Empty reads "Not on file". */
  devices: string[];
  /** How many catalogue units fit. */
  fit: AdPlacementFit;
  /** The CTA hint's text, e.g. "Select to filter the catalogue". Leave out for no hint. It is left out when nothing fits. */
  cta?: string;
  /** Which way the CTA hint's arrow points: toward the catalogue. Default `down` (the catalogue below the map). */
  ctaDirection?: AdPlacementCtaDirection;
  /**
   * The slot: one real `<button>` on the placement map. It gets `aria-describedby` pointing at the card, and, if it has
   * no `aria-label`, the name "{title}, {where}". Hovering it shows the card beside the pointer; focusing it from the
   * keyboard shows it beside the slot.
   */
  children?: ReactElement<Record<string, unknown>>;
  /**
   * Draws the card in the page flow, always visible, with no slot and no behaviour. For documentation and design
   * reviews only; in a product the card floats.
   */
  inline?: boolean;
}

const GUTTER = 12; // spacing-12: the margin kept from the window edge, and the keyboard gap from the slot.
const POINTER_OFFSET = 20; // spacing-20: below and right of the cursor.
const ARROWS: Record<AdPlacementCtaDirection, Icon> = { down: ArrowDown, up: ArrowUp, left: ArrowLeft, right: ArrowRight };

// Only one Ad Placement Card shows at a time across the page: showing one hides the last.
let hideOpenCard: (() => void) | null = null;

/** Sizes, largest to smallest by area; anything that isn't W×H keeps its order and goes last. */
export function sortAdSizes(sizes: string[]): string[] {
  const area = (s: string) => {
    const m = /^\s*(\d+(?:\.\d+)?)\s*[×x]\s*(\d+(?:\.\d+)?)\s*$/i.exec(s);
    return m ? Number(m[1]) * Number(m[2]) : null;
  };
  const measured = sizes.map((s, i) => ({ s, i, a: area(s) }));
  const fixed = measured.filter(m => m.a !== null).sort((x, y) => (y.a as number) - (x.a as number) || x.i - y.i);
  return [...fixed, ...measured.filter(m => m.a === null)].map(m => m.s);
}

/** Devices in sentence case: "Desktop, tablet, mobile". Only the first letter of later items is lowered ("connected TV"). */
export function formatAdDevices(devices: string[]): string {
  return devices.map((d, i) => (i === 0 ? d : d.charAt(0).toLowerCase() + d.slice(1))).join(', ');
}

interface Point {
  top: number;
  left: number;
}

function clamp(top: number, left: number, w: number, h: number): Point {
  const vw = document.documentElement.clientWidth;
  const vh = document.documentElement.clientHeight;
  return {
    left: Math.min(Math.max(left, GUTTER), vw - GUTTER - w),
    top: Math.min(Math.max(top, GUTTER), vh - GUTTER - h),
  };
}

/** Pointer mode: 20px below and right of the cursor; flips left of it, or above it, before it is clamped to the gutter. */
function besidePointer(x: number, y: number, w: number, h: number): Point {
  const vw = document.documentElement.clientWidth;
  const vh = document.documentElement.clientHeight;
  let left = x + POINTER_OFFSET;
  let top = y + POINTER_OFFSET;
  if (left + w > vw - GUTTER) left = x - POINTER_OFFSET - w;
  if (top + h > vh - GUTTER) top = y - POINTER_OFFSET - h;
  return clamp(top, left, w, h);
}

/** Keyboard mode: beside the slot, vertically centred, 12px away. Right, then left, then above, then below; then clamped. */
function besideSlot(slot: DOMRect, w: number, h: number): Point {
  const vw = document.documentElement.clientWidth;
  const midY = slot.top + slot.height / 2 - h / 2;
  if (slot.right + GUTTER + w <= vw - GUTTER) return clamp(midY, slot.right + GUTTER, w, h);
  if (slot.left - GUTTER - w >= GUTTER) return clamp(midY, slot.left - GUTTER - w, w, h);
  const midX = slot.left + slot.width / 2 - w / 2;
  const above = slot.top - GUTTER - h;
  return clamp(above >= GUTTER ? above : slot.bottom + GUTTER, midX, w, h);
}

/**
 * Collabrium Ad Placement Card: a floating card that describes one ad slot on a placement map while the slot is
 * pointed at or focused: icon, title and where it sits, a one-sentence description, Sizes and Runs on, how many
 * catalogue units fit, and an optional CTA hint. A Card by surface and a Tooltip by behaviour. Ported from
 * components.css `.c-card-ad-placement` (1176–1261).
 */
export const AdPlacementCard = forwardRef<HTMLDivElement, AdPlacementCardProps>(function AdPlacementCard(
  { icon: SlotIcon, title, where, description, sizes, devices, fit, cta, ctaDirection = 'down', children, inline = false, id: idProp, ...rest },
  ref,
) {
  const autoId = useId();
  const id = idProp ?? autoId;
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState<Point | null>(null);
  const [wrapped, setWrapped] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLSpanElement>(null);
  const mode = useRef<'pointer' | 'keyboard'>('pointer');
  const pointer = useRef({ x: 0, y: 0 });
  const slotRef = useRef<HTMLElement | null>(null);
  const frame = useRef(0);
  // After Escape the card stays hidden until the pointer leaves the slot and comes back, or focus moves (WCAG 1.4.13).
  const dismissed = useRef(false);

  useEffect(() => setMounted(true), []);

  const hide = useCallback(() => setVisible(false), []);

  const place = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    const w = card.offsetWidth;
    const h = card.offsetHeight;
    if (mode.current === 'pointer') setPosition(besidePointer(pointer.current.x, pointer.current.y, w, h));
    else if (slotRef.current) setPosition(besideSlot(slotRef.current.getBoundingClientRect(), w, h));
  }, []);

  // The icon centres on the head's first two lines: title and where, or the first two title lines when it wraps.
  // Measured after layout, and again once the fonts load.
  useLayoutEffect(() => {
    const measure = () => {
      const t = titleRef.current;
      if (!t) return;
      setWrapped(t.getBoundingClientRect().height > parseFloat(getComputedStyle(t).lineHeight) * 1.5);
    };
    measure();
    if (typeof document !== 'undefined' && document.fonts) document.fonts.ready.then(measure).catch(() => {});
  }, [title, mounted]);

  useLayoutEffect(() => {
    if (visible) place();
  }, [visible, place, wrapped]);

  const show = useCallback(
    (how: 'pointer' | 'keyboard') => {
      if (dismissed.current) return;
      mode.current = how;
      setVisible(true);
      place();
    },
    [place],
  );

  useEffect(() => {
    if (!visible) return;
    if (hideOpenCard && hideOpenCard !== hide) hideOpenCard();
    hideOpenCard = hide;
    // Capture phase, and stop it only while showing, so the same Escape doesn't also close a modal underneath.
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      event.stopPropagation();
      dismissed.current = true;
      hide();
    };
    // Scrolling hides it, except while a slot holds keyboard focus: then the card follows the slot, so the scroll that
    // brings a tabbed-to slot into view doesn't hide its card (as Tooltip, decided Q-TOOLTIP-6; Q-ADPL-6).
    const onScroll = () => {
      if (mode.current === 'keyboard' && slotRef.current && slotRef.current === document.activeElement) place();
      else hide();
    };
    document.addEventListener('keydown', onKey, true);
    window.addEventListener('scroll', onScroll, { capture: true, passive: true });
    window.addEventListener('resize', hide);
    return () => {
      document.removeEventListener('keydown', onKey, true);
      window.removeEventListener('scroll', onScroll, { capture: true });
      window.removeEventListener('resize', hide);
      if (hideOpenCard === hide) hideOpenCard = null;
    };
  }, [visible, hide]);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  const fitNone = fit.count === 0;
  const fitText = `of ${fit.total} units fit here${fitNone ? ' — none yet' : fit.built !== undefined ? ` · ${fit.built} built for it` : ''}`;
  const sorted = sortAdSizes(sizes);
  const shown = sorted.slice(0, 4);
  const more = sorted.length - shown.length;
  const showCta = cta !== undefined && !fitNone;
  const CtaArrow = ARROWS[ctaDirection];
  const describedBy = [`${id}-desc`, `${id}-facts`, `${id}-fit`, showCta ? `${id}-cta` : null].filter(Boolean).join(' ');

  const card = (
    <Card
      {...rest}
      ref={node => {
        cardRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      }}
      id={id}
      role="tooltip"
      data-card="ad-placement"
      data-inline={inline ? '' : undefined}
      data-visible={visible && position ? '' : undefined}
      data-fit-none={fitNone ? '' : undefined}
      // The card's top and left are set from the pointer or the slot, as the source's script does.
      {...({ style: !inline && position ? { top: position.top, left: position.left } : undefined } as object)}
    >
      <div className="cui-ad-placement-card__head" data-title-wrapped={wrapped ? '' : undefined}>
        <SlotIcon className="cui-ad-placement-card__icon" weight="fill" aria-hidden="true" focusable="false" />
        <span className="cui-ad-placement-card__title" ref={titleRef}>
          {title}
        </span>
        <span className="cui-ad-placement-card__where">{where}</span>
      </div>
      <p className="cui-ad-placement-card__desc" id={`${id}-desc`}>
        {description}
      </p>
      <dl className="cui-ad-placement-card__facts" id={`${id}-facts`}>
        <div className="cui-ad-placement-card__fact">
          <dt>Sizes</dt>
          {sorted.length ? (
            <dd>
              {shown.join(', ')}
              {more > 0 && <span className="cui-ad-placement-card__more">{` +${more}`}</span>}
            </dd>
          ) : (
            <dd data-empty="">No fixed size</dd>
          )}
        </div>
        <div className="cui-ad-placement-card__fact">
          <dt>Runs on</dt>
          {devices.length ? <dd>{formatAdDevices(devices)}</dd> : <dd data-empty="">Not on file</dd>}
        </div>
      </dl>
      <p className="cui-ad-placement-card__fit" id={`${id}-fit`}>
        <span className="cui-ad-placement-card__count">{fit.count}</span>{' '}
        <span className="cui-ad-placement-card__fit-text">{fitText}</span>
      </p>
      {showCta && (
        <p className="cui-ad-placement-card__cta" id={`${id}-cta`}>
          <CtaArrow aria-hidden="true" focusable="false" />
          {cta}
        </p>
      )}
    </Card>
  );

  if (inline) return card;

  const slot = isValidElement(children)
    ? cloneElement(children, {
        'aria-describedby': describedBy,
        'aria-label': (children.props['aria-label'] as string | undefined) ?? `${title}, ${where}`,
        onPointerEnter: (event: ReactPointerEvent<HTMLElement>) => {
          (children.props.onPointerEnter as ((e: ReactPointerEvent<HTMLElement>) => void) | undefined)?.(event);
          if (event.pointerType === 'touch') return;
          slotRef.current = event.currentTarget;
          dismissed.current = false;
          pointer.current = { x: event.clientX, y: event.clientY };
          show('pointer');
        },
        onPointerMove: (event: ReactPointerEvent<HTMLElement>) => {
          (children.props.onPointerMove as ((e: ReactPointerEvent<HTMLElement>) => void) | undefined)?.(event);
          if (event.pointerType === 'touch' || dismissed.current) return;
          pointer.current = { x: event.clientX, y: event.clientY };
          // The last input wins: pointing at a keyboard-shown slot switches it to follow the pointer.
          if (mode.current !== 'pointer' || !visible) show('pointer');
          // Redrawn at most once per frame.
          cancelAnimationFrame(frame.current);
          frame.current = requestAnimationFrame(place);
        },
        onPointerLeave: (event: ReactPointerEvent<HTMLElement>) => {
          (children.props.onPointerLeave as ((e: ReactPointerEvent<HTMLElement>) => void) | undefined)?.(event);
          dismissed.current = false;
          if (mode.current === 'pointer') hide();
        },
        onFocus: (event: ReactFocusEvent<HTMLElement>) => {
          (children.props.onFocus as ((e: ReactFocusEvent<HTMLElement>) => void) | undefined)?.(event);
          slotRef.current = event.currentTarget;
          dismissed.current = false;
          // Keyboard focus only: a mouse click that moves focus doesn't show it.
          if (event.currentTarget.matches(':focus-visible')) show('keyboard');
        },
        onBlur: (event: ReactFocusEvent<HTMLElement>) => {
          (children.props.onBlur as ((e: ReactFocusEvent<HTMLElement>) => void) | undefined)?.(event);
          if (mode.current === 'keyboard') hide();
        },
      })
    : children;

  return (
    <>
      {slot}
      {/* Always in the DOM (hidden at rest), so aria-describedby reaches it; at <body> level once mounted. */}
      {mounted ? createPortal(card, document.body) : card}
    </>
  );
});
