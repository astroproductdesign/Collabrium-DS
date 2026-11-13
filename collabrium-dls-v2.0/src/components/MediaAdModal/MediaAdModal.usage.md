# MediaAdModal

## Purpose
The detail view a Media Ad Card opens into: one ad format at a time, with its
media, name and family Tag, what it's for, the sizes it runs at, how it
performs, where it has run, and what else to consider. Previous and next step
through the list the card came from without closing, so a planner can read a
shortlist in one sitting. Built for Collab:Media's Ad formats catalogue.

A variant of Modal: Modal's panel, scrim, head, body and footer order, wider
(600px) because it is a reading surface. It is one of Modal's carve-outs from
"one focused decision": it is a read. It collects no input, commits nothing in
place ("Use in a media plan" leaves for another page; Compare is a reversible
toggle mirrored on the card) and can be left at any point with nothing lost.

## Use when
- Someone opens a Media Ad Card to read the format in full.

## Don't use when
- **A decision** (archive, delete): use Modal.
- **A form or a confirm step**: use a page. The moment the panel commits
  something in place it stops being a read.
- **Several formats side by side**: use Compare modal.

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `open` | boolean | required | Whether the modal is open. |
| `onClose` | `() => void` | required | Close, Escape or a scrim click. Set `open` to false. |
| `format` | `MediaAdFormat` | required | The format shown (below). A new `id` is a swap. |
| `onPrevious` / `onNext` | `() => void` | — | Step through the list, wrapping at the ends; also ← / →. Leave both out for a one-item list: the arrows are hidden. |
| `onRelatedSelect` | `(id) => void` | required | An "Also consider" tile was chosen: show that format. |
| `compared` / `onComparedChange` | boolean / `(on) => void` | required | Compare's state, in step with the card's. |
| `liveDemo` | `{ onClick }` \| `{ offReason }` | required | Live demo as an action, or switched off with its reason. |
| `onPlan` | `() => void` | required | "Use in a media plan": navigate to the planner. |
| `onReplay` | `() => void` | — | Shows Replay over media that can play again. |
| `origin` | `RefObject<HTMLElement>` | the card that had focus | The card it swings out of and folds back into. |

