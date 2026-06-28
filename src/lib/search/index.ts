import { SearchProvider, SearchResult } from "./types";
import { MemorySearchProvider } from "./providers/memory";

let activeProvider: SearchProvider | null = null;

export const Search = {
  async getProvider(): Promise<SearchProvider> {
    if (activeProvider) return activeProvider;

    // Check if we are running in the browser and in production
    if (typeof window !== "undefined" && process.env.NODE_ENV === "production") {
      try {
        const { PagefindProvider } = await import("./providers/pagefind");
        const pagefind = new PagefindProvider();
        await pagefind.init();
        activeProvider = pagefind;
        return activeProvider;
      } catch {
        // Fallback to MemorySearchProvider on failure
      }
    }

    const memory = new MemorySearchProvider();
    await memory.init();
    activeProvider = memory;
    return activeProvider;
  },

  async query(text: string): Promise<SearchResult[]> {
    const provider = await this.getProvider();
    return provider.search(text);
  }
};
