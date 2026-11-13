# Waterfall chart (Charts (extra))

## Purpose

How a total moves between two figures through steps that add to it or take from it, drawn with Recharts. Imported from `@collabrium/ui/charts-extra`; it needs `recharts`. It uses the same tokens, chrome and series colours as the Chart.js set, and the two sets never import each other.

## Use when

- An opening total, a few increases and decreases, and a closing total (a balance, a budget, a headcount bridge).

## Don't use when

- Many categories with no running total: use Bar chart.
- A running total that goes below zero: it is not supported.
- A shape Chart.js already draws well and you have no need of the extras: use Chart.js (`@collabrium/ui/charts`).

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `valueKey` | `string` | — | The key of each step's value: the change for a step, the whole amount for a total. |
| `valueLabel` | `string` | `'Value'` | What the value is, for the tooltip. |
| `totals` | `string[]` | first and last category | The categories that are totals, drawn from zero. `[]` for none. |
| `orientation` | `'vertical' | 'horizontal'` | `'vertical'` | Steps standing up, or lying lengthwise. |
| `aria-label` | `string` | — | Names the chart for assistive technology. Required. |
| `data` | `Record<string, string | number>[]` | — | One object per category. Required. |
| `categoryKey` | `string` | — | The key of the category in each row. Required. |
| `categoryLabel` | `string` | `'Category'` | The heading of the category column in the table view. |
| `valueFormat` | `(value: number) => string` | locale number | Formats a value for the axis, tooltip and table. |
| `height` | `'default' | 'tall'` | `'default'` | A floor for the plot height: 260px, or 300px. |
| `legend` | `boolean` | `true` | Shows the legend (not on Waterfall or Funnel, which always show theirs). |

## Rules

1. Increases are Green, decreases Red, totals Navy; a fixed key under the chart names the three. The Green and Red pair is the DLS diverging pair.
2. Each step floats from where the previous one ended. Totals rise from zero.
3. Floating steps are rounded at 4px on all corners; totals on their outer end only.
4. The tooltip gives the change (with its sign) and the running total; the table has both columns.
5. There is no legend toggle: hiding a step would break the running total.
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
import { WaterfallChart } from '@collabrium/ui/charts-extra';

// see WaterfallChart.docs.tsx for runnable examples
```

## Replaces

Amicro `MonoRoundedWaterfallChart` (all white pills become Green, Red and Navy; its sample data summed wrongly, so it was rebuilt from a change per step).
