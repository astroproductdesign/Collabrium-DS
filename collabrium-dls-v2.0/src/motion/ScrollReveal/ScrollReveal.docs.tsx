// Documentation for Scroll reveal (Motion), rendered by the docs site.
// Keep it consistent with ScrollReveal.usage.md. Not part of the package build.
import { ScrollReveal } from './ScrollReveal';
import { ReplayDemo, ReplayLoop, motionRow, wrapperAccessibility } from '../lib/docs-shared.docs';
import type { DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../../components/docs.types';

export const title = 'Scroll reveal';

export const description =
  'Fades content in while it travels 8px into place, once, when it scrolls into view. Scrolling is the trigger, not a prop.';

export const usage = `import { ScrollReveal } from '@collabrium/ui/motion';

export function Feature() {
  return (
    <ScrollReveal>
      <h2>Every team sees the same picture</h2>
    </ScrollReveal>
  );
}`;

export const thumbnail = () => (
  <ReplayLoop>
    <ScrollReveal>
      <p className="docs-motion-sample">Every team sees the same picture.</p>
    </ScrollReveal>
  </ReplayLoop>
);

export const anatomy: DocsAnatomyNode[] = [
  {
    name: 'Scroll reveal',
    element: '<div>',
    description: 'A wrapper around your content. It has no styling of its own, only the movement. It starts transparent and 8px off, and ends in place when 15% of it is inside the window.',
  },
];

export const examples: DocsExample[] = [
  {
    id: 'basic',
    title: 'Revealed on scroll',
    description: 'The default: it arrives from below with `reveal` and `reveal`, the DLS pair for entrance reveals. It plays once, as soon as the content is in view; press Replay to see it again.',
    render: () => (
      <ReplayDemo>
        <ScrollReveal>
          <p className="docs-motion-sample">Every team sees the same picture.</p>
        </ScrollReveal>
      </ReplayDemo>
    ),
    code: `<ScrollReveal>
  <p>Every team sees the same picture.</p>
</ScrollReveal>`,
  },
  {
    id: 'from',
    title: 'From the side',
    description: '`from` sets where it arrives from: `below`, `above`, `right` or `left`.',
    render: () => (
      <ReplayDemo>
        <ScrollReveal from="left" duration="slow" ease="standard">
          <p className="docs-motion-sample">Goals move with the plan.</p>
        </ScrollReveal>
      </ReplayDemo>
    ),
    code: `<ScrollReveal from="left" duration="slow" ease="standard">
  <p>Goals move with the plan.</p>
</ScrollReveal>`,
  },
];

export const props: DocsProp[] = [
  { name: 'from', options: "'below' | 'above' | 'right' | 'left'", default: "'below'", description: 'Where the content arrives from.' },
  { name: 'duration', options: 'DurationToken', default: "'reveal'", description: 'A duration token. Default is the DLS entrance-reveal duration.' },
  { name: 'ease', options: 'EaseToken', default: "'reveal'", description: 'An easing token. Default is the DLS entrance-reveal easing.' },
  { name: 'children', options: 'ReactNode', default: '—', required: true, description: 'The content to reveal.' },
];

export const rules: DocsRules = {
  do: ['Use it on sections that arrive as the person scrolls: features, steps, stories.', 'Reveal the section, not every line in it.', 'Let the defaults stand unless a section has a reason to differ.'],
  dont: ["Don't wrap content the person needs at once, such as an error or the first thing on the page.", "Don't wrap everything: a page where all of it moves has no focus.", "Don't pass your own duration or easing numbers: the props take token names."],
};

export const accessibility = wrapperAccessibility('Reduced motion drops the 8px travel and keeps the fade. The content is in the page from the start, so it is read as normal even before it has been revealed.');

export const motion: DocsMotion[] = [
  motionRow('The content scrolls into view', 'Fades from 0% to 100% while moving 8px into place. Plays once.', '--duration-reveal · --ease-reveal'),
  motionRow('Reduced motion', 'The 8px travel is dropped; the fade stays.', '—'),
];
