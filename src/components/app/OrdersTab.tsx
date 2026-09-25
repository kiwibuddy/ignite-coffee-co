"use client";

import { RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { PillButton } from "@/components/brand/PillButton";
import { money } from "@/data/menu";
import { useIgniteStore, type Order } from "@/lib/store";
import { linesSummary, orderDateLabel } from "./line-text";
import { OrderTracker } from "./OrderTracker";
import { EmptyState } from "./primitives";
import { SaveFavourite } from "./SaveFavourite";
import type { AppTab } from "./TabBar";

export function OrdersTab({
  activeOrder,
  onGoTab,
  onOpenCart,
}: {
  activeOrder: Order | null;
  onGoTab: (tab: AppTab) => void;
  onOpenCart: () => void;
}) {
  const orders = useIgniteStore((s) => s.orders);
  const addToCart = useIgniteStore((s) => s.addToCart);

  const history = orders.filter((o) => o.id !== activeOrder?.id);

  function orderAgain(order: Order) {
    order.lines.forEach((line) =>
      addToCart({
        ...line,
        options: line.options ? { ...line.options } : {},
      }),
    );
    toast.success(`Order #${order.number} added to your cart`);
    onOpenCart();
  }

  return (
    <div className="h-full space-y-4 overflow-y-auto overscroll-contain px-4 pb-28 pt-4">
      {activeOrder ? (
        <section className="space-y-2.5 rounded-[14px] border border-ember/40 bg-paper p-3">
          <div className="flex items-baseline justify-between gap-2">
            <p className="font-display text-[13px] uppercase tracking-brand text-char">
              Order #{activeOrder.number}
            </p>
            <span className="font-mono text-[10px] uppercase tracking-wide text-ember">
              {activeOrder.pickupLabel}
            </span>
          </div>
          <OrderTracker placedAt={activeOrder.placedAt} />
          <p className="font-mono text-[10px] uppercase tracking-wide text-ink-2">
            {linesSummary(activeOrder.lines)} · {money(activeOrder.total)}
          </p>
        </section>
      ) : null}

      <h2 className="font-display text-sm uppercase tracking-brand text-char">
        Order history
      </h2>

      {history.length === 0 ? (
        <EmptyState
          title="No orders yet"
          body="Once you order ahead, every receipt lands here for a one-tap repeat."
          action={
            <PillButton size="sm" onClick={() => onGoTab("order")}>
              Start an order
            </PillButton>
          }
        />
      ) : (
        <ul className="space-y-2">
          {history.map((order) => (
            <li
              key={order.id}
              className="space-y-2.5 rounded-[14px] border border-line bg-paper p-3"
            >
              <div className="flex items-baseline justify-between gap-2">
                <p className="font-display text-[13px] uppercase tracking-brand text-char">
                  #{order.number}
                </p>
                <span className="font-mono text-[10px] text-ink-2">
                  {order.pickupLabel === "As soon as possible"
                    ? orderDateLabel(order.placedAt)
                    : order.pickupLabel}
                </span>
              </div>
              <p className="font-mono text-[10px] uppercase tracking-wide text-ink-2">
                {linesSummary(order.lines)}
              </p>
              <div className="flex items-center justify-between gap-3">
                <PillButton
                  size="sm"
                  variant="outline"
                  className="gap-1.5"
                  onClick={() => orderAgain(order)}
                >
                  <RotateCcw className="h-3 w-3" /> Order again
                </PillButton>
                <span className="font-mono text-xs text-char">
                  {money(order.total)}
                </span>
              </div>
              <SaveFavourite
                lines={order.lines}
                defaultName={`Order #${order.number}`}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
