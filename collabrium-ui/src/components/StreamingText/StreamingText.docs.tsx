// Documentation for StreamingText, rendered by the docs site (playground).
// Keep it consistent with StreamingText.usage.md. Not part of the package build.
import { useEffect, useRef, useState } from 'react';
import { ArrowClockwise, Stop } from '@phosphor-icons/react';
import { Button } from '../Button';
import { StreamingText } from './StreamingText';
import { ChatMessage } from '../ChatWindow/ChatMessage';
import type { StreamingSegment, StreamingSource, StreamingStatus } from './StreamingText';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../docs.types';

export const title = 'Streaming Text';

/** Listed under the AI Native overview, not on its own in the sidebar. */
export const group = 'AI Native';

export const description =
  'The model\'s own prose arriving word by word, with a citation landing in the sentence. Once the last word settles the action row, sources and follow-ups appear.';

export const usage = `import { StreamingText } from '@collabrium/ui';

export function Answer({ content, done }: { content: string[]; done: boolean }) {
  return <StreamingText content={content} status={done ? 'done' : 'streaming'} />;
}`;

const forecastly: StreamingSource = { name: 'Forecastly', domain: 'forecastly.io', href: 'https://forecastly.io', color: '#2f6fec' };
const pipeline: StreamingSource = { name: 'Pipeline Metrics', domain: 'pipelinemetrics.com', href: 'https://pipelinemetrics.com', color: '#e56d24' };
const revops: StreamingSource = { name: 'RevOps Weekly', domain: 'revopsweekly.com', href: 'https://revopsweekly.com', color: '#1f7a5f' };
const SOURCES = [forecastly, pipeline, revops];

const ANSWER: StreamingSegment[] = [
  "Northwind Retail's renewal risk is high: the Q3 proposal has stalled for three weeks, and the contract lapses before December. ",
  { citation: forecastly },
  ' Two other Enterprise-tier accounts are trending the same way this quarter.',
];
const FOLLOW_UPS = ['Which accounts are trending the same way', 'Compare Q3 and Q4 renewal risk'];

export const thumbnail = () => (
  <StreamingText
    content={['Northwind Retail\'s renewal risk is high: the proposal has stalled for three weeks and the contract lapses before December.']}
    status="done"
  />
);

export const anatomy: DocsAnatomyNode[] = [
  {
    name: 'Streaming Text',
    element: 'div.cui-streaming',
    description: 'Flex column, 420px wide at most (it fills a wider chat column). No reserved height: words are appended, so nothing already read moves.',
    children: [
      {
        name: 'Text',
        element: 'p.cui-streaming__text',
        description: 'Body1 at line-height 1.65, Neutral-9. Words are real text, appended one at a time. aria-busy while streaming.',
        children: [
          { name: 'Caret', element: 'span.cui-streaming__caret', when: 'while streaming', description: '2px bar in Neutral-9, blinking at 500ms. Removed the instant the last word lands, never faded.' },
          {
            name: 'Citation',
            element: 'a.cui-streaming__cite',
            when: 'with a citation',
            description: 'An inline chip, 18px high: a coloured avatar and the domain. Lands in the sentence as a token like any other.',
          },
        ],
      },
      { name: 'Announcement', element: 'span.cui-streaming__announce', description: 'Visually hidden. role="status", polite. Says "Response ready." or "Response stopped." once.' },
      { name: 'Failure line', element: 'div.cui-streaming__failure', when: 'when failed', description: 'A Red status glyph (Phosphor WarningCircle, Fill), "Couldn\'t finish this response" in Caption Neutral-5 (not red text), and a Secondary small Retry button beside it when `onRetry` is set.' },
      { name: 'Note', element: 'div.cui-streaming__note', when: 'when stopped', description: '"Stopped early", Caption, Neutral-5, above the actions.' },
      {
        name: 'Actions',
        element: 'div.cui-streaming__actions',
        when: 'once settled or stopped',
        description: 'Not rendered during the stream. Round 28px icon buttons, 2px apart.',
        children: [
          { name: 'Copy', element: 'button.cui-streaming__action', description: 'Always there. Swaps to a green check for 1.6 seconds.' },
          { name: 'Retry', element: 'button.cui-streaming__action', when: 'with onRetry', description: 'Phosphor ArrowClockwise.' },
          { name: 'Thumbs', element: 'button.cui-streaming__action', when: 'with onFeedback', description: 'Good and bad response. aria-pressed; the pressed one is filled.' },
          { name: 'Sources button', element: 'button.cui-streaming__sources-trigger', when: 'with sources', description: 'Overlapping avatar stack (up to three) and a count. aria-expanded.' },
        ],
      },
      { name: 'Sources list', element: 'div.cui-streaming__sources', when: 'with sources', description: 'Opens by animating grid rows from 0fr to 1fr. A Neutral-3 panel of link rows: avatar, name, domain. Inert while closed.' },
      {
        name: 'Follow-ups',
        element: 'div.cui-streaming__followups',
        when: 'once settled, with followUps',
        description: 'A "Follow-ups" label and a list of prompt buttons, each with a bent arrow. Never on a stopped answer.',
      },
    ],
  },
];

