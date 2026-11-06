# Search input

## Purpose
A search box: a leading magnifying glass, Input field's box, and a clear (×)
button once there is text. Three variants:
- **Default:** a plain text search; the results show elsewhere on the page.
- **User Search:** search people and pick one; the box collapses to the person (avatar, name, role).
- **Item Search:** the same for records, without the avatar.

⚠️ Designed, not sourced, in the DLS (it absorbs the former "Search input clear button" and UserPicker): a first pass needing design review.

## Use when
- Filtering a page's content by text (Default).
- Choosing one person or one record from many (User, Item).

## Don't use when
- **The choice is from a short, known list.** Use Dropdown (not converted yet) or Radio.
- **It's any other single-line value.** Use Input field.

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `variant` | `'default'` \| `'user'` \| `'item'` | `'default'` | Default searches in place; User and Item pick one result. |
| `label` | ReactNode | **required** | "Search", "Search for a person". |
| `hideLabel` | boolean | `false` | Hides the label visually; still read out. |
| `placeholder` | string | `'Search…'` | An example of what to type. |
| `error` | ReactNode | — | Bold Red text under the box, a Red border and `aria-invalid`. |
| `disabled` | boolean | `false` | Neutral-2, Neutral-4 text, no clear button. |
| `value`, `defaultValue`, `onValueChange` | string | — | Default: the text. |
| `loading`, `noResults` | boolean | `false` | Default: a panel under the box with the spinner, or "No matches found". |
| `query`, `defaultQuery`, `onQueryChange` | string | — | User, Item: the typed text; filter or fetch `results` from it. |
| `results` | `{ id, title, subtitle?, initials? }[]` | **required** (User, Item) | The matches; `initials` for User Search's avatars. |
| `loading` | boolean | `false` | User, Item: the list shows the spinner. |
| `selected`, `defaultSelected`, `onSelectedChange` | `SearchResult \| null` | `null` | User, Item: the choice. |
| `name` | string | — | User, Item: a hidden input posts the chosen `id`. |
| `clearLabel`, `clearSelectionLabel`, `emptyText`, `loadingLabel` | string | `'Clear search'`, `'Clear selection'`, `'No matches found'`, `'Searching…'` | Text, for other languages. |

Default also passes native input props (`name`, `id`, `aria-*`, `onKeyDown`, …) to the `<input>`, which gets the ref. `style` and `className` are not accepted.

## Rules
1. **Input field's box, 48px tall** (`--control-height-lg`; the DLS has 40px, decided 2026-11-06 so the selected row's avatar and two lines have room): `radius-sm`, 1px Neutral-3, Neutral-1; real `:focus` swaps in a 2px Obsidian border. The box keeps 36px clear at each end for the icon and the ×.
2. **The magnifying glass** is 16px, Regular (Tier 1), Neutral-5, 12px from the start, decorative.
3. **The clear (×)** appears only once there is text: 16px Regular, Neutral-5 (Neutral-9 on hover, a colour change only), 12px from the end, with a 44px hit area and the standard focus ring (decided 2026-11-06). While the box is empty it is removed from the tab order, not just hidden. Pressing it empties the box and puts focus back in it.
4. **Error:** a 1px Red border and bold Red caption text under the box; focused, the 2px Obsidian border wins, as in Input field (decided 2026-11-06). **Disabled:** Neutral-2 fill, Neutral-4 text (the DLS's, kept: decided 2026-11-06), `not-allowed`, no clear button.
5. **The results panel** is the popover convention: `radius-md`, 1px Neutral-3, `shadow-3`, 8px under the box, floating over the content below at the menu layer, so opening it never pushes the page down (decided 2026-11-06). Rows are 8px / 12px padding, 12px gap, Neutral-2 on hover. User rows lead with a 32px avatar (Neutral-2, bold initials); then the name (body2 size, 700) and the role or type (caption, Neutral-5).
6. **"No matches found"** is an inline note (body2, Neutral-5, centred, 16px padding), never a full Empty state.
7. **Loading** is a centred `SpinnerGap` (24px, Regular, Neutral-5) turning on `--duration-ambient`, linear: a process, never a Fill icon. Under reduced motion it stands still (decided 2026-11-06).
8. **Selected** collapses to the same 48px box (avatar, name, role, and a × that clears the choice), so choosing never moves the layout. Disabled, the name, role and avatar initials are Neutral-4 (decided 2026-11-06), and the × is hidden but keeps its space, so the row stays the same width.
9. **Never a clear button and another trailing icon together.**
10. **It fills its container**, with the label 4px above the box, as Input field (decided 2026-11-06; the DLS capped it at 320px with an 8px label gap).
11. **Default can show the panel** for loading and no results, as the gallery does (decided 2026-11-06). **The × shows whenever there is text**, error or not (decided 2026-11-06).
12. **The selected row keeps the label** above it, and has the normal cursor: only its × does anything (decided 2026-11-06).
13. **Focus moves only when the focused thing disappears:** the text's × returns focus to the box; picking a result moves it to the selected row's ×; that × returns it to the box (decided 2026-11-06).

## Accessibility
- Default is a labelled text input. User and Item Search are a combobox: the box has `role="combobox"`, `aria-expanded`, `aria-controls` and `aria-activedescendant`; the results are a `listbox` of `option`s.
- Keyboard (decided 2026-11-06; the DLS has none for the list): Tab into the box, then to the × when there is text. In User and Item Search, ↓ and ↑ move through the results (wrapping) and the current row takes the hover fill, Enter picks one, Escape closes the list (typing opens it again).
- The × is a real button named "Clear search" or "Clear selection". The search icon and avatars are hidden.
- The collapsed choice is a group named by the label.
- The error is linked by `aria-describedby`. Loading carries hidden "Searching…" text. No live regions.

## Motion

| Interaction | Motion | Token |
|---|---|---|
| Loading | The spinner turns, linear | `--duration-ambient` |

## Example

```tsx
import { SearchInput } from '@collabrium/ui';

<SearchInput label="Search" onValueChange={setSearch} />

<SearchInput
  variant="user"
  label="Search for a person"
  query={query}
  onQueryChange={setQuery}
  results={results}
  loading={loading}
  onSelectedChange={setOwner}
/>
```

## Replaces
- `.c-search-input`, `.c-search-input-box` (`.is-active`, `.is-disabled`, `.is-error`), `.c-search-input-icon`, `.c-search-input-error`, `.c-search-input-clear`
- `.c-search-input-dropdown`, `.c-search-input-row`, `.c-search-input-empty`, `.c-search-input-loading`, `.c-search-input-spinner` (and `@keyframes c-search-input-spin`)
- `.c-search-input-avatar`, `.c-search-input-text`, `.c-search-input-title`, `.c-search-input-subtitle`, `.c-search-input-collapsed` (`.is-disabled`)
- The gallery's `.js-search-clear` script
