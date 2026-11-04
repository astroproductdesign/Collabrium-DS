# Entry Card

## Purpose
A compact "start here" tile in a small set of starting points, one per kind
of work a person can begin. A decorative media slot, a title, a one-line hint
and a corner chevron; the whole card is one real `<button>` (or `<a href>`),
so nothing is nested. Two variants: **Character** (a figure drawn bigger than
the card, rising above its top edge) and **Artefact** (an 84px tile with a
drawing of what the entry makes). `EntryCardSet` is the list around them.
Ported from Collab:Sales Home's "door" cards.

## Use when
- A start screen offers two to six starting points, each opening one flow straight away, and a picture of the outcome helps someone choose.

## Don't use when
- **It is a promo or insight with body copy and a CTA.** Use Hero Card (not converted yet).
- **It is a thing to buy or compare.** Use Media Ad Card (not converted yet).
- **It is a choice submitted later.** Use Radio Card (not converted yet).
- **It feeds a bulk action.** Use Selectable card.

## Props

`EntryCardSet`

| Name | Options | Default | Description |
|---|---|---|---|
| `label` | text | **required** | Names the list ("Start from any piece"), announced as "list, 5 items". |
| `variant` | `'character'` \| `'artefact'` | `'character'` | Every card in the set. Changing it runs the swap on the same buttons. |
| `columns` | `4` \| `5` \| `6` | `5` | Columns at full width (860px of set and up). |
| `idleTour` | boolean | `true` | Character: after 8s idle, one 4s beat per card, once per page view. |
| `children` | `EntryCard`s | **required** | Two to six. Each is wrapped in an `<li>`. |
| `id`, `aria-*`, `data-*` | native | — | Passed to the set's `<div>`. |

`EntryCard`

| Name | Options | Default | Description |
|---|---|---|---|
| `title` | text | **required** | About two words. One line. |
| `hint` | text | **required** | One line, truncating on screen, read in full. |
| `onClick` | `() => void` | — | The button form: opens something in place. |
| `href` | URL | — | The link form: goes to a URL. |
| `disabled` | boolean | `false` | Button form only. |
| `artefact` | `'brief'` \| `'research'` \| `'idea'` \| `'package'` \| `'deck'` | `'brief'` | Artefact: the drawing. |
| `still` | URL | — | Character: the still (PNG or WebP with alpha, on the 4:3 board). Without it, the placeholder figure. |
| `clip` | `{ webm?, hevc? }` | — | Character: the looped clip, alpha WebM and HEVC; loaded on first play. |
| `figureX` | number (px) | `0` | Character: a per-character horizontal nudge. |
| `variant` | `'character'` \| `'artefact'` | `'character'` | Only for a card outside a set; inside one the set decides. |
| `aria-*`, `data-*`, events | native | — | Passed to the button or link. `style` and `className` are not accepted. |

The `ref` is forwarded to the set's `<div>` and to the card's button or link.

## Rules
1. **The whole card is one button** (or one link). Nothing interactive inside it.
2. **One variant per set.** The set's `variant` applies to every card; a mixed row reads as broken.
3. **Columns follow the set, not the viewport:** 1 under 280px, 2, 3 from 640px, 5 (or `columns`) from 860px. No 4-up step: a 4 + 1 row reads as one left over. Cards drop the base 240px floor (an entry needs about 150px).
4. **Character headroom:** `clamp(24px, 0.31c + 21px, 112px)`, c being the card's content width, used as the grid's top padding, its row gap and the slot's clip ceiling, so the heads never hit anything.
5. **Hover and keyboard focus** lift the card 2px with shadow-2, nudge the chevron 2px, raise the figure 6px and loop its clip, or run the drawing's one motion. Pressed collapses the lift.
6. **Disabled (button only):** 40% media, Neutral-4 text, no chevron, no hover. A link entry is never disabled.
7. **The still and clip switch hard,** never cross-fade: the clip shows only once it is playing. If it can't play, the still stays, silently.
8. **Playback:** only one card plays at a time; touch never plays. After 8s with no interaction the next card plays one 4s beat, once; any input stops a beat; after every card has had a turn the tour is over for that page view. Nothing plays under reduced motion, in a hidden tab, or for a card less than half in view.
9. **Switching the look** fades the cards down and out, changes them in place, and brings them back up 50ms apart. Same buttons, so focus is kept.
10. **The research dots are decoration,** not department ownership.

## Accessibility
- One name per card from its content: "Brief, Turn an email into a brief" (a hidden ", " separates the lines). No `aria-label`.
- The media is decorative: `aria-hidden`, `alt=""`, the clip out of the tab order; the chevron is hidden too.
- The set is a `<ul>` with a label.
- The card never moves focus. When an entry opens a sheet or dialog, focus goes to that view's heading and returns to the card on close.
- Playback is user-started or a single 4s beat, so it meets WCAG 2.2.2 without a pause control.
- In forced colours, focus is a 2px CanvasText outline and a disabled card takes GrayText.

## Motion

| Interaction | Motion | Token |
|---|---|---|
| Hover / keyboard focus | 2px lift, chevron 2px, figure 6px; the drawing's motion | `--duration-base` · `--ease-settle`; drawings `--duration-slow` |
| Press | Lift and shadow back to rest | `--duration-instant` |
| Switch look | Fade down and out, rise back in 50ms apart; headroom eases | `--duration-base`, `--duration-morph`, `--duration-slow` |
| Reduced motion | No movement and no clips; shadow and colour stay (the bulb still lights) | — |

## Example

```tsx
import { EntryCard, EntryCardSet } from '@collabrium/ui';

<EntryCardSet label="Start from any piece" variant="artefact">
  <EntryCard title="Brief" hint="Turn an email into a brief" artefact="brief" onClick={openBrief} />
  <EntryCard title="Deck" hint="Make a pitch deck" artefact="deck" onClick={openDeck} />
</EntryCardSet>
```

## Replaces
- `.c-card-entry-set`, `.c-card-entry-grid`, `.is-swapping`, `.is-entering`
- `.c-card-entry`, `.c-card-entry-character`, `.c-card-entry-artefact`
- `.c-card-entry-media`, `-text`, `-title`, `-hint`, `-go`, `-figure` (`.is-playing`), `-still`, `-clip`, `-figure-placeholder`
- `.c-card-entry-art` and its `-art-*` parts
- The `EntryPlayback` host scheduler (DESIGN-SYSTEM.md), built into `EntryCardSet`
