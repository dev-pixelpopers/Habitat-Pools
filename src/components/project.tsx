import React from 'react';

// --- Types ---
interface Project {
  id: string;
  title: string;
  imageSrc: string;
  description: string;
}

// --- Icons ---
const ArrowUpRightIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M7 17L17 7" />
    <path d="M7 7h10v10" />
  </svg>
);

// --- Sub-components ---
const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <div className="relative flex flex-col p-6 bg-white border border-gray-100 rounded-[2rem] shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300 group">
      
      {/* Top Right Action Button */}
      <div className="absolute top-5 right-5 bg-[#122126] text-white p-2.5 rounded-full cursor-pointer hover:bg-black transition-colors z-10">
        <ArrowUpRightIcon />
      </div>

      {/* Project Title */}
      <h3 className="mt-2 mb-5 text-3xl font-medium text-[#122126] text-center tracking-tight">
        {project.title}
      </h3>

      {/* Project Image */}
      <div className="w-full aspect-[4/3] mb-6 overflow-hidden rounded-[1.5rem]">
        <img
          src={project.imageSrc}
          alt={`Preview of ${project.title} project`}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
        />
      </div>

      {/* Project Description */}
      <p className="text-[11px] sm:text-xs text-[#5a6a6d] text-center leading-relaxed px-4 mx-auto max-w-[280px]">
        {project.description}
      </p>
    </div>
  );
};

// --- Main Component ---
export const ProjectsSection: React.FC = () => {
  // Sample data to match the design
  const defaultDescription = "Custom Pools Designed Around Your Space, Your Lifestyle, And Your Vision";
  
  const projects: Project[] = [
    { id: '1', title: 'Luminara', imageSrc: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=800&auto=format&fit=crop', description: defaultDescription },
    { id: '2', title: 'Amani', imageSrc: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=800&auto=format&fit=crop', description: defaultDescription },
    { id: '3', title: 'Tranquil', imageSrc: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop', description: defaultDescription },
    { id: '4', title: 'Soluna', imageSrc: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=800&auto=format&fit=crop', description: defaultDescription },
    { id: '5', title: 'Orchard', imageSrc: 'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=800&auto=format&fit=crop', description: defaultDescription },
    { id: '6', title: 'Loller', imageSrc: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop', description: defaultDescription },
  ];

  return (
    <section className="w-full min-h-screen py-24 px-6 sm:px-12 lg:px-20 bg-white flex flex-col items-center font-sans">
      <div className="w-full max-w-[1400px]">
        
        {/* Header Section */}
        <div className="relative w-full flex justify-center items-center mb-16">
          <span className="absolute left-0 text-[#8ba0a4] font-medium tracking-wide text-lg hidden md:block">
            Projects
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-[4rem] font-medium text-[#122126] tracking-tight">
            Explore Our Work
          </h2>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Call To Action / Load More */}
        <div className="flex justify-center">
          <button className="px-8 py-3.5 border border-gray-300 text-[#122126] text-sm font-medium tracking-wide hover:border-[#122126] hover:bg-gray-50 transition-all duration-300">
            Load More Projects
          </button>
        </div>
        
      </div>
    </section>
  );
};

export default ProjectsSection;