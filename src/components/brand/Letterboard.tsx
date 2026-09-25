"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { money } from "@/data/menu";
import type { MenuItem } from "@/data/menu";

export type LetterboardSection = {
  title: string;
  items: MenuItem[];
};

type LetterboardProps = {
  title: string;
  items?: MenuItem[];
  sections?: LetterboardSection[];
  className?: string;
};

function ItemRow({
  item,
  index,
  reduce,
}: {
  item: MenuItem;
  index: number;
  reduce: boolean | null;
}) {
  return (
    <motion.li
      className="flex items-baseline justify-between gap-3 font-mono text-[11px] uppercase tracking-wide md:text-xs"
      initial={reduce ? false : { opacity: 0, x: -6 }}
      whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.03 * index, duration: 0.35 }}
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
  );
}

export function Letterboard({
  title,
  items = [],
  sections,
  className,
}: LetterboardProps) {
  const reduce = useReducedMotion();
  const hasSections = Boolean(sections?.length);

  return (
    <motion.div
      className={cn(
        "flex h-full overflow-hidden rounded-[14px] border-[10px] border-pine bg-char shadow-[0_0_0_1px_rgba(0,0,0,0.2)]",
        className,
      )}
      initial={reduce ? false : { opacity: 0, y: 12 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="felt-board flex h-full min-h-0 w-full flex-col px-4 py-5 text-paper md:px-5 md:py-6">
        <h3 className="mb-4 shrink-0 font-mono text-xs uppercase tracking-[0.18em] text-pine">
          {title}
        </h3>

        {hasSections ? (
          <div className="flex flex-1 flex-col justify-between gap-8">
            {sections!.map((section) => (
              <div key={section.title} className="min-h-0">
                <h4 className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-pine/80">
                  {section.title}
                </h4>
                <ul className="space-y-2.5">
                  {section.items.map((item, i) => (
                    <ItemRow
                      key={item.id}
                      item={item}
                      index={i}
                      reduce={reduce}
                    />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <ul className="space-y-2.5">
            {items.map((item, i) => (
              <ItemRow key={item.id} item={item} index={i} reduce={reduce} />
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
}
