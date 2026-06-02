"use client";
import AboutSection from "@/components/about";
import ProjectsSection from "@/components/project";
import StickyServicesContainer from "@/components/service";
import AboutService from "@/components/about-service";
import ReviewsSection from "@/components/review";
import PremiumFeatures from "@/components/PremiumFeatures";
import BeforeAfter from "@/components/BeforeAfter";
import GetInTouch from "@/components/GetInTouch";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

export default function Home() {
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
    <div className="app">
      <Header />
      <section className="relative h-screen w-full overflow-hidden px-[95px] pb-[50px] flex flex-col justify-end items-center">
        {/* Background Video */}
        <video ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute w-[386px] h-[383px] object-cover rounded-[540px]"
        >
          <source src="/images/video-hero.mp4" type="video/mp4" />
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content */}
        <div ref={containerRef} className="relative z-10 flex items-end translate-y-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center justify-center w-full">
            {/* First Column */}
            <div>
              <h1 className="text-white text-[80px] leading-[76.1px] font-normal">
                Luxury Pools & Landscapes
              </h1>
            </div>

            {/* Second Column */}
            <div className="flex justify-center">
              <div className="w-[419px]">
                <img src="/images/arrow.png" alt="Arrow" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Third Column */}
            <div>
              <p className="text-white text-[22px] leading-[44px] capitalize font-normal">
                Experience a level of craftsmanship where the people you meet are the ones who build your
              </p>
            </div>
          </div>
        </div>
      </section>

      <AboutSection />

      <ProjectsSection />

      <StickyServicesContainer />

      <AboutService />

      <ReviewsSection />

      <PremiumFeatures />

      <BeforeAfter />

      <GetInTouch />

      <Footer />
    </div>
  );
}
