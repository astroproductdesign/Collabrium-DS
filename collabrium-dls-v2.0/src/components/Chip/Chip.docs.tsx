// Documentation for Chip, rendered by the docs site (playground).
// Keep it consistent with Chip.usage.md. Not part of the package build.
import { useState } from 'react';
import { Buildings } from '@phosphor-icons/react';
import { FilterChipGroup } from './FilterChipGroup';
import { InputChipGroup } from './InputChipGroup';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../docs.types';

export const title = 'Chip';

export const description =
  'Interactive pills for a selection or an input. Filter chips toggle predefined options (one at a time, or several with a tick); input chips hold values a person entered, each with a × to remove it.';

export const usage = `import { FilterChipGroup } from '@collabrium/ui';

export function StatusFilter() {
  return (
    <FilterChipGroup
      mode="single"
      aria-label="Status filter"
      defaultValue="all"
      options={[
        { value: 'all', label: 'All' },
        { value: 'active', label: 'Active' },
        { value: 'paused', label: 'Paused' },
      ]}
    />
  );
}`;

export const thumbnail = () => (
  <FilterChipGroup
    mode="single"
    aria-label="Status"
    defaultValue="all"
    options={[
      { value: 'all', label: 'All' },
      { value: 'active', label: 'Active' },
    ]}
  />
);

export const anatomy: DocsAnatomyNode[] = [
  {
    name: 'Filter chip',
    element: '<button>.cui-chip[data-kind="filter"]',
    description: '32px tall, 12px side padding, a pill with a Neutral-3 border. On is Obsidian with Neutral-1 text. The whole chip is the toggle.',
    children: [
      { name: 'Icon or tick', element: 'svg.cui-chip__icon', when: 'with icon, or multi-select and on', description: '16px, regular. A category icon, or the tick in multi-select while on (the tick replaces the icon).' },
      { name: 'Label', element: 'span.cui-chip__label', description: 'Label2 (13px, 700). 24 characters at most.' },
      { name: 'Count', element: 'span.cui-chip__count', when: 'with count', description: 'Label2 at weight 400, Neutral-5 (Neutral-1 at 70% on an on chip). "99+" above 99.' },
    ],
  },
  {
    name: 'Input chip',
    element: '<li>.cui-chip[data-kind="input"]',
    description: '24px tall, 8px side padding, Neutral-2 fill, Neutral-3 border. Only the × responds.',
    children: [
      { name: 'Label', element: 'span.cui-chip__label', description: 'The value alone.' },
      { name: 'Remove', element: 'button.cui-chip__remove', when: 'with onRemove', description: '24×24px hit target, a 14px ×, Neutral-5 turning Neutral-9 on hover. Named "Remove [label]".' },
    ],
  },
  {
    name: 'Overflow',
    element: 'button.cui-chip[data-kind="overflow"] / button.cui-chip-group__showless',
    when: 'beyond maxVisible input chips',
    description: 'A "+N" chip that expands the rest in place, then an underlined "Show less" link that folds them again.',
  },
  { name: 'Group', element: '<div role="radiogroup|group"> / <ul role="list">.cui-chip-group', description: 'Wrapping row, 4px gap, never scrolls sideways.' },
];

function SingleExample() {
  const [value, setValue] = useState('all');
  return (
    <div className="docs-stack">
      <FilterChipGroup
        mode="single"
        aria-label="Status filter"
        value={value}
        onValueChange={setValue}
        options={[
          { value: 'all', label: 'All' },
          { value: 'active', label: 'Active' },
          { value: 'paused', label: 'Paused' },
          { value: 'archived', label: 'Archived' },
        ]}
      />
      <p className="docs-status">Showing: {value}</p>
    </div>
  );
}

function InputExample() {
  const [brands, setBrands] = useState(['Nescafé', 'Milo', 'Horlicks', 'Ovaltine', 'Teh Tarik', 'Kopi-O'].map(label => ({ id: label, label })));
  return <InputChipGroup aria-label="Brands" chips={brands} onRemove={id => setBrands(brands.filter(brand => brand.id !== id))} />;
}

