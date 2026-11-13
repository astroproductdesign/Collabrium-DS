'use client';

import {
  forwardRef,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type HTMLAttributes,
} from 'react';
import { CaretDown, Check, CircleNotch, Globe, MagnifyingGlass, Sparkle, type Icon } from '@phosphor-icons/react';
import type { WithoutStyling } from '../../utils/types';
import { formatDuration, formatElapsed } from '../../utils/format-elapsed';

/**
 * What a row is, chosen by the shape of the data and never by preference:
 * - `steps`: discrete actions taken in order (check or spinner + name).
 * - `reasoning`: prose sentences of reasoning (no mark, wrapping text).
 * - `search`: a query and the sources read (linked).
 * - `coding`: tool calls (tool + target + optional diff counts), selectable.
 */
export type ThinkingVariant = 'steps' | 'reasoning' | 'search' | 'coding';
/** `working` while the run is going; `done` once it settles (the header turns past tense). */
export type ThinkingStatus = 'working' | 'done';

/** One step in the `steps` variant. */
export interface ThinkingStep {
  /** The step's name, e.g. "Reading account notes". */
  label: string;
  /** Optional quiet detail after the name, e.g. "12 accounts". */
  detail?: string;
}

/** One source in the `search` variant. */
export interface ThinkingSource {
  /** The page or site name, e.g. "Crunchbase". */
  title: string;
  /** Shown quietly after the title, e.g. "crunchbase.com". */
  domain: string;
  /** Where the row links to. Opens in a new tab. */
  href: string;
}

/** One tool call in the `coding` variant. */
export interface ThinkingToolCall {
  /** The tool's Phosphor icon, e.g. `FileText`, `PencilSimple`, `Terminal`. Always Regular. */
  icon: Icon;
  /** The tool, e.g. "Read", "Edit", "Run". */
  name: string;
  /** What it acted on, e.g. "pipeline-config.ts". */
  target: string;
  /** Optional lines added, shown in green with a plus. */
  additions?: number;
  /** Optional lines removed, shown in red with a minus. */
  deletions?: number;
}

type NativeDivProps = WithoutStyling<Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'color'>>;

interface ThinkingBaseProps extends NativeDivProps {
  /**
   * Where the run is. `working` shows the live label with a shimmer and keeps
   * the trace open; `done` shows the past-tense label and closes the trace.
   * Required, so the header always says something true.
   */
  status: ThinkingStatus;
  /** The live label while working, set from the variant and updated as phases change: "Thinking", "Searching the web", "Running tools". A status, not a title. */
  workingLabel: string;
  /**
   * The past-tense label once done, e.g. "Thought for 4 seconds", "Searched the web", "Ran 3 tools". Stays on screen as a record.
   * For a live run, write `{duration}` where the time goes ("Thought for {duration}") and the component fills in the
   * settled time ("4 seconds") from the timer. A label with no `{duration}` is shown exactly as written.
   */
  doneLabel: string;
  /**
   * When the run really started, in milliseconds since the epoch (`Date.now()`). While `working`, a running timer
   * counts from here beside the live label; when the run is `done` it stops and its value becomes `{duration}` in
   * `doneLabel` (Rule 14). Pass the same value you gave Loading State so the clock carries on across the hand-off.
   * Leave it out and the timer counts from when this component mounted. A trace that first renders as `done`
   * (a saved conversation) has no timer: write the duration into `doneLabel` yourself.
   */
  startedAt?: number;
  /** How many rows are not shown, for a "+7 more" line at the end. The trace summarises a long run; it is never a full log. */
  moreCount?: number;
  /**
   * Start open or closed. By default the trace opens itself while working and
   * closes when done. Setting this counts as the reader's own choice: from
   * then on the trace follows the reader (the chevron) and no longer opens or
   * closes by itself. Use it to restore a saved conversation or to show a
   * trace already open.
   */
  defaultExpanded?: boolean;
}

export interface ThinkingStepsProps extends ThinkingBaseProps {
  variant: 'steps';
  /**
   * The steps so far, in order. Append only: never reorder or remove one.
   * While working, the last step shows the spinner and every step above it a
   * check. Once done, all show checks.
   */
  steps: ThinkingStep[];
}

export interface ThinkingReasoningProps extends ThinkingBaseProps {
  variant: 'reasoning';
  /** The reasoning, one sentence or short paragraph per row. */
  paragraphs: string[];
}

