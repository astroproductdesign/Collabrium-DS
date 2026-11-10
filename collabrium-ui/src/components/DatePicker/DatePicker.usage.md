# Date picker

## Purpose
A field that opens a month calendar. **Single** (the default): pick one
day and it closes. **Range**: pick a start and an end, then Apply. The
trigger is Input field's box with a leading calendar.

⚠️ Designed from scratch in the DLS (no source in the brand deck or the teammate's build): a first pass needing design review. Its behaviour (keyboard, range picking, placement) is not specified there and is built here.

## Use when
- Someone picks a day, or a span of days: a launch date, a flight, a report period, a date of birth (the year grid gets there in a few presses).

## Don't use when
- **A time of day.** There is no time picker yet.
- **Filtering a table by a preset period** ("Last 7 days"). Use Dropdown.

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `label` | ReactNode | **required** | Names the field; `hideLabel` hides it visually. |
| `mode` | `'single'` \| `'range'` | `'single'` | One date, or a start and an end with Cancel / Apply. |
| `value`, `defaultValue`, `onValueChange` | `"YYYY-MM-DD"` (single), `{ start, end }` (range) | — | The chosen date or range; a range is reported on Apply. Dates are plain calendar dates, no time zone. |
| `placeholder` | string | `"Select date"` / `"Select dates"` | Shown while nothing is chosen. |
| `size` | `'sm'` \| `'md'` \| `'lg'` | `'md'` | Input field's heights: 32, 40, 48px. |
| `min`, `max`, `isDateDisabled` | `"YYYY-MM-DD"`, `(date) => boolean` | — | Days that can't be picked. `min` and `max` also bound the year grid (otherwise 100 years back to 20 ahead). |
| `weekStartsOn` | `1` \| `0` | `1` | Monday (the default) or Sunday first. |
| `helper`, `error`, `required`, `disabled` | — | — | Input field's. |
| `applyLabel`, `cancelLabel` | string | `"Apply"`, `"Cancel"` | The range footer. |
| `name` | string | — | Hidden form inputs: `name`, or `name-start` and `name-end`. |

The ref goes to the trigger `<button>`. `style` and `className` are not accepted.

## Rules
1. **Trigger:** Input field's box (sm 32 / md 40 / lg 48px, `radius-sm`, 1px Neutral-3, Neutral-1), its label, helper and error; a leading Calendar (Fill, Tier 2, as the DS keeps it, 16px, Neutral-5); the date in body1 500, day first ("12 Jul 2026"; a range "12 – 24 Jul 2026", "28 Jul – 3 Aug 2026", "28 Dec 2025 – 3 Jan 2026"), as the DS writes dates elsewhere (decided 2026-11-10), or the placeholder in Neutral-5. Hover Neutral-2; focus and open a 2px Obsidian border.
2. **Calendar panel:** 280px, `radius-md`, 1px Neutral-3, `shadow-3`, 16px in, 8px under the trigger, above it when there's more room there, kept inside the window. It floats over the page, so no card clips it.
3. **Month header:** previous and next month (Button ghost sm, icon-only, Caret Regular) around the month and the year (h5), 12px above the grid.
4. **Month and year grids** (designed here, not in the DS; decided 2026-11-10): the month and the year are plain text you can press (32px, `radius-sm`, hover Neutral-2, Neutral-2 while open), with no caret: they aren't dropdowns (decided 2026-11-10). The month opens a 3 × 4 grid of months; the year a scrolling 4-column grid of years, newest first (decided 2026-11-10), from `max`'s year (or 20 ahead) down to `min`'s (or 100 years back), on the shown year. A year leads to its months, a month to its days. Cells are 40px, with the day's looks: the shown one Obsidian, the current one outlined, out-of-range ones Neutral-4. In the month grid the arrows step a year; in the year grid they step aside. The grids keep the days' height, so the calendar never changes size. So a birthday decades back is three presses, not hundreds of pages.
5. **Weekdays:** Monday first (decided 2026-11-10; `weekStartsOn={0}` for Sunday), one letter, caption bold uppercase Neutral-5, 4px above the days; read in full by screen readers.
6. **Days:** square (about 34px in the 280px panel, decided 2026-11-10), `radius-sm`, body2, 2px apart, six weeks always so the arrows never move (decided 2026-11-10). Hover Neutral-2. **Today:** a 1px Obsidian outline, never filled, and no hover fill. **Chosen:** Obsidian with white text. **Range:** one Neutral-2 band between the ends, the 2px gaps filled within each week (decided 2026-11-10), square inner corners; the ends Obsidian, rounded on the outside. **Unavailable** (`min`, `max`, `isDateDisabled`) **and outside the month:** Neutral-4, not-allowed, no hover.
7. **Single:** a pick sets the date and closes.
8. **Range:** the first pick is the start, the second the end (an earlier day starts again). Apply (Primary, off until both are picked) sets it and closes; Cancel (Secondary), Escape or a click outside keeps the old range. The footer has a 1px Neutral-3 line and 16px above it, as Modal's.
9. **Never fill a day on hover:** the Obsidian fill is only for chosen days and range ends.

## Accessibility
- The trigger is a `<button>` with `aria-haspopup="dialog"` and `aria-expanded`, named by the label and the date it shows; `aria-invalid` and `aria-describedby` for an error or helper.
- Opening moves focus to the chosen day (or today), and opening the month or year grid moves it to the shown month or year, so the calendar can be used from the keyboard (decided 2026-11-10).
- The calendar is a `dialog` with a `grid` named by the month. Each day is named in full ("Sunday, 12 July 2026"); today is `aria-current="date"`; chosen days `aria-selected`; unavailable days `aria-disabled`.
- Keyboard: ← → a day, ↑ ↓ a week, Home / End the week's ends, PageUp / PageDown a month, Shift + PageUp / PageDown a year, Enter or Space picks; Escape closes and returns focus to the trigger. Moving off the month turns the page. In the month and year grids: arrows move (in the years, newest first, right and down go back in time), PageUp / PageDown jump 16 years up or down the grid, Home / End the newest and oldest year, Enter or Space picks, Escape goes back to the days.
- The month and year buttons are named "Choose month, July" and "Choose year, 2026", and are pressed while their grid shows.
- Forced colours: chosen days and range ends Highlight; the range between outlined in Highlight; unavailable days GrayText.

## Motion

| Interaction | Motion | Token |
|---|---|---|
| Open / close | None: the calendar appears and goes at once | — |
| Month / year button | Neutral-2 fill on hover | `--duration-fast` · `--ease-standard` |
| Month change, grid switch | None | — |
| Reduced motion | The fill changes at once | — |

## Example

```tsx
import { DatePicker, type DateRange } from '@collabrium/ui';

const [date, setDate] = useState<string | null>(null);
<DatePicker label="Launch date" value={date} onValueChange={setDate} />

const [range, setRange] = useState<DateRange | null>(null);
<DatePicker mode="range" label="Flight dates" value={range} onValueChange={setRange} />
```

## Replaces
- `.c-dp-trigger`, `.c-dp-panel`, `.c-dp-header`, `.c-dp-grid`, `.c-dp-weekday`, `.c-dp-day` (`.today`, `.selected`, `.range`, `.range-start`, `.range-end`, `.disabled`)
- The gallery's day-select script
