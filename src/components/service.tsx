import React from 'react';

// --- Types ---
interface SectionProps {
  id: string | number;
  title: string;
  description: string;
  buttonText: string;
  imageSrc: string;
}

// --- Reusable Sticky Section Component ---
const StickySection: React.FC<{ data: SectionProps }> = ({ data }) => {
  return (
    // 'sticky top-0' is section ko uper fix kar dega jab yeh viewport ke top par pohnchega
    // 'h-screen' ensures har section pori screen gheray
    <div className="sticky top-0 w-full h-screen rounded-t-[2.5rem] overflow-hidden flex shadow-[0_-10px_30px_rgba(0,0,0,0.1)]">
      
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={data.imageSrc}
          alt={data.title}
          className="w-full h-full object-cover"
        />
        {/* Dark overlay taake white text wazeh nazar aaye */}
        {/* <div className="absolute inset-0 bg-black/30"></div>  */}
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full px-[95px] py-[200px] flex gap-10">
        
        {/* Left Column: Main Title */}
        <div className="flex w-[65%] pt-[60px]">
          <h2 className="text-white text-[66px] leading-[62px] tracking-tight capitalize">
            {data.title}
          </h2>
        </div>

        {/* Right Column: Description & Action */}
        <div className="flex flex-col w-[35%]">
          <p className="text-white text-[24px] leading-[36px] font-normal">
            {data.description}
          </p>
          
          {/* Outlined Button */}
            <div className='btn-all mt-[30px] relative'>
            <a href='#' className='capitalize relative text-[22px] py-[20px] px-[64px] leading-[30px] underline decoration-[1px] text-white text-center '>book a services </a>
          </div>
        </div>

      </div>
    </div>
  );
};

// --- Main Container (Jismein 3 sections render honge) ---
export const StickyServicesContainer: React.FC = () => {
  
  // Aapke 3 sections ka data
  const sectionsData: SectionProps[] = [
    {
      id: 1,
      title: "Pool Design & Build",
      description: "Custom Pools Designed Around Your Space, Your Lifestyle, And Your Vision—Built With Precision And Long-Term Durability In Mind.",
      buttonText: "Book A Services",
      imageSrc: "/images/service-01.png", // Add your own image URL
    },
    {
      id: 2,
      title: "Landscape Design",
      description: "From clean, modern layouts to fully integrated outdoor environments, we create spaces that feel cohesive and elevated.",
      buttonText: "Book A Services",
      imageSrc: "/images/service-02.png", 
    },
    {
      id: 3,
      title: "Remodel & Upgrades",
      description: "Transform outdated pools and outdoor areas into refined, high-end spaces that match today’s standards.",
      buttonText: "Book A Services",
      imageSrc: "/images/service-03.png", 
    }
  ];

  return (
    // Parent div mein overflow nahi hona chahiye warna sticky toot jayega
    <div className="relative w-full bg-white"> 
      {sectionsData.map((section) => (
        <StickySection key={section.id} data={section} />
      ))}
    </div>
  );
};

export default StickyServicesContainer;