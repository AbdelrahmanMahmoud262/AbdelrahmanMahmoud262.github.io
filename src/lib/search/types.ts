import { EntityType } from "@/lib/content/graph/types";

export interface SearchResult {
  id: string;
  title: string;
  url: string;
  excerpt: string;
  category: string;
  type: EntityType;
  score: number;
}

export interface SearchWeights {
  title: number;
  slug: number;
  tech: number;
  tags: number;
  description: number;
  body: number;
}

export interface SearchProvider {
  init(): Promise<void>;
  search(query: string): Promise<SearchResult[]>;
}

export const defaultWeights: SearchWeights = {
  title: 100,
  slug: 80,
  tech: 60,
  tags: 40,
  description: 30,
  body: 10
};
