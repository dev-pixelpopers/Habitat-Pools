import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

// Using Outfit as a placeholder for Nohemi since it's a premium local font.
// To use Nohemi, switch to next/font/local and provide the font files in /public/fonts/
const nohemi = Outfit({
  variable: "--font-nohemi",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Habitat Pools & Landscapes",
  description: "Luxury Pools & Landscapes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${nohemi.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
