// Documentation for useMousePosition (Motion), rendered by the docs site.
// Keep it consistent with useMousePosition.usage.md. Not part of the package build.
import { useRef } from 'react';
import { useMousePosition } from './useMousePosition';
import { motionRow } from '../lib/docs-shared.docs';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../../components/docs.types';

export const title = 'useMousePosition';

export const description = 'A hook that returns where the mouse is, in the window and, when you give it an element, inside that element.';

export const usage = `import { useRef } from 'react';
import { useMousePosition } from '@collabrium/ui/motion';

export function Readout() {
  const box = useRef<HTMLDivElement>(null);
  const { elementX, elementY } = useMousePosition(box);
  return <div ref={box}>{Math.round(elementX)}, {Math.round(elementY)}</div>;
}`;

export const thumbnail = () => <p className="docs-motion-sample">useMousePosition() → x 312, y 148</p>;

export const anatomy: DocsAnatomyNode[] = [
  { name: 'useMousePosition(ref?)', description: 'Takes an optional ref and returns `{ x, y, elementX, elementY }`: the window position, and the position inside the element (0 when there is no ref). Touch and pen are ignored.' },
];

function Readout() {
  const box = useRef<HTMLDivElement>(null);
  const { x, y, elementX, elementY } = useMousePosition(box);
  return (
    <div className="docs-stack">
      <div ref={box} className="docs-scroll-box docs-mouse-box" role="group" aria-label="Area to move the mouse over">
        Move the mouse over this box.
      </div>
      <p className="docs-status">
        Window {Math.round(x)}, {Math.round(y)} · inside the box {Math.round(elementX)}, {Math.round(elementY)}
      </p>
    </div>
  );
}

export const examples: DocsExample[] = [
  {
    id: 'element',
    title: 'Window and element position',
    description: 'Move the mouse across the page. `x` and `y` are in the window; `elementX` and `elementY` are measured from the box\'s top left corner.',
    render: () => <Readout />,
    code: `const box = useRef<HTMLDivElement>(null);
const { x, y, elementX, elementY } = useMousePosition(box);

<div ref={box}>Move the mouse over this box.</div>
<p>Window {Math.round(x)}, {Math.round(y)} · inside the box {Math.round(elementX)}, {Math.round(elementY)}</p>`,
  },
];

export const props: DocsProp[] = [
  { name: 'ref', options: 'RefObject<HTMLElement | null>', default: '—', description: 'The element to measure `elementX` and `elementY` against. Without it they are 0.' },
  { name: 'returns', options: 'MousePosition', default: '—', description: '`{ x, y, elementX, elementY }`, in pixels.' },
];

export const rules: DocsRules = {
  do: ['Use it in a small component: it re-renders on every move.', 'Prefer Spotlight, Tilt or Magnetic when what you want is a pointer effect.'],
  dont: ["Don't make anything depend on it that touch users need: touch and pen are ignored.", "Don't use it for a whole page's layout."],
};

export const accessibility: DocsAccessibility = {
  keyboard: 'None: a hook has no interface.',
  notes: ['It only reads a mouse pointer. Anything you build with it needs a keyboard and touch way to do the same thing.'],
};

export const motion: DocsMotion[] = [motionRow('The mouse moves', 'The value changes on every move. There is no animation of its own.', '—')];
