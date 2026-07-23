"use client";

import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FAQSection from "@/components/FAQSection";
import CTA from "@/components/CTA";

gsap.registerPlugin(ScrollTrigger);


/* ── Service Data ── */
interface Service {
  id: number;
  title: string;
  description: string;
  details: string[];
  imageSrc: string;
  href: string;
}

const services: Service[] = [
  {
    id: 1,
    title: "Custom Swimming Pool Construction",
    description: "Custom swimming pools designed around your home, lifestyle, and property to create a beautiful, functional backyard.",
    details: [
      "Infinity-edge & freeform pools",
      "Integrated spas & Baja shelves",
      "Premium pebble interiors",
      "Smart pool automation",
      "Energy-efficient pool equipment"
    ],
    imageSrc: "/images/service-02.png",
    href: "/services/custom-pool-construction",
  },
   {
    id: 2,
    title: "Pool & Landscape Design",
    description: "Our pool & landscape design services combine creative vision and functionality, ensuring every element of your backyard works together seamlessly.",
    details: [
      "Pool & Landscape design",
      "3D design renderings",
      "Hardscape planning",
      "Outdoor lighting",
      "Plant and Material Selections",
    ],
    imageSrc: "/images/service-01.png",
    href: "/services/pool-and-landscape-design",
  },
  {
    id: 3,
    title: "Pool Remodeling & Renovations",
    description: "We transform existing pools into beautiful, functional outdoor living environments built for today's lifestyle.",
    details: [
      "Pool resurfacing",
      "Tile & coping replacement",
      "Equipment upgrades",
      "Pool automation",
      "LED lighting & Water features",
    ],
    imageSrc: "/images/service-03.png",
    href: "/services/pool-remodeling-and-renovations",
  },
  
];

/* ── Premium Features ── */
type Feature = {
  id: string;
  label: string;
  image: string;
};

const features: Feature[] = [
  { id: "water", label: "Water Features", image: "/images/features_1.png" },
  { id: "fire", label: "Fire Features", image: "/images/features_2.jpg" },
  { id: "lighting", label: "Lighting Features", image: "/images/features_3.jpg" },
  { id: "kitchen", label: "Outdoor Kitchens", image: "/images/features_4.png" },
];

