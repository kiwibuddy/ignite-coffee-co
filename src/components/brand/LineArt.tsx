import { cn } from "@/lib/utils";

type LineArtProps = {
  kind?: "cup" | "bean" | "scone" | "bag" | "generic";
  className?: string;
};

export function LineArt({ kind = "cup", className }: LineArtProps) {
  const stroke = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.85,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden
      className={cn("h-10 w-10 text-ember", className)}
    >
      {kind === "cup" && (
        <>
          <path {...stroke} d="M18 22h22c2 0 4 2 4 4v14c0 6-5 10-11 10H25c-6 0-11-4-11-10V26c0-2 2-4 4-4z" />
          <path {...stroke} d="M44 28h4c3 0 5 2 5 5s-2 5-5 5h-4" />
          <path {...stroke} d="M26 14c0 3 2 5 2 8M32 12c0 4 2 6 2 10M38 14c0 3 2 5 2 8" />
        </>
      )}
      {kind === "bean" && (
        <path
          {...stroke}
          d="M22 18c8-8 22-6 26 8 4 14-6 26-18 26S14 40 16 28c1-5 3-8 6-10z M28 24c4 6 8 14 10 22"
        />
      )}
      {kind === "scone" && (
        <>
          <path {...stroke} d="M12 40c4-14 16-22 32-18 4 10 2 20-6 26H20c-4-2-8-4-8-8z" />
          <path {...stroke} d="M24 30h2M32 26h2M38 32h2" />
        </>
      )}
      {kind === "bag" && (
        <>
          <path {...stroke} d="M22 16h20l4 40H18l4-40z" />
          <path {...stroke} d="M26 16c0-4 3-7 6-7s6 3 6 7" />
          <circle {...stroke} cx="32" cy="36" r="6" />
        </>
      )}
      {kind === "generic" && (
        <circle {...stroke} cx="32" cy="32" r="14" />
      )}
    </svg>
  );
}
