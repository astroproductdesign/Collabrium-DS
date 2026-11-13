# Scroll reveal (Motion)

## Purpose

Fades content in while it travels 8px into place, once, when it scrolls into view. Imported from `@collabrium/ui/motion`.

## Use when

- Sections that arrive as the person scrolls: features, steps, stories.

## Don't use when

- Content needed at once, such as an error or the first thing on a page.
- Showing and hiding by a prop: use Fade in or the Slide pieces.

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `from` | `'below' | 'above' | 'right' | 'left'` | `'below'` | Where it arrives from. |
| `duration` | `DurationToken` | `'reveal'` | A duration token. |
| `ease` | `EaseToken` | `'reveal'` | An easing token. |
| `children` | `ReactNode` | — | The content to reveal. |

## Rules

1. It plays once, when 15% of the content is inside the window.
2. The travel is 8px (`--spacing-8`). It is not a prop.
3. Defaults are `--duration-reveal` and `--ease-reveal`, the DLS pair for entrance reveals.
4. The props take token names, never numbers.
5. The content is in the page from the start, so it is read as normal.
6. Under reduced motion the travel is dropped and the fade stays.

## Accessibility

- No controls and no live region; the content is read as normal.

## Motion

Fade 0% to 100% and 8px of travel, `--duration-reveal` with `--ease-reveal`, once. Reduced motion: the fade only.

## Example

```tsx
import { ScrollReveal } from '@collabrium/ui/motion';

<ScrollReveal>
  <p>Every team sees the same picture.</p>
</ScrollReveal>
```

## Replaces

Amicro `ScrollReveal`. Its 30px travel, 0.95 scale and 0.6s `easeOutExpo` become 8px, no scale and `--duration-reveal` with `--ease-reveal` (Q-MOT-1).
