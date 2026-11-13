// Documentation for Selectable card (a Card given a `selectLabel`), rendered by the docs site (playground).
// Keep it consistent with Card.usage.md. Not part of the package build.
import { useState } from 'react';
import { Plant } from '@phosphor-icons/react';
import { Button } from '../Button';
import { Card, CardGrid, CardHeader, CardTitle } from './Card';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../docs.types';

export const title = 'Selectable card';

export const group = 'Cards';

export const description =
  'A Card people can tick, for a roster that a bulk action acts on. Give the Card a `selectLabel` and it carries the real Checkbox on the left; a ticked card keeps a Selected look.';

export const usage = `import { Card, CardGrid, CardTitle } from '@collabrium/ui';

export function People({ selected, setSelected }) {
  return (
    <CardGrid>
      <Card selectLabel="Select Amirah Yusof" selected={selected} onSelectedChange={setSelected}>
        <CardTitle href="/people/amirah">Amirah Yusof</CardTitle>
        <p>Account lead, Media.</p>
      </Card>
    </CardGrid>
  );
}`;

export const thumbnail = () => (
  <Card selectLabel="Select Daniel Tan" defaultSelected>
    <CardTitle>Daniel Tan</CardTitle>
    <p>Selected.</p>
  </Card>
);

export const anatomy: DocsAnatomyNode[] = [
  {
    name: 'Selectable card',
    element: '<div>.cui-card[data-selectable]',
    description: 'The base Card. Selected (`data-selected`) is a 2px Obsidian border and shadow-3; the padding gives up 1px a side so nothing moves.',
    children: [
      { name: 'Checkbox', element: 'span.cui-card__select > <label>.cui-checkbox', when: 'with `selectLabel`', description: 'The real Checkbox box, 18×18px, 16px in from the top and left of the card. Hidden at rest, shown on hover, on keyboard focus and while selected (always on touch). All of the card\'s content sits in one column 16px to its right.' },
      { name: 'Content', description: 'The title or header, the text and the footer, in one column 16px to the right of the checkbox.' },
    ],
  },
];

function Roster() {
  const people = ['Amirah Yusof', 'Daniel Tan', 'Priya Nair', 'Lina Mohd'];
  const [selected, setSelected] = useState<Set<string>>(new Set(['Daniel Tan']));
  const set = (name: string, on: boolean) =>
    setSelected(prev => {
      const next = new Set(prev);
      if (on) next.add(name);
      else next.delete(name);
      return next;
    });
  return (
    <div className="docs-stack">
      <div className="docs-row">
        <Button variant="secondary" size="sm" disabled={selected.size === 0} onClick={() => setSelected(new Set())}>
          Clear {selected.size > 0 ? `(${selected.size})` : ''}
        </Button>
        <span className="docs-status">{selected.size === 0 ? 'Nothing selected.' : `${selected.size} selected: the toolbar acts on these.`}</span>
      </div>
      <CardGrid>
        {people.map(name => (
          <Card key={name} selectLabel={`Select ${name}`} selected={selected.has(name)} onSelectedChange={on => set(name, on)}>
            <CardTitle onClick={() => undefined}>{name}</CardTitle>
            <p>Hover the card to see the checkbox.</p>
          </Card>
        ))}
      </CardGrid>
    </div>
  );
}

export const examples: DocsExample[] = [
  {
    id: 'selectable',
    title: 'Selectable',
    description: 'Give the card a `selectLabel` and it carries a checkbox on the left, shown on hover. Tick it and the card keeps its Selected look: a 2px Obsidian border and a deeper shadow, with the checkbox staying visible.',
    render: () => (
      <CardGrid>
        <Card selectLabel="Select Amirah Yusof">
          <CardTitle onClick={() => undefined}>Amirah Yusof</CardTitle>
          <p>Hover the card to see the checkbox.</p>
        </Card>
        <Card selectLabel="Select Daniel Tan" defaultSelected>
          <CardHeader icon={Plant} element="earth" title="Daniel Tan" subtitle="Selected from the start" onTitleClick={() => undefined} />
          <p>With a header, the chip moves along, and the text lines up with the heading.</p>
        </Card>
      </CardGrid>
    ),
    code: `<Card selectLabel="Select Amirah Yusof">
  <CardTitle onClick={open}>Amirah Yusof</CardTitle>
  <p>Hover the card to see the checkbox.</p>
</Card>
<Card selectLabel="Select Daniel Tan" defaultSelected>
  <CardHeader icon={Plant} element="earth" title="Daniel Tan" subtitle="Selected from the start" onTitleClick={open} />
  <p>With a header, the chip moves along, and the text lines up with the heading.</p>
</Card>`,
  },
  {
    id: 'roster',
    title: 'Selectable, with a bulk action',
    description: 'The reason a card is selectable: something else on the page acts on the ticked cards. Control the state with `selected` and `onSelectedChange`.',
    render: () => <Roster />,
    code: `<Button disabled={selected.size === 0} onClick={clear}>Clear ({selected.size})</Button>
<CardGrid>
  {people.map(name => (
    <Card key={name} selectLabel={\`Select \${name}\`} selected={selected.has(name)} onSelectedChange={on => set(name, on)}>
      <CardTitle onClick={open}>{name}</CardTitle>
      <p>…</p>
    </Card>
  ))}
</CardGrid>`,
  },
];

export const props: DocsProp[] = [
  { name: 'selectLabel', options: 'string', default: '—', description: 'Makes the card selectable and names its checkbox, e.g. "Select Q3 plan". Add it only when something else on the page acts on the ticked cards.' },
  { name: 'selected / defaultSelected / onSelectedChange', options: 'boolean / boolean / (selected: boolean) => void', default: '— / false / —', description: 'The selected state: control it with `selected`, or let the card keep its own from `defaultSelected`. Only with `selectLabel`.' },
  { name: 'Card props', options: 'as Card', default: '—', description: 'Everything else is the base Card\'s (`surface`, `accent`, `tint`, `minWidth`). See Card.' },
];

export const rules: DocsRules = {
  do: [
    'Make a card selectable (`selectLabel`) only when something else on the page acts on the ticked cards, and name every checkbox for what it selects.',
    'Keep the title\'s own `href` or `onClick`: ticking and opening are two separate actions.',
  ],
  dont: [
    'Don\'t add a checkbox "just in case": with no bulk action it is a dead control.',
    'Don\'t use a selectable card to pick one option from a group: that is Radio Card.',
    'Don\'t tint a selected card or recolour its text: the border, the shadow and the checked box are the only signals.',
  ],
};

export const accessibility: DocsAccessibility = {
  keyboard: [
    { keys: 'Tab', action: 'Moves to the checkbox first, then to the title\'s link or button.' },
    { keys: 'Space', action: 'Ticks or unticks the checkbox.' },
  ],
  notes: [
    'The checkbox is a real checkbox named by `selectLabel`; its checked state is the selected state. Selected is shown by the border, the shadow and the checked box together, never by colour alone. On a touch screen the checkbox is always shown.',
  ],
};

export const motion: DocsMotion[] = [
  {
    interaction: 'Pointing at a selectable card, and selecting or deselecting it.',
    motion: 'The checkbox fades in; the shadow and border colour settle. The border width and padding change at once, because animating either alone makes the content jump.',
    token: '--duration-fast · --ease-standard (checkbox) · --duration-base · --ease-settle (shadow)',
  },
];
