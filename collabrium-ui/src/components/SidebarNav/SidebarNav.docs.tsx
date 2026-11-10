// Documentation for SidebarNav, rendered by the docs site (playground).
// Keep it consistent with SidebarNav.usage.md. Not part of the package build.
import { useState } from 'react';
import {
  AddressBook,
  Buildings,
  CalendarDots,
  ChartBar,
  ChartLineUp,
  ClockCounterClockwise,
  FileText,
  Funnel,
  Gear,
  Globe,
  Handshake,
  House,
  Lightbulb,
  MagnifyingGlass,
  Megaphone,
  Money,
  PencilSimple,
  Question,
  Receipt,
  RocketLaunch,
  SignOut,
  Sparkle,
  SquaresFour,
  Target,
  Television,
  Users,
  UsersThree,
  type Icon,
} from '@phosphor-icons/react';
import { SidebarNav, type SidebarNavDepartment, type SidebarNavItem, type SidebarNavMenuItem, type SidebarNavSection } from './index';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../docs.types';

export const title = 'SidebarNav';

export const description =
  'The app\'s primary navigation, and the only one: a 240px rail with the logo, a Department strip, grouped items with one level of children, and the account menu. Collapses to a 72px icon rail; on phones it\'s a card that collapses to its logo.';

export const usage = `import { SidebarNav } from '@collabrium/ui';

<SidebarNav
  logo={{ kind: 'live', src: '/logo.html', markSrc: '/logo-mark.html' }}
  sections={sections}
  activeId={active}
  onActiveChange={setActive}
  user={{ name: 'Bryan Wong', role: 'Head of Revenue' }}
  userMenu={[{ id: 'settings', label: 'Settings', icon: Gear }, { id: 'out', label: 'Log out', icon: SignOut, divider: true }]}
  collapsedStorageKey="sidebar-collapsed"
/>`;

// The docs pages live one folder down (components/<slug>), next to the site's copies of the DLS logo library.
const A = '../';

const departments: SidebarNavDepartment[] = [
  { id: 'home', name: 'Collabrium', description: 'Leadership board, feedback, assistant.', icon: <RocketLaunch weight="fill" aria-hidden="true" />, logo: { kind: 'live', src: `${A}logo.html`, markSrc: `${A}logo-mark.html` } },
  { id: 'sales', name: 'CollabSales', description: 'Clients, proposals and the pipeline.', element: 'gold', icon: <img src={`${A}SVG/gold.svg`} alt="" />, logo: { kind: 'lockup', src: `${A}logo-lockups/collabSales.svg`, iconSrc: `${A}SVG/gold.svg` } },
  { id: 'media', name: 'CollabMedia', description: 'Turns budgets into media plans.', element: 'water', icon: <img src={`${A}SVG/water.svg`} alt="" />, logo: { kind: 'lockup', src: `${A}logo-lockups/collabMedia.svg`, iconSrc: `${A}SVG/water.svg` } },
  { id: 'influence', name: 'CollabInfluence', description: 'Creators, agencies and brands.', element: 'earth', icon: <img src={`${A}SVG/earth.svg`} alt="" />, logo: { kind: 'lockup', src: `${A}logo-lockups/collabInfluence.svg`, iconSrc: `${A}SVG/earth.svg` } },
  { id: 'studio', name: 'CollabStudio', description: 'AI-powered creative production.', element: 'fire', soon: true, icon: <img src={`${A}SVG/fire.svg`} alt="" />, logo: { kind: 'lockup', src: `${A}logo-lockups/collabStudio.svg`, iconSrc: `${A}SVG/fire.svg` } },
  { id: 'content', name: 'CollabContent', description: 'Approve, schedule and publish content.', element: 'wood', soon: true, icon: <img src={`${A}SVG/wood.svg`} alt="" />, logo: { kind: 'lockup', src: `${A}logo-lockups/collabContent.svg`, iconSrc: `${A}SVG/wood.svg` } },
];
// Stand-ins for a seventh and eighth department (the DS has no element for them yet).
const extra: SidebarNavDepartment[] = [
  { id: 'ex7', name: 'Example 7', description: 'Stand-in for a seventh department.', icon: <img src={`${A}SVG/cloud.svg`} alt="" />, logo: { kind: 'icon', iconSrc: `${A}SVG/cloud.svg` } },
  { id: 'ex8', name: 'Example 8', description: 'Stand-in for an eighth department.', icon: <img src={`${A}SVG/sun.svg`} alt="" />, logo: { kind: 'icon', iconSrc: `${A}SVG/sun.svg` } },
];
const eight = [...departments.slice(0, 4), ...extra, ...departments.slice(4)];

