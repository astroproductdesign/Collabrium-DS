// Documentation for Empty state, rendered by the docs site (playground).
// Keep it consistent with EmptyState.usage.md. Not part of the package build.
import type { CSSProperties } from 'react';
import { ArrowClockwise, CloudSlash, MagnifyingGlass, Plus, Tray } from '@phosphor-icons/react';
import { EmptyState } from './EmptyState';
import { Card } from '../Card';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsProp, DocsRules } from '../docs.types';

const noop = () => undefined;

// The gallery frame holds the full-page variant at 360px, as the DLS gallery does (preview.html 3620).
const frame = { '--cui-empty-state-fullpage-min-height': '360px' } as CSSProperties;

export const title = 'Empty state';

export const description =
  'What a page, a section or a search shows when it has nothing to show, or when its data failed to load: an icon, a heading, a line on how to resolve it and up to two actions.';

export const usage = `import { EmptyState } from '@collabrium/ui';
import { Tray } from '@phosphor-icons/react';

export function CampaignsEmpty() {
  return (
    <EmptyState variant="section" icon={Tray} heading="No campaigns yet">
      Campaigns you create or are added to will show here.
    </EmptyState>
  );
}`;

export const thumbnail = () => (
  <EmptyState variant="section" icon={CloudSlash} heading="Nothing here yet" primaryAction={{ label: 'Connect a source', icon: Plus, onClick: noop }}>
    Connect your first data source.
  </EmptyState>
);

export const anatomy: DocsAnatomyNode[] = [
  {
    name: 'Empty state',
    element: '<div>.cui-empty-state',
    description: 'The column, centred, with no fill. The variant and tone are data attributes: data-variant, data-tone.',
    children: [
      { name: 'Icon', element: 'svg.cui-empty-state__icon', when: 'fullpage and section, with icon', description: 'Phosphor Fill, 48px (64px full-page on desktop), Neutral-4 or Red for error. aria-hidden. 12px to the heading.' },
      { name: 'Heading', element: '<h2>–<h6>.cui-empty-state__heading', when: 'fullpage and section, with heading', description: 'Names what is absent. Drawn as h4, Neutral-9. 4px to the body.' },
      { name: 'Body', element: '<p>.cui-empty-state__body', description: 'How to resolve it. body1, Neutral-5, up to 360px wide (inline: body2, 320px). 16px to the actions.' },
      {
        name: 'Actions',
        element: '<div>.cui-empty-state__actions',
        when: 'fullpage and section, with an action',
        description: 'A Primary and a Ghost Button, 8px apart. Stacked full width below 768px.',
      },
      { name: 'Link', element: '<button>.cui-empty-state__link', when: 'inline, with linkAction', description: 'A text link (link2, underlined). Never a Primary or Ghost button.' },
    ],
  },
];

export const examples: DocsExample[] = [
  {
    id: 'section',
    title: 'Section',
    description: 'One part of a page has nothing in it: a table with no rows, a card with no data. 48px icon and at least 240px tall.',
    render: () => (
      <EmptyState
        variant="section"
        icon={CloudSlash}
        heading="Nothing here yet"
        primaryAction={{ label: 'Connect a source', icon: Plus, onClick: noop }}
        secondaryAction={{ label: 'Browse templates', onClick: noop }}
      >
        This is where your dashboards will live once you connect your first data source.
      </EmptyState>
    ),
    code: `import { CloudSlash, Plus } from '@phosphor-icons/react';

<EmptyState
  variant="section"
  icon={CloudSlash}
  heading="Nothing here yet"
  primaryAction={{ label: 'Connect a source', icon: Plus, onClick: connect }}
  secondaryAction={{ label: 'Browse templates', onClick: browse }}
>
  This is where your dashboards will live once you connect your first data source.
</EmptyState>`,
  },
  {
    id: 'fullpage',
    title: 'Full-page',
    description: 'The whole page has no content yet. A 64px icon, and the state fills the viewport, centred. Held at 360px here to fit the frame.',
    render: () => (
      <div style={frame}>
        <EmptyState
          variant="fullpage"
          icon={CloudSlash}
          heading="Nothing here yet"
          headingLevel={2}
          primaryAction={{ label: 'Connect a source', icon: Plus, onClick: noop }}
          secondaryAction={{ label: 'Browse templates', onClick: noop }}
        >
          This is where your dashboards will live once you connect your first data source.
        </EmptyState>
      </div>
    ),
    code: `<EmptyState
  variant="fullpage"
  icon={CloudSlash}
  heading="Nothing here yet"
  headingLevel={2}
  primaryAction={{ label: 'Connect a source', icon: Plus, onClick: connect }}
  secondaryAction={{ label: 'Browse templates', onClick: browse }}
>
  This is where your dashboards will live once you connect your first data source.
</EmptyState>`,
  },
  {
    id: 'error',
    title: 'Error',
    description: 'The data failed to load. Same layout, a Red icon, a heading that names what failed, Retry and "Contact support". Pass `tone="error"` yourself.',
    render: () => (
      <EmptyState
        variant="section"
        tone="error"
        icon={CloudSlash}
        heading="Campaigns didn't load"
        primaryAction={{ label: 'Retry', icon: ArrowClockwise, onClick: noop }}
        secondaryAction={{ label: 'Contact support', onClick: noop }}
      >
        We couldn't reach the server. Check your connection and try again.
      </EmptyState>
    ),
    code: `import { ArrowClockwise, CloudSlash } from '@phosphor-icons/react';

<EmptyState
  variant="section"
  tone="error"
  icon={CloudSlash}
  heading="Campaigns didn't load"
  primaryAction={{ label: 'Retry', icon: ArrowClockwise, onClick: retry }}
  secondaryAction={{ label: 'Contact support', onClick: contactSupport }}
>
  We couldn't reach the server. Check your connection and try again.
</EmptyState>`,
  },
  {
    id: 'ghost-only',
    title: 'Ghost action only',
    description: 'When the next step is optional or exploratory, a Ghost button on its own.',
    render: () => (
      <EmptyState variant="section" icon={Tray} heading="No saved views" secondaryAction={{ label: 'Browse templates', onClick: noop }}>
        Save a filtered view to find it here next time.
      </EmptyState>
    ),
    code: `<EmptyState
  variant="section"
  icon={Tray}
  heading="No saved views"
  secondaryAction={{ label: 'Browse templates', onClick: browse }}
>
  Save a filtered view to find it here next time.
</EmptyState>`,
  },
  {
    id: 'inline',
    title: 'Inline',
    description: 'A search or filter found nothing. Left-aligned body2 text and a text link, no icon or heading.',
    render: () => (
      <EmptyState variant="inline" linkAction={{ label: 'Clear filters', onClick: noop }}>
        No campaigns match "Q5 launch".
      </EmptyState>
    ),
    code: `<EmptyState variant="inline" linkAction={{ label: 'Clear filters', onClick: clearFilters }}>
  No campaigns match "Q5 launch".
</EmptyState>`,
  },
  {
    id: 'in-card',
    title: 'In a card',
    description: 'It has no fill, so it sits on the card\'s surface. The card keeps its own padding.',
    render: () => (
      <Card>
        <EmptyState variant="section" icon={MagnifyingGlass} heading="No results yet">
          Run a search to see matching accounts here.
        </EmptyState>
      </Card>
    ),
    code: `<Card>
  <EmptyState variant="section" icon={MagnifyingGlass} heading="No results yet">
    Run a search to see matching accounts here.
  </EmptyState>
</Card>`,
  },
];

