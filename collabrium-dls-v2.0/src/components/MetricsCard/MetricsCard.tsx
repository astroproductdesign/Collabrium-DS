'use client';

import { forwardRef, useEffect, useRef, useState, type CSSProperties, type HTMLAttributes, type ReactNode } from 'react';
import type { WithoutStyling } from '../../utils/types';
import type { CardHeadingLevel } from '../Card';
import { MediaAdEmpty, MediaAdShell, MediaAdSkeletonShell, mediaAdPlaceholder } from '../MediaAdCard/MediaAdCard';
import { Tag, type TagVariant } from '../Tag';

/** One row of the breakdown: a label and its share, 0–100. */
export interface MetricsBar {
  /** The bar's label ("Video", "Social"). */
  label: string;
  /** The share in percent, 0–100 ("57" reads "57%"). Leave out when not on file: the row stays, with an empty track and a dash. */
  value?: number;
}

/**
 * The audience category Tags, as the DLS maps them (audience segments). Life stage and Sports are plain neutral Tags:
 * their illustration colours have no Tag.
 */
export const audienceCategoryTags: Record<string, TagVariant> = {
  Ethnicity: 'earth',
  'Income group': 'gold',
  Professionals: 'water',
  Entertainment: 'purple',
  Trendsetter: 'wood',
  Shopping: 'fire',
  'Life stage': 'neutral',
  Sports: 'neutral',
};

type NativeArticleProps = WithoutStyling<Omit<HTMLAttributes<HTMLElement>, 'children' | 'color' | 'title'>>;

export interface MetricsCardProps extends NativeArticleProps {
  /** The item's name ("Foodies"). The title block is always two lines tall; a longer name clamps with an ellipsis. */
  name: string;
  /** The category, shown as the Tag ("Trendsetter"). 13 characters at most. */
  category: string;
  /** The category Tag's colour. For audiences, use `audienceCategoryTags`. Never a department. */
  categoryTag: TagVariant;
  /** One or two sentences about the item. Shown at rest, clamped to three lines. */
  tagline: string;
  /** The headline figure, already formatted ("16M"). Leave out when not published. */
  size?: string;
  /** The size's unit on the rest line ("audience": "16M audience"). */
  unit: string;
  /** The total's label on the Live face ("total audience"). */
  totalLabel: string;
  /** The breakdown, in your order (never sorted). The first five show; more adds "+N more" to the total line. */
  bars: MetricsBar[];
  /** Read after "+N more" by screen readers only (" channels in details"). Default " in details". */
  moreLabel?: string;
  /** Shown when there are no bars. Default "No breakdown on file". */
  emptyLabel?: string;
  /** The still: your image, stretched to the 16:10 slot. Leave out for the neutral placeholder. */
  media?: ReactNode;
  /** A short decorative clip (a video URL). Muted and looped, it plays only while the card is Live; never under reduced motion. */
  clip?: string;
  /** Opens the item's detail (the Metrics modal). Called from the title button, which is stretched over the card. */
  onOpen: () => void;
  /** The Add toggle's fixed label, naming the item ("Add Foodies to reach tray"). */
  addLabel: string;
  /** Whether the item is added. Leave out to let the card keep its own state, starting from `defaultAdded`. */
  added?: boolean;
  /** The starting state when `added` is left out. Default false. */
  defaultAdded?: boolean;
  /** Called with the new state when the Add toggle (or the A key) is used. */
  onAddedChange?: (added: boolean) => void;
  /** Tilts the card up to 4deg toward a mouse pointer. Off under reduced motion. Default false. */
  tilt?: boolean;
  /** The heading level of the name, 2 to 6. The look is always h5. Default 3. */
  headingLevel?: CardHeadingLevel;
}

const MAX_BARS = 5;

/** "Social" reads "social" mid-sentence; an all-capitals label ("TV") stays as it is. */
function inSentence(label: string) {
  return label === label.toUpperCase() ? label : label.charAt(0).toLowerCase() + label.slice(1);
}

/**
 * Collabrium Metrics card: a Media Ad Card for an item whose figures matter more than its spec (audience segments,
 * influencers, channels). At rest, the tagline and a size line; Live, a headline total and a breakdown of up to five
 * bars that grow in. An Add toggle (the A key) picks it into the host's tray. Ported from components.css
 * `.c-card-media-ad-metrics*` (714–878).
 */
