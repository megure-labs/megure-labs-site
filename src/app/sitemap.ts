import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://megure.ai",
      lastModified: new Date("2026-08-28"),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
