'use client';

// A download action on the library's own Button. The DLS site uses a
// link styled as a button (a.c-btn[download]); Button renders a real
// <button>, so it starts the download itself. Nothing navigates.
import { DownloadSimple } from '@phosphor-icons/react';
import { Button } from '../../../src';

export function DownloadButton({ href, filename, label = 'Download', size = 'sm', variant = 'secondary' }: { href: string; filename: string; label?: string; size?: 'sm' | 'md'; variant?: 'primary' | 'secondary' }) {
  return (
    <Button
      variant={variant}
      size={size}
      leadingIcon={DownloadSimple}
      onClick={() => {
        const a = document.createElement('a');
        a.href = href;
        a.download = filename;
        // Opened from disk (file://), Chrome ignores `download` and would
        // replace this page with the file; open it in a new tab instead.
        if (window.location.protocol === 'file:') {
          a.target = '_blank';
          a.rel = 'noopener';
        }
        document.body.appendChild(a);
        a.click();
        a.remove();
      }}
    >
      {label}
    </Button>
  );
}
