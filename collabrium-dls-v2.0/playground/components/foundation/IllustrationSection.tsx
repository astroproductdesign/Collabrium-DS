'use client';

// Foundation › Illustration. Ported from collabrium-dls/preview.html,
// section#illustration (1109–1590) and its browse / play / download script
// (22995–23110), with DESIGN-SYSTEM.md's Illustration section. The files are
// a copy of collabrium-dls/illustrations/ in playground/public/illustrations/
// (brand assets stay out of the package, as the logo files do: Q-SBN-1); the
// library list is read from that copy's characters.json.
//
// Built with the library: Search input and Tabs browse the set (one tab per
// category; a search looks across all of them and dims the tabs), and each
// card's downloads are ghost icon Buttons. A card's still shows by default;
// its loop is created on first hover or focus, shown once it is playing, and
// stopped when the pointer and focus leave. One plays at a time, muted;
// under reduced motion nothing loads.
import { FilmStrip, Image as ImageIcon, type Icon } from '@phosphor-icons/react';
import { forwardRef, useMemo, useRef, useState, type FocusEvent, type ReactNode } from 'react';
import { Button, SearchInput, Tabs } from '../../../src';
import characters from '../../public/illustrations/characters.json';
import { GroupLabel, Section, type SectionProps } from './Section';

type Character = (typeof characters.characters)[number];
const slug = (s: string) => s.toLowerCase().replace(/&/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');

/** A category's colour dot in its tab (the DLS's .illo-dot), passed to Tabs as its icon. */
function dotFor(colour: string): Icon {
  const Dot = forwardRef<HTMLSpanElement>(function Dot(_props, ref) {
    return <span ref={ref} className="illo-dot" style={{ background: colour }} aria-hidden="true" />;
  });
  return Dot as unknown as Icon;
}

/** Saves a file without leaving the page (as the Logo section's DownloadButton). */
function download(href: string, filename: string) {
  const a = document.createElement('a');
  a.href = href;
  a.download = filename;
  if (window.location.protocol === 'file:') {
    a.target = '_blank';
    a.rel = 'noopener';
  }
  document.body.appendChild(a);
  a.click();
  a.remove();
}

/** One loop at a time: the DLS script's play() / stop(). */
function usePlayer() {
  const current = useRef<HTMLElement | null>(null);
  const stop = (card: HTMLElement | null) => {
    const v = card?.querySelector('video');
    if (v) {
      v.pause();
      v.classList.remove('is-playing');
      try {
        v.currentTime = 0;
      } catch {
        /* not loaded yet */
      }
    }
    if (current.current === card) current.current = null;
  };
  const play = (card: HTMLElement, loop: string) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || current.current === card) return;
    if (current.current) stop(current.current);
    current.current = card;
    let v = card.querySelector('video');
    if (!v) {
      v = document.createElement('video');
      v.muted = true;
      v.loop = true;
      v.playsInline = true;
      v.preload = 'auto';
      v.setAttribute('muted', '');
      v.setAttribute('playsinline', '');
      v.setAttribute('aria-hidden', 'true');
      v.poster = card.querySelector('img')!.src;
      v.src = loop;
      const video = v;
      v.addEventListener('playing', () => {
        if (current.current === card) video.classList.add('is-playing');
      });
      card.querySelector('.illo-frame')!.appendChild(v);
    }
    v.play()?.catch(() => {});
  };
  const handlers = (loop: string) => ({
    onMouseEnter: (e: { currentTarget: HTMLElement }) => play(e.currentTarget, loop),
    onMouseLeave: (e: { currentTarget: HTMLElement }) => {
      if (!e.currentTarget.contains(document.activeElement)) stop(e.currentTarget);
    },
    onFocus: (e: FocusEvent<HTMLElement>) => play(e.currentTarget, loop),
    onBlur: (e: FocusEvent<HTMLElement>) => {
      if (!e.currentTarget.contains(e.relatedTarget as Node | null)) stop(e.currentTarget);
    },
  });
  return { handlers, stopAll: () => stop(current.current) };
}

