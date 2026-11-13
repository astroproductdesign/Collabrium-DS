# Tabs

## Purpose
In-page section switching: a full-width row of tabs over a 1px track, the
active one underlined in Obsidian, with that section's content in a panel
16px below. Switching reveals different content. Not app navigation (that is
SidebarNav) and not a view switch over the same content (that is Segmented
Control).

## Use when
- A page has up to about six sections of different content, and only one needs to show at a time.

## Don't use when
- **Switching changes how the same content is shown** (a list or a grid, a density). Use Segmented Control.
- **It is navigation across the app.** Use SidebarNav.
- **There are more than about six sections.** Use SidebarNav or a Select.
- **The panel would hold another tab bar.** Nested tabs aren't allowed: use a Select or SidebarNav's second level.

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `tabs` | `{ id, label, icon?, count?, disabled?, content? }[]` | **required** | The tabs, in order. `content` is the panel; leave it out to render the content yourself. |
| `aria-label` | text | **required** | Names the tab list ("Campaign sections"). |
| `value` | a tab id | — | The active tab, when you control it (from a `?tab=` parameter, say). An unknown id falls back to the first tab. |
| `defaultValue` | a tab id | the first tab | The active tab on first load when you don't control it. |
| `onValueChange` | `(id) => void` | — | Called with the chosen tab's id. |
| `scrollButtons` | boolean | `false` | Left and right arrows at the edges of an overflowing row, for mouse users. |
| `surface` | `'default'` \| `'canvas'` | `'default'` | What the tabs sit on, so the edge fades blend in: Neutral-1 (a card) or the warm page canvas. |
| `id`, `aria-*`, `data-*` | native | — | Passed to the root `<div>`. `style` and `className` are not accepted. |

The `ref` is forwarded to the root `<div>`.

## Rules
1. **Every tab has a visible label.** Icons are optional and supplementary (Phosphor, Regular, 16px, 8px before the label); icon-only tabs aren't allowed.
2. **Active:** Neutral-9 with a 2px Obsidian underline, drawn as an inset shadow so the row never shifts. **Inactive:** Neutral-5, no underline.
3. **Hover** (inactive only): Neutral-2 fill, Neutral-7 text. **Pressed:** Neutral-3, the text unchanged, on every tab (the DLS's hover rule hid it on inactive ones). **Focus:** the 2px Obsidian ring, drawn just inside the tab so the scrolling row can't clip it. **Disabled:** Neutral-4 at 40%, no response. Button Ghost's tokens throughout. (Decided 2026-11-06.)
4. **A count** (caption, 700) follows the label 4px after it, in the tab's own text colour. Hidden at 0; past 99 it reads "99+". Use it only for a meaningful, live number.
5. **Tabs keep their natural width and left-align;** they never stretch, shrink or truncate. When they don't fit, the row scrolls sideways (no scrollbar) and a 32px fade, in the colour of the surface (`surface`), shows on whichever edge hides a tab. (Decided 2026-11-06.)
6. **The panel** sits 16px under the track, with no fill or minimum height. The incoming and outgoing panels cross-fade on `--duration-fast`, together; under reduced motion they swap at once.
7. **The first enabled tab is active** unless `defaultValue` or `value` says otherwise. To make a tab shareable, keep it in a URL parameter and pass it as `value`; the component doesn't touch the URL. (Decided 2026-11-06.)
8. **The 32px fade and the 40% disabled opacity are local values.** (Decided 2026-11-06.)
9. **Scroll buttons are an option** (`scrollButtons`, off by default): a 32px Ghost arrow (Phosphor Caret, Regular, 16px) at each edge that hides tabs, on the surface's colour, with the fade just past it; a click scrolls the row by 80% of its width. Mouse only: never on touch screens. Not in the DLS. (Decided 2026-11-06.)

## Accessibility
- A `tablist` of `tab` buttons, each with `aria-selected`, controlling a `tabpanel` named by its tab.
- Only the active tab is a Tab stop. ← and → move to the previous or next enabled tab (wrapping) and select it; Home and End go to the ends. (Decided 2026-11-06.)
- Disabled tabs are real disabled buttons: not focusable, skipped by the keyboard. (Decided 2026-11-06.)
- A count is read after a pause: "Campaigns, 8". (Decided 2026-11-06.)
- The scroll buttons are `aria-hidden` and out of the Tab order: ← and → already reach every tab. (Decided 2026-11-06.)
- The outgoing panel is `inert` while it fades.

## Motion

| Interaction | Motion | Token |
|---|---|---|
| Hover, press, select | Text colour, fill and underline change | `--duration-fast` · `--ease-standard` |
| Switch panel | The two panels cross-fade together | `--duration-fast` · `--ease-standard` |
| Edge fades | Fade in or out as the row scrolls | `--duration-fast` · `--ease-standard` |
| Scroll button | The row scrolls smoothly by 80% of its width | the browser's smooth scroll |
| Reduced motion | The panels swap at once; a scroll button jumps | — |

## Example

```tsx
import { Tabs } from '@collabrium/ui';

<Tabs aria-label="Campaign sections" tabs={[
  { id: 'overview', label: 'Overview', content: <Overview /> },
  { id: 'campaigns', label: 'Campaigns', count: 8, content: <CampaignList /> },
]} />
```

## Replaces
- `.c-tabs-scroll-wrap` (`.show-left`, `.show-right`)
- `.c-tabs`, `.c-tab` (`.active`, `.is-disabled`), `.c-tab i`, `.c-tab .count`
