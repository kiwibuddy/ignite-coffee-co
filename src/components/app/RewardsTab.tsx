"use client";

import { Coffee, Flame as FlameIcon, Gift } from "lucide-react";
import { PillButton } from "@/components/brand/PillButton";
import { useIgniteStore } from "@/lib/store";
import { StampCard } from "./StampCard";
import type { AppTab } from "./TabBar";

const HOW_IT_WORKS = [
  {
    Icon: Coffee,
    title: "Order any drink",
    body: "Every drink on the order earns a stamp. Baking and beans do not.",
  },
  {
    Icon: FlameIcon,
    title: "Fill the card",
    body: "Ten stamps fills your card — it tracks here and at the counter.",
  },
  {
    Icon: Gift,
    title: "Drink ten is free",
    body: "Pick “Use free drink” at checkout and the priciest drink comes off.",
  },
];

export function RewardsTab({ onGoTab }: { onGoTab: (tab: AppTab) => void }) {
  const stamps = useIgniteStore((s) => s.stamps);
  const freeDrinks = Math.floor(stamps / 10);

  return (
    <div className="h-full space-y-4 overflow-y-auto overscroll-contain px-4 pb-28 pt-4">
      <h2 className="font-display text-sm uppercase tracking-brand text-char">
        Rewards
      </h2>

      <StampCard stamps={stamps} />

      {freeDrinks > 0 ? (
        <div className="flex items-center justify-between gap-3 rounded-[14px] border border-leaf/40 bg-paper p-3">
          <p className="text-xs text-char">
            You have a free drink waiting. Add something to your order and pick
            it at checkout.
          </p>
          <PillButton size="sm" variant="solid" onClick={() => onGoTab("order")}>
            Use it
          </PillButton>
        </div>
      ) : null}

      <ul className="space-y-2">
        {HOW_IT_WORKS.map(({ Icon, title, body }) => (
          <li
            key={title}
            className="flex items-start gap-3 rounded-[14px] border border-line bg-paper p-3"
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ember-tint text-ember">
              <Icon className="h-4 w-4" />
            </span>
            <span>
              <span className="block font-display text-[12px] uppercase tracking-brand text-char">
                {title}
              </span>
              <span className="mt-0.5 block text-[11px] leading-snug text-ink-2">
                {body}
              </span>
            </span>
          </li>
        ))}
      </ul>

      <p className="font-mono text-[10px] uppercase leading-relaxed tracking-wide text-ink-2">
        Demo loyalty card · in the live app stamps sync with the till so they
        follow you whether you order ahead or walk in.
      </p>
    </div>
  );
}
