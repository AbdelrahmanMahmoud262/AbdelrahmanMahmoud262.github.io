/**
 * Design tokens — single source of truth for all visual and site constants.
 * Consumed by SEO utilities, metadata generators, and schema builders.
 */
export const tokens = {
  colors: {
    accent: "#00e5ff",
    background: "#0a0a0c",
    surface: "#121214",
    text: "#ffffff",
    textMuted: "#71717a",
  },
  site: {
    name: "Abdelrahman Nasr",
    tagline: "Senior Android Architect & Team Lead",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://abdelrahmanmahmoud262.github.io",
    locale: "en_US",
    twitterHandle: "@abdelrahman_dev",
    ogImageWidth: 1200,
    ogImageHeight: 630,
  },
  author: {
    name: "Abdelrahman Mahmoud Nasr",
    shortName: "Abdelrahman Nasr",
    email: "abdelrahmanmahmoudnasr@gmail.com",
    phone: "+20 102 368 6787",
    location: "Cairo, Egypt",
    linkedin: "https://linkedin.com/in/abdelrahman262",
    github: "https://github.com/AbdelrahmanMahmoud262/",
    jobTitle: "Senior Android Developer & Team Lead",
    description:
      "Senior Android Developer with 6+ years of experience in Kotlin, Jetpack Compose, Clean Architecture, and real-time mobile systems. Based in Cairo, Egypt. Available for remote consulting worldwide.",
  },
} as const;

export type Tokens = typeof tokens;
