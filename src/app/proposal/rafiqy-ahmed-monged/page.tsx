import React from "react";
import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo/metadata";
import ProposalClient from "../ProposalClient";

const baseMetadata = createMetadata({
  title: "Project Proposal — Senior Android Architect",
  description: "Private software development proposal.",
  path: "/proposal/rafiqy-ahmed-monged",
});

export const metadata: Metadata = {
  ...baseMetadata,
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function ProposalPage() {
  return <ProposalClient />;
}
