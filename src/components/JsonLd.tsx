/**
 * JsonLd — server component that injects structured data scripts into <head>.
 * Usage: <JsonLd data={articleSchema(post)} />
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
