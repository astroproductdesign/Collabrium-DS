// Documentation for Filters, rendered by the docs site (playground).
// Keep it consistent with Filters.usage.md. Not part of the package build.
import { useState } from 'react';
import { Badge } from '../Badge';
import { Card } from '../Card';
import { Table, type TableColumn } from '../Table';
import { Filters, type FilterDimension, type FilterValue } from './index';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../docs.types';

export const title = 'Filters';

export const description =
  'Narrows the table or list under it. A bar of named triggers (or one "Filter" trigger when space is tight), each opening a checkbox panel that applies on Done; the applied values show as removable chips underneath.';

export const usage = `import { Filters } from '@collabrium/ui';

const [value, setValue] = useState({});

<Filters dimensions={dimensions} value={value} onValueChange={setValue} search />`;

const opts = (...labels: string[]) => labels.map((l) => ({ value: l.toLowerCase().replace(/\s+/g, '-'), label: l }));

const primary: FilterDimension[] = [
  { key: 'department', label: 'Department', options: opts('Marketing', 'Product', 'Finance', 'Data', 'HR') },
  { key: 'status', label: 'Status', options: opts('Active', 'Paused', 'Blocked') },
  { key: 'priority', label: 'Priority', options: opts('High', 'Medium', 'Low') },
  { key: 'region', label: 'Region', options: opts('MY', 'SG', 'ID') },
  { key: 'owner', label: 'Owner', options: opts('Aisyah', 'Marcus', 'Priya') },
];
const secondary: FilterDimension[] = [
  { key: 'assignee', label: 'Assignee', options: opts('Aiman', 'Bella', 'Chong') },
  { key: 'channel', label: 'Channel', options: opts('Web', 'Mobile app', 'Email') },
  { key: 'source', label: 'Source', options: opts('Organic', 'Paid', 'Referral') },
  { key: 'tag', label: 'Tag', options: opts('VIP', 'At risk', 'New') },
  { key: 'risk', label: 'Risk level', options: opts('Low', 'Medium', 'High') },
];

export const thumbnail = () => (
  <Filters dimensions={primary.slice(0, 3)} defaultValue={{ department: ['marketing', 'finance'] }} showApplied={false} />
);

// A long list earns Select all.
const longDepartment: FilterDimension = {
  key: 'department',
  label: 'Department',
  selectAll: true,
  options: opts('Marketing', 'Product', 'Finance', 'Data', 'HR', 'Sales', 'Legal', 'Design', 'Operations'),
};

function DefaultExample() {
  const [value, setValue] = useState<FilterValue>({});
  const [text, setText] = useState('');
  return <Filters dimensions={[longDepartment, ...primary.slice(1, 4)]} value={value} onValueChange={setValue} search searchValue={text} onSearchChange={setText} />;
}

function TieredExample() {
  const [value, setValue] = useState<FilterValue>({});
  return <Filters dimensions={primary} moreDimensions={secondary} value={value} onValueChange={setValue} search />;
}

function CompactExample() {
  const [value, setValue] = useState<FilterValue>({});
  return <Filters variant="compact" dimensions={primary.slice(0, 4)} value={value} onValueChange={setValue} />;
}

function AppliedExample() {
  const [value, setValue] = useState<FilterValue>({
    department: ['marketing', 'product', 'finance'],
    status: ['active', 'paused'],
    priority: ['high'],
    region: ['my'],
  });
  return <Filters dimensions={primary.slice(0, 4)} value={value} onValueChange={setValue} />;
}

function NoTrayExample() {
  const [value, setValue] = useState<FilterValue>({ status: ['active'] });
  return <Filters dimensions={primary.slice(0, 4)} value={value} onValueChange={setValue} showApplied={false} />;
}

