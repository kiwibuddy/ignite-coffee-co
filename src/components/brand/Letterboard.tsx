"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { money } from "@/data/menu";
import type { MenuItem } from "@/data/menu";

type LetterboardProps = {
  title: string;
  items: MenuItem[];
  className?: string;
};

export function Letterboard({ title, items, className }: LetterboardProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={cn(
        "overflow-hidden rounded-[14px] border-[10px] border-pine bg-char shadow-[0_0_0_1px_rgba(0,0,0,0.2)]",
        className,
      )}
      initial={reduce ? false : { opacity: 0, y: 12 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="felt-board px-4 py-5 text-paper md:px-5 md:py-6">
        <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-pine">
          {title}
        </h3>
        <ul className="space-y-2.5">
          {items.map((item, i) => (
            <motion.li
              key={item.id}
              className="flex items-baseline justify-between gap-3 font-mono text-[11px] uppercase tracking-wide md:text-xs"
              initial={reduce ? false : { opacity: 0, x: -6 }}
              whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.03 * i, duration: 0.35 }}
            >
              <span className="min-w-0 truncate">
                {item.name}
                {item.tag ? ` ${item.tag}` : ""}
                {item.est ? " *" : ""}
              </span>
              <span className="shrink-0 text-steel">
                {typeof item.p === "number"
                  ? money(item.p)
                  : `${money(item.p[12])} / ${money(item.p[16])}`}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
