// Documentation for ChatWindow, rendered by the docs site (playground).
// Keep it consistent with ChatWindow.usage.md. Not part of the package build.
import { useEffect, useRef, useState } from 'react';
import { ChartLine, ListChecks } from '@phosphor-icons/react';
import { Button } from '../Button';
import { PromptInputBar } from '../PromptInputBar';
import { ChatWindow, type ChatConversationGroup, type ChatPillar } from './ChatWindow';
import { ChatMessage, type ChatFeedback, type ChatReadAloudState } from './ChatMessage';
import { StreamingText } from '../StreamingText';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../docs.types';

export const title = 'Chat window';

/** Listed under the AI Native overview, not on its own in the sidebar. */
export const group = 'AI Native';

export const description =
  'A modal chat surface: a rail of conversations (filtered by pillar) on the left, the active thread on the right, and an inline Prompt input bar as the composer. It folds open out of the floating bar that launched it.';

export const usage = `import { useRef, useState } from 'react';
import { ChatMessage, ChatWindow, PromptInputBar } from '@collabrium/ui';

export function Assistant() {
  const bar = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  return (
    <>
      <PromptInputBar ref={bar} variant="floating" models={['Standard', 'Advanced']} launched={open} onLaunch={() => setOpen(true)} />
      <ChatWindow
        open={open}
        onClose={() => setOpen(false)}
        origin={bar}
        title="Q3 pipeline review"
        pillars={[{ value: 'sales', label: 'CollabSales' }]}
        groups={[{ label: 'Today', conversations: [{ id: '1', title: 'Q3 pipeline review', pillar: 'sales' }] }]}
        activeConversationId="1"
        composer={{ models: ['Standard', 'Advanced'], placeholder: 'Reply to Collabrium…', onSend: send }}
      >
        <ChatMessage role="user">How is Q3 tracking?</ChatMessage>
        <ChatMessage role="assistant"><p>Q3 is at <b>82% of forecast</b>.</p></ChatMessage>
      </ChatWindow>
    </>
  );
}`;

export const thumbnail = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 260 }}>
    <ChatMessage role="user">How is Q3 tracking?</ChatMessage>
    <ChatMessage role="assistant">
      <p>
        Q3 is at <b>82% of forecast</b>.
      </p>
    </ChatMessage>
  </div>
);

export const anatomy: DocsAnatomyNode[] = [
  {
    name: 'Chat window',
    element: '<div>.cui-chat',
    description: 'The fixed full-viewport root (z-index 95, above the nav and the Card modal). It is drawn from the page body. Its state is data-phase: opening, shown, closing.',
    children: [
      { name: 'Veil', element: 'div.cui-chat__veil', description: 'The dimming layer. A press on it asks to close. aria-hidden.' },
      {
        name: 'Shell',
        element: 'div.cui-chat__shell',
        description: 'role="dialog" aria-modal. A two-column grid (288px rail, the rest the main panel), 20px radius, the deepest shadow. At most 1200×820, 24px clear of the viewport on every side; on a phone (600px and below) it fills the screen.',
        children: [
          {
            name: 'Rail',
            element: 'aside.cui-chat__rail',
            description: 'New chat, the pillar filter and the conversations. Below 820px it is a slide-in drawer.',
            children: [
              { name: 'New chat', element: 'Button', description: 'Secondary, full width.' },
              { name: 'Pillar filter', element: 'FilterChipGroup', description: 'The real single-select Filter Chip group, with an "All" chip first. A pillar with no conversations is disabled.' },
              { name: 'Conversations', element: 'div.cui-chat__conversations', description: 'Rows under recency headings. Each shows a title and, under "All", its pillar as text.' },
            ],
          },
          {
            name: 'Main panel',
            element: 'div.cui-chat__main',
            description: 'Header, thread and composer.',
            children: [
              { name: 'Header', element: 'div.cui-chat__hd', description: 'The title (names the dialog), a caption under it and, below 820px, the rail toggle. There is no close button.' },
              { name: 'Thread', element: 'div.cui-chat__thread', description: 'Scrolls. The turns sit in a 760px column. Jump to present floats over it.' },
              { name: 'Composer', element: 'PromptInputBar variant="inline"', description: 'On a warm canvas tray, with the footer line "AI can make mistakes".' },
            ],
          },
        ],
      },
      { name: 'Popover layer', element: 'div.cui-chat__layer', description: 'Where the More options menu and the model menu draw, above the shell.' },
    ],
  },
  {
    name: 'Chat message',
    element: '<div>.cui-chat-msg',
    description: 'One turn. data-role is user or assistant.',
    children: [
      { name: 'User bubble', element: 'div.cui-chat-msg__bubble', when: 'user', description: 'Neutral-2 fill, 16px radius, at most 78% wide, aligned right.' },
      { name: 'AI text', element: 'div.cui-chat-msg__bubble', when: 'assistant', description: 'Plain text on the page: no fill, border or radius. Body1 at line-height 1.65.' },
      { name: 'Citation', element: 'Badge variant="neutral"', when: 'with citations', description: 'A neutral badge with a Fill icon, under the answer.' },
      { name: 'Actions', element: 'div.cui-chat-msg__actions', when: 'assistant', description: 'Copy, Read aloud, Good, Bad, More options, then the time. Fades in on hover or focus; gone while streaming.' },
    ],
  },
];

