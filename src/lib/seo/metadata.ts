import type { Metadata } from "next";
import { tokens } from "@/lib/tokens";

const BASE_URL = tokens.site.url;
const SITE_NAME = tokens.site.name;

const BASE_KEYWORDS = [
  "Senior Android Developer",
  "Android Team Lead",
  "Kotlin Expert",
  "Jetpack Compose",
  "Clean Architecture",
  "Android Architecture",
  "Android Consulting",
  "Cairo Egypt",
  "Senior Android Developer Egypt",
  "Remote Android Developer",
  "Android Team Lead Middle East",
];

interface PageMetadataConfig {
  title: string;
  description: string;
  keywords?: string[];
  /** Path relative to base URL, e.g. "/blog/my-post" */
  path?: string;
  ogImage?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  tags?: string[];
}

/**
 * Reusable metadata generator.
 * Produces consistent, complete metadata for every page without manual duplication.
 */
export function createMetadata({
  title,
  description,
  keywords = [],
  path: pagePath = "",
  ogImage,
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
  tags,
}: PageMetadataConfig): Metadata {
  const canonicalUrl = `${BASE_URL}${pagePath}/`.replace(/\/+$/, "/");
  const imageUrl = ogImage
    ? `${BASE_URL}${ogImage}`
    : `${BASE_URL}/og/home.png`;

  return {
    metadataBase: new URL(BASE_URL),
    title,
    description,
    keywords: [...BASE_KEYWORDS, ...keywords],
    authors: (authors ?? [tokens.author.name]).map((name) => ({ name })),
    creator: SITE_NAME,
    alternates: {
      canonical: canonicalUrl,
      types: {
        "application/rss+xml": `${BASE_URL}/feed.xml`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      locale: tokens.site.locale,
      type,
      images: [
        {
          url: imageUrl,
          width: tokens.site.ogImageWidth,
          height: tokens.site.ogImageHeight,
          alt: title,
        },
      ],
      ...(type === "article" && {
        publishedTime,
        modifiedTime,
        tags,
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

// Re-export tokens for convenience
export { tokens };
