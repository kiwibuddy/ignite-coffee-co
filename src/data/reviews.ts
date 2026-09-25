export const GOOGLE = {
  rating: 5,
  count: 23,
  topics: ["cozy atmosphere", "friendly staff", "scones", "baked goods"],
} as const;

export type GoogleSummary = typeof GOOGLE;

export type Review = {
  name: string;
  stars: number;
  when: string;
  text: string;
};

export const REVIEWS: Review[] = [
  {
    name: "JRosner",
    stars: 5,
    when: "6 months ago",
    text: "Make sure you stop by and get the best coffee in town. Cosy atmosphere and nice people. Absolute gem, need more business like this in little great fort.",
  },
  {
    name: "Amanda Munro",
    stars: 5,
    when: "4 months ago",
    text: "Wonderful new coffee shop right in the middle of town! Excellent espresso, lovely baked goods and friendly staff. A must stop when in town.",
  },
  {
    name: "Oghosa Ohuoba",
    stars: 5,
    when: "2 months ago",
    text: "The drinks and the food taste amazing, and the place is just cozy and the service is amazing! Recommend 100%",
  },
  {
    name: "Sue Williams",
    stars: 5,
    when: "4 months ago",
    text: "Friendly staff, hot drinks, and great treats. Staff is amazing, calls you by name and treats you like family. We are lucky to have Ignite in our town.",
  },
  {
    name: "K M",
    stars: 5,
    when: "6 months ago",
    text: "Cozy atmosphere, great snacks and drinks, and friendly staff! The early morning hours are great as well. The drinks are hot and made quickly - 10/10 all around!",
  },
  {
    name: "Lindsey E",
    stars: 5,
    when: "1 month ago",
    text: "Very grateful for the good coffee, delicious pastries, and great service.",
  },
];
