# Lists

## Purpose
A vertical run of same-shaped rows. One **List item** with three slots,
Leading, Content (heading, description, caption) and Trailing (value,
badge, control, button or chevron), inside a **List** with a divider
between rows. Navigation rows, stat rows and activity logs are presets of
the one row, not separate components. A **ListSection** heads an Activity
Log's day.

⚠️ Designed from scratch in the DLS (built from Collab:Sales Home's stat
rows, client rows and activity feed): treat it as a first pass needing
design review.

## Use when
- A list of pages to open, a short set of figures in a card, a who-did-what feed, a settings list with switches.

## Don't use when
- **One figure stands alone on a dashboard.** Use a Stat / KPI card.
- **The rows are options in a popover.** Use Dropdown's own option rows.
- **The data has columns.** Use Table.

## Props

**List**

| Name | Options | Default | Description |
|---|---|---|---|
| `aria-labelledby` / `aria-label` | string | — | Name the list by its visible heading; `aria-label` only when there is none. Inside a `ListSection` it is named for you. |
| `leadingSize` | `'s'` \| `'m'` \| `'l'` | `'m'` | 24, 32 or 48 for every row: one size per list. The skeleton and timeline follow it. |
| `dividers` | boolean | `true` | The 1px Neutral-3 divider between rows, inset 16px. |
| `timeline` | boolean | `false` | Activity Log: a line through the leading elements. Turns dividers off. |
| `bleed` | boolean | `false` | On the page, not in a card: pulls the list out 16px so row content lines up with the page text; row fills round to `radius-sm`. |
| `busy` | boolean | `false` | Loading: `aria-busy` and one hidden line (`busyLabel`). Fill it with `ListItemSkeleton` rows. |
| `busyLabel` | string | `'Loading…'` | The hidden loading text ("Loading activity"). |
| `id`, `aria-*`, `data-*` | native | — | Passed to the `<ul>`, which gets the ref. `style` and `className` are not accepted. |

**ListItem**: the element follows what the row does.

| Name | Options | Default | Description |
|---|---|---|---|
| `heading` | ReactNode | **required** | The main label: names and items. |
| `headingRich` | boolean | `false` | A sentence in regular weight with names and items in `<b>` (Activity Log). |
| `headingLines` | `1` \| `2` | `1` | Lines before "…". |
| `description` | ReactNode | — | Supporting detail, Neutral-5. |
| `descriptionLines` | `1` \| `2` | `1` | Lines before "…". |
| `caption` | ReactNode | — | Meta on one line: timestamp, author, status. |
| `captionIcon` | Phosphor icon | — | A 14px icon (drawn Fill) before the caption. |
| `captionStatus` | `'neutral'` \| `'success'` \| `'warning'` \| `'error'` \| `'info'` | — | A 6px dot before the caption; the text must say the status too. |
| `leading` | `{ type: 'icon', icon }` \| `{ type: 'avatar', initials, src? }` \| `{ type: 'thumbnail', src }` \| `{ type: 'logo', initials?, src? }` | — | The leading element; decorative. |
| `value` | string | — | A number or status on the right, tabular. Read right after the heading. |
| `valueSize` | `'default'` \| `'large'` | `'default'` | `large` = h4, the Stat preset. |
| `badge` | a `Badge` | — | A status pill on the right. |
| `href` | string | — | A **link row**: opens a page. Never disabled. |
| `chevron` | boolean | `false` | Link rows only: the › that moves 4px on hover and focus. |
| `onClick` | function | — | A **button row**: acts in place. No chevron. |
| `disabled` | boolean | `false` | Button rows only. |
| `control` | `{ type: 'checkbox' \| 'switch', checked?, defaultChecked?, onCheckedChange?, disabled?, name?, value? }` | — | A **control row**: the whole row is the label and toggles it. |
| `action` | a `Button` | — | On a **static row** only: Secondary sm, or Ghost sm icon-only "more". The button is the row's only target. |
| `current` | `true` \| `'page'` \| `'step'` \| `'location'` | — | The open item in a list/detail layout only. |

None of `href`, `onClick` or `control` makes a **static row**: no hover, focus or press.

**ListItemSkeleton**: `leading` (`'square'` \| `'round'` \| `'none'`, default `'square'`), `value` (boolean).

