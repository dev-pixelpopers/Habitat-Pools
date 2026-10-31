"use client";
import { useRef } from 'react';
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { responsiveSrc } from "@/lib/image";

// Register ScrollTrigger so GSAP knows how to handle scroll events
gsap.registerPlugin(ScrollTrigger);

interface AboutSectionProps {
  imageSrc?: string;
  tagline?: string;
  heading?: string;
  description?: string;
  buttonText?: string;
  buttonLink?:string;
  onButtonClick?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  imageSrc = '/images/about-img.jpg',
  tagline = 'Who We Are',
  heading = "Built on Experience\nDriven by Craftsmanship",
  description = "Habitat Pools was founded in 2024 by two brothers after more than 18 years of combined experience in Arizona's pool and landscape industry. As brothers and business partners, we're passionate about creating outdoor spaces that are as functional as they are beautiful. Unlike larger companies where projects often change hands between multiple departments, we stay involved, committed and transparent.",
  buttonText = 'About Us',
  buttonLink= '/about',
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
        start: "top 60%",
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
    <section ref={sectionRef} className="pt-[clamp(80px,50.59px_+_7.844vw,200px)] pb-[clamp(56px,45.22px_+_2.876vw,100px)] px-[clamp(20px,7.19vw_-_6.96px,130px)] bg-[#112931] abt-parent">

      {/* First Row */}
      <div className="mb-[calc(-1*clamp(60px,33.04px_+_7.19vw,170px))] z-2 relative ml-[clamp(0px,3.268vw_-_12.25px,50px)] max-lg:mb-[clamp(24px,17.63px_+_1.7vw,50px)] max-lg:ml-0">
        <h2 ref={headingRef} className="text-white text-[clamp(38px,5.529vw_-_19.33px,86px)] leading-[clamp(36px,4.629vw_-_16.18px,72px)] max-w-[clamp(320px,116.57px_+_54.249vw,1150px)] m-auto whitespace-pre-line max-lg:max-w-none max-lg:m-0">
          {heading}
        </h2>
      </div>

      {/* Second Row */}
      <div className="flex gap-[clamp(20px,15.1px_+_1.308vw,40px)] h-[95vh] max-lg:flex-col max-lg:h-auto">

        {/* First Column */}
        <div className='w-[12%] pt-[20px] max-lg:w-full max-lg:pt-0 max-lg:order-first abt-first-col'>
          <h4 className="text-[#86A3AC] text-(length:--fs-eyebrow) leading-(--lh-eyebrow) capitalize">
            {tagline}
          </h4>
        </div>

        {/* Second Column (Fixed className typo here) */}
        <div className="flex justify-center w-[53%] max-lg:w-full abt-second-col">
          <img
            ref={imageRef}
            {...responsiveSrc(imageSrc, "(max-width: 1023px) 100vw, 45vw")}
            fetchPriority="low"
            alt="About"
            className="w-full rounded-[clamp(12px,10.04px_+_0.523vw,20px)] max-h-[900px] max-lg:max-h-none max-lg:aspect-[4/3] max-lg:object-cover"
          />
        </div>

        {/* Third Column */}
        <div className='w-[35%] pl-[clamp(24px,15.18px_+_2.353vw,60px)] pt-[5%] flex flex-col justify-center max-lg:w-full max-lg:pl-0 max-lg:pt-0 abt-third-col'>
          <p ref={descriptionRef} className="text-white text-[clamp(17px,7.66px_+_0.858vw,24px)] leading-[clamp(28px,13.09px_+_1.465vw,41px)] capitalize">
            {description}
          </p>
          <div className='btn-all mt-[clamp(32px,25.13px_+_1.831vw,60px)] relative'>
            <a
              ref={buttonRef}
              href={buttonLink}
              onClick={onButtonClick}
              className='capitalize relative text-(length:--btn-fs) py-(--btn-py) px-(--btn-px) leading-(--btn-lh) underline decoration-[1px] text-white text-center'>
              {buttonText}
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;