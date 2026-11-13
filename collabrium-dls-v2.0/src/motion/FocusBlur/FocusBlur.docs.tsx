// Documentation for Focus blur (Motion), rendered by the docs site.
// Keep it consistent with FocusBlur.usage.md. Not part of the package build.
import { FocusBlur } from './FocusBlur';
import { motionRow } from '../lib/docs-shared.docs';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../../components/docs.types';

export const title = "Focus blur";

export const description =
  "A row where pointing at one item softens the others: they blur and fade while it stays sharp. Pure CSS, with no script.";

export const usage = `import { FocusBlur } from '@collabrium/ui/motion';

export function Words() {
  return (
    <FocusBlur>
      <span>Animations</span>
      <span>Transitions</span>
    </FocusBlur>
  );
}`;

function FocusBlurPicture() {
  return (
    <div className="docs-motion-hover" aria-hidden="true">
      <span className="docs-focus-blur-picture">
        <span>Animations</span>
        <span>Transitions</span>
        <span>Physics</span>
      </span>
    </div>
  );
}
const words = ['Animations', 'Transitions', 'Physics', 'Micro-UI'];

export const thumbnail = () => (<FocusBlurPicture />);

export const anatomy: DocsAnatomyNode[] = [
  {
    name: "Focus blur",
    description: "A row where pointing at one item softens the others: they blur and fade while it stays sharp.",
    children: [
    { name: "Row", element: "div.cui-focus-blur", description: "A wrapping row. Each direct child takes part: when the pointer is on one, the others blur 4px and drop to 35% opacity." },
    ],
  },
];

export const examples: DocsExample[] = [
  {
    id: "words",
    title: "Words",
    description: "Move the pointer across the words: the others soften.",
    render: () => (<div className="docs-motion-hover"><FocusBlur>{words.map(w => <span key={w} className="docs-motion-sample">{w}</span>)}</FocusBlur></div>),
    code: `<FocusBlur>
  {words.map(w => <span key={w}>{w}</span>)}
</FocusBlur>`,
  },
];

export const props: DocsProp[] = [
  { name: "children", options: "ReactNode", default: "\u2014", required: true, description: "The items in the row. Each direct child takes part." },
];

export const rules: DocsRules = {
  do: [
    "Use it on a short row of words or cards.",
    "Make each item work on its own: the blur is only a cue.",
  ],
  dont: [
    "Don't use it on long text: the dimmed items are hard to read.",
    "Don't put controls the person needs to read while another is pointed at.",
    "Don't use it on touch-only surfaces: it needs a real hover.",
  ],
};

export const accessibility: DocsAccessibility = {
  keyboard: "None: it adds no controls and takes no focus.",
  notes: ["The softening is only a visual cue: all the text stays in the page and is read normally. Keyboard focus softens the others the same way. It applies only where the device has a real hover."],
};

export const motion: DocsMotion[] = [
  motionRow("An item is pointed at or focused", "The other items blur 4px and fade to 35% opacity.", "--duration-base \u00b7 --ease-reveal"),
  motionRow("The pointer leaves", "The items return to sharp.", "--duration-base \u00b7 --ease-reveal"),
];
