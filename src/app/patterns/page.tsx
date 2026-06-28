import type { Metadata } from "next";
import {
  Activity,
  ArrowUpRight,
  CheckCircle2,
  Database,
  GitBranch,
  Radio,
  ShieldCheck,
} from "lucide-react";
import { createMetadata } from "@/lib/seo/metadata";
import {
  ARCHITECTURE_DECISIONS,
  ENGINEERING_PATTERNS,
  PROJECT_MATRIX,
} from "@/lib/knowledge/catalog";

export const metadata: Metadata = createMetadata({
  title: "Android Engineering Pattern Catalog & ADRs",
  description:
    "A source-verified catalog of Android architecture patterns, trade-offs, and decision records extracted across five production codebases.",
  keywords: [
    "Android architecture patterns",
    "Android ADR examples",
    "Kotlin Clean Architecture",
    "Android foreground service architecture",
    "Room offline-first patterns",
  ],
  path: "/patterns",
  ogImage: "/og/blog.png",
});

const patternIcons = [GitBranch, Radio, Database, Activity, ShieldCheck, GitBranch];

export default function PatternsPage() {
  return (
    <div className="w-full pb-28">
      <section className="border-b border-zinc-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 grid lg:grid-cols-[minmax(0,1fr)_300px] gap-12 items-end">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 text-xs font-mono text-[#00e5ff] uppercase font-bold mb-5">
              <span className="w-8 h-px bg-[#00e5ff]" />
              Source-verified knowledge base
            </div>
            <h1 className="text-4xl sm:text-6xl font-black uppercase leading-[0.95] text-white">
              Architecture Pattern Catalog
            </h1>
            <p className="mt-6 max-w-3xl text-zinc-400 text-base sm:text-lg leading-relaxed">
              Reusable decisions extracted from five Android systems. Every entry
              separates observed implementation from inferred intent and records
              the limits that matter in production.
            </p>
          </div>

          <dl className="border-l border-zinc-800 pl-6 grid grid-cols-2 gap-x-6 gap-y-5 font-mono">
            <div>
              <dt className="text-[10px] uppercase text-zinc-500">Codebases</dt>
              <dd className="text-2xl font-bold text-white mt-1">05</dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase text-zinc-500">Patterns</dt>
              <dd className="text-2xl font-bold text-white mt-1">06</dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase text-zinc-500">ADRs</dt>
              <dd className="text-2xl font-bold text-white mt-1">04</dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase text-zinc-500">Evidence</dt>
              <dd className="text-sm font-bold text-[#00e5ff] mt-2">CODE</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between gap-6 mb-8">
          <div>
            <p className="text-[10px] font-mono text-zinc-500 uppercase mb-2">Pattern index</p>
            <h2 className="text-2xl sm:text-3xl font-black uppercase text-white">Repeated engineering moves</h2>
          </div>
          <p className="hidden md:block text-xs font-mono text-zinc-500">Verified on 2026-06-28</p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 border-t border-l border-zinc-800/80">
          {ENGINEERING_PATTERNS.map((pattern, index) => {
            const Icon = patternIcons[index];
            const accent = pattern.accent === "cyan" ? "text-[#00e5ff]" : "text-amber-400";
            return (
              <article
                id={pattern.id}
                key={pattern.id}
                className="min-h-[310px] p-6 border-r border-b border-zinc-800/80 bg-[#0a0a0c]/55 flex flex-col"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-zinc-500">{pattern.index}</span>
                  <Icon className={`w-5 h-5 ${accent}`} aria-hidden="true" />
                </div>
                <h3 className="mt-8 text-xl font-bold text-white">{pattern.title}</h3>
                <p className="mt-3 text-sm text-zinc-400 leading-relaxed">{pattern.summary}</p>
                <div className="mt-auto pt-8">
                  <div className="flex flex-wrap gap-1.5">
                    {pattern.projects.map((project) => (
                      <span key={project} className="text-[10px] font-mono text-zinc-400 border border-zinc-800 px-2 py-1">
                        {project}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center justify-between text-[10px] font-mono uppercase">
                    <span className={`flex items-center gap-1.5 ${accent}`}>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {pattern.confidence}
                    </span>
                    <span className="text-zinc-600">{pattern.evidence}</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="border-y border-zinc-800/80 bg-[#070708]/75">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-8">
            <p className="text-[10px] font-mono text-zinc-500 uppercase mb-2">Comparison matrix</p>
            <h2 className="text-2xl sm:text-3xl font-black uppercase text-white">Same constraints, different boundaries</h2>
          </div>
          <div className="overflow-x-auto border border-zinc-800/80">
            <table className="w-full min-w-[900px] text-left">
              <thead className="bg-zinc-950 text-[10px] font-mono uppercase text-zinc-500">
                <tr>
                  <th className="p-4 font-medium">Project</th>
                  <th className="p-4 font-medium">Boundary</th>
                  <th className="p-4 font-medium">Realtime</th>
                  <th className="p-4 font-medium">Local state</th>
                  <th className="p-4 font-medium">Runtime</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/80">
                {PROJECT_MATRIX.map((row) => (
                  <tr key={row.project} className="text-sm text-zinc-400 hover:bg-zinc-900/40">
                    <th className="p-4 text-white font-semibold">{row.project}</th>
                    <td className="p-4">{row.boundary}</td>
                    <td className="p-4">{row.realtime}</td>
                    <td className="p-4">{row.local}</td>
                    <td className="p-4">{row.runtime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-[260px_minmax(0,1fr)] gap-10">
          <div>
            <p className="text-[10px] font-mono text-[#00e5ff] uppercase mb-2">Decision log</p>
            <h2 className="text-2xl font-black uppercase text-white">Architecture records</h2>
            <p className="mt-4 text-sm text-zinc-500 leading-relaxed">
              The implementation is verified. Decision intent is marked as inferred when the repositories contain no written design record.
            </p>
          </div>
          <div className="border-t border-zinc-800/80">
            {ARCHITECTURE_DECISIONS.map((adr) => (
              <article id={adr.id} key={adr.id} className="py-7 border-b border-zinc-800/80 grid md:grid-cols-[120px_minmax(0,1fr)] gap-5">
                <div>
                  <p className="text-xs font-mono text-[#00e5ff]">{adr.number}</p>
                  <p className="text-[10px] font-mono uppercase text-zinc-600 mt-2">{adr.status}</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    {adr.title}
                    <ArrowUpRight className="w-4 h-4 text-zinc-600" aria-hidden="true" />
                  </h3>
                  <p className="mt-3 text-sm text-zinc-300 leading-relaxed">{adr.decision}</p>
                  <p className="mt-3 text-sm text-zinc-500 leading-relaxed">{adr.consequence}</p>
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    {adr.projects.map((project) => (
                      <span key={project} className="text-[10px] font-mono text-zinc-500">{project}</span>
                    ))}
                    <span className="text-[10px] font-mono text-amber-400 ml-auto">{adr.confidence}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

