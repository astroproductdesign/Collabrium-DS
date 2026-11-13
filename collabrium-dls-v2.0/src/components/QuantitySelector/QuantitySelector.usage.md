# Quantity selector

## Purpose
A number field with **−** and **+** buttons for whole-number quantities the
user sets: ad spots on a package line, flight weeks, screens, and big
numbers such as impressions or an RM budget. Type the number, press the
buttons (press and hold to repeat) or use the arrow keys. Its box is Input
field's; the buttons are Button ghost icon-only sm. Not the Stepper (step
progress).

⚠️ Designed, not transcribed, in the DLS (from the Collab:Sales package builder): a first pass needing design review.

## Use when
- The user sets a count or amount inside a known range and nudging by a step helps.
- A big number (impressions, a budget) where typing is the main input: `typeOnly`, or `shorthand` for budgets.

## Don't use when
- **A free number with no range.** Use Input field.
- **Choosing among a few named options.** Use Segmented Control or Radio.
- **A position on a continuous scale.** Use Slider.
- **Decimals.** Whole numbers only.

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `label` | ReactNode | **required** | Names the field. |
| `hideLabel` | boolean | `false` | Hidden visually (rows, table cells); still read out. |
| `value`, `defaultValue` | number | `min`, or 0 | The value. |
| `onValueChange` | `(value, { previous, source }) => void` | — | Each new valid value; `source` is `button`, `hold`, `key`, `type`, `enter` or `blur`. |
| `onInvalid` | `({ reason, raw }) => void` | — | A typed value was refused (`empty`, `nan`, `whole`, `min`, `max`). |
| `min`, `max` | number | none | The range. |
| `step` | number | `1` | − / + and ↑ ↓. |
| `bigStep` | number | 10 × `step` | PageUp / PageDown. |
| `unit` | `{ one, other? }` | — | A unit after the number. |
| `prefix` | string | — | A currency before the number. |
| `shorthand` | boolean | `false` | Accept "250k" / "1.2m". |
| `size` | `'default'` \| `'compact'` | `'default'` | 40px, or 32px with 24px buttons for rows. |
| `typeOnly` | boolean | `false` | No buttons. |
| `reserveDigits` | number | from `max` | Pin the width (digits). |
| `helper` | ReactNode | — | Usually the range ("1–50 spots"). |
| `error` | ReactNode | — | An error of the page's own; the selector's own messages need no prop. |
| `disabled` | boolean | `false` | Input field's disabled look. |
| `readOnly`, `readOnlyReason` | `true`, string | — | Locked: a lock, buttons that never step, the reason read out. The reason is required. |
| `decreaseLabel`, `increaseLabel` | string | "Fewer spots" / "More spots" (or "Decrease" / "Increase" + label) | The buttons' names. |
| `messages` | `Partial<Record<reason, string>>` | — | Replace any refusal message. |
| `name` | string | — | A hidden input posts the number, no commas. |

The ref goes to the number input. `style` and `className` are not accepted. These props replace the DLS's script (`init`, `get` / `set` and its two events) (decided 2026-11-06).

