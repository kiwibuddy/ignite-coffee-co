import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ignite Coffee Co.",
    short_name: "Ignite",
    description:
      "Order ahead for pickup at Ignite Coffee Co. in Fort St. James.",
    start_url: "/app?source=pwa",
    display: "standalone",
    background_color: "#B4441C",
    theme_color: "#B4441C",
    orientation: "portrait",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
