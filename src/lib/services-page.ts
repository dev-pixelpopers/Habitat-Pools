import { acfImageUrl, acfPostObjects, acfRepeater, acfText, getPageBySlug } from "./wp";
import { getFaqsByIds, type FaqItem } from "./faq";
import { resolveServiceSlug, serviceHrefFromTitle } from "./services";
import type { AcfImage, AcfPostObject } from "./wp-types";

/**
 * The `services` page field group, from
 * `/wp-json/wp/v2/pages?slug=services&acf_format=standard`.
 */
export interface ServicesPageAcf {
  banner_section?: {
    sub_heading?: string;
    heading?: string;
    background_image?: AcfImage | false;
  };
  second_section?: {
    sub_heading?: string;
    heading?: string;
    paragraph?: string;
  };
  third_section?: {
    services?: unknown;
  };
  fourth_section?: {
    sub_heading?: string;
    heading?: string;
    paragraph?: string;
    features?: unknown;
  };
  fifth_section?: {
    sub_heading?: string;
    heading?: string;
    process?: unknown;
  };
  sixth_section?: {
    sub_heading?: string;
    heading?: string;
    paragraph?: string;
    faqs?: unknown;
  };
  seventh_section?: {
    heading?: string;
    paragraph?: string;
    button_text?: string;
  };
}

interface ServiceCardRow {
  image?: AcfImage | false;
  title?: string;
  text?: string;
  list?: unknown;
  button_text?: string;
  service?: AcfPostObject | false;
}

interface ServiceListRow {
  item?: string;
}

interface FeatureRow {
  title?: string;
  image?: AcfImage | false;
}

interface ProcessRow {
  title?: string;
  text?: string;
}

export interface ServiceCard {
  id: number;
  title: string;
  description: string;
  details: string[];
  imageSrc: string;
  buttonText: string;
  href: string;
}

export interface ServiceFeature {
  id: string;
  label: string;
  image: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  desc: string;
}

export interface ServicesPageContentData {
  banner: {
    tagline?: string;
    heading?: string;
    backgroundImage?: string;
  };
  intro: {
    tagline?: string;
    heading?: string;
    paragraph?: string;
  };
  services?: ServiceCard[];
  features: {
    tagline?: string;
    heading?: string;
    paragraph?: string;
    items?: ServiceFeature[];
  };
  process: {
    tagline?: string;
    heading?: string;
    steps?: ProcessStep[];
  };
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

/** Where a service card links to: its selected service, else its title. */
function cardHref(row: ServiceCardRow): string {
  const [selected] = acfPostObjects(row.service);
  if (selected?.post_name) {
    return `/services/${resolveServiceSlug(selected.post_name)}`;
  }

  return serviceHrefFromTitle(acfText(row.title));
}

function mapServiceCards(acf: ServicesPageAcf): ServiceCard[] {
  return acfRepeater<ServiceCardRow>(acf.third_section?.services)
    .map((row, index) => ({
      id: index + 1,
      title: acfText(row.title),
      description: acfText(row.text),
      details: acfRepeater<ServiceListRow>(row.list)
        .map((item) => acfText(item.item))
        .filter(Boolean),
      imageSrc: acfImageUrl(row.image),
      buttonText: acfText(row.button_text, "Explore More"),
      href: cardHref(row),
    }))
    .filter((card) => card.title && card.imageSrc);
}

function mapFeatures(acf: ServicesPageAcf): ServiceFeature[] {
  return acfRepeater<FeatureRow>(acf.fourth_section?.features)
    .map((row, index) => ({
      id: String(index),
      label: acfText(row.title),
      image: acfImageUrl(row.image),
    }))
    .filter((feature) => feature.label && feature.image);
}

function mapProcess(acf: ServicesPageAcf): ProcessStep[] {
  return acfRepeater<ProcessRow>(acf.fifth_section?.process)
    .map((row, index) => ({
      step: String(index + 1).padStart(2, "0"),
      title: acfText(row.title),
      desc: acfText(row.text),
    }))
    .filter((step) => step.title);
}

/**
 * Everything the services listing renders.
 *
 * Sections the CMS has no content for come back undefined so the page keeps
 * its own defaults — it still renders if WordPress is down.
 */
export async function getServicesPageContent(): Promise<ServicesPageContentData> {
  const page = await getPageBySlug<ServicesPageAcf>("services");
  const acf = page?.acf ?? {};

  const faqIds = acfPostObjects(acf.sixth_section?.faqs).map((post) => post.ID);
  const faqs = await getFaqsByIds(faqIds);

  const services = mapServiceCards(acf);
  const features = mapFeatures(acf);
  const steps = mapProcess(acf);

  return {
    banner: {
      tagline: text(acf.banner_section?.sub_heading),
      heading: text(acf.banner_section?.heading),
      backgroundImage:
        acfImageUrl(acf.banner_section?.background_image) || undefined,
    },
    intro: {
      tagline: text(acf.second_section?.sub_heading),
      heading: text(acf.second_section?.heading),
      paragraph: text(acf.second_section?.paragraph),
    },
    services: services.length ? services : undefined,
    features: {
      tagline: text(acf.fourth_section?.sub_heading),
      heading: text(acf.fourth_section?.heading),
      paragraph: text(acf.fourth_section?.paragraph),
      items: features.length ? features : undefined,
    },
    process: {
      tagline: text(acf.fifth_section?.sub_heading),
      heading: text(acf.fifth_section?.heading),
      steps: steps.length ? steps : undefined,
    },
    faq: {
      tagline: text(acf.sixth_section?.sub_heading),
      heading: text(acf.sixth_section?.heading),
      intro: text(acf.sixth_section?.paragraph),
      items: faqs.length ? faqs : undefined,
    },
    cta: {
      heading: text(acf.seventh_section?.heading),
      description: text(acf.seventh_section?.paragraph),
      buttonText: text(acf.seventh_section?.button_text),
    },
  };
}
