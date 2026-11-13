# ChartCard (Chart card)

## Purpose
The card a chart from the Charts group sits in, and the grid that lays several
out: the library's Card with an h5-look title, the chart filling it. Each
chart brings its own frame: the canvas (260px floor, 300px `tall`) and "View
as table". Imported from `@collabrium/ui/charts`.

⚠️ Designed from scratch in the DLS (Chart chrome & marks).

## Use when
- A dashboard or report shows a chart Chart.js can draw.

## Don't use when
- **One headline number.** Use StatCard.
- **A trend beside a number.** A Sparkline in StatCard's slot.
- **Shapes Chart.js can't draw** (Sankey, Funnel, Treemap…). Use Charts (extra).

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `title` | string | required | The card's title (h5 look). |
| `headingLevel` | `2`–`6` | `3` | The title's level. |
| `children` | ReactNode | required | One chart from the Charts group. |

`ChartGrid` lays the cards out. Refs go to the root `<div>`s; `style` and
`className` aren't accepted.

## Rules
1. **Card:** the library's Card, unmodified (16px padding); its parts 8px
   apart. The title is h5 type, Neutral-9, 12px above the chart.
2. **Chart:** `flex: 1 1 auto` with a 260px floor (300px `tall`), so it fills
   whatever height a grid row gives the card. Chart.js draws at that size.
3. **View as table:** a Secondary sm Button, 12px below, reading "View as
   table" or "View as chart". The table takes the chart's exact footprint,
   its content centred, so the card never changes height. Every chart has
   one except Bubble (no table to give).
4. **Grid:** 3 columns, 2 at 1100px and under, 1 at 640px and under, 16px
   apart; cards in a row stretch to the tallest.
5. **Chrome and marks** come from `setupCharts()`, which the card runs: no
   axis borders, one Neutral-3 gridline, footnote ticks, the DS tooltip and
   legend, bar and line marks. Don't restyle them per chart.
6. **Colour:** categories walk the Chart color mapping (orange, pink, green,
   navy, amber, then purple, turquoise); parts of one measure (doughnut, pie,
   stacked) take one element's ramp.

## Accessibility
- The canvas is `role="img"`, named by the title and pointing at the table
  view; the embedded Table carries the values.
- The toggle names what it will show and has `aria-controls` on the table.
- Drawing in is off under reduced motion.

## Motion

| Interaction | Motion | Token |
|---|---|---|
| Chart appears | Marks draw in | `--duration-reveal` · easeOutQuart |
| Reduced motion | No drawing in | — |

## Example

```tsx
import { ChartCard, ChartGrid } from '@collabrium/ui/charts';

<ChartGrid>
  <ChartCard title="Renewals">
    <BarChart aria-label="Renewals by month" data={months} categoryKey="month" series={[{ key: 'renewals', name: 'Renewals' }]} />
  </ChartCard>
</ChartGrid>
```

## Replaces
- `.c-chart-grid`, `.c-chart-card` (`.is-table-view`), `.c-chart-canvas-wrap`
  (`.tall`), `.c-chart-table-wrap` (`.tall`), `.c-chart-table-btn`,
  `.c-chart-table`
- The gallery's `wireTableToggle` script