export const examples: DocsExample[] = [
  {
    id: 'single',
    title: 'Single-select',
    description: 'One chip is always on. Choosing another turns the first off, and choosing the one that is on does nothing. A radio group: the arrow keys move and choose.',
    render: () => <SingleExample />,
    code: `const [value, setValue] = useState('all');

<FilterChipGroup
  mode="single"
  aria-label="Status filter"
  value={value}
  onValueChange={setValue}
  options={[
    { value: 'all', label: 'All' },
    { value: 'active', label: 'Active' },
    { value: 'paused', label: 'Paused' },
    { value: 'archived', label: 'Archived' },
  ]}
/>`,
  },
  {
    id: 'multi',
    title: 'Multi-select',
    description: 'Each chip toggles on its own, any number (none included). A chip that is on shows a tick. Uncontrolled here: the group keeps its own choices.',
    render: () => (
      <FilterChipGroup
        mode="multi"
        aria-label="Department filter"
        defaultValue={['product']}
        options={[
          { value: 'marketing', label: 'Marketing' },
          { value: 'product', label: 'Product' },
          { value: 'sales', label: 'Sales' },
          { value: 'finance', label: 'Finance' },
        ]}
      />
    ),
    code: `<FilterChipGroup
  mode="multi"
  aria-label="Department filter"
  defaultValue={['product']}
  options={[
    { value: 'marketing', label: 'Marketing' },
    { value: 'product', label: 'Product' },
    { value: 'sales', label: 'Sales' },
    { value: 'finance', label: 'Finance' },
  ]}
/>`,
  },
  {
    id: 'count',
    title: 'Trailing count',
    description: 'A count on every chip, or on none. It is a plain number, "0" is shown, and above 99 it reads "99+". Update it as the data changes.',
    render: () => (
      <FilterChipGroup
        mode="multi"
        aria-label="Department filter with counts"
        defaultValue={['all']}
        options={[
          { value: 'all', label: 'All', count: 120 },
          { value: 'marketing', label: 'Marketing', count: 14 },
          { value: 'sales', label: 'Sales', count: 6 },
          { value: 'archived', label: 'Archived', count: 0 },
        ]}
      />
    ),
    code: `<FilterChipGroup
  mode="multi"
  aria-label="Department filter with counts"
  defaultValue={['all']}
  options={[
    { value: 'all', label: 'All', count: 120 },
    { value: 'marketing', label: 'Marketing', count: 14 },
    { value: 'sales', label: 'Sales', count: 6 },
    { value: 'archived', label: 'Archived', count: 0 },
  ]}
/>`,
  },
  {
    id: 'icon-disabled',
    title: 'Category icon and a disabled chip',
    description: 'Give every chip an icon or none. A filter with nothing behind it stays in the group, disabled: the full set stays visible.',
    render: () => (
      <FilterChipGroup
        mode="single"
        aria-label="Pillar"
        defaultValue="all"
        options={[
          { value: 'all', label: 'All' },
          { value: 'sales', label: 'CollabSales', icon: Buildings },
          { value: 'studio', label: 'CollabStudio', icon: Buildings, disabled: true },
        ]}
      />
    ),
    code: `<FilterChipGroup
  mode="single"
  aria-label="Pillar"
  defaultValue="all"
  options={[
    { value: 'all', label: 'All' },
    { value: 'sales', label: 'CollabSales', icon: Buildings },
    { value: 'studio', label: 'CollabStudio', icon: Buildings, disabled: true },
  ]}
/>`,
  },
  {
    id: 'input',
    title: 'Input chips with overflow',
    description: 'The values a person entered, each removable. Past three, the rest fold into "+3"; pressing it shows them and becomes "Show less". You keep the list: drop the chip in `onRemove`.',
    render: () => <InputExample />,
    code: `const [brands, setBrands] = useState(initialBrands);

<InputChipGroup
  aria-label="Brands"
  chips={brands}
  onRemove={id => setBrands(brands.filter(brand => brand.id !== id))}
/>`,
  },
  {
    id: 'static',
    title: 'Static input chips',
    description: 'Leave `onRemove` out for values that are shown but cannot be removed (the industries on a profile). The chips then have no ×.',
    render: () => (
      <InputChipGroup
        aria-label="Industries"
        chips={[
          { id: 'ent', label: 'Entertainment' },
          { id: 'food', label: 'Food & Beverages' },
        ]}
      />
    ),
    code: `<InputChipGroup
  aria-label="Industries"
  chips={[
    { id: 'ent', label: 'Entertainment' },
    { id: 'food', label: 'Food & Beverages' },
  ]}
/>`,
  },
];