const PILLARS: ChatPillar[] = [
  { value: 'sales', label: 'CollabSales' },
  { value: 'studio', label: 'CollabStudio' },
  { value: 'content', label: 'CollabContent' },
  { value: 'influence', label: 'CollabInfluence' },
];

const GROUPS: ChatConversationGroup[] = [
  {
    label: 'Today',
    conversations: [
      { id: 'pipeline', title: 'Q3 pipeline review', pillar: 'sales' },
      { id: 'storyboard', title: 'Storyboard options for launch spot', pillar: 'studio' },
      { id: 'calendar', title: 'Approve Q3 blog calendar', pillar: 'content' },
    ],
  },
  {
    label: 'Earlier this week',
    conversations: [
      { id: 'forecast', title: 'Forecast accuracy check-in', pillar: 'sales' },
      { id: 'grade', title: 'Revise hero video color grade', pillar: 'studio' },
      { id: 'brief', title: 'Content brief: back-to-school push', pillar: 'content' },
    ],
  },
];

const MODELS = ['Standard', 'Advanced'];

interface Turn {
  id: number;
  role: 'user' | 'assistant';
  text: string;
  done?: boolean;
}

const OPENING: Turn[] = [
  { id: 1, role: 'user', text: "How's the Q3 pipeline tracking against forecast, and where's the biggest risk?" },
  { id: 2, role: 'assistant', text: '', done: true },
  { id: 3, role: 'user', text: 'What would close the gap fastest?' },
  { id: 4, role: 'assistant', text: '', done: true },
  { id: 5, role: 'user', text: 'Who owns the two stalled proposals?' },
  { id: 6, role: 'assistant', text: '', done: true },
];

const REPLY = 'Here is a short draft, keeping it low-pressure since they have gone quiet rather than declined: "Hi, following up on the proposal we sent Aug 9. Happy to jump on a quick call this week if useful."';

