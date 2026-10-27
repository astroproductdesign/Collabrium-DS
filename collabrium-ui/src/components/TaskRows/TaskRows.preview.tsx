'use client';

// Task Rows preview: the states and both variants, with the OLD HTML + CSS
// (collabrium-dls/components.css) rendered beside them for visual
// comparison. Never part of the package build.
import type { ReactNode } from 'react';
import { TaskRows } from './TaskRows';
import type { TaskRowsTask } from './TaskRows';

// Copied verbatim from collabrium-dls/components.css lines 5563–5707 (Task
// Rows) plus 4334 and 4370–4375 (Stepper's .c-step-indicator, which it
// reuses), for side-by-side comparison only. Never shipped in the package.
// The Badge and Button the old markup uses come from the package's own CSS.
export const legacyTaskRowsCss = "/* =========================================================\n   Task Rows \u2014 AI Native's eighth subcomponent: the named tasks an\n   agent run is working through, each with its own terminal status\n   and its own droppable detail steps. Thinking's sibling one level\n   up \u2014 Thinking traces ONE operation and settles into a past-tense\n   header; this is a run of several independent tasks where one can\n   fail while the others succeed. See DESIGN-SYSTEM.md's own \"Task\n   Rows\" section for the full 18-rule contract this markup alone\n   can't express (the two-task gate, one row open at a time, a\n   failure taking the open slot, the single retry, and above all\n   Rule 9 \u2014 a control on the row only where the reader supplies\n   nothing, prose in the conversation wherever they have to supply\n   something, which is why Retry is the only control here).\n\n   Composes with nothing, and that is deliberate: it is the only AI\n   Native subcomponent that needs no other one to function. Three\n   parts are reused verbatim rather than redrawn \u2014 .c-step-indicator\n   for the 24px status disc (its upcoming/completed/error states ARE\n   this component's four marks, glyph choice and contrast already\n   reasoned out in Stepper), .c-badge Success/Error/Neutral for the\n   pills, and .c-btn Secondary/sm for Retry. The spin reuses Search\n   input's own c-search-input-spin keyframe \u2014 one spin technique,\n   system-wide.\n   Class prefix: .c-tasks* \u2014 kept flat rather than .c-task-rows-*,\n   the same call Chat window made against .c-chat-window-*: there is\n   one task list in the system and the longer prefix would buy\n   nothing over a dozen sub-parts. */\n\n/* Root. max-width 440px, not Thinking's 380px: a task row carries\n   four slots across (mark, label, count, pill, chevron) where a\n   Thinking header carries two, and 380px forces the label to\n   ellipsis on realistic copy. --capsules holds a min-height so\n   the response below it doesn't jump as rows arrive \u2014 Thinking's\n   Rule 10, same reasoning; --list doesn't need one because its\n   single surface already reserves the box. */\n.c-tasks{display:flex; flex-direction:column; width:100%; max-width:440px; font-family:var(--font-primary);}\n.c-tasks--capsules{gap:var(--spacing-8); min-height:196px;}\n.c-tasks--list{gap:0; align-self:flex-start; overflow:hidden; background:var(--color-neutral-1); border:var(--border-width-sm) solid var(--color-neutral-3); border-radius:var(--radius-lg); box-shadow:var(--shadow-1);}\n\n/* Row. The radius tightens as it opens \u2014 radius-lg (20px) closed,\n   radius-md (16px) open \u2014 which is the source's 22\u219214 move\n   expressed in real tokens: a capsule reads as a pill, an open\n   panel reads as a card. */\n.c-tasks-row{align-self:stretch; overflow:hidden; animation:c-tasks-row-in var(--duration-slow) var(--ease-reveal) both; transition:border-radius var(--duration-base) var(--ease-morph), background-color var(--duration-fast) var(--ease-standard);}\n.c-tasks--capsules .c-tasks-row{background:var(--color-neutral-1); border:var(--border-width-sm) solid var(--color-neutral-3); border-radius:var(--radius-lg); box-shadow:var(--shadow-1);}\n.c-tasks--capsules .c-tasks-row.is-open{border-radius:var(--radius-md);}\n.c-tasks--list .c-tasks-row{background:transparent; border-radius:0; border-bottom:var(--border-width-sm) solid var(--color-neutral-3);}\n.c-tasks--list .c-tasks-row:last-child{border-bottom:none;}\n.c-tasks-row:hover{background:var(--color-neutral-2);}\n@keyframes c-tasks-row-in{ from{opacity:0; transform:translateY(8px);} to{opacity:1; transform:translateY(0);} }\n\n/* Head \u2014 the whole row is the disclosure control, one <button>.\n   Nothing else interactive lives inside it: a second <button>\n   nested in this one would be invalid HTML, which is the reason\n   Retry lives in the detail region below rather than up here. */\n.c-tasks-head{display:flex; align-items:center; gap:var(--spacing-12); width:100%; min-height:44px; padding:0 var(--spacing-12); border:none; background:transparent; font-family:inherit; text-align:left; cursor:pointer;}\n.c-tasks-head:focus-visible{outline:var(--border-width-md) solid var(--color-obsidian); outline-offset:-2px;}\n\n/* Mark \u2014 .c-step-indicator reused verbatim for all four states.\n   The pop-in fires once per state change (the node is replaced on\n   change, so a fresh element restarts it) \u2014 scale only, no\n   overshoot: \"movement settles, it never bounces.\" */\n.c-tasks-mark{position:relative; flex:none; display:flex; align-items:center; justify-content:center; width:var(--icon-md); height:var(--icon-md);}\n.c-tasks-mark .c-step-indicator{animation:c-tasks-mark-in var(--duration-base) var(--ease-morph) both;}\n@keyframes c-tasks-mark-in{ from{opacity:0; transform:scale(.62);} to{opacity:1; transform:scale(1);} }\n\n/* Active ring. The source drew an inline SVG circle pair; this is\n   the same 2px track + 28% sweeping arc in pure CSS, so the\n   component ships no SVG and reuses this system's one spin\n   keyframe.  The indicator's own 1px border is suppressed while\n   active so the 2px ring is the only track.\n\n   The z-index is load-bearing, not defensive: the mark's own\n   pop-in leaves transform:scale(1) applied (fill-mode both), a\n   non-none transform makes the indicator a stacking context, and\n   without this the white disc paints straight over the ring and\n   hides it outright. */\n.c-tasks-mark.is-active .c-step-indicator{border-color:transparent;}\n.c-tasks-ring{position:absolute; inset:0; z-index:1; border-radius:var(--radius-pill); border:var(--border-width-md) solid var(--color-neutral-3); pointer-events:none;}\n.c-tasks-ring::after{content:''; position:absolute; inset:calc(-1 * var(--border-width-md)); border-radius:inherit; background:conic-gradient(var(--color-neutral-7) 0 28%, transparent 28%); -webkit-mask:radial-gradient(closest-side, transparent calc(100% - var(--border-width-md)), #000 0); mask:radial-gradient(closest-side, transparent calc(100% - var(--border-width-md)), #000 0); animation:c-search-input-spin var(--duration-ambient) linear infinite;}\n\n.c-tasks-label{min-width:0; flex:1 1 auto; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; font-size:var(--text-label1-size); line-height:var(--text-label1-lh); font-weight:var(--text-label1-weight); color:var(--color-neutral-9);}\n.c-tasks-count{flex:none; font-size:var(--text-caption-size); line-height:var(--text-caption-lh); color:var(--color-neutral-5); font-variant-numeric:tabular-nums;}\n\n/* Pill \u2014 the real Badge, Success / Error / Neutral, verbatim.\n   The glyph spins only in Retrying: in the source the Failed pill\n   spun a retry glyph while nothing was retrying, which promises\n   recovery the component wasn't doing. Now the spin means an\n   attempt is genuinely in flight, and Failed carries no glyph. */\n.c-tasks-head .c-badge{flex:none; animation:c-tasks-fade-in var(--duration-base) var(--ease-standard) both;}\n.c-tasks-head .c-badge i{font-size:var(--icon-micro);}\n.c-tasks-head .c-badge i.is-spin{animation:c-search-input-spin var(--duration-ambient) linear infinite;}\n@keyframes c-tasks-fade-in{ from{opacity:0;} to{opacity:1;} }\n\n.c-tasks-chevron{flex:none; display:flex; align-items:center; justify-content:center; width:var(--icon-md); height:var(--icon-md); margin-right:calc(-1 * var(--spacing-4)); color:var(--color-neutral-5); font-size:var(--icon-sm); transition:transform var(--duration-base) var(--ease-standard);}\n.c-tasks-row.is-open .c-tasks-chevron{transform:rotate(180deg);}\n\n/* Detail \u2014 0fr\u21921fr grid-rows, Thinking's own expand technique\n   verbatim, at the same duration-base / ease-settle pairing. */\n.c-tasks-detail{display:grid; grid-template-rows:0fr; opacity:0; transition:grid-template-rows var(--duration-base) var(--ease-settle), opacity var(--duration-base) var(--ease-settle);}\n.c-tasks-row.is-open .c-tasks-detail{grid-template-rows:1fr; opacity:1;}\n.c-tasks-detail-inner{overflow:hidden;}\n\n/* The 24px first column is the mark column repeated, so the\n   timeline rule lands dead-centre under the disc above it \u2014\n   derived from --icon-md, not a hand-picked offset (Thinking's\n   line does the same off --icon-sm). */\n.c-tasks-steps{display:grid; grid-template-columns:var(--icon-md) minmax(0,1fr); gap:var(--spacing-12); padding:0 var(--spacing-12) var(--spacing-12);}\n.c-tasks-line{width:var(--border-width-sm); height:100%; margin:0 auto; background:var(--color-neutral-3);}\n.c-tasks-step-list{display:flex; flex-direction:column; gap:var(--spacing-4);}\n.c-tasks-step{display:flex; align-items:center; justify-content:space-between; gap:var(--spacing-12); min-height:var(--text-caption-lh);}\n.c-tasks-row.is-open .c-tasks-step{animation:c-tasks-row-in var(--duration-base) var(--ease-settle) both;}\n.c-tasks-step-label{min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; font-size:var(--text-caption-size); line-height:var(--text-caption-lh); color:var(--color-neutral-9);}\n.c-tasks-step-meta{flex:none; font-size:var(--text-footnote-size); line-height:var(--text-footnote-lh); color:var(--color-neutral-5); font-variant-numeric:tabular-nums;}\n\n/* Failure block \u2014 the reason, and Retry when there is something to\n   retry.  It sits in the step list's own column so the timeline\n   rule runs past it: the failure is the last thing that happened\n   in this task, not a footnote bolted under it.\n\n   The reason is Neutral-5, not red. Red 12px text measures 3.66:1\n   on white and 3.20:1 on Badge Error's own tint \u2014 both under the\n   4.5:1 floor for normal text. The red stays where Badge already\n   puts it and the reason reads as the secondary line it is. */\n.c-tasks-fail{display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:var(--spacing-8); margin-top:var(--spacing-8); padding-top:var(--spacing-8); border-top:var(--border-width-sm) solid var(--color-neutral-3);}\n.c-tasks-reason{margin:0; min-width:0; flex:1 1 160px; font-size:var(--text-caption-size); line-height:var(--text-caption-lh); color:var(--color-neutral-5);}\n.c-tasks-fail .c-btn{flex:none; text-decoration:none;}\n.c-tasks-fail .c-btn i{font-size:var(--icon-sm);}\n\n\n/* Overflow summary \u2014 Thinking's Rule 11 applied here: a long run\n   shows the first several tasks and closes with a count. */\n.c-tasks-more{margin:0; font-size:var(--text-caption-size); line-height:var(--text-caption-lh); color:var(--color-neutral-5); padding:var(--spacing-8) var(--spacing-12);}\n.c-tasks--capsules .c-tasks-more{padding-left:0;}\n\n/* Travel drops, sequence stays \u2014 nothing here changes which rows\n   exist, which one is active, or what any status says. The ring's\n   ARC is kept and only its rotation stops: with the spin gone it\n   is the only thing separating Active from Pending, so it is\n   state, not decoration. */\n@media (prefers-reduced-motion:reduce){\n  .c-tasks-row, .c-tasks-detail, .c-tasks-chevron{transition:none;}\n  .c-tasks-row, .c-tasks-mark .c-step-indicator, .c-tasks-head .c-badge, .c-tasks-row.is-open .c-tasks-step{animation:none;}\n  .c-tasks-ring::after, .c-tasks-head .c-badge i.is-spin{animation:none;}\n}\n.c-step-indicator{flex:none; width:24px; height:24px; border-radius:var(--radius-pill); display:flex; align-items:center; justify-content:center; font-family:var(--font-primary); font-size:var(--text-caption-size); font-weight:var(--text-label1-weight);}\n.c-step-indicator.completed{background:var(--color-green); color:var(--color-neutral-1);}\n.c-step-indicator.active{background:var(--color-obsidian); color:var(--color-neutral-1);}\n.c-step-indicator.upcoming{background:var(--color-neutral-1); border:var(--border-width-sm) solid var(--color-neutral-3); color:var(--color-neutral-5);}\n.c-step-indicator.error{background:var(--color-red); color:var(--color-neutral-1);}\n.c-step-indicator.warning{background:var(--color-amber); color:var(--color-obsidian);}\n.c-step-indicator.completed i, .c-step-indicator.error i, .c-step-indicator.warning i{font-size:var(--icon-micro);}";

