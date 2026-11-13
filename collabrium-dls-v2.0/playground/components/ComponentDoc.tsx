'use client';

// The component page template. Every component page has the same
// sections, in the same order, and reads only from <Name>.docs.tsx.
// A section with nothing in its docs field still shows its heading, with
// "Coming soon." under it, so every page has the same structure.
import { Badge, Card, Table, type TableColumn } from '../../src';
import { componentDocs } from '../app/_generated/components-docs';
import { componentsMeta } from '../app/_generated/components-meta';
import type { ComponentDocs, DocsAnatomyNode, DocsKeyboard, DocsMotion, DocsProp } from '../../src/components/docs.types';
import { componentKey, groups, hrefTo, type PageKey } from '../lib/site';
import { CodeBlock } from './CodeBlock';
import { ComingSoon, PrevNext, SectionHead, SOON } from './DocParts';
import { CopyButton } from './CopyButton';
import { ExampleBlock } from './ExampleBlock';
import { OnThisPage, type TocItem } from './OnThisPage';
import { Prose } from './Prose';

/* The docs' reference tables are the library's Table. Their order is deliberate, so they don't sort. */
const propColumns: TableColumn<DocsProp>[] = [
  {
    key: 'name',
    header: 'Prop',
    sortable: false,
    render: p => (
      <>
        <code>{p.name}</code>
        {p.required && (
          <span className="docs-required">
            <Badge variant="neutral">required</Badge>
          </span>
        )}
      </>
    ),
  },
  { key: 'options', header: 'Options', sortable: false, render: p => <code>{p.options}</code> },
  { key: 'default', header: 'Default', sortable: false, render: p => (p.default === '—' ? '—' : <code>{p.default}</code>) },
  { key: 'description', header: 'Description', sortable: false, render: p => <Prose text={p.description} /> },
];
const keyColumns: TableColumn<DocsKeyboard>[] = [
  {
    key: 'keys',
    header: 'Keys',
    sortable: false,
    render: k => (
      <span className="docs-nowrap">
        {k.keys.split(' / ').map((key, i) => (
          <span key={key}>
            {i > 0 && ' / '}
            <kbd className="docs-kbd">{key}</kbd>
          </span>
        ))}
      </span>
    ),
  },
  { key: 'action', header: 'Action', sortable: false },
];
const motionColumns: TableColumn<DocsMotion>[] = [
  { key: 'interaction', header: 'Interaction', sortable: false },
  { key: 'motion', header: 'Motion', sortable: false },
  { key: 'token', header: 'Token', sortable: false, render: m => <Prose text={m.token.replace(/(--[a-z0-9-]+)/g, '`$1`')} /> },
];

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
            {n.when && <Badge variant="neutral">{n.when}</Badge>}
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

/** The whole page as Markdown, for the Copy page button. */
function toMarkdown(d: ComponentDocs): string {
  const examples = d.examples ?? [];
  const keyboard = d.accessibility?.keyboard;
  const t = (rows: string[][]) => rows.map(r => `| ${r.join(' | ')} |`).join('\n');
  const tree = (nodes: DocsAnatomyNode[], depth = 0): string =>
    nodes
      .map(n => `${'  '.repeat(depth)}- **${n.name}**${n.element ? ` \`${n.element}\`` : ''}${n.when ? ` (${n.when})` : ''}: ${n.description}${n.children ? `\n${tree(n.children, depth + 1)}` : ''}`)
      .join('\n');
  return [
    `# ${d.title}`,
    d.description,
    `## Installation\n\n\`\`\`bash\n${INSTALL}\n\`\`\`\n\n\`\`\`tsx\n${STYLES}\n\`\`\``,
    `## Usage\n\n${d.usage ? `\`\`\`tsx\n${d.usage}\n\`\`\`` : SOON}`,
    `## Anatomy\n\n${d.anatomy?.length ? tree(d.anatomy) : SOON}`,
    `## Examples\n\n${examples.length ? examples.map(e => `### ${e.title}\n\n${e.description}\n\n\`\`\`tsx\n${e.code}\n\`\`\``).join('\n\n') : SOON}`,
    `## Props\n\n${d.props?.length ? t([['Prop', 'Options', 'Default', 'Description'], ['---', '---', '---', '---'], ...d.props.map(p => [`\`${p.name}\`${p.required ? ' (required)' : ''}`, `\`${p.options}\``, p.default, p.description])]) : SOON}`,
    `## Usage rules\n\n${d.rules ? `**Do**\n${d.rules.do.map(r => `- ${r}`).join('\n')}\n\n**Don't**\n${d.rules.dont.map(r => `- ${r}`).join('\n')}` : SOON}`,
    `## Accessibility\n\n${d.accessibility ? `${typeof keyboard === 'string' ? keyboard : t([['Keys', 'Action'], ['---', '---'], ...(keyboard ?? []).map(k => [k.keys, k.action])])}\n\n${d.accessibility.notes.map(n => `- ${n}`).join('\n')}` : SOON}`,
    `## Motion\n\n${typeof d.motion === 'string' ? d.motion : d.motion?.length ? t([['Interaction', 'Motion', 'Token'], ['---', '---', '---'], ...d.motion.map(m => [m.interaction, m.motion, m.token])]) : SOON}`,
  ].join('\n\n');
}

