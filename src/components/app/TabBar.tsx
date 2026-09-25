"use client";

import { Coffee, Flame, Heart, ReceiptText, User } from "lucide-react";
import { cn } from "@/lib/utils";

export type AppTab = "order" | "favs" | "orders" | "rewards" | "you";

const TABS: { id: AppTab; label: string; Icon: typeof Coffee }[] = [
  { id: "order", label: "Order", Icon: Coffee },
  { id: "favs", label: "Favourites", Icon: Heart },
  { id: "orders", label: "Orders", Icon: ReceiptText },
  { id: "rewards", label: "Rewards", Icon: Flame },
  { id: "you", label: "You", Icon: User },
];

export function TabBar({
  tab,
  onTab,
}: {
  tab: AppTab;
  onTab: (tab: AppTab) => void;
}) {
  return (
    <nav className="relative z-30 shrink-0 border-t border-line bg-paper pb-[env(safe-area-inset-bottom)]">
      <ul className="flex items-stretch">
        {TABS.map(({ id, label, Icon }) => {
          const active = id === tab;
          return (
            <li key={id} className="flex-1">
              <button
                type="button"
                onClick={() => onTab(id)}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex w-full flex-col items-center gap-1 px-1 py-2.5 transition-colors",
                  active ? "text-ember" : "text-ink-2",
                )}
              >
                <Icon
                  className={cn("h-5 w-5", active && "fill-ember-tint")}
                  strokeWidth={active ? 2 : 1.6}
                />
                <span className="font-mono text-[9px] uppercase tracking-wide">
                  {label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
