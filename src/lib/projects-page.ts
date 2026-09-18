import { acfImageUrl, acfPostObjects, acfText, getPageBySlug } from "./wp";
import { getFaqsByIds, type FaqItem } from "./faq";
import { getProjectCards } from "./projects";
import type { AcfImage } from "./wp-types";
import type { ProjectCardData } from "@/components/project";

/**
 * The `projects` page field group, from
 * `/wp-json/wp/v2/pages?slug=projects&acf_format=standard`.
 *
 * There is no field for the grid itself — it lists the whole `project` CPT.
 */
export interface ProjectsPageAcf {
  banner_section?: {
    sub_heading?: string;
    heading?: string;
    background_image?: AcfImage | false;
  };
  third_section?: {
    sub_heading?: string;
    heading?: string;
    paragraph?: string;
    faqs?: unknown;
  };
  last_section?: {
    heading?: string;
    paragraph?: string;
    button_text?: string;
  };
}

export interface ProjectsPageContentData {
  banner: {
    tagline?: string;
    heading?: string;
    backgroundImage?: string;
  };
  projects: ProjectCardData[];
  faq: {
    tagline?: string;
    heading?: string;
    intro?: string;
    items?: FaqItem[];
  };
  cta: {
    heading?: string;
    description?: string;
    buttonText?: string;
  };
}

/**
 * WordPress textareas store Windows line endings; the components render
 * multi-line copy with `whitespace-pre-line`, which only honours `\n`.
 */
function text(value: unknown): string | undefined {
  const result = acfText(value);
  return result ? result.replace(/\r\n?/g, "\n") : undefined;
}

/**
 * Everything the projects listing renders.
 *
 * Sections the CMS has no content for come back undefined so the page keeps
 * its own defaults — it still renders if WordPress is down.
 */
export async function getProjectsPageContent(): Promise<ProjectsPageContentData> {
  const [page, projects] = await Promise.all([
    getPageBySlug<ProjectsPageAcf>("projects"),
    getProjectCards(),
  ]);

  const acf = page?.acf ?? {};
  const faqIds = acfPostObjects(acf.third_section?.faqs).map((post) => post.ID);
  const faqs = await getFaqsByIds(faqIds);

  return {
    banner: {
      tagline: text(acf.banner_section?.sub_heading),
      heading: text(acf.banner_section?.heading),
      backgroundImage:
        acfImageUrl(acf.banner_section?.background_image) || undefined,
    },
    projects,
    faq: {
      tagline: text(acf.third_section?.sub_heading),
      heading: text(acf.third_section?.heading),
      intro: text(acf.third_section?.paragraph),
      items: faqs.length ? faqs : undefined,
    },
    cta: {
      heading: text(acf.last_section?.heading),
      description: text(acf.last_section?.paragraph),
      buttonText: text(acf.last_section?.button_text),
    },
  };
}
