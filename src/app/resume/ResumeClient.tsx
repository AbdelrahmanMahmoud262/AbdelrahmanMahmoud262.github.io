"use client";

import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Printer, Download } from "lucide-react";
import { Github, Linkedin } from "@/components/Icons";
import { PERSONAL_INFO, TECHNICAL_SKILLS, EXPERIENCES } from "@/constants";

export default function ResumeClient() {
  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 flex flex-col gap-8 print:py-0 print:px-0 print:bg-white print:text-black animate-fadeIn">
      {/* Action Buttons (Hidden during Print) */}
      <div className="flex justify-between items-center print:hidden border-b border-zinc-800 pb-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-white uppercase tracking-tight select-none">Interactive CV</h1>
          <p className="text-xs text-zinc-500">Download direct PDF or print sheet.</p>
        </div>
        <div className="flex space-x-3">
          <a
            href="/resume.pdf"
            download="Abdelrahman_Mahmoud_Nasr_Resume.pdf"
            className="inline-flex items-center space-x-1.5 px-4 py-2 rounded bg-[#00e5ff] text-gray-950 hover:bg-cyan-400 text-xs font-bold transition-all cursor-pointer"
          >
            <Download className="w-4 h-4 text-gray-950" />
            <span>Download PDF</span>
          </a>

          <button
            onClick={handlePrint}
            className="inline-flex items-center space-x-1.5 px-4 py-2 rounded border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-xs font-semibold text-zinc-350 hover:text-white transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print Sheet</span>
          </button>
          
          <Link
            href="/contact"
            className="inline-flex items-center space-x-1.5 px-4 py-2 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-350 hover:text-white text-xs font-semibold border border-zinc-800 hover:border-zinc-700 transition-all"
          >
            <span>Contract Leadership</span>
          </Link>
        </div>
      </div>

      {/* Main Resume Sheet */}
      <div className="bg-[#121214]/30 border border-zinc-800/80 rounded-md p-8 sm:p-12 space-y-10 glass print:border-0 print:p-0 print:bg-white print:shadow-none">
        
        {/* CV Header */}
        <div className="text-center space-y-4 print:text-left print:border-b print:pb-6 print:border-gray-300">
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tighter uppercase leading-none print:text-black print:text-2xl">
            {PERSONAL_INFO.name}
          </h2>
          <p className="text-sm font-mono text-accent-android uppercase tracking-wider font-semibold print:text-emerald-700 print:text-xs">
            {PERSONAL_INFO.title}
          </p>
          
          {/* Contact Details Grid */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-zinc-400 pt-2 font-mono print:justify-start print:text-gray-700">
            <span className="flex items-center"><MapPin className="w-3.5 h-3.5 mr-1 text-accent-android print:text-emerald-700" /> {PERSONAL_INFO.location}</span>
            <span className="flex items-center"><Phone className="w-3.5 h-3.5 mr-1 text-accent-android print:text-emerald-700" /> {PERSONAL_INFO.phone}</span>
            <span className="flex items-center"><Mail className="w-3.5 h-3.5 mr-1 text-accent-android print:text-emerald-700" /> {PERSONAL_INFO.email}</span>
            <Link href={PERSONAL_INFO.linkedin} target="_blank" className="flex items-center hover:text-white print:text-blue-700"><Linkedin className="w-3.5 h-3.5 mr-1 text-accent-android print:text-emerald-700" /> LinkedIn</Link>
            <Link href={PERSONAL_INFO.github} target="_blank" className="flex items-center hover:text-white print:text-blue-700"><Github className="w-3.5 h-3.5 mr-1 text-accent-android print:text-emerald-700" /> GitHub</Link>
          </div>
        </div>

        {/* Professional Summary */}
        <div className="space-y-3">
          <h3 className="text-xs font-mono font-bold text-accent-android uppercase tracking-widest border-b border-zinc-800 pb-2 print:text-emerald-700 print:border-gray-300 print:text-[10px]">
            Professional Summary
          </h3>
          <p className="text-sm text-zinc-300 leading-relaxed print:text-gray-800 print:text-xs">
            {PERSONAL_INFO.summary}
          </p>
        </div>

        {/* Technical Skills */}
        <div className="space-y-3">
          <h3 className="text-xs font-mono font-bold text-accent-android uppercase tracking-widest border-b border-zinc-800 pb-2 print:text-emerald-700 print:border-gray-300 print:text-[10px]">
            Technical Skills
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-1">
            {TECHNICAL_SKILLS.map((cat, i) => (
              <div key={i} className="border-l-2 border-zinc-800 pl-6 py-3 flex flex-col gap-1.5 print:border-zinc-300 print:pl-3 print:py-0">
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wider print:text-black print:text-[10px]">
                  {cat.category}
                </span>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {cat.skills.map((skill, j) => (
                    <span
                      key={j}
                      className="px-4 py-2 rounded text-[10px] font-mono bg-zinc-900/40 text-zinc-300 border border-zinc-800/80 print:bg-transparent print:border-transparent print:text-black print:p-0 print:text-[10px] print:after:content-[',_'] last:print:after:content-none"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Experience Section */}
        <div className="space-y-6">
          <h3 className="text-xs font-mono font-bold text-accent-android uppercase tracking-widest border-b border-zinc-800 pb-2 print:text-emerald-700 print:border-gray-300 print:text-[10px]">
            Professional Experience
          </h3>
          
          <div className="space-y-8">
            {EXPERIENCES.map((exp, i) => (
              <div key={i} className="space-y-2.5 print:break-inside-avoid">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                  <div>
                    <span className="text-sm font-extrabold text-white print:text-black print:text-xs">
                      {exp.role}
                    </span>
                    <span className="text-gray-500 mx-1.5 font-mono text-xs">•</span>
                    <span className="text-xs font-mono font-semibold text-[#00e5ff] print:text-emerald-700 print:text-xs">
                      {exp.company}
                    </span>
                  </div>
                  <div className="text-[10px] font-mono text-zinc-500 pt-0.5 sm:pt-0 print:text-gray-600">
                    {exp.period} | {exp.location}
                  </div>
                </div>
                
                <ul className="list-disc list-outside ml-4 space-y-1.5 text-xs text-zinc-300 print:text-gray-800 print:text-[11px] leading-relaxed">
                  {exp.highlights.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Education & Continuous Learning */}
        <div className="space-y-3 print:break-inside-avoid">
          <h3 className="text-xs font-mono font-bold text-accent-android uppercase tracking-widest border-b border-zinc-800 pb-2 print:text-emerald-700 print:border-gray-300 print:text-[10px]">
            Education & Continuous Learning
          </h3>
          <ul className="list-disc list-outside ml-4 flex flex-col gap-2 text-xs text-zinc-300 print:text-gray-800 print:text-[11px]">
            <li>CS50: Introduction to Computer Science • Harvard University (Online) 2023</li>
            <li>Advanced Android App Development • Udacity 2021</li>
            <li>Java Basics • Udacity 2019</li>
            <li className="font-mono text-zinc-300 print:text-gray-700">
              <span className="font-bold text-white print:text-black">Professional Reading:</span> Clean Android Architecture (Dumbravan), Kotlin Coroutines Deep Dive (Moskala), Android UI Development with Jetpack Compose (Kuenneth)
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
