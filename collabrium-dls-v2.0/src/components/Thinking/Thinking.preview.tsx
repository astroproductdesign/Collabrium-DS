'use client';

// Thinking preview: the four variants, with the OLD HTML + CSS
// (collabrium-dls/components.css) rendered beside them for visual
// comparison. Never part of the package build.
import { useEffect, useRef, type ReactNode } from 'react';
import { FileText, PencilSimple, Terminal } from '@phosphor-icons/react';
import { Thinking } from './Thinking';

// Copied verbatim from collabrium-dls/components.css lines 5377–5478 (Thinking), plus
// the `c-search-input-spin` keyframe (line 240) that its spinner reuses, for
// side-by-side comparison only. Never shipped in the package.
export const legacyThinkingCss = "/* =========================================================\n   Thinking \u2014 AI Native's other pre-result state, for AI work that has\n   started emitting named, orderable steps (Loading State stays the\n   component for an opaque wait with nothing yet to show). See\n   DESIGN-SYSTEM.md's own \"Thinking\" section for the full 21-rule\n   contract this markup alone can't express (the two-step/two-second\n   gate before it ever renders, auto-open/auto-close with manual\n   override winning permanently, the one-way hand-off from Loading\n   State, the required Stop) \u2014 this file only owns the shell, the four\n   variants' row anatomy, and the reduced-motion fallback.\n   Class prefix: .c-thinking*. Four variants \u2014 Steps, Reasoning, Search,\n   Coding \u2014 share this one shell and differ only in row content, never\n   in the shell around them. */\n.c-thinking{display:flex; flex-direction:column; width:100%; max-width:380px; min-height:0; transition:min-height var(--duration-morph) var(--ease-morph);}\n.c-thinking.is-active{min-height:176px;}\n\n.c-thinking-header{display:inline-flex; align-items:center; gap:var(--spacing-8); align-self:flex-start; margin:-6px; padding:6px; border:none; background:transparent; border-radius:var(--radius-sm); cursor:pointer; transition:background-color var(--duration-fast) var(--ease-standard); font-family:var(--font-primary);}\n.c-thinking-header:hover{background:var(--color-neutral-2);}\n.c-thinking-header:focus-visible{outline:2px solid var(--color-obsidian); outline-offset:2px;}\n\n.c-thinking-mark{font-size:var(--icon-sm); color:var(--color-neutral-7); flex:none;}\n.c-thinking.is-done .c-thinking-mark{color:var(--color-neutral-5);}\n\n/* Status crossfades Rule 13's live label into Rule 7's past-tense\n   header rather than swapping text content \u2014 both spans share one\n   grid cell so the header never reflows mid-change. The shimmer here\n   is this component's one exception to Loading State's \"no shimmer\"\n   call: collapsed and mid-run, it's the only visible sign the\n   operation hasn't stalled, since nothing else on the header moves. */\n.c-thinking-status{position:relative; display:inline-flex; font-size:var(--text-caption-size); font-weight:500; white-space:nowrap;}\n.c-thinking-status .working,\n.c-thinking-status .done{grid-area:1/1; white-space:nowrap;}\n.c-thinking-status .working{background-image:linear-gradient(90deg, var(--color-neutral-3) 35%, var(--color-neutral-9) 50%, var(--color-neutral-3) 65%); background-size:200% 100%; -webkit-background-clip:text; background-clip:text; color:transparent; -webkit-text-fill-color:transparent; animation:c-thinking-shimmer 1.4s linear infinite;}\n.c-thinking-status .done{color:var(--color-neutral-7); display:none; animation:c-thinking-fade-in var(--duration-slow) var(--ease-standard) both;}\n.c-thinking.is-done .c-thinking-status .working{display:none;}\n.c-thinking.is-done .c-thinking-status .done{display:inline;}\n@keyframes c-thinking-shimmer{ from{background-position:0% 0;} to{background-position:-200% 0;} }\n@keyframes c-thinking-fade-in{ from{opacity:0;} to{opacity:1;} }\n\n.c-thinking-chevron{font-size:var(--icon-micro); color:var(--color-neutral-5); flex:none; transition:transform var(--duration-fast) var(--ease-standard);}\n.c-thinking.is-expanded .c-thinking-chevron{transform:rotate(180deg);}\n\n.c-thinking-trace{display:grid; grid-template-rows:0fr; transition:grid-template-rows var(--duration-base) var(--ease-settle), opacity var(--duration-base) var(--ease-settle); opacity:0;}\n.c-thinking.is-expanded .c-thinking-trace{grid-template-rows:1fr; opacity:1;}\n.c-thinking-trace-inner{overflow:hidden;}\n\n/* The header mark sits flush at this component's own left edge (its\n   padding/negative-margin hit-target trick cancels to zero net offset),\n   so its horizontal center is icon-sm/2 from that edge \u2014 the timeline\n   line shares that same edge and anchors at exactly that, not a\n   hand-picked px guess, so it centers under the mark for every variant.\n   The -1px tracks ph-fill ph-sparkle's own visual center, which sits\n   left of its advance box's geometric one (the glyph's two small accent\n   marks pull right) \u2014 the same correction Loading State's own grid\n   never needed, since this is the only place that glyph sits directly\n   above a line depending on its exact center. Dial it back if a future\n   icon swap reads as leaning the other way; it's a font-rendering\n   correction, not a re-derived constant. */\n.c-thinking-line-wrap{position:relative; margin-top:var(--spacing-8); padding-left:var(--spacing-16);}\n.c-thinking-line{position:absolute; left:calc(var(--icon-sm) / 2 - 1px); top:0; width:1px; height:0; background:var(--color-neutral-3); transition:height var(--duration-reveal) var(--ease-reveal);}\n.c-thinking-rows{display:flex; flex-direction:column; gap:2px; padding:var(--spacing-4) 0;}\n\n.c-thinking-query{display:flex; align-items:center; gap:var(--spacing-8); min-height:26px; padding:0 var(--spacing-4); animation:c-thinking-row-in var(--duration-slow) var(--ease-settle) both;}\n.c-thinking-query i{font-size:var(--icon-micro); color:var(--color-neutral-5); flex:none;}\n.c-thinking-query span{font-size:var(--text-caption-size); color:var(--color-neutral-7);}\n\n.c-thinking-row{display:flex; align-items:center; gap:var(--spacing-8); min-width:0; width:100%; min-height:28px; padding:2px var(--spacing-4); border-radius:6px; border:none; background:transparent; font-family:var(--font-primary); text-align:left; text-decoration:none; cursor:default; animation:c-thinking-row-in var(--duration-slow) var(--ease-settle) both;}\na.c-thinking-row,\nbutton.c-thinking-row{cursor:pointer; transition:background-color var(--duration-fast) var(--ease-standard);}\na.c-thinking-row:hover,\nbutton.c-thinking-row:hover{background:var(--color-neutral-2);}\nbutton.c-thinking-row.is-selected{background:var(--color-neutral-3);}\n@keyframes c-thinking-row-in{ from{opacity:0; transform:translateY(4px);} to{opacity:1; transform:translateY(0);} }\n\n/* Steps/Coding's completed mark is Tier 1 Regular (ph-check), not\n   ph-fill \u2014 this system already found the filled glyph renders as a\n   boxed checkbox rather than a bare mark (see Stepper). The active\n   step's spinner reuses Search input's own c-search-input-spin\n   keyframe verbatim rather than a new border-arc shape \u2014 one spin\n   technique, system-wide. */\n.c-thinking-row-icon{font-size:var(--icon-micro); color:var(--color-neutral-5); flex:none;}\n.c-thinking-row-icon.is-spin{animation:c-search-input-spin var(--duration-ambient) linear infinite;}\n.c-thinking-row-primary{min-width:0; flex:1 1 auto; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; font-size:var(--text-caption-size); font-weight:600; color:var(--color-neutral-9);}\n.c-thinking-row.is-prose{align-items:flex-start; white-space:normal;}\n.c-thinking-row.is-prose .c-thinking-row-primary{white-space:normal; font-weight:400; line-height:1.6; color:var(--color-neutral-7);}\n.c-thinking-row-secondary{flex:none; font-size:var(--text-footnote-size); color:var(--color-neutral-5);}\n.c-thinking-row-diff{flex:none; font-size:11px; font-variant-numeric:tabular-nums; display:flex; gap:4px;}\n.c-thinking-row-diff .add{color:var(--color-green);}\n.c-thinking-row-diff .del{color:var(--color-red);}\n.c-thinking-more{font-size:var(--text-caption-size); color:var(--color-neutral-5); padding:2px var(--spacing-4); animation:c-thinking-fade-in var(--duration-base) var(--ease-standard) both;}\n\n/* Rule 20 \u2014 travel drops, sequence stays: the expand/row-stagger/line-\n   growth transitions go, but nothing here touches which rows exist,\n   the spinner on the current step, or the timer \u2014 ordering is\n   information, not decoration. */\n@media (prefers-reduced-motion:reduce){\n  .c-thinking, .c-thinking-trace, .c-thinking-line, .c-thinking-chevron{transition:none;}\n  .c-thinking-status .working{animation:none; background:none; -webkit-text-fill-color:var(--color-neutral-7); color:var(--color-neutral-7);}\n  .c-thinking-status .done{animation:none;}\n  .c-thinking-row, .c-thinking-query, .c-thinking-more{animation:none;}\n  .c-thinking-row-icon.is-spin{animation:none;}\n}\n@keyframes c-search-input-spin{to{transform:rotate(360deg);}}";

