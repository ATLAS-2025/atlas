import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: "standalone",
  // output: 'export', // Disabled for now due to Server Actions
  outputFileTracingIncludes: {
    "*": ["public/**/*", ".next/static/**/*"],
  },
  serverExternalPackages: ["electron"], // to prevent bundling Electron
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        electron: false,
      };
    }
    return config;
  },
  experimental: {
    externalDir: true,
  },
};

if (process.env.NODE_ENV === "development") delete nextConfig.output; // for HMR

export default nextConfig;
