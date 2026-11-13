// Documentation for Info Banner, rendered by the docs site (playground).
// Keep it consistent with InfoBanner.usage.md. Not part of the package build.
import { useState, type ReactNode } from 'react';
import { InfoBanner } from './InfoBanner';
import { Button } from '../Button';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../docs.types';

export const title = 'Info Banner';

export const description =
  'An inline, persistent notification at the top of a section or card: a tone, an icon, one message, up to two actions and, when dismissible, a close button. Distinct from Toast, which floats and leaves by itself.';

export const usage = `import { InfoBanner } from '@collabrium/ui';

export function BillingNotice() {
  return (
    <InfoBanner
      tone="warning"
      dismissible
      actions={[{ label: 'Update billing', onClick: openBilling }]}
    >
      Your card on file expires this month.
    </InfoBanner>
  );
}`;

const noop = () => {};

export const thumbnail = () => (
  <div className="docs-stack">
    <InfoBanner tone="info">Your changes sync every 15 minutes.</InfoBanner>
  </div>
);

export const anatomy: DocsAnatomyNode[] = [
  {
    name: 'Info Banner',
    element: '<div role="note" | "status">.cui-info-banner[data-tone]',
    description: 'Full width, 12px / 16px padding, radius-md, a 1px border and fill in the tone, no shadow.',
    children: [
      { name: 'Icon', element: '<svg>.cui-info-banner__icon', description: '20px, Fill (a status, not a control), full-strength tone colour, centred with the message.' },
      { name: 'Message', element: '.cui-info-banner__message', description: 'body2 at 400, the tone colour at 80%. The only text, 120 characters at most.' },
      { name: 'Actions', element: '.cui-info-banner__actions > button', description: 'Optional, after the message, 8px above, up to two. Styled exactly like the message, underlined.' },
      { name: 'Close', element: 'Button ghost sm icon-only', description: 'Dismissible only: an X named "Dismiss", centred with the icon and message.' },
    ],
  },
];

// Brings a dismissed demo banner back. Only for these docs: in a product, an AI Recommendation never comes back in
// the same session once dismissed (rule 5).
function Replayable({ children }: { children: ReactNode }) {
  const [key, setKey] = useState(0);
  return (
    <div className="docs-stack">
      <div key={key} className="docs-stack">
        {children}
      </div>
      <div className="docs-row">
        <Button variant="secondary" size="sm" onClick={() => setKey(k => k + 1)}>
          Show again
        </Button>
      </div>
    </div>
  );
}

function Dismissing() {
  const [key, setKey] = useState(0);
  return (
    <div className="docs-stack">
      <div key={key} className="docs-stack">
        <InfoBanner tone="info" dismissible>Dismiss me: I slide up and fade, and the banner below moves up.</InfoBanner>
        <InfoBanner tone="neutral">I move up when the one above leaves.</InfoBanner>
      </div>
      <div className="docs-row">
        <Button variant="secondary" size="sm" onClick={() => setKey(k => k + 1)}>
          Show again
        </Button>
      </div>
    </div>
  );
}

