# Price summary card

## Purpose
A running list of selected line items building toward a total, with one call
to action ("Build proposal"). Two states: Empty ("No items added") and Filled.
After four items the rest fold behind "Show X more". A variant of Card: the
same surface, title and footer, at the 280px functional width.

⚠️ Designed from scratch in the DLS (no source in the brand deck or a
teammate's build): treat it as a first pass needing design review.

## Use when
- People pick services, products or line items one by one and need to see what they have chosen and what it costs so far (a quote, a proposal, a media plan).

## Don't use when
- **The amounts are rounded summary figures** (a budget, a forecast). Use a Stat or a Card: this card always shows exact costs to two decimals.
- **The list is a table to sort or filter.** Use Table (not converted yet).
- **You want a feature tile with points and a button.** Use the USP card (`Card minWidth="functional"` with `CardList`).

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `items` | `{ id, name, cost, removable? }[]` | **required** | The selected line items, in the order they were added. `cost` is a number (`2400`); `removable: false` for a read-only or locked item. An empty list shows the Empty state. |
| `onAction` | `() => void` | **required** | Called when the person presses the call to action. |
| `onRemove` | `(id: string) => void` | — | Called with an item's id when its remove × is pressed; remove it from `items` in response. Leave it out and no row shows a ×. |
| `actionLabel` | text | `'Build proposal'` | The call to action's label. |
| `title` | text | `'Price summary'` | The card's title. |
| `headingLevel` | `2` \| `3` \| `4` \| `5` \| `6` | `3` | The title's heading level. The look is always the card title's (h5). The Empty state's heading is one level below. |
| `emptyHeading` | text | `'No items added'` | The Empty state's heading. |
| `currency` | text | `'RM'` | Written before every amount, with a space. Change it only when the host context needs another currency. |
| `id`, `aria-*`, `data-*`, … | native | — | Passed to the card's `<div>`. `style` and `className` are not accepted. |

The `ref` is forwarded to the card's `<div>`.

## Rules
1. **Four items show; the fifth and on fold behind "Show X more".** X is always the exact hidden count, never a bare "Show more", and it updates as items come and go.
2. **Expanded, the extra items scroll inside a 320px zone.** The total and the button sit in the card's footer, outside it, so they are always in view.
3. **"Show less" folds back to four** and puts the list's scroll position back at the top.
4. **Removals settle by themselves.** Removing a hidden item while folded lowers the count; at four or fewer items the control goes away, folded or expanded, with nothing for the person to do.
5. **The list opens and closes over `--duration-base` on `--ease-settle`**, never instant and never bouncy (instant under reduced motion, as Thinking's trace; decided 2026-11-05).
6. **Every amount has the currency, a space and two decimals:** `RM 1,200.00`. These are exact costs, not rounded figures. The total is the sum of the items.
7. **The remove × is optional per row.** It stays hidden until its row is hovered or focused, so it never sits under the pointer at rest; on a touch screen it always shows. (Decided 2026-11-05.)
8. **Names stay on one line** and end in an ellipsis when they run out of room.
9. **Use it in a `CardGrid columns="functional"`**, like the USP card; the card is 280px at its narrowest.
10. **The title looks like the card title (h5)**, as the DLS gallery draws it, though the DLS text says h4. (Decided 2026-11-05.)
11. **"Show X more" has a hover and a focus ring:** Neutral-7 on hover and the DLS focus ring, as Empty state's link and Chip's show-less. (Decided 2026-11-05.)
12. **Empty is Empty state's Section variant with no body:** the list icon and "No items added". (Decided 2026-11-05.)
13. **A newly added row simply appears;** there is no entrance animation for it (the DS line saying it animates in is owed a removal). (Decided 2026-11-05.)
14. **The 320px scroll cap stays local,** to be shared with Dropdown when that is converted. (Decided 2026-11-05.)
15. **Its own component,** rendering Card, because it owns its items, the folding and the total. (Decided 2026-11-05.)
16. **The markup follows the source:** the folded rows are a second list inside the first list's last item. (Decided 2026-11-05.)

## Accessibility
- The title is a real heading (`headingLevel`), and the Empty state's heading sits one level below it.
- Each remove × is a real button named "Remove {item name}". It shows whenever its row holds keyboard focus.
- "Show X more" is a real button with `aria-expanded` and `aria-controls`. While folded, the hidden rows are `inert`: not reachable by Tab and not read. (Decided 2026-11-05.)
- After a focused × removes its row, focus moves to the next row's ×, or the previous one at the end of the list, or the card title when no × is left: an approved exception to "focus moves only to a heading or an error", as Permission Prompt's. (Decided 2026-11-05.)
- No live region. The total and the count change in place.
- Amounts use tabular figures so they line up; no monospace font.

## Motion

| Interaction | Motion | Token |
|---|---|---|
| Show X more / Show less | The hidden rows grow open and fold shut (grid rows 0fr to 1fr) | `--duration-base` · `--ease-settle` |
| Row hover or focus | The remove × fades in; its hover fill and colour change | `--duration-fast` · `--ease-standard` |

Under reduced motion both happen at once. (Decided 2026-11-05.)

## Example

```tsx
import { CardGrid, PriceSummaryCard } from '@collabrium/ui';

<CardGrid columns="functional">
  <PriceSummaryCard
    items={items}
    onRemove={id => setItems(list => list.filter(item => item.id !== id))}
    onAction={buildProposal}
  />
</CardGrid>
```

## Replaces
- `.c-card-price-summary`
- `.c-card-price-list`, `.c-card-price-row`, `.c-card-price-name`, `.c-card-price-cost`, `.c-card-price-remove`
- `.c-card-price-overflow`, `.c-card-price-overflow-inner`, `.c-card-price-more`
- `.c-card-price-total`
