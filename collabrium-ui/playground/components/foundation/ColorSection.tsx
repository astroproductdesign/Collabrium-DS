// Foundation › Color Palette. Ported from collabrium-dls/preview.html,
// section#color; every value is read from the tokens.
import { colorGroups, cssVarName, hexOf } from '../../lib/colors';
import { CopyButton } from '../CopyButton';
import { GroupLabel, Section, type SectionProps } from './Section';

export function ColorSection({ level }: SectionProps) {
  return (
    <Section
      id="color-palette"
      level={level}
      kicker="02 · Foundations"
      title="Color Palette"
      lede={'Five brand accents map one-to-one to a five-element metaphor and a department cluster — they classify what something belongs to, never mean "click me." Obsidian is the system\'s only actionable color.'}
    >
      {colorGroups.map(g => (
        <div key={g.id} className="docs-color-group">
          <GroupLabel level={level} id={g.id}>
            {g.title}
            {g.note && <span className="docs-group-note"> — {g.note}</span>}
          </GroupLabel>
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
    </Section>
  );
}
