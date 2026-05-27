import React from "react";

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
    width="26"
    height="26"
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
    <div className="relative flex flex-col p-6 bg-white border border-gray rounded-[2rem] shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:bg-[#112931] transition-all duration-300 group">
      {/* Top Right Action Button */}
      <div className="bg-[#122126] text-white p-6 rounded-full cursor-pointer group-hover:bg-white group-hover:text-[#112931] transition-colors duration-300 z-10 max-w-[75px] ml-auto my-auto flex items-center justify-center">
        <ArrowUpRightIcon />
      </div>

      {/* Project Title */}
      <h3 className="mt-2 mb-5 text-[61px] text-[#112931] group-hover:text-white transition-colors duration-300 text-center tracking-tight">
        {project.title}
      </h3>

      {/* Project Image */}
      <div className="w-full aspect-[4/3] mb-6 overflow-hidden rounded-[1.5rem] rotate-[-4deg]">
        <img
          src={project.imageSrc}
          alt={`Preview of ${project.title} project`}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
        />
      </div>

      {/* Project Description */}
      <p className="text-[20px] text-[#112931] group-hover:text-white transition-colors duration-300 text-center leading-relaxed px-4 mt-[50px]">
        {project.description}
      </p>
    </div>
  );
};

// --- Main Component ---

export const ProjectsSection: React.FC = () => {
  // Sample data to match the design

  const defaultDescription =
    "Custom Pools Designed Around Your Space, Your Lifestyle, And Your Vision";

  const projects: Project[] = [
    {
      id: "1",
      title: "Luminara",
      imageSrc: "/images/project-01.png",
      description: defaultDescription,
    },
    {
      id: "2",
      title: "Amani",
      imageSrc: "/images/project-02.png",
      description: defaultDescription,
    },
    {
      id: "3",
      title: "Tranquil",
      imageSrc: "/images/project-03.png",
      description: defaultDescription,
    },
    {
      id: "4",
      title: "Soluna",
      imageSrc: "/images/project-04.png",
      description: defaultDescription,
    },
    {
      id: "5",
      title: "Orchard",
      imageSrc: "/images/project-05.png",
      description: defaultDescription,
    },
    {
      id: "6",
      title: "Loller",
      imageSrc: "/images/project-06.png",
      description: defaultDescription,
    },
  ];

  return (
    <section className="w-full min-h-screen py-24 px-[85px] bg-white flex flex-col items-center rounded-t-[20px]">
      <div className="w-full">
        {/* Header Section */}
        <div className="relative w-full flex justify-center items-center mb-16">
          <span className="absolute left-0 text-[#86A3AC] text-[36px] hidden md:block">
            Projects
          </span>

          <h2 className="text-[96px] leading-[88px] text-[#112931]">
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
          <div className="btn-all mt-[40px] relative btn-dark">
            <a
              href="#"
              className="capitalize relative text-[22px] py-[20px] px-[64px] leading-[30px] underline decoration-[1px] text-[#112931] text-center "
            >
              load more projects
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
