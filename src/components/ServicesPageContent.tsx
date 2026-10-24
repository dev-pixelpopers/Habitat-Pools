"use client";

import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FAQSection from "@/components/FAQSection";
import CTA from "@/components/CTA";
import type {
  ProcessStep,
  ServiceCard as ServiceCardData,
  ServiceFeature,
  ServicesPageContentData,
} from "@/lib/services-page";
import { definedOnly } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

/* ── Fallback content, used when the CMS has nothing for a section ── */

const FALLBACK = {
  banner: {
    tagline: "Services",
    heading: "Our Services",
    backgroundImage: "/images/services-banner.jpg",
  },
  intro: {
    tagline: "What We Offer",
    heading: "Pool Construction & Luxury Outdoor Features in Arizona",
    paragraph: "As a trusted custom pool builder in Arizona, Habitat Pools specializes in custom swimming pool construction, pool & landscape design, and complete backyard transformations that elevate the way you live outdoors. If you're building a brand-new backyard or upgrading an existing space, our team creates outdoor environments that are thoughtfully designed, expertly built, and tailored to your lifestyle.",
  },
  features: {
    tagline: "Feature",
    heading: "Outdoor Living Features",
    paragraph: "Complete your backyard with premium features that enhance comfort, functionality, and year-round enjoyment. Every feature is thoughtfully integrated into your overall design to create a seamless outdoor living experience.",
  },
  process: {
    tagline: "Process",
    heading: "How We Work",
  },
  cta: {
    heading: "Ready To Get Started?",
    description: "Book A Consultation Today And Let Us Show You What's Possible For Your Outdoor Space.",
    buttonText: "Book A Service",
  },
};

const FALLBACK_SERVICES: ServiceCardData[] = [
  {
    id: 1,
    title: "Custom Swimming Pool Construction",
    description: "Custom swimming pools designed around your home, lifestyle, and property to create a beautiful, functional backyard.",
    details: [
      "Infinity-edge & freeform pools",
      "Integrated spas & Baja shelves",
      "Premium pebble interiors",
      "Smart pool automation",
      "Energy-efficient pool equipment",
    ],
    imageSrc: "/images/before-pool.png",
    buttonText: "Explore More",
    href: "/services/custom-pool-construction",
  },
  {
    id: 2,
    title: "Custom Pool & Landscape Design",
    description: "Our pool & landscape design services combine creative vision and functionality, ensuring every element of your backyard works together seamlessly.",
    details: [
      "Pool & Landscape design",
      "3D design renderings",
      "Hardscape planning",
      "Outdoor lighting",
      "Plant and Material Selections",
    ],
    imageSrc: "/images/projects/Melissa-Dinan/melissa-dinan-01.jpg",
    buttonText: "Explore More",
    href: "/services/pool-and-landscape-design",
  },
  {
    id: 3,
    title: "Pool Remodeling & Backyard Renovations",
    description: "We transform existing pools into beautiful, functional outdoor living environments built for today's lifestyle.",
    details: [
      "Pool resurfacing",
      "Tile & coping replacement",
      "Equipment upgrades",
      "Pool automation",
      "LED lighting & Water features",
    ],
    imageSrc: "/images/service-03.jpeg",
    buttonText: "Explore More",
    href: "/services/pool-remodeling-and-renovations",
  },
];

const FALLBACK_FEATURES: ServiceFeature[] = [
  { id: "water", label: "Water Features", image: "/images/features_1.jpg" },
  { id: "fire", label: "Fire Features", image: "/images/features_2.jpg" },
  { id: "lighting", label: "Lighting Features", image: "/images/features_3.jpg" },
  { id: "kitchen", label: "Outdoor Kitchens", image: "/images/features_4-v2.jpg" },
];

const FALLBACK_PROCESS: ProcessStep[] = [
  { step: "01", title: "Complimentary Consultation", desc: "Every project begins with a free consultation where we'll discuss your vision, evaluate your property, and understand your goals for your new outdoor space." },
  { step: "02", title: "Custom Design", desc: "After taking site measurements and photos, we create custom design renderings tailored to your home. We'll refine the design based on your feedback until you're confident it reflects exactly what you want before preparing a detailed proposal." },
  { step: "03", title: "Planning & Preparation", desc: "Once your design is approved, we'll guide you through material selections, coordinate engineering plans, obtain the necessary permits, and prepare every detail before construction begins." },
  { step: "04", title: "Construction", desc: "Our experienced team brings your vision to life with quality craftsmanship and regular project updates, keeping you informed throughout every stage of construction." },
  { step: "05", title: "Final Walkthrough & Pool School", desc: "Before your project is complete, we'll conduct a final walkthrough, address any finishing touches, and provide a personalized Pool School so you can confidently enjoy your new backyard." },
];

