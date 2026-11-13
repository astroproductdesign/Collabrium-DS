# Campaign card

## Purpose
One campaign as a tile on a kanban board, one column per stage. An identity
row (brand mark, campaign name with an optional Lead tag, brand, owner
faces), a full-width divider, the dates, then a two-column Pax and Quote
grid. A variant of Card with no border, a 16px radius (`--radius-md`) and its own height.

⚠️ From a product handoff spec (`CampaignBoardCard`), reconciled in the DLS
against its tokens.

## Use when
- A board shows campaigns by stage, one tile each, and people scan, open and move them.

## Don't use when
- **The view is a table.** A table has no columns to carry the stage, so it needs a stage cell; use Table (not converted yet).
- **You need more than six facts.** The rest belongs on the campaign's own page.
- **You need a plain tile with a heading and text.** Use Card.

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `name` | text | **required** | The campaign name. One line, truncating. |
| `brand` | text | — | The brand line. Missing shows `—`. |
| `logo` | URL | — | A square brand logo. Without it the placeholder mark shows (a buildings glyph on Water). |
| `lead` | boolean | `false` | Shows the Lead tag: a campaign not in the pipeline yet. |
| `owner` | text | — | The PIC's short name ("Sarah K."). Missing, the face shows `?`. |
| `overseer` | text | — | The overseer's short name. Adds a second, overlapping face. |
| `dates` | `{ start: Date; end: Date }` | — | When it runs, "12 Mar 2026 – 30 Apr 2026". Missing shows `—` in Neutral-4. |
| `pax` | number | — | People. Missing shows `—` in Neutral-4, never 0. |
| `quote` | number | — | Ringgit, always 2 decimals: "RM 72,500.00". Missing shows `—` in Neutral-4, never 0. |
| `headingLevel` | `2` \| `3` \| `4` \| `5` \| `6` | `3` | The name's heading level. The look is always label2. |
| `href` | URL | — | Makes the name a link stretched over the card: the card lifts on hover and takes the focus halo. |
| `onOpen` | `() => void` | — | Makes the name a button stretched over the card. Use `href` when it navigates. |
| `movable` | boolean | `true` | The viewer can move tiles: `grab` cursor, `grabbing` on press. `false` when they can only open them (pointer). |
| `dragging` | boolean | `false` | Set by the board while this tile is being dragged: 35% opacity, in its place. |
| `id`, `aria-*`, `data-*`, drag events, … | native | — | Passed to the card's `<div>`. `style` and `className` are not accepted. |

The `ref` is forwarded to the card's `<div>`. `formatCampaignDate(date)` and
`formatRinggit(amount)` are exported for use elsewhere.

## Rules
1. **Six things and no more:** the brand's mark, the name, the brand, who owns it, when it runs, what it is worth. A board tile is scanned, not read.
2. **No stage tag.** The column it sits in is the stage. The Lead tag is a different claim ("not in the pipeline yet"), not a stage.
3. **The faces ride the name**, not a row of their own. Their tooltip reads "Sarah K. · overseen by Lina M." (or "· no overseer"; "No PIC" when there is no owner).
4. **The divider runs the card's full width.** It separates what the campaign is from what is known about it.
5. **Em dash, never zero.** An unset Pax, Quote or date shows `—` in Neutral-4; an unknown brand shows `—`.
6. **No border, a 16px radius (`--radius-md`; decided 2026-11-06), `height: auto`.** Shadow-1 alone carries the edge, so a column of tiles reads as objects on a surface. A tile hugs its content: put tiles in a column (`align-items: start`), not a stretching grid row.
7. **Dragging leaves the tile in place,** faded to 35%, so the board doesn't reflow under the pointer. The drag itself (and the drop) is the board's. **A board that lets you drag tiles also offers a "Move to…" control** (a menu of the stages), so a tile can be moved by keyboard, voice or switch without dragging (WCAG 2.5.7). The card doesn't provide it; the board does. (Decided 2026-11-04.)
8. **The cursor is the only sign of permission:** `grab` when the viewer can move tiles, a pointer when they can only open them.
9. **Clamp a very long name** by character count before passing it, as well as the CSS truncation.
10. **The date's calendar is Regular at 12px**, not Fill: below 14px a filled calendar collapses into a block.
11. **It opens through the name**, a real link (`href`) or button (`onOpen`) stretched over the card, as Card and Profile card, not a `role="button"` tile: nothing focusable can live inside a button, and the faces must stay reachable. It lifts on hover only when it opens something. (Decided 2026-11-04.)
12. **The faces are their own Tab stop**, read as the tooltip text (`role="img"`), with the system focus ring. (Decided 2026-11-04.)
13. **Pax and Quote are a description list**, so each value is read with its label. (Decided 2026-11-04.)
14. **An unset value is the dash on screen and "Not set" to screen readers**, which skip a bare dash or read "em dash". (Decided 2026-11-04.)
15. **Dates read "12 Mar 2026 – 30 Apr 2026"**, months as the DLS writes them ("Sept"), both ends required. **Quote always has 2 decimals, "RM 72,500.00"**, as Price summary card. (Decided 2026-11-04.)
16. **The cursor is `grab` by default** (`movable`); `movable={false}` gives the pointer, as the source's `.is-static`. (Decided 2026-11-04.)
17. **Tokens where the token audit chose them** (decided 2026-11-06): radius `--radius-md` (16, was 14), mark radius `--radius-sm` (12, was 9), faces `--icon-md` (24, was 22), initials and metric label `--text-label3-size` (11, was 10), overseer overlap `--spacing-8` (8, was 7). **The card's other one-off values stay local**, as the DLS keeps them. In forced colours the card takes a 1px border, so it keeps an edge. (Decided 2026-11-04.)

## Accessibility
- The name is a real heading, and with `href` or `onOpen` a real link or button stretched over the card (CAMPAIGN-1).
- The owner faces are a separate Tab stop, named by their tooltip text, which shows on focus as well as hover.
- The mark and the calendar are decorative.
- Pax and Quote are a description list, so each value is read with its label. An unset value reads "Not set".
- Moving a tile must also be possible without dragging: the board offers a "Move to…" control (rule 7). The card doesn't provide it.

## Motion

| Interaction | Motion | Token |
|---|---|---|
| Hover on a card that opens something | Shadow-3 and a 1px lift. Under reduced motion the shadow alone. | `--duration-fast` · `--ease-standard` |
| Dragging | Fades to 35% opacity. | `--duration-fast` · `--ease-standard` |

## Example

```tsx
import { CampaignCard } from '@collabrium/ui';

<CampaignCard
  name="Raya Beauty Edit 2026"
  brand="Nadora Beauty"
  owner="Sarah K."
  overseer="Lina M."
  dates={{ start: new Date(2026, 2, 12), end: new Date(2026, 3, 30) }}
  pax={8}
  quote={72500}
  href="/campaigns/raya-beauty-edit"
/>
```

## Replaces
- `.c-card-campaign`, `.c-card-campaign.is-static`, `.c-card-campaign.is-dragging`
- `.c-card-campaign-id`, `.c-card-campaign-mark` (+ `.is-placeholder`), `.c-card-campaign-name`, `.c-card-campaign-title-row`, `.c-card-campaign-title`, `.c-card-campaign-brand`, `.c-card-campaign-lead`
- `.c-card-campaign-faces`, `.c-card-campaign-face` (+ `.is-overseer`)
- `.c-card-campaign-when` (+ `.is-empty`), `.c-card-campaign-metrics`, `.c-card-campaign-label`, `.c-card-campaign-value` (+ `.is-empty`)
