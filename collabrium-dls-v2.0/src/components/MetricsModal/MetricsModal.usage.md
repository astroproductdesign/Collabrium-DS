# MetricsModal

## Purpose
The detail view a Metrics card opens into, as Media Ad Modal is Media Ad
Card's: one item at a time, with its media and a headline size on the side,
then its title and category Tag, its tagline, every bar of the breakdown,
where the audience lives, what it reads about, and related items. Previous
and next step through the list the card came from. First built for
Collab:Media's audience segments; every data-specific string comes from the
host, so it can serve influencers, channels or campaigns too.

A modifier on Media Ad Modal: the same layer, scrim, z-index, page hold,
swing, head, slot and Replay, title row, section titles, related tiles and
footer. It shares Media Ad Modal's carve-out from "one focused decision": it
is a read.

## Use when
- Someone opens a Metrics card to read the item in full.

## Don't use when
- **An ad format with a spec**: use Media Ad Modal.
- **A decision, a form or a confirm step**: use Modal, or a page.

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `open` | boolean | required | Whether the modal is open. |
| `onClose` | `() => void` | required | Close, Escape or a scrim click. Set `open` to false. |
| `item` | `MetricsModalItem` | required | The item shown (below). A new `id` is a swap. |
| `labels` | `MetricsModalLabels` | required | The host strings (below). |
| `onPrevious` / `onNext` | `() => void` | — | Step through the list, wrapping; also ← / →. Leave both out for a one-item list. |
| `onRelatedSelect` | `(id) => void` | required | An "Also see" tile was chosen: show that item. |
| `added` / `onAddedChange` | boolean / `(on) => void` | required | Add's state, in step with the card's. |
| `onPlan` | `() => void` | required | The Primary: navigate to the planner. |
| `cardFor` | `(id) => HTMLElement \| null` | — | The list card for an item, for the return and the fold. |
| `origin` | `RefObject<HTMLElement>` | the card that had focus | The card it swings out of. |
| `keepLive` | `RefObject<HTMLElement>[]` | — | Children of `<body>` kept usable while the page is held (a Toast host). |

`MetricsModalItem`: `id`, `name`, `category`, `categoryTag`, `tagline`,
`bars` (`{ label, value? }[]`), `places` (`{ name, categories }[]`)
(required); `size`, `sizeNote` ("published by KULT"), `reads`, `related` (up
to three `{ id, name, category, size?, media? }`), `media`, `clip`.

`MetricsModalLabels`: `crumbRoot`, `previous`, `next`, `size`, `unit`,
`breakdown`, `places`, `reads`, `related`, `add` (required); `plan` ("Use in
a media plan"), `notPublished` ("Not published"), `noBreakdown` ("No
breakdown on file"), `noPlaces` ("No platforms on file").

The ref goes to the panel; `style` and `className` aren't accepted.

## Rules
1. **Two columns above a 640px panel:** a 220px side (media and size) and the
   main column, 24px apart; the side is sticky while the main column scrolls.
   One column below, media on top, not sticky. The panel caps at 760px.
2. **Every bar, in the host's order**, never sorted, never capped: the card
   shows five, the detail view lists them all.
3. **Missing data, Media Ad Modal's split.** Kept with a sentence, because
   its absence changes a planning decision: the size ("Not published"), the
   breakdown ("No breakdown on file"), "Where they live" ("No platforms on
   file"). Left out when empty: "What they read about", "Also see". A bar
   with no value keeps its row with a dash.
4. **The clip** plays once on open and on every swap, holds its last frame,
   and Replay plays it again. No clip, no Replay.
5. **The foot:** Add far left, the Primary far right. At a panel of 480px or
   less it always stacks: Add centred above a full-width Primary.
6. **Closing returns to the card for the item now showing**, then the last
   list card shown, then the opener, scrolled into view; it folds back into
   the first of those on screen (with `cardFor`).
7. **Don't open it from inside another modal of the family.** Don't read the
   category Tag colours as departments.
8. **Focus opens on the title**, as this DS section says; Media Ad Modal
   opens on Close. The split is the DLS's open question (decided 2026-11-12).
9. **The sticky side rests where it starts** (`top: 0`): the source's 16px
   would set it 16px below the title (decided 2026-11-12).
10. **No headline size** reads "Not published" over the size label, without
    the source note (decided 2026-11-12).

## Accessibility
- The panel is `role="dialog"`, `aria-modal="true"`, named by the title and
  described by the tagline and the headline size.
- It opens with focus on the title (a heading); a swap moves focus to the new
  title. No live region.
- Tab stays in the panel; Escape closes; ← / → step (not with a modifier,
  never from a text field).
- The bars' tracks are hidden; each row reads its label and value ("Not on
  file" for a dash). Add carries `aria-pressed`, the item's name after its
  fixed label. Each related tile reads its name, category and size.
- Forced colours: tracks outlined, fills in CanvasText (Progress Bar's).

## Motion

| Interaction | Motion | Token |
|---|---|---|
| Opening / closing | Media Ad Modal's swing | 0.8s / 0.55s, recorded one-offs |
| Bars | Grow in on open and every swap, staggered | `--duration-base` · `--ease-standard`, after `--duration-fast` + ½ `--duration-instant` a row |
| Clip | Plays once, fades in, holds its last frame | `--duration-base` · `--ease-standard` |
| Reduced motion | No swing, no bar growth, no clip, no Replay | — |

## Example

```tsx
import { MetricsModal } from '@collabrium/ui';

<MetricsModal
  open={openId !== null}
  onClose={() => setOpenId(null)}
  item={byId(shownId)}
  labels={labels}
  onPrevious={() => step(-1)}
  onNext={() => step(1)}
  onRelatedSelect={setShownId}
  added={tray.has(shownId)}
  onAddedChange={on => setInTray(shownId, on)}
  onPlan={() => router.push('/plans/new')}
  cardFor={id => document.querySelector(`[data-audience="${id}"]`)}
/>
```

## Replaces
- `.c-modal.c-modal-media-ad.c-modal-media-ad-metrics`
- `.c-modal-media-ad-metrics-cols`, `-side`, `-main`, `-clip` (`.is-playing`,
  `.is-ended`), `-size` (`.is-empty`), `-bars` (`.is-reset`), `-bar`,
  `-bar-value` (`.is-empty`), `-places`, `-place`, `-relmeta`, `-add`
