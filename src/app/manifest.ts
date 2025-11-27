import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "E-commerce Store",
    short_name: "E-commerce Store",
    description: "Product listing and details",
    start_url: "/products",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#67a3ff",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "48x48",
        type: "image/x-icon",
      },
    ],
  };
}
