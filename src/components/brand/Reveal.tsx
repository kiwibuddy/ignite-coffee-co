"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.p
      className={cn(
        "font-display text-sm uppercase tracking-brand text-ember md:text-base",
        className,
      )}
      initial={reduce ? false : { opacity: 0, letterSpacing: "0.06em" }}
      whileInView={reduce ? undefined : { opacity: 1, letterSpacing: "0.1em" }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.p>
  );
}

export function StaggerText({
  text,
  lines,
  className,
}: {
  text?: string;
  /** Explicit lines — preferred for headlines so phrases wrap intentionally. */
  lines?: string[];
  className?: string;
}) {
  const reduce = useReducedMotion();
  const label = lines?.join(" ") ?? text ?? "";

  if (lines?.length) {
    if (reduce) {
      return (
        <span className={cn("flex flex-col items-center", className)}>
          {lines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </span>
      );
    }

    let wordIndex = 0;
    return (
      <span
        className={cn("flex flex-col items-center", className)}
        aria-label={label}
      >
        {lines.map((line) => {
          const words = line.trim().split(/\s+/);
          return (
            <span key={line} className="block" aria-hidden>
              {words.map((word, wi) => {
                const delay = 0.04 * wordIndex++;
                return (
                  <span key={`${line}-${word}-${wi}`}>
                    <motion.span
                      className="inline-block whitespace-nowrap"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay, duration: 0.35, ease: "easeOut" }}
                    >
                      {word}
                    </motion.span>
                    {wi < words.length - 1 ? " " : null}
                  </span>
                );
              })}
            </span>
          );
        })}
      </span>
    );
  }

  // Animate by word so flex wrap never splits CATCH-UPS / CONVERSATIONS mid-token.
  const words = (text ?? "").trim().split(/\s+/).filter(Boolean);
  if (reduce) return <span className={className}>{text}</span>;
  return (
    <span className={cn("inline", className)} aria-label={label}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          aria-hidden
          className="inline-block whitespace-nowrap"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.04 * i, duration: 0.35, ease: "easeOut" }}
        >
          {word}
          {i < words.length - 1 ? "\u00A0" : null}
        </motion.span>
      ))}
    </span>
  );
}
