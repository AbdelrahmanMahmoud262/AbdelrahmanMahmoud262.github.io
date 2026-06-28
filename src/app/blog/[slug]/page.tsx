import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, Activity } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";
import type { Metadata } from "next";

import {
  getAllSlugs,
  getPostBySlug,
  getAdjacentPosts,
  extractHeadings,
} from "@/lib/content/blog";
import { createMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/components/JsonLd";
import { articleSchema, breadcrumbSchema } from "@/lib/seo/jsonld";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ReadingProgress } from "@/components/seo/ReadingProgress";
import { TableOfContents } from "@/components/seo/TableOfContents";
import { RelatedArticles } from "@/components/seo/RelatedArticles";
import { ReferencesList } from "@/components/seo/ReferencesList";
import { ShareButton } from "@/components/seo/ShareButton";
import { KnowledgeGraph } from "@/lib/content/graph";
import { tokens } from "@/lib/tokens";

// ─── Static Params ────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

// ─── Dynamic Metadata ─────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  return createMetadata({
    title: post.title,
    description: post.description,
    keywords: post.seo?.keywords,
    path: `/blog/${slug}`,
    ogImage: `/og/blog-${slug}.png`,
    type: "article",
    publishedTime: post.date,
    modifiedTime: post.lastModified,
    tags: post.tags,
  });
}

// ─── MDX Options ──────────────────────────────────────────────────────────────

const mdxOptions = {
  remarkPlugins: [remarkGfm],
  rehypePlugins: [
    rehypeSlug,
    [
      rehypePrettyCode,
      {
        theme: "one-dark-pro",
        keepBackground: true,
        defaultLang: "kotlin",
      },
    ],
    [
      rehypeAutolinkHeadings,
      {
        behavior: "wrap",
        properties: {
          className: ["anchor-link"],
          ariaLabel: "Link to section",
        },
      },
    ],
  ],
} as Parameters<typeof MDXRemote>[0]["options"];

