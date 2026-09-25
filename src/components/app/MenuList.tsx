"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronRight, Heart, Plus, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { CATS, MENU, byId, price, type MenuCategoryId } from "@/data/menu";
import { POSTS } from "@/data/posts";
import { useIgniteStore, type Order } from "@/lib/store";
import { cn } from "@/lib/utils";
import { linesSummary, orderDateLabel } from "./line-text";
import { OrderTracker } from "./OrderTracker";
import { SectionTitle, Thumb } from "./primitives";
import type { AppTab } from "./TabBar";

const CASE_POST = POSTS.find((p) => p.bake);

export function MenuList({
  activeOrder,
  onOpenItem,
  onGoTab,
}: {
  activeOrder: Order | null;
  onOpenItem: (itemId: string) => void;
  onGoTab: (tab: AppTab) => void;
}) {
  const favs = useIgniteStore((s) => s.favs);
  const orders = useIgniteStore((s) => s.orders);
  const addToCart = useIgniteStore((s) => s.addToCart);

  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const [activeCat, setActiveCat] = useState<MenuCategoryId>(CATS[0][0]);

  const recent = orders.filter((o) => o.id !== activeOrder?.id).slice(0, 4);

  const addLines = useCallback(
    (lines: Order["lines"], label: string) => {
      lines.forEach((line) =>
        addToCart({
          ...line,
          options: line.options ? { ...line.options } : {},
        }),
      );
      toast.success(`${label} added to your order`);
    },
    [addToCart],
  );

  useEffect(() => {
    const scroller = scrollRef.current;
    if (!scroller) return;

    const onScroll = () => {
      const top = scroller.scrollTop + 96;
      let current = CATS[0][0];
      for (const [id] of CATS) {
        const el = sectionRefs.current[id];
        if (el && el.offsetTop <= top) current = id;
      }
      setActiveCat(current);
    };

    onScroll();
    scroller.addEventListener("scroll", onScroll, { passive: true });
    return () => scroller.removeEventListener("scroll", onScroll);
  }, []);

  function jumpTo(cat: MenuCategoryId) {
    const scroller = scrollRef.current;
    const el = sectionRefs.current[cat];
    if (!scroller || !el) return;
    scroller.scrollTo({ top: Math.max(0, el.offsetTop - 52), behavior: "smooth" });
  }

  return (
    <div
      ref={scrollRef}
      className="h-full overflow-y-auto overscroll-contain scroll-smooth pb-28"
    >
      {activeOrder ? (
        <section className="px-4 pt-4">
          <button
            type="button"
            onClick={() => onGoTab("orders")}
            className="w-full space-y-2.5 rounded-[14px] border border-ember/40 bg-paper p-3 text-left"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="font-display text-[11px] uppercase tracking-brand text-ember">
                Order #{activeOrder.number} · in progress
              </span>
              <ChevronRight className="h-4 w-4 text-ember" />
            </div>
            <OrderTracker placedAt={activeOrder.placedAt} />
          </button>
        </section>
      ) : null}

      {favs.length > 0 ? (
        <section className="space-y-2.5 pt-4">
          <SectionTitle
            className="px-4"
            action={
              <button
                type="button"
                onClick={() => onGoTab("favs")}
                className="font-mono text-[10px] uppercase tracking-wide text-ember"
              >
                See all
              </button>
            }
          >
            Your favourites
          </SectionTitle>
          <div className="flex gap-2.5 overflow-x-auto px-4 pb-1">
            {favs.map((fav) => (
              <button
                key={fav.id}
                type="button"
                onClick={() => addLines(fav.lines, fav.name)}
                className="flex w-[168px] shrink-0 flex-col gap-1.5 rounded-[14px] border border-line bg-paper p-3 text-left"
              >
                <span className="inline-flex items-center gap-1.5 font-display text-[12px] uppercase tracking-brand text-char">
                  <Heart className="h-3 w-3 shrink-0 text-ember" />
                  <span className="truncate">{fav.name}</span>
                </span>
                <span className="line-clamp-2 font-mono text-[10px] uppercase tracking-wide text-ink-2">
                  {linesSummary(fav.lines)}
                </span>
                <span className="mt-0.5 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wide text-ember">
                  <Plus className="h-3 w-3" /> Add
                </span>
              </button>
            ))}
          </div>
        </section>
      ) : null}

      {recent.length > 0 ? (
        <section className="space-y-2.5 pt-4">
          <SectionTitle
            className="px-4"
            action={
              <button
                type="button"
                onClick={() => onGoTab("orders")}
                className="font-mono text-[10px] uppercase tracking-wide text-ember"
              >
                History
              </button>
            }
          >
            Order it again
          </SectionTitle>
          <div className="flex gap-2.5 overflow-x-auto px-4 pb-1">
            {recent.map((order) => (
              <button
                key={order.id}
                type="button"
                onClick={() => addLines(order.lines, `Order #${order.number}`)}
                className="flex w-[168px] shrink-0 flex-col gap-1.5 rounded-[14px] border border-line bg-paper p-3 text-left"
              >
                <span className="flex items-baseline justify-between gap-2">
                  <span className="font-display text-[12px] uppercase tracking-brand text-char">
                    #{order.number}
                  </span>
                  <span className="font-mono text-[10px] text-ink-2">
                    {orderDateLabel(order.placedAt)}
                  </span>
                </span>
                <span className="line-clamp-2 font-mono text-[10px] uppercase tracking-wide text-ink-2">
                  {linesSummary(order.lines)}
                </span>
                <span className="mt-0.5 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wide text-ember">
                  <RotateCcw className="h-3 w-3" /> Order again
                </span>
              </button>
            ))}
          </div>
        </section>
      ) : null}

      {CASE_POST?.bake ? (
        <section className="space-y-2.5 pt-4">
          <SectionTitle className="px-4">
            Fresh in the case · from Facebook
          </SectionTitle>
          <div className="mx-4 overflow-hidden rounded-[14px] border border-line bg-paper">
            {CASE_POST.img ? (
              <Image
                src={CASE_POST.img}
                alt=""
                width={780}
                height={440}
                className="h-32 w-full object-cover"
              />
            ) : null}
            <div className="space-y-1 p-3">
              <p className="font-mono text-[10px] uppercase tracking-wide text-ink-2">
                {CASE_POST.date}
              </p>
              <p className="text-xs leading-snug text-char">{CASE_POST.text}</p>
            </div>
            <div className="flex gap-2.5 overflow-x-auto border-t border-line p-3">
              {CASE_POST.bake.map((id) => {
                const item = byId(id);
                if (!item) return null;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => onOpenItem(id)}
                    className="flex w-[104px] shrink-0 flex-col gap-1.5 text-left"
                  >
                    <Thumb item={item} size={104} height={72} />
                    <span className="line-clamp-2 font-display text-[10px] uppercase leading-tight tracking-brand text-char">
                      {item.name}
                    </span>
                    <span className="font-mono text-[10px] text-ink-2">
                      {price(item)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      <div className="sticky top-0 z-20 mt-4 border-y border-line bg-crema/95">
        <div className="flex gap-1.5 overflow-x-auto px-4 py-2">
          {CATS.map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => jumpTo(id)}
              className={cn(
                "shrink-0 rounded-full px-3 py-1.5 font-mono text-[11px] uppercase tracking-wide transition-colors",
                activeCat === id
                  ? "bg-ember text-paper"
                  : "bg-paper text-ink-2 border border-line",
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {CATS.map(([cat, label]) => (
        <section
          key={cat}
          ref={(el) => {
            sectionRefs.current[cat] = el;
          }}
          className="space-y-2 px-4 pt-4"
        >
          <h2 className="font-display text-sm uppercase tracking-brand text-char">
            {label}
          </h2>
          <ul className="space-y-2">
            {MENU.filter((m) => m.cat === cat).map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => onOpenItem(item.id)}
                  className="flex w-full items-center gap-3 rounded-[14px] border border-line bg-paper p-2.5 text-left"
                >
                  <Thumb item={item} size={52} />
                  <span className="min-w-0 flex-1">
                    <span className="flex items-baseline gap-2">
                      <span className="truncate font-display text-[13px] uppercase tracking-brand text-char">
                        {item.name}
                      </span>
                      {item.tag ? (
                        <span className="shrink-0 font-mono text-[9px] uppercase tracking-wide text-ember">
                          {item.tag}
                        </span>
                      ) : null}
                    </span>
                    <span className="mt-0.5 block truncate text-[11px] text-ink-2">
                      {item.desc}
                    </span>
                  </span>
                  <span className="flex shrink-0 flex-col items-end gap-1.5">
                    <span className="font-mono text-[11px] text-char">
                      {price(item)}
                    </span>
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-ember text-paper">
                      <Plus className="h-3.5 w-3.5" />
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <p className="px-4 pb-4 pt-6 text-center font-mono text-[10px] uppercase tracking-wide text-ink-2">
        Prices in CAD · 5% GST added at checkout
      </p>
    </div>
  );
}
