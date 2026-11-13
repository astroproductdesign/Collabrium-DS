// Documentation for PageHero, rendered by the docs site (playground).
// Keep it consistent with PageHero.usage.md. Not part of the package build.
import { PencilSimple, Star } from '@phosphor-icons/react';
import { PageHero } from './PageHero';
import { PAGE_HERO_ILLUSTRATIONS } from './illustrations';
import { Button } from '../Button';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../docs.types';

export const title = 'Page hero';

export const description =
  'The tinted title block at the top of a page about one subject (a project, a person, a team): an ink-doodle illustration tile, a status pill, the h1, a description, actions and an optional progress bar.';

export const usage = `import { PageHero, Button } from '@collabrium/ui';

export function ProjectHero() {
  return (
    <PageHero
      illustration="tv"
      status={{ label: 'In progress', tone: 'info' }}
      meta="Due 12 Dec · 4 weeks left"
      title="Boxless - Greenfield"
      description="Boxless · Owned by Product Design · Roadmap"
      actions={<Button variant="secondary" size="sm">Edit</Button>}
      progress={{ value: 60, label: 'Project progress · 12 of 20 tasks done', valueText: '12 of 20 tasks done' }}
    />
  );
}`;

const noop = () => {};

export const thumbnail = () => (
  <PageHero illustration="tv" status={{ label: 'In progress', tone: 'info' }} title="Boxless" headingLevel={2} progress={{ value: 60, label: '12 of 20 done' }} />
);

export const anatomy: DocsAnatomyNode[] = [
  {
    name: 'PageHero',
    element: '<section>.cui-page-hero',
    description: 'Water-bg to Water-bg-strong gradient, 24px padding (16px under 640px), radius md. Named by its title.',
    children: [
      {
        name: 'Top row',
        element: '.cui-page-hero__top',
        description: 'The identity block on the left, actions on the right; the actions wrap under it when there is no room.',
        children: [
          { name: 'Illustration tile', element: '.cui-page-hero__tile', when: 'illustration', description: '96px (64px under 640px), Ill-paper, a 2px Neutral-1 border, radius md. Decorative.' },
          { name: 'Status pill', element: '.cui-page-hero__pill', when: 'status', description: '24px pill, Neutral-1, caption bold, a dot in the tone colour.' },
          { name: 'Meta', element: '.cui-page-hero__meta', when: 'meta', description: 'body2, Neutral-5, beside the pill.' },
          { name: 'Title', element: 'h1.cui-page-hero__title', description: 'h1, Neutral-9; 8px above and 4px below.' },
          { name: 'Description', element: 'p.cui-page-hero__desc', when: 'description', description: 'body1, Neutral-5, at most 60 characters a line.' },
          { name: 'Actions', element: '.cui-page-hero__actions', when: 'actions', description: 'Secondary sm Buttons, 8px apart.' },
        ],
      },
      {
        name: 'Progress',
        element: '.cui-page-hero__progress',
        when: 'progress',
        description: 'A caption label and the percentage as an h3 figure, over a 4px Neutral-1 track with a Water-pastel to Navy fill.',
      },
    ],
  },
];

