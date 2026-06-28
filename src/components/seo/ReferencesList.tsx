import React from "react";
import { ExternalLink, BookOpen, Award, ShieldCheck, FileText } from "lucide-react";
import { Github } from "@/components/Icons";
import { ReferenceLink } from "@/lib/content/graph/types";

interface ReferencesListProps {
  references: ReferenceLink[];
}

export function ReferencesList({ references }: ReferencesListProps) {
  if (!references || references.length === 0) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case "docs":
        return <FileText className="w-4 h-4 text-[#00e5ff]" />;
      case "github":
        return <Github className="w-4 h-4 text-zinc-450 fill-zinc-450" />;
      case "android":
        return <Award className="w-4 h-4 text-accent-android" />;
      case "rfc":
        return <ShieldCheck className="w-4 h-4 text-amber-500" />;
      default:
        return <BookOpen className="w-4 h-4 text-zinc-500" />;
    }
  };

  return (
    <section aria-label="Article references" className="border-t border-zinc-800/80 pt-10 mt-12">
      <div className="flex flex-col gap-4">
        <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest select-none">
          {"// Citations & Technical References"}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {references.map((ref, idx) => (
            <a
              key={idx}
              href={ref.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 bg-[#121214]/40 border border-zinc-800/80 rounded-md hover:border-[#00e5ff]/20 hover:bg-[#121214]/60 transition-all duration-200 group"
            >
              <div className="flex items-center gap-3">
                {getIcon(ref.type)}
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white group-hover:text-[#00e5ff] transition-colors leading-snug line-clamp-1">
                    {ref.title}
                  </span>
                  <span className="text-[9px] font-mono text-zinc-550 uppercase tracking-wider mt-0.5">
                    {ref.type} URL
                  </span>
                </div>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white transition-colors" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