function History({ turn }: { turn: Turn }) {
  const [feedback, setFeedback] = useState<ChatFeedback>(null);
  const [reading, setReading] = useState<ChatReadAloudState>('idle');
  if (turn.role === 'user') return <ChatMessage role="user">{turn.text}</ChatMessage>;
  return (
    <ChatMessage
      role="assistant"
      timestamp="2026-08-24T10:14"
      timeLabel="3 hours ago"
      feedback={feedback}
      onFeedbackChange={setFeedback}
      readAloud={reading}
      onReadAloud={() => setReading(reading === 'idle' ? 'playing' : 'idle')}
      onRetry={() => {}}
      onShare={() => {}}
      onReport={() => {}}
      citations={turn.id === 4 ? [{ label: 'Deal activity, last 30 days', icon: ListChecks }] : [{ label: 'Pipeline report, Aug 21', icon: ChartLine }]}
    >
      {turn.id === 2 && (
        <>
          <p>
            Q3 is tracking at <b>82% of forecast</b> with three weeks left in the quarter. The gap is concentrated in one segment:
          </p>
          <ul>
            <li>Enterprise renewals are ahead of plan (+6%)</li>
            <li>Mid-market new business is behind (−18%), mostly stalled in the proposal stage</li>
            <li>Two opportunities worth $340K combined have had no activity in 12+ days</li>
          </ul>
        </>
      )}
      {turn.id === 4 && (
        <>
          <p>Fastest lever is the two stalled proposals: reaching back out this week keeps them inside the quarter. Beyond that:</p>
          <ul>
            <li>Re-engage the 4 opportunities that went quiet after a demo</li>
            <li>Pull forward 2 renewals currently slotted for early Q4</li>
          </ul>
        </>
      )}
      {turn.id === 6 && (
        <>
          <p>Both sit with the same account executive:</p>
          <ul>
            <li>Northwind Retail ($210K): proposal sent Aug 9, no reply since</li>
            <li>Ferro Logistics ($130K): awaiting legal review on their end, last touched Aug 11</li>
          </ul>
        </>
      )}
    </ChatMessage>
  );
}

function ChatDemo({ fromBar }: { fromBar: boolean }) {
  const bar = useRef<HTMLDivElement>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('pipeline');
  const [turns, setTurns] = useState<Turn[]>(OPENING);
  const [working, setWorking] = useState(false);
  const next = useRef(7);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearInterval(timer.current), []);

  const send = (text: string) => {
    const text1 = text.trim();
    if (!text1) return;
    const reply = next.current + 1;
    setTurns(t => [...t, { id: next.current, role: 'user', text: text1 }, { id: reply, role: 'assistant', text: '' }]);
    next.current += 2;
    setWorking(true);
    let at = 0;
    const words = REPLY.split(' ');
    window.clearInterval(timer.current);
    timer.current = window.setInterval(() => {
      at += 1;
      const done = at >= words.length;
      setTurns(t => t.map(turn => (turn.id === reply ? { ...turn, text: words.slice(0, at).join(' '), done } : turn)));
      if (done) {
        window.clearInterval(timer.current);
        setWorking(false);
      }
    }, 60);
  };
  const stop = () => {
    window.clearInterval(timer.current);
    setTurns(t => t.map(turn => (turn.role === 'assistant' && !turn.done ? { ...turn, done: true } : turn)));
    setWorking(false);
  };

  return (
    <div className="docs-stack">
      {fromBar ? (
        <div style={{ position: 'relative', height: 420, borderRadius: 'var(--radius-lg)', overflow: 'hidden', background: 'var(--color-canvas-warm)' }}>
          <div ref={scroller} style={{ height: '100%', overflowY: 'auto', padding: 'var(--spacing-24)' }}>
            {Array.from({ length: 8 }, (_, i) => (
              <p key={i} style={{ margin: '0 0 var(--spacing-16)', color: 'var(--color-neutral-5)' }}>
                Page content {i + 1}. Press the bar at the bottom to open the chat window: it folds out of the bar.
              </p>
            ))}
          </div>
          <PromptInputBar ref={bar} variant="floating" scrollContainer={scroller} models={MODELS} launched={open} onLaunch={() => setOpen(true)} />
        </div>
      ) : (
        <div className="docs-row">
          <Button variant="primary" onClick={() => setOpen(true)}>
            Open the chat window
          </Button>
        </div>
      )}
      <ChatWindow
        open={open}
        onClose={() => setOpen(false)}
        origin={fromBar ? bar : undefined}
        title={GROUPS.flatMap(g => g.conversations).find(c => c.id === active)?.title ?? 'New chat'}
        description="Collabrium assistant · reading this workspace"
        pillars={PILLARS}
        groups={GROUPS}
        activeConversationId={active}
        onConversationSelect={setActive}
        onNewChat={() => {}}
        composer={{ models: MODELS, placeholder: 'Reply to Collabrium…', label: 'Reply to Collabrium', working, onStop: stop, onSend: send }}
      >
        {turns.map(turn =>
          turn.id <= 6 ? (
            <History key={turn.id} turn={turn} />
          ) : turn.role === 'user' ? (
            <ChatMessage key={turn.id} role="user">
              {turn.text}
            </ChatMessage>
          ) : (
            <ChatMessage key={turn.id} role="assistant" streaming={!turn.done} timestamp="2026-08-24T10:21" timeLabel="Just now" onFeedbackChange={() => {}}>
              <StreamingText content={[turn.text]} status={turn.done ? 'done' : 'streaming'} actions={false} />
            </ChatMessage>
          ),
        )}
      </ChatWindow>
    </div>
  );
}

