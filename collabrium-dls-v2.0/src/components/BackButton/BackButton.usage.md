# Back button

## Purpose
The one control at the top of a Level 2+ screen (a screen that is a child of
another) that goes one level up. It names the parent screen ("← Reports"),
never a generic "Back". It sits in its own row above the page header; the
page header itself is unchanged.

⚠️ Designed from scratch in the DLS: treat it as a first pass needing design review.

## Use when
- A screen was reached by drilling down (a table row, a card, any control that opens a child screen) and the person needs a way back up.

## Don't use when
- **The screen is Level 1** (reached from the sidebar). It has no parent.
- **You want a trail of every level, or a Home shortcut.** There is none: one level up, one name.
- **You want to scroll back up the page.** Use Back to top.

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `label` | text | **required** | The immediate parent screen's name, in its title casing. Cut with "…" past 40 characters. |
| `href` | URL | — | Makes it a real link to the parent. |
| `onClick` | `() => void` | — | Makes it a button (for app routing that isn't a link). One of `href` or `onClick` is required. |
| `id`, `aria-*`, `data-*` | native | — | Passed to the link or button. `style` and `className` are not accepted. |

The `ref` is forwarded to the link or button.

## Rules
1. **Name the parent, at every depth.** A Level 3 screen's Back button reads the Level 2 screen's name, never the root's.
2. **One level up, always.** Never to the root, never a breadcrumb trail, never a Home shortcut.
3. **Above the page header, never inside it,** 12px above its title, at the top of the content region. It doesn't touch the sidebar.
4. **Ghost at rest:** no fill, border or shadow. Hover Neutral-2, pressed Neutral-3, the Obsidian focus ring: Button Ghost's own tokens.
5. **The arrow is Phosphor `ArrowLeft`, Regular (Tier 1), 16px,** 8px from the label (label2, Neutral-9).
6. **Past 40 characters the label is cut with "…";** screen readers still hear the whole name. (Decided 2026-11-06.)
7. **34px tall** (label2's 18px line), with a 44px hit area that reaches above and below it, unseen. (Decided 2026-11-06.)
8. **Above the page header, never replacing its title,** with its own 12px gap. (Decided 2026-11-06.)
9. **A link by preference** (`href`): going up is navigation. `onClick` makes a button for routing that isn't a link. (Decided 2026-11-06.)
10. **No disabled state:** a Level 2+ screen always has a parent. (Decided 2026-11-06.)

## Accessibility
- A real link (`href`) or button (`onClick`), reachable by Tab, with the 2px Obsidian focus ring.
- Named "Back to {parent}" ("Back to Reports"), with the full name even when the label is cut; the arrow is `aria-hidden`. (Decided 2026-11-06.)
- The hit area is 44px tall. (Decided 2026-11-06.)

## Motion

| Interaction | Motion | Token |
|---|---|---|
| Hover, press | The fill changes | `--duration-fast` · `--ease-standard` |

## Example

```tsx
import { BackButton } from '@collabrium/ui';

<BackButton label="Reports" href="/reports" />
```

## Replaces
- `.c-back-button-row`, `.c-back-button`
