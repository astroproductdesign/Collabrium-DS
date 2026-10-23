import { notFound } from 'next/navigation';
import { ColorPalette } from '../../../components/ColorPalette';
import { FoundationIntro } from '../../../components/FoundationIntro';
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
  const index = foundationPages.findIndex(p => p.slug === slug);
  if (index < 0) notFound();
  if (slug === 'color-palette') return <ColorPalette />;
  return <FoundationIntro page={foundationPages[index]} index={index} />;
}
