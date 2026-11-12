'use client';

import {
  forwardRef,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { CaretDown, CaretUp, Check, ExclamationMark, Lock, Minus, Warning, type Icon } from '@phosphor-icons/react';
import type { WithoutStyling } from '../../utils/types';
import { Button } from '../Button';
import { ListFooter } from '../List';

/** An item's status. Leave it out for an item with no status (a neutral dot and a Neutral-3 line). */
export type TimelineStatus = 'completed' | 'current' | 'upcoming' | 'overdue' | 'at-risk' | 'skipped' | 'blocked';

/** One item of the plan. */
export interface TimelineItem {
  /** Unique within the timeline. */
  id: string;
  /** The heading: required, two lines at most (it can't expand, so keep it short). */
  heading: string;
  /** The item's status. Exactly one item is `current`. */
  status?: TimelineStatus;
  /** With no status: draw the dot as a ring instead of a Neutral-5 fill. */
  outlined?: boolean;
  /**
   * The date: above the heading (`datePosition="above"`, the default) or opening the caption (`"below"`). "Due 30 Oct"
   * for an item that isn't done, a plain date once completed or skipped; ranges ("19–23 Oct") stay plain.
   */
  date?: string;
  /** The opposite column's text (`datePosition="opposite"`), usually a date or a range. Repeated for screen readers. */
  opposite?: string;
  /**
   * The status word, in the caption, semibold ("Done", "Overdue", "At risk:", "Blocked:"). Every plain-dot item states
   * its status here or in a Badge in `slot`, never both.
   */
  statusLabel?: string;
  /** The rest of the caption, after the status word ("3 routes", or the at-risk reason). One line. */
  note?: string;
  /** A description, Neutral-5, three lines, then "Show more". */
  description?: string;
  /** Icon dots: the item's icon (Tier 2, drawn Fill). Completed, overdue, at risk, skipped and blocked show a status glyph instead. */
  icon?: Icon;
  /** Avatar dots: Lists' avatar lead (initials, or a photo). */
  avatar?: { initials: string; src?: string };
  /** A Badge, Tag, file chip (`TimelineFile`), avatar, or a Button (static items only). */
  slot?: ReactNode;
  /** Extra content under a "Details" toggle: comments, files, version history. M and L only. */
  details?: ReactNode;
  /** Opens the item: the body is a link. */
  href?: string;
  /** Acts in place: the body is a button. */
  onClick?: () => void;
  /** The selected item of an interactive timeline (Neutral-2 and a 2px Obsidian start bar). */
  selected?: boolean;
  /** Current only: how far along, 0–100. The connector after it is solid that far, then dashed. */
  progress?: number;
  /** Its step number in the whole plan, when the list shows only some items (a filter): "Step 4 of 6" keeps counting. */
  step?: number;
}

type NativeOlProps = WithoutStyling<Omit<HTMLAttributes<HTMLOListElement>, 'children' | 'role'>>;

// The API: items as data; the caption from statusLabel + note; steps, collapsed, loading (decided 2026-11-12, Q-TL-1).
// Empty and error are the host's: an Empty state (section) in place of the list (decided 2026-11-12, Q-TL-2).
export interface TimelineProps extends NativeOlProps {
  /** The items, in order (oldest first for a plan). */
  items: TimelineItem[];
  /** Name it by its visible heading. */
  'aria-labelledby'?: string;
  /** Or name it directly when there is no heading. */
  'aria-label'?: string;
  /** S (plain dots only, caption descriptions), M (default) or L (body1 headings, 32px dots). */
  size?: 'sm' | 'md' | 'lg';
  /** Plain dots (every size), icon dots or avatar dots (M and L). Never mixed in one timeline. Default plain. */
  dot?: 'plain' | 'icon' | 'avatar';
  /** Where the content sits. Alternate needs 600px of the timeline's own width (right below that). Default right. */
  position?: 'right' | 'left' | 'alternate' | 'alternate-reverse';
  /** Horizontal shares a row (about six items at most) from 600px of its own width; vertical below. Default vertical. */
  orientation?: 'vertical' | 'horizontal';
  /** One date place per timeline: above the heading (default), opening the caption, or the opposite column. */
  datePosition?: 'above' | 'below' | 'opposite';
  /** Reads "Step n of total" before each heading. Default on; pass the start and total when one plan spans several lists (grouped by month). */
  steps?: false | { start?: number; total?: number };
  /**
   * Skeleton items while the plan loads: 3–5 of them, `content` (a dot bone and two bars) or `block` (one bar). The
   * list is `aria-busy` and reads "Loading…".
   */
  loading?: { count?: number; style?: 'content' | 'block' };
  /**
   * A partial list: the first `earlier` or the last `later` items start hidden behind a toggle under the list ("Show 5
   * earlier items" / "Hide earlier items", "Show more" / "Show fewer"). Collapse past about 20 items.
   */
  collapsed?: { earlier?: number; later?: number };
  /** The Show more / Show less words. */
  moreLabels?: { collapsed: string; expanded: string };
}

/** The status glyph that replaces an icon dot's icon (and marks an avatar's corner). Bare marks Regular; warning and lock Fill. */
const STATUS_GLYPH: Partial<Record<TimelineStatus, { icon: Icon; weight: 'regular' | 'fill' }>> = {
  completed: { icon: Check, weight: 'regular' },
  overdue: { icon: ExclamationMark, weight: 'regular' },
  'at-risk': { icon: Warning, weight: 'fill' },
  skipped: { icon: Minus, weight: 'regular' },
  blocked: { icon: Lock, weight: 'fill' },
};

/** Screen-reader words for the statuses whose caption usually carries none. */
const SPOKEN_STATUS: Partial<Record<TimelineStatus, string>> = { current: 'current', upcoming: 'upcoming' };

/** A static file chip for an item's slot or details: Input Chip's container, a Tier 2 file icon, no ×. */
export function TimelineFile({ icon: FileIcon, children }: { icon: Icon; children: ReactNode }) {
  return (
    <span className="cui-timeline__file">
      <FileIcon weight="fill" aria-hidden="true" focusable="false" />
      <span>{children}</span>
    </span>
  );
}

function Mark({ item, dot }: { item: TimelineItem; dot: 'plain' | 'icon' | 'avatar' }) {
  const status = item.status ? STATUS_GLYPH[item.status] : undefined;
  if (dot === 'avatar') {
    const badge = item.status ? STATUS_GLYPH[item.status] : undefined;
    return (
      <>
        <span className="cui-list-item__lead" data-type="avatar">
          {item.avatar?.src ? <img src={item.avatar.src} alt="" /> : item.avatar?.initials}
        </span>
        {/* A corner badge only for the statuses with a glyph (decided 2026-11-12, Q-TL-3). */}
        {badge && (
          <span className="cui-timeline__mark cui-timeline__badge">
            <badge.icon weight={badge.weight} focusable="false" />
          </span>
        )}
      </>
    );
  }
  const Glyph = dot === 'icon' ? (status?.icon ?? item.icon) : undefined;
  const weight = status ? status.weight : 'fill';
  return (
    <span className="cui-timeline__mark" data-outlined={!item.status && item.outlined ? '' : undefined}>
      {Glyph && <Glyph weight={weight} focusable="false" />}
    </span>
  );
}

/** A description clamped to three lines, with Show more only when it is actually clipped (re-checked on resize and
 * once fonts load). */
function useDescription(text: string | undefined, labels: { collapsed: string; expanded: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [clipped, setClipped] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const id = useId();
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || expanded) return;
    const check = () => setClipped(el.scrollHeight > el.clientHeight + 1);
    check();
    const ro = new ResizeObserver(check);
    ro.observe(el);
    document.fonts?.ready.then(check).catch(() => {});
    return () => ro.disconnect();
  }, [text, expanded]);
  if (!text) return { node: null, toggle: null };
  return {
    node: (
      <span ref={ref} id={id} className="cui-timeline__desc" data-expanded={expanded ? '' : undefined}>
        {text}
      </span>
    ),
    toggle:
      clipped || expanded ? (
        <span className="cui-timeline__more">
          <Button
            variant="ghost"
            size="sm"
            aria-expanded={expanded}
            aria-controls={id}
            onClick={() => setExpanded(e => !e)}
          >
            {expanded ? labels.expanded : labels.collapsed}
          </Button>
        </span>
      ) : null,
  };
}

