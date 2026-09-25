import { byId } from "@/data/menu";
import { fmt, mins } from "@/lib/hours";
import type { CartLine, LineOptions } from "@/lib/pricing";
import type { PickupState } from "@/lib/store";

/** "16 oz · Oat · Vanilla · Whip" — everything except free-text notes. */
export function optionSummary(options: LineOptions = {}): string {
  const bits: string[] = [];
  if (options.size) bits.push(`${options.size} oz`);
  if (options.milk) bits.push(options.milk);
  if (options.decaf) bits.push("Decaf");
  if (options.choc) bits.push(options.choc === "white" ? "White choc" : "Dark choc");
  if (options.flavours?.length) bits.push(...options.flavours);
  if (options.whip) bits.push("Whip");
  if (options.foam) bits.push("Cold foam");
  if (options.warm) bits.push("Warmed");
  return bits.join(" · ");
}

export function lineName(line: CartLine): string {
  return byId(line.itemId)?.name ?? "Item";
}

/** "1× Café Latte, 2× Cinnamon Bun" */
export function linesSummary(lines: CartLine[]): string {
  return lines.map((l) => `${l.qty}× ${lineName(l)}`).join(", ");
}

export function dayLabel(d: Date, now: Date = new Date()): string {
  const a = new Date(d);
  a.setHours(0, 0, 0, 0);
  const b = new Date(now);
  b.setHours(0, 0, 0, 0);
  const diff = Math.round((a.getTime() - b.getTime()) / 864e5);
  if (diff === 0) return "Today";
  if (diff === 1) return "Tomorrow";
  return d.toLocaleDateString("en-CA", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function slotLabel(d: Date, now: Date = new Date()): string {
  return `${dayLabel(d, now)} ${fmt(mins(d))}`;
}

export function pickupLabel(pickup: PickupState): string {
  if (pickup.mode === "asap") return "ASAP · about 10 min";
  return slotLabel(new Date(pickup.time));
}

/** Short form for the header chip. */
export function pickupChipLabel(pickup: PickupState): string {
  if (pickup.mode === "asap") return "Pickup ASAP · ~10 min";
  return `Pickup ${slotLabel(new Date(pickup.time))}`;
}

export function orderDateLabel(placedAt: string): string {
  return new Date(placedAt).toLocaleDateString("en-CA", {
    month: "short",
    day: "numeric",
  });
}