// The docs stand in for a model: this feeds text in lumpy pieces on a timer.
// A real product passes whatever its stream delivers.
const LIVE_CHUNKS: StreamingSegment[] = [
  "Northwind Retail's renewal risk is high: ",
  'the Q3 proposal has stalled for three weeks, ',
  'and the contract lapses before December. ',
  { citation: forecastly },
  ' Two other Enterprise-tier accounts ',
  'are trending the same way this quarter.',
];
const CHUNK_DELAYS = [250, 700, 300, 1100, 200, 600];

function LiveStreamExample() {
  const [run, setRun] = useState(0);
  const [content, setContent] = useState<StreamingSegment[]>([]);
  const [status, setStatus] = useState<StreamingStatus>('streaming');
  const timers = useRef<number[]>([]);

  useEffect(() => {
    let at = 0;
    timers.current = LIVE_CHUNKS.map((chunk, i) => {
      at += CHUNK_DELAYS[i];
      return window.setTimeout(() => {
        setContent(c => [...c, chunk]);
        if (i === LIVE_CHUNKS.length - 1) setStatus('done');
      }, at);
    });
    return () => timers.current.forEach(window.clearTimeout);
  }, [run]);

  const stop = () => {
    timers.current.forEach(window.clearTimeout);
    setStatus('stopped');
  };

  // A new stream is a new instance: reset the content and status in the same
  // update as the new key, so it mounts empty and streaming.
  const restart = () => {
    setContent([]);
    setStatus('streaming');
    setRun(r => r + 1);
  };

  return (
    <div className="docs-stack">
      <StreamingText
        key={run}
        content={content}
        status={status}
        sources={SOURCES}
        followUps={FOLLOW_UPS}
        onRetry={restart}
        onFeedback={() => {}}
      />
      <div className="docs-row">
        <Button
          variant="ghost"
          size="sm"
          leadingIcon={status === 'streaming' ? Stop : ArrowClockwise}
          onClick={status === 'streaming' ? stop : restart}
        >
          {status === 'streaming' ? 'Stop' : 'Replay'}
        </Button>
      </div>
    </div>
  );
}

function InChatExample() {
  const [run, setRun] = useState(0);
  const [content, setContent] = useState<StreamingSegment[]>([]);
  const [status, setStatus] = useState<StreamingStatus>('streaming');
  const timers = useRef<number[]>([]);

  useEffect(() => {
    let at = 0;
    timers.current = LIVE_CHUNKS.map((chunk, i) => {
      at += CHUNK_DELAYS[i];
      return window.setTimeout(() => {
        setContent(c => [...c, chunk]);
        if (i === LIVE_CHUNKS.length - 1) setStatus('done');
      }, at);
    });
    return () => timers.current.forEach(window.clearTimeout);
  }, [run]);

  const restart = () => {
    setContent([]);
    setStatus('streaming');
    setRun(r => r + 1);
  };

  return (
    <div style={{ maxWidth: 560 }} className="docs-stack">
      <ChatMessage
        key={run}
        role="assistant"
        streaming={status === 'streaming'}
        timestamp="2026-08-24T10:21"
        timeLabel="Just now"
        onFeedbackChange={() => {}}
        onRetry={restart}
      >
        <StreamingText content={content} status={status} actions={false} followUps={FOLLOW_UPS} />
      </ChatMessage>
      <div className="docs-row">
        <Button variant="ghost" size="sm" leadingIcon={ArrowClockwise} onClick={restart}>
          Replay
        </Button>
      </div>
    </div>
  );
}