type Row = { id: string; name: string; status: 'Active' | 'Paused' | 'Blocked'; region: 'MY' | 'SG' | 'ID' };
const names = ['Back to school', 'Raya promo', 'App install push', 'Year-end clearance', 'Merdeka sale', 'CNY greetings', 'Deepavali lights', 'Mid-year sale'];
const statuses = ['Active', 'Paused', 'Blocked'] as const;
const regions = ['MY', 'SG', 'ID'] as const;
const rows: Row[] = names.map((name, i) => ({ id: `r${i}`, name, status: statuses[i % 3], region: regions[(i * 2) % 3] }));
const tone = { Active: 'success', Paused: 'warning', Blocked: 'error' } as const;
const columns: TableColumn<Row>[] = [
  { key: 'name', header: 'Campaign' },
  { key: 'status', header: 'Status', type: 'status', render: (r) => <Badge variant={tone[r.status]}>{r.status}</Badge> },
  { key: 'region', header: 'Region' },
];
const tableDims: FilterDimension[] = [
  { key: 'status', label: 'Status', options: opts('Active', 'Paused', 'Blocked') },
  { key: 'region', label: 'Region', options: opts('MY', 'SG', 'ID') },
];

function TableExample() {
  const [value, setValue] = useState<FilterValue>({});
  const [text, setText] = useState('');
  const pass = (key: string, v: string) => !(value[key]?.length) || value[key].includes(v.toLowerCase());
  const shown = rows.filter((r) => pass('status', r.status) && pass('region', r.region) && r.name.toLowerCase().includes(text.trim().toLowerCase()));
  return (
    <Card>
      <div className="docs-stack">
        <Filters align="table" dimensions={tableDims} value={value} onValueChange={setValue} search searchValue={text} onSearchChange={setText} searchPlaceholder="Search campaigns…" />
        <Table variant="embedded" label="Campaigns" columns={columns} rows={shown} getRowKey={(r) => r.id} />
      </div>
    </Card>
  );
}

export const anatomy: DocsAnatomyNode[] = [
  {
    name: 'Filters',
    element: 'div.cui-filters[role="group"]',
    description: 'Two rows: the bar, always there, and the applied tray, only while something is applied.',
    children: [
      {
        name: 'Bar',
        element: '.cui-filters__bar',
        description: 'A row 8px apart, wrapping when it runs out of width.',
        children: [
          { name: 'Search', element: '.cui-filters__search', when: 'search', description: 'Search input at 32px, 240px wide (full width on phones), Neutral-5 magnifying glass; × once it holds text. A 1px Neutral-3 divider follows when triggers do.' },
          { name: 'Trigger', element: 'button.cui-filters__trigger', description: 'Button Secondary at 32px: label, then the count, then a 12px Neutral-5 caret. Hover and open Neutral-2.' },
          { name: 'Applied trigger', element: '[data-applied]', when: 'values applied', description: 'Obsidian border and an Obsidian count pill (caption bold, white) inside the padding.' },
          { name: 'Filter / More filters', element: 'button.cui-filters__trigger', when: 'compact / moreDimensions', description: 'Opens the nested list. "Filter" carries the sliders icon; "More filters" doesn\'t.' },
          { name: 'Clear All', element: '.cui-filters__clear-bar', when: 'showApplied={false}', description: 'Button ghost, Red text, 16px after the last trigger.' },
        ],
      },
      {
        name: 'Panel',
        element: '.cui-filters__panel',
        description: 'radius-md, 1px Neutral-3, shadow-3, 16px padding, at least 240px, 8px under its trigger; flips right-aligned at the window edge.',
        children: [
          { name: 'Title', element: '.cui-filters__panel-title', description: 'The dimension, caption bold uppercase, Neutral-5.' },
          { name: 'Select all', element: '.cui-filters__option[data-all]', when: 'selectAll', description: 'A pinned first row, label bold, a 1px Neutral-3 rule under it; a minus when some are ticked.' },
          { name: 'Option', element: '.cui-filters__option[role="option"]', description: 'Checkbox\'s box and the label (body2, Neutral-9); Neutral-2 on hover and for the keyboard\'s row.' },
          { name: 'Nested item', element: 'button.cui-filters__nested-item', when: 'nested', description: 'A dimension, body2 bold, with its applied count in Neutral-5. Opens that dimension\'s list, under a Back row.' },
          { name: 'Footer', element: '.cui-filters__footer', description: 'Ghost "Clear" and Primary "Done", sm, under a 1px line.' },
        ],
      },
      {
        name: 'Applied tray',
        element: '.cui-filters__tray',
        when: 'values applied',
        description: 'Neutral-1, 1px Neutral-3, radius-sm, 12px padding, 8px under the bar: Input chips (the value alone), "+N" past 5, then Clear all (a Link).',
      },
    ],
  },
];

