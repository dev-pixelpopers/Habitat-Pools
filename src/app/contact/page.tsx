import type { Metadata } from "next";
import ContactPageContent from "@/components/ContactPageContent";
import { getContactContent } from "@/lib/contact";
import { WP_REVALIDATE, getPageBySlug, pageMetadata } from "@/lib/wp";

export const revalidate = 300;

const FALLBACK_METADATA: Metadata = {
  title: "Contact | Habitat Pools & Landscapes",
  description:
    "Talk to Habitat Pools about your custom pool, landscape, or outdoor living project in Gilbert and across Arizona.",
};

export async function generateMetadata(): Promise<Metadata> {
  // Same request as the page below, so Next serves it from the data cache.
  const page = await getPageBySlug("contact", { revalidate: WP_REVALIDATE });
  return pageMetadata(page, FALLBACK_METADATA);
}

export default async function ContactPage() {
  const content = await getContactContent();

  return <ContactPageContent content={content} />;
}
