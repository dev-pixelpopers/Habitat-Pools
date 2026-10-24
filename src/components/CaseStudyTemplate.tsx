"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BeforeAfter from "@/components/BeforeAfter";
import { ProjectCard } from "@/components/project";
import CTA from "@/components/CTA";
import type { CaseStudyContent } from "@/lib/project-detail";
import ProjectGallery from "./projectGallery";
import PremiumFeatures from "./PremiumFeatures";

gsap.registerPlugin(ScrollTrigger);

interface CaseStudyTemplateProps {
  content: CaseStudyContent;
}

export default function CaseStudyTemplate({ content }: CaseStudyTemplateProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroSubRef = useRef<HTMLParagraphElement>(null);
  const introLeftRef = useRef<HTMLDivElement>(null);
  const introRightRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const visionParentRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

  const visionSections = content.vision;

  // Services split into two balanced columns (left gets the extra one on odd counts)
  const services = content.intro.services;
  const servicesMid = Math.ceil(services.length / 2);
  const servicesLeft = services.slice(0, servicesMid);
  const servicesRight = services.slice(servicesMid);

  // ── Animation 1, 2, 4 — unchanged ──
  useGSAP(() => {
    // 1. Hero entrance
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

    // 2. Intro section scroll trigger
    if (introLeftRef.current && introRightRef.current) {
      gsap.from(introLeftRef.current, {
        x: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: introLeftRef.current,
          start: "top 90%",
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

    // 4. Timeline stagger
    if (timelineRef.current) {
      const steps = timelineRef.current.querySelectorAll(".timeline-step");
      gsap.from(steps, {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.25,
        ease: "power3.out",
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });
    }
  }, { scope: containerRef });

  // ── Animation 3 — vision scroll, separate useGSAP so refs are guaranteed ──
  useGSAP(() => {
    if (!visionParentRef.current) return;

    const imgs = imageRefs.current.filter(Boolean) as HTMLImageElement[];
    const panels = panelRefs.current.filter(Boolean) as HTMLDivElement[];
    if (imgs.length !== 3 || panels.length !== 3) return;

    gsap.set(imgs[0], { opacity: 1 });
    gsap.set(imgs[1], { opacity: 0 });
    gsap.set(imgs[2], { opacity: 0 });
    gsap.set(panels[0], { yPercent: 0, y: 0, opacity: 1 });
    gsap.set(panels[1], { yPercent: 100, y: 0, opacity: 0 });
    gsap.set(panels[2], { yPercent: 100, y: 0, opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: visionParentRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });

    tl.to({}, { duration: 3 })
      .to(imgs[0], { opacity: 0, duration: 1 })
      .to(imgs[1], { opacity: 1, duration: 1 }, "<")
      .to(panels[0], { yPercent: -100, y: 0, opacity: 0, duration: 1 }, "<")
      .to(panels[1], { yPercent: 0, y: 0, opacity: 1, duration: 1 }, "<")
      .to({}, { duration: 3 })
      .to(imgs[1], { opacity: 0, duration: 1 })
      .to(imgs[2], { opacity: 1, duration: 1 }, "<")
      .to(panels[1], { yPercent: -100, y: 0, opacity: 0, duration: 1 }, "<")
      .to(panels[2], { yPercent: 0, y: 0, opacity: 1, duration: 1 }, "<")
      .to({}, { duration: 3 });

    // ← no return/cleanup needed, revertOnUpdate handles it

  }, {
    scope: containerRef,
    dependencies: [content.id],
    revertOnUpdate: true,
  });

  return (
    <div ref={containerRef} className="app bg-white" style={{ fontFamily: "'Nohemi', sans-serif" }}>
      <Header />

      {/* ── SECTION 1 — HERO ── */}
      <section
        ref={heroRef}
        className="relative w-full flex items-end overflow-hidden"
        style={{ height: "90vh", minHeight: "clamp(420px, 363.63px + 15.033vw, 650px)" }}
      >
        <div className="absolute inset-0 z-0">
          <img
            fetchPriority="high"
            src={content.hero.image}
            alt={content.hero.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 w-full px-(--gutter) pb-[clamp(48px,35.25px_+_3.399vw,100px)]">
          <span className="text-[#86A3AC] text-(length:--fs-eyebrow) leading-(--lh-eyebrow) block mb-4">
            {content.hero.tagline}
          </span>
          <h1
            ref={heroTitleRef}
            className="text-white text-(length:--fs-display) leading-(--lh-display) max-w-[calc(1000em/96)] mb-6 capitalize tracking-tight"
          >
            {content.hero.title}
          </h1>
          <p
            ref={heroSubRef}
            className="text-white/80 text-[clamp(18px,8.3px_+_0.929vw,26px)] leading-[clamp(26px,12.13px_+_1.358vw,38px)] max-w-[70%] max-lg:max-w-none font-light"
          >
            {content.hero.subtitle}
          </p>
        </div>
      </section>

      {/* ── SECTION 2 — PROJECT INTRO ── */}
      <section className="w-full py-(--section-y) px-(--gutter) bg-white flex flex-col gap-[clamp(40px,26.27px_+_3.661vw,96px)] items-start overflow-x-hidden">
        <div ref={introLeftRef} className="flex gap-[clamp(20px,15.1px_+_1.308vw,40px)] max-lg:flex-col">
          <div className="w-[50%] flex flex-col gap-4 max-lg:w-full">
          <span className="text-[#86A3AC] text-(length:--fs-eyebrow) leading-(--lh-eyebrow) block mb-4">{content.intro.tagline}</span>
          <h2 className="text-[#112931] text-(length:--fs-h2) leading-(--lh-h2) capitalize whitespace-pre-line">
            {content.intro.heading}
          </h2>

          </div>
          <p className="text-[#112931]/80 text-(length:--fs-body-xl) leading-(--lh-body-xl) capitalize w-[50%] max-lg:w-full">
            {content.intro.overview}
          </p>
        </div>
        <div ref={introRightRef} className="flex flex-col gap-[clamp(32px,28.08px_+_1.046vw,48px)] w-full">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[clamp(20px,17.06px_+_0.785vw,32px)] pt-[clamp(20px,17.06px_+_0.785vw,32px)] border-t border-[#112931]/10">
            {content.intro.info.map((item) => (
              <div key={item.label}>
                <span className="text-[#86A3AC] text-[clamp(16px,6.38px_+_0.715vw,20px)] block mb-2">{item.label}</span>
                <span className="text-[#112931] text-[clamp(16px,6.38px_+_0.715vw,20px)] font-medium">{item.value}</span>
              </div>
            ))}
          </div>
          <div className="pt-[clamp(20px,17.06px_+_0.785vw,32px)] border-t border-[#112931]/10">
              <span className="text-[#86A3AC] text-[clamp(16px,6.38px_+_0.715vw,20px)] block mb-2">{content.intro.servicesLabel}</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[clamp(32px,24.16px_+_2.092vw,64px)] max-md:gap-y-1">
                <div className="flex flex-col gap-1 border-r border-[#112931]/10 pl-4 max-md:border-r-0">
                  {servicesLeft.map((service) => (
                    <span key={service} className="text-[#112931] text-[clamp(16px,6.38px_+_0.715vw,20px)] font-medium">
                      -&nbsp;{service}
                    </span>
                  ))}
                </div>
                <div className="flex flex-col gap-1 pl-4">
                  {servicesRight.map((service) => (
                    <span key={service} className="text-[#112931] text-[clamp(16px,6.38px_+_0.715vw,20px)] font-medium">
                      -&nbsp;{service}
                    </span>
                  ))}
                </div>
              </div>
            </div>
        </div>
      </section>

      {/* ── SECTION 3 — VISION SCROLL ── */}
      <section ref={visionParentRef} className="h-[390vh] relative">
        <div className="sticky top-0 w-full h-screen flex flex-row max-lg:flex-col">

          {/* LEFT — images crossfade */}
          <div className="w-[50%] h-screen relative overflow-hidden bg-[#112931] max-lg:w-full max-lg:h-1/2">
            <img
              loading="lazy"
              ref={(el) => { imageRefs.current[0] = el; }}
              src={visionSections[0].image}
              alt={visionSections[0].label}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ opacity: 1 }}
            />
            <img
              loading="lazy"
              ref={(el) => { imageRefs.current[1] = el; }}
              src={visionSections[1].image}
              alt={visionSections[1].label}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ opacity: 0 }}
            />
            <img
              loading="lazy"
              ref={(el) => { imageRefs.current[2] = el; }}
              src={visionSections[2].image}
              alt={visionSections[2].label}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ opacity: 0 }}
            />
          </div>

          {/* RIGHT — panels slide in/out */}
          <div className="w-[50%] h-screen relative overflow-hidden bg-[#112931] max-lg:w-full max-lg:h-1/2">
            {visionSections.map((s, i) => (
              <div
                key={i}
                ref={(el) => { panelRefs.current[i] = el; }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center px-(--gutter) h-full"
                style={{
                  opacity: i === 0 ? 1 : 0,
                }}
              >
                <div className="max-w-[600px]">
                  <span className="text-[#86A3AC] text-(length:--fs-eyebrow) block mb-[clamp(16px,12.08px_+_1.046vw,32px)]">
                    {s.label}
                  </span>
                  <blockquote className="text-white text-[clamp(24px,3.086vw_-_10.79px,48px)] leading-[clamp(34px,4.5vw_-_15.72px,70px)] font-light tracking-tight italic">
                    &ldquo;{s.content}&rdquo;
                  </blockquote>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── SECTION 5 — BEFORE & AFTER ── */}
      {content.beforeAfter && (
        <BeforeAfter
          beforeImage={content.beforeAfter.beforeImage}
          afterImage={content.beforeAfter.afterImage}
          heading={content.beforeAfter.heading}
        />
      )}

      {/* ── SECTION 6 — PROJECT GALLERY ── */}
      {/* <section className="w-full py-[120px] px-[85px] bg-white">
        <div className="max-w-[1440px] mx-auto flex flex-col gap-8 md:gap-12">
          {project.gallery.slice(1).map((image, idx) => {
            const isSingle = idx % 3 === 0;
            if (isSingle) {
              return (
                <div key={idx} className="w-full overflow-hidden rounded-[20px] aspect-[16/9]">
                  <img
                    loading="lazy"
                    src={image}
                    alt={`${project.title} details`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              );
            } else if (idx % 3 === 1 && project.gallery[idx + 2]) {
              const nextImage = project.gallery[idx + 2];
              return (
                <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                  <div className="overflow-hidden rounded-[20px] aspect-[4/3]">
                    <img
                      loading="lazy"
                      src={image}
                      alt={`${project.title} details`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="overflow-hidden rounded-[20px] aspect-[4/3]">
                    <img
                      loading="lazy"
                      src={nextImage}
                      alt={`${project.title} details`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>
      </section> */}
      <ProjectGallery
        images={content.gallery.images}
        title={content.hero.title}
        video={content.gallery.video}
        videoThumbnail={content.gallery.videoThumbnail}
        tagline={content.gallery.tagline}
        heading={content.gallery.heading}
      />



      {/* ── SECTION 7 — DESIGN HIGHLIGHTS ── */}
      {content.highlights && (
        <section className="w-full py-(--section-y) px-(--gutter) bg-[#ffffff] ">
          <div className="max-w-[1440px] mx-auto flex flex-col gap-[clamp(40px,26.27px_+_3.661vw,96px)]">
            <div className="w-full flex gap-[clamp(20px,15.1px_+_1.308vw,40px)] items-center max-lg:flex-col max-lg:items-start">
              <div className="w-[50%] flex flex-col gap-4 max-lg:w-full">
              <span className="text-[#86A3AC] text-(length:--fs-eyebrow) block mb-4">{content.highlights.tagline}</span>
              <h2 className="text-[#112931]/80 text-(length:--fs-h2) leading-(--lh-h2) capitalize whitespace-pre-line">
                {content.highlights.heading}
              </h2>
              </div>
              <div className="w-[50%] max-lg:w-full">
              <p className="text-[#112931]/80 text-[clamp(16px,6.38px_+_0.715vw,20px)] leading-[clamp(26px,10.85px_+_1.215vw,34px)] mt-6 max-lg:mt-0 capitalize">
                {content.highlights.intro}
              </p>
              </div>
            </div>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-[clamp(20px,17.06px_+_0.785vw,32px)]">
              {content.highlights.items.map((highlight, idx) => (
                <div
                  key={`${highlight.title}-${idx}`}
                  className="p-[clamp(24px,20.08px_+_1.046vw,40px)] rounded-[clamp(14px,12.53px_+_0.393vw,20px)] border border-[#112931]/10 hover:bg-white/5 transition-colors duration-300 flex flex-col gap-4"
                >
                  <span className="text-[#86A3AC] text-(length:--fs-body-xl)">{highlight.number}</span>
                  <h3 className="text-[#112931]/80 text-[clamp(22px,2.058vw_-_7.2px,32px)] leading-[clamp(28px,2.443vw_-_8.54px,38px)] capitalize">
                    {highlight.title}
                  </h3>

                    {highlight.text && (
                      <p className="text-[#112931]/80 text-[clamp(16px,15.51px_+_0.131vw,18px)] leading-[clamp(26px,24.53px_+_0.393vw,32px)] mt-4">
                        {highlight.text}
                      </p>
                    )}

                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {content.features && (
        <PremiumFeatures
          features={content.features.items}
          tagline={content.features.tagline}
          heading={content.features.heading}
        />
      )}

      {/* ── SECTION 8 — BUILD PROCESS TIMELINE ── */}
      {content.process && (
        <section className="w-full py-(--section-y) px-(--gutter) bg-[#112931]">
          <div ref={timelineRef} className="max-w-[1440px] mx-auto">
            <div className="text-center mb-[clamp(40px,30.19px_+_2.615vw,80px)]">
              <span className="text-[#86A3AC] text-(length:--fs-eyebrow) block mb-4">{content.process.tagline}</span>
              <h2 className="text-white text-(length:--fs-h2) leading-(--lh-h2) capitalize whitespace-pre-line">
                {content.process.heading}
              </h2>
            </div>
            <div className="flex flex-col gap-[clamp(48px,36.23px_+_3.138vw,96px)] relative pl-8 md:pl-16 border-l-2 border-[#ffffff]/10">
              {content.process.steps.map((step, idx) => (
                <div key={idx} className="timeline-step relative flex flex-col lg:flex-row gap-[clamp(24px,18.12px_+_1.569vw,48px)] items-start">
                  <span className="absolute -left-[41px] md:-left-[73px] top-2 w-[16px] h-[16px] rounded-full bg-[#86A3AC] border-4 border-white" />
                  <div className="lg:w-[50%] flex flex-col gap-4">
                    <span className="text-[#86A3AC] text-(length:--fs-body-xl)">{step.stage}</span>
                    <h3 className="text-white text-[clamp(24px,2.315vw_-_8.1px,36px)] leading-[clamp(30px,2.7vw_-_9.44px,42px)] capitalize">
                      {step.title}
                    </h3>
                    <p className="text-white/70 text-[clamp(16px,6.38px_+_0.715vw,20px)] leading-[clamp(28px,11.5px_+_1.286vw,36px)]">
                      {step.text}
                    </p>
                  </div>
                  {step.image && (
                    <div className="lg:w-[50%] w-full overflow-hidden rounded-[16px] aspect-[16/10]">
                      <img
                        loading="lazy"
                        src={step.image}
                        alt={step.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── SECTION 9 — TESTIMONIAL ── */}
      {content.testimonial && (
        <section className="w-full py-[clamp(72px,55.33px_+_4.445vw,140px)] px-(--gutter) bg-[#ffffff] flex flex-col items-center justify-center text-center">
          <div className="max-w-[90%] flex flex-col items-center">
            <span className="text-[#86A3AC] text-(length:--fs-eyebrow) block mb-[clamp(20px,17.06px_+_0.785vw,32px)]">{content.testimonial.heading}</span>
            <blockquote className="text-[#112931] text-[clamp(17px,7.03px_+_0.786vw,22px)] leading-[clamp(28px,11.5px_+_1.286vw,36px)] font-light mb-8 italic">
              &ldquo;{content.testimonial.quote}&rdquo;
            </blockquote>
            <span className="w-12 h-[1px] bg-[#86A3AC] mb-6" />
            <cite className="text-[#86A3AC] text-[clamp(17px,7.03px_+_0.786vw,22px)] font-normal not-italic capitalize">
              {content.testimonial.author}
            </cite>
          </div>
        </section>
      )}

      {/* ── SECTION 10 — RELATED PROJECTS ── */}
      {content.related.items.length > 0 && (
        <section className="w-full py-(--section-y) px-(--gutter) bg-[#112931] border-t border-[#ffffff]/10">
          <div className="max-w-full mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-baseline mb-[clamp(32px,24.16px_+_2.092vw,64px)] gap-4">
              <div>
                <span className="text-[#86A3AC] text-(length:--fs-eyebrow) block mb-2">{content.related.tagline}</span>
                <h2 className="text-white text-(length:--fs-h2) leading-(--lh-h2) capitalize whitespace-pre-line">
                  {content.related.heading}
                </h2>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-[clamp(20px,15.59px_+_1.177vw,38px)] gap-x-[clamp(16px,13.06px_+_0.785vw,28px)]">
              {content.related.items.map((relProj) => (
                <ProjectCard key={relProj.id} project={relProj} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── SECTION 11 — CTA ── */}
      <CTA
        heading={content.cta.heading}
        description={content.cta.description}
        buttonText={content.cta.buttonText}
        buttonLink="/contact"
      />

      <Footer />
    </div>
  );
}
