'use client';

import { forwardRef, useEffect, useId, useLayoutEffect, useRef, useState, type HTMLAttributes, type Ref } from 'react';
import { CaretLeft, CaretRight, X } from '@phosphor-icons/react';
import type { WithoutStyling } from '../../utils/types';
import { Button } from '../Button';
import { Checkbox } from '../Checkbox';
import { InputField } from '../InputField';
import { Radio } from '../Radio';
import { Textarea } from '../Textarea';

/** One provided answer. */
export interface ToolApprovalOption {
  /** The option itself, short: "Pull forward from Q4". */
  label: string;
  /** Optional line under the label: what choosing it means or costs. */
  description?: string;
}

/** One decision the AI needs from the person. */
export interface ToolApprovalQuestion {
  /** The question, in one sentence. It is the card's heading while this question shows. */
  question: string;
  /**
   * How many options can be chosen.
   * - `single`: radios. Choosing one moves on to the next question by itself, except on the last question, where it only enables Send.
   * - `multiple`: checkboxes. It never moves on by itself, since more than one choice may still be coming.
   */
  type: 'single' | 'multiple';
  /** The provided options. Every question also carries a free-text "Something else…" answer. */
  options: ToolApprovalOption[];
}

/** What the person answered for one question. A skipped question has no options and no text. */
export interface ToolApprovalAnswer {
  /** The question, as asked. */
  question: string;
  /** The labels of the options chosen. Empty when a typed answer was given, or the question was skipped. */
  selected: string[];
  /** The typed answer. Empty when options were chosen, or the question was skipped. */
  custom: string;
}

type NativeDivProps = WithoutStyling<Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'color'>>;

export interface ToolApprovalProps extends NativeDivProps {
  /** The decisions, in order. One shows at a time. Never a general-purpose form: each is a point the AI's task is blocked on. */
  questions: ToolApprovalQuestion[];
  /**
   * Called once, with every answer, when the person presses Send on the last question (or Skip on it). The card has
   * then closed for good: it renders nothing and cannot be reopened.
   */
  onSend?: (answers: ToolApprovalAnswer[]) => void;
  /**
   * Called when the person presses the ×. The card has then closed for good, with no progress kept. This is not
   * Stop: the task behind the card keeps running. Move focus back to the composer yourself.
   */
  onDismiss?: () => void;
}

/** A moment for the choice to register before a `single` question moves on. */
const ADVANCE_DELAY_MS = 480;

function setRef<T>(ref: Ref<T> | undefined, value: T | null) {
  if (typeof ref === 'function') ref(value);
  else if (ref) (ref as { current: T | null }).current = value;
}

/**
 * Collabrium Tool approval. A one-question-at-a-time card the AI shows when it
 * needs the person to decide something before its task can go on: a set of
 * options (one or several) and an always-available free-text answer, paged
 * with a step count, ending in a Send that closes it for good. Ported from
 * components.css `.c-tool-approval*`.
 *
 * The component owns what is local to it: one question at a time (Rule 2),
 * auto-advance for `single` and Continue for `multiple` (Rule 3), the free-text
 * escape hatch that opens into a Textarea (Rule 4), options and text excluding
 * each other (Rule 5), Continue and Send gated on an answer (Rule 6), Skip
 * (Rule 7), free paging (Rule 8), a dismiss that is always there (Rule 9),
 * closing for good however it closes (Rules 10 to 13), the height morph
 * (Rule 11) and reduced motion (Rule 15). The host owns the rest: raise one
 * only for a decision the task is blocked on (Rule 1), never two at once
 * (Rule 14), pin it above the composer at the composer's width (Rules 16, 17
 * and 19), and swap the composer's Send to Stop while it is open (Rule 18).
 */
