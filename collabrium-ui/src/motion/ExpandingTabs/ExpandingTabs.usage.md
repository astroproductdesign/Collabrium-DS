# Expanding tabs (Motion)

## Purpose

A row of tabs that are icons until one is active: the active tab opens to show its label. A real tab list with arrow-key movement. Imported from `@collabrium/ui/motion`.

## Use when

- A short set of views where space is tight (a mobile bar, a toolbar).

## Don't use when

- Many tabs.
- Page navigation.
- Tabs whose names must always be visible: use Tabs.

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `aria-label` | `string` | — | Names the group of tabs. |
| `tabs` | `ExpandingTab[]` | — | `id`, `label`, `icon` (a Phosphor icon) and an optional `color` per tab. Two to five read well. |
| `value` | `string` | `first tab` | The id of the active tab. |
| `onValueChange` | `(id: string) => void` | — | Called with the id of the tab that was chosen. |

## Rules

1. Use it for a few views with clear icons.
2. Show the content for the active id in the page.
3. Pick icons people recognise: the inactive tabs show only the icon.

## Accessibility

- It is a tab list: Left and Right arrows move between tabs and choose them, Home and End go to the ends, and only the active tab is a Tab stop. Each tab is named by its label even when only its icon shows. It controls no panels itself; connect the panel with `aria-labelledby` set to the tab's id (`<id>-tab`). Reduced motion opens the label at once.

## Motion

- A tab becomes active: It widens and its label opens beside the icon; the previous tab closes. (--duration-base · --ease-settle)
- Reduced motion: The label appears at once. (—)

## Example

```tsx
import { ExpandingTabs } from '@collabrium/ui/motion';

<ExpandingTabs aria-label="Mailbox" tabs={tabs} />
```

## Replaces

Amicro `TabBar`. Its spring and per-tab Tailwind colours become `--duration-base` with `--ease-settle` and a colour per tab (Obsidian or a series colour); the label is Neutral-9 and only the icon takes the colour. It is now a keyboard-operable tab list (Q-MOT-19).
