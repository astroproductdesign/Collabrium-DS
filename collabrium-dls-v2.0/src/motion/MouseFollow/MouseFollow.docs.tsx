// Documentation for Mouse follow (Motion), rendered by the docs site.
// Keep it consistent with MouseFollow.usage.md. Not part of the package build.
import { MouseFollow } from './MouseFollow';
import { Button } from '../../components/Button';
import { useState } from 'react';
import { TrailPicture, motionRow, pointerAccessibility } from '../lib/docs-shared.docs';
import type { DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../../components/docs.types';

export const title = "Mouse follow";

export const description =
  "A soft ring (or anything you give it) that trails the mouse across the whole page with a gentle spring.";

export const usage = `import { MouseFollow } from '@collabrium/ui/motion';

export function Example() {
  return (
    <MouseFollow color="navy" />
  );
}`;

export const thumbnail = () => (
  <TrailPicture ring />
);

export const anatomy: DocsAnatomyNode[] = [
  {
    name: "Mouse follow",
    description: "The piece. A soft ring (or anything you give it) that trails the mouse across the whole page with a gentle spring.",
    children: [
      { name: "Follower", element: "div.cui-mouse-follow", description: "Fixed to the window, centred on the mouse, taking no clicks and hidden from assistive technology." },
      { name: "Ring", element: "span.cui-mouse-follow__ring", description: "The default: a 24px circle with a 1px border in the colour and a 12% fill." },
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
    title: "A ring behind the mouse",
    description: "Press Turn on, then move the mouse anywhere on the page.",
    render: () => (<OnDemo>{() => (<MouseFollow />)}</OnDemo>),
    code: `const [on, setOn] = useState(false);

<Button variant="secondary" size="sm" onClick={() => setOn(o => !o)}>
  {on ? 'Turn off' : 'Turn on'}
</Button>
{on && (
  <MouseFollow />
)}`,
  },
  {
    id: "custom",
    title: "Your own follower",
    description: "Give it children to follow the mouse instead of the ring. Keep it small and decorative.",
    render: () => (<OnDemo>{() => (<MouseFollow>
        <span className="docs-motion-sample">Hello</span>
      </MouseFollow>)}</OnDemo>),
    code: `const [on, setOn] = useState(false);

<Button variant="secondary" size="sm" onClick={() => setOn(o => !o)}>
  {on ? 'Turn off' : 'Turn on'}
</Button>
{on && (
  <MouseFollow>
    <span className="docs-motion-sample">Hello</span>
  </MouseFollow>
)}`,
  },
];

export const props: DocsProp[] = [
  { name: "children", options: "ReactNode", default: "a soft ring", description: "What follows the mouse." },
  { name: "color", options: "AccentName", default: "'navy'", description: "The colour of the default ring. It does not change `children`." },
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
  motionRow("The mouse moves", "The follower moves toward the mouse on a spring (stiffness 180, damping 20), a little behind it.", "Amicro's spring (no DLS token)"),
  motionRow("The mouse leaves the page", "The follower disappears.", "\u2014"),
  motionRow("Reduced motion", "Nothing is shown.", "\u2014"),
];
