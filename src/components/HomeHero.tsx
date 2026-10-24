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
    <section className="relative h-screen w-full overflow-hidden px-(--gutter) pb-[clamp(24px,17.63px_+_1.7vw,50px)] flex flex-col justify-end items-center">
      {/* Background Video */}
      <video ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        poster={posterSrc}
        className="absolute w-[clamp(180px,129.51px_+_13.465vw,386px)] h-[clamp(178px,127.75px_+_13.399vw,383px)] object-cover rounded-[540px]"
      >
        <source src={videoSrc} type="video/webm" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div ref={containerRef} className="relative z-10 flex items-end translate-y-100">
        {/* Below 1280 the three columns stack (heading, then copy); the
            decorative arrow only has room alongside them on wide screens. */}
        <div className="flex flex-col items-start gap-6 xl:flex-row xl:items-center xl:gap-4 justify-center w-full">
          {/* First Column */}
          <div className="xl:w-[40%]">
            <h1 className="text-white text-[clamp(38px,5.143vw_-_17.97px,80px)] leading-[clamp(36px,4.893vw_-_17.11px,76.1px)] font-normal whitespace-pre-line">
              {heading}
            </h1>
          </div>

          {/* Second Column */}
          <div className="hidden xl:flex justify-center xl:w-[20%]">
            <div className="w-[clamp(140px,71.61px_+_18.236vw,419px)]">
              <img src="/images/arrow.png" alt="Arrow" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Third Column */}
          <div className="xl:w-[40%]">
            <p className="text-white text-[clamp(16px,7.03px_+_0.786vw,22px)] leading-[clamp(26px,14.05px_+_1.572vw,44px)] capitalize font-normal">
              {paragraph}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
