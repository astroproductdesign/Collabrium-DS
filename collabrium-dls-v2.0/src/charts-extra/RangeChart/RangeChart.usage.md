# Range chart (Charts (extra))

## Purpose

A floating band between a low and a high value per category, drawn with Recharts. Imported from `@collabrium/ui/charts-extra`; it needs `recharts`. It uses the same tokens, chrome and series colours as the Chart.js set, and the two sets never import each other.

## Use when

- Each category has a min and a max (variance, confidence band, price range) and the width of the band matters.

## Don't use when

- A single value per category: use Line chart.
- Showing a distribution: use a box plot (not in this set yet).
- A shape Chart.js already draws well and you have no need of the extras: use Chart.js (`@collabrium/ui/charts`).

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `minKey` | `string` | — | The key of the low end of the range in each row. |
| `maxKey` | `string` | — | The key of the high end of the range in each row. |
| `name` | `string` | — | Names the band in the legend, the tooltip and the table. |
| `color` | `SeriesColorName` | `'orange'` | One of the seven series colours. |
| `yAxisStart` | `'zero' | 'fit'` | `'zero'` | Where the value axis starts. |
| `aria-label` | `string` | — | Names the chart for assistive technology. Required. |
| `data` | `Record<string, string | number>[]` | — | One object per category. Required. |
| `categoryKey` | `string` | — | The key of the category in each row. Required. |
| `categoryLabel` | `string` | `'Category'` | The heading of the category column in the table view. |
| `valueFormat` | `(value: number) => string` | locale number | Formats a value for the axis, tooltip and table. |
| `height` | `'default' | 'tall'` | `'default'` | A floor for the plot height: 260px, or 300px. |
| `legend` | `boolean` | `true` | Shows the legend. |

## Rules

1. The band is a 12% wash of its colour with a 2px line on each edge; there are no points.
2. The tooltip shows "low – high"; the table has a column for each end.
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
import { RangeChart } from '@collabrium/ui/charts-extra';

// see RangeChart.docs.tsx for runnable examples
```

## Replaces

Amicro `MonoRoundedRangeChart` (its gradient fill becomes the flat 12% wash).
