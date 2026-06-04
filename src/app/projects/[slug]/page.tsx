import { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudyTemplate from "@/components/CaseStudyTemplate";
import { getProjectBySlug, allProjects } from "@/data/projects";

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return allProjects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: RouteParams): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found | Habitat Pools & Landscape",
    };
  }

  return {
    title: `${project.title} | Habitat Pools & Landscape`,
    description: project.subtitle,
    openGraph: {
      title: `${project.title} | Habitat Pools & Landscape`,
      description: project.subtitle,
      images: [{ url: project.heroImage }],
    },
  };
}

export default async function ProjectDetailPage({ params }: RouteParams) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  // Get 3 related projects (excluding current one)
  const relatedProjects = allProjects
    .filter((p) => p.id !== project.id)
    .slice(0, 3);

  return <CaseStudyTemplate project={project} relatedProjects={relatedProjects} />;
}
