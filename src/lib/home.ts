import {
  acfImageUrl,
  acfPostObjects,
  acfRepeater,
  acfText,
  buildListTemplate,
  getPageBySlug,
} from "./wp";
import { getAllTestimonials, getTestimonialsByIds } from "./testimonials";
import { getProjectCards } from "./projects";
import { canonicalCardTitle, resolveServiceSlug, serviceHrefFromTitle } from "./services";
import type { AcfImage, AcfPostObject } from "./wp-types";
import type { ProjectCardData } from "@/components/project";
import type { StickySectionData } from "@/components/service";
import type { Review } from "@/components/review";
import type { ProjectFeature } from "@/data/projects";

/**
 * The `home` page field group, from
 * `/wp-json/wp/v2/pages?slug=home&acf_format=standard`.
 *
 * One nested object per section, in the order the page renders them. Empty
 * ACF fields return `false`, not `null` — hence the `unknown` types, read
 * through the guards in `wp.ts`.
 */
export interface HomeAcf {
  /** Hero */
  banner_section?: {
    heading?: string;
    paragraph?: string;
    background_video?: AcfImage | false;
    scroll_label?: string;
  };
  /** About */
  second_section?: {
    sub_heading?: string;
    heading?: string;
    paragraph?: string;
    image?: AcfImage | false;
    button_text?: string;
  };
  /** Projects grid */
  third_section?: {
    sub_heading?: string;
    heading?: string;
    projects?: unknown;
  };
  /** Sticky services */
  fourth_section?: {
    services?: unknown;
  };
  /**
   * Service-area block. Its image field has no name in the CMS, so it arrives
   * under an empty key — `image` is read too, for when that is fixed.
   */
  fifth_section?: {
    ""?: AcfImage | false;
    image?: AcfImage | false;
    heading?: string;
    first_paragraph?: string;
    list?: unknown;
    final_paragraph?: string;
    button_text?: string;
  };
  /** Reviews */
  sixth_section?: {
    sub_heading?: string;
    heading?: string;
    background_image?: AcfImage | false;
    reviews?: unknown;
  };
  /** Custom features */
  seventh_section?: {
    sub_heading?: string;
    heading?: string;
    features?: unknown;
  };
  /** Before & after */
  eighth_section?: {
    heading?: string;
    before_image?: AcfImage | false;
    after_image?: AcfImage | false;
  };
  /** Get in touch */
  ninth_section?: {
    sub_heading?: string;
    heading?: string;
    call_label?: string;
    phone_number?: string;
    email_label?: string;
    email?: string;
    paragraph?: string;
  };
}

interface ServiceCardRow {
  title?: string;
  paragraph?: string;
  button_text?: string;
  background_image?: AcfImage | false;
  service?: AcfPostObject | false;
}

interface FeatureRow {
  title?: string;
  image?: AcfImage | false;
}

interface ListRow {
  item?: string;
}

