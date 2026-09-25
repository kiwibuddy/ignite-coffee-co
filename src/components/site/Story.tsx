import { Eyebrow, Reveal } from "@/components/brand/Reveal";

const MILESTONES = [
  { when: "Dec 2025", what: "Excited to meet you in the new year." },
  { when: "Feb 17 2026", what: "Soft opening. The espresso is dialed in." },
  { when: "Summer 2026", what: "Patio, frappes, and whole beans on the wall." },
  { when: "Sep 2026", what: "Fall favourites — Cozy Butter Pecan & Pumpkin Spice." },
];

export function Story() {
  return (
    <section className="bg-ember px-5 py-20 text-paper md:py-28">
      <div className="mx-auto max-w-2xl">
        <Reveal className="text-center">
          <Eyebrow className="text-paper">Our story</Eyebrow>
        </Reveal>
        <ol className="mt-12 space-y-8">
          {MILESTONES.map((m, i) => (
            <Reveal key={m.when} delay={0.06 * i}>
              <li className="grid gap-2 border-l-2 border-paper/40 pl-5 md:grid-cols-[8rem_1fr] md:gap-6 md:border-l-0 md:pl-0">
                <span className="font-mono text-xs uppercase tracking-wide text-ember-tint">
                  {m.when}
                </span>
                <p className="text-base leading-relaxed text-paper">{m.what}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
