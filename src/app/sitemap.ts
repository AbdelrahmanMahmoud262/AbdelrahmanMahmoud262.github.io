import type { MetadataRoute } from "next";
import { KnowledgeGraph } from "@/lib/content/graph";
import { tokens } from "@/lib/tokens";

export const dynamic = "force-static";

const BASE = tokens.site.url;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entities = await KnowledgeGraph.get();

  // Static routes compiled from Page entities
  const pageEntities = entities.filter(e => e.type === "PAGE");
  const staticRoutes: MetadataRoute.Sitemap = pageEntities.map(p => {
    let priority = 0.5;
    let changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly";
    
    if (p.slug === "") {
      priority = 1.0;
      changeFrequency = "weekly";
    } else if (p.slug === "services") {
      priority = 0.9;
    } else if (p.slug === "case-studies" || p.slug === "blog" || p.slug === "patterns") {
      priority = 0.8;
      changeFrequency = "weekly";
    } else if (p.slug === "about") {
      priority = 0.6;
    } else if (p.slug === "contact") {
      priority = 0.4;
      changeFrequency = "yearly";
    }

    return {
      url: `${BASE}${p.url}`,
      priority,
      changeFrequency,
      lastModified: new Date("2026-06-28")
    };
  });

  // Dynamic Case Studies
  const caseStudies = entities.filter(e => e.type === "PROJECT");
  const caseStudyRoutes: MetadataRoute.Sitemap = caseStudies.map(cs => ({
    url: `${BASE}${cs.url}`,
    priority: 0.8,
    changeFrequency: "monthly",
    lastModified: new Date("2026-06-28")
  }));

  // Dynamic Blog Articles
  const articles = entities.filter(e => e.type === "ARTICLE");
  const blogRoutes: MetadataRoute.Sitemap = articles.map(art => ({
    url: `${BASE}${art.url}`,
    priority: 0.7,
    changeFrequency: "monthly",
    lastModified: new Date(art.metadata?.lastModified || "2026-06-28")
  }));

  return [...staticRoutes, ...caseStudyRoutes, ...blogRoutes];
}
