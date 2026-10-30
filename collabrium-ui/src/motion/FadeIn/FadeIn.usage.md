# Fade in (Motion)

## Purpose

Fades content in and out. Opacity only, so it is unchanged by reduced motion. Imported from `@collabrium/ui/motion`.

## Use when

- Small hints, popovers and messages that appear or leave.
- The content should not move, only appear.

## Don't use when

- The content should arrive from a direction: use Slide up, Slide down, Slide left or Slide right.
- The content opens by height: use Collapse.

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `show` | `boolean` | `true` | Shown or hidden. When false the content is removed after it leaves. |
| `duration` | duration token | `'base'` | `fast` for small hints, `base` for ordinary UI, `slow` for larger surfaces. |
| `ease` | easing token | `'standard'` | Keep the default unless the motion belongs to an element. |
| `appear` | `boolean` | `false` | Animate on the first render too. |
| `children` | `ReactNode` | — | The content to animate. Required. |

## Rules

1. Opacity only, 0% to 100%.
2. Defaults are `--duration-base` and `--ease-standard`.
3. The props take token names, never numbers.
4. The wrapper has no styling of its own and adds no role or label.
5. Content is removed when `show` is false.
6. Reduced motion changes nothing: the DLS keeps fades.

## Accessibility

- No controls, no focus, no live region.
- Hidden content is not in the page, so it is never read.

## Motion

Fade 0% to 100%, `--duration-base` with `--ease-standard`. Reduced motion: unchanged.

## Example

```tsx
import { FadeIn } from '@collabrium/ui/motion';

<FadeIn show={value}>
  <p>Content</p>
</FadeIn>
```

## Replaces

Amicro `FadeIn` (entrance). Its 0.5s duration and `easeOutCubic` become `--duration-base` and `--ease-standard`.
