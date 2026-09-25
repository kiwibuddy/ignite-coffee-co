"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PillButton } from "@/components/brand/PillButton";
import { Reveal, StaggerText } from "@/components/brand/Reveal";

const SLIDES = [
  { src: "/assets/img/photos/counter.jpg", alt: "Counter and ember wall" },
  { src: "/assets/img/photos/pastry-case.jpg", alt: "Pastry case, fresh today" },
  { src: "/assets/img/photos/bean-wall.jpg", alt: "Whole beans to take Ignite home" },
  { src: "/assets/img/photos/patio.jpg", alt: "Patio seating" },
  { src: "/assets/img/photos/italian-sodas.jpg", alt: "Italian sodas" },
];

const STATEMENT_LINES = [
  "IGNITE IS FOR EARLY STARTS,",
  "HOMEMADE BAKING,",
  "CATCH-UPS ON THE PATIO &",
  "CONVERSATIONS THAT OUTLAST THE COFFEE.",
];

const AUTOPLAY_MS = 4500;

/** Photo + statement side by side under the hero. */
export function StatementSplit() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const slide = SLIDES[i];

  useEffect(() => {
    if (reduce || paused) return;
    const id = window.setInterval(() => {
      setI((v) => (v + 1) % SLIDES.length);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [reduce, paused, i]);

  const goPrev = () =>
    setI((v) => (v - 1 + SLIDES.length) % SLIDES.length);
  const goNext = () => setI((v) => (v + 1) % SLIDES.length);

  return (
    <section className="bg-ember px-5 py-16 text-paper md:py-24">
      <div className="mx-auto grid max-w-[1200px] items-center gap-10 md:grid-cols-2 md:gap-14 lg:gap-20">
        <Reveal>
          <div
            className="relative"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="relative aspect-[4/5] overflow-hidden md:aspect-[5/6]">
              <AnimatePresence mode="sync">
                <motion.div
                  key={slide.src}
                  className="absolute inset-0"
                  initial={reduce ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={reduce ? undefined : { opacity: 0 }}
                  transition={{ duration: reduce ? 0 : 0.7, ease: "easeInOut" }}
                >
                  <motion.div
                    className="relative h-full w-full"
                    animate={
                      !reduce ? { scale: [1, 1.04] } : undefined
                    }
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  >
                    <Image
                      src={slide.src}
                      alt={slide.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width:768px) 100vw, 50vw"
                      priority={i === 0}
                    />
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="mt-4 flex items-center justify-end gap-2">
              <button
                type="button"
                aria-label="Previous photo"
                className="flex h-10 w-10 items-center justify-center rounded-full border-[1.5px] border-paper text-paper"
                onClick={goPrev}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Next photo"
                className="flex h-10 w-10 items-center justify-center rounded-full border-[1.5px] border-paper text-paper"
                onClick={goNext}
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="text-center md:py-6">
            <h2 className="font-display text-[clamp(1.55rem,3.2vw,2.45rem)] uppercase leading-[1.25] tracking-[0.08em] text-paper">
              <StaggerText lines={STATEMENT_LINES} />
            </h2>
            <div className="mt-10 flex justify-center">
              <PillButton asChild variant="dark">
                <Link href="#menu">See the menu</Link>
              </PillButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
