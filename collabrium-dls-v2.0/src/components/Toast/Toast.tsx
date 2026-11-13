'use client';

import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type HTMLAttributes,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { CheckCircle, Info, Warning, X, XCircle, type Icon } from '@phosphor-icons/react';
import type { WithoutStyling } from '../../utils/types';
import { usePortalContainer } from '../../utils/portalContext';
import { transition } from '../../motion';
import { tokens } from '../../tokens/tokens';
import { Button } from '../Button';

/** The tone. Danger never dismisses itself: the reader closes it. */
export type ToastTone = 'neutral' | 'success' | 'warning' | 'danger';

/** The one action: a short label, never destructive (a toast disappears on its own). */
export interface ToastAction {
  label: string;
  onClick: () => void;
}

interface ToastContent {
  /** The tone: its icon and colour. Default `neutral`. */
  tone?: ToastTone;
  /** A short title, body1 bold (50 characters at most: rewrite longer copy, the toast never cuts it). */
  title?: ReactNode;
  /** The message: caption under a title, or body1 on its own (100 characters at most). */
  message?: ReactNode;
  /** One action under the text, drawn as a link ("Undo", "View"). Clicking it also dismisses the toast. */
  action?: ToastAction;
}

/** A toast needs a title, a message or both: never only an icon and a close. */
type ToastText = { title: ReactNode; message?: ReactNode } | { title?: ReactNode; message: ReactNode };

type NativeDivProps = WithoutStyling<Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'title' | 'role' | 'color'>>;

export type ToastProps = NativeDivProps &
  Omit<ToastContent, 'title' | 'message'> &
  ToastText & {
    /** Shows the close button and is called by it, by Escape and by the action. Danger always needs it. */
    onDismiss?: () => void;
  };

const ICONS: Record<ToastTone, Icon> = { neutral: Info, success: CheckCircle, danger: XCircle, warning: Warning };

/**
 * Collabrium Toast: the surface of one transient notification. A tone icon, a title and / or a message, an optional
 * action and a close. Use `ToastProvider` and `useToast()` to show toasts; render `Toast` directly only for a static
 * picture of one. Ported from components.css `.c-toast*` (3217–3265).
 */
export const Toast = forwardRef<HTMLDivElement, ToastProps>(function Toast(props, ref) {
  const { tone = 'neutral', title, message, action, onDismiss, onKeyDown, ...rest } = props as NativeDivProps &
    ToastContent & { onDismiss?: () => void };
  const ToneIcon = ICONS[tone];
  return (
    <div
      {...rest}
      ref={ref}
      className="cui-toast"
      data-tone={tone}
      data-layout={title ? undefined : 'message'}
      onKeyDown={(event: ReactKeyboardEvent<HTMLDivElement>) => {
        // Escape dismisses the toast that holds focus, as Info Banner (Q-TOAST-6).
        if (onDismiss && event.key === 'Escape') {
          event.stopPropagation();
          onDismiss();
        }
        onKeyDown?.(event);
      }}
    >
      <ToneIcon className="cui-toast__icon" weight="fill" aria-hidden="true" focusable="false" />
      <div className="cui-toast__body">
        {title && <div className="cui-toast__title">{title}</div>}
        {message && <div className="cui-toast__message">{message}</div>}
        {action && (
          <div className="cui-toast__action">
            <Button
              variant="link"
              onClick={() => {
                action.onClick();
                onDismiss?.();
              }}
            >
              {action.label}
            </Button>
          </div>
        )}
      </div>
      {onDismiss && (
        <span className="cui-toast__close">
          <Button variant="ghost" size="sm" iconOnly icon={X} aria-label="Dismiss" onClick={onDismiss} />
        </span>
      )}
    </div>
  );
});

/* ── The stack ─────────────────────────────────────────────────────────────── */

/** What `toast()` takes. */
export type ToastOptions = Omit<ToastContent, 'title' | 'message'> &
  ToastText & {
    /** Shows the close button. Default true; Danger always has it. */
    dismissible?: boolean;
  };

