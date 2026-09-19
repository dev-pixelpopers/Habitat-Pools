import { acfImageUrl, acfPostObjects, acfRepeater, acfText, decodeEntities, getCustomPostType, getPostsByIds } from "./wp";
import { canonicalServiceName, resolveServiceSlug } from "./services";
import type { AcfImage, WPPost } from "./wp-types";
import type { ServiceDetail } from "@/data/services";
import { allServices, getServiceBySlug } from "@/data/services";

/**
 * The `service` CPT field group, from
 * `/wp-json/wp/v2/service?acf_format=standard`.
 */
export interface ServiceDetailAcf {
  banner_section?: {
    heading?: string;
    sub_heading?: string;
    background_image?: AcfImage | false;
  };
  second_section?: {
    /** Misspelled in the CMS field group; `paragraph` is read too. */
    paragrah?: string;
    paragraph?: string;
  };
  third_section?: {
    heading?: string;
    sub_heading?: string;
    paragraph?: string;
    /** `construction-approac` CPT entries. */
    approach?: unknown;
  };
  fourth_section?: {
    heading?: string;
    sub_heading?: string;
    text?: string;
    features?: unknown;
  };
  fifth_section?: {
    heading?: string;
    sub_heading?: string;
    text?: string;
    /** `process` CPT entries. */
    process?: unknown;
  };
  sixth_section?: {
    image?: AcfImage | false;
    heading?: string;
    text?: string;
    list?: unknown;
    button_text?: string;
  };
  seventh_section?: {
    image?: AcfImage | false;
    heading?: string;
    text?: string;
    list?: unknown;
  };
  final_section?: {
    heading?: string;
    text?: string;
    button_text?: string;
  };
}

/** The `construction-approac` CPT field group. */
interface ApproachAcf {
  title?: string;
  text?: string;
}

/** The `process` CPT field group. */
interface ProcessAcf {
  title?: string;
  text?: string;
  image?: AcfImage | false;
}

interface FeatureRow {
  title?: string;
  image?: AcfImage | false;
}

interface ListRow {
  text?: string;
}

/** Used when the CMS has a service with no local counterpart to build on. */
const EMPTY_SERVICE: ServiceDetail = {
  id: "",
  slug: "",
  title: "",
  titleTwo: "",
  category: "",
  heroImage: "",
  subtitle: "",
  overview: "",
  approachTitle: "",
  approachSubtitle: "",
  approachDescription: "",
  approachPoints: [],
  featuresTitle: "",
  featuresSubtitle: "Features",
  featuresDescription: "",
  featuresOutro: "",
  features: [],
  processTitle: "",
  processSubtitle: "",
  processDescription: "",
  processSteps: [],
  whyUstitle: "",
  whyUsdescription: { whypara: "", whyListItems: [], whyImage: "" },
  ourEasiness: { easyTitle: "", easypara: "", easyListItems: [] },
  ctaHeading: "",
  ctaDescription: "",
  ctaButtonText: "",
  ctaButtonLink: "/contact",
  FaqItems: [],
};

/** WordPress textareas store Windows line endings. */
function text(value: unknown, fallback = ""): string {
  return acfText(value, fallback).replace(/\r\n?/g, "\n");
}

/** A CMS list becomes the local list only when the CMS has no rows at all. */
function listOr(value: unknown, fallback: string[]): string[] {
  const items = acfRepeater<ListRow>(value)
    .map((row) => text(row.text))
    .filter(Boolean);
  return items.length ? items : fallback;
}

/**
 * Merge a CMS service over the local one field by field.
 *
 * Only one service is fully filled in the CMS so far; the rest have whole
 * sections left blank, and each blank field falls through to the local copy
 * rather than emptying that part of the page.
 */
