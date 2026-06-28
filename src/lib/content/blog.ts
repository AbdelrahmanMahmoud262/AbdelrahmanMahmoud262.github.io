import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { BlogPost, BlogPostFrontmatter } from "./types";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function parsePost(filename: string): BlogPost {
  const slug = filename.replace(/\.mdx$/, "");
  const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf-8");
  const { data, content } = matter(raw);
  return { ...(data as BlogPostFrontmatter), slug, content };
}

/** Returns all blog posts sorted by date descending */
export async function getAllPosts(): Promise<BlogPost[]> {
  const files = fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"));

  return files
    .map(parsePost)
    .sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
}

/** Returns a single post by slug, or null if not found */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  return parsePost(`${slug}.mdx`);
}

/** Returns all slugs — used by generateStaticParams */
export async function getAllSlugs(): Promise<string[]> {
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

/** Returns posts related to a given slug (by relatedArticles frontmatter) */
export async function getRelatedPosts(
  slug: string,
  limit = 3
): Promise<BlogPost[]> {
  const post = await getPostBySlug(slug);
  if (!post?.relatedArticles?.length) return [];

  const related = await Promise.all(
    post.relatedArticles.slice(0, limit).map((s) => getPostBySlug(s))
  );
  return related.filter(Boolean) as BlogPost[];
}

/** Returns the previous and next posts relative to a given slug */
export async function getAdjacentPosts(slug: string): Promise<{
  prev: BlogPost | null;
  next: BlogPost | null;
}> {
  const all = await getAllPosts();
  const index = all.findIndex((p) => p.slug === slug);
  return {
    prev: index > 0 ? all[index - 1] : null,
    next: index < all.length - 1 ? all[index + 1] : null,
  };
}

/** Extracts heading items from MDX source for Table of Contents */
export function extractHeadings(
  content: string
): { text: string; level: number; id: string }[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: { text: string; level: number; id: string }[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const text = match[2].replace(/[*_`[\]]/g, "").trim();
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
    headings.push({ text, level: match[1].length, id });
  }

  return headings;
}
