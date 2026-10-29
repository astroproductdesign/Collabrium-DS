// Series colours for the Recharts charts: the same DLS "Chart color mapping"
// as the Chart.js set-up in src/charts/chart-setup.ts (the five department
// colours, then Purple and Turquoise). Past 7 series, use dash/marker
// patterns rather than new colours. Taken from the tokens, so the two chart
// engines can never drift apart; nothing here imports Chart.js.
import { tokens } from '../../tokens/tokens';

const { color } = tokens;

export const seriesColors = [
  color.orange,
  color.salmonPink,
  color.green,
  color.navy,
  color.amber,
  color.purple,
  color.turquoise,
] as const;

/** The seven series colours by token name, in mapping order. */
export const seriesColorNames = ['orange', 'salmonPink', 'green', 'navy', 'amber', 'purple', 'turquoise'] as const;

/** One of the seven DLS series colours. Never a free colour string. */
export type SeriesColorName = (typeof seriesColorNames)[number];

/** A series' colour name: the one asked for, or the next in the mapping order. */
export function resolveSeriesColorName(name: SeriesColorName | undefined, index: number): SeriesColorName {
  return name ?? seriesColorNames[index % seriesColorNames.length];
}

/** The hex value of a series colour, for SVG marks that cannot read CSS classes. */
export function seriesColorValue(name: SeriesColorName): string {
  return color[name];
}

/** The five colours that have a tint ramp: the element's tint, its pastel and its full strength. */
export const rampColorNames = ['orange', 'salmonPink', 'green', 'navy', 'amber'] as const;
export type RampColorName = (typeof rampColorNames)[number];

/**
 * A single-hue ramp, lightest first (Chart color mapping, "Sequential"; the
 * Doughnut row of the Marks table): the element's -bg tint, its -bg-strong
 * tint, its pastel, then the full colour. Four rungs.
 */
export function rampRungs(name: RampColorName): readonly [string, string, string, string] {
  const map = {
    orange: [color.fireBg, color.fireBgStrong, color.firePastel, color.orange],
    salmonPink: [color.woodBg, color.woodBgStrong, color.woodPastel, color.salmonPink],
    green: [color.earthBg, color.earthBgStrong, color.earthPastel, color.green],
    navy: [color.waterBg, color.waterBgStrong, color.waterPastel, color.navy],
    amber: [color.goldBg, color.goldBgStrong, color.goldPastel, color.amber],
  } as const;
  return map[name];
}
