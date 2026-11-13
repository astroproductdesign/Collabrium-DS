import { forwardRef, useId, type HTMLAttributes, type ReactNode } from 'react';
// Server component: icons come from Phosphor's server-safe entry (its main entry needs a client context).
import { CaretDown, CaretUp, Minus } from '@phosphor-icons/react/dist/ssr';
import type { Icon } from '@phosphor-icons/react';
import type { WithoutStyling } from '../../utils/types';
import { IconChip, type CardElement } from '../Card';
import { GoalBar, goalPercent } from '../GoalBar';

type NativeDivProps = WithoutStyling<Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'color' | 'title' | 'onClick'>>;

/** A change against a stated period. Green when up, Red when down, Neutral-5 when flat. */
export interface StatTrend {
  /** Which way the metric moved. Only for a genuine comparison against a stated period. */
  direction: 'up' | 'down' | 'flat';
  /** The size of the change ("12.4%"). For `flat`, defaults to "No change". */
  value?: ReactNode;
  /** What it is compared against ("vs last month"), in Neutral-5. */
  period?: ReactNode;
}

interface StatCardBaseProps extends NativeDivProps {
  /** The metric's name ("Total spend"). Drawn as an uppercase eyebrow. */
  label: ReactNode;
  /** The one value, formatted ("RM 48,200.00", "86"). One value per card. */
  value: ReactNode;
  /** A plain caption line (Neutral-5) under the value. In a row of tiles, give every tile one, or none. */
  description?: ReactNode;
  /** A footer under a divider ("As of 9:41am"). */
  footer?: ReactNode;
  /** An icon for the icon chip, top right: which department owns the metric. */
  icon?: Icon;
  /** The element that owns the metric, for the chip's colour. Default `water`. */
  element?: CardElement;
  /** The value is below zero: a 2px Red border and a Red value. Not for a number that is merely falling (that is the trend). */
  negative?: boolean;
  /** Makes the whole tile a link (to the report behind the metric). */
  href?: string;
  /** Makes the whole tile a button. */
  onClick?: () => void;
}

export interface PrimaryStatCardProps extends StatCardBaseProps {
  /** `primary` (the default): the headline metric, value at h1. */
  variant?: 'primary';
  /** The one featured tile in a row: the value at display size (40px). Never more than one per row. */
  hero?: boolean;
  /** The change against a period, under the value. */
  trend?: StatTrend;
  /** A small chart under the trend, such as `<SparklineChart>`. */
  sparkline?: ReactNode;
  unit?: never;
  goal?: never;
}

export interface SecondaryStatCardProps extends StatCardBaseProps {
  /** `secondary`: a supporting metric that gives a primary tile its context; the value steps down to h4. */
  variant: 'secondary';
  /** A denominator or unit after the value, in small type ("of 31", "a day"). */
  unit?: ReactNode;
  /** A goal rail (Progress-to-Goal Bar, in-table) with its "N% of target achieved" line under it. */
  goal?: { value: number; target: number };
  hero?: never;
  trend?: never;
  sparkline?: never;
}

export type StatCardProps = PrimaryStatCardProps | SecondaryStatCardProps;

/** Every prop of either variant, for reading them in one place. */
type AnyStatCardProps = StatCardBaseProps & {
  variant?: 'primary' | 'secondary';
  hero?: boolean;
  trend?: StatTrend;
  sparkline?: ReactNode;
  unit?: ReactNode;
  goal?: { value: number; target: number };
};

const TREND_ICON = { up: CaretUp, down: CaretDown, flat: Minus } as const;
// Read before the change, since the arrow and colour aren't spoken (decided 2026-11-10, Q-STAT-3).
const TREND_WORD = { up: 'Up', down: 'Down', flat: '' } as const;

/**
 * Collabrium Stat / KPI card: a dashboard tile for one metric. A label, the value, and optionally a trend, an icon
 * chip, a sparkline, a description and a footer. `secondary` steps the value down for a supporting figure, with an
 * optional goal rail. Built on Card's surface. Ported from components.css `.c-stat*` (3607–3648).
 */
