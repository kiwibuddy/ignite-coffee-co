import Link from "next/link";
import { Eyebrow, Reveal } from "@/components/brand/Reveal";
import { PillButton } from "@/components/brand/PillButton";

export function AppPromo() {
  return (
    <section className="bg-ember px-5 py-20 text-paper md:py-28">
      <div className="mx-auto grid max-w-[1200px] items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <Eyebrow className="text-paper">Order ahead</Eyebrow>
          <h2 className="mt-4 font-display text-2xl uppercase leading-snug tracking-[0.08em] text-paper md:text-3xl">
            Your usual, ready when you walk in.
          </h2>
          <ul className="mt-8 space-y-4 text-paper/85">
            {[
              "Save favourites and reorder in one tap",
              "Pick ASAP or schedule around your day",
              "Stamp card — every 10th drink is on us",
              "Live order status from received to ready",
            ].map((t) => (
              <li key={t} className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-paper" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <PillButton asChild variant="dark">
              <Link href="/app">Open the app</Link>
            </PillButton>
          </div>
          <div className="mt-10 space-y-2 font-mono text-[11px] uppercase tracking-wide text-paper/70">
            <p>iPhone: Share → Add to Home Screen</p>
            <p>Android: ⋮ → Install app</p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mx-auto flex w-full max-w-[360px] justify-center">
            <div className="w-full overflow-hidden rounded-[36px] border-[10px] border-char bg-crema shadow-none">
              <iframe
                title="Ignite ordering app"
                src="/app?embed=1"
                className="h-[640px] w-full border-0 bg-crema"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
