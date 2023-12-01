const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "9000",
        pathname: "/cacau-images/**",
      },
      {
        protocol: "https",
        hostname: "cacau-store-imgs.s3.sa-east-1.amazonaws.com",
        port: "443",
        pathname: "/imgs/**",
      },
    ],
  },
};

module.exports = withBundleAnalyzer(nextConfig);
