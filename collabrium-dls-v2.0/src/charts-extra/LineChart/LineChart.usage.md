# Line chart (Charts (extra))

## Purpose

Change over time as one or more lines, drawn with Recharts. Imported from `@collabrium/ui/charts-extra`; it needs `recharts`. It uses the same tokens, chrome and series colours as the Chart.js set, and the two sets never import each other.

## Use when

- A value changes across ordered categories (months, hours) and the shape of the change is the point.
- Chart.js's Line does not fit: you need a legend that hides series, or a table view built in the same frame.

## Don't use when

- A cumulative volume: use Area chart.
- A value that holds then jumps (tiers, rates): use Step chart.
- Part of a whole: use a doughnut (Chart.js).
- A shape Chart.js already draws well and you have no need of the extras: use Chart.js (`@collabrium/ui/charts`).

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `series` | `ChartSeries[]` | — | One entry per line: `key`, `name`, optional `color` and `dashed`. |
| `curve` | `'smooth' | 'linear'` | `'smooth'` | A gentle curve through the points, or straight segments. |
| `yAxisStart` | `'zero' | 'fit'` | `'fit'` | `fit` zooms the value axis to the data (as Chart.js does for a line). |
| `aria-label` | `string` | — | Names the chart for assistive technology. Required. |
| `data` | `Record<string, string | number>[]` | — | One object per category. Required. |
| `categoryKey` | `string` | — | The key of the category in each row. Required. |
| `categoryLabel` | `string` | `'Category'` | The heading of the category column in the table view. |
| `valueFormat` | `(value: number) => string` | locale number | Formats a value for the axis, tooltip and table. |
| `height` | `'default' | 'tall'` | `'default'` | A floor for the plot height: 260px, or 300px. |
| `legend` | `boolean` | `true` | Shows the legend. |

## Rules

1. Stroke is 2px, with round caps and joins; points are 3px with a 2px Neutral-1 ring, 5px on hover.
2. A series told apart by pattern uses `dashed`; the dash never carries meaning alone (the legend and table name it).
3. Chrome follows the DLS "Chart chrome & marks": no axis borders, the Neutral-3 hairline gridline on the value axis only, footnote tick labels in Neutral-5, a Neutral-1 tooltip with a 1px Neutral-3 border (label2 title, label3 lines, no swatches), and a bottom-left legend with 10px circles.
4. Series colours walk the DLS Chart color mapping (Orange, Salmon Pink, Green, Navy, Amber, Purple, Turquoise), as the Chart.js set does. Past seven series, tell them apart with `dashed`, not new colours.
5. There is no dark theme: the DLS has none for charts.
6. The card, its title and its other controls belong to the host. The chart has none of its own.
7. Every chart has a "View as table" button (a secondary small Button) that swaps the plot for a table of the same data, as the DLS requires of every chart.
8. The legend is a row of buttons that show or hide a series (as Chart.js's legend does); a hidden series is struck through.
9. Reduced motion draws the finished chart at once.

## Accessibility

- The chart is a group named by `aria-label`; the SVG is named by the same text and can be read with the arrow keys.
- The table view carries every value, so the picture, colour and hovering are never required.
- Legend items are real buttons with `aria-pressed`. The View as table button changes its label to say what it will show.
- A series is never told apart by colour alone: the legend, tooltip and table name it.
- Forced-colours mode keeps the swatches and tooltip border visible with system colours.

## Motion

The marks draw in on first appearance (`--duration-slow` is a placeholder: the DLS names no chart animation, Q-CHART-4). Reduced motion turns it off.

## Example

```tsx
import { LineChart } from '@collabrium/ui/charts-extra';

// see LineChart.docs.tsx for runnable examples
```

## Replaces

Amicro `MonoRoundedLineChart` (the chart only; its card, readout and timeframe toggle are not part of the chart).