interface Row {
  id: string;
  label: string;
  note?: string;
  next: ReactNode;
  /** Old markup, from preview.html 1505–1590, in the state named in the label (the gallery sets these classes from script). */
  old: string | null;
}

const header = (working: string, done: string) =>
  `<button type="button" class="c-thinking-header js-thinking-header" aria-expanded="true"><i class="ph-fill ph-sparkle c-thinking-mark"></i><span class="c-thinking-status"><span class="working" role="status" aria-live="polite">${working}</span><span class="done" role="status" aria-live="polite">${done}</span></span><i class="ph ph-caret-down c-thinking-chevron"></i></button>`;
const shell = (state: string, head: string, rows: string) =>
  `<div class="c-thinking ${state}">${head}<div class="c-thinking-trace"><div class="c-thinking-trace-inner"><div class="c-thinking-line-wrap"><span class="c-thinking-line js-thinking-line"></span><div class="c-thinking-rows js-thinking-rows">${rows}</div></div></div></div></div>`;
const OPEN_DONE = 'is-expanded is-active is-done';
const OPEN_WORKING = 'is-expanded is-active';
const stepRow = (i: number, icon: string, text: string, extra = '') =>
  `<div class="c-thinking-row" style="animation-delay:${i * 120}ms"><i class="ph ${icon} c-thinking-row-icon${icon === 'ph-circle-notch' ? ' is-spin' : ''}"></i><span class="c-thinking-row-primary">${text}</span>${extra}</div>`;

