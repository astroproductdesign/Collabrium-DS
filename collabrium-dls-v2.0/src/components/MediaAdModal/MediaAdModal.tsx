'use client';

import {
  Fragment,
  forwardRef,
  useId,
  type HTMLAttributes,
  type ReactNode,
  type RefObject,
} from 'react';
import { createPortal } from 'react-dom';
import {
  ArrowClockwise,
  ArrowLeft,
  ArrowRight,
  ArrowSquareOut,
  CaretRight,
  Check,
  CompassTool,
  Plus,
  X,
} from '@phosphor-icons/react';
import type { WithoutStyling } from '../../utils/types';
import { Button } from '../Button';
import { InputChipGroup } from '../Chip';
import { InfoBanner } from '../InfoBanner';
import { FAMILIES, mediaAdPlaceholder, type MediaAdFamily } from '../MediaAdCard/MediaAdCard';
import { ProgressBar } from '../ProgressBar';
import { Tag } from '../Tag';
import { useMediaAdLayer } from './useMediaAdLayer';

/** A published benchmark: "CTR 0.62%" against "a 1.00% ceiling". Both are percentages. */
export interface MediaAdBenchmark {
  /** The metric's short name ("CTR"). */
  metric: string;
  /** The value, in percent (0.62 for 0.62%). */
  value: number;
  /** The ceiling the bar is measured against, in percent (1 for 1.00%). */
  ceiling: number;
}

/** One "Also consider" format. */
export interface MediaAdRelated {
  /** Passed back to `onRelatedSelect`. */
  id: string;
  /** The format's name. Truncates on the tile; the full name is the button's tooltip. */
  name: string;
  /** Its family, read out after the name. */
  family: MediaAdFamily;
  /** Its thumbnail, stretched to 16:10. Leave out for the neutral placeholder. */
  media?: ReactNode;
}

/** One ad format, as the modal shows it. The vocabulary is Media Ad Card's. */
export interface MediaAdFormat {
  /** Unique within the list. A new id is a swap: the body resets to the top and focus moves to the new title. */
  id: string;
  /** The format's name: the title (an h3) and the breadcrumb. */
  name: string;
  /** The family, shown as its Tag beside the title. */
  family: MediaAdFamily;
  /** One sentence on what it is. Required; it describes the dialog. */
  tagline: string;
  /** A longer description, under the tagline. Optional. */
  description?: string;
  /** Spec cell "Objective". Missing: "Not on file". */
  objective?: string;
  /** Spec cell "Runs on", one entry per surface, joined by " · ". Missing: "Not on file". */
  runsOn?: string[];
  /** Spec cell "Best for". Missing: "Not on file". */
  bestFor?: string;
  /** Spec cell "Funnel", the stages in order, joined by " · ". Missing: "Not on file". */
  funnel?: string[];
  /** Spec cell "CPM on file" ("RM 38.00"). Missing: "Not on file — ask Sales". */
  cpm?: string;
  /** Spec cell "Monthly inventory" ("12M impressions"). Missing: "Not on file". */
  inventory?: string;
  /**
   * Shows the neutral catalogue note ("Standard display unit…") for a unit with no gallery page of its own.
   * Default false.
   */
  catalogueNote?: boolean;
  /** Supported sizes, "W×H" ("300×250"), drawn to one shared scale; anything else ("16:9 in-content") is a text chip. */
  sizes?: string[];
  /** The published benchmark. Leave out when there is none: the section says so. */
  benchmark?: MediaAdBenchmark;
  /** Industries it has run for. Leave out or pass `[]` and the section is left out. */
  industries?: string[];
  /** Up to three related formats, for "Also consider". */
  related?: MediaAdRelated[];
  /** The media: your image, video or preview, stretched to the 16:10 slot. Leave out for the neutral placeholder. */
  media?: ReactNode;
}

/** The Live demo button: an action, or switched off with the reason (it stays focusable and reads the reason). */
export type MediaAdLiveDemo = { onClick: () => void; offReason?: never } | { offReason: string; onClick?: never };

