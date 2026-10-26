'use client';

// Textarea preview: the states, with the OLD HTML + CSS
// (collabrium-dls/components.css) rendered beside them for visual
// comparison. Never part of the package build.
import type { ReactNode } from 'react';
import { Textarea } from './Textarea';

// Copied verbatim from collabrium-dls/components.css lines 129–138 (.c-field and
// what a textarea shares with it) and 190–193 (the textarea rules), for
// side-by-side comparison only. Never shipped in the package.
export const legacyTextareaCss = ".c-field{display:flex; flex-direction:column; gap:var(--spacing-4); width:220px;}\n.c-field label{font-size:var(--text-label1-size); font-weight:var(--text-label1-weight);}\n.c-field label .required-mark{color:var(--color-red); font-weight:700; margin-left:var(--spacing-4);}\n.c-field label .required-label-icon{color:var(--color-neutral-5); font-size:var(--icon-sm); margin-left:var(--spacing-4); vertical-align:middle;}\n.c-field input{height:var(--control-height-md); border-radius:var(--radius-sm); border:1px solid var(--color-neutral-3); padding:0 var(--spacing-12); font-size:var(--text-body2-size); font-family:inherit; color:var(--color-neutral-9);}\n.c-field input:focus{outline:none; border:2px solid var(--color-obsidian); padding:0 11px;}\n.c-field-error input{border:2px solid var(--color-red); padding:0 11px;}\n.c-helper{font-size:var(--text-caption-size); color:var(--color-neutral-5);}\n.c-field-error .c-helper{color:var(--color-red);}\n.c-field input:disabled{background:var(--color-neutral-2); color:var(--color-neutral-5);}\n\n/* Textarea \u2014 DESIGN-SYSTEM.md \"Textarea\", Box + Resize rows: min-height\n   96px, spacing-12 padding all sides, resize: vertical only. */\n.c-field textarea{width:100%; min-height:96px; padding:var(--spacing-12); border-radius:var(--radius-sm); border:1px solid var(--color-neutral-3); font-family:inherit; font-size:var(--text-body2-size); color:var(--color-neutral-9); resize:vertical;}\n.c-field textarea:focus{outline:none; border:2px solid var(--color-obsidian); padding:11px;}";

// Mirrors the Textarea demo in preview.html (3268–3274).
const field = (cls: string, inner: string) => `<div class="c-field ${cls}" style="width:280px">${inner}</div>`;

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
    note: 'The old field is 220px wide; the new one fills its container, so both are boxed at 280px here.',
    next: <div style={{ width: 280 }}><Textarea label="Project description" placeholder="Describe what this project is for…" helper="Visible to everyone with access to this workspace" /></div>,
    old: field('', '<label for="ot">Project description</label><textarea id="ot" placeholder="Describe what this project is for&hellip;"></textarea><span class="c-helper">Visible to everyone with access to this workspace</span>'),
  },
  {
    id: 'error',
    label: 'Error',
    note: 'The old CSS draws no error state for a textarea (`.c-field-error input` selects inputs only), so the old box shows no red border. The new one has Input field\'s 1px Red border and bold Red text.',
    next: <div style={{ width: 280 }}><Textarea label="Project description" defaultValue="Too short" error="Write at least 20 characters" /></div>,
    old: field('c-field-error', '<label for="oe">Project description</label><textarea id="oe">Too short</textarea><span class="c-helper">Write at least 20 characters</span>'),
  },
  {
    id: 'disabled',
    label: 'Disabled',
    note: 'The old CSS draws no disabled state for a textarea (`.c-field input:disabled` selects inputs only).',
    next: <div style={{ width: 280 }}><Textarea label="Project description" defaultValue="Locked while the project is archived." disabled helper="Restore the project to edit this" /></div>,
    old: field('', '<label for="od">Project description</label><textarea id="od" disabled>Locked while the project is archived.</textarea><span class="c-helper">Restore the project to edit this</span>'),
  },
  {
    id: 'required',
    label: 'Required',
    next: <div style={{ width: 280 }}><Textarea label="Project description" required placeholder="Describe what this project is for…" /></div>,
    old: field('', '<label for="or">Project description<span class="required-mark" aria-hidden="true">*</span></label><textarea id="or" placeholder="Describe what this project is for&hellip;" aria-required="true"></textarea>'),
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

export function TextareaPreview() {
  return (
    <>
      <style>{legacyTextareaCss}</style>
      {rows.map(row => (
        <Compare key={row.id} row={row} />
      ))}
    </>
  );
}

export default TextareaPreview;
