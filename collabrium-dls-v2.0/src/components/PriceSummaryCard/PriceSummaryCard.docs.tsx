// Documentation for Price summary card, rendered by the docs site (playground).
// Keep it consistent with PriceSummaryCard.usage.md. Not part of the package build.
import { useState } from 'react';
import { PriceSummaryCard, type PriceSummaryItem } from './PriceSummaryCard';
import { Button } from '../Button';
import { CardGrid } from '../Card';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../docs.types';

const noop = () => undefined;

// The DLS gallery's line items (preview.html 2384–2431).
const sample: PriceSummaryItem[] = [
  { id: 'identity', name: 'Brand identity kit', cost: 2400 },
  { id: 'landing', name: 'Landing page build', cost: 980 },
  { id: 'copy', name: 'Copywriting', cost: 320 },
  { id: 'social', name: 'Social templates', cost: 210 },
  { id: 'photo', name: 'Photography day rate', cost: 600 },
  { id: 'email', name: 'Email campaign setup', cost: 275 },
];

function EditableDemo({ start }: { start: PriceSummaryItem[] }) {
  const [items, setItems] = useState(start);
  return (
    <div className="docs-stack">
      <CardGrid columns="functional">
        <PriceSummaryCard items={items} onRemove={id => setItems(list => list.filter(item => item.id !== id))} onAction={noop} />
      </CardGrid>
      <div className="docs-row">
        <Button variant="secondary" size="sm" onClick={() => setItems(start)}>
          Reset items
        </Button>
      </div>
    </div>
  );
}

export const title = 'Price summary card';

export const group = 'Cards';

export const description =
  'A running list of selected line items building toward a total, with one call to action. After four items the rest fold behind "Show X more".';

export const usage = `import { CardGrid, PriceSummaryCard } from '@collabrium/ui';

export function Quote({ items, setItems, buildProposal }) {
  return (
    <CardGrid columns="functional">
      <PriceSummaryCard
        items={items}
        onRemove={id => setItems(list => list.filter(item => item.id !== id))}
        onAction={buildProposal}
      />
    </CardGrid>
  );
}`;

export const thumbnail = () => <PriceSummaryCard items={sample.slice(0, 3)} onAction={noop} />;

export const anatomy: DocsAnatomyNode[] = [
  {
    name: 'Price summary card',
    element: '<div>.cui-card[data-card="price-summary"]',
    description: 'The base Card at the 280px functional width.',
    children: [
      { name: 'Title', element: '<h2>–<h6>.cui-card__title', description: 'The card title, "Price summary" by default. Drawn as h5.' },
      { name: 'Empty state', element: '<div>.cui-empty-state', when: 'no items', description: 'Section Empty state: the list icon (Fill, 48px, Neutral-4) and "No items added".' },
      {
        name: 'Item list',
        element: '<ul>.cui-price-summary__list',
        when: 'one item or more',
        description: 'The first four items, one row each. It takes the room left in the card.',
        children: [
          {
            name: 'Row',
            element: '<li>.cui-price-summary__row',
            description: 'Name, cost and remove ×, 12px apart, 8px above and below, a 1px Neutral-3 line between rows.',
            children: [
              { name: 'Name', element: 'span.cui-price-summary__name', description: 'body2 at 700, Neutral-9, one line with an ellipsis.' },
              { name: 'Cost', element: 'span.cui-price-summary__cost', description: 'caption, Neutral-5, tabular figures: `RM 2,400.00`.' },
              { name: 'Remove', element: 'button.cui-price-summary__remove', when: 'with onRemove, removable item', description: '24×24, a 14px ×. Hidden until the row is hovered or focused; always shown on touch.' },
            ],
          },
          { name: 'Overflow', element: '<li>.cui-price-summary__overflow', when: 'five items or more', description: 'Items 5 and on in their own list, folded (inert) or open, scrolling past 320px.' },
        ],
      },
      { name: 'Show X more', element: 'button.cui-price-summary__more', when: 'five items or more', description: 'label2, Neutral-9, no underline, a 14px caret; Neutral-7 on hover, with the focus ring. "Show less" when open.' },
      {
        name: 'Footer',
        element: '<div>.cui-card__footer',
        when: 'one item or more',
        description: 'The card footer: its top border divides the list from the total.',
        children: [
          { name: 'Total', element: 'div.cui-price-summary__total', description: '"Total" and the sum, label1, space-between.' },
          { name: 'Call to action', element: 'button.cui-button', description: 'Primary, md, full width, 12px under the total. "Build proposal" by default.' },
        ],
      },
    ],
  },
];