function MessagesExample() {
  const [feedback, setFeedback] = useState<ChatFeedback>(null);
  const [reading, setReading] = useState<ChatReadAloudState>('idle');
  return (
    <div style={{ maxWidth: 560 }} className="docs-stack">
      <ChatMessage role="user">What would close the gap fastest?</ChatMessage>
      <ChatMessage
        role="assistant"
        timestamp="2026-08-24T10:16"
        timeLabel="3 hours ago"
        citations={[{ label: 'Deal activity, last 30 days', icon: ListChecks }]}
        feedback={feedback}
        onFeedbackChange={setFeedback}
        readAloud={reading}
        onReadAloud={() => setReading(reading === 'idle' ? 'playing' : 'idle')}
        onRetry={() => {}}
        onShare={() => {}}
        onReport={() => {}}
      >
        <p>Fastest lever is the two stalled proposals. Beyond that:</p>
        <ul>
          <li>Re-engage the 4 opportunities that went quiet after a demo</li>
          <li>Pull forward 2 renewals currently slotted for early Q4</li>
        </ul>
      </ChatMessage>
      <ChatMessage role="assistant" streaming>
        <p>Still arriving: the action row is gone until it finishes</p>
      </ChatMessage>
    </div>
  );
}

export const examples: DocsExample[] = [
  {
    id: 'from-bar',
    title: 'Open from the floating bar',
    description:
      'The real flow. Press the bar (or press Enter in it): the window folds out of the bar, and folds back into it on Escape or a press on the veil. Send a message to see the thread follow it, then scroll up while it streams to get Jump to present.',
    render: () => <ChatDemo fromBar />,
    code: `const bar = useRef<HTMLDivElement>(null);
const [open, setOpen] = useState(false);

<PromptInputBar ref={bar} variant="floating" models={models} launched={open} onLaunch={() => setOpen(true)} />
<ChatWindow
  open={open}
  onClose={() => setOpen(false)}
  origin={bar}
  title={title}
  description="Collabrium assistant · reading this workspace"
  pillars={pillars}
  groups={groups}
  activeConversationId={active}
  onConversationSelect={setActive}
  composer={{ models, placeholder: 'Reply to Collabrium…', working, onStop: stop, onSend: send }}
>
  {turns.map(turn => (
    <ChatMessage key={turn.id} role={turn.role} /* … */>{turn.text}</ChatMessage>
  ))}
</ChatWindow>`,
  },
  {
    id: 'from-button',
    title: 'Open from anywhere else',
    description: 'With no `origin` there is nothing to fold out of, so the window appears and the veil fades in. Focus returns to whatever opened it.',
    render: () => <ChatDemo fromBar={false} />,
    code: `<Button variant="primary" onClick={() => setOpen(true)}>Open the chat window</Button>
<ChatWindow open={open} onClose={() => setOpen(false)} title={title} pillars={pillars} groups={groups} composer={composer}>
  {turns}
</ChatWindow>`,
  },
  {
    id: 'messages',
    title: 'Turns and message actions',
    description:
      'The person\'s turn is a tinted bubble; the AI\'s is plain page copy with citations and an action row that fades in on hover or focus. Copy is always there; Read aloud, the thumbs and More options appear when you pass their handlers. A streaming answer has no action row.',
    render: () => <MessagesExample />,
    code: `<ChatMessage role="user">What would close the gap fastest?</ChatMessage>
<ChatMessage
  role="assistant"
  timestamp="2026-08-24T10:16"
  timeLabel="3 hours ago"
  citations={[{ label: 'Deal activity, last 30 days', icon: ListChecks }]}
  feedback={feedback}
  onFeedbackChange={setFeedback}
  readAloud={reading}
  onReadAloud={toggleReading}
  onRetry={retry}
  onShare={share}
  onReport={report}
>
  <p>Fastest lever is the two stalled proposals. Beyond that:</p>
  <ul>
    <li>Re-engage the 4 opportunities that went quiet after a demo</li>
  </ul>
</ChatMessage>
<ChatMessage role="assistant" streaming>
  <p>Still arriving: the action row is gone until it finishes</p>
</ChatMessage>`,
  },
];

