"use client";

import { Flame } from "@/components/brand/Flame";
import { PillButton } from "@/components/brand/PillButton";
import { money } from "@/data/menu";
import { stampEligibleDrinks } from "@/lib/pricing";
import { useIgniteStore, type Order } from "@/lib/store";
import { AppSheet, SheetBody, SheetFooter } from "./AppSheet";
import { linesSummary } from "./line-text";
import { OrderTracker } from "./OrderTracker";
import { SaveFavourite } from "./SaveFavourite";
import { StampCard } from "./StampCard";

export function Confirmation({
  order,
  onClose,
}: {
  order: Order | null;
  onClose: () => void;
}) {
  const stamps = useIgniteStore((s) => s.stamps);
  const earned = order ? stampEligibleDrinks(order.lines) : 0;

  return (
    <AppSheet
      open={Boolean(order)}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      title={order ? `Order #${order.number}` : "Order placed"}
      hideTitle
    >
      {order ? (
        <>
          <SheetBody className="space-y-5 text-center">
            <div className="space-y-2 pt-1">
              <Flame className="mx-auto h-14 w-auto text-ember" flicker />
              <p className="font-mono text-[10px] uppercase tracking-wide text-ember">
                Order in
              </p>
              <h2 className="font-display text-2xl uppercase tracking-brand text-char">
                #{order.number}
              </h2>
              <p className="text-sm text-ink-2">
                {order.name}, we will have it ready{" "}
                <span className="text-char">
                  {order.pickupLabel === "As soon as possible"
                    ? "in about 10 minutes"
                    : order.pickupLabel}
                </span>
                .
              </p>
            </div>

            <div className="rounded-[14px] border border-line bg-paper p-3 text-left">
              <OrderTracker placedAt={order.placedAt} />
            </div>

            <div className="space-y-1.5 rounded-[14px] border border-line bg-paper p-3 text-left">
              <p className="font-mono text-[10px] uppercase tracking-wide text-ink-2">
                {linesSummary(order.lines)}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-ink-2">Paid</span>
                <span className="font-mono text-sm text-char">
                  {money(order.total)}
                </span>
              </div>
            </div>

            {earned > 0 ? (
              <div className="space-y-2">
                <p className="font-display text-[11px] uppercase tracking-brand text-ember">
                  +{earned} stamp{earned === 1 ? "" : "s"} · {stamps} total
                </p>
                <StampCard stamps={stamps} compact />
              </div>
            ) : null}

            <div className="flex justify-center">
              <SaveFavourite
                lines={order.lines}
                defaultName={`Order #${order.number}`}
              />
            </div>
          </SheetBody>

          <SheetFooter>
            <PillButton variant="solid" className="w-full" onClick={onClose}>
              Done
            </PillButton>
          </SheetFooter>
        </>
      ) : null}
    </AppSheet>
  );
}
