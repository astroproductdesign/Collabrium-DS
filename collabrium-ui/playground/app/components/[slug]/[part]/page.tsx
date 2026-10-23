import { notFound } from 'next/navigation';
import { componentsMeta, groupsMeta } from '../../../_generated/components-meta';
import { ComponentDoc } from '../../../../components/ComponentDoc';

export const dynamicParams = false;

// A part of a group: components/<group>/<part>, for example components/ai-native/thinking.
export function generateStaticParams() {
  return groupsMeta.flatMap(g => g.parts.map(part => ({ slug: g.slug, part })));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; part: string }> }) {
  const { part } = await params;
  const meta = componentsMeta.find(c => c.slug === part);
  return { title: meta ? `${meta.title} · Collabrium UI` : 'Collabrium UI' };
}

export default async function PartRoute({ params }: { params: Promise<{ slug: string; part: string }> }) {
  const { slug, part } = await params;
  if (!componentsMeta.some(c => c.slug === part && c.group === slug)) notFound();
  return <ComponentDoc slug={part} />;
}
