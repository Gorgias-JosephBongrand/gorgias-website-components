import type { NextConfig } from "next";

const config: NextConfig = {
  // Transpile the design system package so Next.js can handle its imports
  transpilePackages: ["@gorgias/design-system"],
};

export default config;
