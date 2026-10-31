import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { preload } from "react-dom";
import "./globals.css";

// Using Outfit as a placeholder for Nohemi since it's a premium local font.
// To use Nohemi, switch to next/font/local and provide the font files in /public/fonts/
const nohemi = Outfit({
  variable: "--font-nohemi",
  subsets: ["latin"],
  // globals.css sets "Nohemi" on body and text elements, so Outfit is rarely
  // painted — don't let it compete with the real font for early bandwidth.
  preload: false,
});

export const metadata: Metadata = {
  title: "Habitat Pools & Landscapes",
  description: "Luxury Pools & Landscapes",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // The site font is otherwise only discovered once the CSS has loaded.
  preload("/fonts/Nohemi-Regular.otf", {
    as: "font",
    type: "font/otf",
    crossOrigin: "anonymous",
  });

  return (
    <html
      lang="en"
      className={`${nohemi.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
