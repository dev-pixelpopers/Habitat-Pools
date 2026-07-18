"use client";

import { useState } from "react";

export default function GetInTouch() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <section
      className="w-full flex items-center px-[85px]"
      style={{
        minHeight: "100vh",
        background: "#ffffff",
        fontFamily: "'Nohemi', sans-serif",
      }}
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* ── Left Column ── */}
        <div className="flex flex-col">
          {/* Sub-label */}
          <span
            style={{
              fontSize: "26px",
              lineHeight: "30px",
              color: "#0a0a0a",
              fontFamily: "'Nohemi', sans-serif",
            }}
          >
            Wanna transform your outdoor space? Let’s talk.
          </span>

          {/* Main heading */}
          <h2
            style={{
              fontSize: "66px",
              lineHeight: "72px",
              color: "#0a0a0a",
              fontFamily: "'Nohemi', sans-serif",
              fontWeight: 400,
              marginTop: "12px",
              marginBottom: "48px",
            }}
          >
            Schedule Your Free Consultation Today
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
                  fontFamily: "'Nohemi', sans-serif",
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
                  fontFamily: "'Nohemi', sans-serif",
                  textDecoration: "none",
                  borderBottom: "1px solid #0a0a0a",
                  paddingBottom: "2px",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color =
                  "#0a0a0a")
                }
                onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color =
                  "#0a0a0a")
                }
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
                  fontFamily: "'Nohemi', sans-serif",
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
                  fontFamily: "'Nohemi', sans-serif",
                  textDecoration: "none",
                  borderBottom: "1px solid #0a0a0a",
                  paddingBottom: "2px",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color =
                  "#0a0a0a")
                }
                onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color =
                  "#0a0a0a")
                }
              >
                habitatpoolsaz@gmail.com
              </a>

              
            </div>

            <div>
              <span
            style={{
              fontSize: "18px",
              lineHeight: "30px",
              color: "#0a0a0a",
              fontFamily: "'Nohemi', sans-serif",
            }}
          >
           Or complete our online contact form, and a member of our team will get back to you within 24 hours to discuss your project.
          </span>
            </div>
          </div>
        </div>

        {/* ── Right Column – Form ── */}
        <div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Name */}
            <div style={{ position: "relative" }}>
              <input
                id="git-name"
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => setFocused("name")}
                onBlur={() => setFocused(null)}
                required
                style={{
                  width: "100%",
                  padding: "18px 20px",
                  fontSize: "18px",
                  lineHeight: "26px",
                  fontFamily: "'Nohemi', sans-serif",
                  color: "#112931",
                  background: "transparent",
                  border: `1px solid ${focused === "name" ? "#d9d9d9" : "#112931"}`,
                  borderRadius: "6px",
                  outline: "none",
                  transition: "border-color 0.25s ease",
                  boxSizing: "border-box",
                }}
              />
            </div>

            {/* Email */}
            <div style={{ position: "relative" }}>
              <input
                id="git-email"
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setFocused("email")}
                onBlur={() => setFocused(null)}
                required
                style={{
                  width: "100%",
                  padding: "18px 20px",
                  fontSize: "18px",
                  lineHeight: "26px",
                  fontFamily: "'Nohemi', sans-serif",
                  color: "#112931",
                  background: "transparent",
                  border: `1px solid ${focused === "email" ? "#d9d9d9" : "#112931"}`,
                  borderRadius: "6px",
                  outline: "none",
                  transition: "border-color 0.25s ease",
                  boxSizing: "border-box",
                }}
              />
            </div>

            {/* Phone */}
            <div style={{ position: "relative" }}>
              <input
                id="git-phone"
                type="tel"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                onFocus={() => setFocused("phone")}
                onBlur={() => setFocused(null)}
                style={{
                  width: "100%",
                  padding: "18px 20px",
                  fontSize: "18px",
                  lineHeight: "26px",
                  fontFamily: "'Nohemi', sans-serif",
                  color: "#112931",
                  background: "transparent",
                  border: `1px solid ${focused === "phone" ? "#d9d9d9" : "#112931"}`,
                  borderRadius: "6px",
                  outline: "none",
                  transition: "border-color 0.25s ease",
                  boxSizing: "border-box",
                }}
              />
            </div>

            {/* Message */}
            <div style={{ position: "relative" }}>
              <textarea
                id="git-message"
                name="message"
                placeholder="Message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                onFocus={() => setFocused("message")}
                onBlur={() => setFocused(null)}
                style={{
                  width: "100%",
                  padding: "18px 20px",
                  fontSize: "18px",
                  lineHeight: "26px",
                  fontFamily: "'Nohemi', sans-serif",
                  color: "#112931",
                  background: "transparent",
                  border: `1px solid ${focused === "message" ? "#d9d9d9" : "#112931"}`,
                  borderRadius: "6px",
                  outline: "none",
                  resize: "none",
                  transition: "border-color 0.25s ease",
                  boxSizing: "border-box",
                }}
              />
            </div>

            {/* Submit button — consistent btn-all style */}
            <div className="btn-all btn-dark mt-[20px] relative">
              <button
                id="git-submit"
                type="submit"
                className="capitalize relative text-[22px] py-[20px] px-[64px] leading-[30px] text-black text-center "
                style={{ fontFamily: "'Nohemi', sans-serif" }}
              >
                <div className="flex items-center justify-center gap-2">
                  <img className="w-[36px] h-[36px]" src="/images/arrow-right.svg" alt="arrow-right" />
                  <span>
                    {submitted ? "Message Sent!" : "Submit"}
                  </span>
                </div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
