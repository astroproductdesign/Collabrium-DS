// Documentation for Text reveal (Motion), rendered by the docs site.
// Keep it consistent with TextReveal.usage.md. Not part of the package build.
import { TextReveal } from './TextReveal';
import { ReplayDemo, ReplayLoop, motionRow, wrapperAccessibility } from '../lib/docs-shared.docs';
import type { DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../../components/docs.types';

export const title = "Text reveal";

export const description =
  "Text that rises out from under a mask line by line as it scrolls into view, once. Split lines with a new line in the text.";

export const usage = `import { TextReveal } from '@collabrium/ui/motion';

export function Example() {
  return (
    <TextReveal text={'Every team sees\nthe same picture'} />
  );
}`;

export const thumbnail = () => (
  <ReplayLoop><TextReveal text={'Every team sees\nthe same picture'} /></ReplayLoop>
);

export const anatomy: DocsAnatomyNode[] = [
  {
    name: "Text reveal",
    description: "The piece. Text that rises out from under a mask line by line as it scrolls into view, once.",
    children: [
      { name: "Line mask", element: "span.cui-motion-lines__mask", description: "Clips its line, so the line is hidden until it rises." },
      { name: "Line", element: "span.cui-motion-lines__line", description: "Starts at 100% of its own height below the mask and ends in place." },
      { name: "Full text", element: "span.cui-motion-sr", description: "The whole text on one line, visually hidden, so a screen reader reads it as one sentence." },
    ],
  },
];

export const examples: DocsExample[] = [
  {
    id: "basic",
    title: "Lines rising out of a mask",
    description: "Each line starts below its own mask and rises into view, 120ms after the one before. Press Replay to see it again.",
    render: () => (<ReplayDemo><TextReveal text={'Every team sees\nthe same picture'} /></ReplayDemo>),
    code: `<TextReveal text={'Every team sees\nthe same picture'} />`,
  },
];

export const props: DocsProp[] = [
  { name: "text", options: "string", default: "\u2014", required: true, description: "The text. Each line, split on a new line (`\\n`), is revealed in turn." },
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
  motionRow("The text scrolls into view", "Each line rises from under its mask, 120ms after the one before. Plays once.", "--duration-reveal \u00b7 --ease-reveal \u00b7 --stagger-md"),
  motionRow("Reduced motion", "The rise and the stagger are dropped: the lines fade in together.", "\u2014"),
];
