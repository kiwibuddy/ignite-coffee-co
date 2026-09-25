import { describe, expect, it } from "vitest";
import {
  DAYS,
  HOURS,
  fmt,
  isOpenNow,
  notice,
  slotDays,
  slotsForDay,
  status,
} from "./hours";

describe("fmt", () => {
  it("formats morning and afternoon times", () => {
    expect(fmt(420)).toBe("7 AM");
    expect(fmt(435)).toBe("7:15 AM");
    expect(fmt(960)).toBe("4 PM");
  });
});

describe("status", () => {
  it("reports open during business hours on a weekday", () => {
    const d = new Date("2026-09-25T10:30:00");
    expect(d.getDay()).toBe(5);
    const s = status(d);
    expect(s.open).toBe(true);
    expect(s.text).toContain("Open now");
  });

  it("reports closed on Sunday", () => {
    const d = new Date("2026-09-27T11:00:00");
    expect(HOURS[d.getDay()]).toBeNull();
    const s = status(d);
    expect(s.open).toBe(false);
  });
});

describe("notice", () => {
  it("shows special hours within a week of the date", () => {
    const d = new Date("2026-09-28T12:00:00");
    expect(notice(d)).toContain("Truth and Reconciliation");
    expect(notice(d)).toContain(DAYS[3]);
  });
});

describe("pickup slots", () => {
  it("skips Sundays in slotDays", () => {
    const sunday = new Date("2026-09-27T08:00:00");
    const days = slotDays(sunday);
    expect(days.every(({ day }) => day.getDay() !== 0)).toBe(true);
    expect(days.length).toBeGreaterThan(0);
  });

  it("generates 15-minute slots from 7:15 to 3:45", () => {
    const monday = new Date("2026-09-28T06:00:00");
    const slots = slotsForDay(monday, monday);
    expect(slots.length).toBeGreaterThan(0);
    const first = slots[0].getHours() * 60 + slots[0].getMinutes();
    const last = slots[slots.length - 1].getHours() * 60 + slots[slots.length - 1].getMinutes();
    expect(first).toBe(7 * 60 + 15);
    expect(last).toBe(15 * 60 + 45);
    const step = slots[1].getTime() - slots[0].getTime();
    expect(step).toBe(15 * 60 * 1000);
  });

  it("isOpenNow respects the pre-close buffer", () => {
    const openMid = new Date("2026-09-25T10:00:00");
    const nearClose = new Date("2026-09-25T15:50:00");
    expect(isOpenNow(openMid)).toBe(true);
    expect(isOpenNow(nearClose)).toBe(false);
  });
});
