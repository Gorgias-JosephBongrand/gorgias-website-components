const path = require("path");

// Merged into the Webflow CLI bundler config (webflow.json → library.bundleConfig).
// "@" alias is required for shadcn/ui imports like "@/lib/utils".
module.exports = {
  resolve: {
    alias: {
      "@": path.resolve(__dirname),
    },
  },
};
