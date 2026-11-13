'use client';

// "On this page": a sticky list of the page's sections that highlights the
// one being read. Rows reuse SidebarNav's child-item style
// (.cui-sidebar-nav__child), the closest existing pattern.
import { useEffect, useState } from 'react';

export interface TocItem {
  id: string;
  label: string;
  level?: 1 | 2;
}

export function OnThisPage({ items }: { items: TocItem[] }) {
  const [current, setCurrent] = useState(items[0]?.id);

  useEffect(() => {
    const host = document.querySelector<HTMLElement>('.docs-pane');
    const scroller = () => (host && host.scrollHeight > host.clientHeight ? host : null);
    let queued = false;
    const sync = () => {
      queued = false;
      const h = scroller();
      const top = h ? h.getBoundingClientRect().top : 0;
      let cur = items[0]?.id;
      for (const it of items) {
        const el = document.getElementById(it.id);
        if (el && el.getBoundingClientRect().top - top <= 96) cur = it.id;
      }
      const atBottom = h ? h.scrollTop + h.clientHeight >= h.scrollHeight - 2 : window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom) cur = items[items.length - 1]?.id;
      setCurrent(cur);
    };
    const queue = () => {
      if (!queued) {
        queued = true;
        requestAnimationFrame(sync);
      }
    };
    host?.addEventListener('scroll', queue, { passive: true });
    window.addEventListener('scroll', queue, { passive: true });
    window.addEventListener('resize', queue, { passive: true });
    sync();
    return () => {
      host?.removeEventListener('scroll', queue);
      window.removeEventListener('scroll', queue);
      window.removeEventListener('resize', queue);
    };
  }, [items]);

  return (
    <nav className="docs-toc" aria-label="On this page">
      <p className="docs-toc-title">On this page</p>
      <div className="docs-toc-list">
        {items.map(it => (
          <a
            key={it.id}
            href={`#${it.id}`}
            className={`cui-sidebar-nav__child docs-toc-link${it.level === 2 ? ' is-sub' : ''}`}
            data-active={current === it.id || undefined}
            aria-current={current === it.id ? 'location' : undefined}
          >
            {it.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
