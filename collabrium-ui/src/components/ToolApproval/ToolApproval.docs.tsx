// Documentation for ToolApproval, rendered by the docs site (playground).
// Keep it consistent with ToolApproval.usage.md. Not part of the package build.
import { useState } from 'react';
import { ArrowClockwise } from '@phosphor-icons/react';
import { Button } from '../Button';
import { ToolApproval } from './ToolApproval';
import type { ToolApprovalAnswer, ToolApprovalQuestion } from './ToolApproval';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../docs.types';
import { approvalOutline } from '../docs-outline.docs';

export const title = 'Tool approval';

/** Listed under the AI Native overview, not on its own in the sidebar. */
export const group = 'AI Native';

export const description =
  'A card the AI shows mid-task when it needs the person to decide something before it can go on: one question at a time, with provided options and an always-available written answer, closing for good once sent, skipped through or dismissed.';

export const usage = `import { ToolApproval, type ToolApprovalQuestion } from '@collabrium/ui';

const questions: ToolApprovalQuestion[] = [
  {
    question: 'Should we pull the Q4 renewals forward, or hold to schedule?',
    type: 'single',
    options: [
      { label: 'Pull forward from Q4', description: "Closes the gap faster, but front-loads next quarter's own risk" },
      { label: 'Hold to original schedule', description: 'No disruption to Q4 planning, gap stays open longer' },
    ],
  },
];

export function Decision({ send, close }: { send: (answers: unknown) => void; close: () => void }) {
  return <ToolApproval questions={questions} onSend={send} onDismiss={close} />;
}`;

const renewals: ToolApprovalQuestion[] = [
  {
    question: 'Should we pull the Q4 renewals forward, or hold to schedule?',
    type: 'single',
    options: [
      { label: 'Pull forward from Q4', description: "Closes the gap faster, but front-loads next quarter's own risk" },
      { label: 'Hold to original schedule', description: 'No disruption to Q4 planning, gap stays open longer' },
      { label: 'Split — pull forward one', description: 'Partial coverage, keeps one renewal as a Q4 cushion' },
    ],
  },
  {
    question: 'Who should own the outreach?',
    type: 'single',
    options: [
      { label: 'Account exec', description: 'Already has the relationship' },
      { label: 'Sales lead', description: 'Signals executive attention' },
    ],
  },
];

const channels: ToolApprovalQuestion[] = [
  {
    question: 'Which channels should the reminder go out on?',
    type: 'multiple',
    options: [
      { label: 'Email', description: 'Sent from the account owner' },
      { label: 'SMS', description: 'Only where a mobile number is on file' },
      { label: 'In-app notification' },
    ],
  },
];

export const thumbnail = approvalOutline;

export const anatomy: DocsAnatomyNode[] = [
  {
    name: 'Tool approval',
    element: '<div>.cui-tool-approval',
    description: 'A Card shell, 360px wide (the composer\'s width inside a Chat window). It renders nothing once it has closed.',
    children: [
      {
        name: 'Head',
        element: 'div.cui-tool-approval__head',
        description: 'One row, centred: the question on the left, the pager and dismiss on the right.',
        children: [
          { name: 'Question', element: 'p.cui-tool-approval__question', description: 'Heading-5 type, Neutral-9. It takes focus when the question changes.' },
          {
            name: 'Topbar',
            element: 'div.cui-tool-approval__topbar',
            description: 'Previous, the step count, Next, and dismiss.',
            children: [
              { name: 'Previous and Next', element: 'Button', description: 'Ghost, icon-only, small. Disabled at the first and last question.' },
              { name: 'Step count', element: 'span.cui-tool-approval__indicator', description: 'Caption, bold, Neutral-9: `1 / 2`.' },
              { name: 'Dismiss', element: 'Button[data-part="dismiss"]', description: 'Ghost, icon-only, a close ×, Neutral-5. Always there, never disabled.' },
            ],
          },
        ],
      },
      { name: 'Viewport', element: 'div.cui-tool-approval__viewport', description: 'Its height follows the question showing: it grows and shrinks, and never snaps.' },
      { name: 'Options', element: 'div.cui-tool-approval__options', description: 'A radio group (`single`) or a group of checkboxes (`multiple`), each row with its own 8px padding and a Neutral-2 fill on hover.' },
      { name: 'Custom answer', element: 'div.cui-tool-approval__custom', description: '"Something else…" as an Input field that opens into a Textarea the moment it is focused.' },
      { name: 'Footer', element: 'div.cui-tool-approval__footer', description: 'Skip (Ghost) and Continue or Send (Primary), right-aligned.' },
    ],
  },
];