function Item({
  item,
  dot,
  datePosition,
  step,
  allowDetails,
  hidden,
  end,
  moreLabels,
}: {
  item: TimelineItem;
  dot: 'plain' | 'icon' | 'avatar';
  datePosition: 'above' | 'below' | 'opposite';
  step?: string;
  allowDetails: boolean;
  hidden: boolean;
  end: boolean;
  moreLabels: { collapsed: string; expanded: string };
}) {
  const detailsId = useId();
  const [open, setOpen] = useState(false);
  const desc = useDescription(item.description, moreLabels);
  const spoken = item.status ? SPOKEN_STATUS[item.status] : undefined;
  const date = datePosition !== 'opposite' ? item.date : undefined;

  const heading = (
    <span className="cui-timeline__heading">
      {step && <span className="cui-timeline__sr">{step}, </span>}
      {item.heading}
    </span>
  );
  const captionParts: ReactNode[] = [];
  if (datePosition === 'below' && date) captionParts.push(<span key="d" className="cui-timeline__date">{date}</span>);
  if (item.statusLabel) captionParts.push(<span key="s" className="cui-timeline__status">{item.statusLabel}</span>);
  const caption =
    captionParts.length || item.note ? (
      <span className="cui-timeline__caption">
        {captionParts.map((part, i) => (
          <span key={i}>
            {i > 0 && ' · '}
            {part}
          </span>
        ))}
        {item.note && (
          <>
            {captionParts.length > 0 && (item.statusLabel?.endsWith(':') ? ' ' : ' · ')}
            {item.note}
          </>
        )}
      </span>
    ) : null;

  const inner = (
    <>
      {datePosition === 'above' && date ? (
        <span className="cui-timeline__title">
          {heading}
          <span className="cui-timeline__sr">, </span>
          <span className="cui-timeline__date">{date}</span>
        </span>
      ) : (
        heading
      )}
      {datePosition === 'opposite' && item.opposite && <span className="cui-timeline__sr">, {item.opposite}</span>}
      {spoken && <span className="cui-timeline__sr">, {spoken}</span>}
      {desc.node}
      {caption && (
        <>
          <span className="cui-timeline__sr">, </span>
          {caption}
        </>
      )}
    </>
  );

  const current = item.selected ? 'true' : undefined;
  const body = item.href ? (
    <a className="cui-timeline__body" href={item.href} aria-current={current}>
      {inner}
    </a>
  ) : item.onClick ? (
    <button type="button" className="cui-timeline__body" onClick={item.onClick} aria-current={current}>
      {inner}
    </button>
  ) : (
    <div className="cui-timeline__body">{inner}</div>
  );

  return (
    <li
      className="cui-timeline__item"
      data-status={item.status}
      data-end={end ? '' : undefined}
      aria-current={item.status === 'current' ? 'step' : undefined}
      hidden={hidden || undefined}
    >
      {datePosition === 'opposite' && (
        <span className="cui-timeline__opposite" aria-hidden="true">
          {item.opposite}
        </span>
      )}
      <span className="cui-timeline__separator" aria-hidden="true">
        <span className="cui-timeline__dot">
          <Mark item={item} dot={dot} />
        </span>
        <span
          className="cui-timeline__connector"
          data-partial={item.status === 'current' && item.progress !== undefined ? '' : undefined}
          style={
            item.status === 'current' && item.progress !== undefined
              ? ({ '--cui-timeline-progress': `${Math.max(0, Math.min(100, item.progress))}%` } as CSSProperties)
              : undefined
          }
        />
      </span>
      <div className="cui-timeline__content">
        {body}
        {desc.toggle}
        {/* A clickable body can't hold interactive slots: the slot sits outside it. */}
        {item.slot && <div className="cui-timeline__slot">{item.slot}</div>}
        {allowDetails && item.details && (
          <>
            <span className="cui-timeline__details-toggle" data-expanded={open ? '' : undefined}>
              <Button
                variant="ghost"
                size="sm"
                aria-expanded={open}
                aria-controls={detailsId}
                onClick={() => setOpen(o => !o)}
              >
                Details<span className="cui-timeline__sr"> for {item.heading}</span>
                <CaretDown className="cui-timeline__details-caret" aria-hidden="true" focusable="false" />
              </Button>
            </span>
            <div id={detailsId} className="cui-timeline__details" hidden={!open}>
              {item.details}
            </div>
          </>
        )}
      </div>
    </li>
  );
}

