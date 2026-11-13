// Stepper preview: the gallery's three steppers, with the OLD HTML + CSS (collabrium-dls/components.css) rendered
// beside them for visual comparison. Never part of the package build.
import type { ReactNode } from 'react';
import { Stepper, type StepperStep } from './Stepper';

// Copied verbatim from collabrium-dls/components.css lines 4329–4408 (Stepper)
// for side-by-side comparison only. Never shipped in the package.
export const legacyStepperCss = ".c-stepper{display:flex; align-items:flex-start; container-type:inline-size;}\n.c-stepper.vertical{flex-direction:column; gap:var(--spacing-8);}\n.c-step{display:flex; flex:none;}\n.c-stepper:not(.vertical) .c-step{flex-direction:column; align-items:center; gap:var(--spacing-8); width:24px;}\n.c-stepper.vertical .c-step{gap:var(--spacing-12);}\n.c-step.is-disabled{opacity:.4; cursor:not-allowed;}\n.c-step-rail{display:flex; flex-direction:column; align-items:center;}\n.c-stepper.vertical .c-step-rail{gap:var(--spacing-8);}\n.c-step-indicator{flex:none; width:24px; height:24px; border-radius:var(--radius-pill); display:flex; align-items:center; justify-content:center; font-family:var(--font-primary); font-size:var(--text-caption-size); font-weight:var(--text-label1-weight);}\n/* Completed/Active — solid fill carries both states; Completed swaps\n   the step number for a check glyph outright rather than keeping an\n   outlined/numbered look. Upcoming stays the plain outlined/numbered\n   treatment for both.\n   Error/Warning are FLAGS layered on top of a step's derived state,\n   never a 4th/5th value in the state enum: Error is only ever added\n   to whichever step is currently Active, Warning only to a step\n   that's already Completed — enforced by the consuming app, not just\n   documented, since an Error on an Upcoming step or a Warning on the\n   Active one asserts something that hasn't happened. At most one\n   Error can exist at a time (follows from there only ever being one\n   Active step); Warnings are unbounded, since each is an independent\n   caveat about a step that's already done. A flagged step drops its\n   number/check for its own glyph and keeps a fill — deliberate for\n   Error even though a fill elsewhere in this indicator means\n   \"settled,\" because Error has to be the loudest thing in the row.\n   Resolving an Error returns the step to plain Active; it does not\n   auto-advance — resolving and advancing are two separate acts.\n   Icons: check/x are Tier 1, Regular (`ph-check`/`ph-x` — both\n   already Iconography's own documented Tier 1 examples: \"check...\n   the Checkbox marks\" and the plain-`x` remove affordance) rather\n   than Tier 2 Fill's `ph-fill ph-check`/`ph-fill ph-x`, which this\n   icon set renders as a checkbox/x-in-a-square glyph, not a bare\n   mark — redundant framing once it sits inside this indicator's own\n   circle. `x-circle`, this system's usual Tier 2 status-error glyph\n   (see Toast), is skipped for the same reason: a second circle\n   nested inside the indicator's own. Warning has no such conflict —\n   `ph-fill ph-warning` is a plain triangle, a textbook Tier 2 case\n   (Iconography's own \"status indicators\" list). All three sized at\n   icon-micro (14px), one scale across the row. Warning's label/\n   description color matches Badge's own `.c-badge-warning` text\n   color exactly (`--color-neutral-9`), not Toast/Banner's darkened\n   amber ink. Contrast (Component Rule 5): Neutral-1 on Red `#FD3343`\n   measures 3.69:1; Obsidian on Amber `#FFA425` measures 7.13:1,\n   Neutral-1 on the same fill fails at 1.98:1. */\n.c-step-indicator.completed{background:var(--color-green); color:var(--color-neutral-1);}\n.c-step-indicator.active{background:var(--color-obsidian); color:var(--color-neutral-1);}\n.c-step-indicator.upcoming{background:var(--color-neutral-1); border:var(--border-width-sm) solid var(--color-neutral-3); color:var(--color-neutral-5);}\n.c-step-indicator.error{background:var(--color-red); color:var(--color-neutral-1);}\n.c-step-indicator.warning{background:var(--color-amber); color:var(--color-obsidian);}\n.c-step-indicator.completed i, .c-step-indicator.error i, .c-step-indicator.warning i{font-size:var(--icon-micro);}\n.c-step-connector{background:var(--color-neutral-3); flex:none;}\n.c-stepper:not(.vertical) .c-step-connector{flex:1; height:var(--border-width-sm); margin:var(--spacing-12) var(--spacing-4) 0;}\n.c-stepper.vertical .c-step-connector{width:var(--border-width-sm); height:var(--spacing-16);}\n.c-step-text{display:flex; flex-direction:column; gap:var(--spacing-4);}\n.c-stepper:not(.vertical) .c-step-text{text-align:center;}\n.c-step-label{font-family:var(--font-primary); font-size:var(--text-body2-size); line-height:var(--text-body2-lh);}\n.c-step-label.active{font-weight:var(--text-label1-weight); color:var(--color-neutral-9);}\n.c-step-label.completed, .c-step-label.upcoming{font-weight:var(--text-body2-weight); color:var(--color-neutral-5);}\n.c-step-label.error{font-weight:var(--text-body2-weight); color:var(--color-red);}\n.c-step-label.warning{font-weight:var(--text-body2-weight); color:var(--color-neutral-9);}\n/* Description is all-or-nothing per stepper (Component Rules), so a\n   flag's message reuses the same slot/line rather than adding a\n   second one — it replaces the step's description, the way Input\n   field's error text replaces its helper, instead of appending\n   beneath it. */\n.c-step-desc{font-family:var(--font-primary); font-size:var(--text-caption-size); line-height:var(--text-caption-lh); font-weight:var(--text-caption-weight); color:var(--color-neutral-5);}\n.c-step-desc.error{color:var(--color-red); font-weight:700;}\n.c-step-desc.warning{color:var(--color-neutral-9); font-weight:700;}\n\n/* Mobile — below 480px of the stepper's own container width (a\n   container query, not viewport, so it responds inside a narrow\n   modal/drawer too): descriptions hide and an overlong label\n   truncates with an ellipsis, a density/scannability improvement for\n   small screens. Horizontal only — vertical is already a single\n   narrow column and needs nothing. */\n@container (max-width:480px){\n  .c-stepper:not(.vertical) .c-step-desc{display:none;}\n  .c-stepper:not(.vertical) .c-step{width:auto; flex:1 1 0; min-width:0;}\n  .c-stepper:not(.vertical) .c-step-label{display:block; max-width:100%; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;}\n}";

