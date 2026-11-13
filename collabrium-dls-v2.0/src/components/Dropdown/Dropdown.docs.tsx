// Documentation for Dropdown, rendered by the docs site (playground).
// Keep it consistent with Dropdown.usage.md. Not part of the package build.
import { useEffect, useState } from 'react';
import { Archive, ChartLine, Megaphone, Newspaper } from '@phosphor-icons/react';
import { Dropdown, type DropdownOption } from './Dropdown';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../docs.types';

export const title = 'Dropdown';

export const description =
  'A trigger on Input field\'s box that opens a panel of options. Single select picks one; Multiple select ticks any number, with an optional Select all row and a Clear / Done footer. Outlined or borderless, optionally searchable, with groups and options that can carry an icon or avatar, a description and a meta note.';

export const usage = `import { Dropdown } from '@collabrium/ui';

export function DepartmentPicker() {
  return (
    <Dropdown
      label="Department"
      placeholder="Select department"
      options={[
        { value: 'marketing', label: 'Marketing' },
        { value: 'data', label: 'Data' },
        { value: 'finance', label: 'Finance' },
      ]}
    />
  );
}`;

const departments: DropdownOption[] = [
  { value: 'marketing', label: 'Marketing' },
  { value: 'data', label: 'Data' },
  { value: 'finance', label: 'Finance' },
];
const brands: DropdownOption[] = [
  { value: 'nescafe', label: 'Nescafé', group: 'FMCG' },
  { value: 'milo', label: 'Milo', group: 'FMCG' },
  { value: 'dutch-lady', label: 'Dutch Lady', group: 'FMCG' },
  { value: 'celcom', label: 'Celcom', group: 'Telco' },
  { value: 'maxis', label: 'Maxis', group: 'Telco' },
  { value: 'digi', label: 'Digi', group: 'Telco', disabled: true },
];
const many: DropdownOption[] = [
  'Brand Management', 'Business Development', 'Content', 'Customer Success', 'Data', 'Design', 'Editorial', 'Engineering', 'Finance',
  'Growth', 'Legal', 'Marketing', 'Media Planning', 'Operations', 'Partnerships', 'Performance Media', 'People', 'Product', 'Research', 'Sales',
].map((l) => ({ value: l.toLowerCase().replace(/\W+/g, '-'), label: l }));
const slots: DropdownOption[] = [
  { value: 'performance', label: 'Performance', icon: ChartLine, meta: '24' },
  { value: 'brand', label: 'Brand', icon: Megaphone, meta: '12' },
  { value: 'editorial', label: 'Editorial', icon: Newspaper, meta: '8' },
  { value: 'archive', label: 'Archive', icon: Archive, meta: '0', disabled: true },
];
const people: DropdownOption[] = [
  { value: 'ar', label: 'Aisyah Rahman', description: 'Head of Data', initials: 'AR' },
  { value: 'jl', label: 'Jason Lim', description: 'Brand Strategist, Marketing', initials: 'JL' },
  { value: 'tw', label: 'Tan Wei Ming', description: 'On leave until 3 Oct', initials: 'TW', disabled: true },
  { value: 'sk', label: 'Sharifah Khadijah binti Syed Ahmad', description: 'Regional Director, Integrated Brand Partnerships', initials: 'SK' },
];

function MultiLoadingExample() {
  const [options, setOptions] = useState<DropdownOption[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => {
      setOptions(brands);
      setLoading(false);
    }, 1500);
    return () => clearTimeout(t);
  }, []);
  return <Dropdown multiple label="Brands (load for 1.5s)" placeholder="Select brands" options={options} loading={loading} />;
}

function LoadingExample() {
  const [options, setOptions] = useState<DropdownOption[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => {
      setOptions(departments);
      setLoading(false);
    }, 1500);
    return () => clearTimeout(t);
  }, []);
  return <Dropdown label="Department (loads for 1.5s)" placeholder="Select department" options={options} loading={loading} />;
}

export const thumbnail = () => <Dropdown label="Department" options={departments} defaultValue="marketing" />;

