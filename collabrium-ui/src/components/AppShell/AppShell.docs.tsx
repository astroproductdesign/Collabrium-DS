// Documentation for AppShell, rendered by the docs site (playground).
// Keep it consistent with AppShell.usage.md. Not part of the package build.
import { useState } from 'react';
import { ChartBar, CurrencyCircleDollar, DownloadSimple, Gear, House, Megaphone, SignOut, UsersThree } from '@phosphor-icons/react';
import { AppShell, ContentGrid, ContentGridItem } from './AppShell';
import { BackButton } from '../BackButton';
import { Button } from '../Button';
import { Card, CardHeader } from '../Card';
import { PageHeader } from '../PageHeader';
import { SidebarNav, type SidebarNavSection } from '../SidebarNav';
import { StatCard, StatGrid } from '../StatCard';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../docs.types';

export const title = 'App Shell';

export const description =
  'The frame every screen sits in: the warm canvas, the main nav inset 16px from the window, and the content region beside it, the only part that scrolls, with the page header at its top. No top bar. Below 1024px the nav is collapsed; on phones it floats over the content as a card and the boxes stack.';

export const usage = `import { AppShell, ContentGrid, ContentGridItem, PageHeader, SidebarNav } from '@collabrium/ui';

export default function Layout({ children }) {
  return (
    <AppShell
      nav={<SidebarNav sections={sections} activeId="home" user={user} userMenu={userMenu} />}
      header={<PageHeader title="Overview" />}
    >
      <ContentGrid>
        <ContentGridItem span={3}>…</ContentGridItem>
        <ContentGridItem span={1}>…</ContentGridItem>
      </ContentGrid>
    </AppShell>
  );
}`;

// The docs pages live one folder down (components/<slug>), next to the site's copies of the DLS logo library.
const A = '../';
const noop = () => {};

const sections: SidebarNavSection[] = [
  {
    id: 'workspace',
    label: 'Workspace',
    items: [
      { id: 'overview', label: 'Overview', icon: House },
      { id: 'campaigns', label: 'Campaigns', icon: Megaphone, count: 4 },
      { id: 'spend', label: 'Spend', icon: CurrencyCircleDollar },
      { id: 'reports', label: 'Reports', icon: ChartBar },
    ],
  },
  {
    id: 'general',
    label: 'General',
    items: [
      { id: 'team', label: 'Team', icon: UsersThree },
      { id: 'settings', label: 'Settings', icon: Gear },
    ],
  },
];
const user = { name: 'Bryan Wong', role: 'Head of Revenue', email: 'bryan.wong@example.com' };
const userMenu = [{ id: 'logout', label: 'Log out', icon: SignOut }];

function Nav({ active = 'overview' }: { active?: string }) {
  const [id, setId] = useState<string | null>(active);
  return (
    <SidebarNav
      logo={{ kind: 'live', src: `${A}logo.html`, markSrc: `${A}logo-mark.html` }}
      sections={sections}
      activeId={id}
      onActiveChange={setId}
      user={user}
      userMenu={userMenu}
    />
  );
}

const navCode = `<SidebarNav
  logo={{ kind: 'live', src: '/logo.html', markSrc: '/logo-mark.html' }}
  sections={sections}
  activeId="overview"
  user={user}
  userMenu={userMenu}
/>`;

function Overview() {
  return (
    <>
      <ContentGrid>
        <ContentGridItem span={4}>
          <StatGrid>
            <StatCard label="Est. spend" value="$85.87" icon={CurrencyCircleDollar} trend={{ direction: 'up', value: '12.4%', period: 'vs last month' }} />
            <StatCard label="Active projects" value="3" trend={{ direction: 'flat', value: 'No change' }} />
          </StatGrid>
        </ContentGridItem>
        <ContentGridItem span={3}>
          <Card>
            <CardHeader title="Usage by project" headingLevel={3} />
            <p>This box spans 3 of the 4 columns. The region has no fill of its own: the card carries the white against the canvas.</p>
          </Card>
        </ContentGridItem>
        <ContentGridItem span={1}>
          <Card>
            <CardHeader title="Quick note" headingLevel={3} />
            <p>1 column, less content: it stretches to the 3-column box's height.</p>
          </Card>
        </ContentGridItem>
      </ContentGrid>
    </>
  );
}

export const thumbnail = () => (
  <div className="docs-shell docs-shell--thumb">
    <AppShell fit="container" nav={<Nav />} header={<PageHeader title="Overview" headingLevel={2} />}>
      <Overview />
    </AppShell>
  </div>
);

