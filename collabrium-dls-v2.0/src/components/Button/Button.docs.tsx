// Documentation for Button, rendered by the docs site (playground).
// Keep it consistent with Button.usage.md. Not part of the package build.
import { useRef, useState } from 'react';
import { ArrowClockwise, CheckCircle, DotsThree, PencilSimple, Plus, Trash } from '@phosphor-icons/react';
import { Button, type ButtonBeaconReason } from './Button';
import { AiTarget } from './AiTarget';
import { ButtonRow } from './ButtonRow';
import type {
  DocsAccessibility,
  DocsAnatomyNode,
  DocsExample,
  DocsMotion,
  DocsProp,
  DocsRules,
} from '../docs.types';

export const title = 'Button';

export const description =
  'Starts an action on the current page. Three levels of emphasis, an AI variant for handing a task to CollabAI, three sizes, an icon-only form, a loading state and the CTA beacon.';

export const usage = `import { Button } from '@collabrium/ui';

export function SaveBar({ onSave }: { onSave: () => void }) {
  return (
    <Button variant="primary" onClick={onSave}>
      Save brief
    </Button>
  );
}`;

export const thumbnail = () => (
  <>
    <Button variant="primary" size="sm">Primary</Button>
    <Button variant="secondary" size="sm">Secondary</Button>
  </>
);

export const anatomy: DocsAnatomyNode[] = [
  {
    name: 'Button',
    element: '<button>.cui-button',
    description: 'Native button. Variant, size and state are data attributes: data-variant, data-size, data-icon-only, data-loading, data-beacon.',
    children: [
      { name: 'Leading icon', element: 'svg.cui-button__icon', when: 'with leadingIcon', description: 'Phosphor icon at 1em, same colour as the label. aria-hidden.' },
      { name: 'Icon', element: 'svg.cui-button__icon', when: 'with iconOnly', description: 'The only content. The name comes from aria-label.' },
      { name: 'Label', element: 'span.cui-button__label', when: 'not iconOnly', description: 'The visible text. Kept in the layout while loading so the width holds.' },
      { name: 'Trailing arrow', element: 'svg.cui-button__icon.cui-button__arrow', when: 'with trailingArrow', description: 'Arrow down or right after the label. Nods while the beacon runs.' },
      { name: 'Spinner', element: 'svg.cui-button__spinner', when: 'while loading (not ai)', description: 'Centred over the hidden content, rotating.' },
      { name: 'AI sparkle', element: 'svg.cui-button__icon.cui-button__ai-icon', when: 'variant="ai"', description: 'Phosphor Sparkle (Fill) in the AI gradient, before the label. aria-hidden.' },
    ],
  },
  {
    name: 'AI target',
    element: '<div>.cui-ai-target',
    description: 'AiTarget: wraps the area an AI button will change. A transparent 2px edge at rest; the AI gradient ring and a 7% tint while active, with aria-busy.',
  },
  {
    name: 'Button row',
    element: '<div>.cui-button-row',
    description: 'ButtonRow: lays out a row of Buttons, 8px apart (--element-gap), right-aligned by default, Primary last. No look of its own. At 640px and under it stacks them full-width, Primary on top.',
    children: [
      { name: 'Leading', element: 'div.cui-button-row__leading', when: 'align="split" with leading', description: 'The separate action on the far left (Delete, Back). Last on a phone.' },
    ],
  },
];

const variants = ['primary', 'secondary', 'ghost'] as const;

function LoadingExample() {
  const [loading, setLoading] = useState(true);
  return (
    <div className="docs-stack">
      <div className="docs-row">
        <Button variant="primary" loading={loading}>Save brief</Button>
        <Button variant="secondary" loading={loading}>Save brief</Button>
        <Button variant="ghost" loading={loading}>Save brief</Button>
      </div>
      <div className="docs-row">
        <Button variant="secondary" size="sm" leadingIcon={ArrowClockwise} onClick={() => setLoading(l => !l)}>
          {loading ? 'Stop loading' : 'Start loading'}
        </Button>
      </div>
    </div>
  );
}

