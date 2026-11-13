# Magnetic (Motion)

## Purpose

Pulls its content a little toward the pointer while the pointer is over it, and lets it go when the pointer leaves. Wrap a Button. Imported from `@collabrium/ui/motion`.

## Use when

- A single prominent call to action.

## Don't use when

- Controls in a row or a dense toolbar.
- Anything the person must hit precisely while it moves.

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | — | The content that is pulled: usually a Button. |
| `strength` | `'subtle' | 'medium' | 'strong'` | `'medium'` | How far the content follows: 20%, 35% or 50% of the pointer's distance from its centre. |

## Rules

1. The content moves toward the pointer by 20%, 35% or 50% of the pointer's distance from its centre, only while the pointer is over it.
2. The spring (stiffness 150, damping 15, mass 0.6) is Amicro's own and overshoots slightly when it lets go: the DLS says movement never bounces. Kept as it is by decision (Q-MOT-6).
3. Only a mouse triggers it; touch and pen do not.
4. It wraps content and adds no look, so a DLS Button keeps its own.
5. Under reduced motion it does not move.
6. Never use it on a control that must stay still to be hit: the pull is small, but keep it off dense toolbars.

## Accessibility

- No controls and no live region.
- The effect is decoration: it adds no role or label and takes no focus.
- Reduced motion: see Rules.

## Motion

- Pointer moves over it: The content moves toward the pointer by the strength, on a spring (stiffness 150, damping 15, mass 0.6). (Amicro's spring (no DLS token))
- Pointer leaves: The content springs back to rest. (Amicro's spring (no DLS token))
- Reduced motion: It does not move. (—)

## Example

```tsx
import { Magnetic } from '@collabrium/ui/motion';

<Magnetic><Button variant="primary">Start a report</Button></Magnetic>
```

## Replaces

Amicro `MagneticButton`. It was its own dark button; here it is a wrapper, so the DLS Button keeps its look. Its 45px range and 1.03 hover scale are dropped.