// ─── Page Component ───────────────────────────────────────────────────────────

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  // Query Dynamic Recommendations from the Knowledge Graph
  const relatedEntities = await KnowledgeGraph.getRelated(`article.${slug}`, 2);
  const adjacent = await getAdjacentPosts(slug);
  const headings = extractHeadings(post.content);

  const breadcrumbItems = [
    { name: "Blog", url: `${tokens.site.url}/blog/` },
    { name: post.title, url: `${tokens.site.url}/blog/${slug}/` },
  ];

  // E-E-A-T staleness threshold check (180 days)
  const isStale = (new Date().getTime() - new Date(post.lastModified).getTime()) > (180 * 24 * 60 * 60 * 1000);

  return (
    <>
      {/* Structured Data */}
      <JsonLd data={articleSchema(post)} />
      <JsonLd data={breadcrumbSchema(breadcrumbItems)} />

      {/* Reading Progress Bar */}
      <ReadingProgress />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        {/* Back Link */}
        <Link
          href="/blog/"
          className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors border border-zinc-800 rounded px-4 py-2 bg-[#121214]/60 mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Blog
        </Link>

        {/* Breadcrumbs */}
        <div className="mb-8">
          <Breadcrumbs items={breadcrumbItems} />
        </div>

        {/* Main Layout: Content + Sidebar TOC */}
        <div className="flex gap-16 items-start">
          {/* Article */}
          <article className="flex-1 min-w-0">
            {/* Article Header */}
            <header className="flex flex-col gap-4 mb-10">
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-500">
                <span className="text-[#00e5ff] uppercase font-bold">
                  {post.category}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {post.readTime}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-none uppercase">
                {post.title}
              </h1>

              <p className="text-base text-zinc-400 leading-relaxed max-w-2xl">
                {post.description}
              </p>

              {/* EEAT Meta Indicators Bar */}
              <div className="flex flex-wrap gap-3 py-3 border-y border-zinc-850 my-2 text-[10px] font-mono text-zinc-400 select-none">
                {post.experienceLevel && (
                  <span className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 px-2.5 py-1 rounded">
                    <Activity className="w-3.5 h-3.5 text-accent-android" />
                    Level: <strong className="text-white">{post.experienceLevel}</strong>
                  </span>
                )}
                {post.version && (
                  <span className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 px-2.5 py-1 rounded">
                    Version: <strong className="text-white">v{post.version}</strong>
                  </span>
                )}
                <span className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 px-2.5 py-1 rounded">
                  Status: <strong className="text-emerald-500">Reviewed & Active</strong>
                </span>
                {isStale && (
                  <span className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded text-amber-500">
                    * Tech Review Pending (Archived)
                  </span>
                )}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-[10px] font-mono bg-zinc-900 border border-zinc-800 rounded text-zinc-450"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 mt-2">
                <div className="w-8 h-8 rounded-full bg-[#00e5ff]/10 border border-[#00e5ff]/30 flex items-center justify-center text-[10px] font-mono text-[#00e5ff] font-bold select-none">
                  AN
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">
                    {post.author.name}
                  </p>
                  <p className="text-[10px] text-zinc-500">{post.author.role}</p>
                </div>
              </div>
            </header>

            {/* MDX Content */}
            <div className="prose prose-invert prose-zinc max-w-none
              prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight
              prose-h2:text-2xl prose-h2:text-white prose-h2:mt-12 prose-h2:mb-4
              prose-h3:text-lg prose-h3:text-zinc-200 prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-zinc-300 prose-p:leading-relaxed
              prose-strong:text-white
              prose-code:text-[#00e5ff] prose-code:bg-zinc-950 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
              prose-pre:bg-zinc-950 prose-pre:border prose-pre:border-zinc-800 prose-pre:rounded-md prose-pre:my-6
              prose-blockquote:border-l-[#00e5ff] prose-blockquote:text-zinc-400
              prose-a:text-[#00e5ff] prose-a:no-underline hover:prose-a:underline
              prose-table:text-sm prose-th:text-zinc-300 prose-td:text-zinc-400
              prose-li:text-zinc-300 prose-li:marker:text-[#00e5ff]
              prose-hr:border-zinc-800">
              <MDXRemote source={post.content} options={mdxOptions} />
            </div>

            {/* Citations & References Section (EEAT) */}
            <ReferencesList references={post.references || []} />

            {/* Footer: Share + Author */}
            <footer className="mt-12 pt-8 border-t border-zinc-800/80 flex items-center justify-between flex-wrap gap-4">
              <div className="text-xs font-mono text-zinc-500">
                Written by{" "}
                <Link
                  href="/about/"
                  className="text-white hover:text-[#00e5ff] transition-colors"
                >
                  {post.author.name}
                </Link>
              </div>
              <ShareButton />
            </footer>

            {/* Previous / Next Navigation */}
            {(adjacent.prev || adjacent.next) && (
              <nav
                aria-label="Article navigation"
                className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {adjacent.prev && (
                  <Link
                    href={`/blog/${adjacent.prev.slug}/`}
                    className="group flex flex-col gap-1 bg-[#121214]/40 border border-zinc-800/80 rounded-md p-5 hover:border-[#00e5ff]/30 transition-colors"
                  >
                    <span className="text-[10px] font-mono text-zinc-500 uppercase">
                      ← Previous
                    </span>
                    <span className="text-sm font-bold text-white group-hover:text-[#00e5ff] transition-colors line-clamp-2">
                      {adjacent.prev.title}
                    </span>
                  </Link>
                )}
                {adjacent.next && (
                  <Link
                    href={`/blog/${adjacent.next.slug}/`}
                    className="group flex flex-col gap-1 bg-[#121214]/40 border border-zinc-800/80 rounded-md p-5 hover:border-[#00e5ff]/30 transition-colors sm:text-right sm:ml-auto"
                  >
                    <span className="text-[10px] font-mono text-zinc-500 uppercase">
                      Next →
                    </span>
                    <span className="text-sm font-bold text-white group-hover:text-[#00e5ff] transition-colors line-clamp-2">
                      {adjacent.next.title}
                    </span>
                  </Link>
                )}
              </nav>
            )}

            {/* Dynamic Related Articles from Knowledge Graph */}
            <div className="mt-12">
              <RelatedArticles entities={relatedEntities} />
            </div>
          </article>

          {/* Sidebar: Table of Contents */}
          <TableOfContents headings={headings} />
        </div>
      </div>
    </>
  );
}