function AiExample() {
  const target = useRef<HTMLDivElement>(null);
  const [working, setWorking] = useState(false);
  const rewrite = () => {
    setWorking(true);
    window.setTimeout(() => setWorking(false), 3000); // stands in for the AI finishing
  };
  return (
    <div className="docs-stack">
      <AiTarget ref={target} active={working}>
        <p className="docs-ai-field">A four-week push across social and in-app placements, led by the family plan offer.</p>
      </AiTarget>
      <div className="docs-row">
        <Button variant="ai" aiTarget={target} loading={working} onClick={rewrite}>
          {working ? 'CollabAI is rewriting' : 'Rewrite summary with CollabAI'}
        </Button>
      </div>
    </div>
  );
}

function BeaconExample() {
  const [beacon, setBeacon] = useState<'off' | 'on'>('off');
  const [status, setStatus] = useState('Not started');
  const onBeaconChange = (s: { armed: boolean; reason: ButtonBeaconReason }) =>
    setStatus(s.armed ? 'Running' : `Stopped (${s.reason})`);
  const replay = () => {
    setBeacon('off');
    requestAnimationFrame(() => setBeacon('on'));
  };
  return (
    <div className="docs-stack">
      <div className="docs-row docs-row--beacon">
        <Button variant="primary" trailingArrow="down" beacon={beacon} onBeaconChange={onBeaconChange}>
          Next: audience
        </Button>
      </div>
      <div className="docs-row">
        <Button variant="secondary" size="sm" leadingIcon={ArrowClockwise} onClick={replay}>Play beacon</Button>
        <span className="docs-status">{status}</span>
      </div>
    </div>
  );
}

