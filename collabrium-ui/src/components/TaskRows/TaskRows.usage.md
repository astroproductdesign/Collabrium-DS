# Task Rows

## Purpose
The named tasks an agent run is working through: a short list where each row
has its own status, count and droppable detail steps, and where one task can
fail while the others succeed. It is Thinking's sibling one level up: Thinking
traces one operation, Task Rows reports several independent ones. Two
variants: Capsules and List. It is part of AI Native (the fourth part
converted).

## Use when
- An AI run has two or more named tasks, each with an outcome of its own.
- One task can fail while the others succeed, and the reader needs to see which.

## Don't use when
- **It is one operation with ordered steps.** Use Thinking, even when the steps are many.
- **There is one task, or none yet.** Use Loading State, or Thinking once it has named steps.
- **It is data loading, a generic checklist or a project plan.** Not AI work.
- **The reader must supply something to recover** (a file, a decision, a value). Don't put a control on the row: ask in the conversation (Rule 9).

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `tasks` | `TaskRowsTask[]` | **required** | The tasks, in order. Two or more. Append only. Only the first six show, then "+N more". |
| `tasks[].label` | text | **required** | The task's name. One line; truncates. |
| `tasks[].count` | text | **required** | Its size ("12 suppliers"). Never truncates. |
| `tasks[].status` | `'pending'` \| `'active'` \| `'retrying'` \| `'completed'` \| `'failed'` \| `'stopped'` | **required** | Where the task is. Exactly one is `active` at a time. `stopped`: never finished because the reader stopped the run. |
| `tasks[].steps` | `{ label, meta }[]` | **required** | The detail steps shown when the row is open. |
| `tasks[].reason` | text | — | Why it failed. Shown under the steps on a `failed` task. |
| `tasks[].retryable` | boolean | `false` | Transient failure with its retry unspent: shows a Retry button. |
| `onRetry` | `(index) => void` | — | Called when Retry is pressed. Set that task to `retrying` in response. Without it, no Retry button. |
| `variant` | `'capsules'` \| `'list'` | `'capsules'` | Each row its own surface, or one shared surface with hairlines (for a run inside a card or panel). |
| `id`, `aria-*`, `data-*`, … | native | — | Passed to the root `<div>`. `style` and `className` are not accepted. |

The `ref` is forwarded to the root `<div>`.

## Rules
1. **AI runs only**, with two or more named tasks, each with its own outcome (Rules 1 and 2).
2. **Chosen over Thinking by the shape of the work** (Rule 3): several independent tasks, not one operation.
3. **Six rows, then a count** (Rule 4). The component does this itself.
4. **One row open at a time** (Rule 5). Opening one closes the other.
5. **A failure opens itself and takes the open slot** (Rule 6). So does the task that is now in progress. The moment the reader touches a chevron, their choice wins for that instance.
6. **One task in progress at a time** (Rule 7). Two rings would say the list is lying about what is sequential.
7. **Tasks append** (Rule 8). Never reorder, replace or remove one; a completed task stays completed.
8. **A control on the row only where the reader supplies nothing** (Rule 9). Retry is the only control. Everything the reader must supply is asked for in the conversation.
9. **One retry per task, as a shape** (Rule 10): Retry shows only on a retryable failure, and after one press it is gone. **Never a disabled Retry** (Rule 11): when it cannot work, it is absent.
10. **The spin means an attempt is in flight** (Rule 13). The Failed pill has no glyph.
11. **A recovered task is Completed like any other** (Rule 14): no scar, no attempt count.
12. **One per run, never stacked** (Rule 16), and it never blocks or scrolls (Rule 15).
13. **Stopping the run stops every unfinished task.** The task in progress and every task not yet started become `stopped`: a neutral "Stopped" pill, the number disc with no ring, no auto-open and no Retry. Finished tasks keep their status. Continuing is asked for in the conversation (Rule 9). The component announces "Run stopped. X of N tasks completed." once.
14. **Narrow widths.** Below 400px of the component's own width (not the screen's) the count moves under the name and the name may take two lines. The pill and chevron keep their slots and nothing is dropped. This rule was defined in this library (the DLS has none). Why: below about 290px the name shrank to nothing and the first arrow was clipped, because only the name can shrink. Hiding the pill or the count would drop information, so they stay. 400px is the width at which a name like "Build reorder task list" still fits on one line with its count and pill. It is measured on the component, not the screen, so it also holds in a narrow side panel.
15. **For a new run, mount a new instance** (a new `key`) and reset `tasks` in the same update, so it starts from the first state.

## Accessibility
- Each row head is a `<button>` with `aria-expanded` and `aria-controls`, inside `role="list"` / `role="listitem"`.
- Tabbing onto a head reads the whole state at once: "Draft supplier emails. Failed. 2 messages. The mail service timed out. Retry available." The visible label, count and pill are `aria-hidden` so nothing is read twice.
- A closed detail is `inert`, so Retry is not reachable while hidden. A failure opens itself, so Retry is reachable without a click.
- One polite, atomic `role="status"` on the root announces failures, a retry the reader started, and the end of the run (Rule 17). A task completing, a step landing, a row opening and the ring turning are silent. A list that renders already settled announces nothing.
- Status is not colour alone: number, check and cross, plus the words "Completed", "Retrying", "Failed" and "Stopped".
- Retry is named "Retry: <task>". Heads and Retry take a 2px Obsidian focus ring.
- Contrast the DLS owns and records as pre-existing: Neutral-1 on the green Completed disc (2.35:1). The check and cross, not colour, tell Completed from Failed.

## Motion
- **A row arrives:** rises 8px and fades in, 80ms after the one before. `duration-slow`, `ease-reveal`.
- **A row opens:** corners tighten from 20px to 16px (Capsules), detail grows 0fr to 1fr with opacity, chevron turns 180°. `duration-base`, `ease-morph`, `ease-settle`, `ease-standard`.
- **Steps:** fade up 8px when a row opens, 80ms apart after 120ms. `duration-base`, `ease-settle`.
- **Status change:** the disc pops in (scale from 0.62, no overshoot); the pill fades in. `duration-base`.
- **Ring and Retrying arrow:** turn continuously, `duration-ambient`.
- **Reduced motion:** the entrance, the stagger, the radius morph, the chevron turn and the ring's rotation stop. The ring's arc stays, solid, since it is what separates Active from Pending. The arrow in the "Retrying" pill keeps turning: an attempt in flight is information.

## Example

```tsx
import { TaskRows } from '@collabrium/ui';

<TaskRows
  tasks={[
    { label: 'Verified vendor records', count: '12 suppliers', status: 'completed',
      steps: [{ label: 'Matched tax and contact IDs', meta: '12/12' }] },
    { label: 'Draft supplier emails', count: '2 messages', status: 'failed',
      reason: 'The mail service timed out on the second message.', retryable: true,
      steps: [{ label: 'Pistachio reorder note', meta: 'failed' }] },
  ]}
  onRetry={retry}
/>
```

## Replaces
- `.c-tasks`, `.c-tasks--capsules`, `.c-tasks--list`
- `.c-tasks-row`, `.c-tasks-head`, `.c-tasks-mark`, `.c-tasks-ring`
- `.c-tasks-label`, `.c-tasks-count`, `.c-tasks-chevron`
- `.c-tasks-detail*`, `.c-tasks-steps`, `.c-tasks-line`, `.c-tasks-step*`
- `.c-tasks-fail`, `.c-tasks-reason`, `.c-tasks-more`, `.c-tasks-live`
- `.c-step-indicator` as used inside it (the three discs are copied into this component; Stepper itself is not converted yet)
