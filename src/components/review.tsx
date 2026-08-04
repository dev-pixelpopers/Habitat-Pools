"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// --- Types ---
interface Review {
  id: string;
  name: string;
  rating: number; // Max 5
  text: string;
}

// --- Icons ---
const QuoteIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="#94a3b8"
    xmlns="http://www.w3.org/2000/svg"
    className="opacity-80"
  >
    <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c3.12-.604 5.37-3.139 5.37-6.208H1v-9.64h8.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c3.119-.604 5.377-3.139 5.377-6.208H14v-9.64h10z" />
  </svg>
);

const StarIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="#334155"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

// --- Sub-components ---
const ReviewCard: React.FC<{ review: Review }> = ({ review }) => {
  return (
    <div className="bg-white rounded-[1.1rem] flex flex-col gap-30 flex-shrink-0 w-full lg:w-[100%] snap-center shadow-2xl pt-[50px] pb-[30px] px-[30px]">

      {/* Header: Quote Icon + Name & Stars */}
      <div className="flex items-center gap-5">
        <div className="flex-shrink-0">
          <img src="/images/review-quote.png" width="60px" height="60px" />
        </div>
        <div className="flex flex-col">
          <h4 className="text-[22px] text-black leading-tight">
            {review.name}
          </h4>
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
};

// --- Main Component ---
export const ReviewsSection: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const bgImageRef = useRef<HTMLImageElement>(null);

  const reviews: Review[] = [
    {
      id: "1",
      name: "Jordyn Matthews",
      rating: 5,
      text: "We just wrapped up working with Carter and Colby from Habitat Pools on our dream backyard, and we honestly couldn't be happier with how it turned out. We are absolutely in love with our new pool and backyard! The entire process was so easy thanks to their experience and incredible eye for design. From the pool layout and plant selection to the tile choices, shade structures, appliances, and lighting, they guided us through every decision without making it feel overwhelming. We wanted a backyard that was both functional (somewhere we could actually spend time, even during the Arizona summer) and beautiful, and they absolutely nailed it. What we appreciated most was that they always kept our budget in mind. They genuinely wanted us to end up with a backyard we'd love, at a price we could afford. If you're looking for a company that creates truly high-end, luxurious outdoor spaces while making the entire process enjoyable, give Habitat Pools a call. Creating incredible backyards is what they do best, and it definitely shows.",
    },
    {
      id: "2",
      name: "Christopher Langake",
      rating: 5,
      text: "Absolutely fantastic company to work with for your backyard paradise! They took our dreams and made them reality! From landscaping to pool design we couldn’t be happier with our family oasis, Cactus Cove! What has made the exceptional is the after care, this wasn’t just a job for them, it was a commitment and they have honored every bit of what you’d expect but so rarely get these days! Looking for a dream pool or landscape, don’t hesitate, call Colby and Carter - Ha it at Pools!",
    },
    {
      id: "3",
      name: "Cassandra Nash",
      rating: 5,
      text: "We cannot say enough good things about Habitat Pools. What started as a pool project turned into a complete transformation of our entire outdoor space. We had a vision of exactly what we wanted and they went above and beyond to create a space beyond what we had imagined. They handled everything: landscaping, all new plants, garden beds, irrigation, driveway extension, pool, spa, and a beautiful shade structure, and every detail was thoughtfully designed and executed. What truly set Habitat Pools apart was their creativity, communication, and hands-on approach throughout the entire process. They didn’t just build us a pool (which is absolutely amazing, by the way) — they completely reimagined how our family uses and enjoys our home. One of our favorite parts of the project is the side yard transformation. What was once wasted space is now one of the most special areas of our property, complete with raised garden beds, fruit trees, and the sweetest playhouse tucked away for our kids. It feels like something out of a magazine, but still functional and family-focused. Colby and Carter were responsive, collaborative, and genuinely cared about making sure every part of the project was perfect. We are beyond grateful for the vision and effort they brought to our home and would recommend Habitat Pools to anyone looking for a company that goes above and beyond.",
    },
    // Dummy review added for testing slider movement
  ];

  // --- Scroll Logic ---
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  // --- GSAP: Animate background image from bottom + scale up ---
  useGSAP(() => {
    const bgImg = bgImageRef.current;
    if (!bgImg) return;

    // Initial state: scaled down and pushed below
    gsap.set(bgImg, {
      scale: 0.6,
      y: "30%",
      opacity: 0,
    });

    // Animate when section scrolls to 40%
    gsap.to(bgImg, {
      scale: 1,
      y: 0,
      opacity: 1,
      duration: 1.4,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 40%",
        toggleActions: "play none none reverse",
      },
    });
  }, { scope: sectionRef });

  return (
    // Section Background setup directly on the section tag
    <section
      ref={sectionRef}
      className="relative w-full flex flex-col justify-center pt-[0px] pb-[150px] px-[95px] pt-[40px] overflow-hidden"
    >
      {/* Absolute Background Image — animated from bottom with scale */}
      <div className="absolute inset-0">
        <img
          ref={bgImageRef}
          src="/images/review-bg.png"
          className="w-full h-full object-cover"
          alt=""
          style={{ transformOrigin: "center bottom" }}
        />
      </div>
      {/* Main Content Container */}
      <div className="relative z-10 w-full flex flex-col gap-[150px]">

        {/* Header Section */}
        <div className="w-full relative">
          <span className="absolute left-0 top-20 text-[#86A3AC] text-[36px]">
            Reviews
          </span>
          <h2 className="text-[96px] leading-[1.1] tracking-tight max-w-[900px] m-auto">
            Real Stories. <br />
            Stunning Backyards
          </h2>
        </div>

        {/* Carousel & Cards Section */}
        <div className="relative flex items-center justify-center w-full">

          {/* Left Arrow */}
          <button
            onClick={scrollLeft}
            className="hidden xl:flex absolute -left-4 2xl:-left-12 z-20 w-[271px] h-[271px] items-center justify-center text-white cursor-pointer"
          >
            <img src="/images/arrow-left-new.svg" alt="" />
          </button>

          {/* Cards Grid / Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 w-full max-w-[1300px] mx-auto z-10 overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>


          {/* Right Arrow */}
          <button
            onClick={scrollRight}
            className="hidden xl:flex absolute -right-4 2xl:-right-12 z-20 w-[271px] h-[271px] items-center justify-center text-white cursor-pointer"
          >
            {/* <ArrowRightIcon /> */}
            <img src="/images/arrow-right-new.svg" alt="" />
          </button>

        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;