// Documentation for Pagination, rendered by the docs site (playground).
// Keep it consistent with Pagination.usage.md. Not part of the package build.
import { useState } from 'react';
import { Badge } from '../Badge';
import { Card } from '../Card';
import { Table, type TableColumn } from '../Table';
import { Pagination } from './Pagination';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../docs.types';

export const title = 'Pagination';

export const description =
  'The footer under a table or list. Under 10 pages, numbered buttons and the result count; from 10 pages, Prev, a page Dropdown, "of N" and Next, with an optional Rows per page. Hidden when everything fits on one page.';

export const usage = `import { Pagination } from '@collabrium/ui';

const [page, setPage] = useState(1);

<Pagination page={page} onPageChange={setPage} pageSize={20} totalResults={116} />`;

export const thumbnail = () => <Pagination defaultPage={3} pageSize={20} totalResults={116} />;

function DefaultExample() {
  const [page, setPage] = useState(3);
  return <Pagination page={page} onPageChange={setPage} pageSize={20} totalResults={116} />;
}

function EllipsisExample() {
  const [page, setPage] = useState(5);
  return <Pagination page={page} onPageChange={setPage} pageSize={20} totalResults={178} />;
}

function OverflowExample() {
  const [page, setPage] = useState(23);
  const [size, setSize] = useState(20);
  return (
    <Pagination page={page} onPageChange={setPage} pageSize={size} onPageSizeChange={setSize} totalResults={1532} />
  );
}

type Row = { id: string; name: string; status: 'Active' | 'Pending' | 'Failed'; budget: number };
const names = ['Back to school', 'Raya promo', 'App install push', 'Year-end clearance', 'Merdeka sale', 'CNY greetings'];
const statuses = ['Active', 'Pending', 'Failed'] as const;
const allRows: Row[] = Array.from({ length: 23 }, (_, i) => ({
  id: `r${i}`,
  name: `${names[i % names.length]} ${Math.floor(i / names.length) + 1}`,
  status: statuses[i % 3],
  budget: 4000 + ((i * 1370) % 18000),
}));
const tone = { Active: 'success', Pending: 'warning', Failed: 'error' } as const;
const columns: TableColumn<Row>[] = [
  { key: 'name', header: 'Campaign' },
  { key: 'status', header: 'Status', type: 'status', render: (r) => <Badge variant={tone[r.status]}>{r.status}</Badge> },
  { key: 'budget', header: 'Budget', type: 'number', render: (r) => `RM ${r.budget.toLocaleString('en-US', { minimumFractionDigits: 2 })}` },
];

function RowsExample() {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(20);
  return (
    <Pagination page={page} onPageChange={setPage} pageSize={size} onPageSizeChange={setSize} totalResults={116} />
  );
}

function TableExample() {
  const [page, setPage] = useState(1);
  const size = 5;
  const rows = allRows.slice((page - 1) * size, page * size);
  return (
    <Card>
      <Table variant="embedded" label="Campaigns" columns={columns} rows={rows} getRowKey={(r) => r.id} />
      <Pagination page={page} onPageChange={setPage} pageSize={size} totalResults={allRows.length} />
    </Card>
  );
}

export const anatomy: DocsAnatomyNode[] = [
  {
    name: 'Pagination',
    element: '<nav>.cui-pagination',
    description: 'A row under the content: 16px above, a 1px Neutral-3 line on top, space between its two ends. Centred on phones.',
    children: [
      { name: 'Result count', element: '.cui-pagination__count', when: 'default', description: 'Caption, Neutral-5: "Showing 41–60 of 116". Neutral-4 while the next page loads. Hidden on phones.' },
      { name: 'Prev / Next', element: '.cui-pagination__nav', when: 'default', description: '32px ghost icon buttons, caret Neutral-9; Neutral-4 and not-allowed at the ends.' },
      { name: 'Page number', element: '.cui-pagination__page', when: 'default', description: '32px, radius-sm, caption bold Neutral-5; hover and pressed Neutral-2; current Obsidian with white text, not clickable. Up to 7 slots with "…" for the gaps. Hidden on phones.' },
      { name: 'Indicator', element: '.cui-pagination__indicator', when: 'default, phones', description: '"3 of 6", caption bold Neutral-9, between Prev and Next.' },
      { name: 'Rows per page', element: '.cui-pagination__rows', when: 'onPageSizeChange', description: 'A caption label beside a Dropdown (10, 20, 50, 100), after the count in Default and on the left in Overflow. Hidden on phones.' },
      { name: 'Page picker', element: '.cui-pagination__picker', when: 'overflow', description: 'The current page as a Dropdown, its value in caption, then "of N" (caption, Neutral-5).' },
      { name: 'Prev / Next (text)', element: '.cui-pagination__text-nav', when: 'overflow', description: 'Caret and "Prev" / "Next", caption bold Neutral-9, ghost hover.' },
    ],
  },
];

