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
    <section className="w-full bg-[#112931] flex items-center justify-center py-[100px] px-[40px]">
      
      {/* Max-width container to keep things constrained on very large screens */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        
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
          <h2 className="text-white text-[54px] leading-[71px] tracking-tight mb-8 max-w-[786px]">
            {heading}
          </h2>
          
          {/* Description Paragraph */}
          <p className="text-white/90 text-[24px] leading-[44px] mb-14 capitalize max-w-[680px]">
            {description}
          </p>
          
          {/* Outlined Action Button */}
          <div className='btn-all mt-[20px] relative'>
            <a href='#' className='capitalize relative text-[22px] py-[20px] px-[64px] leading-[30px] underline decoration-[1px] text-white text-center '>call us today</a>
          </div>

        </div>
      </div>
      
    </section>
  );
};

export default AboutService;