"use client";

import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import { ServiceDetail } from "@/data/services";
import { ProjectCard, type ProjectCardData } from "@/components/project";
import FAQSection from "./FAQSection";
import PillList from "./PillList";

gsap.registerPlugin(ScrollTrigger);

interface ServiceDetailTemplateProps {
  service: ServiceDetail;
  /**
   * The projects delivered under this service. Empty when none are tagged to
   * it yet, and the row is left out rather than rendered bare.
   */
  projects?: ProjectCardData[];
}

function chunk<T>(items: T[], size: number): T[][] {
  const rows: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    rows.push(items.slice(i, i + size));
  }
  return rows;
}

type FeatureItem = ServiceDetail["features"][number];

/** More feature cards than this split into two groups below 1440. */
const SPLIT_FEATURES_ABOVE = 5;

function FeatureRow({ items }: { items: FeatureItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    // A row on desktop, a vertical accordion below 1024, where side-by-side
    // cards get too narrow for their labels.
    <div className="relative flex overflow-hidden rounded-[clamp(14px,12.53px_+_0.393vw,20px)] h-[clamp(360px,48vw,540px)] max-lg:flex-col max-lg:h-[clamp(480px,140vw,640px)]">
      {items.map((feature, index) => {
        const isActive = activeIndex === index;
        return (
          <div
            key={feature.text}
            onMouseEnter={() => setActiveIndex(index)}
            // Touch screens have no hover, so a tap opens the card.
            onClick={() => setActiveIndex(index)}
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
                backgroundImage: `url("${feature.image}")`,
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
                {feature.text}
              </h3>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function ServiceDetailTemplate({
  service,
  projects = [],
}: ServiceDetailTemplateProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroSubRef = useRef<HTMLParagraphElement>(null);
  const introLeftRef = useRef<HTMLDivElement>(null);
  const introRightRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (heroTitleRef.current && heroSubRef.current) {
      gsap.from(heroTitleRef.current, {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.3,
      });
      gsap.from(heroSubRef.current, {
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.5,
      });
    }

    if (introLeftRef.current && introRightRef.current) {
      gsap.from(introLeftRef.current, {
        x: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: introLeftRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
      gsap.from(introRightRef.current, {
        x: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: introRightRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    }

    if (processRef.current) {
      const steps = processRef.current.querySelectorAll(".process-step");
      gsap.from(steps, {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: processRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });
    }
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="app bg-white" style={{ fontFamily: "'Nohemi', sans-serif" }}>
      <Header />

      <section
        ref={heroRef}
        className="relative w-full flex items-end overflow-hidden"
        style={{ height: "90vh", minHeight: "clamp(420px, 363.63px + 15.033vw, 650px)" }}
      >
        <div className="absolute inset-0 z-0">
          <img src={service.heroImage} alt={service.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 w-full px-(--gutter) pb-[clamp(48px,35.25px_+_3.399vw,100px)]">
          <span className="text-[#86A3AC] text-(length:--fs-eyebrow) leading-(--lh-eyebrow) block mb-4">{service.category}</span>
          <h1
            ref={heroTitleRef}
            className="text-white text-(length:--fs-display) leading-(--lh-display) max-w-[calc(1000em/96)] mb-6 capitalize tracking-tight"
          >
            {service.title}
          </h1>
          {/* <p
            ref={heroSubRef}
            className="text-white/80 text-[26px] leading-[38px] max-w-[650px] font-light"
          >
            {service.subtitle}
          </p> */}
        </div>
      </section>

      <section className="w-full py-(--section-y) px-(--gutter) bg-white flex flex-col lg:flex-row gap-[clamp(40px,26.27px_+_3.661vw,96px)] items-end">
        {/* <div ref={introLeftRef} className="lg:w-[40%]">
          <span className="text-[#86A3AC] text-[36px] leading-[38px] block mb-4">Service Overview</span>
          <h2 className="text-[#112931] text-[66px] leading-[72px] capitalize">{service.titleTwo}</h2>
        </div> */}
        <div ref={introRightRef} className="w-full mx-auto lg:w-[90%] flex flex-col gap-8">
          <p className="text-[#112931]/80 text-(length:--fs-body-xl) leading-(--lh-body-xl) capitalize">{service.overview}</p>
        </div>
      </section>

      <section className="w-full py-(--section-y) px-(--gutter) bg-[#112931]">
        <div className="flex flex-col gap-[clamp(40px,30.19px_+_2.615vw,80px)]">
          <div className="flex flex-row items-start gap-[clamp(24px,8.889vw_-_9.33px,160px)] max-lg:flex-col">
            <div className="flex flex-col w-[45%] max-lg:w-full">
           <h2 className="text-white text-(length:--fs-h2) leading-(--lh-h2) capitalize">{service.approachTitle}</h2>
            </div>
            <div className="flex flex-col w-[55%] max-lg:w-full">
              <span className="text-[#86A3AC] text-(length:--fs-eyebrow) block capitalize">{service.approachSubtitle}</span>
             <p className="text-white text-[clamp(16px,6.38px_+_0.715vw,20px)] leading-[clamp(26px,10.85px_+_1.215vw,34px)]">{service.approachDescription}</p>
             </div>
          </div>
          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[clamp(20px,17.06px_+_0.785vw,32px)]">
            {service.approachPoints.map((point, idx) => (
              <div key={idx} className="p-[clamp(24px,20.08px_+_1.046vw,40px)] rounded-[clamp(14px,12.53px_+_0.393vw,20px)] border border-white/10 bg-white/5">
                <span className="text-[#86A3AC] text-(length:--fs-body-xl) block mb-4">0{idx + 1}</span>
                <h3 className="text-white text-[clamp(22px,2.058vw_-_7.2px,32px)] leading-[clamp(28px,2.443vw_-_8.54px,38px)] capitalize mb-4">{point.title}</h3>
                <p className="text-white/70 text-[clamp(16px,6.38px_+_0.715vw,20px)] leading-[clamp(28px,11.5px_+_1.286vw,36px)]">{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    
    {/* featureSectionServicesPages */}
      <section className="w-full py-(--section-y) px-(--gutter) bg-white">
        <div className="max-w-[90%] max-lg:max-w-none mx-auto flex flex-col gap-[clamp(40px,26.27px_+_3.661vw,96px)]">
          {/* <div className="">
            <span className="text-[#86A3AC] text-[36px] block mb-4">{service.featuresSubtitle}</span>
            <h2 className="text-[#112931] text-[66px] leading-[72px] capitalize">{service.featuresTitle}</h2>
            <p className="text-[#112931]/80 text-[20px] leading-[34px] mt-6">{service.featuresDescription}</p>
          </div> */}
          {/* Heading on the right on desktop; stacked above the text, left
              aligned, below 1024 */}
          <div className="flex flex-row-reverse gap-4 max-lg:flex-col">
            <div className="flex flex-col items-end text-right w-[55%] max-lg:w-full max-lg:items-start max-lg:text-left">
            <h2 className="text-[#112931] text-(length:--fs-h2) leading-(--lh-h2) capitalize text-right max-lg:text-left">{service.featuresTitle}</h2>
            </div>
            <div className="flex flex-col w-[45%] max-lg:w-full">
            <span className="text-[#86A3AC] text-(length:--fs-eyebrow) block mb-4">Features</span>
            <p className="text-[#112931]/80 text-[clamp(16px,6.38px_+_0.715vw,20px)] leading-[clamp(26px,10.85px_+_1.215vw,34px)]">{service.featuresDescription}</p>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            {service.features.length > SPLIT_FEATURES_ABOVE ? (
              <>
                {/* Wide screens: every card in one row */}
                <div className="hidden min-[1440px]:block">
                  <FeatureRow items={service.features} />
                </div>
                {/* Below 1440 a single row of 6+ cards squeezes the closed
                    ones too narrow for their labels, so the cards split into
                    two balanced groups, each its own accordion. */}
                <div className="flex flex-col gap-6 min-[1440px]:hidden">
                  {chunk(service.features, Math.ceil(service.features.length / 2)).map((group) => (
                    <FeatureRow key={group[0].text} items={group} />
                  ))}
                </div>
              </>
            ) : (
              <FeatureRow items={service.features} />
            )}
          </div>
        </div>
      </section>

      <section className="w-full py-(--section-y) px-(--gutter) bg-[#112931]">
        <div ref={processRef} className="max-w-[1440px] mx-auto flex flex-col gap-[clamp(40px,30.19px_+_2.615vw,80px)]">
          <div className="flex flex-row gap-4 items-start max-lg:flex-col">
            <div className="flex flex-col w-[55%] max-lg:w-full">
           <h2 className="text-white text-(length:--fs-h2) leading-(--lh-h2) capitalize">{service.processTitle}</h2>
            </div>
            <div className="flex flex-col w-[45%] max-lg:w-full">
              <span className="text-[#86A3AC] text-(length:--fs-eyebrow) block capitalize">{service.processSubtitle}</span>
             <p className="text-white text-[clamp(16px,6.38px_+_0.715vw,20px)] leading-[clamp(26px,10.85px_+_1.215vw,34px)]">{service.processDescription}</p>
             </div>
          </div>
          <div className="flex flex-col gap-[clamp(32px,28.08px_+_1.046vw,48px)]">
            {service.processSteps.map((step, idx) => (
              <div key={idx} className="process-step flex flex-col lg:flex-row gap-[clamp(20px,17.06px_+_0.785vw,32px)] lg:items-center border-t border-white/10 pt-[clamp(20px,17.06px_+_0.785vw,32px)]">
                <span className="text-[#86A3AC] text-[clamp(30px,3.472vw_-_12.14px,54px)] leading-[clamp(30px,3.472vw_-_12.14px,54px)] w-[20%] max-lg:w-full">0{idx + 1}</span>
                <div className="w-[60%] max-lg:w-full">
                  <h3 className="text-white text-[clamp(24px,2.315vw_-_8.1px,36px)] leading-[clamp(30px,2.7vw_-_9.44px,42px)] capitalize mb-4">{step.title}</h3>
                  <p className="text-white/70 text-[clamp(16px,6.38px_+_0.715vw,20px)] leading-[clamp(28px,11.5px_+_1.286vw,36px)] max-w-[900px]">{step.description}</p>
                </div>
                {step.image && <img src={step.image} alt={step.title} className="w-[20%] h-[35vh] object-cover max-lg:w-full max-lg:h-[clamp(220px,60vw,420px)]"/>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative w-full bg-white flex items-center justify-center py-[clamp(56px,45.22px_+_2.876vw,100px)] px-[clamp(20px,15.1px_+_1.308vw,40px)] z-50 overflow-hidden">

      {/* whyUsSection*/}
      <div className="w-full grid grid-cols-1 min-[1025px]:grid-cols-2 gap-[clamp(40px,26.27px_+_3.661vw,96px)] items-stretch">

        {/* Left Column: Image */}
        <div className="w-full">
          <img
            src={service.whyUsdescription.whyImage}
            alt="Owners reviewing plans on site"
            className="w-full h-[100%] object-cover object-center shadow-2xl"
          />
        </div>

        {/* Right Column: Content (Right-aligned as per design) */}
        <div className="flex flex-col justify-center items-end text-right max-lg:items-start max-lg:text-left">

          {/* Heading */}
          <h2 className="text-[#112931] text-[clamp(30px,3.472vw_-_12.14px,54px)] leading-[clamp(38px,4.565vw_-_15.96px,71px)] tracking-tight mb-[clamp(20px,17.06px_+_0.785vw,32px)] xl:max-w-[80%] max-lg:max-w-none">
            {service.whyUstitle}
          </h2>

          {/* Description Paragraph */}
          <div className="text-[#112931]/80 text-(length:--fs-body-xl) leading-(--lh-body-xl) mb-[clamp(32px,26.12px_+_1.569vw,56px)] w-full">
            <p className="2xl:max-w-[70%] 2xl:ml-auto">{service.whyUsdescription.whypara}</p>
          
            {/* whyDescListItems */}
          <PillList
            items={service.whyUsdescription.whyListItems}
            columns={2}
            tone="light"
            className="pt-6"
          />
              </div>
          {/* Outlined Action Button */}
          <div className='btn-all mt-[20px] relative btn-dark'>
            <a href='/contact' className='capitalize relative text-(length:--btn-fs) py-(--btn-py) px-(--btn-px) leading-(--btn-lh) underline decoration-[1px] text-[#112931] text-center '>{service.whyUsButtonText ?? 'call us today'}</a>
          </div>

        </div>
      </div>

    </section>


    <section className="relative w-full bg-[#112931] flex items-center justify-center py-[clamp(56px,45.22px_+_2.876vw,100px)] px-[clamp(20px,15.1px_+_1.308vw,40px)] z-50 overflow-hidden">

      {/* ourEasiness*/}
      <div className="w-full grid grid-cols-1 min-[1025px]:grid-cols-2 gap-[clamp(40px,26.27px_+_3.661vw,96px)] items-stretch">

        {/* Left Column: Content (Right-aligned as per design) */}
        <div className="flex flex-col justify-center items-start text-left">

          {/* Heading */}
          <h2 className="text-white text-[clamp(30px,3.472vw_-_12.14px,54px)] leading-[clamp(38px,4.565vw_-_15.96px,71px)] tracking-tight mb-[clamp(20px,17.06px_+_0.785vw,32px)] 2xl:max-w-[70%]">
            {service.ourEasiness.easyTitle}
          </h2>

          {/* Description Paragraph */}
          <div className="text-white/90 text-(length:--fs-body-xl) leading-(--lh-body-xl) mb-[clamp(32px,26.12px_+_1.569vw,56px)] w-full">
            <p className="2xl:max-w-[70%]">{service.ourEasiness.easypara}</p>
          
            {/* whyDescListItems */}
          <PillList
            items={service.ourEasiness.easyListItems}
            columns={2}
            tone="dark"
            className="pt-6"
          />
              </div>
          {/* Outlined Action Button */}
          <div className='btn-all mt-[20px] relative'>
            <a href='/contact' className='capitalize relative text-(length:--btn-fs) py-(--btn-py) px-(--btn-px) leading-(--btn-lh) underline decoration-[1px] text-white text-center cursor-pointer'>{service.ourEasiness.easyButtonText ?? service.whyUsButtonText ?? 'call us today'}</a>
          </div>

        </div>

        {/* Right Column:Image  */}

        <div className="w-full">
          <img
            src={service.ourEasiness.easyImage || service.whyUsdescription.whyImage}
            alt="Owners reviewing plans on site"
            className="w-full h-[100%] object-cover object-center shadow-2xl"
          />
        </div>
      </div>

    </section>


      {projects.length > 0 && (
        <section className="w-full py-(--section-y) px-(--gutter) bg-[#112931] border-t border-[#ffffff]/10">
          <div className="w-full">
            <div className="flex flex-col md:flex-row justify-between items-baseline mb-[clamp(32px,24.16px_+_2.092vw,64px)] gap-4">
              <div>
                <span className="text-[#86A3AC] text-(length:--fs-eyebrow) block mb-2">Portfolio</span>
                <h2 className="text-white text-(length:--fs-h2) leading-(--lh-h2) capitalize whitespace-pre-line">
                  Related Projects
                </h2>
              </div>
            </div>
            {/* Grid sized like the projects listing: full width inside the
                section's 85px gutters, with the negative-margin padding that
                keeps the cards' hover shadow from being clipped. */}
            <div className="overflow-hidden py-8 px-4 -mx-4">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-[clamp(20px,15.59px_+_1.177vw,38px)] gap-x-[clamp(16px,13.06px_+_0.785vw,28px)]">
                {projects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <CTA
        heading={service.ctaHeading}
        description={service.ctaDescription}
        buttonText={service.ctaButtonText}
        buttonLink={service.ctaButtonLink}
      />

      <Footer />
    </div>
  );
}
