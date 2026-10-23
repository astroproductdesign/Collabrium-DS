'use client';

// DLS Tabs markup (.c-tabs / .c-tab, components.css) with the ARIA tabs
// pattern: arrow keys move between tabs, Home/End jump to the ends.
import { useId, useRef, useState, type ReactNode } from 'react';

export interface TabDef {
  id: string;
  label: string;
  content: ReactNode;
}

export function Tabs({ tabs, label }: { tabs: TabDef[]; label: string }) {
  const [active, setActive] = useState(tabs[0]?.id);
  const base = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const move = (i: number) => {
    const n = (i + tabs.length) % tabs.length;
    setActive(tabs[n].id);
    refs.current[n]?.focus();
  };
  return (
    <div className="docs-tabs">
      <div className="c-tabs-scroll-wrap">
        <div className="c-tabs" role="tablist" aria-label={label}>
          {tabs.map((t, i) => (
            <button
              key={t.id}
              ref={el => {
                refs.current[i] = el;
              }}
              id={`${base}-tab-${t.id}`}
              type="button"
              role="tab"
              aria-selected={active === t.id}
              aria-controls={`${base}-panel-${t.id}`}
              tabIndex={active === t.id ? 0 : -1}
              className={`c-tab${active === t.id ? ' active' : ''}`}
              onClick={() => setActive(t.id)}
              onKeyDown={e => {
                if (e.key === 'ArrowRight') { e.preventDefault(); move(i + 1); }
                else if (e.key === 'ArrowLeft') { e.preventDefault(); move(i - 1); }
                else if (e.key === 'Home') { e.preventDefault(); move(0); }
                else if (e.key === 'End') { e.preventDefault(); move(tabs.length - 1); }
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
      {tabs.map(t => (
        <div
          key={t.id}
          id={`${base}-panel-${t.id}`}
          role="tabpanel"
          aria-labelledby={`${base}-tab-${t.id}`}
          hidden={active !== t.id}
          className="docs-tabpanel"
        >
          {t.content}
        </div>
      ))}
    </div>
  );
}
