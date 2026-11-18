'use client';

// The Changelog page: every entry in CHANGELOG.md (via app/_generated/changelog.ts), newest first, on the library's own
// vertical Timeline. Each item: the date above, "v<version> · <summary>" as the heading, the lead paragraph as the
// description, and the rest under Details. The newest 20 show; the rest sit behind the Timeline's own Show more.
import { Fragment, type ReactNode } from 'react';
import { Badge, Timeline, type TimelineItem } from '../../src';
import { changelog, currentVersion } from '../app/_generated/changelog';
import { Section } from './foundation/Section';

const SHOWN = 20;

/** Inline **bold**, `code` and [links](url), the only markup a changelog paragraph carries. */
function Rich({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/).filter(Boolean);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('**')) return <strong key={i}>{part.slice(2, -2)}</strong>;
        if (part.startsWith('`')) return <code key={i}>{part.slice(1, -1)}</code>;
        const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (link) return <a key={i} href={link[2]}>{link[1]}</a>;
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}

/** The description is plain text: drop the inline markup's punctuation. */
const plain = (text: string) => text.replace(/\*\*([^*]+)\*\*/g, '$1').replace(/`([^`]+)`/g, '$1').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

export function ChangelogPage() {
  const items: TimelineItem[] = changelog.map((e, i) => {
    let details: ReactNode;
    if (e.body.length) {
      details = (
        <div className="docs-changelog-body">
          {e.body.map((p, j) => (
            <p key={j} className="docs-p">
              <Rich text={p} />
            </p>
          ))}
        </div>
      );
    }
    return {
      id: `v${e.version}`,
      heading: `v${e.version} · ${e.title}`,
      date: e.date,
      description: plain(e.lead),
      details,
      slot: i === 0 ? <Badge variant="selected">Latest</Badge> : undefined,
    };
  });

  return (
    <Section
      id="changelog"
      level={1}
      kicker="Reference"
      title="Changelog"
      lede={
        <>
          Every change to <code>@collabrium/ui</code>, newest first. You're on <strong>v{currentVersion}</strong>, the
          version in the top bar. Versions before 0.1.90 were rebuilt from the build log: one version per component or
          change, on the dates it records.
        </>
      }
    >
      {items.length ? (
        <Timeline
          items={items}
          size="lg"
          steps={false}
          aria-labelledby="changelog-title"
          collapsed={items.length > SHOWN ? { later: items.length - SHOWN } : undefined}
          moreLabels={{ collapsed: 'Show more', expanded: 'Show less' }}
        />
      ) : (
        <p className="docs-p">Coming soon.</p>
      )}
    </Section>
  );
}
