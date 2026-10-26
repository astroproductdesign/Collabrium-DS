'use client';

// Streaming Text preview: the states, with the OLD HTML + CSS
// (collabrium-dls/components.css) rendered beside them for visual
// comparison. Never part of the package build.
import type { ReactNode } from 'react';
import { StreamingText } from './StreamingText';

// Copied verbatim from collabrium-dls/components.css lines 5480–5561 (Streaming
// Text), 5181–5195 (Chat window’s .c-chat-action, which it reuses) and 4910
// (the caret keyframe), for side-by-side comparison only. Never shipped in the package.
export const legacyStreamingCss = "/* =========================================================\n   Streaming Text — AI Native's arrival state: the model's own prose,\n   resolving word by word, with a citation landing in position and the\n   message actions/Follow-ups becoming reachable only once the last\n   word settles. See DESIGN-SYSTEM.md's own \"Streaming Text\" section\n   for the full 22-rule contract this markup alone can't express (never\n   simulating a stream over content already in hand, the ~55ms/word\n   fallback cadence a real buffer should smooth toward, the below-12-\n   words instant reveal, structured content landing whole, a stopped/\n   failed stream keeping its partial text, no loop ever) — this file\n   only owns the shell, the citation chip, the action-row/Follow-ups\n   reveal, and the reduced-motion fallback.\n   No pre-reserved height by default (Rule 8: appending is the default\n   reveal, not a pre-sized box) — a host that genuinely needs to hold\n   space for this component's own settled size (a fixed-height\n   container, a card with its own footer) reserves that space itself;\n   this component doesn't invent a generic constant for a size only the\n   host actually knows. */\n.c-streaming{display:flex; flex-direction:column; width:100%; max-width:420px;}\n\n.c-streaming-text{margin:0; font-family:var(--font-primary); font-size:var(--text-body1-size); line-height:1.65; font-weight:var(--text-body1-weight); color:var(--color-neutral-9);}\n\n.c-streaming-caret{display:inline-block; width:2px; height:1em; margin-left:2px; vertical-align:text-bottom; border-radius:1px; background:var(--color-neutral-9); animation:c-prompt-bar-caret-blink 500ms steps(1) infinite;}\n\n/* vertical-align:middle ties this to the surrounding text's own font\n   metrics rather than a fixed px offset — it stays centered whichever\n   size this component's own text renders at (body1 here, matching\n   Chat window's AI bubble; a smaller host would still center right). */\n.c-streaming-cite{display:inline-flex; align-items:center; gap:4px; height:18px; padding:0 5px; margin:0 2px; border-radius:6px; background:var(--color-neutral-3); color:var(--color-neutral-7); font-family:var(--font-primary); font-size:11px; text-decoration:none; vertical-align:middle; transition:background-color var(--duration-fast) var(--ease-standard), color var(--duration-fast) var(--ease-standard); animation:c-thinking-fade-in var(--duration-slow) var(--ease-settle) both;}\n.c-streaming-cite:hover{background:var(--color-neutral-2); color:var(--color-neutral-9);}\n.c-streaming-cite-avatar{width:12px; height:12px; border-radius:3px; flex:none; display:flex; align-items:center; justify-content:center; font-size:8px; font-weight:700; color:var(--color-neutral-1);}\n\n/* Rule 17 — a stopped stream keeps its text and gets marked, not\n   discarded. Sits ahead of the action row it unlocks. */\n.c-streaming-note{margin-top:var(--spacing-4); font-size:var(--text-caption-size); color:var(--color-neutral-5);}\n\n/* Rule 15 — the action row is unrendered during the stream, not merely\n   dimmed: toggled with the `hidden` attribute (removed from layout and\n   the accessibility tree, unreachable by Tab) rather than opacity,\n   which would leave it selectable/focusable while invisible. Removing\n   `hidden` naturally retriggers this animation, the same way any\n   display:none-to-block transition restarts a CSS animation — no JS\n   class dance needed to play the entrance once. */\n.c-streaming-actions{display:flex; align-items:center; gap:2px; margin-top:var(--spacing-8); animation:c-thinking-fade-in var(--duration-slow) var(--ease-standard) both;}\n\n.c-streaming-sources-trigger{display:flex; align-items:center; gap:var(--spacing-8); margin-left:var(--spacing-4); padding:2px var(--spacing-8); border:none; background:transparent; border-radius:var(--radius-sm); cursor:pointer; font-family:var(--font-primary); transition:background-color var(--duration-fast) var(--ease-standard);}\n.c-streaming-sources-trigger:hover{background:var(--color-neutral-2);}\n.c-streaming-sources-avatars{display:flex; flex:none;}\n.c-streaming-sources-avatars span{width:14px; height:14px; border-radius:50%; box-shadow:0 0 0 1.5px var(--color-neutral-1); margin-left:-4px; display:flex; align-items:center; justify-content:center; font-size:7px; font-weight:700; color:var(--color-neutral-1);}\n.c-streaming-sources-avatars span:first-child{margin-left:0;}\n.c-streaming-sources-trigger-label{font-size:var(--text-caption-size); color:var(--color-neutral-7);}\n\n.c-streaming-sources{display:grid; grid-template-rows:0fr; opacity:0; transition:grid-template-rows var(--duration-base) var(--ease-settle), opacity var(--duration-base) var(--ease-settle);}\n.c-streaming.is-sources-open .c-streaming-sources{grid-template-rows:1fr; opacity:1;}\n.c-streaming-sources-inner{overflow:hidden;}\n.c-streaming-sources-list{margin-top:var(--spacing-8); padding:var(--spacing-4); display:flex; flex-direction:column; background:var(--color-neutral-3); border-radius:var(--radius-sm);}\n.c-streaming-source-row{display:flex; align-items:center; gap:var(--spacing-8); padding:var(--spacing-4) var(--spacing-8); border-radius:8px; text-decoration:none; color:var(--color-neutral-7); transition:background-color var(--duration-fast) var(--ease-standard), color var(--duration-fast) var(--ease-standard);}\n.c-streaming-source-row:hover{background:var(--color-neutral-2); color:var(--color-neutral-9);}\n.c-streaming-source-avatar{width:20px; height:20px; border-radius:50%; flex:none; display:flex; align-items:center; justify-content:center; font-size:10px; font-weight:700; color:var(--color-neutral-1);}\n.c-streaming-source-name{font-size:var(--text-caption-size); font-weight:600;}\n.c-streaming-source-domain{margin-left:auto; font-size:var(--text-footnote-size); color:var(--color-neutral-5);}\n\n/* Rule 16 — Follow-ups only on settle, and only after the actions;\n   `hidden` by default for the same reason the action row is. */\n.c-streaming-followups{margin-top:var(--spacing-12); animation:c-thinking-fade-in var(--duration-slow) var(--ease-standard) both;}\n.c-streaming-followups-label{margin:0 0 2px; font-size:var(--text-caption-size); font-weight:600; color:var(--color-neutral-7);}\n.c-streaming-followup{display:flex; align-items:center; gap:var(--spacing-8); width:100%; padding:var(--spacing-8) 2px; border:none; border-bottom:1px solid var(--color-neutral-3); background:transparent; font-family:var(--font-primary); font-size:var(--text-caption-size); color:var(--color-neutral-9); text-align:left; cursor:pointer; transition:background-color var(--duration-fast) var(--ease-standard); animation:c-thinking-row-in var(--duration-slow) var(--ease-settle) both;}\n.c-streaming-followup:hover{background:var(--color-neutral-2);}\n.c-streaming-followup i{font-size:var(--icon-micro); color:var(--color-neutral-5); flex:none;}\n.c-streaming-followup:last-child{border-bottom:none;}\n\n/* Rule 21 — reduced motion drops the per-word fade/cadence but keeps\n   the progressive arrival itself (that's a JS timing concern, handled\n   where the reveal is scheduled, not here); what CSS owns is dropping\n   every entrance animation on this component's own decorative parts. */\n@media (prefers-reduced-motion:reduce){\n  .c-streaming-caret{animation:none; opacity:1;}\n  .c-streaming-cite{animation:none;}\n  .c-streaming-sources{transition:none;}\n  .c-streaming-followup{animation:none;}\n  .c-streaming-actions, .c-streaming-followups{animation:none;}\n}\n.c-chat-action{position:relative; flex:none; width:28px; height:28px; display:flex; align-items:center; justify-content:center; border-radius:var(--radius-sm); background:transparent; border:none; padding:0; cursor:pointer; color:var(--color-neutral-5); font-size:var(--icon-sm); transition:background-color var(--duration-fast) var(--ease-standard), color var(--duration-fast) var(--ease-standard);}\n/* Transparent hit-area lift to 44px — doesn't change the painted box\n   or shift layout. */\n.c-chat-action::after{content:''; position:absolute; inset:-8px;}\n.c-chat-action:hover{background:var(--color-neutral-2); color:var(--color-neutral-9);}\n.c-chat-action:focus-visible{outline:2px solid var(--color-obsidian); outline-offset:2px;}\n.c-chat-action.is-copied{color:var(--color-green);}\n/* Read aloud — loading spinner, same treatment as Search input's own\n   Loading state: an ongoing process, Tier 1 Regular, not a status mark. */\n.c-chat-action.is-loading i{animation:c-chat-action-spin var(--duration-ambient) linear infinite;}\n@keyframes c-chat-action-spin{ to{ transform:rotate(360deg); } }\n.c-chat-action.is-playing{color:var(--color-neutral-9);}\n/* Thumbs — fill-vs-outline carries the pressed state, same logic as\n   Checkbox/Radio/Stepper; not a tier change. */\n.c-chat-action[aria-pressed=\"true\"]{color:var(--color-neutral-9);}\n@keyframes c-prompt-bar-caret-blink{50%{opacity:0;}}";