export const anatomy: DocsAnatomyNode[] = [
  {
    name: 'AppShell',
    element: '<div>.cui-app-shell',
    description: 'The warm canvas (`--color-canvas-warm`), the window\'s full height (`fit="container"`: its parent\'s).',
    children: [
      {
        name: 'Nav slot',
        element: '.cui-app-shell__nav',
        description: 'Holds the SidebarNav, unmodified, 16px from the top, left and bottom. Below 1024px the rail is collapsed; at 768px and under it floats over the content, 16px from the top and left.',
      },
      {
        name: 'Main column',
        element: '.cui-app-shell__main',
        description: 'Everything to the right of the nav.',
        children: [
          {
            name: 'Content region',
            element: '<main>.cui-app-shell__content',
            description: 'The only part that scrolls. 48px top, 32px sides and bottom; 120px top below 768px, clear of the collapsed card.',
            children: [
              { name: 'Header', element: '.cui-app-shell__header', when: 'header', description: 'The PageHeader (a BackButton above it on Level 2+), 48px above the content.' },
              { name: 'Regions', element: 'children', description: 'Stacked 48px apart (`--section-gap`). Full width, or 1200px centred with `width="reading"`.' },
            ],
          },
        ],
      },
      { name: 'Back to top', element: '.cui-back-to-top', when: 'backToTop', description: 'Scrolls the content region.' },
    ],
  },
  {
    name: 'ContentGrid',
    element: '<div>.cui-content-grid',
    description: '4 equal columns, 16px between boxes (or 20px), 24px between rows; one column at 768px and under.',
    children: [{ name: 'ContentGridItem', element: '.cui-content-grid__item', description: 'One box, spanning 1 to 4 columns; it stretches to the row\'s tallest.' }],
  },
];

export const examples: DocsExample[] = [
  {
    id: 'overview',
    title: 'A dashboard screen',
    description: 'The nav on the left; the page header at the top of the content, with its actions on the right; a stat row and two boxes on the grid, 3 + 1 columns, the same height. Turn on Mobile width: the nav floats over the content as a card collapsed to its logo, and the boxes stack.',
    render: () => (
      <div className="docs-shell">
        <AppShell
          fit="container"
          nav={<Nav />}
          header={
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
          }
        >
          <Overview />
        </AppShell>
      </div>
    ),
    code: `<AppShell
  nav={${navCode.replace(/\n/g, '\n  ')}}
  header={
    <PageHeader
      title="Overview"
      subtitle="Here's what you've used across your projects."
      actions={<Button variant="primary" size="sm" leadingIcon={DownloadSimple}>Export</Button>}
    />
  }
>
  <ContentGrid>
    <ContentGridItem span={4}>
      <StatGrid>
        <StatCard label="Est. spend" value="$85.87" icon={CurrencyCircleDollar} trend={{ direction: 'up', value: '12.4%', period: 'vs last month' }} />
        <StatCard label="Active projects" value="3" trend={{ direction: 'flat', value: 'No change' }} />
      </StatGrid>
    </ContentGridItem>
    <ContentGridItem span={3}>
      <Card>
        <CardHeader title="Usage by project" />
        <p>…</p>
      </Card>
    </ContentGridItem>
    <ContentGridItem span={1}>
      <Card>
        <CardHeader title="Quick note" />
        <p>…</p>
      </Card>
    </ContentGridItem>
  </ContentGrid>
</AppShell>`,
  },
  {
    id: 'level-2',
    title: 'Level 2: a detail screen',
    description: 'A screen under another one: the Back button sits above the page header, 12px from its title, both in the header slot. The nav and the content region are unchanged.',
    render: () => (
      <div className="docs-shell">
        <AppShell
          fit="container"
          nav={<Nav active="reports" />}
          header={
            <>
              <BackButton label="Reports" onClick={noop} />
              <PageHeader title="Q3 marketing report" subtitle="Updated 2 hours ago" headingLevel={2} />
            </>
          }
        >
          <ContentGrid>
            <ContentGridItem span={2}>
              <Card>
                <CardHeader title="Reach" headingLevel={3} />
                <p>Two boxes of 2 columns each.</p>
              </Card>
            </ContentGridItem>
            <ContentGridItem span={2}>
              <Card>
                <CardHeader title="Spend" headingLevel={3} />
                <p>The same row, the same height.</p>
              </Card>
            </ContentGridItem>
          </ContentGrid>
        </AppShell>
      </div>
    ),
    code: `<AppShell
  nav={<SidebarNav … activeId="reports" />}
  header={
    <>
      <BackButton label="Reports" href="/reports" />
      <PageHeader title="Q3 marketing report" subtitle="Updated 2 hours ago" />
    </>
  }
>
  <ContentGrid>
    <ContentGridItem span={2}>…</ContentGridItem>
    <ContentGridItem span={2}>…</ContentGridItem>
  </ContentGrid>
</AppShell>`,
  },
  {
    id: 'reading',
    title: 'Reading width',
    description: 'Settings and detail panels centre at 1200px (`width="reading"`); dashboards run full width. In this frame the content is narrower than 1200px, so it fills the width either way.',
    render: () => (
      <div className="docs-shell">
        <AppShell fit="container" nav={<Nav active="settings" />} width="reading" header={<PageHeader title="Settings" headingLevel={2} />}>
          <Card>
            <CardHeader title="Profile" headingLevel={3} />
            <p>Your name and role, as your team sees them.</p>
          </Card>
        </AppShell>
      </div>
    ),
    code: `<AppShell nav={<SidebarNav … activeId="settings" />} width="reading" header={<PageHeader title="Settings" />}>
  <Card>
    <CardHeader title="Profile" />
    <p>Your name and role, as your team sees them.</p>
  </Card>
</AppShell>`,
  },
  {
    id: 'grid',
    title: 'Content grid',
    description: 'Every box is a whole span of the 4 columns: 1 + 3, 2 + 2, 1 + 1 + 2, 4. Boxes in a row share the tallest one\'s height; none has a height of its own. At 768px and under they stack, one per row.',
    render: () => (
      <div className="docs-canvas">
        <ContentGrid>
          {([[1, 3], [2, 2], [1, 1, 2], [4]] as const).flatMap((row, r) =>
            row.map((span, i) => (
              <ContentGridItem key={`${r}-${i}`} span={span}>
                <Card>
                  <p>
                    {span} column{span > 1 ? 's' : ''}
                    {r === 0 && i === 1 ? '. More text here makes this box taller, and the 1-column box beside it stretches to match.' : ''}
                  </p>
                </Card>
              </ContentGridItem>
            )),
          )}
        </ContentGrid>
      </div>
    ),
    code: `<ContentGrid>
  <ContentGridItem span={1}><Card>…</Card></ContentGridItem>
  <ContentGridItem span={3}><Card>…</Card></ContentGridItem>
  <ContentGridItem span={2}><Card>…</Card></ContentGridItem>
  <ContentGridItem span={2}><Card>…</Card></ContentGridItem>
  <ContentGridItem span={1}><Card>…</Card></ContentGridItem>
  <ContentGridItem span={1}><Card>…</Card></ContentGridItem>
  <ContentGridItem span={2}><Card>…</Card></ContentGridItem>
  <ContentGridItem span={4}><Card>…</Card></ContentGridItem>
</ContentGrid>`,
  },
];

