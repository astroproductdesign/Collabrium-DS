'use client';

// The DLS site's search palette (collabrium-dls/preview.html, "Site
// search"), ported to React with the same markup, classes and behaviour:
// scope chips with counts, results grouped by kind, ↑↓ move, ↵ open,
// esc close, ⌘K / Ctrl+K toggle, focus back to the trigger on close.
// The index is built from the site map and the docs files, so every
// page, example and colour group is searchable with no extra step.
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { componentDocs } from '../app/_generated/components-docs';
import { colorGroups } from '../lib/colors';
import { componentKey, components, foundationPages, groups, hrefTo, navItems, type PageKey } from '../lib/site';

type Kind = 'section' | 'component' | 'variant';
type Scope = 'all' | 'foundation' | 'components';

interface Item {
  kind: Kind;
  scope: Exclude<Scope, 'all'>;
  title: string;
  crumb: string;
  to: PageKey;
  hash?: string;
  hay: string;
}

const KIND: Record<Kind, { label: string; icon: string; group: string }> = {
  section: { label: 'Section', icon: 'ph-fill ph-cube', group: 'Home & Foundation' },
  component: { label: 'Component', icon: 'ph-fill ph-squares-four', group: 'Components' },
  variant: { label: 'Variant', icon: 'ph ph-git-branch', group: 'Variants' },
};

const SCOPES: [Scope, string][] = [
  ['all', 'All'],
  ['foundation', 'Foundation'],
  ['components', 'Components'],
];

const OPEN_EVENT = 'cui-docs-search-open';

/** Opens the search dialog. `trigger` gets focus back when it closes. */
export function openSearch(trigger?: HTMLElement | null) {
  window.dispatchEvent(new CustomEvent(OPEN_EVENT, { detail: trigger ?? null }));
}

function buildIndex(): Item[] {
  const items: Omit<Item, 'hay'>[] = [
    { kind: 'section', scope: 'foundation', title: 'Home', crumb: 'Home', to: '' },
    ...foundationPages.map(p => ({ kind: 'section' as const, scope: 'foundation' as const, title: p.title, crumb: 'Foundation', to: `foundation/${p.slug}` })),
    // Stand-alone components and each group's overview (AI Native) ...
    ...navItems.map(n => ({ kind: 'component' as const, scope: 'components' as const, title: n.title, crumb: 'Components', to: `components/${n.slug}` })),
    // ... and every part of a group, found on its own under the group's name.
    ...components
      .filter(c => c.group)
      .map(c => ({ kind: 'component' as const, scope: 'components' as const, title: c.title, crumb: `Components › ${groups.find(g => g.slug === c.group)!.title}`, to: componentKey(c) })),
    ...colorGroups.map(g => ({ kind: 'variant' as const, scope: 'foundation' as const, title: g.title, crumb: 'Color Palette', to: 'foundation/color-palette', hash: g.id })),
    ...components.flatMap(c =>
      (componentDocs[c.slug]?.examples ?? []).map(ex => ({
        kind: 'variant' as const,
        scope: 'components' as const,
        title: ex.title,
        crumb: `Components › ${c.group ? `${groups.find(g => g.slug === c.group)!.title} › ` : ''}${c.title}`,
        to: componentKey(c),
        hash: `example-${ex.id}`,
      })),
    ),
  ];
  return items.map(i => ({ ...i, hay: `${i.title} ${i.crumb}`.toLowerCase() }));
}

function score(item: Item, q: string) {
  const t = item.title.toLowerCase();
  if (t === q) return 100;
  if (t.startsWith(q)) return 80;
  if (new RegExp(`\\b${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`).test(t)) return 60;
  if (t.includes(q)) return 45;
  if (item.hay.includes(q)) return 20;
  return 0;
}

function Mark({ text, q }: { text: string; q: string }) {
  const i = q ? text.toLowerCase().indexOf(q) : -1;
  if (i < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <mark>{text.slice(i, i + q.length)}</mark>
      {text.slice(i + q.length)}
    </>
  );
}

