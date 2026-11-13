# BubbleChart

## Purpose
Three measures at once: position (x, y) and size (z, by area). Each series' colour as the edge with a 30% wash; three series at most. No table view: the DS exempts Bubble.

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
See the docs page's Props table (`BubbleChart.docs.tsx`); every chart takes an
`aria-label`, `height` (`default` 260px / `tall` 300px) and `legend`.

## Rules
1. Sits in a ChartCard; lay several out with ChartGrid.
2. Colours follow the Chart color mapping; parts of one measure take one hue's ramp.
3. No table view (the DS exempts Bubble).

## Accessibility
- A figure named by `aria-label`; its canvas is an image pointing at the table view.
- Colour never carries meaning alone.

## Motion
Marks draw in over `--duration-reveal`; none under reduced motion.

## Example

```tsx
import { BubbleChart } from '@collabrium/ui/charts';

<BubbleChart aria-label="Markets by reach, conversion and spend" series={markets} xLabel="Reach" yLabel="Conversion" sizeLabel="Spend" />
```

## Replaces
- The gallery's Chart.js script for this chart type (preview.html 24180–24445)
