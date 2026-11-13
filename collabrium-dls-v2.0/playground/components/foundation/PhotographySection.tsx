// Foundation › Photography & Visual Direction. collabrium-dls/DESIGN-SYSTEM.md
// "Photography & Visual Direction" (901–907) has no direction yet: the brand
// deck marks it a placeholder until the logo is final (Needs Input #9). The
// page keeps its place and says "Coming soon.", as every docs page does for
// content that isn't written yet. Nothing here is invented in the meantime.
import { Section, type SectionProps } from './Section';

export function PhotographySection({ level }: SectionProps) {
  return (
    <Section id="photography" level={level} kicker="08 · Foundations" title="Photography & Visual Direction">
      <p className="docs-p">Coming soon.</p>
    </Section>
  );
}
