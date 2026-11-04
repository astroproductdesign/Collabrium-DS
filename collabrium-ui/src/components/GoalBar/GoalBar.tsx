'use client';

import { forwardRef, useLayoutEffect, useRef, useState, type HTMLAttributes } from 'react';
import type { WithoutStyling } from '../../utils/types';
import type { CardHeadingLevel } from '../Card';

/**
 * A segment colour: the Chart color mapping walk (the five departments, then the Purple and Turquoise reserve),
 * Obsidian for a single value, and Neutral-4 for overflow. Never a free colour string.
 */
export type GoalBarColor = 'orange' | 'salmon-pink' | 'green' | 'navy' | 'amber' | 'purple' | 'turquoise' | 'obsidian' | 'neutral-4';

/** One category of the total. */
export interface GoalBarCategory {
  /** The category's name, shown in the legend. */
  label: string;
  /** Its value, in the bar's unit. */
  value: number;
  /** Overrides the colour the walk would give it. */
  color?: GoalBarColor;
}

type NativeDivProps = WithoutStyling<Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'color' | 'title'>>;

interface GoalBarBaseProps extends NativeDivProps {
  /** The named target. It sits at 75% of the track; the rest is headroom. */
  target: number;
  /**
   * `card`: in its own Card-style container, with a heading. `chart`: the chart area only, for a surface that owns its
   * container. `table`: an 8px rail for a table cell. Default `card`.
   */
  variant?: 'card' | 'chart' | 'table';
  /** The bar's size, for `card` and `chart`: it changes the bar, never the text. `table` has its own fixed rail. Default `medium`. */
  size?: 'small' | 'medium' | 'large';
  /** The heading, for `card`. */
  title?: string;
  /** The heading level, 2 to 6, for `card`. The look is always h5. Default 3. */
  headingLevel?: CardHeadingLevel;
  /** Shows the target figures top-right ("RM 6,000 / 10,000", "60% of target"), for `card`. Default true. */
  showTarget?: boolean;
  /**
   * What names the values under the bar. `legend`: a swatch, label and value per category, plus Gap, and a "Target"
   * tag under the line. `row`: one compact row, Total · Gap · Target. `none`: nothing (in `table`, the target's value
   * sits above the rail). Default `legend`; `row` at `small`; `none` in `table`.
   */
  labels?: 'legend' | 'row' | 'none';
  /**
   * Whether the `row` label row names the Gap while the total is short. Default true. Set false where the row must
   * name only Total and Target (Pacing card).
   */
  rowShowsGap?: boolean;
  /** Short-form numbers from 1M up ("RM10.2M"). Default true at `small` and in `table`, false otherwise. */
  compact?: boolean;
  /** The unit before every value, e.g. "RM". Set "" for a plain count. Default "RM". */
  currency?: string;
  /** One line under a divider, for `card`: e.g. how the scale works. */
  footer?: string;
  /** Overrides the bar's spoken summary ("RM 6,000 of RM 10,000 target, 60%."). */
  summary?: string;
}

/** One value against the target: drawn in Obsidian, as Progress Bar's single fill. */
interface SingleValueProps extends GoalBarBaseProps {
  /** The one value toward the target. */
  value: number;
  categories?: never;
}

/** A breakdown: categories stack from the left in the order given, coloured by the department walk. */
interface CategoriesProps extends GoalBarBaseProps {
  /** The categories, in order. Empty draws an empty track with headroom and says there is no data yet. */
  categories: GoalBarCategory[];
  value?: never;
}

export type GoalBarProps = SingleValueProps | CategoriesProps;

const WALK: GoalBarColor[] = ['orange', 'salmon-pink', 'green', 'navy', 'amber', 'purple', 'turquoise'];
const TARGET_AT = 0.75;

/**
 * A value in full, or in short form from 1M up when `compact` ("RM10.2M"). Money always shows 2 decimal places
 * ("RM 6,000.00"): real figures are rarely round (decided 2026-11-04, Q-GOAL-8). A plain count (`currency: ''`) shows
 * as given; `money: true` keeps the 2 places without the unit, for the figure suffix ("/ 10,000.00").
 */
