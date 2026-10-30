// Documentation for Card, rendered by the docs site (playground).
// Keep it consistent with Card.usage.md. Not part of the package build.
import { useState } from 'react';
import { ChartLineUp, Drop, Plant } from '@phosphor-icons/react';
import { Button } from '../Button';
import { Card, CardFooter, CardGrid, CardHeader, CardList, CardTitle, IconChip } from './Card';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../docs.types';

export const title = 'Card';

export const description =
  'The base surface for grouping content: dashboard tiles, list items, panels. Neutral-1 with a 1px border and a soft shadow, with an optional icon-chip header, a footer, an element accent or tint, a checkbox for selecting it, a feature-tile variant with a list of points and a full-width button, and a grid that lays cards out.';

export const usage = `import { Card, CardHeader, CardFooter, CardGrid } from '@collabrium/ui';

export function Reports() {
  return (
    <CardGrid>
      <Card>
        <CardHeader title="Weekly report" subtitle="Updated 2 hours ago" />
        <p>Orders are up 12% on last week.</p>
        <CardFooter>Owner: Lina M.</CardFooter>
      </Card>
    </CardGrid>
  );
}`;

export const thumbnail = () => (
  <Card>
    <CardHeader icon={Drop} title="Weekly report" subtitle="Updated 2 hours ago" />
    <p>Orders are up 12% on last week.</p>
  </Card>
);

