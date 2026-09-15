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
  scope: string;
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
  crafts?: { heading: string; para: string; }[];
  timeline?: {
    title: string;
    description: string;
    media?: string;
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
    title: "The Kimball",
    subtitle: "A dated backyard with a free-form pool and plain concrete patio was reimagined into a sleek, architectural outdoor space — a geometric pool with a raised water wall and spillover spa, a cantilevered shade structure, a sunken fire feature, and a stone outdoor kitchen.",
    category: "Complete Pool & Backyard Remodel",
    heroImage: "/images/Projects/Kimball/Kimball-25.jpg",
    overview: "This backyard already had a pool, but it wasn't working for the homeowners anymore: a free-form shape, a small rock waterfall, a plain covered patio, and a basic grass-and-gravel yard. We demoed all of it — pool, patio, and landscaping — and rebuilt the space around clean geometry and warm materials: a linear pool with an attached spillover spa, a three-spout water wall, a cantilevered black aluminum shade structure with a wood ceiling, a sunken fire feature that extends out over the water, and a stone outdoor kitchen with bar seating. Light Limestone decking and layered desert landscaping tie it all together.",
    location: "Beverly Hills, CA",
    scope: "Full pool and backyard remodel — existing pool, patio, and landscaping demoed and rebuilt",
    year: "2025",
    services: ["Full demo of the existing pool, patio, and landscaping", "Geometric in-ground pool with an attached spillover spa", "Raised water wall with wall scuppers","Cantilevered aluminum-and-wood shade structure","Sunken, cantilevered fire feature","Limestone paver patio and pool decking","Turf accent inset and desert landscaping (columnar hedges, agave, gravel beds)","Landscape and pool lighting"],
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
        label: "Raised Water Wall",
        image: "/images/Projects/Kimball/Kimball-22.jpg",
      },
      {
        label: "Sunken Fire Feature",
        image: "/images/Projects/Kimball/Kimball-14.jpg",
      },
      {
        label: "Spillover Spa",
        image: "/images/Projects/Kimball/Kimball-20.jpg",
      },
      {
        label: "Landscape & Pool Lighting",
        image: "/images/Projects/Kimball/Kimball-12.jpg",
      },
    ],
    crafts: [
      {
        heading: "A Pool Reshaped",
        para: " The old free-form pool gave way to a clean, rectilinear design with a spillover spa tucked into one corner — sharing the same water plane so the two feel like one continuous feature rather than a bolt-on spa."
      },  
      {
        heading: "Water Wall",
        para: "A raised bench wall with three wall scuppers spills into the pool, adding movement and sound along one full side of the yard."
      },
      {
        heading: "A Fire Feature That Meets the Water",
        para: "A cantilevered stone slab extends out over the pool to hold a linear fire table, putting the fire feature almost within reach of the water — one of the most striking details in the yard."
      },
      {
        heading: "Cantilevered Shade Structure",
        para: "A black aluminum pergola with a tongue-and-groove wood ceiling floats above the lounge area on a single-sided support, giving the patio a modern, architectural anchor instead of a standard post-and-beam cover."
      },
      {
        heading: "Stone Outdoor Kitchen",
        para: "A waterfall-edge stone counter with woven bar stools sits just off the pool deck, with a turf accent rug underfoot for a softer touch against all the hardscape."
      }
    ],
    timeline: [
      {
        title: "Demo",
        description: "Removed the existing pool, patio, and landscaping completely.",
        media: "/images/Projects/Kimball/demo.jpg"
      },
      {
        title: "Pool & Water Features",
        description: "Built the new pool and spillover spa, the water wall, and the cantilevered fire feature.",
        media: "/images/Projects/Kimball/Kimball-11.jpg"
      },
      {
        title: "Structures & Hardscape",
        description: "Installed the shade structure, outdoor kitchen, and Limestone decking throughout.",
        media: "/images/Projects/Kimball/Kimball-3.jpg"
      },
      {
        title: "Landscaping & Lighting",
        description: "Added desert plantings, turf accents, and layered landscape and pool lighting.",
        media: "/images/Projects/Kimball/Kimball-9.jpg"
      }
    ],
    testimonial: {
      name: "Jordyn Matthews",
      quote: "We just wrapped up working with Carter and Colby from Habitat Pools on our dream backyard, and we honestly couldn't be happier with how it turned out. We are absolutely in love with our new pool and backyard! The entire process was so easy thanks to their experience and incredible eye for design. From the pool layout and plant selection to the tile choices, shade structures, appliances, and lighting, they guided us through every decision without making it feel overwhelming. We wanted a backyard that was both functional (somewhere we could actually spend time, even during the Arizona summer) and beautiful, and they absolutely nailed it. What we appreciated most was that they always kept our budget in mind. They genuinely wanted us to end up with a backyard we'd love, at a price we could afford. If you're looking for a company that creates truly high-end, luxurious outdoor spaces while making the entire process enjoyable, give Habitat Pools a call. Creating incredible backyards is what they do best, and it definitely shows."
    }
  },
  {
    id: "2",
    slug: "dinan",
    title: "The Dinan",
    subtitle: "A bold, one-of-a-kind backyard built around a striking black-and-white design language — a linear pool with a checkerboard sun shelf, a raised striped-tile spa framed by a Moroccan-style arched wall, and a checkerboard travertine-and-turf motif that carries the theme all the way through the landscaping.",
    category: "Complete Pool & Backyard Remodel",
    heroImage: "/images/Projects/Melissa-Dinan/melissa-dinan-01.jpg",
    overview: "This is one of the most distinctive backyards we've built. The design centers on a long, linear pool finished with a bold black-and-white checkerboard tile sun shelf, paired with a raised spa clad in vertical black-and-white striped tile. Behind the spa, a triple-arch stucco wall with wrought iron lantern sconces echoes a Moroccan courtyard, all shaded by a black steel pergola. A perimeter garden wall lined with sculptural arched niches and vine trellises wraps the yard, and the same checkerboard pattern from the pool reappears in the decking — cream travertine pavers set on the diagonal with dark turf diamonds worked in between. A separate turf strip in the side yard rounds out the property.",
    location: "Phoenix, AZ",
    scope: "Complete pool and backyard remodel",
    year: "2024",
    services: ["Full pool and backyard remodel", "Linear in-ground pool with a black-and-white checkerboard-tile sun shelf", "Raised spa clad in vertical black-and-white striped tile", "Triple-arch Moroccan-style feature wall with wrought iron lantern sconces", "Black steel pergola shading the spa", "Perimeter garden wall with sculptural arched niches and vine trellises", "Checkerboard-pattern travertine paver and turf decking","Turf and landscape plantings, including climbing roses along the perimeter wall","Additional turf installation in the side yard"],
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
        label: "Water Feature",
        image: "/images/Projects/Melissa-Dinan/melissa-dinan-01.jpg",
      },
      {
        label: "Spa",
        image: "/images/Projects/Melissa-Dinan/melissa-dinan-04.jpg",
      },
      {
        label: "Lighting Feature",
        image: "/images/Projects/Melissa-Dinan/melissa-dinan-05.jpg",
      },
    ],
    crafts: [
      {
        heading: "A Checkerboard Sun Shelf",
        para: "The pool's shallow end is finished entirely in a black-and-white checkerboard tile pattern, turning what's usually a plain lounging shelf into one of the yard's signature design moments."
      },
      {
        heading: "Striped Tile Spa",
        para: "The raised spa is wrapped in bold vertical black-and-white stripes, tying it visually to the checkerboard pool floor while giving it its own distinct look."
      },
      {
        heading: "A Moroccan Arch Backdrop",
        para: "Three arched openings in the stucco wall behind the spa, fitted with wrought iron lantern sconces and framed by a black steel pergola, give the space a courtyard feel unlike anything else in our portfolio."
      },
      {
        heading: "Checkerboard Carries Through the Landscape",
        para: "The same black-and-white theme extends into the hardscape, where cream travertine pavers are set on the diagonal with dark turf diamonds worked in between — a detail that ties the pool design to the rest of the yard."
      },
      {
        heading: "Sculptural Wall Niches",
        para: "The perimeter garden wall is lined with a series of large arched niches alternating with vine trellises, giving climbing roses a framework to grow into over time and adding texture to what would otherwise be a plain block wall."
      }
    ],
    timeline: [
      {
        title: "Pool Shell & Structure",
        description: "Excavated and built the pool shell and raised spa structure, along with the triple-arch feature wall behind it.",
        media: "/images/Projects/Melissa-Dinan/pool-shell.jpg"
      },
      {
        title: "Tile Work",
        description: "Installed the black-and-white checkerboard tile on the pool's sun shelf and the striped tile cladding on the raised spa.",
        media: "/images/Projects/Melissa-Dinan/melissa-dinan-07.jpg"
      },
      {
        title: "Walls, Arches & Pergola",
        description: "Built out the perimeter garden wall with its arched niches and trellises, added the wrought iron lantern sconces, and installed the black steel pergola.",
        media: "/images/Projects/Melissa-Dinan/melissa-dinan-06.jpg"
      },
      {
        title: "Decking & Landscaping",
        description: "Set the checkerboard travertine-and-turf decking, planted climbing roses and landscaping along the walls, and finished the turf installation in the side yard.",
        media: "/images/Projects/Melissa-Dinan/melissa-dinan-10.jpg"
      }
    ],
    testimonial: {
      name: "Marcus Sterling",
      quote: "Habitat created a space that feels like a natural part of the Malibu coastline. Standing by the edge of the pool, the water merges completely with the ocean."
    }
  },
  {
    id: "3",
    slug: "parkview",
    title: "The Parkview",
    subtitle: "A clean, geometric pool and corner spillover spa finished in an ornate blue-and-white cement tile, framed by a bold desert landscape and a lighting system that completely transforms the yard after dark.",
    category: "Complete Pool, Spa & Backyard Design",
    heroImage: "/images/Projects/Parkview-Media/parkview-media-31.jpg",
    overview: "This backyard centers on a rectangular pool paired with a raised, corner spillover spa, both finished in a striking blue-and-white ornate cement tile that gives the whole space a distinct, custom look. A raised bond wall behind the pool sends water down through sheer-descent scuppers finished in the same tile pattern. Around the water, we built out a full desert landscape with ocotillo, columnar and barrel cacti, and agave set in decomposed granite, added a turf lawn for everyday use, and finished the deck in cream pavers. A programmable lighting package ties it all together — color-changing pool and spa lighting paired with amber uplighting on the cacti and pathway lights along the planting beds.",
    location: "Complete Pool, Spa & Backyard Design",
    scope: "Pool Design & Build, Hardscape Design, Fire Feature Integration",
    year: "2025",
    services: ["Geometric in-ground pool with a raised, corner spillover spa", "Raised bond wall with sheer-descent scupper water features", "Perimeter block wall", "Desert landscape design (ocotillo, columnar and barrel cacti, agave, yucca) in decomposed granite beds","Ornate blue-and-white cement tile cladding on the wall and spa", "Turf lawn installation", "Cream paver decking and patio", "Desert landscape design (ocotillo, columnar and barrel cacti, agave, yucca) in decomposed granite beds", "Color-changing pool and spa lighting", "Landscape uplighting and pathway lighting"
],
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
      {
        heading: "An Ornate Tile Water Feature",
        para: "The raised wall behind the pool sends water down through sheer-descent scuppers, all finished in a blue-and-white cement tile pattern that gives the feature a custom, one-of-a-kind look rather than a standard plaster finish."
      },
      {
        heading: "A Corner Spillover Spa",
        para: "Tucked into the corner and clad in the same tile as the water feature wall, the spa shares its waterline with the pool so the two read as one connected design rather than separate add-ons."
      },
      {
        heading: "Desert Landscape With Personality",
        para: "Ocotillo, saguaro-style columnar cacti, barrel cacti, and agave are set into decomposed granite beds along the perimeter wall, giving the yard genuine desert character instead of a generic gravel-and-shrub treatment."
      },
      {
        heading: "Lighting That Transforms the Space",
        para: "A color-changing lighting system shifts the pool and spa through blues and purples after dark, while amber uplights on the cacti throw dramatic shadows against the perimeter wall — the yard looks like a completely different space once the sun goes down."
      }
    ],
    timeline: [
      {
        title: "Pool & Spa Structure",
        description: "Excavated and built the geometric pool, the corner spillover spa, and the raised feature wall behind it.",
        media: "/images/Projects/Melissa-Dinan/melissa-dinan-06.jpg"
      },
      {
        title: "Tile & Water Features",
        description: "Installed the ornate cement tile on the wall and spa and plumbed the sheer-descent scuppers.",
        media: "/images/Projects/Melissa-Dinan/melissa-dinan-07.jpg"
      },
      {
        title: "Hardscape & Turf",
        description: "Set the paver decking and patio, installed the turf lawn, and built the perimeter block wall.",
        media: "/images/Projects/Melissa-Dinan/melissa-dinan-07.jpg"
      },
      {
        title: "Landscaping & Lighting",
        description: "Planted the desert landscape design and installed the color-changing pool, spa, and landscape lighting.",
        media: "/images/Projects/Melissa-Dinan/melissa-dinan-07.jpg"
      }
    ],
    testimonial: {
      name: "Christopher Langanke",
      quote: "Absolutely fantastic company to work with for your backyard paradise! They took our dreams and made them reality! From landscaping to pool design we couldn’t be happier with our family oasis, Cactus Cove! What has made the exceptional is the after care, this wasn’t just a job for them, it was a commitment and they have honored every bit of what you’d expect but so rarely get these days! Looking for a dream pool or landscape, don’t hesitate, call Colby and Carter - Ha it at Pools!"
    }
  },
  {
    id: "4",
    slug: "vidlak",
    title: "The Vidlak",
    subtitle: "A blank backyard with nothing but a bare patio and a single palm tree was transformed into a resort-style retreat — a geometric pool with a Baja shelf and sheer-descent water features, turf, travertine decking, and layered desert landscaping.",
    category: "Ground-Up Pool & Backyard Build",
    heroImage: "/images/Projects/Vidlak/project-01.jpg",
    overview: "This yard started with nothing to work with: a plain covered patio, a stretch of gravel, and a single palm tree. We built the entire outdoor space from scratch — staking and excavating the pool, running new plumbing and electrical, forming and pouring the raised water feature walls, and finishing the yard with travertine decking, turf, and desert landscaping. The result is a clean, geometric pool with a Baja shelf and a sheer-descent water feature built into a raised, wood-look accent wall.",
    location: "San Tan Valley, AZ",
    scope: "Full backyard build — pool, hardscape, and landscaping from the ground up",
    year: "2024",
    services: ["Full backyard build from a bare yard — no prior pool or hardscape", "Geometric in-ground pool with a Baja shelf", "Raised accent wall with a sheer-descent water feature", "Travertine paver decking", "Turf installation", "Perimeter block wall", "Desert landscaping (palms, low-water shrubs, gravel beds)", "View fencing along the rear property line"],
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
      {
        heading: "A Baja Shelf Built In",
        para: "The pool includes a wide Baja shelf tucked into one corner — a shallow lounging area that gives the family a place to relax in the water without needing separate loungers."
      },
      {
        heading: "Sheer-Descent Water Feature",
        para: "A raised wall clad in a wood-look finish sends a clean sheet of water into the pool, adding movement and sound while doubling as a planted accent wall above the waterline."
      },
      {
        heading: "Turf Meets Travertine",
        para: "A full turf strip runs alongside the pool, giving the yard a soft, usable lawn area next to the light travertine decking — practical for a family yard, not just a showpiece."
      },
      {
        heading: "Desert Landscaping with a View",
        para: "Low-water shrubs and palms line the block walls, and a view fence along the back of the property keeps the desert horizon visible instead of walling it off."
      }
    ],
    timeline: [
      {
        title: "Layout & Excavation",
        description: "Staked out the pool shape and excavated with the yard completely bare.",
        media: "/images/Projects/Melissa-Dinan/melissa-dinan-06.jpg"
      },
      {
        title: "Plumbing, Electrical & Structure",
        description: "Ran new plumbing and electrical lines and formed the raised water feature wall and pool structure.",
        media: "/images/Projects/Melissa-Dinan/melissa-dinan-07.jpg"
      },
      {
        title: "Hardscape & Water Features",
        description: "Installed the travertine decking and finished the sheer-descent water feature and Baja shelf.",
        media: "/images/Projects/Melissa-Dinan/melissa-dinan-07.jpg"
      },
      {
        title: "Landscaping & Finishing Touches",
        description: "Installed turf, desert plantings, and the perimeter block and view fencing.",
        media: "/images/Projects/Melissa-Dinan/melissa-dinan-07.jpg"
      }
    ],
    testimonial: {
      name: "Elena Rostova",
      quote: "Our backyard went from an eyesore to the place we host every single weekend. The team did a fantastic job remodeling the old pool shell."
    }
  },
  {
    id: "5",
    slug: "sagebrush",
    title: "The Sagebrush",
    subtitle: "What started as a pool project grew into a full reimagining of this Gilbert backyard — a resort-style pool and spa, a covered outdoor kitchen, a dedicated lounge retreat, and a side yard turned into one of the family's favorite spots on the property.",
    category: "Complete Backyard Transformation",
    heroImage: "/images/project-05.png",
    overview: "The homeowners came to us with a clear vision and an entire outdoor space to reimagine. Our team demoed and removed the existing landscape, then rebuilt it from the ground up: an in-ground pool paired with an elevated spa, a paver patio, turf, a covered outdoor kitchen with a fireplace, a separate shaded lounge area, new plantings and irrigation throughout, and a side yard transformed with raised garden beds, fruit trees, and a kids' playhouse. Layered landscape and pool lighting carries the space from day use into the evening.",
    location: "Gilbert, AZ",
    scope: "Landscape Design, Pool Design & Build, Softscape & Planting",
    year: "2025",
    services: ["Full landscape demolition and site prep", "In-ground pool with an elevated, spillover spa", "Paver patio and hardscape installation", "Artificial turf installation", "Perimeter block wall and desert landscaping (palms, agave, and accent plantings)", "New irrigation and planting", "Raised garden beds and fruit trees in a reimagined side yard", "Covered pergola with a built-in outdoor kitchen, fireplace, and bar seating", "Separate covered lounge area for shaded seating", "Landscape and pool lighting"],
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
      {
        heading: "Cascading Water Wall",
        para: "Three wall scuppers spill from a raised bond-beam wall into the pool below, giving the space movement and sound without a full waterfall footprint — a clean, modern take on a classic feature."
      },
      {
        heading: "Elevated Spa with a Sun Shelf",
        para: "An elevated, jetted spa spills into the main pool, which includes a wide sun shelf for lounging in the shallows — two distinct ways to enjoy the water in one connected feature."
      },
      {
        heading: "Outdoor Kitchen with Fireplace",
        para: "A pergola-covered kitchen and bar anchor the entertaining side of the yard — a built-in BBQ counter, woven bar stools, a mounted TV, and a fireplace wall make it a space that works year-round, day or night."
      },
      {
        heading: "The Side Yard Reimagined",
        para: "What was once unused space became one of the most personal parts of the property: raised garden beds, fruit trees, and a playhouse tucked away for the kids — proof that a project like this can be just as much about family life as it is about the pool."
      }
    ],
    timeline: [
      {
        title: "Demo & Site Prep",
        description: "Removed the existing landscape completely to start with a clean slate.",
        media: "/images/Projects/Melissa-Dinan/melissa-dinan-06.jpg"
      },
      {
        title: "Pool & Hardscape",
        description: "Excavated and built the pool and elevated spa, then set the paver patio and walkways.",
        media: "/images/Projects/Melissa-Dinan/melissa-dinan-07.jpg"
      },
      {
        title: "Structures, Turf & Planting",
        description: "Built the pergola, outdoor kitchen, fireplace, and perimeter block wall; installed turf, irrigation, and new plantings, including the side yard garden beds.",
        media: "/images/Projects/Melissa-Dinan/melissa-dinan-07.jpg"
      },
      {
        title: "Lighting & Finishing Touches",
        description: "Added landscape and pool lighting, furnished the patio and lounge areas, and did a final walkthrough.",
        media: "/images/Projects/Melissa-Dinan/melissa-dinan-07.jpg"
      }
    ],
    testimonial: {
      name: "Cassandra Nash",
      quote: "We cannot say enough good things about Habitat Pools. What started as a pool project turned into a complete transformation of our entire outdoor space. We had a vision of exactly what we wanted and they went above and beyond to create a space beyond what we had imagined. They handled everything: landscaping, all new plants, garden beds, irrigation, pool, spa, and a beautiful shade structure, and every detail was thoughtfully designed and executed. One of our favorite parts of the project is the side yard transformation. What was once wasted space is now one of the most special areas of our property, complete with raised garden beds, fruit trees, and the sweetest playhouse tucked away for our kids. It feels like something out of a magazine, but still functional and family-focused. Colby and Carter were responsive, collaborative, and genuinely cared about making sure every part of the project was perfect. We are beyond grateful for the vision and effort they brought to our home and would recommend Habitat Pools to anyone looking for a company that goes above and beyond."
    }
  }
];

export function getProjectBySlug(slug: string): Project | undefined {
  return allProjects.find((p) => p.slug === slug);
}
