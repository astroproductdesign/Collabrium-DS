# Dropdown

## Purpose
Pick options from a list. A trigger on Input field's own box shows the
value (or a Neutral-5 placeholder) and opens a panel of options.
**Single select** (the default) picks one and closes on pick. **Multiple
select** (`multiple`) ticks any number in checkbox rows and stays open,
with an optional Select all row and a Clear / Done footer. Both: outlined
or borderless, optionally searchable for long lists, with optional groups.

⚠️ Designed, not sourced, in the DLS (it rebuilds the former Select and MultiSelect): a first pass needing design review.

## Use when
- One choice from more than a handful of options, in a form or a toolbar.
- Several choices from a list (brands for a campaign): `multiple`.
- A long list (a forty-department picker): make it `searchable`.

## Don't use when
- **2 to 5 options shown at once are clearer.** Use Radio (or Segmented Control to switch views).
- **2 to 5 options, several can be chosen, all shown at once.** Use Checkbox.
- **Filtering a table by a few values.** Use Filters, which reuses this panel.
- **You're searching people or records that load as you type.** Use Search input (User or Item Search).

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `label` | ReactNode | **required** | Names the field (and the list for screen readers). |
| `hideLabel` | boolean | `false` | Hides the label visually; still read out. |
| `options` | `{ value, label, description?, meta?, icon?, initials?, group?, disabled? }[]` | **required** | The options; `group` lists it under that heading. |
| `multiple` | boolean | `false` | Multiple select: checkbox rows, stays open, a Clear / Done footer. |
| `value`, `defaultValue`, `onValueChange` | `string \| null`; with `multiple`, `string[]` | `null` / `[]` | The chosen value, or values (each tick calls `onValueChange`). |
| `selectAll` | boolean | `false` | Multiple select: a pinned Select all row. |
| `selectAllLabel`, `clearLabel`, `doneLabel` | string | `'Select all'`, `'Clear'`, `'Done'` | Multiple select's labels. |
| `countLabel` | `(count) => string` | `` `${count} selected` `` | Multiple select: the box's value once something is ticked. |
| `placeholder` | string | `'Select…'` | Shown while nothing is chosen ("Select department"). |
| `appearance` | `'outlined'` \| `'borderless'` | `'outlined'` | Borderless (transparent, no border) for toolbars and table headers. |
| `searchable` | boolean | `false` | Type in the box to filter. |
| `loading` | boolean | `false` | The panel shows the spinner. |
| `helper`, `error`, `required`, `disabled` | — | — | Input field's. |
| `readOnly` | boolean | `false` | Shows the value but never opens (mouse or keyboard); the chevron is hidden. |
| `emptyTitle`, `emptyHint` | string | `'Nothing to choose from yet'` | When there are no options. |
| `noResultsTitle`, `noResultsHint` | `(query) => string`, string | `No matches for “query”`, `'Check the spelling or try a shorter term'` | When a search matches nothing. |
| `loadingLabel` | string | `'Loading options…'` | Announced while loading. |
| `name` | string | — | Hidden inputs post the chosen value (one per value with `multiple`). |

The ref goes to the trigger (the `<div>`, or the `<input>` when searchable). `style` and `className` are not accepted.

## Rules
1. **The trigger is Input field's box** (40px, `radius-sm`, 1px Neutral-3, real focus as the 2px Obsidian border): one family with Input field. A trailing CaretDown (16px, Regular, Neutral-5, 12px from the end) turns 180° when open.
2. **Outlined:** hover Neutral-2; filled (a value chosen) Obsidian border. **Borderless:** transparent, no border, hover Neutral-2, and no border when open or filled. Disabled and read-only fields keep the plain border even with a value, as the gallery draws them, so a muted field never looks active. (Decided 2026-11-06.)
3. **Error** is Input field's 1px Red border with the bold Red message, so the two fields stay one family (decided 2026-11-06; the DS drew 2px). **The error wins over filled**: a field in error stays Red once it has a value, in both styles; focus and open still win over it (decided 2026-11-06; the source let filled hide the error).
4. **Disabled** is Input field's (Neutral-2, Neutral-5). **Read-only** shows the value, hides the chevron and can't be opened by mouse or keyboard (`aria-readonly`).
5. **The trigger is a `combobox` element, not a read-only text input**, so a screen reader never announces a working dropdown as "read only". It looks the same. (Decided 2026-11-06.)
6. **The panel** is the popover convention (`radius-md`, 1px Neutral-3, `shadow-3`), exactly the trigger's width. It **floats** 8px below at the menu layer, as Search input's, rather than pushing the page down (decided 2026-11-06); above when it doesn't fit below and there's more room above. A panel that went up stays up until it closes. The list scrolls past 320px (a local value: no token is 320px) with 8px top and bottom. If a card that hides overflow clips the panel, it moves to a portal, as the Tooltip did.
7. **Options:** 8px / 12px padding, body2 400 Neutral-9. Hover **and the keyboard's option**: Neutral-2, so you can see where the arrows are (decided 2026-11-06). Single select's selected option: Neutral-2 plus a Regular check (Obsidian) as the real mark. Disabled: Neutral-4, no hover.
8. **Option slots**, each optional: a leading 20px Regular Neutral-5 icon or a 24px initials avatar; a description (caption, Neutral-5, one line with "…"); a trailing meta (caption, Neutral-5; never a Tag or Badge; no colour dots). With a description, a row is 52px and the media, check, checkbox and meta sit on the label's line (a `--border-width-sm` nudge).
9. **Descriptions go on every option or none**, never wrap, and never carry meaning the label doesn't: two options never share a label.
10. **Empty:** a Neutral-4 icon (Tray; MagnifyingGlass for a search), a body2 bold title and a caption hint. **Loading:** Search input's spinner.
11. **Searchable:** the box becomes a real input; typing filters by label. The first Escape clears the query, the second closes.
12. **Groups** (both variants; decided 2026-11-06): an option's `group` lists it under a heading (caption, bold, uppercase, eyebrow tracking, Neutral-5, 4px / 12px), groups in the order they first appear, with a 1px Neutral-3 divider (8px above and below) between them.

