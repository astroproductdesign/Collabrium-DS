# Stacked bar chart (Charts (extra))

## Purpose

Parts within a total, compared across categories, drawn with Recharts. Imported from `@collabrium/ui/charts-extra`; it needs `recharts`. It uses the same tokens, chrome and series colours as the Chart.js set, and the two sets never import each other.

## Use when

- Showing how parts add up to a whole in each category.
- The parts add up to a figure the bar is labelled with (use `totalKey`).

## Don't use when

- Comparing the exact size of the inner parts: grouped Bar chart reads better.
- A single series: use Bar chart.
- A shape Chart.js already draws well and you have no need of the extras: use Chart.js (`@collabrium/ui/charts`).

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `series` | `ChartSeries[]` | — | The parts of each bar, bottom (or left) to top (or right). |
| `orientation` | `'vertical' | 'horizontal'` | `'vertical'` | Bars standing up, or lying lengthwise. |
| `totalKey` | `string` | — | The key of the figure each bar is labelled with. The part not covered is drawn in Neutral-3. |
| `remainderName` | `string` | `'Remaining'` | What the uncovered part is called. |
| `ramp` | `'orange' | 'salmonPink' | 'green' | 'navy' | 'amber'` | — | For parts of one measure: a single-hue ramp, lightest first, up to three parts. |
| `aria-label` | `string` | — | Names the chart for assistive technology. Required. |
| `data` | `Record<string, string | number>[]` | — | One object per category. Required. |
| `categoryKey` | `string` | — | The key of the category in each row. Required. |
| `categoryLabel` | `string` | `'Category'` | The heading of the category column in the table view. |
| `valueFormat` | `(value: number) => string` | locale number | Formats a value for the axis, tooltip and table. |
| `height` | `'default' | 'tall'` | `'default'` | A floor for the plot height: 260px, or 300px. |
| `legend` | `boolean` | `true` | Shows the legend (not on Waterfall or Funnel, which always show theirs). |

## Rules

1. Only the outer end of each stack is rounded: the last non-zero, visible part of each bar, worked out per bar. Every internal join is square.
2. The stack must sum to the figure it is labelled with. When the series do not account for the whole, set `totalKey` and the rest is drawn in Neutral-3.
3. Different categories walk the series colours. Parts of ONE measure take a single-hue `ramp` and never two hue families.
4. A ramp cannot clear 3:1 at every step, so every part is also named by the legend, the tooltip and the table: never by colour alone.
5. The value axis starts at 0.
6. Chrome follows the DLS "Chart chrome & marks": no axis borders, the Neutral-3 hairline gridline on the value axis only, footnote tick labels in Neutral-5, a Neutral-1 tooltip with a 1px Neutral-3 border (label2 title, label3 lines, no swatches), and a bottom-left legend with 10px circles.
7. Series colours walk the DLS Chart color mapping (Orange, Salmon Pink, Green, Navy, Amber, Purple, Turquoise). Past seven series, use a table.
8. There is no dark theme: the DLS has none for charts.
9. The card, its title and its other controls belong to the host. The chart has none of its own.
10. Every chart has a "View as table" button (a secondary small Button) that swaps the plot for a table of the same data.
11. The legend is a row of buttons that show or hide a series; a hidden series is struck through.
12. Reduced motion draws the finished chart at once.

## Accessibility

- The chart is a group named by `aria-label`; the SVG is named by the same text and can be read with the arrow keys.
- The table view carries every value, so the picture, colour and hovering are never required.
- Legend items are real buttons with `aria-pressed`. The View as table button changes its label to say what it will show.
- A series is never told apart by colour alone: the legend, tooltip and table name it.

## Motion

The marks draw in on first appearance (`--duration-slow` is a placeholder: the DLS names no chart animation, Q-CHART-4). Reduced motion turns it off.

## Example

```tsx
import { StackedBarChart } from '@collabrium/ui/charts-extra';

// see StackedBarChart.docs.tsx for runnable examples
```

## Replaces

Amicro `MonoRoundedStackedBarChart` (its bottom-and-top pill rounding becomes the DLS outer-end-only rule).
