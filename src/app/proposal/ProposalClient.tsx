"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Check,
  X,
  ChevronDown,
  ChevronUp,
  User,
  Target,
  Cpu,
  Layers,
  Lock,
  TrendingUp,
  Clock,
  ArrowRight,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  FileText,
  Package,
  UploadCloud,
  Shield,
  MessageSquare,
  Info,
  Key
} from "lucide-react";
import { Github, Linkedin } from "@/components/Icons";
import { PROPOSAL_DATA } from "@/constants/proposalData";

const SECTIONS = [
  { id: "cover", label: "Cover" },
  { id: "summary", label: "Executive Summary" },
  { id: "about", label: "About Me" },
  { id: "understanding", label: "Project Scope & Goals" },
  { id: "solution", label: "Proposed Solution" },
  { id: "process", label: "Development Process" },
  { id: "scope", label: "Inclusions & Exclusions" },
  { id: "timeline", label: "Milestones" },
  { id: "pricing", label: "Pricing & Breakdown" },
  { id: "faqs", label: "FAQs" },
  { id: "terms", label: "Terms & Conditions" }
];

export default function ProposalClient() {
  const [passcode, setPasscode] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const printMode = "dark" as string;
  const [activeSection, setActiveSection] = useState("cover");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Load unlock state from sessionStorage to persist during session
  useEffect(() => {
    if (typeof window !== "undefined") {
      const unlocked = sessionStorage.getItem("proposal_unlocked");
      if (unlocked === "true") {
        setIsUnlocked(true);
      }
    }
  }, []);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === PROPOSAL_DATA.meta.passcode) {
      setIsUnlocked(true);
      setErrorMsg("");
      if (typeof window !== "undefined") {
        sessionStorage.setItem("proposal_unlocked", "true");
      }
    } else {
      setErrorMsg("Invalid access key. Please try again.");
    }
  };





  // Dynamic Scrollspy to highlight active sidebar section
  useEffect(() => {
    if (!isUnlocked) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const section of SECTIONS) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isUnlocked]);

  // Lock screen UI
  if (!isUnlocked) {
    return (
      <div className="w-full min-h-[80vh] flex items-center justify-center px-4 relative z-10 animate-fadeIn">
        {/* Glowing accents */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-cyan-500/10 blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-amber-500/5 blur-[100px] pointer-events-none"></div>

        <div className="w-full max-w-md bg-[#0a0a0a]/80 border border-zinc-800/80 rounded-md p-8 glass shadow-2xl relative">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00e5ff] to-transparent"></div>
          
          <div className="flex flex-col items-center text-center gap-6">
            <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-850 flex items-center justify-center text-[#00e5ff] shadow-[0_0_15px_rgba(0,229,255,0.1)]">
              <Lock className="w-6 h-6 animate-pulse" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">
                {"// SECURE CONSULTING PORTAL"}
              </span>
              <h1 className="text-2xl font-black text-white uppercase tracking-tight">
                Private Proposal Access
              </h1>
              <p className="text-xs text-zinc-400 leading-relaxed max-w-xs mx-auto">
                This document is private and confidential. Please enter your client access passcode to decrypt and view the proposal.
              </p>
            </div>

            <form onSubmit={handleUnlock} className="w-full space-y-4">
              <div className="relative">
                <input
                  type="password"
                  placeholder="Enter passcode (e.g. client-project)"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-950/70 border border-zinc-850 rounded text-sm text-white placeholder-zinc-650 focus:outline-none focus:border-[#00e5ff] focus:ring-1 focus:ring-[#00e5ff]/50 transition-all font-mono text-center"
                  autoFocus
                />
                <Key className="w-4 h-4 text-zinc-600 absolute right-3 top-3.5" />
              </div>

              {errorMsg && (
                <div className="text-[11px] font-mono text-red-500 bg-red-950/20 border border-red-900/50 py-2 px-3 rounded flex items-center justify-center gap-1.5 animate-shake">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center px-4 py-3 text-xs font-mono font-bold text-gray-950 rounded bg-[#00e5ff] hover:bg-cyan-400 focus:outline-none transition-all duration-300 shadow-[0_0_20px_rgba(0,229,255,0.1)] gap-2 cursor-pointer uppercase"
              >
                <span>Decrypt Document</span>
                <ArrowRight className="w-4 h-4 text-gray-950" />
              </button>
            </form>
            
            <div className="text-[9px] font-mono text-zinc-600 pt-2">
              Unauthorized access attempts are monitored • PORTFOLIO CORE v1.0
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Helper for Lucide icons dynamically mapped
  const getIcon = (name: string, className = "w-5 h-5") => {
    switch (name) {
      case "Target": return <Target className={className} />;
      case "AlertTriangle": return <AlertTriangle className={className} />;
      case "CheckCircle": return <CheckCircle className={className} />;
      case "HelpCircle": return <HelpCircle className={className} />;
      case "Code": return <CodeIcon className={className} />;
      case "FileText": return <FileText className={className} />;
      case "Package": return <Package className={className} />;
      case "TrendingUp": return <TrendingUp className={className} />;
      case "UploadCloud": return <UploadCloud className={className} />;
      case "Shield": return <Shield className={className} />;
      case "Layers": return <Layers className={className} />;
      case "Cpu": return <Cpu className={className} />;
      case "Smartphone": return <SmartphoneIcon className={className} />;
      case "MessageSquare": return <MessageSquare className={className} />;
      case "Clock": return <Clock className={className} />;
      default: return <Info className={className} />;
    }
  };



  return (
    <div className="w-full max-w-6xl mx-auto px-0 md:px-4 py-6 flex flex-col md:flex-row gap-8 relative z-10 animate-fadeIn">
      {/* 
        Custom CSS block injected for PDF print color settings.
        Forces browser backgrounds to be preserved in PDF prints (both dark & light modes).
      */}
      <style jsx global>{`
        @media print {
          /* Force page margins */
          @page {
            size: A4;
            margin: 1.5cm 1cm 1.5cm 1cm;
          }
          
          /* Hide UI shell elements */
          nav, footer, .print-hidden, [class*="Navbar"], [class*="Footer"], .h-16 {
            display: none !important;
          }
          
          /* Preserve graphics backgrounds */
          body, html, main, #__next, .proposal-body-wrapper {
            background-color: ${printMode === "dark" ? "#000000" : "#ffffff"} !important;
            color: ${printMode === "dark" ? "#ffffff" : "#000000"} !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          /* Handle page breaks nicely for each main proposal section */
          .page-break-section {
            page-break-before: always !important;
            break-before: page !important;
            padding-top: 1cm !important;
          }

          .no-page-break {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }

          /* Clear standard box shadows & borders in print to avoid rasterization issues */
          .glass {
            background: ${printMode === "dark" ? "#0a0a0a" : "#f9fafb"} !important;
            border-color: ${printMode === "dark" ? "#262626" : "#e5e7eb"} !important;
            box-shadow: none !important;
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
          }
          
          .pricing-highlight {
            border: 2px solid ${printMode === "dark" ? "#00e5ff" : "#0f766e"} !important;
          }
        }
      `}</style>

      {/* Sidebar Navigation Index (Hidden during Print) */}
      <aside className="w-full md:w-64 shrink-0 print-hidden md:sticky md:top-32 h-fit flex flex-col gap-4 self-start px-4 md:px-0">
        <div className="bg-[#0a0a0a]/50 border border-zinc-800/80 rounded-md p-4 glass">
          <div className="text-[10px] font-mono text-[#00e5ff] uppercase tracking-widest font-extrabold pb-3 border-b border-zinc-850">
            {"// DOCUMENT INDEX"}
          </div>
          <nav className="flex flex-col gap-1 pt-3 max-h-[60vh] overflow-y-auto">
            {SECTIONS.map((sect) => (
              <a
                key={sect.id}
                href={`#${sect.id}`}
                className={`text-[11px] font-mono py-1.5 px-2.5 rounded transition-all flex items-center justify-between group ${
                  activeSection === sect.id
                    ? "bg-[#00e5ff] text-gray-950 font-bold"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-900/50"
                }`}
              >
                <span>{sect.label}</span>
                <span className={`opacity-0 transition-opacity ${activeSection === sect.id ? "opacity-100" : "group-hover:opacity-40"}`}>
                  →
                </span>
              </a>
            ))}
          </nav>
        </div>

        <button
          onClick={() => {
            sessionStorage.removeItem("proposal_unlocked");
            setIsUnlocked(false);
          }}
          className="text-zinc-500 hover:text-red-400 text-[10px] font-mono text-center pt-2 transition-all cursor-pointer"
        >
          🔒 Lock Portal Session
        </button>
      </aside>

      {/* Main Document Content */}
      <div className="flex-grow w-full px-4 md:px-0 proposal-body-wrapper transition-colors duration-300">
        
        {/* SECTION 1: COVER PAGE */}
        <section
          id="cover"
          className={`min-h-[85vh] flex flex-col justify-between p-8 sm:p-12 md:p-16 border rounded-md relative overflow-hidden mb-12 ${
            printMode === "dark" 
              ? "bg-[#0a0a0a]/50 border-zinc-800/80 glass" 
              : "bg-gray-50 border-gray-250"
          }`}
        >
          {/* Cybernetic geometric background grid (Visible in Dark print mode, hidden in Light mode) */}
          {printMode === "dark" && (
            <>
              <div className="absolute inset-0 blueprint-grid opacity-25 pointer-events-none"></div>
              <div className="absolute inset-0 blueprint-dots opacity-20 pointer-events-none"></div>
              <div className="absolute -top-1/4 -right-1/4 w-96 h-96 rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none"></div>
              <div className="absolute -bottom-1/4 -left-1/4 w-96 h-96 rounded-full bg-amber-500/5 blur-[120px] pointer-events-none"></div>
            </>
          )}

          {/* Blueprint style accent headers */}
          <div className="flex justify-between items-start z-10 relative">
            <div className="space-y-1">
              <span className={`text-[10px] font-mono uppercase tracking-widest font-extrabold ${printMode === "dark" ? "text-zinc-500" : "text-zinc-400"}`}>
                {"// CLASSED SYSTEMS ENGINEER"}
              </span>
              <h3 className={`text-xs font-mono font-bold ${printMode === "dark" ? "text-[#00e5ff]" : "text-cyan-700"}`}>
                {PROPOSAL_DATA.contact.name.toUpperCase()}
              </h3>
            </div>
            <div className={`px-2.5 py-1 rounded border text-[9px] font-mono ${
              printMode === "dark" 
                ? "bg-zinc-950/80 border-zinc-800 text-zinc-400" 
                : "bg-white border-gray-300 text-gray-600"
            }`}>
              DOCUMENT CLASSIFICATION: CONFIDENTIAL
            </div>
          </div>

          {/* Title Area */}
          <div className="my-16 sm:my-24 z-10 relative space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded border text-[9px] font-mono uppercase tracking-wider select-none bg-zinc-900/30 border-zinc-800 text-zinc-400">
              <span className="flex h-1.5 w-1.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#00e5ff]"></span>
              </span>
              <span>{"PROJECT_PROPOSAL // "}{PROPOSAL_DATA.meta.version}</span>
            </div>

            <div className="space-y-2">
              <h1 className={`text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] uppercase ${
                printMode === "dark" ? "text-white" : "text-black"
              }`}>
                {PROPOSAL_DATA.meta.title}
              </h1>
              <p className={`text-lg sm:text-xl font-mono tracking-wide ${
                printMode === "dark" ? "text-[#00e5ff]" : "text-cyan-700"
              }`}>
                {PROPOSAL_DATA.meta.subtitle}
              </p>
            </div>
            
            {/* Minimal architectural SVG widget for cover decoration */}
            <div className="pt-4 max-w-sm">
              <svg viewBox="0 0 400 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full opacity-60">
                <line x1="0" y1="30" x2="400" y2="30" stroke={printMode === "dark" ? "#262626" : "#cbd5e1"} strokeWidth="1" />
                <circle cx="30" cy="30" r="6" fill={printMode === "dark" ? "#00e5ff" : "#0891b2"} />
                <circle cx="200" cy="30" r="4" stroke={printMode === "dark" ? "#f59e0b" : "#d97706"} strokeWidth="2" fill={printMode === "dark" ? "#0a0a0a" : "#ffffff"} />
                <line x1="190" y1="20" x2="210" y2="40" stroke={printMode === "dark" ? "#262626" : "#cbd5e1"} strokeWidth="1" />
                <line x1="210" y1="20" x2="190" y2="40" stroke={printMode === "dark" ? "#262626" : "#cbd5e1"} strokeWidth="1" />
                <rect x="360" y="20" width="20" height="20" stroke={printMode === "dark" ? "#00e5ff" : "#0891b2"} strokeWidth="1.5" />
                <path d="M 0 30 Q 100 0, 200 30 T 400 30" stroke={printMode === "dark" ? "#18181b" : "#f1f5f9"} strokeWidth="1.5" />
              </svg>
            </div>
          </div>

          {/* Target Metadata footer */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-6 border-t border-dashed z-10 relative border-zinc-800 text-zinc-400">
            <div>
              <span className={`text-[10px] font-mono block uppercase ${printMode === "dark" ? "text-zinc-500" : "text-gray-400"}`}>
                PREPARED FOR:
              </span>
              <span className={`text-sm font-bold block ${printMode === "dark" ? "text-zinc-200" : "text-black"}`}>
                {PROPOSAL_DATA.meta.client.name}
              </span>
              <span className="text-xs font-mono block text-zinc-500">
                {PROPOSAL_DATA.meta.client.company}
              </span>
            </div>

            <div>
              <span className={`text-[10px] font-mono block uppercase ${printMode === "dark" ? "text-zinc-500" : "text-gray-400"}`}>
                ISSUED BY:
              </span>
              <span className={`text-sm font-bold block ${printMode === "dark" ? "text-zinc-200" : "text-black"}`}>
                {PROPOSAL_DATA.contact.name}
              </span>
              <span className="text-xs font-mono block text-zinc-500">
                {PROPOSAL_DATA.contact.role}
              </span>
            </div>

            <div>
              <span className={`text-[10px] font-mono block uppercase ${printMode === "dark" ? "text-zinc-500" : "text-gray-400"}`}>
                DATE OF ISSUANCE:
              </span>
              <span className={`text-sm font-mono block ${printMode === "dark" ? "text-zinc-200" : "text-black"}`}>
                {PROPOSAL_DATA.meta.date}
              </span>
              <span className="text-[10px] font-mono block text-zinc-500">
                VALID FOR 30 DAYS
              </span>
            </div>
          </div>

          {/* Social icons bottom footer */}
          <div className="flex flex-wrap justify-between gap-4 mt-8 pt-4 border-t border-zinc-850 z-10 relative">
            <div className="flex gap-4 text-xs font-mono text-zinc-500">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#00e5ff]" />
                {PROPOSAL_DATA.contact.location}
              </span>
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-[#00e5ff]" />
                {PROPOSAL_DATA.contact.email}
              </span>
            </div>
            
            <div className="flex gap-4 text-zinc-400">
              <Link href={PROPOSAL_DATA.contact.linkedin} target="_blank" className="hover:text-white transition-colors">
                <Linkedin className="w-4 h-4" />
              </Link>
              <Link href={PROPOSAL_DATA.contact.github} target="_blank" className="hover:text-white transition-colors">
                <Github className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Table of Contents for Print PDF (Shows in print on page 2, hidden in web view) */}
        <section className="hidden print:block page-break-section p-8 sm:p-12 border rounded-md border-gray-200 mb-12 bg-gray-50">
          <div className="text-center space-y-2 mb-10">
            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block">{"// DOCUMENT INDEXING"}</span>
            <h2 className="text-3xl font-black text-black uppercase tracking-tight">Table of Contents</h2>
            <div className="h-[2px] w-20 bg-cyan-700 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-2 gap-y-4 gap-x-8 max-w-2xl mx-auto pt-6 text-sm font-mono text-gray-700">
            <div className="flex justify-between border-b border-dotted border-gray-300 pb-1">
              <span>1. Executive Summary</span>
              <span>Page 3</span>
            </div>
            <div className="flex justify-between border-b border-dotted border-gray-300 pb-1">
              <span>6. Scope Inclusions</span>
              <span>Page 6</span>
            </div>
            <div className="flex justify-between border-b border-dotted border-gray-300 pb-1">
              <span>2. About the Lead Architect</span>
              <span>Page 3</span>
            </div>
            <div className="flex justify-between border-b border-dotted border-gray-300 pb-1">
              <span>7. Project Deliverables</span>
              <span>Page 6</span>
            </div>
            <div className="flex justify-between border-b border-dotted border-gray-300 pb-1">
              <span>3. Project Goals & Challenges</span>
              <span>Page 4</span>
            </div>
            <div className="flex justify-between border-b border-dotted border-gray-300 pb-1">
              <span>8. Milestone Timeline</span>
              <span>Page 7</span>
            </div>
            <div className="flex justify-between border-b border-dotted border-gray-300 pb-1">
              <span>4. Proposed Technical Solution</span>
              <span>Page 4</span>
            </div>
            <div className="flex justify-between border-b border-dotted border-gray-300 pb-1">
              <span>9. Pricing & Estimates</span>
              <span>Page 8</span>
            </div>
            <div className="flex justify-between border-b border-dotted border-gray-300 pb-1">
              <span>5. Development Process Steps</span>
              <span>Page 5</span>
            </div>
            <div className="flex justify-between border-b border-dotted border-gray-300 pb-1">
              <span>10. Terms & FAQs</span>
              <span>Page 9</span>
            </div>
          </div>
        </section>

        {/* SECTION 2: EXECUTIVE SUMMARY */}
        <section
          id="summary"
          className={`p-8 sm:p-12 border rounded-md mb-12 page-break-section ${
            printMode === "dark" 
              ? "bg-[#0a0a0a]/50 border-zinc-800/80 glass" 
              : "bg-white border-gray-250"
          }`}
        >
          <div className="flex flex-col gap-6">
            <div className="space-y-1">
              <span className={`text-[10px] font-mono uppercase tracking-widest font-extrabold ${printMode === "dark" ? "text-zinc-500" : "text-zinc-400"}`}>
                {"// INTRODUCTION"}
              </span>
              <h2 className={`text-3xl font-black uppercase tracking-tight ${printMode === "dark" ? "text-white" : "text-black"}`}>
                Executive Summary
              </h2>
              <div className={`h-[2px] w-12 ${printMode === "dark" ? "bg-[#00e5ff]" : "bg-cyan-700"}`}></div>
            </div>

            {/* Main summary container */}
            <div className={`p-6 sm:p-8 rounded border relative ${
              printMode === "dark"
                ? "bg-zinc-950/40 border-[#00e5ff]/35 shadow-[0_0_15px_rgba(0,229,255,0.02)]"
                : "bg-cyan-50/20 border-cyan-300/60"
            }`}>
              <div className={`absolute top-3 left-3 w-1.5 h-1.5 rounded-full ${printMode === "dark" ? "bg-[#00e5ff]" : "bg-cyan-600"}`}></div>
              <p className={`text-base leading-relaxed ${printMode === "dark" ? "text-zinc-200" : "text-gray-800"}`}>
                {PROPOSAL_DATA.overview}
              </p>
            </div>

            {/* High-level goals bullet grid */}
            <div className="space-y-4">
              <h4 className={`text-xs font-mono font-bold uppercase tracking-wider ${printMode === "dark" ? "text-[#00e5ff]" : "text-cyan-700"}`}>
                Core Project Goals & Expected Outcomes:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {PROPOSAL_DATA.goals.map((goal, i) => (
                  <div key={i} className={`flex items-start gap-3 p-4 rounded border text-xs ${
                    printMode === "dark" 
                      ? "bg-zinc-900/20 border-zinc-850 text-zinc-300" 
                      : "bg-gray-50 border-gray-200 text-gray-700"
                  }`}>
                    <Check className={`w-4 h-4 shrink-0 mt-0.5 ${printMode === "dark" ? "text-[#00e5ff]" : "text-cyan-700"}`} />
                    <span>{goal}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: ABOUT ME */}
        <section
          id="about"
          className={`p-8 sm:p-12 border rounded-md mb-12 page-break-section ${
            printMode === "dark" 
              ? "bg-[#0a0a0a]/50 border-zinc-800/80 glass" 
              : "bg-white border-gray-250"
          }`}
        >
          <div className="flex flex-col gap-8">
            <div className="space-y-1">
              <span className={`text-[10px] font-mono uppercase tracking-widest font-extrabold ${printMode === "dark" ? "text-zinc-500" : "text-zinc-400"}`}>
                {"// ENGINEER BIOGRAPHY"}
              </span>
              <h2 className={`text-3xl font-black uppercase tracking-tight ${printMode === "dark" ? "text-white" : "text-black"}`}>
                About Me
              </h2>
              <div className={`h-[2px] w-12 ${printMode === "dark" ? "bg-[#00e5ff]" : "bg-cyan-700"}`}></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Photo / Avatar Placeholder */}
              <div className="lg:col-span-4 flex flex-col items-center text-center gap-4">
                <div className={`w-40 h-40 rounded-full border flex items-center justify-center relative overflow-hidden ${
                  printMode === "dark" 
                    ? "bg-zinc-950 border-zinc-800 shadow-[0_0_20px_rgba(0,e5,ff,0.05)]" 
                    : "bg-gray-100 border-gray-300"
                }`}>
                  {/* Decorative rotating background blueprint circles */}
                  {printMode === "dark" && (
                    <div className="absolute inset-0 rounded-full border border-dashed border-[#00e5ff]/10 animate-[spin_40s_linear_infinite]"></div>
                  )}
                  {/* Styled fallback avatar */}
                  <div className="flex flex-col items-center justify-center text-center text-zinc-500 relative z-10 gap-1 select-none">
                    <User className={`w-10 h-10 ${printMode === "dark" ? "text-[#00e5ff]" : "text-cyan-700"}`} />
                    <span className="text-[10px] font-mono uppercase tracking-widest font-extrabold">AMN_ENG</span>
                  </div>
                </div>
                
                <div>
                  <h3 className={`text-sm font-extrabold uppercase tracking-tight ${printMode === "dark" ? "text-zinc-150" : "text-black"}`}>
                    {PROPOSAL_DATA.contact.name}
                  </h3>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">
                    {PROPOSAL_DATA.contact.role}
                  </span>
                  <span className={`inline-block px-2.5 py-0.5 rounded text-[9px] font-mono font-bold mt-2 uppercase ${
                    printMode === "dark" 
                      ? "bg-[#00e5ff]/10 text-[#00e5ff] border border-[#00e5ff]/20" 
                      : "bg-cyan-50 text-cyan-800 border border-cyan-200"
                  }`}>
                    {PROPOSAL_DATA.aboutMe.experienceYears} EXP
                  </span>
                </div>
              </div>

              {/* Bio & Details */}
              <div className="lg:col-span-8 space-y-6">
                <div className="space-y-2">
                  <h4 className={`text-xs font-mono font-bold uppercase tracking-wider ${printMode === "dark" ? "text-[#00e5ff]" : "text-cyan-700"}`}>
                    Biography & Experience
                  </h4>
                  <p className={`text-sm leading-relaxed ${printMode === "dark" ? "text-zinc-300" : "text-gray-800"}`}>
                    {PROPOSAL_DATA.aboutMe.bio}
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className={`text-xs font-mono font-bold uppercase tracking-wider ${printMode === "dark" ? "text-[#00e5ff]" : "text-cyan-700"}`}>
                    Engineering Philosophy
                  </h4>
                  <p className={`text-sm leading-relaxed italic ${printMode === "dark" ? "text-zinc-400" : "text-gray-700"}`}>
                    &ldquo;{PROPOSAL_DATA.aboutMe.philosophy}&rdquo;
                  </p>
                </div>

                {/* Grid details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                  <div className={`p-4 rounded border ${
                    printMode === "dark" ? "bg-zinc-950/40 border-zinc-850" : "bg-gray-50 border-gray-200"
                  }`}>
                    <h5 className={`text-[10px] font-mono font-bold uppercase tracking-widest pb-1 border-b ${
                      printMode === "dark" ? "text-zinc-400 border-zinc-850" : "text-gray-600 border-gray-200"
                    }`}>
                      CORE ARCHITECTURE:
                    </h5>
                    <ul className={`list-disc list-inside text-xs space-y-1.5 pt-2 ${
                      printMode === "dark" ? "text-zinc-300" : "text-gray-700"
                    }`}>
                      {PROPOSAL_DATA.aboutMe.coreExpertise.slice(0, 3).map((exp, i) => (
                        <li key={i}>{exp}</li>
                      ))}
                    </ul>
                  </div>

                  <div className={`p-4 rounded border ${
                    printMode === "dark" ? "bg-zinc-950/40 border-zinc-850" : "bg-gray-50 border-gray-200"
                  }`}>
                    <h5 className={`text-[10px] font-mono font-bold uppercase tracking-widest pb-1 border-b ${
                      printMode === "dark" ? "text-zinc-400 border-zinc-850" : "text-gray-600 border-gray-200"
                    }`}>
                      INDUSTRIES SERVED:
                    </h5>
                    <ul className={`list-disc list-inside text-xs space-y-1.5 pt-2 ${
                      printMode === "dark" ? "text-zinc-300" : "text-gray-700"
                    }`}>
                      {PROPOSAL_DATA.aboutMe.industries.map((ind, i) => (
                        <li key={i}>{ind}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: UNDERSTANDING THE PROJECT */}
        <section
          id="understanding"
          className={`p-8 sm:p-12 border rounded-md mb-12 page-break-section ${
            printMode === "dark" 
              ? "bg-[#0a0a0a]/50 border-zinc-800/80 glass" 
              : "bg-white border-gray-250"
          }`}
        >
          <div className="flex flex-col gap-8">
            <div className="space-y-1">
              <span className={`text-[10px] font-mono uppercase tracking-widest font-extrabold ${printMode === "dark" ? "text-zinc-500" : "text-zinc-400"}`}>
                {"// PROJECT ALIGNMENT"}
              </span>
              <h2 className={`text-3xl font-black uppercase tracking-tight ${printMode === "dark" ? "text-white" : "text-black"}`}>
                Project Scope & Goals
              </h2>
              <div className={`h-[2px] w-12 ${printMode === "dark" ? "bg-[#00e5ff]" : "bg-cyan-700"}`}></div>
            </div>

            {/* Understanding Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(PROPOSAL_DATA.understanding).map(([key, item]) => (
                <div
                  key={key}
                  className={`p-6 rounded border flex gap-4 items-start ${
                    printMode === "dark" 
                      ? "bg-zinc-950/30 border-zinc-850 hover:border-zinc-700 transition-colors" 
                      : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <div className={`p-3 rounded border shrink-0 ${
                    printMode === "dark" 
                      ? "bg-zinc-900/60 border-zinc-800 text-[#00e5ff]" 
                      : "bg-cyan-50 border-cyan-200 text-cyan-800"
                  }`}>
                    {getIcon(item.icon)}
                  </div>
                  
                  <div className="space-y-1">
                    <h3 className={`text-base font-extrabold uppercase tracking-tight ${
                      printMode === "dark" ? "text-white" : "text-black"
                    }`}>
                      {item.title}
                    </h3>
                    <p className={`text-xs leading-relaxed ${
                      printMode === "dark" ? "text-zinc-400" : "text-gray-600"
                    }`}>
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Tech Stack badging */}
            <div className="space-y-4">
              <h4 className={`text-xs font-mono font-bold uppercase tracking-wider ${printMode === "dark" ? "text-[#00e5ff]" : "text-cyan-700"}`}>
                Target System Specifications:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className={`p-4 rounded border font-mono text-center ${
                  printMode === "dark" ? "bg-zinc-950/40 border-zinc-850" : "bg-gray-50 border-gray-200"
                }`}>
                  <span className="text-[10px] text-zinc-500 block">PLATFORM</span>
                  <span className={`text-xs font-bold ${printMode === "dark" ? "text-zinc-200" : "text-black"}`}>Android Mobile</span>
                </div>
                <div className={`p-4 rounded border font-mono text-center ${
                  printMode === "dark" ? "bg-zinc-950/40 border-zinc-850" : "bg-gray-50 border-gray-200"
                }`}>
                  <span className="text-[10px] text-zinc-500 block">MINIMUM OS</span>
                  <span className={`text-xs font-bold ${printMode === "dark" ? "text-zinc-200" : "text-black"}`}>Android 10 (API 29+)</span>
                </div>
                <div className={`p-4 rounded border font-mono text-center ${
                  printMode === "dark" ? "bg-zinc-950/40 border-zinc-850" : "bg-gray-50 border-gray-200"
                }`}>
                  <span className="text-[10px] text-zinc-500 block">LANGUAGES</span>
                  <span className={`text-xs font-bold ${printMode === "dark" ? "text-zinc-200" : "text-black"}`}>Kotlin / Compose</span>
                </div>
                <div className={`p-4 rounded border font-mono text-center ${
                  printMode === "dark" ? "bg-zinc-950/40 border-zinc-850" : "bg-gray-50 border-gray-200"
                }`}>
                  <span className="text-[10px] text-zinc-500 block">ARCHITECTURE</span>
                  <span className={`text-xs font-bold ${printMode === "dark" ? "text-zinc-200" : "text-black"}`}>Clean Architecture</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: PROPOSED SOLUTION */}
        <section
          id="solution"
          className={`p-8 sm:p-12 border rounded-md mb-12 page-break-section ${
            printMode === "dark" 
              ? "bg-[#0a0a0a]/50 border-zinc-800/80 glass" 
              : "bg-white border-gray-250"
          }`}
        >
          <div className="flex flex-col gap-8">
            <div className="space-y-1">
              <span className={`text-[10px] font-mono uppercase tracking-widest font-extrabold ${printMode === "dark" ? "text-zinc-500" : "text-zinc-400"}`}>
                {"// ENGINEERING ROADMAP"}
              </span>
              <h2 className={`text-3xl font-black uppercase tracking-tight ${printMode === "dark" ? "text-white" : "text-black"}`}>
                Proposed Technical Solution
              </h2>
              <div className={`h-[2px] w-12 ${printMode === "dark" ? "bg-[#00e5ff]" : "bg-cyan-700"}`}></div>
            </div>

            {/* Architecture grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(PROPOSAL_DATA.solution).map(([key, item]) => (
                <div
                  key={key}
                  className={`p-5 rounded border flex flex-col gap-3 justify-between ${
                    printMode === "dark" ? "bg-zinc-950/40 border-zinc-850" : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <div className="space-y-2">
                    <h3 className={`text-sm font-extrabold uppercase tracking-tight ${
                      printMode === "dark" ? "text-[#00e5ff]" : "text-cyan-800"
                    }`}>
                      {item.title}
                    </h3>
                    <p className={`text-xs leading-relaxed ${
                      printMode === "dark" ? "text-zinc-400" : "text-gray-600"
                    }`}>
                      {item.description}
                    </p>
                  </div>

                  <ul className="space-y-1.5 border-t border-zinc-900 pt-3 mt-1 text-[11px] list-disc list-inside text-zinc-350">
                    {item.bullets.map((bullet, i) => (
                      <li key={i} className={`leading-snug ${printMode === "dark" ? "text-zinc-450" : "text-gray-600"}`}>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Tech Stack Chip Lists */}
            <div className={`p-6 rounded border ${
              printMode === "dark" ? "bg-zinc-950/40 border-zinc-850" : "bg-cyan-50/10 border-gray-200"
            }`}>
              <h4 className={`text-xs font-mono font-bold uppercase tracking-wider pb-3 border-b border-zinc-900 ${
                printMode === "dark" ? "text-[#00e5ff]" : "text-cyan-700"
              }`}>
                Proposed Stack Badge Breakdown:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                {PROPOSAL_DATA.techStack.map((tech, i) => (
                  <div key={i} className="flex flex-col gap-2">
                    <span className={`text-[10px] font-mono font-bold uppercase tracking-wide ${
                      printMode === "dark" ? "text-white" : "text-black"
                    }`}>
                      {tech.name}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {tech.skills.map((skill, j) => (
                        <span
                          key={j}
                          className={`px-3 py-1 rounded text-[10px] font-mono ${
                            printMode === "dark" 
                              ? "bg-zinc-900/60 text-zinc-350 border border-zinc-800/80" 
                              : "bg-white text-gray-700 border border-gray-250"
                          }`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: DEVELOPMENT PROCESS TIMELINE */}
        <section
          id="process"
          className={`p-8 sm:p-12 border rounded-md mb-12 page-break-section ${
            printMode === "dark" 
              ? "bg-[#0a0a0a]/50 border-zinc-800/80 glass" 
              : "bg-white border-gray-250"
          }`}
        >
          <div className="flex flex-col gap-8">
            <div className="space-y-1">
              <span className={`text-[10px] font-mono uppercase tracking-widest font-extrabold ${printMode === "dark" ? "text-zinc-500" : "text-zinc-400"}`}>
                {"// DELIVERY TIMELINES"}
              </span>
              <h2 className={`text-3xl font-black uppercase tracking-tight ${printMode === "dark" ? "text-white" : "text-black"}`}>
                Development Process
              </h2>
              <div className={`h-[2px] w-12 ${printMode === "dark" ? "bg-[#00e5ff]" : "bg-cyan-700"}`}></div>
            </div>

            {/* Horizontal Timeline (Scrollable on web, stacks cleanly on print) */}
            <div className="flex flex-col md:flex-row gap-6 overflow-x-auto pb-4 md:scroll-smooth print:flex-col print:overflow-x-visible">
              {PROPOSAL_DATA.process.map((step, i) => (
                <div
                  key={i}
                  className={`p-5 rounded border relative flex-1 min-w-[240px] flex flex-col justify-between shrink-0 print:min-w-0 print:border-l-2 print:border-t-0 print:border-r-0 print:border-b-0 print:pl-6 print:rounded-none ${
                    printMode === "dark" 
                      ? "bg-zinc-950/40 border-zinc-850" 
                      : "bg-gray-50 border-gray-200"
                  }`}
                >
                  {/* Decorative bullet for connecting process */}
                  {printMode === "dark" && (
                    <div className="absolute -top-[1.5px] left-6 w-3 h-3 bg-zinc-900 border border-zinc-700 rounded-full hidden md:block">
                      <div className="w-1 h-1 bg-[#00e5ff] rounded-full m-auto mt-[3px]"></div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <div className="flex justify-between items-baseline">
                      <span className={`text-[9px] font-mono font-bold uppercase tracking-widest ${
                        printMode === "dark" ? "text-[#00e5ff]" : "text-cyan-700"
                      }`}>
                        {step.phase}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-500">
                        {step.duration}
                      </span>
                    </div>

                    <h3 className={`text-sm font-extrabold uppercase tracking-tight ${
                      printMode === "dark" ? "text-white" : "text-black"
                    }`}>
                      {step.title}
                    </h3>
                    
                    <p className={`text-xs leading-relaxed ${
                      printMode === "dark" ? "text-zinc-400" : "text-gray-600"
                    }`}>
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 7: SCOPE */}
        <section
          id="scope"
          className={`p-8 sm:p-12 border rounded-md mb-12 page-break-section ${
            printMode === "dark" 
              ? "bg-[#0a0a0a]/50 border-zinc-800/80 glass" 
              : "bg-white border-gray-250"
          }`}
        >
          <div className="flex flex-col gap-8">
            <div className="space-y-1">
              <span className={`text-[10px] font-mono uppercase tracking-widest font-extrabold ${printMode === "dark" ? "text-zinc-500" : "text-zinc-400"}`}>
                {"// SCOPE DEFINITION"}
              </span>
              <h2 className={`text-3xl font-black uppercase tracking-tight ${printMode === "dark" ? "text-white" : "text-black"}`}>
                Inclusions & Exclusions
              </h2>
              <div className={`h-[2px] w-12 ${printMode === "dark" ? "bg-[#00e5ff]" : "bg-cyan-700"}`}></div>
            </div>

            {/* Inclusions / Exclusions Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Inclusions */}
              <div className={`p-6 sm:p-8 rounded border ${
                printMode === "dark" 
                  ? "bg-zinc-950/40 border-zinc-850" 
                  : "bg-emerald-50/10 border-gray-200"
              }`}>
                <div className="flex items-center gap-2 pb-4 border-b border-zinc-900 mb-4">
                  <div className={`p-1.5 rounded shrink-0 ${
                    printMode === "dark" ? "bg-[#00e5ff]/10 text-[#00e5ff]" : "bg-emerald-100 text-emerald-800"
                  }`}>
                    <Check className="w-4 h-4" />
                  </div>
                  <h3 className={`text-base font-extrabold uppercase tracking-tight ${
                    printMode === "dark" ? "text-white" : "text-black"
                  }`}>
                    What Is Included
                  </h3>
                </div>

                <ul className="space-y-3">
                  {PROPOSAL_DATA.scope.included.map((inc, i) => (
                    <li key={i} className="flex gap-2.5 items-start text-xs leading-relaxed">
                      <Check className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                        printMode === "dark" ? "text-[#00e5ff]" : "text-emerald-700"
                      }`} />
                      <span className={printMode === "dark" ? "text-zinc-300" : "text-gray-700"}>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Exclusions */}
              <div className={`p-6 sm:p-8 rounded border ${
                printMode === "dark" 
                  ? "bg-zinc-950/40 border-zinc-850" 
                  : "bg-red-50/10 border-gray-200"
              }`}>
                <div className="flex items-center gap-2 pb-4 border-b border-zinc-900 mb-4">
                  <div className={`p-1.5 rounded shrink-0 ${
                    printMode === "dark" ? "bg-amber-500/10 text-amber-500" : "bg-red-100 text-red-800"
                  }`}>
                    <X className="w-4 h-4" />
                  </div>
                  <h3 className={`text-base font-extrabold uppercase tracking-tight ${
                    printMode === "dark" ? "text-white" : "text-black"
                  }`}>
                    What Is Excluded
                  </h3>
                </div>

                <ul className="space-y-3">
                  {PROPOSAL_DATA.scope.excluded.map((exc, i) => (
                    <li key={i} className="flex gap-2.5 items-start text-xs leading-relaxed">
                      <X className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                        printMode === "dark" ? "text-amber-500" : "text-red-700"
                      }`} />
                      <span className={printMode === "dark" ? "text-zinc-300" : "text-gray-700"}>{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Deliverables block */}
            <div className="space-y-4 pt-4">
              <h4 className={`text-xs font-mono font-bold uppercase tracking-wider ${printMode === "dark" ? "text-[#00e5ff]" : "text-cyan-700"}`}>
                Concrete Project Deliverables:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {PROPOSAL_DATA.deliverables.map((deliv, i) => (
                  <div
                    key={i}
                    className={`p-4 rounded border flex flex-col gap-2 ${
                      printMode === "dark" ? "bg-zinc-950/40 border-zinc-850" : "bg-gray-50 border-gray-200"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`p-1.5 rounded shrink-0 ${
                        printMode === "dark" ? "bg-zinc-900 text-[#00e5ff]" : "bg-cyan-50 text-cyan-800"
                      }`}>
                        {getIcon(deliv.icon, "w-4 h-4")}
                      </span>
                      <h5 className={`text-xs font-extrabold uppercase tracking-tight ${
                        printMode === "dark" ? "text-zinc-250" : "text-black"
                      }`}>
                        {deliv.title}
                      </h5>
                    </div>
                    <p className={`text-[11px] leading-relaxed ${
                      printMode === "dark" ? "text-zinc-400" : "text-gray-600"
                    }`}>
                      {deliv.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 8: TIMELINE & MILESTONES */}
        <section
          id="timeline"
          className={`p-8 sm:p-12 border rounded-md mb-12 page-break-section ${
            printMode === "dark" 
              ? "bg-[#0a0a0a]/50 border-zinc-800/80 glass" 
              : "bg-white border-gray-250"
          }`}
        >
          <div className="flex flex-col gap-8">
            <div className="space-y-1">
              <span className={`text-[10px] font-mono uppercase tracking-widest font-extrabold ${printMode === "dark" ? "text-zinc-500" : "text-zinc-400"}`}>
                {"// PROJECT MILESTONES"}
              </span>
              <h2 className={`text-3xl font-black uppercase tracking-tight ${printMode === "dark" ? "text-white" : "text-black"}`}>
                Milestones & Timeline
              </h2>
              <div className={`h-[2px] w-12 ${printMode === "dark" ? "bg-[#00e5ff]" : "bg-cyan-700"}`}></div>
            </div>

            {/* Milestones timeline chart details */}
            <div className="space-y-6">
              {PROPOSAL_DATA.timeline.map((miles, i) => (
                <div
                  key={i}
                  className={`p-5 rounded border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 no-page-break ${
                    printMode === "dark" ? "bg-zinc-950/40 border-zinc-850" : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <div className="space-y-1.5 flex-grow">
                    <div className="flex gap-2.5 items-center">
                      <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded ${
                        printMode === "dark" 
                          ? "bg-zinc-900 border border-zinc-850 text-zinc-400" 
                          : "bg-white border border-gray-300 text-gray-600"
                      }`}>
                        {miles.id}
                      </span>
                      <h4 className={`text-sm font-extrabold uppercase tracking-tight ${
                        printMode === "dark" ? "text-white" : "text-black"
                      }`}>
                        {miles.name}
                      </h4>
                      <span className="text-[10px] font-mono text-zinc-500">
                        ({miles.duration})
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {miles.deliverables.map((del, j) => (
                        <span
                          key={j}
                          className={`px-2 py-0.5 rounded text-[9px] font-mono border ${
                            printMode === "dark" 
                              ? "bg-zinc-950 border-zinc-900 text-zinc-450" 
                              : "bg-white border-gray-200 text-gray-500"
                          }`}
                        >
                          {del}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Completion percentage indicators */}
                  <div className="shrink-0 flex items-center gap-4 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-zinc-900 justify-between">
                    <div className="text-right space-y-0.5">
                      <span className="text-[9px] font-mono text-zinc-500 block uppercase">
                        Current Status
                      </span>
                      <span className={`text-xs font-mono font-bold ${
                        miles.completion === 100 
                          ? (printMode === "dark" ? "text-[#00e5ff]" : "text-emerald-700") 
                          : "text-zinc-500"
                      }`}>
                        {miles.completion === 100 ? "COMPLETED" : `${miles.completion}% READY`}
                      </span>
                    </div>

                    <div className="w-24 bg-zinc-900 h-2 rounded border border-zinc-800 overflow-hidden relative">
                      <div
                        className={`h-full rounded transition-all duration-500 ${
                          printMode === "dark" ? "bg-[#00e5ff]" : "bg-cyan-700"
                        }`}
                        style={{ width: `${miles.completion}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 9: PRICING & BREAKDOWN */}
        <section
          id="pricing"
          className={`p-8 sm:p-12 border rounded-md mb-12 page-break-section ${
            printMode === "dark" 
              ? "bg-[#0a0a0a]/50 border-zinc-800/80 glass" 
              : "bg-white border-gray-250"
          }`}
        >
          <div className="flex flex-col gap-8">
            <div className="space-y-1">
              <span className={`text-[10px] font-mono uppercase tracking-widest font-extrabold ${printMode === "dark" ? "text-zinc-500" : "text-zinc-400"}`}>
                {"// COST ESTIMATES"}
              </span>
              <h2 className={`text-3xl font-black uppercase tracking-tight ${printMode === "dark" ? "text-white" : "text-black"}`}>
                Pricing & Payment Schedule
              </h2>
              <div className={`h-[2px] w-12 ${printMode === "dark" ? "bg-[#00e5ff]" : "bg-cyan-700"}`}></div>
            </div>

            {/* Total Budget Card */}
            <div className={`p-6 sm:p-8 rounded border flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden ${
              printMode === "dark"
                ? "bg-zinc-950/60 border-[#00e5ff]/50 shadow-[0_0_25px_rgba(0,229,255,0.04)]"
                : "bg-cyan-50/20 border-cyan-300"
            }`}>
              <div className="space-y-1">
                <span className={`text-[9px] font-mono uppercase tracking-widest ${printMode === "dark" ? "text-zinc-500" : "text-cyan-800"}`}>
                  TOTAL ESTIMATED INVESTMENT
                </span>
                <h3 className={`text-4xl sm:text-5xl font-black tracking-tight uppercase leading-none ${
                  printMode === "dark" ? "text-[#00e5ff]" : "text-cyan-700"
                }`}>
                  {PROPOSAL_DATA.pricing.totalCost} <span className="text-lg font-mono">{PROPOSAL_DATA.pricing.baseCurrency}</span>
                </h3>
                <p className={`text-xs ${printMode === "dark" ? "text-zinc-450" : "text-gray-600"}`}>
                  Complete end-to-end development, deployment, and 30-day warranty coverage.
                </p>
              </div>

              {/* Cost breakdown progress list */}
              <div className="flex-grow max-w-sm w-full space-y-2 border-t md:border-t-0 md:border-l border-zinc-900 pt-4 md:pt-0 md:pl-6 text-[10px] font-mono text-zinc-400">
                {PROPOSAL_DATA.pricing.breakdown.map((breakd, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between">
                      <span className={printMode === "dark" ? "text-zinc-400" : "text-gray-700"}>{breakd.label}</span>
                      <span className={`font-bold ${printMode === "dark" ? "text-zinc-200" : "text-black"}`}>
                        {breakd.amount} {PROPOSAL_DATA.pricing.baseCurrency} ({breakd.percentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-zinc-900 h-1.5 rounded overflow-hidden relative border border-zinc-850">
                      <div
                        className={`h-full rounded ${printMode === "dark" ? "bg-[#00e5ff]" : "bg-cyan-700"}`}
                        style={{ width: `${breakd.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Schedule Milestones */}
            <div className="space-y-4">
              <h4 className={`text-xs font-mono font-bold uppercase tracking-wider ${printMode === "dark" ? "text-[#00e5ff]" : "text-cyan-700"}`}>
                Milestone Drawdowns:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {PROPOSAL_DATA.pricing.milestones.map((mil, i) => (
                  <div
                    key={i}
                    className={`p-5 rounded border flex flex-col justify-between gap-3 relative ${
                      i === 1 && printMode === "dark"
                        ? "pricing-highlight border-[#00e5ff]/50 bg-zinc-950/20"
                        : i === 1 && printMode === "light"
                        ? "pricing-highlight border-cyan-600 bg-cyan-50/10"
                        : printMode === "dark"
                        ? "bg-zinc-950/40 border-zinc-850"
                        : "bg-gray-50 border-gray-200"
                    }`}
                  >
                    {/* Badge */}
                    <div className="flex justify-between items-baseline">
                      <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${
                        printMode === "dark" ? "text-[#00e5ff]" : "text-cyan-750"
                      }`}>
                        {mil.label}
                      </span>
                    </div>

                    <div className="my-2">
                      <span className={`text-2xl font-black tracking-tight ${printMode === "dark" ? "text-white" : "text-black"}`}>
                        {mil.amount}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-500 ml-1">
                        {PROPOSAL_DATA.pricing.baseCurrency}
                      </span>
                    </div>

                    <p className={`text-[11px] leading-relaxed ${printMode === "dark" ? "text-zinc-400" : "text-gray-600"}`}>
                      {mil.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* SLA / Optional Retainers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              {PROPOSAL_DATA.pricing.maintenance.map((maint, i) => (
                <div
                  key={i}
                  className={`p-5 rounded border ${
                    printMode === "dark" ? "bg-zinc-950/40 border-zinc-850" : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <div className="flex justify-between items-baseline pb-2 border-b border-zinc-900 mb-3">
                    <h5 className={`text-xs font-extrabold uppercase tracking-tight ${
                      printMode === "dark" ? "text-[#00e5ff]" : "text-cyan-750"
                    }`}>
                      {maint.name}
                    </h5>
                    <div>
                      <span className={`text-lg font-mono font-bold ${printMode === "dark" ? "text-white" : "text-black"}`}>
                        {maint.price}
                      </span>
                      <span className="text-[9px] font-mono text-zinc-500">
                        /{maint.period}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-1.5 text-[11px] list-disc list-inside text-zinc-350">
                    {maint.details.map((det, j) => (
                      <li key={j} className={printMode === "dark" ? "text-zinc-450" : "text-gray-600"}>{det}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 10: WHY WORK WITH ME */}
        <section
          id="why-me"
          className={`p-8 sm:p-12 border rounded-md mb-12 page-break-section no-page-break ${
            printMode === "dark" 
              ? "bg-[#0a0a0a]/50 border-zinc-800/80 glass" 
              : "bg-white border-gray-250"
          }`}
        >
          <div className="flex flex-col gap-8">
            <div className="space-y-1">
              <span className={`text-[10px] font-mono uppercase tracking-widest font-extrabold ${printMode === "dark" ? "text-zinc-500" : "text-zinc-400"}`}>
                {"// SERVICE ADVANTAGES"}
              </span>
              <h2 className={`text-3xl font-black uppercase tracking-tight ${printMode === "dark" ? "text-white" : "text-black"}`}>
                Why Work With Me
              </h2>
              <div className={`h-[2px] w-12 ${printMode === "dark" ? "bg-[#00e5ff]" : "bg-cyan-700"}`}></div>
            </div>

            {/* Grid of features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {PROPOSAL_DATA.whyMe.map((item, i) => (
                <div
                  key={i}
                  className={`p-5 rounded border flex flex-col gap-3 ${
                    printMode === "dark" ? "bg-zinc-950/40 border-zinc-850" : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <div className={`p-2 rounded shrink-0 w-fit ${
                    printMode === "dark" ? "bg-zinc-900 text-[#00e5ff]" : "bg-cyan-50 text-cyan-800"
                  }`}>
                    {getIcon(item.icon, "w-4 h-4")}
                  </div>

                  <div className="space-y-1">
                    <h4 className={`text-xs font-extrabold uppercase tracking-tight ${
                      printMode === "dark" ? "text-white" : "text-black"
                    }`}>
                      {item.title}
                    </h4>
                    <p className={`text-[11px] leading-relaxed ${
                      printMode === "dark" ? "text-zinc-400" : "text-gray-600"
                    }`}>
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 11: FAQS */}
        <section
          id="faqs"
          className={`p-8 sm:p-12 border rounded-md mb-12 page-break-section ${
            printMode === "dark" 
              ? "bg-[#0a0a0a]/50 border-zinc-800/80 glass" 
              : "bg-white border-gray-250"
          }`}
        >
          <div className="flex flex-col gap-8">
            <div className="space-y-1">
              <span className={`text-[10px] font-mono uppercase tracking-widest font-extrabold ${printMode === "dark" ? "text-zinc-500" : "text-zinc-400"}`}>
                {"// FREQUENTLY ASKED"}
              </span>
              <h2 className={`text-3xl font-black uppercase tracking-tight ${printMode === "dark" ? "text-white" : "text-black"}`}>
                FAQ
              </h2>
              <div className={`h-[2px] w-12 ${printMode === "dark" ? "bg-[#00e5ff]" : "bg-cyan-700"}`}></div>
            </div>

            {/* Collapsible Accordions (Expanded in print automatically) */}
            <div className="space-y-4">
              {PROPOSAL_DATA.faqs.map((faq, i) => {
                const isOpen = expandedFaq === i;
                return (
                  <div
                    key={i}
                    className={`border rounded no-page-break ${
                      printMode === "dark" 
                        ? "bg-zinc-950/40 border-zinc-850" 
                        : "bg-gray-50 border-gray-200"
                    }`}
                  >
                    <button
                      onClick={() => setExpandedFaq(isOpen ? null : i)}
                      className="w-full flex justify-between items-center p-4 sm:p-5 text-left text-xs font-mono font-bold uppercase tracking-tight text-zinc-300 hover:text-white transition-colors print:pointer-events-none cursor-pointer"
                    >
                      <span className={printMode === "dark" ? "text-zinc-200" : "text-black"}>{faq.question}</span>
                      <span className="print:hidden">
                        {isOpen ? <ChevronUp className="w-4 h-4 text-[#00e5ff]" /> : <ChevronDown className="w-4 h-4 text-zinc-500" />}
                      </span>
                    </button>

                    <div className={`px-4 sm:px-5 pb-5 border-t border-zinc-900 pt-3 print:block ${
                      isOpen ? "block" : "hidden print:block"
                    }`}>
                      <p className={`text-xs leading-relaxed ${
                        printMode === "dark" ? "text-zinc-400" : "text-gray-700"
                      }`}>
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 12: TERMS & CONDITIONS */}
        <section
          id="terms"
          className={`p-8 sm:p-12 border rounded-md mb-12 page-break-section ${
            printMode === "dark" 
              ? "bg-[#0a0a0a]/50 border-zinc-800/80 glass" 
              : "bg-white border-gray-250"
          }`}
        >
          <div className="flex flex-col gap-8">
            <div className="space-y-1">
              <span className={`text-[10px] font-mono uppercase tracking-widest font-extrabold ${printMode === "dark" ? "text-zinc-500" : "text-zinc-400"}`}>
                {"// LEGAL COMPLIANCE"}
              </span>
              <h2 className={`text-3xl font-black uppercase tracking-tight ${printMode === "dark" ? "text-white" : "text-black"}`}>
                Terms & Conditions
              </h2>
              <div className={`h-[2px] w-12 ${printMode === "dark" ? "bg-[#00e5ff]" : "bg-cyan-700"}`}></div>
            </div>

            {/* Terms list */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PROPOSAL_DATA.terms.map((term, i) => (
                <div
                  key={i}
                  className={`p-5 rounded border flex flex-col gap-2 no-page-break ${
                    printMode === "dark" ? "bg-zinc-950/40 border-zinc-850" : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <h4 className={`text-xs font-mono font-bold uppercase tracking-wider ${
                    printMode === "dark" ? "text-[#00e5ff]" : "text-cyan-750"
                  }`}>
                    {term.title}
                  </h4>
                  <p className={`text-[11px] leading-relaxed ${
                    printMode === "dark" ? "text-zinc-400" : "text-gray-650"
                  }`}>
                    {term.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CALL TO ACTION */}
        <section
          className={`p-8 sm:p-12 border rounded-md mb-12 text-center relative overflow-hidden page-break-section no-page-break ${
            printMode === "dark" 
              ? "bg-zinc-950/60 border-zinc-850" 
              : "bg-gray-50 border-gray-250"
          }`}
        >
          {printMode === "dark" && (
            <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none"></div>
          )}

          <div className="max-w-2xl mx-auto flex flex-col items-center gap-6 relative z-10">
            <span className={`text-[10px] font-mono uppercase tracking-widest font-extrabold ${printMode === "dark" ? "text-zinc-500" : "text-cyan-850"}`}>
              {"// CLOSING STATEMENT"}
            </span>
            <h2 className={`text-3xl sm:text-4xl font-black uppercase tracking-tight ${printMode === "dark" ? "text-white" : "text-black"}`}>
              {"Let's Build Rafiqy Together"}
            </h2>
            <p className={`text-sm leading-relaxed ${printMode === "dark" ? "text-zinc-350" : "text-gray-600"}`}>
              Thank you for considering my proposal. I am fully equipped to lead the architecture, security hardening, and production launch of your subscription integration feature. Feel free to contact me directly or check out my work references.
            </p>

            {/* QR Code Placeholder and links */}
            <div className="flex flex-col sm:flex-row items-center gap-8 justify-center w-full pt-4">
              <div className={`p-3 rounded border flex flex-col items-center gap-1.5 ${
                printMode === "dark" ? "bg-zinc-900 border-zinc-800" : "bg-white border-gray-200"
              }`}>
                <div className="w-24 h-24 bg-white border border-gray-300 flex items-center justify-center relative p-1.5">
                  {/* Abstract QR styling */}
                  <div className="w-full h-full bg-zinc-900 flex flex-wrap p-0.5">
                    <div className="w-6 h-6 border-2 border-white m-0.5"></div>
                    <div className="w-6 h-6 border-2 border-white m-0.5 ml-auto"></div>
                    <div className="w-full h-[2px] bg-white mt-auto"></div>
                    <div className="w-6 h-6 border-2 border-white m-0.5 mt-auto"></div>
                  </div>
                </div>
                <span className="text-[8px] font-mono text-zinc-500">SCAN TO VIEW PORTFOLIO</span>
              </div>

              <div className="text-left space-y-3 font-mono text-xs text-zinc-400">
                <div className="flex items-center gap-2">
                  <Mail className={`w-4 h-4 ${printMode === "dark" ? "text-[#00e5ff]" : "text-cyan-700"}`} />
                  <span className={printMode === "dark" ? "text-zinc-300" : "text-black"}>{PROPOSAL_DATA.contact.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className={`w-4 h-4 ${printMode === "dark" ? "text-[#00e5ff]" : "text-cyan-700"}`} />
                  <span className={printMode === "dark" ? "text-zinc-300" : "text-black"}>{PROPOSAL_DATA.contact.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold ${printMode === "dark" ? "text-[#00e5ff]" : "text-cyan-700"}`}>WWW:</span>
                  <a href={PROPOSAL_DATA.contact.portfolio} target="_blank" className={`underline ${printMode === "dark" ? "text-zinc-300 hover:text-white" : "text-blue-700"}`}>
                    abdelrahmanmahmoud262.github.io
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

// Custom Micro icons to avoid Lucide resolution issues
function CodeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function SmartphoneIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  );
}
