'use client';

// Permission Prompt preview: the states, with the OLD HTML + CSS
// (collabrium-dls/components.css) rendered beside them for visual
// comparison. Never part of the package build.
import type { ReactNode } from 'react';
import { FileText } from '@phosphor-icons/react';
import { PermissionPrompt } from './PermissionPrompt';
import type { PermissionPromptStatus } from './PermissionPrompt';

// Copied verbatim from collabrium-dls/components.css: .c-card (276, 286, 287),
// c-thinking-fade-in (5417) and Permission Prompt (5863–5976), for
// side-by-side comparison only. Never shipped in the package. The Badge and
// Button the old markup uses come from the package's own CSS.
export const legacyPermissionPromptCss = ".c-card{background:var(--color-neutral-1); border:1px solid var(--color-neutral-3); border-radius:var(--radius-lg); box-shadow:var(--shadow-1); padding:var(--spacing-16); display:flex; flex-direction:column; gap:var(--spacing-8); transition:box-shadow var(--duration-base) var(--ease-settle); width:100%; min-width:240px; height:100%; box-sizing:border-box;}\n.c-card h5{margin:0; font-size:var(--text-h5-size); font-weight:var(--text-h5-weight);}\n.c-card p{margin:0; font-size:var(--text-body2-size); color:var(--color-neutral-5);}\n@keyframes c-thinking-fade-in{ from{opacity:0;} to{opacity:1;} }\n\n/* =========================================================\n   Permission Prompt \u2014 AI Native's seventh subcomponent, a human-in-\n   the-loop card the AI surfaces inline, in its own turn, to ask\n   authorization for a specific, consequential action before it\n   proceeds. See DESIGN-SYSTEM.md's own \"Permission Prompt\" section\n   for the full 11-rule contract this markup alone can't express\n   (scope, structured-never-raw detail, deny-first escalating\n   commitment, a resolution staying visible as a permanent audit\n   trail \u2014 unlike Tool approval's own Rule 13 \u2014 and Expired being a\n   session boundary no control reaches directly).\n   Class prefix: .c-permission-prompt*. Reuses Card (.c-card), Badge's\n   status variants (.c-badge-success/-warning/-error/-neutral),\n   Button (.c-btn-ghost/-secondary/-primary), and Thinking's own\n   0fr->1fr grid-rows + opacity expand/collapse technique for the\n   detail block verbatim \u2014 no new controls invented for any of it.\n   Two real gaps in the system, not compromises invented for this\n   component specifically: no .c-btn-danger exists, so Deny reuses\n   Table's own established recipe (Ghost + a scoped --color-red\n   override, see .c-permission-prompt-deny below) rather than a new\n   Button variant; no dedicated muted/expired Badge tone exists beyond\n   .c-badge-neutral, so the Expired state uses that. */\n.c-permission-prompt{position:relative; width:100%; max-width:var(--measure-sm); animation:c-thinking-fade-in var(--duration-reveal) var(--ease-reveal) both;}\n\n/* Head \u2014 icon, label, risk badge, one row, vertically centered. The\n   risk badge stays pinned to this same top-right corner whether\n   pending or resolved (Rule 5) \u2014 .c-permission-prompt-resolved below\n   repeats the same shape rather than inventing a different layout for\n   that state. */\n.c-permission-prompt-head{display:flex; align-items:center; gap:var(--spacing-12); margin-bottom:var(--spacing-12);}\n.c-permission-prompt-icon{flex:none; font-size:var(--icon-md); line-height:1; color:var(--color-neutral-7);}\n/* .c-permission-prompt prefixed on this selector for the same reason\n   Tool approval's own .c-tool-approval-question rule needs it: Card's\n   default p reset (.c-card p, specificity 0,1,1) otherwise beats a\n   bare .c-permission-prompt-label (0,1,0) on font-size and color. */\n.c-permission-prompt .c-permission-prompt-label{flex:1; min-width:0; margin:0; font-family:var(--font-primary); font-size:var(--text-h5-size); line-height:var(--text-h5-lh); font-weight:var(--text-h5-weight); color:var(--color-neutral-9);}\n.c-permission-prompt-head .c-badge{flex:none;}\n\n/* Toggle + detail \u2014 Thinking's own trace mechanism, verbatim (0fr ->\n   1fr grid-rows + opacity, duration-base/ease-settle). Detail rows are\n   always structured key:value, never raw JSON (Rule 4) \u2014 values never\n   truncate or ellipsis, since the point is showing exactly what's\n   being authorized; a long value wraps instead. */\n.c-permission-prompt-toggle{display:inline-flex; align-items:center; gap:4px; margin:0 0 var(--spacing-8); padding:0; border:none; background:transparent; font-family:inherit; font-size:var(--text-caption-size); font-weight:600; color:var(--color-neutral-5); cursor:pointer; transition:color var(--duration-fast) var(--ease-standard);}\n.c-permission-prompt-toggle:hover{color:var(--color-neutral-9);}\n.c-permission-prompt-toggle i{font-size:var(--icon-micro); transition:transform var(--duration-fast) var(--ease-standard);}\n.c-permission-prompt-toggle[aria-expanded=\"true\"] i{transform:rotate(180deg);}\n\n.c-permission-prompt-detail{display:grid; grid-template-rows:0fr; opacity:0; transition:grid-template-rows var(--duration-base) var(--ease-settle), opacity var(--duration-base) var(--ease-settle);}\n.c-permission-prompt-detail.is-expanded{grid-template-rows:1fr; opacity:1;}\n.c-permission-prompt-detail-inner{overflow:hidden;}\n\n.c-permission-prompt-detail-list{display:flex; flex-direction:column; padding:var(--spacing-8) var(--spacing-12); margin-bottom:var(--spacing-8); background:var(--color-neutral-2); border-radius:var(--radius-sm);}\n.c-permission-prompt-detail-row{display:flex; gap:var(--spacing-8); padding:var(--spacing-4) 0; font-size:var(--text-caption-size); line-height:1.5;}\n.c-permission-prompt-detail-row .key{flex:none; width:60px; color:var(--color-neutral-5); font-weight:600;}\n.c-permission-prompt-detail-row .value{flex:1; min-width:0; color:var(--color-neutral-9); word-break:break-word;}\n\n.c-permission-prompt-scope{margin:0 0 var(--spacing-12); font-size:var(--text-caption-size); color:var(--color-neutral-5); line-height:1.5;}\n\n/* Actions \u2014 three real Button instances, natural width, right-aligned\n   (never stretched or centered \u2014 that's not how Button renders\n   anywhere else in this system), escalating commitment left to right:\n   Deny (Ghost/transparent), Allow once (Secondary/outlined), Allow\n   for session (Primary/solid) \u2014 deny-first (Rule 6), same ordering\n   Claude Code's own prompts use. Wraps onto a second line rather than\n   compressing or stretching if the row ever runs out of width. */\n.c-permission-prompt-actions{display:flex; align-items:center; justify-content:flex-end; gap:var(--spacing-8); flex-wrap:wrap;}\n.c-permission-prompt-deny{color:var(--color-red);} /* Table's own bulk-danger recipe: Ghost + a color override, not a Danger button \u2014 that variant doesn't exist in this system yet */\n\n/* Resolved \u2014 collapses to a compact, still-visible row (Rule 7: it's\n   a permanent audit trail, it never just disappears). Detail stays\n   reachable behind the same toggle, default collapsed now the\n   decision is made. Same \"label left, badge pinned top-right\" shape\n   the pending head uses (Rule 5) \u2014 toggle drops to its own row below,\n   same as pending's, rather than fighting the badge for the right\n   edge of one row. */\n.c-permission-prompt.is-resolved{max-width:var(--measure-sm);}\n.c-permission-prompt-resolved{display:flex; align-items:flex-start; gap:var(--spacing-8); flex-wrap:wrap; margin-bottom:var(--spacing-8); animation:c-thinking-fade-in var(--duration-reveal) var(--ease-reveal) both;}\n.c-permission-prompt-resolved-label{flex:1 1 160px; min-width:0; font-size:var(--text-body2-size); line-height:var(--text-body2-lh); color:var(--color-neutral-9);}\n.c-permission-prompt-resolved .c-badge{flex:none; margin-top:var(--spacing-2);}\n.c-permission-prompt-resolved-note{margin:0; font-size:var(--text-caption-size); color:var(--color-neutral-5); line-height:1.5;}\n\n/* Rule 9 \u2014 inside Chat window, the card fills the conversation column\n   instead of capping at 360px, same rule the AI bubble text itself\n   already follows (.c-chat-msg.is-ai .c-chat-bubble is max-width:\n   100%) \u2014 the card reads as part of that turn's own width, not a\n   smaller object dropped into it. Scoped to .c-chat-msg.is-ai so a\n   standalone card elsewhere stays at its own 360px default. */\n.c-chat-msg.is-ai .c-permission-prompt{max-width:none; width:100%;}\n\n/* Rule 10 \u2014 mobile restacks the actions by priority, not just by\n   width. Pagination's own 767px breakpoint, reused rather than a new\n   one invented for this component. Card goes full-width; the actions\n   become one full-width button per row, Primary (Allow for session)\n   on top, Secondary (Allow once) beneath it, Deny last \u2014 the reverse\n   of desktop's deny-first left-to-right order. DOM/tab order is left\n   exactly as desktop's (still Deny -> Once -> Session): only the\n   visual stacking flips, via `order` on each button, not a markup\n   change, so a keyboard user tabs through the same sequence either\n   way. Desktop is untouched \u2014 three Button instances at natural\n   width, one row. */\n@media (max-width:767px){\n  .c-permission-prompt,.c-permission-prompt.is-resolved{max-width:none; width:100%;}\n  .c-permission-prompt-actions{display:flex; flex-direction:column; gap:var(--spacing-8);}\n  .c-permission-prompt-session{order:1; width:100%; justify-content:center;}\n  .c-permission-prompt-once{order:2; width:100%; justify-content:center;}\n  .c-permission-prompt-deny{order:3; width:100%; justify-content:center;}\n}\n\n/* Rule 11 \u2014 reduced motion drops the entrance fade and the detail's\n   expand/rotate transitions; the same information stays, same layout. */\n@media (prefers-reduced-motion:reduce){\n  .c-permission-prompt,.c-permission-prompt-resolved{animation:none;}\n  .c-permission-prompt-detail,.c-permission-prompt-toggle i{transition:none;}\n}";

