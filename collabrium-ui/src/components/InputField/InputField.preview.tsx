'use client';

// Input field preview: the states and the variants, with the OLD HTML + CSS
// (collabrium-dls/components.css) rendered beside them for visual
// comparison. Never part of the package build.
import type { ReactNode } from 'react';
import { Envelope } from '@phosphor-icons/react';
import { InputField } from './InputField';

// Copied verbatim from collabrium-dls/components.css lines 129–185 (.c-field and
// the character counter), for side-by-side comparison only. Never shipped in the package.
export const legacyInputFieldCss = ".c-field{display:flex; flex-direction:column; gap:var(--spacing-4); width:220px;}\n.c-field label{font-size:var(--text-label1-size); font-weight:var(--text-label1-weight);}\n.c-field label .required-mark{color:var(--color-red); font-weight:700; margin-left:var(--spacing-4);}\n.c-field label .required-label-icon{color:var(--color-neutral-5); font-size:var(--icon-sm); margin-left:var(--spacing-4); vertical-align:middle;}\n.c-field input{height:var(--control-height-md); border-radius:var(--radius-sm); border:1px solid var(--color-neutral-3); padding:0 var(--spacing-12); font-size:var(--text-body2-size); font-family:inherit; color:var(--color-neutral-9);}\n.c-field input:focus{outline:none; border:2px solid var(--color-obsidian); padding:0 11px;}\n.c-field-error input{border:2px solid var(--color-red); padding:0 11px;}\n.c-helper{font-size:var(--text-caption-size); color:var(--color-neutral-5);}\n.c-field-error .c-helper{color:var(--color-red);}\n.c-field input:disabled{background:var(--color-neutral-2); color:var(--color-neutral-5);}\n\n/* Success state \u2014 DESIGN-SYSTEM.md Input field, \"Success / valid state\"\n   table: 1px Green border, trailing check-circle icon (Tier 2 Fill). */\n.c-field-success input{border:1px solid var(--color-green);}\n\n/* Leading/trailing icon + icon-button plumbing shared by Password field\n   and Search input \u2014 DESIGN-SYSTEM.md Input field, \"Optional leading/\n   trailing icon\" paragraph. */\n.c-field .input-wrap{position:relative; display:flex; align-items:center;}\n/* Row-flex containers don't stretch a child to fill the main axis the\n   way .c-field's own column flex does for the plain Default/Error/\n   Disabled inputs above \u2014 without this, the input falls back to its\n   browser-default intrinsic width, which left the box short of the\n   field's full width and made trailing icons/buttons read as sitting\n   outside the box instead of inset inside it. */\n.c-field .input-wrap input{width:100%; min-width:0;}\n.c-field .icon-leading,.c-field .icon-trailing{position:absolute; display:flex; pointer-events:none; color:var(--color-neutral-5); font-size:var(--icon-sm);}\n.c-field .icon-leading{left:var(--spacing-12);}\n.c-field .icon-trailing{right:var(--spacing-12);}\n\n/* Success icon color must come after the generic .icon-trailing rule\n   above so it isn't overridden by it (equal specificity, source order\n   decides) \u2014 DESIGN-SYSTEM.md Input field, \"Success / valid state\" table. */\n.c-field-success .icon-trailing{color:var(--color-green);}\n.c-field .input-wrap.has-leading-icon input{padding-left:36px;}\n.c-field .input-wrap.has-trailing-icon input{padding-right:36px;}\n.c-field .input-wrap.has-icon-btn input{padding-right:36px;}\n.c-field .icon-btn{position:absolute; right:var(--spacing-12); display:flex; align-items:center; justify-content:center; background:none; border:none; padding:0; color:var(--color-neutral-5); font-size:var(--icon-sm); cursor:pointer; pointer-events:auto;}\n.c-field .icon-btn:hover{color:var(--color-neutral-9);}\n.c-field .icon-btn:focus-visible{outline:var(--focus-ring-width) solid var(--focus-ring-color); outline-offset:var(--focus-ring-offset);}\n\n/* Prefix/suffix adornments \u2014 DESIGN-SYSTEM.md Input field, \"Prefix/\n   suffix text adornments\" rule: fixed non-editable text, caption\n   token, Neutral-5, no background, vertically centered. */\n.c-field .adornment{position:absolute; display:flex; align-items:center; font-size:var(--text-caption-size); color:var(--color-neutral-5); pointer-events:none;}\n.c-field .adornment-prefix{left:var(--spacing-12);}\n.c-field .adornment-suffix{right:var(--spacing-12);}\n.c-field .input-wrap.has-prefix input{padding-left:28px;}\n.c-field .input-wrap.has-suffix input{padding-right:32px;}\n\n/* Character counter \u2014 DESIGN-SYSTEM.md Input field, \"Character/word\n   counter\" rule: caption, Neutral-5, right-aligned, shares the\n   helper-text line, turns Red at/over the limit. */\n.counter-row{display:flex; justify-content:flex-end;}\n.char-counter{font-size:var(--text-caption-size); color:var(--color-neutral-5);}\n.char-counter.at-limit{color:var(--color-red);}\n";