const FALLBACK_FAQS = [
  {
    question: "How long does the construction process take?",
    answer: "Every project is unique, but most custom projects are completed in approximately 90 days after construction begins. Larger or more complex backyard transformations may require additional time depending on engineering, permitting, weather conditions, and custom features.",
  },
  {
    question: "Do you handle engineering plans and permits?",
    answer: "Yes. Habitat Pools coordinates the engineering process and submits all required permits before construction begins. We manage these steps on your behalf to help ensure your project moves forward as smoothly as possible.",
  },
  {
    question: "Can I customize every aspect of my swimming pool?",
    answer: "Absolutely. Every pool we build is fully customized to suit your property, lifestyle, and personal preferences. From the pool shape and size to tile, pebble interiors, decking, water features, lighting, spas, and automation systems, every detail is selected with your vision in mind.",
  },
  {
    question: "Do you help with selecting materials?",
    answer: "Yes. We'll guide you through selecting finishes and materials that complement your home's style, including decking, tile, coping, pebble interiors, lighting concepts, and landscape elements.",
  },
  {
    question: "What features can I add to my custom pool?",
    answer: "We offer a wide range of premium features, including integrated spas, Baja shelves, waterfalls, deck jets, fire features, LED lighting, smart pool automation, outdoor kitchens, custom decking, hardscaping, and complete landscape design to create a seamless outdoor living space.",
  },
];

