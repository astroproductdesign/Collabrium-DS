'use client';

// A live example: Preview and Code tabs (the library's Tabs) over the preview frame.
import type { ReactNode } from 'react';
import { CodeBlock } from './CodeBlock';
import { PreviewStage } from './PreviewStage';
import { Tabs } from '../../src';

export function ExampleBlock({ title, preview, code, toolbar = false }: { title: string; preview: ReactNode; code: string; toolbar?: boolean }) {
  return (
    <Tabs
      aria-label={`${title} example`}
      tabs={[
        { id: 'preview', label: 'Preview', content: <PreviewStage toolbar={toolbar} label={title}>{preview}</PreviewStage> },
        { id: 'code', label: 'Code', content: <CodeBlock code={code} label="tsx" /> },
      ]}
    />
  );
}
