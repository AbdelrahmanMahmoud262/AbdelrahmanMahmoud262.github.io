import React from "react";
import Link from "next/link";
import { Smartphone, Mail } from "lucide-react";
import { Github, Linkedin } from "./Icons";
import { PERSONAL_INFO } from "../constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#09090b] border-t border-zinc-800/80 py-12 md:py-16">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand Info */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-accent-android" />
              <span className="font-bold text-base tracking-tight text-white">
                Abdelrahman Nasr
              </span>
            </Link>
            <p className="text-zinc-400 text-sm max-w-sm leading-relaxed">
              Senior Android Developer, Team Lead, and Architecture Specialist. Architecting high-performance, offline-first mobile systems.
            </p>
            <div className="flex gap-4 pt-2">
              <Link
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-zinc-500 hover:text-white transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </Link>
              <Link
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="text-zinc-500 hover:text-white transition-colors"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </Link>
              <Link
                href={`mailto:${PERSONAL_INFO.email}`}
                className="text-zinc-500 hover:text-white transition-colors"
                aria-label="Email Address"
              >
                <Mail className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider font-mono">
              Platform
            </h3>
            <ul className="mt-4 flex flex-col gap-2">
              <li>
                <Link href="/" className="text-sm text-zinc-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-zinc-400 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="text-sm text-zinc-400 hover:text-white transition-colors">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm text-zinc-400 hover:text-white transition-colors">
                  Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Resources */}
          <div>
            <h3 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider font-mono">
              Resources
            </h3>
            <ul className="mt-4 flex flex-col gap-2">
              <li>
                <Link href="/blog" className="text-sm text-zinc-400 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/resume" className="text-sm text-zinc-400 hover:text-white transition-colors">
                  Resume
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-zinc-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-zinc-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-800/80 flex flex-col md:flex-row items-center justify-between">
          <p className="text-xs text-zinc-500">
            &copy; {currentYear} Abdelrahman Mahmoud Nasr. All rights reserved.
          </p>
          <p className="text-xs text-zinc-650 mt-2 md:mt-0 font-mono">
            Designed for impact. Engineered with clean architecture.
          </p>
        </div>
      </div>
    </footer>
  );
}
