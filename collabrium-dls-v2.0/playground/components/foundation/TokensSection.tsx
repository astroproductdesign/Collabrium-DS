'use client';

// Foundation › Tokens. The DLS site's source panel (collabrium-dls/preview.html
// 5077–5080: the CSS Variables, Tailwind v4 and Design Tokens tabs, each with
// Copy and Download) and DESIGN-SYSTEM.md "Design Tokens" (10037–10091), as a
// page. The texts come from scripts/gen-token-exports.mjs: the package's
// tokens.css, and the DLS's Tailwind mapping and JSON export copied into
// playground/public/tokens/.
import { useState } from 'react';
import { Tabs } from '../../../src';
import { jsonVersion, tokenCount, tokenExports } from '../../app/_generated/token-exports';
import { CodeBlock } from '../CodeBlock';
import { DownloadButton } from './DownloadButton';
import { GroupLabel, Section, type SectionProps } from './Section';

const formats = [
  {
    id: 'css',
    label: 'CSS variables',
    file: 'tokens.css',
    text: tokenExports.css,
    about: (
      <>
        Every value as a CSS custom property. The package ships it as <code>@collabrium/ui/tokens.css</code>, and{' '}
        <code>styles.css</code> already includes it.
      </>
    ),
  },
  {
    id: 'tailwind',
    label: 'Tailwind v4',
    file: 'tailwind.css',
    text: tokenExports.tailwind,
    about: (
      <>
        A full <code>@theme</code> mapping, so Tailwind utilities (<code>bg-orange</code>, <code>rounded-sm</code>,{' '}
        <code>p-4</code>) resolve to Collabrium&apos;s tokens. Import <code>tokens.css</code> first.
      </>
    ),
  },
  {
    id: 'json',
    label: 'Design tokens (JSON)',
    file: 'tokens.json',
    text: tokenExports.json,
    about: <>The same values as structured JSON, for design tools and other platforms (v{jsonVersion}).</>,
  },
];

const USE = `@import "@collabrium/ui/tokens.css";

.my-panel {
  background: var(--color-neutral-1);
  border-radius: var(--radius-lg);
  padding: var(--spacing-16);
  box-shadow: var(--shadow-1);
}`;

export function TokensSection({ base, level }: SectionProps) {
  const [format, setFormat] = useState('css');
  const active = formats.find(f => f.id === format)!;
  return (
    <Section
      id="tokens"
      level={level}
      kicker="11 · Reference"
      title="Tokens"
      lede={
        <>
          Every colour, space, radius, shadow, type and motion value in the system — {tokenCount} tokens. Components use
          nothing else: if a screen needs a value that isn&apos;t a token, the token set is incomplete, so flag it rather
          than inventing a one-off.
        </>
      }
    >
      <GroupLabel level={level}>Use them</GroupLabel>
      <CodeBlock code={USE} label="CSS" />

      <GroupLabel level={level}>Get them</GroupLabel>
      <div className="docs-tokens-tabs">
        <Tabs
          aria-label="Token format"
          tabs={formats.map(f => ({ id: f.id, label: f.label }))}
          value={format}
          onValueChange={setFormat}
        />
      </div>
      <div className="docs-tokens-head">
        <p className="docs-p">{active.about}</p>
        <DownloadButton href={`${base}tokens/${active.file}`} filename={active.file} label={`Download ${active.file}`} />
      </div>
      <div className="docs-tokens-code">
        <CodeBlock code={active.text} label={active.file} />
      </div>
    </Section>
  );
}