type NativeDivProps = WithoutStyling<Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'title' | 'role'>>;

// The API: format data, a host-owned list and wrapping, the liveDemo union, onPlan, origin (decided 2026-11-12, Q-MAD-3).
export interface MediaAdModalProps extends NativeDivProps {
  /** Whether the modal is open. */
  open: boolean;
  /** Called on Close, Escape or a click on the scrim. Set `open` to false in it. */
  onClose: () => void;
  /** The format shown. Change it to step to another; the modal stays open. */
  format: MediaAdFormat;
  /**
   * Step to the previous format in the list the card came from, wrapping at the start. Also the ← key. Leave out
   * `onPrevious` and `onNext` when the list has one item: the arrows are hidden.
   */
  onPrevious?: () => void;
  /** Step to the next format, wrapping at the end. Also the → key. */
  onNext?: () => void;
  /** An "Also consider" tile was chosen: show that format (set `format`). */
  onRelatedSelect: (id: string) => void;
  /** Whether the format is in the comparison. Keep it in step with the card's own Compare. */
  compared: boolean;
  /** Called with the new state when Compare is pressed. */
  onComparedChange: (compared: boolean) => void;
  /** The Live demo button: `{ onClick }`, or `{ offReason }` to switch it off with the reason. */
  liveDemo: MediaAdLiveDemo;
  /** "Use in a media plan": leaves for the planner (navigate in your handler). */
  onPlan: () => void;
  /** Shows Replay over the media, for media that can play again. Leave out when the slot holds a still. */
  onReplay?: () => void;
  /**
   * The card the modal swings out of and folds back into. Default: the card around the element that had focus when
   * the modal opened. With none (or under reduced motion) the modal fades.
   */
  origin?: RefObject<HTMLElement | null>;
}

/*
  Supported sizes: one shared scale, fitted so the widest size fits 96px and the tallest 64px; a box whose short side
  would be thinner than 6px grows evenly to 6px. Recorded one-off values in DESIGN-SYSTEM.md (Media Ad Modal).
*/
const SAMPLE_W = 96;
const SAMPLE_H = 64;
const SAMPLE_MIN = 6;
const DIMENSIONS = /^\s*(\d+(?:\.\d+)?)\s*[×xX]\s*(\d+(?:\.\d+)?)\s*$/;

type SizeItem = { label: string; box?: { w: number; h: number; width: number; height: number } };

function sizeItems(sizes: string[]): SizeItem[] {
  const parsed = sizes.map(label => {
    const m = DIMENSIONS.exec(label);
    return { label, dims: m ? { w: Number(m[1]), h: Number(m[2]) } : undefined };
  });
  const boxes = parsed.flatMap(p => (p.dims ? [p.dims] : []));
  const scale = boxes.length
    ? Math.min(SAMPLE_W / Math.max(...boxes.map(b => b.w)), SAMPLE_H / Math.max(...boxes.map(b => b.h)))
    : 1;
  return parsed.map(({ label, dims }) => {
    if (!dims) return { label };
    let width = dims.w * scale;
    let height = dims.h * scale;
    const short = Math.min(width, height);
    if (short < SAMPLE_MIN) {
      width *= SAMPLE_MIN / short;
      height *= SAMPLE_MIN / short;
    }
    return { label, box: { w: dims.w, h: dims.h, width: Math.round(width), height: Math.round(height) } };
  });
}

const pct = (n: number) => `${n.toFixed(2)}%`;

