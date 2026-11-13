// Documentation for PermissionPrompt, rendered by the docs site (playground).
// Keep it consistent with PermissionPrompt.usage.md. Not part of the package build.
import { useState } from 'react';
import { ArrowClockwise, EnvelopeSimple, FileText, Terminal } from '@phosphor-icons/react';
import { Button } from '../Button';
import { PermissionPrompt } from './PermissionPrompt';
import type { PermissionPromptStatus } from './PermissionPrompt';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../docs.types';
import { permissionOutline } from '../docs-outline.docs';

export const title = 'Permission Prompt';

/** Listed under the AI Native overview, not on its own in the sidebar. */
export const group = 'AI Native';

export const description =
  'A card the AI puts in its own turn to ask the person\'s authorization before it does one specific, consequential thing: read a file, run a command, send a message, call an outside service.';

export const usage = `import { useState } from 'react';
import { FileText } from '@phosphor-icons/react';
import { PermissionPrompt, type PermissionPromptStatus } from '@collabrium/ui';

export function ReadFileRequest({ run }: { run: (scope: 'once' | 'session') => void }) {
  const [status, setStatus] = useState<PermissionPromptStatus>('pending');
  return (
    <PermissionPrompt
      status={status}
      icon={FileText}
      label="Read pipeline-config.ts?"
      risk="low"
      details={[
        { key: 'File', value: '/workspace/pipeline-config.ts' },
        { key: 'Access', value: 'Read-only' },
      ]}
      scopeNote="Allow once covers just this file. Allow for session covers every file read for the rest of this conversation."
      deniedNote="Declined. The assistant will continue without reading this file."
      onDeny={() => setStatus('denied')}
      onAllowOnce={() => { run('once'); setStatus('allowed'); }}
      onAllowSession={() => { run('session'); setStatus('allowed'); }}
    />
  );
}`;

const readFile = {
  icon: FileText,
  label: 'Read pipeline-config.ts?',
  details: [
    { key: 'File', value: '/workspace/pipeline-config.ts' },
    { key: 'Access', value: 'Read-only' },
  ],
  scopeNote: 'Allow once covers just this file. Allow for session covers every file read for the rest of this conversation.',
  deniedNote: 'Declined. The assistant will continue without reading this file.',
  expiredNote: 'No answer before the conversation moved on. Nothing was read.',
};

export const thumbnail = permissionOutline;

export const anatomy: DocsAnatomyNode[] = [
  {
    name: 'Permission Prompt',
    element: '<div>.cui-permission-prompt',
    description: 'A Card shell, 360px wide (the full width of the column inside a Chat window, and on screens under 768px). Its state is a data attribute: data-status.',
    children: [
      {
        name: 'Head',
        element: 'div.cui-permission-prompt__head',
        when: 'pending',
        description: 'One row, vertically centred: icon, question and risk badge.',
        children: [
          { name: 'Icon', element: 'span.cui-permission-prompt__icon', description: 'The action\'s own kind (a file, a command, an email), Regular weight, Neutral-7, `icon-md`. Decorative.' },
          { name: 'Question', element: 'p.cui-permission-prompt__label', description: 'Heading-5 type, Neutral-9: "Send email on your behalf?".' },
          { name: 'Risk badge', element: 'Badge', description: 'Low, Medium or High risk as the success, warning and error Badge. Pinned to the same corner in the resolved state.' },
        ],
      },
      {
        name: 'Resolved row',
        element: 'div.cui-permission-prompt__resolved',
        when: 'allowed, denied or expired',
        description: 'The question in body2 type and an outcome Badge (Allowed, Denied, Expired) in the corner the risk badge held. Receives focus when a decision removes the button that had it.',
      },
      { name: 'Toggle', element: 'button.cui-permission-prompt__toggle', description: '"What this will do" while pending, "View details" once resolved. The chevron turns 180° when open. `aria-expanded` and `aria-controls`.' },
      {
        name: 'Detail',
        element: 'div.cui-permission-prompt__detail',
        description: 'Key and value rows on a Neutral-2 panel, in a `<dl>`. Open while pending, folded once resolved, `inert` while closed. Values wrap and never truncate.',
      },
      { name: 'Scope note', element: 'p.cui-permission-prompt__scope', when: 'pending', description: 'One sentence on what Allow once covers and what Allow for session covers.' },
      {
        name: 'Actions',
        element: 'div.cui-permission-prompt__actions',
        when: 'pending',
        description: 'Three Buttons at natural width, right-aligned: Deny (Ghost, red text), Allow once (Secondary), Allow for session (Primary).',
      },
      { name: 'Note', element: 'p.cui-permission-prompt__resolved-note', when: 'denied or expired', description: 'What happens now, in one line.' },
    ],
  },
];

