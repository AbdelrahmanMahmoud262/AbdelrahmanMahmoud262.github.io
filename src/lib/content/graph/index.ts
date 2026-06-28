import { Entity, EntityType, RelationshipType } from "./types";
import { TECHNOLOGIES } from "./technologies";
import { TOPICS } from "./topics";
import { RelationshipEngine } from "./relationshipEngine";
import { getAllPosts } from "@/lib/content/blog";
import { CASE_STUDIES } from "@/constants";
import { ARCHITECTURE_DECISIONS, ENGINEERING_PATTERNS } from "@/lib/knowledge/catalog";

let graphCache: Entity[] | null = null;

export const KnowledgeGraph = {
  /**
   * Builds the entire Knowledge Graph by loading all entities (Articles, Case Studies, Projects, Technologies, Topics, Pages, Commands)
   * and dynamically mapping their bidirectional relationships.
   */
  async get(): Promise<Entity[]> {
    if (graphCache) return graphCache;

    const entities: Entity[] = [];

    // 1. Add static Page entities
    const staticPages: Entity[] = [
      { id: "page.home", type: "PAGE", title: "Home", slug: "", url: "/", tags: [], relationships: [] },
      { id: "page.about", type: "PAGE", title: "About", slug: "about", url: "/about/", tags: [], relationships: [] },
      { id: "page.case-studies", type: "PAGE", title: "Case Studies", slug: "case-studies", url: "/case-studies/", tags: [], relationships: [] },
      { id: "page.services", type: "PAGE", title: "Services", slug: "services", url: "/services/", tags: [], relationships: [] },
      { id: "page.blog", type: "PAGE", title: "Blog & Publication", slug: "blog", url: "/blog/", tags: [], relationships: [] },
      { id: "page.patterns", type: "PAGE", title: "Pattern Catalog & ADRs", slug: "patterns", url: "/patterns/", tags: ["Architecture", "ADRs"], relationships: [] },
      { id: "page.resume", type: "PAGE", title: "Resume", slug: "resume", url: "/resume/", tags: [], relationships: [] },
      { id: "page.contact", type: "PAGE", title: "Contact", slug: "contact", url: "/contact/", tags: [], relationships: [] },
      { id: "page.privacy", type: "PAGE", title: "Privacy Policy", slug: "privacy", url: "/privacy/", tags: [], relationships: [] }
    ];
    entities.push(...staticPages);

    // 2. Add Technologies & Topics
    entities.push(...JSON.parse(JSON.stringify(TECHNOLOGIES)));
    entities.push(...JSON.parse(JSON.stringify(TOPICS)));

    // 3. Add Project Case Studies (from constants)
    const projects: Entity[] = CASE_STUDIES.map(project => ({
      id: `project.${project.id}`,
      type: "PROJECT",
      title: project.title,
      slug: project.id,
      url: `/case-studies/${project.id}/`,
      seo: {
        description: project.tagline,
        keywords: [project.title, "Android Project", project.role]
      },
      presentation: {
        category: "Case Studies",
        tags: [project.role, project.company],
        technologies: project.technologies.map(t => t.toLowerCase())
      },
      tags: project.technologies,
      relationships: []
    }));
    entities.push(...projects);

    // 4. Add dynamic Blog Articles (loaded from MDX)
    const posts = await getAllPosts();
    const articles: Entity[] = posts.map(post => ({
      id: `article.${post.slug}`,
      type: "ARTICLE",
      title: post.title,
      slug: post.slug,
      url: `/blog/${post.slug}/`,
      content: post.content,
      seo: {
        description: post.description,
        keywords: post.seo?.keywords || []
      },
      presentation: {
        category: post.category,
        tags: post.tags,
        technologies: (post.technologies || []).map(t => t.toLowerCase()),
        experienceLevel: post.experienceLevel,
        version: post.version,
        references: post.references || []
      },
      metadata: {
        date: post.date,
        lastModified: post.lastModified
      },
      tags: post.tags,
      relationships: []
    }));
    entities.push(...articles);

    // 5. Add verified cross-project patterns and decision records
    const patterns: Entity[] = ENGINEERING_PATTERNS.map(pattern => ({
      id: `pattern.${pattern.id}`,
      type: "PATTERN",
      title: pattern.title,
      slug: pattern.id,
      url: `/patterns/#${pattern.id}`,
      tags: pattern.projects,
      seo: {
        description: pattern.summary,
        keywords: [pattern.title, ...pattern.projects]
      },
      presentation: {
        category: "Engineering Patterns",
        tags: pattern.projects,
        technologies: []
      },
      relationships: []
    }));
    entities.push(...patterns);

    const decisions: Entity[] = ARCHITECTURE_DECISIONS.map(adr => ({
      id: `adr.${adr.id}`,
      type: "ADR",
      title: `${adr.number}: ${adr.title}`,
      slug: adr.id,
      url: `/patterns/#${adr.id}`,
      tags: [adr.status, ...adr.projects],
      seo: {
        description: adr.decision,
        keywords: [adr.number, "Architecture Decision Record", ...adr.projects]
      },
      presentation: {
        category: "Architecture Decisions",
        tags: [adr.status, adr.confidence],
        technologies: []
      },
      relationships: adr.patternIds.map(patternId => ({
        type: "RELATED_TO" as RelationshipType,
        targetId: `pattern.${patternId}`
      }))
    }));
    entities.push(...decisions);

    // 6. Dynamic Relationship Inference Engine (Bidirectional Mapping)
    entities.forEach(source => {
      // Analyze references to technologies & topics
      const sourceTechs = (source.presentation?.technologies || []).map(t => t.toLowerCase());
      const sourceTags = (source.tags || []).map(t => t.toLowerCase());

      entities.forEach(target => {
        if (source.id === target.id) return;

        // Technology linkage
        if (target.type === "TECHNOLOGY") {
          const techSlug = target.slug?.toLowerCase() || "";
          const matchByTechName = sourceTechs.includes(techSlug) || sourceTechs.some(st => st.includes(techSlug));
          if (matchByTechName) {
            this.addRelationship(source, "USED_IN", target.id);
            this.addRelationship(target, "USED_IN", source.id);
          }
        }

        // Topic linkage
        if (target.type === "TOPIC") {
          const topicSlug = target.slug?.toLowerCase() || "";
          const matchByTopic = sourceTags.includes(topicSlug) || sourceTechs.some(st => st.includes(topicSlug));
          if (matchByTopic) {
            this.addRelationship(source, "RELATED_TO", target.id);
            this.addRelationship(target, "RELATED_TO", source.id);
          }
        }
      });
    });

    // 7. Graph Validation (Gives build safety)
    this.validate(entities);

    graphCache = entities;
    return entities;
  },

  /**
   * Helper to add a relationship safely without duplicates
   */
  addRelationship(entity: Entity, type: RelationshipType, targetId: string) {
    const exists = entity.relationships.some(r => r.targetId === targetId && r.type === type);
    if (!exists) {
      entity.relationships.push({ type, targetId });
    }
  },

  /**
   * Graph validator pipeline
   */
  validate(entities: Entity[]) {
    const ids = new Set<string>();
    
    // 1. Detect duplicate IDs
    entities.forEach(entity => {
      if (ids.has(entity.id)) {
        throw new Error(`Knowledge Graph Integrity Error: Duplicate Entity ID detected: "${entity.id}"`);
      }
      ids.add(entity.id);
    });

    // 2. Detect dangling relationships & orphans
    entities.forEach(entity => {
      // Verify all target IDs exist in the registry
      entity.relationships.forEach(rel => {
        if (!ids.has(rel.targetId)) {
          throw new Error(`Knowledge Graph Integrity Error: Dangling relationship in "${entity.id}" pointing to non-existent ID "${rel.targetId}"`);
        }
      });
    });
  },

  /**
   * Query API: get all related entities, sorted by matching weights
   */
  async getRelated(entityId: string, limit = 4): Promise<Entity[]> {
    const registry = await this.get();
    const source = registry.find(item => item.id === entityId);
    if (!source) return [];

    return registry
      .filter(item => item.id !== entityId && item.type !== "PAGE" && item.type !== "COMMAND")
      .map(target => {
        const score = RelationshipEngine.calculateRelatedness(source, target);
        return { entity: target, score };
      })
      .filter(res => res.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(res => res.entity);
  },

  /**
   * Query API: fetch specific entity types
   */
  async getByType(type: EntityType): Promise<Entity[]> {
    const registry = await this.get();
    return registry.filter(item => item.type === type);
  }
};