export interface ToastApi {
  /** Shows a toast, or queues it when 3 are on screen. Returns its id. */
  toast: (options: ToastOptions) => string;
  /** Dismisses a toast early (or drops it from the queue). */
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastApi | null>(null);

/** Shows toasts from anywhere under a `ToastProvider`. */
export function useToast(): ToastApi {
  const api = useContext(ToastContext);
  if (!api) throw new Error('useToast() needs a <ToastProvider> above it.');
  return api;
}

// The DS's timings (Toast, Auto-dismiss timing), as the gallery's script has them.
const MAX_VISIBLE = 3;
const AUTO_DISMISS_MS = 5000;
const MIN_DISPLAY_MS = 2000;
// Entrance slides up 16px, exit down 8px (components.css 3237–3238).
const ENTER_Y = tokens.spacing[16];
const EXIT_Y = tokens.spacing[8];

type Item = ToastOptions & { id: string };

export interface ToastProviderProps {
  children?: ReactNode;
  /** Names the toast region for screen readers. Default "Notifications". */
  label?: string;
}

/**
 * Holds the toast stack: fixed bottom right (a full-width band on phones), at most 3 at once with the rest queued
 * first in, first out, each on its own timer. Put it once near the root of the app.
 */
export function ToastProvider({ children, label = 'Notifications' }: ToastProviderProps) {
  const [visible, setVisible] = useState<Item[]>([]);
  const [queue, setQueue] = useState<Item[]>([]);
  const [exiting, setExiting] = useState(0);
  const seq = useRef(0);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const container = usePortalContainer();
  const reduce = useReducedMotion();

  // A toast that is still leaving keeps its place in the count, so a queued one waits for it (as the gallery).
  useEffect(() => {
    if (!queue.length || visible.length + exiting >= MAX_VISIBLE) return;
    const room = MAX_VISIBLE - visible.length - exiting;
    setVisible((v) => [...v, ...queue.slice(0, room)]);
    setQueue((q) => q.slice(room));
  }, [queue, visible.length, exiting]);

  const toast = useCallback((options: ToastOptions) => {
    const id = `cui-toast-${++seq.current}`;
    setQueue((q) => [...q, { ...options, id }]);
    return id;
  }, []);

  const visibleRef = useRef(visible);
  visibleRef.current = visible;
  const dismiss = useCallback((id: string) => {
    setQueue((q) => q.filter((t) => t.id !== id));
    if (!visibleRef.current.some((t) => t.id === id)) return;
    visibleRef.current = visibleRef.current.filter((t) => t.id !== id);
    setExiting((n) => n + 1);
    setVisible((v) => v.filter((t) => t.id !== id));
  }, []);

  const api = useMemo(() => ({ toast, dismiss }), [toast, dismiss]);
  const t = reduce ? { duration: 0 } : transition('base', 'standard');

  const host = (
    <div className="cui-toast-host" role="region" aria-label={label}>
      {/* One live list for the page's life: a toast added to it is read out (Q-TOAST-4). */}
      <div className="cui-toast-host__list" role="status" aria-live="polite" aria-atomic="false" aria-relevant="additions">
        <AnimatePresence initial={false} onExitComplete={() => setExiting(0)}>
          {/* Newest on top: the list runs newest first (decided 2026-11-10, Q-TOAST-1, user). */}
          {[...visible].reverse().map((item) => (
            <motion.div
              key={item.id}
              layout={reduce ? false : 'position'}
              initial={{ opacity: 0, y: ENTER_Y }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: EXIT_Y }}
              transition={t}
            >
              <ToastItem item={item} onDismiss={() => dismiss(item.id)} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );

  return (
    <ToastContext.Provider value={api}>
      {children}
      {mounted && createPortal(host, container ?? document.body)}
    </ToastContext.Provider>
  );
}

/** One toast on its own timer: 5s, paused while hovered or focused inside; Danger waits for the reader. */
function ToastItem({ item, onDismiss }: { item: Item; onDismiss: () => void }) {
  const { id: _id, dismissible = true, tone = 'neutral', ...content } = item;
  const auto = tone !== 'danger';
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const paused = hovered || focused;
  const shownAt = useRef(Date.now());
  const remaining = useRef(AUTO_DISMISS_MS);
  const dismissRef = useRef(onDismiss);
  dismissRef.current = onDismiss;

  useEffect(() => {
    if (!auto || paused) return;
    const start = Date.now();
    const timer = setTimeout(() => {
      const elapsed = Date.now() - shownAt.current;
      if (elapsed < MIN_DISPLAY_MS) setTimeout(() => dismissRef.current(), MIN_DISPLAY_MS - elapsed);
      else dismissRef.current();
    }, remaining.current);
    return () => {
      clearTimeout(timer);
      remaining.current -= Date.now() - start;
    };
  }, [auto, paused]);

  return (
    <Toast
      {...(content as ToastText)}
      tone={tone}
      action={content.action}
      onDismiss={dismissible || !auto ? onDismiss : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
      }}
    />
  );
}
