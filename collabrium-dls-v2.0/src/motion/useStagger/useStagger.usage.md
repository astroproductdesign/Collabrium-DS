# useStagger (Motion)

## Purpose

A hook that returns a delay for each of a row of items, so they enter one after another. Imported from `@collabrium/ui/motion`.

## Use when

- Rows and lists that enter together.

## Don't use when

- Letters and words: its steps are for rows.

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `count` | `number` | — | How many items. |
| `step` | `'sm' | 'md'` | `'sm'` | 80ms or 120ms, the DLS row staggers. |
| `baseDelay` | `number` | `0` | A delay before the first, in seconds. |
| `from` | `'first' | 'last' | 'center' | number` | `'first'` | Where it starts. |

## Rules

1. Returns seconds, the unit the motion library takes.
2. The gap is `--stagger-sm` or `--stagger-md`, never a number (Amicro took a free number).
3. `from` is an end, the middle, or an item's index.
4. Under reduced motion, pass 0 as the delay.

## Accessibility

- A hook has no interface.

## Motion

None of its own.

## Example

```tsx
import { useStagger } from '@collabrium/ui/motion';

const delays = useStagger(items.length);
```

## Replaces

Amicro `useStagger`. Its free `staggerDelay` number becomes the `step` option (`sm` or `md`).
