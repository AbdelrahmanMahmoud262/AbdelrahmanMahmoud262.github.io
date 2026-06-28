import Link from "next/link";
import { CornerDownRight } from "lucide-react";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/content/blog";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createMetadata({
  title: "Technical Blog — Android Architecture & Kotlin Deep Dives",
  description:
    "Technical articles on Android development, Jetpack Compose, Kotlin Coroutines, Clean Architecture, offline-first systems, and engineering leadership by Abdelrahman Nasr.",
  keywords: [
    "Android development blog",
    "Kotlin tutorial",
    "Jetpack Compose articles",
    "Android architecture articles",
    "Clean Architecture Android",
    "Android performance optimization",
  ],
  path: "/blog",
  ogImage: "/og/blog.png",
});

export default async function BlogPage() {
  const posts = await getAllPosts();
  const featured = posts[0];
  const secondary = posts.slice(1, 3);
  const rest = posts.slice(3);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 flex flex-col gap-16">
      {/* Header */}
      <div className="flex flex-col gap-4 max-w-3xl">
        <p className="text-xs font-mono text-[#00e5ff] uppercase tracking-wider font-extrabold select-none">
          {"// KOTLIN, JETPACK COMPOSE, & MOBILE ARCHITECTURE"}
        </p>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tighter uppercase leading-none">
          Technical Publication &amp; Blog
        </h1>
        <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
          Deep-dives into Android system internals, memory profile optimization,
          and build automation architectures.
        </p>
      </div>

      {/* Asymmetric Featured Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Featured Post (spans 8 cols) */}
        {featured && (
          <Link
            href={`/blog/${featured.slug}/`}
            className="lg:col-span-8 bg-[#121214]/30 border border-zinc-800/80 rounded-md p-8 flex flex-col justify-between gap-6 hover:border-[#00e5ff]/30 hover:scale-[1.005] transition-all duration-300 relative group glass"
          >
            <div className="absolute top-0 right-0 px-3 py-1 bg-[#00e5ff]/15 text-[#00e5ff] text-[9px] font-mono uppercase tracking-widest rounded-bl select-none">
              Featured Article
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4 text-xs font-mono text-zinc-500">
                <span className="text-[#00e5ff] uppercase font-bold">
                  {featured.category}
                </span>
                <span>•</span>
                <time dateTime={featured.date}>
                  {new Date(featured.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white group-hover:text-[#00e5ff] transition-colors uppercase leading-none">
                {featured.title}
              </h2>
              <p className="text-zinc-400 text-sm leading-relaxed max-w-xl">
                {featured.description}
              </p>
            </div>
            <div className="border-t border-zinc-800/80 pt-4 flex justify-between items-center text-xs font-mono text-zinc-500">
              <span>{featured.readTime}</span>
              <span className="text-[#00e5ff] group-hover:translate-x-1.5 transition-transform flex items-center gap-1 font-bold">
                Read Article <CornerDownRight className="w-4 h-4" />
              </span>
            </div>
          </Link>
        )}

        {/* Secondary Stack (spans 4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {secondary.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}/`}
              className="bg-[#121214]/20 border border-zinc-800/80 rounded-md p-6 flex flex-col justify-between gap-4 hover:border-[#00e5ff]/30 hover:scale-[1.005] transition-all duration-300 glass group"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500">
                  <span className="text-[#00e5ff] uppercase font-bold">
                    {post.category}
                  </span>
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                </div>
                <h2 className="text-sm font-bold text-white group-hover:text-[#00e5ff] transition-colors line-clamp-2 leading-snug">
                  {post.title}
                </h2>
                <p className="text-zinc-500 text-xs line-clamp-2 leading-relaxed">
                  {post.description}
                </p>
              </div>
              <div className="border-t border-zinc-800 pt-3 flex justify-between items-center text-[10px] font-mono text-zinc-500">
                <span>{post.readTime}</span>
                <span className="text-[#00e5ff] flex items-center gap-1">
                  Read <CornerDownRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Rest of Articles */}
      {rest.length > 0 && (
        <div className="flex flex-col gap-4">
          <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest select-none">
            {"// More Articles"}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}/`}
                className="group bg-[#121214]/20 border border-zinc-800/80 rounded-md p-6 flex flex-col justify-between gap-4 hover:border-[#00e5ff]/30 transition-all duration-200 glass"
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500">
                    <span className="text-[#00e5ff] uppercase font-bold">
                      {post.category}
                    </span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h2 className="text-sm font-bold text-white group-hover:text-[#00e5ff] transition-colors leading-snug line-clamp-3">
                    {post.title}
                  </h2>
                  <p className="text-zinc-500 text-xs line-clamp-2 leading-relaxed">
                    {post.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="border-t border-zinc-800/80 pt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-1 select-none">
            {"// More on the way"}
          </p>
          <p className="text-white font-bold text-lg">
            New articles published regularly
          </p>
        </div>
        <Link
          href="/contact/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#00e5ff]/10 hover:bg-[#00e5ff]/20 border border-[#00e5ff]/40 rounded text-sm font-mono text-[#00e5ff] transition-all"
        >
          Suggest a Topic
        </Link>
      </div>
    </div>
  );
}
