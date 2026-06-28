import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/seo/jsonld";
import type { BreadcrumbItem } from "@/lib/content/types";
import { tokens } from "@/lib/tokens";

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

/**
 * Breadcrumbs — renders semantic breadcrumb nav + injects BreadcrumbList JSON-LD.
 * Use on case studies, blog posts, and any deep route.
 */
export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const fullItems: BreadcrumbItem[] = [
    { name: "Home", url: tokens.site.url + "/" },
    ...items,
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(fullItems)} />
      <nav aria-label="breadcrumb">
        <ol className="flex items-center gap-2 text-xs font-mono text-zinc-500 flex-wrap">
          {fullItems.map((item, index) => {
            const isLast = index === fullItems.length - 1;
            return (
              <li key={item.url} className="flex items-center gap-2">
                {isLast ? (
                  <span
                    className="text-zinc-300"
                    aria-current="page"
                  >
                    {item.name}
                  </span>
                ) : (
                  <>
                    <Link
                      href={item.url}
                      className="hover:text-[#00e5ff] transition-colors"
                    >
                      {item.name}
                    </Link>
                    <span aria-hidden="true" className="text-zinc-700">
                      /
                    </span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
