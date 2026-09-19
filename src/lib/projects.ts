import {
  acfImageUrl,
  acfPostObjects,
  acfText,
  decodeEntities,
  getCustomPostType,
} from "./wp";
import { identifyService, type ServiceIdentity } from "./services";
import type { AcfImage, WPPost } from "./wp-types";
import type { ProjectCardData } from "@/components/project";
import { allProjects } from "@/data/projects";

/** The `project` CPT field group, as far as the listing cards need it. */
export interface ProjectAcf {
  first_section?: {
    heading?: string;
    sub_heading?: string;
    paragraph?: string;
    background_image?: AcfImage | false;
  };
  /**
   * Which of the three services this project falls under. Read loosely
   * because the CMS can express it three ways — see `projectCategoryHint`.
   */
  project_category?: unknown;
}

/**
 * How the CMS names this project's service category, in whatever shape the
 * field was set up as. All three are read so the field group can be an ACF
 * post_object pointing at a `service` post, an ACF select of the three names,
 * or a real WordPress taxonomy on the CPT, without a code change either way.
 */
function projectCategoryHint(post: WPPost<ProjectAcf>): string {
  const field = post.acf?.project_category;

  // post_object → the `service` post that was selected.
  const [selected] = acfPostObjects(field);
  if (selected?.post_name) return selected.post_name;

  // select / text → the name as it was typed.
  const typed = acfText(field);
  if (typed) return typed;

  // taxonomy → the first term `_embed` returned that is not a core one.
  const terms = post._embedded?.["wp:term"]?.flat() ?? [];
  const term = terms.find(
    (entry) =>
      entry?.slug && entry.taxonomy !== "category" && entry.taxonomy !== "post_tag",
  );
  return term?.slug ?? "";
}

/**
 * The service a project belongs to, for the card badge and for picking the
 * related projects under a case study.
 *
 * `null` until the project is assigned one in the CMS, and whenever the value
 * does not name one of the three services — callers treat an unassigned
 * project as simply uncategorised rather than inventing a category for it.
 */
export function resolveProjectCategory(
  post: WPPost<ProjectAcf>,
): ServiceIdentity | null {
  const hint = projectCategoryHint(post);
  return hint ? identifyService(hint) : null;
}

/**
 * Point a CMS project at a detail page that exists.
 *
 * The case studies under `/projects/[slug]` are still served from
 * `src/data/projects.ts`, and the CMS slugs are worded differently
 * ("the-dinan" vs "dinan"), so match on the slug with any leading article
 * dropped. Unmatched projects keep their CMS slug, which is what they will
 * need once the detail route is CMS-driven too.
 */
export function resolveProjectSlug(slug: string): string {
  const normalize = (value: string) =>
    value.toLowerCase().replace(/^(the|a)-/, "");
  const target = normalize(slug);

  const match = allProjects.find(
    (project) => normalize(project.slug) === target,
  );
  return match ? match.slug : slug;
}

export function mapProjectCard(post: WPPost<ProjectAcf>): ProjectCardData {
  const hero = post.acf?.first_section;
  const category = resolveProjectCategory(post);
  return {
    id: String(post.id),
    slug: resolveProjectSlug(post.slug),
    title: acfText(hero?.heading, decodeEntities(post.title?.rendered)),
    subtitle: acfText(hero?.paragraph),
    heroImage: acfImageUrl(hero?.background_image),
    serviceCategory: category?.name,
    serviceCategorySlug: category?.slug,
  };
}

/**
 * Every published project as a grid card, falling back to the local case
 * studies when the CMS has none — the listing still renders if WordPress
 * is down.
 */
export async function getProjectCards(): Promise<ProjectCardData[]> {
  const posts = await getProjectPosts();
  const cards = posts.map(mapProjectCard).filter((card) => card.heroImage);
  return cards.length ? cards : allProjects;
}

/**
 * The published projects delivered under one service, as grid cards, for the
 * "Related Projects" row on `/services/[slug]`.
 *
 * Only projects actually assigned that category are returned — a service page
 * claiming a project it did not deliver would be worse than a short row — so
 * this comes back empty for a service with nothing tagged to it yet, and the
 * page leaves the section out.
 */
export async function getProjectCardsByService(
  serviceSlug: string,
  limit = 3,
): Promise<ProjectCardData[]> {
  const posts = await getProjectPosts();

  return posts
    .filter((post) => resolveProjectCategory(post)?.slug === serviceSlug)
    .map(mapProjectCard)
    .filter((card) => card.heroImage)
    .slice(0, limit);
}

/**
 * Every published project, with the full field group the detail page needs.
 *
 * Ordered oldest first, so the grids read in the order the projects were
 * added rather than WordPress's newest-first default.
 */
export async function getProjectPosts<TAcf extends object = ProjectAcf>(): Promise<
  WPPost<TAcf>[]
> {
  return getCustomPostType<TAcf>("project?orderby=date&order=asc");
}

/**
 * Find a project by the slug in the URL, which may be either its CMS slug or
 * the local case-study slug that `resolveProjectSlug` maps it to.
 */
export function findProjectPost<TAcf extends object>(
  posts: WPPost<TAcf>[],
  slug: string,
): WPPost<TAcf> | null {
  return (
    posts.find(
      (post) => post.slug === slug || resolveProjectSlug(post.slug) === slug,
    ) ?? null
  );
}
