"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FAQSection from "@/components/FAQSection";
import CTA from "@/components/CTA";
import type { AboutContent } from "@/lib/about";
import { definedOnly } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

/* ── Fallback content, used when the CMS has nothing for a section ── */

const FALLBACK_STATS = [
  { value: "150+", label: "Projects Completed" },
  { value: "12+", label: "Years Of Experience" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "50+", label: "Awards Won" },
];

const FALLBACK_VALUES = [
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

const FALLBACK_FAQS = [
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
];

const FALLBACK = {
  banner: {
    tagline: "About Us",
    heading: "Who We Are",
    backgroundImage: "/images/about-banner.jpg",
  },
  story: {
    tagline: "Our Story",
    heading: "Years of Experience.\nBuilt on Trust",
    paragraph: "Before founding Habitat Pools, we built our experience through years of hands-on work in pool service, luxury pool construction, landscape design, and residential construction. Throughout our careers, we've contributed to more than 300 custom swimming pool and landscape projects across Arizona. That experience shaped our commitment to quality craftsmanship, transparent communication, thoughtful planning, and attention to detail, creating outdoor spaces that are beautiful, functional, and built to last.",
    image: "/images/about-img.jpg",
  },
  owner: {
    image: "/images/owner.png",
    heading: "Meet the Brothers Behind Habitat Pools",
    paragraph: "Habitat Pools is proudly owned and operated by two brothers serving Arizona homeowners.\nUnlike many larger companies, we stay involved from your initial consultation to your final walkthrough. The people you meet at the beginning of your project are the same people overseeing design decisions, coordinating construction, answering your questions, and ensuring every detail meets our standards.\nOne of the greatest advantages we bring to every project comes from years of experience beyond construction alone. Before transitioning into custom swimming pool construction, Carter spent seven years owning and operating a professional pool service company, maintaining hundreds of residential pools throughout Arizona.\nThat experience provided valuable insight into how pools perform long after construction is complete. He learned which equipment consistently delivers reliable performance, how proper plumbing design improves water circulation, and why certain pools remain cleaner while requiring less maintenance than others.",
    finalParagraph: "After moving into luxury pool construction, Carter helped lead the design and construction division for a high-end Arizona pool builder, contributing to the growth of a company that expanded from building approximately 20 custom pools annually to more than 75 projects each year.\nToday, that unique combination of maintenance knowledge and construction expertise influences every Habitat Pools project.",
    buttonText: "Call Us Today",
  },
  values: {
    tagline: "Values",
    heading: "What Drives Us",
  },
  cta: {
    heading: "Ready to Transform your Backyard?",
    description: "Schedule your complimentary consultation and let's start designing a backyard that's uniquely yours.",
    buttonText: "Contact Us Today",
  },
};

export default function AboutPageContent({
  content,
}: {
  content: AboutContent;
}) {
  const heroRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const storyImageRef = useRef<HTMLImageElement>(null);
  const storyTextRef = useRef<HTMLDivElement>(null);
  const ownerLeftRef = useRef<HTMLDivElement>(null);
  const ownerRightRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const banner = { ...FALLBACK.banner, ...definedOnly(content.banner) };
  const story = { ...FALLBACK.story, ...definedOnly(content.story) };
  const owner = { ...FALLBACK.owner, ...definedOnly(content.owner) };
  const values = { ...FALLBACK.values, ...definedOnly(content.values) };
  const cta = { ...FALLBACK.cta, ...definedOnly(content.cta) };
  const stats = content.stats ?? FALLBACK_STATS;
  const valueItems = content.values.items ?? FALLBACK_VALUES;
  const faqs = content.faq.items ?? FALLBACK_FAQS;

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
  }, { dependencies: [stats.length] });

  return (
    <div className="app">
      <Header />

      {/* ── Hero Section ── */}
      <section
        ref={heroRef}
        className="relative w-full flex items-end overflow-hidden"
        style={{
          height: "70vh",
          minHeight: "clamp(360px, 325.68px + 9.151vw, 500px)",
          fontFamily: "'Nohemi', sans-serif",
        }}
      >
        <div className="absolute inset-0 z-0">
          <img src={banner.backgroundImage} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/55" />
        </div>
        <div className="relative z-10 w-full px-(--gutter) pb-[clamp(40px,30.19px_+_2.615vw,80px)]">
          <span className="text-[#86A3AC] text-(length:--fs-eyebrow) leading-(--lh-eyebrow) block mb-4">{banner.tagline}</span>
          <h1 ref={headingRef} className="text-white text-(length:--fs-display) leading-(--lh-display) max-w-[9.375em] whitespace-pre-line">
            {banner.heading}
          </h1>
        </div>
      </section>

      {/* ── Story Section ── */}
      <section className="pt-[clamp(80px,50.59px_+_7.844vw,200px)] pb-[clamp(56px,45.22px_+_2.876vw,100px)] px-[clamp(20px,7.19vw_-_6.96px,130px)] bg-[#112931]" style={{ fontFamily: "'Nohemi', sans-serif" }}>
        {/* Overlapping heading */}
        <div className="mb-[calc(-1*clamp(60px,33.04px_+_7.19vw,170px))] z-2 relative ml-[clamp(0px,3.268vw_-_12.25px,50px)] max-lg:mb-[clamp(24px,17.63px_+_1.7vw,50px)] max-lg:ml-0">          
          <h2 className="text-white text-[clamp(38px,5.529vw_-_19.33px,86px)] leading-[clamp(36px,4.629vw_-_16.18px,72px)] max-w-[clamp(320px,116.57px_+_54.249vw,1150px)] m-auto whitespace-pre-line max-lg:max-w-none max-lg:m-0">
            {story.heading}
          </h2>
        </div>

        {/* Two column layout */}
        <div className="flex gap-[clamp(20px,15.1px_+_1.308vw,40px)] h-[95vh] max-lg:flex-col max-lg:h-auto">
          {/* Tag */}
          <div className="w-[12%] pt-[20px] max-lg:w-full max-lg:pt-0 max-lg:order-first abt-first-col">
            <h4 className="text-[#86A3AC] text-(length:--fs-eyebrow) leading-(--lh-eyebrow) capitalize">{story.tagline}</h4>
          </div>

          {/* Image */}
          <div className="flex justify-center w-[53%] max-lg:w-full abt-second-col">
            <img ref={storyImageRef} src={story.image} alt="About" className="w-full rounded-[clamp(12px,10.04px_+_0.523vw,20px)] max-lg:aspect-[4/3] max-lg:object-cover max-h-[900px]" />
          </div>

          {/* Text */}
          <div ref={storyTextRef} className="w-[35%] pl-[clamp(24px,15.18px_+_2.353vw,60px)] pt-[5%] flex flex-col justify-center max-lg:w-full max-lg:pl-0 max-lg:pt-0 abt-third-col">
            <p className="text-white text-[clamp(17px,7.66px_+_0.858vw,24px)] leading-[clamp(28px,13.09px_+_1.465vw,41px)] capitalize">
              {story.paragraph}
            </p>
          </div>
        </div>
      </section>

      {/* ── Stats Section ── */}
      <section
        ref={statsRef}
        className="w-full py-(--section-y) px-(--gutter) bg-white"
        style={{ fontFamily: "'Nohemi', sans-serif" }}
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-[clamp(24px,18.12px_+_1.569vw,48px)]">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-item text-center">
              <p className="text-[#112931] text-(length:--fs-display) leading-(--lh-display) mb-4">{stat.value}</p>
              <p className="text-[#86A3AC] text-[clamp(16px,7.03px_+_0.786vw,22px)] leading-[clamp(22px,9.58px_+_1.072vw,30px)]">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Owner Section ── */}
      <section
        className="relative w-full bg-[#112931] flex flex-col items-center justify-center py-[clamp(56px,45.22px_+_2.876vw,100px)] px-[clamp(20px,15.1px_+_1.308vw,40px)] overflow-hidden gap-[clamp(32px,26.12px_+_1.569vw,56px)]"
        style={{ fontFamily: "'Nohemi', sans-serif" }}
      >
        <div className="w-full flex flex-row gap-[clamp(32px,26.12px_+_1.569vw,56px)] items-stretch max-lg:flex-col">
          {/* Left — Image */}
          <div ref={ownerLeftRef} className="w-[35%] max-lg:w-full">
            <img
              src={owner.image}
              alt="Owners reviewing plans on site"
              className="w-full h-[100%] object-cover object-center shadow-2xl"
            />
          </div>

          {/* Right — Content */}
          <div ref={ownerRightRef} className="w-[65%] flex flex-col justify-center items-start text-left max-lg:w-full">
            <h2 className="text-white text-[clamp(30px,3.472vw_-_12.14px,54px)] leading-[clamp(38px,4.565vw_-_15.96px,71px)] tracking-tight mb-[clamp(20px,17.06px_+_0.785vw,32px)] whitespace-pre-line">
              {owner.heading}
            </h2>
            <p className="text-white/90 text-(length:--fs-body-xl) leading-(--lh-body-xl) capitalize whitespace-pre-line">
              {owner.paragraph}
            </p>
          </div>
        </div>
        <div className="">

          <p className="text-white/90 text-(length:--fs-body-xl) leading-(--lh-body-xl) mb-[clamp(32px,26.12px_+_1.569vw,56px)] capitalize whitespace-pre-line">
            {owner.finalParagraph}
          </p>

          <div className="btn-all mt-[20px] relative">
            <a href="/contact" className="capitalize relative text-(length:--btn-fs) py-(--btn-py) px-(--btn-px) leading-(--btn-lh) underline decoration-[1px] text-white text-center">
              {owner.buttonText}
            </a>
          </div>

        </div>
      </section>

      {/* ── Values Section ── */}
      <section
        className="w-full py-(--section-y) px-(--gutter) bg-white"
        style={{ fontFamily: "'Nohemi', sans-serif" }}
      >
        {/* Header: the tagline floats beside the centred heading on desktop
            and sits above it once the screen narrows */}
        <div className="relative w-full flex justify-center items-center mb-[clamp(40px,30.19px_+_2.615vw,80px)] max-lg:flex-col max-lg:items-start">
          <span className="absolute left-0 text-[#86A3AC] text-(length:--fs-eyebrow) max-lg:static max-lg:mb-3">{values.tagline}</span>
          <h2 className="text-(length:--fs-display) leading-(--lh-display) text-[#112931] text-center whitespace-pre-line max-lg:text-left">{values.heading}</h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[clamp(24px,18.12px_+_1.569vw,48px)]">
          {valueItems.map((v) => (
            <div
              key={v.title}
              className="p-[clamp(24px,20.08px_+_1.046vw,40px)] rounded-[clamp(14px,12.53px_+_0.393vw,20px)] border border-[#112931]/10 hover:bg-[#112931] hover:border-transparent transition-colors duration-300 group"
            >
              <h3 className="text-[#112931] group-hover:text-white text-[clamp(24px,2.315vw_-_8.1px,36px)] leading-[clamp(30px,2.7vw_-_9.44px,42px)] mb-[clamp(16px,14.04px_+_0.523vw,24px)] transition-colors duration-300">
                {v.title}
              </h3>
              <p className="text-[#112931]/70 group-hover:text-white/80 text-[clamp(16px,6.38px_+_0.715vw,20px)] leading-[clamp(28px,11.5px_+_1.286vw,36px)] transition-colors duration-300">
                {v.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ Section ── */}
      <FAQSection
        faqs={faqs}
        tagline={content.faq.tagline}
        heading={content.faq.heading}
        intro={content.faq.intro}
      />

      {/* ── CTA Section ── */}
      <CTA
        heading={cta.heading}
        description={cta.description}
        buttonText={cta.buttonText}
        buttonLink="/contact"
      />

      <Footer />
    </div>
  );
}
