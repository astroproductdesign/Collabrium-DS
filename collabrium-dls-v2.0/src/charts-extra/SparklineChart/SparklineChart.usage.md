# Sparkline (Charts (extra))

## Purpose

A glance at a trend beside a figure that is already on screen, drawn with Recharts. Imported from `@collabrium/ui/charts-extra`; it needs `recharts`. It follows the DLS Sparkline row and is meant for the Stat / KPI card's reserved sparkline slot.

## Use when

- A figure on screen needs the shape of its trend beside it.

## Don't use when

- The values themselves need reading: use Line chart.
- More than one series: use Line chart.
- A shape Chart.js already draws well: Chart.js's Line, styled the same, also does this (`@collabrium/ui/charts`).

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `aria-label` | `string` | — | Names the measure. Required. |
| `values` | `number[]` | — | The values in order, oldest first. At least two. Required. |
| `color` | `SeriesColorName` | `'orange'` | The colour of the element that owns the metric. |
| `fill` | `boolean` | `false` | A 12% wash of the colour under the line. |
| `endPoint` | `boolean` | `false` | A 3px point on the latest value. |
| `valueFormat` | `(value: number) => string` | locale number | Formats values in the spoken summary. |

## Rules

1. 2px line, a gentle curve as Line chart, no axes, gridlines, legend or tooltip.
2. No "View as table": the DLS exempts it, as it annotates a figure already on screen.
3. The colour is the owning element's, one of the seven series colours.
4. The wash is the line's own colour at 12%, never stronger. The end point is 3px with a 2px Neutral-1 ring.
5. It fills the width it is given and is 32px tall (`--cui-spark-height`; Q-XCH-30).
6. The spoken text is the name plus a sentence on the trend (direction, first and last value, low and high).
7. Reduced motion draws the finished line at once.

## Accessibility

- An image (`role="img"`) with the name and the summary sentence; not focusable.
- The figure it sits beside carries the value.

## Motion

The line draws in on first appearance (`--duration-slow` is a placeholder, Q-CHART-4). Reduced motion turns it off.

## Example

```tsx
import { SparklineChart } from '@collabrium/ui/charts-extra';

// see SparklineChart.docs.tsx for runnable examples
```

## Replaces

Amicro `MonoRoundedSparklineChart`. Its three-row panel (name, value, status pill, "Live polling" tag) is a list of Stat items, so only the line is ported, and the DLS colour replaces its white line.
