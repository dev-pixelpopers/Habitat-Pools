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
  features?: string[];
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
    heroImage: "/images/Projects/Kimball/Kimball-4.jpg",
    overview: "Located on a hillside overlooking the valley, the Kimball project is a custom geometric pool featuring a perimeter overflow, floating stepping stones, and an integrated spa. The design emphasizes clean horizontal lines, raw concrete structures, and custom LED lighting integrated directly into the coping.",
    location: "Beverly Hills, CA",
    year: "2025",
    services: ["Pool Design & Build", "Hardscape Design", "Smart Pool Automation"],
    vision: "To design a structural body of water that acts as a natural extension of the home's mid-century modern architecture. Light, reflection, and clean geometric shapes define the landscape.",
    philosophy: "We believe that the best pool designs are those that complement the natural environment. Our approach is to create pools that are both beautiful and functional, and that will provide years of enjoyment for our clients.",
    howwedoit: "We started with a comprehensive site analysis, including grading, drainage, and solar path studies, to determine the ideal placement for the pool and patio areas. Our design phase involved 3D renderings and material.",
    gallery: [
      "/images/Projects/Kimball/Kimball-1.jpg",
      "/images/Projects/Kimball/Kimball-2.jpg",
      "/images/Projects/Kimball/Kimball-3.jpg",
    ],
    video: "/videos/Kimball/Kimball.mp4",
    videoThumbnail: "/images/Projects/Kimball/kimball-video-thumbnail.png",
    beforeImages: [
      "/images/Projects/Kimball/Kimball-5.jpg"
    ],
    afterImages: [
      "/images/Projects/Kimball/Kimball-6.jpg"
    ],
    features: [
      "Perimeter Overflow Edge",
      "Floating Concrete Stepping Stones",
      "Integrated 8-Person Spa",
      "Smart LED Color-Changing Lighting"
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
    slug: "amani",
    title: "Amani",
    subtitle: "A serene infinity pool that blends seamlessly with the natural coastal horizon.",
    category: "Landscape",
    heroImage: "/images/project-02.png",
    overview: "Overlooking the Pacific ocean, Amani was engineered to establish a vanishing horizon line. Surrounded by soft native grasses and natural stone paving, the landscape honors the quiet coastal environment.",
    location: "Malibu, CA",
    year: "2024",
    services: ["Pool Design & Build", "Landscape Design", "Softscape & Planting"],
    vision: "Erasing the boundaries between private resort and open horizon. The design prioritizes understated textures, earthy tones, and zero-edge reflection.",
    philosophy: "We believe that the best pool designs are those that complement the natural environment. Our approach is to create pools that are both beautiful and functional, and that will provide years of enjoyment for our clients.",
    howwedoit: "We began with site analysis, grading, and solar studies to plan the ideal pool layout. After 3D renderings and material selection, we engineered a custom retaining wall system and completed the build with excavation, smart automation, and lighting installation.",
    gallery: [
      "/images/project-02.png",
      "/images/project-05.png",
      "/images/features_1.png"
    ],
    video: "/videos/Kimball/Kimball.mp4",
    videoThumbnail: "/images/Projects/Kimball/kimball-video-thumbnail.png",
    beforeImages: [
      "/images/service-02.png"
    ],
    afterImages: [
      "/images/project-02.png"
    ],
    features: [
      "Vanishing Infinity Edge",
      "Imported French Limestone Decking",
      "Drought-Tolerant Native Gardens",
      "Low-Voltage Landscape Lighting"
    ],
    timeline: [
      {
        title: "Site Grading & Prep",
        description: "Clearing coastal brush and grading the oceanview slope to engineer structural zero-edge support columns.",
        image: "/images/service-01.png"
      },
      {
        title: "Hydraulics & Plumbing",
        description: "Setting up dual-stage overflow gutters and sub-grade balance tanks for the infinity edge replenishment system.",
        image: "/images/service-02.png"
      }
    ],
    testimonial: {
      name: "Marcus Sterling",
      quote: "Habitat created a space that feels like a natural part of the Malibu coastline. Standing by the edge of the pool, the water merges completely with the ocean."
    }
  },
  {
    id: "3",
    slug: "tranquil",
    title: "Tranquil",
    subtitle: "Modern geometric pool with integrated spa and soothing linear water features.",
    category: "Pool Design",
    heroImage: "/images/project-03.png",
    overview: "Built for a contemporary urban residence, Tranquil is a rectangular oasis featuring black granite plaster, custom bronze scuppers, and an adjacent sunken fire pit lounge area.",
    location: "Pasadena, CA",
    year: "2025",
    services: ["Pool Design & Build", "Hardscape Design", "Fire Feature Integration"],
    vision: "To design a quiet sanctuary shielded from the city noise. Linear water movements, dark reflective plaster, and raw fire elements create a balanced sensory experience.",
    philosophy: "We believe that the best pool designs are those that complement the natural environment. Our approach is to create pools that are both beautiful and functional, and that will provide years of enjoyment for our clients.",
    howwedoit: "We began with site analysis, grading, and solar studies to plan the ideal pool layout. After 3D renderings and material selection, we engineered a custom retaining wall system and completed the build with excavation, smart automation, and lighting installation.",
    gallery: [
      "/images/project-03.png",
      "/images/project-06.png",
      "/images/project-05.png",
    ],
    video: "/videos/Kimball/Kimball.mp4",
    videoThumbnail: "/images/Projects/Kimball/kimball-video-thumbnail.png",
    beforeImages: [
      "/images/service-03.png"
    ],
    afterImages: [
      "/images/project-03.png"
    ],
    features: [
      "Black Granite Plaster Interior",
      "Bronze Flowing Scuppers",
      "Sunken Concrete Fire Pit Lounge",
      "In-Floor Automated Cleaning System"
    ],
    testimonial: {
      name: "Sarah & David Wu",
      quote: "The sound of the bronze scuppers alone washes away the workday stress. The design blends perfectly with our modern home architecture."
    }
  },
  {
    id: "4",
    slug: "soluna",
    title: "Soluna",
    subtitle: "Resort-style backyard transformation with fire and water elements.",
    category: "Remodel",
    heroImage: "/images/project-04.png",
    overview: "A complete reconstruction of an outdated 1980s pool. We raised the floor, integrated a luxury Baja shelf, added custom linear fire pits, and rebuilt the patio with oversized concrete pavers.",
    location: "Santa Monica, CA",
    year: "2024",
    services: ["Remodel & Upgrades", "Landscape Design", "Outdoor Living Spaces"],
    vision: "To completely overhaul the property structure to maximize sun exposure, active entertainment, and fluid circulation throughout the yard.",
    philosophy: "We believe that the best pool designs are those that complement the natural environment. Our approach is to create pools that are both beautiful and functional, and that will provide years of enjoyment for our clients.",
    howwedoit: "We began with site analysis, grading, and solar studies to plan the ideal pool layout. After 3D renderings and material selection, we engineered a custom retaining wall system and completed the build with excavation, smart automation, and lighting installation.",
    gallery: [
      "/images/project-04.png",
      "/images/features_4.png",
      "/images/features_2.jpg"
    ],
    video: "/videos/Kimball/Kimball.mp4",
    videoThumbnail: "/images/Projects/Kimball/kimball-video-thumbnail.png",
    beforeImages: [
      "/images/service-03.png"
    ],
    afterImages: [
      "/images/project-04.png"
    ],
    features: [
      "Baja Sun Shelf with Umbrella Sleeves",
      "Custom Linear Gas Fire Pits",
      "Oversized Sandblasted Concrete Pavers",
      "Energy-Efficient Smart Heat Pump"
    ],
    testimonial: {
      name: "Elena Rostova",
      quote: "Our backyard went from an eyesore to the place we host every single weekend. The team did a fantastic job remodeling the old pool shell."
    }
  },
  {
    id: "5",
    slug: "orchard",
    title: "Orchard",
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
      "/images/about-img.png",
      "/images/service-01.png"
    ],
    video: "/videos/Kimball/Kimball.mp4",
    videoThumbnail: "/images/Projects/Kimball/kimball-video-thumbnail.png",
    features: [
      "Hand-Chiseled Fieldstone Coping",
      "PebbleTec Natural Pool Plaster",
      "Olive Tree Relocation & Planting",
      "Hand-Carved Stone Staircase"
    ],
    testimonial: {
      name: "Arthur Pendelton",
      quote: "Every guest thinks this pool is a restored stone basin from an old olive grove. The texture of the natural stone is exceptional."
    }
  },
  {
    id: "6",
    slug: "loller",
    title: "Loller",
    subtitle: "Contemporary pool design with smart lighting and automation.",
    category: "Pool Design",
    heroImage: "/images/project-06.png",
    overview: "A sleek pool built for a technological visionary, integrating full-flow pool filters, intelligent heating controllers, and multi-zone LED strips under the pool coping.",
    location: "Los Angeles, CA",
    year: "2024",
    services: ["Pool Design & Build", "Smart Pool Automation", "Lighting Design"],
    vision: "Seamless, minimal detailing combined with cutting-edge smart home controls for optimal operational convenience.",
    philosophy: "We believe that the best pool designs are those that complement the natural environment. Our approach is to create pools that are both beautiful and functional, and that will provide years of enjoyment for our clients.",
    howwedoit: "We began with site analysis, grading, and solar studies to plan the ideal pool layout. After 3D renderings and material selection, we engineered a custom retaining wall system and completed the build with excavation, smart automation, and lighting installation.",
    gallery: [
      "/images/project-06.png",
      "/images/features_3.jpg",
      "/images/service-02.png"
    ],
    video: "/videos/Kimball/Kimball.mp4",
    videoThumbnail: "/images/Projects/Kimball/kimball-video-thumbnail.png",
    features: [
      "IntelliFlo Variable Speed Pumps",
      "Under-Coping LED Accent Strips",
      "IntelliCenter Remote Smart Hub",
      "Sleek Concealed Safety Cover"
    ],
    testimonial: {
      name: "Chris Loller",
      quote: "I can control the entire pool, heating, and lighting from an app on my phone. The design is clean, automated, and absolutely perfect."
    }
  },
  {
    id: "7",
    slug: "oasis",
    title: "Oasis",
    subtitle: "Tropical paradise with lagoon-style pool and rock waterfalls.",
    category: "Remodel",
    heroImage: "/images/project-01.png",
    overview: "Rebuilt from a plain rectangular pool, Oasis incorporates natural boulders, custom cave features, a hidden grotto spa, and a lush layer of tropical landscaping.",
    location: "Sherman Oaks, CA",
    year: "2023",
    services: ["Remodel & Upgrades", "Landscape Design", "Spa Integration"],
    vision: "To recreate a organic, jungle-inspired water lagoon in the heart of suburban Los Angeles.",
    philosophy: "We believe that the best pool designs are those that complement the natural environment. Our approach is to create pools that are both beautiful and functional, and that will provide years of enjoyment for our clients.",
    howwedoit: "We began with site analysis, grading, and solar studies to plan the ideal pool layout. After 3D renderings and material selection, we engineered a custom retaining wall system and completed the build with excavation, smart automation, and lighting installation.",
    gallery: [
      "/images/project-01.png",
      "/images/features_1.png",
      "/images/service-03.png"
    ],
    video: "/videos/Kimball/Kimball.mp4",
    videoThumbnail: "/images/Projects/Kimball/kimball-video-thumbnail.png",
    features: [
      "Natural Fieldstone Rock Grotto",
      "Hidden Grotto Spa with Seating",
      "Custom Cave-Style Rock Slide",
      "Lush Tropical Planting Plan"
    ],
    testimonial: {
      name: "Theresa Gable",
      quote: "It feels like we stepped straight into a tropical lagoon. The rockwork is so organic and natural—we absolutely love our new backyard."
    }
  },
  {
    id: "8",
    slug: "mirage",
    title: "Mirage",
    subtitle: "Minimalist pool with vanishing edge and custom LED accents.",
    category: "Pool Design",
    heroImage: "/images/project-02.png",
    overview: "Mirage presents a ultra-modern pool design that feels like a clean plate of glass resting in the garden. Water flows over all four sides, creating a perfect mirror.",
    location: "Brentwood, CA",
    year: "2025",
    services: ["Pool Design & Build", "Hardscape Design", "Water Features"],
    vision: "Absolute minimalism. Minimal joints, zero protruding coping, and absolute stillness of the water surface.",
    philosophy: "We believe that the best pool designs are those that complement the natural environment. Our approach is to create pools that are both beautiful and functional, and that will provide years of enjoyment for our clients.",
    howwedoit: "We began with site analysis, grading, and solar studies to plan the ideal pool layout. After 3D renderings and material selection, we engineered a custom retaining wall system and completed the build with excavation, smart automation, and lighting installation.",
    gallery: [
      "/images/project-02.png",
      "/images/features_3.jpg",
      "/images/project-05.png"
    ],
    video: "/videos/Kimball/Kimball.mp4",
    videoThumbnail: "/images/Projects/Kimball/kimball-video-thumbnail.png",
    features: [
      "Four-Sided Slot Overflow Gutters",
      "Extra-Fine Gray Quartz Finish",
      "Invisible Skimmer Technology",
      "Integrated Linear Spa Chamber"
    ],
    testimonial: {
      name: "Julian Brooks",
      quote: "The pool looks like a perfectly flat sheet of glass. It is the absolute centerpiece of our modern architectural landscape."
    }
  },
  {
    id: "9",
    slug: "zenith",
    title: "Zenith",
    subtitle: "Complete outdoor living space with pool, kitchen & lounge.",
    category: "Landscape",
    heroImage: "/images/project-03.png",
    overview: "A comprehensive project including a dark plaster lap pool, a fully equipped concrete outdoor kitchen, built-in teak wood benches, and custom concrete pathway steps.",
    location: "Encino, CA",
    year: "2025",
    services: ["Pool Design & Build", "Landscape Design", "Outdoor Kitchens"],
    vision: "To design a multi-zone outdoor entertainment zone that feels unified in its architectural language, material palette, and scale.",
    philosophy: "We believe that the best pool designs are those that complement the natural environment. Our approach is to create pools that are both beautiful and functional, and that will provide years of enjoyment for our clients.",
    howwedoit: "We began with site analysis, grading, and solar studies to plan the ideal pool layout. After 3D renderings and material selection, we engineered a custom retaining wall system and completed the build with excavation, smart automation, and lighting installation.",
    gallery: [
      "/images/project-03.png",
      "/images/features_4.png",
      "/images/features_2.jpg"
    ],
    video: "/videos/Kimball/Kimball.mp4",
    videoThumbnail: "/images/Projects/Kimball/kimball-video-thumbnail.png",
    features: [
      "Architectural Raw Concrete Outdoor Kitchen",
      "Polished Teak Wood Bench Lounge",
      "Dark Plaster 50-Foot Lap Pool",
      "Floating Concrete Path Paving"
    ],
    testimonial: {
      name: "Sarah & Robert K.",
      quote: "Habitat designed the entire backyard as one cohesive living space. We spend more time in our outdoor lounge than we do inside our house."
    }
  }
];

export function getProjectBySlug(slug: string): Project | undefined {
  return allProjects.find((p) => p.slug === slug);
}
