// Documentation for Button, rendered by the docs site (playground).
// Keep it consistent with Button.usage.md. Not part of the package build.
import { useState } from 'react';
import { ArrowClockwise, CheckCircle, DotsThree, PencilSimple, Plus, Trash } from '@phosphor-icons/react';
import { Button, type ButtonBeaconReason } from './Button';
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
  'Starts an action on the current page. Three levels of emphasis, three sizes, an icon-only form, a loading state and the CTA beacon.';

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
      { name: 'Spinner', element: 'svg.cui-button__spinner', when: 'while loading', description: 'Centred over the hidden content, rotating.' },
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
];

export const props: DocsProp[] = [
  { name: 'variant', options: "'primary' | 'secondary' | 'ghost' | 'danger' | 'link'", default: '—', required: true, description: 'Emphasis. `primary` = the one main action in a region; `secondary` = actions beside a primary; `ghost` = low-emphasis, toolbar and table-row actions; `danger` = a destructive commit (delete, revoke); `link` = an inline text-level action, underlined, with no height or padding (ignores `size`, not available icon-only).' },
  { name: 'size', options: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Height 32 / 40 / 48px. `sm` for dense rows and toolbars, `lg` for prominent standalone actions.' },
  { name: 'children', options: 'ReactNode', default: '—', description: 'The label. A short verb phrase ("Save brief"). Not used with `iconOnly`.' },
  { name: 'leadingIcon', options: 'Icon', default: '—', description: 'Phosphor icon component before the label, e.g. `Plus`.' },
  { name: 'leadingIconWeight', options: "'regular' | 'fill'", default: "'regular'", description: '`regular` for actions (Tier 1). `fill` only for status icons such as `CheckCircle` (Tier 2).' },
  { name: 'trailingArrow', options: "'down' | 'right'", default: '—', description: 'Arrow after the label pointing to where the next step is. Nods while `beacon` is on.' },
  { name: 'iconOnly', options: 'true', default: '—', description: 'Square button, no visible label. Needs `icon` and `aria-label`.' },
  { name: 'icon', options: 'Icon', default: '—', description: 'The icon for `iconOnly`. Functional (Tier 1) icons only, e.g. `DotsThree`, `X`, `PencilSimple`, `Trash`. Always Regular.' },
  { name: 'aria-label', options: 'string', default: '—', description: 'Required with `iconOnly`. Names the action ("More options").' },
  { name: 'loading', options: 'boolean', default: 'false', description: 'Centred spinner replaces the content; fill and width stay the same, also on hover and press; clicks are ignored; the button keeps focus and its name.' },
  { name: 'disabled', options: 'boolean', default: 'false', description: 'Neutral-4 fill, not-allowed cursor, removed from the tab order.' },
  { name: 'beacon', options: "'off' | 'on' | 'static'", default: "'off'", description: 'CTA beacon. `on` = three rings (4.2s), then stops by itself. `static` = documentation and tests only. Primary with a label only.' },
  { name: 'onBeaconChange', options: '({ armed, reason }) => void', default: '—', description: 'Called when the beacon starts or stops. `reason` is `host`, `hover`, `touch`, `focus`, `click`, `cap` or `replaced`.' },
  { name: 'type', options: "'button' | 'submit' | 'reset'", default: "'button'", description: 'Set `submit` for a form\'s submit action.' },
];

export const rules: DocsRules = {
  do: [
    'Keep one Primary per screen or card region.',
    'Use a short verb phrase for the label ("Save brief").',
    'Give every icon-only button an `aria-label` and a functional (Tier 1) icon.',
    'Use `loading` while an action runs, instead of disabling the button.',
    'Turn the beacon on right after the step that makes it relevant, on one Primary, paired with a trailing arrow.',
    'Use Danger only for the committing action of a destructive flow (Delete, Revoke), usually after a confirmation.',
    'Use Link for a text-level action inside a sentence or tray ("Show less", "Clear all").',
  ],
  dont: [
    'Use a button to go to another page; use a link.',
    'Use an element or department colour as a button fill. Obsidian is the only action colour.',
    'Put two Primary buttons in the same region.',
    'Use a Fill (Tier 2) icon in an icon-only button.',
    'Turn the beacon on at page load or on a timer, run more than one at a time, or move focus to it.',
    'Use Danger for anything that is not destructive, or put the beacon on it.',
    'Use Link where a real link to another page is needed; use an anchor for that.',
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
  ],
};

export const motion: DocsMotion[] = [
  { interaction: 'Hover, press, disabled', motion: 'Background colour fades', token: '--duration-fast · --ease-standard' },
  { interaction: 'Loading', motion: 'Spinner rotates continuously, also under reduced motion: it is the only sign the work is still running', token: '--duration-ambient · linear' },
  { interaction: 'CTA beacon', motion: 'Ring breathes out and the arrow nods, 1.4s × 3, then stops', token: '--ease-standard (1.4s cycle is a recorded one-off)' },
  { interaction: 'CTA beacon, reduced motion', motion: 'No pulse, no nod: a steady 2px ring for 4.2s', token: '--border-width-md' },
];