export const ToolApproval = forwardRef<HTMLDivElement, ToolApprovalProps>(function ToolApproval(
  { questions, onSend, onDismiss, ...rest },
  ref,
) {
  const uid = useId();
  const total = questions.length;
  const [current, setCurrent] = useState(0);
  const [closed, setClosed] = useState(false);
  const [picked, setPicked] = useState<number[][]>(() => questions.map(() => []));
  const [typed, setTyped] = useState<string[]>(() => questions.map(() => ''));
  const [customOpen, setCustomOpen] = useState<boolean[]>(() => questions.map(() => false));
  const viewportRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const questionRef = useRef<HTMLParagraphElement>(null);
  const customRef = useRef<HTMLTextAreaElement>(null);
  const advanceTimer = useRef<number | undefined>(undefined);
  const latestAdvance = useRef<() => void>(() => {});
  const latestCurrent = useRef(0);
  const previousQuestion = useRef(0);
  const focusCustom = useRef(false);

  const question = questions[current];
  const isLast = current === total - 1;
  const answered = (index: number) => picked[index].length > 0 || typed[index].trim() !== '';

  const send = () => {
    window.clearTimeout(advanceTimer.current);
    setClosed(true);
    onSend?.(questions.map((q, i) => ({ question: q.question, selected: picked[i].map(o => q.options[o].label), custom: typed[i] })));
  };
  const dismiss = () => {
    window.clearTimeout(advanceTimer.current);
    setClosed(true);
    onDismiss?.();
  };
  const goTo = (next: number) => {
    window.clearTimeout(advanceTimer.current);
    setCurrent(Math.min(Math.max(next, 0), total - 1));
  };
  const advance = () => (isLast ? send() : goTo(current + 1));
  latestAdvance.current = advance;
  latestCurrent.current = current;

  // Rule 5: an option clears the typed answer, and a typed answer clears the options. One answer per question.
  // Every question, as the rule says (decided 2026-10-26, Q-TOOL-2); the DLS demo only did it for `single`.
  const choose = (option: number) => {
    const next = [...picked];
    if (question.type === 'single') {
      next[current] = [option];
    } else {
      next[current] = picked[current].includes(option) ? picked[current].filter(o => o !== option) : [...picked[current], option];
    }
    setPicked(next);
    setTyped(typed.map((t, i) => (i === current ? '' : t)));
    setCustomOpen(customOpen.map((open, i) => (i === current ? false : open)));
    // Only before the last question: on the last one, choosing just enables Send, which stays the one action
    // that submits (decided 2026-10-26, Q-TOOL-1; the DLS demo sent here).
    if (question.type === 'single' && !isLast) {
      window.clearTimeout(advanceTimer.current);
      const at = current;
      // The timer fires after the next render, so it calls the latest `advance` (which sees the choice just made).
      advanceTimer.current = window.setTimeout(() => {
        if (at === latestCurrent.current) latestAdvance.current();
      }, ADVANCE_DELAY_MS);
    }
  };
  const type = (value: string) => {
    setTyped(typed.map((t, i) => (i === current ? value : t)));
    if (value !== '') setPicked(picked.map((p, i) => (i === current ? [] : p)));
    window.clearTimeout(advanceTimer.current);
  };

  useEffect(() => () => window.clearTimeout(advanceTimer.current), []);

  // Rule 11: the viewport's height follows the content, growing and shrinking instead of jumping.
  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    const body = bodyRef.current;
    if (!viewport || !body) return;
    viewport.style.transition = 'none';
    viewport.style.height = `${body.offsetHeight}px`;
    void viewport.offsetHeight;
    viewport.style.transition = '';
    const observer = new ResizeObserver(() => {
      viewport.style.height = `${body.offsetHeight}px`;
    });
    observer.observe(body);
    return () => observer.disconnect();
  }, [closed]);

  // A new question takes focus, as the card's heading, so a keyboard or screen-reader user hears it.
  // Decided 2026-10-26 (Q-TOOL-3); the DLS has no focus handling.
  useEffect(() => {
    if (previousQuestion.current !== current) {
      previousQuestion.current = current;
      questionRef.current?.focus();
    }
  }, [current]);

  // The single-line field opens into a Textarea the moment it is focused; the Textarea takes the focus and the caret.
  useEffect(() => {
    if (focusCustom.current && customRef.current) {
      focusCustom.current = false;
      customRef.current.focus();
      const end = customRef.current.value.length;
      customRef.current.setSelectionRange(end, end);
    }
  }, [customOpen, current]);

  if (closed) return null; // Rule 13: closed is closed. No confirmation, no copy of the questions, no way back.

  const groupName = `${uid}-q${current}`;
  const openCustom = customOpen[current];

  return (
    <div
      {...rest}
      ref={node => setRef(ref, node)}
      className="cui-tool-approval"
    >
      <div className="cui-tool-approval__viewport" ref={viewportRef}>
        <div className="cui-tool-approval__body" ref={bodyRef}>
          <div className="cui-tool-approval__head">
            <p className="cui-tool-approval__question" ref={questionRef} tabIndex={-1} key={`q-${current}`}>
              {question.question}
            </p>
            <div className="cui-tool-approval__topbar">
              <Button variant="ghost" size="sm" iconOnly icon={CaretLeft} aria-label="Previous question" disabled={current <= 0} onClick={() => goTo(current - 1)} />
              <span className="cui-tool-approval__indicator">
                {current + 1} / {total}
              </span>
              <Button variant="ghost" size="sm" iconOnly icon={CaretRight} aria-label="Next question" disabled={isLast} onClick={() => goTo(current + 1)} />
              <Button variant="ghost" size="sm" iconOnly icon={X} aria-label="Dismiss" data-part="dismiss" onClick={dismiss} />
            </div>
          </div>
          <div
            className="cui-tool-approval__options"
            key={`options-${current}`}
            role={question.type === 'single' ? 'radiogroup' : 'group'}
            aria-label={question.question}
          >
            {question.options.map((option, i) =>
              question.type === 'single' ? (
                <Radio
                  key={option.label}
                  name={groupName}
                  value={String(i)}
                  label={option.label}
                  description={option.description}
                  checked={picked[current].includes(i)}
                  onChange={() => choose(i)}
                />
              ) : (
                <Checkbox
                  key={option.label}
                  label={option.label}
                  description={option.description}
                  checked={picked[current].includes(i)}
                  onChange={() => choose(i)}
                />
              ),
            )}
          </div>
          <div className="cui-tool-approval__custom">
            {openCustom ? (
              <Textarea
                key={`custom-${current}`}
                ref={customRef}
                label="Custom answer"
                hideLabel
                placeholder="Something else…"
                value={typed[current]}
                onChange={event => type(event.target.value)}
              />
            ) : (
              <InputField
                key={`custom-${current}`}
                label="Custom answer"
                hideLabel
                placeholder="Something else…"
                value={typed[current]}
                onChange={event => type(event.target.value)}
                onFocus={() => {
                  focusCustom.current = true;
                  setCustomOpen(customOpen.map((open, i) => (i === current ? true : open)));
                }}
                onKeyDown={event => {
                  if (event.key === 'Enter' && answered(current)) {
                    event.preventDefault();
                    advance();
                  }
                }}
              />
            )}
          </div>
        </div>
      </div>
      <div className="cui-tool-approval__footer">
        <div className="cui-tool-approval__actions">
          <Button variant="ghost" size="sm" onClick={advance}>
            Skip
          </Button>
          <Button variant="primary" size="sm" disabled={!answered(current)} onClick={advance}>
            {isLast ? 'Send' : 'Continue'}
          </Button>
        </div>
      </div>
    </div>
  );
});
