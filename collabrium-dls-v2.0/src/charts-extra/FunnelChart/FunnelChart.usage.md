# Funnel chart (Charts (extra))

## Purpose

Stages a population passes through, each narrower than the last, as a row of bars drawn with Recharts. Imported from `@collabrium/ui/charts-extra`; it needs `recharts`. It uses the same tokens, chrome and series colours as the Chart.js set, and the two sets never import each other.

## Use when

- A sequence of steps where each step keeps only some of the previous one (sign-up, activation, checkout).

## Don't use when

- Unordered categories: use Bar chart.
- Parts of a whole: use a doughnut (Chart.js) or Stacked bar chart.
- A shape Chart.js already draws well and you have no need of the extras: use Chart.js (`@collabrium/ui/charts`).

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `valueKey` | `string` | — | The key of each stage's count in a row. |
| `name` | `string` | — | Names what is counted, e.g. "Users". |
| `color` | `SeriesColorName` | `'orange'` | One of the seven series colours. |
| `aria-label` | `string` | — | Names the chart for assistive technology. Required. |
| `data` | `Record<string, string | number>[]` | — | One object per category. Required. |
| `categoryKey` | `string` | — | The key of the category in each row. Required. |
| `categoryLabel` | `string` | `'Category'` | The heading of the category column in the table view. |
| `valueFormat` | `(value: number) => string` | locale number | Formats a value for the axis, tooltip and table. |
| `height` | `'default' | 'tall'` | `'default'` | A floor for the plot height: 260px, or 300px. |
| `legend` | `boolean` | `true` | Shows the legend (not on Waterfall or Funnel, which always show theirs). |

## Rules

1. Stages run top to bottom in the order of `data`; keep them widest first.
2. Bars follow the horizontal-bar rule: 4px radius on the outer end, at most 20px thick.
3. The tooltip and the table give each stage as a share of the first stage.
4. The value axis and its gridline are shown, as on every DLS chart.
5. Chrome follows the DLS "Chart chrome & marks": no axis borders, the Neutral-3 hairline gridline on the value axis only, footnote tick labels in Neutral-5, a Neutral-1 tooltip with a 1px Neutral-3 border (label2 title, label3 lines, no swatches), and a bottom-left legend with 10px circles.
6. Series colours walk the DLS Chart color mapping (Orange, Salmon Pink, Green, Navy, Amber, Purple, Turquoise). Past seven series, use a table.
7. There is no dark theme: the DLS has none for charts.
8. The card, its title and its other controls belong to the host. The chart has none of its own.
9. Every chart has a "View as table" button (a secondary small Button) that swaps the plot for a table of the same data.
10. The legend is a row of buttons that show or hide a series; a hidden series is struck through.
11. Reduced motion draws the finished chart at once.

## Accessibility

- The chart is a group named by `aria-label`; the SVG is named by the same text and can be read with the arrow keys.
- The table view carries every value, so the picture, colour and hovering are never required.
- Legend items are real buttons with `aria-pressed`. The View as table button changes its label to say what it will show.
- A series is never told apart by colour alone: the legend, tooltip and table name it.

## Motion

The marks draw in on first appearance (`--duration-slow` is a placeholder: the DLS names no chart animation, Q-CHART-4). Reduced motion turns it off.

## Example

```tsx
import { FunnelChart } from '@collabrium/ui/charts-extra';

// see FunnelChart.docs.tsx for runnable examples
```

## Replaces

Amicro `MonoRoundedFunnelChart` (its hidden value axis becomes the DLS value axis; 8px radius and 16px bars become 4px and the 20px cap).
