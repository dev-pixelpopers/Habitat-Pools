"use client";

import { useState, type ReactNode } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQItem[];
  theme?: "light" | "dark";
}

export default function FAQSection({ faqs, theme = "light" }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const isDark = theme === "dark";
  const bgStyle = isDark ? "#ffffff" : "#112931";
  const textColor = isDark ? "#112931" : "#ffffff";
  const subTextColor = isDark ? "rgba(17, 41, 49, 0.7)" : "rgba(255, 255, 255, 0.7)";
  const borderColor = isDark ? "rgba(17, 41, 49, 0.15)" : "rgba(255, 255, 255, 0.15)";
  const tagColor = "#86A3AC";

  const renderAnswer = (raw: string): ReactNode[] => {
    const output: ReactNode[] = [];
    const chunks = raw.split("{br}").map((chunk) => chunk.trim()).filter(Boolean);

    chunks.forEach((chunk, chunkIdx) => {
      const liRegex = /{li}(.*?){\/li}/g;
      const listItems: string[] = [];
      let match: RegExpExecArray | null;

      while ((match = liRegex.exec(chunk)) !== null) {
        listItems.push(match[1].trim());
      }

      const remainingText = chunk.replace(liRegex, "").trim();

      if (remainingText) {
        output.push(
          <p key={`faq-p-${chunkIdx}`} className="mb-4 last:mb-0">
            {remainingText}
          </p>
        );
      }

      if (listItems.length > 0) {
        const midpoint = Math.ceil(listItems.length / 2);
        const firstColumnItems = listItems.slice(0, midpoint);
        const secondColumnItems = listItems.slice(midpoint);

        output.push(
          <div
            key={`faq-ul-${chunkIdx}`}
            className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 mb-4 last:mb-0"
          >
            <ul className="pl-5 space-y-1">
              {firstColumnItems.map((item, index) => (
                <li key={`faq-li-${chunkIdx}-${index}`}>- {item}</li>
              ))}
            </ul>

            {secondColumnItems.length > 0 && (
              <ul className="pl-5 space-y-1">
                {secondColumnItems.map((item, index) => (
                  <li key={`faq-li-${chunkIdx}-${index + midpoint}`}>- {item}</li>
                ))}
              </ul>
            )}
          </div>
        );
      }
    });

    return output;
  };

  return (
    <section
      className="w-full py-[120px] px-[85px] transition-colors duration-300"
      style={{
        background: bgStyle,
        fontFamily: "'Nohemi', sans-serif",
      }}
    >
      <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24">
        {/* Left Column - Heading info */}
        <div className="w-full lg:w-[40%] flex flex-col items-start">
          <span
            className="text-[36px] font-normal tracking-wide mb-4"
            style={{ color: tagColor }}
          >
            FAQs
          </span>
          <h2
            className="text-[66px] leading-[72px] tracking-tight font-normal capitalize"
            style={{ color: textColor }}
          >
            Frequently Asked Questions
          </h2>
          <p
            className="text-[20px] leading-[32px] mt-8 max-w-[400px]"
            style={{ color: subTextColor }}
          >
            Have a question about our design process, build timeline, or materials? Check our answers below, or reach out to our team directly.
          </p>
        </div>

        {/* Right Column - Accordion Accordion */}
        <div className="w-full lg:w-[60%] flex flex-col">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="border-b transition-colors duration-300"
                style={{ borderColor: borderColor }}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left py-8 flex justify-between items-center gap-8 focus:outline-none group"
                >
                  <h3
                    className="text-[26px] md:text-[28px] leading-[36px] font-normal capitalize transition-colors duration-300"
                    style={{ color: textColor }}
                  >
                    {faq.question}
                  </h3>
                  {/* Plus / Minus Indicator */}
                  <div className="relative w-8 h-8 flex-shrink-0 flex items-center justify-center">
                    <span
                      className="absolute w-6 h-[2px] rounded-full transition-transform duration-300"
                      style={{
                        backgroundColor: isOpen ? tagColor : textColor,
                        transform: isOpen ? "rotate(180deg)" : "none",
                      }}
                    />
                    <span
                      className="absolute w-[2px] h-6 rounded-full transition-transform duration-300"
                      style={{
                        backgroundColor: isOpen ? tagColor : textColor,
                        transform: isOpen ? "rotate(90deg)" : "none",
                      }}
                    />
                  </div>
                </button>

                {/* Answer container with smooth height transitions */}
                <div
                  className="overflow-hidden transition-all duration-500 ease-in-out"
                  style={{
                    maxHeight: isOpen ? "300px" : "0px",
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <div
                    className="pb-8 text-[20px] leading-[36px] max-w-[680px]"
                    style={{ color: subTextColor }}
                  >
                    {renderAnswer(faq.answer)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
