import type { Metadata } from "next";
import type {
  AcfFields,
  AcfImage,
  AcfPostObject,
  WPPost,
  YoastHeadJson,
} from "./wp-types";

/**
 * Thin client for the headless WordPress install that backs this site.
 *
 * Every request is a collection request (`/pages?slug=…`, `/project`, …), so
 * the helpers always resolve to an array and fall back to `[]` when the CMS is
 * unreachable. Callers then fall back to their own defaults rather than the
 * page failing to render.
 */

const API_DOMAIN = process.env.NEXT_PUBLIC_API_DOMAIN ?? "hb-pools.demo-link.tech";
const API_PATH = process.env.NEXT_PUBLIC_API_URL ?? "wp-json/wp/v2";

/** Seconds before a cached CMS response is refreshed in the background. */
export const WP_REVALIDATE = 300;

interface FetchOptions {
  /** ISR window in seconds. Pass 0 to always hit the CMS. */
  revalidate?: number;
  /** Cache tags, so a webhook can call `revalidateTag` on publish. */
  tags?: string[];
  retries?: number;
}

export async function fetchData<T = unknown>(
  endpoint: string,
  { revalidate = WP_REVALIDATE, tags = ["wp"], retries = 3 }: FetchOptions = {},
): Promise<T[]> {
  let url = `https://${API_DOMAIN}/${API_PATH}/${endpoint}`;
  url +=
    (url.includes("?") ? "&" : "?") +
    "per_page=100&acf_format=standard&status=publish&_embed";

  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const res = await fetch(url, {
        signal: AbortSignal.timeout(30_000),
        next: { revalidate, tags },
      });

      if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`);
      }

      const json = await res.json();
      // Collection endpoints return an array; a stray object (an error body,
      // a single resource) is normalised so callers only handle one shape.
      return Array.isArray(json) ? (json as T[]) : [json as T];
    } catch (err) {
      const last = attempt === retries - 1;
      if (last) {
        console.error(
          `[wp] fetch failed for "${endpoint}":`,
          err instanceof Error ? err.message : err,
        );
        return [];
      }
      await new Promise((resolve) => setTimeout(resolve, 2000 * (attempt + 1)));
    }
  }

  return [];
}

/** Fetch a WP page by its slug, e.g. `getPageBySlug("home")`. */
export async function getPageBySlug<TAcf extends object = AcfFields>(
  slug: string,
  options?: FetchOptions,
): Promise<WPPost<TAcf> | null> {
  const pages = await fetchData<WPPost<TAcf>>(`pages?slug=${slug}`, options);
  return pages[0] ?? null;
}

/** Fetch every entry of a custom post type, e.g. `getCustomPostType("project")`. */
export async function getCustomPostType<TAcf extends object = AcfFields>(
  endpoint: string,
  options?: FetchOptions,
): Promise<WPPost<TAcf>[]> {
  return fetchData<WPPost<TAcf>>(endpoint, options);
}

/**
 * Fetch specific entries of a post type by ID, preserving the order the IDs
 * were given in. WP ignores ordering for `include`, so an ACF `post_object`
 * selection would otherwise come back in an arbitrary order.
 */
export async function getPostsByIds<TAcf extends object = AcfFields>(
  postType: string,
  ids: number[],
  options?: FetchOptions,
): Promise<WPPost<TAcf>[]> {
  if (ids.length === 0) return [];

  const posts = await getCustomPostType<TAcf>(
    `${postType}?include=${ids.join(",")}`,
    options,
  );

  const byId = new Map(posts.map((post) => [post.id, post]));
  return ids
    .map((id) => byId.get(id))
    .filter((post): post is WPPost<TAcf> => Boolean(post));
}

/* ── ACF value helpers ─────────────────────────────────────────────────── */

/**
 * ACF returns `false` (not `null`) for empty image, link and post_object
 * fields, so every read goes through a guard before it is dereferenced.
 */
export function acfImage(value: unknown): AcfImage | null {
  if (value && typeof value === "object" && "url" in value) {
    return value as AcfImage;
  }
  return null;
}

/** An image URL, or `fallback` when the field is empty. */
export function acfImageUrl(value: unknown, fallback = ""): string {
  return acfImage(value)?.url ?? fallback;
}

/** Non-empty ACF post_object selections, as an array (the field can be single or multiple). */
export function acfPostObjects(value: unknown): AcfPostObject[] {
  if (Array.isArray(value)) {
    return value.filter(
      (item): item is AcfPostObject =>
        Boolean(item) && typeof item === "object" && "ID" in item,
    );
  }
  if (value && typeof value === "object" && "ID" in value) {
    return [value as AcfPostObject];
  }
  return [];
}

/** A trimmed string field, or `fallback` when the field is empty. */
export function acfText(value: unknown, fallback = ""): string {
  return typeof value === "string" && value.trim() ? value : fallback;
}

/** ACF repeaters come back as `false` when they have no rows. */
export function acfRepeater<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

/* ── Content helpers ───────────────────────────────────────────────────── */

/**
 * Build the `{li}` / `{br}` template that `FAQSection` and the service-area
 * block parse, from the three fields the CMS splits that copy across: an
 * intro, a repeater of list items, and a closing paragraph.
 */
export function buildListTemplate(
  intro: string,
  items: string[],
  outro: string,
): string {
  const list = items.map((item) => `{li}${item.trim()}{/li}`).join(" ");
  return [[intro.trim(), list].filter(Boolean).join(" "), outro.trim()]
    .filter(Boolean)
    .join(" {br} ");
}

export function stripHTML(html?: string): string {
  if (!html) return "";
  return html.replace(/<[^>]*>?/gm, "").trim();
}

/** WP renders titles with HTML entities (`&#038;`, `&amp;`, …). */
export function decodeEntities(text?: string): string {
  if (!text) return "";
  return text
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, hex: string) =>
      String.fromCharCode(parseInt(hex, 16)),
    )
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;/g, "'")
    .replace(/&nbsp;/g, " ");
}

/* ── Metadata ──────────────────────────────────────────────────────────── */

/** Map a Yoast SEO payload onto Next's `Metadata`. */
export function yoastToMetadata(yoast: YoastHeadJson): Metadata {
  return {
    title: yoast.title,
    description: yoast.description,
    alternates: yoast.canonical ? { canonical: yoast.canonical } : undefined,
    openGraph: {
      title: yoast.og_title,
      description: yoast.og_description,
      url: yoast.og_url,
      images: yoast.og_image?.map((image) => ({
        url: image.url,
        width: image.width,
        height: image.height,
      })),
    },
    twitter: {
      card: (yoast.twitter_card as "summary_large_image") ?? undefined,
      title: yoast.twitter_title,
      description: yoast.twitter_description,
      images: yoast.twitter_image,
    },
  };
}

/**
 * Metadata for a CMS page.
 *
 * Uses Yoast when that plugin is active on the WP install. Without it, the
 * route's own metadata wins — a bare WP page title ("Home") makes a worse
 * `<title>` than what the route declares — and the CMS only fills the gaps.
 */
export function pageMetadata(
  page: WPPost | null,
  fallback: Metadata = {},
): Metadata {
  if (!page) return fallback;
  if (page.yoast_head_json) return yoastToMetadata(page.yoast_head_json);

  return {
    ...fallback,
    title: fallback.title ?? decodeEntities(page.title?.rendered),
    description: fallback.description ?? stripHTML(page.excerpt?.rendered),
  };
}