export interface ThinkingSearchProps extends ThinkingBaseProps {
  variant: 'search';
  /** What was searched for. Shown first, with a magnifying glass. */
  query: string;
  /** The sources read so far, in order. */
  sources: ThinkingSource[];
}

export interface ThinkingCodingProps extends ThinkingBaseProps {
  variant: 'coding';
  /** The tool calls so far, in order. Each row is a toggle button. */
  toolCalls: ThinkingToolCall[];
  /** Called when a tool call is selected, with its index, or `null` when it is deselected. One at a time. */
  onToolCallSelect?: (index: number | null) => void;
}

export type ThinkingProps = ThinkingStepsProps | ThinkingReasoningProps | ThinkingSearchProps | ThinkingCodingProps;

interface ThinkingAnyProps extends ThinkingBaseProps {
  variant: ThinkingVariant;
  steps?: ThinkingStep[];
  paragraphs?: string[];
  query?: string;
  sources?: ThinkingSource[];
  toolCalls?: ThinkingToolCall[];
  onToolCallSelect?: (index: number | null) => void;
}

function rowStyle(index: number) {
  return { '--cui-thinking-row-index': index } as CSSProperties;
}

/**
 * Collabrium Thinking. An expandable agent trace: a clickable header (mark,
 * live status, chevron) that opens onto a settling list of rows behind a
 * vertical timeline line. For AI work only, once it has started producing
 * named, orderable steps; before that it is Loading State. Ported from
 * components.css `.c-thinking*`.
 *
 * The component owns what is local to it: auto-open while working,
 * auto-close when done, the reader's choice winning from then on (Rule 6);
 * one spinner at a time (Rule 9); the live status (Rule 19). The host owns
 * the rest: render it only once two or more steps exist and two seconds have
 * passed (Rules 2 to 4), one per operation (Rule 15), a reachable Stop
 * (Rule 17), and never go back to Loading State (Rule 21).
 */
