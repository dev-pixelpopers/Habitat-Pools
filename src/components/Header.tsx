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
          style={{
            display: "grid",
            gridTemplateColumns: "320px 1fr 320px",
            alignItems: "stretch",
            borderBottom: "1px solid rgba(255,255,255,0.25)",
            gap: "400px",
          }}
        >
          {/* Left — Menu Button */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              paddingTop: "40px",
              paddingBottom: "40px",
              paddingLeft: "85px",
              paddingRight: "40px",
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
                fontSize: "20px",
                lineHeight: "28px",
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
              paddingTop: "40px",
              paddingBottom: "40px",
              paddingLeft: "40px",
              paddingRight: "40px",
              borderLeft: "1px solid rgba(255,255,255,0.25)",
              borderRight: "1px solid rgba(255,255,255,0.25)",
            }}
          >
            <Link href="/">
              <img
                src="/images/logo-main.png"
                alt="HABITAT Pool & Landscape"
                style={{
                  height: "40px",
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
              paddingTop: "40px",
              paddingBottom: "40px",
              paddingLeft: "40px",
              paddingRight: "85px",
              borderLeft: "1px solid rgba(255,255,255,0.25)",
            }}
          >
            <Link
              href="/projects"
              style={{
                color: "#ffffff",
                fontFamily: "'Nohemi', sans-serif",
                fontSize: "20px",
                lineHeight: "28px",
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
              See Our Work
            </Link>
          </div>
        </div>
      </header>

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
              gap: "420px",
              paddingLeft: "85px",
              paddingRight: "85px",
              borderBottom: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "320px 1fr 320px",
                alignItems: "stretch",
              }}
            >
              {/* Close */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  paddingTop: "40px",
                  paddingBottom: "40px",
                  paddingRight: "40px",
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
                    fontSize: "20px",
                    lineHeight: "28px",
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
                  paddingTop: "40px",
                  paddingBottom: "40px",
                  paddingLeft: "40px",
                  paddingRight: "40px",
                }}
              >
                <Link href="/">
                  <img
                    src="/images/logo-main.png"
                    alt="HABITAT Pool & Landscape"
                    style={{ height: "40px", width: "auto", display: "block" }}
                  />
                </Link>
              </div>

              {/* Empty right cell */}
              <div
                style={{
                  borderLeft: "1px solid rgba(255,255,255,0.15)",
                  paddingTop: "40px",
                  paddingBottom: "40px",
                  paddingLeft: "40px",
                }}
              />
            </div>
          </div>

          {/* Nav Links */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              paddingLeft: "85px",
              paddingRight: "85px",
              gap: "8px",
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontSize: "56px",
                  lineHeight: "68px",
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
              paddingLeft: "85px",
              paddingRight: "85px",
              paddingBottom: "40px",
              display: "flex",
              gap: "32px",
            }}
          >
            {["Instagram", "Facebook"].map((s) => (
              <a
                key={s}
                href="#"
                style={{
                  fontSize: "20px",
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
                {s}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
