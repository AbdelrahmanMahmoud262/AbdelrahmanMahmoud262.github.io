import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  Smartphone,
  Cpu,
  Layers,
  Award,
  ArrowUpRight,
  ShieldCheck,
  Download,
} from "lucide-react";
import {
  METRICS,
  SERVICES,
  CASE_STUDIES,
  BLOG_POSTS,
  TECHNICAL_SKILLS,
} from "@/constants";
import { createMetadata } from "@/lib/seo/metadata";
import InteractiveTerminal from "@/components/InteractiveTerminal";

export const metadata: Metadata = createMetadata({
  title: "Abdelrahman Nasr | Senior Android Architect & Team Lead",
  description:
    "Senior Android Developer and Team Lead specializing in Kotlin, Jetpack Compose, Clean Architecture, and high-performance background engines. Based in Cairo, Egypt. Available for remote consulting worldwide.",
  keywords: [
    "Senior Android Developer Egypt",
    "Android Team Lead Cairo",
    "Jetpack Compose Consultant",
    "Clean Architecture Android Expert",
    "Remote Mobile Architect Middle East",
  ],
  path: "",
  ogImage: "/og/home.png",
});

export default function Home() {
  return (
    <div className="w-full flex flex-col gap-24 md:gap-32 pb-32 items-center justify-start">
      {/* 1. HERO SECTION */}
      <section className="w-full max-w-7xl mx-auto relative min-h-[85vh] flex flex-col justify-center py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
          {/* Hero Content */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="inline-flex items-center gap-2.5 self-start px-3 py-1 rounded border border-zinc-850 bg-zinc-900/30 text-[10px] text-zinc-400 font-mono uppercase tracking-widest select-none">
              <span className="flex h-1.5 w-1.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#00e5ff]"></span>
              </span>
              <span>{"SYSTEMS_ENG // AVAILABLE_FOR_CONSULTANCY"}</span>
            </div>
            
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-[1.05] uppercase">
              Architecting <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500">
                High-Performance
              </span> <br />
              <span className="underline decoration-[#00e5ff] decoration-4 underline-offset-12">
                Android Systems
              </span>
            </h1>

            <p className="text-base sm:text-lg text-zinc-400 max-w-xl leading-relaxed">
              I am a Senior Android Engineer and Team Lead with 6+ years of experience. I specialize in building offline-first systems, automating white-label deployments, and implementing high-efficiency background engines.
            </p>

            <div className="flex flex-wrap gap-8 pt-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 text-sm font-semibold text-gray-950 rounded bg-[#00e5ff] hover:bg-cyan-400 focus:outline-none transition-all duration-300 shadow-[0_0_30px_rgba(0,229,255,0.15)] gap-2 cursor-pointer"
              >
                <span>Start Consultation</span>
                <ArrowRight className="w-4 h-4 text-gray-950" />
              </Link>
              
              <Link
                href="/resume"
                className="inline-flex items-center justify-center px-8 py-4 rounded border border-zinc-800 bg-[#121214]/60 text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-800/80 transition-all gap-2"
              >
                <Download className="w-4 h-4 text-[#00e5ff]" />
                <span>View Resume</span>
              </Link>
            </div>
          </div>

          {/* Interactive ADB Terminal */}
          <div className="lg:col-span-5 w-full">
            <InteractiveTerminal />
          </div>
        </div>
      </section>

      {/* 2. METRICS SECTION */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-y border-zinc-800/80 py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {METRICS.map((metric, i) => (
            <div
              key={i}
              className="text-center p-8 rounded-md bg-[#121214]/30 border border-zinc-800/80 glass hover:border-zinc-700 hover:scale-[1.01] transition-all duration-300 flex flex-col justify-center items-center gap-2"
            >
              <div className="text-4xl sm:text-5xl font-black text-white tracking-tighter">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00e5ff] to-cyan-400">
                  {metric.value}
                </span>
              </div>
              <div className="text-xs font-mono text-zinc-400 uppercase tracking-widest font-extrabold">
                {metric.label}
              </div>
              <div className="text-xs text-zinc-500 max-w-[200px] mx-auto leading-relaxed">
                {metric.description}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. COMPANIES & PRODUCTS */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-8 py-24 border-b border-zinc-800/80">
        <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest font-mono select-none">
          {"// PROVEN AT SCALE ACROSS REGIONAL LEADERS"}
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {[
            { name: "ALMYAAR", desc: "Taxi Alwatani Lead" },
            { name: "SAGA / SCHOOLIE", desc: "40+ White-Label Apps" },
            { name: "DEVELOP NETWORK", desc: "Enterprise Android" },
            { name: "VERTEX CODE UK", desc: "Technical Advisory" },
            { name: "RAFIQY", desc: "Wellness Solo Product" }
          ].map((client, i) => (
            <div key={i} className="px-5 py-3 rounded border border-zinc-900 bg-zinc-950/20 text-zinc-400 font-mono text-xs flex flex-col items-center gap-1.5 select-none hover:border-zinc-850 hover:text-white transition-all duration-300">
              <span className="font-bold tracking-widest text-zinc-300">{client.name}</span>
              <span className="text-[9px] text-[#00e5ff] font-semibold">{client.desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 4. SERVICES OVERVIEW */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-16 py-24 border-b border-zinc-800/80">
        <div className="text-center max-w-2xl mx-auto flex flex-col gap-3">
          <h2 className="text-xs font-semibold text-[#00e5ff] uppercase tracking-wider font-mono">
            {"// EXPERT OFFERINGS"}
          </h2>
          <p className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase leading-none">
            High-Impact Android Engineering Services
          </p>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Tailored technical consulting and native development targeted at eliminating performance bottlenecks and scaling your mobile offerings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SERVICES.slice(0, 3).map((service) => (
            <div
              key={service.id}
              className="rounded-md border border-zinc-800/80 bg-[#121214]/40 p-8 flex flex-col justify-between hover:border-zinc-700 hover:scale-[1.01] transition-all duration-300 glass"
            >
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded bg-[#00e5ff]/10 flex items-center justify-center text-accent-android">
                  {service.id === "android-dev" && <Smartphone className="w-6 h-6" />}
                  {service.id === "architecture-reviews" && <Cpu className="w-6 h-6" />}
                  {service.id === "compose-migration" && <Layers className="w-6 h-6" />}
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">{service.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{service.description}</p>
              </div>
              <Link
                href={`/services#${service.id}`}
                className="inline-flex items-center gap-2 text-xs font-mono text-accent-android hover:text-white pt-6 transition-colors"
                aria-label={`Learn more about ${service.title}`}
              >
                <span>Learn more</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white font-semibold transition-colors"
          >
            <span>View All Services</span>
            <ArrowRight className="w-4 h-4 text-accent-android" />
          </Link>
        </div>
      </section>

      {/* 5. FEATURED CASE STUDIES */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-16 py-24 border-b border-zinc-800/80">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="flex flex-col gap-2">
            <h2 className="text-xs font-semibold text-[#00e5ff] uppercase tracking-wider font-mono">
              {"// IN THE FIELD"}
            </h2>
            <p className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase leading-none">
              Featured Case Studies
            </p>
          </div>
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white transition-colors"
          >
            <span>Explore all case studies</span>
            <ArrowUpRight className="w-4 h-4 text-accent-android" />
          </Link>
        </div>

        {/* Case Studies Grid (Asymmetric Layout) */}
        <div className="flex flex-col gap-8">
          {CASE_STUDIES.map((project, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={project.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-md border border-zinc-800 bg-[#121214]/30 p-8 hover:border-zinc-700 hover:scale-[1.005] transition-all duration-300 glass`}
              >
                {/* Context Summary */}
                <div className={`lg:col-span-7 flex flex-col gap-4 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                  <div className="flex items-center gap-2 text-xs font-mono">
                    <span className="text-[#00e5ff] font-bold">{project.role}</span>
                    <span className="text-zinc-700">•</span>
                    <span className="text-zinc-400">{project.company}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-none uppercase">
                    {project.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed max-w-xl">{project.tagline}</p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.technologies.slice(0, 5).map((tech, j) => (
                      <span
                        key={j}
                        className="px-3.5 py-1.5 rounded text-[10px] font-mono bg-zinc-900 border border-zinc-800 text-zinc-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Metric Callout Card */}
                <div className={`lg:col-span-5 bg-zinc-950 border border-zinc-850 rounded-md p-8 text-center flex flex-col gap-3 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                  <div className="text-5xl font-black text-white tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-550">
                    {project.metricValue}
                  </div>
                  <div className="text-xs font-mono text-[#00e5ff] uppercase tracking-wider font-extrabold">
                    {project.metricLabel}
                  </div>
                  <div className="pt-3">
                    <Link
                      href={`/case-studies/${project.id}`}
                      className="inline-flex items-center justify-center w-full px-4 py-3 rounded bg-zinc-900 hover:bg-zinc-800 text-xs font-semibold text-white border border-zinc-800 hover:border-zinc-700 transition-all gap-1.5"
                    >
                      <span>Read Technical Review</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. LEADERSHIP EXPERIENCE & ARCHITECTURE EXPERTISE */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 py-24 border-b border-zinc-800/80">
        {/* Leadership */}
        <div className="flex flex-col gap-6">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00e5ff] uppercase tracking-wider font-bold">
            <Award className="w-4 h-4" />
            <span>Engineering Leadership</span>
          </div>
          <h3 className="text-3xl font-black text-white tracking-tight uppercase leading-none">
            Team Coordination & Architecture Governance
          </h3>
          <p className="text-zinc-400 text-sm leading-relaxed">
            As a Team Lead, I drive engineering excellence by setting code guidelines, performing strict PR reviews, and coordinating sprints. I bridge the gap between complex engineering capabilities and business goals to ship features efficiently.
          </p>
          <ul className="flex flex-col gap-3 text-sm text-zinc-300">
            <li className="flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#00e5ff] mt-1 flex-shrink-0" />
              <span>Promoted to Team Lead at Almyaar within 4 months of hire.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#00e5ff] mt-1 flex-shrink-0" />
              <span>Managed architectural direction and code reviews for a team of 3 developers.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#00e5ff] mt-1 flex-shrink-0" />
              <span>Directly reporting to senior product managers and executive sponsors.</span>
            </li>
          </ul>
        </div>

        {/* Architecture */}
        <div className="flex flex-col gap-6">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-amber-500 uppercase tracking-wider font-bold">
            <Cpu className="w-4 h-4" />
            <span>Architecture Expertise</span>
          </div>
          <h3 className="text-3xl font-black text-white tracking-tight uppercase leading-none">
            Decoupled, Offline-First Mobile Architectures
          </h3>
          <p className="text-zinc-400 text-sm leading-relaxed">
            My engineering strategy focuses on decoupled multi-module systems that support horizontal scaling. I build resilient offline-first caches and optimize network flows to provide smooth application delivery.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#121214]/30 border border-zinc-800/80 rounded-md p-5 flex flex-col gap-1 glass">
              <div className="text-xs font-mono text-amber-500 uppercase font-extrabold">Clean Architecture</div>
              <p className="text-[11px] text-zinc-500 leading-normal">Strict separation of data, domain, and presentation layers.</p>
            </div>
            <div className="bg-[#121214]/30 border border-zinc-800/80 rounded-md p-5 flex flex-col gap-1 glass">
              <div className="text-xs font-mono text-amber-500 uppercase font-extrabold">Multi-Module</div>
              <p className="text-[11px] text-zinc-500 leading-normal">Decomposing monolithic codebases to improve build speeds.</p>
            </div>
            <div className="bg-[#121214]/30 border border-zinc-800/80 rounded-md p-5 flex flex-col gap-1 glass">
              <div className="text-xs font-mono text-amber-500 uppercase font-extrabold">Offline-First</div>
              <p className="text-[11px] text-zinc-500 leading-normal">Database synchronization and smart sync mechanisms.</p>
            </div>
            <div className="bg-[#121214]/30 border border-zinc-800/80 rounded-md p-5 flex flex-col gap-1 glass">
              <div className="text-xs font-mono text-amber-500 uppercase font-extrabold">Async & Flow</div>
              <p className="text-[11px] text-zinc-500 leading-normal">Efficient data streaming with Coroutines, Flow, and channels.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. TECHNICAL EXPERTISE SKILLS GRID */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-16 py-24 border-b border-zinc-800/80">
        <div className="text-center max-w-2xl mx-auto flex flex-col gap-2">
          <h2 className="text-xs font-semibold text-[#00e5ff] uppercase tracking-wider font-mono">
            {"// STACK SUMMARY"}
          </h2>
          <p className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase leading-none">
            Technical Stack & Ecosystem
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TECHNICAL_SKILLS.slice(0, 4).map((category, i) => (
            <div key={i} className="bg-[#121214]/30 border border-zinc-800/80 rounded-md p-6 flex flex-col gap-4 relative overflow-hidden group hover:border-zinc-700 transition-all duration-300">
              <div className="absolute top-0 left-0 w-1 h-full bg-[#00e5ff]/40"></div>
              <h3 className="text-xs font-mono text-[#00e5ff] uppercase tracking-wider font-extrabold pb-2 border-b border-zinc-850 select-none">
                {category.category}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {category.skills.map((skill, j) => (
                  <span
                    key={j}
                    className="px-3.5 py-1.5 rounded bg-zinc-900/50 text-zinc-300 border border-zinc-800 text-[10px] font-mono hover:text-white hover:border-zinc-750 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. BLOG PREVIEW */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-16 py-24 border-b border-zinc-800/80">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="flex flex-col gap-2">
            <h2 className="text-xs font-semibold text-[#00e5ff] uppercase tracking-wider font-mono">
              {"// PUBLICATIONS"}
            </h2>
            <p className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase leading-none">
              Technical Insights & Writing
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white transition-colors"
          >
            <span>Read all articles</span>
            <ArrowUpRight className="w-4 h-4 text-accent-android" />
          </Link>
        </div>

        {/* Blog Asymmetric Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Featured Article (Spans 8 columns) */}
          {BLOG_POSTS.slice(0, 1).map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}/`}
              className="lg:col-span-8 bg-[#121214]/30 border border-zinc-800/80 rounded-md p-8 flex flex-col justify-between gap-6 hover:border-zinc-700 transition-all duration-300 relative group cursor-pointer"
            >
              <div className="absolute top-0 right-0 px-3 py-1 bg-[#00e5ff]/15 text-[#00e5ff] text-[9px] font-mono uppercase tracking-widest rounded-bl select-none">
                Featured Article
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4 text-xs font-mono text-zinc-500">
                  <span className="text-[#00e5ff] uppercase font-bold">{post.category}</span>
                  <span>•</span>
                  <span>{post.date}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white hover:text-accent-android transition-colors uppercase leading-none">
                  {post.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed max-w-xl">{post.excerpt}</p>
              </div>
              <div className="flex justify-between items-center text-xs font-mono text-zinc-500 pt-4 border-t border-zinc-850">
                <span>{post.readTime}</span>
                <span className="text-[#00e5ff] group-hover:translate-x-1.5 transition-transform flex items-center gap-1 font-bold">
                  Read Article <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}

          {/* Secondary Articles Stack (Spans 4 columns) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {BLOG_POSTS.slice(1, 3).map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}/`}
                className="bg-[#121214]/20 border border-zinc-800/80 rounded-md p-6 flex flex-col justify-between gap-4 hover:border-zinc-700 transition-all duration-300 cursor-pointer block"
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500">
                    <span className="text-[#00e5ff] uppercase font-bold">{post.category}</span>
                    <span>{post.date}</span>
                  </div>
                  <h3 className="text-sm font-bold text-white hover:text-accent-android transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h3>
                </div>
                <div className="text-[10px] font-mono text-zinc-500">{post.readTime}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 9. CONTACT CTA (High-Converting Visual Overhaul) */}
      <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className="bg-gradient-to-r from-zinc-900 to-zinc-950 border-2 border-zinc-800/80 rounded-md p-10 sm:p-16 flex flex-col gap-8 items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 blueprint-dots opacity-10 pointer-events-none"></div>
          <div className="absolute top-0 left-0 w-full h-1 bg-[#00e5ff]"></div>
          
          <h2 className="text-xs font-semibold text-[#00e5ff] uppercase tracking-widest font-mono select-none">
            {"// READY TO SCALE?"}
          </h2>
          <h3 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tighter leading-none uppercase">
            Let&apos;s Architect <br />
            Your Mobile System
          </h3>
          <p className="text-zinc-400 text-sm max-w-xl mx-auto leading-relaxed">
            Whether you need a legacy refactor, performance diagnostic, automated build flavors configuration, or remote technical leadership—I am ready to help.
          </p>
          <div className="pt-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 text-sm font-bold text-gray-950 rounded bg-[#00e5ff] hover:bg-cyan-400 transition-all duration-300 shadow-[0_0_30px_rgba(0,229,255,0.2)] gap-2 cursor-pointer"
            >
              <span>Start Project Query</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
