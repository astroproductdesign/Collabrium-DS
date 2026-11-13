'use client';

import { forwardRef } from 'react';
import { ChartShell } from '../lib/ChartShell';
import type { ChartDatum } from '../lib/CartesianFrame';
import { useCellTip } from '../lib/CellTip';
import { defaultFormat, inkOn, mixToward } from '../lib/chart-theme';
import { rampRungs, type RampColorName } from '../lib/series-colors';

export interface PyramidChartProps {
  /** Names the chart for assistive technology, e.g. "Requests at each stage of the pipeline". */
  'aria-label': string;
  /** One object per level, top to bottom. Order them smallest first for a pyramid, or largest first for a funnel of centred bars. */
  data: ChartDatum[];
  /** The key of each level's name in a row. */
  nameKey: string;
  /** The key of each level's value in a row; it sets the level's width. */
  valueKey: string;
  /** One of five hues; larger levels are darker. Default Orange. */
  color?: RampColorName;
  /** Formats a value for the level, the tooltip and the table. Default: locale-formatted number. */
  valueFormat?: (value: number) => string;
  /** Plot height. `default` is 260px, `tall` is 300px: a floor, so the levels share the height. */
  height?: 'default' | 'tall';
}

/**
 * Levels of a hierarchy or stages of a pipeline, as centred bands whose widths
 * are the values: larger levels are darker on a single-hue ramp. Drawn in
 * HTML and CSS, not Recharts. Widths are proportional to value, so a level
 * half the size is half as wide.
 */
export const PyramidChart = forwardRef<HTMLElement, PyramidChartProps>(function PyramidChart(
  { 'aria-label': label, data, nameKey, valueKey, color = 'orange', valueFormat = defaultFormat, height },
  ref,
) {
  const [lightest, , , full] = rampRungs(color);
  const top = Math.max(...data.map(d => Number(d[valueKey])));
  const tip = useCellTip();
  return (
    <ChartShell
      ref={ref}
      label={label}
      height={height}
      fill={false}
      srTable
      table={{ columns: ['Level', 'Value', 'Of the widest'], rows: data.map(d => [d[nameKey], valueFormat(Number(d[valueKey])), `${((Number(d[valueKey]) / top) * 100).toFixed(1).replace(/\.0$/, '')}%`]) }}
    >
      {() => (
        <div className="cui-pyramid" {...tip.boxProps} aria-hidden="true">
          {data.map(d => {
            const v = Number(d[valueKey]);
            const t = top > 0 ? v / top : 0;
            const fill = mixToward(lightest, full, t);
            return (
              <div key={String(d[nameKey])} className="cui-pyramid__row">
                <div
                  className="cui-pyramid__band"
                  style={{ width: `${t * 100}%`, background: fill, color: inkOn(fill) }}
                  onPointerEnter={tip.show(String(d[nameKey]), [valueFormat(v)])}
                  onPointerDown={tip.show(String(d[nameKey]), [valueFormat(v)])}
                >
                  <span className="cui-pyramid__name">{d[nameKey]}</span>
                  <span className="cui-pyramid__value">{valueFormat(v)}</span>
                </div>
              </div>
            );
          })}
          {tip.tipEl}
        </div>
      )}
    </ChartShell>
  );
});
