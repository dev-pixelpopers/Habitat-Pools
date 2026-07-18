import { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceDetailTemplate from "@/components/ServiceDetailTemplate";
import { allServices, getServiceBySlug } from "@/data/services";

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return allServices.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: RouteParams): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Service Not Found | Habitat Pools & Landscape",
    };
  }

  return {
    title: `${service.title} | Habitat Pools & Landscape`,
    description: service.subtitle,
  };
}

export default async function ServiceDetailPage({ params }: RouteParams) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return <ServiceDetailTemplate service={service} />;
}
