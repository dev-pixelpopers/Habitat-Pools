import React from 'react';

interface AboutSectionProps {
  imageSrc?: string;
  tagline?: string;
  headingLines?: string[];
  description?: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  imageSrc = '/images/about-img.png', // Set to your attached image path
  tagline = 'Who We Are',
  headingLines = ['From Ordinary To', 'Extraordinary', 'Outdoors'],
  description = 'Experience A Level Of Craftsmanship Where The People You Meet Are The Ones Who Build Your Project. No Handoffs. No Layers. Just Direct Involvement, Every Step Of The Way',
  buttonText = 'Call Us Today',
  onButtonClick,
}) => {
  return (
    <section className="pt-[200px] pb-[100px] px-[130px] bg-[#112931]">
      
      {/* First Row */}
      <div className="mb-[-185px] z-2 relative ml-[150px]">
        <h2 className="text-white text-[96px] leading-[88px] max-w-[750px] m-auto">
          From Ordinary to Extraordinary Outdoors
        </h2>
      </div>

      {/* Second Row */}
      <div className="flex gap-[40px]">

        {/* First Column */}
        <div className='w-[20%] pt-[20px]'>
          <h4 className="text-[#86A3AC] text-[36px] leading-[38px] capitalize">
            who we are
          </h4>
        </div>

        {/* Second Column */}
        <div className="flex justify-center className='w-[42%]'">
          <img
            src="/images/about-img.png"
            alt="About"
            className="w-full rounded-[20px]"
          />
        </div>

        {/* Third Column */}
        <div className='w-[38%] pl-[60px] flex flex-col justify-center'>
          <p className="text-white text-[26px] leading-[48px] capitalize">
            Experience a level of craftsmanship where the people you meet are the ones who build your project. No handoffs. No layers. Just direct involvement, every step of the way
          </p>
          <div className='btn-all'>
            <a href='#' className='capitalize text-[22px]'>call us today</a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;