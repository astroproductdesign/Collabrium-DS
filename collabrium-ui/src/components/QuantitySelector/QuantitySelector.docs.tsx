// Documentation for Quantity selector, rendered by the docs site (playground).
// Keep it consistent with QuantitySelector.usage.md. Not part of the package build.
import { QuantitySelector } from './QuantitySelector';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../docs.types';

export const title = 'Quantity selector';

export const description =
  'A number field with − and + buttons for whole-number quantities: ad spots on a package line, flight weeks, screens, and big numbers such as impressions or an RM budget. Type it, press (or hold) the buttons, or use the arrow keys.';

export const usage = `import { QuantitySelector } from '@collabrium/ui';

export function SpotsField() {
  return (
    <QuantitySelector
      label="Spots"
      unit={{ one: 'spot', other: 'spots' }}
      min={1}
      max={50}
      defaultValue={10}
      helper="1–50 spots"
    />
  );
}`;

const spots = { one: 'spot', other: 'spots' };

export const thumbnail = () => <QuantitySelector label="Spots" hideLabel unit={spots} min={1} max={50} defaultValue={10} />;

export const anatomy: DocsAnatomyNode[] = [
  {
    name: 'Quantity selector',
    element: '<div>.cui-quantity-selector-field',
    description: 'Label, box, helper or error, 4px apart. As wide as its box.',
    children: [
      { name: 'Label', element: 'label.cui-input-field__label', description: 'Input field\'s label (label1). Always there; hidden visually in rows and table cells.' },
      {
        name: 'Box',
        element: '.cui-quantity-selector',
        description: 'Input field\'s box: 40px (compact 32px), radius-sm, 1px Neutral-3, Neutral-1. As wide as the formatted max, so it never changes width as the value changes.',
        children: [
          { name: '− / +', element: 'button.cui-button (ghost, icon-only, sm)', when: 'not typeOnly', description: 'Button ghost icon-only sm (32px; compact 24px), Minus / Plus at icon-sm (compact icon-micro), 3px from the edge. Out of the tab order.' },
          { name: 'Lock', element: 'svg.cui-quantity-selector__lock', when: 'readOnly', description: 'LockSimple, Regular, Neutral-5, before the value.' },
          { name: 'Prefix', element: '.cui-quantity-selector__prefix', when: 'prefix', description: 'A currency ("RM"): caption, Neutral-5, 4px from the number.' },
          { name: 'Number', element: 'input[role=spinbutton]', description: 'body2, Neutral-9, tabular figures, comma thousands. Only as wide as its text.' },
          { name: 'Unit', element: '.cui-quantity-selector__unit', when: 'unit', description: 'Singular or plural ("1 spot", "2 spots"): caption, Neutral-5, 4px after the number. The longer form\'s width is kept, so + never moves.' },
        ],
      },
      { name: 'Helper / error', element: '.cui-input-field__helper', when: 'helper or error', description: 'Input field\'s helper (usually the range); the error (bold Red) replaces it.' },
    ],
  },
];

