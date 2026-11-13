# Ad Placement Card

## Purpose
A floating card that describes one ad slot (a position on a page where ads
run) while the slot is pointed at or focused on a placement map: what it is,
where it sits, the sizes and devices it runs on, and how many catalogue units
fit. A Card by surface (the base Card raised to shadow-3) and a Tooltip by
behaviour (instant, one at a time, at `<body>` level, never takes the
pointer). Built for Collab:Media's Ad formats page.

## Use when
- People move across a placement map or mock page and read each slot without clicking.

## Don't use when
- **It describes a format, not a position.** Use Media Ad Card (not converted yet).
- **The reader must act inside it.** Nothing in it can be clicked; use a popover.
- **It is a one-line hint.** Use Tooltip.

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `icon` | Phosphor `Icon` | **required** | The slot's glyph, drawn Fill in Navy. |
| `title` | text | **required** | The slot's label, "In the article". Wraps. |
| `where` | text | **required** | Where it sits, "Between paragraphs". |
| `description` | text | **required** | One sentence. |
| `sizes` | text[] | **required** | Sorted largest first by area; non-W×H sizes last, in their order. First four, then "+N". Empty: "No fixed size". |
| `devices` | text[] | **required** | Sentence case, "Desktop, tablet, mobile". Empty: "Not on file". |
| `fit` | `{ count, total, built? }` | **required** | "14 of 38 units fit here · 5 built for it". 0: a grey 0, "— none yet", no CTA. |
| `cta` | text | — | The hint, "Select to filter the catalogue". |
| `ctaDirection` | `'down'` \| `'up'` \| `'left'` \| `'right'` | `'down'` | The hint's arrow, toward the catalogue. |
| `children` | one `<button>` | — | The slot on the map. It gets `aria-describedby`, the name "{title}, {where}" if it has no `aria-label`, and the pointer and focus handlers. |
| `inline` | boolean | `false` | In the page flow and visible, with no slot. Documentation only. |
| `id`, `aria-*`, `data-*` | native | — | Passed to the card's `<div>`. `style` and `className` are not accepted. |

The `ref` is forwarded to the card's `<div>`. `sortAdSizes(sizes)` and
`formatAdDevices(devices)` are exported for use elsewhere (a list view of the
slots for touch).

## Rules
1. **Always two fact rows, in this order:** Sizes, Runs on. Values wrap, never truncate.
2. **Sizes run largest to smallest by area.** Sizes that aren't W×H keep their order and go last. The first four, then "+N" in Neutral-5.
3. **Runs on is in sentence case.** Only the first letter of later items is lowered, so "Connected TV" keeps its capitals.
4. **Missing data is never blank:** "No fixed size", "Not on file", in body2 regular, Neutral-5.
5. **Show 0 when nothing fits** (grey, "— none yet"), and leave the CTA out: there is nothing to filter to.
6. **Slots are always Navy.** Water is Collab:Media's element; format-family colours never colour a slot.
7. **Pointer:** 20px below and right of the cursor, redrawn at most once a frame. It flips left of or above the cursor first, then is clamped to a 12px gutter.
8. **Keyboard:** beside the slot, vertically centred, 12px away: right, then left, then above, then below; then clamped.
9. **One card at a time; the last input wins.** No caret.
10. **Escape sticks:** the card stays hidden until the pointer leaves the slot and returns, or focus moves to another slot.
11. **Scrolling and resizing hide it**, except that while a slot holds keyboard focus a scroll moves the card with the slot, so tabbing to a slot below the fold (which scrolls it into view) still shows its card, as Tooltip.
12. **Never shown on touch-first screens.** Give touch a list view of the slots.
13. **268px wide**, the one Card with a fixed width: it never sits in a grid. The 268px and the count's `line-height: 1` stay local values. (Decided 2026-11-04.)
14. **The fit line drops "· N built for it" when there is no such figure:** "14 of 38 units fit here". (Decided 2026-11-04.)
15. **The slot is named "{title}, {where}"** by the card, unless it has its own `aria-label`. (Decided 2026-11-04.)
16. **The behaviour follows the DS text** (the gallery shows the card statically): positioning, one at a time, the sticky Escape, scroll, resize and touch. Rule 11's keyboard-focus exception and `inline`, for documentation, are the library's. (Decided 2026-11-04.)

## Accessibility
- Slots are real `<button>`s and the controls; the card is never focusable and never takes the pointer.
- Each slot's `aria-describedby` names the card's description, facts, fit and CTA. The card is always in the DOM, so this works whether it shows or not, and on touch.
- A slot's name is "{title}, {where}" unless it has its own `aria-label`.
- Keyboard focus (`:focus-visible`) shows the card; a mouse click that moves focus doesn't. Blur hides it.
- Escape is caught in the capture phase and stopped only while a card shows, so it doesn't also close a modal underneath (WCAG 1.4.13, dismissible).
- In forced colours the edge and the fit rule are drawn in the text colour.

## Motion

| Interaction | Motion | Token |
|---|---|---|
| Show and hide | Fades and rises 4px into place, no delay. Under reduced motion, the fade only. | `--duration-fast` · `--ease-standard` (fade) · `--ease-settle` (rise) |

## Example

```tsx
import { AdPlacementCard } from '@collabrium/ui';
import { Article } from '@phosphor-icons/react';

<AdPlacementCard
  icon={Article}
  title="In the article"
  where="Between paragraphs"
  description="Sits inline with the story, so it is seen in the reader’s own scroll."
  sizes={['640×360', '320×480', '336×280', '300×250']}
  devices={['Desktop', 'Tablet', 'Mobile']}
  fit={{ count: 14, total: 38, built: 5 }}
  cta="Select to filter the catalogue"
>
  <button type="button" className="slot" onClick={filterBySlot} />
</AdPlacementCard>
```

## Replaces
- `.c-card-ad-placement`, `.c-card-ad-placement.is-on`, `.c-card-ad-placement.is-none`
- `.c-card-ad-placement-head` (+ `.is-title-wrapped`), `-icon`, `-titles`, `-title`, `-where`, `-desc`
- `.c-card-ad-placement-facts`, `-fact` (`dt`, `dd`, `dd.is-empty`), `-more`
- `.c-card-ad-placement-fit`, `-count`, `-fit-text`, `-cta`
