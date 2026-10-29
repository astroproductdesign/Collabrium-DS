// Documentation for Fade in (Motion), rendered by the docs site.
// Keep it consistent with FadeIn.usage.md. Not part of the package build.
import { FadeIn } from './FadeIn';
import { LoopDemo, ShowDemo, appearProp, childrenProp, durationProp, easeProp, motionRow, showProp, wrapperAccessibility, wrapperRules } from '../lib/docs-shared.docs';
import type { DocsAnatomyNode, DocsExample, DocsMotion, DocsProp } from '../../components/docs.types';

export const title = 'Fade in';

export const description =
  'Fades content in when it is shown and out when it is hidden. Opacity only: no travel, so it is the same with or without reduced motion.';

export const usage = `import { FadeIn } from '@collabrium/ui/motion';

export function Hint({ show }) {
  return (
    <FadeIn show={show}>
      <p>Saved just now.</p>
    </FadeIn>
  );
}`;

export const thumbnail = () => (
  <LoopDemo>{show => (
    <FadeIn show={show}>
      <p className="docs-motion-sample">Saved just now.</p>
    </FadeIn>
  )}</LoopDemo>
);

export const anatomy: DocsAnatomyNode[] = [
  {
    name: 'Fade in',
    element: '<div>',
    description: 'A wrapper around your content. It has no styling of its own, only the opacity change.',
    children: [{ name: 'Content', description: 'Whatever you put inside. It goes from 0% to 100% opacity, in place.' }],
  },
];

export const examples: DocsExample[] = [
  {
    id: 'basic',
    title: 'Show and hide',
    description: 'The ordinary fade, `base` with `standard`. Press the button to see it enter and leave; it is removed from the page once it has faded out.',
    render: () => (
      <ShowDemo>{show => (
        <FadeIn show={show}>
          <p className="docs-motion-sample">Saved just now.</p>
        </FadeIn>
      )}</ShowDemo>
    ),
    code: `const [show, setShow] = useState(true);

<Button variant="secondary" size="sm" onClick={() => setShow(s => !s)}>
  {show ? 'Hide' : 'Show'}
</Button>
<FadeIn show={show}>
  <p>Saved just now.</p>
</FadeIn>`,
  },
  {
    id: 'fast',
    title: 'A quick hint',
    description: 'For small popovers and hints, `duration="fast"` keeps the fade short.',
    render: () => (
      <ShowDemo>{show => (
        <FadeIn show={show} duration="fast">
          <p className="docs-motion-sample">Copied to clipboard.</p>
        </FadeIn>
      )}</ShowDemo>
    ),
    code: `<FadeIn show={show} duration="fast">
  <p>Copied to clipboard.</p>
</FadeIn>`,
  },
];

export const props: DocsProp[] = [showProp, durationProp('base'), easeProp('standard'), appearProp, childrenProp];

export const rules = wrapperRules;

export const accessibility = wrapperAccessibility('Reduced motion changes nothing: a fade is not travel, and the DLS keeps fades under reduced motion.');

export const motion: DocsMotion[] = [
  motionRow('Content is shown', 'Fades from 0% to 100% opacity.', '--duration-base · --ease-standard'),
  motionRow('Content is hidden', 'Fades out, then is removed.', '--duration-base · --ease-standard'),
  motionRow('Reduced motion', 'No change: the fade stays.', '—'),
];
