# Collapse (Motion)

## Purpose

Expands and collapses content by height. Imported from `@collabrium/ui/motion`.

## Use when

- Accordions, disclosures and sections that open in place.

## Don't use when

- The content should only fade: use Fade in.
- The content slides in from a side: use Slide up, Slide down, Slide left or Slide right.

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `open` | `boolean` | — | Expanded or collapsed. When false the content is removed after it leaves. |
| `duration` | duration token | `'base'` | `fast` for small hints, `base` for ordinary UI, `slow` for larger surfaces. |
| `ease` | easing token | `'settle'` | Keep the default unless the motion belongs to an element. |
| `appear` | `boolean` | `false` | Animate on the first render too. |
| `children` | `ReactNode` | — | The content to animate. Required. |

## Rules

1. Defaults are `--duration-base` and `--ease-settle`, the DLS expand and collapse pairing (DESIGN-SYSTEM.md 2750, Rule 6). Sidebar navigation uses `slow` with `standard`.
2. The props take token names, never numbers.
3. Overflow is clipped only while collapsed or moving.
4. Content is removed once collapsed, so it leaves the accessibility tree.
5. Reduced motion makes the height change instant.

## Accessibility

- No controls, no focus, no live region.
- Hidden content is not in the page, so it is never read.

## Motion

Height 0 to auto, `--duration-base` with `--ease-settle`. Reduced motion: instant.

## Example

```tsx
import { Collapse } from '@collabrium/ui/motion';

<Collapse open={value}>
  <p>Content</p>
</Collapse>
```

## Replaces

Not from Amicro: this was already in the library. It now has a page of its own.
