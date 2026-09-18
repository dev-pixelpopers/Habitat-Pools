"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

interface HomeHeroProps {
  heading?: string;
  paragraph?: string;
  videoSrc?: string;
  posterSrc?: string;
}

/**
 * Home hero: the video expands from a circle to fill the viewport, then the
 * headline block slides up. Split out of the page so the page itself can stay
 * a server component and fetch CMS content.
 */
export default function HomeHero({
  heading = "Custom Pool Builders In Phoenix, Arizona",
  paragraph = "We design and build custom pools, luxury landscapes, and complete outdoor living spaces throughout Gilbert, Queen Creek, Mesa, Scottsdale, Tempe, Paradise Valley, Phoenix, and the surrounding East & West Valley.",
  videoSrc = "/videos/HeroVideo.webm",
  posterSrc,
}: HomeHeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!videoRef.current || !containerRef.current) return;
    const tl = gsap.timeline();
    tl.to(videoRef.current, {
      borderRadius: "0px",
      width: "100%",
      height: "100%",
      top: 0,
      left: 0,
      duration: 1,
      ease: "power3.out",
    })
    tl.to(containerRef.current, {
      y: 0,
      duration: 1.5,
      ease: "power3.out",
    }, ">")
  }, { scope: videoRef })

  return (
    <section className="relative h-screen w-full overflow-hidden px-[85px] pb-[50px] flex flex-col justify-end items-center">
      {/* Background Video */}
      <video ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        poster={posterSrc}
        className="absolute w-[386px] h-[383px] object-cover rounded-[540px]"
      >
        <source src={videoSrc} type="video/webm" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div ref={containerRef} className="relative z-10 flex items-end translate-y-100">
        <div className="grid grid-cols-1 md:grid-cols-3 xl:flex xl:flex-row xl:gap-4 gap-0 items-center justify-center w-full">
          {/* First Column */}
          <div className="xl:w-[40%]">
            <h1 className="text-white text-[80px] leading-[76.1px] font-normal whitespace-pre-line">
              {heading}
            </h1>
          </div>

          {/* Second Column */}
          <div className="flex justify-center xl:w-[20%]">
            <div className="w-[419px]">
              <img src="/images/arrow.png" alt="Arrow" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Third Column */}
          <div className="xl:w-[40%]">
            <p className="text-white text-[22px] leading-[44px] capitalize font-normal">
              {paragraph}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
