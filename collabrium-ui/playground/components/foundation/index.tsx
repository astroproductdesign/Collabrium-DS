// The seven Foundation sections, in sidebar order. Used by the home page
// (all of them, level 2) and by each Foundation page (one, level 1).
import type { ComponentType } from 'react';
import { ColorSection } from './ColorSection';
import { FontsSection } from './FontsSection';
import { GuidelinesSection } from './GuidelinesSection';
import { IconographySection } from './IconographySection';
import { LogoSection } from './LogoSection';
import type { SectionProps } from './Section';
import { SpacingSection } from './SpacingSection';
import { TypographySection } from './TypographySection';

export const foundationSections: Record<string, ComponentType<SectionProps>> = {
  logo: LogoSection,
  'color-palette': ColorSection,
  typography: TypographySection,
  fonts: FontsSection,
  iconography: IconographySection,
  'spacing-shape': SpacingSection,
  guidelines: GuidelinesSection,
};