### Multiple select
13. **The box shows "N selected"** (Neutral-9) once something is ticked, the placeholder before.
14. **Each row leads with Checkbox's own box** (18px, `radius-xs`, Obsidian with a check when ticked). A ticked row has **no fill and no trailing check**: the box says it. Hover and the keyboard's row are still Neutral-2.
15. **Picking stays open:** a click, Enter or Space ticks or unticks and the panel stays, so you can keep going. Each tick applies at once.
16. **Footer:** the library's Button, ghost "Clear" and primary "Done", size sm, apart, 12px padding and a 1px Neutral-3 top border, so a button looks the same everywhere (decided 2026-11-06; the source hand-built them at 13px). **Clear** unticks everything and stays open; **Done** only closes (ticks already applied). The footer stays when a search matches nothing (ticked options may be hidden) and is disabled while loading, with Button's own disabled look (decided 2026-11-06; the source faded them to 50%).
17. **Select all** (`selectAll`): a pinned first row, label bold, a divider under it. Ticking it ticks every option, unticking clears them; it shows a minus when some are ticked. It's a checkbox row, never a button, and has no clear of its own (that's Clear's job). **After a search it covers only the matches**, since that's what the person can see (decided 2026-11-06). There is no Select all per group (decided 2026-11-06).
18. **Disabled options never change**: Select all and Clear leave them as they are, since disabled means it can't be changed (decided 2026-11-06). **A disabled option that is ticked keeps its tick**: a Neutral-4 box with the white tick, so a locked choice still reads as chosen (decided 2026-11-06; the source's CSS lost the tick).

## Accessibility
- The trigger is a `combobox` with `aria-expanded`, `aria-controls` and `aria-haspopup="listbox"`, named by the label. The panel is a `listbox` of `option`s with `aria-selected`; disabled options are `aria-disabled`. Multiple select adds `aria-multiselectable`; its checkbox is only the picture (no second checkbox in the accessibility tree), as the DS asks.
- A group is `role="group"` named by its heading (`aria-labelledby`), so the heading isn't read as one more option.
- A partly ticked Select all is read with its count ("Select all, 2 selected"), since an option has no "mixed" state (decided 2026-11-06).
- Focus never leaves the trigger: the keyboard's option is `aria-activedescendant`.
- Keyboard: Space, Enter or ↓ opens on the chosen option (or the first); ↓ ↑ move, skipping disabled options, without wrapping; Home and End jump to the ends (not when searchable); Enter (or Space, not searchable) picks and closes (Multiple select: ticks and stays open); Escape closes without picking; Tab closes, keeping the value, and moves on (Multiple select: Tab moves to Clear, then Done, then out, so the panel is never a trap); typing letters jumps to the first matching option (not searchable; resets after a second).
- An option with a description is read as one name: the label, then the description.
- The empty and loading states are announced through a polite live region, as the DS asks.

## Motion

| Interaction | Motion | Token |
|---|---|---|
| Open / close | The chevron turns 180° | `--duration-fast` · `--ease-standard` |
| Loading | Search input's spinner turns (still under reduced motion) | `--duration-ambient` |

## Example

```tsx
import { Dropdown } from '@collabrium/ui';

<Dropdown
  multiple
  selectAll
  label="Brands"
  placeholder="Select brands"
  options={[
    { value: 'nescafe', label: 'Nescafé', group: 'FMCG' },
    { value: 'milo', label: 'Milo', group: 'FMCG' },
    { value: 'celcom', label: 'Celcom', group: 'Telco' },
  ]}
  onValueChange={setBrands}
/>

<Dropdown
  label="Department"
  placeholder="Select department"
  options={[
    { value: 'marketing', label: 'Marketing' },
    { value: 'data', label: 'Data' },
    { value: 'finance', label: 'Finance' },
  ]}
  onValueChange={setDepartment}
/>
```

## Replaces
- `.c-dropdown-field` (`.style-borderless`, `.open`, `.has-value`, `.read-only`, `.is-searchable`, `.hover`), `.c-dropdown-input`, `.c-dropdown-chevron`
- `.c-dropdown-panel` (`.is-above`), `.c-dropdown-list`
- `.c-dropdown-row` (`.hover`, `.selected`, `.disabled`, `.has-desc`) and `-label`, `-check`, `-media` (`.is-avatar`), `-text`, `-desc`, `-meta`
- `.c-dropdown-empty`, `-empty-title`, `-empty-hint`
- `.c-dropdown-multi-field` (`.style-borderless`, `.open`, `.filled`, `.read-only`, `.is-searchable`, `.hover`), `.c-dropdown-multi-input`, `.c-dropdown-multi-chevron`
- `.c-dropdown-multi-panel` (`.is-above`), `.c-dropdown-multi-list`, `.c-dropdown-multi-group`, `.c-dropdown-multi-divider`, `.c-dropdown-multi-footer` (`.clear`, `.done`)
- `.c-dropdown-option` (`.hover`, `.disabled`, `.select-all`, `.has-desc`) and `-label`, `-media` (`.is-avatar`), `-text`, `-desc`, `-meta`
