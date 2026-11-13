// Documentation for PromptInputBar, rendered by the docs site (playground).
// Keep it consistent with PromptInputBar.usage.md. Not part of the package build.
import { useRef, useState } from 'react';
import { Button } from '../Button';
import { PromptInputBar } from './PromptInputBar';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../docs.types';

export const title = 'Prompt input bar';

/** Listed under the AI Native overview, not on its own in the sidebar. */
export const group = 'AI Native';

export const description =
  'Where the person asks the AI: one text box and a toolbar (add image, attach file, more options, a model switcher, voice input, Send). A floating bar that collapses to a pill on scroll and opens the chat, and an inline composer for the chat window.';

export const usage = `import { PromptInputBar } from '@collabrium/ui';

export function Composer({ send }: { send: (text: string) => void }) {
  return (
    <PromptInputBar
      variant="inline"
      placeholder="Reply to Collabrium…"
      models={['Standard', 'Advanced']}
      onSend={send}
    />
  );
}`;

const MODELS = ['Standard', 'Advanced'];

export const thumbnail = () => (
  <div style={{ position: 'relative', width: 360, height: 130 }}>
    <PromptInputBar variant="inline" placeholder="Reply to Collabrium…" models={MODELS} />
  </div>
);

export const anatomy: DocsAnatomyNode[] = [
  {
    name: 'Prompt input bar',
    element: '<div>.cui-prompt-bar',
    description: 'The wrapper. Its variant and state are data attributes: data-variant, data-revealed, data-morphable, data-collapsed, data-launched. The floating bar is absolutely positioned at the bottom of its region.',
    children: [
      { name: 'Glow', element: 'div.cui-prompt-bar__glow', description: 'Two layers behind the surface, outer and inner: a slow gradient of the five pastel element tints. Decorative and aria-hidden.' },
      {
        name: 'Surface',
        element: 'div.cui-prompt-bar__surface',
        description: 'A 20px-radius Neutral-1 card with a deep shadow. A grid of the box row and the toolbar row; the toolbar row folds to nothing when collapsed.',
        children: [
          { name: 'AI mark', element: 'span.cui-prompt-bar__mark', when: 'floating', description: 'A round Obsidian mark with a sparkle, 32px. Appears only when collapsed. Not a control.' },
          {
            name: 'Field',
            element: 'div.cui-prompt-bar__field',
            description: 'The text box, and (floating) the typing line behind it.',
            children: [
              { name: 'Input', element: 'input.cui-prompt-bar__input', description: 'Body1, no border. Named by the `label` prop.' },
              { name: 'Typing line', element: 'div.cui-prompt-bar__ghost', when: 'floating', description: 'A span, not a placeholder: types one line, deletes it, types a second that stays. Hides when anyone types. aria-hidden.' },
              { name: 'Static hint', element: 'span.cui-prompt-bar__ghost-static', when: 'floating, reduced motion', description: 'A short fixed line shown instead of the typing.' },
            ],
          },
          {
            name: 'Toolbar',
            element: 'div.cui-prompt-bar__toolbar',
            description: 'Left: Add image, Attach file, More options. Right: the model switcher, Voice input, Send.',
            children: [
              { name: 'Icon buttons', element: 'Button', description: 'Ghost, icon-only, small; Send is Primary.' },
              { name: 'Model switcher', element: 'Button + div.cui-prompt-bar__model-menu', description: 'A Ghost button with the model\'s name and a small caret. Its menu opens upward, right-aligned, from the body.' },
            ],
          },
        ],
      },
    ],
  },
];

