# ActionBar

## Purpose
A bar that floats at the bottom of the page while the reader has a
selection: it says how much is selected and offers the actions for it. The
first member of the DS's Toolbar group. Two variants: **User select**
(people, as an avatar stack; minimum 1) and **Item select** (things compared
by name, as removable chips; 2 to 4). User select has an AI shimmer style.
Built for Collab:Media.

⚠️ Designed from scratch in the DLS for Collab:Media's selection flows.

## Use when
- The reader is choosing people (influencers, creators, team members) for a
  list: User select.
- The reader is choosing 2 to 4 items to compare (ad formats, plans): Item
  select. Compare opens Compare modal.

## Don't use when
- **Filtering a list.** Use Filters.
- **Actions that don't depend on a selection.** Put them in the PageHeader.
- **A page with a floating Prompt input bar.** Both claim the bottom centre.

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `variant` | `'users' \| 'picks'` | required | User select or Item select. |
| `aria-label` | string | required | Names the region ("Selected influencers"). |
| `open` | boolean | required | True while there's a selection. The page owns the selection. |
| `title` | string | required | "{n} {noun} selected", the count first. |
| `description` | ReactNode | required | One line; below the minimum, the reason. |
| `people` | `{ id, name, initials?, src? }[]` | — | users: the selection, in order. |
| `picks`, `onRemovePick` | `{ id, name }[]`, `(id) => void` | — | picks: at most 4; removal from the bar. |
| `dismiss` | `{ label, hiddenLabel?, onClick }` | required | Ghost sm, first: "Cancel" / "Clear". |
| `secondary` | `{ label, icon?, onClick, disabled? }` | — | users: "Save to a list". |
| `primary` | `{ label, icon?, onClick, disabled? }` | required | The one Primary, last. `disabled` gates it. |
| `ai` | boolean | `false` | users: the AI shimmer. |
| `fallbackFocusRef` | `RefObject<HTMLElement>` | — | Focus's landing when the bar hides with focus inside it. |
| `headingLevel` | `2 \| 3 \| 4` | `2` | The title's level. |
| `placement` | `'fixed' \| 'inline'` | `'fixed'` | `inline`: in flow and always shown, for a picture. |

`ActionBarSpacer`: optional, at the end of the scrolling content, as tall as
the open bar's clearance. The page sets `--cui-action-bar-inset-start` on
`<html>` to its sidebar's width. The ref goes to the `<section>`; `style` and
`className` aren't accepted.

## Rules
1. **Placement:** fixed at `<body>` level, from `--cui-action-bar-inset-start`
   to the right edge, 24px above the bottom (12px at 640px and under) plus the
   safe area, 16px side insets (8px on phones), on `--z-bar` (40). Only the
   panel takes clicks.
2. **Panel:** Neutral-1, 1px Neutral-3, radius-lg, shadow-4, 16 / 24px
   padding, full width up to 880px, centred.
3. **Row:** one line on desktop, never wrapping; 16px between parts; actions
   at the end. Visual order is DOM order.
4. **Title:** "{n} {noun} selected", label2, Neutral-9, tabular figures, one
   line; the count leads so a cut only takes the noun. **Description:**
   caption, Neutral-5, one line with an ellipsis.
5. **Actions:** real Buttons, unmodified. The Ghost dismiss is sm; the
   commit buttons are md, and sm when the bar is 640px or narrower. Dismiss
   first, the one Primary last; 8px apart.
6. **User select:** 32px avatars (Neutral-2, Neutral-9 initials at label3
   size, 700, a 2px Neutral-1 ring) overlapping by 10px, in selection order,
   an optional photo on top: 4 then "+N"; 2 then "+N" on phones; "99+" past
   99. Cancel, Save to a list (Secondary, BookmarkSimple), Create new list
   (Primary, Plus).
7. **Item select:** the removable Input Chips lead, at most 4, wrapping in
   their own column. A name past 15 characters shows its first 15 and "…";
   the full name stays in its hover title, for screen readers and in the ×'s
   name. Clear and Compare (Primary, Columns). Below 2 picks, the
   description gives the reason ("Minimum 2 formats.") and Compare is gated;
   at 4 it states the cap ("Maximum 4 formats.").
8. **Gating:** `aria-disabled` plus the reason in `aria-describedby`, never
   `disabled`: the action stays focusable and ignores clicks.
9. **Phones (the bar 640px or narrower):** two rows. Users: two avatars + "+N"
   and the title (no description), then Cancel left and Save + Create right,
   sm, no leading icons, 4px apart. Picks: the chips, then the title and
   description left and Clear + Compare right.
10. **The page owns the selection:** it passes `people` or `picks` and `open`;
    cards, the bar and storage change together. One bar per page.
11. **A fifth pick is refused:** the card stays unpressed and nothing is
    evicted; the page raises a Toast ("Compare holds four").
12. **Clearance:** while open the bar writes `--cui-action-bar-clearance` on
    `<html>` (its height + its bottom offset + 16px; 0 when hidden). Back to
    top sits above it, toasts above that; `ActionBarSpacer` and the page's
    `scroll-padding-bottom` read it.
13. **Lift:** while a toast overlaps the panel, the bar rises clear of it by
    12px. The spacer ignores the lift.
14. **Under a modal** the bar is inert with the rest of the page.

## Accessibility
- A `<section>` region named by `aria-label`; the title is a heading
  (`tabindex="-1"`).
- No live region. A change made in the bar (a pick removed) moves focus to
  the title, which reads the new count; the last pick out, or the bar hiding
  with focus inside it, moves focus to the page's fallback heading. Changes
  from a card never move focus.
- Avatars are decorative (`aria-hidden`). The dismiss can add hidden words
  (" selection", " all picks").
- Chips: × or Delete / Backspace removes; the × reads "Remove {name}". On
  coarse pointers the × has a 44px hit area.
- Forced colours: the border carries the edge; a gated action is GrayText;
  the AI glow hides.

## Motion

| Interaction | Motion | Token |
|---|---|---|
| Opening | Rises and fades in | `--duration-slow` · `--ease-standard` |
| Closing | Falls and fades out | `--duration-base` · `--ease-standard` |
| Lift above a toast | Rises | `--duration-base` · `--ease-standard` |
| AI shimmer | The gradient edge and glow move | 4s linear, looping |
| Restored on load | Appears settled, no entrance | — |
| Reduced motion | A short fade only; the glow still | `--duration-fast` |

## Example

```tsx
import { ActionBar } from '@collabrium/ui';
import { Columns } from '@phosphor-icons/react';

<ActionBar
  variant="picks"
  aria-label="Formats to compare"
  open={picks.length > 0}
  picks={picks}
  onRemovePick={remove}
  title={`${picks.length} formats selected`}
  description={picks.length < 2 ? 'Minimum 2 formats.' : 'Maximum 4 formats.'}
  dismiss={{ label: 'Clear', hiddenLabel: ' all picks', onClick: clear }}
  primary={{ label: 'Compare', icon: Columns, onClick: compare, disabled: picks.length < 2 }}
  fallbackFocusRef={headingRef}
/>
```

## Replaces
- `.c-action-bar` (`.is-open`, `.is-instant`), `.c-action-bar-users`,
  `-picks`, `-ai`, `-panel`, `-main`, `-wide`, `-narrow`, `-stack`,
  `-avatar`, `-head`, `-title`, `-desc`, `-actions`, `-clear`, `-go`,
  `-list`, `-pick`, `-name`, `-spacer`
- The behaviour the DS assigns to the page's script: the size swap
  (`data-size-narrow`), clearance, lift, focus and the name cut
