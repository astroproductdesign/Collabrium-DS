'use client';

import {
  forwardRef,
  Fragment,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type HTMLAttributes,
} from 'react';
import { ArrowBendDownLeft, ArrowClockwise, Check, Copy, ThumbsDown, ThumbsUp, WarningCircle } from '@phosphor-icons/react';
import type { WithoutStyling } from '../../utils/types';
import { Button } from '../Button';

/** A source: the chip that lands in the sentence, and a row in the sources list. */
export interface StreamingSource {
  /** The site's name, e.g. "Forecastly". Its first letter fills the round avatar. */
  name: string;
  /** Shown in the chip and beside the name in the list, e.g. "forecastly.io". */
  domain: string;
  /** Where the chip and the row link to. Opens in a new tab. */
  href: string;
  /** The avatar's fill, a colour from the source's own brand. Defaults to Neutral-7. */
  color?: string;
}

/**
 * One piece of what the model has produced so far. A string is prose (any
 * length: a word, a sentence, whatever the stream delivered). `{ citation }`
 * is a source that lands in that position in the sentence.
 */
export type StreamingSegment = string | { citation: StreamingSource };

/**
 * - `streaming`: the model is still producing text. Caret on, actions hidden.
 * - `done`: the stream ended. Once the last word is on screen the message settles.
 * - `stopped`: the reader stopped it. What is on screen stays, marked "Stopped early".
 * - `failed`: the stream broke (a dropped connection). What is on screen stays, with an error line and a Retry beside it.
 *   Defined here (approved 2026-10-26): DESIGN-SYSTEM.md Rule 18 asks for it and has no design.
 */
export type StreamingStatus = 'streaming' | 'done' | 'stopped' | 'failed';

export type StreamingFeedback = 'good' | 'bad';

type NativeDivProps = WithoutStyling<Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'color' | 'content'>>;

export interface StreamingTextProps extends NativeDivProps {
  /**
   * Everything the model has produced so far, in order. Append only: grow the
   * array (or its last string) as text arrives; never reorder or remove.
   * Pass the whole text at once only for a message that is already finished
   * (a saved conversation): a finished message renders whole, with no reveal.
   */
  content: StreamingSegment[];
  /** Where the stream is. Required, so the caret and the actions are always true. */
  status: StreamingStatus;
  /**
   * The sources behind the answer. Shows a "N sources" button in the action
   * row that opens the list. Citations inside `content` are separate: they
   * are chips in the sentence.
   */
  sources?: StreamingSource[];
  /** Prompts to offer once the answer has settled. Never shown on a stopped answer. */
  followUps?: string[];
  /** Called with the prompt when a follow-up is chosen. */
  onFollowUp?: (prompt: string, index: number) => void;
  /** Adds a Retry button: in the action row, or, on a `failed` answer, beside the error line. The host decides what retrying does. */
  onRetry?: () => void;
  /** Adds the thumbs up and down buttons. Called with the choice, or `null` when it is taken back. */
  onFeedback?: (value: StreamingFeedback | null) => void;
  /**
   * Shows the action row (Copy, Retry, thumbs, the sources button) and the sources list once the answer has settled.
   * Set it to `false` when the text sits in a Chat window's `ChatMessage`, which brings the one action row of the chat
   * (and shows sources as its citations). Follow-ups, the failed state's Retry and "Stopped early" stay. Defaults to `true`.
   */
  actions?: boolean;
}

type Token = { kind: 'word'; text: string } | { kind: 'citation'; source: StreamingSource };

// The cadence is a fallback for a buffer to smooth toward (Rule 6), not a
// spec: a word every 55ms (about 180 wpm), faster while the buffer backs up.
// TODO(open-question Q-STREAM-2): only the 55ms is in the DLS; the two
// faster steps and their thresholds are mine.
const WORD_MS = 55;
const BACKLOG_MS: ReadonlyArray<readonly [number, number]> = [
  [24, 20],
  [12, 35],
];
// Rule 7: below roughly this many words a finished answer is shown whole.
const MIN_ANIMATED_WORDS = 12;
// How long Copy shows its green check (the DLS demo).
const COPIED_MS = 1600;

function intervalFor(backlog: number) {
  for (const [over, ms] of BACKLOG_MS) if (backlog > over) return ms;
  return WORD_MS;
}

/**
 * Turns the segments into one token per word or citation. Adjacent strings
 * join first (a word may arrive in two chunks). While streaming, a final word
 * with nothing after it may still be growing, so it is held back.
 */
