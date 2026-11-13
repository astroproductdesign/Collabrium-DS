# Meter (Charts (extra))

## Purpose

One value on a half-circle meter with its reading at the centre, drawn with Recharts. Imported from `@collabrium/ui/charts-extra`; it needs `recharts`. It uses the same tokens, chrome and series colours as the Chart.js set, and the two sets never import each other.

## Use when

- One measure with a natural limit where a half-circle reads better than a full dial (a score, a utilisation).

## Don't use when

- Comparing two or more values: use Bar chart or Radial bar group.
- A trend: use Line chart.
- A shape Chart.js already draws well and you have no need of the extras: use Chart.js (`@collabrium/ui/charts`).

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `value` | `number` | — | The measured value. |
| `max` | `number` | `100` | The value that fills the arch. |
| `name` | `string` | — | What is measured, for the table and screen readers. |
| `caption` | `string` | the name | Written under the value at the centre. |
| `color` | `SeriesColorName` | `'orange'` | One of the seven series colours. |
| `aria-label` | `string` | — | Names the chart for assistive technology. Required. |
| `valueFormat` | `(value: number) => string` | locale number | Formats values for the centre, the tooltip and the table. |
| `height` | `'default' | 'tall'` | `'default'` | A floor for the plot height: 260px, or 300px. |

## Rules

1. The arch is 180°; a coloured bar fills from the left to value / max over a Neutral-3 track, its ends rounded 4px.
2. The reading is the h5 value over a caption at the arch's centre. It is driven by `value`, so the picture and the number cannot disagree (Amicro's sample showed 88 on the arc and 98.2 in the centre).
3. There is no legend and no tooltip.
4. A value past `max` fills the arch and no further.
5. Chrome follows the DLS "Chart chrome & marks": a Neutral-1 tooltip with a 1px Neutral-3 border (label2 title, label3 lines, no swatches) and a bottom-left legend with 10px circles. Round charts have no axes.
6. There is no dark theme: the DLS has none for charts.
7. The card, its title and its other controls belong to the host. The chart has none of its own.
8. Every chart has a "View as table" button (a secondary small Button) that swaps the plot for a table of the same data.
9. Reduced motion draws the finished chart at once.

## Accessibility

- The chart is a group named by `aria-label`; the SVG is named by the same text.
- The table view carries every value, so the picture, colour and hovering are never required.
- The centre reading is real text in the SVG, and the same number is in the table.

## Motion

The marks draw in on first appearance (`--duration-slow` is a placeholder: the DLS names no chart animation, Q-CHART-4). Reduced motion turns it off.

## Example

```tsx
import { MeterChart } from '@collabrium/ui/charts-extra';

// see MeterChart.docs.tsx for runnable examples
```

## Replaces

Amicro `MonoRoundedMeterChart` (its hard-coded centre figure is now `value`).
