"use client";

import { useState, useEffect, useCallback } from "react";

interface ProjectGalleryProps {
    images: string[];
    title: string;
}

export default function ProjectGallery({ images, title }: ProjectGalleryProps) {
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const [isAnimating, setIsAnimating] = useState(false);

    const openLightbox = (idx: number) => {
        setLightboxIndex(idx);
    };

    const closeLightbox = () => {
        setIsAnimating(true);
        setTimeout(() => {
            setLightboxIndex(null);
            setIsAnimating(false);
        }, 300);
    };

    const goNext = useCallback(() => {
        if (lightboxIndex === null) return;
        setLightboxIndex((lightboxIndex + 1) % images.length);
    }, [lightboxIndex, images.length]);

    const goPrev = useCallback(() => {
        if (lightboxIndex === null) return;
        setLightboxIndex((lightboxIndex - 1 + images.length) % images.length);
    }, [lightboxIndex, images.length]);

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeLightbox();
            if (e.key === "ArrowRight") goNext();
            if (e.key === "ArrowLeft") goPrev();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [goNext, goPrev]);

    // Lock body scroll when lightbox open
    useEffect(() => {
        if (lightboxIndex !== null) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [lightboxIndex]);

    // Build grid pattern — repeating every 5 images
    // Pattern: [wide, tall] [tall, wide] [three equal]
    const getGridItem = (idx: number) => {
        const pos = idx % 5;
        if (pos === 0) return "col-span-2 row-span-1 aspect-[16/9]";
        if (pos === 1) return "col-span-1 row-span-2 aspect-[3/4]";
        if (pos === 2) return "col-span-1 row-span-2 aspect-[3/4]";
        if (pos === 3) return "col-span-2 row-span-1 aspect-[16/9]";
        if (pos === 4) return "col-span-1 row-span-1 aspect-square";
        return "col-span-1 row-span-1 aspect-square";
    };

    return (
        <>
            {/* ── GALLERY SECTION ── */}
            <section className="w-full py-[120px] px-[85px] bg-[#112931]">
                <div className="max-w-[1440px] mx-auto">

                    {/* Section header */}
                    <div className="mb-16">
                        <span className="text-[#86A3AC] text-[36px] block mb-2">Portfolio</span>
                        <h2 className="text-[#ffffff] text-[66px] leading-[72px] capitalize">
                            Project Gallery
                        </h2>
                    </div>

                    {/* Masonry-style CSS Grid */}
                    <div
                        className="grid gap-4 md:gap-6"
                        style={{
                            gridTemplateColumns: "repeat(3, 1fr)",
                            gridAutoRows: "300px",
                        }}
                    >
                        {images.map((image, idx) => {
                            const pos = idx % 5;
                            let colSpan = 1;
                            let rowSpan = 1;

                            if (pos === 0) { colSpan = 2; rowSpan = 1; }
                            else if (pos === 1) { colSpan = 1; rowSpan = 2; }
                            else if (pos === 2) { colSpan = 1; rowSpan = 1; }
                            else if (pos === 3) { colSpan = 1; rowSpan = 1; }
                            else if (pos === 4) { colSpan = 2; rowSpan = 1; }

                            return (
                                <div
                                    key={idx}
                                    onClick={() => openLightbox(idx)}
                                    className="group relative overflow-hidden rounded-[16px] cursor-pointer"
                                    style={{
                                        gridColumn: `span ${colSpan}`,
                                        gridRow: `span ${rowSpan}`,
                                    }}
                                >
                                    {/* Image */}
                                    <img
                                        src={image}
                                        alt={`${title} gallery ${idx + 1}`}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />

                                    {/* Hover overlay */}
                                    <div className="absolute inset-0 bg-[#112931]/0 group-hover:bg-[#112931]/40 transition-all duration-500" />

                                    {/* View icon */}
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div
                                            className="flex items-center justify-center gap-2 px-6 py-3 rounded-full"
                                            style={{
                                                background: "rgba(255,255,255,0.15)",
                                                backdropFilter: "blur(8px)",
                                                border: "1px solid rgba(255,255,255,0.3)",
                                            }}
                                        >
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <span className="text-white text-[14px] font-medium tracking-wide">View</span>
                                        </div>
                                    </div>

                                    {/* Index counter */}
                                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <span
                                            className="text-white text-[13px]"
                                            style={{
                                                background: "rgba(0,0,0,0.4)",
                                                backdropFilter: "blur(4px)",
                                                padding: "4px 10px",
                                                borderRadius: "20px",
                                            }}
                                        >
                                            {idx + 1} / {images.length}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── LIGHTBOX OVERLAY ── */}
            {lightboxIndex !== null && (
                <div
                    className="fixed inset-0 z-[9999] flex items-center justify-center"
                    style={{
                        background: "rgba(10, 20, 24, 0.96)",
                        backdropFilter: "blur(12px)",
                        opacity: isAnimating ? 0 : 1,
                        transition: "opacity 0.3s ease",
                    }}
                    onClick={closeLightbox}
                >
                    {/* Counter */}
                    <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10">
                        <span
                            className="text-white/60 text-[14px] tracking-widest uppercase"
                            style={{ letterSpacing: "0.2em" }}
                        >
                            {lightboxIndex + 1} &nbsp;/&nbsp; {images.length}
                        </span>
                    </div>

                    {/* Close button */}
                    <button
                        onClick={closeLightbox}
                        className="absolute top-6 right-6 z-10 flex items-center justify-center w-[44px] h-[44px] rounded-full transition-all duration-200 hover:bg-white/10"
                        style={{ border: "1px solid rgba(255,255,255,0.2)" }}
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                            <path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </button>

                    {/* Prev button */}
                    <button
                        onClick={(e) => { e.stopPropagation(); goPrev(); }}
                        className="absolute left-6 z-10 flex items-center justify-center w-[52px] h-[52px] rounded-full transition-all duration-200 hover:bg-white/10 hover:scale-110"
                        style={{ border: "1px solid rgba(255,255,255,0.2)" }}
                    >
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                            <path d="M15 18l-6-6 6-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>

                    {/* Next button */}
                    <button
                        onClick={(e) => { e.stopPropagation(); goNext(); }}
                        className="absolute right-6 z-10 flex items-center justify-center w-[52px] h-[52px] rounded-full transition-all duration-200 hover:bg-white/10 hover:scale-110"
                        style={{ border: "1px solid rgba(255,255,255,0.2)" }}
                    >
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                            <path d="M9 18l6-6-6-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>

                    {/* Main image */}
                    <div
                        className="relative flex items-center justify-center"
                        style={{ maxWidth: "90vw", maxHeight: "85vh" }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            key={lightboxIndex}
                            src={images[lightboxIndex]}
                            alt={`${title} ${lightboxIndex + 1}`}
                            className="max-w-full max-h-[85vh] object-contain rounded-[12px]"
                            style={{
                                boxShadow: "0 40px 80px rgba(0,0,0,0.6)",
                                animation: "fadeInScale 0.3s ease forwards",
                            }}
                        />
                    </div>

                    {/* Thumbnail strip */}
                    <div
                        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 items-center"
                        style={{ maxWidth: "80vw", overflowX: "auto" }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {images.map((img, idx) => (
                            <div
                                key={idx}
                                onClick={() => setLightboxIndex(idx)}
                                className="flex-shrink-0 cursor-pointer rounded-[6px] overflow-hidden transition-all duration-200"
                                style={{
                                    width: "56px",
                                    height: "40px",
                                    border: idx === lightboxIndex
                                        ? "2px solid rgba(134, 163, 172, 1)"
                                        : "2px solid rgba(255,255,255,0.15)",
                                    opacity: idx === lightboxIndex ? 1 : 0.5,
                                    transform: idx === lightboxIndex ? "scale(1.1)" : "scale(1)",
                                }}
                            >
                                <img
                                    src={img}
                                    alt=""
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Keyframe animation */}
            <style>{`
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.95); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
        </>
    );
}
