# Table

## Purpose
Rows and columns of structured data, in two contexts: **Standalone** (the
table is its own bordered surface on a page) and **Embedded** (inside a
Card, panel or modal, borrowing that surface). Every column sorts by
default. Checkbox selection with a bulk toolbar, an action column, frozen
columns when it scrolls sideways, a loading skeleton, an empty state and a
sticky header are opt-in.

The row and header anatomy is transcribed; sorting, selection, the bulk toolbar, the action column, frozen columns, loading, empty, sticky header and column priority are ⚠️ designed from scratch in the DLS: a first pass needing design review.

## Use when
- Comparing many records across the same fields (campaigns, invoices, people).
- People need to sort, select several rows to act on, or open one.

## Don't use when
- **A short list of named items with one value each.** Use List.
- **One headline number.** Use Stat / KPI card.
- **The data is the point of a chart.** Use a chart, with its "View as table".

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `label` | string | **required** | Names the table for screen readers. |
| `columns` | `TableColumn[]` | **required** | `key`, `header`, `type` (`text`, `number`, `date`, `status`), `render`, `sortValue`, `sortable` (default true), `priority` (`high`, `medium`, `low`), `icon`. |
| `rows`, `getRowKey` | `T[]`, `(row) => string` | **required** | The data, and a stable key per row. |
| `variant` | `'standalone'` \| `'embedded'` | `'standalone'` | Its own surface, or inside a Card or panel. |
| `getRowLabel` | `(row) => string` | first column | The row's name, read with its checkbox and actions. |
| `onRowClick` | `(row) => void` | — | Opens a row: a press on it, or Enter on its first column. |
| `selectable` | boolean | `false` | Adds the checkbox column. |
| `selectedKeys`, `defaultSelectedKeys`, `onSelectionChange` | `string[]`, `(keys) => void` | — | The checked rows. |
| `bulkActions` | up to 3 `{ label, icon?, onClick(keys), tone? }` | — | Standalone: the toolbar while rows are checked. `tone: 'danger'` for a destructive one. |
| `rowActions` | up to 3 `{ label, icon, onClick(row) }` | — | Ghost icon buttons in the last column, on every row. |
| `sort`, `defaultSort`, `onSortChange` | `{ key, direction }` \| `null` | `null` | One sort at a time. |
| `manualSort` | boolean | `false` | Keep the rows' order (sort on the server from `onSortChange`). |
| `loading` | boolean | `false` | 3 skeleton rows after 300ms. |
| `empty` | ReactNode | — | Shown when there are no rows: an `EmptyState`. |
| `stickyHeader`, `maxHeight` | boolean, number | `false`, `480` | Standalone: scrolls inside its box with the header held. |
| column `total`, `totalLabel` | `(rows) => ReactNode`, string | —, `"Total"` | Adds the total row: each column's `total` from every row; the label sits in the first column. |

The ref goes to the root `<div>`. `style` and `className` are not accepted.

