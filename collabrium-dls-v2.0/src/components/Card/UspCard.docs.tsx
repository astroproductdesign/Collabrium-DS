// Documentation for USP card (the feature tile, a Card at the functional width), rendered by the docs site
// (playground). Keep it consistent with Card.usage.md. Not part of the package build.
import { Button } from '../Button';
import { Card, CardGrid, CardList, CardTitle } from './Card';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsProp, DocsRules } from '../docs.types';

export const title = 'USP card';

export const group = 'Cards';

export const description =
  'A feature tile: a title, a description, three points and one call to action, at the 280px functional width. The button stretches to the full width and sits at the bottom of every card in the row.';

export const usage = `import { Button, Card, CardGrid, CardList, CardTitle } from '@collabrium/ui';

export function Features() {
  return (
    <CardGrid columns="functional">
      <Card minWidth="functional">
        <CardTitle>Reports</CardTitle>
        <p>Every report your team needs, in one place.</p>
        <CardList items={['Scheduled delivery', 'Shared with your whole team', 'Exports to PDF or CSV']} />
        <Button variant="primary">Start a report</Button>
      </Card>
    </CardGrid>
  );
}`;

export const thumbnail = () => (
  <Card minWidth="functional">
    <CardTitle>Reports</CardTitle>
    <CardList items={['Scheduled delivery', 'Shared with your team', 'PDF or CSV']} />
    <Button variant="primary">Start a report</Button>
  </Card>
);

export const anatomy: DocsAnatomyNode[] = [
  {
    name: 'USP card',
    element: '<div>.cui-card[data-min-width="functional"]',
    description: 'The base Card, never narrower than 280px.',
    children: [
      { name: 'Title', element: '<h3>.cui-card__title', description: 'The base card title, drawn as h5.' },
      { name: 'Description', element: '<p>', description: 'body2, Neutral-5, as every paragraph in a card.' },
      { name: 'Point list', element: '<ul>.cui-card__list', when: 'with CardList', description: 'The feature tile\'s points: a check-circle (Fill, Obsidian, 16px) and body2 text, 8px apart, centred on one line. It takes the room left in the card.' },
      { name: 'Button', element: '<button>.cui-button', when: 'a Button as a direct child', description: 'The real Button, stretched to the full width of the card with its label centred. It sits at the bottom of the card.' },
    ],
  },
];

export const examples: DocsExample[] = [
  {
    id: 'feature',
    title: 'Feature tile',
    description: 'A title, a description, three points and a call to action. Use `minWidth="functional"` (280px) and a `CardGrid` of the same, so the button stretches to the full width of the card and sits at the bottom of every card in the row.',
    render: () => (
      <CardGrid columns="functional">
        <Card minWidth="functional">
          <CardTitle>Reports</CardTitle>
          <p>Every report your team needs, in one place.</p>
          <CardList items={['Scheduled delivery', 'Shared with your whole team', 'Exports to PDF or CSV']} />
          <Button variant="primary" size="md">Start a report</Button>
        </Card>
        <Card minWidth="functional">
          <CardTitle>Planning</CardTitle>
          <p>Plan a quarter in an afternoon, with the numbers in view.</p>
          <CardList items={['Targets by team', 'Pacing at a glance', 'Notes beside each figure']} />
          <Button variant="primary" size="md">Open the planner</Button>
        </Card>
      </CardGrid>
    ),
    code: `<CardGrid columns="functional">
  <Card minWidth="functional">
    <CardTitle>Reports</CardTitle>
    <p>Every report your team needs, in one place.</p>
    <CardList items={['Scheduled delivery', 'Shared with your whole team', 'Exports to PDF or CSV']} />
    <Button variant="primary" size="md">Start a report</Button>
  </Card>
</CardGrid>`,
  },
];

export const props: DocsProp[] = [
  { name: 'Card · minWidth', options: "'base' | 'functional'", default: "'base'", description: 'Set `functional` (280px) for a feature tile.' },
  { name: 'CardList · items', options: 'ReactNode[]', default: '—', required: true, description: 'The points of a feature tile, one per line. Three is the DLS\'s number.' },
  { name: 'CardGrid · columns', options: "'base' | 'functional'", default: "'base'", description: 'Set `functional` so every column is at least 280px.' },
];

export const rules: DocsRules = {
  do: [
    'On a feature tile, keep to three short points and one button, as a direct child of the card.',
    'Put feature tiles in a `CardGrid columns="functional"`, so the buttons line up along the bottom of the row.',
  ],
  dont: [
    'Don\'t build the feature tile\'s button from scratch or wrap it: use the real Button, Primary and md, as a direct child of the card.',
    'Don\'t add a fourth point or a second button.',
  ],
};

export const accessibility: DocsAccessibility = {
  keyboard: [{ keys: 'Tab', action: 'Moves to the call to action. The card itself is not a stop.' }],
  notes: [
    'The title is a real heading (level 3 by default), drawn as h5.',
    'The points are a real list; the check-circles are aria-hidden.',
    'The call to action is the real Button, named by its label.',
  ],
};

export const motion = 'None of its own. The Button keeps its own transitions.';
