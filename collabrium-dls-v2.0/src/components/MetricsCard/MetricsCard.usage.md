# Metrics card

## Purpose
A Media Ad Card variant for an item whose figures matter more than its spec.
Same tile, same behaviour; the body changes. At rest it shows the tagline and
a size line ("**16M** audience · 66% social"); Live, the size becomes a
headline total and the tagline gives way to a breakdown of up to five bars.
First built for Collab:Media's audience segments; it can equally serve
influencers, channels or campaigns. `MetricsCardSkeleton` is its loading state.

## Use when
- Each tile is an item someone picks or reaches, and its figures matter most: audience segments, influencers, channels.

## Don't use when
- **It is a thing to buy or compare by its spec.** Use Media Ad Card.
- **The split itself is the point.** Use Progress-to-Goal Bar's card variant, which has a legend.
- **It is a metric against a target.** Use Pacing card.

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `name` | text | **required** | The title block is always two lines tall. |
| `category`, `categoryTag` | text, `TagVariant` | **required** | 13 characters at most. For audiences, `audienceCategoryTags`. |
| `tagline` | text | **required** | Clamped to three lines. |
| `size` | text | — | The headline figure ("16M"); left out, "Size not published" and "Not published". |
| `unit`, `totalLabel` | text | **required** | "audience", "total audience". |
| `bars` | `{ label, value? }[]` | **required** | In your order, 0–100. The first five show. |
| `moreLabel` | text | `' in details'` | Read after "+N more" by screen readers. |
| `emptyLabel` | text | `'No breakdown on file'` | With no bars. |
| `media` | node | the placeholder | The still. |
| `clip` | video URL | — | Plays only while Live. |
| `onOpen` | `() => void` | **required** | Opens the detail (Metrics modal). |
| `addLabel` | text | **required** | The Add toggle's fixed label. |
| `added`, `defaultAdded`, `onAddedChange` | boolean, boolean, `(on) => void` | —, `false`, — | Add, controlled or not. |
| `tilt` | boolean | `false` | Tilt toward a mouse pointer. |
| `headingLevel` | `2`–`6` | `3` | The look is always h5. |
| `id`, `aria-*`, `data-*` | native | — | Passed to the `<article>`. `style` and `className` are not accepted. |

## Rules
1. **Every Media Ad Card part, state and rule applies** unless listed here: the shell, Live, touch, tilt, the round toggle, the skeleton, reduced motion.
2. **Everything data-specific is the host's:** the unit, the total label, the Add label, the bar labels, the "+N more" suffix and the empty caption.
3. **The title block is always exactly two lines tall,** so every card in a grid is the same height; a longer name clamps with an ellipsis.
4. **The heading wins over the Tag:** the Tag never wraps and is capped at 120px, which fits every approved label (13 characters at most). Over the cap, an ellipsis as a safety net; the category still rides in the name's accessible name.
5. **The swap is 124px whatever the bar count** (label1 line + 8px + 5 caption lines + 4 × 4px). Fewer bars stay top-aligned; rows are never spread apart.
6. **More than five bars:** the first five in your order, and "+N more" at the right end of the total line. Bars are never sorted. **None:** "No breakdown on file".
7. **A bar with no value keeps its row:** an empty track and a dash. **No size:** the size line reads "Size not published" and the total "Not published".
8. **The size line names the top bar:** the highest value among all bars supplied, dropped when there are none.
9. **Added** is Compared's exact treatment. **A** toggles it.
10. **The bars grow in when the card goes Live,** staggered, and reset only after the Spec layer has faded out, so a bar is never seen shrinking.
11. **The clip** (optional) is muted, looped and decorative; it plays only while Live, fades in once it is actually playing, and never plays under reduced motion.
12. **Category Tags, audience use case:** Ethnicity Earth, Income group Gold, Professionals Water, Entertainment Purple, Trendsetter Wood, Shopping Fire; Life stage and Sports neutral. They label categories, not departments.
13. **The top bar reads mid-sentence:** its label's first letter lowercased ("66% social"); an all-capitals label stays ("43% TV"). (Decided 2026-11-05.)
14. **No size:** the rest line is only "Size not published" (no top bar), and the Live total only "Not published" (no total label). The name's accessible name drops the size part. (Decided 2026-11-05.)
15. **Host strings:** `unit`, `totalLabel` and `addLabel` are required; `moreLabel` defaults to " in details" and `emptyLabel` to "No breakdown on file". (Decided 2026-11-05.)
16. **The category colour is the host's choice** (`categoryTag`); the audience mapping ships as `audienceCategoryTags`. (Decided 2026-11-05.)
17. **One-off values stay local:** the 120px Tag cap, the 4ch value column. **The bars are Progress Bar's** compact track and fill. (Decided 2026-11-05.)
18. **The tilt is off by default,** as Media Ad Card. (Decided 2026-11-05.)
19. **Bar values show as given** ("57%"): shares, not progress to a target, so no forced decimal. (Decided 2026-11-05.)
20. **The skeleton** is Media Ad Card's, with the reserved title row and three line bones in the taller swap. (Decided 2026-11-05.)

## Accessibility
- The name's button is announced "{Name}, {Category}, {size} {unit}. Open details".
- The bars are a `<dl>` ("Video, 57%"); the tracks are `aria-hidden`, not `role="progressbar"`, because a share isn't progress toward a goal.
- A bar with no value reads "Not on file".
- The Add toggle's label is fixed; `aria-pressed` carries the state; `aria-keyshortcuts="a"`.
- No live regions; focus is never moved.
- In forced colours the tracks are outlined, the fills drawn in CanvasText, Added a Highlight outline, and a focused Added card keeps the CanvasText focus outline.

## Motion

| Interaction | Motion | Token |
|---|---|---|
| Live | Media Ad Card's; then the bars grow in, row by row | `--duration-base` · `--ease-standard`, after `--duration-fast`, + `--duration-instant` / 2 per row |
| Leave Live | Bars reset instantly, after the Spec layer fades out | delay `--duration-base` |
| Clip | Fades in once playing | `--duration-base` · `--ease-standard` |
| Reduced motion | No clip; bars at their value | — |

## Example

```tsx
import { CardGrid, MetricsCard, audienceCategoryTags } from '@collabrium/ui';

<CardGrid columns="functional">
  <MetricsCard name="Foodies" category="Trendsetter" categoryTag={audienceCategoryTags.Trendsetter}
    tagline="Culinary explorers who seek authentic flavors, quality ingredients, and memorable dining experiences."
    size="16M" unit="audience" totalLabel="total audience"
    bars={[{ label: 'Video', value: 57 }, { label: 'Audio', value: 27 }, { label: 'TV', value: 43 },
      { label: 'Social', value: 66 }, { label: 'Forums', value: 48 }]}
    addLabel="Add Foodies to reach tray" onOpen={openSegment} onAddedChange={on => setInTray('foodies', on)} />
</CardGrid>
```

## Replaces
- `.c-card-media-ad-metrics`, `.is-added`, `.c-card-media-ad-metrics-add`
- `.c-card-media-ad-metrics-name`, `-tag-label`, `-clip` (`.is-playing`), `-still`, `-size`
- `.c-card-media-ad-metrics-total`, `-more`, `-nobars`, `-bars`, `-bar`, `-bar-value`
- The Progress Bar classes inside a bar: `.c-progress-trailing-wrap`, `.c-progress-track.size-compact`, `.c-progress-fill`
