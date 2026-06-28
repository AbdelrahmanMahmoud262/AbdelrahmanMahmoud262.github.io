import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnalyticsProvider from "@/components/AnalyticsProvider";
import { JsonLd } from "@/components/JsonLd";
import { personSchema, organizationSchema, websiteSchema } from "@/lib/seo/jsonld";
import { tokens } from "@/lib/tokens";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(tokens.site.url),
  title: {
    default: "Abdelrahman Nasr | Senior Android Architect & Team Lead",
    template: "%s | Abdelrahman Nasr",
  },
  description:
    "Professional portfolio and technical blog of Abdelrahman Nasr — Senior Android Developer & Team Lead based in Cairo, Egypt. Specializing in Kotlin, Jetpack Compose, Clean Architecture, and real-time mobile systems. Available for remote consulting worldwide.",
  keywords: [
    "Senior Android Developer",
    "Android Team Lead",
    "Kotlin Expert",
    "Jetpack Compose Expert",
    "Clean Architecture",
    "Mobile Software Architect",
    "Offline-first apps",
    "Android Accessibility Service",
    "Senior Android Developer Egypt",
    "Android Consultant Egypt",
    "Remote Android Developer",
    "Android Team Lead Middle East",
  ],
  authors: [{ name: tokens.author.name }],
  creator: tokens.site.name,
  alternates: {
    canonical: tokens.site.url + "/",
    types: {
      "application/rss+xml": `${tokens.site.url}/feed.xml`,
    },
  },
  openGraph: {
    type: "website",
    locale: tokens.site.locale,
    url: tokens.site.url + "/",
    title: "Abdelrahman Nasr | Senior Android Architect & Team Lead",
    description:
      "Senior Android Developer & Team Lead. Cairo, Egypt. Kotlin, Jetpack Compose, Clean Architecture, real-time systems. Available for remote consulting.",
    siteName: `${tokens.site.name} Portfolio`,
    images: [
      {
        url: "/og/home.png",
        width: 1200,
        height: 630,
        alt: "Abdelrahman Nasr — Senior Android Architect & Team Lead",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdelrahman Nasr | Senior Android Architect & Team Lead",
    description:
      "Senior Android Developer & Team Lead. Cairo, Egypt. Kotlin, Jetpack Compose, Clean Architecture.",
    images: ["/og/home.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/site.webmanifest",
  verification: {
    google: "placeholder_google_verification",
    other: {
      "msvalidate.01": "placeholder_bing_verification",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Global Structured Data */}
        <JsonLd data={websiteSchema()} />
        <JsonLd data={personSchema()} />
        <JsonLd data={organizationSchema()} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background text-foreground flex flex-col relative`}
      >
        {/* Analytics — GA4 + PostHog via abstraction layer */}
        <AnalyticsProvider />

        {/* Structural Blueprint Grids */}
        <div className="absolute inset-0 blueprint-grid opacity-60 pointer-events-none z-0"></div>
        <div className="absolute inset-0 blueprint-dots opacity-40 pointer-events-none z-0"></div>
        <div className="absolute inset-0 noise-overlay pointer-events-none z-0"></div>

        <Navbar />

        {/* Spacer for fixed navbar to prevent content overlap */}
        <div className="h-24 md:h-28 print:hidden"></div>

        <main className="w-full flex-grow flex flex-col items-center relative z-10">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
