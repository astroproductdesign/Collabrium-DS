# Chat window

## Purpose
The modal chat surface, and the expanded form of the floating Prompt input bar. A rail of conversations on the left (filtered by pillar), the active thread on the right, and an inline Prompt input bar as the composer. It is two exports: `ChatWindow` (the surface, with the rail, the thread, Jump to present and the composer) and `ChatMessage` (one turn: the person's tinted bubble, or the AI's plain page copy with citations and an action row).

## Use when
- The person asks the AI something from the floating Prompt input bar and the conversation needs room: history, a thread, a composer.

## Don't use when
- **A single question and answer fits in the page.** Use Streaming Text with the bar inline.
- **The AI is only working on something and needs no conversation.** Use Loading State or Thinking.
- **The surface should sit in the page, not over it.** It is a modal: there is no inline mode.

## Props

`ChatWindow`

| Name | Options | Default | Description |
|---|---|---|---|
| `open` | boolean | **required** | Whether the window is open. It folds open from `origin` and shut back to it. |
| `onClose` | `() => void` | **required** | Called on a press on the veil or on Escape. Set `open` to `false` in response. There is no close button. |
| `origin` | ref to the floating bar | none | The bar the window folds out of. Without it the window appears and disappears. Set the bar's `launched` to `open` yourself. |
| `title`, `description` | text | **required**, none | The conversation's title (names the dialog) and the caption under it. |
| `pillars` | `{ value, label }[]` | **required** | What the rail filters by. "All" is added first; a pillar with no conversations shows disabled. |
| `groups` | `{ label, conversations: { id, title, pillar }[] }[]` | **required** | The conversations under recency headings, newest first. |
| `activeConversationId` | text | none | The open conversation. |
| `onConversationSelect`, `onNewChat` | functions | — | Called with the `id`, and when New chat is pressed. |
| `composer` | the Prompt input bar's props, minus the floating-only ones | **required** | `models`, `placeholder`, `working`, `onStop`, `onSend`, and the rest. |
| `children` | `ChatMessage` turns | **required** | The thread, oldest first. |
| `id`, `aria-*`, `data-*`, … | native | — | Passed to the root. `style` and `className` are not accepted. |

`ChatMessage`

| Name | Options | Default | Description |
|---|---|---|---|
| `role` | `'user'` \| `'assistant'` | **required** | Whose turn it is. Only assistant turns take the props below. |
| `citations` | `{ label, icon? }[]` | none | Sources, as neutral badges under the answer. |
| `streaming` | boolean | `false` | The answer is still arriving. The action row is removed until it is `false`. |
| `timestamp`, `timeLabel` | ISO text, text | none | The time beside the actions, and its short text ("3 hours ago"); the full date and time is its `title`. |
| `feedback`, `defaultFeedback`, `onFeedbackChange` | `'up'` \| `'down'` \| `null` | `null` | The thumbs. Without `onFeedbackChange` they are not shown. |
| `readAloud`, `onReadAloud` | `'idle'` \| `'loading'` \| `'playing'`, function | `'idle'` | Where reading aloud is, and the press. Without `onReadAloud` the button is not shown. |
| `onCopied` | `(text) => void` | — | Called after Copy. Copy is always shown. |
| `onRetry`, `onShare`, `onReport` | functions | — | Each adds that row to More options. With none, More options is not shown. |