export const anatomy: DocsAnatomyNode[] = [
  {
    name: 'Dropdown',
    element: '<div>.cui-input-field.cui-dropdown',
    description: 'Input field\'s column: label, the trigger box, helper or error.',
    children: [
      { name: 'Trigger', element: 'div.cui-dropdown__trigger (role="combobox"); an <input> when searchable', description: 'Input field\'s 40px box. Placeholder Neutral-5, value Neutral-9 (Multiple select: "2 selected"). Hover Neutral-2; open: 2px Obsidian; filled: Obsidian border; error: Red, over filled. Borderless: transparent, no border except the error\'s.' },
      { name: 'Chevron', element: 'svg.cui-dropdown__chevron', description: 'CaretDown, 16px, Regular, Neutral-5, 12px from the end; turns 180° when open. Hidden when read-only.' },
      {
        name: 'Panel',
        element: '.cui-dropdown__panel > ul (role="listbox")',
        when: 'open',
        description: 'radius-md, 1px Neutral-3, shadow-3, exactly the trigger\'s width, 8px below (or above when it doesn\'t fit). The list scrolls past 320px, with 8px top and bottom.',
        children: [
          { name: 'Group', element: 'div (role="group") > .cui-dropdown__group', when: 'options have a group', description: 'A heading: caption, bold, uppercase, eyebrow tracking, Neutral-5, 4px / 12px. A 1px Neutral-3 divider (8px above and below) between groups.' },
          { name: 'Option', element: '.cui-dropdown__row (role="option")', description: '8px / 12px padding, body2. Hover and the keyboard\'s row: Neutral-2. Single select: selected is Neutral-2 and a Regular check. Multiple select: Checkbox\'s box leads, and a ticked row has no fill. Disabled: Neutral-4.' },
          { name: 'Select all', element: '.cui-dropdown__row[data-all]', when: 'multiple and selectAll', description: 'Pinned first, bold, with a divider under it. Its box shows a minus when some options are ticked.' },
          { name: 'Media', element: '.cui-dropdown__media', when: 'icon or initials', description: 'A 20px Regular Neutral-5 icon, or a 24px Neutral-2 initials avatar.' },
          { name: 'Description', element: '.cui-dropdown__desc', when: 'description', description: 'caption, Neutral-5, one line with "…". Every row or none: a row becomes 52px.' },
          { name: 'Meta', element: '.cui-dropdown__meta', when: 'meta', description: 'caption, Neutral-5, before the check.' },
          { name: 'Empty', element: '.cui-dropdown__empty', when: 'no options, or no matches', description: 'A Neutral-4 icon (Tray, or MagnifyingGlass for a search), a body2 bold title and a caption hint.' },
          { name: 'Loading', element: '.cui-search-input__loading', when: 'loading', description: 'Search input\'s spinner, centred.' },
          { name: 'Footer', element: '.cui-dropdown__footer', when: 'multiple', description: 'Button ghost "Clear" and primary "Done", size sm, apart; 12px padding, a 1px Neutral-3 top border. Stays when nothing matches; disabled while loading.' },
        ],
      },
    ],
  },
];

