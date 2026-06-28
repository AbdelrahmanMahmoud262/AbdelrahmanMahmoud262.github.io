import { KnowledgeGraph } from "@/lib/content/graph";
import { tokens } from "@/lib/tokens";

export const dynamic = "force-static";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const entities = await KnowledgeGraph.get();
  const BASE = tokens.site.url;
  const articles = entities.filter(e => e.type === "ARTICLE");

  const items = articles
    .map(
      (art) => `
    <item>
      <title>${escapeXml(art.title)}</title>
      <link>${BASE}${art.url}</link>
      <guid isPermaLink="true">${BASE}${art.url}</guid>
      <description>${escapeXml(art.seo?.description || "")}</description>
      <pubDate>${new Date(art.metadata?.date || "2026-06-28").toUTCString()}</pubDate>
      <category>${escapeXml(art.presentation?.category || "Technology")}</category>
      <author>${escapeXml(tokens.author.email)} (${escapeXml(tokens.author.shortName)})</author>
    </item>`
    )
    .join("\n");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(tokens.site.name)} — Android Engineering Blog</title>
    <link>${BASE}/blog/</link>
    <description>Technical articles on Android development, Jetpack Compose, Kotlin, Clean Architecture, and engineering leadership by ${escapeXml(tokens.author.name)}.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <managingEditor>${escapeXml(tokens.author.email)} (${escapeXml(tokens.author.shortName)})</managingEditor>
    <webMaster>${escapeXml(tokens.author.email)}</webMaster>
    <image>
      <url>${BASE}/og/home.png</url>
      <title>${escapeXml(tokens.site.name)} Blog</title>
      <link>${BASE}/blog/</link>
    </image>
    <atom:link href="${BASE}/feed.xml" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
