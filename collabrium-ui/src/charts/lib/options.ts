// Shared Chart.js option pieces for the category charts: the value axis, the tooltip lines and the table rows.
import type { TooltipItem } from 'chart.js';
import type { ChartDatum } from './theme';

/** The value axis: from zero (bars, areas) or fitted to the data (lines); its numbers in `format` when one is given. */
export const valueAxis = (start: 'zero' | 'fit', format?: (v: number) => string) => ({
  beginAtZero: start === 'zero',
  ...(format ? { ticks: { callback: (v: number | string) => (typeof v === 'number' ? format(v) : v) } } : {}),
});

/** The tooltip's lines: "Series: value", the value in the full format (the axis may shorten it). */
export const tooltipLines = (format: (v: number) => string, axis: 'x' | 'y' | 'r' = 'y') => ({
  callbacks: {
    label: (ctx: TooltipItem<'bar' | 'line'>) => {
      const p = ctx.parsed as unknown as Record<string, number> | number;
      const v = typeof p === 'number' ? p : p[axis];
      return `${ctx.dataset.label ? `${ctx.dataset.label}: ` : ''}${format(v)}`;
    },
  },
});

/** The category labels and one series' numbers from the rows. */
export const labelsOf = (data: ChartDatum[], key: string) => data.map((d) => String(d[key]));
export const valuesOf = (data: ChartDatum[], key: string) => data.map((d) => Number(d[key]));

/** The table view: the category, then each series' formatted value. */
export const categoryTable = (
  data: ChartDatum[],
  categoryKey: string,
  categoryLabel: string,
  series: { key: string; name: string; format?: (v: number) => string }[],
  format: (v: number) => string,
) => ({
  columns: [categoryLabel, ...series.map((s) => s.name)],
  rows: data.map((d) => [String(d[categoryKey]), ...series.map((s) => (s.format ?? format)(Number(d[s.key])))]),
});
