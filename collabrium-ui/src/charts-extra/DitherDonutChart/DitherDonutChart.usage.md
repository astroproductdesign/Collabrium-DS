# Dither donut chart (Charts (extra))

## Purpose

Part of a whole as a ring with a printed texture, drawn with Recharts. Imported from `@collabrium/ui/charts-extra`; it needs `recharts`. It is Donut chart with the tint ramp replaced by a ramp of patterns.

## Use when

- Slices must stay distinguishable without colour or tint.
- A deliberate, printed look is wanted.

## Don't use when

- The texture adds nothing: use Donut chart.
- More than four slices: use Bar chart.

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `data` | `Record<string, string | number>[]` | — | One object per slice. Up to four. |
| `nameKey` | `string` | — | The key of each slice's name. |
| `valueKey` | `string` | — | The key of each slice's value. |
| `color` | `'orange' | 'salmonPink' | 'green' | 'navy' | 'amber'` | `'orange'` | The one hue every slice is drawn in. |
| `centerLabel` | `string` | `'Total'` | Caption under the centre total. |
| `aria-label`, `valueFormat`, `height`, `legend` | | | As on Donut chart. |

## Rules

1. Everything follows Donut chart: ring from 45% to 90% of the plot, 2px Neutral-1 border between slices, centre reading, tooltip, legend, table.
2. Every slice is the same hue. Each is a pattern, from sparse to dense: stipple, dots, hatch, checker. This takes the place of the ramp's tints (Q-XCH-29).
3. Each pattern is a 12% wash of the hue with marks in its full colour.
4. The legend swatch carries the slice's pattern.
5. The pattern is still: it does not flicker or move.
6. Up to four slices.

## Accessibility

- As Donut chart. The pattern is a second way to tell slices apart; the legend, tooltip and table still name each.

## Motion

As Donut chart: the ring draws in on first appearance; reduced motion draws it at once.

## Example

```tsx
import { DitherDonutChart } from '@collabrium/ui/charts-extra';

// see DitherDonutChart.docs.tsx for runnable examples
```

## Replaces

Amicro `DitherDonutChart`: a canvas of animated, jittered squares in five greys on a dark card, with a period toggle and a plan list. Here the texture is a fixed SVG pattern, the plan list is the legend and table, and the card and toggle belong to the host.
