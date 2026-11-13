// Documentation for Stepper, rendered by the docs site (playground).
// Keep it consistent with Stepper.usage.md. Not part of the package build.
import { Stepper } from './Stepper';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsProp, DocsRules } from '../docs.types';

export const title = 'Stepper';

export const description =
  'Progress through a multi-step flow (onboarding, a multi-page form, a checkout) as an ordered list of steps. Each step\'s state comes from one `currentStep`: Completed, Active or Upcoming, with Error and Warning as flags on top. Read-only. For a plan whose items each have their own status, use its read-only plan variant, Timeline.';

export const usage = `import { Stepper } from '@collabrium/ui';

export function SetupProgress({ step }: { step: number }) {
  return (
    <Stepper
      aria-label="Account setup"
      currentStep={step}
      steps={[{ label: 'Account' }, { label: 'Profile' }, { label: 'Preferences' }, { label: 'Review' }]}
    />
  );
}`;

const base = [{ label: 'Account' }, { label: 'Profile' }, { label: 'Preferences' }, { label: 'Review' }];

export const thumbnail = () => <Stepper aria-label="Account setup" currentStep={1} steps={base} />;

export const anatomy: DocsAnatomyNode[] = [
  {
    name: 'Stepper',
    element: '<ol>.cui-stepper[data-orientation]',
    description: 'A flex row (horizontal) or column (vertical), its own container for the 480px rule.',
    children: [
      {
        name: 'Step',
        element: '<li>.cui-stepper__item',
        description: '`aria-current="step"` on the Active one. Horizontal: the step, then the connector to the next.',
        children: [
          { name: 'Indicator', element: 'span.cui-stepper__indicator[data-state]', description: '24px disc: a check (Completed, green), the number (Active, Obsidian; Upcoming, outlined), an × (Error, Red) or a warning triangle (Warning, Amber). aria-hidden.' },
          { name: 'Rail', element: '.cui-stepper__rail', when: 'vertical', description: 'The indicator over the connector, 8px apart.' },
          { name: 'Label', element: 'span.cui-stepper__label[data-state]', description: 'body2. Bold Neutral-9 when Active; Neutral-5 otherwise; Red for Error.' },
          { name: 'Description', element: 'span.cui-stepper__desc', when: 'description', description: 'caption, Neutral-5, 4px under the label; a flag\'s message in bold. Hidden below 480px (horizontal).' },
          { name: 'Connector', element: 'span.cui-stepper__connector', when: 'every step but the last', description: '1px Neutral-3. Horizontal: an equal share of the row, 4px off each circle. Vertical: 16px.' },
        ],
      },
    ],
  },
];

export const examples: DocsExample[] = [
  {
    id: 'horizontal',
    title: 'Horizontal',
    description: 'Across the top of a flow. Account is done, Profile is current, two steps to go.',
    render: () => <Stepper aria-label="Account setup" currentStep={1} steps={base} />,
    code: `<Stepper
  aria-label="Account setup"
  currentStep={1}
  steps={[{ label: 'Account' }, { label: 'Profile' }, { label: 'Preferences' }, { label: 'Review' }]}
/>`,
  },
  {
    id: 'vertical',
    title: 'Vertical',
    description: 'Down a side panel or a narrow column. The connectors are a fixed 16px.',
    render: () => (
      <div style={{ maxWidth: 280 }}>
        <Stepper aria-label="Account setup" orientation="vertical" currentStep={1} steps={base} />
      </div>
    ),
    code: `<Stepper
  aria-label="Account setup"
  orientation="vertical"
  currentStep={1}
  steps={[{ label: 'Account' }, { label: 'Profile' }, { label: 'Preferences' }, { label: 'Review' }]}
/>`,
  },
  {
    id: 'flags',
    title: 'Flags and descriptions',
    description: 'A Warning on a completed step and an Error on the current one; each flag\'s message takes the description\'s place. Every step has a description, or none does.',
    render: () => (
      <Stepper
        aria-label="Account setup"
        currentStep={1}
        steps={[
          { label: 'Account', description: 'Recovery email unverified', flag: 'warning' },
          { label: 'Profile', description: 'Photo upload failed', flag: 'error' },
          { label: 'Preferences', description: 'Notifications and theme' },
          { label: 'Review', description: 'Confirm and finish' },
        ]}
      />
    ),
    code: `<Stepper
  aria-label="Account setup"
  currentStep={1}
  steps={[
    { label: 'Account', description: 'Recovery email unverified', flag: 'warning' },
    { label: 'Profile', description: 'Photo upload failed', flag: 'error' },
    { label: 'Preferences', description: 'Notifications and theme' },
    { label: 'Review', description: 'Confirm and finish' },
  ]}
/>`,
  },
];

export const props: DocsProp[] = [
  { name: 'steps', options: '{ label; description?; flag?: \'error\' | \'warning\' }[]', default: '—', required: true, description: 'The steps, in order. On a flagged step, `description` is the flag\'s message.' },
  { name: 'currentStep', options: 'number (from 0)', default: '—', required: true, description: 'The Active step. Before it Completed, after it Upcoming. `steps.length` marks every step Completed.' },
  { name: 'orientation', options: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Across the top of a page, or down a side panel.' },
  { name: 'aria-label', options: 'string', default: '—', description: 'Names the list for screen readers ("Account setup").' },
  { name: 'id, aria-*, data-*', options: 'native', default: '—', description: 'Passed to the `<ol>`. `style` and `className` are not accepted. The ref is forwarded to it.' },
];

export const rules: DocsRules = {
  do: [
    'Drive every step from one `currentStep`.',
    'Put Error only on the current step, and Warning only on a completed one.',
    'Give every step a description, or none.',
    'Move `currentStep` yourself once an Error is resolved: resolving and advancing are two acts.',
  ],
  dont: [
    'Don\'t track a state per step.',
    'Don\'t use it for a plan whose items each have their own status: use Timeline.',
    'Don\'t use it for a − / + number field: use Quantity selector.',
  ],
};

export const accessibility: DocsAccessibility = {
  keyboard: 'None. Stepper is read-only and takes no focus.',
  notes: [
    'An ordered list; the Active step\'s item has `aria-current="step"`.',
    'Each step reads "Step 2 of 4: Profile, current step" (or completed, upcoming, current step, error, or completed, warning). The discs are decoration.',
    'Error text is Red and bold; the state is also spoken, never colour alone.',
    'In forced colours every indicator keeps a 1px circle and every connector is drawn, both in the system text colour.',
  ],
};

export const motion = 'None. Stepper doesn\'t animate.';
