'use client';

// Tool approval preview: both question types, with the OLD HTML + CSS
// (collabrium-dls/components.css) rendered beside them for visual
// comparison. Never part of the package build.
import type { ReactNode } from 'react';
import { ToolApproval } from './ToolApproval';
import type { ToolApprovalQuestion } from './ToolApproval';

// Copied verbatim from collabrium-dls/components.css: .c-card (276, 287),
// .c-pagination-indicator (3764), c-thinking-row-in (5452), .c-choice and the
// radio and checkbox glyphs (3084–3094), .c-field (129–185) and Tool approval
// (5713–5812), for side-by-side comparison only. Never shipped in the package.
// The Button the old markup uses comes from the package's own CSS.
export const legacyToolApprovalCss = ".c-card{background:var(--color-neutral-1); border:1px solid var(--color-neutral-3); border-radius:var(--radius-lg); box-shadow:var(--shadow-1); padding:var(--spacing-16); display:flex; flex-direction:column; gap:var(--spacing-8); transition:box-shadow var(--duration-base) var(--ease-settle); width:100%; min-width:240px; height:100%; box-sizing:border-box;}\n.c-card h5{margin:0; font-size:var(--text-h5-size); font-weight:var(--text-h5-weight);}\n.c-card p{margin:0; font-size:var(--text-body2-size); color:var(--color-neutral-5);}\n.c-pagination-indicator{display:none; font-size:var(--text-caption-size); font-weight:700; color:var(--color-neutral-9); padding:0 var(--spacing-4);}\n@keyframes c-thinking-row-in{ from{opacity:0; transform:translateY(4px);} to{opacity:1; transform:translateY(0);} }\n\n.c-choice{position:relative; display:flex; align-items:flex-start; gap:var(--spacing-8); cursor:pointer;}\n.c-choice.disabled{opacity:.5; cursor:not-allowed;}\n.c-choice input{position:absolute; opacity:0; width:0; height:0;}\n.c-choice .text{display:flex; flex-direction:column;}\n.c-choice .text .label{font-size:var(--text-body1-size); font-weight:500; color:var(--color-neutral-9);}\n.c-choice .text .desc{font-size:var(--text-caption-size); color:var(--color-neutral-5);}\n.c-checkbox-box{width:18px; height:18px; flex:none; margin-top:var(--spacing-2); border-radius:var(--radius-xs); border:1px solid var(--color-neutral-3); background:var(--color-neutral-1); color:var(--color-neutral-1); display:flex; align-items:center; justify-content:center; font-size:12px; transition:background-color var(--duration-fast) var(--ease-standard),border-color var(--duration-fast) var(--ease-standard);}\n.c-checkbox-box.on{border-color:var(--color-obsidian); background:var(--color-obsidian);}\n.c-radio-circle{width:18px; height:18px; flex:none; margin-top:var(--spacing-2); border-radius:var(--radius-pill); border:1px solid var(--color-neutral-3); background:var(--color-neutral-1); display:flex; align-items:center; justify-content:center; transition:border-color var(--duration-fast) var(--ease-standard);}\n.c-radio-circle.on{border-color:var(--color-obsidian);}\n.c-radio-circle .dot{width:9px; height:9px; border-radius:var(--radius-pill); background:var(--color-obsidian);}\n\n.c-field{display:flex; flex-direction:column; gap:var(--spacing-4); width:220px;}\n.c-field label{font-size:var(--text-label1-size); font-weight:var(--text-label1-weight);}\n.c-field label .required-mark{color:var(--color-red); font-weight:700; margin-left:var(--spacing-4);}\n.c-field label .required-label-icon{color:var(--color-neutral-5); font-size:var(--icon-sm); margin-left:var(--spacing-4); vertical-align:middle;}\n.c-field input{height:var(--control-height-md); border-radius:var(--radius-sm); border:1px solid var(--color-neutral-3); padding:0 var(--spacing-12); font-size:var(--text-body2-size); font-family:inherit; color:var(--color-neutral-9);}\n.c-field input:focus{outline:none; border:2px solid var(--color-obsidian); padding:0 11px;}\n.c-field-error input{border:2px solid var(--color-red); padding:0 11px;}\n.c-helper{font-size:var(--text-caption-size); color:var(--color-neutral-5);}\n.c-field-error .c-helper{color:var(--color-red);}\n.c-field input:disabled{background:var(--color-neutral-2); color:var(--color-neutral-5);}\n\n/* Success state \u2014 DESIGN-SYSTEM.md Input field, \"Success / valid state\"\n   table: 1px Green border, trailing check-circle icon (Tier 2 Fill). */\n.c-field-success input{border:1px solid var(--color-green);}\n\n/* Leading/trailing icon + icon-button plumbing shared by Password field\n   and Search input \u2014 DESIGN-SYSTEM.md Input field, \"Optional leading/\n   trailing icon\" paragraph. */\n.c-field .input-wrap{position:relative; display:flex; align-items:center;}\n/* Row-flex containers don't stretch a child to fill the main axis the\n   way .c-field's own column flex does for the plain Default/Error/\n   Disabled inputs above \u2014 without this, the input falls back to its\n   browser-default intrinsic width, which left the box short of the\n   field's full width and made trailing icons/buttons read as sitting\n   outside the box instead of inset inside it. */\n.c-field .input-wrap input{width:100%; min-width:0;}\n.c-field .icon-leading,.c-field .icon-trailing{position:absolute; display:flex; pointer-events:none; color:var(--color-neutral-5); font-size:var(--icon-sm);}\n.c-field .icon-leading{left:var(--spacing-12);}\n.c-field .icon-trailing{right:var(--spacing-12);}\n\n/* Success icon color must come after the generic .icon-trailing rule\n   above so it isn't overridden by it (equal specificity, source order\n   decides) \u2014 DESIGN-SYSTEM.md Input field, \"Success / valid state\" table. */\n.c-field-success .icon-trailing{color:var(--color-green);}\n.c-field .input-wrap.has-leading-icon input{padding-left:36px;}\n.c-field .input-wrap.has-trailing-icon input{padding-right:36px;}\n.c-field .input-wrap.has-icon-btn input{padding-right:36px;}\n.c-field .icon-btn{position:absolute; right:var(--spacing-12); display:flex; align-items:center; justify-content:center; background:none; border:none; padding:0; color:var(--color-neutral-5); font-size:var(--icon-sm); cursor:pointer; pointer-events:auto;}\n.c-field .icon-btn:hover{color:var(--color-neutral-9);}\n.c-field .icon-btn:focus-visible{outline:var(--focus-ring-width) solid var(--focus-ring-color); outline-offset:var(--focus-ring-offset);}\n\n/* Prefix/suffix adornments \u2014 DESIGN-SYSTEM.md Input field, \"Prefix/\n   suffix text adornments\" rule: fixed non-editable text, caption\n   token, Neutral-5, no background, vertically centered. */\n.c-field .adornment{position:absolute; display:flex; align-items:center; font-size:var(--text-caption-size); color:var(--color-neutral-5); pointer-events:none;}\n.c-field .adornment-prefix{left:var(--spacing-12);}\n.c-field .adornment-suffix{right:var(--spacing-12);}\n.c-field .input-wrap.has-prefix input{padding-left:28px;}\n.c-field .input-wrap.has-suffix input{padding-right:32px;}\n\n/* Character counter \u2014 DESIGN-SYSTEM.md Input field, \"Character/word\n   counter\" rule: caption, Neutral-5, right-aligned, shares the\n   helper-text line, turns Red at/over the limit. */\n.counter-row{display:flex; justify-content:flex-end;}\n.char-counter{font-size:var(--text-caption-size); color:var(--color-neutral-5);}\n.char-counter.at-limit{color:var(--color-red);}\n\n\n   Tool approval \u2014 AI Native's sixth subcomponent, a one-question-at-\n   a-time card for the decisions only the person can make before the\n   AI's current task can proceed. See DESIGN-SYSTEM.md's own \"Tool\n   approval\" section for the full 19-rule contract this markup alone\n   can't express (radio auto-advance vs. checkbox's explicit Continue,\n   options and free text being mutually exclusive, dismiss never being\n   disabled to force completion, dismiss/Send/Stop all closing the\n   instance the same way, for good) \u2014 this file only owns the shell,\n   the option row, and the custom-answer field.\n   Class prefix: .c-tool-approval*. Reuses Card (.c-card), Radio\n   (.c-radio-circle/.dot), Checkbox (.c-checkbox-box + its label/desc\n   text anatomy), Pagination's compact step indicator, and the Input\n   field/Textarea pair verbatim throughout \u2014 no new controls invented\n   for any of it. */\n.c-tool-approval{position:relative; width:100%; max-width:var(--measure-sm); overflow:hidden; animation:c-thinking-fade-in var(--duration-reveal) var(--ease-reveal) both;}\n\n/* Head \u2014 question on the left; pagination (Prev/Next + step count)\n   and dismiss (\u00d7) grouped together in the top-right corner, same row.\n   align-items:center (not flex-start) \u2014 at heading-5 the question is\n   single-line far more often than not, and top-aligning made the\n   topbar read as floating above the question's own vertical center\n   rather than sitting with it. A question that still wraps to 2-3\n   lines centers the topbar against the full wrapped block instead of\n   pinning it to the first line, a deliberate trade accepted for the\n   common single-line case. */\n.c-tool-approval-head{display:flex; align-items:center; justify-content:space-between; gap:var(--spacing-12); margin-bottom:var(--spacing-8);}\n.c-tool-approval-topbar{display:flex; align-items:center; gap:var(--spacing-2); flex:none;}\n/* Pagination's own step indicator is display:none by default \u2014 it's\n   Pagination's mobile fallback, only shown under its own 767px\n   breakpoint where the numbered button cluster gets hidden. Tool\n   approval has no numbered cluster to fall back from; it's compact-\n   only, always, so the indicator needs forcing visible here regardless\n   of viewport width. */\n.c-tool-approval-topbar .c-pagination-indicator{display:inline-flex; padding:0 var(--spacing-4);}\n.c-tool-approval-dismiss{flex:none; margin-left:var(--spacing-4); color:var(--color-neutral-5);}\n.c-tool-approval-dismiss:hover{color:var(--color-neutral-9);}\n/* .c-tool-approval prefixed on this selector isn't decorative \u2014 Card's\n   own default p reset (.c-card p, specificity 0,1,1) otherwise beats a\n   bare .c-tool-approval-question (0,1,0) on font-size and color alike,\n   silently downgrading the question to body2 gray. Verified via actual\n   computed styles, not assumed: this was already wrong pre-v0.9.81/82,\n   at heading-3/Secondary too, not something today's changes caused. */\n.c-tool-approval .c-tool-approval-question{flex:1; min-width:0; margin:0; font-family:var(--font-primary); font-size:var(--text-h5-size); line-height:var(--text-h5-lh); font-weight:var(--text-h5-weight); color:var(--color-neutral-9); animation:c-thinking-row-in var(--duration-slow) var(--ease-settle) both;}\n\n/* Viewport \u2014 height animates to fit whichever question is active\n   (pose change: duration-morph/ease-morph, the same pairing Prompt\n   input bar's own expand/collapse morph uses). Content crossfades in\n   place (c-thinking-row-in, already used for Thinking's own trace\n   rows) while the viewport height morphs around it. */\n.c-tool-approval-viewport{overflow:hidden; transition:height var(--duration-morph) var(--ease-morph);}\n.c-tool-approval-body{padding-bottom:var(--spacing-2);}\n.c-tool-approval-options{display:flex; flex-direction:column; animation:c-thinking-row-in var(--duration-slow) var(--ease-settle) both;}\n\n/* Option row \u2014 real Radio (.c-radio-circle/.dot) or Checkbox\n   (.c-checkbox-box) glyphs and .c-choice text styles, verbatim. Hover\n   fill reuses Dropdown option's own hover token (Neutral-2). No gap\n   between rows \u2014 each row's own spacing-8 padding (16px row-to-row) is\n   the only rhythm, same contiguous-menu convention as Dropdown's own\n   option list. */\n.c-tool-approval-option{border-radius:var(--radius-sm); padding:var(--spacing-8); margin:0 calc(var(--spacing-8) * -1); transition:background-color var(--duration-fast) var(--ease-standard);}\n.c-tool-approval-option:hover{background:var(--color-neutral-2);}\n\n/* Custom answer \u2014 the real Input field default (.c-field > label +\n   input) at rest; on focus it morphs into the real Textarea (.c-field\n   > label + textarea), same components/markup as the Input\n   field/Textarea comp-blocks, just at 100% width instead of .c-field's\n   own 220px demo default. The height change is carried by\n   .c-tool-approval-viewport's own height-morph transition. */\n.c-tool-approval-custom{margin-top:var(--spacing-8);}\n.c-tool-approval-custom .c-field{width:100%;}\n/* .c-field input/textarea are content-box by default (Input field's\n   own focus rule depends on that \u2014 border grows 1px->2px while padding\n   drops 12px->11px to compensate, so the outer box stays put at a\n   fixed px width). Stretched to a percentage width here, that same\n   padding/border would stack on top of the 100% and overflow past the\n   card's own overflow:hidden \u2014 border-box fixes it so width:100% means\n   the real outer edge, without changing how the focus state renders. */\n.c-tool-approval-custom .c-field input,\n.c-tool-approval-custom .c-field textarea{box-sizing:border-box;}\n.c-tool-approval-custom textarea{animation:c-thinking-row-in var(--duration-slow) var(--ease-settle) both;}\n\n/* Footer \u2014 Skip (Ghost) + Continue/Send (Primary), right-aligned.\n   margin-top:0, not spacing-16 \u2014 Card's own layout (.c-card, display:\n   flex; flex-direction:column; gap:spacing-8) already places spacing-8\n   between its two direct children (.c-tool-approval-viewport and this\n   footer); a margin here would stack on top of that gap rather than\n   replace it. Measures ~10px net (8px gap + .c-tool-approval-body's\n   own 2px padding-bottom, kept for focus-ring clearance under the\n   viewport's overflow:hidden), not an exact 8 \u2014 close enough to read\n   as the same rhythm as the head-to-options gap below. */\n.c-tool-approval-footer{display:flex; align-items:center; justify-content:flex-end; gap:var(--spacing-12); margin-top:0;}\n.c-tool-approval-actions{display:flex; align-items:center; gap:var(--spacing-8);}\n\n/* Rules 16/17 \u2014 Tool approval is an extension of the Prompt input bar,\n   not the thread: it's pinned just above the composer and does not\n   scroll with the conversation, which continues to scroll normally\n   underneath/behind it \u2014 the same relationship a fixed reply bar or\n   toolbar has to the content below it. No scrim, no dimming, no\n   blocking: the thread stays fully interactive at all times, and\n   whatever message happens to be scrolled to that position can sit";