/* ── Service Card ── */
function ServiceCard({ service, index }: { service: ServiceCardData; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!cardRef.current) return;
    gsap.from(cardRef.current, {
      y: 80,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
    });
  }, { scope: cardRef });

  const isEven = index % 2 === 0;

  return (
    <div ref={cardRef} className="w-full">
      <div className={`flex flex-col lg:flex-row ${!isEven ? "lg:flex-row-reverse" : ""} gap-0 overflow-hidden rounded-[clamp(14px,12.53px_+_0.393vw,20px)]`}>
        {/* Image */}
        <div className="w-full lg:w-[55%] relative overflow-hidden" style={{ minHeight: "clamp(280px, 201.57px + 20.916vw, 600px)" }}>
          <img
            src={service.imageSrc}
            alt={service.title}
            className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700"
          />
        </div>

        {/* Content */}
        <div
          className="w-full lg:w-[45%] flex flex-col justify-center p-[clamp(24px,10.27px_+_3.661vw,80px)]"
          style={{ background: "#112931", fontFamily: "'Nohemi', sans-serif" }}
        >
          {/* Number */}
          <span className="text-[#86A3AC] text-[clamp(16px,7.03px_+_0.786vw,22px)] mb-4">
            {String(service.id).padStart(2, "0")}
          </span>

          {/* Title */}
          <h3 className="text-white text-[clamp(30px,4.243vw_-_14.83px,66px)] leading-[clamp(32px,3.986vw_-_13.93px,62px)] tracking-tight uppercase mb-[clamp(20px,17.06px_+_0.785vw,32px)]">
            {service.title}
          </h3>

          {/* Description */}
          <p className="text-white/80 text-(length:--fs-body-xl) leading-[clamp(26px,11.5px_+_1.286vw,36px)] font-normal">
            {service.description}
          </p>

          {/* Detail list */}
          <ul className="flex flex-col gap-[clamp(8px,7.02px_+_0.262vw,12px)] pt-[clamp(16px,14.04px_+_0.523vw,24px)] pb-[clamp(24px,20.08px_+_1.046vw,40px)]">
            {service.details.map((detail) => (
              <li key={detail} className="text-white/70 text-[clamp(16px,6.38px_+_0.715vw,20px)] leading-[clamp(22px,8.95px_+_1vw,28px)] flex items-center gap-3 capitalize">
                <span className="w-[6px] h-[6px] rounded-full bg-[#86A3AC] flex-shrink-0" />
                {detail}
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <div className="btn-all relative mt-2">
            <a href={service.href} className="capitalize relative text-(length:--btn-fs) py-(--btn-py) px-(--btn-px) leading-(--btn-lh) underline decoration-[1px] text-white text-center">
              {service.buttonText}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Main Page ── */
export default function ServicesPageContent({
  content,
}: {
  content: ServicesPageContentData;
}) {
  const heroRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [activeFeature, setActiveFeature] = useState(0);
  const [mounted, setMounted] = useState(false);

  const banner = { ...FALLBACK.banner, ...definedOnly(content.banner) };
  const intro = { ...FALLBACK.intro, ...definedOnly(content.intro) };
  const featureSection = { ...FALLBACK.features, ...definedOnly(content.features) };
  const processSection = { ...FALLBACK.process, ...definedOnly(content.process) };
  const cta = { ...FALLBACK.cta, ...definedOnly(content.cta) };

  const services = content.services ?? FALLBACK_SERVICES;
  const features = content.features.items ?? FALLBACK_FEATURES;
  const steps = content.process.steps ?? FALLBACK_PROCESS;
  const faqs = content.faq.items ?? FALLBACK_FAQS;

  useEffect(() => { setMounted(true); }, []);

  useGSAP(() => {
    if (!headingRef.current) return;
    gsap.from(headingRef.current, {
      y: 80,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      delay: 0.3,
    });
  }, { scope: heroRef });

  return (
    <div className="app">
      <Header />

      {/* ── Hero Section ── */}
      <section
        ref={heroRef}
        className="relative w-full flex items-end overflow-hidden"
        style={{
          height: "70vh",
          minHeight: "clamp(360px, 325.68px + 9.151vw, 500px)",
          fontFamily: "'Nohemi', sans-serif",
        }}
      >
        <div className="absolute inset-0 z-0">
          <img src={banner.backgroundImage} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 w-full px-(--gutter) pb-[clamp(40px,30.19px_+_2.615vw,80px)]">
          <span className="text-[#86A3AC] text-(length:--fs-eyebrow) leading-(--lh-eyebrow) block mb-4">{banner.tagline}</span>
          <h1 ref={headingRef} className="text-white text-(length:--fs-display) leading-(--lh-display) max-w-[9.375em] whitespace-pre-line">
            {banner.heading}
          </h1>
        </div>
      </section>

      {/* ── Intro Text ── */}
      <section
        className="w-full py-[clamp(56px,45.22px_+_2.876vw,100px)] px-(--gutter) bg-white flex flex-col lg:flex-row gap-[clamp(32px,24.16px_+_2.092vw,64px)] lg:items-end"
        style={{ fontFamily: "'Nohemi', sans-serif" }}
      >
        <div className="lg:w-[40%]">
          <span className="text-[#86A3AC] text-(length:--fs-eyebrow) leading-(--lh-eyebrow) block mb-4">{intro.tagline}</span>
          <h2 className="text-[#112931] text-(length:--fs-h2) leading-(--lh-h2) whitespace-pre-line">
            {intro.heading}
          </h2>
        </div>
        <div className="lg:w-[60%] flex items-center">
          <p className="text-[#112931]/80 text-(length:--fs-body-xl) leading-(--lh-body-xl) capitalize">
            {intro.paragraph}
          </p>
        </div>
      </section>

      {/* ── Service Cards (sized like the home page's stacked service cards) ── */}
      <section className="w-full px-(--gutter) pb-[clamp(56px,45.22px_+_2.876vw,100px)] bg-white flex flex-col gap-[clamp(32px,25.13px_+_1.831vw,60px)]">
        {services.map((service, index) => (
          <ServiceCard key={service.id} service={service} index={index} />
        ))}
      </section>

      {/* ── Premium Features ── */}
      <section
        className="relative w-full flex flex-col justify-center px-[clamp(20px,1.37px_+_4.968vw,96px)] py-[clamp(56px,50.12px_+_1.569vw,80px)]"
        style={{
          background: "#112931",
          fontFamily: "'Nohemi', sans-serif",
        }}
      >
        {/* Header */}
        <div
          className="relative mb-7 flex flex-col lg:flex-row justify-start lg:gap-[clamp(40px,20.523vw_-_36.96px,354px)]"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(-16px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-(length:--fs-eyebrow) text-[#86A3AC] hidden lg:block tracking-wide">
              {featureSection.tagline}
            </span>
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="text-(length:--fs-display) leading-(--lh-display) max-w-[calc(1100em/96)] text-white whitespace-pre-line">
              {featureSection.heading}
            </h2>
            <p className="text-white/80 text-(length:--fs-body-xl) leading-[clamp(26px,11.5px_+_1.286vw,36px)] font-normal mb-[clamp(24px,20.08px_+_1.046vw,40px)]">
              {featureSection.paragraph}
            </p>
          </div>
        </div>

        {/* Cards */}
        {/* A row on desktop, a vertical accordion below 1024, where four
            side-by-side cards get too narrow for their labels */}
        <div className="relative flex overflow-hidden h-[clamp(360px,48vw,540px)] max-lg:flex-col max-lg:h-[clamp(480px,140vw,640px)]">
          {features.map((feature, index) => {
            const isActive = activeFeature === index;
            return (
              <div
                key={feature.id}
                onMouseEnter={() => setActiveFeature(index)}
                // Touch screens have no hover, so a tap opens the card.
                onClick={() => setActiveFeature(index)}
                className="relative overflow-hidden cursor-pointer"
                style={{
                  flex: isActive ? "2.5 1 0%" : "1 1 0%",
                  minWidth: 0,
                  transition: "flex 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? "translateY(0)" : "translateY(28px)",
                }}
              >
                <div
                  className="absolute inset-0 w-full h-full"
                  style={{
                    backgroundImage: `url(${feature.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    transform: isActive ? "scale(1)" : "scale(1.15)",
                    transition: "transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: isActive
                      ? "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0) 100%)"
                      : "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.1) 100%)",
                    transition: "background 0.5s ease",
                  }}
                />
                <div
                  className={`absolute bottom-0 left-0 right-0 flex items-end ${isActive ? "" : "lg:top-0 lg:justify-center"}`}
                  style={{
                    padding: isActive ? "32px 28px" : "24px 20px",
                    transition: "padding 0.5s ease",
                  }}
                >
                  <h3
                    className={`text-white font-normal leading-tight ${isActive ? "" : "lg:[writing-mode:vertical-rl] lg:rotate-180 lg:max-h-full"}`}
                    style={{
                      fontSize: isActive ? "clamp(28px, 3vw, 40px)" : "clamp(14px, 1.3vw, 20px)",
                      transition: "font-size 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                      textShadow: "0 2px 16px rgba(0,0,0,0.5)",
                      maxWidth: isActive ? "100%" : "100%",
                    }}
                  >
                    {feature.label}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Process Section ── */}
      <section
        className="w-full py-(--section-y) px-(--gutter) bg-white"
        style={{ fontFamily: "'Nohemi', sans-serif" }}
      >
        {/* The tagline floats beside the centred heading on desktop and sits
            above it once the screen narrows */}
        <div className="relative w-full flex justify-center items-center mb-[clamp(40px,30.19px_+_2.615vw,80px)] max-lg:flex-col max-lg:items-start">
          <span className="absolute left-0 text-[#86A3AC] text-(length:--fs-eyebrow) max-lg:static max-lg:mb-3">{processSection.tagline}</span>
          <h2 className="text-(length:--fs-display) leading-(--lh-display) text-[#112931] text-center whitespace-pre-line max-lg:text-left">
            {processSection.heading}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[clamp(20px,17.06px_+_0.785vw,32px)]">
          {steps.map((item) => (
            <div key={item.step} className="flex flex-col gap-4 p-[clamp(20px,17.06px_+_0.785vw,32px)] border-t-2 border-[#112931]/10 hover:border-[#86A3AC] transition-colors duration-300">
              <span className="text-[#86A3AC] text-[clamp(30px,3.472vw_-_12.14px,54px)] leading-[clamp(30px,3.472vw_-_12.14px,54px)]">{item.step}</span>
              <h3 className="text-[#112931] text-[clamp(24px,2.315vw_-_8.1px,36px)] leading-[clamp(30px,2.7vw_-_9.44px,42px)]">{item.title}</h3>
              <p className="text-[#112931]/70 text-[clamp(16px,6.38px_+_0.715vw,20px)] leading-[clamp(28px,11.5px_+_1.286vw,36px)]">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ Section ── */}
      <FAQSection
        faqs={faqs}
        tagline={content.faq.tagline}
        heading={content.faq.heading}
        intro={content.faq.intro}
      />

      {/* ── CTA Section ── */}
      <CTA
        heading={cta.heading}
        description={cta.description}
        buttonText={cta.buttonText}
        buttonLink="/contact"
      />

      <Footer />
    </div>
  );
}