type Status = 'pending' | 'active' | 'retrying' | 'completed' | 'failed';
interface OldTask {
  status: Status;
  label: string;
  count: string;
  steps: [string, string][];
  reason?: string;
  retry?: boolean;
  open?: boolean;
}

const MARK: Record<Status, { cls: string; say: string }> = {
  pending: { cls: 'upcoming', say: 'Not started' },
  active: { cls: 'upcoming', say: 'In progress' },
  retrying: { cls: 'upcoming', say: 'Retrying' },
  completed: { cls: 'completed', say: 'Completed' },
  failed: { cls: 'error', say: 'Failed' },
};

// Mirrors rowHTML() in preview.html (22725–22765) so the old column is the
// markup the DLS gallery builds.
function oldRow(t: OldTask, n: number) {
  const live = t.status === 'active' || t.status === 'retrying';
  const glyph = t.status === 'completed' ? '<i class="ph ph-check"></i>' : t.status === 'failed' ? '<i class="ph ph-x"></i>' : String(n);
  const pill =
    t.status === 'completed'
      ? '<span class="c-badge c-badge-success">Completed</span>'
      : t.status === 'retrying'
        ? '<span class="c-badge c-badge-neutral">Retrying <i class="ph ph-arrow-clockwise is-spin"></i></span>'
        : t.status === 'failed'
          ? '<span class="c-badge c-badge-error">Failed</span>'
          : '';
  const fail = t.reason
    ? `<div class="c-tasks-fail"><p class="c-tasks-reason">${t.reason}</p>${t.retry ? '<button class="c-btn c-btn-secondary c-btn-sm" type="button"><i class="ph ph-arrow-clockwise"></i> Retry</button>' : ''}</div>`
    : '';
  return `<div role="listitem"><div class="c-tasks-row${t.open ? ' is-open' : ''}"><button class="c-tasks-head" type="button" aria-expanded="${!!t.open}"><span class="c-tasks-mark${live ? ' is-active' : ''}" aria-hidden="true">${live ? '<span class="c-tasks-ring"></span>' : ''}<span class="c-step-indicator ${MARK[t.status].cls}">${glyph}</span></span><span class="c-tasks-label">${t.label}</span><span class="c-tasks-count">${t.count}</span>${pill}<span class="c-tasks-chevron" aria-hidden="true"><i class="ph ph-caret-down"></i></span></button><div class="c-tasks-detail"><div class="c-tasks-detail-inner"><div class="c-tasks-steps"><span class="c-tasks-line" aria-hidden="true"></span><div class="c-tasks-step-list">${t.steps.map(s => `<div class="c-tasks-step"><span class="c-tasks-step-label">${s[0]}</span><span class="c-tasks-step-meta">${s[1]}</span></div>`).join('')}${fail}</div></div></div></div></div></div>`;
}
const oldRoot = (variant: string, tasks: OldTask[]) =>
  `<div class="c-tasks c-tasks--${variant}"><div role="list">${tasks.map((t, i) => oldRow(t, i + 1)).join('')}</div></div>`;

