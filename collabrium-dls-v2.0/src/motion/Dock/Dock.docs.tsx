// Documentation for Dock (Motion), rendered by the docs site.
// Keep it consistent with Dock.usage.md. Not part of the package build.
import { Dock } from './Dock';
import { Bell, CalendarBlank, EnvelopeSimple, House, MagnifyingGlass } from '@phosphor-icons/react';
import { ScriptedPointer, motionRow } from '../lib/docs-shared.docs';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../../components/docs.types';

export const title = "Dock";

export const description =
  "A row of icon buttons that swell as the mouse passes over them, the nearest most, and settle back when it leaves.";

export const usage = `import { EnvelopeSimple, House } from '@phosphor-icons/react';
import { Dock } from '@collabrium/ui/motion';

export function Apps() {
  return (
    <Dock
      aria-label="Apps"
      items={[
        { id: 'home', label: 'Home', icon: House },
        { id: 'mail', label: 'Mail', icon: EnvelopeSimple },
      ]}
      onSelect={id => open(id)}
    />
  );
}`;

function ScriptedDock() {
  return (
    <div className="docs-motion-hover">
      <ScriptedPointer target=".cui-dock">
        <Dock aria-label="Apps" items={items} />
      </ScriptedPointer>
    </div>
  );
}
const items = [
  { id: 'home', label: 'Home', icon: House },
  { id: 'search', label: 'Search', icon: MagnifyingGlass },
  { id: 'mail', label: 'Mail', icon: EnvelopeSimple },
  { id: 'calendar', label: 'Calendar', icon: CalendarBlank },
  { id: 'alerts', label: 'Alerts', icon: Bell },
];

export const thumbnail = () => (<ScriptedDock />);

export const anatomy: DocsAnatomyNode[] = [
  {
    name: "Dock",
    description: "A row of icon buttons that swell as the mouse passes over them, the nearest most, and settle back when it leaves.",
    children: [
    { name: "Dock", element: "div[role=group].cui-dock", description: "A Neutral-2 row with a 1px Neutral-3 border and radius-sm." },
    { name: "Item", element: "button.cui-dock__item", description: "A Neutral-1 button, 32px at rest and up to 48px with the mouse over it, with an icon and a tooltip (`title`) and an `aria-label` of its name." },
    ],
  },
];

export const examples: DocsExample[] = [
  {
    id: "basic",
    title: "Five apps",
    description: "Move the mouse along the row: the buttons nearest it swell. Every button is the same size for touch, keyboard and reduced motion.",
    render: () => (<div className="docs-motion-hover"><Dock aria-label="Apps" items={items} /></div>),
    code: `<Dock aria-label="Apps" items={items} onSelect={id => open(id)} />`,
  },
];

export const props: DocsProp[] = [
  { name: "aria-label", options: "string", default: "\u2014", required: true, description: "Names the dock." },
  { name: "items", options: "DockItem[]", default: "\u2014", required: true, description: "`id`, `label` and `icon` (a Phosphor icon) per item." },
  { name: "onSelect", options: "(id: string) => void", default: "\u2014", description: "Called with the id of the item that was pressed." },
];

export const rules: DocsRules = {
  do: [
    "Use it for a small set of launchers or tools.",
    "Give every item a short label.",
    "Keep to about eight items.",
  ],
  dont: [
    "Don't use it for primary navigation: it is a flourish.",
    "Don't rely on the swell to show which item is which: the label and tooltip do that.",
    "Don't expect to reorder it: items stay in the order given.",
  ],
};

export const accessibility: DocsAccessibility = {
  keyboard: [
    { keys: 'Tab', action: 'Moves through the items in order.' },
    { keys: 'Enter / Space', action: 'Presses the focused item.' },
  ],
  notes: ["Every item is a real button named by its label, in order, reachable with Tab. The swell follows a mouse only, so touch, keyboard and reduced motion see the plain row. Items are not reorderable (Amicro's dragging has no keyboard way)."],
};

export const motion: DocsMotion[] = [
  motionRow("The mouse is near an item", "The item swells from 32px toward 48px, the nearest most, on an overdamped spring.", "Amicro's spring (settles, no token)"),
  motionRow("The mouse leaves", "The items settle back to 32px.", "Amicro's spring (settles, no token)"),
  motionRow("Reduced motion", "No swell.", "\u2014"),
];
