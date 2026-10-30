// Documentation for useStagger (Motion), rendered by the docs site.
// Keep it consistent with useStagger.usage.md. Not part of the package build.
import { motion as m } from 'motion/react';
import { useStagger } from './useStagger';
import { ReplayDemo, motionRow, StaggerPicture } from '../lib/docs-shared.docs';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../../components/docs.types';

export const title = 'useStagger';

export const description = 'A hook that returns a delay for each of a row of items, so they enter one after another: from the first, the last, the middle, or any item.';

export const usage = `import { motion as m } from 'motion/react';
import { useStagger } from '@collabrium/ui/motion';

export function List({ items }) {
  const delays = useStagger(items.length);
  return items.map((item, i) => (
    <motion.li key={item} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: delays[i] }}>
      {item}
    </motion.li>
  ));
}`;

export const thumbnail = () => <StaggerPicture />;

export const anatomy: DocsAnatomyNode[] = [
  { name: 'useStagger(count, options?)', description: 'Returns an array of `count` delays in seconds. Item `i` waits `delays[i]`. `step` is the DLS row stagger (`sm` 80ms or `md` 120ms).' },
];

const names = ['Reports', 'Goals', 'People', 'Plans'];

function Row({ from }: { from: 'first' | 'last' | 'center' }) {
  const delays = useStagger(names.length, { from });
  return (
    <ul className="docs-stagger-row">
      {names.map((n, i) => (
        <m.li key={n} className="docs-motion-sample" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: delays[i], duration: 0.22 }}>
          {n}
        </m.li>
      ))}
    </ul>
  );
}

export const examples: DocsExample[] = [
  {
    id: 'first',
    title: 'From the first',
    description: 'The default: each item waits one step more than the one before. Press Replay to see it again.',
    render: () => (
      <ReplayDemo>
        <Row from="first" />
      </ReplayDemo>
    ),
    code: `const delays = useStagger(names.length);

{names.map((n, i) => (
  <motion.li key={n} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: delays[i] }}>
    {n}
  </motion.li>
))}`,
  },
  {
    id: 'center',
    title: 'From the middle',
    description: '`from="center"` starts at the middle and works outward, so two items enter together on each side.',
    render: () => (
      <ReplayDemo>
        <Row from="center" />
      </ReplayDemo>
    ),
    code: `const delays = useStagger(names.length, { from: 'center' });`,
  },
];

export const props: DocsProp[] = [
  { name: 'count', options: 'number', default: '—', required: true, description: 'How many items.' },
  { name: 'step', options: "'sm' | 'md'", default: "'sm'", description: 'The gap between neighbours: 80ms or 120ms, the DLS row staggers.' },
  { name: 'baseDelay', options: 'number', default: '0', description: 'A delay before the first, in seconds.' },
  { name: 'from', options: "'first' | 'last' | 'center' | number", default: "'first'", description: 'Where the sequence starts: an end, the middle, or the index of an item.' },
  { name: 'returns', options: 'number[]', default: '—', description: 'The delay for each item, in seconds.' },
];

export const rules: DocsRules = {
  do: ['Use it for rows and lists that enter together.', 'Keep a row to about eight items: the last one waits count × step.'],
  dont: ["Don't use it for letters or words: its steps are for rows, and are too slow for text.", "Don't pass your own gaps: `step` takes the DLS values."],
};

export const accessibility: DocsAccessibility = {
  keyboard: 'None: a hook has no interface.',
  notes: ['It only computes delays. Under reduced motion, drop the delays along with the travel: pass `delay: 0` when `useReducedMotion()` is true.'],
};

export const motion: DocsMotion[] = [motionRow('A row enters', 'Each item is delayed by its step from the starting item.', '--stagger-sm · --stagger-md')];
