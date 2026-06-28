import React from "react";
import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo/metadata";
import ResumeClient from "./ResumeClient";

export const metadata: Metadata = createMetadata({
  title: "Resume — Senior Android Developer & Team Lead",
  description:
    "Professional resume of Abdelrahman Nasr. 6+ years Android development, team leadership at Almyaar, Kotlin/Jetpack Compose expert, Clean Architecture specialist. CS50 Harvard certified. Cairo, Egypt.",
  keywords: [
    "Android developer resume",
    "Android engineer CV",
    "Kotlin developer resume Egypt",
    "Android team lead resume",
  ],
  path: "/resume",
  ogImage: "/og/resume.png",
});

export default function ResumePage() {
  return <ResumeClient />;
}
