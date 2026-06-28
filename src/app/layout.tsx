import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Abdelrahman Nasr | Senior Android Architect & Team Lead",
    template: "%s | Abdelrahman Nasr",
  },
  description:
    "Professional brand platform and Android engineering portfolio of Abdelrahman Nasr. Senior Developer & Team Lead specializing in Clean Architecture, Kotlin Coroutines, Jetpack Compose, and offline-first white-label app scaling.",
  keywords: [
    "Senior Android Developer",
    "Android Team Lead",
    "Kotlin Expert",
    "Jetpack Compose Expert",
    "Clean Architecture",
    "Mobile Software Architect",
    "Offline-first apps",
    "Accessibility Service Android",
  ],
  authors: [{ name: "Abdelrahman Nasr" }],
  creator: "Abdelrahman Nasr",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://abdelrahmanmahmoud262.github.io",
    title: "Abdelrahman Nasr | Senior Android Architect & Team Lead",
    description:
      "Android team lead, Kotlin expert, and mobile developer building serious production-grade software with Clean Architecture.",
    siteName: "Abdelrahman Nasr Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdelrahman Nasr | Senior Android Architect & Team Lead",
    description:
      "Android team lead, Kotlin expert, and mobile developer building serious production-grade software with Clean Architecture.",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background text-foreground flex flex-col relative`}
      >
        {/* Google Analytics Tag & Client-side Route Tracking */}
        <GoogleAnalytics />

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
