import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import '../../src/styles.css';
import '../styles/dls-components.css';
import '../styles/dls-site.css';
import '../styles/docs.css';
import { SiteShell } from '../components/SiteShell';
import { sidebarInitScript } from '../components/Sidebar';

export const metadata: Metadata = {
  title: 'Collabrium UI',
  description: 'The Collabrium design system as React components for Next.js.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Same font link as the DLS site, plus Mulish 800 for headings. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Mulish:wght@400;500;600;700;800&family=Source+Serif+4:opsz,wght@8..60,400;8..60,600&display=swap"
        />
        {/* Phosphor web font: the DLS markup reused here (sidebar, search, Do/Don't) uses <i class="ph">. */}
        <link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/regular/style.css" />
        <link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/fill/style.css" />
      </head>
      <body>
        <SiteShell>{children}</SiteShell>
        {/* After the sidebar markup, before first paint. */}
        <script dangerouslySetInnerHTML={{ __html: sidebarInitScript }} />
      </body>
    </html>
  );
}