const forecastly = { name: 'Forecastly', domain: 'forecastly.io', href: 'https://forecastly.io', color: '#2f6fec' };
const pipeline = { name: 'Pipeline Metrics', domain: 'pipelinemetrics.com', href: 'https://pipelinemetrics.com', color: '#e56d24' };
const revops = { name: 'RevOps Weekly', domain: 'revopsweekly.com', href: 'https://revopsweekly.com', color: '#1f7a5f' };

interface Row {
  id: string;
  label: string;
  note?: string;
  next: ReactNode;
  /** Old markup, in the state named in the label (the gallery sets these from script). */
  old: string | null;
}

const rows: Row[] = [
  {
    id: 'streaming',
    label: 'Mid-stream, caret on (preview.html 1420–1475)',
    note: 'The old text is static here. The cadence, buffering and reduced-motion handling are in the component; see the docs page for the live run.',
    next: (
      <StreamingText
        content={['Northwind Retail’s renewal risk is high — the Q3 proposal has stalled for three weeks, ']}
        status="streaming"
      />
    ),
    old: "<div class=\"c-streaming\"><p class=\"c-streaming-text\" aria-busy=\"true\">Northwind Retail’s renewal risk is high — the Q3 proposal has stalled for three weeks, <span class=\"c-streaming-caret\"></span></p></div>",
  },
  {
    id: 'settled',
    label: 'Settled: citation, every action, sources button, follow-ups',
    next: (
      <StreamingText
        content={[
          'Northwind Retail’s renewal risk is high — the Q3 proposal has stalled. ',
          { citation: forecastly },
          ' Two other accounts are trending the same way.',
        ]}
        status="done"
        sources={[forecastly, pipeline, revops]}
        followUps={['Which accounts are trending the same way', 'Compare Q3 and Q4 renewal risk']}
        onRetry={() => {}}
        onFeedback={() => {}}
      />
    ),
    old: "<div class=\"c-streaming\"><p class=\"c-streaming-text\" aria-busy=\"false\">Northwind Retail’s renewal risk is high — the Q3 proposal has stalled. <a class=\"c-streaming-cite\" href=\"https://forecastly.io\"><span class=\"c-streaming-cite-avatar\" style=\"background:#2f6fec\">F</span><span>forecastly.io</span></a> Two other accounts are trending the same way.</p><div class=\"c-streaming-actions\"><button type=\"button\" class=\"c-chat-action\" aria-label=\"Copy\"><i class=\"ph ph-copy\"></i></button><button type=\"button\" class=\"c-chat-action\" aria-label=\"Retry\"><i class=\"ph ph-arrow-clockwise\"></i></button><button type=\"button\" class=\"c-chat-action\" aria-label=\"Good response\"><i class=\"ph ph-thumbs-up\"></i></button><button type=\"button\" class=\"c-chat-action\" aria-label=\"Bad response\"><i class=\"ph ph-thumbs-down\"></i></button><button type=\"button\" class=\"c-streaming-sources-trigger\"><span class=\"c-streaming-sources-avatars\"><span style=\"background:#2f6fec\">F</span><span style=\"background:#e56d24\">P</span><span style=\"background:#1f7a5f\">R</span></span><span class=\"c-streaming-sources-trigger-label\">3 sources</span></button></div><div class=\"c-streaming-followups\"><p class=\"c-streaming-followups-label\">Follow-ups</p><div><button type=\"button\" class=\"c-streaming-followup\"><i class=\"ph ph-arrow-bend-down-left\"></i>Which accounts are trending the same way</button><button type=\"button\" class=\"c-streaming-followup\"><i class=\"ph ph-arrow-bend-down-left\"></i>Compare Q3 and Q4 renewal risk</button></div></div></div>",
  },
  {
    id: 'stopped',
    label: 'Stopped early (.c-streaming-note)',
    next: (
      <StreamingText
        content={['Northwind Retail’s renewal risk is high — the Q3 proposal has stalled for three weeks, and the ']}
        status="stopped"
        onRetry={() => {}}
      />
    ),
    old: "<div class=\"c-streaming\"><p class=\"c-streaming-text\" aria-busy=\"false\">Northwind Retail’s renewal risk is high — the Q3 proposal has stalled for three weeks, and the </p><div class=\"c-streaming-note\">Stopped early</div><div class=\"c-streaming-actions\"><button type=\"button\" class=\"c-chat-action\" aria-label=\"Copy\"><i class=\"ph ph-copy\"></i></button><button type=\"button\" class=\"c-chat-action\" aria-label=\"Retry\"><i class=\"ph ph-arrow-clockwise\"></i></button></div></div>",
  },
  {
    id: 'failed',
    label: 'Failed stream',
    note: 'No CSS in the old system (Q-STREAM-3).',
    next: null,
    old: null,
  },
];

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
          {row.old === null ? (
            <p className="pg-missing">No CSS in the old system. See MIGRATION-LOG.md.</p>
          ) : (
            <div className="pg-specimen" dangerouslySetInnerHTML={{ __html: row.old }} />
          )}
        </div>
      </div>
    </section>
  );
}

export function StreamingTextPreview() {
  return (
    <>
      <style>{legacyStreamingCss}</style>
      {rows.map(row => (
        <Compare key={row.id} row={row} />
      ))}
    </>
  );
}

export default StreamingTextPreview;
