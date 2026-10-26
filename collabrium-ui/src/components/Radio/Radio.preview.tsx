'use client';

// Radio preview: the states, with the OLD HTML + CSS
// (collabrium-dls/components.css) rendered beside them for visual
// comparison. Never part of the package build.
import type { ReactNode } from 'react';
import { Radio } from './Radio';
import { RadioGroup } from './RadioGroup';

// Copied verbatim from collabrium-dls/components.css lines 3084–3094 (.c-choice
// and .c-radio-circle), for side-by-side comparison only. Never shipped in the package.
export const legacyRadioCss = ".c-choice{position:relative; display:flex; align-items:flex-start; gap:var(--spacing-8); cursor:pointer;}\n.c-choice.disabled{opacity:.5; cursor:not-allowed;}\n.c-choice input{position:absolute; opacity:0; width:0; height:0;}\n.c-choice .text{display:flex; flex-direction:column;}\n.c-choice .text .label{font-size:var(--text-body1-size); font-weight:500; color:var(--color-neutral-9);}\n.c-choice .text .desc{font-size:var(--text-caption-size); color:var(--color-neutral-5);}\n.c-checkbox-box{width:18px; height:18px; flex:none; margin-top:var(--spacing-2); border-radius:var(--radius-xs); border:1px solid var(--color-neutral-3); background:var(--color-neutral-1); color:var(--color-neutral-1); display:flex; align-items:center; justify-content:center; font-size:12px; transition:background-color var(--duration-fast) var(--ease-standard),border-color var(--duration-fast) var(--ease-standard);}\n.c-checkbox-box.on{border-color:var(--color-obsidian); background:var(--color-obsidian);}\n.c-radio-circle{width:18px; height:18px; flex:none; margin-top:var(--spacing-2); border-radius:var(--radius-pill); border:1px solid var(--color-neutral-3); background:var(--color-neutral-1); display:flex; align-items:center; justify-content:center; transition:border-color var(--duration-fast) var(--ease-standard);}\n.c-radio-circle.on{border-color:var(--color-obsidian);}\n.c-radio-circle .dot{width:9px; height:9px; border-radius:var(--radius-pill); background:var(--color-obsidian);}";

// Mirrors the Radio demo in preview.html (3685–3700).
const oldRadio = (label: string, on: boolean, disabled = false, desc?: string) =>
  `<label class="c-choice${disabled ? ' disabled' : ''}"><input type="radio" name="old-radio" ${on ? 'checked ' : ''}${disabled ? 'disabled ' : ''}/><span class="c-radio-circle${on ? ' on' : ''}">${on ? '<span class="dot"></span>' : ''}</span><span class="text"><span class="label">${label}</span>${desc ? `<span class="desc">${desc}</span>` : ''}</span></label>`;

interface Row {
  id: string;
  label: string;
  note?: string;
  next: ReactNode;
  old: string;
}

const rows: Row[] = [
  {
    id: 'states',
    label: 'Empty, chosen, disabled',
    next: (
      <RadioGroup legend="States" defaultValue="chosen">
        <Radio value="empty" label="Empty" />
        <Radio value="chosen" label="Chosen" />
        <Radio value="disabled" label="Disabled" disabled />
      </RadioGroup>
    ),
    old: `<div style="display:flex;flex-direction:column;gap:12px">${oldRadio('Empty', false)}${oldRadio('Chosen', true)}${oldRadio('Disabled', false, true)}</div>`,
    note: 'The new column adds a legend (the old markup has none) and 12px between rows (the old rows have no spacing of their own).',
  },
  {
    id: 'description',
    label: 'With a description',
    next: (
      <RadioGroup legend="Digest" defaultValue="weekly">
        <Radio value="weekly" label="Weekly digest" description="Every Monday morning" />
        <Radio value="daily" label="Daily digest" description="Every weekday morning" />
      </RadioGroup>
    ),
    old: `<div style="display:flex;flex-direction:column;gap:12px">${oldRadio('Weekly digest', true, false, 'Every Monday morning')}${oldRadio('Daily digest', false, false, 'Every weekday morning')}</div>`,
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

export function RadioPreview() {
  return (
    <>
      <style>{legacyRadioCss}</style>
      {rows.map(row => (
        <Compare key={row.id} row={row} />
      ))}
    </>
  );
}

export default RadioPreview;
