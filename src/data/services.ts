type FaqItem = {
  question: string;
  answer: string;
};

interface Features {
  text: string;
  image: string;
  altText:string;
}

type whyUsdescription = {
  whypara: string;
  whyListItems: string[];
  whyImage:string;
};

type ourEasiness = {
  easypara: string;
  easyListItems: string[];
};

export interface ServiceDetail {
  id: string;
  slug: string;
  title: string;
  titleTwo:string;
  category: string;
  heroImage: string;
  subtitle: string;
  overview: string;
  approachTitle: string;
  approachSubtitle:string;
  approachDescription:string;
  approachPoints: {
    title: string;
    description: string;
  }[];
  featuresTitle: string;
  featuresSubtitle: string;
  featuresDescription: string;
  featuresOutro:string;
  features: Features[];
  processTitle: string;
  processSubtitle:string;
  processDescription:string;
  processSteps: {
    title: string;
    description: string;
    image?: string;
  }[];
  whyUstitle:string;
  whyUsdescription:whyUsdescription;
  ourPoolTitle:string;
  ctaHeading: string;
  ctaDescription: string;
  ctaButtonText: string;
  ctaButtonLink: string;
  FaqItems: FaqItem[];

}



export const allServices: ServiceDetail[] = [
  {
    id: "1",
    slug: "custom-pool-construction",
    title: "custom pool Construction In Arizona",
    titleTwo:"Custom Pool Construction",
    category: "Pool Construction",
    heroImage: "/images/service-01.png",
    subtitle: "Thoughtful design, expert craftsmanship, and long-term performance for luxury backyard pools in Arizona.",
    overview:
      "At Habitat Pools, we specialize in custom pool construction for homeowners across Arizona, creating outdoor spaces that combine exceptional craftsmanship with thoughtful design and long-term performance. Whether you're dreaming of a sleek geometric pool, a resort-inspired retreat, an infinity-edge design, or a complete backyard transformation, our team works closely with you to create a one-of-a-kind outdoor environment tailored to your home and lifestyle.",
    approachTitle: "Our Construction Approach",
    approachSubtitle:"exceptional custom pool",
    approachDescription:"At Habitat Pools, we believe exceptional custom pool construction is built on thoughtful planning, quality craftsmanship, and long-term performance. Our approach is designed to give homeowners confidence at every stage of the project by focusing on what matters most :",
    approachPoints: [
      {
        title: "Design-First Approach",
        description: "We refine your custom pool design until you're completely satisfied before preparing a detailed proposal.",
      },
      {
        title: "Engineering & Permitting",
        description: "Every project is professionally engineered and all required permits are coordinated before construction begins.",
      },
      {
        title: "Owner-Led Project Management",
        description: "You'll work directly with the owners from consultation through your final walkthrough.",
      },
      {
        title: "Smarter Pool Systems",
        description: "Efficient plumbing layouts, reliable equipment, and proper water circulation help create pools that are easier to maintain.",
      },
      {
        title: "Premium materials & craftsmanship",
        description: "From structural construction to the final finishes, every detail is completed with quality, precision, and long-term durability in mind.",
      },
      {
        title: "Transparent Communication",
        description: "We keep you informed throughout the construction process, so you always know what to expect.",
      },

      
    ],
    featuresTitle: "Our Custom Pool Construction Features",
    featuresSubtitle:"Every design defines the owner",
    featuresDescription:
      "Every custom pool is designed specifically for the homeowner, property, and lifestyle. While no two projects are identical, our construction services commonly include :",
    featuresOutro:"Every feature is thoughtfully integrated to create a cohesive outdoor living environment that complements your home and enhances the way you live outdoors.",
    features: [
  { text: "custom pool construction", image: "/images/Services/Custom Pool Construction/custom-swimming-pool-construction.webp" , altText:"hello"},
  { text: "Geometric and freeform pool designs", image: "/images/Services/Custom Pool Construction/geometric-and-freeform-pool-designs.jpg" , altText:"hello" },
  { text: "Infinity-edge and vanishing-edge pools", image: "/images/Services/Custom Pool Construction/infinity-edge-and-vanishing-edge-pools.jpg", altText:"hello" },
  { text: "Integrated spas and Baja shelves", image: "/images/Services/Custom Pool Construction/integrated-spas-and-baja-shelves.jpg", altText:"hello" },
  { text: "Premium pebble interiors", image: "/images/Services/Custom Pool Construction/premium-pebble-interiors.jpg", altText:"hello" },
  { text: "Designer tile and coping", image: "/images/Services/Custom Pool Construction/designer-tile-and-coping.png" , altText:"hello"},
  { text: "Energy-efficient pool equipment", image: "/images/Services/Custom Pool Construction/energy-efficient-pool-equipment.jpeg" , altText:"hello"},
  { text: "Smart pool automation systems", image: "/images/Services/Custom Pool Construction/smart-pool-automation-systems.webp" , altText:""},
  { text: "LED pool lighting", image: "/images/Services/Custom Pool Construction/led-pool-lighting.png", altText:"hello" },
  { text: "Water features", image: "/images/Services/Custom Pool Construction/water-features.jpg", altText:"hello" },
  { text: "Fire features", image: "/images/Services/Custom Pool Construction/fire-features.webp", altText:"hello" },
  { text: "Custom decking and hardscaping", image: "/images/Services/Custom Pool Construction/custom-decking-and-hardscaping.jpg", altText:"hello" },
  { text: "Outdoor kitchens", image: "/images/Services/Custom Pool Construction/outdoor-kitchens.jpg", altText:"hello" },
  { text: "Complete backyard transformations", image: "/images/Services/Custom Pool Construction/complete-backyard-transformations.png", altText:"hello" },
] satisfies Features[],
    processSubtitle:"stay informed",
    processTitle: "Our Transparent Process",
    processDescription:"Building a custom pool is a significant investment, and we believe you should feel informed and confident throughout every stage of the journey.",
    processSteps: [
      {
        title: "Complimentary Consultation",
        description: "Every project begins with a free consultation where we take the time to understand your goals, lifestyle, and vision for your outdoor space. We'll discuss your ideas, answer your questions, and evaluate your property's unique characteristics.",
        image:"/images/project-01.png"
      },
      {
        title: "Custom Design & Planning",
        description: "After visiting your property, we take detailed measurements and photographs before developing custom design 3D renderings tailored specifically to your home. We continue refining your design based on your feedback until you're confident it reflects your vision. Only after you're satisfied, we send over a detailed proposal, and after your selections are finalized, we coordinate engineering plans and submit all required permits before construction begins.",
        image:"/images/project-02.png"
      },
      {
        title: "Expert Construction",
        description: "With permits approved, construction begins. Every project follows a carefully coordinated sequence designed to ensure structural integrity, lasting performance, and exceptional craftsmanship. Throughout construction, we keep you informed with regular updates so you'll always know what's happening and what to expect next. While every project is unique, most custom pool projects are completed in approximately 90 days after construction begins, with larger or more complex backyard transformations requiring additional time depending on scope and permitting.",
        image:"/images/project-03.png"
      },
      {
        title: "Final Walkthrough & Pool School",
        description: "Before your project is considered complete, we perform a comprehensive walkthrough to ensure every detail meets our quality standards. We'll address any final touch-ups, demonstrate how your equipment operates, explain routine maintenance, and answer your questions during your personalized Pool School.",
        image:"/images/project-04.png"
      },
    ],
    whyUstitle:"Why Our Pools Perform Better",
    whyUsdescription: {
    whypara: "A beautiful pool should also be efficient, reliable, and easy to own. At Habitat Pools, every custom pool is thoughtfully designed to deliver long-term performance through smarter engineering and proven construction practices.",
    whyListItems: [
      "Smarter Plumbing Design",
      "Reliable Pool Equipment",
      "Optimized Water Circulation",
    ],
    whyImage:"/images/owner.png"
  },
    ourPoolTitle:"",
    ctaHeading: "Ready to Build Your Dream Pool?",
    ctaDescription: "Turn your vision into a custom pool that’s designed for your lifestyle and built to last.",
    ctaButtonText: "Schedule Your Free Consultation",
    ctaButtonLink: "/contact",
    FaqItems:[
          {
            question: "How long does the construction process take?",
            answer: "Every project is unique, but most custom projects are completed in approximately 90 days after construction begins. Larger or more complex backyard transformations may require additional time depending on engineering, permitting, weather conditions, and custom features.",
          },
          {
            question: "Do you handle engineering plans and permits?",
            answer: "Yes. Habitat Pools coordinates the engineering process and submits all required permits before construction begins. We manage these steps on your behalf to help ensure your project moves forward as smoothly as possible.",
          },
          {
            question: "Can I customize every aspect of my swimming pool?",
            answer: "Absolutely. Every pool we build is fully customized to suit your property, lifestyle, and personal preferences. From the pool shape and size to tile, pebble interiors, decking, water features, lighting, spas, and automation systems, every detail is selected with your vision in mind.",
          },
          {
            question: "Do you help with selecting materials?",
            answer: "Yes. We'll guide you through selecting finishes and materials that complement your home's style, including decking, tile, coping, pebble interiors, lighting concepts, and landscape elements.",
          },
          {
            question: "What features can I add to my custom pool?",
            answer: "We offer a wide range of premium features, including integrated spas, Baja shelves, waterfalls, deck jets, fire features, LED lighting, smart pool automation, outdoor kitchens, custom decking, hardscaping, and complete landscape design to create a seamless outdoor living space.",
          },
        ]
  },
  {
    id: "2",
    slug: "pool-and-landscape-design",
    title: "Pool & Landscape Design",
    titleTwo:"Custom Pool Construction",
    category: "Design Studio",
    heroImage: "/images/service-02.png",
    subtitle: "Thoughtful design, expert craftsmanship, and long-term performance for luxury backyard pools in Arizona.",
    overview:
      "At Habitat Pools, we specialize in custom pool construction for homeowners across Arizona, creating outdoor spaces that combine exceptional craftsmanship with thoughtful design and long-term performance. Whether you're dreaming of a sleek geometric pool, a resort-inspired retreat, an infinity-edge design, or a complete backyard transformation, our team works closely with you to create a one-of-a-kind outdoor environment tailored to your home and lifestyle.",
    approachTitle: "Our Construction Approach",
    approachSubtitle:"exceptional custom pool",
    approachDescription:"At Habitat Pools, we believe exceptional custom pool construction is built on thoughtful planning, quality craftsmanship, and long-term performance. Our approach is designed to give homeowners confidence at every stage of the project by focusing on what matters most :",
    approachPoints: [
      {
        title: "Design-First Approach",
        description: "We refine your custom pool design until you're completely satisfied before preparing a detailed proposal.",
      },
      {
        title: "Engineering & Permitting",
        description: "Every project is professionally engineered and all required permits are coordinated before construction begins.",
      },
      {
        title: "Owner-Led Project Management",
        description: "You'll work directly with the owners from consultation through your final walkthrough.",
      },
      {
        title: "Smarter Pool Systems",
        description: "Efficient plumbing layouts, reliable equipment, and proper water circulation help create pools that are easier to maintain.",
      },
      {
        title: "Premium materials & craftsmanship",
        description: "From structural construction to the final finishes, every detail is completed with quality, precision, and long-term durability in mind.",
      },
      {
        title: "Transparent Communication",
        description: "We keep you informed throughout the construction process, so you always know what to expect.",
      },
    ],
    featuresTitle: "Our Custom Pool Construction Features",
    featuresSubtitle:"Every design defines the owner",
    featuresDescription:
      "Every custom pool is designed specifically for the homeowner, property, and lifestyle. While no two projects are identical, our construction services commonly include :",
    featuresOutro:"Every feature is thoughtfully integrated to create a cohesive outdoor living environment that complements your home and enhances the way you live outdoors.",
    features: [
  { text: "custom pool construction", image: "/images/Services/Custom Pool Construction/custom-swimming-pool-construction.webp" , altText:"hello"},
  { text: "Geometric and freeform pool designs", image: "/images/Services/Custom Pool Construction/geometric-and-freeform-pool-designs.jpg" , altText:"hello" },
  { text: "Infinity-edge and vanishing-edge pools", image: "/images/Services/Custom Pool Construction/infinity-edge-and-vanishing-edge-pools.jpg", altText:"hello" },
  { text: "Integrated spas and Baja shelves", image: "/images/Services/Custom Pool Construction/integrated-spas-and-baja-shelves.jpg", altText:"hello" },
  { text: "Premium pebble interiors", image: "/images/Services/Custom Pool Construction/premium-pebble-interiors.jpg", altText:"hello" },
  { text: "Designer tile and coping", image: "/images/Services/Custom Pool Construction/designer-tile-and-coping.png" , altText:"hello"},
  { text: "Energy-efficient pool equipment", image: "/images/Services/Custom Pool Construction/energy-efficient-pool-equipment.jpeg" , altText:"hello"},
  { text: "Smart pool automation systems", image: "/images/Services/Custom Pool Construction/smart-pool-automation-systems.webp" , altText:""},
  { text: "LED pool lighting", image: "/images/Services/Custom Pool Construction/led-pool-lighting.png", altText:"hello" },
  { text: "Water features", image: "/images/Services/Custom Pool Construction/water-features.jpg", altText:"hello" },
  { text: "Fire features", image: "/images/Services/Custom Pool Construction/fire-features.webp", altText:"hello" },
  { text: "Custom decking and hardscaping", image: "/images/Services/Custom Pool Construction/custom-decking-and-hardscaping.jpg", altText:"hello" },
  { text: "Outdoor kitchens", image: "/images/Services/Custom Pool Construction/outdoor-kitchens.jpg", altText:"hello" },
  { text: "Complete backyard transformations", image: "/images/Services/Custom Pool Construction/complete-backyard-transformations.png", altText:"hello" },
] satisfies Features[],
    processSubtitle:"stay informed",
    processTitle: "Our Transparent Process",
    processDescription:"Building a custom pool is a significant investment, and we believe you should feel informed and confident throughout every stage of the journey.",
    processSteps: [
      {
        title: "Complimentary Consultation",
        description: "Every project begins with a free consultation where we take the time to understand your goals, lifestyle, and vision for your outdoor space. We'll discuss your ideas, answer your questions, and evaluate your property's unique characteristics.",
        image:"/images/project-01.png"
      },
      {
        title: "Custom Design & Planning",
        description: "After visiting your property, we take detailed measurements and photographs before developing custom design 3D renderings tailored specifically to your home. We continue refining your design based on your feedback until you're confident it reflects your vision. Only after you're satisfied, we send over a detailed proposal, and after your selections are finalized, we coordinate engineering plans and submit all required permits before construction begins.",
        image:"/images/project-02.png"
      },
      {
        title: "Expert Construction",
        description: "With permits approved, construction begins. Every project follows a carefully coordinated sequence designed to ensure structural integrity, lasting performance, and exceptional craftsmanship. Throughout construction, we keep you informed with regular updates so you'll always know what's happening and what to expect next. While every project is unique, most custom pool projects are completed in approximately 90 days after construction begins, with larger or more complex backyard transformations requiring additional time depending on scope and permitting.",
        image:"/images/project-03.png"
      },
      {
        title: "Final Walkthrough & Pool School",
        description: "Before your project is considered complete, we perform a comprehensive walkthrough to ensure every detail meets our quality standards. We'll address any final touch-ups, demonstrate how your equipment operates, explain routine maintenance, and answer your questions during your personalized Pool School.",
        image:"/images/project-04.png"
      },
    ],
    whyUstitle:"Why Our Pools Perform Better",
   whyUsdescription: {
    whypara: "A beautiful pool should also be efficient, reliable, and easy to own. At Habitat Pools, every custom pool is thoughtfully designed to deliver long-term performance through smarter engineering and proven construction practices.",
    whyListItems: [
      "Smarter Plumbing Design",
      "Reliable Pool Equipment",
      "Optimized Water Circulation",
      "Engineered for Lasting Performance",
      "Simplified Pool Maintenance",
      "Built with Premium Materials",
    ],
    whyImage:"/images/owner.png"
  },
    ourPoolTitle:"",
    ctaHeading: "Ready to Build Your Dream Pool?",
    ctaDescription: "Turn your vision into a custom pool that’s designed for your lifestyle and built to last.",
    ctaButtonText: "Schedule Your Free Consultation",
    ctaButtonLink: "/contact",
    FaqItems:[
          {
            question: "How long does the construction process take?",
            answer: "Every project is unique, but most custom projects are completed in approximately 90 days after construction begins. Larger or more complex backyard transformations may require additional time depending on engineering, permitting, weather conditions, and custom features.",
          },
          {
            question: "Do you handle engineering plans and permits?",
            answer: "Yes. Habitat Pools coordinates the engineering process and submits all required permits before construction begins. We manage these steps on your behalf to help ensure your project moves forward as smoothly as possible.",
          },
          {
            question: "Can I customize every aspect of my swimming pool?",
            answer: "Absolutely. Every pool we build is fully customized to suit your property, lifestyle, and personal preferences. From the pool shape and size to tile, pebble interiors, decking, water features, lighting, spas, and automation systems, every detail is selected with your vision in mind.",
          },
          {
            question: "Do you help with selecting materials?",
            answer: "Yes. We'll guide you through selecting finishes and materials that complement your home's style, including decking, tile, coping, pebble interiors, lighting concepts, and landscape elements.",
          },
          {
            question: "What features can I add to my custom pool?",
            answer: "We offer a wide range of premium features, including integrated spas, Baja shelves, waterfalls, deck jets, fire features, LED lighting, smart pool automation, outdoor kitchens, custom decking, hardscaping, and complete landscape design to create a seamless outdoor living space.",
          },
        ]
  },
  {
    id: "3",
    slug: "pool-remodeling-and-renovations",
    title: "Pool Remodeling & Renovations",
    titleTwo:"Custom Pool Construction",
    category: "Renovation",
    heroImage: "/images/service-03.png",
    subtitle: "Thoughtful design, expert craftsmanship, and long-term performance for luxury backyard pools in Arizona.",
    overview:
      "At Habitat Pools, we specialize in custom pool construction for homeowners across Arizona, creating outdoor spaces that combine exceptional craftsmanship with thoughtful design and long-term performance. Whether you're dreaming of a sleek geometric pool, a resort-inspired retreat, an infinity-edge design, or a complete backyard transformation, our team works closely with you to create a one-of-a-kind outdoor environment tailored to your home and lifestyle.",
    approachTitle: "Our Construction Approach",
    approachSubtitle:"exceptional custom pool",
    approachDescription:"At Habitat Pools, we believe exceptional custom pool construction is built on thoughtful planning, quality craftsmanship, and long-term performance. Our approach is designed to give homeowners confidence at every stage of the project by focusing on what matters most :",
    approachPoints: [
      {
        title: "Design-First Approach",
        description: "We refine your custom pool design until you're completely satisfied before preparing a detailed proposal.",
      },
      {
        title: "Engineering & Permitting",
        description: "Every project is professionally engineered and all required permits are coordinated before construction begins.",
      },
      {
        title: "Owner-Led Project Management",
        description: "You'll work directly with the owners from consultation through your final walkthrough.",
      },
      {
        title: "Smarter Pool Systems",
        description: "Efficient plumbing layouts, reliable equipment, and proper water circulation help create pools that are easier to maintain.",
      },
      {
        title: "Premium materials & craftsmanship",
        description: "From structural construction to the final finishes, every detail is completed with quality, precision, and long-term durability in mind.",
      },
      {
        title: "Transparent Communication",
        description: "We keep you informed throughout the construction process, so you always know what to expect.",
      },
    ],
    featuresTitle: "Our Custom Pool Construction Features",
    featuresSubtitle:"Every design defines the owner",
    featuresDescription:
      "Every custom pool is designed specifically for the homeowner, property, and lifestyle. While no two projects are identical, our construction services commonly include :",
    featuresOutro:"Every feature is thoughtfully integrated to create a cohesive outdoor living environment that complements your home and enhances the way you live outdoors.",
    features: [
  { text: "custom pool construction", image: "/images/Services/Custom Pool Construction/custom-swimming-pool-construction.webp" , altText:"hello"},
  { text: "Geometric and freeform pool designs", image: "/images/Services/Custom Pool Construction/geometric-and-freeform-pool-designs.jpg" , altText:"hello" },
  { text: "Infinity-edge and vanishing-edge pools", image: "/images/Services/Custom Pool Construction/infinity-edge-and-vanishing-edge-pools.jpg", altText:"hello" },
  { text: "Integrated spas and Baja shelves", image: "/images/Services/Custom Pool Construction/integrated-spas-and-baja-shelves.jpg", altText:"hello" },
  { text: "Premium pebble interiors", image: "/images/Services/Custom Pool Construction/premium-pebble-interiors.jpg", altText:"hello" },
  { text: "Designer tile and coping", image: "/images/Services/Custom Pool Construction/designer-tile-and-coping.png" , altText:"hello"},
  { text: "Energy-efficient pool equipment", image: "/images/Services/Custom Pool Construction/energy-efficient-pool-equipment.jpeg" , altText:"hello"},
  { text: "Smart pool automation systems", image: "/images/Services/Custom Pool Construction/smart-pool-automation-systems.webp" , altText:""},
  { text: "LED pool lighting", image: "/images/Services/Custom Pool Construction/led-pool-lighting.png", altText:"hello" },
  { text: "Water features", image: "/images/Services/Custom Pool Construction/water-features.jpg", altText:"hello" },
  { text: "Fire features", image: "/images/Services/Custom Pool Construction/fire-features.webp", altText:"hello" },
  { text: "Custom decking and hardscaping", image: "/images/Services/Custom Pool Construction/custom-decking-and-hardscaping.jpg", altText:"hello" },
  { text: "Outdoor kitchens", image: "/images/Services/Custom Pool Construction/outdoor-kitchens.jpg", altText:"hello" },
  { text: "Complete backyard transformations", image: "/images/Services/Custom Pool Construction/complete-backyard-transformations.png", altText:"hello" },
] satisfies Features[],
    processSubtitle:"stay informed",
    processTitle: "Our Transparent Process",
    processDescription:"Building a custom pool is a significant investment, and we believe you should feel informed and confident throughout every stage of the journey.",
    processSteps: [
      {
        title: "Complimentary Consultation",
        description: "Every project begins with a free consultation where we take the time to understand your goals, lifestyle, and vision for your outdoor space. We'll discuss your ideas, answer your questions, and evaluate your property's unique characteristics.",
        image:"/images/project-01.png"
      },
      {
        title: "Custom Design & Planning",
        description: "After visiting your property, we take detailed measurements and photographs before developing custom design 3D renderings tailored specifically to your home. We continue refining your design based on your feedback until you're confident it reflects your vision. Only after you're satisfied, we send over a detailed proposal, and after your selections are finalized, we coordinate engineering plans and submit all required permits before construction begins.",
        image:"/images/project-02.png"
      },
      {
        title: "Expert Construction",
        description: "With permits approved, construction begins. Every project follows a carefully coordinated sequence designed to ensure structural integrity, lasting performance, and exceptional craftsmanship. Throughout construction, we keep you informed with regular updates so you'll always know what's happening and what to expect next. While every project is unique, most custom pool projects are completed in approximately 90 days after construction begins, with larger or more complex backyard transformations requiring additional time depending on scope and permitting.",
        image:"/images/project-03.png"
      },
      {
        title: "Final Walkthrough & Pool School",
        description: "Before your project is considered complete, we perform a comprehensive walkthrough to ensure every detail meets our quality standards. We'll address any final touch-ups, demonstrate how your equipment operates, explain routine maintenance, and answer your questions during your personalized Pool School.",
        image:"/images/project-04.png"
      },
    ],
    whyUstitle:"Why Our Pools Perform Better",
   whyUsdescription: {
    whypara: "A beautiful pool should also be efficient, reliable, and easy to own. At Habitat Pools, every custom pool is thoughtfully designed to deliver long-term performance through smarter engineering and proven construction practices.",
    whyListItems: [
      "Smarter Plumbing Design",
      "Reliable Pool Equipment",
      "Optimized Water Circulation",
      "Engineered for Lasting Performance",
      "Simplified Pool Maintenance",
      "Built with Premium Materials",
    ],
    whyImage:"/images/owner.png"
  },
    ourPoolTitle:"",
    ctaHeading: "Ready to Build Your Dream Pool?",
    ctaDescription: "Turn your vision into a custom pool that’s designed for your lifestyle and built to last.",
    ctaButtonText: "Schedule Your Free Consultation",
    ctaButtonLink: "/contact",
    FaqItems:[
          {
            question: "How long does the construction process take?",
            answer: "Every project is unique, but most custom projects are completed in approximately 90 days after construction begins. Larger or more complex backyard transformations may require additional time depending on engineering, permitting, weather conditions, and custom features.",
          },
          {
            question: "Do you handle engineering plans and permits?",
            answer: "Yes. Habitat Pools coordinates the engineering process and submits all required permits before construction begins. We manage these steps on your behalf to help ensure your project moves forward as smoothly as possible.",
          },
          {
            question: "Can I customize every aspect of my swimming pool?",
            answer: "Absolutely. Every pool we build is fully customized to suit your property, lifestyle, and personal preferences. From the pool shape and size to tile, pebble interiors, decking, water features, lighting, spas, and automation systems, every detail is selected with your vision in mind.",
          },
          {
            question: "Do you help with selecting materials?",
            answer: "Yes. We'll guide you through selecting finishes and materials that complement your home's style, including decking, tile, coping, pebble interiors, lighting concepts, and landscape elements.",
          },
          {
            question: "What features can I add to my custom pool?",
            answer: "We offer a wide range of premium features, including integrated spas, Baja shelves, waterfalls, deck jets, fire features, LED lighting, smart pool automation, outdoor kitchens, custom decking, hardscaping, and complete landscape design to create a seamless outdoor living space.",
          },
        ]
  },

];

export function getServiceBySlug(slug: string) {
  return allServices.find((service) => service.slug === slug);
}
