import { acfImageUrl, acfText, decodeEntities, getCustomPostType } from "./wp";
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
  return {
    id: String(post.id),
    slug: resolveProjectSlug(post.slug),
    title: acfText(hero?.heading, decodeEntities(post.title?.rendered)),
    subtitle: acfText(hero?.paragraph),
    heroImage: acfImageUrl(hero?.background_image),
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

/** Every published project, with the full field group the detail page needs. */
export async function getProjectPosts<TAcf extends object = ProjectAcf>(): Promise<
  WPPost<TAcf>[]
> {
  return getCustomPostType<TAcf>("project");
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
