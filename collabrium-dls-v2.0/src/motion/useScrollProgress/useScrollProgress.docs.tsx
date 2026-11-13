// Documentation for useScrollProgress (Motion), rendered by the docs site.
// Keep it consistent with useScrollProgress.usage.md. Not part of the package build.
import { useRef } from 'react';
import { useScrollProgress } from './useScrollProgress';
import { motionRow, ScrollPicture } from '../lib/docs-shared.docs';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../../components/docs.types';

export const title = 'useScrollProgress';

export const description = 'A hook that returns how far something has scrolled, from 0 at the top to 1 at the bottom: the page, or a scrolling element you give it.';

export const usage = `import { useRef } from 'react';
import { useScrollProgress } from '@collabrium/ui/motion';

export function Reader({ children }) {
  const box = useRef<HTMLDivElement>(null);
  const progress = useScrollProgress(box);
  return <div ref={box}>…{Math.round(progress * 100)}% read</div>;
}`;

export const thumbnail = () => <ScrollPicture />;

export const anatomy: DocsAnatomyNode[] = [
  { name: 'useScrollProgress(ref?)', description: 'Takes an optional ref to a scrolling element and returns a number from 0 to 1. With no ref it follows the page.' },
];

function Reader() {
  const box = useRef<HTMLDivElement>(null);
  const progress = useScrollProgress(box);
  return (
    <div className="docs-stack">
      <div ref={box} className="docs-scroll-box" tabIndex={0} role="group" aria-label="Scrollable text">
        {Array.from({ length: 8 }, (_, i) => (
          <p key={i}>Every team sees the same picture of the work, and goals move with the plan.</p>
        ))}
      </div>
      <p className="docs-status">{Math.round(progress * 100)}% scrolled</p>
    </div>
  );
}

export const examples: DocsExample[] = [
  {
    id: 'element',
    title: 'Following a scrolling box',
    description: 'Scroll the box: the number follows it. Pass the box\'s ref; leave it out to follow the page.',
    render: () => <Reader />,
    code: `const box = useRef<HTMLDivElement>(null);
const progress = useScrollProgress(box);

<div ref={box}>…</div>
<p>{Math.round(progress * 100)}% scrolled</p>`,
  },
];

export const props: DocsProp[] = [
  { name: 'ref', options: 'RefObject<HTMLElement | null>', default: 'the page', description: 'The scrolling element to follow. Leave out to follow the page.' },
  { name: 'returns', options: 'number', default: '—', description: 'A number from 0 to 1. It is 0 when there is nothing to scroll.' },
];

export const rules: DocsRules = {
  do: ['Use it for a reading-progress display or to drive your own effect.', 'Give it a ref when an element, not the page, scrolls.'],
  dont: ["Don't use it to hide or show content that people need: scroll position is not a reliable signal.", "Don't read it on every frame for heavy work: it updates on every scroll event."],
};

export const accessibility: DocsAccessibility = {
  keyboard: 'None: a hook has no interface.',
  notes: ['It only reads the scroll position. Anything you show with it still needs its own text for assistive technology.', 'A scrolling box you build should be focusable so it can be scrolled from the keyboard.'],
};

export const motion: DocsMotion[] = [motionRow('Scrolling', 'The value changes as the scroll position changes. There is no animation of its own.', '—')];
