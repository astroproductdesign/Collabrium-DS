// Documentation for Word reveal (Motion), rendered by the docs site.
// Keep it consistent with WordReveal.usage.md. Not part of the package build.
import { WordReveal } from './WordReveal';
import { ReplayDemo, ReplayLoop, motionRow, wrapperAccessibility } from '../lib/docs-shared.docs';
import type { DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../../components/docs.types';

export const title = "Word reveal";

export const description =
  "Text that appears word by word as it scrolls into view: each word rises into place and grows a little while it fades in, one after another, once.";

export const usage = `import { WordReveal } from '@collabrium/ui/motion';

export function Example() {
  return (
    <WordReveal text="Every team sees the same picture" />
  );
}`;

export const thumbnail = () => (
  <ReplayLoop><WordReveal text="Every team sees the same picture" /></ReplayLoop>
);

export const anatomy: DocsAnatomyNode[] = [
  {
    name: "Word reveal",
    description: "The piece. Text that appears word by word as it scrolls into view: each word rises into place and grows a little while it fades in, one after another, once.",
    children: [
      { name: "Words", element: "span.cui-motion-text__piece", description: "Each word in its own inline block, starting transparent, 8px low and 90% size, and ending in place. The row wraps." },
      { name: "Full text", element: "span.cui-motion-sr", description: "The whole text, visually hidden, so a screen reader reads it as one sentence." },
    ],
  },
];

export const examples: DocsExample[] = [
  {
    id: "basic",
    title: "Words rising in",
    description: "The default: `slow` with `standard`. Press Replay to see it again.",
    render: () => (<ReplayDemo><WordReveal text="Every team sees the same picture" /></ReplayDemo>),
    code: `<WordReveal text="Every team sees the same picture" />`,
  },
  {
    id: "quick",
    title: "A quicker reveal",
    description: "`duration=\"base\"` shortens each word's motion.",
    render: () => (<ReplayDemo><WordReveal text="Every team sees the same picture" duration="base" /></ReplayDemo>),
    code: `<WordReveal text="Every team sees the same picture" duration="base" />`,
  },
];

export const props: DocsProp[] = [
  { name: "text", options: "string", default: "\u2014", required: true, description: "The text. It is split into words." },
  { name: "duration", options: "DurationToken", default: "'slow'", description: "A duration token for each word." },
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
  motionRow("The text scrolls into view", "Each word fades in, rises 8px and grows from 90% to 100%, 40ms after the one before. Plays once.", "--duration-slow \u00b7 --ease-standard"),
  motionRow("Reduced motion", "The rise, the growth and the stagger are dropped: the words fade in together.", "\u2014"),
];
