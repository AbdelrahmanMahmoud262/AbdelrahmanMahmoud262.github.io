import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { CASE_STUDIES } from "@/constants";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createMetadata({
  title: "Technical Case Studies — Production Android Projects",
  description:
    "In-depth case studies of production Android projects: Taxi Alwatani ride-hailing platform (30K+ users, Iraq), Schoolie white-label education app (40+ institutions), and Rafiqy digital wellness platform.",
  keywords: [
    "Android case studies",
    "Android portfolio projects",
    "ride-hailing app Android",
    "white-label Android app",
    "Android architecture portfolio",
  ],
  path: "/case-studies",
  ogImage: "/og/case-studies.png",
});

export default function CaseStudies() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 flex flex-col gap-16 animate-fadeIn">
      {/* Page Header */}
      <div className="flex flex-col gap-4 max-w-3xl">
        <p className="text-xs font-mono text-accent-android uppercase tracking-wider font-extrabold select-none">
          {"// ARCHITECTURE REVIEWS & PRODUCTION SYSTEMS"}
        </p>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tighter uppercase leading-none">
          Technical Case Studies
        </h1>
        <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
          Deep-dives into problem-solving, architectural design decisions, and quantifiable performance results on live systems.
        </p>
      </div>

      {/* Case Studies Lists */}
      <div className="flex flex-col gap-12">
        {CASE_STUDIES.map((project, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <div
              key={project.id}
              className="rounded-md border border-zinc-800 bg-[#121214]/30 p-12 hover:border-[#00e5ff]/30 hover:scale-[1.005] transition-all duration-300 flex flex-col justify-between glass"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Info Column */}
                <div className={`lg:col-span-8 flex flex-col gap-4 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                  <div className="flex items-center gap-2 text-xs font-mono select-none">
                    <span className="text-[#00e5ff] font-bold">{project.role}</span>
                    <span className="text-zinc-700">•</span>
                    <span className="text-zinc-450">{project.company}</span>
                    <span className="text-zinc-700">•</span>
                    <span className="text-zinc-500">{project.period}</span>
                  </div>
                  
                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase leading-none">
                    {project.title}
                  </h3>
                  <p className="text-sm text-zinc-355 leading-relaxed max-w-2xl">
                    {project.tagline}
                  </p>

                  <div className="pt-2 flex flex-col gap-2">
                    <h4 className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-extrabold select-none">
                      Core Technologies:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3.5 py-1.5 rounded text-[10px] font-mono bg-zinc-900 border border-zinc-850 text-zinc-400"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Statistics Column */}
                <div className={`lg:col-span-4 bg-zinc-950 border border-zinc-850 rounded-md p-10 text-center flex flex-col gap-4 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                  <div className="flex flex-col gap-1">
                    <div className="text-5xl font-black text-white tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-550">
                      {project.metricValue}
                    </div>
                    <div className="text-xs font-mono text-[#00e5ff] uppercase tracking-wider font-extrabold select-none">
                      {project.metricLabel}
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <Link
                      href={`/case-studies/${project.id}`}
                      className="inline-flex items-center justify-center w-full px-8 py-4.5 rounded bg-[#00e5ff] text-gray-950 hover:bg-cyan-400 text-xs font-bold transition-all gap-1.5 shadow-[0_0_20px_rgba(0,229,255,0.1)]"
                    >
                      <span>Analyze Architecture</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
