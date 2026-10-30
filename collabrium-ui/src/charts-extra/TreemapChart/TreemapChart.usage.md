# Treemap (Charts (extra))

## Purpose

How a total divides into parts as tiles whose areas are the parts, drawn with Recharts. Imported from `@collabrium/ui/charts-extra`; it needs `recharts`. It uses the same tokens, chrome and series colours as the Chart.js set, and the two sets never import each other.

## Use when

- A handful of parts of one total where relative size is the point (disk use, spend by team).

## Don't use when

- More than about ten parts: the small tiles cannot be labelled; use Bar chart.
- Comparing exact values: use Bar chart.
- A shape Chart.js already draws well and you have no need of the extras: use Chart.js (`@collabrium/ui/charts`).

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `data` | `Record<string, string | number>[]` | — | One object per tile. |
| `nameKey` | `string` | — | The key of each tile's name. |
| `valueKey` | `string` | — | The key of each tile's value; it sets its area. |
| `color` | `'orange' | 'salmonPink' | 'green' | 'navy' | 'amber'` | `'orange'` | The hue of the ramp; larger tiles are darker. |
| `aria-label` | `string` | — | Names the chart for assistive technology. Required. |
| `valueFormat` | `(value: number) => string` | locale number | Formats values for the tooltip, scale and table. |
| `height` | `'default' | 'tall'` | `'default'` | A floor for the plot height: 260px, or 300px. |

## Rules

1. Tiles are laid out by size, largest first, and shaded on a single-hue ramp by value: the largest is the darkest.
2. Tiles have a 4px radius and a 2px Neutral-1 border between them.
3. A tile shows its name, and its value and share when there is room; text is Neutral-1 on dark tiles and Neutral-9 on light.
4. The picture's text is not reliable (tiles can be too small), so its table is always in the page for screen readers.
5. Chrome follows the DLS "Chart chrome & marks": a Neutral-1 tooltip with a 1px Neutral-3 border (label2 title, label3 lines, no swatches).
6. There is no dark theme: the DLS has none for charts.
7. The card, its title and its other controls belong to the host. The chart has none of its own.
8. Every chart has a "View as table" button (a secondary small Button) that swaps the plot for a table of the same data. The DLS exempts Bubble from this; here it has one, because the table is how screen-reader users read the three figures.
9. Reduced motion draws the finished chart at once.

## Accessibility

- The chart is a group named by `aria-label`. The picture has no reliable text of its own, so every value is also in a table that screen readers can read at all times; View as table shows it to everyone.
- The hover tooltip is for the pointer: the cells are not focusable, because the table is the keyboard and screen-reader route to every value.
- Value is never carried by colour alone: hover gives the figure, and the table has every figure.

## Motion

The marks draw in on first appearance (`--duration-slow` is a placeholder: the DLS names no chart animation, Q-CHART-4). Reduced motion turns it off.

## Example

```tsx
import { TreemapChart } from '@collabrium/ui/charts-extra';

// see TreemapChart.docs.tsx for runnable examples
```

## Replaces

Amicro `MonoRoundedTreemapChart` (its fixed 3×3 grid of hand-placed spans becomes a real treemap layout; white opacities become a hue ramp).