const base: StepperStep[] = [{ label: 'Account' }, { label: 'Profile' }, { label: 'Preferences' }, { label: 'Review' }];
const flagged: StepperStep[] = [
  { label: 'Account', description: 'Recovery email unverified', flag: 'warning' },
  { label: 'Profile', description: 'Photo upload failed', flag: 'error' },
  { label: 'Preferences', description: 'Notifications and theme' },
  { label: 'Review', description: 'Confirm and finish' },
];

interface Row {
  id: string;
  label: string;
  next: ReactNode;
  /** Old markup, exactly as preview.html writes it. */
  old: string;
}

const rows: Row[] = [
  {
    id: 'horizontal',
    label: "Horizontal, base states (preview.html 4639\u20134659)",
    next: <Stepper aria-label="Account setup" currentStep={1} steps={base} />,
    old: "<div class=\"c-stepper\"><div class=\"c-step\"><span class=\"c-step-indicator completed\"><i class=\"ph ph-check\"></i></span><div class=\"c-step-text\"><span class=\"c-step-label completed\">Account</span></div></div><span class=\"c-step-connector\"></span><div class=\"c-step\"><span class=\"c-step-indicator active\">2</span><div class=\"c-step-text\"><span class=\"c-step-label active\">Profile</span></div></div><span class=\"c-step-connector\"></span><div class=\"c-step\"><span class=\"c-step-indicator upcoming\">3</span><div class=\"c-step-text\"><span class=\"c-step-label upcoming\">Preferences</span></div></div><span class=\"c-step-connector\"></span><div class=\"c-step\"><span class=\"c-step-indicator upcoming\">4</span><div class=\"c-step-text\"><span class=\"c-step-label upcoming\">Review</span></div></div></div>",
  },
  {
    id: 'vertical',
    label: "Vertical, base states (preview.html 4663\u20134691)",
    next: <div style={{ maxWidth: 280 }}><Stepper aria-label="Account setup" orientation="vertical" currentStep={1} steps={base} /></div>,
    old: "<div style=\"max-width:280px\"><div class=\"c-stepper vertical\"><div class=\"c-step\"><div class=\"c-step-rail\"><span class=\"c-step-indicator completed\"><i class=\"ph ph-check\"></i></span><span class=\"c-step-connector\"></span></div><div class=\"c-step-text\"><span class=\"c-step-label completed\">Account</span></div></div><div class=\"c-step\"><div class=\"c-step-rail\"><span class=\"c-step-indicator active\">2</span><span class=\"c-step-connector\"></span></div><div class=\"c-step-text\"><span class=\"c-step-label active\">Profile</span></div></div><div class=\"c-step\"><div class=\"c-step-rail\"><span class=\"c-step-indicator upcoming\">3</span><span class=\"c-step-connector\"></span></div><div class=\"c-step-text\"><span class=\"c-step-label upcoming\">Preferences</span></div></div><div class=\"c-step\"><div class=\"c-step-rail\"><span class=\"c-step-indicator upcoming\">4</span></div><div class=\"c-step-text\"><span class=\"c-step-label upcoming\">Review</span></div></div></div></div>",
  },
  {
    id: 'flags',
    label: "Horizontal, flags and descriptions (preview.html 4695\u20134727)",
    next: <Stepper aria-label="Account setup" currentStep={1} steps={flagged} />,
    old: "<div class=\"c-stepper\"><div class=\"c-step\"><span class=\"c-step-indicator warning\"><i class=\"ph-fill ph-warning\"></i></span><div class=\"c-step-text\"><span class=\"c-step-label warning\">Account</span><span class=\"c-step-desc warning\">Recovery email unverified</span></div></div><span class=\"c-step-connector\"></span><div class=\"c-step\"><span class=\"c-step-indicator error\"><i class=\"ph ph-x\"></i></span><div class=\"c-step-text\"><span class=\"c-step-label error\">Profile</span><span class=\"c-step-desc error\">Photo upload failed</span></div></div><span class=\"c-step-connector\"></span><div class=\"c-step\"><span class=\"c-step-indicator upcoming\">3</span><div class=\"c-step-text\"><span class=\"c-step-label upcoming\">Preferences</span><span class=\"c-step-desc\">Notifications and theme</span></div></div><span class=\"c-step-connector\"></span><div class=\"c-step\"><span class=\"c-step-indicator upcoming\">4</span><div class=\"c-step-text\"><span class=\"c-step-label upcoming\">Review</span><span class=\"c-step-desc\">Confirm and finish</span></div></div></div>",
  },
];

function Compare({ row }: { row: Row }) {
  return (
    <section className="pg-row" id={row.id} aria-labelledby={`${row.id}-h`}>
      <h3 className="pg-row-title" id={`${row.id}-h`}>{row.label}</h3>
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

export function StepperPreview() {
  return (
    <>
      <style>{legacyStepperCss}</style>
      {rows.map(row => (
        <Compare key={row.id} row={row} />
      ))}
    </>
  );
}

export default StepperPreview;
