// Documentation for Character stagger (Motion), rendered by the docs site.
// Keep it consistent with CharacterStagger.usage.md. Not part of the package build.
import { CharacterStagger } from './CharacterStagger';
import { ReplayDemo, ReplayLoop, motionRow, wrapperAccessibility } from '../lib/docs-shared.docs';
import type { DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../../components/docs.types';

export const title = "Character stagger";

export const description =
  "Text that pops in letter by letter as it scrolls into view: each letter rises into place and settles with a spring, one after another, once.";

export const usage = `import { CharacterStagger } from '@collabrium/ui/motion';

export function Example() {
  return (
    <CharacterStagger text="Collabrium" />
  );
}`;

export const thumbnail = () => (
  <ReplayLoop><CharacterStagger text="Work moves in balance" /></ReplayLoop>
);

export const anatomy: DocsAnatomyNode[] = [
  {
    name: "Character stagger",
    description: "The piece. Text that pops in letter by letter as it scrolls into view: each letter rises into place and settles with a spring, one after another, once.",
    children: [
      { name: "Letters", element: "span.cui-motion-text__piece", description: "Each letter in its own inline block, starting transparent, 8px low and 80% size, and ending in place." },
      { name: "Full text", element: "span.cui-motion-sr", description: "The whole text, visually hidden, so a screen reader reads it as one sentence." },
    ],
  },
];

export const examples: DocsExample[] = [
  {
    id: "basic",
    title: "Letters popping in",
    description: "Each letter rises 8px and grows from 80% with a spring. The spring is Amicro's own and overshoots slightly (Q-MOT-6). Press Replay to see it again.",
    render: () => (<ReplayDemo><CharacterStagger text="Work moves in balance" /></ReplayDemo>),
    code: `<CharacterStagger text="Work moves in balance" />`,
  },
];

export const props: DocsProp[] = [
  { name: "text", options: "string", default: "\u2014", required: true, description: "The text. It is split into letters." },
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
  motionRow("The text scrolls into view", "Each letter fades in, rises 8px and grows from 80% to 100% with a spring (stiffness 300, damping 18, mass 0.8), 20ms after the one before. Plays once.", "Amicro's spring (no DLS token)"),
  motionRow("Reduced motion", "The rise, the pop and the stagger are dropped: the letters fade in together.", "\u2014"),
];
