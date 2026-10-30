// Documentation for Card carousel (Motion), rendered by the docs site.
// Keep it consistent with CardCarousel.usage.md. Not part of the package build.
import { CardCarousel } from './CardCarousel';
import { AutoIndex, motionRow, sampleCards, thumbCards } from '../lib/docs-shared.docs';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../../components/docs.types';

export const title = "Card carousel";

export const description =
  "A row of cards that slides sideways, one in front at a time. Pointing at it fans the others. Previous and Next buttons, a dot per card and the arrow keys change the card in front.";

export const usage = `const cards = [
  { id: 'reports', label: 'Reports', content: <img src="/reports.jpg" alt="" /> },
  { id: 'goals', label: 'Goals', content: <img src="/goals.jpg" alt="" /> },
  // five in all
];

<CardCarousel aria-label="Trips" items={cards} />`;

export const thumbnail = () => (<AutoIndex count={5}>{i => <CardCarousel aria-label="Cards" items={thumbCards.slice(0, 5)} index={i} />}</AutoIndex>);

export const anatomy: DocsAnatomyNode[] = [
  {
    name: "Card carousel",
    description: "A row of cards that slides sideways, one in front at a time.",
    children: [
      { name: "Carousel", element: "div[role=group].cui-card-carousel", description: "A group with `aria-roledescription=\"carousel\"`." },
      { name: "Slide", element: "div.cui-card-carousel__slide", description: "A 160px slide holding a caption and a 110px card. The slide in front is enlarged and its caption shown; the others are smaller, turned and inert." },
      { name: "Controls", element: "div.cui-card-controls", description: "Previous and Next (secondary small icon buttons) and a dot per card; the current dot is a long pill." },
    ],
  },
];

export const examples: DocsExample[] = [
  {
    id: "basic",
    title: "Five cards",
    description: "Press Next, click a dot, or use the arrow keys. Move the pointer over the row to fan the other cards.",
    render: () => (<div className="docs-card-stage"><CardCarousel aria-label="Trips" items={sampleCards.slice(0, 5)} /></div>),
    code: `<CardCarousel aria-label="Trips" items={cards} />`,
  },  {
    id: "sizes",
    title: "Sizes",
    description: "`sm` is 0.75 and `lg` 1.25 of `md`, the designed size. The whole picture scales together, and it shrinks to fit a narrow space, so it never hangs outside its box.",
    render: () => (<div className="docs-card-stage" data-wrap><CardCarousel aria-label="sm carousel" items={sampleCards.slice(0, 5)} size="sm" /><CardCarousel aria-label="md carousel" items={sampleCards.slice(0, 5)} size="md" /><CardCarousel aria-label="lg carousel" items={sampleCards.slice(0, 5)} size="lg" /></div>),
    code: `<CardCarousel aria-label="sm carousel" items={cards} size="sm" />\n<CardCarousel aria-label="md carousel" items={cards} size="md" />\n<CardCarousel aria-label="lg carousel" items={cards} size="lg" />`,
  },
];

export const props: DocsProp[] = [
  { name: "aria-label", options: "string", default: "\u2014", required: true, description: "Names the carousel." },
  { name: "items", options: "CardItem[]", default: "\u2014", required: true, description: "The cards, in order: `id`, `label` and `content`." },
  { name: "index", options: "number", default: "middle card", description: "The index of the card in front." },
  { name: "onIndexChange", options: "(index: number) => void", default: "\u2014", description: "Called with the index of the card that was chosen." },  { name: "size", options: "'sm' | 'md' | 'lg'", default: "'md'", description: "The size of the whole picture: `sm` is 0.75 and `lg` 1.25 of `md`, the designed size. Whatever the size, it shrinks to fit the space it is in, and never grows past the size chosen." },
];

export const rules: DocsRules = {
  do: ["Use it for a small set of picture-like cards.", "Give every card a `label`: it is the caption and the name for assistive technology.", "Keep to about five to seven cards."],
  dont: ["Don't put controls in the cards: only the card in front is reachable.", "Don't use it for long lists.", "Don't rely on the fan: it is a hover flourish."],
};

export const accessibility: DocsAccessibility = {
  keyboard: [
    { keys: 'Arrow Left / Right', action: 'With focus inside the carousel, moves the card in front.' },
    { keys: 'Tab', action: 'Moves through Previous, the dots and Next.' },
    { keys: 'Enter / Space', action: 'On a button or a dot, presses it.' },
  ],
  notes: ["A group with `aria-roledescription=\"carousel\"`; each card is a slide named \"label, n of N\". Only the card in front is exposed: the others are `aria-hidden` and inert.", "Previous and Next are real buttons and are disabled at the ends; each dot is a button named \"Go to label\" with `aria-current` on the current one.", "Under reduced motion the cards move to their places at once and do not fan."],
};

export const motion: DocsMotion[] = [
  motionRow("The card in front changes", "The track slides and the cards turn and scale to their places over 360ms.", "--duration-slow \u00b7 --ease-settle"),
  motionRow("The pointer is over the row", "The other cards turn 20 degrees per step and drop 24px per step away from the front card.", "--duration-slow \u00b7 --ease-settle"),
  motionRow("Reduced motion", "The cards move at once and do not fan.", "\u2014"),
];
