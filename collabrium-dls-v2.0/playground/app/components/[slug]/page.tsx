import { notFound } from 'next/navigation';
import { componentsMeta, groupsMeta, navMeta } from '../../_generated/components-meta';
import { ComponentDoc } from '../../../components/ComponentDoc';
import { GroupOverview } from '../../../components/GroupOverview';

export const dynamicParams = false;

// A stand-alone component, or a group's overview page (AI Native). The parts
// of a group live one level down, in components/[slug]/[part].
export function generateStaticParams() {
  return navMeta.map(n => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const title = navMeta.find(n => n.slug === slug)?.title;
  return { title: title ? `${title} · Collabrium UI` : 'Collabrium UI' };
}

export default async function ComponentRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (groupsMeta.some(g => g.slug === slug)) return <GroupOverview slug={slug} />;
  if (!componentsMeta.some(c => c.slug === slug && !c.group)) notFound();
  return <ComponentDoc slug={slug} />;
}
