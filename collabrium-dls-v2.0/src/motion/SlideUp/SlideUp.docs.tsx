// Documentation for Slide up (Motion), rendered by the docs site.
// Keep it consistent with SlideUp.usage.md. Not part of the package build.
import { SlideUp } from './SlideUp';
import { LoopDemo, ShowDemo, appearProp, childrenProp, durationProp, easeProp, motionRow, showProp, wrapperAccessibility, wrapperRules } from '../lib/docs-shared.docs';
import type { DocsAnatomyNode, DocsExample, DocsMotion, DocsProp } from '../../components/docs.types';

export const title = 'Slide up';

export const description =
  'Moves content up into place by 8px while it fades in, and back out when it is hidden. Rises into place.';

export const usage = `import { SlideUp } from '@collabrium/ui/motion';

export function Result({ show }) {
  return (
    <SlideUp show={show}>
      <p>Your report is ready.</p>
    </SlideUp>
  );
}`;

export const thumbnail = () => (
  <LoopDemo>{show => (
    <SlideUp show={show}>
      <p className="docs-motion-sample">Your report is ready.</p>
    </SlideUp>
  )}</LoopDemo>
);

export const anatomy: DocsAnatomyNode[] = [
  {
    name: 'Slide up',
    element: '<div>',
    description: 'A wrapper around your content. It has no styling of its own: no padding, border or background, only the movement.',
    children: [
      { name: 'Content', description: 'Whatever you put inside. It starts 8px below its place at 0% opacity and ends in place at 100%.' },
    ],
  },
];

export const examples: DocsExample[] = [
  {
    id: 'basic',
    title: 'Show and hide',
    description: 'Rises into place. The default for content that arrives under something already on screen: a result, a message, a card. Press the button to see it enter and leave; it is removed from the page once it has left.',
    render: () => (
      <ShowDemo>{show => (
        <SlideUp show={show}>
          <p className="docs-motion-sample">Your report is ready.</p>
        </SlideUp>
      )}</ShowDemo>
    ),
    code: `const [show, setShow] = useState(true);

<Button variant="secondary" size="sm" onClick={() => setShow(s => !s)}>
  {show ? 'Hide' : 'Show'}
</Button>
<SlideUp show={show}>
  <p>Your report is ready.</p>
</SlideUp>`,
  },
  {
    id: 'tokens',
    title: 'A faster arrival',
    description: 'For small content such as a hint, `duration="fast"` keeps the movement quick. Both props take token names, never numbers.',
    render: () => (
      <ShowDemo>{show => (
        <SlideUp show={show} duration="fast" ease="standard">
          <p className="docs-motion-sample">Saved just now.</p>
        </SlideUp>
      )}</ShowDemo>
    ),
    code: `<SlideUp show={show} duration="fast" ease="standard">
  <p>Saved just now.</p>
</SlideUp>`,
  },
];

export const props: DocsProp[] = [showProp, durationProp('base'), easeProp('settle'), appearProp, childrenProp];

export const rules = wrapperRules;

export const accessibility = wrapperAccessibility('Reduced motion drops the 8px travel and keeps the fade: the content still appears and leaves, it just does not move.');

export const motion: DocsMotion[] = [
  motionRow('Content is shown', 'Fades in from 0% to 100% while moving 8px up into place.', '--duration-base · --ease-settle'),
  motionRow('Content is hidden', 'The same, in reverse, then the content is removed.', '--duration-base · --ease-settle'),
  motionRow('Reduced motion', 'The 8px travel is dropped; the fade stays.', '—'),
];
