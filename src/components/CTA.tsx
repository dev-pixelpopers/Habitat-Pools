import React from "react";

const CTA = ({ heading, description, buttonText, buttonLink }: { heading: string, description: string, buttonText: string, buttonLink: string }) => {
    return (

        <section
            className="w-full py-(--section-y) px-(--gutter) flex flex-col items-center text-center"
            style={{
                background: "#ffffff",
                fontFamily: "'Nohemi', sans-serif",
            }}
        >
            <h2 className="text-[#112931] text-(length:--fs-h2) leading-(--lh-h2) mb-[clamp(20px,17.06px_+_0.785vw,32px)] max-w-[calc(800em/66)]">
                {heading}
            </h2>
            <p className="text-[#112931]/80 text-(length:--fs-body-xl) leading-(--lh-body-xl) max-w-[600px] mb-[clamp(28px,23.1px_+_1.308vw,48px)] capitalize relative">
                {description}
            </p>
            <div className="btn-all btn-dark relative">
                <a
                    href={buttonLink}
                    className="capitalize relative text-(length:--btn-fs) py-(--btn-py) px-(--btn-px) leading-(--btn-lh) underline decoration-[1px] text-[#112931] text-center"
                >
                    {buttonText}
                </a>
            </div>
        </section>
    )
}

export default CTA;