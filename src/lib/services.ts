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
 * The three services, named the way the business names them.
 *
 * WordPress words the same three differently on each page — the service posts
 * say "custom pool Construction In Arizona" and "Pool & Landscape Design",
 * the services listing says "Pool Remodeling & Renovations", the home page
 * gets them right — so every service name the CMS returns is normalised
 * through here before it renders, and the whole site agrees on one wording.
 *
 * Keyed by the local service slug that `matchLocalService` resolves to.
 */
const CANONICAL_NAMES: Record<string, string> = {
  "custom-pool-construction": "Custom Swimming Pool Construction",
  "pool-and-landscape-design": "Custom Pool & Landscape Design",
  "pool-remodeling-and-renovations": "Pool Remodeling & Backyard Renovations",
};

export interface ServiceIdentity {
  /** The service name, as the business words it. */
  name: string;
  /** The `/services/[slug]` that name links to. */
  slug: string;
}

/**
 * Work out which of the three services `value` names. A CMS slug, a post
 * title, or a category label typed into the CMS all resolve, since the match
 * is on meaningful words. Returns `null` when `value` names none of them.
 */
export function identifyService(value: string): ServiceIdentity | null {
  const slug = matchLocalService(value);
  if (!slug) return null;

  const name = CANONICAL_NAMES[slug];
  return name ? { name, slug } : null;
}

/** The canonical name for the service `value` names, or `null` for none. */
export function canonicalServiceName(value: string): string | null {
  return identifyService(value)?.name ?? null;
}

/**
 * The name to print on a service card: the service the card links to wins,
 * then the card's own title. The CMS title stands when neither names one of
 * the three, so an extra card the CMS adds later still renders its own copy.
 */
export function canonicalCardTitle(title: string, linkedSlug?: string): string {
  return (
    (linkedSlug ? canonicalServiceName(linkedSlug) : null) ??
    canonicalServiceName(title) ??
    title
  );
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
