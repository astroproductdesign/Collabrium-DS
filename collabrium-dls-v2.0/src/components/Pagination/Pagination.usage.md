# Pagination

## Purpose
The footer under a table or list that splits results into pages. Two
variants, chosen by page count: **Default** (under 10 pages: the result
count and numbered page buttons) and **Overflow** (10 or more: Prev, the
current page as a Dropdown, "of N", Next). Rows per page is optional in
both. It hides itself when everything fits on one page.

⚠️ Designed from scratch in the DLS (no source in the brand deck or the teammate's build): a first pass needing design review.

## Use when
- A table or list has more results than one page should hold.

## Don't use when
- **Results load as the reader scrolls.** Use a "Load more" button or infinite loading instead.
- **Stepping through a process.** Use Stepper.
- **Everything fits on one page.** It hides itself; don't force it.

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `page`, `defaultPage`, `onPageChange` | number, `(page) => void` | —, `1` | The current page, 1-based. Update it at once on change, before the data arrives. |
| `pageSize` | number | `20` | Rows per page. |
| `totalResults` | number | — | All results. Leave out when unknown and give `totalPages`. |
| `totalPages` | number | from `totalResults` | The page count, when the total isn't known. |
| `onPageSizeChange` | `(size) => void` | — | Shows Rows per page, in both variants. A new size goes back to page 1. |
| `pageSizeOptions` | number[] | `[10, 20, 50, 100]` | The Rows per page choices. |
| `pageSizeStorageKey` | string | — | Remembers the chosen size in the browser under this key and restores it on load. |
| `loading` | boolean | `false` | The count shows the previous one in Neutral-4 while the next page loads. |
| `label` | string | `"Pagination"` | Names the navigation landmark. |

The ref goes to the `<nav>`. `style` and `className` are not accepted. These props replace the gallery's script.

## Rules
1. **Container:** a row under the content, 16px above, a 1px Neutral-3 line on top, its two ends spaced apart, wrapping when narrow.
2. **The variant follows the page count,** never a flag: Default under 10 pages, Overflow from 10.
3. **Never a single-page control:** it hides when `totalResults` fits in `pageSize`. With Rows per page it hides only when the results fit the smallest size; at one page it keeps the count and Rows per page and drops the page controls, so the reader can go back to a smaller size (decided 2026-11-10).
4. **Result count** (Default): caption, Neutral-5. "Showing 41–60 of 116" (an en dash), "Showing 1 of 1", "Showing 221–248 of 248" (the real last item), "Showing 1–20" when the total is unknown. No "No results": zero results fit one page, so the control hides and the table or list's own empty state speaks (decided 2026-11-10).
5. **Page numbers** (Default): 32px, `radius-sm`, caption bold, Neutral-5; hover and pressed Neutral-2 with Neutral-9 (pressed looks like hover, as Button ghost; decided 2026-11-10); the current page Obsidian with white text, the only filled one, not clickable but still in the tab order. At most 7 slots: the first and last pages, the current one and its neighbours, and "…" (not clickable) for the gaps (decided 2026-11-10).
6. **Prev / Next:** Default, 32px ghost icon buttons with a Neutral-9 caret; Overflow, "Prev" / "Next" with a caret, caption bold Neutral-9, ghost hover. At the ends they stay, disabled (Neutral-4, not-allowed), so the row never shifts.
7. **The pickers:** the current page (1 to N) followed by "of N" (caption, Neutral-5), and Rows per page with its caption label beside the box. Both are the library's Dropdown, as the DS says, not native selects (decided 2026-11-10: the open list matches the system): Input field's 40px box, as wide as the longest number, with the value in caption so it matches "of N"; Dropdown's list, keyboard and type-to-jump. The list opens below, or above when there's more room there, over any card or table box (it is never clipped). Picking a value commits at once; a new page size goes back to page 1. A remembered size is opt-in and per table (`pageSizeStorageKey`), never one key for every table (decided 2026-11-10).
8. **Loading:** the controls stay live; the count shows the previous one in Neutral-4 until the data arrives; the current page moves at once.
9. **Phones (below 768px):** centred. Default drops the count and the numbers for "3 of 6" (caption bold Neutral-9) between Prev and Next. Both drop Rows per page.
10. **Rows per page in both variants** (decided 2026-11-10; the DS has it in Overflow only, where a bigger size could drop the count under 10 pages and strand the reader in Default with no way back). In Default it sits after the count.

## Accessibility
- A `<nav>` landmark named "Pagination" (`label`).
- Page buttons are "Page 3"; the current one has `aria-current="page"`. Default's Prev and Next are "Previous page" and "Next page"; Overflow's are named by their visible "Prev" and "Next".
- The page picker is a Dropdown named "Current page, of 77" (the visible "of 77" is hidden from screen readers, so it isn't read twice); Rows per page is named by its visible label.
- The "…" is hidden from screen readers.
- Tool approval's step count reuses the indicator, shown at every width.
- Forced colours: the current page is Highlight; disabled Prev / Next are GrayText.

## Motion

| Interaction | Motion | Token |
|---|---|---|
| Hover, press | Fill and text colour | `--duration-fast` · `--ease-standard` |
| Result count update | None: it changes at once | — |
| Reduced motion | Instant | — |

## Example

```tsx
import { Pagination } from '@collabrium/ui';

const [page, setPage] = useState(1);

<Pagination page={page} onPageChange={setPage} pageSize={20} totalResults={116} />
```

## Replaces
- `.c-pagination` (`.count`), `.c-page-controls`, `.c-page-btn` (`.current`), `.c-page-ellipsis`, `.c-page-nav`, `.c-pagination-indicator`
- `.c-pagination-overflow` and `-rows`, `-controls`, `-select-wrap`, `-select`, `-nav`, `-total`
- The gallery's pagination script
