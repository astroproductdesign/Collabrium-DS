// The shape of every component's <Name>.docs.tsx file.
// The documentation site (playground) renders component pages from these
// files only. Keep each docs file consistent with <Name>.usage.md, which
// stays the written reference for AI and developers.
// Not part of the package build (tsup skips *.docs.tsx and this file).
import type { ReactNode } from 'react';

/** One live example: a title, a sentence, the rendered preview and its source. */
export interface DocsExample {
  /** Stable id, used for the section anchor (#example-<id>). kebab-case. */
  id: string;
  title: string;
  description: string;
  render: () => ReactNode;
  /** The exact source shown in the Code tab. Keep it in step with render. */
  code: string;
}

/** One part of the component, for the Anatomy tree. */
export interface DocsAnatomyNode {
  name: string;
  /** The element or class that renders it, e.g. `<button>.cui-button`. */
  element?: string;
  description: string;
  /** Present only in some configurations, e.g. "with leadingIcon". */
  when?: string;
  children?: DocsAnatomyNode[];
}

export interface DocsProp {
  name: string;
  /** The allowed values as written in TypeScript, e.g. `'sm' | 'md' | 'lg'`. */
  options: string;
  default: string;
  description: string;
  required?: boolean;
}

export interface DocsRules {
  do: string[];
  dont: string[];
}

export interface DocsKeyboard {
  /** Keys, e.g. "Enter / Space". */
  keys: string;
  action: string;
}

export interface DocsAccessibility {
  keyboard: DocsKeyboard[];
  notes: string[];
}

export interface DocsMotion {
  interaction: string;
  motion: string;
  /** Token(s) used, e.g. "--duration-fast · --ease-standard". */
  token: string;
}

/**
 * Everything a component docs file exports. Inline `code` in any string
 * field is written with backticks and rendered as code.
 */
export interface ComponentDocs {
  /** Sidebar and page title. */
  title: string;
  /** One line under the title. */
  description: string;
  /** Minimal import + example for the Usage section. */
  usage: string;
  /** Small live preview for the home page grid. Defaults to the first example. */
  thumbnail?: () => ReactNode;
  anatomy: DocsAnatomyNode[];
  /** The first example is also the main preview at the top of the page. */
  examples: DocsExample[];
  props: DocsProp[];
  rules: DocsRules;
  accessibility: DocsAccessibility;
  motion: DocsMotion[];
}
