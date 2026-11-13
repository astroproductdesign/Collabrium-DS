// Documentation for Compare modal, rendered by the docs site (playground).
// Keep it consistent with CompareModal.usage.md. Not part of the package build.
import { useRef, useState } from 'react';
import { Columns } from '@phosphor-icons/react';
import { CompareModal, CompareModalPanel } from './CompareModal';
import { ActionBar } from '../ActionBar';
import { CardGrid } from '../Card';
import { MediaAdCard } from '../MediaAdCard';
import { sampleFormats } from '../MediaAdModal/MediaAdModal.docs';
import type { MediaAdFormat } from '../MediaAdModal/MediaAdModal';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../docs.types';

export const title = 'Compare modal';

export const group = 'Modals';

export const description =
  'Two to four ad formats side by side: one column per format, one row per fact (always nine), the highest published benchmark marked, then export and "Send to a media plan". Opened from the Action bar\'s Compare. A variant of Modal on Media Ad Modal\'s layer.';

export const usage = `import { ActionBar, CompareModal, MediaAdCard } from '@collabrium/ui';

const [comparing, setComparing] = useState(false);
const picked = formats.filter(f => picks.includes(f.id));

<ActionBar
  variant="picks"
  aria-label="Formats to compare"
  open={picks.length > 0}
  picks={picked.map(f => ({ id: f.id, name: f.name }))}
  onRemovePick={id => unpick(id)}
  title={\`\${picks.length} formats selected\`}
  description={picks.length < 2 ? 'Minimum 2 formats.' : 'Maximum 4 formats.'}
  dismiss={{ label: 'Clear', hiddenLabel: ' all picks', onClick: clear }}
  primary={{ label: 'Compare', icon: Columns, onClick: () => setComparing(true), disabled: picks.length < 2 }}
  fallbackFocusRef={heading}
/>

<CompareModal
  open={comparing}
  onClose={() => setComparing(false)}
  formats={picked}
  onExportPdf={exportPdf}
  onExportExcel={exportExcel}
  onPlan={() => router.push(\`/plans/new?formats=\${picks.join(',')}\`)}
  returnFallback={heading}
  keepLive={[toastHost]}
/>`;

const noop = () => {};
const byId = (id: string) => sampleFormats.find(f => f.id === id)!;

function Catalogue() {
  const heading = useRef<HTMLHeadingElement>(null);
  const [picks, setPicks] = useState<string[]>(['swipe-gallery', 'scratch-win']);
  const [comparing, setComparing] = useState(false);
  const toggle = (id: string, on: boolean) =>
    setPicks(prev => (on ? (prev.length < 4 && !prev.includes(id) ? [...prev, id] : prev) : prev.filter(p => p !== id)));
  const picked = picks.map(byId);
  return (
    <div className="docs-compare-demo">
      <h3 ref={heading} tabIndex={-1} className="docs-compare-demo__title">
        Ad formats
      </h3>
      <CardGrid columns="functional">
        {sampleFormats.map(f => (
          <MediaAdCard
            key={f.id}
            name={f.name}
            family={f.family}
            tagline={f.tagline}
            funnel={f.funnel ?? []}
            objective={f.objective ?? ''}
            sizes={f.sizes}
            benchmark={f.benchmark ? `${f.benchmark.metric} ${f.benchmark.value}%` : undefined}
            compared={picks.includes(f.id)}
            onComparedChange={on => toggle(f.id, on)}
            onOpen={noop}
          />
        ))}
      </CardGrid>
      <ActionBar
        variant="picks"
        aria-label="Formats to compare"
        open={picks.length > 0}
        picks={picked.map(f => ({ id: f.id, name: f.name }))}
        onRemovePick={id => toggle(id, false)}
        title={`${picks.length} format${picks.length === 1 ? '' : 's'} selected`}
        description={picks.length < 2 ? 'Minimum 2 formats.' : 'Maximum 4 formats.'}
        dismiss={{ label: 'Clear', hiddenLabel: ' all picks', onClick: () => setPicks([]) }}
        primary={{ label: 'Compare', icon: Columns, onClick: () => setComparing(true), disabled: picks.length < 2 }}
        fallbackFocusRef={heading}
      />
      <CompareModal
        open={comparing}
        onClose={() => setComparing(false)}
        formats={picked}
        onExportPdf={noop}
        onExportExcel={noop}
        onPlan={() => setComparing(false)}
        returnFallback={heading}
      />
    </div>
  );
}

