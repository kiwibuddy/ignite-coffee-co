import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

type PillButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  variant?: "outline" | "solid" | "ghost" | "dark";
  size?: "sm" | "md" | "lg";
};

export function PillButton({
  className,
  asChild,
  variant = "outline",
  size = "md",
  ...props
}: PillButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(
        "inline-flex items-center justify-center rounded-full font-display uppercase tracking-[0.08em] transition-[transform,box-shadow,background-color,color] duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember disabled:opacity-50",
        size === "sm" && "px-4 py-2 text-xs",
        size === "md" && "px-6 py-3 text-sm",
        size === "lg" && "px-8 py-3.5 text-base",
        variant === "outline" &&
          "border-[1.5px] border-current bg-transparent text-ember shadow-[3px_3px_0_currentColor] hover:translate-x-px hover:translate-y-px hover:shadow-[2px_2px_0_currentColor] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none",
        variant === "solid" &&
          "border-[1.5px] border-ember bg-ember text-paper shadow-[3px_3px_0_#8F3312] hover:bg-ember-deep hover:translate-x-px hover:translate-y-px hover:shadow-[2px_2px_0_#8F3312] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none",
        variant === "dark" &&
          "border-[1.5px] border-paper bg-transparent text-paper shadow-[3px_3px_0_currentColor] hover:translate-x-px hover:translate-y-px hover:shadow-[2px_2px_0_currentColor]",
        variant === "ghost" && "border-0 bg-transparent text-ember shadow-none",
        className,
      )}
      {...props}
    />
  );
}