export const examples: DocsExample[] = [
  {
    id: 'outlined',
    title: 'Outlined',
    description: 'Input field\'s box. Click it (or Tab to it and press Space, Enter or ↓): the panel opens on the chosen option; pick with the mouse, or ↓ ↑ and Enter.',
    render: () => (
      <div className="docs-stack docs-popover-room">
        <Dropdown label="Department" placeholder="Select department" options={departments} />
        <Dropdown label="Department" placeholder="Select department" options={departments} defaultValue="marketing" />
      </div>
    ),
    code: `<Dropdown label="Department" placeholder="Select department" options={departments} />
<Dropdown label="Department" placeholder="Select department" options={departments} defaultValue="marketing" />`,
  },
  {
    id: 'states',
    title: 'Disabled, read-only and error',
    description: 'Read-only shows the value but never opens (the chevron goes, and the keyboard can\'t open it either).',
    render: () => (
      <div className="docs-stack">
        <Dropdown label="Department" options={departments} defaultValue="marketing" disabled />
        <Dropdown label="Department" options={departments} defaultValue="marketing" readOnly />
        <Dropdown label="Department" placeholder="Select department" options={departments} error="Choose a department" />
      </div>
    ),
    code: `<Dropdown label="Department" options={departments} defaultValue="marketing" disabled />
<Dropdown label="Department" options={departments} defaultValue="marketing" readOnly />
<Dropdown label="Department" placeholder="Select department" options={departments} error="Choose a department" />`,
  },
  {
    id: 'borderless',
    title: 'Borderless',
    description: 'For toolbars and table headers: transparent, no border, Neutral-2 on hover, and no border when open or filled.',
    render: () => (
      <div className="docs-stack docs-popover-room">
        <Dropdown label="Sort by" appearance="borderless" options={[{ value: 'new', label: 'Newest first' }, { value: 'old', label: 'Oldest first' }, { value: 'az', label: 'Name, A to Z' }]} defaultValue="new" />
      </div>
    ),
    code: `<Dropdown label="Sort by" appearance="borderless" options={sortOptions} defaultValue="new" />`,
  },
  {
    id: 'searchable',
    title: 'Searchable',
    description: 'For long lists: type in the box to filter. Escape clears the query, then closes. Nothing matching shows the empty state (try "zz").',
    render: () => (
      <div className="docs-popover-room">
        <Dropdown label="Department" placeholder="Search departments" options={many} searchable />
      </div>
    ),
    code: `<Dropdown label="Department" placeholder="Search departments" options={departments} searchable />`,
  },
  {
    id: 'slots',
    title: 'Icons, meta, avatars and descriptions',
    description: 'A leading icon or initials, a trailing meta note, and a description line. A description goes on every row or none.',
    render: () => (
      <div className="docs-row docs-popover-room" style={{ alignItems: 'flex-start' }}>
        <div style={{ flex: '1 1 240px' }}>
          <Dropdown label="Channel" options={slots} defaultValue="performance" />
        </div>
        <div style={{ flex: '1 1 240px' }}>
          <Dropdown label="Owner" options={people} defaultValue="ar" />
        </div>
      </div>
    ),
    code: `<Dropdown
  label="Channel"
  defaultValue="performance"
  options={[
    { value: 'performance', label: 'Performance', icon: ChartLine, meta: '24' },
    { value: 'brand', label: 'Brand', icon: Megaphone, meta: '12' },
    { value: 'editorial', label: 'Editorial', icon: Newspaper, meta: '8' },
    { value: 'archive', label: 'Archive', icon: Archive, meta: '0', disabled: true },
  ]}
/>

<Dropdown
  label="Owner"
  defaultValue="ar"
  options={[
    { value: 'ar', label: 'Aisyah Rahman', description: 'Head of Data', initials: 'AR' },
    { value: 'jl', label: 'Jason Lim', description: 'Brand Strategist, Marketing', initials: 'JL' },
    { value: 'tw', label: 'Tan Wei Ming', description: 'On leave until 3 Oct', initials: 'TW', disabled: true },
    { value: 'sk', label: 'Sharifah Khadijah binti Syed Ahmad', description: 'Regional Director, Integrated Brand Partnerships', initials: 'SK' },
  ]}
/>`,
  },
  {
    id: 'groups',
    title: 'Groups',
    description: 'Give options a group and they are listed under its heading, groups in the order they first appear.',
    render: () => (
      <div className="docs-popover-room">
        <Dropdown label="Brand" placeholder="Select brand" options={brands} />
      </div>
    ),
    code: `<Dropdown
  label="Brand"
  placeholder="Select brand"
  options={[
    { value: 'nescafe', label: 'Nescafé', group: 'FMCG' },
    { value: 'milo', label: 'Milo', group: 'FMCG' },
    { value: 'dutch-lady', label: 'Dutch Lady', group: 'FMCG' },
    { value: 'celcom', label: 'Celcom', group: 'Telco' },
    { value: 'maxis', label: 'Maxis', group: 'Telco' },
    { value: 'digi', label: 'Digi', group: 'Telco', disabled: true },
  ]}
/>`,
  },
  {
    id: 'empty-loading',
    title: 'Empty and loading',
    description: 'With no options the panel says so; while options load it shows the spinner. Both are announced.',
    render: () => (
      <div className="docs-row docs-popover-room" style={{ alignItems: 'flex-start' }}>
        <div style={{ flex: '1 1 240px' }}>
          <Dropdown label="Campaign" placeholder="Select campaign" options={[]} emptyTitle="No campaigns yet" emptyHint="Create one to assign it here." />
        </div>
        <div style={{ flex: '1 1 240px' }}>
          <LoadingExample />
        </div>
      </div>
    ),
    code: `<Dropdown label="Campaign" placeholder="Select campaign" options={[]} emptyTitle="No campaigns yet" emptyHint="Create one to assign it here." />
<Dropdown label="Department" placeholder="Select department" options={options} loading={loading} />`,
  },
  {
    id: 'multiple',
    title: 'Multiple select',
    description: 'Tick any number: the panel stays open, the box shows "2 selected". Clear unticks everything and stays open; Done closes (ticks apply as you make them). Tab moves to Clear, then Done.',
    render: () => (
      <div className="docs-stack docs-popover-room" data-room="tall">
        <Dropdown multiple label="Brands" placeholder="Select brands" options={brands} defaultValue={['nescafe', 'milo']} />
      </div>
    ),
    code: `<Dropdown multiple label="Brands" placeholder="Select brands" options={brands} defaultValue={['nescafe', 'milo']} />`,
  },
  {
    id: 'select-all',
    title: 'Select all',
    description: 'A pinned row that ticks every option, or clears them; a minus when only some are ticked. It never changes a disabled option, and after a search it covers the matches only.',
    render: () => (
      <div className="docs-popover-room" data-room="tall">
        <Dropdown multiple selectAll label="Departments" placeholder="Select departments" options={many} searchable defaultValue={['data', 'design']} />
      </div>
    ),
    code: `<Dropdown multiple selectAll searchable label="Departments" placeholder="Select departments" options={departments} defaultValue={['data', 'design']} />`,
  },
  {
    id: 'multiple-states',
    title: 'Multiple select: borderless, states and loading',
    description: 'The same trigger and states as Single select. While options load, the footer stays but is disabled.',
    render: () => (
      <div className="docs-row docs-popover-room" data-room="tall" style={{ alignItems: 'flex-start' }}>
        <div className="docs-stack" style={{ flex: '1 1 240px' }}>
          <Dropdown multiple label="Brands" appearance="borderless" placeholder="Select brands" options={brands} />
          <Dropdown multiple label="Brands" options={brands} defaultValue={['nescafe', 'milo']} disabled />
          <Dropdown multiple label="Brands" options={brands} defaultValue={['nescafe', 'milo']} readOnly />
          <Dropdown multiple label="Brands" placeholder="Select brands" options={brands} error="Select at least one brand" />
        </div>
        <div style={{ flex: '1 1 240px' }}>
          <MultiLoadingExample />
        </div>
      </div>
    ),
    code: `<Dropdown multiple label="Brands" appearance="borderless" placeholder="Select brands" options={brands} />
<Dropdown multiple label="Brands" options={brands} defaultValue={['nescafe', 'milo']} disabled />
<Dropdown multiple label="Brands" options={brands} defaultValue={['nescafe', 'milo']} readOnly />
<Dropdown multiple label="Brands" placeholder="Select brands" options={brands} error="Select at least one brand" />
<Dropdown multiple label="Brands" placeholder="Select brands" options={options} loading={loading} />`,
  },
  {
    id: 'multiple-slots',
    title: 'Multiple select with avatars and descriptions',
    description: 'The same option slots, after the checkbox.',
    render: () => (
      <div className="docs-popover-room" data-room="tall">
        <Dropdown multiple label="Reviewers" placeholder="Select reviewers" options={people} defaultValue={['ar', 'jl']} />
      </div>
    ),
    code: `<Dropdown multiple label="Reviewers" placeholder="Select reviewers" options={people} defaultValue={['ar', 'jl']} />`,
  },
];

