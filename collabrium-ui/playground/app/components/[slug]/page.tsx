import { notFound } from 'next/navigation';
import { componentsMeta } from '../../_generated/components-meta';
import { ComponentDoc } from '../../../components/ComponentDoc';

export const dynamicParams = false;

export function generateStaticParams() {
  return componentsMeta.map(c => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const meta = componentsMeta.find(c => c.slug === slug);
  return { title: meta ? `${meta.title} · Collabrium UI` : 'Collabrium UI' };
}

export default async function ComponentRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!componentsMeta.some(c => c.slug === slug)) notFound();
  return <ComponentDoc slug={slug} />;
}
