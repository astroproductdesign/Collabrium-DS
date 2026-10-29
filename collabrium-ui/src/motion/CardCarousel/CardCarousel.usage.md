# Card carousel (Motion)

## Purpose

A row of cards that slides sideways, one in front at a time. Pointing at it fans the others. Previous and Next buttons, a dot per card and the arrow keys change the card in front. Imported from `@collabrium/ui/motion`.

## Use when

- A small set of picture-like cards, one of which is in focus.

## Don't use when

- A list the person must scan.
- Cards with controls.

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `aria-label` | `string` | — | Names the carousel. |
| `items` | `CardItem[]` | — | The cards, in order: `id`, `label` and `content`. |
| `index` | `number` | `middle card` | The index of the card in front. |
| `onIndexChange` | `(index: number) => void` | — | Called with the index of the card that was chosen. |

## Rules

1. One card is in front: enlarged to 105%, with its caption shown; the others are 80% and turned 5 degrees per step (65% and 20 degrees per step while the pointer is over the row).
2. The track slides by one 160px slide per step over `--duration-slow` with `--ease-settle`. Amicro used springs; none overshoots.
3. Previous and Next are DLS icon-only secondary small Buttons, disabled at the ends. Dots are buttons.
4. Only the front card is exposed to assistive technology and reachable by keyboard.
5. The slide (160px), card (110px) and window (180px) sizes have no tokens (Q-MOT-22).
6. Under reduced motion the cards move at once and do not fan.

## Accessibility

- A group with `aria-roledescription="carousel"`; each card is a slide named "label, n of N". Only the card in front is exposed: the others are `aria-hidden` and inert.
- Previous and Next are real buttons and are disabled at the ends; each dot is a button named "Go to label" with `aria-current` on the current one.
- Under reduced motion the cards move to their places at once and do not fan.

## Motion

- The card in front changes: The track slides and the cards turn and scale to their places over 360ms. (--duration-slow · --ease-settle)
- The pointer is over the row: The other cards turn 20 degrees per step and drop 24px per step away from the front card. (--duration-slow · --ease-settle)
- Reduced motion: The cards move at once and do not fan. (—)

## Example

```tsx
import { CardCarousel } from '@collabrium/ui/motion';

<CardCarousel aria-label="Trips" items={cards} />
```

## Replaces

Amicro `CardCarousel`. Its images with titles are `items`, its chevron icons and dots are DLS icon buttons and dot buttons, and its monochrome variant is just a card with other content (Q-MOT-23).
