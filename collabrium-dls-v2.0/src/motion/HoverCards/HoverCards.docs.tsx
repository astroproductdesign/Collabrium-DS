// Documentation for Hover cards (Motion), rendered by the docs site.
// Keep it consistent with HoverCards.usage.md. Not part of the package build.
import { HoverCards } from './HoverCards';
import { ScriptedPointer, motionRow, pointerAccessibility } from '../lib/docs-shared.docs';
import type { DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../../components/docs.types';

export const title = "Hover cards";

export const description =
  "A grid of cards where one soft highlight glides from card to card under the pointer, and to the focused card.";

export const usage = `import { HoverCards } from '@collabrium/ui/motion';

export function Example() {
  return (
    <HoverCards items={items} />
  );
}`;

const cards = [
  { id: 'reports', title: 'Reports', description: 'Every team sees the same picture of the work.' },
  { id: 'goals', title: 'Goals', description: 'Targets that move with the plan, not behind it.' },
  { id: 'people', title: 'People', description: 'Who is doing what, and who is stuck.' },
];

export const thumbnail = () => (
  <div className="docs-motion-hover" style={{ ['--cui-hovercards-min' as string]: '80px' }}>
    <ScriptedPointer target=".cui-hovercards__item" mode="cycle">
      <HoverCards items={[{ id: 'a', title: 'Reports', description: 'One picture.' }, { id: 'b', title: 'Goals', description: 'One plan.' }]} />
    </ScriptedPointer>
  </div>
);

export const anatomy: DocsAnatomyNode[] = [
  {
    name: "Hover cards",
    description: "The piece. A grid of cards where one soft highlight glides from card to card under the pointer, and to the focused card.",
    children: [
      { name: "Item", element: "div / a.cui-hovercards__item", description: "One cell of the grid. A link when it has an `href`, otherwise a plain block." },
      { name: "Highlight", element: "span.cui-hovercards__glide", description: "A Neutral-2 surface behind the active card that glides between cards." },
      { name: "Card", element: "span.cui-hovercards__card", description: "Neutral-1 surface, 1px Neutral-3 border, radius-md and 16px padding, with a heading and a description." },
    ],
  },
];

export const examples: DocsExample[] = [
  {
    id: "basic",
    title: "A highlight that glides",
    description: "Move the pointer across the cards: the highlight follows it, fading out when the pointer leaves the grid.",
    render: () => (<HoverCards items={cards} />),
    code: `<HoverCards items={cards} />`,
  },
];

export const props: DocsProp[] = [
  { name: "items", options: "HoverCardItem[]", default: "\u2014", required: true, description: "The cards, in order: `id`, `title`, `description` and an optional `href`." },
];

export const rules: DocsRules = {
  do: [
    'Use it on one prominent surface, where the pointer response helps.',
    'Wrap the content: it adds movement only, so the content keeps its own look.',
    'Check the content works fine without the effect: touch and keyboard users never see it.',
  ],
  dont: [
    "Don't put it on every card on a page.",
    "Don't use it where precise aiming matters while the content moves.",
    "Don't make anything depend on it: it is polish, not information.",
  ],
};

export const accessibility = {
  keyboard: [
    { keys: 'Tab', action: 'Moves to each card that has an `href`, and highlights it.' },
    { keys: 'Enter', action: 'On a card with an `href`, follows the link.' },
  ],
  notes: [
    'A card with an `href` is a real link, named by its heading and description. A card without one is plain content, not focusable.',
    'The highlight is decoration: it adds no role or label, and is hidden from assistive technology.',
    'Reduced motion stops the highlight travelling between cards: it fades in on the card instead.',
  ],
};

export const motion: DocsMotion[] = [
  motionRow("Pointer enters a card", "The highlight fades in behind it, or glides from the previous card.", "--duration-fast"),
  motionRow("Pointer leaves the grid", "The highlight fades out after a short delay.", "--duration-fast \u00b7 --duration-instant"),
  motionRow("Reduced motion", "The highlight does not travel: it fades in on the card instead.", "\u2014"),
];