const radioQuestion: ToolApprovalQuestion = {
  question: 'Should we pull the Q4 renewals forward, or hold to schedule?',
  type: 'single',
  options: [
    { label: 'Pull forward from Q4', description: "Closes the gap faster, but front-loads next quarter's own risk" },
    { label: 'Hold to original schedule', description: 'No disruption to Q4 planning, gap stays open longer' },
    { label: 'Split — pull forward one', description: 'Partial coverage, keeps one renewal as a Q4 cushion' },
  ],
};
const checkboxQuestion: ToolApprovalQuestion = {
  question: 'Which channels should the reminder go out on?',
  type: 'multiple',
  options: [{ label: 'Email', description: 'Sent from the account owner' }, { label: 'SMS' }],
};

// Mirrors render() in preview.html (23785–23870) so the old column is the markup the DLS gallery builds.
function oldCard(q: ToolApprovalQuestion, n: number, total: number, chosen: number[] = [], last = false) {
  const options = q.options
    .map((o, i) => {
      const on = chosen.includes(i);
      const glyph =
        q.type === 'single'
          ? `<span class="c-radio-circle${on ? ' on' : ''}">${on ? '<span class="dot"></span>' : ''}</span>`
          : `<span class="c-checkbox-box${on ? ' on' : ''}">${on ? '<i class="ph ph-check"></i>' : ''}</span>`;
      return `<label class="c-choice c-tool-approval-option"><input type="${q.type === 'single' ? 'radio' : 'checkbox'}" name="old-ta-${n}"${on ? ' checked' : ''} />${glyph}<span class="text"><span class="label">${o.label}</span>${o.description ? `<span class="desc">${o.description}</span>` : ''}</span></label>`;
    })
    .join('');
  const answered = chosen.length > 0;
  return `<div class="c-card c-tool-approval"><div class="c-tool-approval-viewport"><div class="c-tool-approval-body"><div class="c-tool-approval-head"><p class="c-tool-approval-question">${q.question}</p><div class="c-tool-approval-topbar"><button type="button" class="c-btn c-btn-ghost c-btn-icon c-btn-sm" aria-label="Previous question"${n <= 1 ? ' disabled' : ''}><i class="ph ph-caret-left"></i></button><span class="c-pagination-indicator">${n} / ${total}</span><button type="button" class="c-btn c-btn-ghost c-btn-icon c-btn-sm" aria-label="Next question"${n >= total ? ' disabled' : ''}><i class="ph ph-caret-right"></i></button><button type="button" class="c-btn c-btn-ghost c-btn-icon c-btn-sm c-tool-approval-dismiss" aria-label="Dismiss"><i class="ph ph-x"></i></button></div></div><div class="c-tool-approval-options">${options}</div><div class="c-tool-approval-custom"><div class="c-field"><label class="sr-only" for="old-ta-c-${n}">Custom answer</label><input type="text" id="old-ta-c-${n}" placeholder="Something else…" /></div></div></div></div><div class="c-tool-approval-footer"><div class="c-tool-approval-actions"><button type="button" class="c-btn c-btn-ghost c-btn-sm">Skip</button><button type="button" class="c-btn c-btn-primary c-btn-sm"${answered ? '' : ' disabled'}>${last ? 'Send' : 'Continue'}</button></div></div></div>`;
}

interface Row {
  id: string;
  label: string;
  note?: string;
  next: ReactNode;
  old: string;
}

const rows: Row[] = [
  {
    id: 'single',
    label: 'Single choice, question 1 of 2, nothing chosen',
    note: 'The new options are the library\'s Radio, so a circle also reacts to hover and press, and the written answer is the library\'s Input field (its placeholder is Neutral-5).',
    next: <ToolApproval questions={[radioQuestion, { ...radioQuestion, question: 'Who should own the outreach?' }]} />,
    old: oldCard(radioQuestion, 1, 2),
  },
  {
    id: 'multiple',
    label: 'Multiple choice, question 1 of 1',
    next: <ToolApproval questions={[checkboxQuestion]} />,
    old: oldCard(checkboxQuestion, 1, 1, [], true),
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
          <div className="pg-specimen" dangerouslySetInnerHTML={{ __html: row.old }} />
        </div>
      </div>
    </section>
  );
}

export function ToolApprovalPreview() {
  return (
    <>
      <style>{legacyToolApprovalCss}</style>
      {rows.map(row => (
        <Compare key={row.id} row={row} />
      ))}
    </>
  );
}

export default ToolApprovalPreview;
