import type { Metadata } from "next";
import { Inter, Cormorant_SC } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/smooth-scroll";
import FloatingBadge from "@/components/FloatingBadge";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const cormorantSC = Cormorant_SC({
  variable: "--font-heading",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ayshan - Professional Photography Studio",
  description: "Capturing life's beautiful moments with artistic vision. Professional photography services for weddings, portraits, events, and commercial projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${cormorantSC.variable} antialiased`}
        style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
      >
        <SmoothScroll>{children}</SmoothScroll>
        <FloatingBadge />
      </body>
    </html>
  );
}
