// Documentation for Notes, rendered by the docs site (playground).
// Keep it consistent with Notes.usage.md. Not part of the package build.
import { useState } from 'react';
import { Notes, type Note } from './Notes';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../docs.types';

export const title = 'Notes';

export const description =
  'Coloured notes pinned to one record (a table or list row), up to four. A pin, or a stack of 2 to 4, with an add button. Hover shows a peek; a click opens a panel anchored to the row, where notes are read, written, edited, resolved and deleted. No modal.';

export const usage = `import { Notes } from '@collabrium/ui';

<Notes
  record="Celcom Axiata"
  notes={notes}
  currentUser={{ name: 'Nadia Rahim' }}
  onAdd={text => add(text)}
  onEdit={(id, text) => edit(id, text)}
  onDelete={id => remove(id)}
  onResolve={id => resolve(id)}
  onReopen={id => reopen(id)}
/>`;

const ME = { name: 'Nadia Rahim' };
const today = () => new Date().toISOString().slice(0, 10);

const SEED: Record<string, Note[]> = {
  joy: [{ id: 'j1', text: 'Waiting on the signed IO before we book the slots.', author: 'Arif Hakim', date: '2026-08-27' }],
  celcom: [
    { id: 'c1', text: 'Budget moved up by RM120k after the Q3 review.', author: 'Nadia Rahim', date: '2026-08-28' },
    { id: 'c2', text: 'Creative swap approved: the new 30s cut replaces the 15s from week 2.', author: 'Wei Lin Tan', date: '2026-09-03', resolved: { by: 'Nadia Rahim', date: '2026-09-05' } },
  ],
  grab: [
    { id: 'g1', text: 'PO received. Finance has it queued for the 5th.', author: 'Arif Hakim', date: '2026-08-27' },
    { id: 'g2', text: 'Talent clearance came back fine for all three leads.', author: 'Nadia Rahim', date: '2026-08-30' },
    { id: 'g3', text: 'Added bonus spots on the weekend belt as make-good.', author: 'Wei Lin Tan', date: '2026-09-01' },
    { id: 'g4', text: 'Client asked to hold week 4 until the microdrama edit is locked.', author: 'Arif Hakim', date: '2026-09-04' },
  ],
  astro: [],
};
const NAMES: Record<string, string> = { joy: 'Joy Ahmad', celcom: 'Celcom Axiata', grab: 'GRABCAR SDN BHD', astro: 'Astro Malaysia' };

function useNotes(seed: Note[]) {
  const [notes, setNotes] = useState(seed);
  return {
    notes,
    onAdd: (text: string) => setNotes((n) => [...n, { id: `n${Date.now()}`, text, author: ME.name, date: today() }]),
    onEdit: (id: string, text: string) => setNotes((n) => n.map((x) => (x.id === id ? { ...x, text } : x))),
    onDelete: (id: string) => setNotes((n) => n.filter((x) => x.id !== id)),
    onResolve: (id: string) => setNotes((n) => n.map((x) => (x.id === id ? { ...x, resolved: { by: ME.name, date: today() } } : x))),
    onReopen: (id: string) => setNotes((n) => n.map((x) => (x.id === id ? { ...x, resolved: undefined } : x))),
  };
}

function Row({ k }: { k: string }) {
  const n = useNotes(SEED[k]);
  return (
    <div className="docs-notes-row">
      <span className="docs-notes-name">{NAMES[k]}</span>
      <Notes record={NAMES[k]} currentUser={ME} {...n} />
    </div>
  );
}

export const thumbnail = () => (
  <div className="docs-notes-thumb">
    <Notes record="GRABCAR SDN BHD" notes={SEED.grab} currentUser={ME} onAdd={() => {}} onEdit={() => {}} onDelete={() => {}} onResolve={() => {}} onReopen={() => {}} />
  </div>
);

export const anatomy: DocsAnatomyNode[] = [
  {
    name: 'Notes',
    element: '<span>.cui-notes',
    description: 'The cell: the pin or stack, then the add button, 4px apart.',
    children: [
      { name: 'Pin', element: 'button.cui-notes__pin', when: '1 note', description: '48.94 × 54.83, radius-sm, the note\'s colour, a 16px Fill push-pin in a darker ink; tilted 2°. Hover lifts it 1px on shadow-2.' },
      { name: 'Stack', element: 'button.cui-notes__stack', when: '2–4 notes', description: '42 × 48 cards stepping 16px (58, 74, 90px wide), one card tall, tilted ±12° alternately; straight on hover or focus.' },
      { name: 'Add button', element: 'button.cui-notes__add', description: '32px, a Plus. At every count; at four it greys out and its tooltip says why.' },
      { name: 'Peek', element: '.cui-notes__peek', when: 'hover or focus', description: 'A Card listing the notes: a 28 × 32 pin, the text in two lines, author · date. Never takes the pointer.' },
      {
        name: 'Panel',
        element: '[role=dialog].cui-notes__panel',
        when: 'open',
        description: '340px, radius-lg, shadow-3, anchored to the row and grown out of its pin. Closes on Escape, an outside click or scroll.',
        children: [
          { name: 'Grid', element: '.cui-notes__grid', when: '2+ notes', description: '"Pinned notes", NOTES · MONTH, the record, then a 2 × 2 grid of note cards (text in three lines); Add a note.' },
          { name: 'Note', element: '[data-tinted]', when: 'one note', description: 'The note\'s colour as the fill: who wrote it, NOTE · MONTH, the record, the text, the date; delete, Resolve (or Reopen), Edit.' },
          { name: 'Field', element: 'textarea.cui-notes__field', when: 'edit, new', description: 'No box: the note being written on, 280 characters; Cancel and Save.' },
        ],
      },
    ],
  },
];

