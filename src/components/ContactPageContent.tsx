"use client";

import { useState, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { ContactContent } from "@/lib/contact";
import { definedOnly, telHref } from "@/lib/utils";
import { sendContact } from "@/lib/send-contact";

gsap.registerPlugin(ScrollTrigger);

/* ── Fallback content, used when the CMS has nothing for a section ── */

const FALLBACK = {
  banner: {
    tagline: "Contact",
    heading: "Get In Touch",
    backgroundImage: "/images/contact-banner.jpg",
  },
  details: {
    tagline: "Have A Project Idea?",
    heading: "Let's Discuss It Together",
    callLabel: "Call Us",
    phoneNumber: "( 480 ) 420 7515",
    respondents: "Colby Myers\nCarter Myers",
    emailLabel: "Send An Email To",
    email: "habitatpoolsaz@gmail.com",
    locationLabel: "Visit Us",
    location: "Located in\nGilbert, Arizona.",
    hoursLabel: "Working Hours",
    hours: "Mon – Fri: 8:00 AM – 6:00 PM\nSat: 9:00 AM – 2:00 PM",
  },
};

/** Shared styling for the contact detail blocks. */
const LABEL_STYLE = {
  fontSize: "clamp(17px, 7.03px + 0.786vw, 22px)",
  lineHeight: "clamp(20px, 7.66px + 0.858vw, 24px)",
  color: "#0a0a0a",
  marginBottom: "4px",
} as const;

const VALUE_STYLE = {
  fontSize: "clamp(18px, 8.3px + 0.929vw, 26px)",
  lineHeight: "clamp(26px, 11.5px + 1.286vw, 36px)",
  color: "#0a0a0a",
} as const;

const LINK_STYLE = {
  fontSize: "clamp(18px, 8.3px + 0.929vw, 26px)",
  lineHeight: "clamp(24px, 9.58px + 1.072vw, 30px)",
  color: "#0a0a0a",
  textDecoration: "none",
  borderBottom: "1px solid #0a0a0a",
  paddingBottom: "2px",
  transition: "color 0.2s ease",
} as const;

export default function ContactPageContent({
  content,
}: {
  content: ContactContent;
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);
  const [focused, setFocused] = useState<string | null>(null);

  const heroRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const banner = { ...FALLBACK.banner, ...definedOnly(content.banner) };
  const details = { ...FALLBACK.details, ...definedOnly(content.details) };

  useGSAP(() => {
    if (!headingRef.current) return;
    gsap.from(headingRef.current, {
      y: 80,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      delay: 0.3,
    });
  }, { scope: heroRef });

  useGSAP(() => {
    if (!infoRef.current || !formRef.current) return;
    gsap.from(infoRef.current, {
      x: -60,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: infoRef.current,
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
    });
    gsap.from(formRef.current, {
      x: 60,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: formRef.current,
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
    });
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setError(null);
    try {
      await sendContact({ ...formData, company });
      setStatus("sent");
      setTimeout(() => setStatus("idle"), 3000);
      setFormData({ name: "", email: "", phone: "", service: "", message: "" });
    } catch (err) {
      setStatus("idle");
      setError(err instanceof Error ? err.message : "Sorry, your message could not be sent.");
    }
  };

  /* Shared input style */
  const inputStyle = (field: string) => ({
    width: "100%",
    padding: "clamp(14px, 13.02px + 0.262vw, 18px) clamp(16px, 15.02px + 0.262vw, 20px)",
    fontSize: "clamp(16px, 15.51px + 0.131vw, 18px)",
    lineHeight: "clamp(24px, 23.51px + 0.131vw, 26px)",
    fontFamily: "'Nohemi', sans-serif",
    color: "#112931",
    background: "transparent",
    border: `1px solid ${focused === field ? "#86A3AC" : "#112931"}`,
    borderRadius: "6px",
    outline: "none",
    transition: "border-color 0.25s ease",
    boxSizing: "border-box" as const,
  });

  return (
    <div className="app">
      <Header />

      {/* ── Hero Section ── */}
      <section
        ref={heroRef}
        className="relative w-full flex items-end overflow-hidden"
        style={{
          height: "70vh",
          minHeight: "clamp(360px, 325.68px + 9.151vw, 500px)",
          background: "#112931",
          fontFamily: "'Nohemi', sans-serif",
        }}
      >
        <div className="absolute inset-0 z-0">
          <img src={banner.backgroundImage} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 w-full px-(--gutter) pb-[clamp(40px,30.19px_+_2.615vw,80px)]">
          <span className="text-[#86A3AC] text-(length:--fs-eyebrow) leading-(--lh-eyebrow) block mb-4">{banner.tagline}</span>
          <h1 ref={headingRef} className="text-white text-(length:--fs-display) leading-(--lh-display) max-w-[9.375em] whitespace-pre-line">
            {banner.heading}
          </h1>
        </div>
      </section>

      {/* ── Contact Form Section ── */}
      <section
        className="w-full flex items-center px-(--gutter) min-h-screen max-lg:min-h-0 overflow-x-clip"
        style={{
          background: "#ffffff",
          fontFamily: "'Nohemi', sans-serif",
        }}
      >
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-[clamp(40px,34.12px_+_1.569vw,64px)] items-center py-[clamp(56px,45.22px_+_2.876vw,100px)]">
          {/* Left Column — Info */}
          <div ref={infoRef} className="flex flex-col">
            <span
              style={{
                fontSize: "clamp(18px, 8.3px + 0.929vw, 26px)",
                lineHeight: "clamp(24px, 9.58px + 1.072vw, 30px)",
                color: "#0a0a0a",
              }}
            >
              {details.tagline}
            </span>

            <h2
              className="whitespace-pre-line"
              style={{
                fontSize: "var(--fs-h2)",
                lineHeight: "var(--lh-h2)",
                color: "#0a0a0a",
                fontWeight: 400,
                marginTop: "12px",
                marginBottom: "clamp(28px, 23.1px + 1.308vw, 48px)",
              }}
            >
              {details.heading}
            </h2>

            {/* Contact details */}
            <div className="flex flex-col gap-[clamp(32px,24.16px_+_2.092vw,64px)]">
              {/* Call Us */}
              <div>
                <p style={LABEL_STYLE}>{details.callLabel}</p>
                <a href={telHref(details.phoneNumber)} style={LINK_STYLE}>
                  {details.phoneNumber}
                </a>
                <p className="whitespace-pre-line" style={{ ...VALUE_STYLE, marginBottom: "4px" }}>
                  {details.respondents}
                </p>
              </div>

              {/* Email */}
              <div>
                <p style={LABEL_STYLE}>{details.emailLabel}</p>
                <a href={`mailto:${details.email}`} className="break-all" style={LINK_STYLE}>
                  {details.email}
                </a>
              </div>

              {/* Address */}
              <div>
                <p style={LABEL_STYLE}>{details.locationLabel}</p>
                <p className="whitespace-pre-line" style={VALUE_STYLE}>
                  {details.location}
                </p>
              </div>

              {/* Hours */}
              <div>
                <p style={LABEL_STYLE}>{details.hoursLabel}</p>
                <p className="whitespace-pre-line" style={VALUE_STYLE}>
                  {details.hours}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column — Form */}
          <div ref={formRef}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Name */}
              <div style={{ position: "relative" }}>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocused("name")}
                  onBlur={() => setFocused(null)}
                  required
                  style={inputStyle("name")}
                />
              </div>

              {/* Email */}
              <div style={{ position: "relative" }}>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused(null)}
                  required
                  style={inputStyle("email")}
                />
              </div>

              {/* Phone */}
              <div style={{ position: "relative" }}>
                <input
                  id="contact-phone"
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onFocus={() => setFocused("phone")}
                  onBlur={() => setFocused(null)}
                  style={inputStyle("phone")}
                />
              </div>

              {/* Service Select */}
              <div style={{ position: "relative" }}>
                <select
                  id="contact-service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  onFocus={() => setFocused("service")}
                  onBlur={() => setFocused(null)}
                  style={{
                    ...inputStyle("service"),
                    appearance: "none",
                    cursor: "pointer",
                    color: formData.service ? "#112931" : "#888",
                  }}
                >
                  <option value="" disabled>Select A Service</option>
                  <option value="pool-design">Pool Design & Build</option>
                  <option value="landscape">Landscape Design</option>
                  <option value="remodel">Remodel & Upgrades</option>
                  <option value="consultation">Free Consultation</option>
                </select>
                {/* Custom dropdown arrow */}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#112931"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    position: "absolute",
                    right: "clamp(16px, 15.02px + 0.262vw, 20px)",
                    top: "50%",
                    transform: "translateY(-50%)",
                    pointerEvents: "none",
                  }}
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </div>

              {/* Message */}
              <div style={{ position: "relative" }}>
                <textarea
                  id="contact-message"
                  name="message"
                  placeholder="Tell Us About Your Project"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused(null)}
                  style={{
                    ...inputStyle("message"),
                    resize: "none",
                  }}
                />
              </div>

              {/* Honeypot — hidden from visitors, catches bots */}
              <input
                type="text"
                name="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
              />

              {/* Submit */}
              <div className="btn-all btn-dark mt-[20px] relative">
                <button
                  id="contact-submit"
                  type="submit"
                  disabled={status === "sending"}
                  className="capitalize relative text-(length:--btn-fs) py-(--btn-py) px-(--btn-px) leading-(--btn-lh) text-black text-center cursor-pointer disabled:cursor-wait disabled:opacity-60"
                  style={{ fontFamily: "'Nohemi', sans-serif", background: "transparent", border: "none" }}
                >
                  <div className="flex items-center justify-center gap-2">
                    <img className="size-[clamp(28px,26.04px_+_0.523vw,36px)]" src="/images/arrow-right.svg" alt="" />
                    <span>
                      {status === "sending" ? "Sending..." : status === "sent" ? "Message Sent!" : "Submit"}
                    </span>
                  </div>
                </button>
              </div>
              {error && (
                <p role="alert" style={{ color: "#c0392b" }}>
                  {error}
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