export const examples: DocsExample[] = [
  {
    id: 'project',
    title: 'Project',
    description: 'Everything on: the illustration, status and timing, title, description, actions and progress.',
    render: () => (
      <PageHero
        headingLevel={2}
        illustration="tv"
        status={{ label: 'In progress', tone: 'info' }}
        meta="Due 12 Dec · 4 weeks left"
        title="Boxless - Greenfield"
        description="Boxless · Owned by Product Design · Roadmap"
        actions={
          <>
            <Button variant="secondary" size="sm" leadingIcon={Star} onClick={noop}>Pin</Button>
            <Button variant="secondary" size="sm" leadingIcon={PencilSimple} onClick={noop}>Edit</Button>
          </>
        }
        progress={{ value: 60, label: 'Project progress · 12 of 20 tasks done', valueText: '12 of 20 tasks done' }}
      />
    ),
    code: `<PageHero
  illustration="tv"
  status={{ label: 'In progress', tone: 'info' }}
  meta="Due 12 Dec · 4 weeks left"
  title="Boxless - Greenfield"
  description="Boxless · Owned by Product Design · Roadmap"
  actions={<>
    <Button variant="secondary" size="sm" leadingIcon={Star}>Pin</Button>
    <Button variant="secondary" size="sm" leadingIcon={PencilSimple}>Edit</Button>
  </>}
  progress={{ value: 60, label: 'Project progress · 12 of 20 tasks done', valueText: '12 of 20 tasks done' }}
/>`,
  },
  {
    id: 'person',
    title: 'Person, over capacity',
    description: 'A status tone that warns, and progress used as capacity.',
    render: () => (
      <PageHero
        headingLevel={2}
        illustration="people"
        status={{ label: 'Over capacity', tone: 'error' }}
        meta="This week"
        title="Tasha"
        description="Digital Creative · 4 projects"
        progress={{ value: 100, label: 'Capacity · 6 of 5 days booked', valueText: '6 of 5 days booked' }}
      />
    ),
    code: `<PageHero
  illustration="people"
  status={{ label: 'Over capacity', tone: 'error' }}
  meta="This week"
  title="Tasha"
  description="Digital Creative · 4 projects"
  progress={{ value: 100, label: 'Capacity · 6 of 5 days booked', valueText: '6 of 5 days booked' }}
/>`,
  },
  {
    id: 'minimal',
    title: 'Title and description only',
    description: 'For a page with no single state to report (a calendar, notifications).',
    render: () => (
      <PageHero headingLevel={2} illustration="calendar" title="Leave calendar" description="Who is away this month, and what it does to capacity." />
    ),
    code: `<PageHero illustration="calendar" title="Leave calendar" description="Who is away this month, and what it does to capacity." />`,
  },
  {
    id: 'illustrations',
    title: 'Illustrations',
    description: `${PAGE_HERO_ILLUSTRATIONS.length} motifs, picked by name. Pick the one closest to the page's subject.`,
    render: () => (
      <div className="docs-stack">
        {PAGE_HERO_ILLUSTRATIONS.map(m => (
          <PageHero key={m} headingLevel={3} illustration={m} title={m} />
        ))}
      </div>
    ),
    code: `<PageHero illustration="bell" title="Notifications" />`,
  },
];

export const props: DocsProp[] = [
  { name: 'title', options: 'ReactNode', default: '—', required: true, description: 'The page title. One Page hero per view.' },
  { name: 'illustration', options: PAGE_HERO_ILLUSTRATIONS.map(m => `'${m}'`).join(' | '), default: '—', description: 'The motif in the tile. Leave it out for no tile.' },
  { name: 'status', options: "{ label, tone?: 'neutral' | 'success' | 'warning' | 'error' | 'info' | 'purple' }", default: '—', description: 'A pill above the title with a coloured dot.' },
  { name: 'meta', options: 'ReactNode', default: '—', description: 'Short text beside the pill: a date or timing.' },
  { name: 'description', options: 'ReactNode', default: '—', description: 'One or two lines under the title.' },
  { name: 'actions', options: 'Buttons', default: '—', description: 'Secondary sm Buttons, top right.' },
  { name: 'progress', options: '{ value, label, valueText? }', default: '—', description: 'A bar along the bottom with its label and percentage.' },
  { name: 'headingLevel', options: '1 | 2 | 3', default: '1', description: '2 or 3 only inside a page with its own h1. The look is always h1.' },
];

export const rules: DocsRules = {
  do: [
    'Use one Page hero per main page, at the very top, for a page about one subject.',
    'Keep the description to one or two lines: who owns it, what it is.',
    'Use Secondary sm Buttons for actions; at most three.',
    'Give the progress a `valueText` that says what the number counts ("12 of 20 tasks done").',
  ],
  dont: [
    'Use it for a card or a section heading: use Card\'s title or PageHeader.',
    'Put a Primary button in it: the page\'s main action belongs in the content.',
    'Use the status pill for a count or a category: it names a state.',
    'Mix it with a PageHeader on the same page.',
  ],
};

export const accessibility: DocsAccessibility = {
  keyboard: 'Nothing in the hero itself takes focus; its actions are real Buttons in reading order after the title.',
  notes: [
    'A `<section>` named by its title (`aria-labelledby`), so it shows in the landmarks list.',
    'The illustration is decorative: `aria-hidden` and not focusable.',
    'The progress bar is a `progressbar` named by the title, with `aria-valuetext` from `valueText`. The large percentage is hidden from screen readers, so it is not read twice.',
    'Forced colours: the hero gets an outline and the bar a solid Highlight fill.',
  ],
};

export const motion: DocsMotion[] = [
  { interaction: 'Progress value changes', motion: 'The fill grows to its new width', token: '--duration-reveal, --ease-standard; none under reduced motion' },
];
