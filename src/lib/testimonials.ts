import {
  acfText,
  decodeEntities,
  getCustomPostType,
  getPostsByIds,
} from "./wp";
import type { WPPost } from "./wp-types";
import type { Review } from "@/components/review";

/** The `testimonial` CPT field group. */
interface TestimonialAcf {
  author?: string;
  star_rating?: string | number;
  quote?: string;
}

function mapTestimonial(post: WPPost<TestimonialAcf>): Review {
  const rating = Number(post.acf?.star_rating);
  return {
    id: String(post.id),
    name: acfText(post.acf?.author, decodeEntities(post.title?.rendered)),
    rating: Number.isFinite(rating) ? Math.min(Math.max(rating, 0), 5) : 5,
    text: acfText(post.acf?.quote),
  };
}

function usable(reviews: Review[]): Review[] {
  return reviews.filter((review) => review.text);
}

/**
 * Fetch the testimonials a page selects, in the order the editor arranged
 * them. Pages reference them through an ACF `post_object` field.
 */
export async function getTestimonialsByIds(ids: number[]): Promise<Review[]> {
  const posts = await getPostsByIds<TestimonialAcf>("testimonial", ids);
  return usable(posts.map(mapTestimonial));
}

/** Every published testimonial, for pages that don't hand-pick them. */
export async function getAllTestimonials(): Promise<Review[]> {
  const posts = await getCustomPostType<TestimonialAcf>("testimonial");
  return usable(posts.map(mapTestimonial));
}
