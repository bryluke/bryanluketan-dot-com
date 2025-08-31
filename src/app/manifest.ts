import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Bryan Luke Tan",
    short_name: "BLT",
    description: "Developing products of craft and purpose; building meaning with each block.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#222222",
    icons: [
      {
        src: "/icon.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}