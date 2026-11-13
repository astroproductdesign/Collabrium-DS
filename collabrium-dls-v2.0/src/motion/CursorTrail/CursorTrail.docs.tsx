// Documentation for Cursor trail (Motion), rendered by the docs site.
// Keep it consistent with CursorTrail.usage.md. Not part of the package build.
import { CursorTrail } from './CursorTrail';
import { Button } from '../../components/Button';
import { useState } from 'react';
import { TrailPicture, motionRow, pointerAccessibility } from '../lib/docs-shared.docs';
import type { DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../../components/docs.types';

export const title = "Cursor trail";

export const description =
  "A short tail of dots that follows the mouse across the whole page, each a little behind the last and a little smaller.";

export const usage = `import { CursorTrail } from '@collabrium/ui/motion';

export function Example() {
  return (
    <CursorTrail color="navy" />
  );
}`;

export const thumbnail = () => (
  <TrailPicture />
);

export const anatomy: DocsAnatomyNode[] = [
  {
    name: "Cursor trail",
    description: "The piece. A short tail of dots that follows the mouse across the whole page, each a little behind the last and a little smaller.",
    children: [
      { name: "Dots", element: "span.cui-cursor-dot", description: "Six fixed dots, 8px down to 3px and from 100% down to 14% opacity, each on a slower spring than the one before. They take no clicks and are hidden from assistive technology." },
    ],
  },
];

/** Turns a page-wide effect on and off, so it only follows the mouse while the example is in use. */
function OnDemo({ children }: { children: () => React.ReactNode }) {
  const [on, setOn] = useState(false);
  return (
    <div className="docs-motion-stage">
      <Button variant="secondary" size="sm" onClick={() => setOn(o => !o)}>
        {on ? 'Turn off' : 'Turn on'}
      </Button>
      {on && children()}
    </div>
  );
}

export const examples: DocsExample[] = [
  {
    id: "basic",
    title: "Dots behind the mouse",
    description: "Press Turn on, then move the mouse anywhere on the page: the trail covers the whole window while it is on.",
    render: () => (<OnDemo>{() => (<CursorTrail />)}</OnDemo>),
    code: `const [on, setOn] = useState(false);

<Button variant="secondary" size="sm" onClick={() => setOn(o => !o)}>
  {on ? 'Turn off' : 'Turn on'}
</Button>
{on && (
  <CursorTrail />
)}`,
  },
];

export const props: DocsProp[] = [
  { name: "color", options: "AccentName", default: "'navy'", description: "The colour of the dots: Obsidian or one of the seven series colours." },
];

export const rules: DocsRules = {
  do: [
    'Mount it once, high in the tree, on a page where play suits the product.',
    'Keep anything inside it small, decorative and silent.',
  ],
  dont: [
    "Don't use it where people work or read.",
    "Don't put anything inside that a person needs to read or press: it takes no clicks.",
    "Don't make anything depend on it: it is decoration.",
  ],
};

export const accessibility = pointerAccessibility("Reduced motion switches it off: nothing is shown.");

export const motion: DocsMotion[] = [
  motionRow("The mouse moves", "Each dot follows the mouse on its own spring, the later dots slower.", "Amicro's springs (no DLS token)"),
  motionRow("The mouse leaves the page", "The dots disappear.", "\u2014"),
  motionRow("Reduced motion", "Nothing is shown.", "\u2014"),
];
