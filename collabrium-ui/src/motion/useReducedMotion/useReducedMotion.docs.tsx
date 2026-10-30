// Documentation for useReducedMotion (Motion), rendered by the docs site.
// Keep it consistent with useReducedMotion.usage.md. Not part of the package build.
import { useReducedMotion } from './useReducedMotion';
import { motionRow, ReducedPicture } from '../lib/docs-shared.docs';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../../components/docs.types';

export const title = 'useReducedMotion';

export const description = 'A hook that is true when the person has asked their system for reduced motion, so your own pieces follow the same rule as everything else here.';

export const usage = `import { useReducedMotion } from '@collabrium/ui/motion';

export function Card({ children }) {
  const reduce = useReducedMotion();
  return <div style={{ transform: reduce ? 'none' : 'translateY(8px)' }}>{children}</div>;
}`;

export const thumbnail = () => <ReducedPicture />;

export const anatomy: DocsAnatomyNode[] = [
  { name: 'useReducedMotion()', description: 'Returns true when `prefers-reduced-motion: reduce` matches, and updates if the setting changes. It is the hook from the motion library, re-exported.' },
];

function Status() {
  const reduce = useReducedMotion();
  return <p className="docs-motion-sample">Reduced motion is {reduce ? 'on' : 'off'} for your system.</p>;
}

export const examples: DocsExample[] = [
  {
    id: 'basic',
    title: 'Reading the setting',
    description: 'Change the setting in your system\'s accessibility options and the line changes. The DLS rule: drop the travel, keep the information.',
    render: () => <Status />,
    code: `const reduce = useReducedMotion();

<p>Reduced motion is {reduce ? 'on' : 'off'} for your system.</p>`,
  },
];

export const props: DocsProp[] = [{ name: 'returns', options: 'boolean | null', default: '—', description: 'True when reduced motion is asked for. It can be null before the first read.' }];

export const rules: DocsRules = {
  do: ['Drop the travel, scale and loops; keep fades and the information.', 'Use it in any piece of your own that moves.'],
  dont: ["Don't turn the whole piece off: the content must still appear.", "Don't write your own media query for it: use this hook so every piece agrees."],
};

export const accessibility: DocsAccessibility = {
  keyboard: 'None: a hook has no interface.',
  notes: ['It reports the person\'s own system setting. Respecting it is the point of every piece in this group.'],
};

export const motion: DocsMotion[] = [motionRow('The setting changes', 'The value updates. There is no animation of its own.', '—')];
