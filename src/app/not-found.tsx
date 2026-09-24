import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

/**
 * Shown for any unmatched URL, and whenever a page calls `notFound()` — which
 * the project and service detail routes both do for a slug the CMS has no
 * entry for. Kept free of CMS calls so it still renders when WordPress is
 * unreachable, which is one of the ways a visitor lands here.
 *
 * Next.js only reads a `metadata` export from `layout` and `page` files, so
 * the tab title falls back to the one in `app/layout.tsx`.
 */
export default function NotFound() {
  return (
    <div className="app">
      <Header />

      <section className="relative w-full bg-[#112931] px-6 sm:px-[85px] py-[100px] lg:py-[160px] overflow-hidden">
        <div className="w-full max-w-[1440px] mx-auto flex flex-col items-start">

          {/* Breadcrumb back to the home page */}
          <nav aria-label="Breadcrumb" className="mb-10">
            <ol className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[18px] leading-[26px] list-none p-0">
              <li>
                <Link
                  href="/"
                  className="text-[#86A3AC] underline decoration-[1px] underline-offset-4 transition-colors hover:text-white"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="text-white/40">
                /
              </li>
              <li className="text-white/70" aria-current="page">
                Page Not Found
              </li>
            </ol>
          </nav>

          <span className="text-[#86A3AC] text-[28px] sm:text-[36px] leading-[38px] block mb-4">
            404
          </span>

          <h1 className="text-white text-[48px] sm:text-[72px] lg:text-[96px] leading-[1.05] max-w-[900px] mb-8">
            This page took a dive
          </h1>

          <p className="text-white/80 text-[18px] sm:text-[22px] leading-[34px] max-w-[640px] mb-12">
            The page you are looking for has been moved or no longer exists. Head
            back to the home page, or take a look at our recent projects.
          </p>

          <div className="flex flex-wrap items-center gap-6">
            <div className="btn-all relative">
              <Link
                href="/"
                className="capitalize relative text-[18px] sm:text-[22px] py-[20px] px-[40px] sm:px-[64px] leading-[30px] underline decoration-[1px] text-white text-center block"
              >
                Back To Home
              </Link>
            </div>

            <Link
              href="/projects"
              className="text-white/70 text-[18px] leading-[26px] underline decoration-[1px] underline-offset-4 transition-colors hover:text-white"
            >
              View Our Projects
            </Link>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