export const MetricsCard = forwardRef<HTMLElement, MetricsCardProps>(function MetricsCard(
  {
    name,
    category,
    categoryTag,
    tagline,
    size,
    unit,
    totalLabel,
    bars,
    moreLabel = ' in details',
    emptyLabel = 'No breakdown on file',
    media,
    clip,
    onOpen,
    addLabel,
    added,
    defaultAdded = false,
    onAddedChange,
    tilt = false,
    headingLevel = 3,
    ...rest
  },
  ref,
) {
  const [ownAdded, setOwnAdded] = useState(defaultAdded);
  const on = added ?? ownAdded;
  const toggle = () => {
    if (added === undefined) setOwnAdded(!on);
    onAddedChange?.(!on);
  };

  // The clip plays only while Live and motion is allowed; it pauses and rewinds when Live ends. data-playing follows
  // the video's own events, so it never fades in over a blank or buffering frame.
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const live = useRef(false);
  const syncClip = () => {
    const v = video.current;
    if (!v) return;
    const run = live.current && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (run && v.paused) v.play()?.catch(() => {});
    else if (!run && !v.paused) {
      v.pause();
      v.currentTime = 0;
    }
  };
  useEffect(() => {
    if (!clip) return;
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    query.addEventListener('change', syncClip);
    return () => query.removeEventListener('change', syncClip);
  }, [clip]);

  const shown = bars.slice(0, MAX_BARS);
  const more = bars.length - shown.length;
  // The highest value among every bar supplied, the first in your order on a tie.
  const top = bars.reduce<MetricsBar | undefined>((best, bar) => (bar.value !== undefined && (best?.value === undefined || bar.value > best.value) ? bar : best), undefined);

  return (
    <MediaAdShell
      {...rest}
      ref={ref}
      variant="metrics"
      headingLevel={headingLevel}
      title={
        <>
          <span className="cui-metrics-card__name">{name}</span>
          <span className="cui-media-ad-card__hidden">
            , {category}
            {size ? `, ${size} ${unit}` : ''}. Open details
          </span>
        </>
      }
      tag={
        <Tag variant={categoryTag}>
          <span className="cui-metrics-card__tag-label">{category}</span>
        </Tag>
      }
      media={
        <>
          {media ?? mediaAdPlaceholder}
          {clip && (
            <video
              ref={video}
              className="cui-metrics-card__clip"
              src={clip}
              muted
              loop
              playsInline
              preload="none"
              aria-hidden="true"
              data-playing={playing ? '' : undefined}
              onPlaying={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onEnded={() => setPlaying(false)}
            />
          )}
        </>
      }
      swap={
        <>
          <div className="cui-media-ad-card__rest">
            <p className="cui-media-ad-card__tagline">{tagline}</p>
            <p className="cui-media-ad-card__funnel cui-metrics-card__size">
              {size ? (
                <>
                  <b>{size}</b> {unit}
                  {top && ` · ${top.value}% ${inSentence(top.label)}`}
                </>
              ) : (
                'Size not published'
              )}
            </p>
          </div>
          <div className="cui-media-ad-card__spec">
            <p className="cui-metrics-card__total" data-empty={size ? undefined : ''}>
              <b>{size ?? 'Not published'}</b>
              {size && <span>{totalLabel}</span>}
              {more > 0 && (
                <span className="cui-metrics-card__more">
                  +{more} more<span className="cui-media-ad-card__hidden">{moreLabel}</span>
                </span>
              )}
            </p>
            {shown.length > 0 ? (
              <dl className="cui-metrics-card__bars">
                {shown.map((bar, i) => (
                  <div key={i} className="cui-metrics-card__bar">
                    <dt>{bar.label}</dt>
                    <dd>
                      <span className="cui-progress__track" data-size="compact" aria-hidden="true">
                        <span
                          className="cui-progress__fill cui-metrics-card__fill"
                          style={{ '--cui-metrics-card-bar-w': `${bar.value ?? 0}%`, '--cui-metrics-card-bar-i': i } as CSSProperties}
                        />
                      </span>
                      <span className="cui-metrics-card__value" data-empty={bar.value === undefined ? '' : undefined}>
                        {bar.value === undefined ? <MediaAdEmpty shown="—" spoken="Not on file" /> : `${bar.value}%`}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            ) : (
              <p className="cui-metrics-card__nobars">{emptyLabel}</p>
            )}
          </div>
        </>
      }
      onOpen={onOpen}
      pressed={on}
      pressedAs="added"
      toggleLabel={addLabel}
      toggleKey="a"
      onToggle={toggle}
      tilt={tilt}
      onLiveChange={
        clip
          ? next => {
              live.current = next;
              syncClip();
            }
          : undefined
      }
    />
  );
});

/**
 * The Metrics card while its data loads: the Media Ad Card skeleton with the reserved two-line title row and the taller
 * swap, so it is exactly as tall as a loaded card. Hidden from assistive technology; set `aria-busy` on the grid.
 */
export const MetricsCardSkeleton = forwardRef<HTMLDivElement, WithoutStyling<Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'color'>>>(
  function MetricsCardSkeleton(props, ref) {
    return <MediaAdSkeletonShell {...props} ref={ref} variant="metrics" />;
  },
);
