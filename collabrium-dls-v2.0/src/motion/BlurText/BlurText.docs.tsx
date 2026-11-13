// Documentation for Blur text (Motion), rendered by the docs site.
// Keep it consistent with BlurText.usage.md. Not part of the package build.
import { BlurText } from './BlurText';
import { ReplayDemo, ReplayLoop, motionRow, wrapperAccessibility } from '../lib/docs-shared.docs';
import type { DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../../components/docs.types';

export const title = "Blur text";

export const description =
  "Text that comes into focus letter by letter as it scrolls into view: each letter fades in from a blur, one after another, once.";

export const usage = `import { BlurText } from '@collabrium/ui/motion';

export function Example() {
  return (
    <BlurText text="Work moves in balance" />
  );
}`;

export const thumbnail = () => (
  <ReplayLoop><BlurText text="Work moves in balance" /></ReplayLoop>
);

export const anatomy: DocsAnatomyNode[] = [
  {
    name: "Blur text",
    description: "The piece. Text that comes into focus letter by letter as it scrolls into view: each letter fades in from a blur, one after another, once.",
    children: [
      { name: "Letters", element: "span.cui-motion-text__piece", description: "Each letter in its own inline block, starting transparent and 8px blurred and ending sharp. Hidden from assistive technology." },
      { name: "Full text", element: "span.cui-motion-sr", description: "The whole text, visually hidden, so a screen reader reads it as one sentence." },
    ],
  },
];

export const examples: DocsExample[] = [
  {
    id: "basic",
    title: "Letters coming into focus",
    description: "The default: `slow` with `standard`. The effect plays once as the text scrolls into view; press Replay to see it again.",
    render: () => (<ReplayDemo><BlurText text="Work moves in balance" /></ReplayDemo>),
    code: `<BlurText text="Work moves in balance" />`,
  },
  {
    id: "quick",
    title: "A quicker reveal",
    description: "`duration=\"base\"` shortens each letter's fade for a short headline.",
    render: () => (<ReplayDemo><BlurText text="Work moves in balance" duration="base" /></ReplayDemo>),
    code: `<BlurText text="Work moves in balance" duration="base" />`,
  },
];

export const props: DocsProp[] = [
  { name: "text", options: "string", default: "\u2014", required: true, description: "The text. It is split into letters." },
  { name: "duration", options: "DurationToken", default: "'slow'", description: "A duration token for each letter." },
  { name: "ease", options: "EaseToken", default: "'standard'", description: "An easing token." },
];

export const rules: DocsRules = {
  do: [
    'Use it once per surface, on a heading or a short line.',
    'Check the text in the page too: it is read as one sentence, so keep it a sentence.',
    'Let the defaults stand unless the line has a reason to differ.',
  ],
  dont: [
    "Don't use it on body text or anything long.",
    "Don't use it on text the person must read at once, such as errors.",
    "Don't pass your own duration or easing numbers: the props take token names.",
  ],
};

export const accessibility = wrapperAccessibility("Reduced motion drops the travel, the blur and the stagger and keeps the fade: the text still appears.");

export const motion: DocsMotion[] = [
  motionRow("The text scrolls into view", "Each letter fades from 0% and an 8px blur to 100% and sharp, 20ms after the one before. Plays once.", "--duration-slow \u00b7 --ease-standard"),
  motionRow("Reduced motion", "The blur and the stagger are dropped: the letters fade in together.", "\u2014"),
];
