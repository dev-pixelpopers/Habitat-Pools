"use client";

import { useState, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FAQSection from "@/components/FAQSection";
import CTA from "@/components/CTA";

gsap.registerPlugin(ScrollTrigger);


/* ── Arrow Icon ── */
const ArrowUpRightIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17L17 7" />
    <path d="M7 7h10v10" />
  </svg>
);

/* ── Types ── */
interface Project {
  id: string;
  title: string;
  imageSrc: string;
  description: string;
  category: string;
}

/* ── Data ── */
const allProjects: Project[] = [
  { id: "1", title: "Luminara", imageSrc: "/images/project-01.png", description: "Custom Pools Designed Around Your Space, Your Lifestyle, And Your Vision", category: "Pool Design" },
  { id: "2", title: "Amani", imageSrc: "/images/project-02.png", description: "A Serene Infinity Pool That Blends Seamlessly With The Natural Surroundings", category: "Landscape" },
  { id: "3", title: "Tranquil", imageSrc: "/images/project-03.png", description: "Modern Geometric Pool With Integrated Spa And Water Features", category: "Pool Design" },
  { id: "4", title: "Soluna", imageSrc: "/images/project-04.png", description: "Resort-Style Backyard Transformation With Fire And Water Elements", category: "Remodel" },
  { id: "5", title: "Orchard", imageSrc: "/images/project-05.png", description: "Elegant Garden Pool With Natural Stone And Lush Landscaping", category: "Landscape" },
  { id: "6", title: "Loller", imageSrc: "/images/project-06.png", description: "Contemporary Pool Design With Smart Lighting And Automation", category: "Pool Design" },
  { id: "7", title: "Oasis", imageSrc: "/images/project-01.png", description: "Tropical Paradise With Lagoon-Style Pool And Waterfalls", category: "Remodel" },
  { id: "8", title: "Mirage", imageSrc: "/images/project-02.png", description: "Minimalist Pool With Vanishing Edge And LED Accents", category: "Pool Design" },
  { id: "9", title: "Zenith", imageSrc: "/images/project-03.png", description: "Complete Outdoor Living Space With Pool, Kitchen & Lounge", category: "Landscape" },
];

/* ── Project Card ── */
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!cardRef.current) return;
    gsap.set(cardRef.current, { opacity: 0, y: 60 });
    gsap.to(cardRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      delay: (index % 3) * 0.15,
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });
  }, { scope: cardRef });

  return (
    <div
      ref={cardRef}
      className="relative flex flex-col p-6 bg-white border border-gray rounded-[2rem] shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:bg-[#112931] transition-colors duration-300 group"
    >
      {/* Category tag */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-[14px] text-[#86A3AC] tracking-wider uppercase">{project.category}</span>
        <div className="bg-[#122126] text-white p-4 rounded-full cursor-pointer group-hover:bg-white group-hover:text-[#112931] transition-colors duration-300 flex items-center justify-center">
          <ArrowUpRightIcon />
        </div>
      </div>

      {/* Project Title */}
      <h3 className="mt-2 mb-5 text-[61px] text-[#112931] group-hover:text-white transition-colors duration-300 text-center tracking-tight">
        {project.title}
      </h3>

      {/* Project Image */}
      <div className="w-full aspect-[4/3] mb-6 overflow-hidden rounded-[1.5rem] rotate-[-4deg]">
        <img
          src={project.imageSrc}
          alt={`Preview of ${project.title} project`}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
        />
      </div>

      {/* Project Description */}
      <p className="text-[20px] text-[#112931] group-hover:text-white transition-colors duration-300 text-center leading-relaxed px-4 mt-[50px]">
        {project.description}
      </p>
    </div>
  );
}

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
              {allProjects.slice(0, visibleCount).map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
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
