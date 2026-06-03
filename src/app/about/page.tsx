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
    description: "Every pool and landscape is built with meticulous attention to detail, using premium materials that stand the test of time.",
  },
  {
    title: "Transparency",
    description: "No hidden fees, no surprises. We keep you informed at every stage with clear timelines and honest communication.",
  },
  {
    title: "Innovation",
    description: "We integrate the latest pool technologies, smart automation, and sustainable practices into every project we deliver.",
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
          <img src="/images/about-img.png" alt="" className="w-full h-full object-cover" />
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
        <div className="mb-[-185px] z-2 relative ml-[150px]">
          <h2 className="text-white text-[96px] leading-[88px] max-w-[800px] m-auto">
            From Ordinary To Extraordinary Outdoors
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
            <img ref={storyImageRef} src="/images/about-img.png" alt="About" className="w-full rounded-[20px]" />
          </div>

          {/* Text */}
          <div ref={storyTextRef} className="w-[38%] pl-[60px] flex flex-col justify-center">
            <p className="text-white text-[26px] leading-[48px] capitalize">
              Founded with a passion for creating exceptional outdoor spaces, Habitat Pools & Landscape
              has grown into a premier luxury pool and landscape company. Our team brings together
              decades of combined expertise in design, engineering, and construction.
            </p>
            <p className="text-white/70 text-[22px] leading-[40px] capitalize mt-8">
              We believe every backyard has the potential to become a personal paradise. Our approach
              combines innovative design with time-tested craftsmanship to deliver spaces that exceed
              expectations.
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
        className="relative w-full bg-[#112931] flex items-center justify-center py-[100px] px-[40px] overflow-hidden"
        style={{ fontFamily: "'Nohemi', sans-serif" }}
      >
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Left — Image */}
          <div ref={ownerLeftRef} className="w-full">
            <img
              src="/images/owner.png"
              alt="Owners reviewing plans on site"
              className="w-full h-auto object-cover shadow-2xl"
            />
          </div>

          {/* Right — Content */}
          <div ref={ownerRightRef} className="flex flex-col justify-center items-end text-right">
            <h2 className="text-white text-[54px] leading-[71px] tracking-tight mb-8 max-w-[786px]">
              At Habitat Pools & Landscape, We Do Things Differently
            </h2>
            <p className="text-white/90 text-[24px] leading-[44px] mb-14 capitalize max-w-[680px]">
              When you work with us, you work directly with the owners. We&apos;re on-site multiple
              times a week, overseeing every detail, making decisions in real time, and ensuring
              nothing gets lost in translation.
            </p>
            <div className="btn-all mt-[20px] relative">
              <a href="/contact" className="capitalize relative text-[22px] py-[20px] px-[64px] leading-[30px] underline decoration-[1px] text-white text-center">
                Call Us Today
              </a>
            </div>
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
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
            question: "Who reviews the plans and supervises the project site?",
            answer: "At Habitat, we operate with a hands-on philosophy. The business owners personally supervise the project site, review structural drafts, and perform walkthroughs multiple times a week to guarantee high standards.",
          },
          {
            question: "What makes Habitat Pools & Landscape different from other pool builders?",
            answer: "We offer a unified service integrating both pool engineering and landscape design. Beyond that, our direct client-to-owner relationship eliminates middlemen, ensuring faster communication and flawless execution.",
          },
          {
            question: "Are you licensed, bonded, and insured?",
            answer: "Yes, we are fully licensed, bonded, and carry extensive general liability and worker's compensation insurance to protect you and your property throughout the build process.",
          },
          {
            question: "How do you handle project management and communication?",
            answer: "We use dedicated management channels where you get real-time photo updates, schedule overviews, and direct access to our team. We believe in absolute transparency, meaning no hidden charges or delays without notification.",
          },
        ]}
      />

      {/* ── CTA Section ── */}
      <CTA
        heading="Ready To Transform Your Space?"
        description="Join The Growing Family Of Homeowners Who Trust Habitat For Their Dream Outdoor Living."
        buttonText="Get Started"
        buttonLink="/contact"
      />

      <Footer />
    </div>
  );
}
