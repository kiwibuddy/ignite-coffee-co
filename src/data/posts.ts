const P = "/assets/img/photos/";

export type Post = {
  date: string;
  text: string;
  more?: boolean;
  img?: string;
  r: number;
  c: number;
  s: number;
  bake?: string[];
  quote?: boolean;
};

export const POSTS: Post[] = [
  {
    date: "Sep 16 · 2:57 PM",
    text: "Our fantastic fall favorites are here! Cozy Butter Pecan and Pumpkin Spice Latte's served hot at Ignite!🙌 *Limited time only*",
    r: 57,
    c: 12,
    s: 10,
    img: `${P}fall-favourites.jpg`,
  },
  {
    date: "Aug 29 · 8:50 AM",
    text: "We have pumpkin cream cheese muffins, salted caramel apple, cherry almond and blueberry scones for today! 😋",
    img: `${P}pastry-case.jpg`,
    r: 55,
    c: 2,
    s: 2,
    bake: [
      "muffin-pumpkin",
      "scone-sca",
      "scone-cherry",
      "scone-blueberry",
      "scone-cranberry",
      "muffin-double-choc",
    ],
  },
  {
    date: "Aug 14",
    text: "Ignite will be open till 7pm tonight for the night market. Make sure to swing by and grab something for the family 🍨",
    r: 5,
    c: 0,
    s: 0,
  },
  {
    date: "Jul 29",
    text: "We are selling whole bean coffee at Ignite ☕️🏷️🫘",
    more: true,
    img: `${P}bean-wall.jpg`,
    r: 35,
    c: 1,
    s: 1,
  },
  {
    date: "Jul 28",
    text: "🎉 Frappes are here!",
    more: true,
    img: `${P}frappe.jpg`,
    r: 40,
    c: 12,
    s: 6,
  },
  {
    date: "",
    text: "Patio seating now available at Ignite! ☀️ Grab your favourite drink, soak up the sun, and enjoy some top-tier Fort St. James people watching ☕.",
    quote: true,
    img: `${P}patio.jpg`,
    r: 0,
    c: 0,
    s: 0,
  },
  {
    date: "Jun 25",
    text: "Freshly baked blueberry and cranberry white chocolate scones, plus double chocolate muffins in the case this morning.",
    img: `${P}scones-muffins-case.jpg`,
    r: 9,
    c: 1,
    s: 1,
    bake: ["scone-blueberry", "scone-cranberry", "muffin-double-choc"],
  },
  {
    date: "Jun 13",
    text: "Fresh baked Saturday goodies — come grab yours before they are gone.",
    img: `${P}saturday-goodies.jpg`,
    r: 20,
    c: 0,
    s: 0,
  },
  {
    date: "Jun 6",
    text: "Beautiful Saturday at Ignite. Counter is stocked and the coffee is hot.",
    img: `${P}counter.jpg`,
    r: 48,
    c: 2,
    s: 4,
  },
  {
    date: "May 16",
    text: "We will be closed for the May long weekend. Wishing everyone a safe and happy holiday — see you Tuesday!",
    r: 42,
    c: 1,
    s: 3,
  },
  {
    date: "May 13",
    text: "Italian sodas are back on the menu — pick your flavour and enjoy.",
    img: `${P}italian-sodas.jpg`,
    r: 52,
    c: 2,
    s: 3,
  },
];
