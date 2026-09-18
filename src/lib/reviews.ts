import { acfImageUrl, acfPostObjects, acfText, getPageBySlug } from "./wp";
import { getAllTestimonials, getTestimonialsByIds } from "./testimonials";
import { getFaqsByIds, type FaqItem } from "./faq";
import type { AcfImage } from "./wp-types";
import type { Review } from "@/components/review";

/**
 * The `reviews` page field group, from
 * `/wp-json/wp/v2/pages?slug=reviews&acf_format=standard`.
 */
export interface ReviewsAcf {
  banner_section?: {
    sub_heading?: string;
    heading?: string;
    background_image?: AcfImage | false;
  };
  second_section?: {
    average_rating?: string;
    /** e.g. "Based On 9 Reviews" */
    note?: string;
    text?: string;
  };
  third_section?: {
    reviews?: unknown;
  };
  fourth_section?: {
    sub_heading?: string;
    heading?: string;
    text?: string;
    faqs?: unknown;
  };
  fifth_section?: {
    heading?: string;
    paragraph?: string;
    button_text?: string;
  };
}

export interface ReviewsContent {
  banner: {
    tagline?: string;
    heading?: string;
    backgroundImage?: string;
  };
  rating: {
    average?: string;
    note?: string;
    text?: string;
  };
  reviews: Review[];
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
 * Everything the reviews page renders.
 *
 * Sections the CMS has no content for come back undefined so the page keeps
 * its own defaults — it still renders if WordPress is down.
 */
export async function getReviewsContent(): Promise<ReviewsContent> {
  const page = await getPageBySlug<ReviewsAcf>("reviews");
  const acf = page?.acf ?? {};

  // The page can hand-pick testimonials; otherwise show the whole CPT.
  const pickedReviews = acfPostObjects(acf.third_section?.reviews).map(
    (post) => post.ID,
  );
  const faqIds = acfPostObjects(acf.fourth_section?.faqs).map((post) => post.ID);

  const [reviews, faqs] = await Promise.all([
    pickedReviews.length
      ? getTestimonialsByIds(pickedReviews)
      : getAllTestimonials(),
    getFaqsByIds(faqIds),
  ]);

  return {
    banner: {
      tagline: text(acf.banner_section?.sub_heading),
      heading: text(acf.banner_section?.heading),
      backgroundImage:
        acfImageUrl(acf.banner_section?.background_image) || undefined,
    },
    rating: {
      average: text(acf.second_section?.average_rating),
      note: text(acf.second_section?.note),
      text: text(acf.second_section?.text),
    },
    reviews,
    faq: {
      tagline: text(acf.fourth_section?.sub_heading),
      heading: text(acf.fourth_section?.heading),
      intro: text(acf.fourth_section?.text),
      items: faqs.length ? faqs : undefined,
    },
    cta: {
      heading: text(acf.fifth_section?.heading),
      description: text(acf.fifth_section?.paragraph),
      buttonText: text(acf.fifth_section?.button_text),
    },
  };
}