function DecisionExample({ questions, id }: { questions: ToolApprovalQuestion[]; id: string }) {
  const [round, setRound] = useState(0);
  const [outcome, setOutcome] = useState<string | null>(null);
  const describe = (answers: ToolApprovalAnswer[]) =>
    answers.map(a => `${a.question} ${a.custom ? `"${a.custom}"` : a.selected.length ? a.selected.join(', ') : '(skipped)'}`).join(' · ');
  return (
    <div className="docs-stack">
      {outcome === null ? (
        <ToolApproval
          key={`${id}-${round}`}
          questions={questions}
          onSend={answers => setOutcome(`Sent. ${describe(answers)}`)}
          onDismiss={() => setOutcome('Dismissed. The task behind it keeps running.')}
        />
      ) : (
        <div className="docs-row">
          <span className="docs-status">{outcome}</span>
        </div>
      )}
      {outcome !== null && (
        <div className="docs-row">
          <Button
            variant="ghost"
            size="sm"
            leadingIcon={ArrowClockwise}
            onClick={() => {
              setOutcome(null);
              setRound(r => r + 1);
            }}
          >
            Raise a new decision
          </Button>
        </div>
      )}
    </div>
  );
}

export const examples: DocsExample[] = [
  {
    id: 'single',
    title: 'Two single-choice questions',
    description: 'Choosing an option moves on to the next question by itself, once the choice has had a moment to register. The step count and arrows page freely. Skip moves forward without an answer. On the last question, choosing an option only enables Send: sending is always pressing Send. Once sent or dismissed the card is gone for good; "Raise a new decision" only starts this demo again, as a new instance would.',
    render: () => <DecisionExample id="single" questions={renewals} />,
    code: `import { useState } from 'react';

const questions: ToolApprovalQuestion[] = [
  {
    question: 'Should we pull the Q4 renewals forward, or hold to schedule?',
    type: 'single',
    options: [
      { label: 'Pull forward from Q4', description: "Closes the gap faster, but front-loads next quarter's own risk" },
      { label: 'Hold to original schedule', description: 'No disruption to Q4 planning, gap stays open longer' },
      { label: 'Split — pull forward one', description: 'Partial coverage, keeps one renewal as a Q4 cushion' },
    ],
  },
  {
    question: 'Who should own the outreach?',
    type: 'single',
    options: [
      { label: 'Account exec', description: 'Already has the relationship' },
      { label: 'Sales lead', description: 'Signals executive attention' },
    ],
  },
];

function Decision() {
  const [done, setDone] = useState(false);
  if (done) return null;
  return <ToolApproval questions={questions} onSend={answers => { save(answers); setDone(true); }} onDismiss={() => setDone(true)} />;
}`,
  },
  {
    id: 'multiple',
    title: 'A multiple-choice question',
    description: 'More than one option can be chosen, so it never moves on by itself: Continue (or Send on the last question) waits for the person. Continue and Send stay disabled until the question has an answer.',
    render: () => <DecisionExample id="multiple" questions={channels} />,
    code: `const questions: ToolApprovalQuestion[] = [
  {
    question: 'Which channels should the reminder go out on?',
    type: 'multiple',
    options: [
      { label: 'Email', description: 'Sent from the account owner' },
      { label: 'SMS', description: 'Only where a mobile number is on file' },
      { label: 'In-app notification' },
    ],
  },
];

<ToolApproval questions={questions} onSend={answers => save(answers)} onDismiss={close} />`,
  },
];

