# Composed chart (Charts (extra))

## Purpose

Bars and a line on one canvas for two measures of the same categories, drawn with Recharts. Imported from `@collabrium/ui/charts-extra`; it needs `recharts`. It follows the DLS "Mixed (Bar + Line)" row: each mark follows its own row (Bar, Line) verbatim.

## Use when

- A count and a rate over it (rewards and yield), or a total and its target, over the same categories.

## Don't use when

- Two measures with no shared categories: use two charts.
- More than one line: use Line chart, with a table.
- A shape Chart.js already draws well and you have no need of the extras: use Chart.js's Mixed (`@collabrium/ui/charts`).

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `bars` | `ChartSeries[]` | — | One entry per bar in a group. The axis on the left starts at zero. |
| `line` | `ChartSeries` | — | The line over the bars; it takes the colour after the last bar's. |
| `lineAxis` | `'own' | 'shared'` | `'own'` | Its own scale on a second axis on the right, or the bars' axis. |
| `lineFormat` | `(value: number) => string` | `valueFormat` | Formats the line's values. |
| `aria-label`, `data`, `categoryKey`, `categoryLabel`, `valueFormat`, `height`, `legend` | | | As on Bar chart. |

## Rules

1. Bars follow Bar's rules (4px outer-end radius, 24px cap, hover 15% toward Neutral-9) and the line follows Line's (2px, 3px points with a 2px Neutral-1 ring, 5px on hover, no fill).
2. When the two measures do not share a scale, the line has a second axis on the right with the same hidden border and footnote ticks and no gridline: Neutral-3 is drawn once, on the left axis.
3. The left axis always starts at 0. The right axis fits the line.
4. One line only. The line is drawn over the bars.
5. The tooltip lists every series for the nearest category, each in its own format.
6. Chrome, legend, table view and colours follow the rest of the set (see Bar chart).

## Accessibility

- As Bar chart: a group named by `aria-label`, an SVG named the same and read with arrow keys, a "View as table" button, legend items that are buttons with `aria-pressed`.
- Bars and line are told apart by shape, and each by name in the legend, tooltip and table.

## Motion

Marks draw in on first appearance (`--duration-slow` is a placeholder, Q-CHART-4). Reduced motion draws the finished chart at once.

## Example

```tsx
import { ComposedChart } from '@collabrium/ui/charts-extra';

// see ComposedChart.docs.tsx for runnable examples
```

## Replaces

Amicro `MonoRoundedComposedChart`: its three-way toggle (all, rewards, yield), headline total, grey bars and white line become the legend (which shows or hides each series) and the DLS Bar and Line marks; the headline belongs to the host's card.
