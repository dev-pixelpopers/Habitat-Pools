import {
  acfImageUrl,
  acfPostObjects,
  acfRepeater,
  acfText,
  getPageBySlug,
} from "./wp";
import { getFaqsByIds, type FaqItem } from "./faq";
import type { AcfImage } from "./wp-types";

/**
 * The `about` page field group, from
 * `/wp-json/wp/v2/pages?slug=about&acf_format=standard`.
 *
 * Unlike the flat `home` group, this one nests one object per section, so the
 * field names can repeat (`heading`, `image`, …) without colliding.
 */
export interface AboutAcf {
  banner_section?: {
    sub_heading?: string;
    heading?: string;
    background_image?: AcfImage | false;
  };
  second_section?: {
    sub_heading?: string;
    heading?: string;
    paragraph?: string;
    image?: AcfImage | false;
  };
  third_section?: {
    stats?: unknown;
  };
  fourth_section?: {
    image?: AcfImage | false;
    heading?: string;
    paragraph?: string;
    final_paragraph?: string;
    button_text?: string;
  };
  fifth_section?: {
    sub_heading?: string;
    heading?: string;
    values?: unknown;
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

interface StatRow {
  count?: string;
  stat?: string;
}

interface ValueRow {
  title?: string;
  text?: string;
}

export interface AboutContent {
  banner: {
    tagline?: string;
    heading?: string;
    backgroundImage?: string;
  };
  story: {
    tagline?: string;
    heading?: string;
    paragraph?: string;
    image?: string;
  };
  stats?: { value: string; label: string }[];
  owner: {
    image?: string;
    heading?: string;
    paragraph?: string;
    finalParagraph?: string;
    buttonText?: string;
  };
  values: {
    tagline?: string;
    heading?: string;
    items?: { title: string; description: string }[];
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
function normalizeNewlines(value: string): string {
  return value.replace(/\r\n?/g, "\n");
}

function text(value: unknown): string | undefined {
  const result = acfText(value);
  return result ? normalizeNewlines(result) : undefined;
}

/**
 * Everything the about page renders.
 *
 * Sections the CMS has no content for come back undefined so the page keeps
 * its own defaults — it still renders if WordPress is down.
 */
export async function getAboutContent(): Promise<AboutContent> {
  const page = await getPageBySlug<AboutAcf>("about");
  const acf = page?.acf ?? {};

  const faqIds = acfPostObjects(acf.sixth_section?.faqs).map((post) => post.ID);
  const faqs = await getFaqsByIds(faqIds);

  const stats = acfRepeater<StatRow>(acf.third_section?.stats)
    .map((row) => ({ value: acfText(row.count), label: acfText(row.stat) }))
    .filter((stat) => stat.value && stat.label);

  const values = acfRepeater<ValueRow>(acf.fifth_section?.values)
    .map((row) => ({
      title: acfText(row.title),
      description: acfText(row.text),
    }))
    .filter((value) => value.title && value.description);

  return {
    banner: {
      tagline: text(acf.banner_section?.sub_heading),
      heading: text(acf.banner_section?.heading),
      backgroundImage: acfImageUrl(acf.banner_section?.background_image) || undefined,
    },
    story: {
      tagline: text(acf.second_section?.sub_heading),
      heading: text(acf.second_section?.heading),
      paragraph: text(acf.second_section?.paragraph),
      image: acfImageUrl(acf.second_section?.image) || undefined,
    },
    stats: stats.length ? stats : undefined,
    owner: {
      image: acfImageUrl(acf.fourth_section?.image) || undefined,
      heading: text(acf.fourth_section?.heading),
      paragraph: text(acf.fourth_section?.paragraph),
      finalParagraph: text(acf.fourth_section?.final_paragraph),
      buttonText: text(acf.fourth_section?.button_text),
    },
    values: {
      tagline: text(acf.fifth_section?.sub_heading),
      heading: text(acf.fifth_section?.heading),
      items: values.length ? values : undefined,
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