function Stage({ formats }: { formats: MediaAdFormat[] }) {
  return (
    <div className="docs-mad-stage">
      <CompareModalPanel
        aria-modal="false"
        formats={formats}
        onClose={noop}
        onExportPdf={noop}
        onExportExcel={noop}
        onPlan={noop}
      />
    </div>
  );
}

const three = [byId('swipe-gallery'), byId('scratch-win'), byId('billboard')];
const two = [byId('outstream-video'), byId('billboard')];

export const thumbnail = () => (
  <div className="docs-mad-stage docs-mad-stage--thumb docs-compare-thumb" aria-hidden="true">
    <CompareModalPanel
      aria-modal="false"
      formats={three}
      onClose={noop}
      onExportPdf={noop}
      onExportExcel={noop}
      onPlan={noop}
    />
  </div>
);

export const anatomy: DocsAnatomyNode[] = [
  {
    name: 'Panel',
    element: '<div role="dialog" aria-modal>.cui-modal.cui-compare-modal',
    description: "Modal's panel plus a 1px Neutral-3 border, up to 1120px wide and 800px tall, on Media Ad Modal's layer and scrim. Named by the title; only the table scrolls.",
    children: [
      { name: 'Head', element: '.cui-modal__head', description: '"Compare formats", an h4 at the h4 token, and the Ghost icon-only sm close.' },
      { name: 'Scroll hint', element: '.cui-compare-modal__hint', description: '"Scroll sideways to see every format", only while the table overflows. Hidden from screen readers: the region\'s label carries it.' },
      { name: 'Scroll region', element: '<div role="region" tabindex="0">', description: 'Scrolls both ways; a Tab stop with an inset focus ring, so the arrow keys scroll it. A fade on the right edge while columns remain.' },
      {
        name: 'Table',
        element: '<table>.cui-table__table.cui-compare-modal__table',
        description: "Table's base cells, separate borders, fixed layout, a hidden caption, column dividers between formats.",
        children: [
          { name: 'Media row', element: 'thead tr:first-child', description: 'The 16:10 media per format. Not sticky.' },
          { name: 'Format row', element: 'thead th[scope="col"]', description: 'The column header: the name at h5, the family as plain body2 text. Sticky top once the Media row scrolls away.' },
          { name: 'Fact rows', element: 'tbody th[scope="row"] + td', description: 'Nine, in order: Objective, Funnel, Sizes, Runs on, Benchmark, CPM on file, Monthly inventory, Best for, Industries. The labels stick left.' },
          { name: 'Highest', element: 'td[data-highest] + Badge success', description: 'An earth-bg cell and a "Highest" Badge on the top published benchmark.' },
        ],
      },
      { name: 'Foot', element: '.cui-modal__foot', description: 'Export PDF and Export Excel (Secondary) on the left; Send to a media plan (Primary) pushed right.' },
    ],
  },
];

export const examples: DocsExample[] = [
  {
    id: 'catalogue',
    title: 'From the Action bar',
    description:
      'Two formats are picked, so the Action bar sits centred at the bottom of the page. Pick up to four with the cards\' round Compare, then press Compare in the bar: the modal swings out of the button. Scroll the table sideways and down: the labels and the Format row stay put. Closing returns focus to Compare.',
    render: () => <Catalogue />,
    code: `<CompareModal
  open={comparing}
  onClose={() => setComparing(false)}
  formats={picked}
  onExportPdf={exportPdf}
  onExportExcel={exportExcel}
  onPlan={() => router.push(\`/plans/new?formats=\${picks.join(',')}\`)}
  returnFallback={heading}
/>`,
  },
  {
    id: 'panel',
    title: 'Three formats',
    description: 'All three have a published CTR; Scratch & Win\'s is the highest, so its cell is marked "Highest". Billboard lists no industries: a dash.',
    render: () => <Stage formats={three} />,
    code: `<CompareModal open onClose={close} formats={[swipeGallery, scratchWin, billboard]}
  onExportPdf={exportPdf} onExportExcel={exportExcel} onPlan={plan} />`,
  },
  {
    id: 'missing',
    title: 'Missing data, no Highest',
    description:
      'Only one of the two has a published CTR, so nothing is marked: one benchmark against "Not published" proves nothing. Missing facts read "Not on file" (CPM "Not on file — ask Sales"); a missing Sizes or Industries is a dash.',
    render: () => <Stage formats={two} />,
    code: `<CompareModal open onClose={close} formats={[outstreamVideo, billboard]}
  onExportPdf={exportPdf} onExportExcel={exportExcel} onPlan={plan} />`,
  },
];

