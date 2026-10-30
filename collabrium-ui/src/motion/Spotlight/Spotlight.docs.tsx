// Documentation for Spotlight (Motion), rendered by the docs site.
// Keep it consistent with Spotlight.usage.md. Not part of the package build.
import { Spotlight } from './Spotlight';
import { Button } from '../../components/Button';
import { ScriptedPointer, motionRow, pointerAccessibility } from '../lib/docs-shared.docs';
import type { DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../../components/docs.types';

export const title = "Spotlight";

export const description =
  "A soft light that follows the pointer across its content and fades in when the pointer enters. It works on a card, a button or any block.";

export const usage = `import { Spotlight } from '@collabrium/ui/motion';

export function Example() {
  return (
    <Spotlight glow="navy">
      <Card>…</Card>
    </Spotlight>
  );
}`;

export const thumbnail = () => (
  <div className="docs-motion-hover"><ScriptedPointer target=".cui-spotlight"><Spotlight><div className="docs-motion-sample">Move the pointer over this card.</div></Spotlight></ScriptedPointer></div>
);

export const anatomy: DocsAnatomyNode[] = [
  {
    name: "Spotlight",
    description: "The piece. A soft light that follows the pointer across its content and fades in when the pointer enters.",
    children: [
      { name: "Spotlight", element: "div.cui-spotlight", description: "A wrapper that tracks the pointer. It has no look of its own." },
      { name: "Light", element: "span.cui-spotlight__light", description: "A radial gradient of the glow colour at 18% over the content, following the pointer. It takes no clicks and is hidden from assistive technology." },
    ],
  },
];

export const examples: DocsExample[] = [
  {
    id: "card",
    title: "Over a card",
    description: "`size=\"lg\"` suits a card. Move the pointer over it.",
    render: () => (<div className="docs-motion-hover"><Spotlight size="lg"><div className="docs-motion-sample">Move the pointer over this card.</div></Spotlight></div>),
    code: `<Spotlight size="lg"><div className="docs-motion-sample">Move the pointer over this card.</div></Spotlight>`,
  },
  {
    id: "button",
    title: "Over a button",
    description: "`size=\"sm\"` and a matching `radius` suit a button. This also covers Amicro's Glow button: put a Button inside.",
    render: () => (<div className="docs-motion-hover"><Spotlight size="sm" radius="pill" glow="orange"><Button variant="primary">Start a report</Button></Spotlight></div>),
    code: `<Spotlight size="sm" radius="pill" glow="orange"><Button variant="primary">Start a report</Button></Spotlight>`,
  },
];

export const props: DocsProp[] = [
  { name: "children", options: "ReactNode", default: "\u2014", required: true, description: "The content the light moves across." },
  { name: "glow", options: "AccentName", default: "'navy'", description: "The light's colour: Obsidian or one of the seven series colours." },
  { name: "size", options: "'sm' | 'md' | 'lg'", default: "'md'", description: "How wide the light is: 120px, 180px or 250px." },
  { name: "radius", options: "'sm' | 'md' | 'lg' | 'pill'", default: "'lg'", description: "The corner radius the light is clipped to, so it matches the content." },
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

export const accessibility = pointerAccessibility("The light has no travel of its own, so reduced motion keeps it. It is hidden from assistive technology and takes no clicks.");

export const motion: DocsMotion[] = [
  motionRow("Pointer enters", "The light fades in at the pointer.", "--duration-slow \u00b7 --ease-standard"),
  motionRow("Pointer moves", "The light follows the pointer with no smoothing.", "\u2014"),
  motionRow("Pointer leaves", "The light fades out.", "--duration-slow \u00b7 --ease-standard"),
  motionRow("Reduced motion", "No change: the light has no travel of its own.", "\u2014"),
];
