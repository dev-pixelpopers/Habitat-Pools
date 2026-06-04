"use client";

import { useState, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger);


export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const heroRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: "", email: "", phone: "", service: "", message: "" });
  };

  /* Shared input style */
  const inputStyle = (field: string) => ({
    width: "100%",
    padding: "18px 20px",
    fontSize: "18px",
    lineHeight: "26px",
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
          minHeight: "500px",
          background: "#112931",
          fontFamily: "'Nohemi', sans-serif",
        }}
      >
        <div className="absolute inset-0 z-0">
          <img src="/images/service-02.png" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 w-full px-[85px] pb-[80px]">
          <span className="text-[#86A3AC] text-[36px] leading-[38px] block mb-4">Contact</span>
          <h1 ref={headingRef} className="text-white text-[96px] leading-[88px] max-w-[900px]">
            Get In Touch
          </h1>
        </div>
      </section>

      {/* ── Contact Form Section ── */}
      <section
        className="w-full flex items-center px-[85px]"
        style={{
          minHeight: "100vh",
          background: "#ffffff",
          fontFamily: "'Nohemi', sans-serif",
        }}
      >
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-[100px]">
          {/* Left Column — Info */}
          <div ref={infoRef} className="flex flex-col">
            <span
              style={{
                fontSize: "26px",
                lineHeight: "30px",
                color: "#0a0a0a",
              }}
            >
              Have A Project Idea?
            </span>

            <h2
              style={{
                fontSize: "66px",
                lineHeight: "72px",
                color: "#0a0a0a",
                fontWeight: 400,
                marginTop: "12px",
                marginBottom: "48px",
              }}
            >
              Let&apos;s Discuss It Together
            </h2>

            {/* Contact details */}
            <div className="flex flex-col gap-16">
              {/* Call Us */}
              <div>
                <p
                  style={{
                    fontSize: "22px",
                    lineHeight: "24px",
                    color: "#0a0a0a",
                    marginBottom: "4px",
                  }}
                >
                  Call Us
                </p>
                <a
                  href="tel:+4804207515"
                  style={{
                    fontSize: "26px",
                    lineHeight: "30px",
                    color: "#0a0a0a",
                    textDecoration: "none",
                    borderBottom: "1px solid #0a0a0a",
                    paddingBottom: "2px",
                    transition: "color 0.2s ease",
                  }}
                >
                  ( 480 ) 420 7515
                </a>
              </div>

              {/* Email */}
              <div>
                <p
                  style={{
                    fontSize: "22px",
                    lineHeight: "24px",
                    color: "#0a0a0a",
                    marginBottom: "4px",
                  }}
                >
                  Send An Email To
                </p>
                <a
                  href="mailto:info@habitatpools.com"
                  style={{
                    fontSize: "26px",
                    lineHeight: "30px",
                    color: "#0a0a0a",
                    textDecoration: "none",
                    borderBottom: "1px solid #0a0a0a",
                    paddingBottom: "2px",
                    transition: "color 0.2s ease",
                  }}
                >
                  habitatpoolsaz@gmail.com
                </a>
              </div>

              {/* Address */}
              <div>
                <p
                  style={{
                    fontSize: "22px",
                    lineHeight: "24px",
                    color: "#0a0a0a",
                    marginBottom: "4px",
                  }}
                >
                  Visit Us
                </p>
                <p
                  style={{
                    fontSize: "26px",
                    lineHeight: "36px",
                    color: "#0a0a0a",
                  }}
                >
                  123 Pool Lane, Suite 100
                  <br />
                  Los Angeles, CA 90001
                </p>
              </div>

              {/* Hours */}
              <div>
                <p
                  style={{
                    fontSize: "22px",
                    lineHeight: "24px",
                    color: "#0a0a0a",
                    marginBottom: "4px",
                  }}
                >
                  Working Hours
                </p>
                <p
                  style={{
                    fontSize: "26px",
                    lineHeight: "36px",
                    color: "#0a0a0a",
                  }}
                >
                  Mon – Fri: 8:00 AM – 6:00 PM
                  <br />
                  Sat: 9:00 AM – 2:00 PM
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
                    right: "20px",
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

              {/* Submit */}
              <div className="btn-all btn-dark mt-[20px] relative">
                <button
                  id="contact-submit"
                  type="submit"
                  className="capitalize relative text-[22px] py-[20px] px-[64px] leading-[30px] text-black text-center cursor-pointer"
                  style={{ fontFamily: "'Nohemi', sans-serif", background: "transparent", border: "none" }}
                >
                  <div className="flex items-center justify-center gap-2">
                    <img className="w-[36px] h-[36px]" src="/images/arrow-right.svg" alt="" />
                    <span>{submitted ? "Message Sent!" : "Submit"}</span>
                  </div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
