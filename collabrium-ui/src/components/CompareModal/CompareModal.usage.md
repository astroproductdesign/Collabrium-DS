# CompareModal

## Purpose
Two to four ad formats side by side: one column per format, one row per fact,
the highest published benchmark marked, then export and "Send to a media
plan". A planner picks formats with Media Ad Card's round Compare, the Action
bar (Item select) collects them, and its Compare button opens this. Built for
Collab:Media's Ad formats catalogue.

A variant of Modal on Media Ad Modal's layer: the scrim, z-index, page hold
and swing (out of the Compare button). It shares Media Ad Modal's carve-out
from "one focused decision": it is a read. It collects no input, commits
nothing in place (the exports produce a file, the plan leaves for another
page) and can be left at any point.

## Use when
- Someone has picked two to four formats and pressed Compare.

## Don't use when
- **One format**: that is Media Ad Modal, never a one-column comparison.
- **A decision or a form**: use Modal, or a page.

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `open` | boolean | required | Whether the modal is open. Only with two to four formats. |
| `onClose` | `() => void` | required | Close, Escape or a scrim click. Set `open` to false. |
| `formats` | `MediaAdFormat[]` | required | Two to four, Media Ad Modal's shape, in the order picked. |
| `onExportPdf` / `onExportExcel` | `() => void` | required | Produce the file; confirm it with a Toast. |
| `onPlan` | `() => void` | required | "Send to a media plan": navigate with the format ids. |
| `origin` | `RefObject<HTMLElement>` | the element that had focus | What it swings out of (the Action bar's Compare). |
| `returnFallback` | `RefObject<HTMLElement>` | — | Where focus goes on close if Compare has become disabled. |
| `keepLive` | `RefObject<HTMLElement>[]` | — | Children of `<body>` kept usable while it is open (the Toast host). |

The ref goes to the panel; `style` and `className` aren't accepted.

## Rules
1. **Two to four formats.** The Action bar enables Compare at two and caps
   picks at four. The modal never adds or removes a format.
2. **Nine facts, always, in this order:** Objective, Funnel, Sizes, Runs on,
   Benchmark, CPM on file, Monthly inventory, Best for, Industries. Lists are
   joined with commas; sizes one per line.
3. **Highest:** the top published benchmark, compared at the two decimals
   shown, and only when at least two formats have one above 0. Every format
   tied at the top is marked; if every published value ties, nothing is. It
   is a word (a Success Badge), never colour alone.
4. **Missing data is never blank:** Benchmark "Not published", CPM "Not on
   file — ask Sales", other facts "Not on file", Sizes and Industries a dash
   ("No fixed size", "None listed" to a screen reader).
5. **The table scrolls; it never collapses** into stacked cards. The fact
   labels stick left, the Format row sticks to the top once the Media row has
   scrolled away; a hint and a right-edge fade show while columns remain.
6. **Column dividers** between formats: in a comparison the column is the unit
   being read.
7. **Narrow (the panel at 640px or less):** a 120px label column and a 180px
   column floor. At 480px or less the footer buttons stretch and the plan
   takes its own row.
8. **Never stacked:** not from inside Media Ad Modal, and never both open.
9. **Two to four, enforced:** under two nothing opens (a console warning);
   over four the first four show (decided 2026-11-12).
10. **"Send to a media plan" is a Primary Button** whose `onPlan` navigates,
    as Media Ad Modal's, until Button has a link form (decided 2026-11-12).
11. **The label column** takes its 150 / 120px through a `<colgroup>`
    (decided 2026-11-12).
12. **Highest** is the library's Badge Success as it ships, and compares
    every benchmark whatever its metric: a comparison holds one metric
    (decided 2026-11-12).

## Accessibility
- The panel is `role="dialog"`, `aria-modal="true"`, named by its title. It
  opens with focus on Close.
- The scroll region is a Tab stop (`role="region"`, "Comparison table"); the
  arrow keys scroll it. The table has a hidden caption naming the formats and
  facts.
- Highest reads "Highest CTR in this comparison".
- Tab stays in the panel; Escape closes; focus returns to Compare, or to
  `returnFallback` if Compare has become disabled.
- Everything else is `inert` while it is open, except `keepLive` (the Toast
  host), so export toasts are still announced. No live region.
- Touch: footer buttons 44px tall. Forced colours: the Highest cell keeps a
  Highlight edge; the right-edge fade is dropped.

## Motion

| Interaction | Motion | Token |
|---|---|---|
| Opening | Media Ad Modal's swing, out of the Compare button | 0.8s, recorded one-off |
| Closing | Folds back into Compare if on screen, else fades; Escape mid-opening plays it backwards and fades to 0; a fallback timer finishes the close | 0.55s · scrim `--duration-slow` |
| Right-edge fade | Fades in while columns remain | `--duration-fast` · `--ease-standard` |
| Reduced motion | No swing: a plain fade | `--duration-base` |

## Example

```tsx
import { CompareModal } from '@collabrium/ui';

<CompareModal
  open={comparing}
  onClose={() => setComparing(false)}
  formats={picked}
  onExportPdf={exportPdf}
  onExportExcel={exportExcel}
  onPlan={() => router.push(`/plans/new?formats=${picks.join(',')}`)}
  returnFallback={heading}
  keepLive={[toastHost]}
/>
```

## Replaces
- `.c-modal-compare-layer` (`.is-open`, `.is-shown`), `-scrim`,
  `html.c-modal-compare-locked`
- `.c-modal.c-modal-compare` (`.is-swinging-open`, `.is-swinging-closed`)
- `-titles`, `-title`, `-close`, `-hint`, `-scrollwrap` (`.has-more-right`),
  `-scroll` (`.is-scrolled-left`, `.is-scrolled-top`), `-table`, `-stage`,
  `-frame`, `-slot`, `-placeholder`, `-corner`, `-colhead`, `-colname`,
  `-colfamily`, `-sizes`, `-bench`, `-highest`, `-export`, `-plan`
