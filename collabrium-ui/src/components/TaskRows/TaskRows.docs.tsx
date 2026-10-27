// Documentation for TaskRows, rendered by the docs site (playground).
// Keep it consistent with TaskRows.usage.md. Not part of the package build.
import { useEffect, useRef, useState } from 'react';
import { ArrowClockwise, Stop } from '@phosphor-icons/react';
import { Button } from '../Button';
import { TaskRows } from './TaskRows';
import type { TaskRowsStatus, TaskRowsTask } from './TaskRows';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../docs.types';

export const title = 'Task Rows';

/** Listed under the AI Native overview, not on its own in the sidebar. */
export const group = 'AI Native';

export const description =
  'The named tasks an agent run is working through: a short list where each row has its own status, count and detail steps, and one task can fail while the others succeed. Two variants: Capsules and List.';

export const usage = `import { TaskRows } from '@collabrium/ui';

export function Run({ tasks, retry }: { tasks: TaskRowsTask[]; retry: (index: number) => void }) {
  return <TaskRows tasks={tasks} onRetry={retry} />;
}`;

const verified = (status: TaskRowsStatus = 'completed'): TaskRowsTask => ({
  label: 'Verified vendor records',
  count: '12 suppliers',
  status,
  steps: [
    { label: 'Matched tax and contact IDs', meta: '12/12' },
    { label: 'Flagged stale records', meta: '0' },
  ],
});

const reorder = (status: TaskRowsStatus = 'active'): TaskRowsTask => ({
  label: 'Build reorder task list',
  count: '7 SKUs',
  status,
  steps: [
    { label: 'Reading POS export', meta: '3 files' },
    { label: 'Scoring stockout risk', meta: '68%' },
  ],
});

const emails = (status: TaskRowsStatus = 'pending', reason?: string, retryable?: boolean): TaskRowsTask => {
  const metas: Record<TaskRowsStatus, [string, string]> = {
    pending: ['queued', 'queued'],
    active: ['sent', 'sending'],
    retrying: ['sent', 'retrying'],
    failed: ['sent', 'failed'],
    completed: ['sent', 'sent'],
    stopped: ['queued', 'stopped'],
  };
  const [first, second] = metas[status];
  return {
    label: 'Draft supplier emails',
    count: '2 messages',
    status,
    reason,
    retryable,
    steps: [
      { label: 'Cone supplier follow-up', meta: first },
      { label: 'Pistachio reorder note', meta: second },
    ],
  };
};

const TIMEOUT = 'The mail service timed out on the second message.';

export const thumbnail = () => <TaskRows tasks={[verified(), reorder('completed'), emails('completed')]} />;

