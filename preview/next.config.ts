import type { NextConfig } from "next";
import path from "path";

const repoRoot = path.resolve(__dirname, "..");

const config: NextConfig = {
  transpilePackages: ["@gorgias/design-system"],
  webpack(cfg) {
    cfg.resolve.alias = {
      ...cfg.resolve.alias,
      "@": repoRoot,
    };
    // Ensure packages from src/ files outside preview/ resolve via preview/node_modules
    cfg.resolve.modules = [
      path.resolve(__dirname, "node_modules"),
      "node_modules",
    ];
    return cfg;
  },
};

export default config;
