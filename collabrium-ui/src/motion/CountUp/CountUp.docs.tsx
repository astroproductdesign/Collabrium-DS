// Documentation for Count up (Motion), rendered by the docs site.
// Keep it consistent with CountUp.usage.md. Not part of the package build.
import { CountUp } from './CountUp';
import { useState } from 'react';
import { Button } from '../../components/Button';
import { ReplayDemo, ReplayLoop, motionRow } from '../lib/docs-shared.docs';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../../components/docs.types';

export const title = "Count up";

export const description =
  "A figure that counts up to its value when it appears and counts between values when it changes, in digits of one width so it does not shake.";

export const usage = `import { CountUp } from '@collabrium/ui/motion';

export function Stars({ count }) {
  return <CountUp value={count} suffix=" stars" />;
}`;

function Stepper() {
  const [value, setValue] = useState(2492);
  return (
    <div className="docs-stack">
      <p className="docs-motion-sample"><CountUp value={value} suffix=" stars" /></p>
      <Button variant="secondary" size="sm" onClick={() => setValue(v => v + 250)}>Add 250</Button>
    </div>
  );
}

export const thumbnail = () => (<ReplayLoop><p className="docs-motion-sample"><CountUp value={2492} suffix=" stars" /></p></ReplayLoop>);

export const anatomy: DocsAnatomyNode[] = [
  {
    name: "Count up",
    description: "A figure that counts up to its value when it appears and counts between values when it changes, in digits of one width so it does not shake.",
    children: [
    { name: "Figure", element: "span.cui-count-up", description: "The counting figure, hidden from assistive technology, with tabular digits." },
    { name: "Final value", element: "span.cui-motion-sr", description: "The finished figure, visually hidden, so a screen reader reads the value and not the count." },
    ],
  },
];

export const examples: DocsExample[] = [
  {
    id: "basic",
    title: "Counting up",
    description: "The figure counts from zero when it appears. Press Replay to see it again.",
    render: () => (<ReplayDemo><p className="docs-motion-sample"><CountUp value={2492} suffix=" stars" /></p></ReplayDemo>),
    code: `<CountUp value={2492} suffix=" stars" />`,
  },
  {
    id: "change",
    title: "Counting between values",
    description: "Press the button: the figure counts from the value on show to the new one.",
    render: () => (<Stepper />),
    code: `const [value, setValue] = useState(2492);

<CountUp value={value} suffix=" stars" />
<Button variant="secondary" size="sm" onClick={() => setValue(v => v + 250)}>Add 250</Button>`,
  },
];

export const props: DocsProp[] = [
  { name: "value", options: "number", default: "\u2014", required: true, description: "The number to show." },
  { name: "prefix", options: "string", default: "''", description: "Text before the number, such as `$`." },
  { name: "suffix", options: "string", default: "''", description: "Text after the number." },
  { name: "format", options: "(value: number) => string", default: "whole numbers", description: "Formats the number." },
  { name: "duration", options: "DurationToken", default: "'base'", description: "A duration token." },
  { name: "ease", options: "EaseToken", default: "'reveal'", description: "An easing token." },
];

export const rules: DocsRules = {
  do: [
    "Use it for a headline figure that arrives or changes.",
    "Format the number for its unit with `format`, `prefix` and `suffix`.",
    "Keep the counting short.",
  ],
  dont: [
    "Don't count figures people need to read at once, such as a balance they are about to act on.",
    "Don't count many figures at the same time.",
    "Don't pass your own duration or easing numbers: the props take token names.",
  ],
};

export const accessibility: DocsAccessibility = {
  keyboard: "None: it adds no controls and takes no focus.",
  notes: ["A screen reader is given the final value, not the count, so it reads the figure once. Reduced motion shows the value at once."],
};

export const motion: DocsMotion[] = [
  motionRow("The figure appears", "Counts from 0 to the value.", "--duration-base \u00b7 --ease-reveal"),
  motionRow("`value` changes", "Counts from the figure on show to the new one.", "--duration-base \u00b7 --ease-reveal"),
  motionRow("Reduced motion", "The value is shown at once.", "\u2014"),
];
