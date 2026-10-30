// Documentation for Card cover flow (Motion), rendered by the docs site.
// Keep it consistent with CardCoverFlow.usage.md. Not part of the package build.
import { CardCoverFlow } from './CardCoverFlow';
import { AutoIndex, motionRow, sampleCards, thumbCards } from '../lib/docs-shared.docs';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../../components/docs.types';

export const title = "Card cover flow";

export const description =
  "Cards in 3D, the front one flat and enlarged and the others turned away and receding, like a record browser. Choose a card with a click, the buttons, a dot or the arrow keys.";

export const usage = `const cards = [
  { id: 'reports', label: 'Reports', content: <img src="/reports.jpg" alt="" /> },
  { id: 'goals', label: 'Goals', content: <img src="/goals.jpg" alt="" /> },
  // five in all
];

<CardCoverFlow aria-label="Albums" items={cards} />`;

export const thumbnail = () => (<AutoIndex count={5}>{i => <CardCoverFlow aria-label="Cards" items={thumbCards.slice(0, 5)} index={i} />}</AutoIndex>);

export const anatomy: DocsAnatomyNode[] = [
  {
    name: "Card cover flow",
    description: "Cards in 3D, the front one flat and enlarged and the others turned away and receding, like a record browser.",
    children: [
      { name: "Cover flow", element: "div[role=group].cui-cover-flow", description: "A group with `aria-roledescription=\"carousel\"` and a 1000px perspective." },
      { name: "Card", element: "div.cui-cover-flow__card", description: "An 80px wide card, 3:4. The front one is flat, at 110%, with a caption below; the others turn 38 degrees away, step back in depth and fade." },
      { name: "Controls", element: "div.cui-card-controls", description: "Previous and Next buttons and a dot per card." },
    ],
  },
];

export const examples: DocsExample[] = [
  {
    id: "basic",
    title: "Five cards",
    description: "Click a card or a dot, press Next, or use the arrow keys.",
    render: () => (<div className="docs-card-stage"><CardCoverFlow aria-label="Albums" items={sampleCards.slice(0, 5)} /></div>),
    code: `<CardCoverFlow aria-label="Albums" items={cards} />`,
  },
];

export const props: DocsProp[] = [
  { name: "aria-label", options: "string", default: "\u2014", required: true, description: "Names the cover flow." },
  { name: "items", options: "CardItem[]", default: "\u2014", required: true, description: "The cards, in order: `id`, `label` and `content`." },
  { name: "index", options: "number", default: "middle card", description: "The index of the card in front." },
  { name: "onIndexChange", options: "(index: number) => void", default: "\u2014", description: "Called with the index of the card that was chosen." },
];

export const rules: DocsRules = {
  do: ["Use it to browse a set of covers or posters.", "Give every card a `label`.", "Keep to about five to seven cards."],
  dont: ["Don't put text the person must read on the receding cards.", "Don't use it for long lists.", "Don't use it where 3D motion would be a problem: it is switched off under reduced motion, but think about who is looking."],
};

export const accessibility: DocsAccessibility = {
  keyboard: [
    { keys: 'Arrow Left / Right', action: 'With focus inside the cover flow, moves the card in front.' },
    { keys: 'Tab', action: 'Moves through Previous, the dots and Next.' },
    { keys: 'Enter / Space', action: 'On a button or a dot, presses it.' },
  ],
  notes: ["A group with `aria-roledescription=\"carousel\"`; each card is a slide named \"label, n of N\".", "Clicking a card is a pointer shortcut: the buttons, dots and arrow keys do the same for the keyboard.", "Under reduced motion the cards sit in their places with no turning or depth."],
};

export const motion: DocsMotion[] = [
  motionRow("The card in front changes", "Each card moves along, turns and steps in depth over 360ms.", "--duration-slow \u00b7 --ease-settle"),
  motionRow("Reduced motion", "The cards move along at once, with no turning or depth.", "\u2014"),
];
