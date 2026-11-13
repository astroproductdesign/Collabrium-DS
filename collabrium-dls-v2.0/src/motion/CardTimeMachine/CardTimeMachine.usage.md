# Card time machine (Motion)

## Purpose

A deck that recedes into the distance, with a scrubber beside it: choosing a mark flies the cards in front of it up and away and brings that card to the front. Imported from `@collabrium/ui/motion`.

## Use when

- Stepping back through a history of cards, such as releases or snapshots.

## Don't use when

- Content that needs comparing side by side.
- Cards with controls.

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `aria-label` | `string` | — | Names the stack. |
| `items` | `CardItem[]` | — | The cards, front to back: `id`, `label` and `content`. The `label` is also the mark on the scrubber, e.g. a date. |
| `size` | `sm`, `md`, `lg` | `md` | The size of the whole picture: 0.75, 1 or 1.25 of the designed size. It always shrinks to fit the space it is in. |
| `index` | `number` | `0` | The index of the card in front. |
| `onIndexChange` | `(index: number) => void` | — | Called with the index of the card that was chosen. |

## Rules

1. Cards behind the front one are 12px higher, 60px deeper, turned 2 degrees and 20% fainter per step. Cards already passed fly up 300px, grow to 130% and fade out.
2. The cards move over `--duration-slow` with `--ease-settle`. Amicro used a spring that settles.
3. The scrubber has a long mark per card (a button) and two short marks between each pair. The current mark is Navy and 140% long; the marks near the pointer grow.
4. Amicro's goo filter (a blur and threshold that softened the card corners) is not ported.
5. The designed sizes (local values, as the DLS has no card-size tokens: Q-MOT-22, decided 2026-10-30) are the starting point. `size` scales the whole picture, offsets, turns and depth together, to 0.75 (`sm`), 1 (`md`) or 1.25 (`lg`), and the picture then shrinks to fit the space it is in, never past the size chosen. The scrubber and the Previous, Next and dot controls keep their own size.
6. Only the front card is exposed to assistive technology.
7. Under reduced motion the cards swap at once.

## Accessibility

- Each long mark is a real button named by its card's label, with `aria-current` on the current one. The short marks are decoration for the pointer and are hidden from assistive technology.
- Only the front card is exposed: the others are `aria-hidden` and inert.
- Under reduced motion the cards swap at once.

## Motion

- A mark is chosen: The cards in front of it fly up and away, scaling to 130%, and the card chosen comes to the front over 360ms. (--duration-slow · --ease-settle)
- Reduced motion: The cards swap at once. (—)

## Example

```tsx
import { CardTimeMachine } from '@collabrium/ui/motion';

<CardTimeMachine aria-label="Releases" items={cards} />
```

## Replaces

Amicro `CardTimeMachine`. Its dates are each card's `label`, its images are `items`, its goo filter is not ported (Q-MOT-24), and its marks are real buttons.
