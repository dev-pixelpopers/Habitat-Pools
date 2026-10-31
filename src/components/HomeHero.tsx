/** MIME type from the file extension — the CMS video is an .mp4, not WebM. */
function videoType(src: string) {
  const ext = src.split("?")[0].split(".").pop()?.toLowerCase();
  return ext === "webm" ? "video/webm" : "video/mp4";
}

interface HomeHeroProps {
  heading?: string;
  paragraph?: string;
  videoSrc?: string;
  posterSrc?: string;
}

/**
 * Home hero: the video expands from a circle to fill the viewport, then the
 * headline block slides up. Split out of the page so the page itself can stay
 * a server component and fetch CMS content.
 *
 * The intro is plain CSS (`.hero-intro-*` in globals.css) rather than GSAP so
 * it starts on first paint instead of after hydration, and the video grows by
 * `clip-path` over a full-size element so the expansion never shifts layout.
 */
export default function HomeHero({
  heading = "Custom Pool Builders In Phoenix, Arizona",
  paragraph = "We design and build custom pools, luxury landscapes, and complete outdoor living spaces throughout Gilbert, Queen Creek, Mesa, Scottsdale, Tempe, Paradise Valley, Phoenix, and the surrounding East & West Valley.",
  videoSrc = "/videos/HeroVideo.webm",
  posterSrc,
}: HomeHeroProps) {
  return (
    <section className="relative h-screen w-full overflow-hidden px-(--gutter) pb-[clamp(24px,17.63px_+_1.7vw,50px)] flex flex-col justify-end items-center">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        poster={posterSrc}
        className="hero-intro-video absolute inset-0 w-full h-full object-cover"
      >
        <source src={videoSrc} type={videoType(videoSrc)} />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="hero-intro-content relative z-10 flex items-end">
        {/* Below 1280 the three columns stack (heading, then copy); the
            decorative arrow only has room alongside them on wide screens. */}
        <div className="flex flex-col items-start gap-6 xl:flex-row xl:items-center xl:gap-4 justify-center w-full">
          {/* First Column */}
          <div className="xl:w-[40%]">
            <h1 className="text-white text-[clamp(38px,5.143vw_-_17.97px,80px)] leading-[clamp(36px,4.893vw_-_17.11px,76.1px)] font-normal whitespace-pre-line">
              {heading}
            </h1>
          </div>

          {/* Second Column */}
          <div className="hidden xl:flex justify-center xl:w-[20%]">
            <div className="w-[clamp(140px,71.61px_+_18.236vw,419px)]">
              <img src="/images/arrow.png" alt="Arrow" width={419} height={181} className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Third Column */}
          <div className="xl:w-[40%]">
            <p className="text-white text-[clamp(16px,7.03px_+_0.786vw,22px)] leading-[clamp(26px,14.05px_+_1.572vw,44px)] capitalize font-normal">
              {paragraph}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