export const props: DocsProp[] = [
  { name: 'questions', options: 'ToolApprovalQuestion[]', default: '—', required: true, description: 'The decisions, in order. One shows at a time. Each is a point the AI\'s task is blocked on.' },
  { name: 'questions[].question', options: 'string', default: '—', required: true, description: 'The question, in one sentence. It is the card\'s heading while it shows.' },
  { name: 'questions[].type', options: "'single' | 'multiple'", default: '—', required: true, description: '`single` uses radios and moves on by itself (except on the last question, where it enables Send). `multiple` uses checkboxes and waits for Continue.' },
  { name: 'questions[].options', options: '{ label, description? }[]', default: '—', required: true, description: 'The provided options. Every question also carries a written "Something else…" answer.' },
  { name: 'onSend', options: '(answers: ToolApprovalAnswer[]) => void', default: '—', description: 'Called once, with every answer, when it is sent. Each answer has the `question`, the `selected` labels and the typed `custom` text; a skipped question has neither. The card has then closed for good.' },
  { name: 'onDismiss', options: '() => void', default: '—', description: 'Called when the person presses ×. The card has then closed for good, with no progress kept. The task behind it keeps running. Move focus back to the composer yourself.' },
  { name: 'id, aria-*, data-*, …', options: 'native', default: '—', description: 'Passed to the root `<div>`. `style` and `className` are not accepted. The ref is forwarded to the root.' },
];

export const rules: DocsRules = {
  do: [
    'Raise one only for a decision the task is genuinely blocked on.',
    'Ask one thing per question, in a sentence, and give options that are different from each other.',
    'Keep the dismiss ×: the card is a clarifying prompt, not a gate.',
    'Raise it again as a new instance when the AI needs another decision later.',
    'Pin it just above the composer at the composer\'s width, and let the thread scroll behind it.',
    'While it is open, change the composer\'s Send to Stop and its placeholder to "Or reply directly", and put both back when it closes.',
  ],
  dont: [
    'Don\'t use it as a general form, or to collect input the task is not blocked on.',
    'Don\'t stack a second one while one is open.',
    'Don\'t disable or hide the dismiss to force an answer.',
    'Don\'t keep a confirmation, a read-only copy or a reopen button after it closes.',
    'Don\'t put a scrim over the thread or block it.',
    'Don\'t let a question hold both a chosen option and typed text.',
  ],
};

export const accessibility: DocsAccessibility = {
  keyboard: [
    { keys: 'Tab', action: 'Moves through Previous, Next and dismiss, the options, the written answer, then Skip and Continue. A 2px Obsidian ring shows.' },
    { keys: 'Arrow keys', action: 'Move between the radios of a single-choice question.' },
    { keys: 'Space', action: 'Chooses the focused radio or toggles the focused checkbox.' },
    { keys: 'Enter', action: 'In the one-line written answer, with an answer in it, moves on or sends (on the last question it sends). In the open Textarea it starts a new line.' },
  ],
  notes: [
    'The options are a native radio group or a group of native checkboxes, named by the question (`role="radiogroup"` or `role="group"` with the question as its label).',
    'When the question changes, focus moves to the new question, which is the card\'s heading, so a keyboard or screen-reader user hears it. It has no ring.',
    'Continue and Send are disabled until the question has an answer. Skip, Previous, Next and dismiss are always available (Previous and Next at the ends excepted).',
    'The written answer is labelled "Custom answer" for assistive tech; its placeholder is "Something else…". Focusing it swaps the one-line field for a Textarea, which takes focus with the caret at the end.',
    'The icon-only buttons have names: "Previous question", "Next question", "Dismiss".',
    'Closing removes the card and whatever had focus. Move focus back to the composer yourself, from `onSend` and `onDismiss`.',
    'No live region: nothing in the card announces itself.',
  ],
};

export const motion: DocsMotion[] = [
  { interaction: 'The card arrives', motion: 'Fades in.', token: '--duration-reveal · --ease-reveal' },
  { interaction: 'A new question', motion: 'The question and its options rise 4px and fade in, while the card\'s height grows or shrinks to fit.', token: '--duration-slow · --ease-settle · --duration-morph · --ease-morph' },
  { interaction: 'The written answer opens', motion: 'The one-line field is swapped for a Textarea, which rises and fades in while the card grows.', token: '--duration-slow · --ease-settle · --duration-morph' },
  { interaction: 'Hover on an option', motion: 'The row\'s fill fades to Neutral-2.', token: '--duration-fast · --ease-standard' },
  { interaction: 'Reduced motion', motion: 'The height morph and the entrances go. The same questions, in the same order, still get asked.', token: '—' },
];
