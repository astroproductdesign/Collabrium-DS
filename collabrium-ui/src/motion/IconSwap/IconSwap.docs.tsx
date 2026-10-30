// Documentation for Icon swap (Motion), rendered by the docs site.
// Keep it consistent with IconSwap.usage.md. Not part of the package build.
import { IconSwap } from './IconSwap';
import { useEffect, useState } from 'react';
import { Check, Copy } from '@phosphor-icons/react';
import { Button } from '../../components/Button';
import { motionRow } from '../lib/docs-shared.docs';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../../components/docs.types';

export const title = "Icon swap";

export const description =
  "Swaps one icon for another when its key changes: the old one shrinks and blurs out as the new one grows in. For toggles such as copy and copied, or play and pause.";

export const usage = `import { Check, Copy } from '@phosphor-icons/react';
import { IconSwap } from '@collabrium/ui/motion';

export function CopyIcon({ copied }) {
  return (
    <IconSwap swap={copied ? 'check' : 'copy'}>
      {copied ? <Check /> : <Copy />}
    </IconSwap>
  );
}`;

function CopyDemoLoop() {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => setCopied(c => !c), 1400);
    return () => window.clearInterval(id);
  }, []);
  return (
    <span className="docs-motion-hover">
      <IconSwap swap={copied ? 'check' : 'copy'}>{copied ? <Check size={32} aria-hidden="true" /> : <Copy size={32} aria-hidden="true" />}</IconSwap>
    </span>
  );
}
function CopyDemo() {
  const [copied, setCopied] = useState(false);
  return (
    <Button variant="secondary" size="sm" onClick={() => setCopied(c => !c)} aria-label={copied ? 'Copied' : 'Copy'}>
      <IconSwap swap={copied ? 'check' : 'copy'}>{copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}</IconSwap>
    </Button>
  );
}

export const thumbnail = () => (<CopyDemoLoop />);

export const anatomy: DocsAnatomyNode[] = [
  {
    name: "Icon swap",
    description: "Swaps one icon for another when its key changes: the old one shrinks and blurs out as the new one grows in.",
    children: [
    { name: "Icon", element: "span.cui-icon-swap", description: "Wraps the current icon. When `swap` changes, the old wrapper shrinks to 25% and blurs out while the new one grows from 25% and comes into focus." },
    ],
  },
];

export const examples: DocsExample[] = [
  {
    id: "copy",
    title: "Copy and copied",
    description: "Press the button: the icon swaps between a copy mark and a check. The button carries the label; the icons are decoration.",
    render: () => (<CopyDemo />),
    code: `const [copied, setCopied] = useState(false);

<Button variant="secondary" size="sm" onClick={() => setCopied(c => !c)} aria-label={copied ? 'Copied' : 'Copy'}>
  <IconSwap swap={copied ? 'check' : 'copy'}>{copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}</IconSwap>
</Button>`,
  },
];

export const props: DocsProp[] = [
  { name: "swap", options: "string", default: "\u2014", required: true, description: "Names what is showing. When it changes the icon swaps. Use a short stable string such as `'play'` or `'pause'`." },
  { name: "children", options: "ReactNode", default: "\u2014", required: true, description: "The icon, or any small content, for the current `swap`." },
];

export const rules: DocsRules = {
  do: [
    "Put it inside a control that already has a text label or `aria-label`.",
    "Give each state a different `swap` string.",
    "Keep to one small icon.",
  ],
  dont: [
    "Don't rely on the swap alone to say the state changed: update the control's label too.",
    "Don't use it for large content: it shrinks to 25%.",
    "Don't pass the same `swap` for different icons: nothing will animate.",
  ],
};

export const accessibility: DocsAccessibility = {
  keyboard: "None: it adds no controls and takes no focus.",
  notes: ["The icons are decoration: put `aria-hidden` on them and name the state on the control that holds them. Reduced motion drops the shrink and the blur and cross-fades."],
};

export const motion: DocsMotion[] = [
  motionRow("`swap` changes", "The old content shrinks to 25% and blurs out while the new content grows from 25% and comes into focus.", "--duration-fast \u00b7 --ease-standard"),
  motionRow("Reduced motion", "The two cross-fade: no shrink and no blur.", "\u2014"),
];
