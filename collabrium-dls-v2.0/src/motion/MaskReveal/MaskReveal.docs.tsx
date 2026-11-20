// Documentation for Mask reveal (Motion), rendered by the docs site.
// Keep it consistent with MaskReveal.usage.md. Not part of the package build.
import { MaskReveal } from './MaskReveal';
import { ReplayDemo, ReplayLoop, motionRow } from '../lib/docs-shared.docs';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../../components/docs.types';

export const title = 'Mask reveal';

export const description =
  'Reveals an image or video through a moving shape (a circle, a wipe or a capsule), once, as it scrolls into view.';

export const usage = `import { MaskReveal } from '@collabrium/ui/motion';

export function Feature() {
  return (
    <MaskReveal shape="circle">
      <img src="/illustrations/stills-web/gen-z.jpg" alt="Gen Z character" />
    </MaskReveal>
  );
}`;

const still = (name: string, label: string) => (
  <img src={`/illustrations/stills-web/${name}.jpg`} alt={`${label} character`} width={1112} height={834} />
);

export const thumbnail = () => (
  <ReplayLoop>
    <div className="docs-mask-thumb">
      <MaskReveal shape="capsule">{still('young-families', 'Young families')}</MaskReveal>
    </div>
  </ReplayLoop>
);

export const anatomy: DocsAnatomyNode[] = [
  {
    name: 'Mask reveal',
    element: 'div.cui-mask-reveal',
    description: 'A frame with radius-lg corners on Canvas warm. It reveals once, when 20% of it is in view.',
    children: [
      { name: 'Media', element: 'img | video | picture', description: 'Your media, filling the width. The moving shape is a clip on it, so the layout never moves.' },
    ],
  },
];

export const examples: DocsExample[] = [
  {
    id: 'circle',
    title: 'Circle',
    description: 'The default: a circle grows from the centre to the full frame. Press Replay to see it again.',
    render: () => (
      <ReplayDemo>
        <div className="docs-mask-frame"><MaskReveal>{still('gen-z', 'Gen Z')}</MaskReveal></div>
      </ReplayDemo>
    ),
    code: `<MaskReveal>
  <img src="/illustrations/stills-web/gen-z.jpg" alt="Gen Z character" />
</MaskReveal>`,
  },
  {
    id: 'wipe',
    title: 'Wipe',
    description: '`shape="wipe"` opens from one side; `from` picks `left`, `right` or `below`.',
    render: () => (
      <ReplayDemo>
        <div className="docs-mask-frame"><MaskReveal shape="wipe" from="left">{still('travel-experience-seekers', 'Travel experience seekers')}</MaskReveal></div>
      </ReplayDemo>
    ),
    code: `<MaskReveal shape="wipe" from="left">
  <img src="/illustrations/stills-web/travel-experience-seekers.jpg" alt="Travel experience seekers character" />
</MaskReveal>`,
  },
  {
    id: 'capsule',
    title: 'Capsule',
    description: '`shape="capsule"`: a pill in the middle opens out to the full frame.',
    render: () => (
      <ReplayDemo>
        <div className="docs-mask-frame"><MaskReveal shape="capsule">{still('young-families', 'Young families')}</MaskReveal></div>
      </ReplayDemo>
    ),
    code: `<MaskReveal shape="capsule">
  <img src="/illustrations/stills-web/young-families.jpg" alt="Young families character" />
</MaskReveal>`,
  },
];

export const props: DocsProp[] = [
  { name: 'shape', options: "'circle' | 'wipe' | 'capsule'", default: "'circle'", description: 'The shape the media opens through.' },
  { name: 'from', options: "'left' | 'right' | 'below'", default: "'left'", description: 'Where a `wipe` opens from. Other shapes ignore it.' },
  { name: 'children', options: 'ReactNode', default: '—', required: true, description: 'One `img`, `video` or `picture`. It fills the width.' },
];

export const rules: DocsRules = {
  do: [
    'Use it on a large image or video that arrives as the person scrolls: a feature, a story, a case study.',
    'Use one shape per page, so the reveals feel like one family.',
    'Give the media its own `alt`: the reveal changes how it appears, not what it says.',
  ],
  dont: [
    "Don't wrap text, icons or small thumbnails: the shape needs room to read.",
    "Don't use it on media the person needs at once, such as the first thing on the page.",
    "Don't reveal a whole grid of images with it: one or two per screen.",
  ],
};

export const accessibility: DocsAccessibility = {
  keyboard: 'None: the frame adds no controls and takes no focus.',
  notes: [
    'Reduced motion drops the shape: the media fades in instead.',
    'The media is in the page from the start, so its `alt` is read even before the reveal.',
    'It adds no role, no label and no live region.',
  ],
};

export const motion: DocsMotion[] = [
  motionRow('20% of it scrolls into view', 'The shape opens to the full frame in 1.1s. Plays once.', '--duration-reveal × 2 · --ease-reveal'),
  motionRow('Reduced motion', 'No shape: the media fades from 0% to 100%.', '--duration-base · --ease-standard'),
];
