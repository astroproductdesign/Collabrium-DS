import { registry } from './registry';

export default function Home() {
  return (
    <main className="pg-page">
      <p className="pg-eyebrow">@collabrium/ui</p>
      <h1 className="pg-h1">Playground</h1>
      <p className="pg-lead">
        Every converted component, with the old HTML + CSS from collabrium-dls beside it. See MIGRATION-LOG.md for
        status and open questions.
      </p>
      <ul className="pg-index">
        {registry.map(entry => (
          <li key={entry.slug}>
            {/* Plain links, so the static export also works from disk. */}
            <a className="pg-index-link" href={`/components/${entry.slug}`}>
              <span className="pg-index-name">{entry.name}</span>
              <span className="pg-index-status" data-status={entry.status}>{entry.status}</span>
              <span className="pg-index-summary">{entry.summary}</span>
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
