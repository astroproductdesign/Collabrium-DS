# PieChart

## Purpose
Part of a whole, as a full pie: Doughnut's recipe with no hole (one hue's ramp, 2px white between slices).

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
See the docs page's Props table (`PieChart.docs.tsx`); every chart takes an
`aria-label`, `height` (`default` 260px / `tall` 300px) and `legend`.

## Rules
1. Sits in a ChartCard; lay several out with ChartGrid.
2. Colours follow the Chart color mapping; parts of one measure take one hue's ramp.
3. "View as table" shows the same values in an embedded Table, in the plot's footprint; rows past it scroll inside, so the card never grows.

## Accessibility
- A figure named by `aria-label`; its canvas is an image pointing at the table view.
- Colour never carries meaning alone.

## Motion
Marks draw in over `--duration-reveal`; none under reduced motion.

## Example

```tsx
import { PieChart } from '@collabrium/ui/charts';

<PieChart aria-label="Tickets by priority" data={priorities} nameKey="priority" valueKey="tickets" color="amber" />
```

## Replaces
- The gallery's Chart.js script for this chart type (preview.html 24180–24445)
