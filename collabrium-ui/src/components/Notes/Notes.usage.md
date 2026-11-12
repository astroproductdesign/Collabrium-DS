# Notes

## Purpose
Coloured notes pinned to one record (a deal row, a person, a line item), up
to four. One surface throughout: a **peek** on hover or focus, a **panel**
on click, anchored to the row and growing out of its pin. The panel shows a
2 × 2 grid at two or more notes, the note itself at one, and is where notes
are read, written, edited, resolved and deleted. No modal.

⚠️ Designed from scratch in the DLS (no source in the brand deck or a
teammate's build); a first pass needing design review.

## Use when
- Teammates leave short notes on a record in a table or list.

## Don't use when
- **A conversation or long comments.** Use a comments thread.
- **A status.** Use a Badge or Tag.

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `record` | string | required | The record's name: the panel's title and every control's label. |
| `notes` | `Note[]` | required | `{ id, text, author, date, resolved? }`, in order; position sets colour. `date` and `resolved.date` are `YYYY-MM-DD`. Only the first four show. |
| `currentUser` | `{ name, initials? }` | required | Who is writing ("Signing in as"). |
| `onAdd`, `onEdit` | `(text)`, `(id, text)` | required | Save a new or edited note. |
| `onDelete` | `(id)` | required | Delete; the notes after it shift up a colour. |
| `onResolve`, `onReopen` | `(id)` | required | Settle or reopen; the page sets or clears `resolved`. |

The ref goes to the root `<span>`; `style` and `className` aren't accepted.
The peek and panel render at `<body>` level.

## Rules
1. **Colour is positional, never chosen:** 1st orange, 2nd pink, 3rd green,
   4th navy, each with a darker glyph ink. Deleting a note recolours the ones
   after it. No colour picker.
2. **Four notes is the cap:** only four show; at four both add buttons grey
   out (38%), stay focusable (`aria-disabled`, not `disabled`, so the tooltip
   can show) and give the reason on a tooltip: "A row holds four notes."
   (decided 2026-11-12).
3. **Pin (1 note):** 48.94 × 54.83, radius-sm, the colour's fill, a 16px Fill
   push-pin in its ink, tilted 2°; hover lifts it 1px on shadow-2.
4. **Stack (2–4):** 42 × 48 cards stepping 16px (58 / 74 / 90px wide), 48px
   tall at every count, the first on top, tilted ±12° alternately (the DS's
   ±3° was too slight to read; decided 2026-11-12); they straighten on hover
   or focus.
5. **Add button:** 32px, a Plus, at **every** count, one included.
6. **Peek:** a Card, 280px, below the pin (above when there's no room), never
   taking the pointer: a 28 × 32 pin (8px radius), the text in two lines,
   "author · date", plus " · Resolved by name" when resolved.
7. **Panel:** 340px (less on a narrow phone), radius-lg, shadow-3, anchored to
   the pin's corner and kept 12px inside the window; it grows out of the pin.
   No scrim; it closes on Escape, an outside click or the page scrolling.
   While it's open the pin is hidden by opacity only.
8. **Grid (2+ notes):** "Pinned notes", NOTES · MONTH (the newest note's), the
   record, then the cards: solid fill, the text in three lines (600), "author
   · date"; Add a note (Primary sm).
9. **A note:** the panel takes the note's colour, everything in its ink
   (Obsidian on green). Who wrote it, NOTE · MONTH, the record, the text (its
   line breaks kept), the date. Delete (far left), Resolve or Reopen
   (Secondary), Edit (Primary). Opened from the grid, it also offers "All
   notes" (Ghost, beside delete) back to the grid (decided 2026-11-12; the DS
   gives no way back). The eyebrow reads "Pinned by" (decided 2026-11-12).
10. **Writing and editing:** the field is not the input recipe: no box, the
    note itself being written on, 280 characters; focus puts the caret in it.
    Cancel and Save (disabled with nothing typed). A new note takes the next
    position's colour. After a save the panel shows the row's notes (the
    grid at 2+, the note at 1); after a delete, the grid or the note left, or
    it closes at none (decided 2026-11-12).
11. **Resolved:** keeps its slot and colour. Pin, stack card and peek pin: a
    20% tint and a tick. Peek: the text struck. Grid card: 67% of its fill, a
    tick, "Resolved by name", the text struck. Note: a tick and "Resolved by
    name · date"; the Secondary reads Reopen.

## Accessibility
- Real buttons with `aria-haspopup="dialog"` and `aria-expanded`; glyphs are
  hidden and every label is written out ("4 notes on GRABCAR SDN BHD, open
  the stack"; "Resolved note by Wei Lin Tan, 3 Sept 2026. Open it").
- The panel is a dialog named for its view; opening it moves focus to it,
  Tab stays inside it, Escape closes it and focus returns to the pin.
  Deleting the last note sends focus to the add button.
- Forced colours: pins, stack cards, peek pins and grid cards keep a 1px
  CanvasText edge; the tinted panel keeps its border; focus is a 2px
  Highlight outline, as the shadow halo drops out (decided 2026-11-12).
- ⚠️ Recorded contrast decisions (the DS's, not oversights): pin glyphs
  1.66–2.26:1 on their fills; white text on orange 3.15:1 and pink 2.49:1;
  on a resolved card 1.83–2.67:1.

## Motion

| Interaction | Motion | Token |
|---|---|---|
| Panel opens | Grows out of its pin and fades in | `--duration-morph` · `--ease-morph` |
| Stack hover / focus | Cards straighten | `--duration-base` · `--ease-settle` |
| Pin hover | Lifts 1px | `--duration-fast` · `--ease-standard` |
| Peek | Fades in | `--duration-fast` · `--ease-standard` |
| Reduced motion | The panel appears without growing | — |

## Example

```tsx
import { Notes } from '@collabrium/ui';

<Notes
  record="Celcom Axiata"
  notes={notes}
  currentUser={{ name: 'Nadia Rahim' }}
  onAdd={add}
  onEdit={edit}
  onDelete={remove}
  onResolve={resolve}
  onReopen={reopen}
/>
```

## Replaces
- `.ncell`, `.npin`, `.npin-stack`, `.npin-mini`, `.npeek` (`.is-open`,
  `.is-static`), `.npk-row`, `-sw`, `-body`, `-t`, `-m`
- `.npanel` (`.is-open`, `.is-opening`, `.is-static`, `.is-tinted`), `.np-top`,
  `-eyebrow`, `-body`, `-kick`, `-title`, `-grid`, `-card` (`-t`, `-m`),
  `-act`, `-del`, `-text`, `-by`, `-res`, `-box`, `.npanel .ava`, `.nadd`,
  `.el-0` to `.el-3`, `.is-resolved`, `.np-hidden`, `.empty-note`
