import { Entity } from "./types";

export const RelationshipEngine = {
  /**
   * Calculates the relatedness score between two entities.
   * A higher score indicates stronger topical/architectural connection.
   */
  calculateRelatedness(source: Entity, target: Entity): number {
    if (source.id === target.id) return 0;
    
    let score = 0;

    // 1. Direct relationship link (strongly coupled)
    const hasDirectOutbound = source.relationships.some(r => r.targetId === target.id);
    const hasDirectInbound = target.relationships.some(r => r.targetId === source.id);
    if (hasDirectOutbound || hasDirectInbound) {
      score += 15;
    }

    // 2. Share matching technologies (extremely relevant for dev platforms)
    const sourceTech = source.presentation?.technologies || [];
    const targetTech = target.presentation?.technologies || [];
    const techIntersection = sourceTech.filter(t => targetTech.includes(t));
    score += techIntersection.length * 5;

    // 3. Share matching presentation tags
    const sourceTags = source.presentation?.tags || [];
    const targetTags = target.presentation?.tags || [];
    const tagIntersection = sourceTags.filter(t => targetTags.includes(t));
    score += tagIntersection.length * 2;

    // 4. Overlapping category
    const sourceCat = source.presentation?.category || "";
    const targetCat = target.presentation?.category || "";
    if (sourceCat && targetCat && sourceCat === targetCat) {
      score += 3;
    }

    return score;
  }
};