/* ── Service Card ── */
function ServiceCard({ service, index }: { service: Service; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!cardRef.current) return;
    gsap.from(cardRef.current, {
      y: 80,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
    });
  }, { scope: cardRef });

  const isEven = index % 2 === 0;

  return (
    <div ref={cardRef} className="w-full">
      <div className={`flex flex-col lg:flex-row ${!isEven ? "lg:flex-row-reverse" : ""} gap-0 overflow-hidden rounded-[20px]`}>
        {/* Image */}
        <div className="w-full lg:w-[55%] relative overflow-hidden" style={{ minHeight: "600px" }}>
          <img
            src={service.imageSrc}
            alt={service.title}
            className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700"
          />
        </div>

        {/* Content */}
        <div
          className="w-full lg:w-[45%] flex flex-col justify-center p-[60px] lg:p-[80px]"
          style={{ background: "#112931", fontFamily: "'Nohemi', sans-serif" }}
        >
          {/* Number */}
          <span className="text-[#86A3AC] text-[22px] mb-4">0{service.id}</span>

          {/* Title */}
          <h3 className="text-white text-[66px] leading-[62px] tracking-tight uppercase mb-8">
            {service.title}
          </h3>

          {/* Description */}
          <p className="text-white/80 text-[24px] leading-[36px] font-normal">
            {service.description}
          </p>

          {/* Detail list */}
          <ul className="flex flex-col gap-3 pt-6 pb-10">
            {service.details.map((detail) => (
              <li key={detail} className="text-white/70 text-[20px] leading-[28px] flex items-center gap-3 capitalize">
                <span className="w-[6px] h-[6px] rounded-full bg-[#86A3AC] flex-shrink-0" />
                {detail}
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <div className="btn-all relative mt-2">
            <a href={service.href} className="capitalize relative text-[22px] py-[20px] px-[64px] leading-[30px] underline decoration-[1px] text-white text-center">
              Explore More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Main Page ── */
export default function ServicesPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [activeFeature, setActiveFeature] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

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
          <img src="/images/service-01.png" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 w-full px-[85px] pb-[80px]">
          <span className="text-[#86A3AC] text-[36px] leading-[38px] block mb-4">Services</span>
          <h1 ref={headingRef} className="text-white text-[96px] leading-[88px] max-w-[900px]">
            Our Services
          </h1>
        </div>
      </section>

      {/* ── Intro Text ── */}
      <section
        className="w-full py-[100px] px-[85px] bg-white flex flex-col lg:flex-row gap-16 items-end"
        style={{ fontFamily: "'Nohemi', sans-serif" }}
      >
        <div className="lg:w-[40%]">
          <span className="text-[#86A3AC] text-[36px] leading-[38px] block mb-4">What We Offer</span>
          <h2 className="text-[#112931] text-[66px] leading-[72px]">
            Pool Construction & Luxury Outdoor Features in Arizona
          </h2>
        </div>
        <div className="lg:w-[60%] flex items-center">
          <p className="text-[#112931]/80 text-[24px] leading-[44px] capitalize">
            As a trusted custom pool builder in Arizona, Habitat Pools specializes in custom swimming pool construction, pool & landscape design, and complete backyard transformations that elevate the way you live outdoors. If you're building a brand-new backyard or upgrading an existing space, our team creates outdoor environments that are thoughtfully designed, expertly built, and tailored to your lifestyle.
          </p>
        </div>
      </section>

      {/* ── Service Cards ── */}
      <section className="w-full px-[85px] pb-[100px] bg-white flex flex-col gap-[60px]">
        {services.map((service, index) => (
          <ServiceCard key={service.id} service={service} index={index} />
        ))}
      </section>

      {/* ── Premium Features ── */}
      <section
        className="relative w-full flex flex-col justify-center px-8 py-16 md:py-20 md:px-16 lg:px-24"
        style={{
          background: "#112931",
          fontFamily: "'Nohemi', sans-serif",
        }}
      >
        {/* Header */}
        <div
          className="relative mb-7 flex flex-col lg:flex-row justify-start lg:gap-[354px]"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(-16px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[36px] text-[#86A3AC] hidden lg:block tracking-wide">Feature</span>
          </div>
          <div className="flex flex-col gap-4">
          <h2 className="text-[96px] leading-[88px] max-w-[1100px] text-white">
            Outdoor Living Features
          </h2>
          <p className="text-white/80 text-[24px] leading-[36px] font-normal mb-10">
            Complete your backyard with premium features that enhance comfort, functionality, and year-round enjoyment. Every feature is thoughtfully integrated into your overall design to create a seamless outdoor living experience.
          </p>
          </div>
        </div>

        {/* Cards */}
        <div
          className="relative flex overflow-hidden"
          style={{ height: "clamp(360px, 48vw, 540px)" }}
        >
          {features.map((feature, index) => {
            const isActive = activeFeature === index;
            return (
              <div
                key={feature.id}
                onMouseEnter={() => setActiveFeature(index)}
                className="relative overflow-hidden cursor-pointer"
                style={{
                  flex: isActive ? "2.5 1 0%" : "1 1 0%",
                  minWidth: 0,
                  transition: "flex 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? "translateY(0)" : "translateY(28px)",
                }}
              >
                <div
                  className="absolute inset-0 w-full h-full"
                  style={{
                    backgroundImage: `url(${feature.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    transform: isActive ? "scale(1)" : "scale(1.15)",
                    transition: "transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: isActive
                      ? "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0) 100%)"
                      : "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.1) 100%)",
                    transition: "background 0.5s ease",
                  }}
                />
                <div
                  className="absolute bottom-0 left-0 right-0 flex items-end"
                  style={{
                    padding: isActive ? "32px 28px" : "24px 20px",
                    transition: "padding 0.5s ease",
                  }}
                >
                  <h3
                    className="text-white font-normal leading-tight"
                    style={{
                      fontSize: isActive ? "clamp(28px, 3vw, 40px)" : "clamp(14px, 1.3vw, 20px)",
                      transition: "font-size 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                      textShadow: "0 2px 16px rgba(0,0,0,0.5)",
                      maxWidth: isActive ? "500px" : "200px",
                    }}
                  >
                    {feature.label}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Process Section ── */}
      <section
        className="w-full py-[120px] px-[85px] bg-white"
        style={{ fontFamily: "'Nohemi', sans-serif" }}
      >
        <div className="relative w-full flex justify-center items-center mb-20">
          <span className="absolute left-0 text-[#86A3AC] text-[36px]">Process</span>
          <h2 className="text-[96px] leading-[88px] text-[#112931] text-center">How We Work</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { step: "01", title: "Complimentary Consultation", desc: "Every project begins with a free consultation where we'll discuss your vision, evaluate your property, and understand your goals for your new outdoor space." },
            { step: "02", title: "Custom Design", desc: "After taking site measurements and photos, we create custom design renderings tailored to your home. We'll refine the design based on your feedback until you're confident it reflects exactly what you want before preparing a detailed proposal." },
            { step: "03", title: "Planning & Preparation", desc: "Once your design is approved, we'll guide you through material selections, coordinate engineering plans, obtain the necessary permits, and prepare every detail before construction begins." },
            { step: "04", title: "Construction", desc: "Our experienced team brings your vision to life with quality craftsmanship and regular project updates, keeping you informed throughout every stage of construction." },
            { step: "05", title: "Final Walkthrough & Pool School", desc: "Before your project is complete, we'll conduct a final walkthrough, address any finishing touches, and provide a personalized Pool School so you can confidently enjoy your new backyard." },
          ].map((item) => (
            <div key={item.step} className="flex flex-col gap-4 p-8 border-t-2 border-[#112931]/10 hover:border-[#86A3AC] transition-colors duration-300">
              <span className="text-[#86A3AC] text-[54px] leading-[54px]">{item.step}</span>
              <h3 className="text-[#112931] text-[36px] leading-[42px]">{item.title}</h3>
              <p className="text-[#112931]/70 text-[20px] leading-[36px]">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ Section ── */}
      <FAQSection
        faqs={[
          {
            question: "How long does the construction process take?",
            answer: "Every project is unique, but most custom projects are completed in approximately 90 days after construction begins. Larger or more complex backyard transformations may require additional time depending on engineering, permitting, weather conditions, and custom features.",
          },
          {
            question: "Do you handle engineering plans and permits?",
            answer: "Yes. Habitat Pools coordinates the engineering process and submits all required permits before construction begins. We manage these steps on your behalf to help ensure your project moves forward as smoothly as possible.",
          },
          {
            question: "Can I customize every aspect of my swimming pool?",
            answer: "Absolutely. Every pool we build is fully customized to suit your property, lifestyle, and personal preferences. From the pool shape and size to tile, pebble interiors, decking, water features, lighting, spas, and automation systems, every detail is selected with your vision in mind.",
          },
          {
            question: "Do you help with selecting materials?",
            answer: "Yes. We'll guide you through selecting finishes and materials that complement your home's style, including decking, tile, coping, pebble interiors, lighting concepts, and landscape elements.",
          },
          {
            question: "What features can I add to my custom pool?",
            answer: "We offer a wide range of premium features, including integrated spas, Baja shelves, waterfalls, deck jets, fire features, LED lighting, smart pool automation, outdoor kitchens, custom decking, hardscaping, and complete landscape design to create a seamless outdoor living space.",
          },
        ]}
      />

      {/* ── CTA Section ── */}
      {/* <section
        className="w-full py-[120px] px-[85px] flex flex-col items-center text-center"
        style={{
          background: "#112931",
          fontFamily: "'Nohemi', sans-serif",
        }}
      >
        <h2 className="text-white text-[66px] leading-[72px] mb-8 max-w-[800px]">
          Ready To Get Started?
        </h2>
        <p className="text-white/80 text-[24px] leading-[44px] max-w-[600px] mb-12 capitalize">
          Book A Consultation Today And Let Us Show You What&apos;s Possible For Your Outdoor Space.
        </p>
        <div className="btn-all relative">
          <a href="/contact" className="capitalize relative text-[22px] py-[20px] px-[64px] leading-[30px] underline decoration-[1px] text-white text-center">
            Book A Service
          </a>
        </div>
      </section> */}

      <CTA
        heading={"Ready To Get Started?"}
        description={"Book A Consultation Today And Let Us Show You What&apos;s Possible For Your Outdoor Space."}
        buttonText={"Book A Service"}
        buttonLink={"contact"}
      />

      <Footer />
    </div>
  );
}
