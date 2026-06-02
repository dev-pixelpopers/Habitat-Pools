"use client";
import React, { useRef } from 'react';
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// --- Types ---
interface SectionProps {
  id: string | number;
  title: string;
  description: string;
  buttonText: string;
  imageSrc: string;
}

// --- Reusable Sticky Section Component ---
const StickySection = React.forwardRef<HTMLDivElement, { data: SectionProps; index: number }>(
  ({ data, index }, ref) => {
    return (
      // 'sticky top-0' is section ko uper fix kar dega jab yeh viewport ke top par pohnchega
      // 'h-screen' ensures har section pori screen gheray
      <div
        ref={ref}
        className="sticky top-0 w-full h-screen rounded-t-[2.5rem] overflow-hidden flex shadow-[0_-10px_30px_rgba(0,0,0,0.1)]"
        style={{
          transformOrigin: "center top",
          zIndex: index + 1,
        }}
      >

        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={data.imageSrc}
            alt={data.title}
            className="w-full h-full object-cover"
          />
          {/* Dark overlay taake white text wazeh nazar aaye */}
          {/* <div className="absolute inset-0 bg-black/30"></div>  */}
        </div>

        {/* Content Container */}
        <div className="relative z-10 w-full px-[95px] py-[200px] flex gap-10">

          {/* Left Column: Main Title */}
          <div className="flex w-[65%] pt-[60px]">
            <h2 className="text-white text-[66px] leading-[62px] tracking-tight capitalize">
              {data.title}
            </h2>
          </div>

          {/* Right Column: Description & Action */}
          <div className="flex flex-col w-[35%]">
            <p className="text-white text-[24px] leading-[36px] font-normal">
              {data.description}
            </p>

            {/* Outlined Button */}
            <div className='btn-all mt-[30px] relative'>
              <a href='#' className='capitalize relative text-[22px] py-[20px] px-[64px] leading-[30px] underline decoration-[1px] text-white text-center '>book a services </a>
            </div>
          </div>

        </div>
      </div>
    );
  }
);

StickySection.displayName = "StickySection";

// --- Main Container (Jismein 3 sections render honge) ---
export const StickyServicesContainer: React.FC = () => {

  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Aapke 3 sections ka data
  const sectionsData: SectionProps[] = [
    {
      id: 1,
      title: "Pool Design & Build",
      description: "Custom Pools Designed Around Your Space, Your Lifestyle, And Your Vision—Built With Precision And Long-Term Durability In Mind.",
      buttonText: "Book A Services",
      imageSrc: "/images/service-01.png", // Add your own image URL
    },
    {
      id: 2,
      title: "Landscape Design",
      description: "From clean, modern layouts to fully integrated outdoor environments, we create spaces that feel cohesive and elevated.",
      buttonText: "Book A Services",
      imageSrc: "/images/service-02.png",
    },
    {
      id: 3,
      title: "Remodel & Upgrades",
      description: "Transform outdated pools and outdoor areas into refined, high-end spaces that match today's standards.",
      buttonText: "Book A Services",
      imageSrc: "/images/service-03.png",
    }
  ];

  useGSAP(() => {
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];

    // For every card except the last one, create a scroll-driven animation
    // that fires as the NEXT card scrolls into view
    cards.forEach((card, i) => {
      if (i === cards.length - 1) return; // Last card has no "next" card to trigger it

      const nextCard = cards[i + 1];

      // The animation is scrubbed to the scroll between when the next card's
      // top hits the bottom of the viewport and when it fully covers the current card
      gsap.to(card, {
        rotate: 20,
        y: 200,
        scale: 0.7,
        ease: "none",
        scrollTrigger: {
          trigger: nextCard,
          start: "top bottom",   // starts when next card's top reaches viewport bottom
          end: "top top",        // ends when next card's top reaches viewport top (fully covering)
          scrub: true,           // smooth scroll-linked animation
        },
      });
    });
  }, { scope: containerRef });

  return (
    // Parent div mein overflow nahi hona chahiye warna sticky toot jayega
    // perspective on parent enables the 3D rotateX tilt effect
    <div ref={containerRef} className="relative w-full bg-white" style={{ perspective: '1200px' }}>
      {sectionsData.map((section, index) => (
        <StickySection
          key={section.id}
          data={section}
          index={index}
          ref={(el) => { cardRefs.current[index] = el; }}
        />
      ))}
    </div>
  );
};

export default StickyServicesContainer;