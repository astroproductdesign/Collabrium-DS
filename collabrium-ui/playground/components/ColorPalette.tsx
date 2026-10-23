// Foundation › Color Palette. Ported from the DLS site's Color Palette
// section; every value is read from the tokens.
import { colorGroups, cssVarName, hexOf } from '../lib/colors';
import { CopyButton } from './CopyButton';
import { OnThisPage } from './OnThisPage';

export function ColorPalette() {
  return (
    <div className="docs-page has-toc">
      <article className="docs-article">
        <header className="docs-header">
          <p className="kicker">02 · Foundations</p>
          <h1 className="section-title">Color Palette</h1>
          <p className="lede">
            Five brand accents map one-to-one to a five-element metaphor and a department cluster — they classify what
            something belongs to, never mean &ldquo;click me.&rdquo; Obsidian is the system&apos;s only actionable color.
          </p>
        </header>
        {colorGroups.map(g => (
          <div key={g.id} id={g.id} className="docs-color-group">
            <h2 className="swatch-group-label">
              {g.title}
              {g.note && <span className="docs-group-note"> — {g.note}</span>}
            </h2>
            <div className="swatches">
              {g.swatches.map(s => {
                const hex = hexOf(s.token);
                const name = cssVarName(s.token);
                return (
                  <div key={`${g.id}-${s.token}`} className="swatch">
                    <div className="fill" style={{ background: `var(${name})` }}>
                      <span className="docs-swatch-copy">
                        <CopyButton text={hex} />
                      </span>
                    </div>
                    <div className="meta">
                      <b>{s.name}</b>
                      <span className="hex">
                        <code>{name}</code> · {hex}
                      </span>
                      <p>{s.description}</p>
                      {s.tag && <span className="tag">{s.tag}</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </article>
      <aside className="docs-aside">
        <OnThisPage items={colorGroups.map(g => ({ id: g.id, label: g.title.split(' · ')[0] }))} />
      </aside>
    </div>
  );
}
