const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3333",
        pathname: "/imgs/**",
      },
      {
        protocol: "http",
        hostname: "api2.caacaustore.com",
        port: "443",
        pathname: "/imgs/**",
      },
    ],
  },
};

module.exports = withBundleAnalyzer(nextConfig);
