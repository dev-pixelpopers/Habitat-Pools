"use client";
import React, { useRef } from 'react';
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PillList from "./PillList";

gsap.registerPlugin(ScrollTrigger);

interface AboutServiceProps {
  imageSrc?: string;
  heading?: string;
  /** Lead paragraph above the service areas. */
  intro?: string;
  /** Service areas as plain names — rendered as chips. */
  areas?: string[];
  /** Closing paragraph below the service areas. */
  outro?: string;
  /**
   * Legacy `{li}` / `{br}` template. Only rendered when `areas` is empty, which
   * is what happens if the CMS is unreachable and the default below is used.
   */
  description?: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

export const AboutService: React.FC<AboutServiceProps> = ({
  // Fallback image added for testing, you can replace it with your actual asset
  imageSrc = '/images/owner.png',
  heading = 'Serving Homeowners Across Arizona',
  intro,
  areas,
  outro,
  description = "Habitat Pools builds custom swimming pools, luxury landscapes, and complete outdoor living spaces across Arizona's East Valley.{li} Gilbert{/li} {li}Queen Creek{/li} {li}San Tan Valley{/li} {li}Mesa{/li} {li}Tempe{/li} {li}Scottsdale{/li} {li}Paradise Valley{/li} {li}Cave Creek{/li} {li}Ahwatukee{/li} {li}Phoenix{/li} {br}We've also done projects in Goodyear, Glendale, and Peoria, and we're always happy to discuss projects in nearby communities.",
  buttonText = 'Call Us Today',
  onButtonClick,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  const hasStructuredAreas = Boolean(areas && areas.length > 0);

  const renderDescription = (raw: string): React.ReactNode[] => {
    const output: React.ReactNode[] = [];
    const chunks = raw.split('{br}').map((chunk) => chunk.trim()).filter(Boolean);

    chunks.forEach((chunk, chunkIdx) => {
      const liRegex = /{li}(.*?){\/li}/g;
      const listItems: string[] = [];
      let match: RegExpExecArray | null;

      while ((match = liRegex.exec(chunk)) !== null) {
        listItems.push(match[1].trim());
      }

      const remainingText = chunk.replace(liRegex, '').trim();

      if (remainingText) {
        output.push(
          <p key={`p-${chunkIdx}`} className="mb-4 last:mb-0 lg:max-w-[70%] lg:ml-auto">
            {remainingText}
          </p>
        );
      }

      if (listItems.length > 0) {
        const midpoint = Math.ceil(listItems.length / 2);
        const firstColumnItems = listItems.slice(0, midpoint);
        const secondColumnItems = listItems.slice(midpoint);

        output.push(
          <div key={`ul-${chunkIdx}`} className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-right mb-4 last:mb-0">
            <ul className="pl-5 space-y-1">
              {firstColumnItems.map((item, index) => (
                <li key={`li-${chunkIdx}-${index}`}>- {item}</li>
              ))}
            </ul>

            {secondColumnItems.length > 0 && (
              <ul className="pl-5 space-y-1">
                {secondColumnItems.map((item, index) => (
                  <li key={`li-${chunkIdx}-${index + midpoint}`}>- {item}</li>
                ))}
              </ul>
            )}
          </div>
        );
      }
    });

    return output;
  };
  

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
        start: "top 80%",
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
          <h2 className="text-white text-[54px] leading-[71px] tracking-tight mb-8 lg:max-w-[70%]">
            {heading}
          </h2>

          {/* Description Paragraph */}
          <div className="text-white/90 text-[24px] leading-[44px] mb-14 w-full">
            {hasStructuredAreas ? (
              <>
                {intro && <p className="lg:max-w-[70%] lg:ml-auto">{intro}</p>}
                <PillList items={areas!} columns={3} tone="dark" className="my-8" />
                {outro && <p className="lg:max-w-[70%] lg:ml-auto">{outro}</p>}
              </>
            ) : (
              renderDescription(description)
            )}
          </div>

          {/* Outlined Action Button */}
          <div className='btn-all mt-[20px] relative'>
            <a
              href='/contact'
              onClick={onButtonClick}
              className='capitalize relative text-[22px] py-[20px] px-[64px] leading-[30px] underline decoration-[1px] text-white text-center cursor-pointer '
            >
              {buttonText}
            </a>
          </div>

        </div>
      </div>

    </section>
  );
};

export default AboutService;