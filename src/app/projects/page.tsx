import type { Metadata } from "next";
import ProjectsPageContent from "@/components/ProjectsPageContent";
import { getProjectsPageContent } from "@/lib/projects-page";
import { WP_REVALIDATE, getPageBySlug, pageMetadata } from "@/lib/wp";

export const revalidate = 300;

const FALLBACK_METADATA: Metadata = {
  title: "Projects | Habitat Pools & Landscapes",
  description:
    "Explore custom pools, luxury landscapes, and complete backyard transformations built by Habitat Pools across Arizona.",
};

export async function generateMetadata(): Promise<Metadata> {
  // Same request as the page below, so Next serves it from the data cache.
  const page = await getPageBySlug("projects", { revalidate: WP_REVALIDATE });
  return pageMetadata(page, FALLBACK_METADATA);
}

export default async function ProjectsPage() {
  const content = await getProjectsPageContent();

  return <ProjectsPageContent content={content} />;
}
