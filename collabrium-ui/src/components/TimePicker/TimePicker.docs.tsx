// Documentation for Time picker, rendered by the docs site (playground).
// Keep it consistent with TimePicker.usage.md. Not part of the package build.
import { useState } from 'react';
import { TimePicker, formatTime, type TimeRange } from './TimePicker';
import { DatePicker } from '../DatePicker';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../docs.types';

export const title = 'Time picker';

export const description =
  'A field you type a time into, or pick one from a list of times at a set step. One time, or a range: a start and an end under one label, the end\'s list showing each duration. 12-hour by default. ⚠️ Designed from scratch: the DLS has no Time picker yet.';

export const usage = `import { TimePicker } from '@collabrium/ui';

<TimePicker label="Start time" value={time} onValueChange={setTime} />

<TimePicker mode="range" label="Meeting" min="08:00" max="20:00"
  value={slot} onValueChange={setSlot} />`;

function Single() {
  const [time, setTime] = useState<string | null>('09:30');
  return (
    <div className="docs-stack docs-field">
      <TimePicker label="Start time" value={time} onValueChange={setTime} helper={time ? `Value: ${time}` : 'No time chosen'} />
    </div>
  );
}

function Range() {
  const [slot, setSlot] = useState<TimeRange | null>({ start: '09:30', end: '11:00' });
  return (
    <div className="docs-stack docs-timepicker-range">
      <TimePicker
        mode="range"
        label="Meeting"
        min="08:00"
        max="20:00"
        value={slot}
        onValueChange={setSlot}
        helper={slot?.start && slot.end ? `${formatTime(slot.start)} – ${formatTime(slot.end)}` : 'Pick a start, then an end'}
      />
    </div>
  );
}

function WithDate() {
  return (
    <div className="docs-row docs-timepicker-pair">
      <div className="docs-field">
        <DatePicker label="Date" defaultValue="2026-11-20" />
      </div>
      <div className="docs-field">
        <TimePicker label="Time" defaultValue="14:00" />
      </div>
    </div>
  );
}

export const thumbnail = () => (
  <div className="docs-stack docs-field">
    <TimePicker label="Start time" defaultValue="09:30" />
  </div>
);

export const anatomy: DocsAnatomyNode[] = [
  {
    name: 'Time picker',
    element: '.cui-input-field.cui-timepicker',
    description: "Input field's label, box, helper and error, as Date picker's.",
    children: [
      { name: 'Field', element: '.cui-input-field__wrap > input[role="combobox"]', description: 'A text box with a leading Clock (Fill). Type a time, or open the list with a click or ↓.' },
      { name: 'List', element: '.cui-dropdown__panel > ul[role="listbox"]', description: "Dropdown's panel and rows: the times at the step, the chosen one checked; 8px under the field, above it when there's more room there." },
      { name: 'Range', element: '.cui-timepicker__range[role="group"]', description: 'Two fields and an en dash under one label. The end\'s rows show the duration from the start.', when: 'mode="range"' },
    ],
  },
];

export const examples: DocsExample[] = [
  {
    id: 'single',
    title: 'One time',
    description: 'Click or press ↓ to open the list at the chosen time; ↑ ↓ move, Enter picks. Or type any time, on the list or not: "9", "930", "12:03pm", "14:15". A typed time stays when it is a real time inside the limits; anything else goes back.',
    render: () => <Single />,
    code: `<TimePicker label="Start time" value={time} onValueChange={setTime} />`,
  },
  {
    id: 'range',
    title: 'Range',
    description: 'A start and an end, every 15 minutes between 8:00 AM and 8:00 PM. The end\'s list starts after the start and shows how long each option runs. Moving the start keeps the duration.',
    render: () => <Range />,
    code: `<TimePicker mode="range" label="Meeting" min="08:00" max="20:00"
  value={slot} onValueChange={setSlot} />`,
  },
  {
    id: '24h',
    title: '24-hour clock',
    description: 'For scheduling tools where times are read on the 24-hour clock.',
    render: () => (
      <div className="docs-stack docs-field">
        <TimePicker label="Departure" hourCycle={24} defaultValue="21:30" />
      </div>
    ),
    code: `<TimePicker label="Departure" hourCycle={24} defaultValue="21:30" />`,
  },
  {
    id: 'with-date',
    title: 'Beside a Date picker',
    description: 'The two share Input field\'s box, so a date and a time sit side by side at the same height.',
    render: () => <WithDate />,
    code: `<DatePicker label="Date" />
<TimePicker label="Time" />`,
  },
  {
    id: 'states',
    title: 'Sizes and states',
    description: 'Input field\'s three heights, an error (bold Red) and disabled.',
    render: () => (
      <div className="docs-stack docs-field">
        <TimePicker label="Small" size="sm" defaultValue="08:00" />
        <TimePicker label="Large" size="lg" defaultValue="08:00" />
        <TimePicker label="Call time" required error="Choose a time after 9:00 AM" />
        <TimePicker label="Locked" disabled defaultValue="10:00" />
      </div>
    ),
    code: `<TimePicker label="Small" size="sm" />
<TimePicker label="Large" size="lg" />
<TimePicker label="Call time" required error="Choose a time after 9:00 AM" />
<TimePicker label="Locked" disabled defaultValue="10:00" />`,
  },
];