const steps1: [string, string][] = [['Matched tax and contact IDs', '12/12'], ['Flagged stale records', '0']];
const steps2: [string, string][] = [['Reading POS export', '3 files'], ['Scoring stockout risk', '68%']];
const steps3: [string, string][] = [['Cone supplier follow-up', 'sent'], ['Pistachio reorder note', 'failed']];
const REASON = 'The mail service timed out on the second message.';

const t1 = (status: Status = 'completed'): TaskRowsTask => ({ label: 'Verified vendor records', count: '12 suppliers', status, steps: steps1.map(([label, meta]) => ({ label, meta })) });
const t2 = (status: Status = 'active'): TaskRowsTask => ({ label: 'Build reorder task list', count: '7 SKUs', status, steps: steps2.map(([label, meta]) => ({ label, meta })) });
const t3 = (status: Status, reason?: string, retryable?: boolean): TaskRowsTask => ({ label: 'Draft supplier emails', count: '2 messages', status, reason, retryable, steps: steps3.map(([label, meta]) => ({ label, meta })) });
const o1 = (status: Status = 'completed', open = false): OldTask => ({ status, label: 'Verified vendor records', count: '12 suppliers', steps: steps1, open });
const o2 = (status: Status = 'active', open = false): OldTask => ({ status, label: 'Build reorder task list', count: '7 SKUs', steps: steps2, open });
const o3 = (status: Status, reason?: string, retry?: boolean, open = false): OldTask => ({ status, label: 'Draft supplier emails', count: '2 messages', steps: steps3, reason, retry, open });

