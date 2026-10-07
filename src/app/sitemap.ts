import type { MetadataRoute } from "next";
import { BRAND } from "@/lib/brand";
import { INDEXABLE_PATHS, fetchProjectSlugsForSeo, absoluteUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticEntries: MetadataRoute.Sitemap = INDEXABLE_PATHS.map((path) => ({
    url: absoluteUrl(path),
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.startsWith("/services") ? 0.8 : 0.7,
  }));

  const slugs = await fetchProjectSlugsForSeo();
  const projectEntries: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: absoluteUrl(`/portfolio/project/${slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  return [...staticEntries, ...projectEntries];
}

export const revalidate = 3600;
