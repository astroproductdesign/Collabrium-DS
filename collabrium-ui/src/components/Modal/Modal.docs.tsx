// Documentation for Modal / dialog, rendered by the docs site (playground).
// Keep it consistent with Modal.usage.md. Not part of the package build.
import { useState } from 'react';
import { Modal } from './Modal';
import { Button } from '../Button';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../docs.types';

export const title = 'Modal / dialog';

export const description =
  'One focused decision, asked over the page: a 420px panel on a scrim with a title, a short body, and a footer of Secondary (cancel) then Primary (commit).';

export const usage = `import { Button, Modal } from '@collabrium/ui';

export function ArchiveWorkspace() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>Archive workspace</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Archive this workspace?"
        actions={<>
          <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="primary" onClick={() => setOpen(false)}>Archive</Button>
        </>}
      >
        Team members will lose access immediately. You can restore it from Settings within 30 days.
      </Modal>
    </>
  );
}`;

function Demo() {
  const [open, setOpen] = useState(false);
  return (
    <div className="docs-row">
      <Button variant="secondary" onClick={() => setOpen(true)}>
        Archive workspace
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Archive this workspace?"
        actions={
          <>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setOpen(false)}>Archive</Button>
          </>
        }
      >
        Team members will lose access immediately. You can restore it from Settings within 30 days.
      </Modal>
    </div>
  );
}

// A still picture of the panel for the home grid and search; the real modal only exists while open.
export const thumbnail = () => (
  <div className="cui-modal" aria-hidden="true">
    <div className="cui-modal__head">
      <span className="cui-modal__title">Archive this workspace?</span>
    </div>
    <div className="cui-modal__body">Team members will lose access immediately.</div>
    <div className="cui-modal__foot">
      <Button variant="secondary" tabIndex={-1}>Cancel</Button>
      <Button variant="primary" tabIndex={-1}>Archive</Button>
    </div>
  </div>
);

export const anatomy: DocsAnatomyNode[] = [
  {
    name: 'Scrim',
    element: '<div>.cui-modal-scrim',
    description: 'Fixed over the viewport on the modal layer, Neutral-9 at 56%. A click on it closes the modal. Rendered at the end of `<body>`.',
    children: [
      {
        name: 'Panel',
        element: '<div role="dialog">.cui-modal',
        description: 'Neutral-1, radius-lg, shadow-modal, up to 420px wide, centred, 16px from the screen edges.',
        children: [
          { name: 'Head', element: '.cui-modal__head', description: 'The title and the close button, 16px padding, centred on one line.' },
          { name: 'Title', element: 'h2.cui-modal__title', description: 'h4 look (20px / 28px, 800), Neutral-9. A real heading that names the dialog and takes focus on open.' },
          { name: 'Close', element: 'Button ghost sm icon-only', description: '32×32, an X, Neutral-2 on hover. Named "Close".' },
          { name: 'Body', element: '.cui-modal__body', description: 'body1 size and line height, Neutral-9; 16px at the sides and bottom.' },
          { name: 'Footer', element: '.cui-modal__foot', when: 'with actions', description: 'Right-aligned buttons 12px apart, 16px padding, a Neutral-3 divider above.' },
        ],
      },
    ],
  },
];

export const examples: DocsExample[] = [
  {
    id: 'confirm',
    title: 'Confirmation',
    description: 'One decision: the title asks it, the body says what it means, Cancel and Archive answer it. Escape, the X or a click on the scrim close it too. The page behind stays still while it is open.',
    render: () => <Demo />,
    code: `const [open, setOpen] = useState(false);

<Button variant="secondary" onClick={() => setOpen(true)}>Archive workspace</Button>
<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="Archive this workspace?"
  actions={<>
    <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
    <Button variant="primary" onClick={() => setOpen(false)}>Archive</Button>
  </>}
>
  Team members will lose access immediately. You can restore it from Settings within 30 days.
</Modal>`,
  },
];

export const props: DocsProp[] = [
  { name: 'open', options: 'boolean', default: '—', required: true, description: 'Whether the modal is open.' },
  { name: 'onClose', options: '() => void', default: '—', required: true, description: 'Called on the close button, a scrim click or Escape. Set `open` to false in it.' },
  { name: 'title', options: 'ReactNode', default: '—', required: true, description: 'The decision, as a question. Names the dialog.' },
  { name: 'headingLevel', options: '2 | 3 | 4 | 5 | 6', default: '2', description: 'The title\'s heading level. The look is always h4.' },
  { name: 'children', options: 'ReactNode', default: '—', required: true, description: 'The body: what the decision means, in a sentence or two.' },
  { name: 'actions', options: 'ReactNode', default: '—', description: 'The footer\'s Buttons: Secondary first, Primary on the right. Left out, there is no footer.' },
  { name: 'closeLabel', options: 'string', default: '\'Close\'', description: 'The close button\'s accessible name.' },
  { name: 'id, aria-*, data-*', options: 'native', default: '—', description: 'Passed to the panel. `style` and `className` are not accepted. The ref is forwarded to the panel.' },
];

export const rules: DocsRules = {
  do: [
    'Ask one decision, as a question in the title.',
    'Put Secondary (cancel) first and Primary (commit) on the right.',
    'Close the modal from every footer button\'s own handler.',
  ],
  dont: [
    'Don\'t use a modal for a long form or a multi-step flow: use a page or a panel.',
    'Don\'t use it for a passing message: use Toast or Info Banner.',
    'Don\'t put two Primary buttons in the footer.',
  ],
};

export const accessibility: DocsAccessibility = {
  keyboard: [
    { keys: 'Tab / Shift+Tab', action: 'Moves through the close button and the footer buttons, and stays inside the panel.' },
    { keys: 'Escape', action: 'Closes the modal; focus returns to what opened it.' },
  ],
  notes: [
    'The panel is `role="dialog"` with `aria-modal`, named by the title.',
    'Opening moves focus to the title (a heading), so the question is read first.',
    'The close button is a real Button named "Close".',
    'While open, everything else on the page is `inert`, so a screen reader can\'t move behind the dialog, and the page can\'t scroll.',
    'No live region.',
    'In forced colours the panel takes a 1px border in the system text colour, since its shadow isn\'t drawn.',
  ],
};

export const motion: DocsMotion[] = [
  { interaction: 'Open', motion: 'The scrim and panel fade in together.', token: '--duration-fast · --ease-standard' },
  { interaction: 'Close', motion: 'They fade out together; focus returns once it has gone.', token: '--duration-fast · --ease-standard' },
  { interaction: 'Reduced motion', motion: 'The same fade: it has no travel.', token: '—' },
];
