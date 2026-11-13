// Documentation for Date picker, rendered by the docs site (playground).
// Keep it consistent with DatePicker.usage.md. Not part of the package build.
import { useState } from 'react';
import { DatePicker, type DateRange } from './DatePicker';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../docs.types';

export const title = 'Date picker';

export const description =
  'A field that opens a month calendar: pick one date, or a start and an end with Cancel and Apply. The trigger is Input field\'s box with a calendar icon.';

export const usage = `import { DatePicker } from '@collabrium/ui';

const [date, setDate] = useState<string | null>(null);

<DatePicker label="Launch date" value={date} onValueChange={setDate} />`;

export const thumbnail = () => <DatePicker label="Launch date" hideLabel defaultValue="2026-07-12" />;

function SingleExample() {
  const [date, setDate] = useState<string | null>('2026-07-12');
  return (
    <div className="docs-field">
      <DatePicker label="Launch date" value={date} onValueChange={setDate} />
    </div>
  );
}

function BirthdayExample() {
  const [date, setDate] = useState<string | null>(null);
  return (
    <div className="docs-field">
      <DatePicker label="Date of birth" value={date} onValueChange={setDate} max={new Date().toISOString().slice(0, 10)} />
    </div>
  );
}

function RangeExample() {
  const [range, setRange] = useState<DateRange | null>({ start: '2026-07-12', end: '2026-07-24' });
  return (
    <div className="docs-field">
      <DatePicker mode="range" label="Flight dates" value={range} onValueChange={setRange} />
    </div>
  );
}

export const anatomy: DocsAnatomyNode[] = [
  {
    name: 'Date picker',
    element: '.cui-input-field.cui-datepicker',
    description: 'Input field\'s label, box, helper and error.',
    children: [
      { name: 'Trigger', element: 'button.cui-datepicker__trigger', description: 'Input field\'s box (32 / 40 / 48px), a leading Calendar (Fill, 16px, Neutral-5), the date in body1 500 or the placeholder in Neutral-5. Hover Neutral-2; open and focus a 2px Obsidian border.' },
      {
        name: 'Calendar',
        element: '.cui-datepicker__panel',
        description: '280px, radius-md, 1px Neutral-3, shadow-3, 16px in; 8px under the trigger (above when there\'s no room).',
        children: [
          { name: 'Month header', element: '.cui-datepicker__header', description: 'Previous and next month (Button ghost sm, icon-only) around the month and the year (h5): plain text you can press to open its grid, no caret.' },
          { name: 'Month / year grid', element: '.cui-datepicker__body[data-pane]', when: 'month or year pressed', description: 'A 3 × 4 grid of months, or a scrolling 4-column grid of years, newest first; 40px cells with the day\'s looks, at the days\' height.' },
          { name: 'Weekdays', element: 'th.cui-datepicker__weekday', description: 'Caption, bold, uppercase, Neutral-5, 4px above the days.' },
          { name: 'Day', element: 'td.cui-datepicker__cell', description: 'Square, radius-sm, body2. Hover Neutral-2; today a 1px Obsidian outline; selected Obsidian with white text; a range Neutral-2 between Obsidian ends; disabled and outside the month Neutral-4.' },
          { name: 'Footer', element: '.cui-datepicker__footer', when: 'range', description: 'Cancel (Secondary) and Apply (Primary), right-aligned, a 1px Neutral-3 line and 16px above.' },
        ],
      },
    ],
  },
];

export const examples: DocsExample[] = [
  {
    id: 'single',
    title: 'One date',
    description: 'Open it, pick a day: the date is set ("12 Jul 2026") and the calendar closes. Today has an outline; the chosen day is filled. Weeks start on Monday.',
    render: () => <SingleExample />,
    code: `const [date, setDate] = useState<string | null>('2026-07-12');

<DatePicker label="Launch date" value={date} onValueChange={setDate} />`,
  },
  {
    id: 'range',
    title: 'A range',
    description: 'Pick the start, then the end (an earlier day starts again), then Apply. Cancel, Escape or a click outside keeps the old range.',
    render: () => <RangeExample />,
    code: `const [range, setRange] = useState<DateRange | null>({ start: '2026-07-12', end: '2026-07-24' });

<DatePicker mode="range" label="Flight dates" value={range} onValueChange={setRange} />`,
  },
  {
    id: 'birthday',
    title: 'A date years away',
    description: 'Press the year to choose from a grid of years (newest first), then a month, then the day: a birthday is three presses, not decades of paging. The month on its own opens the months. `max` stops at today.',
    render: () => <BirthdayExample />,
    code: `<DatePicker label="Date of birth" value={date} onValueChange={setDate} max={today} />`,
  },
  {
    id: 'limits',
    title: 'Dates that can\'t be picked',
    description: '`min`, `max` and `isDateDisabled` grey days out (Neutral-4, not-allowed). Here: from today, weekdays only.',
    render: () => (
      <div className="docs-field">
        <DatePicker
          label="Call back on"
          helper="Weekdays only"
          min={new Date().toISOString().slice(0, 10)}
          isDateDisabled={(d) => [0, 6].includes(new Date(`${d}T12:00`).getDay())}
        />
      </div>
    ),
    code: `<DatePicker
  label="Call back on"
  helper="Weekdays only"
  min={today}
  isDateDisabled={(d) => [0, 6].includes(new Date(\`\${d}T12:00\`).getDay())}
/>`,
  },
  {
    id: 'states',
    title: 'Sizes and states',
    description: 'Input field\'s three heights, the error and the disabled field.',
    render: () => (
      <div className="docs-stack docs-field">
        <DatePicker label="Small" size="sm" defaultValue="2026-07-12" />
        <DatePicker label="Large" size="lg" defaultValue="2026-07-12" />
        <DatePicker label="Start date" required error="Choose a start date" />
        <DatePicker label="Disabled" disabled defaultValue="2026-07-12" />
      </div>
    ),
    code: `<DatePicker label="Small" size="sm" defaultValue="2026-07-12" />
<DatePicker label="Large" size="lg" defaultValue="2026-07-12" />
<DatePicker label="Start date" required error="Choose a start date" />
<DatePicker label="Disabled" disabled defaultValue="2026-07-12" />`,
  },
];