export const props: DocsProp[] = [
  { name: 'open', options: 'boolean', default: '—', required: true, description: 'Whether the modal is open. Only with two to four formats.' },
  { name: 'onClose', options: '() => void', default: '—', required: true, description: 'Close, Escape or a scrim click. Set `open` to false.' },
  { name: 'formats', options: 'MediaAdFormat[]', default: '—', required: true, description: "Two to four formats, Media Ad Modal's shape, in the order picked. One column each." },
  { name: 'onExportPdf / onExportExcel', options: '() => void', default: '—', required: true, description: 'Produce the file; confirm it with a Toast.' },
  { name: 'onPlan', options: '() => void', default: '—', required: true, description: '"Send to a media plan": navigate with the format ids.' },
  { name: 'origin', options: 'RefObject<HTMLElement>', default: 'the element that had focus', description: 'What it swings out of: the Action bar\'s Compare.' },
  { name: 'returnFallback', options: 'RefObject<HTMLElement>', default: '—', description: 'Where focus goes on close if Compare has become disabled.' },
  { name: 'keepLive', options: 'RefObject<HTMLElement>[]', default: '—', description: 'Children of `<body>` kept usable while it is open: the Toast host, so export toasts are announced.' },
  { name: 'id, aria-*, data-*', options: 'native', default: '—', description: 'Passed to the panel. `style` and `className` are not accepted. The ref is forwarded to it.' },
];

export const rules: DocsRules = {
  do: [
    'Open it from the Action bar\'s Compare, with two to four formats.',
    'Keep all nine fact rows in order for every format, even when most are "Not on file".',
    'Let the consumer own the media slot.',
  ],
  dont: [
    "Don't open it with one format: that is Media Ad Modal.",
    "Don't put an ad visual, a form field, a remove control or a confirm step in it.",
    "Don't mark Highest with colour alone, or collapse the table into stacked cards on a phone: scroll it.",
    "Don't open it from inside Media Ad Modal.",
  ],
};

export const accessibility: DocsAccessibility = {
  keyboard: [
    { keys: 'Tab / Shift+Tab', action: 'Moves through Close, the table region and the footer, wrapping at the ends.' },
    { keys: 'Arrow keys', action: 'Scroll the table while its region has focus.' },
    { keys: 'Escape', action: 'Closes; focus returns to Compare (or the fallback if Compare is disabled).' },
  ],
  notes: [
    'The panel is `role="dialog"` with `aria-modal`, named by its title. It opens with focus on Close.',
    'The table has a hidden caption naming the formats and the facts; the Media row\'s header reads "Media"; the "Format" corner is decorative.',
    'Highest is a word, not a colour: screen readers hear "Highest CTR in this comparison".',
    'Sizes read "970 by 250 pixels"; a dash reads "No fixed size" or "None listed".',
    'The scroll hint is hidden from screen readers: the region is labelled "Comparison table".',
    'Every other child of `<body>` is `inert` while it is open, except `keepLive` (the Toast host). No live region.',
    'Forced colours: the Highest cell keeps a Highlight edge; the right-edge fade is dropped.',
  ],
};

export const motion: DocsMotion[] = [
  { interaction: 'Opening', motion: "Media Ad Modal's swing, out of the Compare button, while the scrim fades in.", token: '0.8s cubic-bezier(.25,.9,.35,1) (recorded one-off)' },
  { interaction: 'Closing', motion: 'Folds back into Compare if it is on screen, else fades. Escape mid-opening plays the swing backwards and fades to 0.', token: '0.55s cubic-bezier(.3,.6,.35,1) · scrim --duration-slow' },
  { interaction: 'Right-edge fade', motion: 'Fades in while columns remain to the right.', token: '--duration-fast · --ease-standard' },
  { interaction: 'Reduced motion', motion: 'No swing: a plain fade.', token: '--duration-base' },
];
