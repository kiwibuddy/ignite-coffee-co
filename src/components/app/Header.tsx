"use client";

import { Clock, Info } from "lucide-react";
import { Flame } from "@/components/brand/Flame";
import { notice, status } from "@/lib/hours";
import { useIgniteStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { useGreeting } from "./hooks";
import { pickupChipLabel } from "./line-text";

export function Header({ onOpenPickup }: { onOpenPickup: () => void }) {
  const profile = useIgniteStore((s) => s.profile);
  const pickup = useIgniteStore((s) => s.pickup);
  const greeting = useGreeting();

  const shop = status();
  const headsUp = notice();
  const firstName = profile.name.trim().split(" ")[0];

  return (
    <header className="shrink-0 bg-ember text-paper">
      <div className="space-y-3 px-4 pb-3.5 pt-[calc(env(safe-area-inset-top)+1.5rem)]">
        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2">
            <Flame className="h-6 w-auto text-paper" />
            <span className="font-sans text-sm font-light uppercase tracking-ignite">
              Ignite
            </span>
          </span>
          <span
            className={cn(
              "inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wide",
              shop.open ? "text-paper" : "text-paper/75",
            )}
          >
            <span
              className={cn(
                "h-1.5 w-1.5 rounded-full",
                shop.open ? "bg-leaf" : "bg-pine",
              )}
            />
            {shop.open ? "Open" : "Closed"}
          </span>
        </div>

        <h1 className="font-display text-lg uppercase tracking-brand">
          {greeting}
          {firstName ? `, ${firstName}` : ""}
        </h1>

        <div className="space-y-1.5">
          <button
            type="button"
            onClick={onOpenPickup}
            className="inline-flex max-w-full items-center gap-2 rounded-full border border-paper/45 px-3 py-1.5 text-left transition-colors hover:bg-char/15"
          >
            <Clock className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate font-mono text-[11px] uppercase tracking-wide">
              {pickupChipLabel(pickup)}
            </span>
            <span className="shrink-0 font-mono text-[10px] uppercase tracking-wide text-paper/70">
              Change
            </span>
          </button>
          <p className="font-mono text-[11px] text-paper/80">{shop.text}</p>
        </div>

        {headsUp ? (
          <p className="flex items-start gap-2 rounded-[10px] bg-char/25 px-2.5 py-2 text-[11px] leading-snug text-paper">
            <Info className="mt-px h-3.5 w-3.5 shrink-0" />
            {headsUp}
          </p>
        ) : null}
      </div>
    </header>
  );
}