export function ComponentDoc({ slug }: { slug: string }) {
  const docs = componentDocs[slug];
  const meta = componentsMeta.find(c => c.slug === slug)!;
  const current: PageKey = componentKey(meta);
  const group = groups.find(g => g.slug === meta.group);
  const examples = docs.examples ?? [];
  const main = examples[0];
  const keyboard = docs.accessibility?.keyboard;

  const toc: TocItem[] = [
    { id: 'preview', label: 'Preview' },
    { id: 'installation', label: 'Installation' },
    { id: 'usage', label: 'Usage' },
    { id: 'anatomy', label: 'Anatomy' },
    { id: 'examples', label: 'Examples' },
    ...examples.map(e => ({ id: `example-${e.id}`, label: e.title, level: 2 as const })),
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
              {group && (
                <li>
                  <a href={hrefTo(current, `components/${group.slug}`)}>{group.title}</a>
                </li>
              )}
              <li aria-current="page">{docs.title}</li>
            </ol>
          </nav>
          <div className="docs-title-row">
            <div className="docs-title-group">
              <PrevNext current={current} compact="back" />
              <h1 className="section-title docs-title">{docs.title}</h1>
            </div>
            <div className="docs-title-actions">
              <CopyButton text={() => toMarkdown(docs)} label="Copy page" />
              <PrevNext current={current} compact="step" />
            </div>
          </div>
          <p className="lede docs-lede">
            <Prose text={docs.description} />
          </p>
          <div className="docs-labels">
            <Badge variant="neutral">@collabrium/ui</Badge>
            {meta.client && <Badge variant="neutral">Client component</Badge>}
          </div>
        </header>

        <section id="preview" aria-labelledby="preview-title" className="docs-section">
          <h2 id="preview-title" className="sr-only">
            Preview
          </h2>
          {main ? <ExampleBlock title={main.title} preview={main.render()} code={main.code} toolbar /> : <ComingSoon />}
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
          {docs.usage ? <CodeBlock code={docs.usage} label="tsx" /> : <ComingSoon />}
        </section>

        <section id="anatomy" aria-labelledby="anatomy-title" className="docs-section">
          <SectionHead id="anatomy" title="Anatomy" />
          {docs.anatomy?.length ? <Anatomy nodes={docs.anatomy} /> : <ComingSoon />}
        </section>

        <section id="examples" aria-labelledby="examples-title" className="docs-section">
          <SectionHead id="examples" title="Examples" />
          {examples.length === 0 && <ComingSoon />}
          {examples.map(ex => (
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
          {!docs.props?.length ? (
            <ComingSoon />
          ) : (
          <div className="docs-table-wrap">
            <Table label="Props" columns={propColumns} rows={docs.props} getRowKey={p => p.name} />
          </div>
          )}
        </section>

        <section id="usage-rules" aria-labelledby="usage-rules-title" className="docs-section">
          <SectionHead id="usage-rules" title="Usage rules" />
          {!docs.rules ? (
            <ComingSoon />
          ) : (
          <div className="docs-rules">
            <Card>
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
            </Card>
            <Card>
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
            </Card>
          </div>
          )}
        </section>

        <section id="accessibility" aria-labelledby="accessibility-title" className="docs-section">
          <SectionHead id="accessibility" title="Accessibility" />
          {!docs.accessibility ? (
            <ComingSoon />
          ) : (
          <>
          {typeof keyboard === 'string' ? (
            <p className="docs-p">
              <Prose text={keyboard} />
            </p>
          ) : (
          <div className="docs-table-wrap">
            <Table label="Keyboard" columns={keyColumns} rows={keyboard ?? []} getRowKey={k => k.keys} />
          </div>
          )}
          <ul className="docs-notes">
            {docs.accessibility.notes.map(n => (
              <li key={n}>
                <Prose text={n} />
              </li>
            ))}
          </ul>
          </>
          )}
        </section>

        <section id="motion" aria-labelledby="motion-title" className="docs-section">
          <SectionHead id="motion" title="Motion" />
          {typeof docs.motion === 'string' ? (
            <p className="docs-p">
              <Prose text={docs.motion} />
            </p>
          ) : !docs.motion?.length ? (
            <ComingSoon />
          ) : (
          <div className="docs-table-wrap">
            <Table label="Motion" columns={motionColumns} rows={docs.motion} getRowKey={m => m.interaction} />
          </div>
          )}
        </section>

        <PrevNext current={current} />
      </article>
      <aside className="docs-aside">
        <OnThisPage items={toc} />
      </aside>
    </div>
  );
}
