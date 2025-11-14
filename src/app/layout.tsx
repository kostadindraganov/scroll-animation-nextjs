import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Codegrid - Featured Work",
  description: "Featured work with scroll animations",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
