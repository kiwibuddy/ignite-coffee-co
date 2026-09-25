"use client";

import { Flame } from "@/components/brand/Flame";
import { cn } from "@/lib/utils";

const CARD_SIZE = 10;

export function StampCard({
  stamps,
  compact = false,
  className,
}: {
  stamps: number;
  compact?: boolean;
  className?: string;
}) {
  const freeDrinks = Math.floor(stamps / CARD_SIZE);
  const progress = stamps % CARD_SIZE;
  const filled = freeDrinks > 0 && progress === 0 ? CARD_SIZE : progress;
  const toGo = CARD_SIZE - filled;

  return (
    <div
      className={cn(
        "flame-pattern overflow-hidden rounded-[14px] border border-char bg-char text-paper",
        compact ? "p-3" : "p-4",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-display text-[11px] uppercase tracking-brand text-pine">
            Ignite loyalty
          </p>
          <p
            className={cn(
              "font-display uppercase tracking-brand",
              compact ? "text-sm" : "text-base",
            )}
          >
            Every 10th drink free
          </p>
        </div>
        <span className="shrink-0 rounded-full border border-paper/30 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide">
          {filled}/{CARD_SIZE}
        </span>
      </div>

      <div className="mt-3 grid grid-cols-5 gap-2">
        {Array.from({ length: CARD_SIZE }, (_, i) => {
          const on = i < filled;
          return (
            <span
              key={i}
              className={cn(
                "grid aspect-square place-items-center rounded-full border",
                on ? "border-ember bg-ember/15" : "border-paper/20 bg-paper/5",
              )}
            >
              <Flame
                className={cn(
                  "h-1/2 w-auto",
                  on ? "text-ember-glow" : "text-paper/20",
                )}
              />
            </span>
          );
        })}
      </div>

      <p className="mt-3 font-mono text-[10px] uppercase tracking-wide text-paper/75">
        {freeDrinks > 0
          ? `${freeDrinks} free drink${freeDrinks === 1 ? "" : "s"} ready — use it at checkout`
          : `${toGo} more drink${toGo === 1 ? "" : "s"} to your free one`}
      </p>
    </div>
  );
}
