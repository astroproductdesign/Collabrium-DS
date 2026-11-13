// Documentation for Search expand (Motion), rendered by the docs site.
// Keep it consistent with SearchExpand.usage.md. Not part of the package build.
import { SearchExpand } from './SearchExpand';
import { useEffect, useState } from 'react';
import { motionRow } from '../lib/docs-shared.docs';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../../components/docs.types';

export const title = "Search expand";

export const description =
  "A search that is a round button until it is pressed, then grows into a field and shrinks back when it loses focus while empty.";

export const usage = `import { SearchExpand } from '@collabrium/ui/motion';

export function Header() {
  return <SearchExpand aria-label="Search components" />;
}`;

function SearchLoop() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => setOpen(o => !o), 1800);
    return () => window.clearInterval(id);
  }, []);
  return (
    <div className="docs-motion-hover" style={{ ['--cui-search-max' as string]: '200px' }}>
      <SearchExpand aria-label="Search" expanded={open} onExpandedChange={setOpen} />
    </div>
  );
}

export const thumbnail = () => (<SearchLoop />);

export const anatomy: DocsAnatomyNode[] = [
  {
    name: "Search expand",
    description: "A search that is a round button until it is pressed, then grows into a field and shrinks back when it loses focus while empty.",
    children: [
    { name: "Search expand", element: "div.cui-search-expand", description: "Up to 320px wide." },
    { name: "Field", element: "div.cui-search-expand__field", description: "A 40px (`--control-height-md`) pill with a 1px Neutral-3 border that grows from a circle to the full width." },
    { name: "Toggle", element: "button.cui-search-expand__toggle", description: "The search icon. Opens the field." },
    { name: "Input", element: "input.cui-search-expand__input", description: "A search field, visible when open. Named by `aria-label`." },
    { name: "Clear / hint", element: "button / span", description: "A clear button once there is text; otherwise an \"Esc\" hint." },
    ],
  },
];

export const examples: DocsExample[] = [
  {
    id: "basic",
    title: "Press to open",
    description: "Press the button: it grows into a field. Press Escape to clear the text, then to close it. It closes by itself when it loses focus while empty.",
    render: () => (<div className="docs-motion-hover"><SearchExpand aria-label="Search components" /></div>),
    code: `<SearchExpand aria-label="Search components" />`,
  },
];

export const props: DocsProp[] = [
  { name: "aria-label", options: "string", default: "\u2014", required: true, description: "Names the field, e.g. \"Search components\"." },
  { name: "expanded", options: "boolean", default: "\u2014", description: "Whether the field is open. Leave out to let it open and close itself." },
  { name: "onExpandedChange", options: "(expanded: boolean) => void", default: "\u2014", description: "Called when it opens or closes." },
  { name: "value", options: "string", default: "\u2014", description: "The text in the field. Leave out to let the field keep it." },
  { name: "onChange", options: "(value: string) => void", default: "\u2014", description: "Called when the text changes." },
  { name: "placeholder", options: "string", default: "'Search'", description: "Hint while the field is empty." },
];

export const rules: DocsRules = {
  do: [
    "Use it where space is tight, such as a header.",
    "Name the field with `aria-label`.",
    "Handle the search itself with `onChange` and `value`.",
  ],
  dont: [
    "Don't use it where search is the main action of the page: show a full field.",
    "Don't hide results behind it: it is only the field.",
    "Don't rely on Escape alone to close it.",
  ],
};

export const accessibility: DocsAccessibility = {
  keyboard: [
    { keys: 'Tab', action: 'Moves to the search button, then to the clear button when there is text.' },
    { keys: 'Enter / Space', action: 'On the button, opens the field and moves focus into it.' },
    { keys: 'Escape', action: 'In the field, clears the text; with no text, closes the field.' },
  ],
  notes: ["The toggle is a real button with `aria-expanded`; the field is a real search input named by `aria-label`. Opening the field moves focus into it, so the person can type at once. Escape clears the text and then closes it. Reduced motion opens and closes at once."],
};

export const motion: DocsMotion[] = [
  motionRow("The field opens", "The pill grows from a circle to full width and the field fades in.", "--duration-morph \u00b7 --ease-morph"),
  motionRow("The field closes", "The reverse.", "--duration-morph \u00b7 --ease-morph"),
  motionRow("Reduced motion", "It opens and closes at once.", "\u2014"),
];
