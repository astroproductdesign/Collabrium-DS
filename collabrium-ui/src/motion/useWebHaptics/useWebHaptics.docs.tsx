// Documentation for useWebHaptics (Motion), rendered by the docs site.
// Keep it consistent with useWebHaptics.usage.md. Not part of the package build.
import { useState } from 'react';
import { useWebHaptics, type HapticType } from './useWebHaptics';
import { Button } from '../../components/Button';
import { motionRow } from '../lib/docs-shared.docs';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../../components/docs.types';

export const title = 'useWebHaptics';

export const description = 'A hook that gives a short vibration on touch devices, as feedback to a press or a result. It does nothing where the browser cannot vibrate.';

export const usage = `import { useWebHaptics } from '@collabrium/ui/motion';

export function Save() {
  const { trigger } = useWebHaptics();
  return <button onClick={() => trigger('success')}>Save</button>;
}`;

export const thumbnail = () => <p className="docs-motion-sample">trigger(&apos;success&apos;) → vibrates</p>;

export const anatomy: DocsAnatomyNode[] = [
  { name: 'useWebHaptics()', description: 'Returns `{ trigger }`. `trigger(type)` vibrates with the pattern for `type` and returns true when it did.' },
];

function Try({ type }: { type: HapticType }) {
  const { trigger } = useWebHaptics();
  const [said, setSaid] = useState('');
  return (
    <div className="docs-stack">
      <Button variant="secondary" size="sm" onClick={() => setSaid(trigger(type) ? `Vibrated (${type}).` : 'Nothing happened: this device or setting cannot vibrate.')}>
        Try {type}
      </Button>
      <p className="docs-status">{said}</p>
    </div>
  );
}

export const examples: DocsExample[] = [
  {
    id: 'success',
    title: 'Success',
    description: 'Press it on a phone or a tablet that vibrates. On a desktop, or with reduced motion on, it does nothing and says so.',
    render: () => <Try type="success" />,
    code: `const { trigger } = useWebHaptics();

<Button variant="secondary" size="sm" onClick={() => trigger('success')}>
  Try success
</Button>`,
  },
  {
    id: 'error',
    title: 'Error',
    description: 'Five short pulses, for something that went wrong. Never use it on its own: show the error as text as well.',
    render: () => <Try type="error" />,
    code: `<Button variant="secondary" size="sm" onClick={() => trigger('error')}>
  Try error
</Button>`,
  },
];

export const props: DocsProp[] = [
  { name: 'trigger(type)', options: "'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'error'", default: "'light'", description: 'Vibrates with that pattern. Light is 10ms, medium 25ms, heavy 50ms; success, warning and error are patterns of pulses.' },
  { name: 'returns trigger', options: '(type?) => boolean', default: '—', description: 'True when it vibrated; false where the browser cannot, or reduced motion is on.' },
];

export const rules: DocsRules = {
  do: ['Use it to confirm a press or a result on touch devices.', 'Keep it light for common actions and reserve the stronger patterns for results.'],
  dont: ["Don't use it as the only sign of anything: many devices cannot vibrate.", "Don't use it for every tap.", "Don't fire it on page load or without a person's action."],
};

export const accessibility: DocsAccessibility = {
  keyboard: 'None: a hook has no interface.',
  notes: ['Vibration is feedback, never information: whatever it confirms must also be on screen as text.', 'It is switched off when the person has asked for reduced motion.'],
};

export const motion: DocsMotion[] = [
  motionRow('trigger is called', 'The device vibrates with the pattern for the type.', '—'),
  motionRow('Reduced motion', 'Nothing vibrates.', '—'),
];
