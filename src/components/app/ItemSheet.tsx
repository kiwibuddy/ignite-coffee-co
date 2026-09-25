"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { PillButton } from "@/components/brand/PillButton";
import { LineArt } from "@/components/brand/LineArt";
import { Input } from "@/components/ui/forms";
import { byId, money, type MenuItem } from "@/data/menu";
import {
  FLAVOUR_UPCHARGE,
  FOAM_UPCHARGE,
  MILK_ALT_UPCHARGE,
  WHIP_UPCHARGE,
  lineUnitPrice,
  type DrinkSize,
  type LineOptions,
} from "@/lib/pricing";
import { useIgniteStore } from "@/lib/store";
import { AppSheet, SheetBody, SheetFooter } from "./AppSheet";
import { Chip, OptionGroup, Stepper, ToggleRow, artKind } from "./primitives";

const MILKS = ["Whole", "2%", "Oat", "Almond", "Soy"];
const DEFAULT_MILKS = new Set(["whole", "2%"]);
const FLAVOURS = [
  "Vanilla",
  "Caramel",
  "Hazelnut",
  "Coconut",
  "Butter Pecan",
  "Pumpkin Spice",
];

export function ItemSheet({
  itemId,
  onClose,
}: {
  itemId: string | null;
  onClose: () => void;
}) {
  const item = itemId ? byId(itemId) : undefined;

  return (
    <AppSheet
      open={Boolean(item)}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      title={item?.name ?? "Item"}
      eyebrow={item?.tag ?? "Make it yours"}
    >
      {item ? <ItemForm key={item.id} item={item} onDone={onClose} /> : null}
    </AppSheet>
  );
}