export const anatomy: DocsAnatomyNode[] = [
  {
    name: 'Task Rows',
    element: 'div.cui-task-rows',
    description: '440px wide at most. Capsules holds a 196px minimum height so the response below does not jump as rows arrive; List is one bordered surface.',
    children: [
      {
        name: 'Row',
        element: 'div.cui-task-rows__row',
        description: 'Enters with an 8px rise and fade, 80ms apart. Capsules: its own white surface, radius 20px closed and 16px open. List: transparent, divided by hairlines. Neutral-2 on hover. Inside a `role="list"` wrapper, one `role="listitem"` per row.',
        children: [
          {
            name: 'Head',
            element: 'button.cui-task-rows__head',
            description: 'The whole row is the one disclosure button, 44px tall, with `aria-expanded` and `aria-controls`. Nothing else interactive lives in it.',
            children: [
              {
                name: 'Mark',
                element: 'span.cui-task-rows__mark',
                description: 'A 24px status disc: the task number for Pending, Active and Retrying; a green check for Completed; a red cross for Failed. Pops in once per change.',
                children: [
                  { name: 'Active ring', element: 'span.cui-task-rows__ring', when: 'active or retrying', description: 'A 2px track with a sweeping arc around the disc, in pure CSS. Under reduced motion the arc stays and stops turning.' },
                ],
              },
              { name: 'Label', element: 'span.cui-task-rows__label', description: 'Label1, Neutral-9, one line, truncates.' },
              { name: 'Count', element: 'span.cui-task-rows__count', description: 'Caption, Neutral-5, figures line up. Never truncates.' },
              { name: 'Pill', element: 'span.cui-badge', when: 'completed, retrying, failed or stopped', description: 'The real Badge: Success "Completed", Neutral "Retrying" with a spinning arrow, Error "Failed", Neutral "Stopped". Pending and Active have none.' },
              { name: 'Chevron', element: 'span.cui-task-rows__chevron', description: 'Phosphor CaretDown. Rotates 180° when open.' },
              { name: 'Spoken state', element: 'span.cui-task-rows__spoken', description: 'Visually hidden. The whole state in one phrase: "Draft supplier emails. Failed. 2 messages. The mail service timed out. Retry available."' },
            ],
          },
          {
            name: 'Detail',
            element: 'div.cui-task-rows__detail',
            description: 'Opens by animating grid rows from 0fr to 1fr. Inert while closed, so its Retry button is not reachable.',
            children: [
              { name: 'Line', element: 'span.cui-task-rows__line', description: '1px Neutral-3 rule, centred under the disc.' },
              { name: 'Step', element: 'div.cui-task-rows__step', description: 'A caption label on the left and a quiet footnote outcome on the right. Each fades up when the row opens.' },
              {
                name: 'Failure block',
                element: 'div.cui-task-rows__fail',
                when: 'failed, with a reason',
                description: 'A hairline, then the reason in Neutral-5 (not red: red 12px text is under 4.5:1), and Retry when there is something to retry.',
                children: [
                  { name: 'Retry', element: 'button.cui-button', when: 'retryable, once', description: 'The real Button, Secondary and small. Absent, never disabled, when retrying is impossible or spent.' },
                ],
              },
            ],
          },
        ],
      },
      { name: 'More', element: 'p.cui-task-rows__more', when: 'more than six tasks', description: '"+N more": the list shows six rows and counts the rest.' },
      { name: 'Announcement', element: 'div.cui-task-rows__live', description: 'Visually hidden. role="status", polite, atomic. Failures, a retry the reader started and the end of the run.' },
    ],
  },
];

// The docs stand in for an agent run: this moves the tasks along on a timer.
// A real product updates `tasks` from the run itself.
function LiveRunExample() {
  const [run, setRun] = useState(0);
  const [tasks, setTasks] = useState<TaskRowsTask[]>([verified(), reorder(), emails()]);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const at = (ms: number, fn: () => void) => timers.current.push(window.setTimeout(fn, ms));
    at(2200, () => setTasks([verified(), reorder('completed'), emails('active')]));
    at(4200, () => setTasks([verified(), reorder('completed'), emails('failed', TIMEOUT, true)]));
    return () => timers.current.forEach(window.clearTimeout);
  }, [run]);

  const retry = (index: number) => {
    if (index !== 2) return;
    setTasks(t => t.map((task, i) => (i === 2 ? emails('retrying') : task)));
    timers.current.push(window.setTimeout(() => setTasks(t => t.map((task, i) => (i === 2 ? emails('completed') : task))), 1800));
  };

  // The reader stops the run: everything not finished becomes Stopped.
  const stop = () => {
    timers.current.forEach(window.clearTimeout);
    setTasks(t => t.map(task => (task.status === 'active' || task.status === 'pending' || task.status === 'retrying' ? { ...task, status: 'stopped' } : task)));
  };

  // A new run is a new instance: reset the tasks in the same update as the new key.
  const replay = () => {
    timers.current.forEach(window.clearTimeout);
    setTasks([verified(), reorder(), emails()]);
    setRun(r => r + 1);
  };

  const running = tasks.some(task => task.status === 'active' || task.status === 'pending' || task.status === 'retrying');

  return (
    <div className="docs-stack">
      <TaskRows key={run} tasks={tasks} onRetry={retry} />
      <div className="docs-row">
        <Button variant="ghost" size="sm" leadingIcon={running ? Stop : ArrowClockwise} onClick={running ? stop : replay}>
          {running ? 'Stop' : 'Replay'}
        </Button>
      </div>
    </div>
  );
}

