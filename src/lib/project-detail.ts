import { acfImageUrl, acfPostObjects, acfRepeater, acfText, decodeEntities } from "./wp";
import {
  findProjectPost,
  getProjectPosts,
  mapProjectCard,
  resolveProjectCategory,
  resolveProjectSlug,
  type ProjectAcf,
} from "./projects";
import type { AcfImage, WPPost } from "./wp-types";
import type { ProjectCardData } from "@/components/project";
import type { Project, ProjectFeature } from "@/data/projects";
import { allProjects, getProjectBySlug } from "@/data/projects";

/**
 * The full `project` field group, section by section, as the case-study page
 * renders it. `ProjectAcf` in `./projects` covers just the listing card.
 */
export interface ProjectDetailAcf extends ProjectAcf {
  second_section?: {
    sub_heading?: string;
    heading?: string;
    text?: string;
    project_information?: {
      location_label?: string;
      location?: string;
      complete_label?: string;
      completion_date?: string;
      scope_label?: string;
      scope?: string;
    };
    services_label?: string;
    services?: unknown;
  };
  /** The three panels of the sticky vision scroll. */
  third_section?: unknown;
  fourth_section?: {
    heading?: string;
    before_image?: AcfImage | false;
    after_image?: AcfImage | false;
  };
  fifth_section?: {
    sub_heading?: string;
    heading?: string;
    gallery?: unknown;
    /** SCF File field — an attachment object, or a plain URL if the field is
     *  switched to URL for externally hosted video. */
    video?: unknown;
    video_thumbnail?: AcfImage | false;
  };
  sixth_section?: {
    sub_heading?: string;
    heading?: string;
    text?: string;
    highlights?: unknown;
  };
  seventh_section?: {
    sub_heading?: string;
    heading?: string;
    features?: unknown;
  };
  eighth_section?: {
    sub_heading?: string;
    heading?: string;
    process?: unknown;
  };
  ninth_section?: {
    heading?: string;
    testimonial?: string;
    author_name?: string;
  };
  tenth_section?: {
    sub_heading?: string;
    heading?: string;
    related_projects?: unknown;
  };
  last_section?: {
    heading?: string;
    text?: string;
    button_text?: string;
  };
}

interface VisionRow {
  heading?: string;
  text?: string;
  image?: AcfImage | false;
}

interface ServiceRow {
  service?: string;
}

interface HighlightRow {
  sub_heading?: string;
  title?: string;
  text?: string;
}

interface FeatureRow {
  title?: string;
  image?: AcfImage | false;
}

interface ProcessRow {
  sub_title?: string;
  title?: string;
  text?: string;
  image?: AcfImage | false;
}

export interface CaseStudyContent {
  id: string;
  slug: string;
  hero: {
    tagline: string;
    title: string;
    subtitle: string;
    image: string;
  };
  intro: {
    tagline: string;
    heading: string;
    overview: string;
    info: { label: string; value: string }[];
    servicesLabel: string;
    services: string[];
  };
  vision: { label: string; content: string; image: string }[];
  beforeAfter?: {
    heading?: string;
    beforeImage: string;
    afterImage: string;
  };
  gallery: {
    tagline: string;
    heading: string;
    images: string[];
    video?: string;
    videoThumbnail?: string;
  };
  highlights?: {
    tagline: string;
    heading: string;
    intro: string;
    items: { number: string; title: string; text: string }[];
  };
  features?: {
    tagline: string;
    heading: string;
    items: ProjectFeature[];
  };
  process?: {
    tagline: string;
    heading: string;
    steps: { stage: string; title: string; text: string; image?: string }[];
  };
  testimonial?: {
    heading: string;
    quote: string;
    author: string;
  };
  related: {
    tagline: string;
    heading: string;
    items: ProjectCardData[];
  };
  cta: {
    heading: string;
    description: string;
    buttonText: string;
  };
}

