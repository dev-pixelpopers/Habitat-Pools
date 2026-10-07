"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FAQSection from "@/components/FAQSection";
import CTA from "@/components/CTA";
import type { Review } from "@/components/review";
import type { ReviewsContent } from "@/lib/reviews";
import { definedOnly } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

/* ── Star Icon ── */
const StarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#334155" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

/* ── Fallback content, used when the CMS has nothing for a section ── */

const FALLBACK = {
  banner: {
    tagline: "Reviews",
    heading: "Real Stories. Stunning Backyards",
    backgroundImage: "/images/reviews-banner.jpg",
  },
  rating: {
    average: "5.0",
    text: "Every project we deliver reflects our commitment to excellence and client satisfaction.",
  },
  cta: {
    heading: "Ready To Create Your Dream Outdoor Space?",
    description: "Let's Bring Your Vision To Life With A Stunning Custom Pool. Our Experts Will Work With You To Design The Perfect Backyard Oasis.",
    buttonText: "Start Your Project",
  },
};

const FALLBACK_REVIEWS: Review[] = [
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

const FALLBACK_FAQS = [
  {
    question: "How long does it take to complete a custom pool project?",
    answer: "Every project is unique, but most custom pool projects are completed in approximately 90 days after construction begins. Larger backyard transformations or more complex projects may require additional time depending on the design, permitting, and selected features.",
  },
  {
    question: "Do you offer free consultations?",
    answer: "Yes. Every project begins with a complimentary consultation where we'll discuss your ideas, evaluate your property, answer your questions, and explore the best options for your backyard.",
  },
  {
    question: "Can I see my design before construction starts?",
    answer: "Absolutely. We create custom design renderings that allow you to visualize your new pool and outdoor space before construction begins. We'll continue refining the design until you're completely satisfied before moving forward.",
  },
  {
    question: "Do you handle engineering and permits?",
    answer: "Yes. Once your design is finalized, we coordinate the required engineering plans and obtain all necessary permits before construction begins, making the process as seamless as possible for you.",
  },
];

/** Seconds the review count takes to tick up from 0. */
const COUNT_DURATION = 1;

/**
 * Split the rating note around its number so the live count can sit in its
 * place: "Based On 9 Reviews" → ["Based On ", " Reviews"]. A note without a
 * number (or no note) falls back to the default wording.
 */
function splitNote(note?: string): [string, string] {
  const match = note?.match(/\d+/);
  if (!note || !match || match.index === undefined) return ["Based On ", " Reviews"];
  return [note.slice(0, match.index), note.slice(match.index + match[0].length)];
}

/* ── Review Card ── */
function ReviewCard({ review, index }: { review: Review; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const [expanded, setExpanded] = useState(false);
  // Only offer "Read more" when the quote is actually cut off; re-measured on
  // resize because the line count depends on the card width.
  const [clamped, setClamped] = useState(false);

  useEffect(() => {
    const el = textRef.current;
    if (!el || expanded) return;
    const measure = () => setClamped(el.scrollHeight > el.clientHeight + 1);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [expanded, review.text]);

  const toggle = () => {
    setExpanded((value) => !value);
    // Card heights changed, so the cards below need their trigger points
    // recalculated.
    requestAnimationFrame(() => ScrollTrigger.refresh());
  };

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

      {/* Review Text — clamped to 5 lines until expanded */}
      <div className="flex flex-col items-start gap-4">
        <p
          ref={textRef}
          id={`review-text-${review.id}`}
          className={`text-[#000000] text-[18px] leading-[32px] font-normal ${expanded ? "" : "line-clamp-5"}`}
        >
          {review.text}
        </p>
        {(clamped || expanded) && (
          <button
            type="button"
            onClick={toggle}
            aria-expanded={expanded}
            aria-controls={`review-text-${review.id}`}
            className="text-[#112931] text-[16px] underline underline-offset-4 hover:text-[#86A3AC] transition-colors duration-200 cursor-pointer"
          >
            {expanded ? "Read less" : "Read more"}
          </button>
        )}
      </div>
    </div>
  );
}

/* ── Main Page ── */
export default function ReviewsPageContent({
  content,
}: {
  content: ReviewsContent;
}) {
  const heroRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);

  const banner = { ...FALLBACK.banner, ...definedOnly(content.banner) };
  const rating = { ...FALLBACK.rating, ...definedOnly(content.rating) };
  const cta = { ...FALLBACK.cta, ...definedOnly(content.cta) };
  const reviews = content.reviews.length ? content.reviews : FALLBACK_REVIEWS;
  const faqs = content.faq.items ?? FALLBACK_FAQS;

  // The count is always the number of reviews on the page. The CMS note keeps
  // its wording ("Based On 9 Reviews"), but its number is replaced live so it
  // never goes stale when testimonials are added or removed.
  const reviewCount = reviews.length;
  const [noteBefore, noteAfter] = splitNote(rating.note);

  useGSAP(() => {
    const el = countRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // The server-rendered number stays in place until the bar scrolls into
    // view, so crawlers and no-JS visitors still see the real count.
    const counter = { value: 0 };
    gsap.to(counter, {
      value: reviewCount,
      duration: COUNT_DURATION,
      ease: "power2.out",
      snap: { value: 1 },
      onUpdate: () => {
        el.textContent = String(counter.value);
      },
      scrollTrigger: { trigger: el, start: "top 90%", once: true },
    });
  }, { dependencies: [reviewCount] });

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
          <img src={banner.backgroundImage} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 w-full px-[85px] pb-[80px]">
          <span className="text-[#86A3AC] text-[36px] leading-[38px] block mb-4">{banner.tagline}</span>
          <h1 ref={headingRef} className="text-white text-[96px] leading-[88px] max-w-[900px] whitespace-pre-line">
            {banner.heading}
          </h1>
        </div>
      </section>

      {/* ── Overall Rating Bar ── */}
      <section
        className="w-full py-[60px] px-[85px] bg-[#112931] flex flex-col md:flex-row items-center justify-between gap-8"
        style={{ fontFamily: "'Nohemi', sans-serif" }}
      >
        <div className="flex items-center gap-6">
          <span className="text-white text-[66px] leading-[66px]">{rating.average}</span>
          <div className="flex flex-col">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="24" height="24" viewBox="0 0 24 24" fill="#86A3AC" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
            <span className="text-white/70 text-[18px] mt-1">
              {noteBefore}
              <span ref={countRef} className="tabular-nums">{reviewCount}</span>
              {noteAfter}
            </span>
          </div>
        </div>
        <p className="text-white/80 text-[22px] leading-[30px] max-w-[500px] text-right">
          {rating.text}
        </p>
      </section>

      {/* ── Reviews Grid ── */}
      <section
        className="w-full py-[100px] px-[85px] bg-white"
        style={{ fontFamily: "'Nohemi', sans-serif" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          {reviews.map((review, index) => (
            <ReviewCard key={review.id} review={review} index={index} />
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
