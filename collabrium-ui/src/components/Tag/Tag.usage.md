# Tag

## Purpose
A small pill that says which element (department) owns something:
Fire · Marketing, Water · Data. The owning element's tint behind text and a
6px dot in its colour. Purple is the one tag that isn't an element, and
Neutral is a plain label. Not a status and not interactive.

## Use when
- A card, row or header needs to show who owns it (Fire · Marketing, Earth · HR).
- A category with no department behind it needs a label (Purple: a Media Ad family such as "Display").
- A ranked tier is drawn in an element's colour (Profile card: Nano to Mega), or a plain one in Neutral (KOC, Seeder).

## Don't use when
- **It is a status** (Live, Paused, Failed). Use Badge: ownership is not a status.
- **It is clickable or removable.** Use Chip or Button. A tag is never interactive.
- **The element doesn't own the content.** Leave the tag out, or use Neutral.

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `variant` | `'neutral'` \| `'fire'` \| `'wood'` \| `'earth'` \| `'water'` \| `'gold'` \| `'purple'` | **required** | The owner. An element for a department; `purple` for a category with no department; `neutral` for a plain label with no dot. |
| `children` | text | **required** | The label. 24 characters at most. May include visually hidden text for screen readers. |
| `icon` | a Phosphor icon component, e.g. `Flame` | — | An icon at the start, in the text colour, 14px. It takes the dot's place. |
| `iconWeight` | `'fill'` \| `'regular'` | `'fill'` | `fill` for an element motif (Tier 2). `regular` only for a functional icon (Tier 1). |
| `id`, `title`, `aria-*`, `data-*`, … | native | — | Passed to the `<span>`. `style` and `className` are not accepted. |

The `ref` is forwarded to the `<span>` element.

## Rules
1. **Tag is for ownership, Badge is for status.** Fire · Marketing is a tag; Live, Paused, Blocked are badges.
2. **24 characters at most.** The tag never truncates. If a label is longer, rewrite it.
3. **Use the element that owns the content**, never one picked for its colour.
4. **Never a solid brand fill with white text.** Use the tints as shipped.
5. **Spacing between tags is 4px** (`spacing-4`), set by the layout around them, not by the tag.
6. **24px tall, caption type at weight 700, 10px side padding, a 6px dot.** Neutral has no dot.
7. **Element icons are Fill (Tier 2)**, 14px, because a motif is a department indicator, not a control.
8. **Purple's text is Purple mixed 80/20 toward Neutral-9**, because full Purple fails contrast on its tint; the dot stays full Purple.
9. **An icon takes the dot's place**, so the owner is marked once, not twice. (Decided 2026-11-04.)
10. **The element colours stay as the DLS has them**, full strength on their tints, though their text is below AA at this size. (Decided 2026-11-04; not to be changed here.)

## Accessibility
- Renders a plain `<span>`. It is not focusable and has no role; screen readers read its text in place.
- The dot and the icon are `aria-hidden`; the label carries the meaning, so write the owner in words ("Fire · Marketing").
- No live region.
- Contrast: Neutral (6.1:1) and Purple (5.0:1) pass AA. The element colours on their tints don't at this size (Fire 2.8, Wood 2.3, Earth 2.2, Water 4.0, Gold 1.9); they are kept by decision (Rule 10), so the label's words, not its colour, carry the meaning.
- In forced colours (Windows high contrast) the tint is not drawn, so the tag takes a 1px border in the system text colour and the dot is painted in it too. The size doesn't change, and normal mode is untouched. (Decided 2026-11-04.)

## Motion
None. Tag doesn't animate.

## Example

```tsx
import { Tag } from '@collabrium/ui';

<Tag variant="fire">Fire · Marketing</Tag>
<Tag variant="water">Water · Data</Tag>
<Tag variant="purple">Display</Tag>
```

## Replaces
- `.c-tag`, `.c-tag .dot`
- `.c-tag-fire`, `.c-tag-wood`, `.c-tag-earth`, `.c-tag-water`, `.c-tag-gold`, `.c-tag-purple`
