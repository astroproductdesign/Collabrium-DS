# Card spread (Motion)

## Purpose

A stack of cards that opens out when the pointer is over it, or it has focus, and closes again when it leaves: eight layouts in one piece. Pointer-driven, with cards of your own. Imported from `@collabrium/ui/motion`.

## Use when

- A small set of cards that can be previewed as a stack: boards, decks, albums.

## Don't use when

- Content that needs controls.
- A set that must be scanned all at once: use a grid.

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `aria-label` | `string` | — | Names the stack, e.g. "Recent boards". |
| `items` | `CardItem[]` | — | The cards, front to back: `id`, `label` and `content`. Five for every layout; `arc` also takes seven. |
| `layout` | `'arc' | 'long-arc' | 'linear' | 'corner' | 'stamp' | 'cascade' | 'scatter' | 'wheel'` | `'arc'` | How the stack opens. |
| `open` | `boolean` | — | Forces the stack open or closed. Leave out to open it on hover and focus. |

## Rules

1. Eight layouts: arc, long arc, linear, corner, stamp, cascade, scatter and wheel. Amicro had nine pieces (an arc of five and one of seven were separate); here `arc` takes five or seven cards.
2. Each layout's poses are Amicro's, in px and degrees: for example, `arc` turns 15 degrees and moves 35px per card step, with the middle card lifted and enlarged to 105%.
3. The cards settle with a tween over `--duration-slow` and `--ease-settle`. Amicro mixed springs and durations; none overshoots.
4. A card is Neutral-1 with a 1px Neutral-3 border, radius-md and shadow-2.
5. The stack is 128px by 176px (`--cui-spread-width`, `--cui-spread-height`; Q-MOT-22).
6. Opens on hover (mouse), on a tap (touch) and on focus.
7. Under reduced motion the cards move at once.

## Accessibility

- The stack is a group named by `aria-label` and every card is a group named by its `label`, so a screen reader reads them in order whether the stack is open or not.
- A mouse opens it on hover and a tap toggles it on touch. Keyboard focus opens it too.
- Under reduced motion the cards move to their places at once, with no travel.

## Motion

- The pointer enters, or the stack is focused: Each card moves to its place in the layout over 360ms. (--duration-slow · --ease-settle)
- The pointer leaves: The cards return to the stack. (--duration-slow · --ease-settle)
- Reduced motion: The cards move at once. (—)

## Example

```tsx
import { CardSpread } from '@collabrium/ui/motion';

<CardSpread aria-label="Recent boards" items={cards} layout="arc" />
```

## Replaces

Amicro `CardArc5`, `CardArc7`, `CardLongArc5`, `CardLinearSpread`, `CardCornerFan`, `CardStampArc`, `CardCascadeStagger`, `CardScatterSpread` and `CardWheelFan`: nine pieces with the same structure, merged into one with a `layout` option. Their `cardClassName`, `images` and tuning props are gone: the cards are `items`, with the DLS surface (Q-MOT-22, Q-MOT-23).