export const props: DocsProp[] = [
  { name: 'label', options: 'ReactNode', default: '—', required: true, description: 'Names the field.' },
  { name: 'hideLabel', options: 'boolean', default: 'false', description: 'Hides the label visually; still read out.' },
  { name: 'options', options: '{ value, label, description?, meta?, icon?, initials?, group?, disabled? }[]', default: '—', required: true, description: 'The options. A description on every one or none; a group lists it under that heading.' },
  { name: 'multiple', options: 'boolean', default: 'false', description: 'Multiple select: checkbox rows, stays open, a Clear / Done footer.' },
  { name: 'value / defaultValue / onValueChange', options: 'string | null (multiple: string[])', default: 'null ([])', description: 'The chosen value, or values.' },
  { name: 'selectAll', options: 'boolean', default: 'false', description: 'Multiple select: a pinned Select all row.' },
  { name: 'selectAllLabel / clearLabel / doneLabel', options: 'string', default: "'Select all' / 'Clear' / 'Done'", description: 'Multiple select\'s labels.' },
  { name: 'countLabel', options: '(count) => string', default: '`${count} selected`', description: 'Multiple select: the box\'s value once something is ticked.' },
  { name: 'placeholder', options: 'string', default: "'Select…'", description: 'Shown while nothing is chosen.' },
  { name: 'appearance', options: "'outlined' | 'borderless'", default: "'outlined'", description: 'Borderless for toolbars and table headers.' },
  { name: 'searchable', options: 'boolean', default: 'false', description: 'Type in the box to filter (long lists).' },
  { name: 'loading', options: 'boolean', default: 'false', description: 'The panel shows the spinner.' },
  { name: 'helper / error / required / disabled / readOnly', options: '—', default: '—', description: 'Input field\'s, plus read-only (shows the value, never opens).' },
  { name: 'emptyTitle / emptyHint', options: 'string', default: "'Nothing to choose from yet'", description: 'When there are no options.' },
  { name: 'noResultsTitle / noResultsHint', options: '(query) => string / string', default: '`No matches for “query”` / \'Check the spelling or try a shorter term\'', description: 'When a search matches nothing.' },
  { name: 'loadingLabel', options: 'string', default: "'Loading options…'", description: 'Announced while loading.' },
  { name: 'name', options: 'string', default: '—', description: 'A hidden input posts the chosen value with a form.' },
];

