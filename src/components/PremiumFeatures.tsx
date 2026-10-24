"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import type { ProjectFeature } from "@/data/projects";

type PremiumFeaturesProps = {
    features?: ProjectFeature[];
    tagline?: string;
    heading?: string;
};

const fallbackFeatures: ProjectFeature[] = [
    {
        label: "Water Features",
        image: "/images/features_1.jpg",
    },
    {
        label: "Outdoor Fire Features",
        image: "/images/features_2.jpg",
    },
    {
        label: "Lighting Features",
        image: "/images/features_3.jpg",
    },
    {
        label: "Outdoor Kitchens & BBQ Area",
        image: "/images/features_4-v2.jpg",
    },
];

export default function PremiumFeatures({
    features = fallbackFeatures,
    tagline = "Custom Features",
    heading = "Bring Your Backyard to Life",
}: PremiumFeaturesProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [mounted, setMounted] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative w-full flex flex-col justify-center px-[clamp(20px,1.37px_+_4.968vw,96px)] py-[clamp(56px,50.12px_+_1.569vw,80px)]"
            style={{
                background: "#112931",
                fontFamily: "'Nohemi', sans-serif",
            }}
        >
            {/* Header */}
            <div
                className="relative mb-7 md:mb-7 flex flex-col lg:flex-row justify-start lg:gap-[clamp(40px,16.994vw_-_23.73px,300px)]"
                style={{
                    opacity: mounted ? 1 : 0,
                    transform: mounted ? "translateY(0)" : "translateY(-16px)",
                    transition: "opacity 0.7s ease, transform 0.7s ease",
                }}
            >
                {/* Feature label */}
                <div className="flex items-center gap-2 mb-4">
                    <span className="text-(length:--fs-eyebrow) text-[#86A3AC] hidden lg:block tracking-wide">
                       {tagline}
                    </span>
                </div>

                {/* Heading */}
                <h2 className="text-(length:--fs-display) leading-[1.1] max-w-[60%] max-lg:max-w-none text-white whitespace-pre-line">
                    {heading}
                </h2>
            </div>

            {/* Cards container: a row on desktop, a vertical accordion below
                1024, where four side-by-side cards get too narrow for labels */}
            <div className="relative flex overflow-hidden h-[clamp(360px,48vw,540px)] max-lg:flex-col max-lg:h-[clamp(480px,140vw,640px)]">
                {features.map((feature, index) => {
                    const isActive = activeIndex === index;

                    return (
                        <div
                            key={`${feature.label}-${index}`}
                            onMouseEnter={() => setActiveIndex(index)}
                            // Touch screens have no hover, so a tap opens the card.
                            onClick={() => setActiveIndex(index)}
                            className="relative overflow-hidden cursor-pointer"
                            style={{
                                flex: isActive ? "2.5 1 0%" : "1 1 0%",
                                minWidth: 0,
                                transition: "flex 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                                opacity: mounted ? 1 : 0,
                                transform: mounted ? "translateY(0)" : "translateY(28px)",
                            }}
                        >
                            {/* Background image */}
                            <div
                                className="absolute inset-0 w-full h-full"
                                style={{
                                    transform: isActive ? "scale(1)" : "scale(1.15)",
                                    transition: "transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                                    willChange: "transform",
                                }}
                            >
                                <Image
                                    src={feature.image}
                                    alt={feature.label}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 45vw"
                                    loading={index === 0 ? "eager" : "lazy"}
                                    style={{
                                        objectFit: "cover",
                                        objectPosition: "center",
                                    }}
                                />
                            </div>

                            {/* Gradient overlay */}
                            <div
                                className="absolute inset-0"
                                style={{
                                    background: isActive
                                        ? "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0) 100%)"
                                        : "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.1) 100%)",
                                    transition: "background 0.5s ease",
                                }}
                            />

                            {/* Label */}
                            <div
                                className={`absolute bottom-0 left-0 right-0 flex items-end ${isActive ? "" : "lg:top-0 lg:justify-center"}`}
                                style={{
                                    padding: isActive ? "32px 28px" : "24px 20px",
                                    transition: "padding 0.5s ease",
                                }}
                            >
                                <h3
                                    className={`text-white font-normal leading-tight ${isActive ? "" : "lg:[writing-mode:vertical-rl] lg:rotate-180 lg:max-h-full"}`}
                                    style={{
                                        fontSize: isActive
                                            ? "clamp(28px, 3vw, 40px)"
                                            : "clamp(14px, 1.3vw, 20px)",
                                        transition: "font-size 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                                        textShadow: "0 2px 16px rgba(0,0,0,0.5)",
                                        maxWidth: isActive ? "100%" : "100%",
                                    }}
                                >
                                    {feature.label}
                                </h3>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}