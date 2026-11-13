// Documentation for Tabs, rendered by the docs site (playground).
// Keep it consistent with Tabs.usage.md. Not part of the package build.
import { Gear } from '@phosphor-icons/react';
import { Tabs } from './Tabs';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../docs.types';

export const title = 'Tabs';

export const description =
  'In-page section switching: a full-width row of tabs over a 1px track, the active one underlined in Obsidian, and that section\'s content in a panel below. Switching reveals different content.';

export const usage = `import { Tabs } from '@collabrium/ui';

export function CampaignSections() {
  return (
    <Tabs
      aria-label="Campaign sections"
      tabs={[
        { id: 'overview', label: 'Overview', content: <p>Overview content</p> },
        { id: 'campaigns', label: 'Campaigns', count: 8, content: <p>Campaign list</p> },
      ]}
    />
  );
}`;

const Panel = ({ children }: { children: string }) => <p style={{ margin: 0, color: 'var(--color-neutral-5)' }}>{children}</p>;

export const thumbnail = () => (
  <Tabs
    aria-label="Sections"
    tabs={[
      { id: 'overview', label: 'Overview' },
      { id: 'campaigns', label: 'Campaigns', count: 8 },
      { id: 'reports', label: 'Reports' },
    ]}
  />
);

export const anatomy: DocsAnatomyNode[] = [
  {
    name: 'Tabs',
    element: '<div>.cui-tabs',
    description: 'Full width of its parent.',
    children: [
      {
        name: 'Scroll area',
        element: '.cui-tabs__scroll',
        description: 'Holds the 32px edge fades, shown on whichever side hides a tab.',
        children: [
          {
            name: 'Tab list',
            element: 'div[role="tablist"].cui-tabs__list',
            description: 'A row, 4px between tabs, over a 1px Neutral-3 track. Scrolls sideways with no scrollbar.',
            children: [
              { name: 'Tab', element: 'button[role="tab"].cui-tabs__tab', description: '40px tall, 12px side padding, body1 at 700. Active: Neutral-9 with a 2px Obsidian underline; inactive: Neutral-5.' },
              { name: 'Icon', element: 'svg.cui-tabs__icon', when: 'icon', description: 'Phosphor, Regular, 16px, 8px before the label. aria-hidden.' },
              { name: 'Count', element: 'span.cui-tabs__count', when: 'count above 0', description: 'caption at 700, 4px after the label, in the tab\'s text colour. "99+" past 99.' },
            ],
          },
        ],
      },
      { name: 'Panel', element: 'div[role="tabpanel"].cui-tabs__panel', when: 'content', description: '16px under the track, no fill. Cross-fades with the outgoing one.' },
    ],
  },
];

export const examples: DocsExample[] = [
  {
    id: 'default',
    title: 'Sections',
    description: 'The active section\'s panel sits 16px below; switching cross-fades the two panels. Use ← and → once a tab has focus.',
    render: () => (
      <Tabs
        aria-label="Campaign sections"
        tabs={[
          { id: 'overview', label: 'Overview', content: <Panel>Where every campaign stands this quarter.</Panel> },
          { id: 'campaigns', label: 'Campaigns', count: 8, content: <Panel>Eight live campaigns.</Panel> },
          { id: 'settings', label: 'Settings', icon: Gear, content: <Panel>Owners, budgets and alerts.</Panel> },
        ]}
      />
    ),
    code: `import { Gear } from '@phosphor-icons/react';

<Tabs
  aria-label="Campaign sections"
  tabs={[
    { id: 'overview', label: 'Overview', content: <Overview /> },
    { id: 'campaigns', label: 'Campaigns', count: 8, content: <CampaignList /> },
    { id: 'settings', label: 'Settings', icon: Gear, content: <Settings /> },
  ]}
/>`,
  },
  {
    id: 'overflow',
    title: 'Overflow and disabled',
    description: 'More tabs than fit: the row scrolls sideways and a fade marks the edge that hides tabs. Labels never truncate. A disabled tab is skipped by the keyboard.',
    render: () => (
      <div style={{ maxWidth: 380 }}>
        <Tabs
          aria-label="Report sections"
          tabs={[
            { id: 'overview', label: 'Overview' },
            { id: 'campaigns', label: 'Campaigns', count: 8 },
            { id: 'settings', label: 'Settings', icon: Gear },
            { id: 'reports', label: 'Reports', disabled: true },
            { id: 'audience', label: 'Audience insights' },
            { id: 'budget', label: 'Budget & spend' },
          ]}
        />
      </div>
    ),
    code: `<Tabs
  aria-label="Report sections"
  tabs={[
    { id: 'overview', label: 'Overview' },
    { id: 'campaigns', label: 'Campaigns', count: 8 },
    { id: 'settings', label: 'Settings', icon: Gear },
    { id: 'reports', label: 'Reports', disabled: true },
    { id: 'audience', label: 'Audience insights' },
    { id: 'budget', label: 'Budget & spend' },
  ]}
/>`,
  },
  {
    id: 'scroll-buttons',
    title: 'Scroll buttons',
    description: 'With `scrollButtons`, a mouse user gets an arrow at each edge that hides tabs; a click scrolls the row by most of its width. They show only with a mouse (touch screens swipe), and are skipped by the keyboard and screen readers, since ← and → already move through the tabs.',
    render: () => (
      <div style={{ maxWidth: 380 }}>
        <Tabs
          aria-label="Report sections with scroll buttons"
          scrollButtons
          tabs={[
            { id: 'overview', label: 'Overview' },
            { id: 'campaigns', label: 'Campaigns', count: 8 },
            { id: 'settings', label: 'Settings', icon: Gear },
            { id: 'reports', label: 'Reports' },
            { id: 'audience', label: 'Audience insights' },
            { id: 'budget', label: 'Budget & spend' },
          ]}
        />
      </div>
    ),
    code: `<Tabs
  aria-label="Report sections"
  scrollButtons
  tabs={[
    { id: 'overview', label: 'Overview' },
    { id: 'campaigns', label: 'Campaigns', count: 8 },
    { id: 'settings', label: 'Settings', icon: Gear },
    { id: 'reports', label: 'Reports' },
    { id: 'audience', label: 'Audience insights' },
    { id: 'budget', label: 'Budget & spend' },
  ]}
/>`,
  },
];

