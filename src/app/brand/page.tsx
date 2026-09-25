import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Flame } from "@/components/brand/Flame";
import { PillButton } from "@/components/brand/PillButton";
import { Letterboard } from "@/components/brand/Letterboard";
import { LineArt } from "@/components/brand/LineArt";
import { Steam, CoffeeRing } from "@/components/brand/motifs";
import { MENU } from "@/data/menu";

const SWATCHES = [
  ["ember", "#B4441C"],
  ["ember-deep", "#8F3312"],
  ["ember-glow", "#D9673A"],
  ["ember-tint", "#F4DCCB"],
  ["char", "#1A1715"],
  ["crema", "#F6EFE4"],
  ["paper", "#FFFCF7"],
  ["pine", "#C99A62"],
  ["steel", "#8A979C"],
  ["leaf", "#3F7148"],
  ["ink-2", "#5B524B"],
  ["line", "#E6DACB"],
] as const;

export default function BrandPage() {
  return (
    <main className="min-h-screen bg-crema px-5 py-16 text-char">
      <div className="mx-auto max-w-3xl space-y-16">
        <div className="flex items-center justify-between">
          <Logo variant="horizontal" />
          <Link href="/" className="font-mono text-xs uppercase text-ember">
            ← Site
          </Link>
        </div>

        <section>
          <h1 className="font-display text-3xl uppercase tracking-brand text-ember">
            Brand guide
          </h1>
          <p className="mt-3 text-ink-2">
            Samples over Ignite&apos;s own colours, type, and components.
          </p>
        </section>

        <section>
          <h2 className="font-display text-sm uppercase tracking-brand text-ember">
            Colour
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {SWATCHES.map(([name, hex]) => (
              <div key={name} className="overflow-hidden rounded-[14px] border border-line bg-paper">
                <div className="aspect-[4/3]" style={{ background: hex }} />
                <div className="p-3">
                  <p className="font-mono text-[11px] uppercase">{name}</p>
                  <p className="font-mono text-[10px] text-ink-2">{hex}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-display text-sm uppercase tracking-brand text-ember">
            Logo
          </h2>
          <div className="mt-6 flex flex-wrap items-end gap-10">
            <Logo variant="stacked" href={null} />
            <Logo variant="horizontal" href={null} />
            <Flame className="h-16 w-auto text-ember" flicker />
          </div>
        </section>

        <section>
          <h2 className="font-display text-sm uppercase tracking-brand text-ember">
            Type
          </h2>
          <div className="mt-6 space-y-4">
            <p className="font-display text-2xl uppercase tracking-brand">
              Cinzel — the serif speaks
            </p>
            <p className="font-sans text-lg font-light tracking-ignite">
              Montserrat — IGNITE wordmark & UI
            </p>
            <p className="font-mono text-sm uppercase tracking-wide text-ink-2">
              DM Mono — $4.80 / 7:40 AM / order #214
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-display text-sm uppercase tracking-brand text-ember">
            Components
          </h2>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <PillButton>Order ahead</PillButton>
            <PillButton variant="solid">Pay now</PillButton>
            <LineArt kind="cup" />
            <LineArt kind="bean" />
            <Steam />
            <CoffeeRing className="h-16 w-16" />
          </div>
          <div className="mt-8 max-w-sm">
            <Letterboard
              title="Coffee"
              items={MENU.filter((m) => m.cat === "coffee").slice(0, 5)}
            />
          </div>
        </section>
      </div>
    </main>
  );
}
