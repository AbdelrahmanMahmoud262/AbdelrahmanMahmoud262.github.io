import Link from "next/link";
import { CornerDownRight } from "lucide-react";
import type { Entity } from "@/lib/content/graph/types";

interface RelatedArticlesProps {
  entities: Entity[];
}

/**
 * RelatedArticles — grid of related content cards pulled dynamically from the Knowledge Graph.
 */
export function RelatedArticles({ entities }: RelatedArticlesProps) {
  if (!entities || entities.length === 0) return null;

  return (
    <section aria-label="Related articles" className="border-t border-zinc-800/80 pt-10">
      <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-6 select-none">
        {"// Recommended Platform Insights"}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {entities.map((entity) => {
          const cat = entity.presentation?.category || "Technology";
          const desc = entity.seo?.description || "";
          const readTime = entity.presentation?.experienceLevel || "Tech Dive";

          return (
            <Link
              key={entity.id}
              href={entity.url || `/blog/${entity.slug}/`}
              className="group block bg-[#121214]/40 border border-zinc-800/80 rounded-md p-5 hover:border-[#00e5ff]/30 transition-all duration-200"
            >
              <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500 mb-2">
                <span className="text-[#00e5ff] uppercase font-bold">
                  {cat}
                </span>
                <span>•</span>
                <span>{readTime}</span>
              </div>
              <h3 className="text-sm font-bold text-white group-hover:text-[#00e5ff] transition-colors leading-snug line-clamp-2 mb-2">
                {entity.title}
              </h3>
              {desc && (
                <p className="text-zinc-500 text-xs line-clamp-2 leading-relaxed">
                  {desc}
                </p>
              )}
              <span className="mt-3 flex items-center gap-1 text-[10px] font-mono text-[#00e5ff] group-hover:translate-x-1 transition-transform">
                Explore entity <CornerDownRight className="w-3 h-3" />
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
