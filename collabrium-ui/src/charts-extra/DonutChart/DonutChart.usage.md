# Donut chart (Charts (extra))

## Purpose

Part of a whole as a ring, with the total (or the hovered slice) at the centre, drawn with Recharts. Imported from `@collabrium/ui/charts-extra`; it needs `recharts`. It uses the same tokens, chrome and series colours as the Chart.js set, and the two sets never import each other.

## Use when

- A few parts (up to four) of one whole, where the share of each is the point.

## Don't use when

- More than four slices: use Bar chart, or Stacked bar chart.
- Comparing values across categories: use Bar chart.
- Change over time: use Line chart.
- A shape Chart.js already draws well and you have no need of the extras: use Chart.js (`@collabrium/ui/charts`).

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `data` | `Record<string, string | number>[]` | — | One object per slice, in order. Up to four. |
| `nameKey` | `string` | — | The key of each slice's name. |
| `valueKey` | `string` | — | The key of each slice's value. |
| `color` | `'orange' | 'salmonPink' | 'green' | 'navy' | 'amber'` | `'orange'` | The hue the slices walk, lightest first. |
| `centerLabel` | `string` | `'Total'` | The caption under the total in the centre. |
| `aria-label` | `string` | — | Names the chart for assistive technology. Required. |
| `valueFormat` | `(value: number) => string` | locale number | Formats values for the centre, the tooltip and the table. |
| `height` | `'default' | 'tall'` | `'default'` | A floor for the plot height: 260px, or 300px. |
| `legend` | `boolean` | `true` | Shows the legend, which shows or hides each slice or ring. |

## Rules

1. One hue, one rung of its ramp per slice, lightest first: the element's -bg tint, -bg-strong tint, pastel, then the full colour. Four rungs, so up to four slices (the DLS allows five).
2. A 2px Neutral-1 border sits between slices (the gap-between-slices trick); there are no gaps, rounded slices or drop shadows.
3. The hole is 45% of the radius, as Chart.js's default of 50% of the outer; the ring starts at 12 o'clock and runs clockwise.
4. The centre reads the total; hovering a slice reads that slice's value and name. Hiding a slice in the legend takes it out of the total.
5. The tooltip gives the value and the share; the table has the same shares.
6. Chrome follows the DLS "Chart chrome & marks": a Neutral-1 tooltip with a 1px Neutral-3 border (label2 title, label3 lines, no swatches) and a bottom-left legend with 10px circles. Round charts have no axes.
7. There is no dark theme: the DLS has none for charts.
8. The card, its title and its other controls belong to the host. The chart has none of its own.
9. Every chart has a "View as table" button (a secondary small Button) that swaps the plot for a table of the same data.
10. Reduced motion draws the finished chart at once.

## Accessibility

- The chart is a group named by `aria-label`; the SVG is named by the same text and can be read with the arrow keys.
- The table view carries every value, so the picture, colour and hovering are never required.
- Legend items are real buttons with `aria-pressed`. Nothing is told apart by colour alone: the legend, tooltip and table name each slice or ring.
- The centre reading (where there is one) is part of the picture: the same number is in the table.

## Motion

The marks draw in on first appearance (`--duration-slow` is a placeholder: the DLS names no chart animation, Q-CHART-4). Reduced motion turns it off.

## Example

```tsx
import { DonutChart } from '@collabrium/ui/charts-extra';

// see DonutChart.docs.tsx for runnable examples
```

## Replaces

Amicro `MonoRoundedDonutChart` (its five-point gaps, rounded slices and white-opacity tones become the DLS border and ramp).
