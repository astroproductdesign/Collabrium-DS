// Documentation for Play pause morph (Motion), rendered by the docs site.
// Keep it consistent with PlayPauseMorph.usage.md. Not part of the package build.
import { PlayPauseMorph } from './PlayPauseMorph';
import { useEffect, useState } from 'react';
import { Button } from '../../components/Button';
import { motionRow } from '../lib/docs-shared.docs';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../../components/docs.types';

export const title = "Play pause morph";

export const description =
  "An icon that morphs between play and pause: two shapes that turn into each other. Put it in a Button.";

export const usage = `import { PlayPauseMorph } from '@collabrium/ui/motion';

export function PlayButton({ playing, onToggle }) {
  return (
    <Button variant="secondary" size="sm" onClick={onToggle} aria-label={playing ? 'Pause' : 'Play'}>
      <PlayPauseMorph playing={playing} />
    </Button>
  );
}`;

function PlayLoop() {
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => setPlaying(p => !p), 1400);
    return () => window.clearInterval(id);
  }, []);
  return (
    <span className="docs-motion-hover" style={{ fontSize: 'var(--icon-lg)' }}>
      <PlayPauseMorph playing={playing} />
    </span>
  );
}
function Player() {
  const [playing, setPlaying] = useState(false);
  return (
    <Button variant="secondary" size="sm" onClick={() => setPlaying(p => !p)} aria-label={playing ? 'Pause' : 'Play'} aria-pressed={playing}>
      <PlayPauseMorph playing={playing} />
    </Button>
  );
}

export const thumbnail = () => (<PlayLoop />);

export const anatomy: DocsAnatomyNode[] = [
  {
    name: "Play pause morph",
    description: "An icon that morphs between play and pause: two shapes that turn into each other.",
    children: [
    { name: "Icon", element: "svg.cui-play-pause", description: "A 1em square SVG in the text colour, hidden from assistive technology. Two paths of four points each turn between a play triangle and two pause bars." },
    ],
  },
];

export const examples: DocsExample[] = [
  {
    id: "basic",
    title: "In a button",
    description: "Press the button: the icon morphs. The button carries the label and `aria-pressed`; the icon is decoration.",
    render: () => (<Player />),
    code: `const [playing, setPlaying] = useState(false);

<Button variant="secondary" size="sm" onClick={() => setPlaying(p => !p)} aria-label={playing ? 'Pause' : 'Play'} aria-pressed={playing}>
  <PlayPauseMorph playing={playing} />
</Button>`,
  },
];

export const props: DocsProp[] = [
  { name: "playing", options: "boolean", default: "\u2014", required: true, description: "True shows the pause bars; false shows the play triangle." },
];

export const rules: DocsRules = {
  do: [
    "Put it inside a Button with an `aria-label` that names the action.",
    "Set `aria-pressed` on the button.",
    "Size it with the text size.",
  ],
  dont: [
    "Don't use it on its own: it is hidden from assistive technology.",
    "Don't use it for anything but play and pause.",
    "Don't pass your own colours: it takes the text colour.",
  ],
};

export const accessibility: DocsAccessibility = {
  keyboard: "None: it adds no controls and takes no focus.",
  notes: ["The icon is `aria-hidden`: the Button around it names the action (\"Play\" or \"Pause\") and says its state. Reduced motion changes the shape at once."],
};

export const motion: DocsMotion[] = [
  motionRow("`playing` changes", "The two shapes turn into each other.", "--duration-morph \u00b7 --ease-morph"),
  motionRow("Reduced motion", "The shape changes at once.", "\u2014"),
];