export const examples: DocsExample[] = [
  {
    id: 'default',
    title: 'Spots',
    description: 'Type a number, press − or + (hold to repeat), or use ↑ ↓, PageUp / PageDown and Home / End. Try typing 80, or "abc", then press Enter.',
    render: () => (
      <QuantitySelector label="Spots" unit={spots} min={1} max={50} defaultValue={10} helper="1–50 spots" />
    ),
    code: `<QuantitySelector label="Spots" unit={{ one: 'spot', other: 'spots' }} min={1} max={50} defaultValue={10} helper="1–50 spots" />`,
  },
  {
    id: 'budget',
    title: 'A budget, with shorthand',
    description: 'A currency prefix, steps of RM 1,000, and "250k" / "1.2m" accepted (say so in the helper). Paste "RM 25,000" and it is read too.',
    render: () => (
      <QuantitySelector label="Budget" prefix="RM" min={0} max={5000000} step={1000} defaultValue={25000} shorthand helper="RM 0–5,000,000. You can type 250k or 1.2m." />
    ),
    code: `<QuantitySelector label="Budget" prefix="RM" min={0} max={5000000} step={1000} defaultValue={25000} shorthand helper="RM 0–5,000,000. You can type 250k or 1.2m." />`,
  },
  {
    id: 'type-only',
    title: 'Type-only',
    description: 'No buttons, for numbers where one step is too small to be useful, and in dense columns. The keys still step.',
    render: () => (
      <QuantitySelector label="Impressions" typeOnly unit={{ one: 'impression', other: 'impressions' }} min={0} max={10000000} step={1000} defaultValue={1250000} />
    ),
    code: `<QuantitySelector label="Impressions" typeOnly unit={{ one: 'impression', other: 'impressions' }} min={0} max={10000000} step={1000} defaultValue={1250000} />`,
  },
  {
    id: 'compact',
    title: 'Compact, in rows',
    description: '32px with 24px buttons for table and list rows, the label hidden. Name the buttons with the row when they repeat.',
    render: () => (
      <div className="docs-stack">
        <QuantitySelector label="Spots, Astro Ria prime time" hideLabel size="compact" unit={spots} min={1} max={50} defaultValue={12} decreaseLabel="Fewer spots, Astro Ria prime time" increaseLabel="More spots, Astro Ria prime time" />
        <QuantitySelector label="Spots, Astro AEC late night" hideLabel size="compact" unit={spots} min={1} max={50} defaultValue={4} decreaseLabel="Fewer spots, Astro AEC late night" increaseLabel="More spots, Astro AEC late night" />
      </div>
    ),
    code: `<QuantitySelector label="Spots, Astro Ria prime time" hideLabel size="compact" unit={{ one: 'spot', other: 'spots' }} min={1} max={50} defaultValue={12} decreaseLabel="Fewer spots, Astro Ria prime time" increaseLabel="More spots, Astro Ria prime time" />
<QuantitySelector label="Spots, Astro AEC late night" hideLabel size="compact" unit={{ one: 'spot', other: 'spots' }} min={1} max={50} defaultValue={4} decreaseLabel="Fewer spots, Astro AEC late night" increaseLabel="More spots, Astro AEC late night" />`,
  },
  {
    id: 'states',
    title: 'Limits, read-only and disabled',
    description: 'At a limit that button goes Neutral-4. Read-only keeps the white box and the buttons, adds a lock and gives its reason; disabled is Input field\'s.',
    render: () => (
      <div className="docs-row">
        <QuantitySelector label="At the minimum" unit={spots} min={1} max={50} defaultValue={1} />
        <QuantitySelector label="Read-only" unit={spots} min={1} max={50} defaultValue={10} readOnly readOnlyReason="Locked by the package" />
        <QuantitySelector label="Disabled" unit={spots} min={1} max={50} defaultValue={10} disabled />
      </div>
    ),
    code: `<QuantitySelector label="At the minimum" unit={{ one: 'spot', other: 'spots' }} min={1} max={50} defaultValue={1} />
<QuantitySelector label="Read-only" unit={{ one: 'spot', other: 'spots' }} min={1} max={50} defaultValue={10} readOnly readOnlyReason="Locked by the package" />
<QuantitySelector label="Disabled" unit={{ one: 'spot', other: 'spots' }} min={1} max={50} defaultValue={10} disabled />`,
  },
];

