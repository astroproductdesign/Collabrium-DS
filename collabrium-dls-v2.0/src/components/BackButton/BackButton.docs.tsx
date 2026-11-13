// Documentation for Back button, rendered by the docs site (playground).
// Keep it consistent with BackButton.usage.md. Not part of the package build.
import { BackButton } from './BackButton';
import { PageHeader } from '../PageHeader';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../docs.types';

export const title = 'Back button';

export const description =
  'The one control at the top of a Level 2+ screen that goes one level up, named for the parent screen ("← Reports"), never a generic "Back". It sits in its own row above the page header.';

export const usage = `import { BackButton } from '@collabrium/ui';

export function ReportHeader() {
  return <BackButton label="Reports" href="/reports" />;
}`;

const noop = () => {};

export const thumbnail = () => <BackButton label="Reports" onClick={noop} />;

export const anatomy: DocsAnatomyNode[] = [
  {
    name: 'Row',
    element: '<div>.cui-back-button-row',
    description: 'Full width of the content region, 12px above the page header\'s title. No fill or border.',
    children: [
      {
        name: 'Back button',
        element: '<a> or <button>.cui-back-button',
        description: 'Ghost: no fill at rest, Neutral-2 on hover, Neutral-3 pressed; 8px / 12px padding, radius-sm; 34px tall with a 44px hit area.',
        children: [
          { name: 'Arrow', element: 'svg.cui-back-button__icon', description: 'Phosphor ArrowLeft, Regular, 16px. aria-hidden.' },
          { name: 'Label', element: 'span.cui-back-button__label', description: 'The parent screen\'s name: label2, Neutral-9, 8px from the arrow.' },
        ],
      },
    ],
  },
];

export const examples: DocsExample[] = [
  {
    id: 'above-header',
    title: 'Above a page header',
    description: 'A Level 2 screen: the Back button names its parent, Reports, and sits 12px above the page title.',
    render: () => (
      <div>
        <BackButton label="Reports" onClick={noop} />
        <PageHeader title="Q3 marketing report" headingLevel={2} />
      </div>
    ),
    code: `<BackButton label="Reports" href="/reports" />
<PageHeader title="Q3 marketing report" />`,
  },
  {
    id: 'long-name',
    title: 'A long parent name',
    description: 'Past 40 characters the label is cut with "…". A screen reader still hears the whole name: "Back to Regional performance review, Southeast Asia, FY2026".',
    render: () => <BackButton label="Regional performance review, Southeast Asia, FY2026" onClick={noop} />,
    code: `<BackButton label="Regional performance review, Southeast Asia, FY2026" href="/reviews/sea-fy2026" />`,
  },
];

export const props: DocsProp[] = [
  { name: 'label', options: 'string', default: '—', required: true, description: 'The immediate parent screen\'s name, in its own title casing. Cut with "…" past 40 characters; screen readers hear all of it.' },
  { name: 'href', options: 'string', default: '—', description: 'Makes it a real link to the parent screen.' },
  { name: 'onClick', options: '() => void', default: '—', description: 'Makes it a button, for routing that isn\'t a link. One of `href` or `onClick` is required.' },
  { name: 'id, aria-*, data-*', options: 'native', default: '—', description: 'Passed to the link or button. `style` and `className` are not accepted. The ref is forwarded to it.' },
];

export const rules: DocsRules = {
  do: [
    'Name the immediate parent screen, at every depth.',
    'Put it above the page header, never inside it.',
    'Prefer `href`: going back is navigation, so a link.',
  ],
  dont: [
    'Don\'t write a generic "Back".',
    'Don\'t build a breadcrumb trail or add a Home shortcut: one level up, one name.',
    'Don\'t use it on a Level 1 screen, which has no parent.',
  ],
};

export const accessibility: DocsAccessibility = {
  keyboard: [
    { keys: 'Tab', action: 'Moves to the Back button.' },
    { keys: 'Enter (link) / Enter or Space (button)', action: 'Goes to the parent screen.' },
  ],
  notes: [
    'A real link (`href`) or button (`onClick`), with the 2px Obsidian focus ring.',
    'Named "Back to {parent}" ("Back to Reports"), with the full name even when the label is cut. The arrow is `aria-hidden`.',
    'The hit area is 44px tall, reaching past the 34px it draws.',
  ],
};

export const motion: DocsMotion[] = [
  { interaction: 'Hover, press', motion: 'The fill changes.', token: '--duration-fast · --ease-standard' },
];