export const props: DocsProp[] = [
  { name: 'ChatWindow: open', options: 'boolean', default: '—', required: true, description: 'Whether the window is open. It folds open from `origin` and closed back to it.' },
  { name: 'ChatWindow: onClose', options: '() => void', default: '—', required: true, description: 'Called on a press on the veil or Escape. Set `open` to `false` in response. There is no close button.' },
  { name: 'ChatWindow: origin', options: 'RefObject<HTMLElement | null>', default: 'none', description: 'The floating Prompt input bar that opens the window, so it folds out of it and back into it. Without one the window just appears.' },
  { name: 'ChatWindow: title / description', options: 'string', default: '— / none', required: true, description: 'The conversation\'s title (names the dialog) and the caption under it.' },
  { name: 'ChatWindow: pillars', options: '{ value, label }[]', default: '—', required: true, description: 'What the rail can filter by. "All" is added first; a pillar with no conversations is disabled.' },
  { name: 'ChatWindow: groups', options: '{ label, conversations: { id, title, pillar }[] }[]', default: '—', required: true, description: 'The conversations under recency headings, newest first.' },
  { name: 'ChatWindow: activeConversationId', options: 'string', default: 'none', description: 'The open conversation\'s `id`.' },
  { name: 'ChatWindow: onConversationSelect / onNewChat', options: '(id) => void / () => void', default: '—', description: 'Called when a conversation is chosen, and when New chat is pressed.' },
  { name: 'ChatWindow: composer', options: 'PromptInputBar props', default: '—', required: true, description: 'The inline bar\'s props (`models`, `placeholder`, `working`, `onStop`, `onSend`, …). Everything only the floating bar uses is left out.' },
  { name: 'ChatWindow: children', options: 'ChatMessage[]', default: '—', required: true, description: 'The turns, oldest first.' },
  { name: 'ChatMessage: role', options: "'user' | 'assistant'", default: '—', required: true, description: 'Whose turn it is. Assistant turns take everything below.' },
  { name: 'ChatMessage: citations', options: '{ label, icon? }[]', default: 'none', description: 'Sources, shown as neutral badges under the answer.' },
  { name: 'ChatMessage: streaming', options: 'boolean', default: 'false', description: 'The answer is still arriving. The action row is removed until it is `false`.' },
  { name: 'ChatMessage: timestamp / timeLabel', options: 'string', default: 'none', description: 'An ISO date-time and the short text beside the actions ("3 hours ago"). The full date and time is the `title`.' },
  { name: 'ChatMessage: feedback / defaultFeedback / onFeedbackChange', options: "'up' | 'down' | null", default: 'null', description: 'The thumbs. Pressing the one that is on clears it. Without `onFeedbackChange` the thumbs are not shown.' },
  { name: 'ChatMessage: readAloud / onReadAloud', options: "'idle' | 'loading' | 'playing' · () => void", default: "'idle'", description: 'Where reading aloud is, and the press. Without `onReadAloud` the button is not shown. Only one message should read at a time: you own that.' },
  { name: 'ChatMessage: onCopied', options: '(text: string) => void', default: '—', description: 'Called after Copy has copied the answer. Copy is always shown.' },
  { name: 'ChatMessage: onRetry / onShare / onReport', options: '() => void', default: '—', description: 'Each adds that row to the More options menu. With none, More options is not shown.' },
];

