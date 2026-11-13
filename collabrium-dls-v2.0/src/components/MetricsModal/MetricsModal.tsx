'use client';

import {
  Fragment,
  forwardRef,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
  type RefObject,
} from 'react';
import { createPortal } from 'react-dom';
import { ArrowClockwise, Check, CompassTool, Plus } from '@phosphor-icons/react';
import type { WithoutStyling } from '../../utils/types';
import { Button } from '../Button';
import { InputChipGroup } from '../Chip';
import { MediaAdEmpty, mediaAdPlaceholder } from '../MediaAdCard/MediaAdCard';
import { MediaAdHead, MediaAdRelated } from '../MediaAdModal/MediaAdModal';
import { reducedMotion, useMediaAdLayer } from '../MediaAdModal/useMediaAdLayer';
import type { MetricsBar } from '../MetricsCard';
import { Tag, type TagVariant } from '../Tag';

/** A platform the audience lives on, and what they read there. */
export interface MetricsModalPlace {
  /** The platform's name ("SYOK"). */
  name: string;
  /** Its categories, joined by ", " ("Music & Radio Streaming", "Podcast"). */
  categories: string[];
}

/** One "Also see" item. */
export interface MetricsModalRelated {
  /** Passed back to `onRelatedSelect`. */
  id: string;
  /** Its name. Truncates on the tile; the full name is the button's tooltip. */
  name: string;
  /** Its category, on the meta line. */
  category: string;
  /** Its headline size, already formatted ("14M"). */
  size?: string;
  /** Its thumbnail, stretched to 16:10. Leave out for the neutral placeholder. */
  media?: ReactNode;
}

/** One item, as the modal shows it. The vocabulary is Metrics card's. */
export interface MetricsModalItem {
  /** Unique within the list. A new id is a swap: the body resets, the bars re-grow, focus moves to the new title. */
  id: string;
  /** The item's name: the title (an h3) and the breadcrumb. */
  name: string;
  /** The category, shown as the Tag. */
  category: string;
  /** The category Tag's colour. For audiences, use `audienceCategoryTags`. Never a department. */
  categoryTag: TagVariant;
  /** One or two sentences about the item. Describes the dialog. */
  tagline: string;
  /** The headline figure, already formatted ("17M"). Leave out when not published. */
  size?: string;
  /** Where the size comes from, after the size label ("published by KULT"). */
  sizeNote?: string;
  /** The breakdown, every bar in your order (never sorted), each 0–100. A bar with no value keeps its row. */
  bars: MetricsBar[];
  /** Where they live: one row per platform, in your order. */
  places: MetricsModalPlace[];
  /** What they read about. Leave out or pass `[]` and the section is left out. */
  reads?: string[];
  /** Up to three related items, for "Also see". Leave out or pass `[]` and the section is left out. */
  related?: MetricsModalRelated[];
  /** The still: your image, stretched to the 16:10 slot. Leave out for the neutral placeholder. */
  media?: ReactNode;
  /** A short clip (a video URL). It plays once on open and on every swap, holds its last frame, and Replay plays it again. Never under reduced motion. */
  clip?: string;
}

/** Every data-specific string, so the modal can serve audiences, influencers, channels or campaigns. */
export interface MetricsModalLabels {
  /** The breadcrumb's root ("Audiences"). */
  crumbRoot: string;
  /** The previous button's name ("Previous audience"). */
  previous: string;
  /** The next button's name ("Next audience"). */
  next: string;
  /** Under the headline figure ("Audience size"). */
  size: string;
  /** Read after a related item's size ("audience": ", 14M audience"). */
  unit: string;
  /** Section headings: "Media consumption", "Where they live", "What they read about", "Also see". */
  breakdown: string;
  places: string;
  reads: string;
  related: string;
  /** The Add toggle's fixed label ("Add to reach tray"). The item's name follows for screen readers. */
  add: string;
  /** The Primary. Default "Use in a media plan". */
  plan?: string;
  /** No headline size. Default "Not published". */
  notPublished?: string;
  /** No bars. Default "No breakdown on file". */
  noBreakdown?: string;
  /** No platforms. Default "No platforms on file". */
  noPlaces?: string;
}

