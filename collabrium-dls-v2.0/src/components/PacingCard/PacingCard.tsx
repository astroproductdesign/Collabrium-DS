import { forwardRef, type HTMLAttributes } from 'react';
import type { WithoutStyling } from '../../utils/types';
import { Badge } from '../Badge';
import { Card, CardFooter, type CardHeadingLevel } from '../Card';
import { GoalBar, formatGoalValue, goalPercent } from '../GoalBar';

type NativeDivProps = WithoutStyling<Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'color' | 'title'>>;

export interface PacingCardProps extends NativeDivProps {
  /** The thing being paced, a short proper noun ("TV", "Radio", "Out of home"). Drawn at h4 so it is found fast in a grid. */
  label: string;
  /** The label's heading level, 2 to 6. The look is always h4. Default 3. */
  headingLevel?: CardHeadingLevel;
  /** The headline figure, e.g. the forecast. Shown in short form from 1M up ("RM11.4M"). */
  kpi: number;
  /** What the headline figure is, e.g. "forecast". Optional, after the figure. */
  kpiQualifier?: string;
  /** The accumulating actual: booked, spent, delivered. The rail's Total. */
  value: number;
  /** The target, known in advance. The rail's Target. */
  target: number;
  /** Where the period is: today's day number ("Day 18"). */
  day: number;
  /** How long the period is, in days ("of 31"). */
  days: number;
  /** The day the target was met. Once it is met the footer says when, in place of the rate. */
  metOnDay?: number;
  /** The unit before every value, e.g. "RM". Default "RM". */
  currency?: string;
  /**
   * The badge's colour. `status` is Red below 100% of target and Green at or above it. `neutral` quiets it early in a
   * period, when "behind" doesn't yet mean anything. Default `status`.
   */
  badge?: 'status' | 'neutral';
}

/**
 * The daily rate needed, in short form, rounded up so it never understates what is needed: "RM277k", "RM1.2M".
 * (Decided 2026-11-04, Q-PACING-3.)
 */
export function formatPacingRate(amount: number, currency = 'RM'): string {
  if (amount >= 1e6) return `${currency}${Math.ceil(amount / 1e5) / 10}M`;
  if (amount >= 1e3) return `${currency}${Math.ceil(amount / 1e3)}k`;
  return formatGoalValue(Math.ceil(amount * 100) / 100, { currency });
}

/**
 * Percent of target achieved, as printed on the badge: Progress-to-Goal Bar's own, to 1 decimal place ("64.7",
 * "116.7"), never 100.0 while the target isn't met, so the badge's colour always agrees with its number (decided
 * 2026-11-04, Q-PACING-4).
 */
export const pacingPercent = goalPercent;

/**
 * Collabrium Pacing card: one metric's progress against a target it is racing a deadline to hit. The label, a headline
 * figure, a Progress-to-Goal Bar rail named Total and Target, a status Badge, and a footer with the time boundary and
 * the rate needed. A variant of Card, ported from components.css `.c-card-pacing*` (490–523).
 */
export const PacingCard = forwardRef<HTMLDivElement, PacingCardProps>(function PacingCard(
  { label, headingLevel = 3, kpi, kpiQualifier, value, target, day, days, metOnDay, currency = 'RM', badge = 'status', ...rest },
  ref,
) {
  const Heading = `h${headingLevel}` as 'h3';
  const percent = pacingPercent(value, target);
  const met = value >= target;
  const short = (n: number) => formatGoalValue(n, { currency, compact: true });
  const remainingDays = days - day;
  // The time boundary always shows; the rate only while the target is unmet and days remain.
  let tail: string | null = null;
  if (met) tail = metOnDay !== undefined ? `target met on day ${metOnDay}` : 'target met';
  else if (remainingDays > 0) tail = `${formatPacingRate((target - value) / remainingDays, currency)} a day to reach target`;
  // The period is over and the target unmet: the shortfall (decided 2026-11-04, Q-PACING-5).
  else tail = `${formatPacingRate(target - value, currency)} short of target`;

  return (
    <Card {...rest} ref={ref} data-card="pacing">
      <Heading className="cui-pacing-card__label">{label}</Heading>
      <div className="cui-pacing-card__kpi">
        <span className="cui-pacing-card__value">{short(kpi)}</span>
        {kpiQualifier && <span className="cui-pacing-card__qualifier">{kpiQualifier}</span>}
      </div>
      <GoalBar
        variant="table"
        labels="row"
        rowShowsGap={false}
        value={value}
        target={target}
        currency={currency}
        summary={`${short(value)} of a ${short(target)} target, ${percent}% to target.`}
      />
      <div className="cui-pacing-card__status">
        <Badge variant={badge === 'neutral' ? 'neutral' : met ? 'success' : 'error'}>{percent}% to target</Badge>
      </div>
      <CardFooter>
        Day {day} of {days}
        {tail && <> &middot; {tail}</>}
      </CardFooter>
    </Card>
  );
});
