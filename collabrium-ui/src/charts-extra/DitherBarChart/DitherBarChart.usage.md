# Dither bar chart (Charts (extra))

## Purpose

Bar chart with a printed texture, drawn with Recharts. Imported from `@collabrium/ui/charts-extra`; it needs `recharts`. It is Bar chart with each series filled by its own pattern in its own DLS colour.

## Use when

- Series must stay distinguishable without colour (greyscale print, colour-blind readers, a busy dashboard of one hue).
- A deliberate, printed look is wanted.

## Don't use when

- The texture adds nothing: use Bar chart.
- Parts within a total: use Stacked bar chart.

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `series` | `ChartSeries[]` | — | One entry per bar in a group. Each takes the next pattern. Up to five. |
| `orientation` | `'vertical' | 'horizontal'` | `'vertical'` | Bars standing up, or lengthwise. |
| `aria-label`, `data`, `categoryKey`, `categoryLabel`, `valueFormat`, `height`, `legend` | | | As on Bar chart. |

## Rules

1. Everything follows Bar chart: 4px outer-end radius, 24px (20px horizontal) caps, zero baseline, Neutral-2 hover band, chrome, legend, table view.
2. A series is a pattern, in order from sparse to dense: stipple, dots, hatch, checker, stripes. Each is a 12% wash of the series colour with marks in its full colour, and a 1px outline in the colour.
3. The hovered bar's pattern and outline are the colour 15% toward Neutral-9.
4. The legend swatch carries the same pattern as the bars.
5. The pattern is still: unlike Amicro's, it does not flicker or move, so reduced motion changes nothing but the draw-in.
6. Series colours walk the DLS Chart color mapping; the patterns repeat after five series.

## Accessibility

- As Bar chart. The pattern adds a second way to tell a series apart; the legend, tooltip and table still name it.

## Motion

As Bar chart: the marks draw in on first appearance; reduced motion draws the finished chart at once.

## Example

```tsx
import { DitherBarChart } from '@collabrium/ui/charts-extra';

// see DitherBarChart.docs.tsx for runnable examples
```

## Replaces

Amicro `DitherBarChart`: a canvas of randomly placed white squares thinning toward the top, redrawn every frame, with a period toggle, total and tooltip. Here the texture is a fixed SVG pattern in the series colour (Q-XCH-28).