function LiveExample() {
  const [status, setStatus] = useState<PermissionPromptStatus>('pending');
  return (
    <div className="docs-stack">
      <PermissionPrompt
        status={status}
        risk="low"
        {...readFile}
        onDeny={() => setStatus('denied')}
        onAllowOnce={() => setStatus('allowed')}
        onAllowSession={() => setStatus('allowed')}
      />
      {status !== 'pending' && (
        <div className="docs-row">
          <Button variant="ghost" size="sm" leadingIcon={ArrowClockwise} onClick={() => setStatus('pending')}>
            Ask again
          </Button>
        </div>
      )}
    </div>
  );
}

export const examples: DocsExample[] = [
  {
    id: 'live',
    title: 'A decision, and the record it leaves',
    description: 'Press an action. The card folds to a compact record that stays in the conversation, and the detail is still one click away. "Ask again" only resets this demo: a real card cannot be reopened, and a new request is a new card.',
    render: () => <LiveExample />,
    code: `import { useState } from 'react';
import { FileText } from '@phosphor-icons/react';

function ReadFileRequest() {
  const [status, setStatus] = useState<PermissionPromptStatus>('pending');
  return (
    <PermissionPrompt
      status={status}
      icon={FileText}
      label="Read pipeline-config.ts?"
      risk="low"
      details={[
        { key: 'File', value: '/workspace/pipeline-config.ts' },
        { key: 'Access', value: 'Read-only' },
      ]}
      scopeNote="Allow once covers just this file. Allow for session covers every file read for the rest of this conversation."
      deniedNote="Declined. The assistant will continue without reading this file."
      onDeny={() => setStatus('denied')}
      onAllowOnce={() => setStatus('allowed')}
      onAllowSession={() => setStatus('allowed')}
    />
  );
}`,
  },
  {
    id: 'risk',
    title: 'Risk levels',
    description: 'Risk is always shown. Low, Medium and High use the success, warning and error Badge tones, and nothing else carries risk. Pick the level from what the action can do if it goes wrong, not from how often it is asked.',
    render: () => (
      <div className="docs-stack">
        <PermissionPrompt status="pending" risk="low" {...readFile} />
        <PermissionPrompt
          status="pending"
          risk="medium"
          icon={Terminal}
          label="Run the export script?"
          details={[
            { key: 'Command', value: 'npm run export -- --since 2026-09-01' },
            { key: 'Folder', value: '/workspace' },
          ]}
          scopeNote="Allow once runs this command one time. Allow for session lets the assistant run commands in this folder until the conversation ends."
        />
        <PermissionPrompt
          status="pending"
          risk="high"
          icon={EnvelopeSimple}
          label="Send email on your behalf?"
          details={[
            { key: 'To', value: 'ops@example.com' },
            { key: 'Subject', value: 'Renewals pulled forward to Q3' },
            { key: 'Body', value: 'Hi team, we are moving the three Q4 renewals forward. Details are in the attached plan.' },
          ]}
          scopeNote="Allow once sends this email. Allow for session lets the assistant send email for you until the conversation ends."
        />
      </div>
    ),
    code: `<PermissionPrompt status="pending" risk="low" icon={FileText} label="Read pipeline-config.ts?" details={[…]} scopeNote="…" />

<PermissionPrompt status="pending" risk="medium" icon={Terminal} label="Run the export script?" details={[
  { key: 'Command', value: 'npm run export -- --since 2026-09-01' },
  { key: 'Folder', value: '/workspace' },
]} scopeNote="…" />

<PermissionPrompt status="pending" risk="high" icon={EnvelopeSimple} label="Send email on your behalf?" details={[
  { key: 'To', value: 'ops@example.com' },
  { key: 'Subject', value: 'Renewals pulled forward to Q3' },
  { key: 'Body', value: 'Hi team, we are moving the three Q4 renewals forward. Details are in the attached plan.' },
]} scopeNote="…" />`,
  },
  {
    id: 'resolved',
    title: 'Allowed, Denied and Expired',
    description: 'A resolved card stays in the conversation as the record of what was decided. Denied and Expired say what happens now. Expired is the conversation moving on, not a decision: nothing ran, and no control reaches it.',
    render: () => (
      <div className="docs-stack">
        <PermissionPrompt status="allowed" risk="low" {...readFile} />
        <PermissionPrompt status="denied" risk="low" {...readFile} />
        <PermissionPrompt status="expired" risk="low" {...readFile} />
      </div>
    ),
    code: `<PermissionPrompt status="allowed" risk="low" icon={FileText} label="Read pipeline-config.ts?" details={[…]} scopeNote="…" />

<PermissionPrompt status="denied" risk="low" icon={FileText} label="Read pipeline-config.ts?" details={[…]} scopeNote="…"
  deniedNote="Declined. The assistant will continue without reading this file." />

<PermissionPrompt status="expired" risk="low" icon={FileText} label="Read pipeline-config.ts?" details={[…]} scopeNote="…"
  expiredNote="No answer before the conversation moved on. Nothing was read." />`,
  },
  {
    id: 'long-values',
    title: 'Long values wrap',
    description: 'Every value is shown in full, so the person sees exactly what they are authorizing. A long value wraps onto more lines. It never ends in an ellipsis.',
    render: () => (
      <PermissionPrompt
        status="pending"
        risk="medium"
        icon={FileText}
        label="Write to the shared config?"
        details={[
          { key: 'File', value: '/workspace/packages/pipeline/config/environments/production/shared-settings.generated.json' },
          { key: 'Access', value: 'Read and write, replacing the whole file' },
        ]}
        scopeNote="Allow once writes this file one time. Allow for session lets the assistant write files in this folder until the conversation ends."
      />
    ),
    code: `<PermissionPrompt
  status="pending"
  risk="medium"
  icon={FileText}
  label="Write to the shared config?"
  details={[
    { key: 'File', value: '/workspace/packages/pipeline/config/environments/production/shared-settings.generated.json' },
    { key: 'Access', value: 'Read and write, replacing the whole file' },
  ]}
  scopeNote="Allow once writes this file one time. Allow for session lets the assistant write files in this folder until the conversation ends."
/>`,
  },
];