export const rules: DocsRules = {
  do: [
    'Use it to pick one option from more than a handful (or several, with multiple); make it searchable for long lists.',
    'Group options when the list has natural sections (brands by category).',
    'Give every option a description or none, and keep labels unique.',
    'Use borderless only inline: toolbars and table headers.',
  ],
  dont: [
    'Don\'t let a description carry meaning the label doesn\'t.',
    'Don\'t put a Tag or Badge in the meta slot, or a colour dot in the media slot.',
    'Don\'t use it for 2 to 5 options shown at once (Radio or Checkbox, or Segmented Control for views).',
    'Don\'t give Select all its own clear control: Clear in the footer does that.',
  ],
};

export const accessibility: DocsAccessibility = {
  keyboard: [
    { keys: 'Space / Enter / ↓ (closed)', action: 'Opens the panel on the chosen option, or the first one.' },
    { keys: '↓ / ↑', action: 'Moves between options, skipping disabled ones. Doesn\'t wrap.' },
    { keys: 'Home / End', action: 'First / last enabled option (not when searchable: they move in the text).' },
    { keys: 'Enter (or Space, not searchable)', action: 'Single select: picks the option and closes; focus stays on the trigger. Multiple select: ticks or unticks it and stays open.' },
    { keys: 'Escape', action: 'Closes without picking. Searchable: the first Escape clears the query.' },
    { keys: 'Tab', action: 'Single select: closes, keeping the value, and moves on. Multiple select: moves to Clear, then Done, then out (which closes).' },
    { keys: 'Letters', action: 'Not searchable: jumps to the first option starting with them (resets after a second).' },
  ],
  notes: [
    'The trigger is a `combobox` (`aria-expanded`, `aria-controls`, `aria-haspopup="listbox"`), named by the label. The list is a `listbox` of `option`s with `aria-selected` (`aria-multiselectable` in Multiple select, where the checkbox is only the picture).',
    'A group is `role="group"` named by its heading, so the heading isn\'t read as one more option. A partly ticked Select all is read with its count ("Select all, 2 selected").',
    'Focus never leaves the trigger: the keyboard\'s option is `aria-activedescendant`.',
    'An option with a description is read as one name: the label, then the description.',
    'The empty and loading states are announced (a polite live region), as the DS asks.',
    'Read-only sets `aria-readonly` and really can\'t be opened, by mouse or keyboard.',
  ],
};

export const motion: DocsMotion[] = [
  { interaction: 'Open / close', motion: 'The chevron turns 180°; the panel appears at once.', token: '--duration-fast · --ease-standard' },
  { interaction: 'Loading', motion: 'Search input\'s spinner turns (still under reduced motion).', token: '--duration-ambient' },
];
