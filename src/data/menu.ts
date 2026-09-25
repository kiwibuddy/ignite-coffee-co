const I = "/assets/img/items/";
const P = "/assets/img/photos/";

export type MenuCategoryId =
  | "fall"
  | "new"
  | "coffee"
  | "iced"
  | "tea"
  | "eats"
  | "beans";

export type MenuItem = {
  id: string;
  cat: MenuCategoryId;
  name: string;
  desc: string;
  p: number | Record<12 | 16, number>;
  est?: boolean;
  img?: string;
  milk?: boolean;
  flav?: boolean;
  whip?: boolean;
  foam?: boolean;
  bake?: boolean;
  tag?: string;
};

export const CATS: [MenuCategoryId, string][] = [
  ["fall", "Fall"],
  ["new", "New"],
  ["coffee", "Coffee"],
  ["iced", "Iced"],
  ["tea", "Tea & More"],
  ["eats", "Eats"],
  ["beans", "Beans"],
];

export const MENU: MenuItem[] = [
  {
    id: "butter-pecan",
    cat: "fall",
    name: "Cozy Butter Pecan",
    desc: "Butter pecan latte, whipped cream, caramel drizzle, chopped pecans.",
    p: { 12: 5.95, 16: 6.65 },
    est: true,
    img: `${I}butter-pecan.jpg`,
    milk: true,
  },
  {
    id: "pumpkin-spice",
    cat: "fall",
    name: "Pumpkin Spice",
    desc: "Pumpkin spice latte under whipped cream and cinnamon.",
    p: { 12: 5.95, 16: 6.65 },
    est: true,
    img: `${I}pumpkin-spice.jpg`,
    milk: true,
  },
  {
    id: "frappe",
    cat: "new",
    name: "Frappe",
    desc: "Blended and iced, whipped cream and chocolate drizzle.",
    p: 6.5,
    img: `${I}frappe.jpg`,
    flav: true,
  },
  {
    id: "affogato",
    cat: "new",
    name: "Affogato",
    desc: "Ice cream drowned in a shot of espresso.",
    p: 5.2,
  },
  {
    id: "drip",
    cat: "coffee",
    name: "Drip",
    desc: "Brewed fresh all morning.",
    p: { 12: 2.8, 16: 3 },
    flav: true,
  },
  {
    id: "americano",
    cat: "coffee",
    name: "Americano",
    desc: "Espresso and hot water.",
    p: { 12: 3.8, 16: 4.1 },
    flav: true,
  },
  {
    id: "latte",
    cat: "coffee",
    name: "Café Latte",
    desc: "Espresso and steamed milk.",
    p: { 12: 4.8, 16: 5.5 },
    milk: true,
    flav: true,
  },
  {
    id: "sa-latte",
    cat: "coffee",
    name: "South African Style Latte",
    desc: "House specialty: the café latte, South African style.",
    p: { 12: 4.95, 16: 5.65 },
    milk: true,
  },
  {
    id: "flat-white",
    cat: "coffee",
    name: "Flat White",
    desc: "8 oz, silky and strong.",
    p: 4.2,
    milk: true,
  },
  {
    id: "mocha",
    cat: "coffee",
    name: "Mocha",
    desc: "White or dark chocolate.",
    p: { 12: 4.8, 16: 5.7 },
    milk: true,
    whip: true,
  },
  {
    id: "caramel-macchiato",
    cat: "coffee",
    name: "Caramel Macchiato",
    desc: "A crowd favourite on the board.",
    p: { 12: 4.8, 16: 5.7 },
    milk: true,
    tag: "♥ Favourite",
  },
  {
    id: "cappuccino",
    cat: "coffee",
    name: "Cappuccino",
    desc: "Espresso, milk, deep foam.",
    p: { 12: 4.6, 16: 5.5 },
    milk: true,
  },
  {
    id: "cortado",
    cat: "coffee",
    name: "Cortado",
    desc: "6 oz, equal espresso and milk.",
    p: 4.2,
    milk: true,
  },
  {
    id: "espresso",
    cat: "coffee",
    name: "Espresso",
    desc: "4 oz. Decaf available.",
    p: 1.6,
  },
  {
    id: "i-americano",
    cat: "iced",
    name: "Iced Americano",
    desc: "16 oz over ice.",
    p: 4.2,
    foam: true,
    flav: true,
  },
  {
    id: "i-caramel",
    cat: "iced",
    name: "Iced Caramel Macchiato",
    desc: "16 oz over ice.",
    p: 5.7,
    milk: true,
    foam: true,
  },
  {
    id: "i-mocha",
    cat: "iced",
    name: "Iced Mocha",
    desc: "16 oz over ice.",
    p: 5.6,
    milk: true,
    foam: true,
    whip: true,
  },
  {
    id: "i-latte",
    cat: "iced",
    name: "Iced Café Latte",
    desc: "16 oz over ice.",
    p: 5.6,
    milk: true,
    foam: true,
    flav: true,
  },
  {
    id: "i-matcha",
    cat: "iced",
    name: "Iced Matcha",
    desc: "16 oz over ice.",
    p: 6.2,
    milk: true,
    foam: true,
  },
  {
    id: "i-chai",
    cat: "iced",
    name: "Iced Chai",
    desc: "16 oz over ice.",
    p: 5.65,
    milk: true,
    foam: true,
  },
  {
    id: "i-fog",
    cat: "iced",
    name: "Iced London Fog",
    desc: "16 oz over ice.",
    p: 5.65,
    milk: true,
    foam: true,
  },
  {
    id: "i-tea",
    cat: "iced",
    name: "Iced Tea",
    desc: "16 oz.",
    p: 3.6,
  },
  {
    id: "soda",
    cat: "iced",
    name: "Italian Soda",
    desc: "Pick a flavour, 16 oz.",
    p: 3.65,
    flav: true,
  },
  {
    id: "chai",
    cat: "tea",
    name: "Chai Latte",
    desc: "Spiced chai, steamed milk.",
    p: 4.95,
    est: true,
    milk: true,
  },
  {
    id: "fog",
    cat: "tea",
    name: "London Fog",
    desc: "Earl Grey, vanilla, steamed milk.",
    p: 4.95,
    est: true,
    milk: true,
  },
  {
    id: "matcha",
    cat: "tea",
    name: "Matcha Latte",
    desc: "Green tea and steamed milk.",
    p: 5.45,
    est: true,
    milk: true,
  },
  {
    id: "hot-choc",
    cat: "tea",
    name: "Hot Chocolate",
    desc: "With whipped cream if you like.",
    p: 3.95,
    est: true,
    whip: true,
  },
  {
    id: "muffin-pumpkin",
    cat: "eats",
    name: "Pumpkin Cream Cheese Muffin",
    desc: "Homemade, in the case today.",
    p: 4,
    img: `${I}muffin-pumpkin.jpg`,
    bake: true,
  },
  {
    id: "muffin-double-choc",
    cat: "eats",
    name: "Double Chocolate Muffin",
    desc: "Dark cocoa with chocolate chunks.",
    p: 3.5,
    img: `${I}muffin-double-choc.jpg`,
    bake: true,
  },
  {
    id: "scone-blueberry",
    cat: "eats",
    name: "Blueberry Scone",
    desc: "Glazed, homemade.",
    p: 4,
    img: `${I}scone-case.jpg`,
    bake: true,
  },
  {
    id: "scone-cranberry",
    cat: "eats",
    name: "Cranberry White Chocolate Scone",
    desc: "Tart cranberries and sweet white chocolate.",
    p: 4,
    img: `${I}scone-cranberry-whitechoc.jpg`,
    bake: true,
  },
  {
    id: "scone-sca",
    cat: "eats",
    name: "Salted Caramel Apple Scone",
    desc: "Homemade.",
    p: 4,
    img: `${I}scone-blueberry.jpg`,
    bake: true,
  },
  {
    id: "scone-cherry",
    cat: "eats",
    name: "Cherry Almond Scone",
    desc: "Homemade.",
    p: 4,
    img: `${I}scone-strawberry-rhubarb.jpg`,
    bake: true,
  },
  {
    id: "danish-leek",
    cat: "eats",
    name: "Parmesan Leek Danish",
    desc: "Savoury, flaky.",
    p: 4.5,
    est: true,
    img: `${I}danish-parmesan-leek.jpg`,
    bake: true,
  },
  {
    id: "danish-cherry",
    cat: "eats",
    name: "Cherry Cheese Danish",
    desc: "Sweet, flaky.",
    p: 4.5,
    est: true,
    img: `${I}danish-cherry-cheese.jpg`,
    bake: true,
  },
  {
    id: "wrap",
    cat: "eats",
    name: "Breakfast Wrap",
    desc: "Warmed to order.",
    p: 6.95,
    img: `${I}breakfast-wrap.jpg`,
    bake: true,
  },
  {
    id: "turnover",
    cat: "eats",
    name: "Turnover",
    desc: "Flaky pastry, fruit filling.",
    p: 4.25,
    est: true,
    img: `${I}turnover.jpg`,
    bake: true,
  },
  {
    id: "egg-bites-bacon",
    cat: "eats",
    name: "Bacon & Cheese Egg Bites",
    desc: "Savory egg bites, warmed to order.",
    p: 5.5,
    est: true,
    img: `${I}egg-bites.jpg`,
    bake: true,
  },
  {
    id: "egg-bites-veggie",
    cat: "eats",
    name: "Veggie Egg Bites",
    desc: "Savory egg bites with vegetables.",
    p: 5.5,
    est: true,
    img: `${I}egg-bites.jpg`,
    bake: true,
  },
  {
    id: "bun",
    cat: "eats",
    name: "Cinnamon Bun",
    desc: "Homemade.",
    p: 3.5,
    bake: true,
  },
  {
    id: "cookie",
    cat: "eats",
    name: "Cookie",
    desc: "Ask what came out of the oven.",
    p: 2.75,
    bake: true,
  },
  {
    id: "square",
    cat: "eats",
    name: "Dessert Square",
    desc: "Assorted, from 3.65.",
    p: 3.65,
    bake: true,
  },
  {
    id: "bag-fireside",
    cat: "beans",
    name: "Fireside Roast",
    desc: "Medium roast · whole beans · 400 g",
    p: 22,
    est: true,
    img: `${I}bag-fireside.jpg`,
  },
  {
    id: "bag-refined",
    cat: "beans",
    name: "Refined Roast",
    desc: "Espresso roast · whole beans · 400 g",
    p: 22,
    est: true,
    img: `${I}bag-refined.jpg`,
  },
];

/** Photo paths used by social posts (re-export for convenience). */
export const PHOTOS = P;

export function byId(id: string): MenuItem | undefined {
  return MENU.find((m) => m.id === id);
}

export function money(n: number): string {
  return `$${n.toFixed(2)}`;
}

export function price(item: MenuItem): string {
  if (typeof item.p === "number") return money(item.p);
  return `${money(item.p[12])} / ${money(item.p[16])}`;
}
