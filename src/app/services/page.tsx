import type { Metadata } from "next";
import ServicesPageContent from "@/components/ServicesPageContent";
import { getServicesPageContent } from "@/lib/services-page";
import { WP_REVALIDATE, getPageBySlug, pageMetadata } from "@/lib/wp";

export const revalidate = 300;

const FALLBACK_METADATA: Metadata = {
  title: "Services | Habitat Pools & Landscapes",
  description:
    "Custom swimming pool construction, pool and landscape design, and backyard remodeling across Arizona.",
};

export async function generateMetadata(): Promise<Metadata> {
  // Same request as the page below, so Next serves it from the data cache.
  const page = await getPageBySlug("services", { revalidate: WP_REVALIDATE });
  return pageMetadata(page, FALLBACK_METADATA);
}

export default async function ServicesPage() {
  const content = await getServicesPageContent();

  return <ServicesPageContent content={content} />;
}
