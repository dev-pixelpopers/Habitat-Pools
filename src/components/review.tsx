import React from "react";

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

const ArrowLeftIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5" />
    <path d="M12 19l-7-7 7-7" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14" />
    <path d="M12 5l7 7-7 7" />
  </svg>
);

// --- Sub-components ---
const ReviewCard: React.FC<{ review: Review }> = ({ review }) => {
  return (
    <div className="bg-white rounded-[1.5rem] p-8 md:p-10 flex flex-col gap-6 flex-1 shadow-2xl min-w-[300px]">
      
      {/* Header: Quote Icon + Name & Stars */}
      <div className="flex items-center gap-5">
        <div className="flex-shrink-0">
          <QuoteIcon />
        </div>
        <div className="flex flex-col">
          <h4 className="text-[1.1rem] font-medium text-gray-900 leading-tight">
            {review.name}
          </h4>
          <div className="flex items-center gap-1 mt-1">
            {[...Array(review.rating)].map((_, i) => (
              <StarIcon key={i} />
            ))}
          </div>
        </div>
      </div>

      {/* Review Text */}
      <p className="text-[#112428] text-[14px] leading-[1.8] font-normal tracking-wide">
        {review.text}
      </p>
    </div>
  );
};

// --- Main Component ---
export const ReviewsSection: React.FC = () => {
  const reviews: Review[] = [
    {
      id: "1",
      name: "Jennifer Collins",
      rating: 5,
      text: "The Quality Of Work Is Exceptional. They Transformed Our Vision Into A Breathtaking Custom Pool That Completely Elevated Our Home. If You're Looking For Luxury Pool Construction With Premium Service, This Is The Company To Trust.",
    },
    {
      id: "2",
      name: "Daniel Rodriguez",
      rating: 5,
      text: "From The Initial Design Consultation To The Final Reveal, The Team Exceeded Every Expectation. Our Backyard Now Feels Like A Five-Star Resort. The Craftsmanship, Attention To Detail, And Luxury Finishes Are Absolutely Stunning",
    },
    {
      id: "3",
      name: "Sarah Thompson",
      rating: 5,
      text: "We Wanted A Modern Infinity Pool That Felt Elegant And Timeless, And They Delivered Flawlessly. The Entire Construction Process Was Smooth, Professional, And Completed On Schedule. Guests Are Constantly Complimenting Our New Outdoor Space.",
    },
  ];

  return (
    // Background Image Wrapper with Overlay
    <section className="relative w-full flex flex-col justify-center py-24 overflow-hidden bg-[#0a1417]">
      
      {/* Background Image Setup */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/review-bg.png" // Placeholder pool image
          alt="Luxury backyard pool at night"
          className="w-full h-full object-cover"
        />
        {/* Dark Teal/Black Gradient Overlay */}
        {/* <div className="absolute inset-0 bg-gradient-to-b from-[#0a191e]/90 via-[#112428]/70 to-[#0a191e]/90"></div> */}
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 lg:px-12">
        
        {/* Header Section */}
        <div className="w-full mb-16 relative">
          <span className="absolute left-0 top-2 text-[#86A3AC] text-2xl lg:text-[28px] hidden lg:block tracking-wide">
            Reviews
          </span>
          <h2 className="text-center text-white text-5xl md:text-[64px] leading-[1.1] font-medium tracking-tight">
            Real Stories. <br />
            Stunning Backyards
          </h2>
        </div>

        {/* Carousel & Cards Section */}
        <div className="relative flex items-center justify-center w-full">
          
          {/* Left Arrow */}
          <button className="hidden xl:flex absolute left-4 z-20 w-16 h-16 rounded-full border border-white/30 items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300">
            <ArrowLeftIcon />
          </button>

          {/* Cards Grid */}
          <div className="flex flex-col xl:flex-row gap-6 w-full max-w-[1300px] mx-auto z-10">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>

          {/* Right Arrow */}
          <button className="hidden xl:flex absolute right-4 z-20 w-16 h-16 rounded-full border border-white/30 items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300">
            <ArrowRightIcon />
          </button>

        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;