function tokenise(content: StreamingSegment[], streaming: boolean) {
  const tokens: Token[] = [];
  let held = 0;
  let pending = '';
  const flush = (last: boolean) => {
    const words = pending.split(/\s+/).filter(Boolean);
    const partial = last && streaming && words.length > 0 && !/\s$/.test(pending);
    words.forEach((text, i) => {
      tokens.push({ kind: 'word', text });
      if (partial && i === words.length - 1) held = 1;
    });
    pending = '';
  };
  for (const segment of content) {
    if (typeof segment === 'string') {
      pending += segment;
    } else {
      flush(false);
      tokens.push({ kind: 'citation', source: segment.citation });
    }
  }
  flush(true);
  return { tokens, available: tokens.length - held };
}

function avatarStyle(color?: string) {
  return color ? ({ '--cui-streaming-avatar': color } as CSSProperties) : undefined;
}

/**
 * Collabrium Streaming Text. The model's own prose arriving word by word,
 * with citations landing in position, then, once the last word settles,
 * the action row, sources and follow-ups. It is what Loading State and
 * Thinking hand off to at the first token. Ported from components.css
 * `.c-streaming*`.
 *
 * The component owns what is local to it: the buffered word-by-word reveal
 * (Rules 5 to 7), the caret (Rule 4), settling exactly once (Rules 4 and 22),
 * the action row, sources and follow-ups arriving only on settle (Rules 15
 * and 16), a stopped answer keeping its text (Rule 17), `aria-busy` and one
 * polite announcement (Rule 19), and never touching scroll (Rule 20). The
 * host owns the rest: only model-generated text (Rules 1 and 2), starting at
 * the first token (Rule 3), pre-reserving space where it must (Rules 8 and
 * 9), and rendering tables, code and lists whole around it (Rules 11 to 13).
 */
