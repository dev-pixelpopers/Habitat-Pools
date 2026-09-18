import { allServices } from "@/data/services";

/**
 * Words that carry no meaning when matching a service by name, so
 * "pool-and-landscape-design" and "pool-landscape-design" compare equal.
 */
const STOPWORDS = new Set([
  "a",
  "an",
  "and",
  "for",
  "in",
  "of",
  "the",
  "to",
  "with",
  "your",
]);

function tokens(value: string): Set<string> {
  return new Set(
    value
      .toLowerCase()
      .split(/[^a-z]+/)
      .filter((word) => word && !STOPWORDS.has(word)),
  );
}

/**
 * Find the local service whose name overlaps `value` most.
 *
 * The service detail pages under `/services/[slug]` are still served from
 * `src/data/services.ts`, and the CMS words its services differently
 * ("custom-swimming-pool-construction" vs "custom-pool-construction"), so the
 * match is on meaningful words rather than the exact string. Returns `null`
 * when nothing overlaps convincingly.
 */
function matchLocalService(value: string): string | null {
  const wanted = tokens(value);
  if (wanted.size === 0) return null;

  let best: { slug: string; score: number } | null = null;

  for (const service of allServices) {
    const candidate = tokens(`${service.slug} ${service.title} ${service.titleTwo}`);
    let score = 0;
    for (const word of candidate) {
      if (wanted.has(word)) score++;
    }
    if (!best || score > best.score) best = { slug: service.slug, score };
  }

  return best && best.score >= 2 ? best.slug : null;
}

/**
 * Point a CMS service at a detail page that exists, keeping the CMS slug when
 * there is no local equivalent — which is what it will need once the detail
 * route is CMS-driven too.
 */
export function resolveServiceSlug(slug: string): string {
  return matchLocalService(slug) ?? slug;
}

/** Resolve a service link from its display name, for cards with no CMS link. */
export function serviceHrefFromTitle(title: string): string {
  const slug = matchLocalService(title);
  return slug ? `/services/${slug}` : "/services";
}