/** Section labels the design needs even when the CMS leaves a field blank. */
const DEFAULTS = {
  introTagline: "Project Intro",
  introHeading: "The Overview",
  locationLabel: "Location",
  completedLabel: "Completed",
  scopeLabel: "Scope",
  servicesLabel: "Services Delivered",
  visionLabels: ["The Design Vision", "Our Philosophy", "How We Do It"],
  galleryTagline: "Portfolio",
  galleryHeading: "Project Gallery",
  highlightsTagline: "Craftsmanship",
  highlightsHeading: "Key Design Highlights",
  featuresTagline: "Custom Features",
  featuresHeading: "Bring Your Backyard to Life",
  processTagline: "Construction",
  processHeading: "The Build Process",
  testimonialHeading: "Client Testimonial",
  relatedTagline: "Portfolio",
  relatedHeading: "Related Projects",
  ctaHeading: "Ready To Design Yours?",
  ctaDescription: "Book a private design consultation and let our team map out your dream pool and landscape environment.",
  ctaButton: "Book A Service",
};

/** WordPress textareas store Windows line endings. */
function text(value: unknown, fallback = ""): string {
  return acfText(value, fallback).replace(/\r\n?/g, "\n");
}

/**
 * An ACF gallery field is an array of image objects.
 *
 * Non-image attachments are dropped: a video uploaded into the gallery by
 * mistake would otherwise reach the grid as `<img src="clip.webm">` and render
 * as a blank tile. Anything without a `mime_type` is kept, since the field can
 * legitimately hold a bare URL.
 */
function galleryUrls(value: unknown): string[] {
  return acfRepeater<AcfImage>(value)
    .filter((item) => !item?.mime_type || item.mime_type.startsWith("image/"))
    .map((image) => acfImageUrl(image))
    .filter(Boolean);
}

/**
 * A media URL from a File/Image field, whether it returns an attachment object
 * or a plain URL string. Lets a project move to externally hosted video by
 * switching the field type, with no code change.
 */
function mediaUrl(value: unknown): string {
  if (typeof value === "string") return value.trim();
  return acfImageUrl(value);
}

function mapVision(
  acf: ProjectDetailAcf,
  heroImage: string,
  gallery: string[],
): CaseStudyContent["vision"] {
  const rows = acfRepeater<VisionRow>(acf.third_section);

  return DEFAULTS.visionLabels.map((label, index) => {
    const row = rows[index];
    return {
      label: text(row?.heading, label),
      content: text(row?.text),
      image: acfImageUrl(row?.image) || gallery[index] || heroImage,
    };
  });
}