const rules: { part: string; rule: ReactNode }[] = [
  { part: 'Body', rule: 'One flat-colour squircle. No outline, gradient or shading' },
  { part: 'Face', rule: 'Two dot eyes, a tick brow, a smile. No nose' },
  { part: 'Limbs', rule: 'Thin ink lines, noodle legs, fingers, flat feet' },
  { part: 'Props', rule: 'Same ink line, flat fills, small sparkles' },
  { part: 'Setting', rule: <>One ground line on empty <code>#FCFAF5</code></> },
  { part: 'Ink & frame', rule: <>All lines <code>#2B2B2C</code>, one weight. Full body, 4:3</> },
];

const checklist: ReactNode[] = [
  <>One flat body colour — no outline or gradient</>,
  <>Face: two dots, a tick brow, a smile — <b>no nose</b></>,
  <>All lines <code>#2B2B2C</code>, one weight</>,
  <>Body colour matches the category</>,
  <>Two accents at most, from the approved list</>,
  <>Empty <code>#FCFAF5</code> background, one ground line</>,
  <>Full body in frame, margin all round</>,
  <>No text, logos or watermarks</>,
  <>Props readable at thumbnail size</>,
  <>Loop ends on the opening pose</>,
];

export function IllustrationSection({ base, level }: SectionProps) {
  const dir = `${base}illustrations/`;
  const categories = characters.categories;
  const [cat, setCat] = useState(slug(categories[0].name));
  const [query, setQuery] = useState('');
  const { handlers, stopAll } = usePlayer();

  const tabs = useMemo(
    () => categories.map(c => ({ id: slug(c.name), label: c.name, count: c.count, icon: dotFor(c.bodyColour) })),
    [categories],
  );
  const q = query.trim().toLowerCase();
  const shown: Character[] = characters.characters.filter(c =>
    q ? `${c.name} ${c.category}`.toLowerCase().includes(q) : slug(c.category) === cat,
  );
  const active = categories.find(c => slug(c.name) === cat)!;

  const choose = (id: string) => {
    stopAll();
    setCat(id);
    setQuery('');
  };
  const search = (v: string) => {
    stopAll();
    setQuery(v);
  };

  return (
    <Section
      id="illustration"
      level={level}
      kicker="07 · Foundations"
      title="Illustration"
      lede={
        <>
          Every Collabrium illustration is a <b>blob character</b>: one flat-colour squircle body, a tiny ink face and thin
          noodle limbs, on an empty Canvas warm background. Characters come in families; the first is{' '}
          <b>Audience characters</b>.
        </>
      }
    >
      <GroupLabel level={level}>Concept</GroupLabel>
      <div className="illo-concept">
        <figure className="illo-ref js-illo" tabIndex={0} {...handlers(`${dir}clips-web/malay.mp4`)}>
          <div className="illo-frame">
            <img
              src={`${dir}reference/malay.jpg`}
              alt="Reference character: a green blob with one hand on its chest and the other held out palm-up, beside two amber sparkles"
              width={700}
              height={522}
            />
          </div>
          <figcaption>
            <b>Reference image</b> — attach it to every generation. Hover to play.
          </figcaption>
        </figure>
        <table className="spec">
          <thead>
            <tr>
              <th>Part</th>
              <th>Rule</th>
            </tr>
          </thead>
          <tbody>
            {rules.map(r => (
              <tr key={r.part}>
                <td>
                  <b>{r.part}</b>
                </td>
                <td>{r.rule}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <GroupLabel level={level}>Library — Audience characters · {characters.characters.length}</GroupLabel>
      <p className="lede docs-illo-lede">
        Colour comes from the category, never the character, plus up to two accents for props. Hover a character to play
        its loop; download it from beside its name.
      </p>
      <div className="illo-toolbar">
        <div className="docs-illo-search">
          <SearchInput
            label="Search characters"
            hideLabel
            placeholder="Search a name or category…"
            autoComplete="off"
            value={query}
            onValueChange={search}
            onKeyDown={e => {
              if (e.key === 'Escape' && query) search('');
            }}
          />
        </div>
        <div className="docs-illo-tabs" data-searching={q ? '' : undefined}>
          <Tabs aria-label="Character category" tabs={tabs} value={cat} onValueChange={choose} scrollButtons />
        </div>
      </div>
      <div className={`illo-panel-head${q ? ' is-search' : ''}`} aria-live="polite">
        <span className="illo-swatch" style={{ background: active.bodyColour }} />
        <b>{q ? (shown.length ? 'Search results' : 'No matches') : active.name}</b>
        <code>{active.bodyColour}</code>
        <span>
          {q
            ? shown.length
              ? `${shown.length} ${shown.length === 1 ? 'character matches' : 'characters match'} “${query.trim()}”`
              : `Nothing matches “${query.trim()}”. Try a name or a category, like “Sports”.`
            : `${active.count} characters`}
        </span>
      </div>
      <div className={`illo-grid${q ? ' is-searching' : ''}`}>
        {shown.map(c => (
          <figure key={c.id} className="illo-card js-illo" tabIndex={0} {...handlers(`${dir}${c.loop}`)}>
            <div className="illo-frame">
              <img src={`${dir}${c.still}`} alt="" width={700} height={522} loading="lazy" />
            </div>
            <figcaption>
              <span className="illo-name">
                {c.name}
                <small>
                  <span className="illo-dot" style={{ background: c.bodyColour }} />
                  {c.category}
                </small>
              </span>
              <span className="illo-dl">
                <Button
                  variant="ghost"
                  size="sm"
                  iconOnly
                  icon={ImageIcon}
                  aria-label={`Download ${c.name} still (JPG)`}
                  title="Download still (JPG)"
                  onClick={() => download(`${dir}${c.still}`, `${c.id}.jpg`)}
                />
              </span>
              <span className="illo-dl">
                <Button
                  variant="ghost"
                  size="sm"
                  iconOnly
                  icon={FilmStrip}
                  aria-label={`Download ${c.name} loop (MP4)`}
                  title="Download loop (MP4)"
                  onClick={() => download(`${dir}${c.loop}`, `${c.id}.mp4`)}
                />
              </span>
            </figcaption>
          </figure>
        ))}
      </div>

      <GroupLabel level={level}>Good to know</GroupLabel>
      <ul className="illo-list">
        <li>
          <b>Motion:</b> each character has a 4-second seamless loop made from its still.
        </li>
        <li>
          <b>In UI:</b> on Canvas warm, full 4:3 frame, at least 160px wide. The loop plays on hover only, muted, and never
          under reduced motion.
        </li>
        <li>
          <b>Settled:</b> hands have fingers, never a nose, and extra blobs only when a segment is plural.
        </li>
        <li>
          <b>Source of truth:</b> the{' '}
          <a href={`${dir}illustration-characters-bible.md`} target="_blank" rel="noopener">
            illustration characters bible
          </a>
          . Read it in full, with the reference image attached, before generating any illustration.
        </li>
      </ul>

      <GroupLabel level={level}>Acceptance checklist</GroupLabel>
      <ul className="illo-checklist">
        {checklist.map((item, i) => (
          <li key={i}>
            <i className="ph-fill ph-check-circle" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
