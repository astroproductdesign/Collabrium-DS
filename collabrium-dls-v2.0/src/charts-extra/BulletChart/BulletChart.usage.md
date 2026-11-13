# Bullet chart (Charts (extra))

## Purpose

Measures against their targets: one bar per measure with a marker at the target. Drawn in HTML and CSS, so it needs no chart engine. Imported from `@collabrium/ui/charts-extra`. It uses the same tokens, chrome and series colours as the Chart.js set, and the two sets never import each other.

## Use when

- A few measures (about two to six) that are each judged against a goal.

## Don't use when

- Comparing many categories against each other: use Bar chart.
- Progress through a task: use a Progress Bar.
- A shape Chart.js already draws well and you have no need of the extras: use Chart.js (`@collabrium/ui/charts`).

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `items` | `BulletItem[]` | — | One entry per measure: `label`, `actual`, `target`, optional `unit`. |
| `color` | `SeriesColorName` | `'orange'` | One of the seven series colours for the bars. |
| `aria-label` | `string` | — | Names the chart. Required. |
| `valueFormat` | `(value: number) => string` | locale number | Formats the numbers. |
| `height` | `'default' | 'tall'` | `'default'` | A floor for the height: 260px, or 300px. |

## Rules

1. Each row has its own scale, from 0 to 115% of its target, so the marker is never at the edge.
2. The track is Neutral-3 and pill-shaped; the target marker is Obsidian; the bar is the series colour.
3. The values are written out ("380 ms of 400 ms target"): whether a target is met is never carried by colour alone.
4. There is no legend (the marker is explained by the text) and no hover.
5. Type follows the DLS: label2 for the measure, caption in Neutral-5 for the values.
6. There is no dark theme: the DLS has none for charts.
7. The card, its title and its other controls belong to the host. The chart has none of its own.
8. Every chart has a "View as table" button (a secondary small Button) that swaps the plot for a table of the same data.
9. Reduced motion draws the finished chart at once.

## Accessibility

- The chart is a group named by `aria-label`; each row reads as text and the bar and marker are hidden from assistive technology.
- The table view carries every value.
- Forced-colours mode: the track is outlined, the bar is the system highlight, the marker the system text colour.

## Motion

Each bar grows from the left once (`--duration-slow`, `--ease-standard`). Reduced motion shows it at full length.

## Example

```tsx
import { BulletChart } from '@collabrium/ui/charts-extra';

// see BulletChart.docs.tsx for runnable examples
```

## Replaces

Amicro `MonoRoundedBulletChart` (monospace type and the white bar become the primary font and the series colour).
