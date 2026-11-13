// Documentation for Scramble hover (Motion), rendered by the docs site.
// Keep it consistent with ScrambleHover.usage.md. Not part of the package build.
import { ScrambleHover } from './ScrambleHover';
import { ScriptedPointer, motionRow } from '../lib/docs-shared.docs';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../../components/docs.types';

export const title = "Scramble hover";

export const description =
  "Text that scrambles when the pointer enters it and settles back to itself, all at once or letter by letter from either end or the middle.";

export const usage = `import { ScrambleHover } from '@collabrium/ui/motion';

export function Title() {
  return <ScrambleHover text="Decode the universe" settle="start" />;
}`;


export const thumbnail = () => (<ScriptedPointer target=".cui-scramble"><p className="docs-motion-sample"><ScrambleHover text="Decode the universe" settle="start" /></p></ScriptedPointer>);

export const anatomy: DocsAnatomyNode[] = [
  {
    name: "Scramble hover",
    description: "Text that scrambles when the pointer enters it and settles back to itself, all at once or letter by letter from either end or the middle.",
    children: [
    { name: "Scrambling text", element: "span[aria-hidden]", description: "The letters as they scramble and settle." },
    { name: "Real text", element: "span.cui-motion-sr", description: "The real text, visually hidden, so a screen reader reads the words and not the noise." },
    ],
  },
];

export const examples: DocsExample[] = [
  {
    id: "together",
    title: "All at once",
    description: "Move the pointer over the text: every letter scrambles, then they settle together.",
    render: () => (<p className="docs-motion-sample"><ScrambleHover text="Hover to scramble" /></p>),
    code: `<ScrambleHover text="Hover to scramble" />`,
  },
  {
    id: "start",
    title: "Letter by letter",
    description: "`settle=\"start\"` settles the letters one by one from the left; `end` and `center` settle from the right and the middle.",
    render: () => (<p className="docs-motion-sample"><ScrambleHover text="Sequential reveal" settle="start" /></p>),
    code: `<ScrambleHover text="Sequential reveal" settle="start" />`,
  },
  {
    id: "symbols",
    title: "Through symbols",
    description: "`alphabet=\"symbols\"` scrambles through punctuation instead of the text's own letters.",
    render: () => (<p className="docs-motion-sample"><ScrambleHover text="Decode the universe" alphabet="symbols" settle="center" /></p>),
    code: `<ScrambleHover text="Decode the universe" alphabet="symbols" settle="center" />`,
  },
];

export const props: DocsProp[] = [
  { name: "text", options: "string", default: "\u2014", required: true, description: "The text." },
  { name: "settle", options: "'together' | 'start' | 'end' | 'center'", default: "'together'", description: "How the letters settle." },
  { name: "alphabet", options: "'text' | 'symbols'", default: "'text'", description: "What the letters scramble through." },
];

export const rules: DocsRules = {
  do: [
    "Use it on a short title or label.",
    "Make sure the real words say everything: the scramble is decoration.",
    "Use one per surface.",
  ],
  dont: [
    "Don't use it on text people must read quickly, or on controls.",
    "Don't use it on body text.",
    "Don't rely on hover alone for anything: it is a flourish.",
  ],
};

export const accessibility: DocsAccessibility = {
  keyboard: "None: it adds no controls and takes no focus.",
  notes: ["The real text is in the page, visually hidden, so a screen reader reads the words; the scramble is `aria-hidden`. It answers a pointer only. Under reduced motion it does not scramble."],
};

export const motion: DocsMotion[] = [
  motionRow("The pointer enters", "The letters scramble every 40ms, then settle back: together after 10 frames, or one by one.", "Amicro's timing (no DLS token)"),
  motionRow("Reduced motion", "No scramble.", "\u2014"),
];
