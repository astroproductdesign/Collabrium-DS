# Thinking

## Purpose
An expandable agent trace for AI work that has started producing named,
orderable steps: a clickable header (mark, live status, chevron) that opens
onto a timeline of rows. Four variants share one shell: Steps, Reasoning,
Search and Coding. It is Loading State's sibling, not its replacement:
Loading State is for an opaque wait, Thinking is for a wait that already has
steps to show. It is part of AI Native (the second part converted).

## Use when
- An AI operation has produced two or more named steps **and** two seconds have passed.
- You want a record of the work to stay on the page after the answer: the header becomes past tense ("Thought for 4 seconds") and stays expandable.

## Don't use when
- **Nothing has been named yet, or only one step exists.** Use Loading State.
- **The run finished inside two seconds.** Use Loading State, even if steps existed.
- **It is data loading of any kind.** Not AI work: use a spinner or a skeleton (not converted yet).
- **You are streaming the answer itself.** That is Streaming Text.
- **Your data fits none of the four row shapes.** The trace is not ready to be shown.

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `variant` | `'steps'` \| `'reasoning'` \| `'search'` \| `'coding'` | **required** | What a row is, chosen by the shape of the data. Decides which row prop applies. |
| `status` | `'working'` \| `'done'` | **required** | `working`: live label with shimmer, trace opens itself. `done`: past-tense label, trace closes itself. |
| `workingLabel` | text | **required** | "Thinking", "Searching the web", "Running tools". Update it as phases change. |
| `startedAt` | milliseconds since the epoch | mount time | When the run really started (`Date.now()`). A timer counts from here beside the live label; when `done` it stops and becomes `{duration}` in `doneLabel`. Pass the value you gave Loading State. |
| `doneLabel` | text | **required** | "Thought for 4 seconds", "Searched the web", "Ran 3 tools". For a live run write "Thought for {duration}" and the settled time is filled in. |
| `steps` | `{ label, detail? }[]` | — | `steps` variant. Append only. The last step spins while working. |
| `paragraphs` | `string[]` | — | `reasoning` variant. One row each. |
| `query` | text | — | `search` variant. Shown first. |
| `sources` | `{ title, domain, href }[]` | — | `search` variant. Real links, opening in a new tab. |
| `toolCalls` | `{ icon, name, target, additions?, deletions? }[]` | — | `coding` variant. `icon` is a Phosphor icon component. Toggle buttons, one selected at a time. |
| `onToolCallSelect` | `(index: number \| null) => void` | — | `coding` variant. Called on select and deselect. |
| `moreCount` | number | — | Adds a "+N more" line. |
| `defaultExpanded` | boolean | follows the run | Start open or closed. Counts as the reader's own choice: the trace then stops opening and closing by itself. |
| `id`, `aria-*`, `data-*` | native | — | Passed to the root `<div>`. `style` and `className` are not accepted. |

The `ref` is forwarded to the root `<div>`.

## Rules
The component owns the rules that are local to it:
1. **Auto-open while working, auto-close when done, and the reader wins from then on** (Rule 6). The first click on the header overrides the automation for that instance, permanently. To start a new run, mount a new instance (change its `key`).
2. **Exactly one step is in progress** (Rule 9): the spinner is on the last step, checks above it.
3. **Always expandable** (Rule 5): the chevron is never hidden.
4. **The header announces, the rows do not** (Rule 19).
5. **Reduced motion drops the travel and keeps the sequence** (Rule 20).

The host (your code) owns the rest:
6. **AI operations only** (Rule 1).
7. **Two or more named steps, and two seconds elapsed, before it ever renders** (Rules 2 to 4), never speculatively.
8. **Steps append. They never replace, reorder or disappear** (Rule 8).
9. **Cap the visible rows and summarise the rest** with `moreCount` (Rule 11).
10. **The variant follows the data** (Rule 12).
11. **Keep the working label live** (Rule 13). The timer shows from the first frame and becomes the past-tense duration (Rules 7 and 14): pass the run's `startedAt` and write `{duration}` in `doneLabel`. It keeps ticking under reduced motion.
12. **One per operation, never stacked** (Rule 15). **Never blocks** (Rule 16).
13. **Never without a Stop, and the Stop stays reachable while the trace is open** (Rule 17).
14. **It occupies the space the result will fill** (Rule 18).
15. **Never go back to Loading State** (Rule 21): if steps stop arriving, the last one stays in progress until the first token.

## Accessibility
- The header is a real `<button>` with `aria-expanded` and `aria-controls` (pointing at the trace).
- A visually hidden `role="status"` (polite) sits beside the header button, outside it, and announces the live label and then the past-tense label. Rows do not announce one by one.
- The closed trace is `inert`: its links and buttons cannot be reached or read.
- Coding rows are toggle buttons (`aria-pressed`); search rows are real links.
- Focus ring: 2px Obsidian on the header, and on the links and buttons in the rows (drawn just inside the row so it does not collide with its neighbours).
- Colour never carries meaning alone: the done state is a different label, and check and spinner are different shapes.

## Motion
- **Trace open and close:** grid rows 0fr to 1fr and opacity, `duration-base`, `ease-settle`.
- **Chevron:** rotates 180°, `duration-fast`, `ease-standard`.
- **Shell height:** minimum height 0 to 176px, `duration-morph`, `ease-morph`.
- **Timeline line:** grows with the rows, `duration-reveal`, `ease-reveal`.
- **Rows:** 4px rise and fade, `duration-slow`, `ease-settle`, staggered 120ms by position.
- **Working label:** shimmer, 1.4s linear loop. **Done label:** fades in, `duration-slow`. **"+N more":** fades in, `duration-base`.
- **Spinner:** rotates, `duration-ambient`, linear.
- **Reduced motion:** no expand, stagger, line growth, shimmer or fades. Rows still appear in order. The spinner on the current step keeps turning: it is the only sign the run is still going.

## Example

```tsx
import { Thinking } from '@collabrium/ui';

<Thinking
  variant="steps"
  steps={[{ label: 'Reading account notes' }, { label: 'Scanning pipeline data', detail: '12 accounts' }]}
  status="working"
  workingLabel="Thinking"
  doneLabel="Thought for 4 seconds"
/>
```

## Replaces
- `.c-thinking` (`.is-expanded`, `.is-done`, `.is-active`), `-header`, `-mark`, `-status` (`.working`, `.done`), `-chevron`, `-trace`, `-trace-inner`, `-line-wrap`, `-line`, `-rows`, `-query`, `-row` (`.is-prose`, `.is-selected`), `-row-icon` (`.is-spin`), `-row-primary`, `-row-secondary`, `-row-diff`, `-more`
- the gallery's `runSequence` script and the `.js-thinking-*` hooks
