// Documentation for Sticky reveal (Motion), rendered by the docs site.
// Keep it consistent with StickyReveal.usage.md. Not part of the package build.
import { StickyReveal } from './StickyReveal';
import { motionRow, StickyPicture } from '../lib/docs-shared.docs';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../../components/docs.types';

export const title = 'Sticky reveal';

export const description =
  'A scroll story: a column of steps scrolls past while a panel stays in view and shows the visual for whichever step is in the middle of the window.';

export const usage = `import { StickyReveal } from '@collabrium/ui/motion';

export function HowItWorks() {
  return (
    <StickyReveal
      steps={[
        { title: 'Connect', description: 'Bring your tools in.', visual: <ConnectImage /> },
        { title: 'Plan', description: 'Set the goals.', visual: <PlanImage /> },
      ]}
    />
  );
}`;

export const thumbnail = () => <StickyPicture />;

export const anatomy: DocsAnatomyNode[] = [
  {
    name: 'Sticky reveal',
    element: 'div.cui-sticky',
    description: 'Two columns from 720px, one below it. The steps scroll; the panel stays put.',
    children: [
      { name: 'Steps', element: 'ol.cui-sticky__steps', description: 'A numbered list of steps, each with a heading and a description. The step in the middle of the window is Neutral-9; the others are Neutral-5.' },
      { name: 'Panel', element: 'div.cui-sticky__panel', description: 'Sticks near the top of the window, in a warm card with a 1px Neutral-3 border and radius-lg. Above the steps on a narrow window.' },
      { name: 'Visual', element: 'div.cui-sticky__visual', description: 'One per step, stacked in the panel. The active step\'s visual is shown; the others are transparent, hidden from assistive technology and inert.' },
    ],
  },
];

const steps = [
  { title: 'Connect', description: 'Bring your tools in, and every team sees the same picture of the work.' },
  { title: 'Plan', description: 'Set goals that move with the plan, not behind it.' },
  { title: 'Review', description: 'See who is doing what, and who is stuck.' },
];

export const examples: DocsExample[] = [
  {
    id: 'basic',
    title: 'Three steps',
    description: 'Scroll slowly: as each step reaches the middle of the window its text darkens and the panel changes. Without a `visual` the panel shows a numbered placeholder.',
    render: () => <StickyReveal steps={steps} />,
    code: `<StickyReveal
  steps={[
    { title: 'Connect', description: 'Bring your tools in, and every team sees the same picture of the work.' },
    { title: 'Plan', description: 'Set goals that move with the plan, not behind it.' },
    { title: 'Review', description: 'See who is doing what, and who is stuck.' },
  ]}
/>`,
  },
];

export const props: DocsProp[] = [
  { name: 'steps', options: 'StickyStep[]', default: '—', required: true, description: 'The steps, in order: `title`, `description` and an optional `visual`. Two to five read well.' },
];

export const rules: DocsRules = {
  do: ['Use it for a short story that has an order, with a picture for each step.', 'Keep every step\'s description to a sentence or two.', 'Give each step a visual that shows what the text says.'],
  dont: ["Don't use it for a long list of unrelated things.", "Don't put anything the person must act on in a visual: it is inert when it is not the active step.", "Don't use more than about five steps."],
};

export const accessibility: DocsAccessibility = {
  keyboard: 'None of its own: the steps are plain text, read and scrolled to in the normal way.',
  notes: [
    'The steps are an ordered list in reading order, so every step is read whether or not it is the active one.',
    'The active step is shown by colour (Neutral-9 against Neutral-5) and by the panel, never by the text fading out: all the text stays readable.',
    'Visuals that are not active are `aria-hidden` and inert, so assistive technology reads only the one on show; give a visual its own text alternative.',
    'The motion is a fade only, so reduced motion changes nothing.',
  ],
};

export const motion: DocsMotion[] = [
  motionRow('A step reaches the middle of the window', 'Its text darkens to Neutral-9 and the panel crossfades to its visual.', '--duration-slow · --ease-standard'),
  motionRow('Reduced motion', 'No change: a fade is not travel.', '—'),
];
