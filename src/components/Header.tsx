"use client";

import { useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "About", href: "/about" },
    { label: "Reviews", href: "/reviews" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" },
  ];

  useGSAP(() => {
    gsap.to("header", {
      delay: 2,
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
    });
  }, []);

  return (
    <>
      {/* ── Header ── */}
      <header className="absolute top-0 left-0 w-full z-50 -translate-y-100"
      >
        <div
          className="grid items-stretch grid-cols-[clamp(96px,41.1px_+_14.641vw,320px)_1fr_clamp(96px,41.1px_+_14.641vw,320px)] gap-[clamp(0px,26.144vw_-_98.04px,400px)] max-lg:grid-cols-[1fr_auto_1fr] max-lg:gap-0"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.25)" }}
        >
          {/* Left — Menu Button */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              paddingTop: "clamp(16px,10.12px + 1.569vw,40px)",
              paddingBottom: "clamp(16px,10.12px + 1.569vw,40px)",
              paddingLeft: "var(--gutter)",
              paddingRight: "clamp(12px,5.13px + 1.831vw,40px)",
              borderRight: "1px solid rgba(255,255,255,0.25)",
            }}
          >
            <button
              onClick={() => setMenuOpen(true)}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: "#ffffff",
                fontFamily: "'Nohemi', sans-serif",
                fontSize: "clamp(16px,15.02px + 0.262vw,20px)",
                lineHeight: "clamp(22px,20.53px + 0.393vw,28px)",
                padding: 0,
                textDecoration: "underline",
                textDecorationThickness: "1px",
                textUnderlineOffset: "3px",
                transition: "opacity 0.2s ease",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.opacity = "0.7")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.opacity = "1")
              }
            >
              Menu
            </button>
          </div>

          {/* Center — Logo */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              paddingTop: "clamp(16px,10.12px + 1.569vw,40px)",
              paddingBottom: "clamp(16px,10.12px + 1.569vw,40px)",
              paddingLeft: "clamp(12px,5.13px + 1.831vw,40px)",
              paddingRight: "clamp(12px,5.13px + 1.831vw,40px)",
              borderLeft: "1px solid rgba(255,255,255,0.25)",
              borderRight: "1px solid rgba(255,255,255,0.25)",
            }}
          >
            <Link href="/">
              <img
                src="/images/logo-main.png"
                width={1073}
                height={244}
                alt="HABITAT Pool & Landscape"
                style={{
                  height: "clamp(28px, 20.65px + 1.961vw, 58px)",
                  width: "auto",
                  display: "block",
                }}
              />
            </Link>
          </div>

          {/* Right — See Our Work */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              paddingTop: "clamp(16px,10.12px + 1.569vw,40px)",
              paddingBottom: "clamp(16px,10.12px + 1.569vw,40px)",
              paddingLeft: "clamp(12px,5.13px + 1.831vw,40px)",
              paddingRight: "var(--gutter)",
              borderLeft: "1px solid rgba(255,255,255,0.25)",
            }}
          >
            <Link
              href="/projects"
              className="whitespace-nowrap"
              style={{
                color: "#ffffff",
                fontFamily: "'Nohemi', sans-serif",
                fontSize: "clamp(16px,15.02px + 0.262vw,20px)",
                lineHeight: "clamp(22px,20.53px + 0.393vw,28px)",
                textDecoration: "underline",
                textDecorationThickness: "1px",
                textUnderlineOffset: "3px",
                transition: "opacity 0.2s ease",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.7")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")
              }
            >
              {/* "See" is dropped on phones, where the side column is too narrow. */}
              <span className="max-sm:hidden">See </span>Our Work
            </Link>
          </div>
        </div>
      </header>

      {/* ── Floating call button — sibling of <header>, since header's own
          transform (Tailwind translate + GSAP) would otherwise become the
          containing block for a "fixed" child and break viewport pinning ── */}
      <a
        href="tel:+4804207515"
        aria-label="Call Habitat Pool & Landscape"
        className="floating-icon flex md:hidden"
        style={{
                position: "fixed",
                right: "clamp(16px, 10.12px + 1.569vw, 40px)",
                bottom: "clamp(16px, 10.12px + 1.569vw, 40px)",
                zIndex: 60,
                width: "clamp(52px, 49.06px + 0.785vw, 64px)",
                height: "clamp(52px, 49.06px + 0.785vw, 64px)",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                background: "rgba(17, 41, 49, 0.4)",       // #112931 ka translucent version
                backdropFilter: "blur(12px) saturate(180%)",
                WebkitBackdropFilter: "blur(12px) saturate(180%)", // Safari ke liye zaroori
                border: "1px solid rgba(255, 255, 255, 0.15)",
                transition: "transform 0.2s ease, background 0.2s ease",
              }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.08)";
          (e.currentTarget as HTMLAnchorElement).style.background = "rgba(17, 41, 49, 0.8)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)";
          (e.currentTarget as HTMLAnchorElement).style.background = "rgba(17, 41, 49, 0.4)";
        }}
      >
        <img
          src="/images/icons/phone.svg"
          fetchPriority="high"
          alt=""
          style={{ width: "clamp(22px, 21.02px + 0.262vw, 26px)", height: "clamp(22px, 21.02px + 0.262vw, 26px)", filter: "brightness(0) invert(1)" }}
        />
      </a>
      <a
        href="/contact"
        aria-label="Go to Contact Page"
        className="floating-icon hidden md:flex"
        style={{
                position: "fixed",
                right: "clamp(16px, 10.12px + 1.569vw, 40px)",
                bottom: "clamp(16px, 10.12px + 1.569vw, 40px)",
                zIndex: 60,
                width: "clamp(52px, 49.06px + 0.785vw, 64px)",
                height: "clamp(52px, 49.06px + 0.785vw, 64px)",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                background: "rgba(17, 41, 49, 0.4)",       // #112931 ka translucent version
                backdropFilter: "blur(12px) saturate(180%)",
                WebkitBackdropFilter: "blur(12px) saturate(180%)", // Safari ke liye zaroori
                border: "1px solid rgba(255, 255, 255, 0.15)",
                transition: "transform 0.2s ease, background 0.2s ease",
              }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.08)";
          (e.currentTarget as HTMLAnchorElement).style.background = "rgba(17, 41, 49, 0.8)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)";
          (e.currentTarget as HTMLAnchorElement).style.background = "rgba(17, 41, 49, 0.4)";
        }}
      >
        <img
          src="/images/icons/get-in-touch.png"
          fetchPriority="high"
          alt=""
          style={{ width: "clamp(22px, 21.02px + 0.262vw, 26px)", height: "clamp(22px, 21.02px + 0.262vw, 26px)", filter: "brightness(0) invert(1)" }}
        />
      </a>

      {/* ── Menu Pop-up Overlay ── */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            background: "#112931",
            display: "flex",
            flexDirection: "column",
            fontFamily: "'Nohemi', sans-serif",
          }}
        >
          {/* Top bar inside overlay — mirrors header layout */}
          <div
            style={{
              paddingLeft: "var(--gutter)",
              paddingRight: "var(--gutter)",
              borderBottom: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            <div className="grid items-stretch grid-cols-[clamp(96px,41.1px_+_14.641vw,320px)_1fr_clamp(96px,41.1px_+_14.641vw,320px)] max-lg:grid-cols-[1fr_auto_1fr]">
              {/* Close */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  paddingTop: "clamp(16px,10.12px + 1.569vw,40px)",
                  paddingBottom: "clamp(16px,10.12px + 1.569vw,40px)",
                  paddingRight: "clamp(12px,5.13px + 1.831vw,40px)",
                  borderRight: "1px solid rgba(255,255,255,0.15)",
                }}
              >
                <button
                  onClick={() => setMenuOpen(false)}
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    color: "#ffffff",
                    fontFamily: "'Nohemi', sans-serif",
                    fontSize: "clamp(16px,15.02px + 0.262vw,20px)",
                    lineHeight: "clamp(22px,20.53px + 0.393vw,28px)",
                    padding: 0,
                    textDecoration: "underline",
                    textDecorationThickness: "1px",
                    textUnderlineOffset: "3px",
                    transition: "opacity 0.2s ease",
                  }}
                  onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.opacity =
                    "0.7")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLButtonElement).style.opacity = "1")
                  }
                >
                  Close
                </button>
              </div>

              {/* Logo */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingTop: "clamp(16px,10.12px + 1.569vw,40px)",
                  paddingBottom: "clamp(16px,10.12px + 1.569vw,40px)",
                  paddingLeft: "clamp(12px,5.13px + 1.831vw,40px)",
                  paddingRight: "clamp(12px,5.13px + 1.831vw,40px)",
                }}
              >
                <Link href="/">
                  <img
                    src="/images/logo-main.png"
                    width={1073}
                    height={244}
                    alt="HABITAT Pool & Landscape"
                    style={{ height: "clamp(28px, 20.65px + 1.961vw, 58px)", width: "auto", display: "block" }}
                  />
                </Link>
              </div>

              {/* Empty right cell */}
              <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              paddingTop: "clamp(16px,10.12px + 1.569vw,40px)",
              paddingBottom: "clamp(16px,10.12px + 1.569vw,40px)",
              paddingLeft: "clamp(12px,5.13px + 1.831vw,40px)",
              paddingRight: "var(--gutter)",
              borderLeft: "1px solid rgba(255,255,255,0.25)",
            }}
          >
            <Link
              href="tel:+4804207515"
              style={{
                color: "#ffffff",
                fontFamily: "'Nohemi', sans-serif",
                fontSize: "clamp(16px,15.02px + 0.262vw,20px)",
                lineHeight: "clamp(22px,20.53px + 0.393vw,28px)",
                textDecoration: "underline",
                textDecorationThickness: "1px",
                textUnderlineOffset: "3px",
                transition: "opacity 0.2s ease",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.7")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")
              }
            >
              Call Us
            </Link>
          </div>
            </div>
          </div>

          {/* Nav Links */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              paddingLeft: "var(--gutter)",
              paddingRight: "var(--gutter)",
              gap: "8px",
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontSize: "clamp(36px, 3.6vw - 12.58px, 56px)",
                  lineHeight: "clamp(44px, 4.372vw - 15.29px, 68px)",
                  color: "#ffffff",
                  textDecoration: "none",
                  fontWeight: 400,
                  borderBottom: "1px solid rgba(255,255,255,0.12)",
                  paddingBottom: "8px",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color =
                  "#86A3AC")
                }
                onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color =
                  "#ffffff")
                }
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Bottom social links */}
          <div
            style={{
              paddingLeft: "var(--gutter)",
              paddingRight: "var(--gutter)",
              paddingBottom: "clamp(16px,10.12px + 1.569vw,40px)",
              display: "flex",
              gap: "clamp(20px, 17.06px + 0.785vw, 32px)",
            }}
          >
            {[
              { label: "Instagram", href: "https://www.instagram.com/habitatpoolsaz/" },
              { label: "Facebook", href: "https://www.facebook.com/Habitat-Pools-61561546888937/" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: "clamp(16px,15.02px + 0.262vw,20px)",
                  color: "#86A3AC",
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color =
                  "#ffffff")
                }
                onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color =
                  "#86A3AC")
                }
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
