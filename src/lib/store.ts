import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { CartLine, LineOptions } from "@/lib/pricing";
import {
  cartSubtotal,
  cartTotals,
  stampEligibleDrinks,
} from "@/lib/pricing";

export type PickupState =
  | { mode: "asap" }
  | { mode: "scheduled"; time: string };

export type Profile = {
  name: string;
  phone: string;
  milk: string;
};

export type Favourite = {
  id: string;
  name: string;
  lines: CartLine[];
};

export type Order = {
  id: string;
  number: number;
  placedAt: string;
  pickupLabel: string;
  lines: CartLine[];
  subtotal: number;
  total: number;
  name: string;
};

type IgniteState = {
  cart: CartLine[];
  pickup: PickupState;
  profile: Profile;
  favs: Favourite[];
  orders: Order[];
  stamps: number;
  notify: boolean;
  seeded: boolean;
  addToCart: (line: CartLine) => void;
  updateQty: (index: number, qty: number) => void;
  removeLine: (index: number) => void;
  clearCart: () => void;
  setPickup: (pickup: PickupState) => void;
  setProfile: (profile: Partial<Profile>) => void;
  setNotify: (notify: boolean) => void;
  addFavourite: (fav: Favourite) => void;
  removeFavourite: (id: string) => void;
  placeOrder: (tipPercent?: number) => Order | null;
  seedDemo: () => void;
  resetDemo: () => void;
};

const STORAGE_KEY = "ignite-app-v1";

function lineKey(line: CartLine): string {
  return JSON.stringify([line.itemId, line.options ?? {}]);
}

function seedFavourites(): Favourite[] {
  return [
    {
      id: "fav-usual",
      name: "My usual",
      lines: [
        {
          itemId: "caramel-macchiato",
          qty: 1,
          options: { size: 16, milk: "Oat" },
        },
      ],
    },
    {
      id: "fav-friday",
      name: "Friday treat",
      lines: [
        {
          itemId: "butter-pecan",
          qty: 1,
          options: { size: 16, milk: "2%" },
        },
        { itemId: "scone-blueberry", qty: 1 },
      ],
    },
    {
      id: "fav-crew",
      name: "Crew coffee run",
      lines: [
        { itemId: "drip", qty: 3, options: { size: 16 } },
        { itemId: "americano", qty: 1, options: { size: 16 } },
        { itemId: "bun", qty: 2 },
      ],
    },
  ];
}

function seedOrders(): Order[] {
  return [
    {
      id: "ord-186",
      number: 186,
      placedAt: "2025-09-23T14:20:00.000Z",
      pickupLabel: "Sep 23 · 2:30 PM",
      name: "Alex",
      lines: [
        { itemId: "latte", qty: 1, options: { size: 16, milk: "Oat" } },
        { itemId: "muffin-pumpkin", qty: 1 },
      ],
      subtotal: 9.5,
      total: 9.98,
    },
    {
      id: "ord-171",
      number: 171,
      placedAt: "2025-09-19T16:05:00.000Z",
      pickupLabel: "Sep 19 · 4:15 PM",
      name: "Alex",
      lines: [
        { itemId: "i-mocha", qty: 1, options: { milk: "Oat", foam: true } },
        { itemId: "cookie", qty: 1 },
      ],
      subtotal: 8.35,
      total: 8.77,
    },
    {
      id: "ord-158",
      number: 158,
      placedAt: "2025-09-16T11:40:00.000Z",
      pickupLabel: "Sep 16 · 11:45 AM",
      name: "Alex",
      lines: [
        {
          itemId: "pumpkin-spice",
          qty: 1,
          options: { size: 16, milk: "Oat" },
        },
      ],
      subtotal: 7.85,
      total: 8.24,
    },
  ];
}

const initialProfile: Profile = {
  name: "Alex",
  phone: "250 555 0142",
  milk: "Oat",
};

