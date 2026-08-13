import React from "react";
import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo/metadata";
import ProposalClient from "../ProposalClient";
import { MOSTAQEEM_STABILITY_PROPOSAL_DATA } from "@/constants/proposalData";

const baseMetadata = createMetadata({
  title: "Mostaqeem — Development & Stability Improvements Proposal",
  description: "Private software development proposal for Mostaqeem improvements.",
  path: "/proposal/mostaqeem-stability",
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
  return <ProposalClient data={MOSTAQEEM_STABILITY_PROPOSAL_DATA} />;
}
