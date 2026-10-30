'use client';

// The overview page of a group (AI Native): what the family is, how its
// parts fit together, the rules they share, and a card for every part. Real
// parts link to their own pages; parts the family has but that have no page
// yet show as "Coming soon". Reads the group's overview file and the docs
// files of its parts, so a new part appears here by itself.
import type { ReactNode } from 'react';
import { ThumbFit } from './ThumbFit';
import { Badge, Card, CardGrid, CardTitle } from '../../src';
import { ChartThumbnail } from '../../src/charts-extra';
import { componentDocs, groupDocs } from '../app/_generated/components-docs';
import { componentsMeta } from '../app/_generated/components-meta';
import { componentKey, groups, hrefTo, type PageKey } from '../lib/site';
import { ComingSoon, PrevNext, SectionHead } from './DocParts';
import { CopyButton } from './CopyButton';
import { OnThisPage, type TocItem } from './OnThisPage';
import { Prose } from './Prose';

interface PartCard {
  title: string;
  summary: string;
  /** Present for a real part. */
  key?: PageKey;
  thumb?: ReactNode;
}

const byTitle = (a: PartCard, b: PartCard) => a.title.localeCompare(b.title, 'en', { sensitivity: 'base' });

export function GroupOverview({ slug }: { slug: string }) {
  const overview = groupDocs[slug];
  const group = groups.find(g => g.slug === slug)!;
  const current: PageKey = `components/${slug}`;

  // Charts appear as bare shapes on their cards: no axes, labels or legend.
  const bare = (node: ReactNode) => (slug === 'charts-extra' ? <ChartThumbnail>{node}</ChartThumbnail> : node);

  const real: PartCard[] = group.parts.map(partSlug => {
    const meta = componentsMeta.find(c => c.slug === partSlug)!;
    const docs = componentDocs[partSlug];
    return {
      title: docs.title,
      summary: docs.description,
      key: componentKey(meta),
      thumb: bare(docs.thumbnail ? docs.thumbnail() : docs.examples?.[0]?.render()),
    };
  });
  const soon: PartCard[] = overview.comingSoon
    .filter(c => !real.some(r => r.title.toLowerCase() === c.title.toLowerCase()))
    .map(c => ({ title: c.title, summary: c.summary }));
  const cards = [...real, ...soon].sort(byTitle);

  const toc: TocItem[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'flow', label: 'How the parts fit together' },
    { id: 'rules', label: 'Shared rules' },
    { id: 'parts', label: 'Parts' },
  ];

  const markdown = () =>
    [
      `# ${overview.title}`,
      overview.description,
      `## Overview\n\n${overview.overview.join('\n\n')}`,
      `## How the parts fit together\n\n${overview.flow.map((f, i) => `${i + 1}. **${f.title}**: ${f.description}`).join('\n')}`,
      `## Shared rules\n\n${overview.rulesIntro}\n\n${overview.rules.map(r => `- ${r}`).join('\n')}`,
      `## Parts\n\n${cards.map(c => `- **${c.title}**${c.key ? '' : ' (coming soon)'}: ${c.summary}`).join('\n')}`,
    ].join('\n\n');

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
              <li aria-current="page">{overview.title}</li>
            </ol>
          </nav>
          <div className="docs-title-row">
            <div className="docs-title-group">
              <PrevNext current={current} compact="back" />
              <h1 className="section-title docs-title">{overview.title}</h1>
            </div>
            <div className="docs-title-actions">
              <CopyButton text={markdown} label="Copy page" />
              <PrevNext current={current} compact="step" />
            </div>
          </div>
          <p className="lede docs-lede">
            <Prose text={overview.description} />
          </p>
        </header>

        <section id="overview" aria-labelledby="overview-title" className="docs-section">
          <SectionHead id="overview" title="Overview" />
          {overview.overview.map(p => (
            <p key={p} className="docs-p">
              <Prose text={p} />
            </p>
          ))}
        </section>

        <section id="flow" aria-labelledby="flow-title" className="docs-section">
          <SectionHead id="flow" title="How the parts fit together" />
          <ol className="docs-flow">
            {overview.flow.map(step => (
              <li key={step.title}>
                <span className="docs-flow-title">{step.title}</span>
                <span className="docs-flow-desc">
                  <Prose text={step.description} />
                </span>
              </li>
            ))}
          </ol>
        </section>

        <section id="rules" aria-labelledby="rules-title" className="docs-section">
          <SectionHead id="rules" title="Shared rules" />
          <p className="docs-p">
            <Prose text={overview.rulesIntro} />
          </p>
          <ul className="docs-notes">
            {overview.rules.map(r => (
              <li key={r}>
                <Prose text={r} />
              </li>
            ))}
          </ul>
        </section>

        <section id="parts" aria-labelledby="parts-title" className="docs-section">
          <SectionHead id="parts" title="Parts" />
          {cards.length === 0 ? (
            <ComingSoon />
          ) : (
            <CardGrid>
              {cards.map(c => (
                <Card key={c.title}>
                  {c.key && (
                    <ThumbFit>
                      {c.thumb}
                    </ThumbFit>
                  )}
                  {c.key ? <CardTitle href={hrefTo(current, c.key)}>{c.title}</CardTitle> : <CardTitle>{c.title}</CardTitle>}
                  <p className="docs-card-desc">
                    <Prose text={c.summary} />
                  </p>
                  {!c.key && (
                    <span className="docs-card-soon">
                      <Badge variant="neutral">Coming soon</Badge>
                    </span>
                  )}
                </Card>
              ))}
            </CardGrid>
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