export const examples: DocsExample[] = [
  {
    id: 'variants',
    title: 'Variants',
    description: 'Primary for the one main action in a region, Secondary beside it, Ghost for low-emphasis, toolbar and table-row actions, Danger for a destructive commit, and Link for an inline, text-level action.',
    render: () => (
      <div className="docs-row">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Delete</Button>
        <Button variant="link">Show less</Button>
      </div>
    ),
    code: `<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Delete</Button>
<Button variant="link">Show less</Button>`,
  },
  {
    id: 'ai',
    title: 'AI',
    description: 'For an action that hands a task to CollabAI. The AI gradient runs through the border, the sparkle, the label and a 7% tint. Hover fills it with the solid gradient, shimmering left to right; pressed darkens it. Same sizes as every button.',
    render: () => (
      <div className="docs-stack">
        <div className="docs-row">
          <Button variant="ai" size="sm">Work with CollabAI</Button>
          <Button variant="ai">Work with CollabAI</Button>
          <Button variant="ai" size="lg">Work with CollabAI</Button>
        </div>
        <div className="docs-row">
          <Button variant="ai" loading>CollabAI is working</Button>
          <Button variant="ai" disabled>Work with CollabAI</Button>
        </div>
      </div>
    ),
    code: `<Button variant="ai">Work with CollabAI</Button>
<Button variant="ai" loading>CollabAI is working</Button>
<Button variant="ai" disabled>Work with CollabAI</Button>`,
  },
  {
    id: 'ai-target',
    title: 'AI: show where the change lands',
    description: 'Optional. Wrap the area CollabAI will change in `AiTarget` and pass its ref to `aiTarget`: on click the sparkle flies there, and the area wears the gradient ring while the AI works. Under reduced motion the ring simply appears.',
    render: () => <AiExample />,
    code: `const summary = useRef<HTMLDivElement>(null);
const [working, setWorking] = useState(false);

<AiTarget ref={summary} active={working}>
  <p>{brief.summary}</p>
</AiTarget>
<Button variant="ai" aiTarget={summary} loading={working} onClick={rewrite}>
  {working ? 'CollabAI is rewriting' : 'Rewrite summary with CollabAI'}
</Button>`,
  },
  {
    id: 'sizes',
    title: 'Sizes',
    description: '`sm` (32px) for dense rows and toolbars, `md` (40px) by default, `lg` (48px) for prominent standalone actions.',
    render: () => (
      <div className="docs-row">
        <Button variant="primary" size="sm">Small</Button>
        <Button variant="primary" size="md">Medium</Button>
        <Button variant="primary" size="lg">Large</Button>
      </div>
    ),
    code: `<Button variant="primary" size="sm">Small</Button>
<Button variant="primary" size="md">Medium</Button>
<Button variant="primary" size="lg">Large</Button>`,
  },
  {
    id: 'leading-icon',
    title: 'Leading icon',
    description: 'A Phosphor icon before the label, sized to the type. Regular for actions (Tier 1); Fill only for status icons such as `CheckCircle` (Tier 2).',
    render: () => (
      <div className="docs-row">
        <Button variant="primary" leadingIcon={Plus}>Add audience</Button>
        <Button variant="secondary" leadingIcon={PencilSimple}>Edit</Button>
        <Button variant="secondary" leadingIcon={CheckCircle} leadingIconWeight="fill">Approved</Button>
      </div>
    ),
    code: `import { CheckCircle, PencilSimple, Plus } from '@phosphor-icons/react';

<Button variant="primary" leadingIcon={Plus}>Add audience</Button>
<Button variant="secondary" leadingIcon={PencilSimple}>Edit</Button>
<Button variant="secondary" leadingIcon={CheckCircle} leadingIconWeight="fill">
  Approved
</Button>`,
  },
  {
    id: 'icon-only',
    title: 'Icon-only',
    description: 'A square button with no visible label. Always give it an `aria-label`, and use a functional (Tier 1) icon.',
    render: () => (
      <div className="docs-row">
        <Button variant="primary" iconOnly icon={Plus} aria-label="Add" />
        <Button variant="secondary" iconOnly icon={Trash} aria-label="Delete" />
        <Button variant="ghost" iconOnly icon={DotsThree} aria-label="More options" />
        <Button variant="ghost" size="sm" iconOnly icon={DotsThree} aria-label="More options" />
      </div>
    ),
    code: `import { DotsThree, Plus, Trash } from '@phosphor-icons/react';

<Button variant="primary" iconOnly icon={Plus} aria-label="Add" />
<Button variant="secondary" iconOnly icon={Trash} aria-label="Delete" />
<Button variant="ghost" iconOnly icon={DotsThree} aria-label="More options" />
<Button variant="ghost" size="sm" iconOnly icon={DotsThree} aria-label="More options" />`,
  },
  {
    id: 'trailing-arrow',
    title: 'Trailing arrow',
    description: 'An arrow after the label pointing to where the next step is.',
    render: () => (
      <div className="docs-row">
        <Button variant="primary" trailingArrow="down">Next: audience</Button>
        <Button variant="primary" trailingArrow="right">Continue</Button>
      </div>
    ),
    code: `<Button variant="primary" trailingArrow="down">Next: audience</Button>
<Button variant="primary" trailingArrow="right">Continue</Button>`,
  },
  {
    id: 'disabled',
    title: 'Disabled',
    description: 'One disabled look for every variant. The button leaves the tab order.',
    render: () => (
      <div className="docs-row">
        {variants.map(v => (
          <Button key={v} variant={v} disabled>
            {v[0].toUpperCase() + v.slice(1)}
          </Button>
        ))}
        <Button variant="primary" iconOnly icon={Plus} aria-label="Add" disabled />
      </div>
    ),
    code: `<Button variant="primary" disabled>Primary</Button>
<Button variant="secondary" disabled>Secondary</Button>
<Button variant="ghost" disabled>Ghost</Button>
<Button variant="primary" iconOnly icon={Plus} aria-label="Add" disabled />`,
  },
  {
    id: 'loading',
    title: 'Loading',
    description: 'A centred spinner replaces the content while an action runs. The fill and width stay the same, the button keeps focus and its name, and clicks are ignored.',
    render: () => <LoadingExample />,
    code: `const [saving, setSaving] = useState(false);

<Button variant="primary" loading={saving} onClick={save}>
  Save brief
</Button>`,
  },
  {
    id: 'cta-beacon',
    title: 'CTA beacon',
    description: 'A temporary "look here next" cue on the single next step: three rings, then it stops by itself. Hover, focus or press stops it at once. One beacon per page.',
    render: () => <BeaconExample />,
    code: `// Turn it on right after the step that makes it relevant.
<Button
  variant="primary"
  trailingArrow="down"
  beacon={briefFilled ? 'on' : 'off'}
  onBeaconChange={({ armed, reason }) => console.log(armed, reason)}
>
  Next: audience
</Button>`,
  },
  {
    id: 'button-row',
    title: 'A row of actions',
    description: 'Wrap the actions at the end of a form, panel or card in `ButtonRow`: right-aligned, 8px apart, Primary last. On a phone (640px and under) each button takes a full-width row, Primary on top; the tab order stays as written.',
    render: () => (
      <div className="docs-button-row-demo">
        <p className="docs-button-row-demo__text">Save the brief to share it with your team.</p>
        <ButtonRow>
          <Button variant="secondary">Cancel</Button>
          <Button variant="primary">Save brief</Button>
        </ButtonRow>
      </div>
    ),
    code: `<ButtonRow>
  <Button variant="secondary">Cancel</Button>
  <Button variant="primary">Save brief</Button>
</ButtonRow>`,
  },
  {
    id: 'button-row-split',
    title: 'A row with a separate action',
    description: '`align="split"` puts `leading` on the far left, away from the main pair: an action that is not part of the choice, such as Delete or Back. On a phone it goes to the bottom.',
    render: () => (
      <div className="docs-button-row-demo">
        <p className="docs-button-row-demo__text">Draft: Q3 awareness push. Last edited 2 hours ago.</p>
        <ButtonRow align="split" leading={<Button variant="ghost">Delete draft</Button>}>
          <Button variant="secondary">Save for later</Button>
          <Button variant="primary">Submit for review</Button>
        </ButtonRow>
      </div>
    ),
    code: `<ButtonRow align="split" leading={<Button variant="ghost">Delete draft</Button>}>
  <Button variant="secondary">Save for later</Button>
  <Button variant="primary">Submit for review</Button>
</ButtonRow>`,
  },
  {
    id: 'button-row-start',
    title: 'A call to action under its text',
    description: '`align="start"` and `"center"` only where a component says so: a CTA that follows its text starts under it. `stack="never"` keeps a single button at its own width on a phone.',
    render: () => (
      <div className="docs-button-row-demo">
        <p className="docs-button-row-demo__text">Plan next quarter from last quarter’s results.</p>
        <ButtonRow align="start" stack="never">
          <Button variant="primary">Start planning</Button>
        </ButtonRow>
      </div>
    ),
    code: `<ButtonRow align="start" stack="never">
  <Button variant="primary">Start planning</Button>
</ButtonRow>`,
  },
];

