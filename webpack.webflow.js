const path = require("path");

/** @param {import('webpack').Configuration} config */
module.exports = (config) => {
  config.resolve.alias = {
    ...config.resolve.alias,
    // Required for shadcn/ui imports like "@/lib/utils"
    "@": process.cwd(),
  };
  return config;
};
