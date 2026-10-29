# Polar area chart (Charts (extra))

## Purpose

Volume by category when the categories have no order: equal wedges that reach as far as their value, drawn with Recharts. Imported from `@collabrium/ui/charts-extra`; it needs `recharts`. It uses the same tokens, chrome and series colours as the Chart.js set, and the two sets never import each other.

## Use when

- A few unordered categories (regions, channels) where the reach of each wedge shows its size and the rings let you read it.

## Don't use when

- Parts of a whole: use Donut chart.
- Ranking: use Bar chart.
- Concentric progress rings: use Radial gauge.
- A shape Chart.js already draws well and you have no need of the extras: use Chart.js (`@collabrium/ui/charts`).

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `data` | `Record<string, string | number>[]` | — | One object per wedge, in order. Up to four. |
| `nameKey` | `string` | — | The key of each wedge's name. |
| `valueKey` | `string` | — | The key of each wedge's value; it sets the reach. |
| `color` | `'orange' | 'salmonPink' | 'green' | 'navy' | 'amber'` | `'orange'` | The hue the wedges walk, lightest first. |
| `max` | `number` | next round number | The value at the outer ring. |
| `aria-label` | `string` | — | Names the chart for assistive technology. Required. |
| `valueFormat` | `(value: number) => string` | locale number | Formats values for the tooltip and table. |
| `height` | `'default' | 'tall'` | `'default'` | A floor for the plot height: 260px, or 300px. |
| `legend` | `boolean` | `true` | Shows the legend, which shows or hides each polygon or wedge. |

## Rules

1. Every wedge has the same angle; the radius is the value. Four Neutral-3 rings, labelled on the vertical spoke, show the scale.
2. Wedges walk one hue's ramp and are translucent so the rings show through, with a 2px Neutral-1 border. TODO(Q-XCH-25): the Marks table gives 30% and 15%; every wedge is 75% here.
3. Up to four wedges (the ramp's rungs).
4. The Amicro "polar" chart drew concentric rings, which is the Radial gauge; this is the DLS Polar area.
5. Chrome follows the DLS "Chart chrome & marks": a Neutral-1 tooltip with a 1px Neutral-3 border (label2 title, label3 lines, no swatches).
6. There is no dark theme: the DLS has none for charts.
7. The card, its title and its other controls belong to the host. The chart has none of its own.
8. Every chart has a "View as table" button (a secondary small Button) that swaps the plot for a table of the same data.
9. Reduced motion draws the finished chart at once.

## Accessibility

- The chart is a group named by `aria-label`; the SVG is named by the same text and can be read with the arrow keys.
- The table view carries every value, so the picture, colour and hovering are never required.
- Nothing is told apart by colour alone: the legend, tooltip and table name each series, wedge or direction.

## Motion

The marks draw in on first appearance (`--duration-slow` is a placeholder: the DLS names no chart animation, Q-CHART-4). Reduced motion turns it off.

## Example

```tsx
import { PolarAreaChart } from '@collabrium/ui/charts-extra';

// see PolarAreaChart.docs.tsx for runnable examples
```

## Replaces

Amicro `MonoRoundedPolarChart` (concentric rings, which duplicate Radial gauge) with the DLS Polar area chart.
