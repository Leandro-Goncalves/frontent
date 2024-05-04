const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  trailingSlash: true,
  images: {
    domains: ["api3.caacaustore.com", "cacau.b-cdn.net", "localhost"],
  },
};

module.exports = withBundleAnalyzer(nextConfig);
