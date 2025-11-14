import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Eduard Bodak Portfolio - Animation Recreation",
  description: "A recreation of the stunning scroll-based animations from Eduard Bodak's portfolio using GSAP, ScrollTrigger, and Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
