'use client';

// The component page template. Every component page has the same
// sections, in the same order, and reads only from <Name>.docs.tsx.
import { componentDocs } from '../app/_generated/components-docs';
import { componentsMeta } from '../app/_generated/components-meta';
import type { ComponentDocs, DocsAnatomyNode } from '../../src/components/docs.types';
import { hrefTo, neighbours, type PageKey } from '../lib/site';
import { CodeBlock } from './CodeBlock';
import { CopyButton } from './CopyButton';
import { ExampleBlock } from './ExampleBlock';
import { OnThisPage, type TocItem } from './OnThisPage';
import { Prose } from './Prose';

const INSTALL = 'npm install @collabrium/ui';
const STYLES = `// app/layout.tsx
import '@collabrium/ui/styles.css';`;

function Anatomy({ nodes }: { nodes: DocsAnatomyNode[] }) {
  return (
    <ul className="docs-tree">
      {nodes.map(n => (
        <li key={n.name} className="docs-tree-node">
          <div className="docs-tree-row">
            <span className="docs-tree-name">{n.name}</span>
            {n.element && <code>{n.element}</code>}
            {n.when && <span className="c-badge c-badge-neutral">{n.when}</span>}
          </div>
          <p className="docs-tree-desc">
            <Prose text={n.description} />
          </p>
          {n.children && <Anatomy nodes={n.children} />}
        </li>
      ))}
    </ul>
  );
}

function SectionHead({ id, title }: { id: string; title: string }) {
  return (
    <div className="comp-head">
      <h2 id={`${id}-title`} className="docs-h2">
        {title}
      </h2>
    </div>
  );
}

/** The whole page as Markdown, for the Copy page button. */
function toMarkdown(d: ComponentDocs): string {
  const t = (rows: string[][]) => rows.map(r => `| ${r.join(' | ')} |`).join('\n');
  const tree = (nodes: DocsAnatomyNode[], depth = 0): string =>
    nodes
      .map(n => `${'  '.repeat(depth)}- **${n.name}**${n.element ? ` \`${n.element}\`` : ''}${n.when ? ` (${n.when})` : ''}: ${n.description}${n.children ? `\n${tree(n.children, depth + 1)}` : ''}`)
      .join('\n');
  return [
    `# ${d.title}`,
    d.description,
    `## Installation\n\n\`\`\`bash\n${INSTALL}\n\`\`\`\n\n\`\`\`tsx\n${STYLES}\n\`\`\``,
    `## Usage\n\n\`\`\`tsx\n${d.usage}\n\`\`\``,
    `## Anatomy\n\n${tree(d.anatomy)}`,
    `## Examples\n\n${d.examples.map(e => `### ${e.title}\n\n${e.description}\n\n\`\`\`tsx\n${e.code}\n\`\`\``).join('\n\n')}`,
    `## Props\n\n${t([['Prop', 'Options', 'Default', 'Description'], ['---', '---', '---', '---'], ...d.props.map(p => [`\`${p.name}\`${p.required ? ' (required)' : ''}`, `\`${p.options}\``, p.default, p.description])])}`,
    `## Usage rules\n\n**Do**\n${d.rules.do.map(r => `- ${r}`).join('\n')}\n\n**Don't**\n${d.rules.dont.map(r => `- ${r}`).join('\n')}`,
    `## Accessibility\n\n${t([['Keys', 'Action'], ['---', '---'], ...d.accessibility.keyboard.map(k => [k.keys, k.action])])}\n\n${d.accessibility.notes.map(n => `- ${n}`).join('\n')}`,
    `## Motion\n\n${t([['Interaction', 'Motion', 'Token'], ['---', '---', '---'], ...d.motion.map(m => [m.interaction, m.motion, m.token])])}`,
  ].join('\n\n');
}

