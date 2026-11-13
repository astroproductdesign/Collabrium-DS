// Documentation for Table, rendered by the docs site (playground).
// Keep it consistent with Table.usage.md. Not part of the package build.
import { useEffect, useRef, useState } from 'react';
import { Archive, DotsThree, DownloadSimple, MegaphoneSimple, PencilSimple, Trash } from '@phosphor-icons/react';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { Card, CardHeader } from '../Card';
import { EmptyState } from '../EmptyState';
import { Table, type TableColumn } from './Table';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../docs.types';

export const title = 'Table';

export const description =
  'Rows and columns of data: standalone, as its own bordered surface, or embedded inside a Card. Every column sorts by default; checkboxes with a bulk toolbar, row actions, frozen columns, a loading skeleton, an empty state and a sticky header are opt-in.';

export const usage = `import { Badge, Table, type TableColumn } from '@collabrium/ui';

const columns: TableColumn<Campaign>[] = [
  { key: 'name', header: 'Campaign' },
  { key: 'status', header: 'Status', type: 'status', render: (c) => <Badge variant={tone[c.status]}>{c.status}</Badge> },
  { key: 'launched', header: 'Launched', type: 'date', render: (c) => c.launchedLabel },
  { key: 'budget', header: 'Budget', type: 'number', render: (c) => \`RM \${c.budget.toLocaleString('en-US', { minimumFractionDigits: 2 })}\` },
];

<Table label="Campaigns" columns={columns} rows={campaigns} getRowKey={(c) => c.id} />`;

type Campaign = {
  id: string;
  name: string;
  channel: string;
  status: 'Active' | 'Pending' | 'Failed';
  launched: string;
  launchedLabel: string;
  end: string;
  impressions: number;
  clicks: number;
  ctr: number;
  budget: number;
};

const campaigns: Campaign[] = [
  { id: 'c1', name: 'Back to school', channel: 'Search', status: 'Active', launched: '2026-07-01', launchedLabel: '1 Jul 2026', end: '31 Aug 2026', impressions: 482300, clicks: 9140, ctr: 1.9, budget: 12000 },
  { id: 'c2', name: 'Raya promo', channel: 'Social', status: 'Pending', launched: '2026-08-02', launchedLabel: '2 Aug 2026', end: '20 Aug 2026', impressions: 210900, clicks: 5320, ctr: 2.5, budget: 8500 },
  { id: 'c3', name: 'App install push', channel: 'Display', status: 'Failed', launched: '2026-06-18', launchedLabel: '18 Jun 2026', end: '25 Jun 2026', impressions: 96000, clicks: 1080, ctr: 1.1, budget: 4200 },
  { id: 'c4', name: 'Year-end clearance', channel: 'Search', status: 'Active', launched: '2026-05-20', launchedLabel: '20 May 2026', end: '30 Jun 2026', impressions: 351200, clicks: 7020, ctr: 2.0, budget: 21000 },
];

