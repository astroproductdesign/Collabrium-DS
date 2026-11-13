// Documentation for PageHeader, rendered by the docs site (playground).
// Keep it consistent with PageHeader.usage.md. Not part of the package build.
import { DownloadSimple } from '@phosphor-icons/react';
import { PageHeader } from './PageHeader';
import { BackButton } from '../BackButton';
import { Button } from '../Button';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsProp, DocsRules } from '../docs.types';

export const title = 'PageHeader';

export const description =
  'The page-level title block at the top of a view: a title, an optional subtitle and an optional row of actions on the right. Flush in the layout, with no fill, border or padding of its own.';

export const usage = `import { PageHeader } from '@collabrium/ui';

export function DashboardHeader() {
  return <PageHeader title="Campaign Dashboard" subtitle="Track performance across every active campaign in one place." />;
}`;

const noop = () => {};

export const thumbnail = () => <PageHeader title="Campaign Dashboard" subtitle="Track every active campaign." headingLevel={2} />;

export const anatomy: DocsAnatomyNode[] = [
  {
    name: 'PageHeader',
    element: '<div>.cui-page-header',
    description: 'No fill, border or padding: flush in the page layout.',
    children: [
      {
        name: 'Row',
        element: '.cui-page-header__row',
        description: 'The text on the left and the actions on the right, at least 16px apart, aligned to the top.',
        children: [
          { name: 'Title', element: 'h1.cui-page-header__title', description: 'h1: 32/38, 800, Neutral-9; 40/56 from 1280px.' },
          { name: 'Subtitle', element: 'p.cui-page-header__subtitle', when: 'subtitle', description: 'body2: 14/20, 400, Neutral-5; 8px under the title.' },
          { name: 'Actions', element: '.cui-page-header__actions', when: 'actions', description: 'Real Buttons, 8px apart (`--element-gap`).' },
        ],
      },
    ],
  },
];

export const examples: DocsExample[] = [
  {
    id: 'default',
    title: 'Default and with subtitle',
    description: 'The title alone, or with one line of context under it.',
    render: () => (
      <div className="docs-stack">
        <PageHeader title="Campaign Dashboard" headingLevel={2} />
        <PageHeader title="Campaign Dashboard" subtitle="Track performance across every active campaign in one place." headingLevel={2} />
      </div>
    ),
    code: `<PageHeader title="Campaign Dashboard" />
<PageHeader title="Campaign Dashboard" subtitle="Track performance across every active campaign in one place." />`,
  },
  {
    id: 'actions',
    title: 'With actions',
    description: 'Page-wide actions on the right, 8px apart, as App Shell\'s page header uses them. When they don\'t fit beside the title (a phone), they move to their own line under it.',
    render: () => (
      <PageHeader
        title="Overview"
        subtitle="Here's what you've used across your projects."
        headingLevel={2}
        actions={
          <Button variant="primary" size="sm" leadingIcon={DownloadSimple} onClick={noop}>
            Export
          </Button>
        }
      />
    ),
    code: `<PageHeader
  title="Overview"
  subtitle="Here's what you've used across your projects."
  actions={<Button variant="primary" size="sm" leadingIcon={DownloadSimple}>Export</Button>}
/>`,
  },
  {
    id: 'back',
    title: 'Under a Back button',
    description: 'On a Level 2+ screen the Back button sits above the header, 12px from the title, never inside it.',
    render: () => (
      <div>
        <BackButton label="Reports" onClick={noop} />
        <PageHeader title="Q3 marketing report" headingLevel={2} />
      </div>
    ),
    code: `<BackButton label="Reports" href="/reports" />
<PageHeader title="Q3 marketing report" />`,
  },
];

export const props: DocsProp[] = [
  { name: 'title', options: 'ReactNode', default: '—', required: true, description: 'The page\'s title. One per view.' },
  { name: 'subtitle', options: 'ReactNode', default: '—', description: 'A line under the title: body2, Neutral-5.' },
  { name: 'actions', options: 'ReactNode', default: '—', description: 'Real Buttons, right-aligned beside the title, 8px apart.' },
  { name: 'headingLevel', options: '1 | 2 | 3', default: '1', description: 'The title\'s level. 2 or 3 only for a panel inside a page with its own h1. The look is always h1.' },
  { name: 'id, aria-*, data-*', options: 'native', default: '—', description: 'Passed to the root `<div>`. `style` and `className` are not accepted. The ref is forwarded to it.' },
];

export const rules: DocsRules = {
  do: [
    'Use one PageHeader per view, as its title.',
    'Build actions from real Buttons.',
    'Put a Back button above it on Level 2+ screens.',
  ],
  dont: [
    'Don\'t use it for a card or section header.',
    'Don\'t give it a border, fill or divider: those belong to the page layout.',
    'Don\'t put the Back button inside it.',
  ],
};

export const accessibility: DocsAccessibility = {
  keyboard: 'None of its own; its actions are Buttons.',
  notes: [
    'The title is a real heading, `h1` by default, so the page\'s outline starts with it. (The examples here use `h2`, as this page already has its own `h1`.)',
    'Actions follow the title in reading order.',
  ],
};

export const motion = 'None. PageHeader doesn\'t animate.';
