import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/art-platform",
  images: { unoptimized: true },
};

export default nextConfig;
