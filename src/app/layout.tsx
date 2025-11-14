import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mubien Work Page Scroll Animation | Codegrid",
  description: "Mubien Work Page Scroll Animation | Codegrid",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