type Row = [Icon, string, ('soon' | null)?, string[]?, number?];
const menu = (dept: string, groups: [string, Row[]][]): SidebarNavSection[] =>
  groups.map(([label, rows]) => ({
    id: `${dept}-${label}`,
    label,
    items: rows.map(([icon, text, flag, children, count]): SidebarNavItem => {
      const id = `${dept}-${text.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
      return {
        id,
        label: text,
        icon,
        soon: flag === 'soon',
        count,
        children: children?.map((c) => ({ id: `${id}-${c.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`, label: c })),
      };
    }),
  }));

const MENUS: Record<string, SidebarNavSection[]> = {
  home: menu('home', [
    ['Workspace', [[House, 'Dashboard'], [PencilSimple, 'Edit Sales Board']]],
    ['General', [[Lightbulb, 'Feedback', 'soon'], [SquaresFour, 'Design System']]],
  ]),
  sales: menu('sales', [
    ['Overview', [[House, 'Dashboard'], [MagnifyingGlass, 'Client intelligence'], [Megaphone, 'Campaigns', null, undefined, 4]]],
    ['Pipeline', [[Funnel, 'Opportunities', null, undefined, 12], [FileText, 'Proposals'], [Receipt, 'Quotes'], [ChartLineUp, 'Forecasts']]],
    ['Accounts', [[UsersThree, 'Team', null, ['Members', 'Roles & access']], [Handshake, 'Account handoff'], [AddressBook, 'Contacts'], [ClockCounterClockwise, 'Activity']]],
    ['Insights', [[ChartBar, 'Reports'], [Target, 'Targets']]],
  ]),
  media: menu('media', [
    ['Overview', [[House, 'Dashboard']]],
    ['Planning', [[CalendarDots, 'Media plans'], [Television, 'Ad formats'], [UsersThree, 'Audiences'], [Globe, 'Channels']]],
  ]),
  influence: menu('influence', [
    ['Overview', [[House, 'Dashboard']]],
    ['Network', [[Users, 'Creators'], [Buildings, 'Agencies'], [Sparkle, 'Brands']]],
    ['Campaigns', [[Megaphone, 'Campaigns'], [Money, 'Payouts']]],
  ]),
  ex7: menu('ex7', [['Overview', [[House, 'Dashboard'], [ChartBar, 'Reports']]]]),
  ex8: menu('ex8', [['Overview', [[House, 'Dashboard'], [ChartBar, 'Reports']]]]),
};

const user = { name: 'Bryan Wong', role: 'Head of Revenue' };
const userMenu: SidebarNavMenuItem[] = [
  { id: 'settings', label: 'Settings', icon: Gear },
  { id: 'logout', label: 'Log out', icon: SignOut, divider: true },
];

/** The department's home item: its first item that's a destination. */
const homeOf = (sections: SidebarNavSection[]) => sections[0]?.items.find((i) => !i.soon && !i.children)?.id ?? null;

function DepartmentsExample({ list = departments, start = 'home' }: { list?: SidebarNavDepartment[]; start?: string }) {
  const [dept, setDept] = useState(start);
  const [active, setActive] = useState<string | null>(homeOf(MENUS[start]));
  return (
    <div className="docs-sbn">
      <SidebarNav
        departments={list}
        department={dept}
        onDepartmentChange={(id) => {
          setDept(id);
          setActive(homeOf(MENUS[id]));
        }}
        sections={MENUS[dept]}
        activeId={active}
        onActiveChange={setActive}
        user={user}
        userMenu={userMenu}
      />
    </div>
  );
}

function SingleExample({ collapsed = false }: { collapsed?: boolean }) {
  const [active, setActive] = useState<string | null>('sales-team-members');
  return (
    <div className="docs-sbn">
      <SidebarNav
        logo={{ kind: 'live', src: `${A}logo.html`, markSrc: `${A}logo-mark.html` }}
        sections={MENUS.sales.map((s) =>
          s.id === 'sales-Accounts' ? { ...s, items: s.items.map((i) => (i.children ? { ...i, defaultExpanded: true } : i)) } : s,
        )}
        activeId={active}
        onActiveChange={setActive}
        defaultCollapsed={collapsed}
        footerItems={[{ id: 'help', label: 'Help', icon: Question }]}
        user={user}
        userMenu={userMenu}
      />
    </div>
  );
}

export const thumbnail = () => (
  <div className="docs-sbn-thumb">
    <SidebarNav
      logo={{ kind: 'live', src: `${A}logo.html`, markSrc: `${A}logo-mark.html` }}
      sections={[{ id: 't', items: MENUS.media[1].items.slice(0, 3) }]}
      defaultActiveId="media-media-plans"
    />
  </div>
);

export const anatomy: DocsAnatomyNode[] = [
  {
    name: 'SidebarNav',
    element: 'div.cui-sidebar-nav',
    description: 'Holds the rail and, outside its clip, the toggle, the department card, the account menu and the collapsed hover label.',
    children: [
      {
        name: 'Rail',
        element: 'nav.cui-sidebar-nav__rail',
        description: '240px (72px collapsed), 12px padding all round, 4px between items, radius-lg, 1px Neutral-3, Neutral-1. Never scrolls sideways.',
        children: [
          { name: 'Header', element: '.cui-sidebar-nav__header', description: 'The logo, a link to the department\'s home: the live Collabrium mark, a department lockup, or (collapsed) the animated "o" or the element icon. Neutral-2 on hover.' },
          { name: 'Department strip', element: '.cui-sidebar-nav__strip', when: '2+ departments', description: 'A Neutral-2 track of 32px chips; the selected one sits on a white pill (shadow-1) that slides. Coming-soon chips greyed. Past 6, fixed 33px chips, an edge fade, and the row scrolls sideways.' },
          { name: 'Section label', element: '.cui-sidebar-nav__section', description: 'Caption bold uppercase Neutral-5; a 1px Neutral-3 line above every group but the first.' },
          { name: 'Item', element: '.cui-sidebar-nav__item', description: '40px, a 20px Fill icon, body1 500 Neutral-5. Hover Neutral-2, pressed Neutral-3, active Neutral-2 with Neutral-9 bold. A count trails (an 8px dot when collapsed); "Soon" items are Neutral-4 with a Badge.' },
          { name: 'Children', element: '.cui-sidebar-nav__children', when: 'children', description: 'One level, opened inline by the parent (its caret flips); 36px body2 rows indented 16px. A parent with the active child is bold without a fill.' },
          { name: 'Footer', element: '.cui-sidebar-nav__footer', description: 'Pinned to the bottom under a line: optional items, then the account row (36px initials avatar, name, role).' },
        ],
      },
      { name: 'Toggle', element: 'button.cui-sidebar-nav__toggle', description: 'On the logo\'s row; collapsed, a 24px floating button straddling the rail\'s edge.' },
      { name: 'Department card', element: '.cui-sidebar-nav__card', when: 'hover a chip', description: 'Neutral-7, the name (body2 bold) and its one line (label2, Neutral-4), a caret at the chip.' },
      { name: 'Account menu', element: '.cui-sidebar-nav__menu[role="menu"]', description: '240px, opening upward from the account row: 40px items with 20px Fill icons, a hairline before Log out.' },
      { name: 'Hover label', element: '.cui-sidebar-nav__hover', when: 'collapsed', description: 'Tooltip\'s bubble to the right of the hovered or focused icon.' },
    ],
  },
];

export const examples: DocsExample[] = [
  {
    id: 'departments',
    title: 'With departments',
    description: 'Pick a department in the strip: the pill slides, the logo becomes its lockup, and its own menu replaces this one, landing on its Dashboard. Hover a chip for its card. Studio and Content are coming soon. Open the account row for its menu.',
    render: () => <DepartmentsExample />,
    code: `const [dept, setDept] = useState('home');
const [active, setActive] = useState('home-dashboard');

<SidebarNav
  departments={departments}
  department={dept}
  onDepartmentChange={(id) => { setDept(id); setActive(homeOf(menus[id])); }}
  sections={menus[dept]}
  activeId={active}
  onActiveChange={setActive}
  user={{ name: 'Bryan Wong', role: 'Head of Revenue' }}
  userMenu={userMenu}
/>`,
  },
  {
    id: 'more-departments',
    title: 'More than 6 departments',
    description: 'The chips keep a fixed width, so the sixth shows cut off; a fade marks each edge with more, and the strip scrolls sideways (a mouse wheel too). The selected chip always scrolls into view.',
    render: () => <DepartmentsExample list={eight} start="sales" />,
    code: `<SidebarNav departments={eightDepartments} department="sales" … />`,
  },
  {
    id: 'single',
    title: 'One department, second level, footer item',
    description: 'No strip with fewer than 2 departments: the logo is set directly. Team opens its children inline; with Members active, Team is bold without a fill. Counts trail their items. Help sits in the footer above the account.',
    render: () => <SingleExample />,
    code: `<SidebarNav
  logo={{ kind: 'live', src: '/logo.html', markSrc: '/logo-mark.html' }}
  sections={sections}
  activeId={active}
  onActiveChange={setActive}
  footerItems={[{ id: 'help', label: 'Help', icon: Question }]}
  user={user}
  userMenu={userMenu}
/>`,
  },
  {
    id: 'collapsed',
    title: 'Collapsed',
    description: 'The 72px rail: icons centred, labels as a hover or focus label, counts as dots, the parent of the active child filled. Clicking a parent goes to its first child. The toggle floats on the edge. Remember the choice with `collapsedStorageKey`.',
    render: () => <SingleExample collapsed />,
    code: `<SidebarNav … defaultCollapsed collapsedStorageKey="sidebar-collapsed" />`,
  },
];

export const props: DocsProp[] = [
  { name: 'sections', options: 'SidebarNavSection[]', default: 'required', description: '`{ id, label?, items }`. Items: `{ id, label, icon, href?, onSelect?, count?, soon?, disabled?, children?, defaultExpanded? }`; children: `{ id, label, href?, onSelect?, disabled? }`.' },
  { name: 'activeId / defaultActiveId / onActiveChange', options: 'string | null / (id) => void', default: '— / null / —', description: 'The one active destination, an item or a child.' },
  { name: 'collapsed / defaultCollapsed / onCollapsedChange', options: 'boolean / (collapsed) => void', default: '— / false / —', description: 'The 72px rail.' },
  { name: 'collapsedStorageKey', options: 'string', default: '—', description: 'Remembers collapsed or expanded in the browser. `sidebarNavInitScript(key, id)` stops a flash on load.' },
  { name: 'logo / logoName / logoHref', options: 'SidebarNavLogo / string / string', default: '— / "Collabrium" / —', description: 'The header logo without departments. `{ kind: \'live\', src, markSrc }`, `{ kind: \'lockup\', src, iconSrc }` or `{ kind: \'icon\', iconSrc }`, from the DLS logo library.' },
  { name: 'departments', options: 'SidebarNavDepartment[]', default: '[]', description: '`{ id, name, description, icon, logo, element?, href?, soon? }`. The strip shows with 2 or more.' },
  { name: 'department / defaultDepartment / onDepartmentChange', options: 'string / (id) => void', default: '— / the first / —', description: 'The selected department. In the product it comes from the address.' },
  { name: 'footerItems', options: 'SidebarNavItem[]', default: '[]', description: 'Items pinned in the footer above the account (Help).' },
  { name: 'user / userMenu', options: '{ name, role, initials? } / SidebarNavMenuItem[]', default: '—', description: 'The account row and its menu (`{ id, label, icon, href?, onSelect?, divider? }`).' },
  { name: 'linkComponent', options: 'ElementType', default: "'a'", description: 'Renders `href` items: pass Next.js\'s `Link`.' },
  { name: 'label', options: 'string', default: '"Main"', description: 'Names the navigation landmark.' },
];

export const rules: DocsRules = {
  do: [
    'Use it as the app\'s only navigation: no top, bottom or tab-bar nav unless documented as an exception.',
    'Group items under section labels, one level deep; nest at most one level of children.',
    'Take the logo from the DLS logo library (logo.html, logo-mark.html, logo-lockups/, SVG/).',
    'Let a long label wrap; never truncate it.',
  ],
  dont: [
    'Don\'t add a third level: that belongs in page Tabs or a sub-page.',
    'Don\'t make a parent a destination: it only opens and closes.',
    'Don\'t put a count and "Soon" on the same item.',
    'Don\'t draw or embed a one-off logo.',
  ],
};

export const accessibility: DocsAccessibility = {
  keyboard:
    'Tab moves through the logo, the department chips, the items and the account row. Enter opens or closes a parent. The account menu: Enter, Space, ↑ or ↓ opens it with focus on its first item; ↑ ↓, Home and End move; Escape closes it and returns focus. Escape hides a department card.',
  notes: [
    'A `<nav>` named "Main". The active item or child is `aria-current="page"`; a parent carries `aria-expanded`.',
    'Department chips are a group named "Departments", each named with its line ("CollabSales. Clients, proposals and the pipeline."), "Coming soon." added where it applies (still focusable, `aria-disabled`). The selected chip is `aria-current`.',
    'Collapsed, a hover or focus label shows each item\'s name; the account row is named "Bryan Wong, Head of Revenue".',
    'The toggle is "Collapse sidebar" or "Expand sidebar", with `aria-expanded`.',
    'Forced colours: the active item, child and department are outlined in Highlight.',
  ],
};

export const motion: DocsMotion[] = [
  { interaction: 'Collapse / expand', motion: 'The width changes.', token: '--duration-slow · --ease-standard' },
  { interaction: 'A parent opens', motion: 'Its children grow to their height.', token: '--duration-slow · --ease-standard' },
  { interaction: 'Department switch', motion: 'The pill slides; the logo rises in; the menu fades out and in.', token: '--duration-base / --duration-fast · --ease-standard' },
  { interaction: 'Hover, press, hover label, card', motion: 'Fill and fade.', token: '--duration-fast · --ease-standard' },
  { interaction: 'Account menu', motion: 'Fades and rises 4px.', token: '--duration-fast · --ease-standard' },
  { interaction: 'Reduced motion', motion: 'Instant: the pill jumps, no rise-in, no fade.', token: '—' },
];