export const examples: DocsExample[] = [
  {
    id: 'live',
    title: 'A live run',
    description:
      'Three tasks run in turn. The task in progress opens itself, then closes when it completes. When the last one fails it opens, with its reason and a Retry. Retry once: the row goes to Retrying, then Completed, and the button is gone. Click any chevron and your choice wins from then on. This page moves the tasks on a timer to stand in for an agent.',
    render: () => <LiveRunExample />,
    code: `const [tasks, setTasks] = useState<TaskRowsTask[]>(initialTasks);

// Update each task's status as the run reports it.
// On failure: { ...task, status: 'failed', reason: '…', retryable: true }

<TaskRows
  tasks={tasks}
  onRetry={index => {
    setTasks(t => t.map((task, i) => (i === index ? { ...task, status: 'retrying' } : task)));
    retryTask(index);
  }}
/>`,
  },
  {
    id: 'stopped',
    title: 'A stopped run',
    description:
      'When the reader stops the run, every task that had not finished (the one in progress and those not yet started) becomes Stopped: a neutral pill, no ring, no Retry. Finished tasks keep their status. Continuing is asked for in the conversation, not on the row. Use Stop in the live run above to see it.',
    render: () => (
      <TaskRows tasks={[verified(), reorder('stopped'), emails('stopped')]} onRetry={() => {}} />
    ),
    code: `<TaskRows
  tasks={[
    { label: 'Verified vendor records', count: '12 suppliers', status: 'completed', steps: [{ label: 'Matched tax and contact IDs', meta: '12/12' }] },
    { label: 'Build reorder task list', count: '7 SKUs', status: 'stopped', steps: [{ label: 'Reading POS export', meta: '3 files' }] },
    { label: 'Draft supplier emails', count: '2 messages', status: 'stopped', steps: [{ label: 'Cone supplier follow-up', meta: 'queued' }] },
  ]}
/>`,
  },
  {
    id: 'states',
    title: 'States',
    description:
      'Pending and Active have no pill. Retrying looks like Active with a "Retrying" pill and a spinning arrow. Completed and Failed take their own pill and disc. The failed row is open, because a failure takes the open slot.',
    render: () => (
      <TaskRows
        tasks={[
          { label: 'Verified vendor records', count: '12 suppliers', status: 'completed', steps: [{ label: 'Matched tax and contact IDs', meta: '12/12' }] },
          { label: 'Build reorder task list', count: '7 SKUs', status: 'active', steps: [{ label: 'Reading POS export', meta: '3 files' }, { label: 'Scoring stockout risk', meta: '68%' }] },
          { label: 'Check delivery windows', count: '4 routes', status: 'retrying', steps: [{ label: 'Fetching carrier slots', meta: 'retrying' }] },
          { label: 'Draft supplier emails', count: '2 messages', status: 'pending', steps: [{ label: 'Cone supplier follow-up', meta: 'queued' }] },
          { label: 'File the summary', count: '1 report', status: 'failed', reason: 'The report folder is read-only.', steps: [{ label: 'Writing the report', meta: 'failed' }] },
        ]}
      />
    ),
    code: `<TaskRows
  tasks={[
    { label: 'Verified vendor records', count: '12 suppliers', status: 'completed', steps: [{ label: 'Matched tax and contact IDs', meta: '12/12' }] },
    { label: 'Build reorder task list', count: '7 SKUs', status: 'active', steps: [{ label: 'Reading POS export', meta: '3 files' }] },
    { label: 'Check delivery windows', count: '4 routes', status: 'retrying', steps: [{ label: 'Fetching carrier slots', meta: 'retrying' }] },
    { label: 'Draft supplier emails', count: '2 messages', status: 'pending', steps: [{ label: 'Cone supplier follow-up', meta: 'queued' }] },
    { label: 'File the summary', count: '1 report', status: 'failed', reason: 'The report folder is read-only.', steps: [{ label: 'Writing the report', meta: 'failed' }] },
  ]}
/>`,
  },
  {
    id: 'list',
    title: 'List',
    description: 'One shared surface divided by hairlines, for a run that sits inside something that already has a border: a card, a panel, a settled report.',
    render: () => <TaskRows variant="list" tasks={[verified(), reorder('completed'), emails('completed')]} />,
    code: `<TaskRows variant="list" tasks={tasks} />`,
  },
  {
    id: 'failure-with-retry',
    title: 'A failure you can retry',
    description:
      'A transient failure (a timeout, a rate limit) sets `retryable`. The row opens itself and shows the reason with a Retry button. Retrying needs nothing from the reader, so a button is the fastest path.',
    render: () => (
      <TaskRows tasks={[verified(), reorder('completed'), emails('failed', TIMEOUT, true)]} onRetry={() => {}} />
    ),
    code: `<TaskRows
  tasks={[
    verified,
    reorder,
    { label: 'Draft supplier emails', count: '2 messages', status: 'failed',
      reason: 'The mail service timed out on the second message.', retryable: true,
      steps: [{ label: 'Cone supplier follow-up', meta: 'sent' }, { label: 'Pistachio reorder note', meta: 'failed' }] },
  ]}
  onRetry={retry}
/>`,
  },
  {
    id: 'failure-no-retry',
    title: 'A failure with no retry',
    description:
      'When the reader must supply something (a file, a decision) or nothing can be done, leave `retryable` off. The row states what went wrong and stops, with no button at all. The conversation carries the ask. A failed row has exactly two looks: with a Retry, or without one.',
    render: () => (
      <TaskRows
        tasks={[
          verified(),
          reorder('completed'),
          emails('failed', 'The supplier list is missing a contact for Cone Co.'),
        ]}
        onRetry={() => {}}
      />
    ),
    code: `<TaskRows
  tasks={[
    verified,
    reorder,
    { label: 'Draft supplier emails', count: '2 messages', status: 'failed',
      reason: 'The supplier list is missing a contact for Cone Co.',
      steps: [{ label: 'Cone supplier follow-up', meta: 'sent' }, { label: 'Pistachio reorder note', meta: 'failed' }] },
  ]}
/>`,
  },
  {
    id: 'overflow',
    title: 'A long run',
    description: 'Six rows are shown, then a count. A forty-task run never makes a forty-row list.',
    render: () => (
      <TaskRows
        tasks={Array.from({ length: 9 }, (_, i) => ({
          label: `Check supplier region ${i + 1}`,
          count: `${4 + i} suppliers`,
          status: (i < 7 ? 'completed' : i === 7 ? 'active' : 'pending') as TaskRowsStatus,
          steps: [{ label: 'Matching records', meta: `${4 + i}/${4 + i}` }],
        }))}
      />
    ),
    code: `<TaskRows tasks={tasks /* 9 tasks: the first six show, then "+3 more" */} />`,
  },
];