interface Row {
  id: string;
  label: string;
  note?: string;
  next: ReactNode;
  old: string | null;
}

const rows: Row[] = [
  {
    id: 'capsules-mid',
    label: 'Capsules, mid-run: completed, active (open), pending',
    note: 'The old capsules touch (0px gap): see TASK-1. The new ones are 8px apart.',
    next: <TaskRows tasks={[t1(), t2('active'), t3('pending')]} />,
    old: oldRoot('capsules', [o1(), o2('active', true), o3('pending')]),
  },
  {
    id: 'capsules-failed',
    label: 'Capsules, failed with Retry (open)',
    next: <TaskRows tasks={[t1(), t2('completed'), t3('failed', REASON, true)]} onRetry={() => {}} />,
    old: oldRoot('capsules', [o1(), o2('completed'), o3('failed', REASON, true, true)]),
  },
  {
    id: 'capsules-failed-plain',
    label: 'Capsules, failed with no Retry (open)',
    next: <TaskRows tasks={[t1(), t2('completed'), t3('failed', 'The supplier list is missing a contact for Cone Co.')]} />,
    old: oldRoot('capsules', [o1(), o2('completed'), o3('failed', 'The supplier list is missing a contact for Cone Co.', false, true)]),
  },
  {
    id: 'capsules-retrying',
    label: 'Capsules, retrying (open)',
    next: <TaskRows tasks={[t1(), t2('completed'), t3('retrying')]} />,
    old: oldRoot('capsules', [o1(), o2('completed'), o3('retrying', undefined, false, true)]),
  },
  {
    id: 'list',
    label: 'List, all completed',
    next: <TaskRows variant="list" tasks={[t1(), t2('completed'), t3('completed')]} />,
    old: oldRoot('list', [o1(), o2('completed'), o3('completed')]),
  },
  {
    id: 'list-failed',
    label: 'List, failed with Retry (open)',
    next: <TaskRows variant="list" tasks={[t1(), t2('completed'), t3('failed', REASON, true)]} onRetry={() => {}} />,
    old: oldRoot('list', [o1(), o2('completed'), o3('failed', REASON, true, true)]),
  },
  {
    id: 'more',
    label: 'More than six tasks',
    note: 'The old gallery never shows the "+N more" line, but .c-tasks-more exists in the CSS (5694–5697).',
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
            <p className="pg-missing">No markup in the old gallery. See MIGRATION-LOG.md.</p>
          ) : (
            <div className="pg-specimen" dangerouslySetInnerHTML={{ __html: row.old }} />
          )}
        </div>
      </div>
    </section>
  );
}

export function TaskRowsPreview() {
  return (
    <>
      <style>{legacyTaskRowsCss}</style>
      {rows.map(row => (
        <Compare key={row.id} row={row} />
      ))}
    </>
  );
}

export default TaskRowsPreview;