export function SearchDialog({ current }: { current: PageKey }) {
  const index = useMemo(buildIndex, []);
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false);
  const [query, setQuery] = useState('');
  const [scope, setScope] = useState<Scope>('all');
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  const q = query.trim().toLowerCase();
  const pool = index.filter(i => scope === 'all' || i.scope === scope);
  const groups: { kind: Kind; items: Item[] }[] = [];
  let rows: Item[];
  if (!q) {
    rows = pool.slice(0, 7);
  } else {
    const hits = pool
      .map(i => ({ i, s: score(i, q) }))
      .filter(x => x.s > 0)
      .sort((a, b) => b.s - a.s || a.i.title.length - b.i.title.length)
      .slice(0, 24);
    (['section', 'component', 'variant'] as Kind[]).forEach(kind => {
      const items = hits.filter(h => h.i.kind === kind).map(h => h.i);
      if (items.length) groups.push({ kind, items });
    });
    rows = groups.flatMap(g => g.items);
  }

  const close = useCallback(() => {
    setShown(false);
    window.setTimeout(() => setOpen(false), 140);
    const opener = openerRef.current;
    const back =
      opener && opener.offsetParent ? opener : [...document.querySelectorAll<HTMLElement>('.js-site-search')].find(b => b.offsetParent);
    back?.focus();
  }, []);

  const show = useCallback((trigger: HTMLElement | null) => {
    openerRef.current = trigger;
    setQuery('');
    setCursor(0);
    setOpen(true);
    requestAnimationFrame(() => {
      setShown(true);
      inputRef.current?.focus();
    });
  }, []);

  useEffect(() => {
    const onOpen = (e: Event) => show((e as CustomEvent<HTMLElement | null>).detail);
    const onKey = (e: KeyboardEvent) => {
      if (!(e.metaKey || e.ctrlKey) || (e.key !== 'k' && e.key !== 'K')) return;
      e.preventDefault();
      if (open) close();
      else show(null);
    };
    window.addEventListener(OPEN_EVENT, onOpen);
    document.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener(OPEN_EVENT, onOpen);
      document.removeEventListener('keydown', onKey);
    };
  }, [open, show, close]);

  useEffect(() => {
    resultsRef.current?.querySelector('.is-cursor')?.scrollIntoView({ block: 'nearest' });
  }, [cursor, query, scope]);

  const go = (item: Item) => {
    const href = hrefTo(current, item.to, item.hash);
    close();
    window.location.href = href;
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (rows.length) setCursor(c => (c + 1) % rows.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (rows.length) setCursor(c => (c - 1 + rows.length) % rows.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (rows[cursor]) go(rows[cursor]);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      close();
    }
  };

  const count = !q ? `${index.length} indexed` : `${rows.length} ${rows.length === 1 ? 'result' : 'results'}`;
  let n = -1;
  const row = (item: Item) => {
    n += 1;
    const i = n;
    const on = i === cursor;
    const k = KIND[item.kind];
    return (
      <button
        key={`${item.to}#${item.hash ?? ''}`}
        type="button"
        role="option"
        aria-selected={on}
        className={`c-search-input-row${on ? ' is-cursor' : ''}`}
        onClick={() => go(item)}
        onMouseMove={() => setCursor(i)}
      >
        <span className="site-search-ico">
          <i className={k.icon} aria-hidden="true" />
        </span>
        <span className="c-search-input-text">
          <span className="c-search-input-title">
            <Mark text={item.title} q={q} />
          </span>
          <span className="c-search-input-subtitle">{item.crumb}</span>
        </span>
        <span className="site-search-kind">{k.label}</span>
      </button>
    );
  };

  return (
    <div
      className={`site-search-scrim${shown ? ' is-open' : ''}`}
      hidden={!open}
      onMouseDown={e => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className="site-search-panel" role="dialog" aria-modal="true" aria-label="Search the design system">
        <div className="site-search-field">
          <i className="ph ph-magnifying-glass" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-expanded="true"
            aria-controls="siteSearchResults"
            aria-autocomplete="list"
            aria-label="Search the design system"
            placeholder="Search foundations, components, examples…"
            autoComplete="off"
            spellCheck={false}
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              setCursor(0);
            }}
            onKeyDown={onKeyDown}
          />
          <button type="button" className="site-search-esc" onClick={close}>
            esc
          </button>
        </div>
        <div className="site-search-chips">
          {SCOPES.map(([key, label]) => (
            <button
              key={key}
              type="button"
              className={`site-search-chip${scope === key ? ' is-on' : ''}`}
              aria-pressed={scope === key}
              onClick={() => {
                setScope(key);
                setCursor(0);
                inputRef.current?.focus();
              }}
            >
              {label} <span>{key === 'all' ? index.length : index.filter(i => i.scope === key).length}</span>
            </button>
          ))}
        </div>
        <div className="site-search-results" id="siteSearchResults" role="listbox" aria-label="Results" ref={resultsRef}>
          {!q ? (
            <>
              <div className="site-search-grp">Jump to</div>
              {rows.map(row)}
            </>
          ) : rows.length === 0 ? (
            <div className="c-search-input-empty">No matches for “{query.trim()}”</div>
          ) : (
            groups.map(g => (
              <div key={g.kind} role="presentation">
                <div className="site-search-grp">{KIND[g.kind].group}</div>
                {g.items.map(row)}
              </div>
            ))
          )}
        </div>
        <div className="site-search-foot">
          <span>
            <kbd>↑</kbd>
            <kbd>↓</kbd> move
          </span>
          <span>
            <kbd>↵</kbd> open
          </span>
          <span>
            <kbd>esc</kbd> close
          </span>
          <span className="count">{count}</span>
        </div>
      </div>
    </div>
  );
}
