# Tool approval

## Purpose
A card the AI shows mid-task when it needs the person to make one or more
decisions before the task can go on. It asks one question at a time, from a
set of provided options (one or several) plus an always-available written
answer, with a step count to page through. Once sent, skipped through or
dismissed it closes for good. It is part of AI Native, which has eight parts;
this is the sixth converted.

## Use when
- The AI cannot carry out the requested task without a decision only the person can make, and each decision is a discrete point the task is blocked on.

## Don't use when
- **The AI needs authorization for a specific action** (read a file, run a command, send a message). That is Permission Prompt, which stays in the conversation as the record.
- **You want a general form, or input the task is not blocked on.**
- **There is no decision to make.** Don't ask; just do it.
- **You would block the thread or the composer.** Never a scrim or a modal.

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `questions` | `ToolApprovalQuestion[]` | **required** | The decisions, in order. One shows at a time. |
| `questions[].question` | text | **required** | The question, in one sentence. It is the card's heading while it shows. |
| `questions[].type` | `'single'` \| `'multiple'` | **required** | `single`: radios, moves on by itself. `multiple`: checkboxes, waits for Continue. |
| `questions[].options` | `{ label, description? }[]` | **required** | The provided options. Every question also carries a written "Something else…" answer. |
| `onSend` | `(answers: ToolApprovalAnswer[]) => void` | — | Called once, with every answer: the `question`, the `selected` labels and the typed `custom` text. A skipped question has neither. The card has then closed. |
| `onDismiss` | `() => void` | — | Called when the person presses ×. The card has then closed, with no progress kept. |
| `id`, `aria-*`, `data-*` | native | — | Passed to the root `<div>`. `style` and `className` are not accepted. |

The `ref` is forwarded to the root `<div>`.

## Rules
The component owns the rules that are local to it:
1. **One question at a time** (Rule 2). The others are reached only through the arrows and the step count (`1 / 2`); they are never rendered together.
2. **Single-choice moves on by itself; multiple-choice waits for Continue** (Rule 3). Choosing an option on a `single` question moves to the next question after a moment (480ms). On the last question it only enables Send: sending is always pressing Send (decided 2026-10-26). A `multiple` question never moves by itself, since more may still be coming.
3. **Every question has a written answer** (Rule 4): "Something else…", an Input field that opens into a Textarea the moment it is focused.
4. **Options and the written answer exclude each other on every question** (Rule 5; decided 2026-10-26). Choosing an option (a radio, or ticking a box) clears any typed answer for that question, and typing clears any chosen option. A question has exactly one answer.
5. **Continue and Send are gated on an answer** (Rule 6). Disabled until the question has one. The last question's button reads "Send": it submits everything.
6. **Skip always moves forward** without an answer (Rule 7), and sends on the last question as Continue would.
7. **Previous and Next move freely**, answered or not (Rule 8).
8. **The dismiss × is always there** (Rule 9), never disabled or hidden.
9. **Closing is final, however it happens** (Rules 10 to 13). Dismiss and Send both close the card outright: it renders nothing, with no confirmation, no read-only copy, no progress kept and no way back. Only a new instance, for a genuinely new decision, shows it again.
10. **The height morphs between questions, and never snaps** (Rule 11).
11. **Reduced motion drops the height morph and the entrances and keeps the sequence** (Rule 15).

The host (your code) owns the rest:
12. **Raise one only for a decision the task is blocked on** (Rule 1).
13. **Never stack two** (Rule 14). A second waits until the first is answered, skipped through or dismissed.
14. **Pin it just above the composer, scrolled behind** (Rule 16). The thread scrolls underneath it; no scrim, no dimming, no blocking. It is its own floating card, not part of the composer's footer.
15. **Match the composer's width exactly** (Rule 17). 360px is the standalone width; the Chat window sets the composer's width when it is converted.
16. **While it is open the composer's Send becomes Stop, and its placeholder "Or reply directly"** (Rule 18). Stop interrupts the AI's task and closes the card; the × closes only the card, and the task keeps running. Put both back the moment it closes.
17. **Size it to the question and clamp it to the chat window** (Rule 19): never taller than the active question needs, scrolling inside if the window is short.
18. **Move focus back to the composer when it closes**, from `onSend` and `onDismiss`.

## Accessibility
- The options are native radios (`role="radiogroup"`) or native checkboxes (`role="group"`), named by the question.
- When the question changes, focus moves to the new question, the card's heading, with no ring (decided 2026-10-26).
- Continue and Send are disabled until there is an answer; the other buttons are always available (Previous and Next at the ends excepted).
- The written answer is labelled "Custom answer"; its placeholder is "Something else…". Focusing it swaps the one-line field for a Textarea that takes focus, with the caret at the end.
- Icon-only buttons are named: "Previous question", "Next question", "Dismiss".
- Closing removes the card and the focused control; move focus to the composer yourself.
- No live region.

## Motion
- **Arrival:** the card fades in (`duration-reveal`, `ease-reveal`).
- **A new question:** the question and its options rise 4px and fade in (`duration-slow`, `ease-settle`) while the height morphs (`duration-morph`, `ease-morph`).
- **The written answer opening:** the Textarea rises and fades in while the height morphs.
- **Reduced motion:** the height morph and the entrances go.

## Example

```tsx
import { ToolApproval, type ToolApprovalQuestion } from '@collabrium/ui';

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

<ToolApproval questions={questions} onSend={answers => save(answers)} onDismiss={() => composerRef.current?.focus()} />
```

## Replaces
`.c-tool-approval`, `-head`, `-question`, `-topbar`, `-dismiss`, `-viewport`, `-body`, `-options`, `-option`, `-custom`, `-footer`, `-actions`, with `.c-card` as its shell, `.c-pagination-indicator` for the step count, `.c-choice` with `.c-radio-circle` or `.c-checkbox-box` for the options, and the `.c-field` input and textarea for the written answer. (`-slot` belongs to the Chat window.)
