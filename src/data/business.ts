export const BUSINESS = {
  name: "Ignite Coffee Co.",
  tagline: "Igniting conversation and community through coffee",
  about:
    "Your locally owned spot for quality coffee, specialty drinks, homemade baking, and community warmth.",
  addr: "431 B Stuart Dr W",
  city: "Fort St. James, BC V0J 1P0",
  email: "ignitefsj@gmail.com",
  fb: "https://www.facebook.com/p/Ignite-Coffee-Co-61584794248491/",
  ig: "https://www.instagram.com/ignitecoffeecofsj/",
  maps:
    "https://www.google.com/maps/search/?api=1&query=Ignite+Coffee+Co+431+B+Stuart+Dr+W+Fort+St+James+BC",
  googleRating: 5.0,
  googleReviews: 23,
  facebookFollowers: 890,
  instagramFollowers: 412,
} as const;

export type Business = typeof BUSINESS;
