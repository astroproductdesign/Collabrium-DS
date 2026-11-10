// Documentation for FileUploader, rendered by the docs site (playground).
// Keep it consistent with FileUploader.usage.md. Not part of the package build.
import { useEffect, useRef, useState } from 'react';
import { FileDoc, FileImage, FilePdf, FilePpt } from '@phosphor-icons/react';
import { Button } from '../Button';
import { FileUploader, type FileUploaderItem, type FileUploaderRules } from './FileUploader';
import type { DocsAccessibility, DocsAnatomyNode, DocsExample, DocsMotion, DocsProp, DocsRules } from '../docs.types';

export const title = 'FileUploader';

export const description =
  'A drop zone with one "Choose" button, then a row per file. It checks each file against the page\'s rules, adds the row and hands the file over at once; the page then shows each upload\'s progress, success or failure.';

export const usage = `import { FileUploader } from '@collabrium/ui';

const [files, setFiles] = useState<FileUploaderItem[]>([]);

<FileUploader
  title="Drop files here"
  touchTitle="Add files"
  buttonLabel="Choose files"
  rules={rules}
  files={files}
  onFilesChange={setFiles}
  onAccept={startUpload}
/>`;

const MB = 1024 * 1024;
const attachments: FileUploaderRules = {
  noun: 'file',
  many: true,
  maxFiles: 10,
  maxBytes: 100 * MB,
  maxTotalBytes: 250 * MB,
  label: 'PDF, Word, images or MP4',
  sizeTip: 'Try a smaller copy.',
  types: [
    { ext: 'pdf', mime: 'application/pdf', icon: FilePdf },
    { ext: 'doc', mime: 'application/msword', icon: FileDoc },
    { ext: 'docx', mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', icon: FileDoc },
    { ext: 'png', mime: 'image/png', icon: FileImage },
    { ext: 'jpg', mime: 'image/jpeg', icon: FileImage },
    { ext: 'mp4', mime: 'video/mp4' },
  ],
};
const brief: FileUploaderRules = {
  noun: 'brief',
  maxBytes: 25 * MB,
  label: 'PDF, Word or PowerPoint',
  sizeTip: 'Try a smaller copy.',
  types: [
    { ext: 'pdf', mime: 'application/pdf', icon: FilePdf },
    { ext: 'docx', mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', icon: FileDoc },
    { ext: 'pptx', mime: 'application/vnd.openxmlformats-officedocument.presentationml.presentation', icon: FilePpt },
  ],
};

/** A stand-in file of a given size (the docs have no real files). */
const fake = (name: string, kb: number, type: string) => new File([new Uint8Array(kb * 1024)], name, { type, lastModified: 1 });

/**
 * A pretend upload for the docs: each accepted file climbs to 100% over about 2 seconds, then is done. A name with
 * "fail" in it fails at 60%; Try again starts it over.
 */
function useFakeUploads(initial: FileUploaderItem[]) {
  const [files, setFiles] = useState(initial);
  const timers = useRef(new Map<File, ReturnType<typeof setInterval>>());
  const stop = (f: File) => {
    clearInterval(timers.current.get(f));
    timers.current.delete(f);
  };
  const start = (f: File) => {
    stop(f);
    let p = 0;
    const t = setInterval(() => {
      p += 0.1;
      const fails = /fail/i.test(f.name) && p >= 0.6;
      const done = p >= 1;
      setFiles((list) =>
        list.map((i) =>
          i.file !== f
            ? i
            : fails
              ? { file: f, status: 'failed', message: 'Upload failed. Please check your connection and try again.' }
              : done
                ? { file: f, status: 'done' }
                : { file: f, status: 'uploading', progress: p },
        ),
      );
      if (fails || done) stop(f);
    }, 200);
    timers.current.set(f, t);
  };
  useEffect(() => {
    const all = timers.current;
    return () => all.forEach((t) => clearInterval(t));
  }, []);
  return {
    files,
    onFilesChange: setFiles,
    onAccept: (f: File) => {
      setFiles((list) => list.map((i) => (i.file === f ? { file: f, status: 'uploading', progress: 0 } : i)));
      start(f);
    },
    onRetry: (f: File) => {
      setFiles((list) => list.map((i) => (i.file === f ? { file: f, status: 'uploading', progress: 0 } : i)));
      start(f);
    },
    onRemove: stop,
  };
}

function ManyExample() {
  const up = useFakeUploads([
    { file: fake('Raya-campaign-deck-final-v3.pdf', 5300, 'application/pdf'), status: 'done' },
    { file: fake('Rate-card-2026.docx', 820, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'), status: 'uploading', progress: 0.4 },
    { file: fake('Hero-shot.png', 2400, 'image/png'), status: 'uploading' },
    { file: fake('Client-call.mp4', 4100, 'video/mp4'), status: 'failed', message: 'Blocked by a security scan. Contact IT.' },
  ]);
  return (
    <FileUploader
      title="Drop files here"
      touchTitle="Add files"
      dragTitle="Let go to add them"
      buttonLabel="Choose files"
      rules={attachments}
      actions={['preview', 'download']}
      thumbnails
      onPreview={() => {}}
      onDownload={() => {}}
      {...up}
    />
  );
}

function BriefExample() {
  const up = useFakeUploads([]);
  return (
    <div className="docs-uploader-narrow">
      <FileUploader
        title="Drop the client's brief here"
        touchTitle="Add the client's brief"
        dragTitle="Let go to add it"
        caption="Collab AI finds the brand, the dates and the budget in it."
        buttonLabel="Choose a file"
        rules={brief}
        showTypeIcons
        {...up}
      />
    </div>
  );
}

function FullExample() {
  const [files, setFiles] = useState<FileUploaderItem[]>(() => [
    { file: fake('Brief.pdf', 900, 'application/pdf'), status: 'done' },
    { file: fake('Media-plan.pdf', 1300, 'application/pdf'), status: 'done' },
    { file: fake('Invoice.pdf', 300, 'application/pdf'), status: 'done' },
  ]);
  return (
    <FileUploader
      title="Drop files here"
      touchTitle="Add files"
      buttonLabel="Choose files"
      rules={{ ...attachments, maxFiles: 3 }}
      files={files}
      onFilesChange={setFiles}
    />
  );
}

function LongExample() {
  const [files, setFiles] = useState<FileUploaderItem[]>(() =>
    ['Brief', 'Media-plan', 'Invoice', 'Rate-card', 'Contract', 'Report-Q1', 'Report-Q2'].map((n) => ({
      file: fake(`${n}.pdf`, 400, 'application/pdf'),
      status: 'done' as const,
    })),
  );
  return <FileUploader title="Drop files here" buttonLabel="Choose files" rules={attachments} files={files} onFilesChange={setFiles} />;
}

function RequiredExample() {
  const [files, setFiles] = useState<FileUploaderItem[]>([]);
  const [tried, setTried] = useState(0);
  return (
    <div className="docs-stack">
      <FileUploader
        title="Drop the client's brief here"
        buttonLabel="Choose a file"
        rules={brief}
        files={files}
        onFilesChange={setFiles}
        showRequiredError={tried > 0 && files.length === 0}
        key={tried}
      />
      <div>
        <Button variant="primary" onClick={() => setTried((n) => n + 1)}>
          Continue
        </Button>
      </div>
    </div>
  );
}

export const thumbnail = () => (
  <div className="docs-uploader-thumb">
    <FileUploader title="Drop files here" buttonLabel="Choose files" rules={attachments} />
  </div>
);

export const anatomy: DocsAnatomyNode[] = [
  {
    name: 'FileUploader',
    element: '.cui-file-uploader',
    description: 'A column, 12px apart. Its own width picks the layout: one row from 480px, stacked and centred below.',
    children: [
      {
        name: 'Zone',
        element: '.cui-file-uploader__zone',
        description: 'A drop target, not a button: radius-lg, 24px in, 1px dashed Neutral-3. Hover Neutral-2 with a Neutral-4 dash; drag-over 2px Obsidian; error 2px Red.',
        children: [
          { name: 'Type icons', element: '.cui-file-uploader__types', when: 'showTypeIcons', description: 'The first three types\' icons, 24px, Fill, Neutral-5.' },
          { name: 'Title', element: '.cui-file-uploader__title', description: 'Label1, Neutral-9: the drag wording, the touch wording, or the drag-over wording.' },
          { name: 'Caption and hint', element: '.cui-file-uploader__hint', description: 'Caption, Neutral-5: the page\'s sentence, then the limits.' },
          { name: 'Button', element: '.cui-file-uploader__trigger', description: 'Button Secondary sm with a paperclip; the only control in the zone.' },
        ],
      },
      { name: 'Error', element: 'p.cui-file-uploader__error', description: 'Caption, bold Red, with a Red warning-circle. Every rejection in one message.' },
      {
        name: 'Row',
        element: '.cui-file-uploader__row',
        description: '1px Neutral-3, radius-sm, 8px 12px. Type chip or 32px thumbnail, the name (the extension always shows), the size or progress, then "More actions" and ×.',
        children: [
          { name: 'Uploading', element: '[data-status="uploading"]', description: 'The name in Neutral-5, "Uploading 40%", a 2px Obsidian bar along the bottom (or a sliding segment).' },
          { name: 'Done', element: '[data-status="done"]', description: 'An Obsidian check and "Uploaded".' },
          { name: 'Failed', element: '[data-status="failed"]', description: 'A Red border, "Try again" and ×; the message under the row.' },
          { name: 'More actions', element: '.cui-file-uploader__menu', when: 'actions', description: 'Preview (new tab) and Download, in a menu.' },
        ],
      },
      { name: 'Show more', element: '.cui-file-uploader__show-all', when: 'more than 5', description: 'Button ghost sm, "Show N more".' },
    ],
  },
];

export const examples: DocsExample[] = [
  {
    id: 'many',
    title: 'Many files',
    description: 'Every row state, as the page drives them: uploaded, uploading (40%, and still working), and failed with Try again. Add files to watch them upload (a name with "fail" in it fails). Rows have Preview and Download under "More actions"; images get a thumbnail.',
    render: () => <ManyExample />,
    code: `<FileUploader
  title="Drop files here"
  touchTitle="Add files"
  dragTitle="Let go to add them"
  buttonLabel="Choose files"
  rules={{ noun: 'file', many: true, maxFiles: 10, maxBytes: 100 * MB, maxTotalBytes: 250 * MB,
    label: 'PDF, Word, images or MP4', types: [/* … */] }}
  actions={['preview', 'download']}
  thumbnails
  files={files}
  onFilesChange={setFiles}
  onAccept={startUpload}
  onRetry={startUpload}
  onPreview={(file) => window.open(urlFor(file), '_blank', 'noopener')}
/>`,
  },
  {
    id: 'one',
    title: 'One file, narrow',
    description: 'A one-file uploader (a new pick replaces it) with the type icons and a caption. Under 480px of its own width it stacks and centres, the button full width.',
    render: () => <BriefExample />,
    code: `<FileUploader
  title="Drop the client's brief here"
  touchTitle="Add the client's brief"
  dragTitle="Let go to add it"
  caption="Collab AI finds the brand, the dates and the budget in it."
  buttonLabel="Choose a file"
  rules={{ noun: 'brief', maxBytes: 25 * MB, label: 'PDF, Word or PowerPoint', types: [/* … */] }}
  showTypeIcons
/>`,
  },
  {
    id: 'full',
    title: 'Full',
    description: 'At `maxFiles` the zone greys out and says so. The button stays reachable: pressing it explains why nothing opens.',
    render: () => <FullExample />,
    code: `<FileUploader title="Drop files here" buttonLabel="Choose files" rules={{ ...rules, maxFiles: 3 }} files={files} onFilesChange={setFiles} />`,
  },
  {
    id: 'long',
    title: 'A long list',
    description: 'Past five rows, the rest fold under "Show 2 more".',
    render: () => <LongExample />,
    code: `<FileUploader title="Drop files here" buttonLabel="Choose files" rules={rules} files={files} onFilesChange={setFiles} />`,
  },
  {
    id: 'required',
    title: 'Required',
    description: 'Press Continue with nothing added: the error shows under the zone and focus moves to it.',
    render: () => <RequiredExample />,
    code: `<FileUploader … showRequiredError={submitted && files.length === 0} />`,
  },
  {
    id: 'states',
    title: 'Read-only and disabled',
    description: 'Read-only drops the zone and the ×, keeping "More actions". Disabled greys everything out.',
    render: () => (
      <div className="docs-stack">
        <FileUploader
          title="Drop files here"
          buttonLabel="Choose files"
          rules={attachments}
          readOnly
          actions={['download']}
          defaultFiles={[{ file: fake('Signed-contract.pdf', 640, 'application/pdf'), status: 'done' }]}
        />
        <FileUploader title="Drop files here" buttonLabel="Choose files" rules={attachments} disabled />
      </div>
    ),
    code: `<FileUploader … readOnly actions={['download']} files={files} />
<FileUploader … disabled />`,
  },
];

export const props: DocsProp[] = [
  { name: 'title / touchTitle / dragTitle', options: 'string', default: 'required / title / title', description: 'The drag wording, the touch wording ("Add files") and the drag-over wording ("Let go to add them").' },
  { name: 'caption', options: 'ReactNode', default: '—', description: 'What happens to the file.' },
  { name: 'hint', options: 'string', default: 'from rules', description: 'The limits sentence; `fileUploaderHint(rules)` by default. Must state the backend\'s real limits.' },
  { name: 'buttonLabel', options: 'string', default: 'required', description: '"Choose a file" or "Choose files".' },
  { name: 'rules', options: '{ noun, many, maxFiles, maxBytes, maxTotalBytes, types, label, sizeTip, capture }', default: 'required', description: 'Matching the real backend; no defaults.' },
  { name: 'files / defaultFiles / onFilesChange', options: '{ file, status?, progress?, message? }[]', default: '—', description: 'The list and each row\'s state: `uploading` (with `progress` 0–1, or none for "Uploading…"), `done`, `failed` (with `message`).' },
  { name: 'onAccept / onRetry / onRemove', options: '(file) => void', default: '—', description: 'Start an upload; restart one; × (cancels while uploading).' },
  { name: 'actions / onPreview / onDownload', options: "('preview' | 'download')[]", default: '[]', description: 'Row actions under "More actions". Preview opens a new tab.' },
  { name: 'showTypeIcons / thumbnails', options: 'boolean', default: 'false', description: 'The type icons in the zone; image thumbnails in rows.' },
  { name: 'showRequiredError', options: 'boolean', default: 'false', description: 'Shows "Add a file to continue." when empty, and moves focus to it.' },
  { name: 'readOnly / disabled', options: 'boolean', default: 'false', description: 'No zone and no ×; or everything off.' },
];

export const rules: DocsRules = {
  do: [
    'Pass rules that match the backend, and say the same limits in the hint.',
    'Write a `touchTitle` for placements used on phones.',
    'Keep the uploader visible once files are attached, so more can be added.',
    'Drive every row state you know about: uploading, done, failed.',
  ],
  dont: [
    'Don\'t put a second button or link in the zone.',
    'Don\'t show an error look while a file is dragged; it\'s checked on drop.',
    'Don\'t put Preview or Download inline in the row, or use a Toast for its errors.',
    'Don\'t style the type chip as a status Badge: a file type isn\'t a status.',
  ],
};

export const accessibility: DocsAccessibility = {
  keyboard: 'Tab reaches the button (the zone takes no focus), then each row\'s "More actions", Try again and ×. "More actions" opens its menu on the first item: ↑ ↓ Home End move, Enter picks, Escape closes back to the button, Tab closes.',
  notes: [
    'One real button in the zone, described by the title, the hint and any error. Full keeps it focusable (`aria-disabled`); pressing it explains why.',
    'Errors are inline, no live region: after a picker error or `showRequiredError`, focus moves to the error; after a drop it doesn\'t.',
    'A successful pick moves focus to the new row\'s first button; after ×, to the next row\'s × (or the button); after Try again, to that row\'s ×.',
    'Names: "Remove {name}", "Cancel upload, {name}", "Try again, {name}", "More actions, {name}", "Preview {name}, opens in a new tab", "Download {name}".',
    'Drag wording is hidden from screen readers; the hint says the same in words. On touch screens the button is 44px tall and row buttons get 44px hit areas.',
  ],
};

export const motion: DocsMotion[] = [
  { interaction: 'Progress', motion: 'The bar grows along the row\'s bottom.', token: '--duration-base · --ease-standard' },
  { interaction: 'Still uploading', motion: 'A segment slides along the bar, 1.8s a pass.', token: '2 × --duration-ambient' },
  { interaction: 'Reduced motion', motion: 'Progress jumps; the sliding segment is a still Neutral-3 track.', token: '—' },
];
