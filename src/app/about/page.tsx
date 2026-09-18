import type { Metadata } from "next";
import AboutPageContent from "@/components/AboutPageContent";
import { getAboutContent } from "@/lib/about";
import { WP_REVALIDATE, getPageBySlug, pageMetadata } from "@/lib/wp";

export const revalidate = 300;

const FALLBACK_METADATA: Metadata = {
  title: "About Us | Habitat Pools & Landscapes",
  description:
    "Habitat Pools is owned and operated by two brothers building custom pools, luxury landscapes, and outdoor living spaces across Arizona.",
};

export async function generateMetadata(): Promise<Metadata> {
  // Same request as the page below, so Next serves it from the data cache.
  const page = await getPageBySlug("about", { revalidate: WP_REVALIDATE });
  return pageMetadata(page, FALLBACK_METADATA);
}

export default async function AboutPage() {
  const content = await getAboutContent();

  return <AboutPageContent content={content} />;
}
