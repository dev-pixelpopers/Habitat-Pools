export interface ProjectFeature {
  label: string;
  image: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  heroImage: string;
  overview: string;
  location: string;
  year: string;
  services: string[];
  vision: string;
  philosophy: string;
  howwedoit: string;
  gallery: string[];
  video?: string;
  videoThumbnail?: string;
  beforeImages?: string[];
  afterImages?: string[];
  features?: ProjectFeature[];
  crafts?: string[];
  timeline?: {
    title: string;
    description: string;
    image?: string;
  }[];
  testimonial?: {
    name: string;
    quote: string;
  };
}

export const allProjects: Project[] = [
  {
    id: "1",
    slug: "Kimball",
    title: "Kimball",
    subtitle: "A modern architectural marvel blending light, water, and geometric concrete styling.",
    category: "Pool Design",
    heroImage: "/images/Projects/Kimball/Kimball-25.jpg",
    overview: "Located on a hillside overlooking the valley, the Kimball project is a custom geometric pool featuring a perimeter overflow, floating stepping stones, and an integrated spa. The design emphasizes clean horizontal lines, raw concrete structures, and custom LED lighting integrated directly into the coping.",
    location: "Beverly Hills, CA",
    year: "2025",
    services: ["Pool Design & Build", "Hardscape Design", "Smart Pool Automation"],
    vision: "To design a structural body of water that acts as a natural extension of the home's mid-century modern architecture. Light, reflection, and clean geometric shapes define the landscape.",
    philosophy: "We believe that the best pool designs are those that complement the natural environment. Our approach is to create pools that are both beautiful and functional, and that will provide years of enjoyment for our clients.",
    howwedoit: "We started with a comprehensive site analysis, including grading, drainage, and solar path studies, to determine the ideal placement for the pool and patio areas. Our design phase involved 3D renderings and material.",
    gallery: [
      "/images/Projects/Kimball/Kimball-1.jpg",
      "/images/Projects/Kimball/Kimball-3.jpg",
      "/images/Projects/Kimball/Kimball-11.jpg",
      "/images/Projects/Kimball/Kimball-12.jpg",
      "/images/Projects/Kimball/Kimball-13.jpg",
      "/images/Projects/Kimball/Kimball-14.jpg",
      "/images/Projects/Kimball/Kimball-16.jpg",
      "/images/Projects/Kimball/Kimball-17.jpg",
      "/images/Projects/Kimball/Kimball-19.jpg",
      "/images/Projects/Kimball/Kimball-20.jpg",
      "/images/Projects/Kimball/Kimball-21.jpg",
      "/images/Projects/Kimball/Kimball-22.jpg",
      "/images/Projects/Kimball/Kimball-25.jpg",
    ],
    video: "/videos/Projects/Kimball/Kimball.webm",
    videoThumbnail: "/images/Projects/Kimball/kimball-video-thumbnail.png",
    beforeImages: [
      "/images/Projects/Kimball/before.webp"
    ],
    afterImages: [
      "/images/Projects/Kimball/after.webp"
    ],
    features: [
      {
        label: "Perimeter Overflow Edge",
        image: "/images/Projects/Kimball/Kimball-22.jpg",
      },
      {
        label: "Floating Concrete Stepping Stones",
        image: "/images/Projects/Kimball/Kimball-14.jpg",
      },
      {
        label: "Integrated 8-Person Spa",
        image: "/images/Projects/Kimball/Kimball-20.jpg",
      },
      {
        label: "Smart LED Color-Changing Lighting",
        image: "/images/Projects/Kimball/Kimball-12.jpg",
      },
    ],
    crafts: [
      "Perimeter Overflow Edge",
      "Floating Concrete Stepping Stones",
      "Integrated 8-Person Spa",
      "Smart LED Color-Changing Lighting",
    ],
    timeline: [
      {
        title: "Excavation & Shoring",
        description: "Digging and shoring on a steep hillside slope, installing 15 structural concrete piles for foundation stability.",
        image: "/images/Projects/Kimball/Kimball-7.jpg"
      },
      {
        title: "Steel Reinforcement & Plumbing",
        description: "Installing double-grid steel rebar cages and high-flow plumbing lines for the smart filtration system.",
        image: "/images/Projects/Kimball/Kimball-8.jpg"
      },
      {
        title: "Shotcrete & Tiling",
        description: "Pneumatically applying shotcrete shell followed by meticulous hand-laying of custom glass mosaic tiles.",
        image: "/images/Projects/Kimball/Kimball-9.jpg"
      }
    ],
    testimonial: {
      name: "Elizabeth Vance",
      quote: "The Kimball pool is an absolute masterpiece. Every single night, the lighting transforms our backyard into a living piece of modern art. The craftsmanship is flawless."
    }
  },
  {
    id: "2",
    slug: "melissa-dinan",
    title: "Melissa Dinan",
    subtitle: "A serene infinity pool that blends seamlessly with the natural coastal horizon.",
    category: "Landscape",
    heroImage: "/images/Projects/Melissa-Dinan/melissa-dinan-01.jpg",
    overview: "Overlooking the Pacific ocean, Melissa Dinan was engineered to establish a vanishing horizon line. Surrounded by soft native grasses and natural stone paving, the landscape honors the quiet coastal environment.",
    location: "Malibu, CA",
    year: "2024",
    services: ["Pool Design & Build", "Landscape Design", "Softscape & Planting"],
    vision: "Erasing the boundaries between private resort and open horizon. The design prioritizes understated textures, earthy tones, and zero-edge reflection.",
    philosophy: "We believe that the best pool designs are those that complement the natural environment. Our approach is to create pools that are both beautiful and functional, and that will provide years of enjoyment for our clients.",
    howwedoit: "We began with site analysis, grading, and solar studies to plan the ideal pool layout. After 3D renderings and material selection, we engineered a custom retaining wall system and completed the build with excavation, smart automation, and lighting installation.",
    gallery: [
      "/images/Projects/Melissa-Dinan/melissa-dinan-01.jpg",
      "/images/Projects/Melissa-Dinan/melissa-dinan-04.jpg",
      "/images/Projects/Melissa-Dinan/melissa-dinan-03.jpg",
      "/images/Projects/Melissa-Dinan/melissa-dinan-02.jpg",
      "/images/Projects/Melissa-Dinan/melissa-dinan-08.jpg",
      "/images/Projects/Melissa-Dinan/melissa-dinan-10.jpg",
      "/images/Projects/Melissa-Dinan/melissa-dinan-05.jpg",
      "/images/Projects/Melissa-Dinan/melissa-dinan-06.jpg",
      "/images/Projects/Melissa-Dinan/melissa-dinan-07.jpg",
      "/images/Projects/Melissa-Dinan/melissa-dinan-09.jpg"
    ],
    video: "/videos/Projects/Melissa-Dinan/melissa-dinan-vid-01.webm",
    videoThumbnail: "/images/Projects/Kimball/kimball-video-thumbnail.png",
    beforeImages: [
      "/images/Projects/Melissa-Dinan/melissa-dinan-04.jpg"
    ],
    afterImages: [
      "/images/Projects/Melissa-Dinan/melissa-dinan-05.jpg"
    ],
    features: [
      {
        label: "Vanishing Infinity Edge",
        image: "/images/Projects/Melissa-Dinan/melissa-dinan-01.jpg",
      },
      {
        label: "Imported French Limestone Decking",
        image: "/images/Projects/Melissa-Dinan/melissa-dinan-04.jpg",
      },
      {
        label: "Drought-Tolerant Native Gardens",
        image: "/images/Projects/Melissa-Dinan/melissa-dinan-03.jpg",
      },
      {
        label: "Low-Voltage Landscape Lighting",
        image: "/images/Projects/Melissa-Dinan/melissa-dinan-02.jpg",
      },
    ],
    crafts: [
      "Vanishing Infinity Edge",
      "Imported French Limestone Decking",
      "Drought-Tolerant Native Gardens",
      "Low-Voltage Landscape Lighting",
    ],
    timeline: [
      {
        title: "Site Grading & Prep",
        description: "Clearing coastal brush and grading the oceanview slope to engineer structural zero-edge support columns.",
        image: "/images/Projects/Melissa-Dinan/melissa-dinan-06.jpg"
      },
      {
        title: "Hydraulics & Plumbing",
        description: "Setting up dual-stage overflow gutters and sub-grade balance tanks for the infinity edge replenishment system.",
        image: "/images/Projects/Melissa-Dinan/melissa-dinan-07.jpg"
      }
    ],
    testimonial: {
      name: "Marcus Sterling",
      quote: "Habitat created a space that feels like a natural part of the Malibu coastline. Standing by the edge of the pool, the water merges completely with the ocean."
    }
  },
  {
    id: "3",
    slug: "parkview-media",
    title: "Parkview Media",
    subtitle: "Modern geometric pool with integrated spa and soothing linear water features.",
    category: "Pool Design",
    heroImage: "/images/Projects/Parkview-Media/parkview-media-31.jpg",
    overview: "Built for a contemporary urban residence, Parkview Media is a rectangular oasis featuring black granite plaster, custom bronze scuppers, and an adjacent sunken fire pit lounge area.",
    location: "Pasadena, CA",
    year: "2025",
    services: ["Pool Design & Build", "Hardscape Design", "Fire Feature Integration"],
    vision: "To design a quiet sanctuary shielded from the city noise. Linear water movements, dark reflective plaster, and raw fire elements create a balanced sensory experience.",
    philosophy: "We believe that the best pool designs are those that complement the natural environment. Our approach is to create pools that are both beautiful and functional, and that will provide years of enjoyment for our clients.",
    howwedoit: "We began with site analysis, grading, and solar studies to plan the ideal pool layout. After 3D renderings and material selection, we engineered a custom retaining wall system and completed the build with excavation, smart automation, and lighting installation.",
    gallery: [
      "/images/Projects/Parkview-Media/parkview-media-1.jpg",
      "/images/Projects/Parkview-Media/parkview-media-2.jpg",
      "/images/Projects/Parkview-Media/parkview-media-3.jpg",
      "/images/Projects/Parkview-Media/parkview-media-4.jpg",
      "/images/Projects/Parkview-Media/parkview-media-5.jpg",
      "/images/Projects/Parkview-Media/parkview-media-7.jpg",
      "/images/Projects/Parkview-Media/parkview-media-8.jpg",
      "/images/Projects/Parkview-Media/parkview-media-9.jpg",
      "/images/Projects/Parkview-Media/parkview-media-10.jpg",
      "/images/Projects/Parkview-Media/parkview-media-13.jpg",
      "/images/Projects/Parkview-Media/parkview-media-14.jpg",
      "/images/Projects/Parkview-Media/parkview-media-15.jpg",
      "/images/Projects/Parkview-Media/parkview-media-17.jpg",
      "/images/Projects/Parkview-Media/parkview-media-19.jpg",
      "/images/Projects/Parkview-Media/parkview-media-20.jpg",
      "/images/Projects/Parkview-Media/parkview-media-21.jpg",
      "/images/Projects/Parkview-Media/parkview-media-22.jpg",
      "/images/Projects/Parkview-Media/parkview-media-23.jpg",
      "/images/Projects/Parkview-Media/parkview-media-24.jpg",
      "/images/Projects/Parkview-Media/parkview-media-25.jpg",
      "/images/Projects/Parkview-Media/parkview-media-26.jpg",
      "/images/Projects/Parkview-Media/parkview-media-27.jpg",
      "/images/Projects/Parkview-Media/parkview-media-28.jpg",
  
    ],
    video: "/videos/Projects/Park-Media/parkview-vid-01.webm",
    videoThumbnail: "/images/Projects/Kimball/kimball-video-thumbnail.png",
    beforeImages: [
      "/images/Projects/Parkview-Media/before.jpg"
    ],
    afterImages: [
      "/images/Projects/Parkview-Media/parkview-media-30.jpg"
    ],
    features: [
      {
        label: "Black Granite Plaster Interior",
        image: "/images/Projects/Parkview-Media/parkview-media-1.jpg",
      },
      {
        label: "Bronze Flowing Scuppers",
        image: "/images/Projects/Parkview-Media/parkview-media-2.jpg",
      },
      {
        label: "Sunken Concrete Fire Pit Lounge",
        image: "/images/Projects/Parkview-Media/parkview-media-3.jpg",
      },
      {
        label: "In-Floor Automated Cleaning System",
        image: "/images/Projects/Parkview-Media/parkview-media-4.jpg",
      },
    ],
    crafts: [
      "Black Granite Plaster Interior",
      "Bronze Flowing Scuppers",
      "Sunken Concrete Fire Pit Lounge",
      "In-Floor Automated Cleaning System",
    ],
    timeline: [
      {
        title: "Site Grading & Prep",
        description: "Clearing coastal brush and grading the oceanview slope to engineer structural zero-edge support columns.",
        image: "/images/Projects/Melissa-Dinan/melissa-dinan-06.jpg"
      },
      {
        title: "Hydraulics & Plumbing",
        description: "Setting up dual-stage overflow gutters and sub-grade balance tanks for the infinity edge replenishment system.",
        image: "/images/Projects/Melissa-Dinan/melissa-dinan-07.jpg"
      }
    ],
    testimonial: {
      name: "Sarah & David Wu",
      quote: "The sound of the bronze scuppers alone washes away the workday stress. The design blends perfectly with our modern home architecture."
    }
  },
  {
    id: "4",
    slug: "vidlak",
    title: "Vidlak",
    subtitle: "Resort-style backyard transformation with fire and water elements.",
    category: "Remodel",
    heroImage: "/images/Projects/Vidlak/project-01.jpg",
    overview: "A complete reconstruction of an outdated 1980s pool. We raised the floor, integrated a luxury Baja shelf, added custom linear fire pits, and rebuilt the patio with oversized concrete pavers.",
    location: "Santa Monica, CA",
    year: "2024",
    services: ["Remodel & Upgrades", "Landscape Design", "Outdoor Living Spaces"],
    vision: "To completely overhaul the property structure to maximize sun exposure, active entertainment, and fluid circulation throughout the yard.",
    philosophy: "We believe that the best pool designs are those that complement the natural environment. Our approach is to create pools that are both beautiful and functional, and that will provide years of enjoyment for our clients.",
    howwedoit: "We began with site analysis, grading, and solar studies to plan the ideal pool layout. After 3D renderings and material selection, we engineered a custom retaining wall system and completed the build with excavation, smart automation, and lighting installation.",
    gallery: [
      "/images/Projects/Vidlak/project-01.jpg",
      "/images/Projects/Vidlak/project-02.jpg",
      "/images/Projects/Vidlak/project-03.jpg",
      "/images/Projects/Vidlak/project-04.jpg",
      "/images/Projects/Vidlak/project-05.jpg",
      "/images/Projects/Vidlak/project-06.jpg",
      "/images/Projects/Vidlak/project-07.jpg",
      "/images/Projects/Vidlak/project-08.jpg",
      "/images/Projects/Vidlak/project-09.jpg",
      "/images/Projects/Vidlak/project-10.jpg",
      "/images/Projects/Vidlak/project-11.jpg",
      "/images/Projects/Vidlak/project-12.jpg",      
    ],
    video: "/videos/Projects/Vidlak/vidlak-vid-01.webm",
    videoThumbnail: "/images/Projects/Kimball/kimball-video-thumbnail.png",
    beforeImages: [
      "/images/Projects/Vidlak/project-01.jpg"
    ],
    afterImages: [
      "/images/Projects/Vidlak/project-02.jpg"
    ],
    features: [
      {
        label: "Baja Sun Shelf with Umbrella Sleeves",
        image: "/images/Projects/Vidlak/project-01.jpg",
      },
      {
        label: "Custom Linear Gas Fire Pits",
        image: "/images/Projects/Vidlak/project-02.jpg",
      },
      {
        label: "Oversized Sandblasted Concrete Pavers",
        image: "/images/Projects/Vidlak/project-03.jpg",
      },
      {
        label: "Energy-Efficient Smart Heat Pump",
        image: "/images/Projects/Vidlak/project-04.jpg",
      },
    ],
    crafts: [
      "Baja Sun Shelf with Umbrella Sleeves",
      "Custom Linear Gas Fire Pits",
      "Oversized Sandblasted Concrete Pavers",
      "Energy-Efficient Smart Heat Pump",
    ],
    timeline: [
      {
        title: "Site Grading & Prep",
        description: "Clearing coastal brush and grading the oceanview slope to engineer structural zero-edge support columns.",
        image: "/images/Projects/Melissa-Dinan/melissa-dinan-06.jpg"
      },
      {
        title: "Hydraulics & Plumbing",
        description: "Setting up dual-stage overflow gutters and sub-grade balance tanks for the infinity edge replenishment system.",
        image: "/images/Projects/Melissa-Dinan/melissa-dinan-07.jpg"
      }
    ],
    testimonial: {
      name: "Elena Rostova",
      quote: "Our backyard went from an eyesore to the place we host every single weekend. The team did a fantastic job remodeling the old pool shell."
    }
  },
  {
    id: "5",
    slug: "blue-sage",
    title: "Blue Sage",
    subtitle: "Elegant garden pool with natural stone and lush surrounding landscaping.",
    category: "Landscape",
    heroImage: "/images/project-05.png",
    overview: "Tucked inside a mature olive orchard, this pool design features custom fieldstone coping and hand-carved stone stairs, creating a rustic European estate aesthetic.",
    location: "Ojai, CA",
    year: "2025",
    services: ["Landscape Design", "Pool Design & Build", "Softscape & Planting"],
    vision: "Establishing a rustic pool deck that feels like it has been part of the orchard grounds for generations.",
    philosophy: "We believe that the best pool designs are those that complement the natural environment. Our approach is to create pools that are both beautiful and functional, and that will provide years of enjoyment for our clients.",
    howwedoit: "We began with site analysis, grading, and solar studies to plan the ideal pool layout. After 3D renderings and material selection, we engineered a custom retaining wall system and completed the build with excavation, smart automation, and lighting installation.",
    gallery: [
      "/images/project-05.png",
      "/images/about-img.jpg",
      "/images/service-01.png"
    ],
    video: "/videos/Projects/Kimball/Kimball.webm",
    videoThumbnail: "/images/Projects/Kimball/kimball-video-thumbnail.png",
    features: [
      {
        label: "Hand-Chiseled Fieldstone Coping",
        image: "/images/project-05.png",
      },
      {
        label: "PebbleTec Natural Pool Plaster",
        image: "/images/about-img.jpg",
      },
      {
        label: "Olive Tree Relocation & Planting",
        image: "/images/service-01.png",
      },
      {
        label: "Hand-Carved Stone Staircase",
        image: "/images/project-05.png",
      },
    ],
    crafts: [
      "Hand-Chiseled Fieldstone Coping",
      "PebbleTec Natural Pool Plaster",
      "Olive Tree Relocation & Planting",
      "Hand-Carved Stone Staircase",
    ],
    timeline: [
      {
        title: "Site Grading & Prep",
        description: "Clearing coastal brush and grading the oceanview slope to engineer structural zero-edge support columns.",
        image: "/images/Projects/Melissa-Dinan/melissa-dinan-06.jpg"
      },
      {
        title: "Hydraulics & Plumbing",
        description: "Setting up dual-stage overflow gutters and sub-grade balance tanks for the infinity edge replenishment system.",
        image: "/images/Projects/Melissa-Dinan/melissa-dinan-07.jpg"
      }
    ],
    testimonial: {
      name: "Arthur Pendelton",
      quote: "Every guest thinks this pool is a restored stone basin from an old olive grove. The texture of the natural stone is exceptional."
    }
  }
];

export function getProjectBySlug(slug: string): Project | undefined {
  return allProjects.find((p) => p.slug === slug);
}
