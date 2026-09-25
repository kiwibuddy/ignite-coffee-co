import { byId, type MenuItem } from "@/data/menu";

export const GST_RATE = 0.05;
export const MILK_ALT_UPCHARGE = 1.2;
export const FLAVOUR_UPCHARGE = 0.8;
export const WHIP_UPCHARGE = 0.75;
export const FOAM_UPCHARGE = 1.2;

export type DrinkSize = 12 | 16;

export type LineOptions = {
  size?: DrinkSize;
  milk?: string;
  flavours?: string[];
  whip?: boolean;
  foam?: boolean;
  decaf?: boolean;
  choc?: "white" | "dark";
  warm?: boolean;
  notes?: string;
};

export type CartLine = {
  itemId: string;
  qty: number;
  options?: LineOptions;
};

export type CartTotals = {
  subtotal: number;
  gst: number;
  tip: number;
  total: number;
  itemCount: number;
};

const DEFAULT_MILKS = new Set(["2%", "2 %", "whole", ""]);

function basePrice(item: MenuItem, size?: DrinkSize): number {
  if (typeof item.p === "number") return item.p;
  const s = size ?? 12;
  return item.p[s];
}

export function lineUnitPrice(
  itemId: string,
  options: LineOptions = {},
): number {
  const item = byId(itemId);
  if (!item) return 0;

  let unit = basePrice(item, options.size);

  if (
    item.milk &&
    options.milk &&
    !DEFAULT_MILKS.has(options.milk.trim().toLowerCase())
  ) {
    unit += MILK_ALT_UPCHARGE;
  }

  if (item.flav && options.flavours?.length) {
    unit += options.flavours.length * FLAVOUR_UPCHARGE;
  }

  if (item.whip && options.whip) {
    unit += WHIP_UPCHARGE;
  }

  if (item.foam && options.foam) {
    unit += FOAM_UPCHARGE;
  }

  return Math.round(unit * 100) / 100;
}

export function lineTotal(line: CartLine): number {
  return lineUnitPrice(line.itemId, line.options) * line.qty;
}

export function cartSubtotal(lines: CartLine[]): number {
  const sum = lines.reduce((t, l) => t + lineTotal(l), 0);
  return Math.round(sum * 100) / 100;
}

export function cartItemCount(lines: CartLine[]): number {
  return lines.reduce((t, l) => t + l.qty, 0);
}

export function cartGst(subtotal: number): number {
  return Math.round(subtotal * GST_RATE * 100) / 100;
}

export function cartTip(subtotal: number, tipPercent: number): number {
  return Math.round(subtotal * tipPercent * 100) / 100;
}

export function cartTotals(
  lines: CartLine[],
  tipPercent = 0,
): CartTotals {
  const subtotal = cartSubtotal(lines);
  const gst = cartGst(subtotal);
  const tip = cartTip(subtotal, tipPercent);
  const total = Math.round((subtotal + gst + tip) * 100) / 100;
  return {
    subtotal,
    gst,
    tip,
    total,
    itemCount: cartItemCount(lines),
  };
}

/** Drink lines that earn loyalty stamps (not baked goods or retail beans). */
export function stampEligibleDrinks(lines: CartLine[]): number {
  return lines.reduce((count, line) => {
    const item = byId(line.itemId);
    if (!item || item.bake || item.cat === "beans") return count;
    return count + line.qty;
  }, 0);
}
