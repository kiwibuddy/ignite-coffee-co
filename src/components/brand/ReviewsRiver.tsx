"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { GOOGLE, REVIEWS } from "@/data/reviews";
import { Flame } from "@/components/brand/Flame";
import { Eyebrow, Reveal } from "@/components/brand/Reveal";
import { cn } from "@/lib/utils";

function MarqueeRow({
  items,
  reverse,
}: {
  items: string[];
  reverse?: boolean;
}) {
  const reduce = useReducedMotion();
  const doubled = [...items, ...items];
  if (reduce) {
    return (
      <div className="flex flex-wrap justify-center gap-3 py-2">
        {items.slice(0, 4).map((t) => (
          <span
            key={t}
            className="font-display text-sm uppercase tracking-brand text-paper/80"
          >
            ★ {t}
          </span>
        ))}
      </div>
    );
  }
  return (
    <div className="overflow-hidden py-2">
      <motion.div
        className="flex w-max gap-10 whitespace-nowrap"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: 40, ease: "linear", repeat: Infinity }}
      >
        {doubled.map((t, i) => (
          <span
            key={`${t}-${i}`}
            className="font-display text-sm uppercase tracking-brand text-paper/70"
          >
            ★ {t}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function ReviewsRiver({ className }: { className?: string }) {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setI((v) => (v + 1) % REVIEWS.length), 5200);
    return () => clearInterval(t);
  }, [reduce]);

  const review = REVIEWS[i];
  const shorts = REVIEWS.map((r) => `"${r.text.split(/[.!]/)[0]}" — ${r.name}`);

  return (
    <section
      id="reviews"
      className={cn(
        "relative overflow-hidden bg-ember py-20 text-paper md:py-28",
        className,
      )}
    >
      <div className="mx-auto max-w-[1200px] px-5 text-center">
        <Reveal>
          <Eyebrow className="text-paper">
            {GOOGLE.rating.toFixed(1)} on Google · {GOOGLE.count} reviews
          </Eyebrow>
        </Reveal>

        <div className="mt-8 space-y-1">
          <MarqueeRow items={shorts} />
          <MarqueeRow items={shorts.slice().reverse()} reverse />
        </div>

        <div className="relative mx-auto mt-12 max-w-2xl px-4">
          <Flame className="mx-auto mb-6 h-10 w-auto text-paper" flicker />
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={review.name + i}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.45 }}
              className="font-display text-xl leading-snug tracking-wide text-paper md:text-3xl md:leading-snug"
            >
              “{review.text}”
              <footer className="mt-6 font-mono text-xs uppercase tracking-[0.14em] text-paper/70">
                {review.name} · {review.stars}★ · {review.when} · Google
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <Reveal delay={0.15}>
          <div className="mt-12 flex flex-wrap justify-center gap-2">
            {GOOGLE.topics.map((topic) => (
              <span
                key={topic}
                className="rounded-full border border-paper/30 bg-char/20 px-4 py-1.5 font-mono text-[11px] uppercase tracking-wide text-paper"
              >
                {topic}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
