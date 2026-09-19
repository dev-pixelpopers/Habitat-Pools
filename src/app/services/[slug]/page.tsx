import { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceDetailTemplate from "@/components/ServiceDetailTemplate";
import { getServiceDetail, getServiceDetailSlugs } from "@/lib/service-detail";
import { getProjectCardsByService } from "@/lib/projects";

export const revalidate = 300;

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getServiceDetailSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: RouteParams): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceDetail(slug);

  if (!service) {
    return {
      title: "Service Not Found | Habitat Pools & Landscape",
    };
  }

  return {
    title: `${service.title} | Habitat Pools & Landscape`,
    description: service.subtitle || service.overview,
  };
}

export default async function ServiceDetailPage({ params }: RouteParams) {
  const { slug } = await params;
  const service = await getServiceDetail(slug);

  if (!service) {
    notFound();
  }

  // Keyed off the resolved service slug, not the URL, so a CMS slug that
  // `resolveServiceSlug` rewrote still matches what the projects are tagged with.
  const projects = await getProjectCardsByService(service.slug);

  return <ServiceDetailTemplate service={service} projects={projects} />;
}
