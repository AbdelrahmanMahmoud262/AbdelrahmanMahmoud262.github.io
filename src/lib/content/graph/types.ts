export type EntityType = 
  | "ARTICLE" 
  | "CASE_STUDY" 
  | "PROJECT" 
  | "TECHNOLOGY" 
  | "TOPIC" 
  | "PATTERN"
  | "ADR"
  | "COMMAND" 
  | "PAGE";

export type RelationshipType =
  | "USED_IN"
  | "DISCUSSED_IN"
  | "RELATED_TO"
  | "IMPLEMENTED_BY";

export interface Relationship {
  type: RelationshipType;
  targetId: string;
}

export interface ReferenceLink {
  title: string;
  url: string;
  type: "docs" | "paper" | "github" | "rfc" | "android" | "other";
}

export interface Entity {
  id: string; // Hierarchical ID: e.g. "technology.kotlin"
  type: EntityType;
  title: string;
  slug?: string;
  url?: string;
  tags?: string[];
  
  // Decoupled Metadata
  content?: string; // Raw content body if applicable
  seo?: {
    description: string;
    keywords: string[];
    ogImage?: string;
  };
  presentation?: {
    category?: string;
    icon?: string;
    tags: string[];
    technologies: string[];
    experienceLevel?: "Beginner" | "Intermediate" | "Advanced" | "Expert";
    version?: string;
    references?: ReferenceLink[];
    relatedProjects?: string[]; // IDs
  };
  metadata?: {
    date?: string;
    lastModified?: string;
  };
  relationships: Relationship[];
}
