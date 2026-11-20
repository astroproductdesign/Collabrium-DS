// Documentation for Parallax (Motion), rendered by the docs site.
// Keep it consistent with Parallax.usage.md. Not part of the package build.
import { Parallax, ParallaxLayer, type ParallaxTrigger } from './Parallax';
import { ScriptedPointer, motionRow } from '../lib/docs-shared.docs';
import { Button } from '../../components/Button';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../../components/docs.types';

export const title = 'Parallax';

export const description =
  'A scene whose layers move at different speeds as the page scrolls or the mouse moves over it, so it reads as having depth.';

export const usage = `import { Parallax, ParallaxLayer } from '@collabrium/ui/motion';

export function Hero() {
  return (
    <Parallax>
      <ParallaxLayer depth="back">{/* soft shapes */}</ParallaxLayer>
      <div className="hero">
        <ParallaxLayer depth="front"><h2>Meet your audiences</h2></ParallaxLayer>
        <ParallaxLayer depth="mid"><img src="/illustrations/stills-web/foodies.jpg" alt="Foodies character" /></ParallaxLayer>
      </div>
    </Parallax>
  );
}`;

function Scene({ trigger }: { trigger?: ParallaxTrigger }) {
  return (
    <Parallax trigger={trigger}>
      <ParallaxLayer depth="back">
        <span className="docs-parallax-shape" data-shape="1" />
        <span className="docs-parallax-shape" data-shape="2" />
      </ParallaxLayer>
      <div className="docs-parallax-hero">
        <ParallaxLayer depth="front">
          <h3 className="docs-parallax-hero__title">Meet your audiences</h3>
          <p className="docs-parallax-hero__text">Fifty-one characters, one for every segment you plan for.</p>
          <Button variant="primary">Browse audiences</Button>
        </ParallaxLayer>
        <ParallaxLayer depth="mid">
          <img className="docs-parallax-hero__art" src="/illustrations/stills-web/foodies.jpg" alt="Foodies character" width={1112} height={834} />
        </ParallaxLayer>
      </div>
    </Parallax>
  );
}

const sceneCode = (attr: string) => `<Parallax${attr}>
  <ParallaxLayer depth="back">
    <span className="shape" />
  </ParallaxLayer>
  <div className="hero">
    <ParallaxLayer depth="front">
      <h3>Meet your audiences</h3>
      <p>Fifty-one characters, one for every segment you plan for.</p>
      <Button variant="primary">Browse audiences</Button>
    </ParallaxLayer>
    <ParallaxLayer depth="mid">
      <img src="/illustrations/stills-web/foodies.jpg" alt="Foodies character" />
    </ParallaxLayer>
  </div>
</Parallax>`;

export const thumbnail = () => (
  <ScriptedPointer target=".cui-parallax">
    <Parallax trigger="pointer">
      <ParallaxLayer depth="back">
        <span className="docs-parallax-shape" data-shape="1" />
      </ParallaxLayer>
      <div className="docs-parallax-thumb">
        <ParallaxLayer depth="front"><span className="docs-parallax-thumb__line" /></ParallaxLayer>
        <ParallaxLayer depth="mid"><span className="docs-parallax-thumb__tile" /></ParallaxLayer>
      </div>
    </Parallax>
  </ScriptedPointer>
);

export const anatomy: DocsAnatomyNode[] = [
  {
    name: 'Parallax',
    element: 'div.cui-parallax',
    description: 'The scene. It clips its layers, rounds its corners (radius-lg) and sits on Canvas warm. Your own layout goes inside it.',
    children: [
      { name: 'Back layer', element: 'div.cui-parallax__layer[data-depth="back"]', description: 'Fills the scene behind everything, takes no clicks and is hidden from assistive technology. Decoration only.' },
      { name: 'Mid layer', element: 'div.cui-parallax__layer[data-depth="mid"]', description: 'In the flow. Moves a little with the scroll and leans a little.' },
      { name: 'Front layer', element: 'div.cui-parallax__layer[data-depth="front"]', description: 'In the flow, above the others. Moves against the scroll and leans most.' },
    ],
  },
];

export const examples: DocsExample[] = [
  {
    id: 'both',
    title: 'Scroll and pointer',
    description: 'The default. Scroll past the scene and move the mouse over it: the back layer drifts with the page and the front against it, and every layer leans away from the pointer.',
    render: () => <Scene />,
    code: sceneCode(''),
  },
  {
    id: 'scroll',
    title: 'Scroll only',
    description: '`trigger="scroll"`: the layers ignore the pointer. This is also what touch screens get with any trigger.',
    render: () => <Scene trigger="scroll" />,
    code: sceneCode(' trigger="scroll"'),
  },
  {
    id: 'pointer',
    title: 'Pointer only',
    description: '`trigger="pointer"`: the layers stay put as the page scrolls and only lean toward the mouse.',
    render: () => <Scene trigger="pointer" />,
    code: sceneCode(' trigger="pointer"'),
  },
];

export const props: DocsProp[] = [
  { name: 'trigger', options: "'scroll' | 'pointer' | 'both'", default: "'both'", description: 'What moves the layers. Only a mouse leans them, so touch screens get scroll only.' },
  { name: 'children', options: 'ReactNode', default: '—', required: true, description: 'The scene: `ParallaxLayer`s, and any of your own elements around them.' },
  { name: 'ParallaxLayer depth', options: "'back' | 'mid' | 'front'", default: '—', required: true, description: 'How far away the layer sits. `back` is decoration behind everything; `mid` and `front` sit in the flow.' },
  { name: 'ParallaxLayer children', options: 'ReactNode', default: '—', required: true, description: "The layer's content." },
];

export const rules: DocsRules = {
  do: [
    'Use it for one hero or feature scene on a page, where depth adds to the story.',
    'Keep words and actions in the front or mid layer, side by side with the art, never on top of it.',
    'Put only decoration in the back layer: it is hidden from assistive technology and takes no clicks.',
    'Show an illustration only over plain Canvas warm: keep back-layer shapes away from it.',
  ],
  dont: [
    "Don't use more than one Parallax in view at a time.",
    "Don't put it on a product screen where people read or work: it is for brand and marketing moments.",
    "Don't put anything a person must read or press in the back layer.",
  ],
};

export const accessibility: DocsAccessibility = {
  keyboard: 'None: the scene adds no controls and takes no focus. Buttons and links inside it work as normal.',
  notes: [
    'Reduced motion switches it off: no layer moves, with scroll or pointer.',
    'The back layer is `aria-hidden` and takes no clicks; the mid and front layers are read in source order.',
    'The movement is at most 48px and eases on a spring, so text never jumps while it is read.',
  ],
};

export const motion: DocsMotion[] = [
  motionRow('The page scrolls past', 'The back layer travels 48px with the scroll, the mid 20px, the front 24px against it, from entering the window to leaving it.', '--spacing-48 · --spacing-20 · --spacing-24'),
  motionRow('The mouse moves over it', 'Every layer leans away from the pointer: back 4px, mid 8px, front 16px.', '--spacing-4 · --spacing-8 · --spacing-16'),
  motionRow('Any movement', 'Layers follow on a spring that settles without overshoot (damping 20, stiffness 200, mass 0.5), the one Tilt uses.', 'Tilt\'s spring (no token)'),
  motionRow('Reduced motion', 'Nothing moves.', '—'),
];
