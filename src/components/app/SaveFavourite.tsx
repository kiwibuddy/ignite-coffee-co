"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { PillButton } from "@/components/brand/PillButton";
import { Input } from "@/components/ui/forms";
import type { CartLine } from "@/lib/pricing";
import { useIgniteStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function SaveFavourite({
  lines,
  defaultName,
  className,
}: {
  lines: CartLine[];
  defaultName: string;
  className?: string;
}) {
  const addFavourite = useIgniteStore((s) => s.addFavourite);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(defaultName);

  if (!lines.length) return null;

  function save() {
    const label = name.trim() || defaultName;
    addFavourite({
      id: `fav-${Date.now()}`,
      name: label,
      lines: lines.map((l) => ({
        ...l,
        options: l.options ? { ...l.options } : {},
      })),
    });
    setOpen(false);
    toast.success(`Saved “${label}” to favourites`);
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wide text-ember",
          className,
        )}
      >
        <Heart className="h-3.5 w-3.5" />
        Save as favourite
      </button>
    );
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Input
        autoFocus
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name this order"
        className="h-9 text-xs"
        onKeyDown={(e) => {
          if (e.key === "Enter") save();
          if (e.key === "Escape") setOpen(false);
        }}
      />
      <PillButton size="sm" variant="solid" onClick={save} className="shrink-0">
        Save
      </PillButton>
    </div>
  );
}
