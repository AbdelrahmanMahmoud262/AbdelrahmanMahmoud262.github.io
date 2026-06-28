import React from "react";
import Link from "next/link";
import { Smartphone, GitBranch, RefreshCw, Zap, Layers, Users, ArrowRight, ShieldCheck, Mail } from "lucide-react";
import { SERVICES } from "@/constants";

const FAQS = [
  {
    question: "What does an Android Architecture Audit include?",
    answer: "You receive a comprehensive review of your app's package layout, dependency injection patterns (Hilt/Koin), thread safety, repository synchronization, and build speeds. I deliver a technical action document detailing exact lines of code that pose scaling risks, alongside refactoring templates.",
  },
  {
    question: "How do you handle Java-to-Kotlin or XML-to-Compose migrations?",
    answer: "Migrating legacy codebases must not block your roadmap. I establish an interoperability layer where new features are built entirely in Kotlin and Jetpack Compose, while legacy XML classes are migrated incrementally in prioritized phases.",
  },
  {
    question: "Can you act as a temporary Team Lead / Mobile Architect?",
    answer: "Yes. I frequently step in to establish engineering standards, set up automated CI/CD checks, write testing standards, and align product managers with the development team. I also perform PR approvals and code reviews to upskill existing developers.",
  },
  {
    question: "Are your consulting engagements remote?",
    answer: "Yes, I operate primarily remote. I sync with team pipelines using Git, Slack, Jira, and Teams, and adapt easily to GMT+1 through GMT+4 business hours.",
  },
];

export default function Services() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 flex flex-col gap-24">
      {/* Header */}
      <div className="flex flex-col gap-4 max-w-3xl">
        <p className="text-xs font-mono text-accent-android uppercase tracking-wider font-extrabold select-none">
          {"// PREMIUM ANDROID ENGINEERING & ARCHITECTURE"}
        </p>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tighter uppercase leading-none">
          Consulting Services & Solutions
        </h1>
        <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
          I provide technical audits, migrations, and remote leadership to optimize your mobile application pipelines and scale development speed.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {SERVICES.map((service) => (
          <div
            key={service.id}
            id={service.id}
            className="rounded-md border border-zinc-800/80 bg-[#121214]/40 p-8 flex flex-col gap-6 scroll-mt-28 hover:border-zinc-700 hover:scale-[1.01] transition-all duration-300 justify-between glass"
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded bg-[#00e5ff]/10 flex items-center justify-center text-accent-android">
                  {service.icon === "Smartphone" && <Smartphone className="w-6 h-6" />}
                  {service.icon === "GitBranch" && <GitBranch className="w-6 h-6" />}
                  {service.icon === "RefreshCw" && <RefreshCw className="w-6 h-6" />}
                  {service.icon === "Zap" && <Zap className="w-6 h-6" />}
                  {service.icon === "Layers" && <Layers className="w-6 h-6" />}
                  {service.icon === "Users" && <Users className="w-6 h-6" />}
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight uppercase">{service.title}</h3>
              </div>
              <p className="text-xs text-[#00e5ff] font-mono select-none">{service.shortDescription}</p>
              <p className="text-sm text-zinc-400 leading-relaxed">{service.description}</p>
              
              <div className="flex flex-col gap-3 pt-2">
                <h4 className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-extrabold select-none">Key Deliverables:</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-xs text-zinc-300">
                  {service.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#00e5ff] mt-0.5 flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-6 border-t border-zinc-800/80 flex justify-between items-center gap-4">
              <span className="text-[10px] font-mono text-zinc-500 uppercase select-none">Contract // Consultancy</span>
              <Link
                href={`/contact?service=${service.id}`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-android hover:text-white transition-colors"
              >
                <span>Request inquiry</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* FAQ SECTION */}
      <div className="border-t border-zinc-800/80 pt-24 flex flex-col gap-12 max-w-4xl mx-auto w-full">
        <div className="text-center flex flex-col gap-3">
          <h2 className="text-xs font-semibold text-amber-500 uppercase tracking-wider font-mono select-none">
            {"// CLEAR PROCESS"}
          </h2>
          <p className="text-3xl font-black text-white tracking-tight uppercase leading-none">
            Frequently Asked Questions
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {FAQS.map((faq, i) => (
            <div key={i} className="bg-[#121214]/30 border border-zinc-800/80 rounded-md p-6 flex flex-col gap-2 glass">
              <h4 className="text-base font-bold text-white uppercase">{faq.question}</h4>
              <p className="text-sm text-zinc-400 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Services Footer Callout */}
      <div className="text-center bg-gradient-to-r from-zinc-900 to-zinc-950 border border-zinc-800/80 rounded-md p-10 sm:p-16 flex flex-col gap-6 glass max-w-4xl mx-auto w-full relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-[#00e5ff]"></div>
        <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">Need a Custom Mobile Strategy?</h3>
        <p className="text-zinc-400 text-sm max-w-lg mx-auto leading-relaxed">
          If your Android engineering problem is highly specific—such as an Accessibility Service interception engine or anti-uninstall enterprise security—let&apos;s hop on a call to map out a solution.
        </p>
        <div className="pt-2">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded bg-[#00e5ff] text-gray-950 hover:bg-cyan-400 text-xs font-bold transition-all shadow-[0_0_30px_rgba(0,229,255,0.15)]"
          >
            <Mail className="w-4 h-4 text-gray-950" />
            <span>Book Consultation Call</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