const tone = { Active: 'success', Pending: 'warning', Failed: 'error' } as const;
// Money with 2 decimals, as every amount in the library.
const rm = (n: number) => `RM ${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const columns: TableColumn<Campaign>[] = [
  { key: 'name', header: 'Campaign' },
  { key: 'status', header: 'Status', type: 'status', render: (c) => <Badge variant={tone[c.status]}>{c.status}</Badge> },
  { key: 'launched', header: 'Launched', type: 'date', render: (c) => c.launchedLabel },
  { key: 'budget', header: 'Budget', type: 'number', render: (c) => rm(c.budget) },
];

const wideColumns: TableColumn<Campaign>[] = [
  { key: 'name', header: 'Campaign' },
  { key: 'channel', header: 'Channel' },
  { key: 'status', header: 'Status', type: 'status', render: (c) => <Badge variant={tone[c.status]}>{c.status}</Badge> },
  { key: 'launched', header: 'Start', type: 'date', render: (c) => c.launchedLabel },
  { key: 'end', header: 'End', type: 'date', sortable: false },
  { key: 'impressions', header: 'Impressions', type: 'number', render: (c) => c.impressions.toLocaleString('en-US') },
  { key: 'clicks', header: 'Clicks', type: 'number', render: (c) => c.clicks.toLocaleString('en-US') },
  { key: 'ctr', header: 'CTR', type: 'number', render: (c) => `${c.ctr.toFixed(1)}%` },
  { key: 'budget', header: 'Spend', type: 'number', render: (c) => rm(c.budget) },
];

// The total row: sums for counts and money, the overall rate for CTR (never a sum of percentages).
const rm2 = (n: number) => `RM ${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const sum = (rows: Campaign[], pick: (c: Campaign) => number) => rows.reduce((t, c) => t + pick(c), 0);
const totalColumns: TableColumn<Campaign>[] = [
  { key: 'name', header: 'Campaign' },
  { key: 'channel', header: 'Channel' },
  { key: 'impressions', header: 'Impressions', type: 'number', render: (c) => c.impressions.toLocaleString('en-US'), total: (rows) => sum(rows, (c) => c.impressions).toLocaleString('en-US') },
  { key: 'clicks', header: 'Clicks', type: 'number', render: (c) => c.clicks.toLocaleString('en-US'), total: (rows) => sum(rows, (c) => c.clicks).toLocaleString('en-US') },
  { key: 'ctr', header: 'CTR', type: 'number', render: (c) => `${c.ctr.toFixed(1)}%`, total: (rows) => `${((sum(rows, (c) => c.clicks) / sum(rows, (c) => c.impressions)) * 100).toFixed(1)}%` },
  { key: 'budget', header: 'Spend', type: 'number', render: (c) => rm2(c.budget), total: (rows) => rm2(sum(rows, (c) => c.budget)) },
];

const noop = () => {};
const rowActions: [{ label: string; icon: typeof PencilSimple; onClick: () => void }, { label: string; icon: typeof DotsThree; onClick: () => void }] = [
  { label: 'Edit', icon: PencilSimple, onClick: noop },
  { label: 'More options', icon: DotsThree, onClick: noop },
];

export const thumbnail = () => (
  <Table label="Campaigns" columns={columns.slice(0, 3)} rows={campaigns.slice(0, 3)} getRowKey={(c) => c.id} />
);

function SelectionExample() {
  const [selected, setSelected] = useState<string[]>(['c2', 'c3']);
  return (
    <Table
      label="Campaigns"
      columns={columns}
      rows={campaigns}
      getRowKey={(c) => c.id}
      selectable
      selectedKeys={selected}
      onSelectionChange={setSelected}
      bulkActions={[
        { label: 'Export', icon: DownloadSimple, onClick: noop },
        { label: 'Archive', icon: Archive, onClick: noop },
        { label: 'Delete', icon: Trash, onClick: noop, tone: 'danger' },
      ]}
      rowActions={rowActions}
    />
  );
}

function LoadingExample() {
  const [loading, setLoading] = useState(true);
  return (
    <div className="docs-stack">
      <div>
        <Button variant="secondary" size="sm" onClick={() => setLoading((l) => !l)}>
          {loading ? 'Finish loading' : 'Load again'}
        </Button>
      </div>
      <Table label="Campaigns" columns={columns} rows={loading ? [] : campaigns} getRowKey={(c) => c.id} loading={loading} />
    </div>
  );
}

function RowClickExample() {
  const [opened, setOpened] = useState<string | null>(null);
  return (
    <div className="docs-stack">
      <Table label="Campaigns" columns={columns} rows={campaigns} getRowKey={(c) => c.id} onRowClick={(c) => setOpened(c.name)} />
      <p className="docs-readout">{opened ? `Opened ${opened}` : 'Press a row, or Tab to a campaign name and press Enter.'}</p>
    </div>
  );
}

// Wider still: checkboxes, ten content columns and actions, so all three frozen columns show.
const scrollColumns: TableColumn<Campaign>[] = [
  ...wideColumns,
  { key: 'cpc', header: 'Cost per click', type: 'number', render: (c) => rm(Math.round((c.budget / c.clicks) * 100) / 100) },
];

function ScrollBothWaysExample() {
  const ref = useRef<HTMLDivElement>(null);
  // Start scrolled halfway, so there's content under both edges and both shadows show.
  useEffect(() => {
    const scroller = ref.current?.querySelector<HTMLElement>('.cui-table__scroll');
    if (scroller) scroller.scrollLeft = (scroller.scrollWidth - scroller.clientWidth) / 2;
  }, []);
  return (
    <Table
      ref={ref}
      label="Campaign performance, all columns"
      columns={scrollColumns}
      rows={campaigns}
      getRowKey={(c) => c.id}
      selectable
      defaultSelectedKeys={['c2']}
      rowActions={rowActions}
    />
  );
}

const manyRows: Campaign[] = Array.from({ length: 14 }, (_, i) => ({ ...campaigns[i % 4], id: `m${i}`, name: `${campaigns[i % 4].name} ${i + 1}` }));

export const anatomy: DocsAnatomyNode[] = [
  {
    name: 'Table',
    element: '<div>.cui-table',
    description: 'Standalone: 1px Neutral-3, radius-lg, Neutral-1, clipping the header to its corners. Embedded: no container of its own.',
    children: [
      { name: 'Bulk toolbar', element: '.cui-table__bulk', when: 'standalone + rows selected', description: 'Over the header labels (never the header checkbox): "N selected" (label2 bold) and up to 3 ghost buttons, Danger in Red.' },
      {
        name: 'Scroll box',
        element: '.cui-table__scroll',
        description: 'Scrolls sideways when the columns don\'t fit (600px wide on phones); with `stickyHeader`, also down, inside `maxHeight`.',
        children: [
          { name: 'Header cell', element: '<th>.cui-table__th', description: 'Standalone h5 (16px / 700) Neutral-9 on Neutral-2; embedded label3 uppercase Neutral-5. 12px 16px padding, 1px Neutral-3 under. A sortable one holds a button and a 14px arrows icon (Neutral-4; Neutral-9 when sorted).' },
          { name: 'Checkbox column', element: '[data-col="select"]', when: 'selectable', description: 'First, frozen left. The header box selects all (checked, mixed, none); a row\'s box shows on hover, focus, or while any row is checked.' },
          { name: 'Body cell', element: '<td>.cui-table__td', description: 'body2 (14px / 20px / 500), Neutral-9, left-aligned, 1px Neutral-3 under (none on the last row). Numbers get tabular figures.' },
          { name: 'Total row', element: '<tfoot>.cui-table__total', when: 'a column has total', description: 'Under the body: "Total" in the first column (a row header), each column\'s total in body2 bold, a 1px Neutral-3 line above, Neutral-2 fill in both variants. Stays at the bottom with a sticky header.' },
          { name: 'Action column', element: '[data-col="actions"]', when: 'rowActions', description: 'Last, frozen right, always visible: 1–3 ghost icon buttons sm, 4px apart. Its header is empty.' },
        ],
      },
    ],
  },
];

export const examples: DocsExample[] = [
  {
    id: 'standalone',
    title: 'Standalone',
    description: 'The table is the surface. Every column sorts: press a header for ascending, again for descending, a third time to clear.',
    render: () => <Table label="Campaigns" columns={columns} rows={campaigns} getRowKey={(c) => c.id} />,
    code: `<Table label="Campaigns" columns={columns} rows={campaigns} getRowKey={(c) => c.id} />`,
  },
  {
    id: 'embedded',
    title: 'Embedded',
    description: 'Inside a Card or panel: no container of its own, and small uppercase headers.',
    render: () => (
      <Card>
        <CardHeader title="Top campaigns" />
        <Table variant="embedded" label="Top campaigns" columns={columns} rows={campaigns.slice(0, 3)} getRowKey={(c) => c.id} />
      </Card>
    ),
    code: `<Card>
  <CardHeader title="Top campaigns" />
  <Table variant="embedded" label="Top campaigns" columns={columns} rows={campaigns.slice(0, 3)} getRowKey={(c) => c.id} />
</Card>`,
  },
  {
    id: 'selection',
    title: 'Checkbox selection and row actions',
    description: 'Opt-in. While rows are checked, the toolbar covers the header labels; the header checkbox stays, and clears the selection. Row actions are always visible.',
    render: () => <SelectionExample />,
    code: `const [selected, setSelected] = useState<string[]>(['c2', 'c3']);

<Table
  label="Campaigns"
  columns={columns}
  rows={campaigns}
  getRowKey={(c) => c.id}
  selectable
  selectedKeys={selected}
  onSelectionChange={setSelected}
  bulkActions={[
    { label: 'Export', icon: DownloadSimple, onClick: exportRows },
    { label: 'Archive', icon: Archive, onClick: archiveRows },
    { label: 'Delete', icon: Trash, onClick: deleteRows, tone: 'danger' },
  ]}
  rowActions={[
    { label: 'Edit', icon: PencilSimple, onClick: edit },
    { label: 'More options', icon: DotsThree, onClick: more },
  ]}
/>`,
  },
  {
    id: 'scroll',
    title: 'Horizontal scrolling',
    description: 'When the columns don\'t fit, the table scrolls sideways; the first column and the actions stay put, with a shadow on the side that has content under it. "End" has no sort (an example of turning it off).',
    render: () => <Table label="Campaign performance" columns={wideColumns} rows={campaigns.slice(0, 3)} getRowKey={(c) => c.id} rowActions={rowActions} />,
    code: `<Table label="Campaign performance" columns={wideColumns} rows={campaigns} getRowKey={(c) => c.id} rowActions={rowActions} />`,
  },
  {
    id: 'scroll-both',
    title: 'Scrolling left and right',
    description: 'With checkboxes and more columns than fit, the table scrolls both ways: the checkbox and Campaign stay on the left, the actions on the right, and each side shows a shadow while there is content scrolled under it. This one starts halfway, so both shadows show; scroll to either end and that side\'s shadow goes.',
    render: () => <ScrollBothWaysExample />,
    code: `<Table
  label="Campaign performance, all columns"
  columns={scrollColumns}
  rows={campaigns}
  getRowKey={(c) => c.id}
  selectable
  defaultSelectedKeys={['c2']}
  rowActions={rowActions}
/>`,
  },
  {
    id: 'total',
    title: 'Total row',
    description: 'A row under the body that sums the columns given a `total`, from every row; the first column says "Total". Bold, with a line above and a light grey (Neutral-2) fill, in both variants. Sorting leaves it at the bottom. Use the overall rate for a percentage, never a sum of percentages.',
    render: () => (
      <div className="docs-stack">
        <Table label="Campaign totals" columns={totalColumns} rows={campaigns} getRowKey={(c) => c.id} />
        <Card>
          <CardHeader title="Spend by campaign" />
          <Table variant="embedded" label="Spend by campaign" columns={totalColumns} rows={campaigns} getRowKey={(c) => c.id} />
        </Card>
      </div>
    ),
    code: `const totalColumns: TableColumn<Campaign>[] = [
  { key: 'name', header: 'Campaign' },
  { key: 'channel', header: 'Channel' },
  { key: 'impressions', header: 'Impressions', type: 'number', render: (c) => c.impressions.toLocaleString('en-US'), total: (rows) => sum(rows, (c) => c.impressions).toLocaleString('en-US') },
  { key: 'clicks', header: 'Clicks', type: 'number', render: (c) => c.clicks.toLocaleString('en-US'), total: (rows) => sum(rows, (c) => c.clicks).toLocaleString('en-US') },
  { key: 'ctr', header: 'CTR', type: 'number', render: (c) => \`\${c.ctr.toFixed(1)}%\`, total: (rows) => \`\${((sum(rows, (c) => c.clicks) / sum(rows, (c) => c.impressions)) * 100).toFixed(1)}%\` },
  { key: 'budget', header: 'Spend', type: 'number', render: (c) => rm2(c.budget), total: (rows) => rm2(sum(rows, (c) => c.budget)) },
];

<Table label="Campaign totals" columns={totalColumns} rows={campaigns} getRowKey={(c) => c.id} />
<Card>
  <CardHeader title="Spend by campaign" />
  <Table variant="embedded" label="Spend by campaign" columns={totalColumns} rows={campaigns} getRowKey={(c) => c.id} />
</Card>`,
  },
  {
    id: 'row-click',
    title: 'Row click',
    description: 'A press anywhere on a row opens it; from the keyboard, the first column is a button.',
    render: () => <RowClickExample />,
    code: `<Table label="Campaigns" columns={columns} rows={campaigns} getRowKey={(c) => c.id} onRowClick={(c) => open(c.id)} />`,
  },
  {
    id: 'loading',
    title: 'Loading',
    description: 'Three skeleton rows after 300ms (a fast load never flashes them), left-aligned in every column; the rows fade in after.',
    render: () => <LoadingExample />,
    code: `<Table label="Campaigns" columns={columns} rows={rows} getRowKey={(c) => c.id} loading={loading} />`,
  },
  {
    id: 'empty',
    title: 'Empty',
    description: 'No data: a section Empty state. Filters found nothing: an inline one. The body keeps at least 240px.',
    render: () => (
      <div className="docs-stack">
        <Table
          label="Campaigns"
          columns={columns}
          rows={[]}
          getRowKey={(c) => c.id}
          empty={
            <EmptyState variant="section" icon={MegaphoneSimple} heading="No campaigns yet" primaryAction={{ label: 'New campaign', onClick: noop }}>
              Campaigns you create appear here.
            </EmptyState>
          }
        />
        <Table label="Campaigns" columns={columns} rows={[]} getRowKey={(c) => c.id} empty={<EmptyState variant="inline">No campaigns match your filters.</EmptyState>} />
      </div>
    ),
    code: `<Table
  label="Campaigns"
  columns={columns}
  rows={[]}
  getRowKey={(c) => c.id}
  empty={
    <EmptyState variant="section" icon={MegaphoneSimple} heading="No campaigns yet" primaryAction={{ label: 'New campaign', onClick: create }}>
      Campaigns you create appear here.
    </EmptyState>
  }
/>
<Table label="Campaigns" columns={columns} rows={[]} getRowKey={(c) => c.id} empty={<EmptyState variant="inline">No campaigns match your filters.</EmptyState>} />`,
  },
  {
    id: 'sticky',
    title: 'Sticky header',
    description: 'Standalone, opt-in: the table scrolls inside its own box and the header stays, with a shadow once a row has scrolled under it.',
    render: () => <Table label="All campaigns" columns={columns} rows={manyRows} getRowKey={(c) => c.id} stickyHeader maxHeight={320} />,
    code: `<Table label="All campaigns" columns={columns} rows={rows} getRowKey={(c) => c.id} stickyHeader maxHeight={320} />`,
  },
];

export const props: DocsProp[] = [
  { name: 'label', options: 'string', default: '—', required: true, description: 'Names the table for screen readers.' },
  { name: 'columns', options: 'TableColumn[]', default: '—', required: true, description: '`key`, `header`, `type`, `render`, `sortValue`, `sortable` (default true), `priority`, `icon`.' },
  { name: 'rows / getRowKey', options: 'T[] / (row) => string', default: '—', required: true, description: 'The data and a stable key per row.' },
  { name: 'variant', options: "'standalone' | 'embedded'", default: "'standalone'", description: 'Its own surface, or inside a Card or panel.' },
  { name: 'getRowLabel', options: '(row) => string', default: 'first column', description: 'The row\'s name, read with its checkbox and actions.' },
  { name: 'onRowClick', options: '(row) => void', default: '—', description: 'Opens a row: a press on it, or Enter on its first column.' },
  { name: 'selectable', options: 'boolean', default: 'false', description: 'Adds the checkbox column.' },
  { name: 'selectedKeys / defaultSelectedKeys / onSelectionChange', options: 'string[] / (keys) => void', default: '—', description: 'The checked rows.' },
  { name: 'bulkActions', options: 'up to 3 { label, icon?, onClick(keys), tone? }', default: '—', description: 'Standalone: the toolbar while rows are checked.' },
  { name: 'rowActions', options: 'up to 3 { label, icon, onClick(row) }', default: '—', description: 'Ghost icon buttons in the last column, on every row.' },
  { name: 'sort / defaultSort / onSortChange', options: '{ key, direction } | null', default: 'null', description: 'One sort at a time.' },
  { name: 'manualSort', options: 'boolean', default: 'false', description: 'Keep the rows\' order: sort on the server.' },
  { name: 'loading', options: 'boolean', default: 'false', description: 'Skeleton rows after 300ms.' },
  { name: 'empty', options: 'ReactNode', default: '—', description: 'Shown when there are no rows: an EmptyState.' },
  { name: 'stickyHeader / maxHeight', options: 'boolean / number', default: 'false / 480', description: 'Standalone: scrolls inside its box with the header held.' },
  { name: 'column total / totalLabel', options: '(rows) => ReactNode / string', default: '— / "Total"', description: 'Adds the total row: each column\'s `total` from every row; the label sits in the first column.' },
];

export const rules: DocsRules = {
  do: [
    'Use Standalone for a table that is the page\'s surface, Embedded inside a Card or panel; never mix their headers.',
    'Keep every column left-aligned, numbers included (they get tabular figures).',
    'Leave sorting on; turn it off only for a column with no meaningful order.',
    'Add checkboxes only where selecting several rows is a real task.',
    'Keep header labels short.',
  ],
  dont: [
    'Don\'t go past about 8–10 visible columns before scrolling or hiding columns by priority.',
    'Don\'t hide row actions until hover: they are always shown.',
    'Don\'t collapse a table into cards on phones: it scrolls sideways.',
    'Don\'t add a cell icon by default: only where it identifies something.',
    'Don\'t add a separate "Clear selection": the header checkbox clears it.',
  ],
};

export const accessibility: DocsAccessibility = {
  keyboard: 'Tab reaches each sortable header (Enter or Space sorts), each checkbox (Space checks), the first column\'s button when rows open (Enter), and each row action.',
  notes: [
    'A real `<table>` named by `label`; headers are column headers, and the sorted one says so (`aria-sort`).',
    'Checkboxes are named "Select all rows" and "Select <row>"; actions "<Action>, <row>". The action column\'s header is empty on screen and named "Actions" for screen readers.',
    'A row\'s hidden checkbox shows when it takes focus.',
    'While loading, the table is marked busy and the skeleton is hidden from screen readers.',
  ],
};

export const motion: DocsMotion[] = [
  { interaction: 'Row hover', motion: 'Neutral-2 fill.', token: '--duration-fast · --ease-standard' },
  { interaction: 'Row checkbox appears', motion: 'Fades in.', token: '--duration-fast · --ease-standard' },
  { interaction: 'Bulk toolbar', motion: 'Fades in and drops 4px.', token: '--duration-fast · --ease-standard' },
  { interaction: 'Skeleton', motion: 'Progress Bar\'s shimmer; static under reduced motion.', token: '--duration-ambient' },
  { interaction: 'Rows after loading', motion: 'Fade in.', token: '--duration-fast · --ease-standard' },
];