export const props: DocsProp[] = [
  { name: 'status', options: "'pending' | 'allowed' | 'denied' | 'expired'", default: '—', required: true, description: 'Where the request is. You set it; the card never resolves itself. `expired` is for a request nobody answered before the conversation moved on.' },
  { name: 'label', options: 'string', default: '—', required: true, description: 'The question, ending in a question mark. It stays on the resolved card.' },
  { name: 'icon', options: 'Icon (Phosphor)', default: '—', required: true, description: 'The action\'s own kind: `FileText`, `Terminal`, `EnvelopeSimple`. Always Regular weight. Shown while pending.' },
  { name: 'risk', options: "'low' | 'medium' | 'high'", default: '—', required: true, description: 'How much harm the action could do. Always shown while pending, as the success, warning and error Badge.' },
  { name: 'details', options: '{ key, value }[]', default: '—', required: true, description: 'Exactly what is being authorized, one row per field. Never a JSON dump. Values show in full and wrap.' },
  { name: 'scopeNote', options: 'string', default: '—', required: true, description: 'One sentence on what Allow once covers and what Allow for session covers.' },
  { name: 'deniedNote', options: 'string', default: '—', description: 'Shown under a `denied` card: what happens now.' },
  { name: 'expiredNote', options: 'string', default: '—', description: 'Shown under an `expired` card: why nothing ran.' },
  { name: 'onDeny', options: '() => void', default: '—', description: 'Called when Deny is pressed. Set `status` to `denied`.' },
  { name: 'onAllowOnce', options: '() => void', default: '—', description: 'Called when Allow once is pressed. Allow this one action, then set `status` to `allowed`.' },
  { name: 'onAllowSession', options: '() => void', default: '—', description: 'Called when Allow for session is pressed. Allow this kind of action for the rest of the conversation, then set `status` to `allowed`.' },
  { name: 'id, aria-*, data-*, …', options: 'native', default: '—', description: 'Passed to the root `<div>`. `style` and `className` are not accepted. The ref is forwarded to the root.' },
];

