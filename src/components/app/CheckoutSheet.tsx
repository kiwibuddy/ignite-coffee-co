"use client";

import { useMemo, useState } from "react";
import {
  Apple,
  Banknote,
  Check,
  CreditCard,
  Flame as FlameIcon,
  Info,
  LoaderCircle,
  Wallet,
} from "lucide-react";
import { PillButton } from "@/components/brand/PillButton";
import { Input, Separator } from "@/components/ui/forms";
import { Switch } from "@/components/ui/switch";
import { byId, money } from "@/data/menu";
import {
  GST_RATE,
  cartSubtotal,
  lineUnitPrice,
  type CartLine,
} from "@/lib/pricing";
import { useIgniteStore, type Order } from "@/lib/store";
import { cn } from "@/lib/utils";
import { AppSheet, SheetBody, SheetFooter } from "./AppSheet";
import { pickupLabel } from "./line-text";
import { Chip } from "./primitives";

type PayMethod = "apple" | "google" | "visa" | "counter" | "free";

const TIPS = [0, 0.1, 0.15, 0.2];
const STAMPS_PER_FREE_DRINK = 10;

/** The most expensive stamp-eligible drink comes off the bill. */
function freeDrinkValue(lines: CartLine[]): number {
  let best = 0;
  for (const line of lines) {
    const item = byId(line.itemId);
    if (!item || item.bake || item.cat === "beans") continue;
    best = Math.max(best, lineUnitPrice(line.itemId, line.options));
  }
  return Math.round(best * 100) / 100;
}