export const examples: DocsExample[] = [
  {
    id: 'tones',
    title: 'Tones',
    description: 'Neutral for a plain FYI, Info as the default, Success for a healthy state, Warning for an approaching limit, Danger for a failing or blocking state.',
    render: () => (
      <div className="docs-stack">
        <InfoBanner tone="neutral">Message-only is the default shape. A general FYI with no positive or negative charge.</InfoBanner>
        <InfoBanner tone="info">New: exports now include campaign notes.</InfoBanner>
        <InfoBanner tone="success">Sync complete. All records are up to date.</InfoBanner>
        <InfoBanner tone="warning">You have used 90% of this month’s seats.</InfoBanner>
        <InfoBanner tone="danger">We can’t reach the server right now. Retrying automatically.</InfoBanner>
      </div>
    ),
    code: `<InfoBanner tone="neutral">Message-only is the default shape…</InfoBanner>
<InfoBanner tone="info">New: exports now include campaign notes.</InfoBanner>
<InfoBanner tone="success">Sync complete. All records are up to date.</InfoBanner>
<InfoBanner tone="warning">You have used 90% of this month’s seats.</InfoBanner>
<InfoBanner tone="danger">We can’t reach the server right now. Retrying automatically.</InfoBanner>`,
  },
  {
    id: 'actions',
    title: 'Dismissible, with actions',
    description: 'Up to two actions, styled like the message. Clicking one doesn’t dismiss the banner: only the close button does.',
    render: () => (
      <Replayable>
        <InfoBanner tone="warning" dismissible actions={[{ label: 'Update billing', onClick: noop }, { label: 'Remind me later', onClick: noop }]}>
          Your card on file expires this month.
        </InfoBanner>
      </Replayable>
    ),
    code: `<InfoBanner
  tone="warning"
  dismissible
  actions={[
    { label: 'Update billing', onClick: openBilling },
    { label: 'Remind me later', onClick: snooze },
  ]}
>
  Your card on file expires this month.
</InfoBanner>`,
  },
  {
    id: 'ai',
    title: 'AI Recommendation',
    description: 'A proactive suggestion with a real signal behind it: always dismissible, always exactly one action, one per section. The pastel wash and ring move; under reduced motion they hold still. "Show again" is for this page only: in a product, a dismissed recommendation doesn\'t come back in the same session.',
    render: () => (
      <Replayable>
        <InfoBanner tone="ai" actions={[{ label: 'Apply suggestion', onClick: noop }]}>
          3 of your workspaces share the same permissions. Combine them into one group?
        </InfoBanner>
      </Replayable>
    ),
    code: `<InfoBanner tone="ai" actions={[{ label: 'Apply suggestion', onClick: combineGroups }]}>
  3 of your workspaces share the same permissions. Combine them into one group?
</InfoBanner>`,
  },
  {
    id: 'dismiss',
    title: 'Dismissing',
    description: 'The banner slides up and fades out, and the space closes so banners below shift up. `onDismiss` is called once it has left.',
    render: () => <Dismissing />,
    code: `<InfoBanner tone="info" dismissible onDismiss={() => markSeen('sync-note')}>…</InfoBanner>`,
  },
];

export const props: DocsProp[] = [
  { name: 'children', options: 'ReactNode', default: '—', required: true, description: 'The message, 120 characters at most.' },
  { name: 'tone', options: "'neutral' | 'info' | 'success' | 'warning' | 'danger' | 'ai'", default: "'info'", description: 'The tone and its icon.' },
  { name: 'dismissible', options: 'boolean', default: 'false (always true for ai)', description: 'Shows the close button. Leave off for a persistent state the reader can\'t resolve by closing it.' },
  { name: 'actions', options: '{ label: string; onClick: () => void }[]', default: '[]', description: 'Up to two; exactly one for `ai`. Labels 3 words at most, never destructive.' },
  { name: 'onDismiss', options: '() => void', default: '—', description: 'Called once the banner has been dismissed and has left.' },
  { name: 'icon', options: 'Icon (Phosphor)', default: 'the tone\'s', description: 'Replaces the tone\'s icon. Drawn Fill.' },
  { name: 'id, aria-*, data-*', options: 'native', default: '—', description: 'Passed to the banner\'s `<div>`. `style` and `className` are not accepted. The ref is forwarded to it.' },
];

export const rules: DocsRules = {
  do: [
    'Put it at the top of its section or card, full width.',
    'Use Info when in doubt; keep Danger persistent while the failure lasts.',
    'Back an AI Recommendation with a real signal and give it exactly one action.',
    'Stack at most two per section, 8px apart (one, if either is AI).',
  ],
  dont: [
    'Don\'t use it for transient feedback: that\'s Toast.',
    'Don\'t put a destructive action in it.',
    'Don\'t make an AI Recommendation persistent, or show it again once dismissed this session.',
    'Don\'t place it outside a section or card.',
  ],
};

export const accessibility: DocsAccessibility = {
  keyboard: [
    { keys: 'Tab', action: 'Moves to the actions, then the close button.' },
    { keys: 'Escape', action: 'Dismisses a dismissible banner while focus is inside it.' },
  ],
  notes: [
    'A persistent banner is `role="note"`, a dismissible one `role="status"`, both `aria-live="polite"`.',
    'The close button is named "Dismiss". Focus never moves to a banner when it appears.',
    'The icon and the words carry the tone, never colour alone.',
    'In forced colours the banner keeps a CanvasText edge, and the AI wash and ring are hidden.',
  ],
};

export const motion: DocsMotion[] = [
  { interaction: 'Appear', motion: 'Slides down 8px and fades in.', token: '--duration-base · --ease-standard' },
  { interaction: 'Dismiss', motion: 'Slides up and fades out, and its space closes so banners below shift up.', token: '--duration-base · --ease-standard' },
  { interaction: 'AI Recommendation', motion: 'The pastel wash and ring loop every 4s.', token: 'Prompt input bar\'s glow keyframe' },
  { interaction: 'Reduced motion', motion: 'Appears and leaves at once; the AI gradient holds still.', token: '—' },
];