type NativeDivProps = WithoutStyling<Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'title' | 'role'>>;

// The API: item data, host strings in `labels`, a host-owned list, `cardFor`, `keepLive` (decided 2026-11-12, Q-MMOD-3).
export interface MetricsModalProps extends NativeDivProps {
  /** Whether the modal is open. */
  open: boolean;
  /** Called on Close, Escape or a click on the scrim. Set `open` to false in it. */
  onClose: () => void;
  /** The item shown. Change it to step to another; the modal stays open. */
  item: MetricsModalItem;
  /** The host's strings. */
  labels: MetricsModalLabels;
  /** Step to the previous item, wrapping at the start. Also ←. Leave out both for a one-item list. */
  onPrevious?: () => void;
  /** Step to the next item, wrapping at the end. Also →. */
  onNext?: () => void;
  /** An "Also see" tile was chosen: show that item (set `item`). */
  onRelatedSelect: (id: string) => void;
  /** Whether the item is added. Keep it in step with the card's Add. */
  added: boolean;
  /** Called with the new state when Add is pressed. */
  onAddedChange: (added: boolean) => void;
  /** The Primary: leaves for the planner (navigate in your handler). */
  onPlan: () => void;
  /**
   * The list card for an item, if it is on the page. Closing returns focus to the card for the item now showing (then
   * the last list card shown, then the opener), scrolls it into view, and folds back into the first of those on screen.
   */
  cardFor?: (id: string) => HTMLElement | null | undefined;
  /** The card it swings out of. Default: the card around the element that had focus when it opened. */
  origin?: RefObject<HTMLElement | null>;
  /** Children of `<body>` to keep usable while the page is held (a Toast host). */
  keepLive?: RefObject<HTMLElement | null>[];
}