export interface HomeContent {
  hero: {
    heading?: string;
    paragraph?: string;
    videoSrc?: string;
  };
  about: {
    tagline?: string;
    heading?: string;
    description?: string;
    imageSrc?: string;
    buttonText?: string;
  };
  projects: {
    tagline?: string;
    heading?: string;
    items: ProjectCardData[];
  };
  services: StickySectionData[];
  serviceArea: {
    imageSrc?: string;
    heading?: string;
    description?: string;
    buttonText?: string;
  };
  reviews: {
    subtitle?: string;
    heading?: string;
    backgroundImage?: string;
    items: Review[];
  };
  features: {
    tagline?: string;
    heading?: string;
    items?: ProjectFeature[];
  };
  beforeAfter: {
    heading?: string;
    beforeImage?: string;
    afterImage?: string;
  };
  contact: {
    subHeading?: string;
    heading?: string;
    phoneLabel?: string;
    phoneNumber?: string;
    emailLabel?: string;
    email?: string;
    text?: string;
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
 * Resolve where a services card links to: the service the card points at,
 * else the local service whose name matches the card title.
 */
function resolveServiceHref(row: ServiceCardRow): string {
  const [selected] = acfPostObjects(row.service);
  if (selected?.post_name) {
    return `/services/${resolveServiceSlug(selected.post_name)}`;
  }

  return serviceHrefFromTitle(acfText(row.title));
}

function mapServices(acf: HomeAcf): StickySectionData[] {
  return acfRepeater<ServiceCardRow>(acf.fourth_section?.services)
    .map((row, index) => ({
      id: index + 1,
      title: canonicalCardTitle(
        acfText(row.title),
        acfPostObjects(row.service)[0]?.post_name,
      ),
      description: acfText(row.paragraph),
      buttonText: acfText(row.button_text, "View More"),
      imageSrc: acfImageUrl(row.background_image),
      href: resolveServiceHref(row),
    }))
    .filter((section) => section.title && section.imageSrc);
}

function mapFeatures(acf: HomeAcf): ProjectFeature[] {
  return acfRepeater<FeatureRow>(acf.seventh_section?.features)
    .map((row) => ({
      label: acfText(row.title),
      image: acfImageUrl(row.image),
    }))
    .filter((feature) => feature.label && feature.image);
}

/**
 * Rebuild the `{li}` / `{br}` template the service-area block renders from the
 * three fields the CMS splits it across.
 */
function mapServiceAreaDescription(acf: HomeAcf): string | undefined {
  const section = acf.fifth_section;
  const intro = acfText(section?.first_paragraph);
  const areas = acfRepeater<ListRow>(section?.list)
    .map((row) => acfText(row.item))
    .filter(Boolean);
  const outro = acfText(section?.final_paragraph);

  if (!intro && areas.length === 0 && !outro) return undefined;

  return buildListTemplate(intro, areas, outro);
}

/**
 * Everything the home page renders, in one pass.
 *
 * Sections the CMS has no content for come back undefined so the components
 * keep their own defaults — the page still renders if WordPress is down.
 */
export async function getHomeContent(): Promise<HomeContent> {
  const [page, projectCards] = await Promise.all([
    getPageBySlug<HomeAcf>("home"),
    getProjectCards(),
  ]);

  const acf = page?.acf ?? {};

  // The page can hand-pick testimonials; otherwise show the whole CPT.
  const pickedReviews = acfPostObjects(acf.sixth_section?.reviews).map(
    (post) => post.ID,
  );
  const reviews = pickedReviews.length
    ? await getTestimonialsByIds(pickedReviews)
    : await getAllTestimonials();

  // Same for the projects grid: an explicit selection wins, else every project.
  const pickedProjects = acfPostObjects(acf.third_section?.projects).map((post) =>
    String(post.ID),
  );
  const projects = pickedProjects.length
    ? pickedProjects
        .map((id) => projectCards.find((card) => card.id === id))
        .filter((card): card is ProjectCardData => Boolean(card))
    : projectCards;

  const features = mapFeatures(acf);

  return {
    hero: {
      heading: text(acf.banner_section?.heading),
      paragraph: text(acf.banner_section?.paragraph),
      videoSrc: acfImageUrl(acf.banner_section?.background_video) || undefined,
    },
    about: {
      tagline: text(acf.second_section?.sub_heading),
      heading: text(acf.second_section?.heading),
      description: text(acf.second_section?.paragraph),
      imageSrc: acfImageUrl(acf.second_section?.image) || undefined,
      buttonText: text(acf.second_section?.button_text),
    },
    projects: {
      tagline: text(acf.third_section?.sub_heading),
      heading: text(acf.third_section?.heading),
      items: projects,
    },
    services: mapServices(acf),
    serviceArea: {
      imageSrc:
        acfImageUrl(acf.fifth_section?.image ?? acf.fifth_section?.[""]) ||
        undefined,
      heading: text(acf.fifth_section?.heading),
      description: mapServiceAreaDescription(acf),
      buttonText: text(acf.fifth_section?.button_text),
    },
    reviews: {
      subtitle: text(acf.sixth_section?.sub_heading),
      heading: text(acf.sixth_section?.heading),
      backgroundImage: acfImageUrl(acf.sixth_section?.background_image) || undefined,
      items: reviews,
    },
    features: {
      tagline: text(acf.seventh_section?.sub_heading),
      heading: text(acf.seventh_section?.heading),
      items: features.length ? features : undefined,
    },
    beforeAfter: {
      heading: text(acf.eighth_section?.heading),
      beforeImage: acfImageUrl(acf.eighth_section?.before_image) || undefined,
      afterImage: acfImageUrl(acf.eighth_section?.after_image) || undefined,
    },
    contact: {
      subHeading: text(acf.ninth_section?.sub_heading),
      heading: text(acf.ninth_section?.heading),
      phoneLabel: text(acf.ninth_section?.call_label),
      phoneNumber: text(acf.ninth_section?.phone_number),
      emailLabel: text(acf.ninth_section?.email_label),
      email: text(acf.ninth_section?.email),
      text: text(acf.ninth_section?.paragraph),
    },
  };
}
