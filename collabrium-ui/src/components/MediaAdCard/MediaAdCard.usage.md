# Media Ad Card

## Purpose
One ad format as a gallery tile: a full-bleed 16:10 media slot on top, then the
format's name and family Tag, then a body that shows the tagline at rest and
trades it for three spec rows (Objective, Sizes, Benchmark) when the card goes
Live. Built for Collab:Media's Ad formats catalogue, where a planner reads
forty-odd formats by moving the pointer across them. `MediaAdCardSkeleton` is
its loading state.

## Use when
- Each tile is a thing someone could buy or run whose look matters as much as its numbers: ad formats, placements, creative templates.

## Don't use when
- **It is a person.** Use Profile card.
- **It is a campaign moving through stages.** Use Campaign card.
- **It is a metric against a target.** Use Pacing card.
- **The tile has no media.** Use an interactive Card.
- **Its figures matter more than its spec** (audience segments, influencers). Use Metrics card.

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `name` | text | **required** | Wraps to two lines, then clamps. |
| `family` | `'interactive'` \| `'gamification'` \| `'video'` \| `'social'` \| `'high-impact'` \| `'display'` | **required** | The fixed-colour family Tag. |
| `tagline` | text | **required** | Clamped to two lines. |
| `funnel` | `string[]` | **required** | One line, joined by " · ". |
| `objective` | text | **required** | The Objective row. |
| `sizes` | `string[]` | — | The Sizes row; left out, an em dash. |
| `benchmark` | text | — | The Benchmark row; left out, "Not published". |
| `media` | node | the placeholder | Stretched to the 16:10 slot. |
| `builtForSlot` | boolean | `false` | The "Built for this slot" badge. |
| `onOpen` | `() => void` | **required** | Opens the detail (Media Ad Modal). |
| `compared`, `defaultCompared`, `onComparedChange` | boolean, boolean, `(on) => void` | —, `false`, — | Compare, controlled or not. |
| `tilt` | boolean | `false` | Tilt toward a mouse pointer. |
| `headingLevel` | `2`–`6` | `3` | The look is always h5. |
| `id`, `aria-*`, `data-*` | native | — | Passed to the `<article>`. `style` and `className` are not accepted. |

## Rules
1. **The base Card surface, padding and gap zeroed** so the media runs edge to edge; the body carries the 16px card padding.
2. **The slot owns three things:** the 16:10 ratio, the clip and the Live zoom. Any child is stretched to fill it; `img`, `video`, `picture`, `iframe` and `canvas` are cropped to cover. The component ships only the placeholder, never an ad visual.
3. **Family Tag colours are fixed:** Interactive Water, Gamification Fire, Video Wood, Social Earth, High impact Gold, Display Purple. Here they label kinds of format, not departments.
4. **Live** (hover on hover-capable devices, focus anywhere in the card, or a first tap): shadow-2, a 2px lift, the media zooms to 1.1, the tagline gives way to the specs, Compare's border and glyph darken.
5. **The three spec rows are always there, in order.** No fixed size shows an em dash; no published benchmark shows "Not published"; both in body2 regular, Neutral-5.
6. **Compared:** an Obsidian border plus a 1px Obsidian ring and shadow-3; the border switches instantly. Compare fills Obsidian with a check.
7. **Compare is round,** a recorded exception to Button's icon-only radius-sm: over media it reads as a toggle chip.
8. **Touch is two taps:** the first makes the card Live, the second opens it. A touch outside the card clears Live. A keyboard Enter after a tap still opens.
9. **Tilt is optional,** mouse only, up to 4deg on an 800px perspective with a 1.015 scale.
10. **Loading** is the same shell with bones, exactly as tall as the card that replaces it.
11. **Width:** place it in `CardGrid columns="functional"` (280px columns); the card sets no width of its own.
12. **A missing size reads "No fixed size" to a screen reader;** the dash is for the eye only, as Campaign card. (Decided 2026-11-05.)
13. **Objective, tagline and funnel are required,** so only Sizes and Benchmark can be missing, the two the DS covers. (Decided 2026-11-05.)
14. **The tilt is off by default;** turn it on with `tilt`. (Decided 2026-11-05.)
15. **Compare is always on the card.** A catalogue without compare wants a different card. (Decided 2026-11-05.)
16. **The one-off values stay local to the component:** the 2px lift, 16:10, the 1.1 zoom, the tilt's 800px / 4deg / 1.015, the hint's 24px, the Compare hit area, the bone sizes and the shimmer's 40%. (Decided 2026-11-05.)
17. **No `.is-touch` hook:** the tap hint shows on real touch devices through `(hover: none)`. (Decided 2026-11-05.)
18. **The Built-for-this-slot badge has a Neutral-3 border,** as the DS says. (Decided 2026-11-05.)
19. **The skeleton's shimmer is Progress Bar's keyframe, copied here** until Progress Bar is converted, then shared. (Decided 2026-11-05.)

## Accessibility
- The root is a plain `<article>`, never `role="button"`. The name is a real button stretched over the card, announced "{Name}, {Family}. Open details"; Compare is a sibling button above it.
- Compare's label is fixed ("Compare {Name}"); `aria-pressed` carries the state; `aria-keyshortcuts="c"`.
- **C** toggles Compare while focus is anywhere in the card: no modifier, no key repeat, never from a text field.
- Tab order is the name, then Compare.
- The skeleton is `aria-hidden`; set `aria-busy` on the grid.
- In forced colours the focus ring is a CanvasText outline and Compared a Highlight outline.

## Motion

| Interaction | Motion | Token |
|---|---|---|
| Live | 2px lift, shadow-2; media zoom to 1.1; tagline out, specs in | zoom `--duration-slow` · `--ease-settle`; swap `--duration-base` |
| Tilt | Up to 4deg toward the mouse | `--duration-fast` · `--ease-standard` |
| Loading | Bone shimmer | `--duration-ambient` |
| Reduced motion | No lift, zoom, tilt or slide; the specs cross-fade; the shimmer stops | `--duration-fast` |

## Example

```tsx
import { CardGrid, MediaAdCard } from '@collabrium/ui';

<CardGrid columns="functional">
  <MediaAdCard name="Swipe Gallery" family="interactive"
    tagline="A horizontal carousel of product frames that viewers swipe through at their own pace."
    funnel={['Consideration', 'Conversion']} objective="Engagement"
    sizes={['300×250', '320×480']} benchmark="CTR 2.1%"
    onOpen={openFormat} onComparedChange={on => setCompare('swipe-gallery', on)} />
</CardGrid>
```

## Replaces
- `.c-card.c-card-interactive.c-card-media-ad`, `.is-live`, `.is-compared`, `.is-tilting`, `.is-touch`
- `.c-card-media-ad-frame`, `-slot`, `-placeholder`, `-hint`, `-native`, `-compare`
- `.c-card-media-ad-body`, `-titlerow`, `-title`, `-open`, `-swap`, `-rest`, `-tagline`, `-funnel`, `-spec`, `-spec-row`
- `.c-card-media-ad-skeleton`, `-bone` (`.is-media`, `.is-title`, `.is-pill`, `.is-line`)