const ROWS = [
  { key: 'File', value: '/workspace/pipeline-config.ts' },
  { key: 'Access', value: 'Read-only' },
];
const LABEL = 'Read pipeline-config.ts?';
const SCOPE = 'Allow once covers just this file. Allow for session covers every file read for the rest of this conversation.';
const DENIED = 'Declined. The assistant will continue without reading this file.';
const EXPIRED = 'No answer before the conversation moved on. Nothing was read.';

// Mirrors render() in preview.html (23588–23660) so the old column is the markup the DLS gallery builds.
function oldCard(status: PermissionPromptStatus, risk: 'low' | 'medium' | 'high' = 'low', open = status === 'pending') {
  const detail = `<div class="c-permission-prompt-detail${open ? ' is-expanded' : ''}"><div class="c-permission-prompt-detail-inner"><div class="c-permission-prompt-detail-list">${ROWS.map(r => `<div class="c-permission-prompt-detail-row"><span class="key">${r.key}</span><span class="value">${r.value}</span></div>`).join('')}</div></div></div>`;
  const toggle = `<button type="button" class="c-permission-prompt-toggle" aria-expanded="${open}"><span>${status === 'pending' ? 'What this will do' : 'View details'}</span><i class="ph ph-caret-down"></i></button>`;
  if (status === 'pending') {
    const badge = { low: 'c-badge-success', medium: 'c-badge-warning', high: 'c-badge-error' }[risk];
    const text = { low: 'Low', medium: 'Medium', high: 'High' }[risk];
    return `<div class="c-card c-permission-prompt"><div class="c-permission-prompt-head"><span class="c-permission-prompt-icon"><i class="ph ph-file-text"></i></span><p class="c-permission-prompt-label">${LABEL}</p><span class="c-badge ${badge}">${text} risk</span></div>${toggle}${detail}<p class="c-permission-prompt-scope">${SCOPE}</p><div class="c-permission-prompt-actions"><button type="button" class="c-btn c-btn-ghost c-btn-sm c-permission-prompt-deny">Deny</button><button type="button" class="c-btn c-btn-secondary c-btn-sm c-permission-prompt-once">Allow once</button><button type="button" class="c-btn c-btn-primary c-btn-sm c-permission-prompt-session">Allow for session</button></div></div>`;
  }
  const cls = status === 'allowed' ? 'c-badge-success' : status === 'denied' ? 'c-badge-error' : 'c-badge-neutral';
  const icon = status === 'allowed' ? 'ph-fill ph-check-circle' : status === 'denied' ? 'ph-fill ph-x-circle' : 'ph-fill ph-clock';
  const word = status === 'allowed' ? 'Allowed' : status === 'denied' ? 'Denied' : 'Expired';
  const note = status === 'denied' ? DENIED : status === 'expired' ? EXPIRED : '';
  return `<div class="c-card c-permission-prompt is-resolved"><div class="c-permission-prompt-resolved"><span class="c-permission-prompt-resolved-label">${LABEL}</span><span class="c-badge ${cls}"><i class="${icon}"></i>${word}</span></div>${toggle}${detail}${note ? `<p class="c-permission-prompt-resolved-note">${note}</p>` : ''}</div>`;
}

