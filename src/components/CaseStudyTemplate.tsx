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
import { Project } from "@/data/projects";
import ProjectGallery from "./projectGallery";

gsap.registerPlugin(ScrollTrigger);

interface CaseStudyTemplateProps {
  project: Project;
  relatedProjects: Project[];
}

export default function CaseStudyTemplate({
  project,
  relatedProjects,
}: CaseStudyTemplateProps) {
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

  const visionSections = [
    {
      image: project.gallery[0] || project.heroImage,
      label: "The Design Vision",
      content: project.vision,
    },
    {
      image: project.gallery[1] || project.heroImage,
      label: "Our Philosophy",
      content: project.philosophy,
    },
    {
      image: project.gallery[2] || project.heroImage,
      label: "How We Do It",
      content: project.howwedoit,
    },
  ];

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
    dependencies: [project.id],
    revertOnUpdate: true,
  });

  return (
    <div ref={containerRef} className="app bg-white" style={{ fontFamily: "'Nohemi', sans-serif" }}>
      <Header />

      {/* ── SECTION 1 — HERO ── */}
      <section
        ref={heroRef}
        className="relative w-full flex items-end overflow-hidden"
        style={{ height: "90vh", minHeight: "650px" }}
      >
        <div className="absolute inset-0 z-0">
          <img
            src={project.heroImage}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 w-full px-[85px] pb-[100px]">
          <span className="text-[#86A3AC] text-[36px] leading-[38px] block mb-4">
            {project.category}
          </span>
          <h1
            ref={heroTitleRef}
            className="text-white text-[96px] leading-[88px] max-w-[1000px] mb-6 capitalize tracking-tight"
          >
            {project.title}
          </h1>
          <p
            ref={heroSubRef}
            className="text-white/80 text-[26px] leading-[38px] max-w-[650px] font-light"
          >
            {project.subtitle}
          </p>
        </div>
      </section>

      {/* ── SECTION 2 — PROJECT INTRO ── */}
      <section className="w-full py-[120px] px-[85px] bg-white flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
        <div ref={introLeftRef} className="lg:w-[40%]">
          <span className="text-[#86A3AC] text-[36px] leading-[38px] block mb-4">Project Intro</span>
          <h2 className="text-[#112931] text-[66px] leading-[72px] capitalize">
            The Overview
          </h2>
        </div>
        <div ref={introRightRef} className="lg:w-[60%] flex flex-col gap-12">
          <p className="text-[#112931]/80 text-[24px] leading-[44px] capitalize">
            {project.overview}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-[#112931]/10">
            <div>
              <span className="text-[#86A3AC] text-[20px] block mb-2">Location</span>
              <span className="text-[#112931] text-[22px] font-medium">{project.location}</span>
            </div>
            <div>
              <span className="text-[#86A3AC] text-[20px] block mb-2">Completed</span>
              <span className="text-[#112931] text-[22px] font-medium">{project.year}</span>
            </div>
            <div>
              <span className="text-[#86A3AC] text-[20px] block mb-2">Services Delivered</span>
              <div className="flex flex-col gap-1">
                {project.services.map((service) => (
                  <span key={service} className="text-[#112931] text-[22px] font-medium">
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3 — VISION SCROLL ── */}
      <section ref={visionParentRef} className="h-[390vh] relative">
        <div className="sticky top-0 w-full h-screen flex flex-row">

          {/* LEFT — images crossfade */}
          <div className="w-[50%] h-screen relative overflow-hidden bg-[#112931]">
            <img
              ref={(el) => { imageRefs.current[0] = el; }}
              src={visionSections[0].image}
              alt={visionSections[0].label}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ opacity: 1 }}
            />
            <img
              ref={(el) => { imageRefs.current[1] = el; }}
              src={visionSections[1].image}
              alt={visionSections[1].label}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ opacity: 0 }}
            />
            <img
              ref={(el) => { imageRefs.current[2] = el; }}
              src={visionSections[2].image}
              alt={visionSections[2].label}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ opacity: 0 }}
            />
          </div>

          {/* RIGHT — panels slide in/out */}
          <div className="w-[50%] h-screen relative overflow-hidden bg-[#112931]">
            {visionSections.map((s, i) => (
              <div
                key={i}
                ref={(el) => { panelRefs.current[i] = el; }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center px-[85px] h-full"
                style={{
                  opacity: i === 0 ? 1 : 0,
                }}
              >
                <div className="max-w-[600px]">
                  <span className="text-[#86A3AC] text-[36px] block mb-8">
                    {s.label}
                  </span>
                  <blockquote className="text-white text-[48px] leading-[70px] font-light tracking-tight italic">
                    &ldquo;{s.content}&rdquo;
                  </blockquote>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── SECTION 5 — BEFORE & AFTER ── */}
      {project.beforeImages && project.afterImages && project.beforeImages[0] && project.afterImages[0] && (
        <BeforeAfter
          beforeImage={project.beforeImages[0]}
          afterImage={project.afterImages[0]}
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
                      src={image}
                      alt={`${project.title} details`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="overflow-hidden rounded-[20px] aspect-[4/3]">
                    <img
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
      <ProjectGallery images={project.gallery} title={project.title} />



      {/* ── SECTION 7 — DESIGN HIGHLIGHTS ── */}
      {project.features && project.features.length > 0 && (
        <section className="w-full py-[120px] px-[85px] bg-[#ffffff] ">
          <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24">
            <div className="lg:w-[35%]">
              <span className="text-[#86A3AC] text-[36px] block mb-4">Craftsmanship</span>
              <h2 className="text-[#112931]/80 text-[66px] leading-[72px] capitalize">
                Key Design Highlights
              </h2>
              <p className="text-[#112931]/80 text-[20px] leading-[34px] mt-6 capitalize">
                Every detail is custom built to suit the property flow. The highlights listed here represent the technical milestones of this construction.
              </p>
            </div>
            <div className="lg:w-[65%] grid grid-cols-1 md:grid-cols-2 gap-8">
              {project.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="p-10 rounded-[20px] border border-[#112931]/10 hover:bg-white/5 transition-colors duration-300 flex flex-col gap-4"
                >
                  <span className="text-[#86A3AC] text-[24px]">0{idx + 1}</span>
                  <h3 className="text-[#112931]/80 text-[32px] leading-[38px] capitalize">
                    {feature}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── SECTION 8 — BUILD PROCESS TIMELINE ── */}
      {project.timeline && project.timeline.length > 0 && (
        <section className="w-full py-[120px] px-[85px] bg-[#112931]">
          <div ref={timelineRef} className="max-w-[1440px] mx-auto">
            <div className="text-center mb-20">
              <span className="text-[#86A3AC] text-[36px] block mb-4">Construction</span>
              <h2 className="text-white text-[66px] leading-[72px] capitalize">
                The Build Process
              </h2>
            </div>
            <div className="flex flex-col gap-24 relative pl-8 md:pl-16 border-l-2 border-[#ffffff]/10">
              {project.timeline.map((step, idx) => (
                <div key={idx} className="timeline-step relative flex flex-col lg:flex-row gap-12 items-start">
                  <span className="absolute -left-[41px] md:-left-[73px] top-2 w-[16px] h-[16px] rounded-full bg-[#86A3AC] border-4 border-white" />
                  <div className="lg:w-[50%] flex flex-col gap-4">
                    <span className="text-[#86A3AC] text-[24px]">Stage 0{idx + 1}</span>
                    <h3 className="text-white text-[36px] leading-[42px] capitalize">
                      {step.title}
                    </h3>
                    <p className="text-white/70 text-[20px] leading-[36px]">
                      {step.description}
                    </p>
                  </div>
                  {step.image && (
                    <div className="lg:w-[50%] w-full overflow-hidden rounded-[16px] aspect-[16/10]">
                      <img
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
      {project.testimonial && (
        <section className="w-full py-[140px] px-[85px] bg-[#ffffff] flex flex-col items-center justify-center text-center">
          <div className="max-w-[900px] flex flex-col items-center">
            <span className="text-[#86A3AC] text-[36px] block mb-8">Client Testimonial</span>
            <blockquote className="text-[#112931] text-[32px] md:text-[38px] leading-[54px] md:leading-[60px] font-light mb-8 italic">
              &ldquo;{project.testimonial.quote}&rdquo;
            </blockquote>
            <span className="w-12 h-[1px] bg-[#86A3AC] mb-6" />
            <cite className="text-[#86A3AC] text-[22px] font-normal not-italic capitalize">
              {project.testimonial.name}
            </cite>
          </div>
        </section>
      )}

      {/* ── SECTION 10 — RELATED PROJECTS ── */}
      {relatedProjects.length > 0 && (
        <section className="w-full py-[120px] px-[85px] bg-[#112931] border-t border-[#ffffff]/10">
          <div className="max-w-[1440px] mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 gap-4">
              <div>
                <span className="text-[#86A3AC] text-[36px] block mb-2">Portfolio</span>
                <h2 className="text-white text-[66px] leading-[72px] capitalize">
                  Related Projects
                </h2>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProjects.map((relProj) => (
                <ProjectCard key={relProj.id} project={relProj} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── SECTION 11 — CTA ── */}
      <CTA
        heading="Ready To Design Yours?"
        description="Book a private design consultation and let our team map out your dream pool and landscape environment."
        buttonText="Book A Service"
        buttonLink="/contact"
      />

      <Footer />
    </div>
  );
}