export const rules: DocsRules = {
  do: [
    'Ask only for an action with a real consequence outside the conversation: a file, a command, a message, an outside service.',
    'Put the card in the AI\'s own turn, in the thread.',
    'State exactly what is authorized, as key and value rows, with every value in full.',
    'Show the risk in the same corner whether the card is pending or resolved.',
    'Leave a resolved card in the conversation as the record of what was decided.',
    'Make a new request a new card.',
    'Let it fill the column inside a Chat window.',
  ],
  dont: [
    'Don\'t use it to confirm something that only affects the conversation.',
    'Don\'t overlay the composer or the thread with a scrim, or block them.',
    'Don\'t put raw JSON in the detail, or truncate a value.',
    'Don\'t let a resolved decision disappear, or offer to reopen or undo it.',
    'Don\'t offer any control that sets Expired: only the conversation moving on does.',
    'Don\'t stretch or centre the actions on desktop.',
  ],
};

export const accessibility: DocsAccessibility = {
  keyboard: [
    { keys: 'Tab', action: 'Moves to the toggle, then Deny, Allow once and Allow for session, in that order on every screen size. A 2px Obsidian ring shows.' },
    { keys: 'Enter / Space', action: 'Presses the focused action, or opens and closes the detail.' },
  ],
  notes: [
    'The toggle is a `<button>` with `aria-expanded` and `aria-controls`. Closed detail is `inert`.',
    'Detail rows are a description list, so a screen reader hears each field with its value.',
    'Pressing a decision removes the button that had focus, so focus moves to the resolved row, which reads the question and the outcome ("Read pipeline-config.ts? Allowed"). A press that did not focus the button (some browsers do not focus a button on a mouse click) leaves focus alone.',
    'On screens under 768px the buttons are stacked with Allow for session first, but the tab order stays Deny, Allow once, Allow for session.',
    'Risk and outcome are never colour alone: each badge carries words ("Low risk", "Allowed", "Denied", "Expired"), and the outcome badges an icon.',
    'There is no live region: the card is part of the AI\'s turn, and the focus move announces the outcome.',
  ],
};

export const motion: DocsMotion[] = [
  { interaction: 'The card arrives', motion: 'Fades in.', token: '--duration-reveal · --ease-reveal' },
  { interaction: 'The detail opens or closes', motion: 'Grows from 0 to its height while fading. The chevron turns 180°.', token: '--duration-base · --ease-settle · --duration-fast · --ease-standard' },
  { interaction: 'The card resolves', motion: 'The resolved row fades in.', token: '--duration-reveal · --ease-reveal' },
  { interaction: 'Reduced motion', motion: 'The entrance, the expand and the rotation go. The layout and the information stay.', token: '—' },
];
