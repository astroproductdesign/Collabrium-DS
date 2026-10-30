// Documentation for Slide right (Motion), rendered by the docs site.
// Keep it consistent with SlideRight.usage.md. Not part of the package build.
import { SlideRight } from './SlideRight';
import { LoopDemo, ShowDemo, appearProp, childrenProp, durationProp, easeProp, motionRow, showProp, wrapperAccessibility, wrapperRules } from '../lib/docs-shared.docs';
import type { DocsAnatomyNode, DocsExample, DocsMotion, DocsProp } from '../../components/docs.types';

export const title = 'Slide right';

export const description =
  'Moves content right into place by 8px while it fades in, and back out when it is hidden. Moves right into place, arriving from the left.';

export const usage = `import { SlideRight } from '@collabrium/ui/motion';

export function Result({ show }) {
  return (
    <SlideRight show={show}>
      <p>Your report is ready.</p>
    </SlideRight>
  );
}`;

export const thumbnail = () => (
  <LoopDemo>{show => (
    <SlideRight show={show}>
      <p className="docs-motion-sample">Your report is ready.</p>
    </SlideRight>
  )}</LoopDemo>
);

export const anatomy: DocsAnatomyNode[] = [
  {
    name: 'Slide right',
    element: '<div>',
    description: 'A wrapper around your content. It has no styling of its own: no padding, border or background, only the movement.',
    children: [
      { name: 'Content', description: 'Whatever you put inside. It starts 8px to the left of its place at 0% opacity and ends in place at 100%.' },
    ],
  },
];

export const examples: DocsExample[] = [
  {
    id: 'basic',
    title: 'Show and hide',
    description: 'Moves right into place, arriving from the left. For going back a step or revealing a panel from the left edge. Press the button to see it enter and leave; it is removed from the page once it has left.',
    render: () => (
      <ShowDemo>{show => (
        <SlideRight show={show}>
          <p className="docs-motion-sample">Your report is ready.</p>
        </SlideRight>
      )}</ShowDemo>
    ),
    code: `const [show, setShow] = useState(true);

<Button variant="secondary" size="sm" onClick={() => setShow(s => !s)}>
  {show ? 'Hide' : 'Show'}
</Button>
<SlideRight show={show}>
  <p>Your report is ready.</p>
</SlideRight>`,
  },
  {
    id: 'tokens',
    title: 'A faster arrival',
    description: 'For small content such as a hint, `duration="fast"` keeps the movement quick. Both props take token names, never numbers.',
    render: () => (
      <ShowDemo>{show => (
        <SlideRight show={show} duration="fast" ease="standard">
          <p className="docs-motion-sample">Saved just now.</p>
        </SlideRight>
      )}</ShowDemo>
    ),
    code: `<SlideRight show={show} duration="fast" ease="standard">
  <p>Saved just now.</p>
</SlideRight>`,
  },
];

export const props: DocsProp[] = [showProp, durationProp('base'), easeProp('settle'), appearProp, childrenProp];

export const rules = wrapperRules;

export const accessibility = wrapperAccessibility('Reduced motion drops the 8px travel and keeps the fade: the content still appears and leaves, it just does not move.');

export const motion: DocsMotion[] = [
  motionRow('Content is shown', 'Fades in from 0% to 100% while moving 8px right into place.', '--duration-base · --ease-settle'),
  motionRow('Content is hidden', 'The same, in reverse, then the content is removed.', '--duration-base · --ease-settle'),
  motionRow('Reduced motion', 'The 8px travel is dropped; the fade stays.', '—'),
];
