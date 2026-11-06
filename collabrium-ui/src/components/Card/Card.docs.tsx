// Documentation for Card, rendered by the docs site (playground).
// Keep it consistent with Card.usage.md. Not part of the package build.
import { useState } from 'react';
import { ChartLineUp, Drop, Plant } from '@phosphor-icons/react';
import { Card, CardFooter, CardGrid, CardHeader, CardTitle, IconChip } from './Card';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../docs.types';

export const title = 'Card';

export const group = 'Cards';

export const description =
  'The base surface for grouping content: dashboard tiles, list items, panels. Neutral-1 with a 1px border and a soft shadow, with an optional icon-chip header, a footer, an element accent or tint, and a grid that lays cards out. The other card types build on it.';

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
          { name: 'Icon chip', element: 'span.cui-icon-chip', when: 'with an icon', description: '40×40px (`--control-height-md`), radius-sm. The icon is drawn Fill in the element colour on a 12% tint of it. aria-hidden.' },
          { name: 'Title', element: '<h3>.cui-card__title', description: 'A heading drawn as h5 (16px, 700). Becomes the card\'s link or button when it has an `href` or an `onClick`.' },
          { name: 'Subtitle', element: 'p.cui-card__subtitle', when: 'with a subtitle', description: 'Caption, Neutral-5, weight 400.' },
        ],
      },
      { name: 'Body', description: 'Your content. Paragraphs in a card are body2, Neutral-5.' },
      { name: 'Footer', element: '<div>.cui-card__footer', when: 'with CardFooter', description: '16px above it, 12px padding, a 1px Neutral-3 line on top, caption type, Neutral-5.' },
    ],
  },
  { name: 'Card grid', element: '<div>.cui-card-grid', description: 'As many equal columns as fit (at least 240px, or 280px for `functional`), 16px apart, every card in a row the height of the tallest.' },
];

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
          <p>40px chip, the element at 12% tint.</p>
        </Card>
        <Card>
          <CardHeader icon={Plant} element="earth" title="With a subtitle" subtitle="Earth · Operations" />
          <p>The chip takes the element&apos;s colour.</p>
        </Card>
      </CardGrid>
    ),
    code: `<Card>
  <CardHeader icon={Drop} title="Icon-chip header" />
  <p>40px chip, the element at 12% tint.</p>
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
  { name: 'Card · minWidth', options: "'base' | 'functional'", default: "'base'", description: 'The narrowest the card gets: 240px, or 280px for a card that needs more room (USP card, Price summary card).' },
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
  ],
  dont: [
    'Don\'t tint or accent a card with an element that doesn\'t own its content.',
    'Don\'t put a link or button around a whole card that has other buttons inside: use the title\'s `href` or `onClick`.',
    'Don\'t give a card a fixed width: it fills its grid cell.',
  ],
};

export const accessibility: DocsAccessibility = {
  keyboard: [
    { keys: 'Tab', action: 'Moves to the card\'s link or button (its title) when it has one. A card with neither is not a stop.' },
    { keys: 'Enter', action: 'Follows the link, or presses the button.' },
    { keys: 'Space', action: 'Presses the button (a link takes Enter only).' },
  ],
  notes: [
    'The title is a real heading, at the level you give it (3 by default), so the card is a landmark in the page outline.',
    'A clickable card is a real link or button, named by the title text. The stretched area is only for the pointer.',
    'The focus halo is the DLS shadow-focus. In forced-colours mode it becomes a 2px outline.',
    'The icon chip is aria-hidden; the title carries the meaning.',
  ],
};

export const motion: DocsMotion[] = [
  {
    interaction: 'Hovering a clickable card.',
    motion: 'The shadow deepens from shadow-1 to shadow-2. Nothing moves, so there is no reduced-motion variant.',
    token: '--duration-base · --ease-settle',
  },
];