export const examples: DocsExample[] = [
  {
    id: 'rows',
    title: 'On a list of records',
    description: 'One note, two (one resolved), four (full) and none. Hover a pin for the peek; click it for the panel. Open a card in the grid to read it, then Resolve, Edit or delete; the add button writes a new one. At four notes the add buttons grey out and say why.',
    render: () => (
      <div className="docs-notes-list">
        {['joy', 'celcom', 'grab', 'astro'].map((k) => (
          <Row key={k} k={k} />
        ))}
      </div>
    ),
    code: `const [notes, setNotes] = useState<Note[]>(initial);

<Notes
  record="Celcom Axiata"
  notes={notes}
  currentUser={{ name: 'Nadia Rahim' }}
  onAdd={text => setNotes(n => [...n, { id: newId(), text, author: 'Nadia Rahim', date: today() }])}
  onEdit={(id, text) => setNotes(n => n.map(x => (x.id === id ? { ...x, text } : x)))}
  onDelete={id => setNotes(n => n.filter(x => x.id !== id))}
  onResolve={id => setNotes(n => n.map(x => (x.id === id ? { ...x, resolved: { by: 'Nadia Rahim', date: today() } } : x)))}
  onReopen={id => setNotes(n => n.map(x => (x.id === id ? { ...x, resolved: undefined } : x)))}
/>`,
  },
];

export const props: DocsProp[] = [
  { name: 'record', options: 'string', default: '—', required: true, description: 'The record\'s name: the panel\'s title and every control\'s label ("Add a note to Celcom Axiata").' },
  { name: 'notes', options: '{ id, text, author, date, resolved? }[]', default: '—', required: true, description: 'In order; position sets colour (orange, pink, green, navy). `date` is `YYYY-MM-DD`; `resolved` is `{ by, date }`. Only the first four show.' },
  { name: 'currentUser', options: '{ name, initials? }', default: '—', required: true, description: 'Who is writing, shown on a new note.' },
  { name: 'onAdd, onEdit', options: '(text) => void, (id, text) => void', default: '—', required: true, description: 'Save a new note, or an edited one. The page updates `notes`.' },
  { name: 'onDelete', options: '(id) => void', default: '—', required: true, description: 'Deletes a note; the ones after it shift up a colour.' },
  { name: 'onResolve, onReopen', options: '(id) => void', default: '—', required: true, description: 'Settle a note or reopen it (the page sets or clears `resolved`). A resolved note keeps its slot.' },
  { name: 'id, aria-*, data-*', options: 'native', default: '—', description: 'Passed to the root `<span>`. `style` and `className` are not accepted. The ref is forwarded to it.' },
];

export const rules: DocsRules = {
  do: [
    'Let position set the colour.',
    'Keep the add button at every count, one included.',
    'Treat Resolve as settled, not deleted: it keeps its slot.',
    'Size the column for 90px, the widest a stack gets.',
  ],
  dont: [
    'Don\'t add a colour picker, a fifth colour or a fifth note.',
    'Don\'t open notes in a modal: the panel stays anchored to its row.',
    'Don\'t treat Resolve as a soft delete.',
  ],
};

export const accessibility: DocsAccessibility = {
  keyboard: [
    { keys: 'Tab', action: 'To the pin (its peek shows) and the add button; inside the panel, round its controls only.' },
    { keys: 'Enter / Space', action: 'Opens the panel (focus moves to it); in the panel, opens a card or runs an action.' },
    { keys: 'Escape', action: 'Closes the panel; focus returns to the pin.' },
  ],
  notes: [
    'Every control is a real button with `aria-haspopup="dialog"` and `aria-expanded`; glyphs are hidden, so meaning lives in the labels ("4 notes on GRABCAR SDN BHD, open the stack"; "Resolved note by Wei Lin Tan, 3 Sept 2026. Open it").',
    'The panel is a dialog named for what it shows; focus stays in it while open. Edit and a new note put the caret in the field.',
    'While the panel is open its pin is hidden by opacity only, so it stays in the tab order and focus can return to it.',
    'At four notes the add buttons stay focusable (`aria-disabled`) with the reason on a tooltip.',
    '⚠️ Recorded contrast decisions (the DS\'s): the pin glyphs are 1.66–2.26:1 on their fills, white text on orange and pink is 3.15 and 2.49:1, and on a resolved card 1.83–2.67:1.',
  ],
};

export const motion: DocsMotion[] = [
  { interaction: 'Panel opens', motion: 'Grows out of the pin it came from and fades in.', token: '--duration-morph · --ease-morph' },
  { interaction: 'Stack hover or focus', motion: 'The cards straighten.', token: '--duration-base · --ease-settle' },
  { interaction: 'Pin hover', motion: 'Lifts 1px on shadow-2.', token: '--duration-fast · --ease-standard' },
  { interaction: 'Peek', motion: 'Fades in.', token: '--duration-fast · --ease-standard' },
  { interaction: 'Reduced motion', motion: 'The panel appears without growing.', token: '—' },
];