export const StreamingText = forwardRef<HTMLDivElement, StreamingTextProps>(function StreamingText(
  { content, status, sources = [], followUps = [], onFollowUp, onRetry, onFeedback, actions = true, ...rest },
  ref,
) {
  // A message that arrives finished is never animated (Rules 2 and 22).
  const [live] = useState(status === 'streaming');
  const { tokens, available } = useMemo(() => tokenise(content, status === 'streaming'), [content, status]);
  const [revealed, setRevealed] = useState(() => (status === 'streaming' ? 0 : tokens.length));
  const [settled, setSettled] = useState<'done' | 'stopped' | 'failed' | null>(status === 'streaming' ? null : status);
  const [announcement, setAnnouncement] = useState('');
  const [sourcesOpen, setSourcesOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState<StreamingFeedback | null>(null);
  const copyTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const sourcesId = useId();

  const wordCount = tokens.filter(t => t.kind === 'word').length;

  // Once settled it stays settled: a status that flips back to streaming is ignored (Rule 22).
  let phase: 'streaming' | 'done' | 'stopped' | 'failed';
  if (settled) phase = settled;
  else if (status === 'stopped' || status === 'failed') phase = status;
  else if (status === 'done' && revealed >= tokens.length) phase = 'done';
  else phase = 'streaming';

  const shown = settled === 'done' ? tokens.length : revealed;

  // Release the buffer: one word per tick, no cadence under reduced motion (Rule 21).
  useEffect(() => {
    if (settled || status === 'stopped' || status === 'failed' || revealed >= available) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || (status === 'done' && wordCount < MIN_ANIMATED_WORDS)) {
      setRevealed(available);
      return;
    }
    const timer = setTimeout(() => setRevealed(r => Math.min(r + 1, available)), intervalFor(available - revealed));
    return () => clearTimeout(timer);
  }, [settled, status, revealed, available, wordCount]);

  // Settle once, announce once (Rule 19). A message that arrived finished is silent.
  useEffect(() => {
    if (phase === 'streaming' || settled) return;
    setSettled(phase);
    if (live) {
      setAnnouncement(
        phase === 'done' ? 'Response ready.' : phase === 'stopped' ? 'Response stopped.' : onRetry ? 'Response failed. Retry available.' : 'Response failed.',
      );
    }
  }, [phase, settled, live, onRetry]);

  useEffect(() => () => clearTimeout(copyTimer.current), []);

  const plainText = () =>
    tokens
      .slice(0, shown)
      .map(t => (t.kind === 'word' ? t.text : t.source.domain))
      .join(' ');

  const copy = () => {
    void navigator.clipboard?.writeText(plainText()).catch(() => {});
    setCopied(true);
    clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopied(false), COPIED_MS);
  };

  const choose = (value: StreamingFeedback) => {
    const next = feedback === value ? null : value;
    setFeedback(next);
    onFeedback?.(next);
  };

  const ready = phase !== 'streaming';

  return (
    <div
      {...rest}
      ref={ref}
      className="cui-streaming"
      data-live={live || undefined}
      data-sources-open={sourcesOpen || undefined}
    >
      <p className="cui-streaming__text" aria-busy={phase === 'streaming'}>
        {tokens.slice(0, shown).map((token, i) => (
          <Fragment key={i}>
            {token.kind === 'word' ? (
              token.text
            ) : (
              <a className="cui-streaming__cite" href={token.source.href} target="_blank" rel="noreferrer">
                <span className="cui-streaming__cite-avatar" style={avatarStyle(token.source.color)} aria-hidden="true">
                  {token.source.name.charAt(0).toUpperCase()}
                </span>
                <span>{token.source.domain}</span>
              </a>
            )}{' '}
          </Fragment>
        ))}
        {phase === 'streaming' && <span className="cui-streaming__caret" aria-hidden="true" />}
      </p>

      <span className="cui-streaming__announce" role="status" aria-live="polite">
        {announcement}
      </span>

      {phase === 'stopped' && <div className="cui-streaming__note">Stopped early</div>}

      {phase === 'failed' && (
        <div className="cui-streaming__failure">
          <WarningCircle className="cui-streaming__failure-icon" weight="fill" aria-hidden="true" focusable="false" />
          <span className="cui-streaming__failure-text">Couldn&apos;t finish this response</span>
          {onRetry && (
            <Button variant="secondary" size="sm" leadingIcon={ArrowClockwise} onClick={onRetry}>
              Retry
            </Button>
          )}
        </div>
      )}

      {ready && actions && (
        <div className="cui-streaming__actions">
          <button
            type="button"
            className="cui-streaming__action"
            aria-label={copied ? 'Copied' : 'Copy'}
            data-copied={copied || undefined}
            onClick={copy}
          >
            {copied ? <Check weight="fill" aria-hidden="true" focusable="false" /> : <Copy aria-hidden="true" focusable="false" />}
          </button>
          {onRetry && phase !== 'failed' && (
            <button type="button" className="cui-streaming__action" aria-label="Retry" onClick={onRetry}>
              <ArrowClockwise aria-hidden="true" focusable="false" />
            </button>
          )}
          {onFeedback && (
            <>
              <button
                type="button"
                className="cui-streaming__action"
                aria-label="Good response"
                aria-pressed={feedback === 'good'}
                onClick={() => choose('good')}
              >
                <ThumbsUp weight={feedback === 'good' ? 'fill' : 'regular'} aria-hidden="true" focusable="false" />
              </button>
              <button
                type="button"
                className="cui-streaming__action"
                aria-label="Bad response"
                aria-pressed={feedback === 'bad'}
                onClick={() => choose('bad')}
              >
                <ThumbsDown weight={feedback === 'bad' ? 'fill' : 'regular'} aria-hidden="true" focusable="false" />
              </button>
            </>
          )}
          {sources.length > 0 && (
            <button
              type="button"
              className="cui-streaming__sources-trigger"
              aria-expanded={sourcesOpen}
              aria-controls={sourcesId}
              onClick={() => setSourcesOpen(open => !open)}
            >
              <span className="cui-streaming__sources-avatars" aria-hidden="true">
                {sources.slice(0, 3).map((source, i) => (
                  <span key={i} style={avatarStyle(source.color)}>
                    {source.name.charAt(0).toUpperCase()}
                  </span>
                ))}
              </span>
              <span className="cui-streaming__sources-label">
                {sources.length} {sources.length === 1 ? 'source' : 'sources'}
              </span>
            </button>
          )}
        </div>
      )}

      {/* inert while closed: the rows are links and must not be reachable when hidden. */}
      {ready && actions && sources.length > 0 && (
        <div className="cui-streaming__sources" id={sourcesId} inert={!sourcesOpen}>
          <div className="cui-streaming__sources-inner">
            <div className="cui-streaming__sources-list">
              {sources.map((source, i) => (
                <a key={i} className="cui-streaming__source" href={source.href} target="_blank" rel="noreferrer">
                  <span className="cui-streaming__source-avatar" style={avatarStyle(source.color)} aria-hidden="true">
                    {source.name.charAt(0).toUpperCase()}
                  </span>
                  <span className="cui-streaming__source-name">{source.name}</span>
                  <span className="cui-streaming__source-domain">{source.domain}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {phase === 'done' && followUps.length > 0 && (
        <div className="cui-streaming__followups">
          <p className="cui-streaming__followups-label">Follow-ups</p>
          <div>
            {followUps.map((prompt, i) => (
              <button
                key={i}
                type="button"
                className="cui-streaming__followup"
                style={{ '--cui-streaming-followup-index': i } as CSSProperties}
                onClick={() => onFollowUp?.(prompt, i)}
              >
                <ArrowBendDownLeft aria-hidden="true" focusable="false" />
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});