function FloatingExample() {
  const scroller = useRef<HTMLDivElement>(null);
  const [text, setText] = useState('');
  const [launched, setLaunched] = useState(false);
  return (
    <div className="docs-stack">
      <div style={{ position: 'relative', height: 420, borderRadius: 'var(--radius-lg)', overflow: 'hidden', background: 'var(--color-canvas-warm)' }}>
        <div ref={scroller} style={{ height: '100%', overflowY: 'auto', padding: 'var(--spacing-24)' }}>
          {Array.from({ length: 12 }, (_, i) => (
            <p key={i} style={{ margin: '0 0 var(--spacing-16)', color: 'var(--color-neutral-5)' }}>
              Page content {i + 1}. Scroll down: past 240px the bar collapses to a pill, and it expands again only when you are back near the top.
            </p>
          ))}
          <div style={{ height: 120 }} />
        </div>
        <PromptInputBar
          variant="floating"
          scrollContainer={scroller}
          models={MODELS}
          value={text}
          onValueChange={setText}
          launched={launched}
          onLaunch={() => setLaunched(true)}
        />
      </div>
      <div className="docs-row">
        <span className="docs-status">{launched ? 'The chat opened, so the bar faded out.' : 'Press the bar, or press Enter in it, to open the chat.'}</span>
        {launched && (
          <Button variant="ghost" size="sm" onClick={() => setLaunched(false)}>
            Close the chat
          </Button>
        )}
      </div>
    </div>
  );
}

function CollapsedExample() {
  const [collapsed, setCollapsed] = useState(true);
  return (
    <div className="docs-stack">
      <div style={{ position: 'relative', height: 190, borderRadius: 'var(--radius-lg)', background: 'var(--color-canvas-warm)' }}>
        <PromptInputBar variant="floating" collapsed={collapsed} models={MODELS} />
      </div>
      <div className="docs-row">
        <Button variant="secondary" size="sm" onClick={() => setCollapsed(c => !c)}>
          {collapsed ? 'Expand' : 'Collapse'}
        </Button>
      </div>
    </div>
  );
}

function WorkingExample() {
  const [working, setWorking] = useState(false);
  const [sent, setSent] = useState('');
  return (
    <div className="docs-stack" style={{ position: 'relative', maxWidth: 560 }}>
      <PromptInputBar
        variant="inline"
        placeholder={working ? 'Or reply directly' : 'Reply to Collabrium…'}
        models={MODELS}
        working={working}
        onSend={text => {
          setSent(text);
          setWorking(true);
        }}
        onStop={() => setWorking(false)}
      />
      <p className="docs-status">{working ? `Working on “${sent}”. Send is Stop.` : 'Type something and press Send.'}</p>
    </div>
  );
}