/** The head the family shares: breadcrumb ("{root} › {name}"), previous / next (hidden for a one-item list) and Close. Internal. */
export function MediaAdHead({
  crumbRoot,
  name,
  previousLabel,
  nextLabel,
  onPrevious,
  onNext,
  onClose,
  closeRef,
}: {
  crumbRoot: string;
  name: string;
  previousLabel: string;
  nextLabel: string;
  onPrevious?: () => void;
  onNext?: () => void;
  onClose: () => void;
  closeRef?: RefObject<HTMLButtonElement | null>;
}) {
  return (
    <div className="cui-modal__head">
      <p className="cui-media-ad-modal__crumbs">
        <span className="cui-media-ad-modal__crumbs-parent">{crumbRoot}</span>
        <CaretRight aria-hidden="true" focusable="false" />
        <b className="cui-media-ad-modal__crumbs-current">{name}</b>
      </p>
      {onPrevious && onNext && (
        <div className="cui-media-ad-modal__nav">
          <Button
            variant="ghost"
            size="sm"
            iconOnly
            icon={ArrowLeft}
            aria-label={previousLabel}
            aria-keyshortcuts="ArrowLeft"
            title="Previous (←)"
            onClick={onPrevious}
          />
          <Button
            variant="ghost"
            size="sm"
            iconOnly
            icon={ArrowRight}
            aria-label={nextLabel}
            aria-keyshortcuts="ArrowRight"
            title="Next (→)"
            onClick={onNext}
          />
        </div>
      )}
      <Button ref={closeRef} variant="ghost" size="sm" iconOnly icon={X} aria-label="Close" onClick={onClose} />
    </div>
  );
}

/** The related tiles the family shares: a real button per item, the full name as its tooltip. Internal. */
export function MediaAdRelated({
  items,
  onSelect,
}: {
  items: { id: string; name: string; media?: ReactNode; spoken: string; meta?: string }[];
  onSelect: (id: string) => void;
}) {
  return (
    <ul className="cui-media-ad-modal__related" role="list">
      {items.map(r => (
        <li key={r.id}>
          <button type="button" className="cui-media-ad-modal__relcard" title={r.name} onClick={() => onSelect(r.id)}>
            <span className="cui-media-ad-modal__relthumb">{r.media ?? mediaAdPlaceholder}</span>
            <span className="cui-media-ad-modal__relname">
              {r.name}
              <span className="cui-media-ad-modal__sr">{r.spoken}</span>
            </span>
            {r.meta && (
              <span className="cui-metrics-modal__relmeta" aria-hidden="true">
                {r.meta}
              </span>
            )}
          </button>
        </li>
      ))}
    </ul>
  );
}

type PanelProps = Omit<MediaAdModalProps, 'open' | 'origin'> & {
  titleRef?: RefObject<HTMLHeadingElement | null>;
  closeRef?: RefObject<HTMLButtonElement | null>;
  bodyRef?: RefObject<HTMLDivElement | null>;
  'aria-modal'?: 'true' | 'false';
  'data-swing'?: string;
  inert?: boolean;
  onAnimationEnd?: HTMLAttributes<HTMLDivElement>['onAnimationEnd'];
};

/**
 * The panel itself: head, body and footer. Internal: MediaAdModal renders it in its layer; the docs render it on a
 * stage, as the DLS gallery does. Not exported from the package.
 */
