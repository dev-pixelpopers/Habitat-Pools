import type { Metadata } from "next";
import AboutSection from "@/components/about";
import ProjectsSection from "@/components/project";
import StickyServicesContainer from "@/components/service";
import AboutService from "@/components/about-service";
import ReviewsSection from "@/components/review";
import PremiumFeatures from "@/components/PremiumFeatures";
import BeforeAfter from "@/components/BeforeAfter";
import GetInTouch from "@/components/GetInTouch";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HomeHero from "@/components/HomeHero";
import { getHomeContent } from "@/lib/home";
import { WP_REVALIDATE, getPageBySlug, pageMetadata } from "@/lib/wp";

export const revalidate = 300;

const FALLBACK_METADATA: Metadata = {
  title: "Habitat Pools & Landscapes",
  description: "Luxury Pools & Landscapes",
};

export async function generateMetadata(): Promise<Metadata> {
  // Same request as the page below, so Next serves it from the data cache.
  const page = await getPageBySlug("home", { revalidate: WP_REVALIDATE });
  return pageMetadata(page, FALLBACK_METADATA);
}

export default async function Home() {
  const content = await getHomeContent();

  return (
    <div className="app">
      <Header />

      <HomeHero
        heading={content.hero.heading}
        paragraph={content.hero.paragraph}
        videoSrc={content.hero.videoSrc}
      />

      <AboutSection
        tagline={content.about.tagline}
        heading={content.about.heading}
        description={content.about.description}
        imageSrc={content.about.imageSrc}
        buttonText={content.about.buttonText}
      />

      <ProjectsSection
        projects={content.projects.items}
        tagline={content.projects.tagline}
        heading={content.projects.heading}
      />

      <StickyServicesContainer sections={content.services} />

      <AboutService
        imageSrc={content.serviceArea.imageSrc}
        heading={content.serviceArea.heading}
        description={content.serviceArea.description}
        buttonText={content.serviceArea.buttonText}
      />

      <ReviewsSection
        reviews={content.reviews.items}
        subtitle={content.reviews.subtitle}
        heading={content.reviews.heading}
        backgroundImage={content.reviews.backgroundImage}
      />

      <PremiumFeatures
        features={content.features.items}
        tagline={content.features.tagline}
        heading={content.features.heading}
      />

      <BeforeAfter
        beforeImage={content.beforeAfter.beforeImage}
        afterImage={content.beforeAfter.afterImage}
        heading={content.beforeAfter.heading}
      />

      <GetInTouch
        subHeading={content.contact.subHeading}
        heading={content.contact.heading}
        phoneLabel={content.contact.phoneLabel}
        phoneNumber={content.contact.phoneNumber}
        emailLabel={content.contact.emailLabel}
        email={content.contact.email}
        text={content.contact.text}
      />

      <Footer />
    </div>
  );
}
