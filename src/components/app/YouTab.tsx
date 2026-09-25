"use client";

import Link from "next/link";
import { CreditCard, Ellipsis, ExternalLink, Share, SquarePlus } from "lucide-react";
import { toast } from "sonner";
import { PillButton } from "@/components/brand/PillButton";
import { Input, Separator } from "@/components/ui/forms";
import { Switch } from "@/components/ui/switch";
import { BUSINESS } from "@/data/business";
import { useIgniteStore } from "@/lib/store";
import { Chip } from "./primitives";

const MILKS = ["Whole", "2%", "Oat", "Almond", "Soy"];

export function YouTab() {
  const profile = useIgniteStore((s) => s.profile);
  const notify = useIgniteStore((s) => s.notify);
  const setProfile = useIgniteStore((s) => s.setProfile);
  const setNotify = useIgniteStore((s) => s.setNotify);
  const resetDemo = useIgniteStore((s) => s.resetDemo);
  const seedDemo = useIgniteStore((s) => s.seedDemo);

  return (
    <div className="h-full space-y-4 overflow-y-auto overscroll-contain px-4 pb-28 pt-4">
      <h2 className="font-display text-sm uppercase tracking-brand text-char">
        You
      </h2>

      <section className="space-y-3 rounded-[14px] border border-line bg-paper p-3">
        <div className="space-y-1.5">
          <span className="font-mono text-[11px] uppercase tracking-wide text-ink-2">
            Name for the cup
          </span>
          <Input
            value={profile.name}
            onChange={(e) => setProfile({ name: e.target.value })}
            placeholder="Your name"
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
        <div className="space-y-2">
          <span className="font-mono text-[11px] uppercase tracking-wide text-ink-2">
            Usual milk
          </span>
          <div className="flex flex-wrap gap-2">
            {MILKS.map((milk) => (
              <Chip
                key={milk}
                active={profile.milk === milk}
                onClick={() =>
                  setProfile({ milk: profile.milk === milk ? "" : milk })
                }
              >
                {milk}
              </Chip>
            ))}
          </div>
          <p className="font-mono text-[10px] text-ink-2">
            Preselected whenever a drink takes milk.
          </p>
        </div>
      </section>

      <section className="space-y-3 rounded-[14px] border border-line bg-paper p-3">
        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-ember-tint text-ember">
              <CreditCard className="h-4 w-4" />
            </span>
            <span>
              <span className="block text-sm text-char">Visa •••• 4242</span>
              <span className="block font-mono text-[10px] uppercase tracking-wide text-ink-2">
                Saved demo card · exp 04/29
              </span>
            </span>
          </span>
        </div>
        <Separator />
        <p className="font-mono text-[10px] leading-relaxed text-ink-2">
          In the live app “Add card” opens Square/Stripe secure card entry. This
          demo never collects card numbers.
        </p>
      </section>

      <label className="flex items-center justify-between gap-3 rounded-[14px] border border-line bg-paper p-3">
        <span>
          <span className="block text-sm text-char">
            Text me when orders are ready
          </span>
          <span className="block font-mono text-[10px] uppercase tracking-wide text-ink-2">
            One message per order
          </span>
        </span>
        <Switch checked={notify} onCheckedChange={setNotify} />
      </label>

      <section className="space-y-2.5 rounded-[14px] border border-line bg-paper p-3">
        <p className="font-display text-[12px] uppercase tracking-brand text-char">
          Put Ignite on your home screen
        </p>
        <p className="flex items-start gap-2 text-[11px] leading-snug text-ink-2">
          <Share className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ember" />
          <span>
            <span className="text-char">iPhone:</span> tap Share, then “Add to
            Home Screen”.
          </span>
        </p>
        <p className="flex items-start gap-2 text-[11px] leading-snug text-ink-2">
          <Ellipsis className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ember" />
          <span>
            <span className="text-char">Android:</span> tap the menu, then
            “Install app”.
          </span>
        </p>
        <p className="flex items-start gap-2 text-[11px] leading-snug text-ink-2">
          <SquarePlus className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ember" />
          <span>It opens full screen and remembers your usual.</span>
        </p>
      </section>

      <section className="space-y-2.5 rounded-[14px] border border-line bg-paper p-3">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wide text-ember"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          Back to {BUSINESS.name}
        </Link>
        <p className="font-mono text-[10px] leading-relaxed text-ink-2">
          {BUSINESS.addr} · {BUSINESS.city}
        </p>
        <Separator />
        <div className="flex flex-wrap gap-2">
          <PillButton
            size="sm"
            variant="outline"
            onClick={() => {
              resetDemo();
              seedDemo();
              toast.success("Demo data reloaded");
            }}
          >
            Reload demo data
          </PillButton>
          <PillButton
            size="sm"
            variant="ghost"
            onClick={() => {
              resetDemo();
              toast("Demo data cleared");
            }}
          >
            Reset demo data
          </PillButton>
        </div>
      </section>
    </div>
  );
}
