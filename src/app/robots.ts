import { MetadataRoute } from "next";
import { tokens } from "@/lib/tokens";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = tokens.site.url;
  
  return {
    rules: [
      {
        userAgent: "*",
        disallow: ["/api/", "/proposal", "/proposal/"],
      },
      {
        userAgent: ["GPTBot", "Claude-Web", "cohere-ai", "OMgili"],
        disallow: "/",
      },
      {
        userAgent: "AdsBot-Google",
        allow: "/",
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

