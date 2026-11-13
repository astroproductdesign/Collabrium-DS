// Documentation for Slide down (Motion), rendered by the docs site.
// Keep it consistent with SlideDown.usage.md. Not part of the package build.
import { SlideDown } from './SlideDown';
import { LoopDemo, ShowDemo, appearProp, childrenProp, durationProp, easeProp, motionRow, showProp, wrapperAccessibility, wrapperRules } from '../lib/docs-shared.docs';
import type { DocsAnatomyNode, DocsExample, DocsMotion, DocsProp } from '../../components/docs.types';

export const title = 'Slide down';

export const description =
  'Moves content down into place by 8px while it fades in, and back out when it is hidden. Drops into place.';

export const usage = `import { SlideDown } from '@collabrium/ui/motion';

export function Result({ show }) {
  return (
    <SlideDown show={show}>
      <p>Your report is ready.</p>
    </SlideDown>
  );
}`;

export const thumbnail = () => (
  <LoopDemo>{show => (
    <SlideDown show={show}>
      <p className="docs-motion-sample">Your report is ready.</p>
    </SlideDown>
  )}</LoopDemo>
);

export const anatomy: DocsAnatomyNode[] = [
  {
    name: 'Slide down',
    element: '<div>',
    description: 'A wrapper around your content. It has no styling of its own: no padding, border or background, only the movement.',
    children: [
      { name: 'Content', description: 'Whatever you put inside. It starts 8px above its place at 0% opacity and ends in place at 100%.' },
    ],
  },
];

export const examples: DocsExample[] = [
  {
    id: 'basic',
    title: 'Show and hide',
    description: 'Drops into place. For content that arrives under a header or trigger: a notice, a menu body, a banner. Press the button to see it enter and leave; it is removed from the page once it has left.',
    render: () => (
      <ShowDemo>{show => (
        <SlideDown show={show}>
          <p className="docs-motion-sample">Your report is ready.</p>
        </SlideDown>
      )}</ShowDemo>
    ),
    code: `const [show, setShow] = useState(true);

<Button variant="secondary" size="sm" onClick={() => setShow(s => !s)}>
  {show ? 'Hide' : 'Show'}
</Button>
<SlideDown show={show}>
  <p>Your report is ready.</p>
</SlideDown>`,
  },
  {
    id: 'tokens',
    title: 'A faster arrival',
    description: 'For small content such as a hint, `duration="fast"` keeps the movement quick. Both props take token names, never numbers.',
    render: () => (
      <ShowDemo>{show => (
        <SlideDown show={show} duration="fast" ease="standard">
          <p className="docs-motion-sample">Saved just now.</p>
        </SlideDown>
      )}</ShowDemo>
    ),
    code: `<SlideDown show={show} duration="fast" ease="standard">
  <p>Saved just now.</p>
</SlideDown>`,
  },
];

export const props: DocsProp[] = [showProp, durationProp('base'), easeProp('settle'), appearProp, childrenProp];

export const rules = wrapperRules;

export const accessibility = wrapperAccessibility('Reduced motion drops the 8px travel and keeps the fade: the content still appears and leaves, it just does not move.');

export const motion: DocsMotion[] = [
  motionRow('Content is shown', 'Fades in from 0% to 100% while moving 8px down into place.', '--duration-base · --ease-settle'),
  motionRow('Content is hidden', 'The same, in reverse, then the content is removed.', '--duration-base · --ease-settle'),
  motionRow('Reduced motion', 'The 8px travel is dropped; the fade stays.', '—'),
];
