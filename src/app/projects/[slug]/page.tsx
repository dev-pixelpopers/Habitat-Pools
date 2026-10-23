import { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import CaseStudyTemplate from "@/components/CaseStudyTemplate";
import { getCaseStudy, getCaseStudySlugs } from "@/lib/project-detail";

export const revalidate = 300;

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getCaseStudySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: RouteParams): Promise<Metadata> {
  const slug = (await params).slug.toLowerCase();
  const content = await getCaseStudy(slug);

  if (!content) {
    return {
      title: "Project Not Found | Habitat Pools & Landscape",
    };
  }

  const title = `${content.hero.title} | Habitat Pools & Landscape`;

  return {
    title,
    description: content.hero.subtitle,
    openGraph: {
      title,
      description: content.hero.subtitle,
      images: content.hero.image ? [{ url: content.hero.image }] : undefined,
    },
  };
}

export default async function ProjectDetailPage({ params }: RouteParams) {
  const { slug } = await params;

  // Slugs are lowercase; any other casing (e.g. a typed "/projects/Kimball")
  // permanently redirects so each page has one URL.
  if (slug !== slug.toLowerCase()) {
    permanentRedirect(`/projects/${slug.toLowerCase()}`);
  }

  const content = await getCaseStudy(slug);

  if (!content) {
    notFound();
  }

  return <CaseStudyTemplate content={content} />;
}