## Rules
1. **Anatomy, both variants:** cells 12px 16px (12px at the sides below 768px), a 1px Neutral-3 line under each row and none under the last, never lines on every side. Body cells body2 (14px / 20px / 500), Neutral-9.
2. **Standalone:** 1px Neutral-3, `radius-lg` (20px, as Card), Neutral-1, the header clipped to the corners; headers h5 (16px / 700), Neutral-9 on Neutral-2. **Embedded:** no container; headers label3 (11px / 700), uppercase, tracked, Neutral-5, no fill. Never mix the two header styles.
3. **Every column is left-aligned,** numbers, dates, statuses, checkboxes and actions included. Numbers get tabular figures. Numbers, dates and statuses stay on one line, so a table that doesn't fit scrolls sideways instead of breaking them (decided 2026-11-10).
4. **Row hover** (Neutral-2) only on an interactive row: one that opens, has a checkbox or has actions. **Selected:** Neutral-2 and a 2px Obsidian line on the left. The pointer cursor only with `onRowClick`.
5. **Sorting is on for every column,** both variants; turn it off only for a column with no meaningful order. A trailing 14px arrows icon (Regular, Neutral-4); sorted shows an up or down arrow and the header in Neutral-9. Unsorted → ascending → descending → unsorted; one column at a time. A press anywhere on the header, or Enter / Space on it: each sortable header holds a button, as the gallery's headers can't be reached by keyboard (decided 2026-11-10).
6. **Checkboxes are opt-in:** the first column, frozen left. The header box selects all (from none or some) or clears (from all), and shows checked, mixed or none. A row's box shows on row hover, on keyboard focus (decided 2026-11-10), or while any row is checked. Checking a row never opens it, and opening never checks it.
7. **Bulk toolbar** (Standalone, while rows are checked): over the header labels and the action header, never over the header checkbox, which clears the selection (no separate "Clear selection"). Neutral-2, as tall as the header, "N selected" (label2 bold) on the left, up to 3 ghost buttons sm on the right; a destructive one in Red. Fades in and drops 4px. Past 3 actions the DS wants a `dots-three` menu: it comes with a Menu component (decided 2026-11-10); until then, at most 3.
8. **Action column:** last, frozen right, always visible (never only on hover), 1–3 ghost icon buttons sm, 4px apart; its header is empty on screen and named "Actions" for screen readers (decided 2026-11-10). The DS's 40 / 72 / 104px widths are minimums the content outgrows: the columns hug their content (50px checkbox column, 100px for two actions), as in the gallery (decided 2026-11-10).
9. **Frozen columns:** the checkbox, the first content column and the actions stay put when the table scrolls sideways, opaque in the row's colour; a shadow (2px sideways, 8px blur: `shadow-2`'s strength, so it reads clearly; decided 2026-11-10) shows on the side with content scrolled under it. Never freeze more.
10. **Loading:** 3 skeleton rows after 300ms, bars Neutral-2 `radius-sm` left-aligned in every column, with Progress Bar's shimmer (static under reduced motion); the real rows fade in after.
11. **Empty:** the body keeps at least 240px. No data: a section Empty state. Filters found nothing: an inline one.
12. **Sticky header** (Standalone, opt-in; decided 2026-11-10, the DS has no CSS for it): the table scrolls inside `maxHeight` and the header stays, with `shadow-1` once a row has scrolled under it.
13. **Phones (below 768px):** the table keeps 600px and scrolls sideways, never turning into cards; the browser's own scrollbar stays (the DS's "hidden until hover" would hide that it scrolls; decided 2026-11-10). `priority` hides columns: `low` first, at 1024px and below, then `medium` at 768px and below; `high` always shows (decided 2026-11-10; the DS has low and medium the other way round).
14. **Total row** (designed here, not in the DLS; decided 2026-11-10): any column with a `total` adds a row under the body. The first column reads "Total" (a row header); each total is body2 bold Neutral-9, with a 1px Neutral-3 line above and a Neutral-2 fill in both variants (in embedded too, so the total reads as a summary, not another row). It is computed from every row, stays at the bottom when sorting, follows the frozen columns, and stays in view with a sticky header. It hides while loading or empty. Sum counts and money; for a rate, show the overall rate (total clicks over total impressions), never a sum or plain average of percentages.
15. **Columns:** about 8–10 visible at most before scrolling or hiding by priority. Keep headers short. A cell icon (14px) only where it identifies something.

## Accessibility
- A real `<table>` named by `label`; headers are column headers and the sorted one carries `aria-sort`.
- Each sortable header holds a button: Tab reaches it, Enter or Space sorts.
- Checkboxes are the library's Checkbox, named "Select all rows" and "Select <row>". Row actions are named "<Action>, <row>". The action column's header is empty on screen and named "Actions" for screen readers.
- With `onRowClick`, the first column's content is a button, so a row opens from the keyboard.
- The total row is a `<tfoot>`; its "Total" is a row header, so each total is read with it ("Total, Spend, RM 45,700.00").
- While loading, the table is busy (`aria-busy`) and the skeleton is hidden from screen readers.
- Forced colours: a selected row gets a Highlight outline; the skeleton a GrayText border.

## Motion

| Interaction | Motion | Token |
|---|---|---|
| Row hover | Neutral-2 fill | `--duration-fast` · `--ease-standard` |
| Row checkbox appears | Fades in | `--duration-fast` · `--ease-standard` |
| Bulk toolbar | Fades in and drops 4px | `--duration-fast` · `--ease-standard` |
| Skeleton | Progress Bar's shimmer; static under reduced motion | `--duration-ambient` |
| Rows after loading | Fade in | `--duration-fast` · `--ease-standard` |

## Example

```tsx
import { Badge, Table, type TableColumn } from '@collabrium/ui';

const columns: TableColumn<Campaign>[] = [
  { key: 'name', header: 'Campaign' },
  { key: 'status', header: 'Status', type: 'status', render: (c) => <Badge variant={tone[c.status]}>{c.status}</Badge> },
  { key: 'budget', header: 'Budget', type: 'number', render: (c) => `RM ${c.budget.toLocaleString('en-US', { minimumFractionDigits: 2 })}` },
];

<Table label="Campaigns" columns={columns} rows={campaigns} getRowKey={(c) => c.id} />
```

## Replaces
- `.c-table`, `.c-table-standalone-wrap`, `.c-table-standalone`, `.c-table-embedded`, `.num`, `tr.is-interactive` / `.is-clickable` / `.is-selected`, `.c-table-cell-icon`
- `.c-table-sort-th` (`.is-sorted`, `.no-sort`), `.c-table-sort-icon`, `.c-table-chk-col`, `.c-table-bulk-toolbar` (`-count`, `-actions`, `-danger`), `.c-table-action-col`, `.c-table-freeze-left` / `-right`, `.is-scrolled-left` / `-right`, `.c-table-scroll-x`, `.c-table-scroll-x-inner`, `.c-table-skel-bar`
- The gallery's table script (sorting, the checkbox states, the bulk toolbar, the scroll shadows)
