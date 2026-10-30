# Card cover flow (Motion)

## Purpose

Cards in 3D, the front one flat and enlarged and the others turned away and receding, like a record browser. Choose a card with a click, the buttons, a dot or the arrow keys. Imported from `@collabrium/ui/motion`.

## Use when

- Browsing covers, posters or albums.

## Don't use when

- A list the person must scan.
- Text-heavy cards.

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `aria-label` | `string` | — | Names the cover flow. |
| `items` | `CardItem[]` | — | The cards, in order: `id`, `label` and `content`. |
| `size` | `sm`, `md`, `lg` | `md` | The size of the whole picture: 0.75, 1 or 1.25 of the designed size. It always shrinks to fit the space it is in. |
| `index` | `number` | `middle card` | The index of the card in front. |
| `onIndexChange` | `(index: number) => void` | — | Called with the index of the card that was chosen. |

## Rules

1. The front card is flat at 110%; each step away turns the card 38 degrees, moves it 32px, steps it back 50px and scales it down 8%. Cards two steps away are 50% opaque and further ones are hidden.
2. The cards move over `--duration-slow` with `--ease-settle` (Amicro: a spring that settles).
3. Previous and Next are DLS icon-only secondary small Buttons.
4. The designed sizes (local values, as the DLS has no card-size tokens: Q-MOT-22, decided 2026-10-30) are the starting point. `size` scales the whole picture, offsets, turns and depth together, to 0.75 (`sm`), 1 (`md`) or 1.25 (`lg`), and the picture then shrinks to fit the space it is in, never past the size chosen. The scrubber and the Previous, Next and dot controls keep their own size.
5. Under reduced motion the cards move at once and do not turn.

## Accessibility

- A group with `aria-roledescription="carousel"`; each card is a slide named "label, n of N".
- Clicking a card is a pointer shortcut: the buttons, dots and arrow keys do the same for the keyboard.
- Under reduced motion the cards sit in their places with no turning or depth.

## Motion

- The card in front changes: Each card moves along, turns and steps in depth over 360ms. (--duration-slow · --ease-settle)
- Reduced motion: The cards move along at once, with no turning or depth. (—)

## Example

```tsx
import { CardCoverFlow } from '@collabrium/ui/motion';

<CardCoverFlow aria-label="Albums" items={cards} />
```

## Replaces

Amicro `CardCoverFlow`. Its dark background and glass controls are gone (the host supplies the surface), and its images are `items`.
