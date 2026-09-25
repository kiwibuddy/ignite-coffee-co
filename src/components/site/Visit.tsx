"use client";

import { useMemo } from "react";
import Link from "next/link";
import { BUSINESS } from "@/data/business";
import { DAYS, HOURS, fmt, notice, status } from "@/lib/hours";
import { Eyebrow, Reveal } from "@/components/brand/Reveal";
import { PillButton } from "@/components/brand/PillButton";
import { CoffeeRing } from "@/components/brand/motifs";

export function Visit() {
  const today = new Date().getDay();
  const s = useMemo(() => status(), []);
  const n = useMemo(() => notice(), []);

  return (
    <section
      id="visit"
      className="relative overflow-hidden bg-ember px-5 py-20 text-paper md:py-28"
    >
      <CoffeeRing className="absolute -right-10 bottom-10 h-40 w-40 text-paper/20 md:h-56 md:w-56" />
      <div className="relative mx-auto max-w-[800px]">
        <Reveal className="text-center">
          <Eyebrow className="text-paper">Visit</Eyebrow>
          <p className="mt-3 font-mono text-xs uppercase tracking-wide text-leaf">
            ● {s.text}
          </p>
        </Reveal>

        <Reveal>
          <table className="mt-10 w-full text-left">
            <tbody>
              {DAYS.map((day, i) => {
                const h = HOURS[i as keyof typeof HOURS];
                return (
                  <tr
                    key={day}
                    className={
                      i === today ? "font-medium text-paper" : "text-paper/70"
                    }
                  >
                    <td className="border-b border-paper/20 py-3 font-display text-sm uppercase tracking-brand">
                      {day}
                    </td>
                    <td className="border-b border-paper/20 py-3 text-right font-mono text-sm">
                      {h ? `${fmt(h[0])} – ${fmt(h[1])}` : "Closed"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Reveal>

        {n && (
          <p className="mt-6 rounded-[14px] border border-paper/30 bg-char/20 px-4 py-3 font-mono text-xs text-paper">
            {n}
          </p>
        )}

        <Reveal delay={0.1}>
          <div className="mt-10 space-y-2 text-center">
            <p className="font-display text-lg uppercase tracking-brand text-paper">
              {BUSINESS.addr}
            </p>
            <p className="text-paper/80">{BUSINESS.city}</p>
            <p className="font-mono text-sm">
              <a href={`mailto:${BUSINESS.email}`} className="text-ember-tint">
                {BUSINESS.email}
              </a>
            </p>
            <p className="font-mono text-xs text-paper/70">
              Google {BUSINESS.googleRating.toFixed(1)}★ ({BUSINESS.googleReviews}{" "}
              reviews)
            </p>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <PillButton asChild variant="dark">
              <a href={BUSINESS.maps} target="_blank" rel="noreferrer">
                Get directions
              </a>
            </PillButton>
            <PillButton asChild variant="dark">
              <Link href="#reviews">Read reviews</Link>
            </PillButton>
          </div>
          <p className="mt-10 text-center font-display text-sm uppercase tracking-brand text-paper">
            Come in, we&apos;re open
          </p>
        </Reveal>
      </div>
    </section>
  );
}