export const examples: DocsExample[] = [
  {
    id: 'live',
    title: 'A live stream',
    description:
      'Text arrives in uneven pieces and is released a word at a time. The caret blinks, then the actions, the sources and the follow-ups appear once the last word lands. Stop keeps what is on screen. This page feeds the text from a timer to stand in for a model; do the same only in a demo.',
    render: () => <LiveStreamExample />,
    code: `const [content, setContent] = useState<StreamingSegment[]>([]);
const [status, setStatus] = useState<StreamingStatus>('streaming');

// Append each piece the model sends; set 'done' when the stream ends.

<StreamingText
  content={content}
  status={status}
  sources={sources}
  followUps={['Which accounts are trending the same way']}
  onRetry={retry}
  onFeedback={sendFeedback}
/>`,
  },
  {
    id: 'settled',
    title: 'A finished message',
    description:
      'A message that is already finished when it first renders (a saved conversation) appears whole, with no reveal and no entrance animation. Here with a citation, sources and every action.',
    render: () => (
      <StreamingText
        content={ANSWER}
        status="done"
        sources={SOURCES}
        followUps={FOLLOW_UPS}
        onRetry={() => {}}
        onFeedback={() => {}}
      />
    ),
    code: `<StreamingText
  content={[
    "Northwind Retail's renewal risk is high: the Q3 proposal has stalled for three weeks, and the contract lapses before December. ",
    { citation: { name: 'Forecastly', domain: 'forecastly.io', href: 'https://forecastly.io', color: '#2f6fec' } },
    ' Two other Enterprise-tier accounts are trending the same way this quarter.',
  ]}
  status="done"
  sources={sources}
  followUps={['Which accounts are trending the same way', 'Compare Q3 and Q4 renewal risk']}
  onRetry={retry}
  onFeedback={sendFeedback}
/>`,
  },
  {
    id: 'stopped',
    title: 'A stopped answer',
    description:
      'The reader stopped the stream. The text that arrived stays, marked "Stopped early", and the action row becomes available on it. There are no follow-ups: they belong to a complete answer.',
    render: () => (
      <StreamingText
        content={["Northwind Retail's renewal risk is high: the Q3 proposal has stalled for three weeks, and the "]}
        status="stopped"
        followUps={FOLLOW_UPS}
        onRetry={() => {}}
      />
    ),
    code: `<StreamingText
  content={["Northwind Retail's renewal risk is high: the Q3 proposal has stalled for three weeks, and the "]}
  status="stopped"
  followUps={['Which accounts are trending the same way']}
  onRetry={retry}
/>`,
  },
  {
    id: 'failed',
    title: 'A failed stream',
    description:
      'When the stream breaks, the text that arrived stays and is not erased. An error line says it could not finish and a Retry sits beside it. The action row stays so the partial text can still be copied; there are no follow-ups. Retrying is yours: start a new instance with a new `key`.',
    render: () => (
      <StreamingText
        content={["Northwind Retail's renewal risk is high: the Q3 proposal has stalled for three weeks, and the "]}
        status="failed"
        onRetry={() => {}}
      />
    ),
    code: `<StreamingText
  content={["Northwind Retail's renewal risk is high: the Q3 proposal has stalled for three weeks, and the "]}
  status="failed"
  onRetry={retry}
/>`,
  },
  {
    id: 'in-chat',
    title: 'Inside a chat message',
    description:
      'In a Chat window the message brings the one action row of the chat, so set `actions={false}`: this component\'s own row and sources list stay out, and the chat\'s row appears when the stream ends (set the message\'s `streaming` while `status` is `streaming`). Follow-ups still arrive.',
    render: () => <InChatExample />,
    code: `<ChatMessage role="assistant" streaming={status === 'streaming'} timestamp={timestamp} onFeedbackChange={sendFeedback} onRetry={retry}>
  <StreamingText content={content} status={status} actions={false} followUps={followUps} />
</ChatMessage>`,
  },
  {
    id: 'minimal',
    title: 'Just the text',
    description: 'With no sources, follow-ups, retry or feedback, a settled message has only a Copy button.',
    render: () => <StreamingText content={['The renewal is due on 12 December.']} status="done" />,
    code: `<StreamingText content={['The renewal is due on 12 December.']} status="done" />`,
  },
];

