'use client';

// Copy-to-clipboard, built on the library's own Button.
import { useEffect, useRef, useState } from 'react';
import { Check, Copy } from '@phosphor-icons/react';
import { Button } from '../../src';

export function CopyButton({ text, label = 'Copy', copiedLabel = 'Copied' }: { text: string | (() => string); label?: string; copiedLabel?: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);
  return (
    <Button
      variant="secondary"
      size="sm"
      leadingIcon={copied ? Check : Copy}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(typeof text === 'function' ? text() : text);
          setCopied(true);
          window.clearTimeout(timer.current);
          timer.current = window.setTimeout(() => setCopied(false), 1200);
        } catch {
          /* clipboard blocked (e.g. file://); nothing to undo */
        }
      }}
    >
      {copied ? copiedLabel : label}
    </Button>
  );
}
