import { ChangelogPage } from '../../components/Changelog';

export const metadata = { title: 'Changelog · Collabrium UI' };

export default function ChangelogRoute() {
  return (
    <div className="docs-page">
      <article className="docs-article docs-foundation-page">
        <ChangelogPage />
      </article>
    </div>
  );
}
