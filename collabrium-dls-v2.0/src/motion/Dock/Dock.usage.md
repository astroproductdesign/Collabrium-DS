# Dock (Motion)

## Purpose

A row of icon buttons that swell as the mouse passes over them, the nearest most, and settle back when it leaves. Imported from `@collabrium/ui/motion`.

## Use when

- A small set of launchers or tools in a toolbar or footer.

## Don't use when

- Primary navigation.
- Many items.

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `aria-label` | `string` | — | Names the dock. |
| `items` | `DockItem[]` | — | `id`, `label` and `icon` (a Phosphor icon) per item. |
| `onSelect` | `(id: string) => void` | — | Called with the id of the item that was pressed. |

## Rules

1. Use it for a small set of launchers or tools.
2. Give every item a short label.
3. Keep to about eight items.

## Accessibility

- Every item is a real button named by its label, in order, reachable with Tab. The swell follows a mouse only, so touch, keyboard and reduced motion see the plain row. Items are not reorderable (Amicro's dragging has no keyboard way).

## Motion

- The mouse is near an item: The item swells from 32px toward 48px, the nearest most, on an overdamped spring. (Amicro's spring (settles, no token))
- The mouse leaves: The items settle back to 32px. (Amicro's spring (settles, no token))
- Reduced motion: No swell. (—)

## Example

```tsx
import { Dock } from '@collabrium/ui/motion';

<Dock aria-label="Apps" items={items} />
```

## Replaces

Amicro `Dock`. Its coloured squares are icon buttons, and its drag-to-reorder is not ported (it has no keyboard way, Q-MOT-17). Its sizes are `--spacing-32` and `--spacing-48`.
