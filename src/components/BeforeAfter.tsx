"use client";

import { useRef, useState, useCallback, useEffect } from "react";

export default function BeforeAfter({
  beforeImage = "/images/before-pool.png",
  afterImage = "/images/after-pool.png",
}: {
  beforeImage?: string;
  afterImage?: string;
} = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const updateSliderPosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setIsDragging(true);
      updateSliderPosition(e.clientX);
    },
    [updateSliderPosition],
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      setIsDragging(true);
      updateSliderPosition(e.touches[0].clientX);
    },
    [updateSliderPosition],
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      updateSliderPosition(e.clientX);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      updateSliderPosition(e.touches[0].clientX);
    };

    const handleEnd = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleEnd);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleEnd);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleEnd);
    };
  }, [isDragging, updateSliderPosition]);

  return (
    <section
      className="relative w-full overflow-hidden flex flex-col gap-15 py-[120px]"
      style={{
        background: "#ffffff",
      }}
    >
      {/* Top dark section with heading */}
      <div className="w-full flex justify-center">
        <h2
          className="text-[#112931] text-center"
          style={{
            fontSize: "96px",
            lineHeight: 1.2,
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(-20px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          Before & After
        </h2>
      </div>
      {/* Slider container — overlapping both sections */}
      <div
        className="w-full px-8 md:px-16 lg:px-24"
        style={{
          maxWidth: "100%",
          opacity: mounted ? 1 : 0,
          transition: "opacity 0.8s ease 0.3s",
        }}
      >
        <div
          ref={containerRef}
          className="relative w-full overflow-hidden select-none"
          style={{
            height: "80vh",
            borderRadius: "12px",
            cursor: isDragging ? "grabbing" : "grab",
          }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          {/* After image (full background) */}
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: `url(${afterImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center bottom",
            }}
          />

          {/* Before image (clipped by slider) */}
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: `url(${beforeImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
            }}
          />

          {/* Divider line */}
          <div
            className="absolute top-0 bottom-0"
            style={{
              left: `${sliderPosition}%`,
              transform: "translateX(-50%)",
              width: "3px",
              background: "rgba(255, 255, 255, 0.9)",
              zIndex: 10,
              pointerEvents: "none",
            }}
          />

          {/* Drag handle */}
          <div
            className="absolute top-1/2"
            style={{
              left: `${sliderPosition}%`,
              transform: "translate(-50%, -50%)",
              zIndex: 20,
              pointerEvents: "none",
            }}
          >
            <div
              className="flex items-center justify-center"
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.95)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                backdropFilter: "blur(4px)",
              }}
            >
              {/* Left/Right arrows */}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 6L4 12L9 18"
                  stroke="#112931"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15 6L20 12L15 18"
                  stroke="#112931"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Before label */}
          <div
            className="absolute top-4 left-4 md:top-6 md:left-6"
            style={{
              zIndex: 15,
              pointerEvents: "none",
              opacity: sliderPosition > 10 ? 1 : 0,
              transition: "opacity 0.3s ease",
            }}
          >
            <span
              className="text-white font-medium uppercase tracking-wider"
              style={{
                fontSize: "clamp(11px, 1.2vw, 15px)",
                background: "rgba(0,0,0,0.45)",
                backdropFilter: "blur(6px)",
                padding: "6px 16px",
                borderRadius: "6px",
                letterSpacing: "0.1em",
              }}
            >
              Before
            </span>
          </div>

          {/* After label */}
          <div
            className="absolute top-4 right-4 md:top-6 md:right-6"
            style={{
              zIndex: 15,
              pointerEvents: "none",
              opacity: sliderPosition < 90 ? 1 : 0,
              transition: "opacity 0.3s ease",
            }}
          >
            <span
              className="text-white font-medium uppercase tracking-wider"
              style={{
                fontSize: "clamp(11px, 1.2vw, 15px)",
                background: "rgba(0,0,0,0.45)",
                backdropFilter: "blur(6px)",
                padding: "6px 16px",
                borderRadius: "6px",
                letterSpacing: "0.1em",
              }}
            >
              After
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