## Rules
1. **The window is a modal over the page**, on `--z-chat` (95): above the Action bar (40), the menus (60) and the notes panel (70), below the Media Ad and Compare modals (300), Command brief, the Ad Placement Card, Toast and Tutorial Modal. It is drawn from the page body.
2. **The veil and Escape close it, and nothing else.** No close button: a third route is chrome the surface does not need. Escape closes what is on top: an open menu, then the rail drawer, then the window.
3. **It folds out of the floating bar.** It scales and slides from the bar's rectangle (0.8s open, 0.55s close, its own shorter track), turning 10° toward the viewer. The rectangles are measured with the window untransformed, at both open and close, because the page may have scrolled. The fold's class is removed once it ends: a lingering transform would make the window the containing block of every fixed descendant.
4. **The bar fades out meanwhile.** Set `launched` on it to `open`. Open from `onLaunch`, never from focus: the window hands focus back to the bar on close, which would reopen it.
5. **Focus moves to the composer on open and returns to what opened the window on close.** Tab wraps from the last control to the first inside it.
6. **The rail and the thread fade in once the fold settles**, and the veil comes in with the fold. They fade out as it closes. With no `origin` the window just appears. (Decided 2026-10-27, Q-CHAT-5: the DLS has no script for the open and close, and its CSS gives the veil and the content one class.)
7. **The AI's turn is plain text on the page**: no fill, border, radius or avatar mark. The person's turn is the tinted, right-aligned bubble. This asymmetry is the one rule not to undo; it is why there is no avatar.
8. **A citation is a neutral Badge**, with a Fill icon: a context mark, not an action. Never a Tag (its dot means ownership). If a citation becomes a link, it becomes a real button and its icon becomes Regular.
9. **The pillar filter is the real single-select Filter Chip group.** Recency stays the reading order and the pillar filters across it. Choosing a pillar hides the other conversations, any group left empty, and the pillar line on the rows that remain. A pillar with no conversations stays, disabled. The empty line shows only when every row is filtered out.
10. **Below 820px of the window's own width the rail is a drawer**, opened from a toggle in the header. A pillar chip does not close it (a filter is a refinement); choosing a conversation, the scrim, the toggle or Escape does. Opening moves focus into the rail; closing returns it to the toggle. A closed drawer is `inert` (decided 2026-10-27, Q-CHAT-2: the DLS leaves its rows in the tab order while off-screen).
11. **The thread follows the newest turn only while the reader is at the bottom.** Scrolling up past 150px detaches and shows Jump to present; coming back within 30px re-pins. Only an upward scroll detaches, so a programmatic scroll can never detach itself. While pinned, new content scrolls instantly (smooth cannot keep up with tokens).
12. **While detached, arriving content marks Jump to present with a dot and announces "New response below" once**, not per token. Pressing it scrolls to the bottom (smoothly, or instantly under reduced motion), re-pins, clears the mark and returns focus to the composer.
13. **Four edge cases are built in.** Sending always scrolls to the newest turn and re-pins. Adding older turns at the top keeps the reader where they were (measured, not assumed). A window resize never re-pins a detached reader. Opening starts at the bottom, with no button.
14. **Message actions never reveal by height.** The row is always in flow at opacity 0 and fades in on hover, focus or while its menu is open; on touch and coarse pointers it is always shown. It is removed while the answer streams.
15. **Copy tries the clipboard, then a focused off-screen text box**, and announces "Copied to clipboard". The check shows for 1600ms.
16. **More options holds Retry, Share and Report**, whichever the host handles (the contents are unconfirmed in the DLS). No Edit: editing belongs to the person's own turn. The menu is fixed and placed from the trigger, drawn in the window's own popover layer. Focus goes to its first row on open, the arrow keys move, Escape closes it and returns focus to the trigger, and Tab leaves it. (Decided 2026-10-27, Q-CHAT-3.)
17. **Only one message reads aloud at a time**, and Read aloud while loading or playing stops: the host owns that, since it owns the audio.
18. **The composer is a Prompt input bar, inline.** It sits on a warm canvas tray (the floating bar's glow is lost on white). Pressing Send scrolls to the newest turn. On a very narrow window the model switcher's name shrinks with an ellipsis so Send is never clipped (decided 2026-10-27, Q-CHAT-6). While the AI works, set `working` so Send becomes Stop, and `streaming` on the answer.
19. **The footer says "AI can make mistakes. Please double-check responses."** as the DLS specifies (kept 2026-10-27, Q-CHAT-7, although the house rule skips "please").
20. **On a phone (600px and below) the window is the whole screen**: no margin, rounded corners or shadow, with the notch and the home bar cleared. Above that it floats as a card, 24px from every edge. The fold still starts from the bar. (Decided 2026-10-27, Q-CHAT-10: not in the DLS.)
21. **Reduced motion** removes the fold and the fades (the window appears at once); Jump to present keeps its fade, drops the 8px travel, and scrolls instantly.

## Accessibility
- The shell is `role="dialog"` with `aria-modal`, named by the title. The rail is an `aside` named "Conversations".
- The thread is a native scroll container: End and Home work as anywhere.
- The conversations are a group of plain buttons, and the open one carries `aria-current="true"`. Every row is a tab stop. (Decided 2026-10-27, Q-CHAT-1: the DLS's `listbox` and `option` roles promised arrow keys it never had.) The message actions are a group named "Message actions", for the same reason.
- The pillar group, the message actions and the model menu are covered by Chip, this component and Prompt input bar.
- Jump to present is `visibility: hidden` at rest, not only transparent, so it leaves the tab order; `tabIndex` is also -1 then.
- "Copied to clipboard" and "New response below" are polite status nodes. These are the only live regions, and the DLS asks for both.
- In forced-colours mode the window and the selected conversation are outlined (decided 2026-10-27, Q-CHAT-8).

## Motion
The fold (0.8s open, 0.55s close) and the veil (480ms) are written as keyframes and a transition in the CSS, with the DLS's own curves. The veil is `--shadow-overlay` (the DLS's is a slightly lighter literal; decided 2026-10-27, Q-CHAT-4). The rail, thread and drawer use `--duration-base` and `--ease-standard`; Jump to present uses `--ease-settle`; message actions use `--duration-fast`. The read-aloud spinner is `--duration-ambient`. Reduced motion is rule 21.

## Example
```tsx
const bar = useRef<HTMLDivElement>(null);
const [open, setOpen] = useState(false);

<PromptInputBar ref={bar} variant="floating" models={models} launched={open} onLaunch={() => setOpen(true)} />
<ChatWindow
  open={open}
  onClose={() => setOpen(false)}
  origin={bar}
  title={conversation.title}
  description="Collabrium assistant · reading this workspace"
  pillars={pillars}
  groups={groups}
  activeConversationId={conversation.id}
  onConversationSelect={select}
  composer={{ models, placeholder: 'Reply to Collabrium…', working, onStop: stop, onSend: send }}
>
  {turns.map(turn => (
    <ChatMessage key={turn.id} role={turn.role} streaming={turn.streaming}>
      {turn.text}
    </ChatMessage>
  ))}
</ChatWindow>
```

## Replaces
`.c-chat`, `.c-chat-veil`, `.c-chat-shell`, `.c-chat-rail`, `.c-chat-new`, `.c-chat-pillars`, `.c-chat-flabel`, `.c-chat-conversations*`, `.c-chat-conversation*`, `.c-chat-empty`, `.c-chat-main`, `.c-chat-hd`, `.c-chat-thread*`, `.c-chat-jump`, `.c-chat-msg`, `.c-chat-bubble`, `.c-chat-cite`, `.c-chat-actions`, `.c-chat-action`, `.c-chat-time`, `.c-chat-menu*`, `.c-chat-composer*`, `.c-chat-foot`, `.c-chat-rail-toggle`, `.c-chat-rail-scrim`.
