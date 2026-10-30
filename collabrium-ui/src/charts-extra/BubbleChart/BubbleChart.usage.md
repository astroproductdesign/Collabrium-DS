# Bubble chart (Charts (extra))

## Purpose

Three measures at once, two as position and one as size, drawn with Recharts. Imported from `@collabrium/ui/charts-extra`; it needs `recharts`. It uses the same tokens, chrome and series colours as the Chart.js set, and the two sets never import each other.

## Use when

- Three measures per case where the third is a magnitude (volume, liquidity, headcount).

## Don't use when

- Two measures: use Scatter chart.
- More than three groups: pick a different chart.
- A shape Chart.js already draws well and you have no need of the extras: use Chart.js (`@collabrium/ui/charts`).

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `series` | `XYSeries[]` | — | Up to three groups: `name`, `points` (`x`, `y`, `z`, optional `name`) and optional `color`. |
| `xLabel` | `string` | — | Title of the horizontal axis. |
| `yLabel` | `string` | — | Title of the vertical axis. |
| `sizeLabel` | `string` | — | Names the third measure. |
| `sizeFormat` | `(value: number) => string` | locale number | Formats the third measure. |
| `xFormat` | `(value: number) => string` | locale number | Formats horizontal values. |
| `yFormat` | `(value: number) => string` | locale number | Formats vertical values. |
| `aria-label` | `string` | — | Names the chart for assistive technology. Required. |
| `valueFormat` | `(value: number) => string` | locale number | Formats values for the tooltip, scale and table. |
| `height` | `'default' | 'tall'` | `'default'` | A floor for the plot height: 260px, or 300px. |
| `legend` | `boolean` | `true` | Shows the legend, which shows or hides each series. |

## Rules

1. A bubble is a 30% wash of its series colour with a 2px border in the full colour; its radius grows with the third measure, from 6px to 24px.
2. Keep to three series (the DLS limit).
3. Give every point a `z`: the tooltip and the table give all three figures.
4. Size is read as area, so a bubble twice as large means twice the value.
5. Chrome follows the DLS "Chart chrome & marks": a Neutral-1 tooltip with a 1px Neutral-3 border (label2 title, label3 lines, no swatches).
6. There is no dark theme: the DLS has none for charts.
7. The card, its title and its other controls belong to the host. The chart has none of its own.
8. Every chart has a "View as table" button (a secondary small Button) that swaps the plot for a table of the same data. The DLS exempts Bubble from this; here it has one, because the table is how screen-reader users read the three figures.
9. Reduced motion draws the finished chart at once.

## Accessibility

- The chart is a group named by `aria-label`; the SVG is named by the same text and can be read with the arrow keys.
- The table view carries every value, so the picture, colour and hovering are never required.
- Legend items are real buttons with `aria-pressed`. A series is never told apart by colour alone: the legend, tooltip and table name it.

## Motion

The marks draw in on first appearance (`--duration-slow` is a placeholder: the DLS names no chart animation, Q-CHART-4). Reduced motion turns it off.

## Example

```tsx
import { BubbleChart } from '@collabrium/ui/charts-extra';

// see BubbleChart.docs.tsx for runnable examples
```

## Replaces

Amicro `MonoRoundedBubbleChart` (its white-wash bubbles become the series colour; its header readout is not part of the chart).
