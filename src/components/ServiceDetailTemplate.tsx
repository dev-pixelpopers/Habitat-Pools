"use client";

import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import { ServiceDetail } from "@/data/services";
import FAQSection from "./FAQSection";

gsap.registerPlugin(ScrollTrigger);

interface ServiceDetailTemplateProps {
  service: ServiceDetail;
}

function chunk<T>(items: T[], size: number): T[][] {
  const rows: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    rows.push(items.slice(i, i + size));
  }
  return rows;
}

type FeatureItem = ServiceDetail["features"][number];

function FeatureRow({ items }: { items: FeatureItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className="relative flex overflow-hidden rounded-[20px]"
      style={{ height: "clamp(360px, 48vw, 540px)" }}
    >
      {items.map((feature, index) => {
        const isActive = activeIndex === index;
        return (
          <div
            key={feature.text}
            onMouseEnter={() => setActiveIndex(index)}
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
              className="absolute bottom-0 left-0 right-0 flex items-end"
              style={{
                padding: isActive ? "32px 28px" : "24px 20px",
                transition: "padding 0.5s ease",
              }}
            >
              <h3
                className="text-white font-normal leading-tight"
                style={{
                  fontSize: isActive ? "clamp(28px, 3vw, 40px)" : "clamp(14px, 1.3vw, 20px)",
                  transition: "font-size 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                  textShadow: "0 2px 16px rgba(0,0,0,0.5)",
                  maxWidth: isActive ? "500px" : "200px",
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

export default function ServiceDetailTemplate({ service }: ServiceDetailTemplateProps) {
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
        style={{ height: "90vh", minHeight: "650px" }}
      >
        <div className="absolute inset-0 z-0">
          <img src={service.heroImage} alt={service.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 w-full px-[85px] pb-[100px]">
          <span className="text-[#86A3AC] text-[36px] leading-[38px] block mb-4">{service.category}</span>
          <h1
            ref={heroTitleRef}
            className="text-white text-[96px] leading-[88px] max-w-[1000px] mb-6 capitalize tracking-tight"
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

      <section className="w-full py-[120px] px-[85px] bg-white flex flex-col lg:flex-row gap-16 lg:gap-24 items-end">
        {/* <div ref={introLeftRef} className="lg:w-[40%]">
          <span className="text-[#86A3AC] text-[36px] leading-[38px] block mb-4">Service Overview</span>
          <h2 className="text-[#112931] text-[66px] leading-[72px] capitalize">{service.titleTwo}</h2>
        </div> */}
        <div ref={introRightRef} className="w-full mx-auto lg:w-[90%] flex flex-col gap-8">
          <p className="text-[#112931]/80 text-[24px] leading-[44px] capitalize">{service.overview}</p>
        </div>
      </section>

      <section className="w-full py-[120px] px-[85px] bg-[#112931]">
        <div className="flex flex-col gap-16 lg:gap-20">
          <div className="flex flex-row gap-4 items-start gap-16 lg:gap-40">
            <div className="flex flex-col w-[45%]">
           <h2 className="text-white text-[66px] leading-[72px] capitalize">{service.approachTitle}</h2>
            </div>
            <div className="flex flex-col w-[55%]">
              <span className="text-[#86A3AC] text-[36px] block capitalize">{service.approachSubtitle}</span>
             <p className="text-white text-[20px] leading-[34px]">{service.approachDescription}</p>
             </div>
          </div>
          <div className=" grid grid-cols-1 md:grid-cols-3 gap-8">
            {service.approachPoints.map((point, idx) => (
              <div key={idx} className="p-10 rounded-[20px] border border-white/10 bg-white/5">
                <span className="text-[#86A3AC] text-[24px] block mb-4">0{idx + 1}</span>
                <h3 className="text-white text-[32px] leading-[38px] capitalize mb-4">{point.title}</h3>
                <p className="text-white/70 text-[20px] leading-[36px]">{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    
    {/* featureSectionServicesPages */}
      <section className="w-full py-[120px] px-[85px] bg-white">
        <div className="max-w-[90%] mx-auto flex flex-col gap-16 lg:gap-24">
          {/* <div className="">
            <span className="text-[#86A3AC] text-[36px] block mb-4">Features</span>
            <h2 className="text-[#112931] text-[66px] leading-[72px] capitalize">{service.featuresTitle}</h2>
            <p className="text-[#112931]/80 text-[20px] leading-[34px] mt-6">{service.featuresDescription}</p>
          </div> */}
          <div className="flex flex-row-reverse gap-4">
            <div className="flex flex-col items-end text-right w-[55%]">
            <h2 className="text-[#112931] text-[66px] leading-[72px] capitalize text-right">{service.featuresTitle}</h2>
            </div>
            <div className="flex flex-col w-[45%]">
            <span className="text-[#86A3AC] text-[36px] block mb-4">Features</span>
            <p className="text-[#112931]/80 text-[20px] leading-[34px]">{service.featuresDescription}</p>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            {chunk(service.features, 7).map((row, rowIdx) => (
              <FeatureRow key={rowIdx} items={row} />
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-[120px] px-[85px] bg-[#112931]">
        <div ref={processRef} className="max-w-[1440px] mx-auto flex flex-col gap-16 lg:gap-20">
          <div className="flex flex-row gap-4 items-start">
            <div className="flex flex-col w-[45%]">
           <h2 className="text-white text-[66px] leading-[72px] capitalize">{service.processTitle}</h2>
            </div>
            <div className="flex flex-col w-[55%]">
              <span className="text-[#86A3AC] text-[36px] block capitalize">{service.processSubtitle}</span>
             <p className="text-white text-[20px] leading-[34px]">{service.processDescription}</p>
             </div>
          </div>
          <div className="flex flex-col gap-12">
            {service.processSteps.map((step, idx) => (
              <div key={idx} className="process-step flex flex-col lg:flex-row gap-8 items-start border-t border-white/10 pt-8">
                <span className="text-[#86A3AC] text-[54px] leading-[54px] w-[20%]">0{idx + 1}</span>
                <div className="w-[60%]">
                  <h3 className="text-white text-[36px] leading-[42px] capitalize mb-4">{step.title}</h3>
                  <p className="text-white/70 text-[20px] leading-[36px] max-w-[900px]">{step.description}</p>
                </div>
                {step.image && <img src={step.image} alt={step.title} className="w-[20%]"/>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative w-full bg-white flex items-center justify-center py-[100px] px-[40px] z-50 overflow-hidden">

      {/* whyUsSection*/}
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

        {/* Left Column: Image */}
        <div className="w-full">
          <img
            src={service.whyUsdescription.whyImage}
            alt="Owners reviewing plans on site"
            className="w-full h-auto object-cover shadow-2xl"
          />
        </div>

        {/* Right Column: Content (Right-aligned as per design) */}
        <div className="flex flex-col justify-center items-end text-right">

          {/* Heading */}
          <h2 className="text-[#112931] text-[54px] leading-[71px] tracking-tight mb-8 max-w-[786px]">
            {service.whyUstitle}
          </h2>

          {/* Description Paragraph */}
          <div className="text-[#112931]/80 text-[24px] leading-[44px] mb-14 max-w-[680px]">
            {service.whyUsdescription.whypara}
          
            {/* whyDescListItems */}
          <ul className="flex flex-col items-end gap-x-8 gap-y-2 pl-5 text-left pt-4">
            {service.whyUsdescription.whyListItems.map((item, i) => (
              <li key={i}>- {item}</li>
            ))}
          </ul>
              </div>
          {/* Outlined Action Button */}
          <div className='btn-all mt-[20px] relative btn-dark'>
            <a href='#' className='capitalize relative text-[22px] py-[20px] px-[64px] leading-[30px] underline decoration-[1px] text-[#112931] text-center '>call us today</a>
          </div>

        </div>
      </div>

    </section>


    <section className="relative w-full bg-[#112931] flex items-center justify-center py-[100px] px-[40px] z-50 overflow-hidden">

      {/* ourEasiness*/}
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

        {/* Left Column: Content (Right-aligned as per design) */}
        <div className="flex flex-col justify-center items-start text-left">

          {/* Heading */}
          <h2 className="text-white text-[54px] leading-[71px] tracking-tight mb-8 max-w-[786px]">
            {service.whyUstitle}
          </h2>

          {/* Description Paragraph */}
          <div className="text-white/90 text-[24px] leading-[44px] mb-14 max-w-[680px]">
            {service.whyUsdescription.whypara}
          
            {/* whyDescListItems */}
          <ul className="flex flex-col gap-x-8 gap-y-2 pl-5 text-left pt-4">
            {service.whyUsdescription.whyListItems.map((item, i) => (
              <li key={i}>- {item}</li>
            ))}
          </ul>
              </div>
          {/* Outlined Action Button */}
          <div className='btn-all mt-[20px] relative'>
            <a href='#' className='capitalize relative text-[22px] py-[20px] px-[64px] leading-[30px] underline decoration-[1px] text-white text-center '>call us today</a>
          </div>

        </div>

        {/* Right Column:Image  */}
        
        <div className="w-full">
          <img
            src={service.whyUsdescription.whyImage}
            alt="Owners reviewing plans on site"
            className="w-full h-auto object-cover shadow-2xl"
          />
        </div>
      </div>

    </section>


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