export const props: DocsProp[] = [
  { name: 'label', options: 'ReactNode', default: 'required', description: 'Names the field; `hideLabel` hides it visually.' },
  { name: 'mode', options: '"single" | "range"', default: '"single"', description: 'One date, or a start and an end with Cancel / Apply.' },
  { name: 'value / defaultValue / onValueChange', options: '"YYYY-MM-DD" (single) · { start, end } (range)', default: '—', description: 'The chosen date or range. A range is reported on Apply.' },
  { name: 'placeholder', options: 'string', default: '"Select date" / "Select dates"', description: 'Shown while nothing is chosen.' },
  { name: 'size', options: '"sm" | "md" | "lg"', default: '"md"', description: 'Input field\'s heights: 32, 40, 48px.' },
  { name: 'min / max / isDateDisabled', options: '"YYYY-MM-DD" · (date) => boolean', default: '—', description: 'Days that can\'t be picked. `min` and `max` also bound the year grid (otherwise 100 years back to 20 ahead).' },
  { name: 'weekStartsOn', options: '1 | 0', default: '1', description: 'Monday (default) or Sunday first.' },
  { name: 'helper / error / required / disabled', options: '—', default: '—', description: 'Input field\'s.' },
  { name: 'applyLabel / cancelLabel', options: 'string', default: '"Apply" / "Cancel"', description: 'Range footer labels.' },
  { name: 'name', options: 'string', default: '—', description: 'Hidden form inputs (`name`, or `name-start` and `name-end`).' },
];

export const rules: DocsRules = {
  do: [
    'Mark today with the outline only, so it never looks chosen.',
    'Use a range for "from … to" questions, so both ends are picked in one place.',
    'Grey out days that can\'t be picked, rather than refusing a pick after the fact.',
  ],
  dont: [
    'Don\'t fill a day on hover: the Obsidian fill is only for chosen days and range ends.',
    'Don\'t use it for a time of day.',
  ],
};

export const accessibility: DocsAccessibility = {
  keyboard: 'Enter, Space or ↓ on the trigger opens the calendar on the chosen day (or today). In the grid: ← → a day, ↑ ↓ a week, Home / End the week\'s ends, PageUp / PageDown a month, Shift + PageUp / PageDown a year; Enter or Space picks. Tab moves to the arrows, the month and year buttons and the footer; Escape closes and returns to the trigger. In the month and year grids: arrows move (years run newest first), PageUp / PageDown jump 16 years, Enter picks, Escape goes back to the days.',
  notes: [
    'The trigger is a button with `aria-haspopup="dialog"`, named by the label and the date it shows.',
    'The calendar is a dialog holding a `grid` named by the month; each day is named in full ("Sunday, 12 July 2026"); today is `aria-current="date"`, chosen days `aria-selected`, unavailable days `aria-disabled`.',
    'Weekday headers read in full ("Monday"), shown as one letter.',
    'The month and year buttons are "Choose month, July" and "Choose year, 2026", pressed while their grid shows.',
  ],
};

export const motion: DocsMotion[] = [
  { interaction: 'Open / close', motion: 'None: the calendar appears and goes at once (the DS gives none).', token: '—' },
  { interaction: 'Month / year button', motion: 'Neutral-2 on hover.', token: '--duration-fast · --ease-standard' },
  { interaction: 'Month change, grid switch', motion: 'None: the days change at once.', token: '—' },
  { interaction: 'Reduced motion', motion: 'The fill changes at once.', token: '—' },
];
