// Documentation for Expanding tabs (Motion), rendered by the docs site.
// Keep it consistent with ExpandingTabs.usage.md. Not part of the package build.
import { ExpandingTabs } from './ExpandingTabs';
import { useEffect, useState } from 'react';
import { Bell, CalendarBlank, EnvelopeSimple } from '@phosphor-icons/react';
import { motionRow } from '../lib/docs-shared.docs';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../../components/docs.types';

export const title = "Expanding tabs";

export const description =
  "A row of tabs that are icons until one is active: the active tab opens to show its label. A real tab list with arrow-key movement.";

export const usage = `import { Bell, CalendarBlank, EnvelopeSimple } from '@phosphor-icons/react';
import { ExpandingTabs } from '@collabrium/ui/motion';

export function Mailbox() {
  return (
    <ExpandingTabs
      aria-label="Mailbox"
      tabs={[
        { id: 'inbox', label: 'Inbox', icon: EnvelopeSimple, color: 'navy' },
        { id: 'calendar', label: 'Calendar', icon: CalendarBlank, color: 'purple' },
        { id: 'alerts', label: 'Alerts', icon: Bell, color: 'salmonPink' },
      ]}
    />
  );
}`;

function TabsLoop() {
  const [id, setId] = useState('inbox');
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const order = ['inbox', 'calendar', 'alerts'];
    let i = 0;
    const t = window.setInterval(() => {
      i = (i + 1) % order.length;
      setId(order[i]);
    }, 1400);
    return () => window.clearInterval(t);
  }, []);
  return (
    <div className="docs-motion-hover">
      <ExpandingTabs aria-label="Mailbox" tabs={tabs} value={id} />
    </div>
  );
}
const tabs = [
  { id: 'inbox', label: 'Inbox', icon: EnvelopeSimple, color: 'navy' as const },
  { id: 'calendar', label: 'Calendar', icon: CalendarBlank, color: 'purple' as const },
  { id: 'alerts', label: 'Alerts', icon: Bell, color: 'salmonPink' as const },
];

function Mailbox() {
  const [id, setId] = useState('inbox');
  return (
    <div className="docs-stack">
      <ExpandingTabs aria-label="Mailbox" tabs={tabs} value={id} onValueChange={setId} />
      <p className="docs-status" role="status">Showing {tabs.find(t => t.id === id)?.label}.</p>
    </div>
  );
}

export const thumbnail = () => (<TabsLoop />);

export const anatomy: DocsAnatomyNode[] = [
  {
    name: "Expanding tabs",
    description: "A row of tabs that are icons until one is active: the active tab opens to show its label.",
    children: [
    { name: "Tabs", element: "div[role=tablist].cui-expanding-tabs", description: "A row of tabs." },
    { name: "Tab", element: "button[role=tab].cui-expanding-tabs__tab", description: "A 40px pill: an icon, and when active a label. Neutral-2 at rest; when active, a 12% tint of the tab's colour with a 28% border and a coloured icon (Fill weight). Named by `aria-label` even when only the icon shows." },
    { name: "Label", element: "span.cui-expanding-tabs__label", description: "Opens beside the icon on the active tab." },
    ],
  },
];

export const examples: DocsExample[] = [
  {
    id: "basic",
    title: "Three tabs",
    description: "Press a tab, or use the arrow keys: the active tab opens to show its name. The page shows the content for the active id.",
    render: () => (<Mailbox />),
    code: `const [id, setId] = useState('inbox');

<ExpandingTabs aria-label="Mailbox" tabs={tabs} value={id} onValueChange={setId} />
<p>Showing {tabs.find(t => t.id === id)?.label}.</p>`,
  },
];

export const props: DocsProp[] = [
  { name: "aria-label", options: "string", default: "\u2014", required: true, description: "Names the group of tabs." },
  { name: "tabs", options: "ExpandingTab[]", default: "\u2014", required: true, description: "`id`, `label`, `icon` (a Phosphor icon) and an optional `color` per tab. Two to five read well." },
  { name: "value", options: "string", default: "first tab", description: "The id of the active tab." },
  { name: "onValueChange", options: "(id: string) => void", default: "\u2014", description: "Called with the id of the tab that was chosen." },
];

export const rules: DocsRules = {
  do: [
    "Use it for a few views with clear icons.",
    "Show the content for the active id in the page.",
    "Pick icons people recognise: the inactive tabs show only the icon.",
  ],
  dont: [
    "Don't use it for more than five tabs.",
    "Don't use icons that need the label to be understood, unless a person can reach it with a keyboard or a screen reader.",
    "Don't use it for navigation between pages: use links.",
  ],
};

export const accessibility: DocsAccessibility = {
  keyboard: [
    { keys: 'Tab', action: 'Moves to the active tab, then on.' },
    { keys: 'Arrow Left / Right', action: 'Moves to the previous or next tab and chooses it, wrapping at the ends.' },
    { keys: 'Home / End', action: 'Moves to the first or last tab and chooses it.' },
  ],
  notes: ["It is a tab list: Left and Right arrows move between tabs and choose them, Home and End go to the ends, and only the active tab is a Tab stop. Each tab is named by its label even when only its icon shows. It controls no panels itself; connect the panel with `aria-labelledby` set to the tab's id (`<id>-tab`). Reduced motion opens the label at once."],
};

export const motion: DocsMotion[] = [
  motionRow("A tab becomes active", "It widens and its label opens beside the icon; the previous tab closes.", "--duration-base \u00b7 --ease-settle"),
  motionRow("Reduced motion", "The label appears at once.", "\u2014"),
];