export const rules: DocsRules = {
  do: [
    'Open the window from the floating Prompt input bar, and pass the bar as `origin` so it folds out of it.',
    'Set the bar\'s `launched` to `open`, and open from `onLaunch`, never from focus.',
    'Keep the AI\'s turn as plain page copy, and the person\'s as the tinted bubble.',
    'Add a turn at the end and the thread follows it while the person is at the bottom.',
    'Set `streaming` on an answer while it arrives, and `working` on the composer, so Send becomes Stop.',
    'Reuse the neutral Badge for citations and the real Filter Chip for pillars.',
  ],
  dont: [
    'Don\'t add a close button: the veil and Escape already close it.',
    'Don\'t put anything but `ChatMessage` turns in the thread.',
    'Don\'t give the AI\'s turn a fill, a border or an avatar mark: the alignment and the fill already say who is speaking.',
    'Don\'t put a Tag\'s dot on a citation: it signals ownership, not context.',
    'Don\'t close the rail drawer on a pillar chip: a filter is a refinement, not a destination.',
    'Don\'t show a chat window inline in a page: it is a modal surface.',
  ],
};

export const accessibility: DocsAccessibility = {
  keyboard: [
    { keys: 'Enter (in the floating bar)', action: 'Opens the window. Focus moves to the composer.' },
    { keys: 'Tab / Shift+Tab', action: 'Moves through the window and wraps from last to first: it never reaches the page behind.' },
    { keys: 'Escape', action: 'Closes a menu if one is open, then the rail drawer if it is open, then the window. Focus returns to what opened it.' },
    { keys: 'Arrow keys (pillar chips)', action: 'Move between the enabled pillars and choose; Home and End jump.' },
    { keys: 'Arrow keys (More options menu)', action: 'Move between the menu rows; Enter chooses; Tab leaves the menu.' },
    { keys: 'End / Home (in the thread)', action: 'The thread is a native scroll container, so these work as they do anywhere.' },
  ],
  notes: [
    'The shell is `role="dialog"` with `aria-modal` and is named by the title. The rail is `aside` named "Conversations".',
    'Opening focuses the composer; closing returns focus to whatever opened the window, or to the floating bar.',
    'On a narrow window the rail drawer is `inert` while closed, so its rows are not reachable off-screen. The toggle is `aria-expanded` and swaps its name between "Open conversations" and "Close conversations".',
    'Jump to present is hidden with `visibility`, not only opacity, so it leaves the tab order while the reader is at the bottom. When content arrives while the reader is away, "New response below" is announced once per time they scroll away, not per token.',
    'Copy announces "Copied to clipboard" in a polite status node. The message action row is a group named "Message actions".',
    'Read aloud and the thumbs use `aria-pressed`; each action button has an `aria-label`.',
    'A streaming answer has no action row at all (not just hidden by opacity), so nothing in it can be tabbed to or copied half-done.',
    'The conversations are a group of plain buttons, and the open one carries `aria-current`. Every row is a tab stop (no `listbox` role, which would promise arrow keys).',
    'With reduced motion the fold and the fades are removed and the window appears at once. Jump to present keeps its fade but drops the 8px travel, and scrolls instantly.',
    'In forced-colours mode the window and the selected conversation are outlined so they keep their edges.',
  ],
};

export const motion: DocsMotion[] = [
  { interaction: 'Open', motion: 'The shell folds out of the floating bar: it scales and slides from the bar\'s rectangle, turning 10° toward the viewer, over 0.8s. The veil fades in over 480ms. The rail and thread fade in once the fold settles.', token: '--duration-base · --ease-standard' },
  { interaction: 'Close', motion: 'A shorter fold back into the bar (0.55s, its own track, not the open reversed), measured again because the page may have scrolled.', token: '—' },
  { interaction: 'Message actions', motion: 'Fade in on hover or focus. Always in flow: the row never changes height, so the thread does not jump.', token: '--duration-fast · --ease-standard' },
  { interaction: 'Jump to present, rail drawer', motion: 'Jump to present fades and rises 8px. The rail drawer slides in from the left over the scrim. Both drop their travel under reduced motion.', token: '--duration-base · --ease-settle · --ease-standard' },
];
