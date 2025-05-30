import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  BACKEND_ENDPOINT: process.env.BACKEND_ENDPOINT,
};

export default nextConfig;