## Rules
1. **The box is Input field's**: 40px (compact 32px), `radius-sm`, 1px Neutral-3, Neutral-1, no hover of its own. Focus is the 2px Obsidian border on plain `:focus` (Input field's exception to the Water ring), the inset 1px smaller so nothing moves. **Error is Input field's 1px Red** with the bold Red message, so every error looks the same (decided 2026-11-06; the DLS drew 2px). Focus wins over error.
2. **It always hugs its content and never changes width**: it reserves the width of the formatted `max` (at least 2 digits; 6 with no max); the number is only as wide as its text, and the unused width is padding around the value group (centred with buttons, at the start for type-only). So the buttons never move and "RM" never drifts from the digits. Typing may run 4 digits past the reserve.
3. **Buttons:** Button ghost icon-only sm (32px; compact 24px with `--radius-xs` corners, decided 2026-11-06) with Minus / Plus at `icon-sm` (compact `icon-micro`), 3px from the edge. Hover Neutral-2; **pressed Neutral-3, held for a whole press-and-hold**, darker than Button's ghost pressed so a hold visibly keeps running (decided 2026-11-06). At a limit that button is `aria-disabled`: a Neutral-4 icon, no hover.
4. **Value group:** [lock] [prefix] number [unit], 4px apart. The number is body2, tabular figures; prefix and unit caption Neutral-5. The longer unit form's width is kept, so "1 spot" ↔ "2 spots" never moves +. A press anywhere in the group focuses the number.
5. **Typing is free and checked on Enter or leaving the field**, never per keystroke. "1250000", "1,250,000", "1 250 000" and a pasted "RM 25,000" all work. Formatted with comma thousands on commit, step and load, never while typing.
6. **A refused value shows an error and is never silently clamped**: "Enter a number of spots." · "Use digits only, like 10." · "Use a whole number." · "The minimum is 1 spot." · "The maximum is 50 spots." What was typed stays and focus doesn't move. Escape restores the last good value. A step drops a refused value and steps from the last good one.
7. **Between steps:** a typed 75 with step 50 is kept; the next step snaps to the grid in that direction (↑ 100, ↓ 50).
8. **Press and hold:** one step, then after 400ms one every 100ms (script timers, kept as the DLS's; decided 2026-11-06); it stops on release, on dragging off, at the limit and when the window loses focus. No acceleration: PageUp / PageDown is for big jumps.
9. **Shorthand** is off by default; turn it on only where people already type this way (budgets) and say so in the helper. The keyboard switches from numbers to text.
10. **Read-only:** white box, Neutral-3 border, Neutral-9 value, focusable and selectable; − and + stay but never step; a lock leads the value. Always give the reason. Type-only read-only shows the lock alone.
11. **Disabled:** Neutral-2 fill, Neutral-5 text, Neutral-4 icons, no lock.
12. **Compact** is for table and list rows: hide the label and add the row's name to the buttons ("More spots, Astro Ria prime time").

## Accessibility
- A text input with `role="spinbutton"` (not `type="number"`), `aria-valuemin` / `max` / `now`, and `aria-valuetext` with the unit ("10 spots", "RM 25,000"). While refused, `aria-valuenow` is removed and `aria-valuetext` is what was typed; `aria-invalid` is set and the error describes it.
- One tab stop: the buttons are out of the tab order; ↑ ↓, PageUp / PageDown and Home / End do what they do. Tab commits and moves on.
- Escape undoes typing; with nothing to undo it isn't handled, so a Modal around it still closes. Enter blocks a form submit only while the value is refused.
- The buttons use `aria-disabled` (not `disabled`) at a limit, so they stay readable and a hold isn't cut off. A screen reader's activation steps once.
- No live region: the arrow keys announce the new value; a button press doesn't.
- Coarse pointers: each button's target is 44 × 44 (a transparent `::after`), its painted size unchanged; compact widens the value padding so the lift doesn't cover the digits.
- Forced colours: CanvasText border, Highlight focus, GrayText for disabled parts, limit buttons and the lock; pressed adds a Highlight outline.

## Motion

| Interaction | Motion | Token |
|---|---|---|
| Hover, press | Button ghost's fill; pressed is instant | `--duration-fast` · `--duration-instant` |

## Example

```tsx
import { QuantitySelector } from '@collabrium/ui';

<QuantitySelector
  label="Spots"
  unit={{ one: 'spot', other: 'spots' }}
  min={1}
  max={50}
  defaultValue={10}
  helper="1–50 spots"
  onValueChange={setSpots}
/>
```

## Replaces
- `.c-quantity-selector-field` (`.is-error`), `.c-quantity-selector-label`, the field's `.c-helper` and `.c-quantity-selector-error`
- `.c-quantity-selector` (`.is-compact`, `.is-type-only`, `.is-error`, `.is-disabled`, `.is-readonly`) and `-value`, `-lock`, `-prefix`, `-input`, `-unit`, `-measure`, `-btn` (`.is-holding`)
- The `CQuantitySelector` script (`init`, `get` / `set`, the `c-quantity-selector-change` and `-invalid` events)