const rows: Row[] = [
  {
    id: 'steps-done',
    label: 'Steps, done and open (.is-expanded .is-done)',
    next: (
      <Thinking
        variant="steps"
        steps={[
          { label: 'Reading account notes' },
          { label: 'Scanning pipeline data' },
          { label: 'Comparing renewal timelines', detail: '12 accounts' },
          { label: 'Writing the risk summary' },
        ]}
        status="done"
        defaultExpanded
        workingLabel="Thinking"
        doneLabel="Thought for 4 seconds"
      />
    ),
    old: shell(
      OPEN_DONE,
      header('Thinking', 'Thought for 4 seconds'),
      stepRow(0, 'ph-check', 'Reading account notes') +
        stepRow(1, 'ph-check', 'Scanning pipeline data') +
        stepRow(2, 'ph-check', 'Comparing renewal timelines', '<span class="c-thinking-row-secondary">12 accounts</span>') +
        stepRow(3, 'ph-check', 'Writing the risk summary'),
    ),
  },
  {
    id: 'steps-working',
    label: 'Steps, working (.is-expanded, no .is-done)',
    next: (
      <Thinking
        variant="steps"
        steps={[{ label: 'Reading account notes' }, { label: 'Scanning pipeline data' }, { label: 'Comparing renewal timelines', detail: '12 accounts' }]}
        status="working"
        workingLabel="Thinking"
        doneLabel="Thought for 4 seconds"
      />
    ),
    old: shell(
      OPEN_WORKING,
      header('Thinking', 'Thought for 4 seconds'),
      stepRow(0, 'ph-check', 'Reading account notes') +
        stepRow(1, 'ph-check', 'Scanning pipeline data') +
        stepRow(2, 'ph-circle-notch', 'Comparing renewal timelines', '<span class="c-thinking-row-secondary">12 accounts</span>'),
    ),
  },
  {
    id: 'reasoning',
    label: 'Reasoning',
    next: (
      <Thinking
        variant="reasoning"
        paragraphs={[
          'Q4 renewal risk concentrates in two accounts with contracts expiring before December.',
          "Northwind is the one to flag first — it's already stalled since the Q3 proposal went quiet.",
        ]}
        status="done"
        defaultExpanded
        workingLabel="Thinking"
        doneLabel="Thought for 4 seconds"
      />
    ),
    old: shell(
      OPEN_DONE,
      header('Thinking', 'Thought for 4 seconds'),
      '<div class="c-thinking-row is-prose" style="animation-delay:0ms"><span class="c-thinking-row-primary">Q4 renewal risk concentrates in two accounts with contracts expiring before December.</span></div><div class="c-thinking-row is-prose" style="animation-delay:120ms"><span class="c-thinking-row-primary">Northwind is the one to flag first &mdash; it\'s already stalled since the Q3 proposal went quiet.</span></div>',
    ),
  },
  {
    id: 'search',
    label: 'Search',
    next: (
      <Thinking
        variant="search"
        query="Northwind Retail renewal history"
        sources={[
          { title: 'Northwind Retail', domain: 'northwindretail.com', href: 'https://northwindretail.com' },
          { title: 'Crunchbase', domain: 'crunchbase.com', href: 'https://www.crunchbase.com/organization/northwind-retail' },
          { title: 'LinkedIn', domain: 'linkedin.com', href: 'https://www.linkedin.com/company/northwind-retail' },
        ]}
        moreCount={7}
        status="done"
        defaultExpanded
        workingLabel="Searching the web"
        doneLabel="Searched the web"
      />
    ),
    old: shell(
      OPEN_DONE,
      header('Searching the web', 'Searched the web'),
      '<div class="c-thinking-query"><i class="ph ph-magnifying-glass"></i><span>Northwind Retail renewal history</span></div>' +
        ['Northwind Retail|northwindretail.com', 'Crunchbase|crunchbase.com', 'LinkedIn|linkedin.com']
          .map((s, i) => `<a class="c-thinking-row" href="#" style="animation-delay:${i * 120}ms"><i class="ph ph-globe c-thinking-row-icon"></i><span class="c-thinking-row-primary">${s.split('|')[0]}</span><span class="c-thinking-row-secondary">${s.split('|')[1]}</span></a>`)
          .join('') +
        '<div class="c-thinking-more js-more">+7 more</div>',
    ),
  },
  {
    id: 'coding',
    label: 'Coding',
    next: (
      <Thinking
        variant="coding"
        toolCalls={[
          { icon: FileText, name: 'Read', target: 'pipeline-config.ts' },
          { icon: PencilSimple, name: 'Edit', target: 'RenewalAlert.tsx', additions: 74, deletions: 41 },
          { icon: Terminal, name: 'Run', target: 'npm run notify-am' },
        ]}
        status="done"
        defaultExpanded
        workingLabel="Running tools"
        doneLabel="Ran 3 tools"
      />
    ),
    old: shell(
      OPEN_DONE,
      header('Running tools', 'Ran 3 tools'),
      '<button type="button" class="c-thinking-row js-selectable" style="animation-delay:0ms"><i class="ph ph-file-text c-thinking-row-icon"></i><span class="c-thinking-row-primary">Read</span><span class="c-thinking-row-secondary">pipeline-config.ts</span></button><button type="button" class="c-thinking-row js-selectable" style="animation-delay:120ms"><i class="ph ph-pencil-simple c-thinking-row-icon"></i><span class="c-thinking-row-primary">Edit</span><span class="c-thinking-row-secondary">RenewalAlert.tsx</span><span class="c-thinking-row-diff"><span class="add">+74</span><span class="del">&minus;41</span></span></button><button type="button" class="c-thinking-row js-selectable" style="animation-delay:240ms"><i class="ph ph-terminal c-thinking-row-icon"></i><span class="c-thinking-row-primary">Run</span><span class="c-thinking-row-secondary">npm run notify-am</span></button>',
    ),
  },
  {
    id: 'auto',
    label: 'Auto-open, auto-close, the reader wins',
    note: 'The old system does this from a page script (`runSequence`). The new component does it itself from `status`, and the first click on the header overrides it for good.',
    next: null,
    old: null,
  },
];

