"use client";

import { useMemo, useState } from "react";
import { Check, Info, Zap } from "lucide-react";
import { PillButton } from "@/components/brand/PillButton";
import { fmt, isOpenNow, mins, notice, slotDays } from "@/lib/hours";
import { useIgniteStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { AppSheet, SheetBody, SheetFooter } from "./AppSheet";
import { dayLabel } from "./line-text";
import { Chip } from "./primitives";

export function PickupSheet({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const pickup = useIgniteStore((s) => s.pickup);
  const setPickup = useIgniteStore((s) => s.setPickup);

  const days = useMemo(() => (open ? slotDays() : []), [open]);
  const openNow = open ? isOpenNow() : false;
  const headsUp = notice();

  const [dayIndex, setDayIndex] = useState(0);
  const activeDay = days[Math.min(dayIndex, Math.max(days.length - 1, 0))];
  const selectedTime = pickup.mode === "scheduled" ? pickup.time : null;

  return (
    <AppSheet
      open={open}
      onOpenChange={onOpenChange}
      title="Pickup time"
      eyebrow="Mon–Sat · 7 AM – 4 PM"
    >
      <SheetBody className="space-y-4">
        {headsUp ? (
          <p className="flex items-start gap-2 rounded-[12px] border border-pine/50 bg-ember-tint/40 px-3 py-2.5 text-[11px] leading-snug text-char">
            <Info className="mt-px h-3.5 w-3.5 shrink-0 text-ember" />
            {headsUp}
          </p>
        ) : null}

        {openNow ? (
          <button
            type="button"
            onClick={() => setPickup({ mode: "asap" })}
            className={cn(
              "flex w-full items-center justify-between gap-3 rounded-[14px] border p-3 text-left transition-colors",
              pickup.mode === "asap"
                ? "border-ember bg-ember-tint/50"
                : "border-line bg-paper",
            )}
          >
            <span className="inline-flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-ember text-paper">
                <Zap className="h-4 w-4" />
              </span>
              <span>
                <span className="block font-display text-[13px] uppercase tracking-brand text-char">
                  As soon as possible
                </span>
                <span className="block font-mono text-[10px] uppercase tracking-wide text-ink-2">
                  Ready in about 10 min
                </span>
              </span>
            </span>
            {pickup.mode === "asap" ? (
              <Check className="h-4 w-4 shrink-0 text-ember" />
            ) : null}
          </button>
        ) : (
          <p className="rounded-[12px] border border-line bg-paper px-3 py-2.5 text-xs text-ink-2">
            We are closed right now — pick a time below and it will be waiting
            for you when we open.
          </p>
        )}

        {days.length === 0 ? (
          <p className="text-xs text-ink-2">
            No pickup times left today. Check back tomorrow morning.
          </p>
        ) : (
          <div className="space-y-3">
            <p className="font-mono text-[11px] uppercase tracking-wide text-ink-2">
              Schedule ahead
            </p>
            <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
              {days.map((d, i) => (
                <Chip
                  key={d.day.toISOString()}
                  active={i === dayIndex}
                  onClick={() => setDayIndex(i)}
                >
                  {dayLabel(d.day)}
                </Chip>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-2">
              {activeDay?.slots.map((slot) => {
                const iso = slot.toISOString();
                return (
                  <Chip
                    key={iso}
                    active={selectedTime === iso}
                    onClick={() => setPickup({ mode: "scheduled", time: iso })}
                    className="justify-center"
                  >
                    {fmt(mins(slot))}
                  </Chip>
                );
              })}
            </div>
          </div>
        )}
      </SheetBody>

      <SheetFooter>
        <PillButton
          variant="solid"
          className="w-full"
          onClick={() => onOpenChange(false)}
        >
          Done
        </PillButton>
      </SheetFooter>
    </AppSheet>
  );
}
