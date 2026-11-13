# Radar chart (Charts (extra))

## Purpose

Performance across several dimensions as one polygon per series on a web of rings and spokes, drawn with Recharts. Imported from `@collabrium/ui/charts-extra`; it needs `recharts`. It uses the same tokens, chrome and series colours as the Chart.js set, and the two sets never import each other.

## Use when

- Comparing the profile of one or two things across three to six dimensions that share a rating scale.

## Don't use when

- Reading exact values: use the table, or Bar chart.
- More than six axes: pick a different chart.
- Dimensions on different scales.
- A shape Chart.js already draws well and you have no need of the extras: use Chart.js (`@collabrium/ui/charts`).

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `series` | `ChartSeries[]` | — | One entry per polygon: `key`, `name`, optional `color`. |
| `max` | `number` | `10` | The top of every axis: a rating scale, not the data's range. |
| `axisLabel` | `string` | `'Axis'` | The heading of the axis-name column in the table. |
| `aria-label` | `string` | — | Names the chart for assistive technology. Required. |
| `valueFormat` | `(value: number) => string` | locale number | Formats values for the tooltip and table. |
| `height` | `'default' | 'tall'` | `'default'` | A floor for the plot height: 260px, or 300px. |
| `data` | `Record<string, string | number>[]` | — | One object per category. Required. |
| `categoryKey` | `string` | — | The key of the category in each row. Required. |
| `legend` | `boolean` | `true` | Shows the legend, which shows or hides each polygon or wedge. |

## Rules

1. Axes run 0 to `max` (the DLS fixes radar to a rating scale, 0 to 10), never fitted to the data.
2. Each polygon is a 2px line, a 12% wash and 3px ringed points. Rings and spokes are Neutral-3; axis names are footnote text in Neutral-5.
3. Ring values sit on an opaque Neutral-1 backdrop with 4px of padding, so the fill never swallows a number; they run along the gap between two spokes.
4. Up to six axes (the DLS limit).
5. Chrome follows the DLS "Chart chrome & marks": a Neutral-1 tooltip with a 1px Neutral-3 border (label2 title, label3 lines, no swatches).
6. There is no dark theme: the DLS has none for charts.
7. The card, its title and its other controls belong to the host. The chart has none of its own.
8. Every chart has a "View as table" button (a secondary small Button) that swaps the plot for a table of the same data.
9. Reduced motion draws the finished chart at once.

## Accessibility

- The chart is a group named by `aria-label`; the SVG is named by the same text and can be read with the arrow keys.
- The table view carries every value, so the picture, colour and hovering are never required.
- Nothing is told apart by colour alone: the legend, tooltip and table name each series, wedge or direction.

## Motion

The marks draw in on first appearance (`--duration-slow` is a placeholder: the DLS names no chart animation, Q-CHART-4). Reduced motion turns it off.

## Example

```tsx
import { RadarChart } from '@collabrium/ui/charts-extra';

// see RadarChart.docs.tsx for runnable examples
```

## Replaces

Amicro `MonoRoundedRadarChart` (its fixed 54px radius, hidden ring values, 0 to 100 scale and white fill become the DLS radar).
