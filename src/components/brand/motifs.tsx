"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export function Steam({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    <svg
      viewBox="0 0 40 48"
      className={cn("pointer-events-none h-12 w-10 text-steel/50", className)}
      aria-hidden
    >
      {[10, 20, 30].map((x, i) => (
        <motion.path
          key={x}
          d={`M${x} 40 C${x - 4} 28 ${x + 4} 22 ${x} 10`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1, 0], opacity: [0, 0.7, 0], y: [4, -6] }}
          transition={{
            duration: 2.4,
            delay: i * 0.35,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </svg>
  );
}

export function CoffeeRing({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={cn("pointer-events-none text-ember/25", className)}
      aria-hidden
    >
      <ellipse
        cx="60"
        cy="60"
        rx="46"
        ry="44"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <ellipse
        cx="62"
        cy="58"
        rx="38"
        ry="36"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.6"
      />
    </svg>
  );
}