export const examples: DocsExample[] = [
  {
    id: 'default',
    title: 'Default',
    description: 'Under 10 pages: the result count on the left, numbered pages on the right. The current page is the only filled one.',
    render: () => <DefaultExample />,
    code: `const [page, setPage] = useState(3);

<Pagination page={page} onPageChange={setPage} pageSize={20} totalResults={116} />`,
  },
  {
    id: 'ellipsis',
    title: 'More pages than slots',
    description: 'Seven slots at most: the first and last pages, the current one and its neighbours, and "…" for the rest.',
    render: () => <EllipsisExample />,
    code: `<Pagination page={page} onPageChange={setPage} pageSize={20} totalResults={178} />`,
  },
  {
    id: 'overflow',
    title: 'Overflow',
    description: 'From 10 pages it switches by itself: Prev, the page as a Dropdown, "of N" and Next. Rows per page shows when you pass `onPageSizeChange`; a new size goes back to page 1.',
    render: () => <OverflowExample />,
    code: `const [page, setPage] = useState(23);
const [size, setSize] = useState(20);

<Pagination page={page} onPageChange={setPage} pageSize={size} onPageSizeChange={setSize} totalResults={1532} />`,
  },
  {
    id: 'rows',
    title: 'Rows per page',
    description: 'Pass `onPageSizeChange` and Rows per page shows in either variant, so a bigger size never strands the reader. Pick 100 here: two pages left. It hides only when everything fits in the smallest size.',
    render: () => <RowsExample />,
    code: `const [page, setPage] = useState(1);
const [size, setSize] = useState(20);

<Pagination page={page} onPageChange={setPage} pageSize={size} onPageSizeChange={setSize} totalResults={116} />`,
  },
  {
    id: 'table',
    title: 'Under a table',
    description: 'It sits as the content\'s footer, its line on top.',
    render: () => <TableExample />,
    code: `<Card>
  <Table variant="embedded" label="Campaigns" columns={columns} rows={rows} getRowKey={(r) => r.id} />
  <Pagination page={page} onPageChange={setPage} pageSize={5} totalResults={23} />
</Card>`,
  },
  {
    id: 'loading',
    title: 'Loading and an unknown total',
    description: 'While the next page loads, the count stays, in Neutral-4; the controls stay live. Without a total, the count drops "of N".',
    render: () => (
      <div className="docs-stack">
        <Pagination defaultPage={2} pageSize={20} totalResults={116} loading />
        <Pagination defaultPage={1} pageSize={20} totalPages={4} />
      </div>
    ),
    code: `<Pagination page={page} onPageChange={setPage} pageSize={20} totalResults={116} loading />
<Pagination page={page} onPageChange={setPage} pageSize={20} totalPages={4} />`,
  },
];

export const props: DocsProp[] = [
  { name: 'page / defaultPage / onPageChange', options: 'number / (page) => void', default: '— / 1', description: 'The current page, 1-based. Update it at once on change, before the data arrives.' },
  { name: 'pageSize', options: 'number', default: '20', description: 'Rows per page.' },
  { name: 'totalResults', options: 'number', default: '—', description: 'All results. Leave out when unknown and give `totalPages`.' },
  { name: 'totalPages', options: 'number', default: 'from totalResults', description: 'The page count, when the total isn\'t known.' },
  { name: 'onPageSizeChange', options: '(size) => void', default: '—', description: 'Shows Rows per page, in both variants. A new size goes back to page 1.' },
  { name: 'pageSizeOptions', options: 'number[]', default: '[10, 20, 50, 100]', description: 'The Rows per page choices.' },
  { name: 'pageSizeStorageKey', options: 'string', default: '—', description: 'Remembers the chosen size in the browser under this key.' },
  { name: 'loading', options: 'boolean', default: 'false', description: 'The count shows the previous one, in Neutral-4.' },
  { name: 'label', options: 'string', default: '"Pagination"', description: 'Names the navigation landmark.' },
];

export const rules: DocsRules = {
  do: [
    'Put it directly under the table or list it pages.',
    'Move the current page at once on a click, before the data arrives.',
    'Use an en dash in the count: "Showing 41–60 of 116".',
    'Keep Prev and Next working while a page loads.',
  ],
  dont: [
    'Don\'t show it when everything fits on one page (it hides itself; with Rows per page, when everything fits the smallest size).',
    'Don\'t choose the variant yourself: it switches at 10 pages.',
    'Don\'t hide Prev or Next at the ends: they stay, disabled, so the row doesn\'t shift.',
  ],
};

export const accessibility: DocsAccessibility = {
  keyboard: 'Tab moves through Prev, each page and Next (the current page stays in the order and does nothing). The pickers are Dropdowns: Enter, Space or ↓ opens; arrows move; type a number to jump; Enter picks; Escape closes.',
  notes: [
    'A `<nav>` landmark named "Pagination".',
    'Numbers are "Page 3"; the current one is `aria-current="page"`. Prev and Next are "Previous page" and "Next page" (in Overflow, their visible "Prev" and "Next").',
    'The page picker is named "Current page, of 77"; Rows per page has its visible label.',
    'The "…" is hidden from screen readers.',
  ],
};

export const motion: DocsMotion[] = [
  { interaction: 'Hover, press', motion: 'Fill and text colour.', token: '--duration-fast · --ease-standard' },
  { interaction: 'Result count update', motion: 'None: it changes at once.', token: '—' },
  { interaction: 'Reduced motion', motion: 'Instant.', token: '—' },
];