// Mirrors the Input field demo in preview.html (3164–3265).
const field = (cls: string, inner: string) => `<div class="c-field ${cls}" style="width:240px">${inner}</div>`;

interface Row {
  id: string;
  label: string;
  note?: string;
  next: ReactNode;
  old: string;
}

const rows: Row[] = [
  {
    id: 'default',
    label: 'Default, with helper',
    note: 'The old field is 220px wide; the new one fills its container, so both are boxed at 240px here.',
    next: <div style={{ width: 240 }}><InputField label="Workspace name" placeholder="e.g. Astro Growth" helper="Visible to your whole team" /></div>,
    old: field('', '<label>Workspace name</label><input placeholder="e.g. Astro Growth" /><span class="c-helper">Visible to your whole team</span>'),
  },
  {
    id: 'error',
    label: 'Error',
    note: 'The old error border is 2px; the new one is 1px (decided 2026-10-26).',
    next: <div style={{ width: 240 }}><InputField label="Workspace name" defaultValue="Astro" error="This workspace name is already taken" /></div>,
    old: field('c-field-error', '<label>Workspace name</label><input value="Astro" /><span class="c-helper">This workspace name is already taken</span>'),
  },
  {
    id: 'disabled',
    label: 'Disabled',
    next: <div style={{ width: 240 }}><InputField label="Workspace name" defaultValue="Astro Growth" disabled helper="Locked by admin" /></div>,
    old: field('', '<label>Workspace name</label><input value="Astro Growth" disabled /><span class="c-helper">Locked by admin</span>'),
  },
  {
    id: 'success',
    label: 'Success',
    next: <div style={{ width: 240 }}><InputField label="Workspace name" defaultValue="Astro Growth" success helper="Name is available" /></div>,
    old: field('c-field-success', '<label for="old-success">Workspace name</label><div class="input-wrap has-trailing-icon"><input id="old-success" value="Astro Growth" /><span class="icon-trailing" aria-hidden="true"><i class="ph-fill ph-check-circle"></i></span></div><span class="c-helper">Name is available</span>'),
  },
  {
    id: 'required',
    label: 'Required',
    next: <div style={{ width: 240 }}><InputField label="Workspace name" required placeholder="e.g. Astro Growth" helper="Visible to your whole team" /></div>,
    old: field('', '<label for="old-req">Workspace name<span class="required-mark" aria-hidden="true">*</span></label><input id="old-req" placeholder="e.g. Astro Growth" aria-required="true" /><span class="c-helper">Visible to your whole team</span>'),
  },
  {
    id: 'prefix',
    label: 'Prefix and suffix',
    note: 'The old box reserves 28px for the prefix and 32px for the suffix; the new one reserves 28px for both (decided 2026-10-26).',
    next: (
      <div style={{ width: 240, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <InputField label="Monthly budget" prefix="$" placeholder="0.00" helper="In USD" />
        <InputField label="Package weight" suffix="kg" placeholder="0" helper="Rounded to the nearest 0.1kg" />
      </div>
    ),
    old: `<div style="width:240px;display:flex;flex-direction:column;gap:16px">${field('', '<label for="op">Monthly budget</label><div class="input-wrap has-prefix"><span class="adornment adornment-prefix" aria-hidden="true">$</span><input type="text" id="op" placeholder="0.00" /></div><span class="c-helper">In USD</span>')}${field('', '<label for="os">Package weight</label><div class="input-wrap has-suffix"><input type="text" id="os" placeholder="0" /><span class="adornment adornment-suffix" aria-hidden="true">kg</span></div><span class="c-helper">Rounded to the nearest 0.1kg</span>')}</div>`,
  },
  {
    id: 'icon',
    label: 'Leading icon',
    next: <div style={{ width: 240 }}><InputField label="Email" type="email" leadingIcon={Envelope} placeholder="name@example.com" /></div>,
    old: field('', '<label for="oi">Email</label><div class="input-wrap has-leading-icon"><span class="icon-leading" aria-hidden="true"><i class="ph ph-envelope"></i></span><input id="oi" type="email" placeholder="name@example.com" /></div>'),
  },
  {
    id: 'counter',
    label: 'Character count',
    next: <div style={{ width: 240 }}><InputField label="Status update" maxLength={60} showCount placeholder="What's happening in your team?" /></div>,
    old: field('', '<label for="oc">Status update</label><div class="input-wrap"><input type="text" id="oc" maxlength="60" placeholder="What&#39;s happening in your team?" /></div><div class="counter-row"><span class="char-counter">0/60</span></div>'),
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

export function InputFieldPreview() {
  return (
    <>
      <style>{legacyInputFieldCss}</style>
      {rows.map(row => (
        <Compare key={row.id} row={row} />
      ))}
    </>
  );
}

export default InputFieldPreview;