/** Build the case study a CMS project renders. */
function fromPost(
  post: WPPost<ProjectDetailAcf>,
  related: ProjectCardData[],
): CaseStudyContent {
  const acf = post.acf ?? {};
  const hero = acf.first_section;
  const info = acf.second_section?.project_information;

  const heroImage = acfImageUrl(hero?.background_image);
  const gallery = galleryUrls(acf.fifth_section?.gallery);

  const services = acfRepeater<ServiceRow>(acf.second_section?.services)
    .map((row) => text(row.service))
    .filter(Boolean);

  const highlights = acfRepeater<HighlightRow>(acf.sixth_section?.highlights)
    .map((row, index) => ({
      number: text(row.sub_heading, String(index + 1).padStart(2, "0")),
      title: text(row.title),
      text: text(row.text),
    }))
    .filter((item) => item.title);

  const features = acfRepeater<FeatureRow>(acf.seventh_section?.features)
    .map((row) => ({ label: text(row.title), image: acfImageUrl(row.image) }))
    .filter((item) => item.label && item.image);

  const steps = acfRepeater<ProcessRow>(acf.eighth_section?.process)
    .map((row, index) => ({
      stage: text(row.sub_title, `Stage ${String(index + 1).padStart(2, "0")}`),
      title: text(row.title),
      text: text(row.text),
      image: acfImageUrl(row.image) || undefined,
    }))
    .filter((step) => step.title);

  const beforeImage = acfImageUrl(acf.fourth_section?.before_image);
  const afterImage = acfImageUrl(acf.fourth_section?.after_image);

  const quote = text(acf.ninth_section?.testimonial);

  const infoRows = [
    { label: text(info?.location_label, DEFAULTS.locationLabel), value: text(info?.location) },
    { label: text(info?.complete_label, DEFAULTS.completedLabel), value: text(info?.completion_date) },
    { label: text(info?.scope_label, DEFAULTS.scopeLabel), value: text(info?.scope) },
  ].filter((row) => row.value);

  return {
    id: String(post.id),
    slug: resolveProjectSlug(post.slug),
    hero: {
      tagline: text(hero?.sub_heading),
      title: text(hero?.heading, decodeEntities(post.title?.rendered)),
      subtitle: text(hero?.paragraph),
      image: heroImage,
    },
    intro: {
      tagline: text(acf.second_section?.sub_heading, DEFAULTS.introTagline),
      heading: text(acf.second_section?.heading, DEFAULTS.introHeading),
      overview: text(acf.second_section?.text),
      info: infoRows,
      servicesLabel: text(acf.second_section?.services_label, DEFAULTS.servicesLabel),
      services,
    },
    vision: mapVision(acf, heroImage, gallery),
    beforeAfter:
      beforeImage && afterImage
        ? {
            heading: text(acf.fourth_section?.heading) || undefined,
            beforeImage,
            afterImage,
          }
        : undefined,
    gallery: {
      tagline: text(acf.fifth_section?.sub_heading, DEFAULTS.galleryTagline),
      heading: text(acf.fifth_section?.heading, DEFAULTS.galleryHeading),
      images: gallery,
      video: mediaUrl(acf.fifth_section?.video) || undefined,
      videoThumbnail: mediaUrl(acf.fifth_section?.video_thumbnail) || undefined,
    },
    highlights: highlights.length
      ? {
          tagline: text(acf.sixth_section?.sub_heading, DEFAULTS.highlightsTagline),
          heading: text(acf.sixth_section?.heading, DEFAULTS.highlightsHeading),
          intro: text(acf.sixth_section?.text),
          items: highlights,
        }
      : undefined,
    features: features.length
      ? {
          tagline: text(acf.seventh_section?.sub_heading, DEFAULTS.featuresTagline),
          heading: text(acf.seventh_section?.heading, DEFAULTS.featuresHeading),
          items: features,
        }
      : undefined,
    process: steps.length
      ? {
          tagline: text(acf.eighth_section?.sub_heading, DEFAULTS.processTagline),
          heading: text(acf.eighth_section?.heading, DEFAULTS.processHeading),
          steps,
        }
      : undefined,
    testimonial: quote
      ? {
          heading: text(acf.ninth_section?.heading, DEFAULTS.testimonialHeading),
          quote,
          author: text(acf.ninth_section?.author_name),
        }
      : undefined,
    related: {
      tagline: text(acf.tenth_section?.sub_heading, DEFAULTS.relatedTagline),
      heading: text(acf.tenth_section?.heading, DEFAULTS.relatedHeading),
      items: related,
    },
    cta: {
      heading: text(acf.last_section?.heading, DEFAULTS.ctaHeading),
      description: text(acf.last_section?.text, DEFAULTS.ctaDescription),
      buttonText: text(acf.last_section?.button_text, DEFAULTS.ctaButton),
    },
  };
}

/**
 * Build the same case study from a local project, for the projects that are
 * not in the CMS yet.
 */