`MediaAdFormat`: `id`, `name`, `family`, `tagline` (required); `description`;
the six spec values `objective`, `runsOn` (string[]), `bestFor`, `funnel`
(string[]), `cpm`, `inventory`; `sizes` ("300×250", or text such as "16:9
in-content"); `benchmark` (`{ metric, value, ceiling }`, in percent);
`industries`; `related` (up to three `{ id, name, family, media? }`);
`catalogueNote`; `media`.

The ref goes to the panel; `style` and `className` aren't accepted. The modal
renders at `<body>` level.

## Rules
1. **Six spec cells, always, in this order:** Objective, Runs on, Best for,
   Funnel, CPM on file, Monthly inventory, even when most are "Not on file".
2. **Never blank.** A missing cell reads "Not on file" in Neutral-5 (CPM: "Not
   on file — ask Sales"). No sizes: "No fixed size — this unit is built to the
   placement." No benchmark: "No benchmark has been published for this unit.
   Ask Sales for recent campaign numbers before quoting one." Industries is the
   one section left out when empty.
3. **The slot is the consumer's.** The component owns the 16:10 ratio and the
   clip; it ships the card's placeholder and never an ad visual.
4. **Sizes are a sample, not a ruler:** one shared scale, the widest fitting
   96px and the tallest 64px, each box at its exact ratio; a short side under
   6px grows evenly to 6px. A size that isn't W×H is a dashed text chip.
5. **The footer:** Compare far left (a Ghost toggle, not part of the commit
   pair), then Live demo (Secondary), then "Use in a media plan" (Primary),
   8px apart. Pressed Compare keeps its label and takes an inset Obsidian edge,
   never an Obsidian fill. Live demo, when off, stays focusable and gives its
   reason.
6. **Stepping** replaces the body, resets its scroll and moves focus to the
   new title. Previous and next wrap at the ends (the host's `onPrevious` /
   `onNext`).
7. **The page is held still** while it is open: no scrolling, wheel and touch
   blocked outside the panel, everything else `inert`.
8. **Don't open one Media Ad Modal from inside another.**
9. **Narrow (the panel at 480px or less):** specs one column, related two,
   body padding 16, footer buttons stretch. A phone and a narrow panel get the
   same layout.
10. **The host owns the list.** `format` is the data shown; `onPrevious` and
    `onNext` wrap at the ends; a related tile calls `onRelatedSelect`. The
    breadcrumb's "Ad formats" and the button words are fixed (decided
    2026-11-12).
11. **"Use in a media plan" is a Primary Button**, and `onPlan` navigates:
    Button has no link form yet (decided 2026-11-12).
12. **Replay** reads "Replay" with arrow-clockwise (decided 2026-11-12).
13. **The swing turns away from the card's side of the page.** Escape while
    it opens plays it backwards from where it is, ending at the card at 40%
    opacity before the panel goes (decided 2026-11-12).

## Accessibility
- The panel is `role="dialog"`, `aria-modal="true"`, named by the title and
  described by the tagline.
- It opens with focus on Close, as the DS says: the title and tagline are
  read as focus enters the dialog. An approved exception to focusing only a
  heading (decided 2026-11-12). A swap moves focus to the new title (a
  heading); no live region.
- Tab stays in the panel and wraps only at its ends. Escape closes; ← / →
  step (not with a modifier, never from a text field). Focus returns to the
  card on close.
- Compare: `aria-pressed`, label "Compare", the format name for screen
  readers. Live demo off: `aria-disabled`, the reason in `title` and
  `aria-describedby`.
- Size swatches are hidden; each reads "300 by 250 pixels". The benchmark
  bar is decorative.
- Touch: footer buttons 44px tall; the head's 32px icon buttons sit 12px
  apart rather than lifting hit areas that would overlap.
- Forced colours: pressed Compare takes a Highlight outline.

## Motion

| Interaction | Motion | Token |
|---|---|---|
| Opening | The panel swings out of the card (FLIP, 48deg turn at .7 scale, 1200px perspective); the scrim fades in | 0.8s cubic-bezier(.25,.9,.35,1), recorded one-off · scrim `--duration-reveal` |
| Closing | Folds back into the card if it's on screen, else fades; ends fully transparent. Escape mid-opening plays the swing backwards. Nothing responds while it closes | 0.55s cubic-bezier(.3,.6,.35,1) · scrim `--duration-slow` |
| Benchmark | The bar eases in from 0 | `--duration-reveal` · `--ease-flow`, after `--duration-fast` |
| Reduced motion | No swing (the panel fades); the bar isn't animated | `--duration-base` |

## Example

```tsx
import { MediaAdModal } from '@collabrium/ui';

<MediaAdModal
  open={openId !== null}
  onClose={() => setOpenId(null)}
  format={byId(shownId)}
  onPrevious={() => step(-1)}
  onNext={() => step(1)}
  onRelatedSelect={setShownId}
  compared={compare.has(shownId)}
  onComparedChange={on => setCompared(shownId, on)}
  liveDemo={{ onClick: () => openDemo(shownId) }}
  onPlan={() => router.push('/plans/new')}
/>
```

## Replaces
- `.c-modal-media-ad-layer` (`.is-open`, `.is-shown`), `-scrim`,
  `html.c-modal-media-ad-locked`
- `.c-modal.c-modal-media-ad` (`.is-swinging-open`, `.is-swinging-closed`)
- `-crumbs`, `-crumbs-parent`, `-crumbs-current`, `-nav`, `-frame`, `-slot`,
  `-placeholder`, `-replay`, `-titlerow`, `-title`, `-tagline`, `-desc`,
  `-specs`, `-spec`, `-section`, `-section-title`, `-note`, `-sizes`, `-size`,
  `-size-box`, `-size-label`, `-size-chip`, `-bench`, `-bench-value`,
  `-related`, `-relcard`, `-relthumb`, `-relname`, `-compare`
