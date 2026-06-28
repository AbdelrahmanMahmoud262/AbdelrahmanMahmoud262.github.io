import React from "react";
import Link from "next/link";
import { ArrowLeft, Layers } from "lucide-react";
import { CASE_STUDIES } from "@/constants";

export default function SchoolieCaseStudy() {
  const project = CASE_STUDIES.find((c) => c.id === "schoolie")!;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 flex flex-col gap-12 animate-fadeIn">
      {/* Back button */}
      <Link
        href="/case-studies"
        className="inline-flex items-center gap-1.5 self-start text-xs font-mono text-zinc-400 hover:text-white transition-colors border border-zinc-800 rounded px-4 py-2 bg-[#121214]/60 cursor-pointer"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Case Studies</span>
      </Link>

      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 text-xs font-mono select-none">
          <span className="text-[#00e5ff] font-bold">{project.role}</span>
          <span className="text-zinc-700">•</span>
          <span className="text-zinc-400">{project.company}</span>
          <span className="text-zinc-700">•</span>
          <span className="text-zinc-500">{project.period}</span>
        </div>
        
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-none uppercase">
          {project.title}
        </h1>
        <p className="text-base sm:text-lg text-zinc-450 leading-relaxed max-w-3xl">
          {project.tagline}
        </p>
      </div>

      {/* Technical Highlight Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-8 border-y border-zinc-800/80">
        <div className="bg-[#121214]/20 border border-zinc-800/80 rounded-md p-6">
          <span className="block text-[10px] font-mono text-zinc-500 uppercase select-none">Impact Metric</span>
          <span className="text-xl font-bold text-white">{project.metricValue} Institutions</span>
        </div>
        <div className="bg-[#121214]/20 border border-zinc-800/80 rounded-md p-6">
          <span className="block text-[10px] font-mono text-zinc-500 uppercase select-none">Automation</span>
          <span className="text-sm font-bold text-[#00e5ff]">CI/CD Build Overlays</span>
        </div>
        <div className="bg-[#121214]/20 border border-zinc-800/80 rounded-md p-6">
          <span className="block text-[10px] font-mono text-zinc-500 uppercase select-none">Architecture</span>
          <span className="text-sm font-bold text-white">Clean / Koin Annotations</span>
        </div>
        <div className="bg-[#121214]/20 border border-zinc-800/80 rounded-md p-6">
          <span className="block text-[10px] font-mono text-zinc-500 uppercase select-none">Sync Pipeline</span>
          <span className="text-sm font-bold text-white">WebSockets / Offline Cache</span>
        </div>
      </div>

      {/* Case Study Body (restricted char reading width) */}
      <div className="flex flex-col gap-10 text-sm text-zinc-300 leading-relaxed max-w-3xl">
        {/* Background */}
        <div className="flex flex-col gap-3">
          <h2 className="text-base font-bold text-white tracking-tight border-b border-zinc-800 pb-2 uppercase select-none">Background & Context</h2>
          <p>{project.background}</p>
          <p>{project.businessContext}</p>
        </div>

        {/* Problem */}
        <div className="flex flex-col gap-3">
          <h2 className="text-base font-bold text-white tracking-tight border-b border-zinc-800 pb-2 uppercase select-none">The Problem</h2>
          <p>{project.problem}</p>
        </div>

        {/* System Diagram / Architecture Placeholder */}
        <div className="rounded-md border border-dashed border-zinc-800 bg-[#121214]/25 p-10 text-center flex flex-col gap-3 glass">
          <Layers className="w-8 h-8 text-[#00e5ff] mx-auto animate-pulse" />
          <h4 className="text-sm font-bold text-white uppercase select-none">White-Label Build Flavor & Gradle Directory Mapping</h4>
          <p className="text-xs text-zinc-500 max-w-md mx-auto leading-relaxed">
            [System Diagram: Gradle build flavor dimension hierarchy, overlaying assets from school-specific resource directories over main resources, and automated CI/CD distribution paths.]
          </p>
        </div>

        {/* Technical Challenges */}
        <div className="flex flex-col gap-3">
          <h2 className="text-base font-bold text-white tracking-tight border-b border-zinc-800 pb-2 uppercase select-none">Technical Challenges</h2>
          <ul className="list-disc list-outside ml-4 space-y-2.5">
            {project.challenges.map((challenge, i) => (
              <li key={i}>{challenge}</li>
            ))}
          </ul>
        </div>

        {/* Architecture Decisions */}
        <div className="flex flex-col gap-3">
          <h2 className="text-base font-bold text-white tracking-tight border-b border-zinc-800 pb-2 uppercase select-none">Architecture Decisions</h2>
          <ul className="list-disc list-outside ml-4 space-y-2.5">
            {project.decisions.map((decision, i) => (
              <li key={i}>{decision}</li>
            ))}
          </ul>
        </div>

        {/* Results */}
        <div className="flex flex-col gap-3">
          <h2 className="text-base font-bold text-white tracking-tight border-b border-zinc-800 pb-2 uppercase select-none">Results & Outcomes</h2>
          <ul className="list-disc list-outside ml-4 space-y-2.5">
            {project.results.map((result, i) => (
              <li key={i}>{result}</li>
            ))}
          </ul>
        </div>

        {/* Lessons Learned */}
        <div className="flex flex-col gap-3">
          <h2 className="text-base font-bold text-white tracking-tight border-b border-zinc-800 pb-2 uppercase select-none">Lessons Learned</h2>
          <p>{project.lessons}</p>
        </div>
      </div>
    </div>
  );
}
