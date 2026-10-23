'use client';

// Foundation › Typography. Ported from collabrium-dls/preview.html,
// section#typography (typeScaleData). Sizes, line heights, weights and
// tracking are read from the tokens; the samples are set with the CSS
// variables themselves.
import { useState } from 'react';
import { Button } from '../../../src';
import { tokens } from '../../../src/tokens/tokens';
import { Section, type SectionProps } from './Section';

type StyleKey = keyof typeof tokens.text;
const STEPS: { label: string; key: StyleKey; strong?: boolean }[] = [
  { label: 'display', key: 'display' },
  { label: 'h1', key: 'h1' },
  { label: 'h2', key: 'h2' },
  { label: 'h3', key: 'h3' },
  { label: 'h4', key: 'h4' },
  { label: 'h5', key: 'h5' },
  { label: 'body1', key: 'body1' },
  { label: 'body1 strong', key: 'body1', strong: true },
  { label: 'body2', key: 'body2' },
  { label: 'body2 strong', key: 'body2', strong: true },
  { label: 'label1', key: 'label1' },
  { label: 'label2', key: 'label2' },
  { label: 'label3', key: 'label3' },
  { label: 'link1', key: 'link1' },
  { label: 'link2', key: 'link2' },
  { label: 'footnote', key: 'footnote' },
  { label: 'caption', key: 'caption' },
];
const VISIBLE = 6;

export function TypographySection({ level }: SectionProps) {
  const [all, setAll] = useState(false);
  return (
    <Section
      id="typography"
      level={level}
      kicker="03 · Foundations"
      title="Typography"
      lede={
        <>
          17-step type scale, Primary (Mulish) for everything functional <b>and every heading</b> (800 ExtraBold),
          Secondary (Source Serif 4) reserved for deliberate brand-statement moments only. Sourced from a teammate&apos;s
          fuller deck extraction, not guessed — but still not brand-team signed off.
        </>
      }
    >
      <div id="typeScale">
        {STEPS.map((s, i) => {
          const t = tokens.text[s.key] as { size: number; lh: number; weight: number; tracking?: string; strongWeight?: number };
          const weight = s.strong ? t.strongWeight : t.weight;
          const tracking = t.tracking && t.tracking !== '0' ? `+${t.tracking}` : '0';
          return (
            <div key={s.label} className={`type-row${!all && i >= VISIBLE ? ' hidden' : ''}`}>
              <div className="type-meta">
                <b>{s.label}</b>Primary · {t.size}px · {weight} · lh {t.lh}px · {tracking}
              </div>
              <div
                className="type-sample"
                style={{
                  fontFamily: 'var(--font-primary)',
                  fontSize: `var(--text-${s.key}-size)`,
                  lineHeight: `var(--text-${s.key}-lh)`,
                  fontWeight: `var(--text-${s.key}-${s.strong ? 'strong-weight' : 'weight'})`,
                  letterSpacing: `var(--text-${s.key}-tracking)`,
                }}
              >
                The quick brown fox jumps
              </div>
            </div>
          );
        })}
      </div>
      <div className="docs-type-toggle">
        <Button variant="secondary" size="sm" aria-expanded={all} aria-controls="typeScale" onClick={() => setAll(a => !a)}>
          {all ? 'Show fewer' : `Show all ${STEPS.length} steps`}
        </Button>
      </div>
    </Section>
  );
}
