import { cn } from "@/lib/utils";

export function Input({
  className,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "flex h-11 w-full rounded-full border border-line bg-paper px-4 text-sm text-char placeholder:text-ink-2/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember",
        className,
      )}
      {...props}
    />
  );
}

export function Label({
  className,
  ...props
}: React.ComponentProps<"label">) {
  return (
    <label
      className={cn(
        "font-mono text-[11px] uppercase tracking-wide text-ink-2",
        className,
      )}
      {...props}
    />
  );
}

export function Separator({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return <div className={cn("h-px w-full bg-line", className)} {...props} />;
}

export function Badge({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-ember-tint px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-ember-deep",
        className,
      )}
      {...props}
    />
  );
}