export const examples: DocsExample[] = [
  {
    id: 'floating',
    title: 'Floating bar',
    description: 'Pinned to the bottom of the region it floats over. It fades and rises in once, types its resting line into the box, and collapses to a pill when the region scrolls past 240px (back near the top, within 8px, to expand). Pressing it, or pressing Enter in it, asks the host to open the chat. It is shown here in a scrolling stage.',
    render: () => <FloatingExample />,
    code: `import { useRef, useState } from 'react';

function Floating() {
  const scroller = useRef<HTMLDivElement>(null);
  const [text, setText] = useState('');
  const [launched, setLaunched] = useState(false);
  return (
    <div style={{ position: 'relative', height: 420 }}>
      <div ref={scroller} style={{ height: '100%', overflowY: 'auto' }}>
        {/* the page content */}
      </div>
      <PromptInputBar
        variant="floating"
        scrollContainer={scroller}
        models={['Standard', 'Advanced']}
        value={text}
        onValueChange={setText}
        launched={launched}
        onLaunch={() => setLaunched(true)}
      />
    </div>
  );
}`,
  },
  {
    id: 'collapsed',
    title: 'Collapsed, and the model switcher',
    description: 'The collapsed pose: a pill with the round AI mark at its start and the resting line, and the toolbar folded away. `collapsed` sets it when you have no scroll region. Press Expand to reach the toolbar and the model switcher: the menu opens upward, closes on Escape, an outside press or a choice, and arrow keys move through it.',
    render: () => <CollapsedExample />,
    code: `const [collapsed, setCollapsed] = useState(true);

<div style={{ position: 'relative', height: 190 }}>
  <PromptInputBar variant="floating" collapsed={collapsed} models={['Standard', 'Advanced']} />
</div>
<Button variant="secondary" size="sm" onClick={() => setCollapsed(c => !c)}>{collapsed ? 'Expand' : 'Collapse'}</Button>`,
  },
  {
    id: 'inline',
    title: 'Inline composer',
    description: 'In flow, at the width of its container, for a chat window. It never collapses, has no mark or typing line (a plain hint instead), a softer glow and shadow, and a round Send. Enter sends when there is text.',
    render: () => (
      <div style={{ maxWidth: 560 }}>
        <PromptInputBar variant="inline" placeholder="Reply to Collabrium…" models={MODELS} />
      </div>
    ),
    code: `<PromptInputBar variant="inline" placeholder="Reply to Collabrium…" models={['Standard', 'Advanced']} onSend={send} />`,
  },
  {
    id: 'working',
    title: 'Send becomes Stop',
    description: 'While the AI works, or a decision card is open, set `working`: Send becomes Stop (icon and name alike). Pressing it runs `onStop`, which stops the AI\'s task, not only the bar. Put it back the moment the work ends.',
    render: () => <WorkingExample />,
    code: `<PromptInputBar
  variant="inline"
  placeholder={working ? 'Or reply directly' : 'Reply to Collabrium…'}
  models={['Standard', 'Advanced']}
  working={working}
  onSend={text => { start(text); setWorking(true); }}
  onStop={() => { stop(); setWorking(false); }}
/>`,
  },
];

export const props: DocsProp[] = [
  { name: 'variant', options: "'floating' | 'inline'", default: '—', required: true, description: '`floating`: pinned over a region, collapses on scroll, opens the chat. `inline`: in flow as a chat composer, never collapses.' },
  { name: 'models', options: 'string[]', default: '—', required: true, description: 'The models in the switcher, in order. The first is chosen to start with.' },
  { name: 'model / onModelChange', options: 'string · (model: string) => void', default: 'first model', description: 'The chosen model, for a controlled switcher, and its change handler.' },
  { name: 'value / defaultValue / onValueChange', options: 'string · (value: string) => void', default: "''", description: 'The typed text: controlled, or the starting text, and a handler for every edit.' },
  { name: 'label', options: 'string', default: "'Ask anything'", description: 'Names the text box for assistive tech. The visible hint is decorative.' },
  { name: 'placeholder', options: 'string', default: '—', description: 'Inline only: the empty box\'s hint ("Reply to Collabrium…"). The floating bar types its own lines.' },
  { name: 'onSend', options: '(value: string) => void', default: '—', description: 'Called when Send is pressed, or Enter in the inline variant with text in the box.' },
  { name: 'working / onStop', options: 'boolean · () => void', default: 'false', description: 'While `working`, Send becomes Stop and `onStop` runs on press. Stop interrupts the AI\'s task.' },
  { name: 'onLaunch', options: '() => void', default: '—', description: 'Floating only. Called when the card or pill is pressed, or Enter is pressed in the box. Open the chat.' },
  { name: 'launched', options: 'boolean', default: 'false', description: 'Floating only. The chat is open: the bar fades out and stops taking presses.' },
  { name: 'scrollContainer', options: 'RefObject<HTMLElement>', default: '—', description: 'Floating only. The scrolling region it floats over. It collapses past 240px and expands within 8px of the top.' },
  { name: 'collapsed', options: 'boolean', default: 'false', description: 'Floating only. Forces the pill, when there is no `scrollContainer`.' },
  { name: 'parkShift / pushShift', options: 'number (px)', default: '0', description: 'Floating only. Sideways measured offsets: where the collapsed pill parks beside a dock, and how far a side panel pushes the bar. Measure them; never hard-code.' },
  { name: 'typingLines', options: '[string, string]', default: 'the two DESIGN-SYSTEM.md lines', description: 'Floating only. The one-time typing: the first is typed and deleted, the second stays.' },
  { name: 'staticHint', options: 'string', default: "'Ask me anything'", description: 'Floating only. The fixed line shown instead of the typing under reduced motion.' },
  { name: 'onAddImage, onAttachFile, onMoreOptions, onVoiceInput', options: '() => void', default: '—', description: 'What the four toolbar buttons do.' },
  { name: 'id, aria-*, data-*, …', options: 'native', default: '—', description: 'Passed to the wrapper `<div>`. `style` and `className` are not accepted. The ref is forwarded to it.' },
];