/** The old markup, with the timeline line sized to its rows exactly as the gallery script does. */
function OldMarkup({ html }: { html: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    const line = root?.querySelector<HTMLElement>('.js-thinking-line');
    const rowsWrap = root?.querySelector<HTMLElement>('.js-thinking-rows');
    if (line && rowsWrap) requestAnimationFrame(() => (line.style.height = `${Math.max(0, rowsWrap.offsetHeight - 2)}px`));
  }, [html]);
  return <div ref={ref} className="pg-specimen" dangerouslySetInnerHTML={{ __html: html }} />;
}

function Compare({ row }: { row: Row }) {
  return (
    <section className="pg-row" id={row.id} aria-labelledby={`${row.id}-h`}>
      <h3 className="pg-row-title" id={`${row.id}-h`}>{row.label}</h3>
      {row.note && <p className="pg-row-note">{row.note}</p>}
      <div className="pg-cols">
        <div className="pg-col" data-col="new">
          <p className="pg-col-label">React · @collabrium/ui</p>
          <div className="pg-specimen">{row.next}</div>
        </div>
        <div className="pg-col" data-col="old">
          <p className="pg-col-label">Old HTML + CSS · components.css</p>
          {row.old === null ? <p className="pg-missing">No CSS in the old system. See MIGRATION-LOG.md.</p> : <OldMarkup html={row.old} />}
        </div>
      </div>
    </section>
  );
}

export function ThinkingPreview() {
  return (
    <>
      <style>{legacyThinkingCss}</style>
      {rows.map(row => (
        <Compare key={row.id} row={row} />
      ))}
    </>
  );
}

export default ThinkingPreview;
