import Image from "next/image";
import AboutSection from "@/components/about";
import ProjectsSection from "@/components/project";
import StickyServicesContainer from "@/components/service";
import AboutService from "@/components/about-service";
import ReviewsSection from "@/components/review";

export default function Home() {
  return (
    <div className="app">
      <section className="relative h-screen w-full overflow-hidden px-[95px] pb-[50px]">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="/images/video-hero.mp4" type="video/mp4" />
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content */}
        <div className="relative z-10 h-full flex items-end">
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

    <AboutSection/>

    <ProjectsSection/>

    <StickyServicesContainer/>

    <AboutService/>

    <ReviewsSection/>
    </div>
  );
}