export function fromStaticProject(project: Project): CaseStudyContent {
  const related = allProjects.filter((p) => p.id !== project.id).slice(0, 3);

  return {
    id: project.id,
    slug: project.slug,
    hero: {
      tagline: project.category,
      title: project.title,
      subtitle: project.subtitle,
      image: project.heroImage,
    },
    intro: {
      tagline: DEFAULTS.introTagline,
      heading: DEFAULTS.introHeading,
      overview: project.overview,
      info: [
        { label: DEFAULTS.locationLabel, value: project.location },
        { label: DEFAULTS.completedLabel, value: project.year },
        { label: DEFAULTS.scopeLabel, value: project.scope },
      ].filter((row) => row.value),
      servicesLabel: DEFAULTS.servicesLabel,
      services: project.services,
    },
    vision: [project.vision, project.philosophy, project.howwedoit].map(
      (content, index) => ({
        label: DEFAULTS.visionLabels[index],
        content,
        image: project.gallery[index] || project.heroImage,
      }),
    ),
    beforeAfter:
      project.beforeImages?.[0] && project.afterImages?.[0]
        ? {
            beforeImage: project.beforeImages[0],
            afterImage: project.afterImages[0],
          }
        : undefined,
    gallery: {
      tagline: DEFAULTS.galleryTagline,
      heading: DEFAULTS.galleryHeading,
      images: project.gallery,
      video: project.video,
      videoThumbnail: project.videoThumbnail,
    },
    highlights: project.crafts?.length
      ? {
          tagline: DEFAULTS.highlightsTagline,
          heading: DEFAULTS.highlightsHeading,
          intro: "Every detail is custom built to suit the property flow. The highlights listed here represent the technical milestones of this construction.",
          items: project.crafts.map((craft, index) => ({
            number: String(index + 1).padStart(2, "0"),
            title: craft.heading,
            text: craft.para,
          })),
        }
      : undefined,
    features: project.features?.length
      ? {
          tagline: DEFAULTS.featuresTagline,
          heading: DEFAULTS.featuresHeading,
          items: project.features,
        }
      : undefined,
    process: project.timeline?.length
      ? {
          tagline: DEFAULTS.processTagline,
          heading: DEFAULTS.processHeading,
          steps: project.timeline.map((step, index) => ({
            stage: `Stage ${String(index + 1).padStart(2, "0")}`,
            title: step.title,
            text: step.description,
            image: step.media,
          })),
        }
      : undefined,
    testimonial: project.testimonial
      ? {
          heading: DEFAULTS.testimonialHeading,
          quote: project.testimonial.quote,
          author: project.testimonial.name,
        }
      : undefined,
    related: {
      tagline: DEFAULTS.relatedTagline,
      heading: DEFAULTS.relatedHeading,
      items: related,
    },
    cta: {
      heading: DEFAULTS.ctaHeading,
      description: DEFAULTS.ctaDescription,
      buttonText: DEFAULTS.ctaButton,
    },
  };
}

/**
 * The other projects, ranked for the "Related Projects" row: the ones sharing
 * this project's service category first, then the rest.
 *
 * The row shows three, and a category can easily hold fewer than three other
 * projects, so the remainder tops it up rather than letting it render short.
 * A project with no category yet just gets the others, in their usual order.
 */
function byCategory(
  posts: WPPost<ProjectDetailAcf>[],
  current: WPPost<ProjectDetailAcf>,
): WPPost<ProjectDetailAcf>[] {
  const others = posts.filter((post) => post.id !== current.id);
  const category = resolveProjectCategory(current)?.slug;
  if (!category) return others;

  const sameCategory = new Set(
    others
      .filter((post) => resolveProjectCategory(post)?.slug === category)
      .map((post) => post.id),
  );

  return [
    ...others.filter((post) => sameCategory.has(post.id)),
    ...others.filter((post) => !sameCategory.has(post.id)),
  ];
}

/**
 * The case study for a URL slug: the CMS project when one matches, otherwise
 * the local case study, so the projects not yet in the CMS keep working.
 */
export async function getCaseStudy(slug: string): Promise<CaseStudyContent | null> {
  const posts = await getProjectPosts<ProjectDetailAcf>();
  const post = findProjectPost(posts, slug);

  if (post) {
    // The page can hand-pick related projects; otherwise go by category.
    const picked = acfPostObjects(post.acf?.tenth_section?.related_projects).map(
      (item) => item.ID,
    );
    const related = (
      picked.length
        ? picked
            .map((id) => posts.find((other) => other.id === id))
            .filter((other): other is WPPost<ProjectDetailAcf> => Boolean(other))
        : byCategory(posts, post)
    )
      .map(mapProjectCard)
      .filter((card) => card.heroImage)
      .slice(0, 3);

    return fromPost(post, related);
  }

  const local = getProjectBySlug(slug);
  return local ? fromStaticProject(local) : null;
}

/** Every slug the detail route should prerender: CMS projects plus local ones. */
export async function getCaseStudySlugs(): Promise<string[]> {
  const posts = await getProjectPosts();
  const cms = posts.map((post) => resolveProjectSlug(post.slug));
  return [...new Set([...cms, ...allProjects.map((project) => project.slug)])];
}
