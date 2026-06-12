import type { Metadata } from "next";
import "./globals.css";
import { Inter_Tight } from "next/font/google";
import { cn } from "@/lib/utils";

const interTight = Inter_Tight({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Gorgias Design System Preview",
  description: "Component preview for Vercel — mirrors the Webflow code component library.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn("font-sans", interTight.variable)}>
      <body>{children}</body>
    </html>
  );
}
