# Streaming Text

## Purpose
The model's own prose arriving word by word, with a citation landing in
position mid-sentence. Once the last word settles it becomes an ordinary
message and the action row (Copy, Retry, thumbs, sources) and follow-ups
appear. It is what Loading State and Thinking hand off to at the first token.
It is part of AI Native (the third part converted).

## Use when
- A model is producing an answer and you receive it in pieces (a real stream).
- The answer has citations that belong inside a sentence.

## Don't use when
- **The full text is already in hand.** Cached, replayed, computed, or arrived in one response: render it as ordinary text. Animating a reveal over finished content only makes the product slower (Rule 2). A message that is `status="done"` on its first render is shown whole, with no reveal.
- **The text was computed by the system** (a recommendation built from arithmetic). Computed text is not generated text (Rule 1).
- **Nothing has arrived yet.** Use Loading State, or Thinking once it has named steps (Rule 3).
- **The answer is a table, code or a list.** Those land whole, not word by word (Rules 11 to 13). Render them around this component yourself (not converted yet).

## Props

| Name | Options | Default | Description |
|---|---|---|---|
| `content` | `(string \| { citation })[]` | **required** | Everything produced so far, in order. Append only. A string is prose of any length; `{ citation: { name, domain, href, color? } }` is a source chip that lands in that position. |
| `status` | `'streaming'` \| `'done'` \| `'stopped'` \| `'failed'` | **required** | `streaming`: caret on, actions hidden. `done`: the stream ended; the message settles once the last word is on screen. `stopped`: the reader stopped it; what is on screen stays, marked "Stopped early". `failed`: the stream broke; what is on screen stays, with an error line and a Retry beside it. |
| `sources` | `{ name, domain, href, color? }[]` | — | Adds a "N sources" button to the action row that opens the list. Separate from citations in `content`. |
| `followUps` | `string[]` | — | Prompts offered once the answer has settled. Never shown on a stopped answer. |
| `onFollowUp` | `(prompt, index) => void` | — | Called when a follow-up is chosen. |
| `onRetry` | `() => void` | — | Adds a Retry button (in the action row, or beside the error line on a `failed` answer). The host decides what retrying does. |
| `onFeedback` | `(value: 'good' \| 'bad' \| null) => void` | — | Adds the thumbs up and down buttons. `null` when a choice is taken back. |
| `id`, `aria-*`, `data-*`, … | native | — | Passed to the root `<div>`. `style` and `className` are not accepted. |

The `ref` is forwarded to the root `<div>`.

## Rules
1. **Model-generated text only.** Never text the system computed (Rule 1), and never a simulated stream over text you already hold (Rule 2).
2. **It starts at the first token** and replaces Loading State or Thinking there (Rule 3).
3. **It ends once**: when the last word settles it is a static message, and it can never stream again (Rules 4 and 22). If `status` flips back to `streaming` after settling, it is ignored: mount a new instance for a retry (a new `key`, with `content` and `status` reset in the same update so it starts empty and streaming).
4. **Words, not characters** (Rule 5), released at about 55ms a word through a buffer, faster while it backs up (Rule 6). A last word still being typed is held until it ends.
5. **A finished answer under 12 words appears whole** (Rule 7).
6. **Appending is the default** (Rule 8). Where content below must not move, reserve the space yourself with `visibility: hidden`, never opacity alone (Rule 9).
7. **Never justify or balance the text** (Rule 10).
8. **Actions, sources and follow-ups do not exist until it settles**, in that order (Rules 15 and 16): they are not rendered, so Tab cannot reach them.
9. **A stopped answer keeps its text**, is marked "Stopped early", and its actions become available. No follow-ups (Rule 17).
10. **It never scrolls anything.** The thread owns scroll (Rule 20).
11. **A failed stream keeps its text too** (Rule 18). `status="failed"` freezes what is on screen, drops the caret, and shows a red status glyph, "Couldn't finish this response" in plain Neutral-5 text (never red text), and a Retry button beside it when `onRetry` is set. The actions stay (Copy and the rest); there are no follow-ups. The component announces "Response failed. Retry available." once. The error line is defined by this library.

## Accessibility
- The text is a `<p>` with `aria-busy="true"` while streaming, `false` after (Rule 19). There is no live region over the text.
- A visually hidden status announces "Response ready." or "Response stopped." once, politely, when it settles. A message that arrives already settled announces nothing.
- The action row, sources and follow-ups are not in the DOM while streaming, so there is nothing to Tab to.
- Every button is a real `<button>` with an `aria-label` (Copy, Retry, Good response, Bad response); thumbs use `aria-pressed`. Copy's label becomes "Copied" for 1.6 seconds.
- The sources button has `aria-expanded` and `aria-controls`. The list is `inert` while closed, so its links are not reachable.
- Citations are real links (`target="_blank"`), named by their domain. Buttons and links have a 2px Obsidian focus ring.
- Under reduced motion the words appear as they arrive with no cadence, the caret stays and stops blinking, and the entrance animations are removed (Rule 21).

## Motion
- **Words:** appended one at a time at about 55ms, no per-word animation. Dropped under reduced motion (everything available appears at once).
- **Caret:** 500ms blink. Removed the instant the last word lands, never faded. Solid under reduced motion.
- **Citation chip, action row, follow-ups label:** fade in, `duration-slow`, `ease-settle` (chip) or `ease-standard`. Follow-up rows slide up 4px, 80ms apart. Only for a message that streamed live.
- **Sources list:** grid rows `0fr` to `1fr` with opacity, `duration-base`, `ease-settle`.
- **Hover and focus colours:** `duration-fast`, `ease-standard`.

## Example

```tsx
import { StreamingText } from '@collabrium/ui';

<StreamingText
  content={[
    "Northwind Retail's renewal risk is high: the Q3 proposal has stalled. ",
    { citation: { name: 'Forecastly', domain: 'forecastly.io', href: 'https://forecastly.io' } },
  ]}
  status={done ? 'done' : 'streaming'}
  followUps={['Which accounts are trending the same way']}
/>
```

## Replaces
- `.c-streaming`, `.c-streaming-text`, `.c-streaming-caret`
- `.c-streaming-cite`, `.c-streaming-cite-avatar`
- `.c-streaming-note`, `.c-streaming-actions`
- `.c-streaming-sources*`, `.c-streaming-source-*`
- `.c-streaming-followups*`, `.c-streaming-followup`
- `.c-chat-action` as used inside it (copied into this component; Chat window itself is not converted yet)
