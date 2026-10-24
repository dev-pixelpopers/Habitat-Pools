"use client";

import { useState } from "react";
import { telHref } from "@/lib/utils";

interface GetInTouchProps {
  subHeading?: string;
  heading?: string;
  phoneLabel?: string;
  phoneNumber?: string;
  emailLabel?: string;
  email?: string;
  text?: string;
}

export default function GetInTouch({
  subHeading = "Wanna transform your outdoor space? Let’s talk.",
  heading = "Schedule Your Free Consultation Today",
  phoneLabel = "Call Us",
  phoneNumber = "( 480 ) 420 7515",
  emailLabel = "Send An Email To",
  email = "habitatpoolsaz@gmail.com",
  text = "Or complete our online contact form, and a member of our team will get back to you within 24 hours to discuss your project.",
}: GetInTouchProps) {
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
      className="w-full flex items-center px-(--gutter) min-h-screen max-lg:min-h-0 max-lg:py-(--section-y)"
      style={{
        background: "#ffffff",
        fontFamily: "'Nohemi', sans-serif",
      }}
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-[clamp(40px,34.12px_+_1.569vw,64px)] items-center">
        {/* ── Left Column ── */}
        <div className="flex flex-col">
          {/* Sub-label */}
          <span
            style={{
              fontSize: "clamp(18px, 8.3px + 0.929vw, 26px)",
              lineHeight: "clamp(24px, 9.58px + 1.072vw, 30px)",
              color: "#0a0a0a",
              fontFamily: "'Nohemi', sans-serif",
            }}
          >
            {subHeading}
          </span>

          {/* Main heading */}
          <h2
            style={{
              fontSize: "var(--fs-h2)",
              lineHeight: "var(--lh-h2)",
              color: "#0a0a0a",
              fontFamily: "'Nohemi', sans-serif",
              fontWeight: 400,
              marginTop: "12px",
              marginBottom: "clamp(28px, 23.1px + 1.308vw, 48px)",
            }}
          >
            {heading}
          </h2>

          {/* Contact details */}
          <div className="flex flex-col gap-[clamp(32px,24.16px_+_2.092vw,64px)]">
            {/* Call Us */}
            <div>
              <p
                style={{
                  fontSize: "clamp(17px, 7.03px + 0.786vw, 22px)",
                  lineHeight: "clamp(20px, 7.66px + 0.858vw, 24px)",
                  color: "#0a0a0a",
                  fontFamily: "'Nohemi', sans-serif",
                  marginBottom: "4px",
                }}
              >
                {phoneLabel}
              </p>
              <a
                href={telHref(phoneNumber)}
                style={{
                  fontSize: "clamp(18px, 8.3px + 0.929vw, 26px)",
                  lineHeight: "clamp(24px, 9.58px + 1.072vw, 30px)",
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
                {phoneNumber}
              </a>
            </div>

            {/* Email */}
            <div>
              <p
                style={{
                  fontSize: "clamp(17px, 7.03px + 0.786vw, 22px)",
                  lineHeight: "clamp(20px, 7.66px + 0.858vw, 24px)",
                  color: "#0a0a0a",
                  fontFamily: "'Nohemi', sans-serif",
                  marginBottom: "4px",
                }}
              >
                {emailLabel}
              </p>
              <a
                href={`mailto:${email}`}
                className="break-all"
                style={{
                  fontSize: "clamp(18px, 8.3px + 0.929vw, 26px)",
                  lineHeight: "clamp(24px, 9.58px + 1.072vw, 30px)",
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
                {email}
              </a>

              
            </div>

            <div>
              <span
            style={{
              fontSize: "clamp(16px, 15.51px + 0.131vw, 18px)",
              lineHeight: "clamp(26px, 25.02px + 0.262vw, 30px)",
              color: "#0a0a0a",
              fontFamily: "'Nohemi', sans-serif",
            }}
          >
           {text}
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
                  padding: "clamp(14px, 13.02px + 0.262vw, 18px) clamp(16px, 15.02px + 0.262vw, 20px)",
                  fontSize: "clamp(16px, 15.51px + 0.131vw, 18px)",
                  lineHeight: "clamp(24px, 23.51px + 0.131vw, 26px)",
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
                  padding: "clamp(14px, 13.02px + 0.262vw, 18px) clamp(16px, 15.02px + 0.262vw, 20px)",
                  fontSize: "clamp(16px, 15.51px + 0.131vw, 18px)",
                  lineHeight: "clamp(24px, 23.51px + 0.131vw, 26px)",
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
                  padding: "clamp(14px, 13.02px + 0.262vw, 18px) clamp(16px, 15.02px + 0.262vw, 20px)",
                  fontSize: "clamp(16px, 15.51px + 0.131vw, 18px)",
                  lineHeight: "clamp(24px, 23.51px + 0.131vw, 26px)",
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
                  padding: "clamp(14px, 13.02px + 0.262vw, 18px) clamp(16px, 15.02px + 0.262vw, 20px)",
                  fontSize: "clamp(16px, 15.51px + 0.131vw, 18px)",
                  lineHeight: "clamp(24px, 23.51px + 0.131vw, 26px)",
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
                className="capitalize relative text-(length:--btn-fs) py-(--btn-py) px-(--btn-px) leading-(--btn-lh) text-black text-center "
                style={{ fontFamily: "'Nohemi', sans-serif" }}
              >
                <div className="flex items-center justify-center gap-2">
                  <img className="size-[clamp(28px,26.04px_+_0.523vw,36px)]" src="/images/arrow-right.svg" alt="arrow-right" />
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
