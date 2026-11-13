// Documentation for Toast, rendered by the docs site (playground).
// Keep it consistent with Toast.usage.md. Not part of the package build.
import { Button } from '../Button';
import { Toast, ToastProvider, useToast } from './Toast';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../docs.types';

export const title = 'Toast';

export const description =
  'Transient, auto-dismissing system feedback in the bottom-right corner: a tone icon, a title and / or a message, an optional action and a close. Never the place for a decision with real consequences.';

export const usage = `import { Button, ToastProvider, useToast } from '@collabrium/ui';

// Once, near the root of the app:
<ToastProvider>
  <App />
</ToastProvider>

// Anywhere below it:
function SaveButton() {
  const { toast } = useToast();
  return (
    <Button variant="primary" onClick={() => toast({ tone: 'success', title: 'Brief saved', message: 'Your changes are live.' })}>
      Save brief
    </Button>
  );
}`;

const noop = () => {};

export const thumbnail = () => <Toast tone="success" title="Brief saved" message="Your changes are live." onDismiss={noop} />;

function LiveDemo() {
  const { toast } = useToast();
  return (
    <div className="docs-stack-row">
      <Button variant="secondary" size="sm" onClick={() => toast({ tone: 'neutral', title: 'Report exported', message: 'Check your downloads folder.' })}>
        Neutral
      </Button>
      <Button variant="secondary" size="sm" onClick={() => toast({ tone: 'success', title: 'Brief saved', message: 'Your changes are live.' })}>
        Success
      </Button>
      <Button variant="secondary" size="sm" onClick={() => toast({ tone: 'warning', title: 'Budget nearly spent', message: '92% of this month’s budget is committed.' })}>
        Warning
      </Button>
      <Button variant="secondary" size="sm" onClick={() => toast({ tone: 'danger', title: 'Upload failed', message: 'The file is over 25 MB. Try a smaller one.' })}>
        Danger
      </Button>
      <Button
        variant="secondary"
        size="sm"
        onClick={() => toast({ tone: 'neutral', message: 'Campaign archived.', action: { label: 'Undo', onClick: noop } })}
      >
        With an action
      </Button>
    </div>
  );
}

export const anatomy: DocsAnatomyNode[] = [
  {
    name: 'Toast host',
    element: '<div role="region">.cui-toast-host',
    description: 'Fixed bottom right, 24px in, 380px wide; a full-width band 12px in on phones (640px and below). Holds one live list, so a new toast is read out.',
    children: [
      {
        name: 'Toast',
        element: '.cui-toast',
        description: '320–420px, Neutral-1, 1px Neutral-3, radius-md (16px), shadow-3, 12px 16px padding, 12px gap. Up to 3, 8px apart, newest on top.',
        children: [
          { name: 'Icon', element: '.cui-toast__icon', description: 'icon-base (20px), Fill, 2px down. Neutral info, Green check, Amber warning, Red x-circle.' },
          { name: 'Title', element: '.cui-toast__title', when: 'title', description: 'body1, bold, Neutral-9. 50 characters at most.' },
          { name: 'Message', element: '.cui-toast__message', when: 'message', description: 'Caption, Neutral-5 under a title; body1 at 500, Neutral-9, on its own. 100 characters at most.' },
          { name: 'Action', element: '.cui-toast__action', when: 'action', description: 'A link Button, 8px under the text. Clicking it also dismisses the toast.' },
          { name: 'Close', element: 'Button ghost sm icon-only', when: 'dismissible', description: 'Top right, X (Regular), "Dismiss". Always on Danger.' },
        ],
      },
    ],
  },
];

