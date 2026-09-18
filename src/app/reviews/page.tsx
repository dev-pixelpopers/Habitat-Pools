import type { Metadata } from "next";
import ReviewsPageContent from "@/components/ReviewsPageContent";
import { getReviewsContent } from "@/lib/reviews";
import { WP_REVALIDATE, getPageBySlug, pageMetadata } from "@/lib/wp";

export const revalidate = 300;

const FALLBACK_METADATA: Metadata = {
  title: "Reviews | Habitat Pools & Landscapes",
  description:
    "Read what Arizona homeowners say about their custom pools, landscapes, and outdoor living spaces from Habitat Pools.",
};

export async function generateMetadata(): Promise<Metadata> {
  // Same request as the page below, so Next serves it from the data cache.
  const page = await getPageBySlug("reviews", { revalidate: WP_REVALIDATE });
  return pageMetadata(page, FALLBACK_METADATA);
}

export default async function ReviewsPage() {
  const content = await getReviewsContent();

  return <ReviewsPageContent content={content} />;
}
