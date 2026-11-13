// Documentation for Magnetic (Motion), rendered by the docs site.
// Keep it consistent with Magnetic.usage.md. Not part of the package build.
import { Magnetic } from './Magnetic';
import { Button } from '../../components/Button';
import { ScriptedPointer, motionRow, pointerAccessibility } from '../lib/docs-shared.docs';
import type { DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../../components/docs.types';

export const title = "Magnetic";

export const description =
  "Pulls its content a little toward the pointer while the pointer is over it, and lets it go when the pointer leaves. Wrap a Button.";

export const usage = `import { Magnetic } from '@collabrium/ui/motion';

export function Example() {
  return (
    <Magnetic>
      <Button variant="primary">Start a report</Button>
    </Magnetic>
  );
}`;

export const thumbnail = () => (
  <div className="docs-motion-hover"><ScriptedPointer target=".cui-magnetic"><Magnetic><Button variant="primary">Start a report</Button></Magnetic></ScriptedPointer></div>
);

export const anatomy: DocsAnatomyNode[] = [
  {
    name: "Magnetic",
    description: "The piece. Pulls its content a little toward the pointer while the pointer is over it, and lets it go when the pointer leaves.",
    children: [
      { name: "Magnetic", element: "div.cui-magnetic", description: "An inline-block wrapper that moves with a spring. It has no look of its own." },
    ],
  },
];

export const examples: DocsExample[] = [
  {
    id: "basic",
    title: "A button that follows the pointer",
    description: "Move the pointer over the button. The spring is Amicro's own and overshoots a little when it lets go (Q-MOT-6).",
    render: () => (<div className="docs-motion-hover"><Magnetic><Button variant="primary">Start a report</Button></Magnetic></div>),
    code: `<Magnetic><Button variant="primary">Start a report</Button></Magnetic>`,
  },
  {
    id: "strong",
    title: "A stronger pull",
    description: "`strength=\"strong\"` pulls it half the distance to the pointer.",
    render: () => (<div className="docs-motion-hover"><Magnetic strength="strong"><Button variant="secondary">Share</Button></Magnetic></div>),
    code: `<Magnetic strength="strong"><Button variant="secondary">Share</Button></Magnetic>`,
  },
];

export const props: DocsProp[] = [
  { name: "children", options: "ReactNode", default: "\u2014", required: true, description: "The content that is pulled: usually a Button." },
  { name: "strength", options: "'subtle' | 'medium' | 'strong'", default: "'medium'", description: "How far the content follows: 20%, 35% or 50% of the pointer's distance from its centre." },
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

export const accessibility = pointerAccessibility("Reduced motion switches it off: the content does not move.");

export const motion: DocsMotion[] = [
  motionRow("Pointer moves over it", "The content moves toward the pointer by the strength, on a spring (stiffness 150, damping 15, mass 0.6).", "Amicro's spring (no DLS token)"),
  motionRow("Pointer leaves", "The content springs back to rest.", "Amicro's spring (no DLS token)"),
  motionRow("Reduced motion", "It does not move.", "\u2014"),
];
