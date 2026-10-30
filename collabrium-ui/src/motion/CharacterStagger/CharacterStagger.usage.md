# Character stagger (Motion)

## Purpose

Text that pops in letter by letter as it scrolls into view: each letter rises into place and settles with a spring, one after another, once. Imported from `@collabrium/ui/motion`.

## Use when

- A headline that should arrive playfully.

## Don't use when

- Body text or anything long.
- A calm surface: use Blur text, Word reveal or Text reveal, which settle without a spring.

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `text` | `string` | — | The text. It is split into letters. |

## Rules

1. Each letter rises 8px (`--spacing-8`) and grows from 80%, 20ms after the one before (Q-MOT-5).
2. The spring (stiffness 300, damping 18, mass 0.8) is Amicro's own and overshoots slightly: the DLS says movement never bounces. Kept as it is by decision (Q-MOT-6).
3. It plays once, when the text is 10% inside the viewport.
4. The text is read as one sentence: the full text is visually hidden and the letters are `aria-hidden`.
5. Under reduced motion the rise and the pop are dropped and the letters fade in together.
6. Use it for one heading or a short line.

## Accessibility

- No controls and no live region.
- The text is read once, as a sentence: the full text is visually hidden and the moving pieces are `aria-hidden`.
- Reduced motion: see Rules.

## Motion

- The text scrolls into view: Each letter fades in, rises 8px and grows from 80% to 100% with a spring (stiffness 300, damping 18, mass 0.8), 20ms after the one before. Plays once. (Amicro's spring (no DLS token))
- Reduced motion: The rise, the pop and the stagger are dropped: the letters fade in together. (—)

## Example

```tsx
import { CharacterStagger } from '@collabrium/ui/motion';

<CharacterStagger text="Work moves in balance" />
```

## Replaces

Amicro `CharacterStagger`. Its 15px rise becomes 8px; its spring is kept as it is (Q-MOT-6).