/**
 * Collabrium Timeline: Stepper's read-only plan variant. An ordered list of items, each with its own status, joined by
 * a line whose colour and dash follow the item above. Plain, icon or avatar dots; S / M / L; the date above, below or
 * opposite; right, left, alternate or horizontal. Only the body is clickable. Ported from components.css `.c-timeline*`
 * (6365–6801).
 */
export const Timeline = forwardRef<HTMLOListElement, TimelineProps>(function Timeline(
  {
    items,
    size = 'md',
    dot = 'plain',
    position = 'right',
    orientation = 'vertical',
    datePosition = 'above',
    steps,
    loading,
    collapsed,
    moreLabels = { collapsed: 'Show more', expanded: 'Show less' },
    ...rest
  },
  ref,
) {
  const listId = useId();
  const [showEarlier, setShowEarlier] = useState(false);
  const [showLater, setShowLater] = useState(false);
  const dotType = size === 'sm' ? 'plain' : dot;

  useEffect(() => {
    if (size === 'sm' && dot !== 'plain') console.warn('Timeline: size "sm" takes plain dots only.');
  }, [size, dot]);

  if (loading) {
    const count = Math.max(3, Math.min(5, loading.count ?? 3));
    return (
      <ol
        {...rest}
        ref={ref}
        className="cui-timeline"
        role="list"
        aria-busy="true"
        data-size={size === 'md' ? undefined : size}
        data-dot={dotType === 'plain' ? undefined : dotType}
      >
        <li className="cui-timeline__sr">Loading…</li>
        {Array.from({ length: count }, (_, i) => (
          <li key={i} className="cui-timeline__item" data-loading="" aria-hidden="true">
            <span className="cui-timeline__separator">
              <span className="cui-timeline__dot">
                <span className="cui-list-item__bone" data-part="lead" data-round="" />
              </span>
              <span className="cui-timeline__connector" />
            </span>
            <div className="cui-timeline__content">
              {loading.style === 'block' ? (
                <span className="cui-timeline__bone" />
              ) : (
                <div className="cui-timeline__body">
                  <span className="cui-list-item__bone" data-part="heading" />
                  <span className="cui-list-item__bone" data-part="line" />
                </div>
              )}
            </div>
          </li>
        ))}
      </ol>
    );
  }

  const earlier = Math.min(collapsed?.earlier ?? 0, items.length);
  const later = Math.min(collapsed?.later ?? 0, items.length - earlier);
  const hiddenAt = (i: number) => (!showEarlier && i < earlier) || (!showLater && i >= items.length - later);
  const visible = items.map((_, i) => !hiddenAt(i));
  const lastVisible = visible.lastIndexOf(true);
  const interactive = items.some(i => i.href || i.onClick);
  const hasDates = datePosition === 'above' && items.some(i => i.date);
  const start = steps === false ? 0 : (steps?.start ?? 1);
  const total = steps === false ? 0 : (steps?.total ?? items.length);

  return (
    <>
      <ol
        {...rest}
        ref={ref}
        id={rest.id ?? listId}
        className="cui-timeline"
        role="list"
        data-size={size === 'md' ? undefined : size}
        data-dot={dotType === 'plain' ? undefined : dotType}
        data-position={position === 'right' ? undefined : position}
        data-orientation={orientation === 'horizontal' ? 'horizontal' : undefined}
        data-opposite={datePosition === 'opposite' ? '' : undefined}
        data-date={hasDates ? 'above' : datePosition === 'below' ? 'below' : undefined}
        data-interactive={interactive ? '' : undefined}
      >
        {items.map((item, i) => (
          <Item
            key={item.id}
            item={item}
            dot={dotType}
            datePosition={datePosition}
            step={steps === false ? undefined : `Step ${item.step ?? start + i} of ${total}`}
            allowDetails={size !== 'sm'}
            hidden={!visible[i]}
            end={i === lastVisible && i !== items.length - 1}
            moreLabels={moreLabels}
          />
        ))}
      </ol>
      {(earlier > 0 || later > 0) && (
        <ListFooter>
          {/* The DS names no icons for the toggles: carets, pointing where the items go (decided 2026-11-12, Q-TL-4). */}
          {earlier > 0 && (
            <span className="cui-timeline__reveal">
              <Button
                variant="ghost"
                size="sm"
                aria-expanded={showEarlier}
                aria-controls={rest.id ?? listId}
                leadingIcon={showEarlier ? CaretDown : CaretUp}
                onClick={() => setShowEarlier(s => !s)}
              >
                {showEarlier ? 'Hide earlier items' : `Show ${earlier} earlier item${earlier === 1 ? '' : 's'}`}
              </Button>
            </span>
          )}
          {later > 0 && (
            <span className="cui-timeline__reveal">
              <Button
                variant="ghost"
                size="sm"
                aria-expanded={showLater}
                aria-controls={rest.id ?? listId}
                leadingIcon={showLater ? CaretUp : CaretDown}
                onClick={() => setShowLater(s => !s)}
              >
                {showLater ? 'Show fewer' : 'Show more'}
              </Button>
            </span>
          )}
        </ListFooter>
      )}
    </>
  );
});
