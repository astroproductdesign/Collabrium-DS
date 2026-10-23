import { notFound } from 'next/navigation';
import { registry } from '../../registry';

export const dynamicParams = false;

export function generateStaticParams() {
  return registry.map(entry => ({ name: entry.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const entry = registry.find(e => e.slug === name);
  return { title: entry ? `${entry.name} · @collabrium/ui` : 'Not found' };
}

export default async function ComponentPage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const entry = registry.find(e => e.slug === name);
  if (!entry) notFound();
  const { Preview } = entry;
  return (
    <main className="pg-page">
      <a className="pg-back" href="/">All components</a>
      <h1 className="pg-h1">{entry.name}</h1>
      <p className="pg-lead">{entry.summary}</p>
      <Preview />
    </main>
  );
}
