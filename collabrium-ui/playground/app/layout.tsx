import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import '../../src/styles.css';
import './playground.css';

export const metadata: Metadata = {
  title: '@collabrium/ui playground',
  description: 'Preview of every converted component beside the old HTML + CSS.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Same font link as the DLS (DESIGN-SYSTEM.md, Technical Implementation). */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Mulish:wght@400;500;600;700&family=Source+Serif+4:opsz,wght@8..60,400;8..60,600&display=swap"
        />
        {/* Phosphor web font: only for the OLD column (old markup uses <i class="ph">). */}
        <link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/regular/style.css" />
        <link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/fill/style.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
