import Link from "next/link";
import { cn } from "@/lib/utils";
import { Flame } from "./Flame";

type LogoProps = {
  variant?: "stacked" | "horizontal" | "mark";
  className?: string;
  href?: string | null;
  invert?: boolean;
  flicker?: boolean;
};

export function Logo({
  variant = "stacked",
  className,
  href = "/",
  invert = false,
  flicker = false,
}: LogoProps) {
  const color = invert ? "text-paper" : "text-char";
  const mark = (
    <Flame
      className={cn(
        variant === "mark" ? "h-8 w-auto" : "h-[23%] w-auto max-h-16",
        color,
      )}
      flicker={flicker}
    />
  );

  const wordmark =
    variant === "mark" ? null : (
      <div
        className={cn(
          "flex flex-col items-center leading-none",
          variant === "horizontal" && "items-start",
        )}
      >
        <span
          className={cn(
            "font-sans font-light uppercase tracking-ignite",
            invert ? "text-paper" : "text-char",
            variant === "horizontal" ? "text-xl" : "text-[clamp(1.75rem,5vw,4rem)]",
          )}
        >
          Ignite
        </span>
        <span
          className={cn(
            "font-display font-bold uppercase tracking-brand",
            invert ? "text-paper" : "text-char",
            variant === "horizontal" ? "text-sm" : "text-[clamp(0.75rem,2vw,1.25rem)]",
          )}
        >
          Coffee Co.
        </span>
      </div>
    );

  const content =
    variant === "horizontal" ? (
      <span className={cn("inline-flex items-center gap-3", className)}>
        <Flame className={cn("h-10 w-auto", color)} flicker={flicker} />
        {wordmark}
      </span>
    ) : variant === "mark" ? (
      <span className={cn("inline-flex", className)}>{mark}</span>
    ) : (
      <span
        className={cn(
          "inline-flex flex-col items-center gap-3",
          className,
        )}
      >
        {mark}
        {wordmark}
      </span>
    );

  if (href === null) return content;
  return (
    <Link href={href} className="inline-flex focus-visible:outline-none">
      {content}
    </Link>
  );
}
