import { Entity } from "@/lib/content/graph/types";
import { SearchResult, SearchWeights, defaultWeights } from "./types";

/**
 * Scoring algorithm to grade and rank entities against a query text and set of weights.
 */
export function rankEntities(
  entities: Entity[],
  query: string,
  weights: SearchWeights = defaultWeights
): SearchResult[] {
  const cleanQuery = query.toLowerCase().trim();
  if (!cleanQuery) return [];

  return entities
    .map(entity => {
      let score = 0;
      const title = entity.title.toLowerCase();
      const slug = (entity.slug || "").toLowerCase();
      const desc = (entity.seo?.description || "").toLowerCase();
      const body = (entity.content || "").toLowerCase();

      // 1. Exact Title Match
      if (title === cleanQuery) {
        score += weights.title;
      } else if (title.includes(cleanQuery)) {
        score += weights.title * 0.5;
      }

      // 2. Slug Match
      if (slug && slug.includes(cleanQuery)) {
        score += weights.slug;
      }

      // 3. Technologies Match
      const techs = entity.presentation?.technologies || [];
      techs.forEach(tech => {
        if (tech.toLowerCase() === cleanQuery) {
          score += weights.tech;
        } else if (tech.toLowerCase().includes(cleanQuery)) {
          score += weights.tech * 0.5;
        }
      });

      // 4. Tags Match
      const tags = entity.presentation?.tags || [];
      tags.forEach(tag => {
        if (tag.toLowerCase() === cleanQuery) {
          score += weights.tags;
        } else if (tag.toLowerCase().includes(cleanQuery)) {
          score += weights.tags * 0.5;
        }
      });

      // 5. Description Match
      if (desc.includes(cleanQuery)) {
        score += weights.description;
      }

      // 6. Body Content Match
      if (body) {
        const matches = (body.match(new RegExp(escapeRegExp(cleanQuery), "g")) || []).length;
        score += matches * weights.body;
      }

      return {
        id: entity.id,
        title: entity.title,
        url: entity.url || `/blog/${entity.slug}/`,
        excerpt: entity.seo?.description || "",
        category: entity.presentation?.category || "General",
        type: entity.type,
        score
      };
    })
    .filter(res => res.score > 0)
    .sort((a, b) => b.score - a.score);
}

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
