'use client';

// Checkbox preview: the states, with the OLD HTML + CSS
// (collabrium-dls/components.css) rendered beside them for visual
// comparison. Never part of the package build.
import type { ReactNode } from 'react';
import { Checkbox } from './Checkbox';

// Copied verbatim from collabrium-dls/components.css lines 3077–3088
// (the shared row, text styles and checkbox box) for side-by-side
// comparison only. Never shipped in the package.
export const legacyCheckboxCss = ".c-choice{position:relative; display:flex; align-items:flex-start; gap:var(--spacing-8); cursor:pointer;}\n.c-choice.disabled{opacity:.5; cursor:not-allowed;}\n.c-choice input{position:absolute; opacity:0; width:0; height:0;}\n.c-choice .text{display:flex; flex-direction:column;}\n.c-choice .text .label{font-size:var(--text-body1-size); font-weight:500; color:var(--color-neutral-9);}\n.c-choice .text .desc{font-size:var(--text-caption-size); color:var(--color-neutral-5);}\n.c-checkbox-box{width:18px; height:18px; flex:none; margin-top:2px; border-radius:6px; border:1px solid var(--color-neutral-3); background:var(--color-neutral-1); color:var(--color-neutral-1); display:flex; align-items:center; justify-content:center; font-size:12px; transition:background-color var(--duration-fast) var(--ease-standard),border-color var(--duration-fast) var(--ease-standard);}\n.c-checkbox-box.on{border-color:var(--color-obsidian); background:var(--color-obsidian);}";

interface Row {
  id: string;
  label: string;
  note?: string;
  next: ReactNode;
  /** Old markup, exactly as preview.html writes it (2517–2526, 2922). */
  old: string | null;
}

const rows: Row[] = [
  {
    id: 'checked',
    label: 'Checked, with description (preview.html 2517–2521)',
    next: <Checkbox label="Email notifications" description="Weekly digest every Monday" defaultChecked />,
    old: '<label class="c-choice"><input type="checkbox" checked /><span class="c-checkbox-box on"><i class="ph ph-check"></i></span><span class="text"><span class="label">Email notifications</span><span class="desc">Weekly digest every Monday</span></span></label>',
  },
  {
    id: 'unchecked',
    label: 'Unchecked (preview.html 2522–2526)',
    next: <Checkbox label="SMS alerts" />,
    old: '<label class="c-choice"><input type="checkbox" /><span class="c-checkbox-box"><i class="ph ph-minus" style="visibility:hidden"></i></span><span class="text"><span class="label">SMS alerts</span></span></label>',
  },
  {
    id: 'indeterminate',
    label: 'Indeterminate (preview.html 2922: .on + ph-minus)',
    next: <Checkbox label="Select All" indeterminate />,
    old: '<label class="c-choice"><input type="checkbox" /><span class="c-checkbox-box on"><i class="ph ph-minus"></i></span><span class="text"><span class="label">Select All</span></span></label>',
  },
  {
    id: 'disabled',
    label: 'Disabled',
    note: 'The old system has `.c-choice.disabled` (class only, no native disabled).',
    next: <Checkbox label="Disabled" disabled />,
    old: '<label class="c-choice disabled"><input type="checkbox" disabled /><span class="c-checkbox-box"></span><span class="text"><span class="label">Disabled</span></span></label>',
  },
  {
    id: 'hover-focus',
    label: 'Hover and focus-visible',
    note: 'No hover and no focus rule in the old CSS (Q-CHK-4, confirmed 2026-10-26). The new one adds the standard focus ring, and hover and pressed states (approved 2026-10-26).',
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

export function CheckboxPreview() {
  return (
    <>
      <style>{legacyCheckboxCss}</style>
      {rows.map(row => (
        <Compare key={row.id} row={row} />
      ))}
    </>
  );
}

export default CheckboxPreview;
