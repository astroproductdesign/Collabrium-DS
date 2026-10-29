// DLS "Chart chrome & marks" (DESIGN-SYSTEM.md ~4314-4400) as plain values for
// Recharts props, which take numbers and colour strings rather than CSS
// classes. The same values as src/charts/chart-setup.ts (Chart.js), read from
// the tokens, so the two engines draw the same furniture.
import { tokens } from '../../tokens/tokens';

const { color, text, font, borderWidth, duration, spacing } = tokens;

/** Axis tick labels: footnote token, Neutral-5. */
export const axisTick = { fontFamily: font.primary, fontSize: text.footnote.size, fill: color.neutral5 } as const;

/** The value axis's only gridline: Neutral-3, hairline. TODO(open-question Q-CHART-1): the DLS gives no px. */
export const grid = { stroke: color.neutral3, strokeWidth: borderWidth.sm } as const;

/** Line stroke: 2px. */
export const lineWidth = borderWidth.md;

/** Points: 3px radius, 2px Neutral-1 ring, 5px on hover. */
export const pointRadius = 3;
export const pointHoverRadius = 5;
/** `strokeDasharray: 'none'` keeps a dashed series' own points solid. */
export const pointRing = { stroke: color.neutral1, strokeWidth: borderWidth.md, strokeDasharray: 'none' } as const;

/** Area fill: a 12% wash off the line's own colour, never more (Marks table). TODO(open-question Q-CHART-5). */
export const washOpacity = 0.12;

/** Dash pattern for a series told apart by pattern rather than colour. */
export const dashPattern = '4 4';

/** The cursor line under a hovering pointer: the gridline colour. */
export const cursor = { stroke: color.neutral3, strokeWidth: borderWidth.sm } as const;

/**
 * Draw-in animation. TODO(open-question Q-CHART-4): the DLS specifies none;
 * `slow` is a placeholder. Reduced motion turns it off (useChartMotion).
 */
export const animation = { animationDuration: duration.slow, animationEasing: 'ease-out' } as const;

export const defaultFormat = (value: number): string => value.toLocaleString();

/** The hovered category on a bar chart: a Neutral-2 band behind the bars. */
export const cursorBand = { fill: color.neutral2 } as const;

/** Bars: 4px radius on the outer end only; 24px thick at most vertically, 20px horizontally (Marks table). */
export const barRadius = spacing[4];
export const maxBarThickness = { vertical: spacing[24], horizontal: spacing[20] } as const;

/** Mixes `amount` of `toward` into `from`, as the DLS's `color-mix(in srgb, …)` does for a bar's hover. */
export function mixToward(from: string, toward: string, amount: number): string {
  const rgb = (hex: string) => [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16));
  const a = rgb(from);
  const b = rgb(toward);
  const out = a.map((v, i) => Math.round(v * (1 - amount) + b[i] * amount));
  return `#${out.map(v => v.toString(16).padStart(2, '0')).join('')}`;
}

/** A bar's hover colour: 15% toward Neutral-9 (Marks table). */
export const barHover = (hex: string): string => mixToward(hex, color.neutral9, 0.15);

/** The empty part of a gauge or ring: Neutral-3, as the DLS Progress Bar's track. */
export const trackColor = color.neutral3;

/** Text drawn inside a round chart (its centre readout): an h5 value (16px, 700) over a caption: small, so it sits inside the ring without crowding it. */
export const readout = {
  value: { fontFamily: font.primary, fontSize: text.h5.size, fontWeight: text.h5.weight, fill: color.neutral9 },
  caption: { fontFamily: font.primary, fontSize: text.caption.size, fontWeight: text.caption.weight, fill: color.neutral5 },
} as const;

/** How thick a ring of the two radial charts is: 8px, the DLS Progress Bar's default track. TODO(open-question Q-XCH-15): no token. */
export const ringThickness = spacing[8];

/** A bubble's fill: the series colour at 30%, the DLS "-wash" of a bubble (Marks table). */
export const bubbleWash = 0.3;

/** Axis titles (scatter and bubble): label2, Neutral-5. */
export const axisTitle = { fill: color.neutral5, fontFamily: font.primary, fontSize: text.label2.size, fontWeight: text.label2.weight } as const;

/** Scatter points: 6px radius, 8px on hover, with a 1px Neutral-1 border (Marks table, Scatter row). */
export const scatterRadius = 6;
export const scatterHoverRadius = 8;

const luminance = (hex: string) => {
  const [r, g, b] = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16) / 255).map(c => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

/** Text colour for a label drawn on `bg`: Neutral-9 or Neutral-1, whichever has the higher contrast. */
export function inkOn(bg: string): string {
  const l = luminance(bg);
  const dark = (l + 0.05) / (luminance(color.neutral9) + 0.05);
  const light = (luminance(color.neutral1) + 0.05) / (l + 0.05);
  return dark >= light ? color.neutral9 : color.neutral1;
}
