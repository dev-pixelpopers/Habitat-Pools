import {
  acfRepeater,
  acfText,
  buildListTemplate,
  decodeEntities,
  getPostsByIds,
} from "./wp";
import type { WPPost } from "./wp-types";

/** The `faq` CPT field group. */
interface FaqAcf {
  question?: string;
  answer?: string;
  /** Optional bullet list rendered between the answer and the closing text. */
  list?: unknown;
  final_text?: string;
}

interface FaqListRow {
  text?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * Flatten a FAQ into the single templated string `FAQSection` parses. The CMS
 * splits the answer into an intro, an optional bullet list, and a closing
 * paragraph; the component expects them inline as `{li}` / `{br}` markers.
 */
function mapFaq(post: WPPost<FaqAcf>): FaqItem {
  const acf = post.acf ?? {};
  const items = acfRepeater<FaqListRow>(acf.list)
    .map((row) => acfText(row.text))
    .filter(Boolean);

  return {
    question: acfText(acf.question, decodeEntities(post.title?.rendered)),
    answer: buildListTemplate(
      acfText(acf.answer),
      items,
      acfText(acf.final_text),
    ).replace(/\r\n?/g, "\n"),
  };
}

/**
 * Fetch the FAQs a page selects, in the order the editor arranged them.
 * Pages reference them through an ACF `post_object` field.
 */
export async function getFaqsByIds(ids: number[]): Promise<FaqItem[]> {
  const posts = await getPostsByIds<FaqAcf>("faq", ids);
  return posts.map(mapFaq).filter((faq) => faq.question && faq.answer);
}
