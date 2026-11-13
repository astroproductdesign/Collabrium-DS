// Chart color mapping (DESIGN-SYSTEM.md, Chart color mapping): the DLS guideline as functions, so every chart, in
// either set, picks its colours the same way. Not a rendered component; the colours come from the tokens.
import { tokens } from '../../tokens/tokens';
import { mixToward, ramp, seriesColorNames, type RampColorName, type SeriesColorName } from '../lib/theme';

const { color } = tokens;

/** One categorical series' look: a series colour, dashed once the seven colours have all been used. */
export interface CategoricalColor {
  color: SeriesColorName;
  /** True from the 8th series on: past seven hues, a pattern tells series apart, never a new colour. */
  dashed: boolean;
}

/**
 * Colours for `n` categorical series, in the DLS order: the department table top to bottom (Orange, Salmon Pink,
 * Green, Navy, Amber), then the two reserve accents (Purple, Turquoise). From the 8th series the colours repeat,
 * dashed. Spread the result into a chart's `series` (`{ key, name, ...categoricalColors(n)[i] }`).
 */
export function categoricalColors(n: number): CategoricalColor[] {
  return Array.from({ length: Math.max(0, n) }, (_, i) => ({
    color: seriesColorNames[i % seriesColorNames.length],
    // The DS says "dash, dot" past seven without an assignment: every series from the 8th takes the one dash the
    // charts have (decided 2026-11-12, Q-CMAP-2).
    dashed: i >= seriesColorNames.length,
  }));
}

/**
 * A sequential scale (one metric's intensity, as in a heatmap): `n` steps of the owning element's colour, its
 * `-bg` tint (lightest) to full strength (darkest). Never more than one hue.
 */
export function sequentialColors(element: RampColorName, n: number): string[] {
  return ramp(element, n);
}

/**
 * A diverging scale around a midpoint (spend variance around zero): Green above, Neutral-3 at the midpoint, Red
 * below, as Badge's success and danger. `value` is placed on `-extent … +extent`; beyond it, the end colour.
 */
export function divergingColor(value: number, extent: number, midpoint = 0): string {
  const t = extent > 0 ? Math.max(-1, Math.min(1, (value - midpoint) / extent)) : 0;
  if (t === 0) return color.neutral3;
  return mixToward(color.neutral3, t > 0 ? color.green : color.red, Math.abs(t));
}

/** `n` evenly spaced steps of the diverging scale, Red to Green through Neutral-3 (an odd `n` keeps the midpoint). */
export function divergingColors(n: number): string[] {
  if (n <= 1) return [color.neutral3];
  return Array.from({ length: n }, (_, i) => divergingColor(-1 + (2 * i) / (n - 1), 1));
}

/** The chrome's colours: Neutral-3 gridlines, Neutral-5 axis labels, ticks and legend text. Never Neutral-9. */
export const chartChrome = { grid: color.neutral3, text: color.neutral5 } as const;
