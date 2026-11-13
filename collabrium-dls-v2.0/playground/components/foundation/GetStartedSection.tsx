// Foundation › Get started: three steps for a team to build with the design
// system through its AI agent. The agent does the setup, following the
// folder's CLAUDE.md; the manual route is folded away below for anyone
// working without one. Keep in step with CLAUDE.md and README.md.
import { CodeBlock } from '../CodeBlock';
import { DownloadButton } from './DownloadButton';
import { Section, type SectionProps } from './Section';

const PROMPT = `Use the Collabrium design system in ../collabrium-dls-v2.0.
Read its CLAUDE.md first and follow it. It covers setting it up in this app, which components to use, and how to check the result.

Build: [what the screen is for, who uses it, what's on it]`;

const MANUAL = `# 1. In the collabrium-dls-v2.0 folder
npm run setup

# 2. In your app
npm install ../collabrium-dls-v2.0/collabrium-ui-0.1.0.tgz
npm install @phosphor-icons/react`;

const LAYOUT = `// app/layout.tsx
import '@collabrium/ui/styles.css';
import { Mulish } from 'next/font/google';

const mulish = Mulish({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], variable: '--font-primary' });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={mulish.variable}>{children}</body>
    </html>
  );
}`;

export function GetStartedSection({ base, level }: SectionProps) {
  const H3 = level === 1 ? 'h2' : 'h3';
  return (
    <Section
      id="get-started"
      level={level}
      kicker="Start here"
      title="Get started"
      lede="Build with the Collabrium design system in your Next.js app. Your AI agent does the setup."
    >
      <ol className="docs-steps">
        <li>
          <H3 className="docs-step-title">Download and unzip</H3>
          <DownloadButton
            href={`${base}collabrium-dls-v2.0.zip`}
            filename="collabrium-dls-v2.0.zip"
            label="Download collabrium-dls-v2.0"
            variant="primary"
            size="md"
          />
          <p className="docs-p">
            Unzip it next to your app&apos;s folder. No app yet? Make an empty folder for it beside this one; your agent
            creates the app there. Don&apos;t edit anything inside the design system.
          </p>
        </li>
        <li>
          <H3 className="docs-step-title">Give your agent this prompt</H3>
          <p className="docs-p">Fill in what you want built, then paste it in.</p>
          <CodeBlock code={PROMPT} label="Prompt" />
        </li>
        <li>
          <H3 className="docs-step-title">If something&apos;s missing</H3>
          <p className="docs-p">
            If the design system doesn&apos;t have something your screen needs, your agent will leave a note saying so. Ask
            the design team to add it rather than building your own.
          </p>
        </li>
      </ol>

      <details className="docs-manual">
        <summary>Setting it up without an agent</summary>
        <div className="docs-manual-body">
          <p className="docs-p">
            Run <code>npm run setup</code> once in the folder (and again whenever you take a new version), then install the
            file it makes in your app.
          </p>
          <CodeBlock code={MANUAL} label="Terminal" />
          <p className="docs-p">Then add the stylesheet and the font to your root layout.</p>
          <CodeBlock code={LAYOUT} label="app/layout.tsx" />
          <p className="docs-p">
            Start each page that uses the components with <code>&apos;use client&apos;;</code>: icons are passed as
            components, which Next.js can&apos;t send from a server page.
          </p>
        </div>
      </details>
    </Section>
  );
}