export const rules: DocsRules = {
  do: [
    'Keep the toolbar\'s buttons as real Buttons: Ghost for Add image, Attach file, More options and Voice input, and Primary for Send.',
    'Measure `parkShift` and `pushShift` from real layout and re-measure when it changes.',
    'Let the typing line run once and stop on its resting line.',
    'Left-align the typing line, where typed text lands.',
    'Keep the shrink on mobile (the toolbar folds away) but drop the parking and the pill.',
    'Swap Send to Stop while the AI works or a decision card is open, and back as soon as it ends.',
  ],
  dont: [
    'Don\'t put a scroll-collapse, an AI mark or the typing line on the inline composer.',
    'Don\'t let the typing line loop, or centre it.',
    'Don\'t open the chat from focus: the chat hands focus back here when it closes, and would reopen at once.',
    'Don\'t draw a popover inside the bar with absolute positioning: its folded row clips it.',
    'Don\'t hard-code the parking or push offsets.',
  ],
};

export const accessibility: DocsAccessibility = {
  keyboard: [
    { keys: 'Tab', action: 'Moves through the text box, Add image, Attach file, More options, the model switcher, Voice input and Send. A 2px Obsidian ring shows on each button.' },
    { keys: 'Enter', action: 'In the floating bar, asks the host to open the chat. In the inline composer, sends when there is text.' },
    { keys: 'Enter / Space, then arrow keys', action: 'On the model switcher: opens the menu, arrows move through the models, Enter chooses, Escape closes and returns focus to the switcher.' },
  ],
  notes: [
    'The text box is a real `<input>` named by the `label` prop. The typing line and the static hint are decorative and `aria-hidden`; they are not announced.',
    'Every icon-only button has a name: "Add image", "Attach file", "More options", "Voice input", "Send" (or "Stop").',
    'The model switcher is a button with `aria-haspopup="listbox"` and `aria-expanded`; its menu is a `role="listbox"` with a `role="option"` per model and the chosen one `aria-selected`.',
    'The AI mark and the glow are decorative. The mark is not a control.',
    'Reduced motion drops the glow\'s movement and the morph, and shows a short fixed line instead of the typing.',
    'There is no live region.',
  ],
};

export const motion: DocsMotion[] = [
  { interaction: 'The floating bar arrives', motion: 'Fades in and rises 16px, 1150ms after it mounts, so it lands after the rest of the screen.', token: '--duration-reveal · --ease-reveal' },
  { interaction: 'Collapse and expand', motion: 'The bar narrows, parks, becomes a pill and folds its toolbar away; the mark scales in. One timing for everything that moves.', token: '--duration-morph · --ease-morph' },
  { interaction: 'The typing line', motion: 'Types a line, pulses the caret for 5 seconds, deletes it, types the second line and stops. Jumps to the second line if the bar collapses, and pauses while the box is focused.', token: '--duration-blink' },
  { interaction: 'The glow', motion: 'A pastel gradient drifts around the edge, on a 4 second loop.', token: '—' },
  { interaction: 'Reduced motion', motion: 'The glow stops, the poses stay and only the travel between them goes, and a short fixed line replaces the typing.', token: '—' },
];
