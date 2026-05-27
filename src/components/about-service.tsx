import React from 'react';

interface AboutServiceProps {
  imageSrc?: string;
  heading?: string;
  description?: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

export const AboutService: React.FC<AboutServiceProps> = ({
  // Fallback image added for testing, you can replace it with your actual asset
  imageSrc = '/images/owner.png',
  heading = 'At Habitat Pools & Landscape, we do things differently',
  description = "When you work with us, you work directly with the owners. We’re on-site multiple times a week, overseeing every detail, making decisions in real time, and ensuring nothing gets lost in translation.",
  buttonText = 'Call Us Today',
  onButtonClick,
}) => {
  return (
    // Background color set to match the dark teal in the design
    <section className="w-full min-h-screen bg-[#112428] flex items-center justify-center py-16 px-6 sm:px-12 lg:px-20 font-sans">
      
      {/* Max-width container to keep things constrained on very large screens */}
      <div className="w-full max-w-[1500px] grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        
        {/* Left Column: Image */}
        <div className="w-full">
          <img
            src={imageSrc}
            alt="Owners reviewing plans on site"
            className="w-full h-auto object-cover shadow-2xl"
          />
        </div>

        {/* Right Column: Content (Right-aligned as per design) */}
        <div className="flex flex-col justify-center items-end text-right">
          
          {/* Heading */}
          <h2 className="text-white text-3xl sm:text-4xl lg:text-[42px] font-medium leading-[1.3] tracking-tight mb-8 max-w-[650px]">
            {heading}
          </h2>
          
          {/* Description Paragraph */}
          <p className="text-white/90 text-base sm:text-lg leading-relaxed mb-12 max-w-[580px]">
            {description}
          </p>
          
          {/* Outlined Action Button */}
          <button
            onClick={onButtonClick}
            className="px-10 py-3.5 border border-white/60 text-white text-sm font-medium tracking-wide hover:bg-white hover:text-[#112428] transition-all duration-300 ease-in-out"
          >
            {buttonText}
          </button>

        </div>
      </div>
      
    </section>
  );
};

export default AboutService;