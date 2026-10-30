'use client';

import { forwardRef } from 'react';
import { ChartShell } from '../lib/ChartShell';
import { useBare } from '../lib/bare';
import { useCellTip } from '../lib/CellTip';
import { mixToward } from '../lib/chart-theme';
import { rampRungs, type RampColorName } from '../lib/series-colors';
import { tokens } from '../../tokens/tokens';

export interface ActivityDay {
  /** The day, as `YYYY-MM-DD`. */
  date: string;
  /** What happened that day: commits, sessions, orders. 0 for a quiet day. */
  count: number;
}

export interface ActivityHeatmapChartProps {
  /** Names the chart for assistive technology, e.g. "Commits over the last 20 weeks". */
  'aria-label': string;
  /** One entry per day, in any order. Weeks run from `weekStartsOn`, so the first and last week may be partial. */
  data: ActivityDay[];
  /** What is counted, in the plural, for the tooltip and the table, e.g. "commits". Default "contributions". */
  unit?: string;
  /** One of five hues; busier days are darker. Default Green. */
  color?: RampColorName;
  /** The first day of each week: 1 for Monday (default), 0 for Sunday. */
  weekStartsOn?: 0 | 1;
  /** Plot height. `default` is 260px, `tall` is 300px: a floor. */
  height?: 'default' | 'tall';
}

const DAY = 86_400_000;
const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const utc = (iso: string) => new Date(`${iso}T00:00:00Z`);
const longDate = (iso: string) => utc(iso).toLocaleDateString('en', { timeZone: 'UTC', weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
const shortDate = (iso: string) => utc(iso).toLocaleDateString('en', { timeZone: 'UTC', day: 'numeric', month: 'short', year: 'numeric' });

/**
 * A year-at-a-glance of one count per day, as a calendar: one column per
 * week, one row per weekday, each day shaded in five steps (none, then four
 * on a single-hue ramp). The steps are the quartiles of the busy days.
 * Drawn in HTML and CSS, not Recharts.
 */
export const ActivityHeatmapChart = forwardRef<HTMLElement, ActivityHeatmapChartProps>(function ActivityHeatmapChart(
  { 'aria-label': label, data, unit = 'contributions', color = 'green', weekStartsOn = 1, height },
  ref,
) {
  const tip = useCellTip();
  const bare = useBare();
  const sorted = [...data].sort((a, b) => a.date.localeCompare(b.date));
  const first = sorted.length ? utc(sorted[0].date).getTime() : 0;
  const offsetOf = (t: number) => (new Date(t).getUTCDay() - weekStartsOn + 7) % 7;
  const start = first - offsetOf(first) * DAY;
  const cells = sorted.map(d => {
    const t = utc(d.date).getTime();
    const n = Math.round((t - start) / DAY);
    return { ...d, week: Math.floor(n / 7), row: n % 7, weekday: new Date(t).getUTCDay() };
  });
  const weeks = cells.length ? cells[cells.length - 1].week + 1 : 0;

  // Four steps for the busy days: the quartiles of the non-zero counts.
  const busy = cells.map(c => c.count).filter(n => n > 0).sort((a, b) => a - b);
  const q = (p: number) => (busy.length ? busy[Math.min(busy.length - 1, Math.floor(p * busy.length))] : 0);
  const [t1, t2, t3] = [q(0.25), q(0.5), q(0.75)];
  const level = (n: number) => (n <= 0 ? 0 : n <= t1 ? 1 : n <= t2 ? 2 : n <= t3 ? 3 : 4);
  const [, bgStrong, pastel, full] = rampRungs(color);
  const steps = [tokens.color.neutral2, bgStrong, pastel, mixToward(pastel, full, 0.5), full];

  // Month names sit over the first week whose first day is in that month.
  const months: { week: number; name: string }[] = [];
  let lastMonth = -1;
  for (let w = 0; w < weeks; w++) {
    const month = new Date(start + w * 7 * DAY).getUTCMonth();
    if (month !== lastMonth) months.push({ week: w, name: MONTHS[month] });
    lastMonth = month;
  }
  const labelled = [1, 3, 5].map(wd => ({ wd, row: (wd - weekStartsOn + 7) % 7 }));

  const weekRows = Array.from({ length: weeks }, (_, w) => {
    const days = Array.from({ length: 7 }, (_, r) => cells.find(c => c.week === w && c.row === r));
    return [shortDate(new Date(start + w * 7 * DAY).toISOString().slice(0, 10)), ...days.map(d => (d ? String(d.count) : '—'))];
  });
  const order = Array.from({ length: 7 }, (_, r) => DAY_NAMES[(r + weekStartsOn) % 7]);

  return (
    <ChartShell
      ref={ref}
      label={label}
      height={height}
      fill={false}
      srTable
      table={{ columns: ['Week of', ...order.map(d => `${d} (${unit})`)], rows: weekRows }}
    >
      {() => (
        <div className="cui-act" {...tip.boxProps}>
          <div className="cui-act__scroll">
            <div className="cui-act__grid" aria-hidden="true" style={{ ['--cui-act-weeks' as string]: weeks, ['--cui-act-rows' as string]: bare ? 2 : 7 }}>
              {months.map(m => (
                <span key={`${m.week}-${m.name}`} className="cui-act__month" style={{ gridColumn: `${m.week + 2} / span 3`, gridRow: 1 }}>
                  {m.name}
                </span>
              ))}
              {labelled.map(l => (
                <span key={l.wd} className="cui-act__weekday" style={{ gridColumn: 1, gridRow: l.row + 2 }}>
                  {DAY_NAMES[l.wd]}
                </span>
              ))}
              {cells.filter(c => !bare || c.row < 2).map(c => (
                <span
                  key={c.date}
                  className="cui-act__cell"
                  style={{ gridColumn: c.week + 2, gridRow: c.row + 2, background: steps[level(c.count)] }}
                  onPointerEnter={tip.show(longDate(c.date), [`${c.count} ${unit}`])}
                  onPointerDown={tip.show(longDate(c.date), [`${c.count} ${unit}`])}
                />
              ))}
            </div>
          </div>
          <div className="cui-act__scale" aria-hidden="true">
            <span>Less</span>
            {steps.map((c, i) => (
              <span key={i} className="cui-act__step" style={{ background: c }} />
            ))}
            <span>More</span>
          </div>
          {tip.tipEl}
        </div>
      )}
    </ChartShell>
  );
});