export const StatCard = forwardRef<HTMLDivElement, StatCardProps>(function StatCard(props, ref) {
  const {
    label,
    value,
    description,
    footer,
    icon,
    element,
    negative = false,
    href,
    onClick,
    variant = 'primary',
    hero,
    trend,
    sparkline,
    unit,
    goal,
    ...rest
  } = props as AnyStatCardProps;
  const uid = useId();
  const valueId = `${uid}-value`;
  const trendId = `${uid}-trend`;
  const interactive = href !== undefined || onClick !== undefined;
  const describedBy = interactive ? [valueId, trend ? trendId : undefined].filter(Boolean).join(' ') : undefined;

  // Interactive: the DLS has no CSS for it; it is Card's stretched title action (decided 2026-11-10, Q-STAT-4).
  const labelContent = href !== undefined ? (
    <a className="cui-card__action" href={href} aria-describedby={describedBy}>
      {label}
    </a>
  ) : onClick ? (
    <button type="button" className="cui-card__action" onClick={onClick} aria-describedby={describedBy}>
      {label}
    </button>
  ) : (
    label
  );

  const TrendIcon = trend ? TREND_ICON[trend.direction] : null;
  const percent = goal ? goalPercent(goal.value, goal.target) : '';

  return (
    <div
      {...rest}
      ref={ref}
      className="cui-card cui-stat"
      data-variant={variant === 'secondary' ? 'secondary' : undefined}
      data-negative={negative || undefined}
    >
      <div className="cui-stat__top">
        <span className="cui-stat__label">{labelContent}</span>
        {icon && <IconChip icon={icon} element={element} />}
      </div>
      <span className="cui-stat__value" id={valueId} data-hero={hero || undefined}>
        {value}
        {unit && <span className="cui-stat__unit">{unit}</span>}
      </span>
      {trend && TrendIcon && (
        <span className="cui-stat__trend" id={trendId} data-direction={trend.direction}>
          <TrendIcon className="cui-stat__trend-icon" weight="fill" aria-hidden="true" focusable="false" />
          {TREND_WORD[trend.direction] && <span className="cui-stat__sr">{TREND_WORD[trend.direction]} </span>}
          {trend.value ?? (trend.direction === 'flat' ? 'No change' : null)}
          {/* A real space, so the change and the period are read as two words (the flex gap draws the visual 4px). */}
          {trend.period && ' '}
          {trend.period && <span className="cui-stat__period">{trend.period}</span>}
        </span>
      )}
      {goal && (
        <div className="cui-stat__goal">
          <GoalBar variant="table" labels="none" currency="" value={goal.value} target={goal.target} summary={`${percent}% of target achieved.`} />
          {/* 1 decimal, as every GoalBar percentage (the gallery shows "53%"; decided 2026-11-10, Q-STAT-6). */}
          <span className="cui-stat__achieved" aria-hidden="true">
            <b>{percent}%</b>of target achieved
          </span>
        </div>
      )}
      {/* The DS reserves the slot under the trend but has no CSS for it (decided 2026-11-10, Q-STAT-5). */}
      {sparkline && <div className="cui-stat__sparkline">{sparkline}</div>}
      {description && <span className="cui-stat__desc">{description}</span>}
      {footer && <div className="cui-stat__footer">{footer}</div>}
    </div>
  );
});

export interface StatGridProps extends WithoutStyling<Omit<HTMLAttributes<HTMLDivElement>, 'color'>> {
  /** The `StatCard`s. Every tile in a row is as tall as the tallest; their content stays at the top. */
  children?: ReactNode;
}

/**
 * A row of Stat cards: as many columns as fit at 180px or wider, 16px apart, equal height. Ported from components.css
 * `.c-stats` (3607).
 */
export const StatGrid = forwardRef<HTMLDivElement, StatGridProps>(function StatGrid({ children, ...rest }, ref) {
  return (
    <div {...rest} ref={ref} className="cui-stat-grid">
      {children}
    </div>
  );
});
