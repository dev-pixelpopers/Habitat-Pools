"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface ProjectGalleryProps {
    images: string[];
    title: string;
    video?: string;
    videoThumbnail?: string;
    tagline?: string;
    heading?: string;
}

// Assets that have not been delivered yet are kept in the project data as
// "MISSING-" placeholders so it stays visible what is outstanding. They must
// never reach the DOM: a placeholder <video> src 404s and throws
// NotSupportedError, and a placeholder poster shows a broken image.
function isPlaceholderAsset(path?: string) {
    return !path || path.split("/").pop()!.startsWith("MISSING-");
}

function VideoTile({ src, poster, style }: { src: string; poster?: string; style: React.CSSProperties }) {
    const videoRef = useRef<HTMLVideoElement>(null);
    // The <video> is not mounted until the first click, so the file is never
    // requested on page load — only the poster image is.
    const [activated, setActivated] = useState(false);
    const [playing, setPlaying] = useState(false);

    // Click toggles: first click mounts and starts, later clicks play/pause.
    const toggle = () => {
        if (!activated) {
            setActivated(true);
            return;
        }
        const video = videoRef.current;
        if (!video) return;
        if (video.paused) video.play().catch(() => {});
        else video.pause();
    };

    useEffect(() => {
        if (activated) videoRef.current?.play().catch(() => {});
    }, [activated]);

    return (
        <div
            role="button"
            tabIndex={0}
            aria-label={playing ? "Pause video" : "Play video"}
            onClick={toggle}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggle();
                }
            }}
            className="group relative overflow-hidden rounded-[16px] cursor-pointer bg-black"
            style={style}
        >
            {poster && (
                <img
                    src={poster}
                    alt=""
                    loading="lazy"
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                        playing ? "opacity-0" : "opacity-100"
                    }`}
                />
            )}

            {activated && (
                <video
                    ref={videoRef}
                    src={src}
                    poster={poster}
                    preload="none"
                    muted
                    playsInline
                    onPlaying={() => setPlaying(true)}
                    onPause={() => setPlaying(false)}
                    onEnded={() => setPlaying(false)}
                    className="absolute inset-0 w-full h-full object-cover"
                />
            )}

            {/* Play badge while paused; a pause badge appears on hover while running */}
            <div
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                    playing ? "opacity-0 group-hover:opacity-100" : "opacity-100"
                }`}
            >
                <div
                    className="flex items-center justify-center w-[76px] h-[76px] rounded-full transition-transform duration-300 group-hover:scale-105"
                    style={{
                        background: "rgba(255,255,255,0.15)",
                        backdropFilter: "blur(8px)",
                        border: "1px solid rgba(255,255,255,0.3)",
                    }}
                >
                    {playing ? (
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
                            <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
                        </svg>
                    ) : (
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    )}
                </div>
            </div>
        </div>
    );
}

/**
 * Span map for the masonry grid, keyed on how many tiles are actually shown.
 * Every branch fills the 3-column grid exactly, so a short gallery can never
 * leave a hole.
 */
function spanFor(idx: number, count: number) {
    if (count <= 1) return { colSpan: 3, rowSpan: 1 };
    if (count === 2) return idx === 0 ? { colSpan: 2, rowSpan: 1 } : { colSpan: 1, rowSpan: 1 };
    if (count === 3) return { colSpan: 1, rowSpan: 1 };
    // 4 tiles: wide lead, tall second, two squares underneath.
    if (idx === 0) return { colSpan: 2, rowSpan: 1 };
    if (idx === 1) return { colSpan: 1, rowSpan: 2 };
    return { colSpan: 1, rowSpan: 1 };
}

export default function ProjectGallery({
    images,
    title,
    video: videoProp,
    videoThumbnail: videoThumbnailProp,
    tagline = "Portfolio",
    heading = "Project Gallery",
}: ProjectGalleryProps) {
    const video = isPlaceholderAsset(videoProp) ? undefined : videoProp;
    const videoThumbnail = isPlaceholderAsset(videoThumbnailProp) ? undefined : videoThumbnailProp;

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

    // Grid cells in display order — the video (when present) takes the
    // tall slot right after the first (landscape) image.
    type GalleryCell =
        | { kind: "image"; src: string; photoIndex: number }
        | { kind: "video"; src: string };

    const cells: GalleryCell[] = video
        ? [
              { kind: "image", src: images[0], photoIndex: 0 },
              { kind: "video", src: video },
              ...images.slice(1).map((src, i) => ({ kind: "image" as const, src, photoIndex: i + 1 })),
          ]
        : images.map((src, i) => ({ kind: "image" as const, src, photoIndex: i }));

    // The grid always shows 4 tiles so it fills exactly: with a video that is
    // 1 video + 3 images, without one it is 4 images. The rest of the photos
    // stay reachable through the lightbox.
    const MAX_TILES = 4;
    const maxImages = video ? MAX_TILES - 1 : MAX_TILES;
    const visibleCells: GalleryCell[] = [];
    let visibleImageCount = 0;
    for (const cell of cells) {
        if (visibleCells.length >= MAX_TILES) break;
        if (cell.kind === "image" && visibleImageCount >= maxImages) break;
        visibleCells.push(cell);
        if (cell.kind === "image") visibleImageCount++;
    }
    const lastVisible = visibleCells[visibleCells.length - 1];
    const hiddenCount =
        lastVisible && lastVisible.kind === "image"
            ? images.length - (lastVisible.photoIndex + 1)
            : 0;

    return (
        <>
            {/* ── GALLERY SECTION ── */}
            <section className="w-full py-[120px] px-[85px] bg-[#112931]">
                <div className="max-w-[1440px] mx-auto">

                    {/* Section header */}
                    <div className="mb-16">
                        <span className="text-[#86A3AC] text-[36px] block mb-2">{tagline}</span>
                        <h2 className="text-[#ffffff] text-[66px] leading-[72px] capitalize whitespace-pre-line">
                            {heading}
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
                        {visibleCells.map((cell, idx) => {
                            const { colSpan, rowSpan } = spanFor(idx, visibleCells.length);

                            const gridStyle = {
                                gridColumn: `span ${colSpan}`,
                                gridRow: `span ${rowSpan}`,
                            };

                            if (cell.kind === "video") {
                                return <VideoTile key="video" src={cell.src} poster={videoThumbnail} style={gridStyle} />;
                            }

                            const isLoadMoreTile = cell === lastVisible && hiddenCount > 0;

                            return (
                                <div
                                    key={cell.photoIndex}
                                    onClick={() => openLightbox(cell.photoIndex)}
                                    className="group relative overflow-hidden rounded-[16px] cursor-pointer"
                                    style={gridStyle}
                                >
                                    {/* Image */}
                                    <img
                                        loading="lazy"
                                        src={cell.src}
                                        alt={`${title} gallery ${cell.photoIndex + 1}`}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />

                                    {isLoadMoreTile ? (
                                        /* Permanent scrim + prompt so it's discoverable without hovering */
                                        <div className="absolute inset-0 flex items-center justify-center bg-[#112931]/60 group-hover:bg-[#112931]/70 transition-all duration-500">
                                            <span className="text-white text-[16px] font-medium tracking-wide text-center px-4">
                                                Click to load more images
                                            </span>
                                        </div>
                                    ) : (
                                        <>
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
                                                    {cell.photoIndex + 1} / {images.length}
                                                </span>
                                            </div>
                                        </>
                                    )}
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
                        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 items-center overflow-hidden"
                        style={{ maxWidth: "80vw" }}
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
                                    loading="lazy"
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
