// Documentation for Page transition (Motion), rendered by the docs site.
// Keep it consistent with PageTransition.usage.md. Not part of the package build.
import { useEffect, useState } from 'react';
import { PageTransition, type PageTransitionProps } from './PageTransition';
import { Button } from '../../components/Button';
import { motionRow, StairsPicture } from '../lib/docs-shared.docs';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../../components/docs.types';

export const title = 'Page transition';

export const description =
  'A curtain that covers the whole window while one page is swapped for another, then uncovers it. Three kinds: stairs, wave and fade.';

export const usage = `import { PageTransition } from '@collabrium/ui/motion';

export function Navigate({ covered, onCovered }) {
  return <PageTransition type="stairs" isVisible={covered} onComplete={onCovered} />;
}`;

export const thumbnail = () => <StairsPicture />;

export const anatomy: DocsAnatomyNode[] = [
  {
    name: 'Page transition',
    element: 'div.cui-page-transition',
    description: 'A curtain fixed over the whole window, above everything (`--z-tour`), taking no clicks and hidden from assistive technology.',
    children: [
      { name: 'Stairs', element: 'span.cui-page-transition__column', when: 'type is stairs', description: 'Five Neutral-9 columns that slide in from alternating edges, 50ms apart.' },
      { name: 'Wave', element: 'svg.cui-page-transition', when: 'type is wave', description: 'Three layers of Neutral-6, Neutral-7 and Neutral-9 that sweep up like a wave, the front layer last.' },
      { name: 'Fade', element: 'div.cui-page-transition--fade', when: 'type is fade', description: 'A Neutral-9 sheet that fades in and out.' },
    ],
  },
];

/** Plays the curtain over the window once: cover, pause, uncover. */
function Demo({ type }: { type: PageTransitionProps['type'] }) {
  const [state, setState] = useState<'idle' | 'covering' | 'covered' | 'uncovering'>('idle');
  useEffect(() => {
    if (state !== 'covered') return;
    const id = window.setTimeout(() => setState('uncovering'), 400);
    return () => window.clearTimeout(id);
  }, [state]);
  const done = () => setState(s => (s === 'covering' ? 'covered' : s === 'uncovering' ? 'idle' : s));
  return (
    <div className="docs-motion-stage">
      <Button variant="secondary" size="sm" onClick={() => setState('covering')} disabled={state !== 'idle'}>
        Play
      </Button>
      {state !== 'idle' && <PageTransition type={type} isVisible={state === 'covering' || state === 'covered'} onComplete={done} />}
    </div>
  );
}

export const examples: DocsExample[] = [
  {
    id: 'stairs',
    title: 'Stairs',
    description: 'Press Play: five columns slide across the window and slide away. The page is covered between the two, which is when you swap it.',
    render: () => <Demo type="stairs" />,
    code: `<PageTransition type="stairs" isVisible={covered} onComplete={onComplete} />`,
  },
  {
    id: 'wave',
    title: 'Wave',
    description: 'Three layers sweep up from the bottom like a wave. It plays through once each time `isVisible` becomes true.',
    render: () => <Demo type="wave" />,
    code: `<PageTransition type="wave" isVisible={covered} onComplete={onComplete} />`,
  },
  {
    id: 'fade',
    title: 'Fade',
    description: 'The quietest: a sheet that fades in and out. It is also what every type becomes under reduced motion.',
    render: () => <Demo type="fade" />,
    code: `<PageTransition type="fade" isVisible={covered} onComplete={onComplete} />`,
  },
];

export const props: DocsProp[] = [
  { name: 'type', options: "'stairs' | 'wave' | 'fade'", default: "'stairs'", description: 'The kind of curtain.' },
  { name: 'isVisible', options: 'boolean', default: '—', required: true, description: 'Whether the curtain covers the window. Set it to true to cover, then false to uncover.' },
  { name: 'onComplete', options: '() => void', default: '—', description: 'Called when the curtain has finished covering or uncovering. Swap the page while the window is covered.' },
];

export const rules: DocsRules = {
  do: ['Swap the page while the curtain covers the window, then uncover it.', 'Keep the covered moment short.', 'Pick one type for a whole site.'],
  dont: ["Don't use it for every navigation: it is for a few big moments, such as entering a section.", "Don't leave the window covered while something slow loads: use Loading State.", "Don't rely on it to tell anyone the page changed: move focus to the new page's heading."],
};

export const accessibility: DocsAccessibility = {
  keyboard: 'None: the curtain takes no clicks and no focus.',
  notes: [
    'The curtain is decoration. It is `aria-hidden` and `pointer-events: none`, so it never blocks or traps anything.',
    'It does not announce the change of page. Your page does that, by moving focus to the new page\'s heading.',
    'Under reduced motion every type is a plain fade, with no columns and no wave.',
  ],
};

export const motion: DocsMotion[] = [
  motionRow('Stairs covers or uncovers', 'Five columns slide in or out from alternating edges, 50ms apart.', '--duration-reveal · --ease-precise'),
  motionRow('Wave covers', 'Three layers sweep up over 1.3s: Amicro\'s own timing and easing, drawn frame by frame.', 'Amicro\'s timing (no DLS token)'),
  motionRow('Fade covers or uncovers', 'A sheet fades in or out.', '--duration-base · --ease-standard'),
  motionRow('Reduced motion', 'Every type is a fade.', '—'),
];
