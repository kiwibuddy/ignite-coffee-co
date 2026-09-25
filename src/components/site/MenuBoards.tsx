"use client";

import { MENU, CATS } from "@/data/menu";
import { Letterboard } from "@/components/brand/Letterboard";
import { Eyebrow, Reveal } from "@/components/brand/Reveal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const BOARD_CATS = CATS.filter(([id]) => id !== "beans");

export function MenuBoards() {
  return (
    <section id="menu" className="bg-ember px-5 py-20 md:py-28">
      <div className="mx-auto max-w-[1200px]">
        <Reveal className="text-center">
          <Eyebrow className="text-paper">On the boards</Eyebrow>
          <p className="mx-auto mt-3 max-w-lg text-paper/80">
            Prices from the in-store letterboards. Items marked * are estimates
            for Ignite to confirm.
          </p>
        </Reveal>

        <div className="mt-12 hidden gap-6 md:grid md:grid-cols-3">
          {BOARD_CATS.map(([id, label], i) => (
            <Letterboard
              key={id}
              title={label}
              items={MENU.filter((m) => m.cat === id)}
              className={i > 2 ? "md:col-span-1" : undefined}
            />
          ))}
        </div>

        <div className="mt-10 md:hidden">
          <Tabs defaultValue={BOARD_CATS[0][0]}>
            <TabsList className="flex h-auto w-full flex-wrap justify-start gap-1 bg-transparent p-0">
              {BOARD_CATS.map(([id, label]) => (
                <TabsTrigger key={id} value={id} className="data-[state=active]:bg-paper data-[state=active]:text-ember text-paper">
                  {label}
                </TabsTrigger>
              ))}
            </TabsList>
            {BOARD_CATS.map(([id, label]) => (
              <TabsContent key={id} value={id}>
                <Letterboard title={label} items={MENU.filter((m) => m.cat === id)} />
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
}