export const props: DocsProp[] = [
  { name: 'variant', options: "'primary' | 'secondary' | 'ghost' | 'danger' | 'link' | 'ai'", default: '—', required: true, description: 'Emphasis. `ai` = hands a task to CollabAI: the AI gradient, a sparkle, always labelled (no other icon, arrow or beacon). `primary` = the one main action in a region; `secondary` = actions beside a primary; `ghost` = low-emphasis, toolbar and table-row actions; `danger` = a destructive commit (delete, revoke); `link` = an inline text-level action, underlined, with no height or padding (ignores `size`, not available icon-only).' },
  { name: 'size', options: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Height 32 / 40 / 48px. `sm` for dense rows and toolbars, `lg` for prominent standalone actions.' },
  { name: 'children', options: 'ReactNode', default: '—', description: 'The label. A short verb phrase ("Save brief"). Not used with `iconOnly`.' },
  { name: 'leadingIcon', options: 'Icon', default: '—', description: 'Phosphor icon component before the label, e.g. `Plus`.' },
  { name: 'leadingIconWeight', options: "'regular' | 'fill'", default: "'regular'", description: '`regular` for actions (Tier 1). `fill` only for status icons such as `CheckCircle` (Tier 2).' },
  { name: 'trailingArrow', options: "'down' | 'right'", default: '—', description: 'Arrow after the label pointing to where the next step is. Nods while `beacon` is on.' },
  { name: 'iconOnly', options: 'true', default: '—', description: 'Square button, no visible label. Needs `icon` and `aria-label`.' },
  { name: 'icon', options: 'Icon', default: '—', description: 'The icon for `iconOnly`. Functional (Tier 1) icons only, e.g. `DotsThree`, `X`, `PencilSimple`, `Trash`. Always Regular.' },
  { name: 'aria-label', options: 'string', default: '—', description: 'Required with `iconOnly`. Names the action ("More options").' },
  { name: 'loading', options: 'boolean', default: 'false', description: 'Centred spinner replaces the content; fill and width stay the same, also on hover and press; clicks are ignored; the button keeps focus and its name. On `ai` it is the working state instead: the label stays and the gradient drifts.' },
  { name: 'disabled', options: 'boolean', default: 'false', description: 'Neutral-4 fill, not-allowed cursor, removed from the tab order.' },
  { name: 'beacon', options: "'off' | 'on' | 'static'", default: "'off'", description: 'CTA beacon. `on` = three rings (4.2s), then stops by itself. `static` = documentation and tests only. Primary with a label only.' },
  { name: 'onBeaconChange', options: '({ armed, reason }) => void', default: '—', description: 'Called when the beacon starts or stops. `reason` is `host`, `hover`, `touch`, `focus`, `click`, `cap` or `replaced`.' },
  { name: 'aiTarget', options: 'RefObject<HTMLElement | null>', default: '—', description: 'With `variant="ai"` only. The area CollabAI will change (wrap it in `AiTarget`). On click the sparkle flies there. No flight under reduced motion.' },
  { name: 'AiTarget active', options: 'boolean', default: 'false', description: 'On `AiTarget`: true while CollabAI works on the area. Shows the gradient ring and tint and sets `aria-busy`. Set it together with the button\'s `loading`.' },
  { name: 'type', options: "'button' | 'submit' | 'reset'", default: "'button'", description: 'Set `submit` for a form\'s submit action.' },
  { name: 'ButtonRow align', options: "'end' | 'start' | 'center' | 'split'", default: "'end'", description: 'On `ButtonRow`. `end` for the end of a form, panel or card; `split` puts `leading` on the far left; `start` and `center` only where a component says so.' },
  { name: 'ButtonRow leading', options: 'ReactNode', default: '—', description: 'On `ButtonRow`, with `align="split"`: the separate action (Delete, Back) on the far left.' },
  { name: 'ButtonRow stack', options: "'phone' | 'never'", default: "'phone'", description: 'On `ButtonRow`. `phone`: at 640px and under, one full-width button per row, Primary on top. `never`: buttons keep their width.' },
];

export const rules: DocsRules = {
  do: [
    'Keep one Primary per screen or card region.',
    'Lay out a row of actions with `ButtonRow`: right-aligned at the end of a form, panel or card, Primary last; `start` or `center` only where a component says so (a CTA under its text).',
    'Use a short verb phrase for the label ("Save brief").',
    'Give every icon-only button an `aria-label` and a functional (Tier 1) icon.',
    'Use `loading` while an action runs, instead of disabling the button.',
    'Turn the beacon on right after the step that makes it relevant, on one Primary, paired with a trailing arrow.',
    'Use Danger only for the committing action of a destructive flow (Delete, Revoke), usually after a confirmation.',
    'Use Link for a text-level action inside a sentence or tray ("Show less", "Clear all").',
    'Use AI only for an action that hands a task to CollabAI, and name what it will do ("Rewrite summary with CollabAI").',
    'Show where an AI change lands with `aiTarget` and `AiTarget` when the area is not obvious.',
  ],
  dont: [
    'Use a button to go to another page; use a link.',
    'Use an element or department colour as a button fill. Obsidian is the only action colour.',
    'Put two Primary buttons in the same region.',
    'Use a Fill (Tier 2) icon in an icon-only button.',
    'Turn the beacon on at page load or on a timer, run more than one at a time, or move focus to it.',
    'Use Danger for anything that is not destructive, or put the beacon on it.',
    'Use Link where a real link to another page is needed; use an anchor for that.',
    'Use AI for an ordinary action, or as a second primary. It sits beside the Primary, never in place of it.',
    'Use the AI colours one at a time or outside the AI gradient.',
  ],
};

export const accessibility: DocsAccessibility = {
  keyboard: [
    { keys: 'Tab / Shift+Tab', action: 'Moves focus to and from the button. Disabled buttons are skipped.' },
    { keys: 'Enter / Space', action: 'Activates the button. Ignored while loading.' },
  ],
  notes: [
    'Renders a native `<button type="button">`.',
    'Focus-visible shows a 2px Obsidian outline with a 2px offset.',
    'Icons are `aria-hidden`; the name comes from the label, or from `aria-label` when `iconOnly`.',
    'Loading sets `aria-busy="true"` and `aria-disabled="true"`. The label stays in the accessibility tree, so the name doesn\'t change. There is no live region; announce the result of the action, not the spinner.',
    'The beacon is purely visual: no live region, no `aria-describedby`, no change to the name.',
    'AI: the gradient label is about 3.7:1 on its tint, and white on the hover gradient about 4.0:1, below the 4.5:1 AA target for 16px text (accepted 2026-11-18). In forced colours the gradients drop and the label shows in system text.',
    'AI working state keeps the label and sets `aria-busy`; AiTarget sets `aria-busy` on the area while active. The flying sparkle is aria-hidden and focus never moves.',
  ],
};

export const motion: DocsMotion[] = [
  { interaction: 'Hover, press, disabled', motion: 'Background colour fades', token: '--duration-fast · --ease-standard' },
  { interaction: 'Loading', motion: 'Spinner rotates continuously, also under reduced motion: it is the only sign the work is still running', token: '--duration-ambient · linear' },
  { interaction: 'CTA beacon', motion: 'Ring breathes out and the arrow nods, 1.4s × 3, then stops', token: '--ease-standard (1.4s cycle is a recorded one-off)' },
  { interaction: 'AI hover', motion: 'Solid gradient shimmers left to right, looping; pressed holds it still and darker', token: '--duration-pulse × 2 · linear' },
  { interaction: 'AI working (loading)', motion: 'Label gradient and tint drift, looping', token: '--duration-pulse × 10 · linear' },
  { interaction: 'AI sparkle flight (aiTarget)', motion: 'Sparkle arcs from the button to the target, grows, turns and fades as it lands; the target ring lights up on landing', token: '--duration-reveal × 2 · --ease-flow' },
  { interaction: 'AI, reduced motion', motion: 'No shimmer, drift or flight; the gradients stay and the target ring just appears', token: '—' },
  { interaction: 'CTA beacon, reduced motion', motion: 'No pulse, no nod: a steady 2px ring for 4.2s', token: '--border-width-md' },
];
