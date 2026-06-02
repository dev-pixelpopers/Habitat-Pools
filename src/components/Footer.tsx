"use client";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { label: "Home", href: "#" },
    { label: "Projects", href: "#" },
    { label: "About", href: "#" },
    { label: "Reviews", href: "#" },
    { label: "Services", href: "#" },
    { label: "Contact", href: "#" },
  ];

  return (
    <footer
      className="w-full px-[85px]"
      style={{
        minHeight: "64vh",
        background: "#ffffff",
        fontFamily: "'Nohemi', sans-serif",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* ── Dark container ── */}
      <div
        className="w-full flex-1 flex items-center px-16 py-14"
        style={{
          background: "#112931",
          borderRadius: "20px",
        }}
      >
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          {/* Left — Heading + Socials */}
          <div className="flex flex-col">
            <h2
              style={{
                fontSize: "44px",
                lineHeight: "50px",
                color: "#ffffff",
                fontWeight: 400,
                marginBottom: "28px",
              }}
            >
              Talk To Us About
              <br />
              Your Project
            </h2>

            <div className="flex gap-6">
              <a
                href="#"
                style={{
                  fontSize: "20px",
                  color: "#86A3AC",
                  textDecoration: "none",
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
                Instagram
              </a>
              <a
                href="#"
                style={{
                  fontSize: "20px",
                  color: "#86A3AC",
                  textDecoration: "none",
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
                Facebook
              </a>
            </div>
          </div>

          {/* Center — Back To Top */}
          <div className="flex flex-col items-center justify-center">
            <button
              onClick={scrollToTop}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: "#ffffff",
                fontFamily: "'Nohemi', sans-serif",
                fontSize: "20px",
                transition: "opacity 0.2s ease",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.opacity = "0.7")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.opacity = "1")
              }
            >
              {/* Up arrow */}
              {/* <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 19V5" />
                <path d="M5 12l7-7 7 7" />
              </svg> */}
              <img className="w-[20px] h-[20px]" src="/images/back-top.svg" alt="" />
              Back To Top
            </button>
          </div>

          {/* Right — Nav Links (2 columns) */}
          <div
            className="grid grid-cols-2 gap-x-12 gap-y-4"
            style={{ justifySelf: "end" }}
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                style={{
                  fontSize: "20px",
                  lineHeight: "28px",
                  color: "#ffffff",
                  textDecoration: "none",
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
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Copyright bar ── */}
      <div
        className="w-full flex justify-center"
        style={{
          paddingTop: "30px",
          paddingBottom: "30px",
        }}
      >
        <p
          style={{
            fontSize: "18px",
            lineHeight: "22px",
            color: "#112931",
            letterSpacing: "0.04em",
          }}
        >
          © 2026 – Copyright HABITAT
        </p>
      </div>
    </footer>
  );
}