export const props: DocsProp[] = [
  { name: 'tasks', options: 'TaskRowsTask[]', default: '—', required: true, description: 'The tasks, in order. Two or more, each with an outcome of its own. Append only: never reorder, replace or remove one. Only the first six show, then "+N more".' },
  { name: 'tasks[].label', options: 'string', default: '—', required: true, description: 'The task\'s name. One line; it truncates.' },
  { name: 'tasks[].count', options: 'string', default: '—', required: true, description: 'Its size, e.g. "12 suppliers". Never truncates.' },
  { name: 'tasks[].status', options: "'pending' | 'active' | 'retrying' | 'completed' | 'failed' | 'stopped'", default: '—', required: true, description: 'Where the task is. Exactly one task is `active` at a time. `retrying` is an attempt the reader started. `stopped` is a task that never finished because the reader stopped the run (the one in progress and every one not yet started).' },
  { name: 'tasks[].steps', options: '{ label, meta }[]', default: '—', required: true, description: 'The detail steps shown when the row is open: a name and a quiet outcome ("12/12", "sent").' },
  { name: 'tasks[].reason', options: 'string', default: '—', description: 'Why it failed, shown under the steps on a `failed` task. Say what went wrong and stop; ask for anything the reader must supply in the conversation.' },
  { name: 'tasks[].retryable', options: 'boolean', default: 'false', description: 'Only for a transient failure whose one retry is unspent: shows a Retry button. Leave it off otherwise; the button is absent, never disabled.' },
  { name: 'onRetry', options: '(index: number) => void', default: '—', description: 'Called with the task\'s index when Retry is pressed. Set that task to `retrying` in response. Without it no Retry button shows. Each task can be retried once: the button is gone after a press.' },
  { name: 'variant', options: "'capsules' | 'list'", default: "'capsules'", description: '`capsules`: each row its own surface, 8px apart. `list`: one shared surface with hairlines, for a run inside a card or panel.' },
  { name: 'id, aria-*, data-*, …', options: 'native', default: '—', description: 'Passed to the root `<div>`. `style` and `className` are not accepted. The ref is forwarded to the root.' },
];

