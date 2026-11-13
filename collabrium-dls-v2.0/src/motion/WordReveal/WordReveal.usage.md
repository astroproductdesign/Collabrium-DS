# Word reveal (Motion)

## Purpose

Text that appears word by word as it scrolls into view: each word rises into place and grows a little while it fades in, one after another, once. Imported from `@collabrium/ui/motion`.

## Use when

- A headline or a short paragraph that should arrive a phrase at a time.

## Don't use when

- A long passage.
- Text that must be readable at once.

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `text` | `string` | — | The text. It is split into words. |
| `duration` | `DurationToken` | `'slow'` | A duration token for each word. |
| `ease` | `EaseToken` | `'standard'` | An easing token. |

## Rules

1. Each word rises 8px (`--spacing-8`) and grows from 90%, 40ms after the one before (Q-MOT-5).
2. Defaults are `--duration-slow` and `--ease-standard`; the props take token names.
3. It plays once, when the text is 10% inside the viewport.
4. The text is read as one sentence: the full text is visually hidden and the words are `aria-hidden`.
5. Under reduced motion the rise and the growth are dropped and the words fade in together.
6. Use it for a headline or a short paragraph.

## Accessibility

- No controls and no live region.
- The text is read once, as a sentence: the full text is visually hidden and the moving pieces are `aria-hidden`.
- Reduced motion: see Rules.

## Motion

- The text scrolls into view: Each word fades in, rises 8px and grows from 90% to 100%, 40ms after the one before. Plays once. (--duration-slow · --ease-standard)
- Reduced motion: The rise, the growth and the stagger are dropped: the words fade in together. (—)

## Example

```tsx
import { WordReveal } from '@collabrium/ui/motion';

<WordReveal text="Every team sees the same picture" />
```

## Replaces

Amicro `WordReveal`. Its 15px rise and 0.5s `easeOutCubic` become 8px, `--duration-slow` and `--ease-standard`.