export function CheckoutSheet({
  open,
  onOpenChange,
  onPaid,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPaid: (order: Order) => void;
}) {
  const cart = useIgniteStore((s) => s.cart);
  const pickup = useIgniteStore((s) => s.pickup);
  const profile = useIgniteStore((s) => s.profile);
  const notify = useIgniteStore((s) => s.notify);
  const stamps = useIgniteStore((s) => s.stamps);
  const setProfile = useIgniteStore((s) => s.setProfile);
  const setNotify = useIgniteStore((s) => s.setNotify);
  const placeOrder = useIgniteStore((s) => s.placeOrder);

  const [method, setMethod] = useState<PayMethod>("apple");
  const [tip, setTip] = useState(0.15);
  const [busy, setBusy] = useState(false);

  const canUseFreeDrink = stamps >= STAMPS_PER_FREE_DRINK;

  const totals = useMemo(() => {
    const subtotal = cartSubtotal(cart);
    const discount =
      method === "free" && canUseFreeDrink ? freeDrinkValue(cart) : 0;
    const taxable = Math.max(0, Math.round((subtotal - discount) * 100) / 100);
    const gst = Math.round(taxable * GST_RATE * 100) / 100;
    const tipAmount = Math.round(taxable * tip * 100) / 100;
    const total = Math.round((taxable + gst + tipAmount) * 100) / 100;
    return { subtotal, discount, taxable, gst, tipAmount, total };
  }, [cart, method, canUseFreeDrink, tip]);

  const methods: {
    id: PayMethod;
    label: string;
    hint: string;
    Icon: typeof Apple;
    dark?: boolean;
    hidden?: boolean;
  }[] = [
    { id: "apple", label: "Apple Pay", hint: "Demo", Icon: Apple, dark: true },
    { id: "google", label: "Google Pay", hint: "Demo", Icon: Wallet },
    { id: "visa", label: "Visa •••• 4242", hint: "Demo card", Icon: CreditCard },
    {
      id: "counter",
      label: "Pay at the counter",
      hint: "Card or cash when you grab it",
      Icon: Banknote,
    },
    {
      id: "free",
      label: "Use free drink",
      hint: `${stamps} stamps · one drink on us`,
      Icon: FlameIcon,
      hidden: !canUseFreeDrink,
    },
  ];

  function pay() {
    if (busy || !cart.length) return;
    setBusy(true);
    const usedFreeDrink = method === "free" && canUseFreeDrink;
    const discount = totals.discount;

    window.setTimeout(() => {
      const order = placeOrder(tip);
      setBusy(false);
      if (!order) return;

      if (usedFreeDrink && discount > 0) {
        const patched: Order = {
          ...order,
          subtotal: Math.round((order.subtotal - discount) * 100) / 100,
          total: totals.total,
        };
        useIgniteStore.setState((state) => ({
          orders: state.orders.map((o) => (o.id === order.id ? patched : o)),
          stamps: Math.max(0, state.stamps - STAMPS_PER_FREE_DRINK),
        }));
        onPaid(patched);
        return;
      }

      onPaid(order);
    }, 1200);
  }

  const payLabel = busy
    ? "Sending to the bar…"
    : method === "apple"
      ? `Pay ${money(totals.total)}`
      : method === "counter"
        ? `Place order · ${money(totals.total)}`
        : `Pay ${money(totals.total)}`;

  return (
    <AppSheet
      open={open}
      onOpenChange={(next) => {
        if (!busy) onOpenChange(next);
      }}
      title="Checkout"
      eyebrow={pickupLabel(pickup)}
    >
      <SheetBody className="space-y-5">
        <div className="space-y-3">
          <div className="space-y-1.5">
            <span className="font-mono text-[11px] uppercase tracking-wide text-ink-2">
              Name for the cup
            </span>
            <Input
              value={profile.name}
              onChange={(e) => setProfile({ name: e.target.value })}
              placeholder="Who is this for?"
            />
          </div>
          <div className="space-y-1.5">
            <span className="font-mono text-[11px] uppercase tracking-wide text-ink-2">
              Phone
            </span>
            <Input
              type="tel"
              inputMode="tel"
              value={profile.phone}
              onChange={(e) => setProfile({ phone: e.target.value })}
              placeholder="250 555 0142"
            />
          </div>
          <label className="flex items-center justify-between gap-3 rounded-[12px] border border-line bg-paper px-3 py-2.5">
            <span>
              <span className="block text-sm text-char">
                Text me when it is ready
              </span>
              <span className="block font-mono text-[10px] uppercase tracking-wide text-ink-2">
                One message per order
              </span>
            </span>
            <Switch checked={notify} onCheckedChange={setNotify} />
          </label>
        </div>

        <div className="space-y-2">
          <span className="font-mono text-[11px] uppercase tracking-wide text-ink-2">
            Pay with
          </span>
          {methods
            .filter((m) => !m.hidden)
            .map(({ id, label, hint, Icon, dark }) => {
              const active = method === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setMethod(id)}
                  className={cn(
                    "flex w-full items-center justify-between gap-3 rounded-[12px] border px-3 py-2.5 text-left transition-colors",
                    dark
                      ? "border-char bg-char text-paper"
                      : active
                        ? "border-ember bg-ember-tint/50 text-char"
                        : "border-line bg-paper text-char",
                    dark && active && "ring-2 ring-ember",
                  )}
                >
                  <span className="inline-flex items-center gap-2.5">
                    <Icon
                      className={cn(
                        "h-4 w-4",
                        dark ? "text-paper" : active ? "text-ember" : "text-ink-2",
                      )}
                    />
                    <span>
                      <span className="block text-sm">{label}</span>
                      <span
                        className={cn(
                          "block font-mono text-[10px] uppercase tracking-wide",
                          dark ? "text-paper/70" : "text-ink-2",
                        )}
                      >
                        {hint}
                      </span>
                    </span>
                  </span>
                  {active ? (
                    <Check
                      className={cn(
                        "h-4 w-4 shrink-0",
                        dark ? "text-paper" : "text-ember",
                      )}
                    />
                  ) : null}
                </button>
              );
            })}

          <p className="flex items-start gap-2 rounded-[12px] border border-dashed border-line px-3 py-2.5 font-mono text-[10px] leading-relaxed text-ink-2">
            <Info className="mt-px h-3.5 w-3.5 shrink-0 text-ember" />
            Add card — in the live app this opens Square/Stripe secure card
            entry. Nothing here is a real payment.
          </p>
        </div>

        <div className="space-y-2">
          <span className="font-mono text-[11px] uppercase tracking-wide text-ink-2">
            Tip the crew
          </span>
          <div className="flex flex-wrap gap-2">
            {TIPS.map((t) => (
              <Chip key={t} active={tip === t} onClick={() => setTip(t)}>
                {t === 0 ? "No tip" : `${Math.round(t * 100)}%`}
              </Chip>
            ))}
          </div>
        </div>

        <div className="space-y-1.5 rounded-[14px] border border-line bg-paper p-3">
          <Row label="Subtotal" value={money(totals.subtotal)} />
          {totals.discount > 0 ? (
            <Row
              label="Free drink"
              value={`−${money(totals.discount)}`}
              accent
            />
          ) : null}
          <Row label="GST 5%" value={money(totals.gst)} />
          <Row
            label={tip === 0 ? "Tip" : `Tip ${Math.round(tip * 100)}%`}
            value={money(totals.tipAmount)}
          />
          <Separator className="my-1.5" />
          <div className="flex items-center justify-between">
            <span className="font-display text-sm uppercase tracking-brand text-char">
              Total
            </span>
            <span className="font-mono text-sm text-char">
              {money(totals.total)}
            </span>
          </div>
        </div>
      </SheetBody>

      <SheetFooter>
        {method === "apple" ? (
          <button
            type="button"
            onClick={pay}
            disabled={busy || !cart.length}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-char text-paper disabled:opacity-60"
          >
            {busy ? (
              <LoaderCircle className="h-4 w-4 animate-spin" />
            ) : (
              <Apple className="h-4 w-4" />
            )}
            <span className="font-display text-sm uppercase tracking-[0.08em]">
              {payLabel}
            </span>
          </button>
        ) : (
          <PillButton
            variant="solid"
            className="w-full"
            onClick={pay}
            disabled={busy || !cart.length}
          >
            {busy ? (
              <span className="inline-flex items-center gap-2">
                <LoaderCircle className="h-4 w-4 animate-spin" />
                {payLabel}
              </span>
            ) : (
              payLabel
            )}
          </PillButton>
        )}
        <p className="text-center font-mono text-[10px] uppercase tracking-wide text-ink-2">
          Demo checkout · no money moves
        </p>
      </SheetFooter>
    </AppSheet>
  );
}

function Row({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex items-center justify-between text-xs">
      <span className={accent ? "text-leaf" : "text-ink-2"}>{label}</span>
      <span className={cn("font-mono", accent ? "text-leaf" : "text-char")}>
        {value}
      </span>
    </div>
  );
}
