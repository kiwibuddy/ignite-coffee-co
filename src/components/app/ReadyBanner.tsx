"use client";

import { useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { X } from "lucide-react";
import { Flame } from "@/components/brand/Flame";
import type { Order } from "@/lib/store";

const AUTO_DISMISS_MS = 12_000;

/** iOS-style push banner that drops in when the demo order hits "ready". */
export function ReadyBanner({
  order,
  show,
  onOpen,
  onDismiss,
}: {
  order: Order | null;
  show: boolean;
  onOpen: () => void;
  onDismiss: () => void;
}) {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!show) return;
    const id = window.setTimeout(onDismiss, AUTO_DISMISS_MS);
    return () => window.clearTimeout(id);
  }, [show, onDismiss]);

  return (
    <AnimatePresence>
      {show && order ? (
        <motion.div
          key={order.id}
          className="absolute inset-x-2 top-2 z-50"
          initial={reduce ? { opacity: 0 } : { y: -120, opacity: 0 }}
          animate={reduce ? { opacity: 1 } : { y: 0, opacity: 1 }}
          exit={reduce ? { opacity: 0 } : { y: -120, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-start gap-3 rounded-[18px] border border-paper/10 bg-char/95 p-3 text-paper">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[9px] bg-ember">
              <Flame className="h-5 w-auto text-paper" />
            </span>
            <button
              type="button"
              onClick={onOpen}
              className="min-w-0 flex-1 text-left"
            >
              <span className="flex items-baseline justify-between gap-2">
                <span className="font-mono text-[10px] uppercase tracking-wide">
                  Ignite Coffee Co.
                </span>
                <span className="font-mono text-[10px] text-paper/60">now</span>
              </span>
              <span className="mt-0.5 block text-[13px] leading-snug">
                Order #{order.number} is ready! Grab it from the pickup shelf.
              </span>
            </button>
            <button
              type="button"
              aria-label="Dismiss notification"
              onClick={onDismiss}
              className="-mr-0.5 -mt-0.5 shrink-0 rounded-full p-1 text-paper/60"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
