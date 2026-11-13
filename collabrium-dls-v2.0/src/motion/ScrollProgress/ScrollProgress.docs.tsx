// Documentation for Scroll progress (Motion), rendered by the docs site.
// Keep it consistent with ScrollProgress.usage.md. Not part of the package build.
import { useEffect, useRef, useState } from 'react';
import { ScrollProgress } from './ScrollProgress';
import { Button } from '../../components/Button';
import { motionRow, pointerAccessibility, TrailPicture } from '../lib/docs-shared.docs';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../../components/docs.types';

export const title = 'Scroll progress';

export const description =
  'A thin bar fixed to the top of the window that fills as the page is scrolled. Decoration over what the scroll bar already says.';

export const usage = `import { ScrollProgress } from '@collabrium/ui/motion';

export function Article({ children }) {
  return (
    <>
      <ScrollProgress />
      {children}
    </>
  );
}`;

export const thumbnail = () => (
  <div className="docs-bar-picture" aria-hidden="true">
    <span />
  </div>
);

export const anatomy: DocsAnatomyNode[] = [
  {
    name: 'Scroll progress',
    element: 'div.cui-scroll-progress',
    description: 'A 4px bar fixed across the top of the window, from the left edge, in the chosen colour. It is hidden from assistive technology and takes no clicks.',
  },
];

/** The docs page scrolls inside a pane, so the example follows that pane. */
function PaneProgress() {
  const [on, setOn] = useState(false);
  const pane = useRef<HTMLElement | null>(null);
  useEffect(() => {
    pane.current = document.querySelector<HTMLElement>('.docs-pane');
  }, []);
  return (
    <div className="docs-motion-stage">
      <Button variant="secondary" size="sm" onClick={() => setOn(o => !o)}>
        {on ? 'Turn off' : 'Turn on'}
      </Button>
      {on && <ScrollProgress container={pane} />}
    </div>
  );
}

export const examples: DocsExample[] = [
  {
    id: 'basic',
    title: 'A bar that fills as you scroll',
    description: 'Press Turn on, then scroll this page: the bar across the top of the window fills from the left. On your own page, leave out `container` and it follows the page; here it follows the scrolling pane this page lives in.',
    render: () => <PaneProgress />,
    code: `<ScrollProgress />`,
  },
  {
    id: 'colour',
    title: 'Another colour',
    description: '`color` takes Obsidian or one of the seven series colours.',
    render: () => <PaneProgress />,
    code: `<ScrollProgress color="orange" />`,
  },
];

export const props: DocsProp[] = [
  { name: 'color', options: "AccentName", default: "'navy'", description: 'The bar\'s colour: Obsidian or one of the seven series colours.' },
  { name: 'container', options: 'RefObject<HTMLElement | null>', default: 'the page', description: 'The scrolling element to follow, when the page is not what scrolls (an app with a scrolling pane).' },
];

export const rules: DocsRules = {
  do: ['Use it on long reading pages, such as articles and guides.', 'Mount it once, high in the tree.'],
  dont: ["Don't use it on short pages: there is nothing to track.", "Don't rely on it to tell anyone where they are: it is decoration.", "Don't stack it with a sticky header bar of the same colour."],
};

export const accessibility: DocsAccessibility = pointerAccessibility('It is hidden from assistive technology: the browser\'s scroll bar and the page itself already say where you are. Under reduced motion it follows the scroll exactly, with no smoothing.');

export const motion: DocsMotion[] = [
  motionRow('The page scrolls', 'The bar\'s width follows the scroll position, smoothed by a spring (stiffness 100, damping 30) that settles without overshoot.', 'Amicro\'s spring (settles, no token)'),
  motionRow('Reduced motion', 'The bar follows the scroll exactly, with no smoothing.', '—'),
];