export const rules: DocsRules = {
  do: [
    'Use it for an AI run of two or more named tasks, each with an outcome of its own.',
    'Keep exactly one task `active`, and exactly one row open.',
    'Append tasks as they begin. A completed task stays, and stays completed.',
    'Set `retryable` only on a transient failure, and let each task be retried once.',
    'Ask for anything the reader must supply (a file, a decision) in the conversation, not on the row.',
    'Put one Task Rows per run.',
    'Expect it to reflow in a narrow space: below 400px wide the count sits under the name and the name may take two lines.',
  ],
  dont: [
    'Don\'t use it for one operation with ordered steps. That is Thinking, even when the steps are many.',
    'Don\'t use it for data loading, a checklist or a project plan.',
    'Don\'t show a disabled Retry. When it cannot work, leave it out.',
    'Don\'t add a second file or answer control to a row. The composer already has one.',
    'Don\'t reorder, replace or remove a task, or let a completed one lose its mark.',
    'Don\'t stack two lists in one view.',
  ],
};

export const accessibility: DocsAccessibility = {
  keyboard: [
    { keys: 'Tab', action: 'Moves to each row\'s head, and to Retry when its row is open. A 2px Obsidian ring shows.' },
    { keys: 'Enter / Space', action: 'Opens or closes the focused row, or presses Retry.' },
  ],
  notes: [
    'Each row is a `<button>` with `aria-expanded` and `aria-controls`, inside a `role="list"` with `role="listitem"` rows.',
    'Tabbing onto a row reads its whole state in one pass ("Draft supplier emails. Failed. 2 messages. The mail service timed out. Retry available."). The visible label, count and pill are hidden from assistive tech so nothing is read twice.',
    'A closed row\'s detail is `inert`, so Retry cannot be reached while hidden. A failure opens itself, which is what makes Retry reachable without a click.',
    'One polite, atomic status announces failures, a retry the reader started, and the end of the run. A task completing, a step landing and a row opening are silent.',
    'Status is never colour alone: a number, a check and a cross, plus the words "Completed", "Retrying" and "Failed".',
    'Retry\'s name includes the task: "Retry: Draft supplier emails".',
  ],
};

export const motion: DocsMotion[] = [
  { interaction: 'A row arrives', motion: 'Rises 8px and fades in, 80ms after the row before it.', token: '--duration-slow · --ease-reveal' },
  { interaction: 'A row opens', motion: 'Its corners tighten from 20px to 16px (Capsules) and the detail grows from 0 to its height while fading in. The chevron turns 180°.', token: '--duration-base · --ease-morph · --ease-settle · --ease-standard' },
  { interaction: 'A step appears', motion: 'Fades up 8px when the row opens, 80ms apart.', token: '--duration-base · --ease-settle' },
  { interaction: 'A status changes', motion: 'The disc pops in (scale only, no overshoot) and the pill fades in.', token: '--duration-base · --ease-morph · --ease-standard' },
  { interaction: 'Active ring and Retrying arrow', motion: 'Turn continuously. Under reduced motion the ring\'s arc stays and stops turning; the Retrying arrow keeps turning.', token: '--duration-ambient' },
  { interaction: 'Hover on a row', motion: 'The background fades to Neutral-2.', token: '--duration-fast · --ease-standard' },
];
