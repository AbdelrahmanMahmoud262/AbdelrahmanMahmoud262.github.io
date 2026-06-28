import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { ShieldCheck, ArrowLeft } from "lucide-react";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createMetadata({
  title: "Privacy Policy & On-Device Assurances",
  description:
    "Privacy guidelines and on-device data assurances for Rafiqy (formerly Mostaqeem) app and services by Abdelrahman Nasr. Privacy-by-design policy.",
  keywords: [
    "privacy policy Rafiqy",
    "on-device data assurance",
    "accessibility service privacy",
    "data retention policy",
  ],
  path: "/privacy",
  ogImage: "/og/home.png",
});

export default function Privacy() {
  return (
    <div className="w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-12 md:py-20 flex flex-col gap-8">
      {/* Back to Home */}
      <Link
        href="/"
        className="inline-flex items-center space-x-1.5 text-xs font-mono text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Home</span>
      </Link>

      <div className="space-y-4">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Privacy Policy & On-Device Assurances
        </h1>
        <p className="text-xs font-mono text-accent-android uppercase tracking-wider">
          Last Updated: June 2026
        </p>
      </div>

      <div className="border-t border-gray-900 pt-6 text-sm text-gray-300 space-y-6 leading-relaxed font-sans">
        <p>
          Your privacy is a core architectural priority. This Privacy Policy details how I handle data across my custom Android applications, freelance client codebases, and my solo wellness platform, <strong>Rafiqy</strong> (formerly Mostaqeem).
        </p>

        {/* Rafiqy specifics */}
        <div className="bg-gray-950/40 border border-gray-900 rounded-lg p-6 space-y-4 glass">
          <h3 className="text-base font-bold text-white flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-accent-android" />
            <span>Rafiqy: Privacy-By-Design Assurances</span>
          </h3>
          <p className="text-xs text-gray-400">
            Rafiqy is a solo digital wellness application available on the Google Play Store designed to help users block short-form video addictions and limit screen time. It is built under a strict <strong>100% on-device local execution</strong> model:
          </p>
          <ul className="list-disc list-inside space-y-2 text-xs text-gray-400 pl-2">
            <li>
              <strong>Accessibility Service API:</strong> Screen elements checked by the Accessibility Service are analyzed in real-time in volatile system RAM to identify blocked content, and are instantly discarded.
            </li>
            <li>
              <strong>No Server Transmission:</strong> No browsing logs, touch interactions, app statistics, or visual screen data are ever transmitted or stored on remote servers.
            </li>
            <li>
              <strong>UsageStats API:</strong> Application active intervals are queried completely locally to display behavioral dashboards.
            </li>
            <li>
              <strong>Zero Analytics Monetization:</strong> The application does not monetize or trade user usage patterns with third parties.
            </li>
          </ul>
        </div>

        {/* Global Portfolio and Client specifics */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-white tracking-tight">Data Collected via This Website</h3>
          <p>
            When you submit an inquiry through our Contact Form, the information is used solely to evaluate your project scope and respond to your freelance, consulting, or recruiting requests.
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2">
            <li><strong>Email:</strong> Dispatched via Resend over SSL connection.</li>
            <li><strong>Retention:</strong> Project inquiries are deleted upon request or once engagement assessments are concluded.</li>
          </ul>
        </div>

        {/* Contact info */}
        <div className="border-t border-gray-900 pt-6">
          <p className="text-xs text-gray-500 font-mono">
            For privacy inquiries or deletion requests, contact me directly at:{" "}
            <a href="mailto:abdelrahmanmahmoudnasr@gmail.com" className="text-accent-android underline">
              abdelrahmanmahmoudnasr@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
