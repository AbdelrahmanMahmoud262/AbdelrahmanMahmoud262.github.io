import { SearchProvider, SearchResult } from "../types";
import { rankStaticIndex } from "../static-index";

export class MemorySearchProvider implements SearchProvider {
  async init() {
    // Warm-up is not required as it queries the static index directly
  }

  async search(query: string): Promise<SearchResult[]> {
    return rankStaticIndex(query);
  }
}