export const props: DocsProp[] = [
  { name: 'FilterChipGroup: mode', options: "'single' | 'multi'", default: '—', required: true, description: 'Single: one always on (radio group). Multi: independent toggles with a tick (checkbox group).' },
  { name: 'FilterChipGroup: options', options: '{ value, label, icon?, count?, disabled? }[]', default: '—', required: true, description: '`label` 24 characters at most. `icon` is a Phosphor icon. `count` is a number ("99+" above 99). `disabled` keeps the chip but makes it unusable.' },
  { name: 'FilterChipGroup: aria-label', options: 'string', default: '—', required: true, description: 'Names the group ("Status filter").' },
  { name: 'FilterChipGroup: value / defaultValue', options: 'string (single) · string[] (multi)', default: 'first enabled option · none', description: 'The chosen value, or the values that are on: controlled, or the start.' },
  { name: 'FilterChipGroup: onValueChange', options: '(value) => void', default: '—', description: 'The new value (single), or the new list in option order (multi).' },
  { name: 'InputChipGroup: chips', options: '{ id, label }[]', default: '—', required: true, description: 'The values, in order. Write the value alone.' },
  { name: 'InputChipGroup: aria-label', options: 'string', default: '—', required: true, description: 'Names the list ("Selected brands").' },
  { name: 'InputChipGroup: onRemove', options: '(id: string) => void', default: '—', description: 'Called when a chip is removed. Leave it out for a static list with no ×.' },
  { name: 'InputChipGroup: maxVisible', options: 'number', default: '3', description: 'Chips shown before the rest fold into "+N".' },
  { name: 'InputChipGroup: disabled', options: 'boolean', default: 'false', description: '40% opacity, not-allowed cursor, the × out of use.' },
  { name: 'id, aria-*, data-*, …', options: 'native', default: '—', description: 'Passed to the group (`<div>` or `<ul>`). `style` and `className` are not accepted. The ref is forwarded to the group.' },
];

export const rules: DocsRules = {
  do: [
    'Use a filter chip for a predefined option that toggles, in a toolbar or filter row.',
    'Use single-select when exactly one choice always applies, and multi-select when any number can.',
    'Use an input chip for a value the person entered or confirmed, under or inside its field.',
    'Give every group an `aria-label` that says what it filters or holds.',
    'Put a count on every chip in a group or on none, show "0", and keep it live.',
    'Keep the "+N" and "Show less" controls non-removable.',
  ],
  dont: [
    'Don\'t mix input chips and filter chips, or single and multi-select, in one group.',
    'Don\'t use a filter chip as a form Checkbox: use Checkbox when the choice is submitted.',
    'Don\'t use an accent colour as the on fill: Obsidian is the on state.',
    'Don\'t truncate a filter label: rewrite it to 24 characters or fewer.',
    'Don\'t wrap a filter row past two lines: use a Dropdown with multiple select.',
    'Don\'t put brackets around a count ("Sales (6)"): a plain number after the label.',
  ],
};

export const accessibility: DocsAccessibility = {
  keyboard: [
    { keys: 'Tab', action: 'Single-select: into the group once, to the chosen chip, and out again. Multi-select: between chips. Input chips: to each ×.' },
    { keys: 'Arrow keys', action: 'Single-select: move to the next or previous enabled chip and choose it, wrapping. Home and End go to the first and last.' },
    { keys: 'Space / Enter', action: 'Toggles a multi-select chip, chooses a single-select chip, presses × or +N.' },
    { keys: 'Delete / Backspace', action: 'On a focused ×: removes that input chip.' },
  ],
  notes: [
    'Single-select is a `radiogroup` of `role="radio"` buttons; multi-select is a `group` of `role="checkbox"` buttons. `aria-checked` carries the state.',
    'An input chip group is a `<ul role="list">`; each × is named "Remove" plus the chip\'s label.',
    'The tick and category icons are decorative and `aria-hidden`.',
    'An active filter chip never relies on its fill alone: the text turns white too.',
    'A disabled filter chip is `aria-disabled`, skipped by the arrow keys, and ignores the pointer.',
    'In forced-colours mode an active chip is drawn in the system Highlight colours so on and off still differ.',
    'Removing a chip is not announced, and the removed chip\'s button leaves the page. Tell the person another way when it matters.',
  ],
};

export const motion: DocsMotion[] = [
  { interaction: 'Hover, press, choose', motion: 'Fill, text and border colours fade. Nothing moves, so there is nothing to remove under reduced motion.', token: '--duration-fast · --ease-standard' },
];
