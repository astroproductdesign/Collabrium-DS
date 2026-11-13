# Scatter chart (Charts (extra))

## Purpose

Two measures plotted against each other, one point per case, with no line between them, drawn with Recharts. Imported from `@collabrium/ui/charts-extra`; it needs `recharts`. It uses the same tokens, chrome and series colours as the Chart.js set, and the two sets never import each other.

## Use when

- Showing correlation or distribution between two measures.
- Chart.js's Scatter does not fit: you need a legend that hides series, or a table view in the same frame.

## Don't use when

- A third measure as size: use Bubble chart.
- Change over time: use Line chart.
- Few cases that are compared by value: use Bar chart.
- A shape Chart.js already draws well and you have no need of the extras: use Chart.js (`@collabrium/ui/charts`).

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `series` | `XYSeries[]` | — | One entry per group of points: `name`, `points` (`x`, `y`, optional `name`) and optional `color`. |
| `xLabel` | `string` | — | Title of the horizontal axis. |
| `yLabel` | `string` | — | Title of the vertical axis. |
| `xFormat` | `(value: number) => string` | locale number | Formats horizontal values. |
| `yFormat` | `(value: number) => string` | locale number | Formats vertical values. |
| `aria-label` | `string` | — | Names the chart for assistive technology. Required. |
| `valueFormat` | `(value: number) => string` | locale number | Formats values for the tooltip, scale and table. |
| `height` | `'default' | 'tall'` | `'default'` | A floor for the plot height: 260px, or 300px. |
| `legend` | `boolean` | `true` | Shows the legend, which shows or hides each series. |

## Rules

1. Points are 6px (8px on hover) in the series colour with a 1px Neutral-1 border. No line connects them.
2. Both axes carry a title (label2, Neutral-5): the DLS shows axis titles on scatter and bubble charts. The vertical axis has the only gridline.
3. The tooltip titles a point with its `name` (or the series' name) and gives both figures.
4. Both axes fit the data; neither is forced to zero.
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
import { ScatterChart } from '@collabrium/ui/charts-extra';

// see ScatterChart.docs.tsx for runnable examples
```

## Replaces

Amicro `MonoRoundedScatterChart` (its sized nodes, leaders filter and header readout are not part of the chart; points are the DLS 6px).
