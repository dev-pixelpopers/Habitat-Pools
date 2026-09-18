/**
 * Shapes returned by the WordPress REST API (`/wp-json/wp/v2/...`).
 *
 * ACF payloads are deliberately loose here: every page and CPT exposes its own
 * field group, so callers narrow `acf` to their own section type at the point
 * of use instead of modelling the whole CMS in one place.
 */

export type AcfFields = Record<string, unknown>;

/** An image field returned with `acf_format=standard`. */
export interface AcfImage {
  ID: number;
  id: number;
  url: string;
  alt: string;
  title?: string;
  width?: number;
  height?: number;
  mime_type?: string;
  sizes?: Record<string, string | number>;
}

/**
 * A `post_object` field returned with `acf_format=standard` — a raw WP post
 * row, so the naming is `post_title` / `post_name`, not `title` / `slug`.
 * ACF returns `false` when nothing is selected.
 */
export interface AcfPostObject {
  ID: number;
  post_title: string;
  post_name: string;
  post_type: string;
  post_status: string;
}

export interface WPRendered {
  rendered: string;
  protected?: boolean;
}

export interface YoastOgImage {
  url: string;
  width?: number;
  height?: number;
}

export interface YoastHeadJson {
  title?: string;
  description?: string;
  canonical?: string;
  robots?: Record<string, string>;
  og_title?: string;
  og_description?: string;
  og_url?: string;
  og_image?: YoastOgImage[];
  twitter_card?: string;
  twitter_title?: string;
  twitter_description?: string;
  twitter_image?: string;
}

export interface WPTerm {
  id: number;
  name: string;
  slug: string;
  taxonomy: string;
}

export interface WPEmbedded {
  "wp:term"?: WPTerm[][];
  "wp:featuredmedia"?: Array<{
    id: number;
    source_url: string;
    alt_text?: string;
  }>;
}

/** A page, post, or custom post type entry. */
export interface WPPost<TAcf extends object = AcfFields> {
  id: number;
  date: string;
  modified: string;
  slug: string;
  status?: string;
  type: string;
  link: string;
  title: WPRendered;
  content?: WPRendered;
  excerpt?: WPRendered;
  featured_media?: number;
  acf?: TAcf;
  /** Only present when the Yoast SEO plugin is active. */
  yoast_head_json?: YoastHeadJson;
  _embedded?: WPEmbedded;
}
