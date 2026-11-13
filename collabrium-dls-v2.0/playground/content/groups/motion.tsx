// Overview of the Motion group, rendered by the docs site (playground). The
// parts are the animated pieces under src/motion, built on the `motion`
// library and the DLS motion tokens. Imported from '@collabrium/ui/motion'.
import type { GroupOverviewDocs } from '../../lib/group-types';

export const title = 'Motion';

export const description =
  'Animated building blocks that are not tied to one component: entrance wrappers, collapses, text effects, hover and cursor effects, scroll effects, a page transition and hooks. Every one runs on the motion tokens and respects reduced motion.';

export const overview: GroupOverviewDocs['overview'] = [
  'Motion holds the animated pieces that are not tied to one component: wrappers such as Fade in, Slide up and Collapse, and the effects built on the same timing. Loaders are not here: Loading State is the DLS component for that.',
  'Everything here takes its duration and easing from the motion tokens, never from numbers of its own. It is imported from `@collabrium/ui/motion`.',
];

export const flow: GroupOverviewDocs['flow'] = [
  { title: 'Pick by job', description: 'Wrappers animate content you already have: fade it in, slide it from a side, open it by height. Text effects reveal words, hover and cursor effects answer the pointer, scroll effects respond to the page, and hooks give your own components the same timing.' },
  { title: 'Use the tokens', description: 'Choose a duration and an easing from the token names (`fast`, `base`, `standard`). A piece never exposes a free number.' },
  { title: 'Check reduced motion', description: 'Each piece says in its page what it does when the person asks for reduced motion.' },
];

export const rulesIntro = 'These rules apply to every piece in this group.';

export const rules: GroupOverviewDocs['rules'] = [
  'Motion has a job: it explains a change, shows progress, or draws attention once. Decoration alone is not a job.',
  'Durations and easings come from the motion tokens only.',
  'Reduced motion drops the travel and keeps the information: a fade stays, a slide or loop stops.',
    'Nothing loops forever without a way to stop it, and nothing flashes more than three times a second.',
];

export const comingSoon: GroupOverviewDocs['comingSoon'] = [];