export const MediaAdModalPanel = forwardRef<HTMLDivElement, PanelProps>(function MediaAdModalPanel(
  {
    format,
    onClose,
    onPrevious,
    onNext,
    onRelatedSelect,
    compared,
    onComparedChange,
    liveDemo,
    onPlan,
    onReplay,
    titleRef,
    closeRef,
    bodyRef,
    ...rest
  },
  ref,
) {
  const uid = useId();
  const titleId = `${uid}-title`;
  const taglineId = `${uid}-tagline`;
  const demoOffId = `${uid}-demo-off`;
  const family = FAMILIES[format.family];
  const join = (list?: string[]) => (list && list.length ? list.join(' · ') : undefined);
  const specs: [string, string | undefined, string][] = [
    ['Objective', format.objective, 'Not on file'],
    ['Runs on', join(format.runsOn), 'Not on file'],
    ['Best for', format.bestFor, 'Not on file'],
    ['Funnel', join(format.funnel), 'Not on file'],
    ['CPM on file', format.cpm, 'Not on file — ask Sales'],
    ['Monthly inventory', format.inventory, 'Not on file'],
  ];
  const sizes = sizeItems(format.sizes ?? []);
  const bench = format.benchmark;
  const related = (format.related ?? []).slice(0, 3);

  return (
    <div
      {...rest}
      ref={ref}
      className="cui-modal cui-media-ad-modal"
      role="dialog"
      aria-labelledby={titleId}
      aria-describedby={taglineId}
    >
      <MediaAdHead
        crumbRoot="Ad formats"
        name={format.name}
        previousLabel="Previous format"
        nextLabel="Next format"
        onPrevious={onPrevious}
        onNext={onNext}
        onClose={onClose}
        closeRef={closeRef}
      />

      <div ref={bodyRef} className="cui-modal__body">
        <Fragment key={format.id}>
          <div className="cui-media-ad-modal__frame">
            <div className="cui-media-ad-modal__slot">{format.media ?? mediaAdPlaceholder}</div>
            {onReplay && (
              <span className="cui-media-ad-modal__replay">
                {/* "Replay" with arrow-clockwise, as the gallery's other replays (decided 2026-11-12, Q-MAD-5). */}
                <Button variant="secondary" size="sm" leadingIcon={ArrowClockwise} onClick={onReplay}>
                  Replay
                </Button>
              </span>
            )}
          </div>

          <div className="cui-media-ad-modal__titlerow">
            <h3 ref={titleRef} id={titleId} className="cui-media-ad-modal__title" tabIndex={-1}>
              {format.name}
            </h3>
            <Tag variant={family.tag}>{family.label}</Tag>
          </div>
          <p id={taglineId} className="cui-media-ad-modal__tagline">
            {format.tagline}
          </p>
          {format.description && <p className="cui-media-ad-modal__desc">{format.description}</p>}

          <dl className="cui-media-ad-modal__specs">
            {specs.map(([label, value, empty]) => (
              <div key={label} className="cui-media-ad-modal__spec">
                <dt>{label}</dt>
                <dd data-empty={value ? undefined : ''}>{value ?? empty}</dd>
              </div>
            ))}
          </dl>

          {format.catalogueNote && (
            <div className="cui-media-ad-modal__note-banner">
              <InfoBanner tone="neutral">
                Standard display unit. Copy and sizes here are catalogue defaults — verify before quoting.
              </InfoBanner>
            </div>
          )}

          <div className="cui-media-ad-modal__section">
            <h4 className="cui-media-ad-modal__section-title">
              Supported sizes
            </h4>
            {sizes.length ? (
              <ul className="cui-media-ad-modal__sizes" role="list">
                {sizes.map(s => (
                  <li key={s.label} className="cui-media-ad-modal__size">
                    {s.box ? (
                      <>
                        <span
                          className="cui-media-ad-modal__size-box"
                          aria-hidden="true"
                          style={{ width: `${s.box.width}px`, height: `${s.box.height}px` }}
                        />
                        <span className="cui-media-ad-modal__size-label">
                          <span aria-hidden="true">{s.label}</span>
                          <span className="cui-media-ad-modal__sr">
                            {s.box.w} by {s.box.h} pixels
                          </span>
                        </span>
                      </>
                    ) : (
                      <span className="cui-media-ad-modal__size-chip">{s.label}</span>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="cui-media-ad-modal__note">No fixed size — this unit is built to the placement.</p>
            )}
          </div>

          <div className="cui-media-ad-modal__section">
            <h4 className="cui-media-ad-modal__section-title">
              Benchmark
            </h4>
            {bench ? (
              <div className="cui-media-ad-modal__bench">
                <p className="cui-media-ad-modal__bench-value">
                  <b>
                    {bench.metric} {pct(bench.value)}
                  </b>
                  <span>of a {pct(bench.ceiling)} ceiling</span>
                </p>
                <ProgressBar
                  aria-hidden="true"
                  value={bench.ceiling > 0 ? (bench.value / bench.ceiling) * 100 : 0}
                  tone="success"
                  labelPlacement="none"
                />
              </div>
            ) : (
              <p className="cui-media-ad-modal__note">
                No benchmark has been published for this unit. Ask Sales for recent campaign numbers before quoting
                one.
              </p>
            )}
          </div>

          {format.industries && format.industries.length > 0 && (
            <div className="cui-media-ad-modal__section">
              <h4 className="cui-media-ad-modal__section-title">
                Industries it has run for
              </h4>
              <InputChipGroup
                aria-label="Industries"
                chips={format.industries.map(label => ({ id: label, label }))}
                maxVisible={format.industries.length}
              />
            </div>
          )}

          {related.length > 0 && (
            <div className="cui-media-ad-modal__section">
              <h4 className="cui-media-ad-modal__section-title">
                Also consider
              </h4>
              <MediaAdRelated
                items={related.map(r => ({ id: r.id, name: r.name, media: r.media, spoken: `, ${FAMILIES[r.family].label}. Show details` }))}
                onSelect={onRelatedSelect}
              />
            </div>
          )}
        </Fragment>
      </div>

      <div className="cui-modal__foot">
        <Button
          variant="ghost"
          leadingIcon={compared ? Check : Plus}
          aria-pressed={compared}
          onClick={() => onComparedChange(!compared)}
        >
          Compare<span className="cui-media-ad-modal__sr"> {format.name}</span>
        </Button>
        {liveDemo.offReason ? (
          <>
            <Button
              variant="secondary"
              leadingIcon={ArrowSquareOut}
              aria-disabled="true"
              aria-describedby={demoOffId}
              title={liveDemo.offReason}
            >
              Live demo
            </Button>
            <span className="cui-media-ad-modal__sr" id={demoOffId}>
              {liveDemo.offReason}
            </span>
          </>
        ) : (
          <Button variant="secondary" leadingIcon={ArrowSquareOut} onClick={liveDemo.onClick}>
            Live demo
          </Button>
        )}
        {/* A Button with onPlan: Button has no link form, so the host navigates (decided 2026-11-12, Q-MAD-2). */}
        <Button variant="primary" leadingIcon={CompassTool} onClick={onPlan}>
          Use in a media plan
        </Button>
      </div>
    </div>
  );
});

/**
 * Collabrium Media Ad Modal: the detail view a Media Ad Card opens into. One ad format at a time (media, name and
 * family, tagline, six spec cells, supported sizes, benchmark, industries, "Also consider") with Compare, Live demo
 * and "Use in a media plan". Previous and next step through the list without closing. A variant of Modal: its panel,
 * scrim and footer order; swings out of the card that opened it; holds the page still. Ported from components.css
 * `.c-modal-media-ad*` (2033–2259).
 */
export const MediaAdModal = forwardRef<HTMLDivElement, MediaAdModalProps>(function MediaAdModal(
  {
    open,
    onClose,
    format,
    onPrevious,
    onNext,
    onRelatedSelect,
    compared,
    onComparedChange,
    liveDemo,
    onPlan,
    onReplay,
    origin,
    ...rest
  },
  ref,
) {
  const layer = useMediaAdLayer({ open, onClose, itemId: format.id, onPrevious, onNext, origin, initialFocus: 'close' });

  if (!layer.mounted || typeof document === 'undefined') return null;

  return createPortal(
    <div
      ref={layer.layerRef}
      className="cui-media-ad-modal-layer"
      data-shown={layer.shown ? '' : undefined}
      data-closing={layer.closing ? '' : undefined}
    >
      <div className="cui-media-ad-modal-layer__scrim" aria-hidden="true" onClick={onClose} />
      <MediaAdModalPanel
        {...rest}
        ref={node => {
          layer.panelRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        titleRef={layer.titleRef}
        closeRef={layer.closeRef}
        bodyRef={layer.bodyRef}
        format={format}
        onClose={onClose}
        onPrevious={onPrevious}
        onNext={onNext}
        onRelatedSelect={onRelatedSelect}
        compared={compared}
        onComparedChange={onComparedChange}
        liveDemo={liveDemo}
        onPlan={onPlan}
        onReplay={onReplay}
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
