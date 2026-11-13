// The thirteen Foundation sections, in sidebar order. Used by the home page
// (all of them, level 2) and by each Foundation page (one, level 1).
import type { ComponentType } from 'react';
import { AccessibilitySection } from './AccessibilitySection';
import { BrandSection } from './BrandSection';
import { ColorSection } from './ColorSection';
import { FontsSection } from './FontsSection';
import { GetStartedSection } from './GetStartedSection';
import { GuidelinesSection } from './GuidelinesSection';
import { IconographySection } from './IconographySection';
import { IllustrationSection } from './IllustrationSection';
import { LogoSection } from './LogoSection';
import { PhotographySection } from './PhotographySection';
import type { SectionProps } from './Section';
import { SpacingSection } from './SpacingSection';
import { TokensSection } from './TokensSection';
import { TypographySection } from './TypographySection';

export const foundationSections: Record<string, ComponentType<SectionProps>> = {
  'get-started': GetStartedSection,
  'brand-foundation': BrandSection,
  logo: LogoSection,
  'color-palette': ColorSection,
  typography: TypographySection,
  fonts: FontsSection,
  iconography: IconographySection,
  illustration: IllustrationSection,
  photography: PhotographySection,
  'spacing-shape': SpacingSection,
  accessibility: AccessibilitySection,
  tokens: TokensSection,
  guidelines: GuidelinesSection,
};
