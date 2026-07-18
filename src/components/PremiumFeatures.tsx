"use client";

import { useState, useEffect, useRef } from "react";

type Feature = {
    id: string;
    label: string;
    image: string;
};

const features: Feature[] = [
    {
        id: "water",
        label: "Water Features",
        image: "/images/features_1.png",
    },
    {
        id: "fire",
        label: "Outdoor Fire Features",
        image: "/images/features_2.jpg",
    },
    {
        id: "lighting",
        label: "Lighting Features",
        image: "/images/features_3.jpg",
    },
    {
        id: "kitchen",
        label: "Outdoor Kitchens & BBQ Area",
        image: "/images/features_4.png",
    },
];

export default function PremiumFeatures() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [mounted, setMounted] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative w-full flex flex-col justify-center px-8 py-16 md:py-20 md:px-16 lg:px-24"
            style={{
                background: "#112931",
                fontFamily: "'Nohemi', sans-serif",
            }}
        >
            {/* Header */}
            <div
                className="relative mb-7 md:mb-7 flex flex-col lg:flex-row justify-start lg:gap-[300px]"
                style={{
                    opacity: mounted ? 1 : 0,
                    transform: mounted ? "translateY(0)" : "translateY(-16px)",
                    transition: "opacity 0.7s ease, transform 0.7s ease",
                }}
            >
                {/* Feature label */}
                <div className="flex items-center gap-2 mb-4">
                    <span className="text-[36px] text-[#86A3AC] hidden lg:block tracking-wide">
                        Feature
                    </span>
                </div>

                {/* Heading */}
                <h2 className="text-[96px] leading-[88px] max-w-[1200px] text-white">
                    Custom Features That Bring Your Backyard to Life
                </h2>
            </div>

            {/* Cards container */}
            <div
                className="relative flex overflow-hidden"
                style={{
                    height: "clamp(360px, 48vw, 540px)",
                }}
            >
                {features.map((feature, index) => {
                    const isActive = activeIndex === index;

                    return (
                        <div
                            key={feature.id}
                            onMouseEnter={() => setActiveIndex(index)}
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
                                    backgroundImage: `url(${feature.image})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    transform: isActive ? "scale(1)" : "scale(1.15)",
                                    transition: "transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                                }}
                            />

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
                                className="absolute bottom-0 left-0 right-0 flex items-end"
                                style={{
                                    padding: isActive ? "32px 28px" : "24px 20px",
                                    transition: "padding 0.5s ease",
                                }}
                            >
                                <h3
                                    className="text-white font-normal leading-tight"
                                    style={{
                                        fontSize: isActive
                                            ? "clamp(28px, 3vw, 40px)"
                                            : "clamp(14px, 1.3vw, 20px)",
                                        transition: "font-size 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                                        textShadow: "0 2px 16px rgba(0,0,0,0.5)",
                                        maxWidth: isActive ? "500px" : "200px",
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