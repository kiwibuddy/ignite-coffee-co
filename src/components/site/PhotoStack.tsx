"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const SLIDES = [
  { src: "/assets/img/photos/counter.jpg", caption: "Counter · ember wall" },
  { src: "/assets/img/photos/pastry-case.jpg", caption: "Pastry case · fresh today" },
  { src: "/assets/img/photos/bean-wall.jpg", caption: "Whole beans · take Ignite home" },
  { src: "/assets/img/photos/patio.jpg", caption: "Patio · come in, we're open" },
  { src: "/assets/img/photos/italian-sodas.jpg", caption: "Italian sodas · summer thirst" },
];

export function PhotoStack({ className }: { className?: string }) {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();

  return (
    <div className={cn("relative mx-auto max-w-3xl px-5", className)}>
      <div className="relative mx-auto aspect-[4/3] max-w-xl">
        {SLIDES.map((slide, idx) => {
          const offset = (idx - i + SLIDES.length) % SLIDES.length;
          if (offset > 2) return null;
          return (
            <motion.div
              key={slide.src}
              className="absolute inset-0 overflow-hidden rounded-[14px] border border-line bg-paper"
              style={{ zIndex: 10 - offset }}
              animate={
                reduce
                  ? { opacity: offset === 0 ? 1 : 0 }
                  : {
                      rotate: offset === 0 ? 0 : offset === 1 ? -4 : 5,
                      y: offset * 10,
                      scale: 1 - offset * 0.04,
                      opacity: 1,
                    }
              }
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
            >
              <motion.div
                className="relative h-full w-full"
                animate={
                  !reduce && offset === 0
                    ? { scale: [1, 1.04] }
                    : { scale: 1 }
                }
                transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
              >
                <Image
                  src={slide.src}
                  alt={slide.caption}
                  fill
                  className="object-cover"
                  sizes="(max-width:768px) 90vw, 560px"
                  priority={idx === 0}
                />
              </motion.div>
            </motion.div>
          );
        })}
      </div>
      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          aria-label="Previous"
          className="flex h-11 w-11 items-center justify-center rounded-full border-[1.5px] border-ember text-ember"
          onClick={() => setI((v) => (v - 1 + SLIDES.length) % SLIDES.length)}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <AnimatePresence mode="wait">
          <motion.p
            key={SLIDES[i].caption}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-w-[12rem] text-center font-mono text-xs uppercase tracking-wide text-ink-2"
          >
            {SLIDES[i].caption}
          </motion.p>
        </AnimatePresence>
        <button
          type="button"
          aria-label="Next"
          className="flex h-11 w-11 items-center justify-center rounded-full border-[1.5px] border-ember text-ember"
          onClick={() => setI((v) => (v + 1) % SLIDES.length)}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