function PrevNext({ current, compact }: { current: PageKey; compact?: boolean }) {
  const { prev, next } = neighbours(current);
  if (compact) {
    return (
      <div className="docs-pn-compact">
        {prev && (
          <a className="c-back-button" href={hrefTo(current, prev.key)} aria-label={`Previous: ${prev.title}`} title={`Previous: ${prev.title}`}>
            <i className="ph ph-arrow-left" aria-hidden="true" />
          </a>
        )}
        {next && (
          <a className="c-back-button" href={hrefTo(current, next.key)} aria-label={`Next: ${next.title}`} title={`Next: ${next.title}`}>
            <i className="ph ph-arrow-right" aria-hidden="true" />
          </a>
        )}
      </div>
    );
  }
  return (
    <nav className="docs-pn" aria-label="Previous and next pages">
      {prev ? (
        <a className="c-back-button docs-pn-link" href={hrefTo(current, prev.key)}>
          <i className="ph ph-arrow-left" aria-hidden="true" />
          <span>
            <span className="docs-pn-dir">Previous</span>
            {prev.title}
          </span>
        </a>
      ) : (
        <span />
      )}
      {next && (
        <a className="c-back-button docs-pn-link is-next" href={hrefTo(current, next.key)}>
          <span>
            <span className="docs-pn-dir">Next</span>
            {next.title}
          </span>
          <i className="ph ph-arrow-right" aria-hidden="true" />
        </a>
      )}
    </nav>
  );
}

