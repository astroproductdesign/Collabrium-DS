# ElementBadge

## Purpose
A 32px chip that marks which element (department) owns an item, by the
element's own glyph on a 12% tint of its colour. Optionally the element's name
and function sit beside it ("FIRE · Visibility & Energy"). A fixed identity
marker: not a status and not interactive.

## Use when
- A department-owned item needs the element's icon, not just a colour dot: a team or workspace row, a department header, an owner column.
- An introduction to the five elements: the chip with its name and function.

## Don't use when
- **A colour dot and a label are enough.** Use Tag ("Fire · Marketing").
- **It is a status** (Live, Paused). Use Badge.
- **A card's header needs its owner's icon.** Use Card's icon chip (36px, any icon), which sits beside the card title.
- **It isn't an element.** There is no Purple or Neutral ElementBadge; use Tag.

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `element` | `'fire'` \| `'earth'` \| `'water'` \| `'gold'` \| `'wood'` | **required** | The owner. The tint, the glyph and the name follow it. |
| `showLabel` | boolean | `false` | The name and the sublabel beside the chip. |
| `sublabel` | text | the element's function | The line under the name, with `showLabel`. |
| `title` | text | the element's name (chip alone) | The chip's hover name when it stands alone. |
| `id`, `aria-*`, `data-*` | native | — | Passed to the root `<span>`. `style` and `className` are not accepted. |

The `ref` is forwarded to the root `<span>`.

## Rules
1. **The chip is 32×32, radius-sm, the element's colour at a 12% tint,** the same one-off tint as Card's icon chip, not the 8% `-bg` token.
2. **The glyph is Fill (Tier 2),** a department indicator, in the element's full colour, at `icon-sm` (16px): the DLS's 17px (CSS) and 60% of the chip (DS) have no token. (Decided 2026-11-05.)
3. **The glyph is fixed per element:** Fire a flame, Earth mountains, Water a drop, Gold scales, Wood a plant. These are the DS's interim Phosphor motifs until the element artwork is added.
4. **Never recolour the chip** away from its element: it is a fixed identity marker, not a themeable accent.
5. **The label:** the element's name (caption 700, eyebrow tracking, uppercase, Neutral-9) over the sublabel (caption, Neutral-5), 12px from the chip. The sublabel defaults to the element's function.
6. **Element functions:** Fire Visibility & Energy, Earth Support & Stability, Water Depth & Flow, Gold Order & Structure, Wood Growth & Vision.
7. **The element colours follow Tag:** the glyphs on their tints are below 3:1 for Fire, Earth, Gold and Wood; kept, as Tag's colours were (Q-TAG-3), because the name always goes with them.
8. **One size, 32px.** The DS's size prop is left out until a design needs another size and says how the glyph and label scale. (Decided 2026-11-05.)
9. **The glyph is fixed per element,** with no icon prop; the element artwork, when it arrives, replaces it in one place. (Decided 2026-11-05.)
10. **The name is always the element's;** only the sublabel can be replaced. (Decided 2026-11-05.)
11. **The label uses the caption tokens** (Mulish, 16px lines, 400), where the DLS leaves them to the page. (Decided 2026-11-05.)
12. **One-off values stay local:** the 32px chip and the 12% tint. (Decided 2026-11-05.)

## Accessibility
- Not focusable and not interactive.
- With the label, the glyph is `aria-hidden` and the name and sublabel are read as text ("Fire, Visibility & Energy"; the capitals are CSS only).
- Without the label, the chip is `role="img"` named by the element ("Fire"), and keeps the native `title` for the mouse. (Decided 2026-11-05.)
- Contrast: see rule 7.
- Forced colours: the tint is dropped, so the chip takes a 1px border in the system text colour to keep its shape, as Tag. (Decided 2026-11-05.)

## Motion
None. ElementBadge doesn't animate.

## Example

```tsx
import { ElementBadge } from '@collabrium/ui';

<ElementBadge element="water" />
<ElementBadge element="fire" showLabel />
<ElementBadge element="gold" showLabel sublabel="Finance" />
```

## Replaces
- `.c-elbadge`, `.c-elbadge-chip`
- `.c-elbadge-fire`, `-earth`, `-water`, `-gold`, `-wood`
- `.c-elbadge .text`, `.name`, `.fn`
