"use client";

import { Clock } from "lucide-react";
import { PillButton } from "@/components/brand/PillButton";
import { Separator } from "@/components/ui/forms";
import { BUSINESS } from "@/data/business";
import { byId, money } from "@/data/menu";
import { cartSubtotal, lineUnitPrice } from "@/lib/pricing";
import { useIgniteStore } from "@/lib/store";
import { AppSheet, SheetBody, SheetFooter } from "./AppSheet";
import { pickupLabel, optionSummary } from "./line-text";
import { EmptyState, Stepper, Thumb } from "./primitives";
import { SaveFavourite } from "./SaveFavourite";

export function CartSheet({
  open,
  onOpenChange,
  onCheckout,
  onOpenPickup,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCheckout: () => void;
  onOpenPickup: () => void;
}) {
  const cart = useIgniteStore((s) => s.cart);
  const pickup = useIgniteStore((s) => s.pickup);
  const updateQty = useIgniteStore((s) => s.updateQty);
  const clearCart = useIgniteStore((s) => s.clearCart);

  const subtotal = cartSubtotal(cart);

  return (
    <AppSheet
      open={open}
      onOpenChange={onOpenChange}
      title="Your order"
      eyebrow={`Pickup at ${BUSINESS.addr}`}
    >
      <SheetBody className="space-y-4">
        {cart.length === 0 ? (
          <EmptyState
            title="Nothing in the cup yet"
            body="Add a drink or something from the case and it will show up here."
          />
        ) : (
          <>
            <ul className="space-y-2">
              {cart.map((line, i) => {
                const item = byId(line.itemId);
                const summary = optionSummary(line.options);
                return (
                  <li
                    key={`${line.itemId}-${i}`}
                    className="flex items-start gap-3 rounded-[14px] border border-line bg-paper p-3"
                  >
                    <Thumb item={item} size={48} />
                    <div className="min-w-0 flex-1">
                      <p className="font-display text-[13px] uppercase tracking-brand text-char">
                        {item?.name ?? "Item"}
                      </p>
                      {summary ? (
                        <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wide text-ink-2">
                          {summary}
                        </p>
                      ) : null}
                      {line.options?.notes ? (
                        <p className="mt-0.5 text-[11px] italic text-ink-2">
                          “{line.options.notes}”
                        </p>
                      ) : null}
                      <div className="mt-2 flex items-center justify-between gap-2">
                        <Stepper
                          qty={line.qty}
                          removable
                          onChange={(q) => updateQty(i, q)}
                        />
                        <span className="font-mono text-xs text-char">
                          {money(lineUnitPrice(line.itemId, line.options) * line.qty)}
                        </span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <button
              type="button"
              onClick={onOpenPickup}
              className="flex w-full items-center justify-between gap-3 rounded-[14px] border border-line bg-paper p-3 text-left"
            >
              <span className="inline-flex items-center gap-2.5">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-ember-tint text-ember">
                  <Clock className="h-4 w-4" />
                </span>
                <span>
                  <span className="block font-mono text-[10px] uppercase tracking-wide text-ink-2">
                    Pickup
                  </span>
                  <span className="block text-sm text-char">
                    {pickupLabel(pickup)}
                  </span>
                </span>
              </span>
              <span className="font-mono text-[10px] uppercase tracking-wide text-ember">
                Change
              </span>
            </button>

            <div className="flex items-center justify-between gap-3">
              <SaveFavourite lines={cart} defaultName="My usual" />
              <button
                type="button"
                onClick={clearCart}
                className="font-mono text-[11px] uppercase tracking-wide text-ink-2"
              >
                Clear
              </button>
            </div>
          </>
        )}
      </SheetBody>

      {cart.length > 0 ? (
        <SheetFooter>
          <div className="flex items-center justify-between text-sm">
            <span className="text-ink-2">Subtotal</span>
            <span className="font-mono text-char">{money(subtotal)}</span>
          </div>
          <Separator />
          <p className="font-mono text-[10px] uppercase tracking-wide text-ink-2">
            GST and tip on the next screen
          </p>
          <PillButton variant="solid" className="w-full" onClick={onCheckout}>
            Checkout
          </PillButton>
        </SheetFooter>
      ) : null}
    </AppSheet>
  );
}
