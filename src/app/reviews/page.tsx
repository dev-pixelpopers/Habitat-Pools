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


/* ── Types ── */
interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
}

/* ── Star Icon ── */
const StarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#334155" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

/* ── Reviews Data ── */
const reviews: Review[] = [
  {
    id: "1",
    name: "Jennifer Collins",
    rating: 5,
    text: "The quality of work is exceptional. They transformed our vision into a breathtaking custom pool that completely elevated our home. If you're looking for luxury pool construction with premium service, this is the company to trust.",
  },
  {
    id: "2",
    name: "Daniel Rodriguez",
    rating: 5,
    text: "From The Initial Design Consultation To The Final Reveal, The Team Exceeded Every Expectation. Our Backyard Now Feels Like A Five-Star Resort. The Craftsmanship, Attention To Detail, And Luxury Finishes Are Absolutely Stunning.",
  },
  {
    id: "3",
    name: "Sarah Thompson",
    rating: 5,
    text: "We Wanted A Modern Infinity Pool That Felt Elegant And Timeless, And They Delivered Flawlessly. The Entire Construction Process Was Smooth, Professional, And Completed On Schedule.",
  },
  {
    id: "4",
    name: "Michael Smith",
    rating: 5,
    text: "Absolutely phenomenal experience from start to finish. The crew was always on time, polite, and kept the site clean. The pool is exactly what we dreamed of, and the smart features they recommended are a game-changer.",
  },
  {
    id: "5",
    name: "Amanda Chen",
    rating: 5,
    text: "Habitat Pools turned our outdated backyard into a modern oasis. The landscape design perfectly complements the pool, and the outdoor lighting creates such a magical atmosphere every evening. Highly recommended!",
  },
  {
    id: "6",
    name: "Robert Martinez",
    rating: 5,
    text: "Working directly with the owners made all the difference. They understood our vision immediately and brought ideas we hadn't even considered. The result is beyond anything we could have imagined.",
  },
  {
    id: "7",
    name: "Emily Watson",
    rating: 5,
    text: "Our neighbors can't stop talking about our new pool and landscape. The water features and fire pit area have made our home the go-to spot for gatherings. Worth every penny.",
  },
  {
    id: "8",
    name: "David Park",
    rating: 5,
    text: "The remodel of our 20-year-old pool exceeded all expectations. It looks brand new with modern finishes, energy-efficient equipment, and smart controls. The team was professional and respectful throughout.",
  },
  {
    id: "9",
    name: "Lisa Hernandez",
    rating: 5,
    text: "From the first consultation to the final walkthrough, the experience was seamless. The craftsmanship is evident in every tile, every stone, and every detail. We couldn't be happier with our outdoor paradise.",
  },
];

/* ── Review Card ── */
function ReviewCard({ review, index }: { review: Review; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!cardRef.current) return;
    gsap.from(cardRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      delay: (index % 3) * 0.12,
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });
  }, { scope: cardRef });

  return (
    <div
      ref={cardRef}
      className="bg-white rounded-[1.1rem] flex flex-col gap-10 shadow-2xl pt-[50px] pb-[30px] px-[30px] hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)] transition-shadow duration-300"
    >
      {/* Header */}
      <div className="flex items-center gap-5">
        <div className="flex-shrink-0">
          <img src="/images/review-quote.png" width="60" height="60" alt="" />
        </div>
        <div className="flex flex-col">
          <h4 className="text-[22px] text-black leading-tight">{review.name}</h4>
          <div className="flex items-center gap-0 mt-1">
            {[...Array(review.rating)].map((_, i) => (
              <StarIcon key={i} />
            ))}
          </div>
        </div>
      </div>

      {/* Review Text */}
      <p className="text-[#000000] text-[18px] leading-[32px] font-normal">
        {review.text}
      </p>
    </div>
  );
}

/* ── Main Page ── */
export default function ReviewsPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

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
          <img src="/images/review-bg.png" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 w-full px-[85px] pb-[80px]">
          <span className="text-[#86A3AC] text-[36px] leading-[38px] block mb-4">Reviews</span>
          <h1 ref={headingRef} className="text-white text-[96px] leading-[88px] max-w-[900px]">
            Real Stories. Stunning Backyards
          </h1>
        </div>
      </section>

      {/* ── Overall Rating Bar ── */}
      <section
        className="w-full py-[60px] px-[85px] bg-[#112931] flex flex-col md:flex-row items-center justify-between gap-8"
        style={{ fontFamily: "'Nohemi', sans-serif" }}
      >
        <div className="flex items-center gap-6">
          <span className="text-white text-[66px] leading-[66px]">5.0</span>
          <div className="flex flex-col">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="24" height="24" viewBox="0 0 24 24" fill="#86A3AC" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
            <span className="text-white/70 text-[18px] mt-1">Based On {reviews.length} Reviews</span>
          </div>
        </div>
        <p className="text-white/80 text-[22px] leading-[30px] max-w-[500px] text-right">
          Every project we deliver reflects our commitment to excellence and client satisfaction.
        </p>
      </section>

      {/* ── Reviews Grid ── */}
      <section
        className="w-full py-[100px] px-[85px] bg-white"
        style={{ fontFamily: "'Nohemi', sans-serif" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <ReviewCard key={review.id} review={review} index={index} />
          ))}
        </div>
      </section>

      {/* ── FAQ Section ── */}
      <FAQSection
        faqs={[
          {
            question: "Can I speak with past clients to ask about their experience?",
            answer: "Yes, we can provide client references upon request. Many of our past clients are happy to share their firsthand experience working with our design and construction teams.",
          },
          {
            question: "Are the reviews on this page verified?",
            answer: "Every testimonial featured on our website represents a real project build. We pull reviews directly from verified customer feedback platforms like Google Maps and Houzz.",
          },
          {
            question: "Do you offer any warranty on the workmanship and materials?",
            answer: "Absolutely. We stand behind our custom craftsmanship. We offer robust warranties covering pool structure, plaster finishes, tiling, and manufacturer guarantees on smart pumps and filtration systems.",
          },
          {
            question: "How do you handle issues or feedback during construction?",
            answer: "Because we have direct owner involvement, any design adjustments or construction updates are resolved quickly on-site. You can communicate feedback directly, and we will implement solutions immediately.",
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
          Share Your Experience
        </h2>
        <p className="text-white/80 text-[24px] leading-[44px] max-w-[600px] mb-12 capitalize">
          Your Story Inspires Others To Create Their Dream Outdoor Space. We&apos;d Love To Hear About Your Journey With Us.
        </p>
        <div className="btn-all relative">
          <a href="/contact" className="capitalize relative text-[22px] py-[20px] px-[64px] leading-[30px] underline decoration-[1px] text-white text-center">
            Leave A Review
          </a>
        </div>
      </section> */}
      <CTA
        heading={"Ready To Create Your Dream Outdoor Space?"}
        description={"Let&apos;s Bring Your Vision To Life With A Stunning Custom Pool. Our Experts Will Work With You To Design The Perfect Backyard Oasis."}
        buttonText={"Start Your Project"}
        buttonLink={"contact"}
      />

      <Footer />
    </div>
  );
}
