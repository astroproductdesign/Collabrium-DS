# Hover cards (Motion)

## Purpose

A grid of cards where one soft highlight glides from card to card under the pointer, and to the focused card. Imported from `@collabrium/ui/motion`.

## Use when

- A short set of linked options (features, plans, destinations) where the highlight helps the eye follow the pointer.

## Don't use when

- A list of rows: use a list.
- Cards that hold actions or forms.

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `items` | `HoverCardItem[]` | — | The cards, in order: `id`, `title`, `description` and an optional `href`. |

## Rules

1. One highlight glides between cards (a shared layout animation) rather than each card lighting up on its own.
2. It fades in and out over `--duration-fast`, leaving after `--duration-instant`.
3. The focused card is highlighted the same way, so keyboard users see it.
4. A card with an `href` is a real link; one without is not focusable and is not a button.
5. The cards are plain: Neutral-1, a 1px Neutral-3 border, radius-md, padding 16px. Use Card for a card with more in it (Q-MOT-7).
6. Under reduced motion the highlight does not travel between cards.

## Accessibility

- No controls and no live region.
- The effect is decoration: it adds no role or label and takes no focus.
- Reduced motion: see Rules.

## Motion

- Pointer enters a card: The highlight fades in behind it, or glides from the previous card. (--duration-fast)
- Pointer leaves the grid: The highlight fades out after a short delay. (--duration-fast · --duration-instant)
- Reduced motion: The highlight does not travel: it fades in on the card instead. (—)

## Example

```tsx
import { HoverCards } from '@collabrium/ui/motion';

<HoverCards items={cards} />
```

## Replaces

Amicro `CardHover`. Its dark-mode colours and Tailwind classes become DLS tokens; its card is plain Neutral-1 with a 1px Neutral-3 border.
