"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { WaveText } from "@/components/brand/WaveText";
import { Steam } from "@/components/brand/motifs";
import { status } from "@/lib/hours";
import { fetchWeather } from "@/lib/weather";
import { BUSINESS } from "@/data/business";

export function Hero() {
  const [openText, setOpenText] = useState("OPEN TODAY TIL 4PM");
  const [temp, setTemp] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const s = status();
    setOpenText(s.short);
    setIsOpen(s.open);
    fetchWeather().then((w) => setTemp(w.tempC));
  }, []);

  return (
    <section className="relative flex min-h-[100svh] flex-col bg-char text-paper">
      <div className="mx-auto flex w-full max-w-[1200px] flex-1 flex-col px-5 pb-28 pt-24 md:pb-36 md:pt-28">
        <div className="flex items-start justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.14em] text-paper/90 md:text-xs">
          <span className={isOpen ? "text-leaf" : "text-paper"}>
            ● {openText}
          </span>
          <span>
            Fort St. James {temp !== null ? `${Math.round(temp)}°C` : "—°C"}
          </span>
        </div>

        <div className="relative mx-auto mt-10 flex flex-1 flex-col items-center justify-center text-center md:mt-6">
          <Steam className="absolute -top-2 left-1/2 h-14 w-12 -translate-x-1/2 text-paper/40" />
          <Logo variant="stacked" invert href={null} flicker className="scale-110 md:scale-125" />
        </div>

        <div className="mt-auto">
          <WaveText text={BUSINESS.tagline} />
          <p className="mt-4 text-center font-display text-sm uppercase tracking-brand md:text-base">
            Come in, we&apos;re open
          </p>
        </div>
      </div>
    </section>
  );
}
