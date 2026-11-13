# Icon swap (Motion)

## Purpose

Swaps one icon for another when its key changes: the old one shrinks and blurs out as the new one grows in. For toggles such as copy and copied, or play and pause. Imported from `@collabrium/ui/motion`.

## Use when

- A control whose icon changes with its state (copy and copied, play and pause, menu and close).

## Don't use when

- Content that is not an icon.
- Swapping a whole control: use Fade in.

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `swap` | `string` | — | Names what is showing. When it changes the icon swaps. Use a short stable string such as `'play'` or `'pause'`. |
| `children` | `ReactNode` | — | The icon, or any small content, for the current `swap`. |

## Rules

1. Put it inside a control that already has a text label or `aria-label`.
2. Give each state a different `swap` string.
3. Keep to one small icon.

## Accessibility

- The icons are decoration: put `aria-hidden` on them and name the state on the control that holds them. Reduced motion drops the shrink and the blur and cross-fades.

## Motion

- `swap` changes: The old content shrinks to 25% and blurs out while the new content grows from 25% and comes into focus. (--duration-fast · --ease-standard)
- Reduced motion: The two cross-fade: no shrink and no blur. (—)

## Example

```tsx
import { IconSwap } from '@collabrium/ui/motion';

<IconSwap swap={copied ? 'check' : 'copy'}>
  {copied ? <Check /> : <Copy />}
</IconSwap>
```

## Replaces

Amicro `IconSwap` and `IconSwapItem`. They were two pieces (a presence wrapper and an item) with a spring of bounce 0; here one piece takes a `swap` key and uses `--duration-fast` with `--ease-standard`.
