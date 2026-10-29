// Overview of the Motion group, rendered by the docs site (playground). The
// parts are the animated pieces under src/motion, built on the `motion`
// library and the DLS motion tokens. Imported from '@collabrium/ui/motion'.
import type { GroupOverviewDocs } from '../../lib/group-types';

export const title = 'Motion';

export const description =
  'Animated building blocks: loaders, buttons, toggles, text effects, card layouts and hooks. Every one runs on the motion tokens and respects reduced motion.';

export const overview: GroupOverviewDocs['overview'] = [
  'Motion holds the animated pieces that are not tied to one component: wrappers such as Fade in, Slide up and Collapse, and the loaders, text effects and card layouts built on the same timing.',
  'Everything here takes its duration and easing from the motion tokens, never from numbers of its own. It is imported from `@collabrium/ui/motion`.',
];

export const flow: GroupOverviewDocs['flow'] = [
  { title: 'Pick by job', description: 'Wrappers animate content you already have. Loaders show that something is working. Text effects reveal or emphasise words. Card layouts move groups of cards. Hooks give your own components the same timing.' },
  { title: 'Use the tokens', description: 'Choose a duration and an easing from the token names (`fast`, `base`, `standard`). A piece never exposes a free number.' },
  { title: 'Check reduced motion', description: 'Each piece says in its page what it does when the person asks for reduced motion.' },
];

export const rulesIntro = 'These rules apply to every piece in this group.';

export const rules: GroupOverviewDocs['rules'] = [
  'Motion has a job: it explains a change, shows progress, or draws attention once. Decoration alone is not a job.',
  'Durations and easings come from the motion tokens only.',
  'Reduced motion drops the travel and keeps the information: a fade stays, a slide or loop stops.',
  'A loader is never the only sign that something is working: the surface that hosts it also says what is happening.',
  'Nothing loops forever without a way to stop it, and nothing flashes more than three times a second.',
];

export const comingSoon: GroupOverviewDocs['comingSoon'] = [];
