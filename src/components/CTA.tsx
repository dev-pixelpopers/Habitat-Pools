import React from "react";


const CTA = ({ heading, description, buttonText, buttonLink }: { heading: string, description: string, buttonText: string, buttonLink: string }) => {
    return (

        <section
            className="w-full py-[120px] px-[85px] flex flex-col items-center text-center"
            style={{
                background: "#ffffff",
                fontFamily: "'Nohemi', sans-serif",
            }}
        >
            <h2 className="text-[#112931] text-[66px] leading-[72px] mb-8 max-w-[800px]">
                {heading}
            </h2>
            <p className="text-[#112931]/80 text-[24px] leading-[44px] max-w-[600px] mb-12 capitalize relative">
                {description}
            </p>
            <div className="btn-all btn-dark relative">
                <a
                    href={buttonLink}
                    className="capitalize relative text-[22px] py-[20px] px-[64px] leading-[30px] underline decoration-[1px] text-[#112931] text-center"
                >
                    {buttonText}
                </a>
            </div>
        </section>
    )
}

export default CTA;