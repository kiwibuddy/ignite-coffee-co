import { cn } from "@/lib/utils";
import { FLAME_PATH } from "./flame-path";

type FlameProps = {
  className?: string;
  flicker?: boolean;
};

export function Flame({ className, flicker = false }: FlameProps) {
  return (
    <svg
      viewBox="0 0 407 608"
      aria-hidden
      className={cn(
        "inline-block",
        flicker && "motion-safe:animate-[ignite-flicker_2.4s_ease-in-out_infinite]",
        className,
      )}
    >
      <path fill="currentColor" d={FLAME_PATH} />
    </svg>
  );
}
