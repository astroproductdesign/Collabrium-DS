# Sankey chart (Charts (extra))

## Purpose

How a quantity splits and merges between stages, as nodes joined by bands whose widths are the flows, drawn with Recharts. Imported from `@collabrium/ui/charts-extra`; it needs `recharts`. It uses the same tokens, chrome and series colours as the Chart.js set, and the two sets never import each other.

## Use when

- Showing where a total comes from and where it goes across two to four stages.

## Don't use when

- A loop (flows that return to an earlier node): not supported.
- Many nodes: the labels collide.
- A shape Chart.js already draws well and you have no need of the extras: use Chart.js (`@collabrium/ui/charts`).

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `links` | `SankeyLink[]` | — | The flows: `source`, `target` (node names), `value`. |
| `aria-label` | `string` | — | Names the chart for assistive technology. Required. |
| `valueFormat` | `(value: number) => string` | locale number | Formats values for the tooltip and table. |
| `height` | `'default' | 'tall'` | `'default'` | A floor for the plot height: 260px, or 300px. |

## Rules

1. Nodes are the names in `source` and `target`. Each source takes the next series colour and its bands are a 30% wash of it; every node downstream is Obsidian.
2. Nodes are 12px wide with a 4px radius; the first column's labels sit to its left, the last column's to its right, and any in the middle on a Neutral-1 halo.
3. Hovering a band shows "from → to" and the flow; hovering a node shows its total.
4. The picture's text is not complete, so its table (from, to, flow) is always in the page for screen readers.
5. Chrome follows the DLS "Chart chrome & marks": a Neutral-1 tooltip with a 1px Neutral-3 border (label2 title, label3 lines, no swatches).
6. There is no dark theme: the DLS has none for charts.
7. The card, its title and its other controls belong to the host. The chart has none of its own.
8. Every chart has a "View as table" button (a secondary small Button) that swaps the plot for a table of the same data.
9. Reduced motion draws the finished chart at once.

## Accessibility

- The chart is a group named by `aria-label`. The picture has no reliable text of its own, so every value is also in a table that screen readers can read at all times; View as table shows it to everyone.
- The hover tooltip is for the pointer: the picture is not focusable, because the table is the keyboard and screen-reader route to every value.

## Motion

The marks draw in on first appearance (`--duration-slow` is a placeholder: the DLS names no chart animation, Q-CHART-4). Reduced motion turns it off.

## Example

```tsx
import { SankeyChart } from '@collabrium/ui/charts-extra';

// see SankeyChart.docs.tsx for runnable examples
```

## Replaces

Amicro `MonoRoundedSankeyChart` (two hand-drawn paths into one box becomes a computed Sankey).
