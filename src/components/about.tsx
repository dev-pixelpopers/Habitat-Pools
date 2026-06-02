"use client";
import { useRef } from 'react';
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger so GSAP knows how to handle scroll events
gsap.registerPlugin(ScrollTrigger);

interface AboutSectionProps {
  imageSrc?: string;
  tagline?: string;
  headingLines?: string[];
  description?: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  imageSrc = '/images/about-img.png',
  tagline = 'Who We Are',
  headingLines = ['From Ordinary To', 'Extraordinary', 'Outdoors'],
  description = 'Experience A Level Of Craftsmanship Where The People You Meet Are The Ones Who Build Your Project. No Handoffs. No Layers. Just Direct Involvement, Every Step Of The Way',
  buttonText = 'Call Us Today',
  onButtonClick,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useGSAP(() => {
    // Ensure all our elements exist before animating
    if (!imageRef.current || !headingRef.current || !descriptionRef.current || !sectionRef.current) return;

    // 1. Initial Setup: Set the starting clip-paths
    // Image & Heading: Bottom to Top (100% top inset)
    gsap.set([imageRef.current, headingRef.current], { clipPath: "inset(100% 0% 0% 0%)" });

    // Description: Left to Right (100% right inset)
    gsap.set(descriptionRef.current, { clipPath: "inset(0% 100% 0% 0%)" });

    // 2. The Timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 30%",
        end: "+=400",
        scrub: 1,
        toggleActions: "play none none reverse",
      }
    });

    // 3. The Animations
    // Using the '0' position parameter makes them all animate at the exact same time
    tl.to(imageRef.current, { clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "power2.out" }, 0)
      .to(headingRef.current, { clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "power2.out" }, 0)
      .to(descriptionRef.current, { clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "power2.out" }, 0);

  }, { scope: sectionRef }); // Good practice: scope GSAP to this specific section

  return (
    <section ref={sectionRef} className="pt-[200px] pb-[100px] px-[130px] bg-[#112931]">

      {/* First Row */}
      <div className="mb-[-185px] z-2 relative ml-[150px]">
        <h2 ref={headingRef} className="text-white text-[96px] leading-[88px] max-w-[800px] m-auto">
          {headingLines.join(' ')}
        </h2>
      </div>

      {/* Second Row */}
      <div className="flex gap-[40px]">

        {/* First Column */}
        <div className='w-[20%] pt-[20px]'>
          <h4 className="text-[#86A3AC] text-[36px] leading-[38px] capitalize">
            {tagline}
          </h4>
        </div>

        {/* Second Column (Fixed className typo here) */}
        <div className="flex justify-center w-[42%]">
          <img
            ref={imageRef}
            src={imageSrc}
            alt="About"
            className="w-full rounded-[20px]"
          />
        </div>

        {/* Third Column */}
        <div className='w-[38%] pl-[60px] flex flex-col justify-center'>
          <p ref={descriptionRef} className="text-white text-[26px] leading-[48px] capitalize">
            {description}
          </p>
          <div className='btn-all mt-[60px] relative'>
            <a
              ref={buttonRef}
              href='#'
              onClick={onButtonClick}
              className='capitalize relative text-[22px] py-[20px] px-[64px] leading-[30px] underline decoration-[1px] text-white text-center'>
              {buttonText}
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;