export const props: DocsProp[] = [
  { name: 'actions', options: 'boolean', default: 'true', description: 'Shows the action row and the sources list. `false` inside a Chat window\'s `ChatMessage`, which brings the chat\'s own row and shows sources as citations.' },
  { name: 'content', options: '(string | { citation })[]', default: '—', required: true, description: 'Everything produced so far, in order. Append only. A string is prose of any length; `{ citation: { name, domain, href, color? } }` is a source chip that lands in that position. A finished message passed whole is shown whole.' },
  { name: 'status', options: "'streaming' | 'done' | 'stopped' | 'failed'", default: '—', required: true, description: '`streaming`: caret on, actions hidden. `done`: the stream ended; it settles once the last word is on screen. `stopped`: the reader stopped it; what is on screen stays, marked "Stopped early".' },
  { name: 'sources', options: '{ name, domain, href, color? }[]', default: '—', description: 'Adds a "N sources" button to the action row that opens the list. Separate from citations in `content`.' },
  { name: 'followUps', options: 'string[]', default: '—', description: 'Prompts offered once the answer has settled. Never shown on a stopped answer.' },
  { name: 'onFollowUp', options: '(prompt, index) => void', default: '—', description: 'Called when a follow-up is chosen.' },
  { name: 'onRetry', options: '() => void', default: '—', description: 'Adds a Retry button. You decide what retrying does; start a new instance (a new `key`), with `content` and `status` reset in the same update, for the new stream.' },
  { name: 'onFeedback', options: "(value: 'good' | 'bad' | null) => void", default: '—', description: 'Adds the thumbs up and down buttons. `null` when a choice is taken back.' },
  { name: 'id, aria-*, data-*, …', options: 'native', default: '—', description: 'Passed to the root `<div>`. `style` and `className` are not accepted. The ref is forwarded to the root.' },
];

export const rules: DocsRules = {
  do: [
    'Use it only for text a model is actually producing, and start it at the first token.',
    'Append to `content` as text arrives and set `status="done"` when the stream ends.',
    'Render a message that is already finished with `status="done"` from the start: it appears whole.',
    'Keep a stopped answer on screen with its actions. It is still a response.',
    'For a retry, mount a new instance (a new `key`) and reset `content` and `status` in the same update, so it starts empty and streaming.',
  ],
  dont: [
    'Don\'t animate text you already hold (cached, replayed or computed). Show it as ordinary text.',
    'Don\'t use it for text the system computed. Only generated text streams.',
    'Don\'t stream a table, code or a list word by word. Render them whole around it.',
    'Don\'t justify the text or balance its wrapping: earlier lines would move.',
    'Don\'t scroll anything from it. The thread owns scroll.',
    'Don\'t keep a loader beside text that has started to arrive.',
  ],
};

export const accessibility: DocsAccessibility = {
  keyboard: [
    { keys: 'Tab', action: 'While streaming there is nothing to reach. Once settled, moves through Copy, Retry, the thumbs, the sources button, any citation links in the text, and the follow-ups.' },
    { keys: 'Enter / Space', action: 'Activates the focused button. On the sources button it opens or closes the list.' },
  ],
  notes: [
    'The text has `aria-busy` while streaming and no live region over it: a region over text that changes every 55ms cannot be used.',
    'When the message settles a visually hidden status announces "Response ready." or "Response stopped." once, politely. A message that arrives already finished announces nothing.',
    'The action row, sources and follow-ups are not in the page while streaming, so Tab cannot reach them.',
    'Buttons are real `<button>` elements named by `aria-label`. The thumbs use `aria-pressed`. Copy is named "Copied" while its check shows.',
    'The sources button has `aria-expanded` and `aria-controls`. The list is inert while closed, so its links are not reachable.',
    'Citations and sources are real links named by their domain. The avatar letter is hidden from assistive tech.',
    'The state is never carried by colour alone: a stopped answer says "Stopped early" and a failed one says "Couldn\'t finish this response", in words.',
    'A failed answer announces "Response failed. Retry available." once, politely.',
  ],
};

export const motion: DocsMotion[] = [
  { interaction: 'Words arriving', motion: 'Appended one at a time, about 55ms apart (faster while a backlog builds). No per-word animation. Under reduced motion everything that has arrived appears at once.', token: '—' },
  { interaction: 'Caret', motion: 'Blinks every 500ms while streaming; removed the instant the last word lands. Solid under reduced motion.', token: '—' },
  { interaction: 'Citation chip, actions and follow-ups label settle', motion: 'Fade in. Removed under reduced motion. Skipped for a message that was already finished.', token: '--duration-slow · --ease-settle · --ease-standard' },
  { interaction: 'Follow-up rows', motion: 'Fade in and rise 4px, 80ms apart.', token: '--duration-slow · --ease-settle' },
  { interaction: 'Open and close the sources list', motion: 'Height grows from 0 to its content while it fades in. Instant under reduced motion.', token: '--duration-base · --ease-settle' },
  { interaction: 'Hover on a button, chip or row', motion: 'The background and text colour fade.', token: '--duration-fast · --ease-standard' },
];
