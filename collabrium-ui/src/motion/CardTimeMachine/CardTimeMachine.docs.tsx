// Documentation for Card time machine (Motion), rendered by the docs site.
// Keep it consistent with CardTimeMachine.usage.md. Not part of the package build.
import { CardTimeMachine } from './CardTimeMachine';
import { AutoIndex, motionRow, sampleCards, thumbCards } from '../lib/docs-shared.docs';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../../components/docs.types';

export const title = "Card time machine";

export const description =
  "A deck that recedes into the distance, with a scrubber beside it: choosing a mark flies the cards in front of it up and away and brings that card to the front.";

export const usage = `const cards = [
  { id: 'reports', label: 'Reports', content: <img src="/reports.jpg" alt="" /> },
  { id: 'goals', label: 'Goals', content: <img src="/goals.jpg" alt="" /> },
  // five in all
];

<CardTimeMachine aria-label="Releases" items={cards} />`;

export const thumbnail = () => (<AutoIndex count={5}>{i => <CardTimeMachine aria-label="Cards" items={thumbCards.slice(0, 5)} index={i} />}</AutoIndex>);

export const anatomy: DocsAnatomyNode[] = [
  {
    name: "Card time machine",
    description: "A deck that recedes into the distance, with a scrubber beside it: choosing a mark flies the cards in front of it up and away and brings that card to the front.",
    children: [
      { name: "Stage", element: "div.cui-time-machine__stage", description: "A 220px by 135px card for each item, stacked in depth: the front one at full size, the others smaller, higher and fainter behind it. A 800px perspective." },
      { name: "Scrubber", element: "div.cui-time-machine__scrubber", description: "A column of 4px marks on the right: a long mark for each card, named by its `label`, and two short marks between each pair for the pointer. The current mark is Navy." },
      { name: "Tip", element: "span.cui-time-machine__tip", description: "The card's label beside the mark under the pointer." },
    ],
  },
];

export const examples: DocsExample[] = [
  {
    id: "basic",
    title: "Five cards",
    description: "Move the pointer down the scrubber and click a mark: the cards in front of it fly away. The marks are buttons, so Tab and Enter work too.",
    render: () => (<div className="docs-card-stage"><CardTimeMachine aria-label="Releases" items={sampleCards.slice(0, 5)} /></div>),
    code: `<CardTimeMachine aria-label="Releases" items={cards} />`,
  },  {
    id: "sizes",
    title: "Sizes",
    description: "`sm` is 0.75 and `lg` 1.25 of `md`, the designed size. The whole picture scales together, and it shrinks to fit a narrow space, so it never hangs outside its box.",
    render: () => (<div className="docs-card-stage" data-wrap><CardTimeMachine aria-label="sm time machine" items={sampleCards.slice(0, 5)} size="sm" /><CardTimeMachine aria-label="md time machine" items={sampleCards.slice(0, 5)} size="md" /><CardTimeMachine aria-label="lg time machine" items={sampleCards.slice(0, 5)} size="lg" /></div>),
    code: `<CardTimeMachine aria-label="sm time machine" items={cards} size="sm" />\n<CardTimeMachine aria-label="md time machine" items={cards} size="md" />\n<CardTimeMachine aria-label="lg time machine" items={cards} size="lg" />`,
  },
];

export const props: DocsProp[] = [
  { name: "aria-label", options: "string", default: "\u2014", required: true, description: "Names the stack." },
  { name: "items", options: "CardItem[]", default: "\u2014", required: true, description: "The cards, front to back: `id`, `label` and `content`. The `label` is also the mark on the scrubber, e.g. a date." },
  { name: "index", options: "number", default: "0", description: "The index of the card in front." },
  { name: "onIndexChange", options: "(index: number) => void", default: "\u2014", description: "Called with the index of the card that was chosen." },  { name: "size", options: "'sm' | 'md' | 'lg'", default: "'md'", description: "The size of the whole picture: `sm` is 0.75 and `lg` 1.25 of `md`, the designed size. Whatever the size, it shrinks to fit the space it is in, and never grows past the size chosen." },
];

export const rules: DocsRules = {
  do: ["Use it to step back through a history, such as releases or snapshots.", "Give every card a short `label`, such as a date: it names the scrubber's mark.", "Keep to about five to eight cards."],
  dont: ["Don't put controls in the cards: only the front card is reachable.", "Don't use it for content that must be compared side by side.", "Don't rely on the short marks: they are pointer shortcuts."],
};

export const accessibility: DocsAccessibility = {
  keyboard: [
    { keys: 'Tab', action: 'Moves through the scrubber\'s marks.' },
    { keys: 'Enter / Space', action: 'On a mark, brings that card to the front.' },
  ],
  notes: ["Each long mark is a real button named by its card's label, with `aria-current` on the current one. The short marks are decoration for the pointer and are hidden from assistive technology.", "Only the front card is exposed: the others are `aria-hidden` and inert.", "Under reduced motion the cards swap at once."],
};

export const motion: DocsMotion[] = [
  motionRow("A mark is chosen", "The cards in front of it fly up and away, scaling to 130%, and the card chosen comes to the front over 360ms.", "--duration-slow \u00b7 --ease-settle"),
  motionRow("Reduced motion", "The cards swap at once.", "\u2014"),
];