export const anatomy: DocsAnatomyNode[] = [
  {
    name: 'Card',
    element: '<div>.cui-card',
    description: 'The surface: Neutral-1, 1px Neutral-3 border, radius-lg, shadow-1, 16px padding, a column with 8px between its parts. 100% wide, never narrower than 240px.',
    children: [
      {
        name: 'Header',
        element: '<div>.cui-card__header',
        when: 'with CardHeader',
        description: 'An optional icon chip, then the title block, 12px apart, with 8px between it and what follows.',
        children: [
          { name: 'Icon chip', element: 'span.cui-icon-chip', when: 'with an icon', description: '36×36px, radius-sm. The icon is drawn Fill in the element colour on a 12% tint of it. aria-hidden.' },
          { name: 'Title', element: '<h3>.cui-card__title', description: 'A heading drawn as h5 (16px, 700). Becomes the card\'s link or button when it has an `href` or an `onClick`.' },
          { name: 'Subtitle', element: 'p.cui-card__subtitle', when: 'with a subtitle', description: 'Caption, Neutral-5, weight 400.' },
        ],
      },
      { name: 'Checkbox', element: 'span.cui-card__select > <label>.cui-checkbox', when: 'with `selectLabel`', description: 'The real Checkbox box, 18×18px, 16px in from the top and left of the card. Hidden at rest, shown on hover, on keyboard focus and while selected (always on touch). All of the card\'s content sits in one column 16px to its right.' },
      { name: 'Point list', element: '<ul>.cui-card__list', when: 'with CardList', description: 'The feature tile\'s points: a check-circle (Fill, Obsidian, 16px) and body2 text, 8px apart, centred on one line. It takes the room left in the card.' },
      { name: 'Button', element: '<button>.cui-button', when: 'a Button as a direct child', description: 'The real Button, stretched to the full width of the card with its label centred. It sits at the bottom of the card.' },
      { name: 'Body', description: 'Your content. Paragraphs in a card are body2, Neutral-5.' },
      { name: 'Footer', element: '<div>.cui-card__footer', when: 'with CardFooter', description: '16px above it, 12px padding, a 1px Neutral-3 line on top, caption type, Neutral-5.' },
    ],
  },
  { name: 'Card grid', element: '<div>.cui-card-grid', description: 'As many equal columns as fit (at least 240px, or 280px for `functional`), 16px apart, every card in a row the height of the tallest.' },
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

function ClickableCard() {
  const [opened, setOpened] = useState(0);
  return (
    <div className="docs-stack">
      <Card>
        <CardHeader icon={ChartLineUp} title="Open the revenue report" onTitleClick={() => setOpened(n => n + 1)} subtitle="Click anywhere on the card" />
        <p>Hover raises it, and the focus halo shows when you tab to it.</p>
      </Card>
      <p className="docs-status">Opened {opened} {opened === 1 ? 'time' : 'times'}.</p>
    </div>
  );
}

export const examples: DocsExample[] = [
  {
    id: 'static',
    title: 'Static',
    description: 'The default surface: a title, some text, nothing to click.',
    render: () => (
      <CardGrid>
        <Card>
          <CardTitle>Static card</CardTitle>
          <p>Default surface, hairline border, shadow-1.</p>
        </Card>
      </CardGrid>
    ),
    code: `<Card>
  <CardTitle>Static card</CardTitle>
  <p>Default surface, hairline border, shadow-1.</p>
</Card>`,
  },
  {
    id: 'header',
    title: 'Icon-chip header',
    description: 'An icon in the owning element\'s colour on a 12% tint says which department owns the card. Add a subtitle for a second line.',
    render: () => (
      <CardGrid>
        <Card>
          <CardHeader icon={Drop} title="Icon-chip header" />
          <p>36px chip, the element at 12% tint.</p>
        </Card>
        <Card>
          <CardHeader icon={Plant} element="earth" title="With a subtitle" subtitle="Earth · Operations" />
          <p>The chip takes the element&apos;s colour.</p>
        </Card>
      </CardGrid>
    ),
    code: `<Card>
  <CardHeader icon={Drop} title="Icon-chip header" />
  <p>36px chip, the element at 12% tint.</p>
</Card>
<Card>
  <CardHeader icon={Plant} element="earth" title="With a subtitle" subtitle="Earth · Operations" />
  <p>The chip takes the element's colour.</p>
</Card>`,
  },
  {
    id: 'interactive',
    title: 'Interactive',
    description: 'Give the title an `onClick` (a button) or an `href` (a link) and the whole card is clickable. Other buttons inside the card stay separate.',
    render: () => <ClickableCard />,
    code: `<Card>
  <CardHeader icon={ChartLineUp} title="Open the revenue report" onTitleClick={open} subtitle="Click anywhere on the card" />
  <p>Hover raises it, and the focus halo shows when you tab to it.</p>
</Card>`,
  },
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
  {
    id: 'accent',
    title: 'Element-accented',
    description: 'A 3px top border in the owning element\'s colour. The rest of the card stays neutral.',
    render: () => (
      <CardGrid>
        {(['fire', 'wood', 'earth', 'water', 'gold'] as const).map(element => (
          <Card key={element} accent={element}>
            <CardTitle>{element[0].toUpperCase() + element.slice(1)}</CardTitle>
            <p>Top border only.</p>
          </Card>
        ))}
      </CardGrid>
    ),
    code: `<Card accent="wood">
  <CardTitle>Wood</CardTitle>
  <p>Top border only.</p>
</Card>`,
  },
  {
    id: 'tint',
    title: 'Element-tinted',
    description: 'The whole card in the element\'s -bg tint. Use sparingly: the icon chip is usually the better signal.',
    render: () => (
      <CardGrid>
        <Card tint="water">
          <CardTitle>Water</CardTitle>
          <p>Only for content that this element owns.</p>
        </Card>
        <Card tint="gold">
          <CardTitle>Gold</CardTitle>
          <p>Only for content that this element owns.</p>
        </Card>
      </CardGrid>
    ),
    code: `<Card tint="water">
  <CardTitle>Water</CardTitle>
  <p>Only for content that this element owns.</p>
</Card>`,
  },
  {
    id: 'warm',
    title: 'Warm',
    description: 'The warm canvas card fill, with no border, for a surface that blends into the page: a quote block, a featured figure.',
    render: () => (
      <CardGrid>
        <Card surface="warm">
          <CardTitle>Warm surface</CardTitle>
          <p>Brand and editorial canvas: decks, specimens, not product UI.</p>
        </Card>
      </CardGrid>
    ),
    code: `<Card surface="warm">
  <CardTitle>Warm surface</CardTitle>
  <p>Brand and editorial canvas: decks, specimens, not product UI.</p>
</Card>`,
  },
  {
    id: 'footer',
    title: 'With footer',
    description: 'A distinct, bordered sub-part at the bottom, for metadata such as when something was updated.',
    render: () => (
      <CardGrid>
        <Card>
          <CardTitle>With footer</CardTitle>
          <p>Footer is a distinct, bordered sub-part.</p>
          <CardFooter>Updated 2 hours ago</CardFooter>
        </Card>
      </CardGrid>
    ),
    code: `<Card>
  <CardTitle>With footer</CardTitle>
  <p>Footer is a distinct, bordered sub-part.</p>
  <CardFooter>Updated 2 hours ago</CardFooter>
</Card>`,
  },
  {
    id: 'grid',
    title: 'Grid',
    description: 'The grid decides how many columns fit. Cards fill their column, and every card in a row is as tall as the tallest.',
    render: () => (
      <CardGrid>
        <Card>
          <CardTitle>Short</CardTitle>
          <p>One line.</p>
        </Card>
        <Card>
          <CardTitle>Longer</CardTitle>
          <p>This card has more text, so its neighbours stretch to match its height.</p>
          <p>A second paragraph.</p>
        </Card>
        <Card>
          <CardTitle>Short</CardTitle>
          <p>One line.</p>
        </Card>
      </CardGrid>
    ),
    code: `<CardGrid>
  <Card>…</Card>
  <Card>…</Card>
  <Card>…</Card>
</CardGrid>`,
  },
  {
    id: 'icon-chip',
    title: 'Icon chip on its own',
    description: 'The chip is also exported for other components that mark ownership the same way, such as a stat card.',
    render: () => (
      <div className="docs-row">
        <IconChip icon={Drop} element="water" />
        <IconChip icon={Plant} element="earth" />
        <IconChip icon={ChartLineUp} element="fire" />
      </div>
    ),
    code: `<IconChip icon={Drop} element="water" />
<IconChip icon={Plant} element="earth" />
<IconChip icon={ChartLineUp} element="fire" />`,
  },
];

export const props: DocsProp[] = [
  { name: 'Card · surface', options: "'default' | 'warm'", default: "'default'", description: 'The fill. `warm` is the warm canvas card fill with no border.' },
  { name: 'Card · accent', options: "'fire' | 'wood' | 'earth' | 'water' | 'gold'", default: '—', description: 'A 3px top border in the element\'s colour.' },
  { name: 'Card · tint', options: "'fire' | 'wood' | 'earth' | 'water' | 'gold'", default: '—', description: 'Fills the whole card with the element\'s -bg tint.' },
  { name: 'Card · selectLabel', options: 'string', default: '—', description: 'Makes the card selectable and names its checkbox, e.g. "Select Q3 plan". Add it only when something else on the page acts on the ticked cards.' },
  { name: 'Card · selected / defaultSelected / onSelectedChange', options: 'boolean / boolean / (selected: boolean) => void', default: '— / false / —', description: 'The selected state: control it with `selected`, or let the card keep its own from `defaultSelected`. Only with `selectLabel`.' },
  { name: 'Card · minWidth', options: "'base' | 'functional'", default: "'base'", description: 'The narrowest the card gets: 240px, or 280px for a feature tile.' },
  { name: 'CardList · items', options: 'ReactNode[]', default: '—', required: true, description: 'The points of a feature tile, one per line. Three is the DLS\'s number.' },
  { name: 'CardTitle · children', options: 'ReactNode', default: '—', required: true, description: 'The title text.' },
  { name: 'CardTitle · headingLevel', options: '2 | 3 | 4 | 5 | 6', default: '3', description: 'The heading level. The look is always h5.' },
  { name: 'CardTitle · href', options: 'string', default: '—', description: 'Makes the title a real link stretched over the whole card.' },
  { name: 'CardTitle · onClick', options: '() => void', default: '—', description: 'Makes the title a real button stretched over the whole card.' },
  { name: 'CardHeader · title', options: 'ReactNode', default: '—', required: true, description: 'The title text.' },
  { name: 'CardHeader · subtitle', options: 'ReactNode', default: '—', description: 'A caption line under the title.' },
  { name: 'CardHeader · icon', options: 'Icon', default: '—', description: 'A Phosphor icon component for the chip (`icon={Drop}`). Leave out for no chip.' },
  { name: 'CardHeader · element', options: "'fire' | 'wood' | 'earth' | 'water' | 'gold'", default: "'water'", description: 'The chip\'s element colour.' },
  { name: 'CardHeader · headingLevel / href / onTitleClick', options: 'as CardTitle', default: '—', description: 'Passed to the title. `onTitleClick` is CardTitle\'s `onClick`.' },
  { name: 'IconChip · icon', options: 'Icon', default: '—', required: true, description: 'A Phosphor icon component, drawn Fill.' },
  { name: 'IconChip · element', options: "'fire' | 'wood' | 'earth' | 'water' | 'gold'", default: "'water'", description: 'The element that owns the content.' },
  { name: 'CardGrid · columns', options: "'base' | 'functional'", default: "'base'", description: 'The narrowest a column gets: 240px, or 280px for cards that need more room.' },
];

export const rules: DocsRules = {
  do: [
    'Let cards carry their shadow: it is the resting state.',
    'Use the icon chip (12% tint) to say which department owns a card, and the full tint only when the whole card belongs to it.',
    'Put cards in a CardGrid and let it decide the columns.',
    'Make a clickable card by giving its title an `href` or an `onClick`.',
    'On a feature tile, keep to three short points and one button, as a direct child of the card.',
    'Make a card selectable (`selectLabel`) only when something else on the page acts on the ticked cards, and name every checkbox for what it selects.',
  ],
  dont: [
    'Don\'t tint or accent a card with an element that doesn\'t own its content.',
    'Don\'t put a link or button around a whole card that has other buttons inside: use the title\'s `href` or `onClick`.',
    'Don\'t give a card a fixed width: it fills its grid cell.',
    'Don\'t build the feature tile\'s button from scratch or wrap it: use the real Button, Primary and md, as a direct child of the card.',
    'Don\'t add a checkbox "just in case": with no bulk action it is a dead control.',
    'Don\'t use a selectable card to pick one option from a group: that is Radio Card.',
    'Don\'t tint a selected card or recolour its text: the border, the shadow and the checked box are the only signals.',
  ],
};

export const accessibility: DocsAccessibility = {
  keyboard: [
    { keys: 'Tab', action: 'Moves to the card\'s checkbox (when it is selectable), then to its link or button (its title) when it has one. A card with neither is not a stop.' },
    { keys: 'Enter', action: 'Follows the link, or presses the button.' },
    { keys: 'Space', action: 'Presses the button (a link takes Enter only), or ticks the checkbox.' },
  ],
  notes: [
    'The title is a real heading, at the level you give it (3 by default), so the card is a landmark in the page outline.',
    'A clickable card is a real link or button, named by the title text. The stretched area is only for the pointer.',
    'The focus halo is the DLS shadow-focus. In forced-colours mode it becomes a 2px outline.',
    'The icon chip is aria-hidden; the title carries the meaning.',
    'The checkbox is a real checkbox named by `selectLabel`; its checked state is the selected state. Selected is shown by the border, the shadow and the checked box together, never by colour alone. On a touch screen the checkbox is always shown.',
  ],
};

export const motion: DocsMotion[] = [
  {
    interaction: 'Hovering a clickable card.',
    motion: 'The shadow deepens from shadow-1 to shadow-2. Nothing moves, so there is no reduced-motion variant.',
    token: '--duration-base · --ease-settle',
  },
  {
    interaction: 'Pointing at a selectable card, and selecting or deselecting it.',
    motion: 'The checkbox fades in; the shadow and border colour settle. The border width and padding change at once, because animating either alone makes the content jump.',
    token: '--duration-fast · --ease-standard (checkbox) · --duration-base · --ease-settle (shadow)',
  },
];
