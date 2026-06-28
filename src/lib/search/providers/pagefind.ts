import { SearchProvider, SearchResult } from "../types";

interface PagefindResultItem {
  data: () => Promise<{
    url: string;
    meta: { title?: string };
    excerpt?: string;
    filters?: { category?: string[] };
  }>;
  score?: number;
}

interface PagefindInstance {
  init: () => Promise<void>;
  search: (query: string) => Promise<{
    results: PagefindResultItem[];
  }>;
}

export class PagefindProvider implements SearchProvider {
  private pagefind: PagefindInstance | null = null;

  async init() {
    if (typeof window === "undefined") return;
    try {
      // In production static export, Pagefind index files are served from /pagefind/
      this.pagefind = await (window as unknown as { import: (url: string) => Promise<PagefindInstance> }).import("/pagefind/pagefind.js");
      await this.pagefind!.init();
    } catch {
      console.warn("Pagefind files not generated yet. Running memory fallback.");
    }
  }

  async search(query: string): Promise<SearchResult[]> {
    if (!this.pagefind) return [];

    try {
      const searchResponse = await this.pagefind.search(query);
      
      const results = await Promise.all(
        searchResponse.results.slice(0, 8).map(async (r) => {
          const data = await r.data();
          const url = data.url;
          
          let type: "ARTICLE" | "CASE_STUDY" | "PROJECT" | "TECHNOLOGY" | "TOPIC" | "COMMAND" | "PAGE" = "ARTICLE";
          if (url.includes("/case-studies/")) {
            type = "CASE_STUDY";
          }

          return {
            id: `pagefind.${url}`,
            title: data.meta.title || "Untitled",
            url,
            excerpt: data.excerpt || "",
            category: data.filters?.category?.[0] || "General",
            type,
            score: r.score || 1
          } as SearchResult;
        })
      );

      return results;
    } catch {
      return [];
    }
  }
}