export const props: DocsProp[] = [
  { name: 'nav', options: 'ReactNode', default: '—', required: true, description: 'The main nav: a `SidebarNav`, unmodified. Uncontrolled, it is collapsed below 1024px; a controlled one (`collapsed`) should follow the same rule.' },
  { name: 'header', options: 'ReactNode', default: '—', description: 'The top of the screen: a `PageHeader`, with a `BackButton` above it on Level 2+ screens. 48px above the content.' },
  { name: 'children', options: 'ReactNode', default: '—', description: 'The content: regions stacked 48px apart. Lay boxes out with `ContentGrid`.' },
  { name: 'width', options: "'full' | 'reading'", default: "'full'", description: '`reading` centres the content at 1200px, for settings and detail panels.' },
  { name: 'fit', options: "'viewport' | 'container'", default: "'viewport'", description: '`viewport`: the shell is the page, the window\'s height. `container`: its parent\'s height, for a shell in a bounded frame.' },
  { name: 'backToTop', options: 'boolean', default: 'false', description: 'Adds Back to top for the content region.' },
  { name: 'ContentGrid columnGap', options: '16 | 20', default: '16', description: 'Between boxes in a row. Pick one per product and hold it. Rows are always 24px apart.' },
  { name: 'ContentGridItem span', options: '1 | 2 | 3 | 4', default: '1', description: 'How many of the 4 columns the box spans.' },
  { name: 'id, aria-*, data-*', options: 'native', default: '—', description: 'Passed to the root `<div>` of each. `style` and `className` are not accepted. Refs are forwarded to it.' },
];

export const rules: DocsRules = {
  do: [
    'Put every screen in an App Shell, with SidebarNav as its only navigation.',
    'Start every screen with a PageHeader in `header`; add a BackButton above it on Level 2+ screens.',
    'Size every box as a whole span of the 4 columns.',
    'Let boxes in a row stretch to the tallest one.',
  ],
  dont: [
    'Don\'t add a top bar: the page header is the top of the screen.',
    'Don\'t restyle SidebarNav to fit: change its placement, not the component.',
    'Don\'t give a box its own height to even out a row.',
    'Don\'t give the content region a fill: the canvas runs behind everything.',
  ],
};

export const accessibility: DocsAccessibility = {
  keyboard: 'None of its own. Tab moves through the nav, then the content.',
  notes: [
    'The nav is a `<nav>` landmark (SidebarNav\'s); the content region is the page\'s `<main>`. Use one App Shell per page.',
    'The page header\'s title is the page\'s `h1`. (The examples here use `h2`, as this page has its own `h1`.)',
    'Below 768px the floating card has no scrim: the content behind it stays readable and usable.',
  ],
};

export const motion: DocsMotion[] = [
  { interaction: 'Collapse / expand the nav', motion: 'SidebarNav\'s width change; the content region follows it.', token: '--duration-slow · --ease-standard' },
  { interaction: 'Reduced motion', motion: 'Instant, as SidebarNav.', token: '—' },
];
