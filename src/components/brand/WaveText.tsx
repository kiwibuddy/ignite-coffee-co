"use client";

import { useId } from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type WaveTextProps = {
  text: string;
  className?: string;
};

export function WaveText({ text, className }: WaveTextProps) {
  const id = useId().replace(/:/g, "");
  const pathId = `wave-${id}`;
  const reduce = useReducedMotion();
  const loop = `${text}   ·   ${text}   ·   ${text}   ·   ${text}   ·   `;

  return (
    <div className={cn("w-full overflow-hidden", className)} aria-hidden>
      <svg viewBox="0 0 1000 120" className="h-14 w-full md:h-[4.5rem]">
        <defs>
          <path
            id={pathId}
            d="M0,70 C150,20 350,120 500,70 C650,20 850,120 1000,70"
            fill="none"
          />
        </defs>
        <text
          fill="#FFFCF7"
          style={{
            fontFamily: "var(--font-cinzel), Georgia, serif",
            fontSize: 26,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          <textPath href={`#${pathId}`} startOffset="0%">
            {loop}
            {!reduce && (
              <animate
                attributeName="startOffset"
                from="0%"
                to="-50%"
                dur="32s"
                repeatCount="indefinite"
              />
            )}
          </textPath>
        </text>
      </svg>
    </div>
  );
}
