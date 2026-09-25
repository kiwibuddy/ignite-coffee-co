"use client";

import { useState } from "react";
import { Check, Heart, Pencil, Plus, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { PillButton } from "@/components/brand/PillButton";
import { Input } from "@/components/ui/forms";
import { money } from "@/data/menu";
import { cartSubtotal } from "@/lib/pricing";
import { useIgniteStore, type Favourite } from "@/lib/store";
import { linesSummary } from "./line-text";
import { EmptyState } from "./primitives";
import type { AppTab } from "./TabBar";

export function FavouritesTab({
  onGoTab,
  onOpenCart,
}: {
  onGoTab: (tab: AppTab) => void;
  onOpenCart: () => void;
}) {
  const favs = useIgniteStore((s) => s.favs);
  const addToCart = useIgniteStore((s) => s.addToCart);
  const addFavourite = useIgniteStore((s) => s.addFavourite);
  const removeFavourite = useIgniteStore((s) => s.removeFavourite);
  const [renaming, setRenaming] = useState<string | null>(null);
  const [draft, setDraft] = useState("");

  function add(fav: Favourite) {
    fav.lines.forEach((line) =>
      addToCart({
        ...line,
        options: line.options ? { ...line.options } : {},
      }),
    );
    toast.success(`${fav.name} added to your order`);
    onOpenCart();
  }

  function commitRename(fav: Favourite) {
    const name = draft.trim();
    if (name) addFavourite({ ...fav, name });
    setRenaming(null);
  }

  return (
    <div className="h-full space-y-3 overflow-y-auto overscroll-contain px-4 pb-28 pt-4">
      <h2 className="font-display text-sm uppercase tracking-brand text-char">
        Favourites
      </h2>

      {favs.length === 0 ? (
        <EmptyState
          title="No favourites yet"
          body="Build an order, then tap “Save as favourite” to reorder it in one tap."
          action={
            <PillButton size="sm" onClick={() => onGoTab("order")}>
              Browse the menu
            </PillButton>
          }
        />
      ) : (
        <ul className="space-y-2">
          {favs.map((fav) => (
            <li
              key={fav.id}
              className="space-y-2.5 rounded-[14px] border border-line bg-paper p-3"
            >
              {renaming === fav.id ? (
                <div className="flex items-center gap-2">
                  <Input
                    autoFocus
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") commitRename(fav);
                      if (e.key === "Escape") setRenaming(null);
                    }}
                    className="h-9 text-xs"
                  />
                  <button
                    type="button"
                    aria-label="Save name"
                    onClick={() => commitRename(fav)}
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ember text-paper"
                  >
                    <Check className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    aria-label="Cancel"
                    onClick={() => setRenaming(null)}
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line text-ink-2"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="inline-flex items-center gap-1.5 font-display text-[13px] uppercase tracking-brand text-char">
                      <Heart className="h-3 w-3 shrink-0 text-ember" />
                      {fav.name}
                    </p>
                    <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wide text-ink-2">
                      {linesSummary(fav.lines)}
                    </p>
                  </div>
                  <span className="shrink-0 font-mono text-xs text-char">
                    {money(cartSubtotal(fav.lines))}
                  </span>
                </div>
              )}

              <div className="flex items-center gap-2">
                <PillButton
                  size="sm"
                  variant="solid"
                  onClick={() => add(fav)}
                  className="gap-1.5"
                >
                  <Plus className="h-3 w-3" /> Add
                </PillButton>
                <button
                  type="button"
                  onClick={() => {
                    setRenaming(fav.id);
                    setDraft(fav.name);
                  }}
                  className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wide text-ink-2"
                >
                  <Pencil className="h-3 w-3" /> Rename
                </button>
                <button
                  type="button"
                  onClick={() => {
                    removeFavourite(fav.id);
                    toast(`${fav.name} removed`);
                  }}
                  className="ml-auto inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wide text-ink-2"
                >
                  <Trash2 className="h-3 w-3" /> Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
