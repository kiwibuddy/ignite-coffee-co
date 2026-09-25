/** Minutes from midnight. Sunday closed; Mon–Sat 7:00 AM – 4:00 PM. */
export const HOURS: Record<number, [number, number] | null> = {
  0: null,
  1: [420, 960],
  2: [420, 960],
  3: [420, 960],
  4: [420, 960],
  5: [420, 960],
  6: [420, 960],
};

export const SPECIAL: Record<string, string> = {
  "2026-09-30":
    "National Day for Truth and Reconciliation: hours may differ",
};

export const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

export type DaySlot = {
  day: Date;
  slots: Date[];
};

const SLOT_START = 7 * 60 + 15; // 7:15 AM
const SLOT_END = 15 * 60 + 45; // 3:45 PM
const SLOT_STEP = 15;

export function fmt(m: number): string {
  let h = Math.floor(m / 60);
  const mm = m % 60;
  const ap = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return h + (mm ? ":" + String(mm).padStart(2, "0") : "") + " " + ap;
}

export function mins(d: Date): number {
  return d.getHours() * 60 + d.getMinutes();
}

export function atMin(day: Date, m: number): Date {
  const x = new Date(day);
  x.setHours(Math.floor(m / 60), m % 60, 0, 0);
  return x;
}

export type StoreStatus = {
  open: boolean;
  text: string;
  short: string;
};

export function status(d: Date = new Date()): StoreStatus {
  const h = HOURS[d.getDay()];
  if (h && mins(d) >= h[0] && mins(d) < h[1]) {
    return {
      open: true,
      text: "Open now · until " + fmt(h[1]),
      short: "OPEN TODAY TIL " + fmt(h[1]).replace(" ", ""),
    };
  }
  for (let i = 0; i < 8; i++) {
    const x = new Date(d);
    x.setDate(d.getDate() + i);
    const hh = HOURS[x.getDay()];
    if (!hh || (i === 0 && mins(d) >= hh[0])) continue;
    const w =
      i === 0 ? "today" : i === 1 ? "tomorrow" : DAYS[x.getDay()];
    return {
      open: false,
      text: "Closed · opens " + w + " " + fmt(hh[0]),
      short: "OPENS " + w.toUpperCase() + " " + fmt(hh[0]).replace(" ", ""),
    };
  }
  return {
    open: false,
    text: "Closed",
    short: "CLOSED",
  };
}

export function notice(d: Date = new Date()): string {
  for (const k in SPECIAL) {
    const t = new Date(k + "T12:00");
    const diff = (t.getTime() - d.getTime()) / 864e5;
    if (diff > -1 && diff < 8) {
      return (
        DAYS[t.getDay()] +
        ", " +
        t.toLocaleDateString("en-CA", { month: "short", day: "numeric" }) +
        ": " +
        SPECIAL[k]
      );
    }
  }
  return "";
}

/** True when the shop is accepting pickup orders (15 min buffer before close). */
export function isOpenNow(n: Date = new Date()): boolean {
  const h = HOURS[n.getDay()];
  if (!h) return false;
  const m = mins(n);
  return m >= h[0] && m < h[1] - 15;
}

/** Pickup slot times for one calendar day (7:15 AM – 3:45 PM, every 15 min). */
export function slotsForDay(day: Date, now: Date = new Date()): Date[] {
  const hours = HOURS[day.getDay()];
  if (!hours) return [];

  const dayStart = new Date(day);
  dayStart.setHours(0, 0, 0, 0);
  const todayStart = new Date(now);
  todayStart.setHours(0, 0, 0, 0);
  const isToday = dayStart.getTime() === todayStart.getTime();

  const out: Date[] = [];
  for (let m = SLOT_START; m <= SLOT_END; m += SLOT_STEP) {
    if (m < hours[0] || m > hours[1] - 15) continue;
    if (isToday && m <= mins(now) + 15) continue;
    out.push(atMin(day, m));
  }
  return out;
}

/** Up to three upcoming days with pickup slots (Sundays skipped). */
export function slotDays(now: Date = new Date()): DaySlot[] {
  const out: DaySlot[] = [];
  const base = new Date(now);
  base.setHours(0, 0, 0, 0);

  for (let i = 0; i < 14 && out.length < 3; i++) {
    const day = new Date(base);
    day.setDate(base.getDate() + i);
    if (HOURS[day.getDay()] === null) continue;
    const slots = slotsForDay(day, now);
    if (slots.length) out.push({ day, slots });
  }
  return out;
}