export const Thinking = forwardRef<HTMLDivElement, ThinkingProps>(function Thinking(props, ref) {
  const {
    variant,
    status,
    workingLabel,
    doneLabel,
    startedAt,
    moreCount,
    defaultExpanded,
    steps = [],
    paragraphs = [],
    query,
    sources = [],
    toolCalls = [],
    onToolCallSelect,
    ...rest
  } = props as ThinkingAnyProps;

  // Rule 6: null = follow the run; true/false = the reader's choice, which wins for this instance.
  const [manual, setManual] = useState<boolean | null>(defaultExpanded ?? null);
  const [selected, setSelected] = useState<number | null>(null);
  const [lineHeight, setLineHeight] = useState(0);
  const rowsRef = useRef<HTMLDivElement>(null);
  const traceId = useId();
  const timerRef = useRef<HTMLSpanElement>(null);
  const [mountedAt] = useState(() => Date.now());
  const start = startedAt ?? mountedAt;
  const [duration, setDuration] = useState<string | null>(null);

  const working = status === 'working';
  const expanded = manual ?? working;
  const active = working || expanded;

  // The timeline line grows to the rows' height as they arrive (and as prose wraps).
  useEffect(() => {
    const rows = rowsRef.current;
    if (!rows) return;
    const measure = () => setLineHeight(rows.offsetHeight ? Math.max(0, rows.offsetHeight - 2) : 0);
    const observer = new ResizeObserver(measure);
    observer.observe(rows);
    return () => observer.disconnect();
  }, []);

  // Rule 14: the timer is computed from the start timestamp on every frame and written straight
  // to the DOM; when the run settles it stops and its value is kept for the past-tense label.
  useEffect(() => {
    if (!working) return;
    setDuration(null);
    let frame = 0;
    let shown = '';
    const tick = () => {
      const text = formatElapsed((Date.now() - start) / 1000);
      if (text !== shown && timerRef.current) {
        timerRef.current.textContent = text;
        shown = text;
      }
      frame = requestAnimationFrame(tick);
    };
    tick();
    return () => {
      cancelAnimationFrame(frame);
      setDuration(formatDuration((Date.now() - start) / 1000));
    };
  }, [working, start]);

  const settledLabel = duration && doneLabel.includes('{duration}') ? doneLabel.replace('{duration}', duration) : doneLabel.replace(' {duration}', '').replace('{duration}', '');

  const lastStep = steps.length - 1;

  return (
    <div
      {...rest}
      ref={ref}
      className="cui-thinking"
      data-expanded={expanded || undefined}
      data-done={!working || undefined}
      data-active={active || undefined}
    >
      <button
        type="button"
        className="cui-thinking__header"
        aria-expanded={expanded}
        aria-controls={traceId}
        onClick={() => setManual(!expanded)}
      >
        <Sparkle className="cui-thinking__mark" weight="fill" aria-hidden="true" focusable="false" />
        <span className="cui-thinking__status">
          <span className="cui-thinking__working">{workingLabel}</span>
          <span className="cui-thinking__done">{settledLabel}</span>
        </span>
        {working && <span className="cui-thinking__timer" aria-hidden="true" ref={timerRef} />}
        <CaretDown className="cui-thinking__chevron" aria-hidden="true" focusable="false" />
      </button>

      {/* The header announces (Rule 19), from outside the button: a button's contents are its name, so a live region inside it is unreliable. */}
      <span className="cui-thinking__announce" role="status" aria-live="polite">
        {working ? workingLabel : settledLabel}
      </span>

      {/* inert while closed: the rows are links and buttons, and must not be reachable when hidden. */}
      <div className="cui-thinking__trace" id={traceId} inert={!expanded}>
        <div className="cui-thinking__trace-inner">
          <div className="cui-thinking__line-wrap">
            <span className="cui-thinking__line" style={{ height: lineHeight }} aria-hidden="true" />
            <div className="cui-thinking__rows" ref={rowsRef}>
              {variant === 'steps' &&
                steps.map((step, i) => {
                  const spinning = working && i === lastStep;
                  return (
                    <div key={i} className="cui-thinking__row" style={rowStyle(i)}>
                      {spinning ? (
                        <CircleNotch className="cui-thinking__row-icon" data-spin="" aria-hidden="true" focusable="false" />
                      ) : (
                        <Check className="cui-thinking__row-icon" aria-hidden="true" focusable="false" />
                      )}
                      <span className="cui-thinking__row-primary">{step.label}</span>
                      {step.detail && <span className="cui-thinking__row-secondary">{step.detail}</span>}
                    </div>
                  );
                })}

              {variant === 'reasoning' &&
                paragraphs.map((text, i) => (
                  <div key={i} className="cui-thinking__row" data-prose="" style={rowStyle(i)}>
                    <span className="cui-thinking__row-primary">{text}</span>
                  </div>
                ))}

              {variant === 'search' && (
                <>
                  <div className="cui-thinking__query">
                    <MagnifyingGlass aria-hidden="true" focusable="false" />
                    <span>{query}</span>
                  </div>
                  {sources.map((source, i) => (
                    <a key={i} className="cui-thinking__row" href={source.href} target="_blank" rel="noreferrer" style={rowStyle(i)}>
                      <Globe className="cui-thinking__row-icon" aria-hidden="true" focusable="false" />
                      <span className="cui-thinking__row-primary">{source.title}</span>
                      <span className="cui-thinking__row-secondary">{source.domain}</span>
                    </a>
                  ))}
                </>
              )}

              {variant === 'coding' &&
                toolCalls.map((call, i) => {
                  const ToolIcon = call.icon;
                  const pressed = selected === i;
                  return (
                    <button
                      key={i}
                      type="button"
                      className="cui-thinking__row"
                      aria-pressed={pressed}
                      style={rowStyle(i)}
                      onClick={() => {
                        const next = pressed ? null : i;
                        setSelected(next);
                        onToolCallSelect?.(next);
                      }}
                    >
                      <ToolIcon className="cui-thinking__row-icon" weight="regular" aria-hidden="true" focusable="false" />
                      <span className="cui-thinking__row-primary">{call.name}</span>
                      <span className="cui-thinking__row-secondary">{call.target}</span>
                      {(call.additions !== undefined || call.deletions !== undefined) && (
                        <span className="cui-thinking__row-diff">
                          {call.additions !== undefined && <span className="cui-thinking__add">+{call.additions}</span>}
                          {call.deletions !== undefined && <span className="cui-thinking__del">−{call.deletions}</span>}
                        </span>
                      )}
                    </button>
                  );
                })}

              {moreCount !== undefined && moreCount > 0 && <div className="cui-thinking__more">+{moreCount} more</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
