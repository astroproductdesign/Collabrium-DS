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
  // Gridline width: 1px, the `sm` border width (decided 2026-10-30, Q-CHART-1).
  // Chart.js keeps the options every axis shares on `defaults.scale`; `defaults.scales[type]` holds only each type's
  // own, deep-merged over it. (Writing border / grid / title per type failed: those objects don't exist there.)
  // Typed as the cartesian scale's options, which carry border and title (the radial scale's type has neither).
  const scale = d.scale as unknown as { border: object; grid: object; title: object };
  scale.border = { ...scale.border, display: false };
  scale.grid = { ...scale.grid, color: color.neutral3, lineWidth: borderWidth.sm };
  scale.title = { ...scale.title, font: fontOf(text.label2), color: color.neutral5 };
  // The category axis has no gridline (merged over the shared grid above).
  d.scales.category = { ...d.scales.category, grid: { ...d.scales.category?.grid, display: false } } as typeof d.scales.category;
  // Axis numbers shorten (500k, 1.2M); the tooltip keeps the full value (decided 2026-10-30, Q-CHART-6).
  const compact = new Intl.NumberFormat(undefined, { notation: 'compact', maximumFractionDigits: 1 });
  d.scales.linear = {
    ...d.scales.linear,
    ticks: { ...d.scales.linear?.ticks, callback: (value: number | string) => (typeof value === 'number' ? compact.format(value) : value) },
  } as typeof d.scales.linear;

  // Radial charts (radar, polar area; Marks): grid rings and angle lines Neutral-3; tick numbers footnote on an opaque
  // Neutral-1 backdrop with spacing-4 padding, drawn above the marks (z 1) so a fill never swallows them; point
  // labels footnote, Neutral-5.
  d.scales.radialLinear = {
    ...d.scales.radialLinear,
    grid: { ...d.scales.radialLinear?.grid, color: color.neutral3, lineWidth: borderWidth.sm },
    angleLines: { ...d.scales.radialLinear?.angleLines, color: color.neutral3, lineWidth: borderWidth.sm },
    ticks: { ...d.scales.radialLinear?.ticks, z: 1, backdropColor: color.neutral1, backdropPadding: spacing[4], font: fontOf(text.footnote), color: color.neutral5 },
    pointLabels: { ...d.scales.radialLinear?.pointLabels, font: fontOf(text.footnote), color: color.neutral5 },
  } as typeof d.scales.radialLinear;

  // Legend (line 4235).
  d.plugins.legend.position = 'bottom';
  d.plugins.legend.align = 'start';
  d.plugins.legend.labels.font = fontOf(text.caption);
  d.plugins.legend.labels.color = color.neutral5;
  d.plugins.legend.labels.usePointStyle = true;
  d.plugins.legend.labels.boxWidth = 12;
  d.plugins.legend.labels.boxHeight = 12;
  d.plugins.legend.labels.padding = spacing[16];
  // A dashed series' marker is a short dashed line, not a circle: past seven series the dash is the only thing
  // telling two series of one colour apart, and the DS's circular swatch would hide it.
  // The DS gives every legend item a circle; dashed series get this line instead (decided 2026-11-12, Q-CMAP-3).
  const baseLabels = Chart.defaults.plugins.legend.labels.generateLabels;
  d.plugins.legend.labels.generateLabels = (chart) =>
    baseLabels(chart).map((item) => {
      const ds = item.datasetIndex === undefined ? undefined : chart.data.datasets[item.datasetIndex];
      const dash = (ds as { borderDash?: number[] } | undefined)?.borderDash;
      return dash && dash.length ? { ...item, pointStyle: 'line', lineDash: dash, lineWidth: borderWidth.md } : item;
    });

  // Tooltip (lines 4232–4234).
  // cornerRadius 8 and padding 10 are literals in the DLS. Decided 2026-10-30
  // (Q-CHART-2): the DLS adds tokens for them (DLS updates owed). tokens.css
  // is a copy and cannot be edited here, so they stay literals until it does.
  // Body is label3 in normal case (decided 2026-10-30, Q-CHART-3).
  d.plugins.tooltip.backgroundColor = color.neutral1;
  d.plugins.tooltip.borderColor = color.neutral3;
  d.plugins.tooltip.borderWidth = borderWidth.sm;
  d.plugins.tooltip.cornerRadius = 8;
  d.plugins.tooltip.padding = 10;
  d.plugins.tooltip.titleFont = fontOf(text.label2);
  d.plugins.tooltip.titleColor = color.neutral9;
  d.plugins.tooltip.bodyFont = fontOf(text.label3);
  d.plugins.tooltip.bodyColor = color.neutral5;

  // Interaction (decided 2026-10-30, Q-CHART-6): one tooltip per category listing
  // every series for line, area and bar; the nearest point or slice for the
  // charts that have no shared category.
  d.interaction = { ...d.interaction, mode: 'index', intersect: false };
  for (const type of ['doughnut', 'pie', 'polarArea', 'radar', 'scatter', 'bubble'] as const) {
    Chart.overrides[type].interaction = { ...d.interaction, mode: 'nearest', intersect: true };
  }

  // Marks (lines 4241–4246).
  d.elements.bar.borderRadius = spacing[4];
  d.datasets.bar.maxBarThickness = maxBarThickness.vertical;
  // Each bar takes 60% of its category (capped above), so more bars or a narrower
  // chart give thinner bars (decided 2026-10-30, Q-CHART-6).
  d.datasets.bar.categoryPercentage = 0.6;
  d.datasets.bar.barPercentage = 1;
  d.elements.line.borderWidth = borderWidth.md;
  d.elements.line.tension = 0.3;
  d.elements.line.fill = false;
  d.elements.point.radius = 3;
  d.elements.point.hoverRadius = 5;
  d.elements.point.borderWidth = borderWidth.md;
  d.elements.point.borderColor = color.neutral1;

  // Animation (decided 2026-10-30, Q-CHART-4; the DLS owes this spec): marks
  // draw in over `duration-reveal` on an ease-out curve (Chart.js takes named
  // easings, not a cubic-bezier, so `easeOutQuart` stands in for `ease-reveal`).
  // Hover takes `duration-fast` and a resize is immediate. Reduced motion turns
  // it all off (package rule).
  d.animation = { duration: tokens.duration.reveal, easing: 'easeOutQuart' };
  d.transitions.active.animation.duration = tokens.duration.fast;
  d.transitions.resize.animation.duration = 0;
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    d.animation = false;
  }
}
