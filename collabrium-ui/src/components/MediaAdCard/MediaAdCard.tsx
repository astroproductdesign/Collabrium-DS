'use client';

import {
  forwardRef,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from 'react';
import { Check, FrameCorners, Play, Plus, PushPin } from '@phosphor-icons/react';
import type { WithoutStyling } from '../../utils/types';
import { Badge } from '../Badge';
import type { CardHeadingLevel } from '../Card';
import { Tag, type TagVariant } from '../Tag';

/** The format's family. Each has one fixed Tag colour (Interactive Water, Gamification Fire, Video Wood, Social Earth, High impact Gold, Display Purple). */
export type MediaAdFamily = 'interactive' | 'gamification' | 'video' | 'social' | 'high-impact' | 'display';

/** The family mapping, fixed by the DLS: element colours label kinds of format here, not departments. */
const FAMILIES: Record<MediaAdFamily, { label: string; tag: TagVariant }> = {
  interactive: { label: 'Interactive', tag: 'water' },
  gamification: { label: 'Gamification', tag: 'fire' },
  video: { label: 'Video', tag: 'wood' },
  social: { label: 'Social', tag: 'earth' },
  'high-impact': { label: 'High impact', tag: 'gold' },
  display: { label: 'Display', tag: 'purple' },
};

type NativeArticleProps = WithoutStyling<Omit<HTMLAttributes<HTMLElement>, 'children' | 'color' | 'title'>>;

export interface MediaAdCardProps extends NativeArticleProps {
  /** The format's name ("Swipe Gallery"). Wraps to two lines, then clamps. */
  name: string;
  /** The format's family, shown as its Tag. */
  family: MediaAdFamily;
  /** One sentence on what the format is. Shown at rest, clamped to two lines. */
  tagline: string;
  /** The funnel stages it serves, in order ("Consideration", "Conversion"). One line, joined by " · ". */
  funnel: string[];
  /** The Objective spec row ("Engagement"). */
  objective: string;
  /** The Sizes spec row, one entry per size ("300×250"). Leave out or pass `[]` for a format with no fixed size: an em dash. */
  sizes?: string[];
  /** The Benchmark spec row ("CTR 2.1%"). Leave out when none is published: "Not published". */
  benchmark?: string;
  /**
   * The media: your image, video or preview, stretched to the 16:10 slot (`img`, `video`, `picture`, `iframe` and
   * `canvas` are cropped to cover). Leave out for the neutral placeholder. The card never ships an ad visual.
   */
  media?: ReactNode;
  /** Shows the "Built for this slot" badge over the media, for a format made for the placement being planned. */
  builtForSlot?: boolean;
  /** Opens the format's detail (the Media Ad Modal). Called from the title button, which is stretched over the card. */
  onOpen: () => void;
  /** Whether the format is in the comparison. Leave out to let the card keep its own state, starting from `defaultCompared`. */
  compared?: boolean;
  /** The starting state when `compared` is left out. Default false. */
  defaultCompared?: boolean;
  /** Called with the new state when the Compare toggle (or the C key) is used. Feed it to the Action bar's Item select. */
  onComparedChange?: (compared: boolean) => void;
  /** Tilts the card up to 4deg toward a mouse pointer. Off under reduced motion. Default false. */
  tilt?: boolean;
  /** The heading level of the name, 2 to 6. The look is always h5. Default 3. */
  headingLevel?: CardHeadingLevel;
}

const DASH = '—';

/** A missing spec value: what the eye reads, and what a screen reader reads instead of a bare dash. */
function Empty({ shown, spoken }: { shown: string; spoken?: string }) {
  if (!spoken) return <>{shown}</>;
  return (
    <>
      <span aria-hidden="true">{shown}</span>
      <span className="cui-media-ad-card__hidden">{spoken}</span>
    </>
  );
}

/** The click's pointer: keyboard clicks report an empty type, so a stale touch can never swallow an Enter. */
function pointerOf(event: ReactMouseEvent) {
  const native = event.nativeEvent as MouseEvent & { pointerType?: string };
  return 'pointerType' in native ? native.pointerType || 'keyboard' : 'mouse';
}

/**
 * Collabrium Media Ad Card: one ad format as a gallery tile. A full-bleed 16:10 media slot, a round Compare toggle,
 * the name and family Tag, and a body that trades its tagline for three spec rows (Objective, Sizes, Benchmark) when
 * the card goes Live on hover, focus or a first tap. A variant of Card, ported from components.css
 * `.c-card-media-ad*` (526–712).
 */
export const MediaAdCard = forwardRef<HTMLElement, MediaAdCardProps>(function MediaAdCard(
  {
    name,
    family,
    tagline,
    funnel,
    objective,
    sizes,
    benchmark,
    media,
    builtForSlot = false,
    onOpen,
    compared,
    defaultCompared = false,
    onComparedChange,
    tilt = false,
    headingLevel = 3,
    onKeyDown,
    onPointerEnter,
    onPointerMove,
    onPointerLeave,
    ...rest
  },
  ref,
) {
  const Heading = `h${headingLevel}` as 'h3';
  const { label: familyLabel, tag } = FAMILIES[family];
  const [ownCompared, setOwnCompared] = useState(defaultCompared);
  const on = compared ?? ownCompared;
  // Live by touch: the first tap shows the specs, the second opens. Hover and focus are CSS.
  const [live, setLive] = useState(false);
  const [tilting, setTilting] = useState<{ x: number; y: number } | null>(null);
  const root = useRef<HTMLElement | null>(null);
  const rect = useRef<DOMRect | null>(null);

  // A touch anywhere outside the card (another card's Compare included) clears Live.
  useEffect(() => {
    if (!live) return;
    const clear = (event: PointerEvent) => {
      if (event.pointerType === 'touch' && !root.current?.contains(event.target as Node)) setLive(false);
    };
    document.addEventListener('pointerdown', clear, true);
    return () => document.removeEventListener('pointerdown', clear, true);
  }, [live]);

  const toggle = () => {
    if (compared === undefined) setOwnCompared(!on);
    onComparedChange?.(!on);
  };

  const sizeText = sizes && sizes.length > 0 ? sizes.join(' · ') : undefined;
  const specs = [
    { label: 'Objective', value: objective },
    { label: 'Sizes', value: sizeText, empty: <Empty shown={DASH} spoken="No fixed size" /> },
    { label: 'Benchmark', value: benchmark, empty: <Empty shown="Not published" /> },
  ];

  return (
    <article
      {...rest}
      ref={node => {
        root.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      }}
      className="cui-card cui-media-ad-card"
      data-card="media-ad"
      data-live={live ? '' : undefined}
      data-compared={on ? '' : undefined}
      data-tilting={tilting ? '' : undefined}
      style={tilting ? ({ '--cui-media-ad-card-tilt-x': tilting.x, '--cui-media-ad-card-tilt-y': tilting.y } as CSSProperties) : undefined}
      onKeyDown={(event: ReactKeyboardEvent<HTMLElement>) => {
        onKeyDown?.(event);
        // C toggles compare while focus is anywhere in the card: no modifier, no key repeat, never from a text field.
        if (event.key !== 'c' && event.key !== 'C') return;
        if (event.repeat || event.metaKey || event.ctrlKey || event.altKey) return;
        if ((event.target as HTMLElement).closest('input, textarea, select, [contenteditable]')) return;
        event.preventDefault();
        toggle();
      }}
      onPointerEnter={(event: ReactPointerEvent<HTMLElement>) => {
        // Measured once on entry: measuring mid-tilt returns the rotated box and feeds the angle back into itself.
        if (tilt && event.pointerType === 'mouse') rect.current = event.currentTarget.getBoundingClientRect();
        onPointerEnter?.(event);
      }}
      onPointerMove={(event: ReactPointerEvent<HTMLElement>) => {
        if (tilt && event.pointerType === 'mouse' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          const r = (rect.current ??= event.currentTarget.getBoundingClientRect());
          const clamp = (n: number) => Math.max(-1, Math.min(1, n));
          setTilting({
            x: Number(clamp(((event.clientX - r.left) / r.width - 0.5) * 2).toFixed(3)),
            y: Number(clamp(((event.clientY - r.top) / r.height - 0.5) * 2).toFixed(3)),
          });
        }
        onPointerMove?.(event);
      }}
      onPointerLeave={(event: ReactPointerEvent<HTMLElement>) => {
        rect.current = null;
        setTilting(null);
        onPointerLeave?.(event);
      }}
    >
      <div className="cui-media-ad-card__frame">
        <div className="cui-media-ad-card__slot">
          {media ?? (
            <div className="cui-media-ad-card__placeholder" aria-hidden="true">
              <FrameCorners focusable="false" />
              <span>Media</span>
            </div>
          )}
        </div>
        {builtForSlot && (
          <span className="cui-media-ad-card__native">
            <Badge variant="neutral" icon={PushPin}>
              Built for this slot
            </Badge>
          </span>
        )}
        <span className="cui-media-ad-card__hint" aria-hidden="true">
          <Play focusable="false" />
          Tap to play
        </span>
      </div>
      <div className="cui-media-ad-card__body">
        <div className="cui-media-ad-card__titlerow">
          <Heading className="cui-media-ad-card__title">
            <button
              type="button"
              className="cui-card__action cui-media-ad-card__open"
              onClick={event => {
                if (pointerOf(event) === 'touch' && !live) {
                  setLive(true);
                  return;
                }
                onOpen();
              }}
            >
              {name}
              <span className="cui-media-ad-card__hidden">, {familyLabel}. Open details</span>
            </button>
          </Heading>
          <Tag variant={tag}>{familyLabel}</Tag>
        </div>
        <div className="cui-media-ad-card__swap">
          <div className="cui-media-ad-card__rest">
            <p className="cui-media-ad-card__tagline">{tagline}</p>
            <p className="cui-media-ad-card__funnel">{funnel.join(' · ')}</p>
          </div>
          <dl className="cui-media-ad-card__spec">
            {specs.map(({ label, value, empty }) => (
              <div key={label} className="cui-media-ad-card__spec-row">
                <dt>{label}</dt>
                <dd data-empty={value ? undefined : ''}>{value || empty}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      <button
        type="button"
        className="cui-media-ad-card__compare"
        aria-pressed={on}
        aria-label={`Compare ${name}`}
        aria-keyshortcuts="c"
        onClick={event => {
          if (pointerOf(event) === 'touch') setLive(false);
          toggle();
        }}
      >
        {on ? <Check aria-hidden="true" focusable="false" /> : <Plus aria-hidden="true" focusable="false" />}
      </button>
    </article>
  );
});

/**
 * The Media Ad Card while its data loads: the same shell with Neutral-2 bones (media, title, Tag pill, three lines),
 * exactly as tall as the card that replaces it. Hidden from assistive technology; set `aria-busy` on the grid.
 */
export const MediaAdCardSkeleton = forwardRef<HTMLDivElement, WithoutStyling<Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'color'>>>(
  function MediaAdCardSkeleton(props, ref) {
    return (
      <div {...props} ref={ref} className="cui-card cui-media-ad-card" data-card="media-ad" data-skeleton="" aria-hidden="true">
        <div className="cui-media-ad-card__frame">
          <span className="cui-media-ad-card__bone" data-bone="media" />
        </div>
        <div className="cui-media-ad-card__body">
          <div className="cui-media-ad-card__titlerow">
            <span className="cui-media-ad-card__bone" data-bone="title" />
            <span className="cui-media-ad-card__bone" data-bone="pill" />
          </div>
          <div className="cui-media-ad-card__swap">
            <span className="cui-media-ad-card__bone" data-bone="line" />
            <span className="cui-media-ad-card__bone" data-bone="line" />
            <span className="cui-media-ad-card__bone" data-bone="line" />
          </div>
        </div>
      </div>
    );
  },
);
