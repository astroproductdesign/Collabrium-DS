// Shared values for the Chart.js charts: the DLS series colours and ramps, the marks' numbers and small helpers.
// Taken from the tokens, as Charts (extra) takes its own, so the two sets can't drift; nothing here imports Recharts.
import { tokens } from '../../tokens/tokens';

const { color, spacing } = tokens;

/** The seven series colours by token name, in Chart color mapping order. */
export const seriesColorNames = ['orange', 'salmonPink', 'green', 'navy', 'amber', 'purple', 'turquoise'] as const;
/** One of the seven DLS series colours. Never a free colour string. */
export type SeriesColorName = (typeof seriesColorNames)[number];
/** The five colours with a tint ramp. */
export type RampColorName = 'orange' | 'salmonPink' | 'green' | 'navy' | 'amber';

export const resolveColorName = (name: SeriesColorName | undefined, index: number): SeriesColorName =>
  name ?? seriesColorNames[index % seriesColorNames.length];
export const colorOf = (name: SeriesColorName): string => color[name];

/** A single-hue ramp, lightest first: the element's -bg tint, -bg-strong tint, pastel, full colour. */
export function rampRungs(name: RampColorName): readonly string[] {
  const map = {
    orange: [color.fireBg, color.fireBgStrong, color.firePastel, color.orange],
    salmonPink: [color.woodBg, color.woodBgStrong, color.woodPastel, color.salmonPink],
    green: [color.earthBg, color.earthBgStrong, color.earthPastel, color.green],
    navy: [color.waterBg, color.waterBgStrong, color.waterPastel, color.navy],
    amber: [color.goldBg, color.goldBgStrong, color.goldPastel, color.amber],
  } as const;
  return map[name];
}
/** `n` rungs of a ramp, lightest to full: the four tokens spread over the slices; past four, mixes between them. */
export function ramp(name: RampColorName, n: number): string[] {
  const r = rampRungs(name);
  if (n <= 1) return [r[r.length - 1]];
  if (n <= r.length) return Array.from({ length: n }, (_, i) => r[Math.round((i * (r.length - 1)) / (n - 1))]);
  return Array.from({ length: n }, (_, i) => {
    const t = (i * (r.length - 1)) / (n - 1);
    const lo = Math.floor(t);
    return lo >= r.length - 1 ? r[r.length - 1] : mixToward(r[lo], r[lo + 1], t - lo);
  });
}

/** Mixes `amount` of `toward` into `from`, as the DLS's `color-mix(in srgb, …)` (a canvas can't read color-mix). */
export function mixToward(from: string, toward: string, amount: number): string {
  const rgb = (hex: string) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
  const a = rgb(from);
  const b = rgb(toward);
  return `#${a.map((v, i) => Math.round(v * (1 - amount) + b[i] * amount).toString(16).padStart(2, '0')).join('')}`;
}
/** The colour at an opacity, as `rgba()` (the area wash, the polar area's translucency). */
export const alpha = (hex: string, a: number): string => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
  return `rgba(${r}, ${g}, ${b}, ${a})`;
};

/** A bar's hover: 15% toward Neutral-9 (Marks). */
export const barHover = (hex: string): string => mixToward(hex, color.neutral9, 0.15);
/** The area / radar wash: about 12% of the line's colour, never full strength (Marks). */
export const WASH = 0.12;
export const barRadius = spacing[4];
export const maxBarThickness = { vertical: spacing[24], horizontal: spacing[20] } as const;
export const dashPattern = [4, 4];
export const defaultFormat = (value: number): string => value.toLocaleString();

/** One row of chart data: the category plus a number per series. */
export type ChartDatum = Record<string, string | number>;

export interface ChartSeries {
  /** The key of this series' value in each data row. */
  key: string;
  /** The series' name, in the legend, the tooltip and the table. */
  name: string;
  /** One of the seven DLS series colours. Leave out to take the next in the mapping order. */
  color?: SeriesColorName;
  /** Draws a line dashed, to tell series apart by pattern when colour isn't enough. */
  dashed?: boolean;
}

/** The props every category chart shares (as Charts (extra)). */
export interface CartesianChartProps {
  /** Names the chart for assistive technology ("Renewal rate by month"): what it shows, not that it's a chart. */
  'aria-label': string;
  /** One object per category, e.g. `{ month: 'Mar', rate: 72 }`. */
  data: ChartDatum[];
  /** The key of the category in each row. */
  categoryKey: string;
  /** The category column's heading in the table view. Default "Category". */
  categoryLabel?: string;
  /** Formats a value for the axis, the tooltip and the table. Default: locale-formatted number. */
  valueFormat?: (value: number) => string;
  /** Plot height: `default` 260px, `tall` 300px; a floor, so the chart grows to fill a taller container. */
  height?: 'default' | 'tall';
  /** Shows the legend under the chart. Default true. */
  legend?: boolean;
}

/** A point for Scatter and Bubble. */
export interface XYPoint {
  x: number;
  y: number;
  /** The third measure, drawn as size. Bubble only. */
  z?: number;
  /** Names the point in the tooltip and the table. Default: the series' name. */
  name?: string;
}
export interface XYSeries {
  name: string;
  points: XYPoint[];
  color?: SeriesColorName;
}