export function formatGoalValue(
  value: number,
  { currency = 'RM', compact = false, money = currency !== '' }: { currency?: string; compact?: boolean; money?: boolean } = {},
): string {
  const abs = Math.abs(value);
  if (compact && abs >= 1e6) {
    const [size, suffix] = abs >= 1e9 ? [1e9, 'B'] : [1e6, 'M'];
    const short = (Math.round((value / size) * 10) / 10).toString();
    return `${currency}${short}${suffix}`;
  }
  const full = value.toLocaleString('en-US', money ? { minimumFractionDigits: 2, maximumFractionDigits: 2 } : { maximumFractionDigits: 2 });
  return currency ? `${currency} ${full}` : full;
}

const pct = (n: number) => `${Math.round(n * 10000) / 100}%`;

/**
 * Collabrium Progress-to-Goal Bar: a horizontal stacked bar of contributions toward a named target. Segments stack
 * from the left, a line marks the target at 75% of the track, and a dashed Red outline marks the gap when the total
 * falls short. Card, Chart and In-table variants. Ported from components.css `.c-goal-bar*` (4636–4781).
 */
export const GoalBar = forwardRef<HTMLDivElement, GoalBarProps>(function GoalBar(props, ref) {
  const {
    target,
    variant = 'card',
    size = 'medium',
    title,
    headingLevel = 3,
    showTarget = true,
    labels = variant === 'table' ? 'none' : size === 'small' ? 'row' : 'legend',
    compact = variant === 'table' || size === 'small',
    currency = 'RM',
    footer,
    summary,
    rowShowsGap = true,
    value,
    categories,
    ...rest
  } = props as GoalBarBaseProps & { value?: number; categories?: GoalBarCategory[] };

  const cats: (GoalBarCategory & { color: GoalBarColor })[] =
    categories !== undefined
      ? categories.map((c, i) => ({ ...c, color: c.color ?? WALK[i] ?? 'neutral-4' }))
      : [{ label: 'Total', value: value ?? 0, color: 'obsidian' }];
  const empty = cats.length === 0;
  const total = cats.reduce((sum, c) => sum + c.value, 0);
  // The target sits at 75%; the track is target ÷ 0.75, re-based on the total when the total runs past it.
  const full = Math.max(target / TARGET_AT, total);
  const at = (n: number) => (full > 0 ? n / full : 0);
  const targetPos = at(target);
  const short = total < target;
  const gap = target - total;
  const fmt = (n: number) => formatGoalValue(n, { currency, compact });
  const percent = target > 0 ? Math.round((total / target) * 100) : 0;
  const spoken = summary ?? `${fmt(total)} of ${fmt(target)} target, ${percent}%.`;
  const drawGap = short && !empty && size !== 'small' && variant !== 'table';
  const Heading = `h${headingLevel}` as 'h3';

  // The target tag stays centred on the line and slides inward when it would cross the container's edge.
  const chartRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const [tagShift, setTagShift] = useState(0);
  // The compact row drops Gap when, and only when, that puts it on one line.
  const rowRef = useRef<HTMLDivElement>(null);
  const [dropGap, setDropGap] = useState(false);

  useLayoutEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;
    const measure = () => {
      const tag = tagRef.current;
      if (tag) {
        const width = chart.clientWidth;
        const half = tag.offsetWidth / 2;
        const centre = width * targetPos;
        setTagShift(centre - half < 0 ? half - centre : centre + half > width ? width - centre - half : 0);
      }
      const row = rowRef.current;
      if (row) {
        const gapItem = row.querySelector<HTMLElement>('[data-gap]');
        const items = [...row.children] as HTMLElement[];
        // A dropped Gap is out of the flow, so the row's gap count changes with it; measure as if it were in.
        const lineGap = parseFloat(getComputedStyle(row).columnGap) || 0;
        const widths = items.map(item => item.getBoundingClientRect().width);
        const fits = (list: number[]) => list.reduce((s, w) => s + w, 0) + lineGap * (list.length - 1) <= row.clientWidth;
        const withGap = fits(widths);
        const withoutGap = fits(items.map((item, i) => (item === gapItem ? -1 : widths[i])).filter(w => w >= 0));
        setDropGap(!!gapItem && !withGap && withoutGap);
      }
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(chart);
    if (typeof document !== 'undefined' && document.fonts) document.fonts.ready.then(measure).catch(() => {});
    return () => observer.disconnect();
  }, [targetPos, labels, total, target, currency, compact]);

  let left = 0;
  const segments = cats.map(c => {
    const seg = { ...c, left: at(left), width: at(c.value) };
    left += c.value;
    return seg;
  });

  const rowItems = [
    { key: 'total', label: 'Total', value: fmt(total) },
    short && !empty && rowShowsGap ? { key: 'gap', label: 'Gap', value: fmt(gap), gap: true } : null,
    { key: 'target', label: 'Target', value: fmt(target) },
  ].filter((item): item is { key: string; label: string; value: string; gap?: boolean } => item !== null);

  return (
    <div
      {...rest}
      ref={ref}
      className="cui-goal-bar"
      data-variant={variant}
      data-size={variant === 'table' ? undefined : size}
    >
      {variant === 'card' && (title || showTarget) && (
        <div className="cui-goal-bar__head">
          {title && <Heading className="cui-goal-bar__title">{title}</Heading>}
          {showTarget && (
            <div className="cui-goal-bar__target">
              <div className="cui-goal-bar__target-value">
                {formatGoalValue(total, { currency, compact })}
                <span className="cui-goal-bar__of">/ {formatGoalValue(target, { currency: '', compact, money: currency !== '' })}</span>
              </div>
              <div className="cui-goal-bar__target-pct">{percent}% of target</div>
            </div>
          )}
        </div>
      )}
      <div className="cui-goal-bar__chart" role="img" aria-label={spoken} ref={chartRef}>
        <div className="cui-goal-bar__barwrap">
          {variant === 'table' && labels === 'none' && (
            <span className="cui-goal-bar__tablelabel" style={{ left: pct(targetPos) }}>
              {fmt(target)}
            </span>
          )}
          <div className="cui-goal-bar__track">
            {segments.map((s, i) => (
              <div key={i} className="cui-goal-bar__segment" data-color={s.color} style={{ left: pct(s.left), width: pct(s.width) }} />
            ))}
            {short && <div className="cui-goal-bar__headroom" style={{ left: pct(targetPos), width: pct(1 - targetPos) }} />}
            {drawGap && <div className="cui-goal-bar__gap" style={{ left: pct(at(total)), width: pct(targetPos - at(total)) }} />}
          </div>
          <div className="cui-goal-bar__target-line" style={{ left: pct(targetPos) }} />
        </div>
        {labels === 'legend' && variant !== 'table' && (
          <div className="cui-goal-bar__tagrow">
            <div className="cui-goal-bar__target-tag" ref={tagRef} style={{ left: pct(targetPos), marginLeft: tagShift || undefined }}>
              Target {fmt(target)}
            </div>
          </div>
        )}
        {labels === 'row' && (
          <div className="cui-goal-bar__labels" ref={rowRef}>
            {rowItems.map(item => (
              // A dropped Gap stays in the DOM, out of the layout and hidden, so it can still be measured.
              <span key={item.key} data-gap={item.gap ? '' : undefined} data-dropped={item.gap && dropGap ? '' : undefined}>
                {item.label}
                <b>{item.value}</b>
              </span>
            ))}
          </div>
        )}
      </div>
      {labels === 'legend' && variant !== 'table' && !empty && (
        <div className="cui-goal-bar__legend">
          {segments.map((s, i) => (
            <span key={i} className="cui-goal-bar__legend-item">
              <span className="cui-goal-bar__swatch" data-color={s.color} />
              <b>{s.label}</b>
              {fmt(s.value)}
            </span>
          ))}
          {drawGap && (
            <span className="cui-goal-bar__legend-item">
              <span className="cui-goal-bar__swatch" data-gap="" />
              <b>Gap</b>
              {fmt(gap)}
            </span>
          )}
        </div>
      )}
      {variant === 'card' && (footer || empty) && (
        <>
          <hr className="cui-goal-bar__divider" />
          {/* With no data and no footer, the placeholder line (decided 2026-11-04, Q-GOAL-4). */}
          <p className="cui-goal-bar__footer">{footer ?? 'No data yet.'}</p>
        </>
      )}
    </div>
  );
});