export const useIgniteStore = create<IgniteState>()(
  persist(
    (set, get) => ({
      cart: [],
      pickup: { mode: "asap" },
      profile: { ...initialProfile },
      favs: [],
      orders: [],
      stamps: 7,
      notify: true,
      seeded: false,

      addToCart: (line) => {
        set((state) => {
          const key = lineKey(line);
          const cart = [...state.cart];
          const idx = cart.findIndex((c) => lineKey(c) === key);
          if (idx >= 0) {
            cart[idx] = { ...cart[idx], qty: cart[idx].qty + line.qty };
          } else {
            cart.push({ ...line, options: line.options ?? {} });
          }
          return { cart };
        });
      },

      updateQty: (index, qty) => {
        set((state) => {
          const cart = [...state.cart];
          if (index < 0 || index >= cart.length) return state;
          if (qty < 1) {
            cart.splice(index, 1);
          } else {
            cart[index] = { ...cart[index], qty };
          }
          return { cart };
        });
      },

      removeLine: (index) => {
        set((state) => ({
          cart: state.cart.filter((_, i) => i !== index),
        }));
      },

      clearCart: () => set({ cart: [] }),

      setPickup: (pickup) => set({ pickup }),

      setProfile: (profile) =>
        set((state) => ({
          profile: { ...state.profile, ...profile },
        })),

      setNotify: (notify) => set({ notify }),

      addFavourite: (fav) =>
        set((state) => ({
          favs: [...state.favs.filter((f) => f.id !== fav.id), fav],
        })),

      removeFavourite: (id) =>
        set((state) => ({
          favs: state.favs.filter((f) => f.id !== id),
        })),

      placeOrder: (tipPercent = 0) => {
        const state = get();
        if (!state.cart.length) return null;

        const totals = cartTotals(state.cart, tipPercent);
        const drinks = stampEligibleDrinks(state.cart);
        const orderNumber =
          (state.orders[0]?.number ?? 185) + Math.floor(Math.random() * 3) + 1;

        const order: Order = {
          id: `ord-${orderNumber}`,
          number: orderNumber,
          placedAt: new Date().toISOString(),
          pickupLabel:
            state.pickup.mode === "asap"
              ? "As soon as possible"
              : new Date(state.pickup.time).toLocaleString("en-CA", {
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                }),
          lines: state.cart.map((l) => ({
            ...l,
            options: l.options ? { ...l.options } : {},
          })),
          subtotal: totals.subtotal,
          total: totals.total,
          name: state.profile.name || "Guest",
        };

        set({
          orders: [order, ...state.orders].slice(0, 20),
          stamps: state.stamps + drinks,
          cart: [],
        });

        return order;
      },

      seedDemo: () => {
        if (get().seeded) return;
        set({
          profile: { ...initialProfile },
          favs: seedFavourites(),
          orders: seedOrders(),
          stamps: 7,
          notify: true,
          seeded: true,
        });
      },

      resetDemo: () =>
        set({
          cart: [],
          pickup: { mode: "asap" },
          profile: { name: "", phone: "", milk: "" },
          favs: [],
          orders: [],
          stamps: 0,
          notify: true,
          seeded: false,
        }),
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() =>
        typeof window !== "undefined"
          ? localStorage
          : {
              getItem: () => null,
              setItem: () => {},
              removeItem: () => {},
            },
      ),
      partialize: (state) => ({
        cart: state.cart,
        pickup: state.pickup,
        profile: state.profile,
        favs: state.favs,
        orders: state.orders,
        stamps: state.stamps,
        notify: state.notify,
        seeded: state.seeded,
      }),
      onRehydrateStorage: () => (state) => {
        state?.seedDemo();
      },
    },
  ),
);

/** Subtotal helper for UI without subscribing to the full store. */
export function cartSubtotalFromLines(lines: CartLine[]): number {
  return cartSubtotal(lines);
}

export type { CartLine, LineOptions };
