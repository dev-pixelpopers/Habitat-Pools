"use client";
import React, { useRef } from 'react';
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AboutServiceProps {
  imageSrc?: string;
  heading?: string;
  description?: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

export const AboutService: React.FC<AboutServiceProps> = ({
  // Fallback image added for testing, you can replace it with your actual asset
  imageSrc = '/images/owner.png',
  heading = 'At Habitat Pools & Landscape, we do things differently',
  description = "When you work with us, you work directly with the owners. We're on-site multiple times a week, overseeing every detail, making decisions in real time, and ensuring nothing gets lost in translation.",
  buttonText = 'Call Us Today',
  onButtonClick,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const leftCol = leftColRef.current;
    const rightCol = rightColRef.current;
    if (!leftCol || !rightCol) return;

    // Initial state: both columns start centered and below the viewport
    // Left column shifts RIGHT towards center, right column shifts LEFT towards center
    gsap.set(leftCol, {
      x: "50%",    // shift right towards center
      y: 150,      // below its position
      opacity: 0,
    });

    gsap.set(rightCol, {
      x: "-50%",   // shift left towards center
      y: 150,      // below its position
      opacity: 0,
    });

    // Animate both columns to their natural positions when scrolling to 40% of section
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 40%",
        toggleActions: "play none none reverse",
      },
    });

    tl.to(leftCol, {
      x: 0,
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power3.out",
    }, 0)
    .to(rightCol, {
      x: 0,
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power3.out",
    }, 0.15); // slight stagger for a polished feel

  }, { scope: sectionRef });

  return (
    // Background color set to match the dark teal in the design
    <section ref={sectionRef} className="relative w-full bg-[#112931] flex items-center justify-center py-[100px] px-[40px] z-50 overflow-hidden">

      {/* Max-width container to keep things constrained on very large screens */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

        {/* Left Column: Image */}
        <div ref={leftColRef} className="w-full">
          <img
            src={imageSrc}
            alt="Owners reviewing plans on site"
            className="w-full h-auto object-cover shadow-2xl"
          />
        </div>

        {/* Right Column: Content (Right-aligned as per design) */}
        <div ref={rightColRef} className="flex flex-col justify-center items-end text-right">

          {/* Heading */}
          <h2 className="text-white text-[54px] leading-[71px] tracking-tight mb-8 max-w-[786px]">
            {heading}
          </h2>

          {/* Description Paragraph */}
          <p className="text-white/90 text-[24px] leading-[44px] mb-14 capitalize max-w-[680px]">
            {description}
          </p>

          {/* Outlined Action Button */}
          <div className='btn-all mt-[20px] relative'>
            <a href='#' className='capitalize relative text-[22px] py-[20px] px-[64px] leading-[30px] underline decoration-[1px] text-white text-center '>call us today</a>
          </div>

        </div>
      </div>

    </section>
  );
};

export default AboutService;