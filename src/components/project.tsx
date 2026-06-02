"use client";
import React, { useRef, useState, forwardRef } from 'react';
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// --- Types ---
interface Project {
  id: string;
  title: string;
  imageSrc: string;
  description: string;
}

// --- Icons ---
const ArrowUpRightIcon = () => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M7 17L17 7" />
    <path d="M7 7h10v10" />
  </svg>
);

// --- Sub-components ---

// 1. Wrap ProjectCard in forwardRef so we can attach GSAP animations directly to it
const ProjectCard = forwardRef<HTMLDivElement, { project: Project }>(({ project }, ref) => {
  return (
    <div
      ref={ref}
      className="relative flex flex-col p-6 bg-white border border-gray rounded-[2rem] shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:bg-[#112931] transition-colors duration-300 group"
    >
      {/* Top Right Action Button */}
      <div className="bg-[#122126] text-white p-6 rounded-full cursor-pointer group-hover:bg-white group-hover:text-[#112931] transition-colors duration-300 z-10 max-w-[75px] ml-auto my-auto flex items-center justify-center">
        <ArrowUpRightIcon />
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
});

ProjectCard.displayName = "ProjectCard";

// --- Main Component ---

export const ProjectsSection: React.FC = () => {
  const defaultDescription = "Custom Pools Designed Around Your Space, Your Lifestyle, And Your Vision";

  // Added 3 more projects for the "Load More" functionality
  const allProjects: Project[] = [
    { id: "1", title: "Luminara", imageSrc: "/images/project-01.png", description: defaultDescription },
    { id: "2", title: "Amani", imageSrc: "/images/project-02.png", description: defaultDescription },
    { id: "3", title: "Tranquil", imageSrc: "/images/project-03.png", description: defaultDescription },
    { id: "4", title: "Soluna", imageSrc: "/images/project-04.png", description: defaultDescription },
    { id: "5", title: "Orchard", imageSrc: "/images/project-05.png", description: defaultDescription },
    { id: "6", title: "Loller", imageSrc: "/images/project-06.png", description: defaultDescription },
    { id: "7", title: "Oasis", imageSrc: "/images/project-01.png", description: defaultDescription },
    { id: "8", title: "Mirage", imageSrc: "/images/project-02.png", description: defaultDescription },
    { id: "9", title: "Zenith", imageSrc: "/images/project-03.png", description: defaultDescription },
  ];

  // 2. State to track visible projects
  const [visibleCount, setVisibleCount] = useState(6);

  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    for (let i = 0; i < visibleCount; i += 3) {
      const leftCard = cardRefs.current[i];
      const centerCard = cardRefs.current[i + 1];
      const rightCard = cardRefs.current[i + 2];

      if (!leftCard || !centerCard || !rightCard) continue;

      // Measure the offset from the left card to center card so we know exactly how far to translate
      const leftRect = leftCard.getBoundingClientRect();
      const centerRect = centerCard.getBoundingClientRect();
      const rightRect = rightCard.getBoundingClientRect();

      // How far left card needs to move RIGHT to land on center
      const leftToCenter = centerRect.left;
      // How far right card needs to move LEFT to land on center
      const rightToCenter = centerRect.left * -1;

      // 1. Initial State: All cards stacked on the center card position, rotated 35deg
      gsap.set(centerCard, {
        zIndex: 10,
        rotation: -5.663,
        transformOrigin: "bottom center",
        position: "relative",
      });

      gsap.set(leftCard, {
        zIndex: 5,
        x: leftToCenter,
        rotation: -5.663,
        transformOrigin: "bottom center",
        position: "relative",
        opacity: 0
      });

      gsap.set(rightCard, {
        zIndex: 5,
        x: rightToCenter,
        rotation: -5.663,
        transformOrigin: "bottom center",
        position: "relative",
        opacity: 0
      });

      // 2. ScrollTrigger timeline: fan out cards to their natural grid positions
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: centerCard,
          start: "top 40%",
          toggleActions: "play none none reverse",
        }
      });

      tl.to(leftCard, { x: 0, rotation: 0, opacity: 1, duration: 1.2, ease: "power3.out" }, 0)
        .to(rightCard, { x: 0, rotation: 0, opacity: 1, duration: 1.2, ease: "power3.out" }, 0)
        .to(centerCard, { rotation: 0, zIndex: 5, duration: 1.2, ease: "power3.out" }, 0);
    }
  }, { dependencies: [visibleCount], scope: sectionRef });
  // Re-run animation logic whenever visibleCount changes so newly loaded cards get animated!

  const handleLoadMore = (e: React.MouseEvent) => {
    e.preventDefault();
    // Increase by 3, up to the total length of the array
    setVisibleCount(prev => Math.min(prev + 3, allProjects.length));

    // Give a slight delay for DOM to render, then refresh ScrollTrigger calculations
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  };

  return (
    <section ref={sectionRef} className="w-full min-h-screen py-24 px-[85px] bg-white flex flex-col items-center rounded-t-[20px]">
      <div className="w-full">

        {/* Header Section */}
        <div className="relative w-full flex justify-center items-center mb-16">
          <span className="absolute left-0 text-[#86A3AC] text-[36px] hidden md:block">
            Projects
          </span>
          <h2 className="text-[96px] leading-[88px] text-[#112931]">
            Explore Our Work
          </h2>
        </div>

        {/* Projects Grid */}
        {/* overflow-hidden on a parent container ensures the fanning cards don't create horizontal scrollbars temporarily */}
        <div className="overflow-hidden py-8 px-4 -mx-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-[38px] gap-x-[28px] mb-20" style={{ perspective: '1200px' }}>
            {allProjects.slice(0, visibleCount).map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                ref={(el) => { cardRefs.current[index] = el; }} // Assign elements to the array ref
              />
            ))}
          </div>
        </div>

        {/* Call To Action / Load More */}
        {visibleCount < allProjects.length && (
          <div className="flex justify-center">
            <div className="btn-all mt-[40px] relative btn-dark">
              <a
                href="#"
                onClick={handleLoadMore}
                className="capitalize relative text-[22px] py-[20px] px-[64px] leading-[30px] underline decoration-[1px] text-[#112931] text-center"
              >
                load more projects
              </a>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default ProjectsSection;