function ItemForm({ item, onDone }: { item: MenuItem; onDone: () => void }) {
  const addToCart = useIgniteStore((s) => s.addToCart);
  const usualMilk = useIgniteStore((s) => s.profile.milk);

  const sized = typeof item.p !== "number";
  const showDecaf = item.cat === "coffee" && item.id !== "drip";
  const showChoc = item.id.includes("mocha");

  const [size, setSize] = useState<DrinkSize>(12);
  const [milk, setMilk] = useState(() =>
    item.milk && usualMilk && MILKS.includes(usualMilk) ? usualMilk : "2%",
  );
  const [flavours, setFlavours] = useState<string[]>([]);
  const [whip, setWhip] = useState(false);
  const [foam, setFoam] = useState(false);
  const [decaf, setDecaf] = useState(false);
  const [choc, setChoc] = useState<"white" | "dark">("dark");
  const [warm, setWarm] = useState(false);
  const [notes, setNotes] = useState("");
  const [qty, setQty] = useState(1);

  const options = useMemo<LineOptions>(() => {
    const next: LineOptions = {};
    if (sized) next.size = size;
    if (item.milk) next.milk = milk;
    if (item.flav && flavours.length) next.flavours = flavours;
    if (item.whip && whip) next.whip = true;
    if (item.foam && foam) next.foam = true;
    if (showDecaf && decaf) next.decaf = true;
    if (showChoc) next.choc = choc;
    if (item.bake && warm) next.warm = true;
    if (notes.trim()) next.notes = notes.trim();
    return next;
  }, [
    sized,
    size,
    item.milk,
    item.flav,
    item.whip,
    item.foam,
    item.bake,
    milk,
    flavours,
    whip,
    foam,
    showDecaf,
    decaf,
    showChoc,
    choc,
    warm,
    notes,
  ]);

  const unit = lineUnitPrice(item.id, options);

  function toggleFlavour(flavour: string) {
    setFlavours((prev) =>
      prev.includes(flavour)
        ? prev.filter((f) => f !== flavour)
        : [...prev, flavour],
    );
  }

  function add() {
    addToCart({ itemId: item.id, qty, options });
    toast.success(`${qty}× ${item.name} added`);
    onDone();
  }

  return (
    <>
      <SheetBody className="space-y-5">
        <div className="-mx-4 overflow-hidden border-y border-line bg-ember-tint/50">
          {item.img ? (
            <Image
              src={item.img}
              alt={item.name}
              width={780}
              height={440}
              className="h-40 w-full object-cover"
              priority
            />
          ) : (
            <div className="grid h-28 w-full place-items-center">
              <LineArt kind={artKind(item)} className="h-14 w-14 text-ember" />
            </div>
          )}
        </div>

        <div className="space-y-1">
          <p className="text-sm text-ink-2">{item.desc}</p>
          <p className="font-mono text-xs text-char">
            {sized
              ? `${money((item.p as Record<DrinkSize, number>)[12])} / ${money(
                  (item.p as Record<DrinkSize, number>)[16],
                )}`
              : money(item.p as number)}
            {item.est ? (
              <span className="ml-2 text-ink-2/80">est. price</span>
            ) : null}
          </p>
        </div>

        {sized ? (
          <OptionGroup label="Size">
            {([12, 16] as DrinkSize[]).map((s) => (
              <Chip key={s} active={size === s} onClick={() => setSize(s)}>
                {s} oz · {money((item.p as Record<DrinkSize, number>)[s])}
              </Chip>
            ))}
          </OptionGroup>
        ) : null}

        {item.milk ? (
          <OptionGroup
            label="Milk"
            hint={`Alt milks +${money(MILK_ALT_UPCHARGE)}`}
          >
            {MILKS.map((m) => (
              <Chip key={m} active={milk === m} onClick={() => setMilk(m)}>
                {m}
                {DEFAULT_MILKS.has(m.toLowerCase()) ? "" : " +"}
              </Chip>
            ))}
          </OptionGroup>
        ) : null}

        {showChoc ? (
          <OptionGroup label="Chocolate">
            {(["dark", "white"] as const).map((c) => (
              <Chip key={c} active={choc === c} onClick={() => setChoc(c)}>
                {c === "dark" ? "Dark" : "White"}
              </Chip>
            ))}
          </OptionGroup>
        ) : null}

        {item.flav ? (
          <OptionGroup
            label="Flavours"
            hint={`+${money(FLAVOUR_UPCHARGE)} each`}
          >
            {FLAVOURS.map((f) => (
              <Chip
                key={f}
                active={flavours.includes(f)}
                onClick={() => toggleFlavour(f)}
              >
                {f}
              </Chip>
            ))}
          </OptionGroup>
        ) : null}

        {item.whip || item.foam || showDecaf || item.bake ? (
          <div className="space-y-2">
            {item.whip ? (
              <ToggleRow
                label="Whipped cream"
                hint={`+${money(WHIP_UPCHARGE)}`}
                checked={whip}
                onChange={setWhip}
              />
            ) : null}
            {item.foam ? (
              <ToggleRow
                label="Cold foam"
                hint={`+${money(FOAM_UPCHARGE)}`}
                checked={foam}
                onChange={setFoam}
              />
            ) : null}
            {showDecaf ? (
              <ToggleRow
                label="Make it decaf"
                hint="Same price"
                checked={decaf}
                onChange={setDecaf}
              />
            ) : null}
            {item.bake ? (
              <ToggleRow
                label="Warm it up"
                hint="Straight into the oven"
                checked={warm}
                onChange={setWarm}
              />
            ) : null}
          </div>
        ) : null}

        <div className="space-y-2">
          <span className="font-mono text-[11px] uppercase tracking-wide text-ink-2">
            Notes for the barista
          </span>
          <Input
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Extra hot, light ice, cut in half…"
            maxLength={120}
          />
        </div>
      </SheetBody>

      <SheetFooter>
        <div className="flex items-center justify-between gap-3">
          <Stepper qty={qty} onChange={(q) => setQty(Math.max(1, q))} />
          <span className="font-mono text-sm text-char">
            {money(unit * qty)}
          </span>
        </div>
        <PillButton variant="solid" className="w-full" onClick={add}>
          Add to order · {money(unit * qty)}
        </PillButton>
      </SheetFooter>
    </>
  );
}
