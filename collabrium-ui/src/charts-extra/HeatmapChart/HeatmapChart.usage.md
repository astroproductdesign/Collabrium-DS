# Heatmap (Charts (extra))

## Purpose

How a measure varies across two categories as a grid of shaded cells, drawn in HTML and CSS. Imported from `@collabrium/ui/charts-extra`. It uses the same tokens, chrome and series colours as the Chart.js set, and the two sets never import each other.

## Use when

- A pattern across two categories (weekday by hour, region by month) where the shape matters more than any one figure.

## Don't use when

- A calendar of one value per day: use Activity heatmap.
- Exact values that must be read off: use the table or Bar chart.
- A shape Chart.js already draws well and you have no need of the extras: use Chart.js (`@collabrium/ui/charts`).

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `data` | `Record<string, string | number>[]` | — | One object per row. |
| `rowKey` | `string` | — | The key of each row's name. |
| `rowLabel` | `string` | `'Row'` | The heading of the row-name column in the table. |
| `columns` | `HeatmapColumn[]` | — | The columns, left to right: `key` and `label`. |
| `color` | `'orange' | 'salmonPink' | 'green' | 'navy' | 'amber'` | `'orange'` | The hue of the ramp. |
| `min` | `number` | lowest value | The value shown as the lightest tint. |
| `max` | `number` | highest value | The value shown as the full colour. |
| `aria-label` | `string` | — | Names the chart for assistive technology. Required. |
| `valueFormat` | `(value: number) => string` | locale number | Formats values for the tooltip, scale and table. |
| `height` | `'default' | 'tall'` | `'default'` | A floor for the plot height: 260px, or 300px. |

## Rules

1. One hue only: a single-hue ramp from the element's -bg tint (lowest) to its full colour (highest), mixed continuously. Never a rainbow.
2. Cells are 4px-radius rectangles that fill the grid; hovering outlines one in Obsidian and opens the DLS tooltip.
3. The scale under the grid gives the lowest value, a ramp bar and the highest value.
4. Use `min` and `max` to compare two heatmaps on one scale.
5. The picture has no text of its own, so its table is always in the page for screen readers (visually hidden until View as table).
6. Chrome follows the DLS "Chart chrome & marks": a Neutral-1 tooltip with a 1px Neutral-3 border (label2 title, label3 lines, no swatches).
7. There is no dark theme: the DLS has none for charts.
8. The card, its title and its other controls belong to the host. The chart has none of its own.
9. Every chart has a "View as table" button (a secondary small Button) that swaps the plot for a table of the same data. The DLS exempts Bubble from this; here it has one, because the table is how screen-reader users read the three figures.
10. Reduced motion draws the finished chart at once.

## Accessibility

- The chart is a group named by `aria-label`. The picture has no reliable text of its own, so every value is also in a table that screen readers can read at all times; View as table shows it to everyone.
- The hover tooltip is for the pointer: the cells are not focusable, because the table is the keyboard and screen-reader route to every value.
- Value is never carried by colour alone: hover gives the figure, and the table has every figure.

## Motion

The grid does not animate; a cell outlines on hover over `--duration-fast`.

## Example

```tsx
import { HeatmapChart } from '@collabrium/ui/charts-extra';

// see HeatmapChart.docs.tsx for runnable examples
```

## Replaces

Amicro `MonoRoundedHeatmapChart` (white opacities become a hue ramp; its hover scale-up and header readout are replaced by an outline and the tooltip).
