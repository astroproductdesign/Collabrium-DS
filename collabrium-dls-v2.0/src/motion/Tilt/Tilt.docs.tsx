// Documentation for Tilt (Motion), rendered by the docs site.
// Keep it consistent with Tilt.usage.md. Not part of the package build.
import { Tilt } from './Tilt';
import { ScriptedPointer, motionRow, pointerAccessibility } from '../lib/docs-shared.docs';
import type { DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../../components/docs.types';

export const title = "Tilt";

export const description =
  "Tips its content in 3D toward the pointer while the pointer moves over it, and levels it again when the pointer leaves.";

export const usage = `import { Tilt } from '@collabrium/ui/motion';

export function Example() {
  return (
    <Tilt>
      <Card>…</Card>
    </Tilt>
  );
}`;

export const thumbnail = () => (
  <div className="docs-motion-hover"><ScriptedPointer target=".cui-tilt"><Tilt><div className="docs-motion-sample">Move the pointer over this card.</div></Tilt></ScriptedPointer></div>
);

export const anatomy: DocsAnatomyNode[] = [
  {
    name: "Tilt",
    description: "The piece. Tips its content in 3D toward the pointer while the pointer moves over it, and levels it again when the pointer leaves.",
    children: [
      { name: "Tilt", element: "div.cui-tilt", description: "Sets the 3D depth (perspective). It has no look of its own." },
      { name: "Plane", element: "div.cui-tilt__plane", description: "Rotates around X and Y toward the pointer on a spring." },
    ],
  },
];

export const examples: DocsExample[] = [
  {
    id: "basic",
    title: "A card that tips",
    description: "Move the pointer across the card. The spring settles without overshoot.",
    render: () => (<div className="docs-motion-hover"><Tilt><div className="docs-motion-sample">Move the pointer over this card.</div></Tilt></div>),
    code: `<Tilt><div className="docs-motion-sample">Move the pointer over this card.</div></Tilt>`,
  },
  {
    id: "strong",
    title: "A stronger tilt",
    description: "`intensity=\"strong\"` tips it up to 15 degrees.",
    render: () => (<div className="docs-motion-hover"><Tilt intensity="strong"><div className="docs-motion-sample">Move the pointer over this card.</div></Tilt></div>),
    code: `<Tilt intensity="strong"><div className="docs-motion-sample">Move the pointer over this card.</div></Tilt>`,
  },
];

export const props: DocsProp[] = [
  { name: "children", options: "ReactNode", default: "\u2014", required: true, description: "The content that tilts. It brings its own surface." },
  { name: "intensity", options: "'subtle' | 'medium' | 'strong'", default: "'medium'", description: "How far it tips: 6, 10 or 15 degrees." },
];

export const rules: DocsRules = {
  do: [
    'Use it on one prominent surface, where the pointer response helps.',
    'Wrap the content: it adds movement only, so the content keeps its own look.',
    'Check the content works fine without the effect: touch and keyboard users never see it.',
  ],
  dont: [
    "Don't put it on every card on a page.",
    "Don't use it where precise aiming matters while the content moves.",
    "Don't make anything depend on it: it is polish, not information.",
  ],
};

export const accessibility = pointerAccessibility("Reduced motion switches it off: the content does not tilt.");

export const motion: DocsMotion[] = [
  motionRow("Pointer moves over it", "It tips toward the pointer by up to the intensity, on a spring that settles without overshoot (damping 20, stiffness 200, mass 0.5).", "Amicro's spring (settles, no token)"),
  motionRow("Pointer leaves", "It levels again.", "Amicro's spring (settles, no token)"),
  motionRow("Reduced motion", "It does not tilt.", "\u2014"),
];
