"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Smartphone, ArrowRight } from "lucide-react";
import { Github, Linkedin } from "./Icons";
import { PERSONAL_INFO } from "../constants";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Blog" },
  { href: "/resume", label: "Resume" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#09090b]/80 backdrop-blur-md border-b border-zinc-800/60 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Brand Name */}
          <Link href="/" className="flex items-center gap-2 group">
            <Smartphone className="w-5 h-5 text-accent-android group-hover:rotate-12 transition-transform duration-300" />
            <div className="flex flex-col">
              <span className="font-bold text-base tracking-tight text-white group-hover:text-accent-android transition-colors">
                Abdelrahman Nasr
              </span>
              <span className="text-[10px] text-zinc-400 font-mono tracking-wider">
                ANDROID ARCHITECT
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-white ${
                    isActive ? "text-accent-android font-semibold" : "text-zinc-400"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Contact CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </Link>
            <Link
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              <Github className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded bg-[#00e5ff] text-gray-950 hover:bg-cyan-400 text-xs font-bold transition-all duration-300 shadow-[0_0_20px_rgba(0,229,255,0.1)] cursor-pointer"
            >
              Let&apos;s Talk
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-zinc-400 hover:text-white focus:outline-none focus:text-white"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Open State */}
      {isOpen && (
        <div className="md:hidden bg-[#09090b]/95 backdrop-blur-md border-b border-zinc-800/80 animate-fadeIn">
          <div className="px-2 pt-2 pb-4 flex flex-col gap-1 sm:px-3">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2.5 rounded-md text-base font-medium ${
                    isActive
                      ? "text-accent-android bg-emerald-500/10 font-semibold"
                      : "text-zinc-300 hover:bg-zinc-800/40 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="flex items-center gap-6 px-3 py-4 border-t border-zinc-800/80 mt-4">
              <Link
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <Github className="w-5 h-5" />
              </Link>
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 text-accent-android text-sm font-semibold"
              >
                <span>Hire Me</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
