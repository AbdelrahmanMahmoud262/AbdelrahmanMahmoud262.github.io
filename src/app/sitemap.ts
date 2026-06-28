import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://abdelrahmanmahmoud262.github.io";
  
  const routes = [
    "",
    "/about",
    "/case-studies",
    "/case-studies/taxi-alwatani",
    "/case-studies/schoolie",
    "/case-studies/rafiqy",
    "/services",
    "/blog",
    "/resume",
    "/privacy",
    "/contact",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1.0 : route.startsWith("/case-studies/") ? 0.8 : 0.5,
  }));
}