function merge(
  base: ServiceDetail,
  post: WPPost<ServiceDetailAcf>,
  approachPoints: ServiceDetail["approachPoints"],
  processSteps: ServiceDetail["processSteps"],
): ServiceDetail {
  const acf = post.acf ?? {};
  const banner = acf.banner_section;
  // Both headings on the page render the service name, and the CMS stores it
  // once, in `banner_section.heading` — worded its own way, so it is
  // normalised to the one name the rest of the site uses.
  const heading = text(banner?.heading, base.title || decodeEntities(post.title?.rendered));
  const title =
    canonicalServiceName(post.slug) ?? canonicalServiceName(heading) ?? heading;

  const features = acfRepeater<FeatureRow>(acf.fourth_section?.features)
    .map((row) => ({
      text: text(row.title),
      image: acfImageUrl(row.image),
      altText: text(row.title),
    }))
    .filter((feature) => feature.text && feature.image);

  return {
    ...base,
    id: String(post.id),
    slug: resolveServiceSlug(post.slug),
    title,
    titleTwo: title,
    category: text(banner?.sub_heading, base.category),
    heroImage: acfImageUrl(banner?.background_image, base.heroImage),
    overview: text(
      acf.second_section?.paragrah ?? acf.second_section?.paragraph,
      base.overview,
    ),

    approachTitle: text(acf.third_section?.heading, base.approachTitle),
    approachSubtitle: text(acf.third_section?.sub_heading, base.approachSubtitle),
    approachDescription: text(acf.third_section?.paragraph, base.approachDescription),
    approachPoints: approachPoints.length ? approachPoints : base.approachPoints,

    featuresTitle: text(acf.fourth_section?.heading, base.featuresTitle),
    featuresSubtitle: text(acf.fourth_section?.sub_heading, base.featuresSubtitle),
    featuresDescription: text(acf.fourth_section?.text, base.featuresDescription),
    features: features.length ? features : base.features,

    processTitle: text(acf.fifth_section?.heading, base.processTitle),
    processSubtitle: text(acf.fifth_section?.sub_heading, base.processSubtitle),
    processDescription: text(acf.fifth_section?.text, base.processDescription),
    processSteps: processSteps.length ? processSteps : base.processSteps,

    whyUstitle: text(acf.sixth_section?.heading, base.whyUstitle),
    whyUsdescription: {
      whypara: text(acf.sixth_section?.text, base.whyUsdescription.whypara),
      whyListItems: listOr(acf.sixth_section?.list, base.whyUsdescription.whyListItems),
      whyImage: acfImageUrl(acf.sixth_section?.image, base.whyUsdescription.whyImage),
    },
    whyUsButtonText: text(acf.sixth_section?.button_text, base.whyUsButtonText ?? ""),
    ourEasiness: {
      easyTitle: text(acf.seventh_section?.heading, base.ourEasiness.easyTitle),
      easypara: text(acf.seventh_section?.text, base.ourEasiness.easypara),
      easyListItems: listOr(acf.seventh_section?.list, base.ourEasiness.easyListItems),
    },

    ctaHeading: text(acf.final_section?.heading, base.ctaHeading),
    ctaDescription: text(acf.final_section?.text, base.ctaDescription),
    ctaButtonText: text(acf.final_section?.button_text, base.ctaButtonText),
    ctaButtonLink: base.ctaButtonLink || "/contact",
  };
}

/**
 * The approach cards a service selects, from the `construction-approac` CPT.
 */
async function getApproachPoints(
  ids: number[],
): Promise<ServiceDetail["approachPoints"]> {
  const posts = await getPostsByIds<ApproachAcf>("construction-approac", ids);
  return posts
    .map((post) => ({
      title: text(post.acf?.title, decodeEntities(post.title?.rendered)),
      description: text(post.acf?.text),
    }))
    .filter((point) => point.title);
}

/**
 * The process steps a service selects, from the `process` CPT.
 *
 * A step the CMS has left blank falls back to the local step of the same
 * name, so a half-filled entry does not blank out that row.
 */
async function getProcessSteps(
  ids: number[],
  base: ServiceDetail,
): Promise<ServiceDetail["processSteps"]> {
  const posts = await getPostsByIds<ProcessAcf>("process", ids);

  return posts
    .map((post) => {
      const acf = post.acf ?? {};
      const title = text(acf.title, decodeEntities(post.title?.rendered));
      const local = base.processSteps.find(
        (step) => step.title.toLowerCase() === title.toLowerCase(),
      );

      return {
        title,
        description: text(acf.text, local?.description ?? ""),
        image: acfImageUrl(acf.image, local?.image ?? "") || undefined,
      };
    })
    .filter((step) => step.title);
}

/**
 * The service detail for a URL slug: the CMS service merged over the local
 * one, or the local one alone when the CMS has no match.
 */
export async function getServiceDetail(slug: string): Promise<ServiceDetail | null> {
  const posts = await getCustomPostType<ServiceDetailAcf>("service");
  const post =
    posts.find(
      (item) => item.slug === slug || resolveServiceSlug(item.slug) === slug,
    ) ?? null;

  const local = getServiceBySlug(slug) ?? null;

  if (!post) return local;

  const base = local ?? { ...EMPTY_SERVICE, slug };
  const acf = post.acf ?? {};

  const [approachPoints, processSteps] = await Promise.all([
    getApproachPoints(acfPostObjects(acf.third_section?.approach).map((p) => p.ID)),
    getProcessSteps(
      acfPostObjects(acf.fifth_section?.process).map((p) => p.ID),
      base,
    ),
  ]);

  return merge(base, post, approachPoints, processSteps);
}

/** Every slug the detail route should prerender: CMS services plus local ones. */
export async function getServiceDetailSlugs(): Promise<string[]> {
  const posts = await getCustomPostType("service");
  const cms = posts.map((post) => resolveServiceSlug(post.slug));
  return [...new Set([...cms, ...allServices.map((service) => service.slug)])];
}
