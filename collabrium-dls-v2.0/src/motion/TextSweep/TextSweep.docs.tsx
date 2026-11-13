// Documentation for Text sweep (Motion), rendered by the docs site.
// Keep it consistent with TextSweep.usage.md. Not part of the package build.
import { TextSweep } from './TextSweep';
import { ReplayDemo, ReplayLoop, motionRow } from '../lib/docs-shared.docs';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../../components/docs.types';

export const title = "Text sweep";

export const description =
  "Text that is revealed by a band of colour sweeping across it, once, when it scrolls into view, and settles to Neutral-9.";

export const usage = `import { TextSweep } from '@collabrium/ui/motion';

export function Headline() {
  return <TextSweep text="Work moves in balance" hue="navy" />;
}`;


export const thumbnail = () => (<ReplayLoop><TextSweep text="Work moves in balance" /></ReplayLoop>);

export const anatomy: DocsAnatomyNode[] = [
  {
    name: "Text sweep",
    description: "Text that is revealed by a band of colour sweeping across it, once, when it scrolls into view, and settles to Neutral-9.",
    children: [
    { name: "Text", element: "span.cui-text-sweep", description: "The words, clipped from a gradient: a band of the hue's ramp passes over them left to right, with the text hidden ahead of it and Neutral-9 behind it." },
    ],
  },
];

export const examples: DocsExample[] = [
  {
    id: "basic",
    title: "A band of Navy",
    description: "The band sweeps once as the text comes into view. Press Replay to see it again.",
    render: () => (<ReplayDemo><TextSweep text="Work moves in balance" /></ReplayDemo>),
    code: `<TextSweep text="Work moves in balance" />`,
  },
  {
    id: "hue",
    title: "Another hue",
    description: "`hue` takes Orange, Salmon Pink, Green, Navy or Amber.",
    render: () => (<ReplayDemo><TextSweep text="Every team sees the same picture" hue="orange" /></ReplayDemo>),
    code: `<TextSweep text="Every team sees the same picture" hue="orange" />`,
  },
];

export const props: DocsProp[] = [
  { name: "text", options: "string", default: "\u2014", required: true, description: "The text." },
  { name: "hue", options: "'orange' | 'salmonPink' | 'green' | 'navy' | 'amber'", default: "'navy'", description: "The hue of the band." },
];

export const rules: DocsRules = {
  do: [
    "Use it for one headline.",
    "Keep the text short.",
  ],
  dont: [
    "Don't use it on body text.",
    "Don't use it where the text must be visible immediately.",
    "Don't use it more than once on a surface.",
  ],
};

export const accessibility: DocsAccessibility = {
  keyboard: "None: it adds no controls and takes no focus.",
  notes: ["The text is in the page as normal, so assistive technology reads it from the start. In forced-colours mode and under reduced motion it is plain text. Without scripts the text stays hidden, so use it on headings that are not critical."],
};

export const motion: DocsMotion[] = [
  motionRow("The text scrolls into view", "A band of the hue's ramp sweeps left to right over about 0.9s, revealing the text.", "Amicro's timing (no DLS token)"),
  motionRow("Reduced motion", "The text is shown in Neutral-9 at once.", "\u2014"),
];
