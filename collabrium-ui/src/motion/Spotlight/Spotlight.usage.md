# Spotlight (Motion)

## Purpose

A soft light that follows the pointer across its content and fades in when the pointer enters. It works on a card, a button or any block. Imported from `@collabrium/ui/motion`.

## Use when

- A card or button that should feel responsive to the pointer.

## Don't use when

- Content the light would make harder to read: keep the glow at its default strength.
- Touch-only surfaces: the light needs a mouse or pen over it.

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | — | The content the light moves across. |
| `glow` | `AccentName` | `'navy'` | The light's colour: Obsidian or one of the seven series colours. |
| `size` | `'sm' | 'md' | 'lg'` | `'md'` | How wide the light is: 120px, 180px or 250px. |
| `radius` | `'sm' | 'md' | 'lg' | 'pill'` | `'lg'` | The corner radius the light is clipped to, so it matches the content. |

## Rules

1. The light is the glow colour at 18% in a radial gradient, over the content, clipped to the chosen radius.
2. It fades in and out over `--duration-slow` with `--ease-standard`, and follows the pointer exactly.
3. It sits over the content and takes no clicks; it is `aria-hidden`.
4. The glow is Obsidian or a series colour, never a free colour.
5. The three sizes (120, 180, 250px) have no tokens (Q-MOT-8).
6. Glow button from Amicro is not a separate piece: wrap a Button in a Spotlight (Q-MOT-9).

## Accessibility

- No controls and no live region.
- The effect is decoration: it adds no role or label and takes no focus.
- Reduced motion: see Rules.

## Motion

- Pointer enters: The light fades in at the pointer. (--duration-slow · --ease-standard)
- Pointer moves: The light follows the pointer with no smoothing. (—)
- Pointer leaves: The light fades out. (--duration-slow · --ease-standard)
- Reduced motion: No change: the light has no travel of its own. (—)

## Example

```tsx
import { Spotlight } from '@collabrium/ui/motion';

<Spotlight><div className="docs-motion-sample">Move the pointer over this card.</div></Spotlight>
```

## Replaces

Amicro `Spotlight` and `GlowButton`: both are this effect, on a card and on a button. Their white or blue glow colours become a colour prop.
