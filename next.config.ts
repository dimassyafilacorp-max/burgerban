import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Mengizinkan build selesai meskipun ada error TypeScript
    ignoreBuildErrors: true,
  },
};

export default nextConfig;