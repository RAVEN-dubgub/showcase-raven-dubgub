import type { MetadataRoute } from "next";
import { getAllParticipants } from "@/lib/roster";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const staticRoutes = ["", "/students", "/work", "/partners", "/status", "/event"].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));
  const profiles = getAllParticipants().map((p) => ({
    url: `${base}/students/${p.handle}`,
    lastModified: new Date(),
  }));
  return [...staticRoutes, ...profiles];
}
