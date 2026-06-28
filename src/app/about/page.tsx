import type { Metadata } from "next";
import { BookOpen, Award, Globe } from "lucide-react";
import { TECHNICAL_SKILLS } from "@/constants";
import { createMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/components/JsonLd";
import { profilePageSchema } from "@/lib/seo/jsonld";

export const metadata: Metadata = createMetadata({
  title: "About — Android Architect & Team Lead",
  description:
    "Learn about Abdelrahman Nasr — 6+ years of Android development experience, CS50 Harvard certified, Team Lead at Almyaar. Specializing in Kotlin, Jetpack Compose, and Clean Architecture. Based in Cairo, Egypt.",
  keywords: [
    "Android developer biography",
    "Android engineer Egypt",
    "CS50 certified Android developer",
    "Kotlin expert Cairo",
  ],
  path: "/about",
  ogImage: "/og/about.png",
});

const PROFESSIONAL_READINGS = [
  {
    title: "Clean Android Architecture",
    author: "Alexandru Dumbravan",
    concept: "Modular Clean Design Principles & Enterprise Scaling Patterns",
  },
  {
    title: "Kotlin Coroutines Deep Dive",
    author: "Marcin Moskala",
    concept: "Advanced Async Concurrency, Channels, Flows, and Thread Safety",
  },
  {
    title: "Android UI Development with Jetpack Compose",
    author: "Thomas Kuenneth",
    concept: "Declarative Composable Layouts, Custom Systems, and Optimization",
  },
];

const CERTIFICATIONS = [
  {
    title: "CS50: Introduction to Computer Science",
    institution: "Harvard University (Online)",
    year: "2023",
  },
  {
    title: "Advanced Android App Development",
    institution: "Udacity",
    year: "2021",
  },
  {
    title: "Java Basics",
    institution: "Udacity",
    year: "2019",
  },
];

const LANGS = [
  { name: "Arabic", level: "Native Proficiency" },
  { name: "English", level: "Fluent Professional" },
  { name: "French", level: "Conversational" },
];

export default function About() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 flex flex-col gap-16">
      <JsonLd data={profilePageSchema()} />
      {/* Page Header */}
      <div className="flex flex-col gap-4 max-w-3xl">
        <p className="text-xs font-mono text-accent-android uppercase tracking-wider font-extrabold select-none">
          {"// TEAM LEAD & MOBILE SYSTEMS ARCHITECT"}

        </p>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tighter uppercase leading-none">
          About Abdelrahman Nasr
        </h1>
        <p className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-2xl">
          I design and build premium Android applications that focus on stability, testability, and efficient performance under real-world conditions.
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Biography Column (65-75 char width limit layout) */}
        <div className="lg:col-span-7 flex flex-col gap-12">
          <div className="flex flex-col gap-6 max-w-2xl">
            <h2 className="text-xl font-bold text-white tracking-tight border-b border-zinc-800 pb-2 uppercase select-none">
              Professional Journey
            </h2>
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              With over six years of dedicated native Android engineering experience, I have transitioned from building independent wellness products to directing remote engineering teams for major regional ride-hailing and education platforms.
            </p>
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              Currently, I drive development across two key remote projects: **Taxi Alwatani**, Iraq&apos;s primary ride-hailing platform serving 30,000+ active users, and **Schoolie**, a white-label education management ecosystem deployed at 40+ institutions in Egypt, the UAE, and Saudi Arabia.
            </p>
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              My engineering philosophy revolves around Clean Architecture, strict SOLID principles, and structured concurrency. I believe that writing code is only half of the job; setting architectural standards, automating build configurations, and establishing solid testing routines are what allow teams to move fast without introducing regressions.
            </p>
          </div>

          {/* Professional Reading */}
          <div className="flex flex-col gap-6 max-w-2xl">
            <h2 className="text-xl font-bold text-white tracking-tight border-b border-zinc-800 pb-2 flex items-center gap-2 uppercase select-none">
              <BookOpen className="w-5 h-5 text-accent-android" />
              <span>Professional Reading & Mentorship</span>
            </h2>
            <p className="text-xs text-zinc-400">
              I stay updated on current system design patterns by reviewing top-tier engineering publications and applying their architectural ideas to real-world projects:
            </p>
            <div className="flex flex-col gap-4">
              {PROFESSIONAL_READINGS.map((book, i) => (
                <div key={i} className="bg-[#121214]/30 border border-zinc-800/80 rounded-md p-5 flex flex-col gap-1.5 glass">
                  <h3 className="text-sm font-bold text-white">
                    {book.title} <span className="text-xs text-zinc-500 font-normal font-mono">by {book.author}</span>
                  </h3>
                  <p className="text-xs text-[#00e5ff] font-mono">{book.concept}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Info Column */}
        <div className="lg:col-span-5 flex flex-col gap-10">
          {/* Tech stack directory */}
          <div className="flex flex-col gap-4 bg-[#121214]/30 border border-zinc-800/80 rounded-md p-6 glass">
            <h3 className="text-base font-bold text-white border-b border-zinc-800 pb-2 select-none uppercase">
              Core Capabilities
            </h3>
            <div className="flex flex-col gap-4">
              {TECHNICAL_SKILLS.slice(0, 5).map((category, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <h4 className="text-[10px] font-mono text-[#00e5ff] uppercase tracking-wider font-extrabold">{category.category}</h4>
                  <div className="flex flex-wrap gap-1.5 pt-0.5">
                    {category.skills.map((skill, j) => (
                      <span
                        key={j}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-900 border border-zinc-800 text-zinc-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="flex flex-col gap-4 bg-[#121214]/30 border border-zinc-800/80 rounded-md p-6 glass">
            <h3 className="text-base font-bold text-white border-b border-zinc-800 pb-2 flex items-center gap-2 select-none uppercase">
              <Award className="w-4 h-4 text-amber-500" />
              <span>Certificates & Learning</span>
            </h3>
            <div className="flex flex-col gap-3">
              {CERTIFICATIONS.map((cert, i) => (
                <div key={i} className="flex justify-between items-start text-xs border-b border-zinc-800/60 pb-2 last:border-0 last:pb-0">
                  <div className="max-w-[80%]">
                    <h4 className="font-bold text-white">{cert.title}</h4>
                    <p className="text-zinc-500 font-mono text-[10px]">{cert.institution}</p>
                  </div>
                  <span className="text-amber-500 font-mono text-[10px]">{cert.year}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div className="flex flex-col gap-4 bg-[#121214]/30 border border-zinc-800/80 rounded-md p-6 glass">
            <h3 className="text-base font-bold text-white border-b border-zinc-800 pb-2 flex items-center gap-2 select-none uppercase">
              <Globe className="w-4 h-4 text-accent-android" />
              <span>Languages</span>
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {LANGS.map((lang, i) => (
                <div key={i} className="text-center flex flex-col gap-1">
                  <div className="text-sm font-bold text-white">{lang.name}</div>
                  <div className="text-[10px] text-zinc-500 font-mono leading-none">{lang.level}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
