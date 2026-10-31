"use client";
import React, { useRef } from 'react';
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { responsiveSrc } from "@/lib/image";

gsap.registerPlugin(ScrollTrigger);

// --- Types ---
export interface StickySectionData {
  id: string | number;
  title: string;
  description: string;
  buttonText: string;
  imageSrc: string;
  href: string;
}

type SectionProps = StickySectionData;

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
            {...responsiveSrc(data.imageSrc, "100vw")}
            fetchPriority="low"
            alt={data.title}
            className="w-full h-full object-cover"
          />
          {/* Dark overlay taake white text wazeh nazar aaye */}
          <div className="absolute inset-0 bg-black/30"></div> 
        </div>

        {/* Content Container */}
        <div className="service-cards relative z-10 w-full px-[clamp(20px,1.62px_+_4.902vw,95px)] py-[clamp(48px,10.74px_+_9.935vw,200px)] flex gap-[clamp(20px,15.1px_+_1.308vw,40px)] max-lg:flex-col max-lg:justify-end">

          {/* Left Column: Main Title */}
          <div className="flex w-[65%] pt-[clamp(0px,3.922vw_-_14.71px,60px)] max-lg:w-full services-left-col">
            <h2 className="text-white text-[clamp(30px,4.243vw_-_14.83px,66px)] leading-[clamp(32px,3.986vw_-_13.93px,62px)] tracking-tight uppercase">
              {data.title}
            </h2>
          </div>

          {/* Right Column: Description & Action */}
          <div className="flex flex-col w-[35%] max-lg:w-full services-right-col">
            <p className="text-white text-(length:--fs-body-xl) leading-[clamp(26px,11.5px_+_1.286vw,36px)] font-normal">
              {data.description}
            </p>

            {/* Outlined Button */}
            <div className='btn-all mt-[clamp(20px,17.55px_+_0.654vw,30px)] relative'>
              <a href={data.href} className='capitalize relative text-(length:--btn-fs) py-(--btn-py) px-(--btn-px) leading-(--btn-lh) underline decoration-[1px] text-white text-center cursor-pointer'>{data.buttonText}</a>
            </div>
          </div>

        </div>
      </div>
    );
  }
);

StickySection.displayName = "StickySection";

// --- Main Container (Jismein 3 sections render honge) ---
export const StickyServicesContainer: React.FC<{ sections?: StickySectionData[] }> = ({
  sections,
}) => {

  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Fallback content, used when the CMS has no services cards
  const fallbackSections: SectionProps[] = [
    {
      id: 1,
      title: "Custom Swimming Pool Construction",
      description: "Every phase of swimming pool construction is carefully coordinated, from excavation and engineering to plumbing, electrical work, shotcrete, tile installation, coping, decking, landscaping, and premium pebble finishes. 90 days is all it takes!",
      buttonText: "View More",
      imageSrc: "/images/service-01.png", // Add your own image URL
      href: "/services/custom-pool-construction",
    },
    {
      id: 2,
      title: "Custom Pool & Landscape Design",
      description: "Your vision is the starting point for every project. From modern geometric pools to resort-style retreats and timeless entertaining spaces, we create custom designs that combine exceptional beauty with smarter planning for easier long-term maintenance.",
      buttonText: "View More",
      imageSrc: "/images/service-02.png",
      href: "/services/pool-and-landscape-design",
    },
    {
      id: 3,
      title: "Pool Remodeling & Backyard Renovations",
      description: "Our pool remodeling services include resurfacing, tile replacement, new decking, equipment upgrades, and complete pool redesigns. We also renovate backyards with landscaping, lighting, outdoor kitchens, and fire features to create cohesive Arizona outdoor living spaces built for lasting enjoyment.",
      buttonText: "View More",
      imageSrc: "/images/service-03.jpeg",
      href: "/services/pool-remodeling-and-renovations",
    }
  ];

  const sectionsData = sections?.length ? sections : fallbackSections;

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
  }, { dependencies: [sectionsData.length], scope: containerRef });

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