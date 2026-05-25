import Image from "next/image";
import Link from "next/link";

interface HeroProps {
  className?: string;
}

export default function Hero({ className = "" }: HeroProps) {
  return (
    <section className={`relative w-full h-screen min-h-[800px] max-h-[1080px] flex flex-col font-nohemi text-white overflow-hidden bg-neutral-900 ${className}`}>
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src="http://localhost:3845/assets/bbe0165c1a7c689e876fb2baf00e098f3a895d26.png"
          alt="Luxury Pool and Landscape"
          fill
          priority
          className="object-cover"
        />
        {/* Subtle gradient overlay to ensure text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/60" />
      </div>

      {/* Top Navigation Bar */}
      <header className="relative z-10 w-full h-[115px] border-b border-neutral-300/30">
        {/* Mobile Header (Hidden on md+) */}
        <div className="md:hidden flex justify-between items-center px-6 h-full w-full">
          <button className="uppercase text-body-lg underline underline-offset-4 decoration-1">
            Menu
          </button>
          <Link href="/">
            <Image
              src="http://localhost:3845/assets/03fb9c35d5104be207d20486cf764b67b808dc5f.png"
              alt="Habitat Pools Logo"
              width={200}
              height={45}
              className="w-auto h-10 object-contain"
            />
          </Link>
          <Link href="#work" className="uppercase text-body-lg underline underline-offset-4 decoration-1">
            Work
          </Link>
        </div>

        {/* Desktop Header Grid Layout */}
        <div className="hidden md:grid h-full grid-cols-[minmax(120px,200px)_1fr_minmax(300px,412px)_1fr_minmax(150px,322px)]">
          <div className="flex items-center justify-center border-r border-neutral-300/30">
            <button className="uppercase text-body-lg underline underline-offset-8 decoration-1 hover:text-secondary-100 transition-colors">
              Menu
            </button>
          </div>
          
          {/* Spacer / Divider */}
          <div className="border-r border-neutral-300/30" />
          
          <div className="flex items-center justify-center border-r border-neutral-300/30">
            <Link href="/">
              <Image
                src="http://localhost:3845/assets/03fb9c35d5104be207d20486cf764b67b808dc5f.png"
                alt="Habitat Pools Logo"
                width={272}
                height={62}
                className="w-auto h-[50px] object-contain"
              />
            </Link>
          </div>
          
          {/* Spacer / Divider */}
          <div className="border-r border-neutral-300/30" />
          
          <div className="flex items-center justify-center">
            <Link 
              href="#work" 
              className="uppercase text-body-lg underline underline-offset-8 decoration-1 hover:text-secondary-100 transition-colors whitespace-nowrap"
            >
              See our work
            </Link>
          </div>
        </div>
      </header>

      {/* Main Hero Content Area */}
      <div className="relative z-10 flex-1 flex flex-col justify-end pb-12 md:pb-24 px-6 md:px-[96px] w-full max-w-[1920px] mx-auto">
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-12 lg:gap-8 w-full">
          
          {/* Left: Main Heading */}
          <div className="flex-1 w-full max-w-[600px]">
            <h1 className="text-display-md uppercase capitalize-first">
              Luxury Pools <br />
              <span className="block mt-4">& Landscapes</span>
            </h1>
          </div>

          {/* Center: Scroll Indicator */}
          <div className="hidden lg:flex flex-col items-center justify-end h-full absolute left-1/2 -translate-x-1/2 bottom-24">
            <div className="w-[48px] h-[48px] flex items-center justify-center border border-white/40 rotate-90 mb-6 group cursor-pointer hover:bg-white/10 transition-colors">
               <Image 
                 src="http://localhost:3845/assets/c4a973bf20ddc889497ef01a725cd97ccf781070.png"
                 alt="Scroll Down Arrow"
                 width={24}
                 height={24}
                 className="object-contain"
               />
            </div>
            <span className="uppercase text-title-sm tracking-widest [writing-mode:vertical-rl] -rotate-180 mt-8 whitespace-nowrap">
              Scroll
            </span>
          </div>

          {/* Right: Intro Paragraph */}
          <div className="flex-1 w-full max-w-[558px]">
            <p className="text-body-xl text-neutral-300 leading-[44px]">
              Experience a level of craftsmanship where the people you meet are the ones who build your project. No handoffs. No layers. Just direct involvement, every step of the way.
            </p>
          </div>
          
        </div>
      </div>
    </section>
  );
}