const shared = { icon: FileText, label: LABEL, details: ROWS, scopeNote: SCOPE, deniedNote: DENIED, expiredNote: EXPIRED };

interface Row {
  id: string;
  label: string;
  note?: string;
  next: ReactNode;
  old: string;
}

const rows: Row[] = [
  { id: 'pending-low', label: 'Pending, Low risk (detail open)', next: <PermissionPrompt status="pending" risk="low" {...shared} />, old: oldCard('pending', 'low') },
  { id: 'pending-medium', label: 'Pending, Medium risk', next: <PermissionPrompt status="pending" risk="medium" {...shared} />, old: oldCard('pending', 'medium') },
  { id: 'pending-high', label: 'Pending, High risk', next: <PermissionPrompt status="pending" risk="high" {...shared} />, old: oldCard('pending', 'high') },
  { id: 'allowed', label: 'Allowed (detail folded)', next: <PermissionPrompt status="allowed" risk="low" {...shared} />, old: oldCard('allowed') },
  { id: 'denied', label: 'Denied, with note', next: <PermissionPrompt status="denied" risk="low" {...shared} />, old: oldCard('denied') },
  { id: 'expired', label: 'Expired, with note', next: <PermissionPrompt status="expired" risk="low" {...shared} />, old: oldCard('expired') },
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
          <div className="pg-specimen" dangerouslySetInnerHTML={{ __html: row.old }} />
        </div>
      </div>
    </section>
  );
}

export function PermissionPromptPreview() {
  return (
    <>
      <style>{legacyPermissionPromptCss}</style>
      {rows.map(row => (
        <Compare key={row.id} row={row} />
      ))}
    </>
  );
}

export default PermissionPromptPreview;
