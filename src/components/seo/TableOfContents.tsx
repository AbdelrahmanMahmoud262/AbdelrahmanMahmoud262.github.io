"use client";

import { useEffect, useState } from "react";

interface Heading {
  text: string;
  level: number;
  id: string;
}

interface TableOfContentsProps {
  headings: Heading[];
}

/**
 * TableOfContents — sticky sidebar TOC with active section highlighting.
 * Client component — uses IntersectionObserver to track the active heading.
 */
export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0px 0px -80% 0px", threshold: 0 }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <aside className="hidden xl:block w-56 flex-shrink-0">
      <div className="sticky top-32">
        <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-3 select-none">
          {"// On This Page"}
        </p>
        <nav aria-label="Table of contents">
          <ol className="flex flex-col gap-1.5">
            {headings.map(({ text, level, id }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={`block text-xs leading-snug transition-colors hover:text-[#00e5ff] ${
                    level === 3 ? "pl-3" : ""
                  } ${
                    activeId === id
                      ? "text-[#00e5ff] font-medium"
                      : "text-zinc-500"
                  }`}
                >
                  {text}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </aside>
  );
}