export const examples: DocsExample[] = [
  {
    id: 'default',
    title: 'Default',
    description: 'A named trigger per dimension, with search first. Tick values in a panel: nothing applies until Done. Clicking away drops the ticks. Department has 9 values, so it has Select all.',
    render: () => <DefaultExample />,
    code: `const department = { key: 'department', label: 'Department', selectAll: true, options: [/* 9 values */] };
const [value, setValue] = useState({});
const [text, setText] = useState('');

<Filters dimensions={[department, status, priority, region]} value={value} onValueChange={setValue} search searchValue={text} onSearchChange={setText} />`,
  },
  {
    id: 'tiered',
    title: 'Tiered exposure',
    description: 'Past about 8 dimensions: 4–6 primary triggers, chosen once for the view, and the rest behind "More filters", whose count totals them.',
    render: () => <TieredExample />,
    code: `<Filters dimensions={primary} moreDimensions={secondary} value={value} onValueChange={setValue} search />`,
  },
  {
    id: 'compact',
    title: 'Compact filter',
    description: 'When space is tight, whatever the dimension count: one "Filter" trigger lists every dimension; pick one to tick its values. Clear all in the list resets every dimension.',
    render: () => <CompactExample />,
    code: `<Filters variant="compact" dimensions={dimensions} value={value} onValueChange={setValue} />`,
  },
  {
    id: 'applied',
    title: 'Applied filters',
    description: 'Each applied value is a chip, the value alone. Past 5 the rest fold into "+N". × removes one; Clear all removes every one, and the tray goes.',
    render: () => <AppliedExample />,
    code: `<Filters dimensions={dimensions} value={value} onValueChange={setValue} />`,
  },
  {
    id: 'table',
    title: 'Above a table',
    description: 'It sits directly above the data it narrows. `align="table"` moves it 16px in, so the search box starts where the column text does. Here the rows follow the applied values and the search text.',
    render: () => <TableExample />,
    code: `<Card>
  <Filters align="table" dimensions={dimensions} value={value} onValueChange={setValue} search searchValue={text} onSearchChange={setText} searchPlaceholder="Search campaigns…" />
  <Table variant="embedded" label="Campaigns" columns={columns} rows={shown} getRowKey={(r) => r.id} />
</Card>`,
  },
  {
    id: 'no-tray',
    title: 'Without the tray',
    description: 'When the page shows the applied values elsewhere, turn the tray off: the bar then carries Clear All, in Red.',
    render: () => <NoTrayExample />,
    code: `<Filters dimensions={dimensions} value={value} onValueChange={setValue} showApplied={false} />`,
  },
  {
    id: 'disabled',
    title: 'Disabled',
    description: 'Everything at 40%, counts hidden. One dimension can be disabled on its own too.',
    render: () => (
      <div className="docs-stack">
        <Filters dimensions={primary.slice(0, 3)} search disabled defaultValue={{ status: ['active'] }} />
        <Filters dimensions={[primary[0], { ...primary[1], disabled: true }, primary[2]]} />
      </div>
    ),
    code: `<Filters dimensions={dimensions} search disabled />
<Filters dimensions={[department, { ...status, disabled: true }, priority]} />`,
  },
  {
    id: 'url',
    title: 'A shareable link',
    description: 'The DS keeps filters in the URL, so a filtered view is a link. The page owns the URL; two helpers turn the value into query parameters and back.',
    render: () => (
      <p className="docs-p docs-flush">
        A link ending <code>?department=marketing,finance&amp;status=active</code> opens with those filters applied, the tray showing at once.
      </p>
    ),
    code: `import { filtersFromSearchParams, filtersToSearchParams } from '@collabrium/ui';

const params = useSearchParams();
const router = useRouter();
const value = filtersFromSearchParams(params, dimensions);

<Filters
  dimensions={dimensions}
  value={value}
  onValueChange={(next) => router.replace('?' + filtersToSearchParams(next, new URLSearchParams(params)))}
/>`,
  },
];

