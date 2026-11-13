# SparklineChart

## Purpose
A glance, not an instrument: a 2px line with no axes, gridlines, legend, tooltip or table. It lives in StatCard's sparkline slot, never a chart card, in the colour of the element that owns the metric.

Part of the Charts group (`@collabrium/ui/charts`, Chart.js). The chrome, marks
and colours are the DLS's (DESIGN-SYSTEM.md Chart chrome & marks, Chart color
mapping), applied by `setupCharts()`, which the chart runs.

## Use when
- The data story matches (DESIGN-SYSTEM.md Chart type selection): see the
  Charts overview.

## Don't use when
- The shape isn't one Chart.js draws: use Charts (extra).
- One headline number: use StatCard.

## Props
See the docs page's Props table (`SparklineChart.docs.tsx`); every chart takes an
`aria-label`, `height` (`default` 260px / `tall` 300px) and `legend`.

## Rules
1. Sits in a ChartCard; lay several out with ChartGrid.
2. Colours follow the Chart color mapping; parts of one measure take one hue's ramp.
3. No axes, legend, tooltip or table: it annotates a figure already on screen, in StatCard's slot.

## Accessibility
- An image named by its `aria-label` with the first and last values.
- Colour never carries meaning alone.

## Motion
Marks draw in over `--duration-reveal`; none under reduced motion.

## Example

```tsx
import { SparklineChart } from '@collabrium/ui/charts';

<SparklineChart aria-label="Spend, last 8 weeks" values={[12, 14, 13, 15, 14, 16, 17, 18]} color="navy" />
```

## Replaces
- The gallery's Chart.js script for this chart type (preview.html 24180–24445)