**ListSection**: `title`, `headingLevel` (2–6, default 3), `uppercase`, `sticky`, `surface` (`'default'` \| `'canvas'`: what sits behind a sticky header; a setting rather than the DLS's custom property, decided 2026-11-06), `bleed`, `children` (the List).

**ListEmpty** (`title`, `hint`, `icon`), **ListError** (`title`, `hint`, `onRetry`, `retryLabel`), **ListFooter** (`children`: one Button Ghost sm).

## Rules
1. **The row's element follows what it does.** A link opens a page, a button acts in place, a control row toggles, a static row does nothing. A row is one target: nothing interactive inside it, except a static row's `action`.
2. **The chevron is only for a link row that opens a new page.** Never on a button, static or Activity Log row. The types allow it on link rows only.
3. **Tappable rows without a chevron still show hover and pressed.** Static rows show neither and aren't focusable.
4. **Timestamps go in the caption, never in trailing.** Under 24h relative ("2h ago"), otherwise a date ("12 Oct, 3:40pm").
5. **One place per data type:** names and items in the heading (bold when rich), detail in the description, timestamp / author / status in the caption, numbers in the value, status pills in a badge.
6. **Allowed trailing combos:** value + chevron, badge + chevron. There is no unread dot and no read/unread state.
7. **One leading size per list**, set on the List, so one list can't mix them (decided 2026-11-06). S 24, M 32, L 48. Icon chips are Neutral-2 with a Neutral-8 glyph (Fill, 14 / 16 / 24); avatars round, Neutral-2, bold initials; thumbnails cropped; logos with a 1px Neutral-3 ring, contained on white. Corners are a quarter of the box: 6px (`--radius-xs`), 8px (a local value: no token, decided 2026-11-06), 12px (`--radius-sm`).
8. **Alignment is automatic:** one line of content centres everything; two or more lines top-align the leading with the heading. Trailing always stays centred.
9. **Every line truncates with "…".** Two-line headings and descriptions clamp; the caption is always one line. Trailing never shrinks and is capped at half the row.
10. **Selected** (`current`) is only the open item of a list/detail layout: Neutral-2 with a 2px Obsidian bar at the start, inset 8px. A toggle uses its control; a disclosure uses `aria-expanded`.
11. **Disabled** is for button rows and control rows only, never links: text Neutral-4, leading, badge and control at 40% (a local value: no opacity token). No hover, no press, no divider fade and no high-contrast hover outline: the source still pressed a disabled control row. (Decided 2026-11-06.)
12. **In a card**, use `<Card padding="list">`: the list runs edge to edge, the card keeps 8px top and bottom and clips the square row fills. (Decided 2026-11-06.) **On the page**, use `bleed`.
13. **Activity Log:** avatar when a person did it, icon when the system did; a two-line rich heading; the timestamp in the caption; a static row (a link only when it opens the item, and never a chevron); optional badge; optional `timeline`. Group by day with `ListSection`, and use `sticky` with the right `surface` in a scroller.
14. **Pressed shows with a mouse too:** Neutral-3 wins over the hover fill (the source's hover hid it, as in Tabs). (Decided 2026-11-06.)
15. **A skeleton row is at least 62px**, the height of the heading + caption row it stands for, so the list doesn't jump when it loads (the source's was 56). (Decided 2026-11-06.)
16. **List states** (Activity Log) are swapped in place by the host: `ListEmpty`, skeleton rows in a `busy` list, `ListFooter` for "Load more" / "View all activity", `ListError` with Retry. Focus stays where it was.
17. **A one-row list on a dashboard is a Stat card.**

## Accessibility
- `role="list"` (Safari drops list semantics once list styling is removed), named by its visible heading (`aria-labelledby`), or `aria-label` when there is none. `ListSection` names its list for you.
- A tappable row is one `<a>` or `<button>` filling its `<li>`; a control row is one `<label>` with the real checkbox or switch (`role="switch"`) inside. Never `div role="button"`.
- The row's name is built from its content: the heading, a hidden ", {value}", then the description and caption, each after a hidden ", ". The visible value is hidden, so it is read once. No `aria-label` on rows. Leading and chevron are hidden; a badge is read as text.
- Keyboard: Tab reaches link, button and control rows (static rows are skipped); Enter opens a link or presses a button; Space presses a button or toggles a control row.
- Focus: the 2px Obsidian ring, inset (cards clip anything outside), plus the Neutral-2 fill. Hover never covers it. Focus is never moved.
- Every row is at least 48px tall, full width.
- Loading: skeleton rows are hidden; the list is `aria-busy` with one hidden line of text in its own hidden first item (decided 2026-11-06). No live regions.
- Forced colours: the focus ring is Highlight, hover draws a 1px CanvasText outline, the selected bar is Highlight, dividers and the timeline are GrayText, icon chips, avatars, thumbnails and bones get a 1px border, status dots keep their colour, disabled text is GrayText.

## Motion

| Interaction | Motion | Token |
|---|---|---|
| Hover | Neutral-2 fill; dividers on both sides fade | `--duration-fast` · `--ease-standard` |
| Pressed | Neutral-3 fill | `--duration-instant` |
| Hover or focus a link row | The chevron moves 4px right | `--duration-base` · `--ease-standard` |
| Loading | Bones shimmer | `--duration-ambient` · `--ease-standard` |
| Reduced motion | The chevron stays put and the shimmer stops; colour changes stay | — |

## Example

```tsx
import { Card, List, ListItem } from '@collabrium/ui';
import { Briefcase } from '@phosphor-icons/react';

<Card padding="list">
  <h4 id="pod-pulse">Pod pulse</h4>
  <List aria-labelledby="pod-pulse">
  <ListItem
    href="/campaigns?month=current"
    leading={{ type: 'icon', icon: Briefcase }}
    heading="Total campaigns this month"
    caption="vs last month: up 2"
    value="6"
    valueSize="large"
    chevron
  />
  </List>
</Card>
```

## Replaces
- `.c-list` (`.c-list-no-divider`, `.c-list-timeline`, `.c-list-bleed`)
- `.c-list-item` (`.is-loading`) and its slots: `.c-list-item-lead` (`.is-icon`, `.is-avatar`, `.is-thumb`, `.is-logo`, `.is-s`, `.is-l`), `.c-list-item-content`, `.c-list-item-heading` (`.is-rich`, `.is-2-line`), `.c-list-item-desc` (`.is-2-line`), `.c-list-item-caption`, `.c-list-item-caption-text`, `.c-list-item-dot`, `.c-list-item-trailing`, `.c-list-item-value` (`.is-large`), `.c-list-item-chevron`, `.c-list-item-input`, `.c-list-item-bone`
- `.c-list-subheader` (`.is-upper`, `.is-sticky`, `--c-list-subheader-bg`)
- `.c-list-empty`, `.c-list-error`, `.c-list-state-title`, `.c-list-state-hint`, `.c-list-footer`
