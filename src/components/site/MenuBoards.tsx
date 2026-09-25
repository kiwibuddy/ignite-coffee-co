"use client";

import { MENU } from "@/data/menu";
import type { MenuCategoryId, MenuItem } from "@/data/menu";
import { Letterboard } from "@/components/brand/Letterboard";
import { Eyebrow, Reveal } from "@/components/brand/Reveal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Board = {
  id: string;
  title: string;
  items: MenuItem[];
};

function itemsFor(...cats: MenuCategoryId[]) {
  return cats.flatMap((cat) => MENU.filter((m) => m.cat === cat));
}

const BOARDS: Board[] = [
  { id: "iced", title: "Iced", items: itemsFor("iced") },
  { id: "coffee", title: "Coffee", items: itemsFor("coffee") },
  {
    id: "specials",
    title: "Specials",
    items: itemsFor("tea", "new", "fall"),
  },
  { id: "eats", title: "Eats", items: itemsFor("eats") },
];

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

        <div className="mt-12 hidden gap-6 md:grid md:grid-cols-2">
          {BOARDS.map((board) => (
            <Letterboard
              key={board.id}
              title={board.title}
              items={board.items}
            />
          ))}
        </div>

        <div className="mt-10 md:hidden">
          <Tabs defaultValue={BOARDS[0].id}>
            <TabsList className="flex h-auto w-full flex-wrap justify-start gap-1 bg-transparent p-0">
              {BOARDS.map((board) => (
                <TabsTrigger
                  key={board.id}
                  value={board.id}
                  className="data-[state=active]:bg-paper data-[state=active]:text-ember text-paper"
                >
                  {board.title}
                </TabsTrigger>
              ))}
            </TabsList>
            {BOARDS.map((board) => (
              <TabsContent key={board.id} value={board.id}>
                <Letterboard title={board.title} items={board.items} />
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
}
