import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gorgias Design System Preview",
  description: "Component preview for Vercel — mirrors the Webflow code component library.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
