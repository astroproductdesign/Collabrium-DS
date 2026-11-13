// Switch preview: the states, with the OLD HTML + CSS
// (collabrium-dls/components.css) rendered beside them for visual
// comparison. Never part of the package build.
import type { ReactNode } from 'react';
import { Switch } from './Switch';

// Copied verbatim from collabrium-dls/components.css lines 3084–3099 (the shared
// .c-choice row and its text styles, the Checkbox and Radio rules that sit
// between, then .c-choice.switch, the track and the thumb), for side-by-side
// comparison only. Never shipped in the package.
export const legacySwitchCss = ".c-choice{position:relative; display:flex; align-items:flex-start; gap:var(--spacing-8); cursor:pointer;}\n.c-choice.disabled{opacity:.5; cursor:not-allowed;}\n.c-choice input{position:absolute; opacity:0; width:0; height:0;}\n.c-choice .text{display:flex; flex-direction:column;}\n.c-choice .text .label{font-size:var(--text-body1-size); font-weight:500; color:var(--color-neutral-9);}\n.c-choice .text .desc{font-size:var(--text-caption-size); color:var(--color-neutral-5);}\n.c-checkbox-box{width:18px; height:18px; flex:none; margin-top:var(--spacing-2); border-radius:var(--radius-xs); border:1px solid var(--color-neutral-3); background:var(--color-neutral-1); color:var(--color-neutral-1); display:flex; align-items:center; justify-content:center; font-size:12px; transition:background-color var(--duration-fast) var(--ease-standard),border-color var(--duration-fast) var(--ease-standard);}\n.c-checkbox-box.on{border-color:var(--color-obsidian); background:var(--color-obsidian);}\n.c-radio-circle{width:18px; height:18px; flex:none; margin-top:var(--spacing-2); border-radius:var(--radius-pill); border:1px solid var(--color-neutral-3); background:var(--color-neutral-1); display:flex; align-items:center; justify-content:center; transition:border-color var(--duration-fast) var(--ease-standard);}\n.c-radio-circle.on{border-color:var(--color-obsidian);}\n.c-radio-circle .dot{width:9px; height:9px; border-radius:var(--radius-pill); background:var(--color-obsidian);}\n.c-choice.switch{align-items:center; gap:var(--spacing-12);}\n.c-switch-track{position:relative; width:40px; height:24px; flex:none; border-radius:var(--radius-pill); background:var(--color-neutral-4); transition:background-color var(--duration-base) var(--ease-standard);}\n.c-switch-track.on{background:var(--color-green);}\n.c-switch-thumb{position:absolute; top:3px; left:3px; width:18px; height:18px; border-radius:var(--radius-pill); background:var(--color-neutral-1); box-shadow:var(--shadow-1); transition:left var(--duration-base) var(--ease-settle);}\n.c-switch-track.on .c-switch-thumb{left:19px;}";

// Mirrors the Switch demo in preview.html (4268-4281).
const oldSwitch = (label: string, on: boolean, o: { disabled?: boolean; desc?: string } = {}) =>
  `<label class="c-choice switch${o.disabled ? ' disabled' : ''}"><span class="c-switch-track${on ? ' on' : ''}"><span class="c-switch-thumb"></span></span><input type="checkbox" role="switch" ${on ? 'checked ' : ''}${o.disabled ? 'disabled ' : ''}/><span class="text"><span class="label">${label}</span>${o.desc ? `<span class="desc">${o.desc}</span>` : ''}</span></label>`;
const col = (html: string) => `<div style="display:flex;flex-direction:column;gap:12px">${html}</div>`;

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
    label: 'Off, on, disabled',
    next: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Switch label="Off" />
        <Switch label="On" defaultChecked />
        <Switch label="Disabled" disabled />
        <Switch label="Disabled, on" disabled defaultChecked />
      </div>
    ),
    old: col(oldSwitch('Off', false) + oldSwitch('On', true) + oldSwitch('Disabled', false, { disabled: true }) + oldSwitch('Disabled, on', true, { disabled: true })),
  },
  {
    id: 'description',
    label: 'With a description',
    next: <Switch label="Email notifications" description="A summary every Monday morning" defaultChecked />,
    old: oldSwitch('Email notifications', true, { desc: 'A summary every Monday morning' }),
    note: 'The old demo has no description; the markup follows the shared .c-choice text, which Checkbox and Radio use.',
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

export function SwitchPreview() {
  return (
    <>
      <style>{legacySwitchCss}</style>
      {rows.map(row => (
        <Compare key={row.id} row={row} />
      ))}
    </>
  );
}

export default SwitchPreview;
