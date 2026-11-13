# Permission Prompt

## Purpose
A card the AI puts inline, in its own turn, to ask the person's authorization
for one specific, consequential action before it goes ahead: reading or
writing a file, running a command, sending something on their behalf, calling
an outside service. It is a part of the AI's own message, never an overlay.
Once decided it stays in the conversation as the record of what was
authorized. It is part of AI Native, which has eight parts; this is the fifth
converted.

## Use when
- The AI is about to do something with a real consequence outside the conversation, and the person should say yes first.
- You can state exactly what the action will do, as a few key and value rows.

## Don't use when
- **The action only affects the conversation itself.** Don't ask; just do it.
- **The AI needs a decision or an answer, not authorization.** That is Tool approval (not converted yet), a card pinned above the composer.
- **You would block the thread or the composer.** Never an overlay, a scrim or a modal.
- **You want a general confirmation ("Are you sure?").** This is for authorizing one specific action.

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `status` | `'pending'` \| `'allowed'` \| `'denied'` \| `'expired'` | **required** | Where the request is. Your code sets it; the card never resolves itself. |
| `label` | text | **required** | The question, ending in a question mark. It stays on the resolved card. |
| `icon` | Phosphor icon | **required** | The action's own kind (`FileText`, `Terminal`, `EnvelopeSimple`). Always Regular. Shown while pending. |
| `risk` | `'low'` \| `'medium'` \| `'high'` | **required** | How much harm the action could do. Shown while pending, as the success, warning and error Badge. |
| `details` | `{ key, value }[]` | **required** | Exactly what is authorized. Values show in full and wrap. |
| `scopeNote` | text | **required** | What Allow once covers and what Allow for session covers. |
| `deniedNote` | text | — | Under a `denied` card: what happens now. |
| `expiredNote` | text | — | Under an `expired` card: why nothing ran. |
| `onDeny`, `onAllowOnce`, `onAllowSession` | `() => void` | — | The three decisions. Run the action (or not), then set `status`. |
| `id`, `aria-*`, `data-*` | native | — | Passed to the root `<div>`. `style` and `className` are not accepted. |

The `ref` is forwarded to the root `<div>`.

## Rules
The component owns the rules that are local to it:
1. **The detail is open while pending, and still reachable once resolved** (Rule 3). It opens with the request and folds shut when a decision lands. The toggle says "What this will do" while pending and "View details" once resolved.
2. **Risk is always visible, in the same corner** (Rule 5). The risk badge sits at the top right of the head while pending, and the outcome badge takes the same corner once resolved.
3. **Three actions, escalating commitment, deny-first** (Rule 6). Left to right: Deny (Ghost, in `--color-red`), Allow once (Secondary), Allow for session (Primary), at natural width, right-aligned, wrapping rather than stretching.
4. **Under 768px the card fills the width and the actions restack by priority** (Rule 10): one full-width button per row, Allow for session on top, Allow once beneath it, Deny last. Only the look flips; the tab order stays Deny, Allow once, Allow for session.
5. **Values never truncate** (Rule 4): a long value wraps.
5a. **The scope note and the resolved note are 14px with no margin of their own**, which is how the DLS draws them (decided 2026-10-26); the card's 8px gap spaces them.
6. **Reduced motion drops the entrance and the expand and rotate, and keeps the information** (Rule 11).

The host (your code) owns the rest:
7. **Ask only for an action with a real consequence** (Rule 1).
8. **Render it in the AI's own turn, never as an overlay** (Rule 2).
9. **State exactly what is authorized, as key and value rows, never raw JSON** (Rule 4).
10. **A resolution is permanent and stays visible** (Rule 7). Leave the card in the conversation. Don't offer to reopen or undo it; a new request is a new card.
11. **`expired` is a session boundary, not a decision** (Rule 8). Set it when the conversation moves on before an answer. No control reaches it.
12. **Inside a Chat window the card fills the column** (Rule 9). 360px is the standalone width. The Chat window sets the wider width when it is converted.

## Accessibility
- The toggle is a real `<button>` with `aria-expanded` and `aria-controls`. Closed detail is `inert`.
- Detail rows are a description list (`<dl>`): each field is read with its value.
- Pressing a decision removes the button that had focus, so focus moves to the resolved row, which reads the question and the outcome ("Read pipeline-config.ts? Allowed"). A press that did not focus the button leaves focus alone. There is no live region.
- Tab order is Deny, Allow once, Allow for session on every screen size.
- Risk and outcome are never colour alone: each badge has words, and the outcome badges an icon.
- Focus ring: 2px Obsidian on the toggle and on the resolved row.

## Motion
- **Arrival:** the card (and the resolved row) fades in on `duration-reveal` with `ease-reveal`.
- **Detail:** grows from 0 to its height while fading, on `duration-base` with `ease-settle`. The chevron turns 180° on `duration-fast`.
- **Reduced motion:** the entrance, the expand and the rotation go. The layout and information stay.

## Example
```tsx
import { useState } from 'react';
import { FileText } from '@phosphor-icons/react';
import { PermissionPrompt, type PermissionPromptStatus } from '@collabrium/ui';

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
}
```

## Replaces
`.c-permission-prompt`, `-head`, `-icon`, `-label`, `-toggle`, `-detail`, `-detail-inner`, `-detail-list`, `-detail-row` (with `.key` and `.value`), `-scope`, `-actions`, `-deny`, `-once`, `-session`, `-resolved`, `-resolved-label`, `-resolved-note`, with `.c-card` as its shell and `.c-badge` and `.c-btn` inside.
