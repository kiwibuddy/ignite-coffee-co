import { describe, expect, it } from "vitest";
import {
  cartGst,
  cartTotals,
  lineUnitPrice,
  stampEligibleDrinks,
} from "./pricing";

describe("lineUnitPrice", () => {
  it("uses size-based base price for sized drinks", () => {
    expect(lineUnitPrice("latte", { size: 12 })).toBe(4.8);
    expect(lineUnitPrice("latte", { size: 16 })).toBe(5.5);
  });

  it("adds milk and flavour upcharges when the item supports them", () => {
    const unit = lineUnitPrice("latte", {
      size: 16,
      milk: "Oat",
      flavours: ["Vanilla", "Caramel"],
    });
    expect(unit).toBe(5.5 + 1.2 + 0.8 * 2);
  });

  it("adds whip and foam when the item supports them", () => {
    expect(
      lineUnitPrice("mocha", { size: 16, whip: true }),
    ).toBe(5.7 + 0.75);
    expect(lineUnitPrice("i-latte", { foam: true })).toBe(5.6 + 1.2);
  });

  it("does not charge alt milk on items without milk option", () => {
    expect(lineUnitPrice("cookie", { milk: "Oat" })).toBe(2.75);
  });
});

describe("cartTotals", () => {
  it("computes subtotal, GST, tip, and total", () => {
    const lines = [
      { itemId: "drip", qty: 2, options: { size: 16 as const } },
      { itemId: "cookie", qty: 1 },
    ];
    const { subtotal, gst, tip, total } = cartTotals(lines, 0.1);
    expect(subtotal).toBe(8.75);
    expect(gst).toBe(cartGst(subtotal));
    expect(tip).toBe(0.88);
    expect(total).toBe(10.07);
  });
});

describe("stampEligibleDrinks", () => {
  it("counts drinks but not baked goods or beans", () => {
    const lines = [
      { itemId: "latte", qty: 1, options: { size: 16 as const } },
      { itemId: "muffin-pumpkin", qty: 2 },
      { itemId: "bag-fireside", qty: 1 },
      { itemId: "americano", qty: 3, options: { size: 12 as const } },
    ];
    expect(stampEligibleDrinks(lines)).toBe(4);
  });
});
