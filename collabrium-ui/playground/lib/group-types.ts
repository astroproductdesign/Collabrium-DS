// The shape of a group's overview file (playground/content/groups/<slug>.tsx).
// A group is a family the DLS documents as one component with several parts
// (AI Native). Its parts are the components whose docs file exports
// `group = '<name>'`; this file holds only what is written about the family
// as a whole. Docs site only: nothing here is part of the package.
import type { ReactNode } from 'react';

export interface GroupFlowStep {
  /** The moment in the run, e.g. "Ask". */
  title: string;
  /** What happens and which part covers it. Inline `code` is written with backticks. */
  description: string;
}

export interface GroupComingSoon {
  /** The part's name, as the DLS writes it. */
  title: string;
  /** One line on what it is. */
  summary: string;
}

export interface GroupOverviewDocs {
  /** The group's name: the sidebar item and page title. */
  title: string;
  /** One line under the title. */
  description: string;
  /** Small live preview for the home page card. */
  thumbnail?: () => ReactNode;
  /** The opening paragraphs. */
  overview: string[];
  /** The "How the parts fit together" steps, in order. */
  flow: GroupFlowStep[];
  /** Short intro line above the shared rules. */
  rulesIntro: string;
  /** Rules the parts share. */
  rules: string[];
  /**
   * Parts the family has that have no page yet. They are shown as "Coming
   * soon" cards among the real parts, alphabetical. An entry is ignored once
   * a real part with the same title exists, so a finished part never shows twice.
   */
  comingSoon: GroupComingSoon[];
}