export const props: DocsProp[] = [
  { name: 'variant', options: "'fullpage' | 'section' | 'inline'", default: '—', required: true, description: '`fullpage`: the whole page is empty (64px icon, fills the viewport). `section`: one part is empty (48px icon, at least 240px tall). `inline`: a search or filter found nothing (body text and a link only).' },
  { name: 'children', options: 'ReactNode', default: '—', description: 'The body: why it is empty and how to resolve it; for `error`, what happened and what to try. Required on `inline`. Leave it out only where the DLS draws an icon and heading alone (Price summary card).' },
  { name: 'tone', options: "'empty' | 'error'", default: "'empty'", description: '`error` when the data failed to load: the icon turns Red. Pass it explicitly; the component never infers it. Not on `inline`.' },
  { name: 'icon', options: 'Icon', default: '—', description: 'A Phosphor icon component, e.g. `CloudSlash`, drawn Fill (Tier 2). Not on `inline`.' },
  { name: 'heading', options: 'ReactNode', default: '—', description: 'Names what is absent, or for `error` the content that failed to load. Drawn as h4. Not on `inline`.' },
  { name: 'headingLevel', options: '2 | 3 | 4 | 5 | 6', default: '3', description: 'The heading\'s level in the page outline. The look is always h4.' },
  { name: 'primaryAction', options: '{ label, onClick, icon?, loading? }', default: '—', description: 'The main action, a Primary button: a creation action, or Retry for `error`. Not on `inline`.' },
  { name: 'secondaryAction', options: '{ label, onClick, icon?, loading? }', default: '—', description: 'A lower-commitment action, a Ghost button. On its own when the next step is optional. Not on `inline`.' },
  { name: 'linkAction', options: '{ label, onClick }', default: '—', description: '`inline` only: a text link ("Clear filters").' },
  { name: 'id, aria-*, data-*, …', options: 'native', default: '—', description: 'Passed to the root `<div>`. `style` and `className` are not accepted. The ref is forwarded to the `<div>`.' },
];

export const rules: DocsRules = {
  do: [
    'Say what is missing and how to resolve it: "No campaigns yet: create your first one".',
    'Pass `tone="error"` when the data failed to load, and name what failed in the heading.',
    'Use Section for one part of a page and Full-page only when the whole page is empty.',
    'Keep to two actions: a Primary for the main step, a Ghost for the alternative.',
  ],
  dont: [
    'Don\'t show `tone="empty"` over a broken fetch: a creation prompt tells people nothing exists.',
    'Don\'t write a bare "No data" or a generic "Something went wrong".',
    'Don\'t put a Primary or Ghost button in an inline empty state; use `linkAction`.',
    'Don\'t stand in a spinner or a blank card for an empty state.',
  ],
};

export const accessibility: DocsAccessibility = {
  keyboard: [
    { keys: 'Tab', action: 'Moves to the actions, or to the inline link.' },
    { keys: 'Enter / Space', action: 'Presses the focused action or link.' },
  ],
  notes: [
    'The heading is a real heading (`headingLevel`, default 3), so the state shows in the page outline. It is drawn as h4 at every level.',
    'The icon is decorative and `aria-hidden`; the heading and body carry the meaning.',
    'The actions are real Buttons and the inline link is a real `<button>`.',
    'No live region. When an empty or error state replaces content while the person is on the page, the host tells them where it happened.',
  ],
};

export const motion = 'None. Empty state doesn\'t animate; its Buttons keep their own transitions.';
