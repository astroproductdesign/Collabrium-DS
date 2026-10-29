# Bar chart (Charts (extra))

## Purpose

Values compared across categories as bars, vertical or horizontal, drawn with Recharts. Imported from `@collabrium/ui/charts-extra`; it needs `recharts`. It uses the same tokens, chrome and series colours as the Chart.js set, and the two sets never import each other.

## Use when

- Comparing values across categories (vertical), or ranking them or showing long names (horizontal).
- Chart.js's Bar does not fit: you need a legend that hides series, or a table view in the same frame.

## Don't use when

- Parts within a total: use Stacked bar chart.
- Change over time with many points: use Line chart.
- A single headline number: use a stat tile.
- A shape Chart.js already draws well and you have no need of the extras: use Chart.js (`@collabrium/ui/charts`).

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `series` | `ChartSeries[]` | — | One entry per bar in a group: `key`, `name`, optional `color`. |
| `orientation` | `'vertical' | 'horizontal'` | `'vertical'` | Bars standing up, or lying lengthwise with the categories on the left. |
| `aria-label` | `string` | — | Names the chart for assistive technology. Required. |
| `data` | `Record<string, string | number>[]` | — | One object per category. Required. |
| `categoryKey` | `string` | — | The key of the category in each row. Required. |
| `categoryLabel` | `string` | `'Category'` | The heading of the category column in the table view. |
| `valueFormat` | `(value: number) => string` | locale number | Formats a value for the axis, tooltip and table. |
| `height` | `'default' | 'tall'` | `'default'` | A floor for the plot height: 260px, or 300px. |
| `legend` | `boolean` | `true` | Shows the legend (not on Waterfall or Funnel, which always show theirs). |

## Rules

1. Bars have a 4px radius on the outer end only (top for vertical, right for horizontal) and are at most 24px thick vertically, 20px horizontally.
2. The value axis always starts at 0, and cannot be changed: a bar's length is its value.
3. The hovered bar darkens 15% toward Neutral-9, and the hovered category gets a Neutral-2 band.
4. Keep to about four series per group; past that, use the table.
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
import { BarChart } from '@collabrium/ui/charts-extra';

// see BarChart.docs.tsx for runnable examples
```

## Replaces

Amicro `MonoRoundedBarChart` (its pill bars, 18px, become the DLS 4px outer-end radius and thickness caps).
