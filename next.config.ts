import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  // Allows loading dev-mode JS/HMR assets when the site is opened via the
  // machine's LAN IP (e.g. testing from another device) instead of
  // localhost — without this, client components silently fail to hydrate.
  allowedDevOrigins: ["192.168.1.6"],
};

export default nextConfig;
