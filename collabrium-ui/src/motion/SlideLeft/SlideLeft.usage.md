# Slide left (Motion)

## Purpose

Moves left into place, arriving from the right. For the next step or panel in a left-to-right flow. It wraps content and moves it 8px left into place while it fades in, and back out when it is hidden. Imported from `@collabrium/ui/motion`.

## Use when

- Content arrives or leaves because of something the person did or something that finished.
- The arrival should read as coming from a direction: starting to its right.

## Don't use when

- The content only needs to fade: use Fade in.
- The content opens or closes by height (an accordion): use Collapse.
- A loop or a loader is needed: use Loading State.

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `show` | `boolean` | `true` | Shown or hidden. When false the content is removed after it leaves. |
| `duration` | duration token | `'base'` | `fast` for small hints, `base` for ordinary UI, `slow` for larger surfaces. |
| `ease` | easing token | `'settle'` | Keep the default unless the motion belongs to an element. |
| `appear` | `boolean` | `false` | Animate on the first render too. |
| `children` | `ReactNode` | — | The content to animate. Required. |

## Rules

1. The travel is 8px (`--spacing-8`), the DLS entrance and exit distance (DESIGN-SYSTEM.md 1089, 2222). It is not a prop.
2. Defaults are `--duration-base` and `--ease-settle`, the DLS pairing for anchored arrivals.
3. The props take token names, never numbers.
4. The wrapper has no styling of its own and adds no role or label.
5. Content is removed from the page when `show` is false, so it leaves the accessibility tree too.
6. Under reduced motion the travel is dropped and the fade stays ("drop the travel, keep the fade").
7. No spring, no overshoot: the movement settles.

## Accessibility

- No controls, no focus, no live region.
- Hidden content is not in the page, so it is never read.

## Motion

Fade 0% to 100% and 8px of travel left, `--duration-base` with `--ease-settle`. Reduced motion: the fade only.

## Example

```tsx
import { SlideLeft } from '@collabrium/ui/motion';

<SlideLeft show={show}>
  <p>Your report is ready.</p>
</SlideLeft>
```

## Replaces

Amicro `SlideLeft` (entrance). Its 20px or 40px travel, 0.6s duration and `easeOutExpo` become the DLS 8px, `--duration-base` and `--ease-settle` (Q-MOT-1).
