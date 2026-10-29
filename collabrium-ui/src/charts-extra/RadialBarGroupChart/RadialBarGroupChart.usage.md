# Radial bar group (Charts (extra))

## Purpose

Several measures against their limits as nested arches, drawn with Recharts. Imported from `@collabrium/ui/charts-extra`; it needs `recharts`. It uses the same tokens, chrome and series colours as the Chart.js set, and the two sets never import each other.

## Use when

- Three to five measures that each have their own limit (resources, quotas) and are read together.

## Don't use when

- Comparing values across categories by length: use Bar chart.
- One measure: use Gauge arc or Meter.
- A shape Chart.js already draws well and you have no need of the extras: use Chart.js (`@collabrium/ui/charts`).

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `items` | `RadialItem[]` | — | One ring per item, outermost first, up to five: `label`, `value`, optional `max` (default 100), `detail` and `color`. |
| `aria-label` | `string` | — | Names the chart for assistive technology. Required. |
| `valueFormat` | `(value: number) => string` | locale number | Formats values for the centre, the tooltip and the table. |
| `height` | `'default' | 'tall'` | `'default'` | A floor for the plot height: 260px, or 300px. |
| `legend` | `boolean` | `true` | Shows the legend, which shows or hides each slice or ring. |

## Rules

1. The first item is the outermost ring. Each ring fills from the left to value / max over a Neutral-3 track; its ends are rounded 4px.
2. Rings take the series colours in order (or `color` per item).
3. The legend names each ring and hides it; the tooltip gives the value, the maximum and the share.
4. The arches are 180°; keep to five rings so each stays thick enough to read.
5. Chrome follows the DLS "Chart chrome & marks": a Neutral-1 tooltip with a 1px Neutral-3 border (label2 title, label3 lines, no swatches) and a bottom-left legend with 10px circles. Round charts have no axes.
6. There is no dark theme: the DLS has none for charts.
7. The card, its title and its other controls belong to the host. The chart has none of its own.
8. Every chart has a "View as table" button (a secondary small Button) that swaps the plot for a table of the same data.
9. Reduced motion draws the finished chart at once.

## Accessibility

- The chart is a group named by `aria-label`; the SVG is named by the same text and can be read with the arrow keys.
- The table view carries every value, so the picture, colour and hovering are never required.
- Legend items are real buttons with `aria-pressed`. Nothing is told apart by colour alone: the legend, tooltip and table name each slice or ring.
- The centre reading (where there is one) is part of the picture: the same number is in the table.

## Motion

The marks draw in on first appearance (`--duration-slow` is a placeholder: the DLS names no chart animation, Q-CHART-4). Reduced motion turns it off.

## Example

```tsx
import { RadialBarGroupChart } from '@collabrium/ui/charts-extra';

// see RadialBarGroupChart.docs.tsx for runnable examples
```

## Replaces

Amicro `MonoRoundedRadialBarGroup` (its mono tones become series colours; it drew every ring once per item, which is fixed).
