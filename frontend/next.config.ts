import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: "standalone",
  output: 'export',
  outputFileTracingIncludes: {
    "*": ["public/**/*", ".next/static/**/*"],
  },
  serverExternalPackages: ["electron"], // to prevent bundling Electron
};

if (process.env.NODE_ENV === "development") delete nextConfig.output; // for HMR

export default nextConfig;
