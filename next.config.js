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
        hostname: "api3.caacaustore.com",
        pathname: "**",
      },
      {
        hostname: "cacau.b-cdn.net",
        pathname: "**",
      },
      {
        hostname: "caacaustore.com",
        pathname: "**",
      },
      {
        hostname: "localhost",
        pathname: "**",
      },
    ],
  },
};

module.exports = withBundleAnalyzer(nextConfig);
