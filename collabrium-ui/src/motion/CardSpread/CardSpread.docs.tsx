// Documentation for Card spread (Motion), rendered by the docs site.
// Keep it consistent with CardSpread.usage.md. Not part of the package build.
import { CardSpread } from './CardSpread';
import { LoopDemo, motionRow, sampleCards } from '../lib/docs-shared.docs';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../../components/docs.types';

export const title = "Card spread";

export const description =
  "A stack of cards that opens out when the pointer is over it, or it has focus, and closes again when it leaves: eight layouts in one piece. Pointer-driven, with cards of your own.";

export const usage = `const cards = [
  { id: 'reports', label: 'Reports', content: <img src="/reports.jpg" alt="" /> },
  { id: 'goals', label: 'Goals', content: <img src="/goals.jpg" alt="" /> },
  // five in all
];

<CardSpread aria-label="Recent boards" items={cards} layout="arc" />`;

export const thumbnail = () => (<div className="docs-card-thumb"><LoopDemo>{open => <CardSpread aria-label="Cards" items={sampleCards.slice(0, 5)} open={open} />}</LoopDemo></div>);

export const anatomy: DocsAnatomyNode[] = [
  {
    name: "Card spread",
    description: "A stack of cards that opens out when the pointer is over it, or it has focus, and closes again when it leaves: eight layouts in one piece.",
    children: [
      { name: "Stack", element: "div[role=group].cui-card-spread", description: "A 128px by 176px box, focusable so it can be opened from the keyboard. The cards fan beyond it, so leave room around it." },
      { name: "Card", element: "div.cui-card-spread__card", description: "Each card fills the box with Neutral-1, a 1px Neutral-3 border, radius-md and shadow-2, and is named by its `label`. An image fills the card." },
    ],
  },
];

export const examples: DocsExample[] = [
  {
    id: "arc",
    title: "Arc",
    description: "Move the pointer over the stack. The cards fan out along a curve from a point at the bottom of the stack. The middle card lifts.",
    render: () => (<div className="docs-card-stage"><CardSpread aria-label="Arc layout" items={sampleCards.slice(0, 5)} layout="arc" /></div>),
    code: `<CardSpread aria-label="Arc layout" items={cards} layout="arc" />`,
  },
  {
    id: "arc-7",
    title: "Arc, seven cards",
    description: "`arc` takes seven cards as well as five: it opens wider and lifts the middle card higher.",
    render: () => (<div className="docs-card-stage"><CardSpread aria-label="Seven cards in an arc" items={sampleCards} layout="arc" /></div>),
    code: `<CardSpread aria-label="Seven cards in an arc" items={cards} layout="arc" />`,
  },
  {
    id: "long-arc",
    title: "Long arc",
    description: "A wider, flatter arc: the cards spread further and turn less.",
    render: () => (<div className="docs-card-stage"><CardSpread aria-label="Long arc layout" items={sampleCards.slice(0, 5)} layout="long-arc" /></div>),
    code: `<CardSpread aria-label="Long arc layout" items={cards} layout="long-arc" />`,
  },
  {
    id: "linear",
    title: "Linear",
    description: "The cards slide into a straight row with no turning.",
    render: () => (<div className="docs-card-stage"><CardSpread aria-label="Linear layout" items={sampleCards.slice(0, 5)} layout="linear" /></div>),
    code: `<CardSpread aria-label="Linear layout" items={cards} layout="linear" />`,
  },
  {
    id: "corner",
    title: "Corner fan",
    description: "The cards turn about the stack's bottom left corner, like a hand of cards.",
    render: () => (<div className="docs-card-stage"><CardSpread aria-label="Corner fan layout" items={sampleCards.slice(0, 5)} layout="corner" /></div>),
    code: `<CardSpread aria-label="Corner fan layout" items={cards} layout="corner" />`,
  },
  {
    id: "stamp",
    title: "Stamp",
    description: "The outer cards are thrown far to each side while the middle ones stay close.",
    render: () => (<div className="docs-card-stage"><CardSpread aria-label="Stamp layout" items={sampleCards.slice(0, 5)} layout="stamp" /></div>),
    code: `<CardSpread aria-label="Stamp layout" items={cards} layout="stamp" />`,
  },
  {
    id: "cascade",
    title: "Cascade",
    description: "The cards step up and across in a staircase.",
    render: () => (<div className="docs-card-stage"><CardSpread aria-label="Cascade layout" items={sampleCards.slice(0, 5)} layout="cascade" /></div>),
    code: `<CardSpread aria-label="Cascade layout" items={cards} layout="cascade" />`,
  },
  {
    id: "scatter",
    title: "Scatter",
    description: "The cards are dealt out loosely, at uneven angles.",
    render: () => (<div className="docs-card-stage"><CardSpread aria-label="Scatter layout" items={sampleCards.slice(0, 5)} layout="scatter" /></div>),
    code: `<CardSpread aria-label="Scatter layout" items={cards} layout="scatter" />`,
  },
  {
    id: "wheel",
    title: "Wheel",
    description: "The cards turn about a point below the stack, like the spokes of a wheel.",
    render: () => (<div className="docs-card-stage"><CardSpread aria-label="Wheel layout" items={sampleCards.slice(0, 5)} layout="wheel" /></div>),
    code: `<CardSpread aria-label="Wheel layout" items={cards} layout="wheel" />`,
  },
];

export const props: DocsProp[] = [
  { name: "aria-label", options: "string", default: "\u2014", required: true, description: "Names the stack, e.g. \"Recent boards\"." },
  { name: "items", options: "CardItem[]", default: "\u2014", required: true, description: "The cards, front to back: `id`, `label` and `content`. Five for every layout; `arc` also takes seven." },
  { name: "layout", options: "'arc' | 'long-arc' | 'linear' | 'corner' | 'stamp' | 'cascade' | 'scatter' | 'wheel'", default: "'arc'", description: "How the stack opens." },
  { name: "open", options: "boolean", default: "\u2014", description: "Forces the stack open or closed. Leave out to open it on hover and focus." },
];

export const rules: DocsRules = {
  do: ["Use it to preview a small set, such as the contents of a folder or a deck.", "Leave room around the stack for the cards to open into.", "Give every card a `label`."],
  dont: ["Don't put controls in the cards: the cards turn and overlap.", "Don't use more cards than the layout takes.", "Don't use it where the person must see all the cards at once: it hides most of each."],
};

export const accessibility: DocsAccessibility = {
  keyboard: [
    { keys: 'Tab', action: 'Moves to the stack and opens it.' },
    { keys: 'Shift + Tab', action: 'Moves away and closes it.' },
  ],
  notes: ["The stack is a group named by `aria-label` and every card is a group named by its `label`, so a screen reader reads them in order whether the stack is open or not.", "A mouse opens it on hover and a tap toggles it on touch. Keyboard focus opens it too.", "Under reduced motion the cards move to their places at once, with no travel."],
};

export const motion: DocsMotion[] = [
  motionRow("The pointer enters, or the stack is focused", "Each card moves to its place in the layout over 360ms.", "--duration-slow \u00b7 --ease-settle"),
  motionRow("The pointer leaves", "The cards return to the stack.", "--duration-slow \u00b7 --ease-settle"),
  motionRow("Reduced motion", "The cards move at once.", "\u2014"),
];