export const examples: DocsExample[] = [
  {
    id: 'filled',
    title: 'Filled, with more than four items',
    description: 'Six items: four show and two fold behind "Show 2 more". Hover a row for its ×, remove items to watch the count and the total settle, and Reset to start again.',
    render: () => <EditableDemo start={sample} />,
    code: `const [items, setItems] = useState(sample);

<CardGrid columns="functional">
  <PriceSummaryCard
    items={items}
    onRemove={id => setItems(list => list.filter(item => item.id !== id))}
    onAction={buildProposal}
  />
</CardGrid>`,
  },
  {
    id: 'four',
    title: 'Four items or fewer',
    description: 'Every item shows and there is no overflow control.',
    render: () => (
      <CardGrid columns="functional">
        <PriceSummaryCard items={sample.slice(0, 4)} onRemove={noop} onAction={noop} />
      </CardGrid>
    ),
    code: `<CardGrid columns="functional">
  <PriceSummaryCard items={items} onRemove={removeItem} onAction={buildProposal} />
</CardGrid>`,
  },
  {
    id: 'empty',
    title: 'Empty',
    description: 'Nothing selected yet: the title and the Empty state, "No items added". No total and no button.',
    render: () => (
      <CardGrid columns="functional">
        <PriceSummaryCard items={[]} onAction={noop} />
      </CardGrid>
    ),
    code: `<CardGrid columns="functional">
  <PriceSummaryCard items={[]} onAction={buildProposal} />
</CardGrid>`,
  },
  {
    id: 'locked',
    title: 'Read-only and locked items',
    description: 'Leave out `onRemove` for a summary nobody can edit, or set `removable: false` on a locked line item.',
    render: () => (
      <CardGrid columns="functional">
        <PriceSummaryCard
          items={[{ id: 'retainer', name: 'Monthly retainer', cost: 1500, removable: false }, ...sample.slice(1, 3)]}
          onRemove={noop}
          onAction={noop}
          actionLabel="Send quote"
        />
      </CardGrid>
    ),
    code: `<CardGrid columns="functional">
  <PriceSummaryCard
    items={[
      { id: 'retainer', name: 'Monthly retainer', cost: 1500, removable: false },
      { id: 'landing', name: 'Landing page build', cost: 980 },
      { id: 'copy', name: 'Copywriting', cost: 320 },
    ]}
    onRemove={removeItem}
    onAction={sendQuote}
    actionLabel="Send quote"
  />
</CardGrid>`,
  },
];

export const props: DocsProp[] = [
  { name: 'items', options: '{ id: string; name: string; cost: number; removable?: boolean }[]', default: '—', required: true, description: 'The selected line items, in the order they were added. `removable: false` for a locked item. An empty list shows the Empty state.' },
  { name: 'onAction', options: '() => void', default: '—', required: true, description: 'Called when the person presses the call to action.' },
  { name: 'onRemove', options: '(id: string) => void', default: '—', description: 'Called with an item\'s id when its × is pressed; remove it from `items` in response. Leave it out and no row shows a ×.' },
  { name: 'actionLabel', options: 'string', default: "'Build proposal'", description: 'The call to action\'s label.' },
  { name: 'title', options: 'string', default: "'Price summary'", description: 'The card\'s title.' },
  { name: 'headingLevel', options: '2 | 3 | 4 | 5 | 6', default: '3', description: 'The title\'s heading level; the look is always h5. The Empty state\'s heading is one level below.' },
  { name: 'emptyHeading', options: 'string', default: "'No items added'", description: 'The Empty state\'s heading.' },
  { name: 'currency', options: 'string', default: "'RM'", description: 'Written before every amount, with a space. Change it only when the host context needs another currency.' },
  { name: 'id, aria-*, data-*, …', options: 'native', default: '—', description: 'Passed to the card\'s `<div>`. `style` and `className` are not accepted. The ref is forwarded to the `<div>`.' },
];

export const rules: DocsRules = {
  do: [
    'Keep it in a `CardGrid columns="functional"`, so it is never narrower than 280px.',
    'Pass costs as numbers; the card writes them with the currency and two decimals (`RM 1,200.00`).',
    'Set `removable: false` on a line item people may not take out, rather than hiding the whole card\'s ×.',
    'Write a call to action that names the next step ("Build proposal", "Send quote").',
  ],
  dont: [
    'Don\'t use it for rounded summary figures like a budget; it shows exact costs.',
    'Don\'t write your own "Show more" or total row; the card keeps the count and the sum in step.',
    'Don\'t put more than one button in its footer.',
    'Don\'t let names run onto two lines; they end in an ellipsis by design.',
  ],
};

export const accessibility: DocsAccessibility = {
  keyboard: [
    { keys: 'Tab', action: 'Moves through each row\'s remove ×, "Show X more" and the call to action. Hidden rows are skipped while folded.' },
    { keys: 'Enter / Space', action: 'Removes the item, opens or folds the list, or presses the call to action.' },
  ],
  notes: [
    'The title is a real heading, and the Empty state\'s heading sits one level below it.',
    'Each × is a real button named "Remove {item name}", and it shows whenever its row holds keyboard focus.',
    '"Show X more" has `aria-expanded` and `aria-controls`; the folded rows are `inert`, so they are neither reachable nor read.',
    'After a focused × removes its row, focus moves to the next ×, or the previous one at the end of the list, or the card title when none is left.',
    'No live region: the total and the count change in place.',
  ],
};

export const motion: DocsMotion[] = [
  { interaction: 'Show X more / Show less', motion: 'The hidden rows grow open and fold shut (grid rows 0fr to 1fr). At once under reduced motion.', token: '--duration-base · --ease-settle' },
  { interaction: 'Row hover or focus', motion: 'The × fades in; its hover fill and colour change. At once under reduced motion.', token: '--duration-fast · --ease-standard' },
];
