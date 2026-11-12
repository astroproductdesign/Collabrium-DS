# TimePicker

## Purpose
A field you type a time into, or pick one from a list of times at a set step.
One time, or a range: a start and an end under one label, the end's list
showing each duration.

⚠️ Designed from scratch: the DLS has no Time picker. Added at the user's
request (2026-11-12) in the library first; the DLS is owed it. Built from
shipped parts: Date picker's field (Input field's box with a leading Fill
icon) and Dropdown's panel and rows.

## Use when
- Someone sets a time of day: a meeting, a call, a shift, a deadline's hour.
- With a Date picker beside it, for a date and a time.

## Don't use when
- **A duration** ("2 hours"): Quantity selector or a number field.
- **A date**: Date picker.

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `label` | ReactNode | required | Names the field (the range's group). |
| `mode` | `'single' \| 'range'` | `'single'` | One time, or a start and an end. |
| `value` / `defaultValue` | `'HH:mm'` \| `{ start, end }` \| `null` | — | Always 24-hour `HH:mm`. |
| `onValueChange` | `(value) => void` | — | A picked or typed time (`null` when cleared); a range on every change (`end` empty until picked). |
| `step` | `5 \| 10 \| 15 \| 20 \| 30 \| 60` | `30` | Minutes between listed times. |
| `min` / `max` | `'HH:mm'` | `'00:00'` / `'23:59'` | The earliest and latest time. |
| `hourCycle` | `12 \| 24` | `12` | "9:30 AM" or "09:30". |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Input field's heights. |
| `placeholder` | string | "Select time" ("Start", "End") | Shown while empty. |
| `helper`, `error`, `required`, `disabled`, `hideLabel` | — | — | Input field's. |
| `name` | string | — | Hidden inputs carry `HH:mm` (`name`; a range `name-start`, `name-end`). |

Also exported: `formatTime(value, hourCycle)` and `parseTime(text)`.

## Rules
1. **Type or pick.** Opening shows the times at the step, centred on the
   chosen time (or the time nearest now). Typing jumps the list to the
   matching time. Enter picks the highlighted time, or keeps what was typed.
2. **What can be typed:** "9", "930", "9:30", "9.30", "2:15pm", "2p",
   "14:15", "12am". Without AM or PM the hour is read on the 24-hour clock
   ("9" is 9:00 AM, "15" is 3:00 PM). A typed time off the step is kept; one
   that isn't a time, or is outside min / max, puts the field back.
3. **The value is `HH:mm`**, whatever the clock shown. 12-hour by default, as
   times are written here; `hourCycle={24}` for scheduling tools.
4. **Range:** the end's list starts one step after the start and shows each
   option's duration ("1 hr 30 min"). Moving the start keeps the duration
   (inside max); an end at or before the start is cleared.
5. **The list:** Dropdown's panel, 8px under the field (above when there is
   more room), as wide as its longest row and never narrower than the field
   or 200px, about six and a half rows tall so it shows it scrolls. The chosen time is checked; hover and the keyboard's row fill
   Neutral-2.
6. **Open** holds the field's 2px Obsidian border, as Date picker's.

## Accessibility
- The field is a combobox (`aria-expanded`, `aria-controls`,
  `aria-autocomplete="list"`, `aria-activedescendant`); the list is a listbox,
  the chosen time `aria-selected`. Focus stays in the field.
- ↓ / ↑ open the list and move; Home / End jump; Enter picks; Escape closes
  and puts the field back; Tab keeps a valid typed time.
- A range is a group named by the label; its fields read "Start time" and
  "End time".
- Error, helper, required and disabled are Input field's. No live regions.

## Motion
None: the list appears and goes at once, as Date picker's and Dropdown's.

## Example

```tsx
import { TimePicker } from '@collabrium/ui';

<TimePicker label="Start time" value={time} onValueChange={setTime} />

<TimePicker mode="range" label="Meeting" step={15} min="08:00" max="20:00"
  value={slot} onValueChange={setSlot} />
```

## Replaces
- Nothing: the DLS has no Time picker.