/** The media: the still, and the clip over it while it plays and after it ends. */
function Media({ item, closing }: { item: MetricsModalItem; closing: boolean }) {
  const clip = useRef<HTMLVideoElement>(null);
  const [state, setState] = useState<'rest' | 'playing' | 'ended'>('rest');
  const play = () => {
    const v = clip.current;
    if (!v || reducedMotion()) return;
    v.currentTime = 0;
    v.play().catch(() => setState('rest'));
  };
  // Plays once when it appears (on open and on every swap: the media is new each time).
  useEffect(() => {
    if (item.clip) play();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // On close: pause first (so no `ended` fires), then rewind.
  useEffect(() => {
    const v = clip.current;
    if (!closing || !v) return;
    v.pause();
    v.currentTime = 0;
    setState('rest');
  }, [closing]);
  return (
    <div className="cui-media-ad-modal__frame">
      <div className="cui-media-ad-modal__slot">
        {item.media ?? mediaAdPlaceholder}
        {item.clip && (
          <video
            ref={clip}
            className="cui-metrics-modal__clip"
            src={item.clip}
            muted
            playsInline
            preload="none"
            aria-hidden="true"
            data-state={state === 'rest' ? undefined : state}
            onPlaying={() => setState('playing')}
            onPause={() => setState(s => (s === 'ended' ? s : 'rest'))}
            onEnded={() => setState('ended')}
          />
        )}
      </div>
      {item.clip && (
        <span className="cui-media-ad-modal__replay">
          <Button variant="secondary" size="sm" leadingIcon={ArrowClockwise} onClick={play}>
            Replay
          </Button>
        </span>
      )}
    </div>
  );
}

/** The breakdown: every bar, growing in (staggered) on open and on every swap. */
function Bars({ bars }: { bars: MetricsBar[] }) {
  const [grown, setGrown] = useState(false);
  useEffect(() => {
    const raf = requestAnimationFrame(() => requestAnimationFrame(() => setGrown(true)));
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <dl className="cui-metrics-modal__bars" data-reset={grown ? undefined : ''}>
      {bars.map((bar, i) => (
        <div key={i} className="cui-metrics-modal__bar">
          <dt>{bar.label}</dt>
          <dd>
            <span className="cui-progress__track" data-size="default" aria-hidden="true">
              <span
                className="cui-progress__fill cui-metrics-modal__fill"
                style={{ '--cui-metrics-modal-bar-w': `${bar.value ?? 0}%`, '--cui-metrics-modal-bar-i': i } as CSSProperties}
              />
            </span>
            <span className="cui-metrics-modal__value" data-empty={bar.value === undefined ? '' : undefined}>
              {bar.value === undefined ? <MediaAdEmpty shown="—" spoken="Not on file" /> : `${bar.value}%`}
            </span>
          </dd>
        </div>
      ))}
    </dl>
  );
}

type PanelProps = Omit<MetricsModalProps, 'open' | 'origin' | 'cardFor' | 'keepLive'> & {
  titleRef?: RefObject<HTMLHeadingElement | null>;
  closeRef?: RefObject<HTMLButtonElement | null>;
  bodyRef?: RefObject<HTMLDivElement | null>;
  closing?: boolean;
  'aria-modal'?: 'true' | 'false';
  'data-swing'?: string;
  inert?: boolean;
};

/**
 * The panel itself. Internal: MetricsModal renders it in its layer; the docs render it on a stage, as the DLS gallery
 * does. Not exported from the package.
 */
export const MetricsModalPanel = forwardRef<HTMLDivElement, PanelProps>(function MetricsModalPanel(
  {
    item,
    labels,
    onClose,
    onPrevious,
    onNext,
    onRelatedSelect,
    added,
    onAddedChange,
    onPlan,
    titleRef,
    closeRef,
    bodyRef,
    closing = false,
    ...rest
  },
  ref,
) {
  const uid = useId();
  const titleId = `${uid}-title`;
  const taglineId = `${uid}-tagline`;
  const sizeId = `${uid}-size`;
  const reads = item.reads ?? [];
  const related = (item.related ?? []).slice(0, 3);
  // No size: "Not published" over the size label alone, without the source note (decided 2026-11-12, Q-MMOD-4).
  const sizeLabel = item.size && item.sizeNote ? `${labels.size} · ${item.sizeNote}` : labels.size;

  return (
    <div
      {...rest}
      ref={ref}
      className="cui-modal cui-media-ad-modal cui-metrics-modal"
      role="dialog"
      aria-labelledby={titleId}
      aria-describedby={`${taglineId} ${sizeId}`}
    >
      <MediaAdHead
        crumbRoot={labels.crumbRoot}
        name={item.name}
        previousLabel={labels.previous}
        nextLabel={labels.next}
        onPrevious={onPrevious}
        onNext={onNext}
        onClose={onClose}
        closeRef={closeRef}
      />

      <div ref={bodyRef} className="cui-modal__body">
        <Fragment key={item.id}>
          <div className="cui-metrics-modal__cols">
            <div className="cui-metrics-modal__side">
              <Media item={item} closing={closing} />
              <p id={sizeId} className="cui-metrics-modal__size" data-empty={item.size ? undefined : ''}>
                <b>{item.size ?? labels.notPublished ?? 'Not published'}</b>
                <span className="cui-media-ad-modal__sr">, </span>
                <span>{sizeLabel}</span>
              </p>
            </div>

            <div className="cui-metrics-modal__main">
              <div className="cui-media-ad-modal__titlerow">
                <h3 ref={titleRef} id={titleId} className="cui-media-ad-modal__title" tabIndex={-1}>
                  {item.name}
                </h3>
                <Tag variant={item.categoryTag}>{item.category}</Tag>
              </div>
              <p id={taglineId} className="cui-media-ad-modal__tagline">
                {item.tagline}
              </p>

              <div className="cui-media-ad-modal__section">
                <h4 className="cui-media-ad-modal__section-title">{labels.breakdown}</h4>
                {item.bars.length ? (
                  <Bars bars={item.bars} />
                ) : (
                  <p className="cui-media-ad-modal__note">{labels.noBreakdown ?? 'No breakdown on file'}</p>
                )}
              </div>

              <div className="cui-media-ad-modal__section">
                <h4 className="cui-media-ad-modal__section-title">{labels.places}</h4>
                {item.places.length ? (
                  <dl className="cui-metrics-modal__places">
                    {item.places.map(place => (
                      <div key={place.name} className="cui-metrics-modal__place">
                        <dt>{place.name}</dt>
                        <dd>{place.categories.join(', ')}</dd>
                      </div>
                    ))}
                  </dl>
                ) : (
                  <p className="cui-media-ad-modal__note">{labels.noPlaces ?? 'No platforms on file'}</p>
                )}
              </div>

              {reads.length > 0 && (
                <div className="cui-media-ad-modal__section">
                  <h4 className="cui-media-ad-modal__section-title">{labels.reads}</h4>
                  <InputChipGroup
                    aria-label={labels.reads}
                    chips={reads.map(label => ({ id: label, label }))}
                    maxVisible={reads.length}
                  />
                </div>
              )}

              {related.length > 0 && (
                <div className="cui-media-ad-modal__section">
                  <h4 className="cui-media-ad-modal__section-title">{labels.related}</h4>
                  <MediaAdRelated
                    items={related.map(r => ({
                      id: r.id,
                      name: r.name,
                      media: r.media,
                      spoken: `, ${r.category}${r.size ? `, ${r.size} ${labels.unit}` : ''}. Show details`,
                      meta: r.size ? `${r.size} · ${r.category}` : r.category,
                    }))}
                    onSelect={onRelatedSelect}
                  />
                </div>
              )}
            </div>
          </div>
        </Fragment>
      </div>

      <div className="cui-modal__foot">
        <Button
          variant="ghost"
          leadingIcon={added ? Check : Plus}
          aria-pressed={added}
          onClick={() => onAddedChange(!added)}
        >
          {labels.add}
          <span className="cui-media-ad-modal__sr">: {item.name}</span>
        </Button>
        <Button variant="primary" leadingIcon={CompassTool} onClick={onPlan}>
          {labels.plan ?? 'Use in a media plan'}
        </Button>
      </div>
    </div>
  );
});

/**
 * Collabrium Metrics modal: the detail view a Metrics card opens into, as Media Ad Modal is Media Ad Card's. One item
 * at a time: media and a headline size on the side; the title and category Tag, the tagline, every bar of the
 * breakdown, where the audience lives, what it reads about, and related items. Previous and next step through the
 * list. A modifier on Media Ad Modal: the same layer, scrim, swing, head and footer. Ported from components.css
 * `.c-modal-media-ad-metrics*` (2264–2459).
 */
export const MetricsModal = forwardRef<HTMLDivElement, MetricsModalProps>(function MetricsModal(
  {
    open,
    onClose,
    item,
    labels,
    onPrevious,
    onNext,
    onRelatedSelect,
    added,
    onAddedChange,
    onPlan,
    cardFor,
    origin,
    keepLive,
    ...rest
  },
  ref,
) {
  // Opens on the title, as this DS section says (the heading rule); Media Ad Modal opens on Close. The split is kept
  // and the family question is the DLS's Needs Input (decided 2026-11-12, Q-MMOD-1).
  const layer = useMediaAdLayer({
    open,
    onClose,
    itemId: item.id,
    onPrevious,
    onNext,
    origin,
    initialFocus: 'title',
    cardFor,
    keepLive,
  });

  if (!layer.mounted || typeof document === 'undefined') return null;

  return createPortal(
    <div
      ref={layer.layerRef}
      className="cui-media-ad-modal-layer"
      data-shown={layer.shown ? '' : undefined}
      data-closing={layer.closing ? '' : undefined}
    >
      <div className="cui-media-ad-modal-layer__scrim" aria-hidden="true" onClick={onClose} />
      <MetricsModalPanel
        {...rest}
        ref={node => {
          layer.panelRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        titleRef={layer.titleRef}
        closeRef={layer.closeRef}
        bodyRef={layer.bodyRef}
        closing={layer.closing}
        item={item}
        labels={labels}
        onClose={onClose}
        onPrevious={onPrevious}
        onNext={onNext}
        onRelatedSelect={onRelatedSelect}
        added={added}
        onAddedChange={onAddedChange}
        onPlan={onPlan}
        aria-modal="true"
        data-swing={layer.swing}
        inert={layer.closing || undefined}
        onKeyDown={layer.trap}
        onAnimationEnd={layer.onAnimationEnd}
      />
    </div>,
    document.body,
  );
});