export function ComponentDoc({ slug }: { slug: string }) {
  const docs = componentDocs[slug];
  const meta = componentsMeta.find(c => c.slug === slug)!;
  const current: PageKey = `components/${slug}`;
  const [main, ...rest] = docs.examples;

  const toc: TocItem[] = [
    { id: 'preview', label: 'Preview' },
    { id: 'installation', label: 'Installation' },
    { id: 'usage', label: 'Usage' },
    { id: 'anatomy', label: 'Anatomy' },
    { id: 'examples', label: 'Examples' },
    ...docs.examples.map(e => ({ id: `example-${e.id}`, label: e.title, level: 2 as const })),
    { id: 'props', label: 'Props' },
    { id: 'usage-rules', label: 'Usage rules' },
    { id: 'accessibility', label: 'Accessibility' },
    { id: 'motion', label: 'Motion' },
  ];

  return (
    <div className="docs-page has-toc">
      <article className="docs-article">
        <header className="docs-header">
          <nav aria-label="Breadcrumb" className="docs-breadcrumb">
            <ol>
              <li>
                <a href={hrefTo(current, '')}>Collabrium UI</a>
              </li>
              <li>
                <a href={hrefTo(current, '', 'components')}>Components</a>
              </li>
              <li aria-current="page">{docs.title}</li>
            </ol>
          </nav>
          <div className="docs-title-row">
            <h1 className="section-title docs-title">{docs.title}</h1>
            <div className="docs-title-actions">
              <CopyButton text={() => toMarkdown(docs)} label="Copy page" />
              <PrevNext current={current} compact />
            </div>
          </div>
          <p className="lede docs-lede">
            <Prose text={docs.description} />
          </p>
          <div className="docs-labels">
            <span className="c-badge c-badge-neutral">@collabrium/ui</span>
            {meta.client && <span className="c-badge c-badge-neutral">Client component</span>}
          </div>
        </header>

        <section id="preview" aria-labelledby="preview-title" className="docs-section">
          <h2 id="preview-title" className="sr-only">
            Preview
          </h2>
          <ExampleBlock title={main.title} preview={main.render()} code={main.code} toolbar />
        </section>

        <section id="installation" aria-labelledby="installation-title" className="docs-section">
          <SectionHead id="installation" title="Installation" />
          <div className="docs-stack">
            <CodeBlock code={INSTALL} label="bash" />
            <p className="docs-p">Import the stylesheet once, in the root layout:</p>
            <CodeBlock code={STYLES} label="tsx" />
          </div>
        </section>

        <section id="usage" aria-labelledby="usage-title" className="docs-section">
          <SectionHead id="usage" title="Usage" />
          <CodeBlock code={docs.usage} label="tsx" />
        </section>

        <section id="anatomy" aria-labelledby="anatomy-title" className="docs-section">
          <SectionHead id="anatomy" title="Anatomy" />
          <Anatomy nodes={docs.anatomy} />
        </section>

        <section id="examples" aria-labelledby="examples-title" className="docs-section">
          <SectionHead id="examples" title="Examples" />
          {[main, ...rest].map(ex => (
            <div key={ex.id} id={`example-${ex.id}`} className="docs-example">
              <h3 className="docs-h3">{ex.title}</h3>
              <p className="docs-p">
                <Prose text={ex.description} />
              </p>
              <ExampleBlock title={ex.title} preview={ex.render()} code={ex.code} />
            </div>
          ))}
        </section>

        <section id="props" aria-labelledby="props-title" className="docs-section">
          <SectionHead id="props" title="Props" />
          <div className="c-table-standalone-wrap docs-table-wrap">
            <table className="c-table c-table-standalone">
              <thead>
                <tr>
                  <th scope="col">Prop</th>
                  <th scope="col">Options</th>
                  <th scope="col">Default</th>
                  <th scope="col">Description</th>
                </tr>
              </thead>
              <tbody>
                {docs.props.map(p => (
                  <tr key={p.name}>
                    <td>
                      <code>{p.name}</code>
                      {p.required && <span className="c-badge c-badge-neutral docs-required">required</span>}
                    </td>
                    <td>
                      <code>{p.options}</code>
                    </td>
                    <td>{p.default === '—' ? '—' : <code>{p.default}</code>}</td>
                    <td>
                      <Prose text={p.description} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="usage-rules" aria-labelledby="usage-rules-title" className="docs-section">
          <SectionHead id="usage-rules" title="Usage rules" />
          <div className="docs-rules">
            <div className="c-card">
              <div className="guide-col do">
                <h3>
                  <i className="ph-fill ph-check-circle" aria-hidden="true" /> Do
                </h3>
                <ul>
                  {docs.rules.do.map(r => (
                    <li key={r}>
                      <i className="ph ph-check" aria-hidden="true" />
                      <Prose text={r} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="c-card">
              <div className="guide-col dont">
                <h3>
                  <i className="ph-fill ph-x-circle" aria-hidden="true" /> Don&apos;t
                </h3>
                <ul>
                  {docs.rules.dont.map(r => (
                    <li key={r}>
                      <i className="ph ph-x" aria-hidden="true" />
                      <Prose text={r} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="accessibility" aria-labelledby="accessibility-title" className="docs-section">
          <SectionHead id="accessibility" title="Accessibility" />
          <div className="c-table-standalone-wrap docs-table-wrap">
            <table className="c-table c-table-standalone">
              <thead>
                <tr>
                  <th scope="col">Keys</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {docs.accessibility.keyboard.map(k => (
                  <tr key={k.keys}>
                    <td className="docs-nowrap">
                      {k.keys.split(' / ').map((key, i) => (
                        <span key={key}>
                          {i > 0 && ' / '}
                          <kbd className="docs-kbd">{key}</kbd>
                        </span>
                      ))}
                    </td>
                    <td>{k.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ul className="docs-notes">
            {docs.accessibility.notes.map(n => (
              <li key={n}>
                <Prose text={n} />
              </li>
            ))}
          </ul>
        </section>

        <section id="motion" aria-labelledby="motion-title" className="docs-section">
          <SectionHead id="motion" title="Motion" />
          <div className="c-table-standalone-wrap docs-table-wrap">
            <table className="c-table c-table-standalone">
              <thead>
                <tr>
                  <th scope="col">Interaction</th>
                  <th scope="col">Motion</th>
                  <th scope="col">Token</th>
                </tr>
              </thead>
              <tbody>
                {docs.motion.map(m => (
                  <tr key={m.interaction}>
                    <td>{m.interaction}</td>
                    <td>{m.motion}</td>
                    <td>
                      <Prose text={m.token.replace(/(--[a-z0-9-]+)/g, '`$1`')} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <PrevNext current={current} />
      </article>
      <aside className="docs-aside">
        <OnThisPage items={toc} />
      </aside>
    </div>
  );
}
