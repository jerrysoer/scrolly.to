import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/how-tariffs-actually-work",
        destination:
          "https://jerrysoer.github.io/how-tariffs-actually-work",
      },
      {
        source: "/how-tariffs-actually-work/:path*",
        destination:
          "https://jerrysoer.github.io/how-tariffs-actually-work/:path*",
      },
    ];
  },
};

export default nextConfig;
