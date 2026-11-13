import { notFound } from 'next/navigation';
import { foundationSections } from '../../../components/foundation';
import { foundationPages } from '../../../lib/site';

export const dynamicParams = false;

export function generateStaticParams() {
  return foundationPages.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = foundationPages.find(p => p.slug === slug);
  return { title: page ? `${page.title} · Collabrium UI` : 'Collabrium UI' };
}

export default async function FoundationRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const Content = foundationSections[slug];
  if (!Content) notFound();
  return (
    <div className="docs-page">
      <article className="docs-article docs-foundation-page">
        {/* Foundation pages sit one folder down, so public files are one level up. */}
        <Content base="../" level={1} />
      </article>
    </div>
  );
}
