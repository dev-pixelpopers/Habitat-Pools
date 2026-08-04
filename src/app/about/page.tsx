"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FAQSection from "@/components/FAQSection";
import CTA from "@/components/CTA";

gsap.registerPlugin(ScrollTrigger);


/* ── Stats Data ── */
const stats = [
  { value: "150+", label: "Projects Completed" },
  { value: "12+", label: "Years Of Experience" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "50+", label: "Awards Won" },
];

/* ── Values Data ── */
const values = [
  {
    title: "Craftsmanship",
    description: "Every pool, landscape, and outdoor living space is built with exceptional attention to detail using premium materials designed to stand the test of time.",
  },
  {
    title: "Transparency",
    description: "Clear communication is central to everything we do. We keep homeowners informed throughout every phase of design and construction so there are no unexpected surprises.",
  },
  {
    title: "Integrity",
    description: "We believe in doing the right thing, standing behind our work, and treating every project with the same care we would expect for our own homes.",
  },
  {
    title: "Innovation",
    description: "From smart pool automation and energy-efficient equipment to modern design solutions, we incorporate thoughtful innovations that improve both performance and long-term enjoyment.",
  },
];

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const storyImageRef = useRef<HTMLImageElement>(null);
  const storyTextRef = useRef<HTMLDivElement>(null);
  const ownerLeftRef = useRef<HTMLDivElement>(null);
  const ownerRightRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  /* Hero entrance */
  useGSAP(() => {
    if (!headingRef.current) return;
    gsap.from(headingRef.current, {
      y: 80,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      delay: 0.3,
    });
  }, { scope: heroRef });

  /* Story section clip reveals */
  useGSAP(() => {
    if (!storyImageRef.current || !storyTextRef.current) return;
    gsap.set(storyImageRef.current, { clipPath: "inset(100% 0% 0% 0%)" });
    gsap.set(storyTextRef.current, { clipPath: "inset(0% 100% 0% 0%)" });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: storyImageRef.current,
        start: "top 60%",
        toggleActions: "play none none reverse",
      },
    });
    tl.to(storyImageRef.current, { clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "power2.out" }, 0)
      .to(storyTextRef.current, { clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "power2.out" }, 0.15);
  });

  /* Owner section slide */
  useGSAP(() => {
    if (!ownerLeftRef.current || !ownerRightRef.current) return;
    gsap.set(ownerLeftRef.current, { x: "50%", y: 100, opacity: 0 });
    gsap.set(ownerRightRef.current, { x: "-50%", y: 100, opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ownerLeftRef.current,
        start: "top 50%",
        toggleActions: "play none none reverse",
      },
    });
    tl.to(ownerLeftRef.current, { x: 0, y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }, 0)
      .to(ownerRightRef.current, { x: 0, y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }, 0.15);
  });

  /* Stats counter animation */
  useGSAP(() => {
    if (!statsRef.current) return;
    const items = statsRef.current.querySelectorAll(".stat-item");
    gsap.from(items, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: statsRef.current,
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
    });
  });

  return (
    <div className="app">
      <Header />

      {/* ── Hero Section ── */}
      <section
        ref={heroRef}
        className="relative w-full flex items-end overflow-hidden"
        style={{
          height: "70vh",
          minHeight: "500px",
          fontFamily: "'Nohemi', sans-serif",
        }}
      >
        <div className="absolute inset-0 z-0">
          <img src="/images/about-img.jpeg" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/55" />
        </div>
        <div className="relative z-10 w-full px-[85px] pb-[80px]">
          <span className="text-[#86A3AC] text-[36px] leading-[38px] block mb-4">About Us</span>
          <h1 ref={headingRef} className="text-white text-[96px] leading-[88px] max-w-[900px]">
            Who We Are
          </h1>
        </div>
      </section>

      {/* ── Story Section ── */}
      <section className="pt-[200px] pb-[100px] px-[130px] bg-[#112931]" style={{ fontFamily: "'Nohemi', sans-serif" }}>
        {/* Overlapping heading */}
        <div className="mb-[-95px] z-2 relative ml-[150px]">
          <h2 className="text-white text-[96px] leading-[88px] max-w-[1020px] m-auto">
            Years of Experience.<br/>Built on Trust
          </h2>
        </div>

        {/* Two column layout */}
        <div className="flex gap-[40px]">
          {/* Tag */}
          <div className="w-[20%] pt-[20px]">
            <h4 className="text-[#86A3AC] text-[36px] leading-[38px] capitalize">Our Story</h4>
          </div>

          {/* Image */}
          <div className="flex justify-center w-[42%]">
            <img ref={storyImageRef} src="/images/about-img.jpeg" alt="About" className="w-full rounded-[20px]" />
          </div>

          {/* Text */}
          <div ref={storyTextRef} className="w-[38%] pl-[60px] flex flex-col justify-center">
            <p className="text-white text-[26px] leading-[48px] capitalize pt-16">
             Before founding Habitat Pools, we built our experience through years of hands-on work in pool service, luxury pool construction, landscape design, and residential construction. Throughout our careers, we've contributed to more than 300 custom swimming pool and landscape projects across Arizona. That experience shaped our commitment to quality craftsmanship, transparent communication, thoughtful planning, and attention to detail, creating outdoor spaces that are beautiful, functional, and built to last.
            </p>
          </div>
        </div>
      </section>

      {/* ── Stats Section ── */}
      <section
        ref={statsRef}
        className="w-full py-[120px] px-[85px] bg-white"
        style={{ fontFamily: "'Nohemi', sans-serif" }}
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-item text-center">
              <p className="text-[#112931] text-[96px] leading-[88px] mb-4">{stat.value}</p>
              <p className="text-[#86A3AC] text-[22px] leading-[30px]">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Owner Section ── */}
      <section
        className="relative w-full bg-[#112931] flex flex-col items-center justify-center py-[100px] px-[40px] overflow-hidden"
        style={{ fontFamily: "'Nohemi', sans-serif" }}
      >
        <div className="w-full flex flex-row gap-12 lg:gap-24 items-start">
          {/* Left — Image */}
          <div ref={ownerLeftRef} className="w-[35%]">
            <img
              src="/images/owner.png"
              alt="Owners reviewing plans on site"
              className="w-full h-[70vh] object-cover shadow-2xl"
            />
          </div>

          {/* Right — Content */}
          <div ref={ownerRightRef} className="w-[65%] flex flex-col justify-center items-start text-left">
            <h2 className="text-white text-[54px] leading-[71px] tracking-tight mb-8">
              Meet the Brothers Behind Habitat Pools
            </h2>
            <p className="text-white/90 text-[24px] leading-[44px] mb-14 capitalize">
              Habitat Pools is proudly owned and operated by two brothers serving Arizona homeowners. <br/>
              Unlike many larger companies, we stay involved from your initial consultation to your final walkthrough. The people you meet at the beginning of your project are the same people overseeing design decisions, coordinating construction, answering your questions, and ensuring every detail meets our standards. <br/>
              One of the greatest advantages we bring to every project comes from years of experience beyond construction alone. Before transitioning into custom swimming pool construction, Carter spent seven years owning and operating a professional pool service company, maintaining hundreds of residential pools throughout Arizona.<br/>
              That experience provided valuable insight into how pools perform long after construction is complete.
              He learned which equipment consistently delivers reliable performance, how proper plumbing design improves water circulation, and why certain pools remain cleaner while requiring less maintenance than others.
            </p>
            
          </div>
        </div>
        <div className="">

            <p className="text-white/90 text-[24px] leading-[44px] mb-14 capitalize">
            
              After moving into luxury pool construction, Carter helped lead the design and construction division for a high-end Arizona pool builder, contributing to the growth of a company that expanded from building approximately 20 custom pools annually to more than 75 projects each year.<br/>Today, that unique combination of maintenance knowledge and construction expertise influences every Habitat Pools project.

            </p>

            <div className="btn-all mt-[20px] relative">
              <a href="/contact" className="capitalize relative text-[22px] py-[20px] px-[64px] leading-[30px] underline decoration-[1px] text-white text-center">
                Call Us Today
              </a>
            </div>
          
        </div>
      </section>

      {/* ── Values Section ── */}
      <section
        className="w-full py-[120px] px-[85px] bg-white"
        style={{ fontFamily: "'Nohemi', sans-serif" }}
      >
        {/* Header */}
        <div className="relative w-full flex justify-center items-center mb-20">
          <span className="absolute left-0 text-[#86A3AC] text-[36px]">Values</span>
          <h2 className="text-[96px] leading-[88px] text-[#112931] text-center">What Drives Us</h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {values.map((v) => (
            <div
              key={v.title}
              className="p-10 rounded-[20px] border border-[#112931]/10 hover:bg-[#112931] hover:border-transparent transition-colors duration-300 group"
            >
              <h3 className="text-[#112931] group-hover:text-white text-[36px] leading-[42px] mb-6 transition-colors duration-300">
                {v.title}
              </h3>
              <p className="text-[#112931]/70 group-hover:text-white/80 text-[20px] leading-[36px] transition-colors duration-300">
                {v.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ Section ── */}
      <FAQSection
        faqs={[
          {
            question: "How long does it take to build a custom pool?",
            answer: "Every project is unique, but most custom pool projects are completed in approximately 90 days after construction begins. Larger or more complex pool and landscape projects may take longer depending on design complexity, permitting, weather, and material selections.",
          },
          {
            question: "Do you offer free consultations?",
            answer: "Yes. Every project begins with a complimentary consultation where we discuss your ideas, evaluate your property, and answer your questions. We can meet on-site or schedule a phone consultation if needed.",
          },
          {
            question: "Can I see my pool design before construction starts?",
            answer: "Absolutely. We create detailed custom design renderings so you can visualize your new backyard before construction begins. We continue refining the design until you're satisfied before preparing a final proposal.",
          },
          {
            question: "Do you handle permits and engineering?",
            answer: "Yes. Once your design is approved, we coordinate engineering plans and submit all required permits, helping simplify the process for you from start to finish.",
          },
          {
            question: "How much does a custom pool cost in Arizona?",
            answer: "Costs depend on size, design, features, finishes, and site conditions. Homeowners are encouraged to schedule a free consultation so we can discuss project scope and costing involved.",
          },
          {
            question: "Which areas do you serve?",
            answer: "Our primary service areas include:{li}Gilbert{/li} {li}Queen Creek{/li} {li}San Tan Valley{/li} {li}Mesa{/li} {li}Tempe{/li} {li}Scottsdale{/li} {li}Paradise Valley{/li} {li}Cave Creek{/li} {li}Ahwatukee{/li} {li}Phoenix{/li} {br} We've also completed projects in Goodyear, Glendale, and Peoria, and we're always happy to discuss projects in nearby communities.",
          },
          {
            question: "Can you build more than just a swimming pool?",
            answer: "Yes. We specialize in complete backyard transformations that may include:{li}Custom swimming pools{/li}{li}Integrated spas{/li} {li}Outdoor kitchens{/li} {li}Fire features{/li} {li}Water features{/li} {li}Custom decking{/li} {li}Landscape design{/li} {li}Hardscaping{/li} {li}Outdoor lighting{/li} {li}Smart pool automation{/li}{br} Our goal is to create a cohesive outdoor living space that complements your home and lifestyle.",
          },
        ]}
      />

      {/* ── CTA Section ── */}
      <CTA
        heading="Ready to Transform your Backyard?"
        description="Schedule your complimentary consultation and let's start designing a backyard that's uniquely yours."
        buttonText="Contact Us Today"
        buttonLink="/contact"
      />

      <Footer />
    </div>
  );
}
