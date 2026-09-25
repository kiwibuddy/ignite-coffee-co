"use client";

import { useCallback, useSyncExternalStore } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export type OrderStage = "received" | "making" | "ready";

export const STAGES: { id: OrderStage; label: string; line: string }[] = [
  { id: "received", label: "Received", line: "We have your order — the board is updated." },
  { id: "making", label: "Making", line: "On the bar now. Your cup is coming up." },
  { id: "ready", label: "Ready", line: "Ready on the pickup shelf. Come on in!" },
];

/** Demo progression: Making at 8 s, Ready at 25 s after the order was placed. */
const MAKING_AFTER_MS = 8_000;
const READY_AFTER_MS = 25_000;

export function stageFor(placedAt: string, now: number = Date.now()): OrderStage {
  const elapsed = now - new Date(placedAt).getTime();
  if (elapsed >= READY_AFTER_MS) return "ready";
  if (elapsed >= MAKING_AFTER_MS) return "making";
  return "received";
}

/** Ticks the demo order forward without touching the store. */
export function useOrderStage(placedAt?: string): OrderStage {
  const subscribe = useCallback(
    (onChange: () => void) => {
      if (!placedAt || stageFor(placedAt) === "ready") return () => {};
      const id = window.setInterval(() => {
        onChange();
        if (stageFor(placedAt) === "ready") window.clearInterval(id);
      }, 1000);
      return () => window.clearInterval(id);
    },
    [placedAt],
  );

  const snapshot = useCallback<() => OrderStage>(
    () => (placedAt ? stageFor(placedAt) : "received"),
    [placedAt],
  );

  return useSyncExternalStore(subscribe, snapshot, () => "received");
}

export function OrderTracker({
  placedAt,
  className,
  showCaption = true,
}: {
  placedAt: string;
  className?: string;
  showCaption?: boolean;
}) {
  const stage = useOrderStage(placedAt);
  const current = STAGES.findIndex((s) => s.id === stage);

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center">
        {STAGES.map((s, i) => {
          const done = i < current;
          const active = i === current;
          const ready = s.id === "ready" && active;
          return (
            <div key={s.id} className="flex flex-1 items-center last:flex-none">
              <div className="flex flex-col items-center gap-1.5">
                <span
                  className={cn(
                    "grid h-6 w-6 place-items-center rounded-full border-[1.5px] transition-colors",
                    done && "border-ember bg-ember text-paper",
                    active && !ready && "border-ember bg-paper text-ember",
                    ready && "border-leaf bg-leaf text-paper",
                    !done && !active && "border-line bg-paper text-line",
                  )}
                >
                  {done || ready ? (
                    <Check className="h-3.5 w-3.5" />
                  ) : (
                    <span
                      className={cn(
                        "h-2 w-2 rounded-full",
                        active ? "animate-pulse bg-ember" : "bg-line",
                      )}
                    />
                  )}
                </span>
                <span
                  className={cn(
                    "font-mono text-[9px] uppercase tracking-wide",
                    ready ? "text-leaf" : active || done ? "text-char" : "text-ink-2/70",
                  )}
                >
                  {s.label}
                </span>
              </div>
              {i < STAGES.length - 1 ? (
                <span
                  className={cn(
                    "-mt-4 h-[2px] flex-1 transition-colors",
                    i < current ? "bg-ember" : "bg-line",
                  )}
                />
              ) : null}
            </div>
          );
        })}
      </div>
      {showCaption ? (
        <p
          className={cn(
            "text-xs",
            stage === "ready" ? "font-medium text-leaf" : "text-ink-2",
          )}
        >
          {STAGES[current]?.line}
        </p>
      ) : null}
    </div>
  );
}
