# Page transition (Motion)

## Purpose

A curtain that covers the whole window while a page is swapped, then uncovers it. Stairs, wave or fade. Imported from `@collabrium/ui/motion`.

## Use when

- A few big moments, such as entering a section.

## Don't use when

- Every navigation.
- Covering a slow load: use Loading State.

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `type` | `'stairs' | 'wave' | 'fade'` | `'stairs'` | The kind of curtain. |
| `isVisible` | `boolean` | — | Covers when true, uncovers when false. |
| `onComplete` | `() => void` | — | Called when it has finished covering or uncovering. |

## Rules

1. The curtain is fixed over the window at `--z-tour`, takes no clicks and is `aria-hidden`.
2. Stairs: five Neutral-9 columns, `--duration-reveal` with `--ease-precise`, 50ms apart (no token, Q-MOT-10).
3. Wave: three layers (Neutral-6, Neutral-7, Neutral-9) drawn frame by frame over 1.3s, with a fixed spread of delays (Amicro used random ones).
4. Fade: a Neutral-9 sheet over `--duration-base`.
5. Under reduced motion every type is a fade.
6. It does not announce a page change: the page moves focus to the new heading.

## Accessibility

- Decoration only: hidden from assistive technology, no pointer events.
- Move focus to the new page's heading yourself.

## Motion

Stairs, wave or fade; reduced motion: fade.

## Example

```tsx
import { PageTransition } from '@collabrium/ui/motion';

<PageTransition type="stairs" isVisible={covered} />
```

## Replaces

Amicro `PageTransition`. It listed 18 types but drew only Double stairs and Liquid wave; the other 16 fell back to a fade, so three types are ported (stairs, wave, fade). Its zinc greys and `z-50` are tokens.