export const props: DocsProp[] = [
  { name: 'dimensions', options: 'FilterDimension[]', default: 'required', description: '`{ key, label, options: { value, label }[], disabled?, selectAll? }`. `selectAll` pins a Select all row, for long lists (about 8 values or more). Default: a trigger each (the primary tier with `moreDimensions`). Compact: all of them.' },
  { name: 'variant', options: "'default' | 'compact'", default: "'default'", description: 'Compact when space is tight, whatever the count. Never both in one view.' },
  { name: 'moreDimensions', options: 'FilterDimension[]', default: '—', description: 'Default only: the secondary tier behind "More filters" (past about 8 dimensions).' },
  { name: 'value / defaultValue / onValueChange', options: 'FilterValue / (value) => void', default: '— / {} / —', description: '`{ [key]: optionValues[] }`. Changes on Done, a chip\'s ×, or Clear all; never on a tick.' },
  { name: 'search', options: 'boolean', default: 'false', description: 'The search box, first in the bar.' },
  { name: 'searchValue / defaultSearchValue / onSearchChange', options: 'string / (text) => void', default: "— / '' / —", description: 'The search text. Called on every change; debounce before querying.' },
  { name: 'searchPlaceholder / searchLabel', options: 'string', default: '"Search…" / "Search"', description: 'The placeholder and the accessible name.' },
  { name: 'showApplied', options: 'boolean', default: 'true', description: 'The applied tray. Off only when the page shows the values elsewhere; the bar then has Clear All.' },
  { name: 'align', options: "'edge' | 'table'", default: "'edge'", description: '`table` directly above an embedded Table: 16px in, lined up with the column text.' },
  { name: 'label', options: 'string', default: '"Filters"', description: 'Names the group.' },
  { name: 'disabled', options: 'boolean', default: 'false', description: 'Greys out everything; counts hide.' },
];

export const rules: DocsRules = {
  do: [
    'Put it directly above the table or list it narrows.',
    'Label each applied chip with the value alone ("Marketing"); the trigger says the dimension.',
    'Pick 4–6 primary dimensions once per view when there are more than about 8; the rest go behind "More filters".',
    'Keep the applied values in the URL so a filtered view can be shared.',
    'Give a long list (about 8 values or more) Select all; leave it off short ones.',
  ],
  dont: [
    'Don\'t apply a filter on a tick or a click away: only Done applies.',
    'Don\'t mix Compact filter with named triggers in one bar.',
    'Don\'t put an icon on a named trigger: only Compact\'s "Filter" has one.',
    'Don\'t reorder the primary tier by usage: a bar that rearranges itself is disorienting.',
  ],
};

export const accessibility: DocsAccessibility = {
  keyboard:
    'A named trigger works as Dropdown: Enter, Space or ↓ opens; ↑ ↓, Home and End move; Space or Enter ticks; type to jump; Tab goes to Clear and Done; Escape closes without applying. "Filter" and "More filters" open a list of dimensions to Tab through; Enter opens one (focus moves to Back), and its list takes ↑ ↓ and Space. A chip\'s × (or Delete) removes it and focus moves to the next ×.',
  notes: [
    'A group named "Filters"; the search box has a hidden "Search" label.',
    'A trigger with values is named with its count: "Department, 2 applied".',
    'The panel\'s list is a multi-select listbox named by its dimension; ticks are read as selected.',
    'Each chip\'s × is "Remove Department: Marketing". When the last chip goes, focus moves to the trigger that held it.',
    'Forced colours: an applied trigger\'s border is Highlight; the count keeps its pill.',
  ],
};

export const motion: DocsMotion[] = [
  { interaction: 'Panel opens / closes', motion: 'Fades and slides 4px.', token: '--duration-fast · --ease-standard' },
  { interaction: 'Tray, a new chip, a new count', motion: 'Fades in (a chip from 95%). Not on first paint: a restored view shows at once.', token: '--duration-fast' },
  { interaction: 'A chip or the tray leaves', motion: 'At once.', token: '—' },
  { interaction: 'Reduced motion', motion: 'Instant.', token: '—' },
];