export const props: DocsProp[] = [
  { name: 'tabs', options: '{ id; label; icon?: Icon; count?: number; disabled?: boolean; content?: ReactNode }[]', default: '—', required: true, description: 'The tabs, in order. `content` is the panel; leave it out to render the content yourself.' },
  { name: 'aria-label', options: 'string', default: '—', required: true, description: 'Names the tab list for screen readers.' },
  { name: 'value', options: 'string', default: '—', description: 'The active tab id, when you control it (from a URL parameter, say). An unknown id falls back to the first tab.' },
  { name: 'defaultValue', options: 'string', default: 'the first tab', description: 'The active tab on first load when you don\'t control it.' },
  { name: 'onValueChange', options: '(id: string) => void', default: '—', description: 'Called with the chosen tab\'s id.' },
  { name: 'scrollButtons', options: 'boolean', default: 'false', description: 'Adds left and right arrow buttons at the edges of an overflowing row, for mouse users. Each shows only while its edge hides tabs; never on touch screens.' },
  { name: 'surface', options: "'default' | 'canvas'", default: "'default'", description: 'What the tabs sit on, so the edge fades blend in: Neutral-1 (a card) or the warm page canvas.' },
  { name: 'id, aria-*, data-*', options: 'native', default: '—', description: 'Passed to the root `<div>`. `style` and `className` are not accepted. The ref is forwarded to it.' },
];

export const rules: DocsRules = {
  do: [
    'Use Tabs when switching reveals different content.',
    'Give every tab a visible label; an icon only supports it.',
    'Keep a shareable tab in a URL parameter and pass it as `value`.',
    'Hide a count of 0; show "99+" past 99 (the component does both).',
  ],
  dont: [
    'Don\'t use more than about six tabs: use SidebarNav or a Select.',
    'Don\'t nest a tab bar inside a panel.',
    'Don\'t use Tabs to change how the same content is shown: use Segmented Control.',
    'Don\'t centre, stretch or truncate tabs.',
  ],
};

export const accessibility: DocsAccessibility = {
  keyboard: [
    { keys: 'Tab', action: 'Moves to the active tab, then into its panel.' },
    { keys: '← / →', action: 'Moves to the previous or next enabled tab, wrapping, and selects it.' },
    { keys: 'Home / End', action: 'Moves to the first or last enabled tab and selects it.' },
  ],
  notes: [
    'A `tablist` of `tab` buttons with `aria-selected`, each controlling a `tabpanel` named by its tab.',
    'Only the active tab is a Tab stop; disabled tabs are skipped.',
    'The outgoing panel is `inert` while it fades out.',
    'A count is read after a pause: "Campaigns, 8".',
    'The focus ring is drawn just inside the tab, so the scrolling row never clips it.',
    'The scroll buttons are mouse helpers: `aria-hidden` and out of the Tab order, since ← and → already reach every tab.',
  ],
};

export const motion: DocsMotion[] = [
  { interaction: 'Hover, press, select', motion: 'Text colour, fill and underline change.', token: '--duration-fast · --ease-standard' },
  { interaction: 'Switch panel', motion: 'The incoming and outgoing panels cross-fade together.', token: '--duration-fast · --ease-standard' },
  { interaction: 'Edge fades', motion: 'Fade in or out as the row scrolls.', token: '--duration-fast · --ease-standard' },
  { interaction: 'Scroll button', motion: 'The row scrolls smoothly by most of its width (at once under reduced motion).', token: 'browser smooth scroll' },
  { interaction: 'Reduced motion', motion: 'The panels swap at once.', token: '—' },
];
