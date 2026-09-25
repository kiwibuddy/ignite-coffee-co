"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PillButton } from "@/components/brand/PillButton";
import { Reveal, StaggerText } from "@/components/brand/Reveal";

const SLIDES = [
  { src: "/assets/img/photos/counter.jpg", caption: "Counter · ember wall" },
  { src: "/assets/img/photos/pastry-case.jpg", caption: "Pastry case · fresh today" },
  { src: "/assets/img/photos/bean-wall.jpg", caption: "Whole beans · take Ignite home" },
  { src: "/assets/img/photos/patio.jpg", caption: "Patio · come in, we're open" },
  { src: "/assets/img/photos/italian-sodas.jpg", caption: "Italian sodas · summer thirst" },
];

const STATEMENT =
  "IGNITE IS FOR EARLY STARTS, HOMEMADE BAKING, CATCH-UPS ON THE PATIO & CONVERSATIONS THAT OUTLAST THE COFFEE.";

/** Photo + statement side by side under the hero. */
export function StatementSplit() {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  const slide = SLIDES[i];

  return (
    <section className="bg-ember px-5 py-16 text-paper md:py-24">
      <div className="mx-auto grid max-w-[1200px] items-center gap-10 md:grid-cols-2 md:gap-14 lg:gap-20">
        <Reveal>
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden md:aspect-[5/6]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={slide.src}
                  className="absolute inset-0"
                  initial={reduce ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={reduce ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  <motion.div
                    className="relative h-full w-full"
                    animate={!reduce ? { scale: [1, 1.04] } : undefined}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  >
                    <Image
                      src={slide.src}
                      alt={slide.caption}
                      fill
                      className="object-cover"
                      sizes="(max-width:768px) 100vw, 50vw"
                      priority
                    />
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="mt-4 flex items-center justify-between gap-3">
              <p className="font-mono text-[11px] uppercase tracking-wide text-paper/75">
                {slide.caption}
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  aria-label="Previous photo"
                  className="flex h-10 w-10 items-center justify-center rounded-full border-[1.5px] border-paper text-paper"
                  onClick={() =>
                    setI((v) => (v - 1 + SLIDES.length) % SLIDES.length)
                  }
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  aria-label="Next photo"
                  className="flex h-10 w-10 items-center justify-center rounded-full border-[1.5px] border-paper text-paper"
                  onClick={() => setI((v) => (v + 1) % SLIDES.length)}
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="md:py-6">
            <h2 className="font-display text-[clamp(1.35rem,2.8vw,2.1rem)] uppercase leading-[1.2] tracking-[0.08em] text-paper">
              <StaggerText text={STATEMENT} />
            </h2>
            <div className="mt-10">
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
