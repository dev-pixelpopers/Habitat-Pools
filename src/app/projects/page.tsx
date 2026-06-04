"use client";

import Link from "next/link";
import { useState, useRef } from "react";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FAQSection from "@/components/FAQSection";
import CTA from "@/components/CTA";
import { allProjects, Project } from "@/data/projects";
import { ProjectCard } from "@/components/project";

gsap.registerPlugin(ScrollTrigger);

/* ── Main Page ── */
export default function ProjectsPage() {
  const [visibleCount, setVisibleCount] = useState(6);
  const heroRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

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

  const handleLoadMore = (e: React.MouseEvent) => {
    e.preventDefault();
    setVisibleCount((prev) => Math.min(prev + 3, allProjects.length));
    setTimeout(() => ScrollTrigger.refresh(), 100);
  };

  return (
    <div className="app">
      <Header />

      {/* ── Hero Section ── */}
      <section
        ref={heroRef}
        className="relative w-full flex items-end overflow-hidden"
        style={{
          height: "70vh",
          minHeight: "500px",
          fontFamily: "'Nohemi', sans-serif",
        }}
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/project-01.png"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full px-[85px] pb-[80px]">
          <span className="text-[#86A3AC] text-[36px] leading-[38px] block mb-4">
            Projects
          </span>
          <h1
            ref={headingRef}
            className="text-white text-[96px] leading-[88px] max-w-[900px]"
          >
            Explore Our Work
          </h1>
        </div>
      </section>

      {/* ── Projects Grid ── */}
      <section className="w-full py-24 px-[85px] bg-white">
        <div className="w-full">
          {/* Grid */}
          <div className="overflow-hidden py-8 px-4 -mx-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-[38px] gap-x-[28px]">
              {allProjects.slice(0, visibleCount).map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>

          {/* Load More */}
          {visibleCount < allProjects.length && (
            <div className="flex justify-center mt-16">
              <div className="btn-all relative btn-dark">
                <a
                  href="#"
                  onClick={handleLoadMore}
                  className="capitalize relative text-[22px] py-[20px] px-[64px] leading-[30px] underline decoration-[1px] text-[#112931] text-center"
                >
                  Load More Projects
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── FAQ Section ── */}
      <FAQSection
        faqs={[
          {
            question: "How long does a typical pool project take to complete?",
            answer: "A custom pool construction project typically takes between 8 to 12 weeks, depending on the complexity of the design, soil conditions, permits, and scope of surrounding landscaping.",
          },
          {
            question: "Can I customize the shape and design of my pool?",
            answer: "Absolutely. We specialize in fully customized pools. Our design team works directly with you to craft a pool that complements your architecture, space constraints, and personal style.",
          },
          {
            question: "What factors affect the overall cost of a pool design and installation?",
            answer: "Key factors include the size and shape of the pool, soil composition, ease of access to your yard, selected materials (e.g., custom tiles, plaster finish), and addition of premium features like spas, fire bowls, and automation systems.",
          },
          {
            question: "Do you handle the city permits and structural engineering plans?",
            answer: "Yes, we handle the entire process from start to finish. This includes drafting structural engineering plans, submitting documentation to local municipalities, and securing all necessary building permits.",
          },
        ]}
      />

      {/* ── CTA Section ── */}
      <CTA
        heading="Start Your Dream Project"
        description="Let Us Transform Your Vision Into A Stunning Reality. Every Detail, Crafted With Care."
        buttonText="Get In Touch"
        buttonLink="/contact"
      />

      {/* ── CTA Section ── */}

      <Footer />
    </div>
  );
}