export const examples: DocsExample[] = [
  {
    id: 'live',
    title: 'Show a toast',
    description: 'Toasts appear in the bottom-right corner of this page. Three at most; a fourth waits its turn. Danger stays until you close it; the rest leave after 5 seconds, and wait while you hover or focus them.',
    render: () => (
      <ToastProvider>
        <LiveDemo />
      </ToastProvider>
    ),
    code: `const { toast } = useToast();

<Button variant="secondary" size="sm" onClick={() => toast({ tone: 'success', title: 'Brief saved', message: 'Your changes are live.' })}>
  Success
</Button>`,
  },
  {
    id: 'tones',
    title: 'Tones',
    description: 'Neutral for plain information, Success when something worked, Warning for something to watch, Danger when something failed.',
    render: () => (
      <div className="docs-stack">
        <Toast tone="neutral" title="Report exported" message="Check your downloads folder." onDismiss={noop} />
        <Toast tone="success" title="Brief saved" message="Your changes are live." onDismiss={noop} />
        <Toast tone="warning" title="Budget nearly spent" message="92% of this month’s budget is committed." onDismiss={noop} />
        <Toast tone="danger" title="Upload failed" message="The file is over 25 MB. Try a smaller one." onDismiss={noop} />
      </div>
    ),
    code: `toast({ tone: 'neutral', title: 'Report exported', message: 'Check your downloads folder.' });
toast({ tone: 'success', title: 'Brief saved', message: 'Your changes are live.' });
toast({ tone: 'warning', title: 'Budget nearly spent', message: '92% of this month’s budget is committed.' });
toast({ tone: 'danger', title: 'Upload failed', message: 'The file is over 25 MB. Try a smaller one.' });`,
  },
  {
    id: 'layouts',
    title: 'Layouts',
    description: 'Title only; message only (the message steps up to body1); and with an action under the text.',
    render: () => (
      <div className="docs-stack">
        <Toast tone="success" title="Link copied" onDismiss={noop} />
        <Toast tone="neutral" message="Campaign archived." onDismiss={noop} />
        <Toast tone="neutral" title="Campaign archived" message="It’s hidden from the list." action={{ label: 'Undo', onClick: noop }} onDismiss={noop} />
      </div>
    ),
    code: `toast({ tone: 'success', title: 'Link copied' });
toast({ tone: 'neutral', message: 'Campaign archived.' });
toast({ tone: 'neutral', title: 'Campaign archived', message: 'It’s hidden from the list.', action: { label: 'Undo', onClick: restore } });`,
  },
];

export const props: DocsProp[] = [
  { name: 'toast(options)', options: '(options) => id', default: '—', description: 'From `useToast()`. Shows a toast, or queues it when 3 are on screen.' },
  { name: 'dismiss(id)', options: '(id: string) => void', default: '—', description: 'From `useToast()`. Closes a toast early, or drops it from the queue.' },
  { name: 'tone', options: "'neutral' | 'success' | 'warning' | 'danger'", default: "'neutral'", description: 'The icon and its colour. Danger never leaves on its own.' },
  { name: 'title', options: 'ReactNode', default: '—', description: 'Body1 bold. A title, a message or both is required.' },
  { name: 'message', options: 'ReactNode', default: '—', description: 'Caption under a title; body1 on its own.' },
  { name: 'action', options: '{ label, onClick }', default: '—', description: 'One link under the text. Never destructive. Also dismisses the toast.' },
  { name: 'dismissible', options: 'boolean', default: 'true', description: 'Shows the close button. Danger always has it.' },
  { name: 'ToastProvider label', options: 'string', default: '"Notifications"', description: 'Names the toast region for screen readers.' },
];

export const rules: DocsRules = {
  do: [
    'Keep one toast on screen at a time where you can; stack only when truly needed.',
    'Keep the title to 50 characters and the message to 100: rewrite longer copy.',
    'Use Danger for a failure the reader must see: it stays until closed.',
  ],
  dont: [
    'Don’t put a destructive or irreversible action in a toast: it disappears on its own.',
    'Don’t use a toast for something tied to one part of the page: use Info Banner.',
    'Don’t show a toast with only an icon and a close.',
  ],
};

export const accessibility: DocsAccessibility = {
  keyboard: 'Tab reaches a toast\'s action and close (the stack sits at the end of the page). Escape dismisses the focused toast. Focus inside a toast pauses its timer.',
  notes: [
    'The host is a "Notifications" region holding one polite live list for the page\'s life, so each new toast is read out once.',
    'The tone icon is decorative: the title and message carry the meaning.',
    'Hover or focus pauses the 5-second timer; Danger never times out.',
    'After a dismiss, focus doesn\'t move.',
  ],
};

export const motion: DocsMotion[] = [
  { interaction: 'Enter', motion: 'Slides up 16px and fades in.', token: '--duration-base · --ease-standard' },
  { interaction: 'Exit', motion: 'Fades out and slides down 8px.', token: '--duration-base · --ease-standard' },
  { interaction: 'Stack reflow', motion: 'The other toasts slide to their new places.', token: '--duration-base · --ease-standard' },
  { interaction: 'Lift above Back to top', motion: 'The stack glides up 12px clear of the button, and back down when it hides.', token: '--duration-base · --ease-standard' },
  { interaction: 'Reduced motion', motion: 'Toasts appear and leave at once; the lift is instant.', token: '—' },
];
