import { useEffect, useRef, type ReactNode, type RefObject } from 'react';
import { createPortal } from 'react-dom';

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

function getFocusable(root: HTMLElement): HTMLElement[] {
  return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
    (el) => !el.hasAttribute('inert') && el.getClientRects().length > 0,
  );
}

interface ModalProps {
  open: boolean;
  onClose: () => void;
  /** id of the element that names the dialog (usually its heading). */
  labelledBy: string;
  describedBy?: string;
  /** Element to focus on open; defaults to the first focusable element. */
  initialFocusRef?: RefObject<HTMLElement | null>;
  /** 'center' = card dialog; 'drawer' = full-height panel from the right. */
  variant?: 'center' | 'drawer';
  panelClassName?: string;
  children: ReactNode;
}

/**
 * Shared accessible dialog shell: role="dialog" + aria-modal, Escape to close,
 * Tab focus trap, focus restore to the trigger on close, body scroll lock, and
 * render-only-when-open (portaled to <body>).
 */
export function Modal({
  open,
  onClose,
  labelledBy,
  describedBy,
  initialFocusRef,
  variant = 'center',
  panelClassName = '',
  children,
}: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  // Keep the latest onClose without re-running the open/close effect.
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;

    // Scroll lock (compensate for the scrollbar to avoid layout shift).
    const { overflow, paddingRight } = document.body.style;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;

    const target = initialFocusRef?.current ?? getFocusable(panel)[0] ?? panel;
    target.focus({ preventScroll: true });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        onCloseRef.current();
        return;
      }
      if (event.key !== 'Tab') return;
      const items = getFocusable(panel);
      if (items.length === 0) {
        event.preventDefault();
        panel.focus();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (event.shiftKey && (active === first || !panel.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (active === last || !panel.contains(active))) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
      if (previouslyFocused && document.contains(previouslyFocused)) {
        previouslyFocused.focus({ preventScroll: true });
      }
    };
  }, [open, initialFocusRef]);

  if (!open || typeof document === 'undefined') return null;

  const isDrawer = variant === 'drawer';

  return createPortal(
    <div
      className={`fixed inset-0 z-50 flex ${
        isDrawer ? 'justify-end' : 'items-start sm:items-center justify-center p-4 sm:p-6 overflow-y-auto'
      }`}
    >
      <div
        className="fixed inset-0 bg-black/65 backdrop-blur-sm motion-safe:animate-fade-in"
        onClick={() => onCloseRef.current()}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        aria-describedby={describedBy}
        tabIndex={-1}
        className={`relative z-10 focus:outline-none ${
          isDrawer ? 'h-full w-full max-w-sm overflow-y-auto' : 'my-6 w-full'
        } ${panelClassName}`}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}
