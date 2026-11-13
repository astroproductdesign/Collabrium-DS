'use client';

// DLS Switch markup (.c-choice.switch / .c-switch-track, components.css).
// A real checkbox with role="switch" drives it.
export function Switch({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="c-choice switch docs-switch">
      <span className={`c-switch-track${checked ? ' on' : ''}`}>
        <span className="c-switch-thumb" />
      </span>
      <input type="checkbox" role="switch" checked={checked} onChange={e => onChange(e.target.checked)} />
      <span className="text">
        <span className="label">{label}</span>
      </span>
    </label>
  );
}