export const props: DocsProp[] = [
  { name: 'label', options: 'ReactNode', default: '—', required: true, description: 'Names the field (the range\'s group).' },
  { name: 'mode', options: "'single' | 'range'", default: "'single'", description: 'One time, or a start and an end.' },
  { name: 'value / defaultValue', options: "'HH:mm' | { start, end } | null", default: '—', description: 'Always 24-hour `HH:mm`, whatever the clock shown.' },
  { name: 'onValueChange', options: '(value) => void', default: '—', description: 'A picked or typed time (`null` when cleared); a range on every change.' },
  { name: 'step', options: '5 | 10 | 15 | 20 | 30 | 60', default: '15', description: 'Minutes between the listed times. Typed times off the step (12:03 PM) are kept.' },
  { name: 'min / max', options: "'HH:mm'", default: "'00:00' / '23:59'", description: 'The earliest and latest time.' },
  { name: 'hourCycle', options: '12 | 24', default: '12', description: '"9:30 AM" or "09:30".' },
  { name: 'size', options: "'sm' | 'md' | 'lg'", default: "'md'", description: "Input field's heights." },
  { name: 'placeholder', options: 'string', default: '"Select time" (range: "Start", "End")', description: 'Shown while empty.' },
  { name: 'helper / error / required / disabled', options: '—', default: '—', description: "Input field's." },
  { name: 'name', options: 'string', default: '—', description: 'Hidden inputs carry `HH:mm` (`name`; a range `name-start`, `name-end`).' },
];

export const rules: DocsRules = {
  do: [
    'Keep the 15-minute default for most bookings; use 30 for long meetings, 60 for shifts. People can still type an exact time.',
    'Set min and max to the hours that make sense (opening hours, a working day).',
    'Store and send `HH:mm`; show the clock your readers use (12-hour by default).',
    'Pair it with a Date picker for a date and a time: they share the field.',
  ],
  dont: [
    "Don't use it for a duration (\"2 hours\"): use Quantity selector or a number field.",
    "Don't use two single pickers for a range: use `mode=\"range\"`, so the end follows the start.",
  ],
};

export const accessibility: DocsAccessibility = {
  keyboard: [
    { keys: '↓ / ↑', action: 'Opens the list; then moves through the times.' },
    { keys: 'Home / End', action: 'The first or last time in the list.' },
    { keys: 'Enter', action: 'Picks the highlighted time, or keeps what was typed.' },
    { keys: 'Escape', action: 'Closes the list and puts the field back as it was.' },
    { keys: 'Tab', action: 'Keeps a valid typed time and moves on.' },
  ],
  notes: [
    'The field is a combobox (`aria-expanded`, `aria-controls`, `aria-activedescendant`); the list is a listbox with the chosen time `aria-selected`. Focus stays in the field.',
    'A range is a group named by the label; its fields read "Start time" and "End time".',
    "Error, helper, required and disabled are Input field's.",
    'No live regions.',
  ],
};

export const motion: DocsMotion[] | string =
  'None: the list appears and goes at once, as Date picker\'s and Dropdown\'s.';
