// Chart.js defaults from the Collabrium tokens.
//
// Every value here comes from DESIGN-SYSTEM.md "Chart chrome & marks"
// (lines ~4202–4320) and "Chart color mapping" (~4321–4344). Where the DLS
// says nothing, Chart.js's own default is left alone and a TODO points at
// MIGRATION-LOG.md "Open questions". Call setupCharts() once on the client
// before rendering any chart.
import { Chart, registerables } from 'chart.js';
import { tokens } from '../tokens/tokens';

const { color, text, spacing, font, borderWidth } = tokens;

/**
 * Series colours in order (Chart color mapping, lines 332–334): the five
 * department colours, then Purple and Turquoise. Past 7 series, use
 * dash/marker patterns rather than new colours.
 * NOTE: the Amber/Purple rows of the colour tables (lines 113, 120) give a
 * different order; see MIGRATION-LOG.md, Inconsistencies.
 */
export const seriesColors = [
  color.orange,
  color.salmonPink,
  color.green,
  color.navy,
  color.amber,
  color.purple,
  color.turquoise,
] as const;

/** Bar thickness caps (lines 4242–4243): vertical bars 24px, horizontal bars 20px. */
export const maxBarThickness = { vertical: 24, horizontal: 20 } as const;

const fontOf = (style: { size: number; lh: number; weight: number }) => ({
  family: font.primary,
  size: style.size,
  lineHeight: `${style.lh}px`,
  weight: style.weight,
});

let applied = false;

/** Registers Chart.js and applies the Collabrium defaults. Safe to call more than once. */
export function setupCharts(): void {
  if (applied) return;
  applied = true;
  Chart.register(...registerables);

  const d = Chart.defaults;

  // Type: Mulish carries everything functional (Typography). Tick labels
  // are footnote, Neutral-5 (line 4230).
  d.font = { ...d.font, ...fontOf(text.footnote) };
  d.color = color.neutral5;

  // Axes (lines 4228–4231): no axis borders; the value axis carries the
  // only gridline (Neutral-3); the category axis has none.
  // TODO(open-question): gridline width — the DLS says "hairline" with no px.
  for (const type of ['category', 'linear', 'logarithmic', 'time', 'timeseries'] as const) {
    const scale = d.scales[type];
    scale.border.display = false;
    scale.grid.color = color.neutral3;
    scale.title.font = fontOf(text.label2);
    scale.title.color = color.neutral5;
  }
  d.scales.category.grid.display = false;

  // Legend (line 4235).
  d.plugins.legend.position = 'bottom';
  d.plugins.legend.align = 'start';
  d.plugins.legend.labels.font = fontOf(text.caption);
  d.plugins.legend.labels.color = color.neutral5;
  d.plugins.legend.labels.usePointStyle = true;
  d.plugins.legend.labels.boxWidth = 10;
  d.plugins.legend.labels.boxHeight = 10;
  d.plugins.legend.labels.padding = spacing[16];

  // Tooltip (lines 4232–4234).
  // TODO(open-question): cornerRadius 8 and padding 10 are literals in the
  // DLS with no token behind them; copied as written.
  // TODO(open-question): whether label3's uppercase applies in the body.
  d.plugins.tooltip.backgroundColor = color.neutral1;
  d.plugins.tooltip.borderColor = color.neutral3;
  d.plugins.tooltip.borderWidth = borderWidth.sm;
  d.plugins.tooltip.cornerRadius = 8;
  d.plugins.tooltip.padding = 10;
  d.plugins.tooltip.titleFont = fontOf(text.label2);
  d.plugins.tooltip.titleColor = color.neutral9;
  d.plugins.tooltip.bodyFont = fontOf(text.label3);
  d.plugins.tooltip.bodyColor = color.neutral5;

  // Marks (lines 4241–4246).
  d.elements.bar.borderRadius = spacing[4];
  d.datasets.bar.maxBarThickness = maxBarThickness.vertical;
  d.elements.line.borderWidth = borderWidth.md;
  d.elements.line.tension = 0.3;
  d.elements.line.fill = false;
  d.elements.point.radius = 3;
  d.elements.point.hoverRadius = 5;
  d.elements.point.borderWidth = borderWidth.md;
  d.elements.point.borderColor = color.neutral1;

  // TODO(open-question): the DLS specifies no chart animation duration or
  // easing, so Chart.js's default animation is kept. Reduced motion is
  // respected (package rule): animation is turned off when the user asks.
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    d.animation = false;
  }
}