export const props: DocsProp[] = [
  { name: 'label', options: 'ReactNode', default: '—', required: true, description: 'Names the field. Hide it with `hideLabel` in rows.' },
  { name: 'value / defaultValue', options: 'number', default: '`min`, or 0', description: 'The value. Whole numbers only.' },
  { name: 'onValueChange', options: '(value, { previous, source }) => void', default: '—', description: 'Each new valid value, and what changed it (button, hold, key, type, enter, blur).' },
  { name: 'onInvalid', options: '({ reason, raw }) => void', default: '—', description: 'A typed value was refused; the error is already showing.' },
  { name: 'min / max', options: 'number', default: 'none', description: 'The range. The box is as wide as the formatted max.' },
  { name: 'step / bigStep', options: 'number', default: '1 / 10 × step', description: 'What − / + and ↑ ↓ change it by; PageUp / PageDown.' },
  { name: 'unit', options: '{ one, other? }', default: '—', description: 'A unit after the number ("spot" / "spots").' },
  { name: 'prefix', options: 'string', default: '—', description: 'A currency before the number ("RM").' },
  { name: 'shorthand', options: 'boolean', default: 'false', description: 'Accept "250k" and "1.2m". Say so in the helper.' },
  { name: 'size', options: "'default' | 'compact'", default: "'default'", description: '40px, or 32px for rows.' },
  { name: 'typeOnly', options: 'boolean', default: 'false', description: 'No buttons.' },
  { name: 'reserveDigits', options: 'number', default: 'from `max`', description: 'Pin the width so selectors in a column line up.' },
  { name: 'helper / error', options: 'ReactNode', default: '—', description: 'The range hint; an error of the page\'s own (the selector\'s own messages need no prop).' },
  { name: 'disabled', options: 'boolean', default: 'false', description: 'Input field\'s disabled look.' },
  { name: 'readOnly + readOnlyReason', options: 'true + string', default: '—', description: 'A lock, buttons that never step, and the reason read out.' },
  { name: 'decreaseLabel / increaseLabel', options: 'string', default: '"Fewer spots" / "More spots"', description: 'The buttons\' names; add the row name when they repeat.' },
  { name: 'messages', options: 'Partial<Record<reason, string>>', default: '—', description: 'Replace any refusal message.' },
  { name: 'name', options: 'string', default: '—', description: 'A hidden input posts the number (no commas).' },
];

export const rules: DocsRules = {
  do: [
    'Use it for a whole-number count or amount inside a known range, where nudging by a step helps.',
    'Put the range in the helper ("1–50 spots").',
    'Use type-only where a step is too small to matter (impressions, reach).',
    'Give a read-only selector its reason.',
  ],
  dont: [
    'Don\'t use it for free numbers with no range (Input field), a few named options (Segmented Control, Radio), a point on a scale (Slider), or decimals.',
    'Don\'t clamp a typed value silently: the error asks instead.',
    'Don\'t confuse it with Stepper (step progress).',
  ],
};

export const accessibility: DocsAccessibility = {
  keyboard: [
    { keys: '↑ / ↓', action: 'One step.' },
    { keys: 'PageUp / PageDown', action: 'The big step (10 steps).' },
    { keys: 'Home / End', action: 'The minimum / maximum.' },
    { keys: 'Enter', action: 'Checks what was typed. Blocks a form submit only while it is refused.' },
    { keys: 'Escape', action: 'Undoes typing (when there is nothing to undo, it is left to a Modal around it).' },
    { keys: 'Tab', action: 'Checks what was typed and moves on; the buttons are skipped.' },
  ],
  notes: [
    'A text input with `role="spinbutton"`, not `type="number"`. `aria-valuenow` is the number; `aria-valuetext` adds the unit ("10 spots", "RM 25,000").',
    'One tab stop: − and + are out of the tab order, since the arrow keys do what they do. They are named for what they change ("Fewer spots").',
    'A refused value shows its reason in words, sets `aria-invalid` and keeps what was typed; focus doesn\'t move. Nothing is clamped behind the person\'s back.',
    'Read-only is announced with its reason ("Locked by the package").',
    'No live region: the arrow keys announce the new value; a button press doesn\'t, so keyboard and screen-reader users use the keys.',
    'On touch, each button\'s target is 44 × 44.',
  ],
};

export const motion: DocsMotion[] = [
  { interaction: 'Hover, press', motion: 'Button ghost\'s fill; pressed is instant and held for a whole press-and-hold.', token: '--duration-fast · --duration-instant' },
];
