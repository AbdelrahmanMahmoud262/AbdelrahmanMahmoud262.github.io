import type { NextConfig } from "next";

// Deployment abstraction — GitHub Pages is a deployment concern, not an architectural one.
// Set DEPLOY_TARGET=github-pages in CI to enable static export mode.
// Locally and on Vercel, the app runs in full server mode.
const isStaticExport = process.env.DEPLOY_TARGET === "github-pages";

console.log("BUILD CONFIG:", {
  DEPLOY_TARGET: process.env.DEPLOY_TARGET,
  NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
  isStaticExport,
});

const nextConfig: NextConfig = {
  // Static export only when targeting GitHub Pages
  ...(isStaticExport && {
    output: "export",
    trailingSlash: true,
    images: { unoptimized: true },
  }),

  // Strict mode for better React error detection
  reactStrictMode: true,

  // Future: enable when migrating to Vercel
  // images: { formats: ["image/avif", "image/webp"] },
};

export default nextConfig;
